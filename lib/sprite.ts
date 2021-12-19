import { Event } from './base'
import { helper } from './helper'
import { Bitmap } from './bitmap'
import { Container } from './container'
import { renderPack } from './render'

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
    remove: {}
    inited: {}
}

/** 建立一個動畫精靈，為 LongTake 的驅動核心 */

export class Sprite extends Event<Channels> {
    parent: Sprite | null = null
    _bitmap = new Bitmap(100, 100)
    _main: Container | null = null
    _children: Sprite[] = []
    _status = {
        sort: false,
        cache: false,
        inited: false,
        remove: false,
        hidden: false,
        antiAliasing: true,
        childrenDead: false
    }
    _transform = {
        skewX: 0,
        skewY: 0,
        scaleWidth: 1,
        scaleHeight: 1,
        rotation: 0,
        opacity: 255,
        blendMode: 'inherit' as BlendMode
    }
    _position = {
        x: 0,
        y: 0,
        z: 0,
        screenX: 0,
        screenY: 0,
        anchorX: 0,
        anchorY: 0
    }
    private bindUpdateForChild = this.updateForChild.bind(this)
    constructor() {
        super('Sprite')
        this.bindUpdateForChild = this.updateForChild.bind(this)
    }

    get context() {
        return this._bitmap.context
    }

    get helper() {
        return helper
    }

    get children() {
        return this._children
    }

    /** 檢測一個物件是否為精靈 */

    static isSprite(object: any) {
        return object instanceof this
    }

    _onClick(screenX: number, screenY: number) {
        let called = false
        if (this.canShow) {
            this.eachChildren(child => {
                let listener = child.on('click', () => {
                    if (called === false) {
                        called = true
                        this.emit('click', {})
                    }
                })
                child._onClick(screenX, screenY)
                listener.off()
            })
            if (called === false && this.getChannelListenerSize('click')) {
                if (this.inRect(screenX, screenY)) {
                    this.emit('click', {})
                }
            }
        }
    }

    /** 迭代所有子精靈 */

    eachChildren(callback: (child: Sprite) => void) {
        let len = this._children.length
        for (let i = 0; i < len; i++) {
            callback(this._children[i])
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

    _install(main: Container) {
        if (this._main == null) {
            this._main = main
            this.create(this)
        } else {
            this.systemError('install', 'sprite already installed', this)
        }
    }

    /** 當被加入 stage 時呼叫該函式 */

    create(sprite: this) { /* user set */ }

    /** 精靈寬 */
    get width() {
        return this._bitmap.width
    }
    /** 精靈寬 */
    set width(val) {
        this._bitmap.width = val
    }

    /** 精靈高 */
    get height() {
        return this._bitmap.height
    }
    /** 精靈高 */
    set height(val) {
        this._bitmap.height = val
    }

    /** 抗鋸齒 */
    get antiAliasing() {
        return this._status.antiAliasing
    }
    /** 抗鋸齒 */
    set antiAliasing(val: boolean) {
        this._status.antiAliasing = val
    }

    /** 調整精靈的大小 */

    resize(width: number | { width: number, height: number }, height?: number) {
        if (typeof width === 'object') {
            if (width.width != null && width.height != null) {
                this._bitmap.resize(width.width, width.height)
            } else {
                this.systemError('resize', 'Object must have width and height.', width)
            }
        } else {
            this._bitmap.resize(width, height || this.height)
        }
    }

    /** 加入一個子精靈 */

    addChildren(sprite: Sprite) {
        if (Sprite.isSprite(sprite)) {
            if (sprite.parent == null) {
                sprite.parent = this
                this._children.push(sprite)
                this._sortChildren()
            } else {
                this.systemError('addChildren', 'Sprite have parent.', sprite)
            }
        } else {
            this.systemError('addChildren', 'Object not a sprite', sprite)
        }
    }

    /** 獲取所有子精靈，包含子精靈的子精靈 */

    getTotalChildren() {
        let children: Sprite[] = []
        this.eachChildrenDeep(child => children.push(child))
        return children
    }

    /** 重新排列子精靈，當子精靈有 Z 值改變時會自動觸發 */

    _sortChildren() {
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
        this._children = newData
    }

    /** 是否有變形 */

    isTransform() {
        let t = this._transform
        return !(t.skewX === 0 && t.skewY === 0 && t.scaleWidth === 1 && t.scaleHeight === 1 && t.rotation === 0)
    }

    /** 設定放大倍率 */

    scale(width: number, height: number) {
        this.scaleWidth = width
        this.scaleHeight = height == null ? width : height
    }

    /** 放大寬 */
    get scaleWidth() {
        return this._transform.scaleWidth
    }

    /** 放大寬 */
    set scaleWidth(val: number) {
        this._transform.scaleWidth = val
    }

    /** 放大高 */
    get scaleHeight() {
        return this._transform.scaleHeight
    }
    /** 放大高 */
    set scaleHeight(val: number) {
        this._transform.scaleHeight = val
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

    /** 該精靈在最後顯示的傾斜 */
    get screenSkewX(): number {
        if (this.parent == null) {
            return this.skewX
        }
        return this.skewX * this.parent.skewX
    }

    /** 該精靈在最後顯示的傾斜 */
    get screenSkewY(): number {
        if (this.parent == null) {
            return this.skewY
        }
        return this.skewY * this.parent.skewY
    }

    /** 畫面上呈現的寬 */
    get screenWidth() {
        return this._bitmap.width * this.screenScaleWidth + this.screenSkewY * this._bitmap.width * this.screenScaleWidth
    }

    /** 畫面上呈現的高 */
    get screenHeight() {
        return this._bitmap.height * this.screenScaleHeight + this.screenSkewX * this._bitmap.height * this.screenScaleHeight
    }

    /** 旋轉 */
    get rotation() {
        return this._transform.rotation
    }
    /** 旋轉 */
    set rotation(val: number) {
        this._transform.rotation = val % 360
    }

    /** 合成模式 */
    get blendMode() {
        if (this.parent && this._transform.blendMode === 'inherit') {
            return this.parent._transform.blendMode
        } else {
            return this._transform.blendMode
        }
    }
    /** 合成模式 */
    set blendMode(val: BlendMode) {
        this._transform.blendMode = val
    }

    /** 透明度 */
    get opacity() {
        return this._transform.opacity
    }
    /** 透明度 */
    set opacity(val: number) {
        if (val <= 0) {
            val = 0
        }
        if (val >= 255) {
            val = 255
        }
        this._transform.opacity = val
    }

    /** 傾斜X */
    get skewX() {
        return this._transform.skewX
    }
    /** 傾斜X */
    set skewX(val) {
        this._transform.skewX = val
    }

    /** 傾斜Y */
    get skewY() {
        return this._transform.skewY
    }
    /** 傾斜Y */
    set skewY(val) {
        this._transform.skewY = val
    }

    /** 設定錨點 */
    setAnchor(x: number, y?: number) {
        this.anchorX = x
        this.anchorY = y == null ? x : y
    }

    /** 定位點X */
    get x() {
        return this._position.x
    }
    /** 定位點X */
    set x(val: number) {
        this._position.x = val || 0
    }

    /** 定位點Y */
    get y() {
        return this._position.y
    }
    /** 定位點Y */
    set y(val) {
        this._position.y = val || 0
    }

    /** 高度，每次設定會重新排序 */
    get z() {
        return this._position.z
    }
    /** 高度，每次設定會重新排序 */
    set z(val: number) {
        this._position.z = val
        if (this.parent) {
            this.parent._status.sort = true
        }
    }

    /** 渲染的位置X */
    get screenX(): number {
        return (this.parent ? this.parent.screenX + this.parent.width * this.parent.anchorX : 0) + this.x - this.width * this.anchorX
    }

    /** 渲染的位置Y */
    get screenY(): number {
        return (this.parent ? this.parent.screenY + this.parent.height * this.parent.anchorY : 0) + this.y - this.height * this.anchorY
    }

    /** 畫面上的位置X */
    get realScreenX(): number {
        let parent = this.parent
        if (parent) {
            let px = parent.posX
            let py = parent.posY
            let x = px + this.x / parent.screenScaleWidth
            let y = py + this.y / parent.screenScaleHeight
            let r = this.screenRotation
            let s = this.helper.sinByRad(r)
            let c = this.helper.cosByRad(r)
            return (x) * c - (y) * s
        } else {
            return 0
        }
    }

    /** 畫面上的位置Y */
    get realScreenY(): number {
        let parent = this.parent
        if (parent) {
            let px = parent.posX
            let py = parent.posY
            let x = px + this.x / parent.screenScaleWidth
            let y = py + this.y / parent.screenScaleHeight
            let r = this.screenRotation
            let s = this.helper.sinByRad(r)
            let c = this.helper.cosByRad(r)
            return (x) * s + (y) * c
        } else {
            return 0
        }
    }

    /** 畫面上的旋轉角度 */
    get screenRotation() {
        return ((this.parent ? this.parent.rotation : 0) + this.rotation) % 360
    }

    /** 絕對位置的錨點位置X */
    get posX() {
        return this.screenX + this.width * this.anchorX
    }
    /** 絕對位置的錨點位置Y */
    get posY() {
        return this.screenY + this.height * this.anchorY
    }

    /** 畫面顯示的錨點位置X */
    get screenPosX() {
        return this.realScreenX + this.screenWidth * this.anchorX
    }
    /** 畫面顯示的錨點位置Y */
    get screenPosY() {
        return this.realScreenY + this.screenHeight * this.anchorY
    }

    /** 錨點X */
    get anchorX() {
        return this._position.anchorX
    }

    /** 錨點X */
    set anchorX(val) {
        this._position.anchorX = val
    }

    /** 錨點Y */
    get anchorY() {
        return this._position.anchorY
    }
    /** 錨點Y */
    set anchorY(val) {
        this._position.anchorY = val
    }

    get canRender() {
        return !this._status.cache
    }

    get canShow() {
        return !this._status.hidden
    }

    moveByScreen(screenX: number, screenY: number) {
        if (this.parent) {
            this.x = (screenX - this.parent.screenPosX) / (this.parent.screenScaleWidth || 0.1)
            this.y = (screenY - this.parent.screenPosY) / (this.parent.screenScaleHeight || 0.1)
        } else {
            this.x = screenX
            this.y = screenY
        }
    }

    /** 快取目前渲染的 Bitmap */

    cache() {
        this._status.cache = true
        this._bitmap.cache = true
    }

    /** 解除快取狀態 */

    unCache() {
        this._status.cache = false
        this._bitmap.cache = false
    }

    /** 隱藏 */

    hidden() {
        this._status.hidden = true
    }

    /** 解除隱藏 */

    unHidden() {
        this._status.hidden = false
    }

    /** 每次渲染圖形時執行此函式，目的為精靈的動作 */

    update(sprite: this) { /* module set */ }

    /** 每次執行 update 時呼叫此函式，處理 Z 值更動的排序與移除子精靈 */

    _mainUpdate() {
        if (this._main == null) {
            if (this.parent && this.parent._main) {
                this._install(this.parent._main)
                this.parent._main.core.emit('addChild', {
                    sprite: this
                })
            }
        }
        if (this._status.sort) {
            this._status.sort = false
            this._sortChildren()
        }
        this.update(this)
        this.eachChildren(this.bindUpdateForChild)
        if (this._status.childrenDead) {
            const removeChild: Sprite[] = []
            this._status.childrenDead = false
            this._children = this._children.filter((child) => {
                if (child._status.remove) {
                    child._close()
                    removeChild.push(child)
                }
                return !child._status.remove
            })
            removeChild.forEach(child => child.emit('remove', {}))
        }
    }

    /** 呼叫子精靈更新 */

    private updateForChild(child: Sprite) {
        if (child._status.remove === false) {
            child._mainUpdate()
        } else {
            this._status.childrenDead = true
        }
    }

    /** 移除自身的綁定資訊(容易出錯，請使用remove讓精靈在迭代過程中被移除) */

    _close() {
        this._main = null
        this.parent = null
    }

    /** 移除自己於父精靈下 */

    remove() {
        this._status.remove = true
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

    /** 移除指定 index 的精靈 */

    removeChildrenByIndex(index: number) {
        if (typeof index === 'number' && this._children[index]) {
            this._children[index].remove()
        }
    }

    /** 渲染 bitmap 的方法 */

    render(sprite: this) { /* module set */ }

    /** 主要渲染程序，包含渲染與濾鏡 */

    _mainRender() {
        this.eachChildren(this.renderForChild)
        if (this.canRender) {
            this.render(this)
            this._bitmap.clearCache()
        }
        if (this._status.inited === false) {
            this.emit('inited', {})
        }
    }

    /** 呼叫子精靈渲染 */

    private renderForChild(child: Sprite) {
        child._mainRender()
    }

    /** 獲取精靈在畫布的準確位置 */

    getRealRect() {
        let width = this.screenWidth
        let height = this.screenHeight
        let r = this.screenRotation
        let s = this.helper.sinByRad(r)
        let c = this.helper.cosByRad(r)
        let px = 0
        let py = 0
        let pw = 1
        let ph = 1
        if (this.parent) {
            px = this.parent.screenPosX
            py = this.parent.screenPosY
            pw = this.parent.screenScaleWidth
            ph = this.parent.screenScaleHeight
        }
        let ox = width * this.anchorX
        let oy = height * this.anchorY
        let sx = px + this.x * pw - ox
        let sy = py + this.y * ph - oy
        let rx = sx + width * this.anchorX
        let ry = sy + height * this.anchorY
        let p = (dx: number, dy: number) => {
            let x = sx + dx - rx
            let y = sy + dy - ry
            return {
                x: x * c - y * s + rx,
                y: x * s + y * c + ry
            }
        }
        return {
            p0: p(0, 0),
            p1: p(width, 0),
            p2: p(width, height),
            p3: p(0, height)
        }
    }

    /** 座標是否在精靈的矩形範圍內 */
    // https://www.codeleading.com/article/9584744528/

    inRect(x: number, y: number) {
        let { p0, p1, p2, p3 } = this.getRealRect()
        let a = (p1.x - p0.x) * (y - p0.y) - (p1.y - p0.y) * (x - p0.x)
        let b = (p2.x - p1.x) * (y - p1.y) - (p2.y - p1.y) * (x - p1.x)
        let c = (p3.x - p2.x) * (y - p2.y) - (p3.y - p2.y) * (x - p2.x)
        let d = (p0.x - p3.x) * (y - p3.y) - (p0.y - p3.y) * (x - p3.x)
        if ((a > 0 && b > 0 && c > 0 && d > 0) || (a < 0 && b < 0 && c < 0 && d < 0)) {
            return true
        }
        return false
    }
}

export class ImageSprite extends Sprite {
    readonly render: any = null
    constructor(image: HTMLImageElement | ImageBitmap) {
        super()
        this.on('inited', () => this.cache())
        this.resize(image)
        this.render = () => {
            this.context.drawImage(image, 0, 0)
        }
    }
}

type TextOptions = {
    color: string
    round: number
    padding: number
    fontSize: number
    fontFamily: string
    backgroundColor: string | null
}

export class TextSprite extends Sprite {
    private text: string = ''
    private options: TextOptions
    private trim = {
        top: 0,
        left: 0,
        width: 0,
        height: 0
    }
    readonly render: any = null
    constructor(options: Partial<TextOptions> = {}) {
        super()
        this.antiAliasing = false
        this.options = {
            color: this.helper.ifEmpty(options.color, '#000'),
            round: this.helper.ifEmpty(options.round, 0),
            padding: this.helper.ifEmpty(options.padding, 0),
            fontSize: this.helper.ifEmpty(options.fontSize, 18),
            fontFamily: this.helper.ifEmpty(options.fontFamily, 'serif'),
            backgroundColor: this.helper.ifEmpty(options.backgroundColor, null)
        }
        this.render = () => {
            this.context.clearRect(0, 0, this.width, this.height)
            if (this.options.backgroundColor) {
                renderPack.fillRoundRect(this, {
                    color: this.options.backgroundColor,
                    round: this.options.round
                })
            }
            let x = this.trim.left * -1 + this.options.padding
            let y = this.trim.top / 2 * -1 + this.options.padding
            this.drawText(this.context, x, y)
            this.cache()
        }
    }

    private drawText(context: CanvasRenderingContext2D, offsetX: number, offsetY: number) {
        context.textBaseline = 'top'
        context.font = `${this.options.fontSize}px ${this.options.fontFamily}`
        context.fillStyle = this.options.color
        context.fillText(this.text || '', Math.round(offsetX) + 0.5, Math.round(offsetY) + 0.5)
    }

    private getByteLength(text: string) {
        let size = text.length
        for (let i = text.length - 1; i >= 0; i--) {
            let code = text.charCodeAt(i)
            if (code > 0x7f && code <= 0x7ff) {
                size++
            } else if (code > 0x7ff && code <= 0xffff) {
                size += 2
            }
            if (code >= 0xDC00 && code <= 0xDFFF) {
                i--
            }
        }
        return size
    }

    setContent(text: string) {
        let unit = this.options.fontSize + 14
        let padding = this.options.padding * 2
        let bitmap = new Bitmap(unit * this.getByteLength(text), unit)
        this.text = text
        this.drawText(bitmap.context, 0, 4)
        this.trim = bitmap.getTrimSize()
        this.resize(this.trim.width + padding, this.trim.height + padding)
        this.unCache()
    }
}
