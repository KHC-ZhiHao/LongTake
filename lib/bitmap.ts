import { Base } from './base'

/** 為掌管位圖的物件 */

export class Bitmap extends Base {
    /** 內部指向的離屏 canvas */
    readonly canvas: HTMLCanvasElement
    /** cavnas 2d context */
    readonly context: CanvasRenderingContext2D
    /** 是否為快取狀態 */
    cache = false
    /** 由context.getImageData取得的int8Array位圖元素 */
    imgData: ImageData | null = null
    /** 由快取產生的圖片buffer */
    imgBitmap: HTMLImageElement | null = null

    private _width = 0
    private _height = 0

    constructor(width = 100, height = 100, element?: HTMLCanvasElement) {
        super('Bitmap')
        this.canvas = element || document.createElement('canvas')
        this.context = this.canvas.getContext('2d')!
        this.imgData = null
        this.imgBitmap = null
        this._width = this.canvas.width
        this._height = this.canvas.height
        if (element == null) {
            this.resize(width, height)
        }
    }

    static isBitmap(object: any) {
        return object instanceof this
    }

    get width() {
        return this._width
    }

    set width(val) {
        this._width = val
        this.canvas.width = val || 1
    }

    get height() {
        return this._height
    }

    set height(val) {
        this._height = val
        this.canvas.height = val || 1
    }

    /** 獲取渲染目標 */

    getRenderTarget() {
        if (this.imgBitmap && this.cache === true) {
            return this.imgBitmap
        } else if (this.cache === false) {
            return this.canvas
        } else {
            this.cacheImageBitmap()
            return this.canvas
        }
    }

    /** 調整畫布大小 */

    resize(width: number, height: number) {
        this.width = width != null ? width : this.width
        this.height = height != null ? height : this.height
    }

    /** 清空畫布 */

    clear() {
        this.context.clearRect(0, 0, this.width, this.height)
    }

    /** 當此位圖快取時，將 render target 轉換成 img or imagebitmap 加速渲染 */

    cacheImageBitmap() {
        let img = new Image()
        img.onload = () => {
            this.imgBitmap = img
        }
        img.src = this.canvas.toDataURL()
    }

    /** 解除並清除圖片資料快取 */

    clearCache() {
        this.imgData = null
        this.imgBitmap = null
    }

    /** 取得位元位置的像素元素 */

    getPixel(x: number, y: number) {
        let imgData = this.getImageData()
        let site = (x * (imgData.width * 4)) + (y * 4)
        return [
            imgData.data[site],
            imgData.data[site + 1],
            imgData.data[site + 2],
            imgData.data[site + 3]
        ]
    }

    /** 獲取快取圖片資料 */

    getImageData() {
        if (this.imgData == null) {
            this.imgData = this.context.getImageData(0, 0, this.width, this.height)
        }
        return this.imgData
    }

    /** 清空圖片並貼上圖片資料 */

    putImageData(imgData: ImageData) {
        this.clear()
        this.context.putImageData(imgData, 0, 0)
    }
}
