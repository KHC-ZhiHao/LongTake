import { Base } from './base'
import { helper } from './helper'
import { Bitmap } from './bitmap'
import { BlendMode } from './types'

/** 建立一個動畫精靈，為 LongTake 的驅動單位 */

export class Sprite extends Base {
    name: string
    parent: Sprite | null = null
    helper = helper
    bitmap = new Bitmap()
    context = this.bitmap.context
    private children: Sprite[] = []

    private readonly status = {
        cache: false,
        remove: false,
        hidden: false,
        needSort: false,
        installed: false
    }

    readonly transform = {
        skewX: 0,
        skewY: 0,
        scaleWidth: 1,
        scaleHeight: 1,
        rotation: 0,
        opacity: 255,
        blendMode: 'source-over' as BlendMode
    }

    readonly position = {
        x: 0,
        y: 0,
        z: 0,
        anchorX: 0,
        anchorY: 0,
    }

    constructor(name: string){
        super(name || 'Sprite')
        this.name = name || 'no name'
    }

    /** 檢測一個物件是否為精靈 */

    static isSprite(object: any){
        return object instanceof this
    }

    /** 迭代所有子精靈 */

    eachChildren(callback: (sprite: Sprite) => void){
        let len = this.children.length
        for (let i = 0 ; i < len ; i++) {
            callback(this.children[i])
        }
    }

    /** 迭代所有子精靈(包含子精靈的子精靈) */

    eachChildrenDeep(callback: (sprite: Sprite) => void) {
        let each = (sprite: Sprite) => {
            sprite.eachChildren( children => {
                callback(children)
                each(children)
            })
        }
        each(this)
    }

    //=============================
    //
    // install
    //

    /** Sprite 加入 Core 時執行初始化 */

    protected install(){
        if (this.status.installed === false) {
            this.status.installed = true
            this.create()
        } else {
            this.systemError('install', 'sprite installed', this)
        }
    }

    /** 當被加入 container stage 時呼叫該函式 */

    create(){ /* user set */ }

    //=============================
    //
    // bitmap
    //

    /**
     * @member {number} width 精靈寬(和Bitmap同步)
     * @member {number} height 精靈高(和Bitmap同步)
     */

    get width(){ return this.bitmap.width }
    set width(val){ this.bitmap.width = val }

    get height(){ return this.bitmap.height }
    set height(val){ this.bitmap.height = val }

    /** 調整精靈的bitmap大小 */

    resize(width: number, height: number){
        this.bitmap.resize(width, height)
    }

    //=============================
    //
    // family
    //

    /** 加入一個子精靈 */

    addChildren(sprite: Sprite) {
        if (Sprite.isSprite(sprite)) {
            if ( sprite.parent == null) {
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

    /** 重新排序子精靈，當子精靈有Z值改變時會自動觸發 */

    private sortChildren() {
        let newData: Sprite[] = []
        let childList: Array<Array<Sprite>> = []
        this.eachChildren(child => {
            if (childList[child.z] == null) {
                childList[child.z] = []
            }
            childList[child.z].push(child)
        })
        for (let children of childList) {
            if (children) {
                newData = newData.concat(children)
            }
        }
        this.children = newData
    }

    //=============================
    //
    // transform
    //

    /** 是否有變形 */

    hasTransform(){
        let t = this.transform
        if (t.skewX !== 0) {
            return true
        }
        if (t.skewY !== 0) {
            return true
        }
        if (t.scaleWidth !== 1) {
            return true
        }
        if (t.scaleHeight !== 1) {
            return true
        }
        if (t.rotation !== 0) {
            return true
        }
        return false
    }

    /** 設定放大倍率 */

    scale(width: number, height?: number) {
        this.scaleWidth = width
        this.scaleHeight = height == null ? width : height
    }

    get scaleWidth() {
        return this.transform.scaleWidth
    }
    set scaleWidth(val: number) {
        this.transform.scaleWidth = val
    }

    get scaleHeight(){
        return this.transform.scaleHeight
    }

    set scaleHeight(val: number) {
        this.transform.scaleHeight = val
    }

    get screenScaleWidth(): number {
        return this.parent == null ? this.scaleWidth : this.scaleWidth * this.parent.screenScaleWidth
    }

    get screenScaleHeight(): number {
        return this.parent == null ? this.scaleHeight : this.scaleHeight * this.parent.screenScaleHeight
    }

    get rotation() {
        return this.transform.rotation
    }

    set rotation(val: number) {
        this.transform.rotation = val % 360
    }

    get blendMode() {
        return this.transform.blendMode
    }

    set blendMode(val: BlendMode) {
        this.transform.blendMode = val
    }

    get opacity() {
        return this.transform.opacity
    }

    set opacity(val) {
        if (val <= 0) {
            val = 0
        }
        if (val >= 255) {
            val = 255
        }
        this.transform.opacity = val
    }

    get skewX() {
        return this.transform.skewX
    }

    set skewX(val: number) {
        this.transform.skewX = val
    }

    get skewY() {
        return this.transform.skewY
    }

    set skewY(val: number){
        this.transform.skewY = val
    }

    //=============================
    //
    // position
    //

    /** 設定錨點 */

    setAnchor(x: number, y: number) {
        this.anchorX = x
        this.anchorY = y == null ? x : y
    }

    get x() {
        return this.position.x
    }

    set x(val: number) {
        this.position.x = val || 0
    }

    get y() {
        return this.position.y
    }

    set y(val: number) {
        this.position.y = val || 0
     }

    get z() {
        return this.position.z
    }

    set z(val: number) {
        this.position.z = val
        if (this.parent) {
            this.parent.status.needSort = true
        }
    }

    get screenX() {
        let pos = this.x - this.width * this.anchorX
        if (this.parent) {
            pos += this.parent.screenX + this.parent.width * this.parent.anchorX
        }
        return pos
    }

    get screenY() { 
        let pos = this.y - this.height * this.anchorY
        if (this.parent) {
            pos += this.parent.screenY + this.parent.height * this.parent.anchorY
        }
        return pos
    }

    get posX() {
        return this.screenX + this.width * this.anchorX
    }

    get posY() {
        return this.screenY + this.height * this.anchorY
    }

    get anchorX() {
        return this.position.anchorX
    }

    set anchorX(val: number) {
        this.position.anchorX = val
    }

    get anchorY() {
        return this.position.anchorY
    }

    set anchorY(val: number) {
        this.position.anchorY = val
    }
    
    //=============================
    //
    // status
    //

    canRender() {
        return !this.status.cache
    }
    
    canShow() {
        return !this.status.hidden
    }

    /** 快取目前渲染的 bitmap */

    cache() {
        this.status.cache = true
        this.bitmap.cache = true
    }

    /** 手動解除快取狀態 */

    unCache() {
        this.status.cache = false
        this.bitmap.cache = false
    }

    /** 隱藏 */

    hidden(hidden: boolean) {
        this.status.hidden = hidden ? !!hidden : true;
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
            x : this.screenX * (this.parent == null ? 1 : this.parent.screenScaleWidth),
            y : this.screenY * (this.parent == null ? 1 : this.parent.screenScaleHeight)
        }
    }

    //=============================
    //
    // update
    //

    /** 每次渲染圖形時執行此函式，目的為精靈的動作 */

    update(){ /* module set */ }

    /** 每次執行update時呼叫此函式，處理Z值更動的排序與移除子精靈 */

    _mainUpdate() {
        let hasChildRemove = false
        if (this.status.needSort) {
            this.status.needSort = false
            this.sortChildren()
        }
        this.update()
        this.eachChildren(child => {
            if (child.status.remove == false) {
                child._mainUpdate()
            }else{
                hasChildRemove = true
            }
        })
        if (hasChildRemove) {
            this.children = this.children.filter(child => {
                if (child.status.remove) {
                    child.parent = null
                    return false
                } else {
                    return true
                }
            })
        }
    }

    //=============================
    //
    // remove
    //

    /** 移除自己於父精靈下 */

    remove() {
        this.status.remove = true
    }

    /** 移除指定的子精靈 */

    removeChild(sprite: Sprite) {
        if (sprite.parent === this) {
            sprite.remove()
        } else {
            this.systemError('removeChild', 'Sprite not found', sprite)
        }
    }

    /** 移除全部的子精靈 */

    clearChildren() {
        this.eachChildren(child => this.removeChild(child))
    }

    //=============================
    //
    // render
    //

    /** 渲染 bitmap 的方法 */
    
    render() { /* module set */ }

    /**
     * @function mainRender()
     * @private
     * @desc 主要渲染程序，包含渲染與濾鏡
     */

    _mainRender() {
        this.eachChildren(child => child._mainRender())
        if (this.context && this.canRender()) { 
            this.context.save()
            this.render()
            this.context.restore()
            this.context.restore()
            this.bitmap.clearCache()
        }
    }

    /** 將精靈設置成img檔案的解析度，並渲染該圖片且快取 */

    fromImage(img: HTMLImageElement) {
        this.resize(img.width, img.height)
        this.render = () => {
            this.context?.drawImage(img, 0, 0)
            this.cache()
        }
        return this
    }

    //=============================
    //
    // check
    //

    /** 座標是否在精靈的矩形範圍內 */

    inRect(x: number, y: number) {
        let rect = this.getRealSize()
        let position = this.getRealPosition()
        return (x >= position.x && x <= position.x + rect.width) && (y >= position.y && y <= position.y + rect.height)
    }
}
