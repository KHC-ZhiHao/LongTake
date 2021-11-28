import { Event } from './base'
import { helper } from './helper'
import { Bitmap } from './bitmap'
import { Container } from './container'
import { byteLength } from './utils'

type Pixel = {
    red: number
    green: number
    blue: number
    alpha: number
}

/**
 * 合成模式
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
 */

type BlendMode =
    'inherit'
    | 'source-over'
    | 'source-in'
    | 'source-out'
    | 'source-atop'
    | 'destination-over'
    | 'destination-in'
    | 'destination-out'
    | 'destination-atop'
    | 'lighter'
    | 'copy'
    | 'xor'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity'

type Channels = {
    click: {}
}

/** 建立一個動畫精靈，為 LongTake 的驅動核心 */

export class Sprite extends Event<Channels> {
    name: string
    main: Container | null = null
    bitmap = new Bitmap(100, 100)
    context = this.bitmap.context
    parent: Sprite | null = null
    children: Sprite[] = []
    status = {
        sort: false,
        cache: false,
        remove: false,
        hidden: false,
        childrenDead: false
    }
    transform = {
        skewX: 0,
        skewY: 0,
        scaleWidth: 1,
        scaleHeight: 1,
        rotation: 0,
        opacity: 255,
        blendMode: 'inherit' as BlendMode
    }
    position = {
        x: 0,
        y: 0,
        z: 0,
        screenX: 0,
        screenY: 0,
        anchorX: 0,
        anchorY: 0
    }
    private bindUpdateForChild = this.updateForChild.bind(this)
    constructor(name?: string) {
        super(name || 'Sprite')
        this.name = name || 'No name'
        this.bindUpdateForChild = this.updateForChild.bind(this)
    }

    get helper() {
        return helper
    }

    /** 檢測一個物件是否為精靈 */

    static isSprite(object: any) {
        return object instanceof this
    }

    _onClick(screenX: number, screenY: number) {
        this.eachChildren(child => {
            let listener = child.on('click', () => this.emit('click', {}))
            child._onClick(screenX, screenY)
            listener.off()
        })
        if (this.getChannelListenerSize('click')) {
            if (this.inRect(screenX, screenY)) {
                this.emit('click', {})
            }
        }
    }

    /** 迭代所有子精靈 */

    eachChildren(callback: (child: Sprite) => void) {
        let len = this.children.length
        for (let i = 0; i < len; i++) {
            callback(this.children[i])
        }
    }

    /** 迭代所有子精靈(包含子精靈的子精靈) */

    eachChildrenDeep(callback: (child: Sprite) => void) {
        let each = function(sprite: Sprite) {
            sprite.eachChildren(children => {
                callback(children)
                each(children)
            })
        }
        each(this)
    }

    /** 被加入 LongTake 時執行，並載入 LongTake */

    install(main: Container) {
        if (this.main == null) {
            this.main = main
            this.create(this)
        } else {
            this.systemError('install', 'sprite already installed', this)
        }
    }

    /** 當被加入stage時呼叫該函式 */

    create(sprite: this) { /* user set */ }

    /** 精靈寬(和Bitmap同步) */
    get width() {
        return this.bitmap.width
    }
    /** 精靈寬(和Bitmap同步) */
    set width(val) {
        this.bitmap.width = val
    }

    /** 精靈高(和Bitmap同步) */
    get height() {
        return this.bitmap.height
    }
    /** 精靈高(和Bitmap同步) */
    set height(val) {
        this.bitmap.height = val
    }

    /** 調整精靈的bitmap大小 */

    resize(width: number | { width: number, height: number }, height?: number) {
        if (typeof width === 'object') {
            if (width.width != null && width.height != null) {
                this.bitmap.resize(width.width, width.height)
            } else {
                this.systemError('resize', 'Object must have width and height.', width)
            }
        } else {
            this.bitmap.resize(width, height || this.height)
        }
    }

    /** 加入一個子精靈 */

    addChildren(sprite: Sprite) {
        if (Sprite.isSprite(sprite)) {
            if (sprite.parent == null) {
                sprite.parent = this
                this.children.push(sprite)
                this.sortChildren()
            } else {
                this.systemError('addChildren', 'Sprite have parent.', sprite)
            }
        } else {
            this.systemError('addChildren', 'Object not a sprite', sprite)
        }
    }

    /** 重新排列子精靈，當子精靈有 Z 值改變時會自動觸發 */

    sortChildren() {
        let newData: any[] = []
        let childList: any[] = []
        this.eachChildren((child) => {
            if (childList[child.z] == null) {
                childList[child.z] = []
            }
            childList[child.z].push(child)
        })
        this.each(childList, (list) => {
            if (Array.isArray(list)) {
                newData = newData.concat(list)
            }
        })
        this.children = newData
    }

    /** 是否有變形 */

    isTransform() {
        let t = this.transform
        return !(t.skewX === 0 && t.skewY === 0 && t.scaleWidth === 1 && t.scaleHeight === 1 && t.rotation === 0)
    }

    /** 設定放大倍率 */

    scale(width: number, height: number) {
        this.scaleWidth = width
        this.scaleHeight = height == null ? width : height
    }

    /** 放大寬 */
    get scaleWidth() {
        return this.transform.scaleWidth
    }
    /** 放大寬 */
    set scaleWidth(val: number) {
        this.transform.scaleWidth = val
    }

    /** 放大高 */
    get scaleHeight() {
        return this.transform.scaleHeight
    }
    /** 放大高 */
    set scaleHeight(val: number) {
        this.transform.scaleHeight = val
    }

    /** 該精靈在最後顯示的總倍率寬 */
    get screenScaleWidth(): number {
        if (this.parent == null) {
            return this.scaleWidth
        }
        return this.scaleWidth * this.parent.screenScaleWidth
    }

    /** 該精靈在最後顯示的總倍率高 */
    get screenScaleHeight(): number {
        if (this.parent == null) {
            return this.scaleHeight
        }
        return this.scaleHeight * this.parent.screenScaleHeight
    }

    /** 旋轉 */
    get rotation() {
        return this.transform.rotation
    }
    /** 旋轉 */
    set rotation(val: number) {
        this.transform.rotation = val % 360
    }

    /** 合成模式 */
    get blendMode() {
        if (this.parent && this.transform.blendMode === 'inherit') {
            return this.parent.transform.blendMode
        } else {
            return this.transform.blendMode
        }
    }
    /** 合成模式 */
    set blendMode(val: BlendMode) {
        this.transform.blendMode = val
    }

    /** 透明度 */
    get opacity() {
        return this.transform.opacity
    }
    /** 透明度 */
    set opacity(val: number) {
        if (val <= 0) {
            val = 0
        }
        if (val >= 255) {
            val = 255
        }
        this.transform.opacity = val
    }

    /** 傾斜X */
    get skewX() {
        return this.transform.skewX
    }
    /** 傾斜X */
    set skewX(val) {
        this.transform.skewX = val
    }

    /** 傾斜Y */
    get skewY() {
        return this.transform.skewY
    }
    /** 傾斜Y */
    set skewY(val) {
        this.transform.skewY = val
    }

    /** 設定錨點 */
    setAnchor(x: number, y?: number) {
        this.anchorX = x
        this.anchorY = y == null ? x : y
    }

    /** 定位點X */
    get x() {
        return this.position.x
    }
    /** 定位點X */
    set x(val: number) {
        if (typeof val === 'number') {
            this.position.x = val || 0
        }
    }

    /** 定位點Y */
    get y() { return this.position.y }
    /** 定位點Y */
    set y(val) {
        if (typeof val === 'number') {
            this.position.y = val || 0
        }
    }

    /** 高度，每次設定會重新排序 */
    get z() {
        return this.position.z
    }
    /** 高度，每次設定會重新排序 */
    set z(val: number) {
        if (typeof val === 'number') {
            this.position.z = val
            if (this.parent) {
                this.parent.status.sort = true
            }
        }
    }

    /** 絕對位置X */
    get screenX(): number {
        return (this.parent ? this.parent.screenX + this.parent.width * this.parent.anchorX : 0) + this.x - this.width * this.anchorX
    }

    /** 絕對位置Y */
    get screenY(): number {
        return (this.parent ? this.parent.screenY + this.parent.height * this.parent.anchorY : 0) + this.y - this.height * this.anchorY
    }

    /** 絕對位置的錨點位置X */
    get posX() {
        return this.screenX + this.width * this.anchorX
    }
    /** 絕對位置的錨點位置Y */
    get posY() {
        return this.screenY + this.height * this.anchorY
    }

    /** 錨點X */
    get anchorX() {
        return this.position.anchorX
    }
    /** 錨點X */
    set anchorX(val) {
        this.position.anchorX = val
    }

    /** 錨點Y */
    get anchorY() {
        return this.position.anchorY
    }
    /** 錨點Y */
    set anchorY(val) {
        this.position.anchorY = val
    }

    get canRender() {
        return !this.status.cache
    }
    get canShow() {
        return !this.status.hidden
    }

    /** 快取目前渲染的 Bitmap */

    cache() {
        this.status.cache = true
        this.bitmap.cache = true
    }

    /** 解除快取狀態 */

    unCache() {
        this.status.cache = false
        this.bitmap.cache = false
    }

    /** 隱藏 */

    hidden(bool: boolean) {
        this.status.hidden = bool ? !!bool : true
    }

    /** 解除隱藏 */

    unHidden() {
        this.status.hidden = false
    }

    /** 獲取該精靈實際呈現的大小 */

    getRealSize() {
        let width = this.width + this.skewY * this.height
        let height = this.height + this.skewX * this.width
        let s = Math.abs(this.helper.sinByRad(this.rotation))
        let c = Math.abs(this.helper.cosByRad(this.rotation))
        return {
            width: (width * c + height * s) * this.screenScaleWidth,
            height: (height * c + width * s) * this.screenScaleHeight
        }
    }

    /** 獲取精靈在畫布的準確位置 */

    getRealPosition() {
        return {
            x: this.screenX * (this.parent == null ? 1 : this.parent.screenScaleWidth),
            y: this.screenY * (this.parent == null ? 1 : this.parent.screenScaleHeight)
        }
    }

    /** 每次渲染圖形時執行此函式，目的為精靈的動作 */

    update(sprite: this) { /* module set */ }

    /** 每次執行 update 時呼叫此函式，處理 Z 值更動的排序與移除子精靈 */

    mainUpdate() {
        if (this.main == null) {
            if (this.parent && this.parent.main) {
                this.install(this.parent.main)
            }
        }
        if (this.status.sort) {
            this.status.sort = false
            this.sortChildren()
        }
        this.update(this)
        this.eachChildren(this.bindUpdateForChild)
        if (this.status.childrenDead) {
            this.status.childrenDead = false
            this.children = this.children.filter((child) => {
                if (child.status.remove) {
                    child.close()
                }
                return !child.status.remove
            })
        }
    }

    /** 呼叫子精靈更新 */

    private updateForChild(child: Sprite) {
        if (child.status.remove === false) {
            child.mainUpdate()
        } else {
            this.status.childrenDead = true
        }
    }

    /** 移除自身的綁定資訊(容易出錯，請使用remove讓精靈在迭代過程中被移除) */

    close() {
        this.main = null
        this.parent = null
    }

    /** 移除自己於父精靈下 */

    remove() {
        this.status.remove = true
    }

    /** 移除指定的子精靈 */

    removeChild(sprite: Sprite) {
        if (Sprite.isSprite(sprite)) {
            if (sprite.parent === this) {
                sprite.remove()
            } else {
                this.systemError('removeChild', 'Have\'n this sprite', sprite)
            }
        } else {
            this.systemError('removeChild', 'Not a sprite', sprite)
        }
    }

    /** 移除全部的子精靈 */

    clearChildren() {
        this.eachChildren((children) => {
            this.removeChild(children)
        })
    }

    /** 移除指定name的精靈 */

    removeChildrenByName(name: string) {
        this.eachChildren((children) => {
            if (children.name === name) {
                this.removeChild(children)
            }
        })
    }

    /** 移除指定 index 的精靈 */

    removeChildrenByIndex(index: number) {
        if (typeof index === 'number' && this.children[index]) {
            this.children[index].remove()
        }
    }

    /** 渲染 bitmap 的方法 */

    render(sprite: this) { /* module set */ }

    /** 主要渲染程序，包含渲染與濾鏡 */

    mainRender() {
        this.eachChildren(this.renderForChild)
        if (this.canRender) {
            this.context.save()
            this.render(this)
            this.context.restore()
            this.bitmap.clearCache()
        }
    }

    /** 呼叫子精靈渲染 */

    private renderForChild(child: Sprite) {
        child.mainRender()
    }

    /** 迭代像素 */

    eachImgData(imgData: ImageData, callback: (pixel: Pixel) => void) {
        let data = imgData.data
        for (let i = 0; i < data.length; i += 4) {
            let pixel = {
                red: data[i],
                blue: data[i + 2],
                green: data[i + 1],
                alpha: data[i + 3]
            }
            callback(pixel)
        }
    }

    /** 座標是否在精靈的矩形範圍內 */

    inRect(x: number, y: number) {
        let rect = this.getRealSize()
        let position = this.getRealPosition()
        return (x >= position.x && x <= position.x + rect.width)
            && (y >= position.y && y <= position.y + rect.height)
    }
}

export class ImageSprite extends Sprite {
    readonly render: any = null
    constructor(image: HTMLImageElement | ImageBitmap) {
        super()
        this.resize(image)
        this.render = () => {
            this.context.drawImage(image, 0, 0)
            this.cache()
        }
    }
}

type TextOptions = {
    color: string
    fontSize: number
    fontFamily: string
    backgroundColor: string | null
}

export class TextSprite extends Sprite {
    private text: string = ''
    private options: TextOptions
    readonly render: any = null
    constructor(options: Partial<TextOptions> = {}) {
        super()
        this.options = {
            color: this.helper.ifEmpty(options.color, '#000'),
            fontSize: this.helper.ifEmpty(options.fontSize, 18),
            fontFamily: this.helper.ifEmpty(options.fontFamily, 'Arial'),
            backgroundColor: this.helper.ifEmpty(options.backgroundColor, null)
        }
        this.render = () => {
            if (this.options.backgroundColor) {
                this.context.fillStyle = this.options.backgroundColor
                this.context.fillRect(0, 0, this.width, this.height)
            }
            this.context.textBaseline = 'top'
            this.context.font = `${this.options.fontSize}px ${this.options.fontFamily}`
            this.context.fillStyle = this.options.color
            this.context.fillText(this.text || '', 0, 0)
            this.cache()
        }
    }

    setContent(text: string) {
        let length = byteLength(text)
        this.text = text
        this.resize(this.options.fontSize * length / 2, this.options.fontSize)
        this.unCache()
    }
}
