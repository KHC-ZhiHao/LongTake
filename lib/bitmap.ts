import { Base } from './base'

/** 為掌管位圖的物件 */

export class Bitmap extends Base {
    /** 內部指向的離屏canvas */
    canvas: HTMLCanvasElement
    /** cavnas 2d context */
    context: CanvasRenderingContext2D
    /** 是否為快取狀態 */
    cache = false
    /** 由 context.getImageData 取得的 int8Array 位圖元素 */
    imgData: ImageData | null = null
    /** 由快取產生的圖片buffer */
    imgBitmap: HTMLImageElement | null = null
    private _width: number
    private _height: number
    constructor(element = document.createElement('canvas')) {
        super('Bitmap')
        this.canvas = element
        this.context = this.canvas.getContext('2d')!
        this._width = this.canvas.width
        this._height = this.canvas.height
    }

    static isBitmap(object: any) {
        return object instanceof this
    }

    get width() { return this._width }
    set width(val) {
        this._width = val
        this.canvas.width = val || 1
    }

    get height() { return this._height }
    set height(val) {
        this._height = val
        this.canvas.height = val || 1
    }

    /** 獲取渲染目標 */

    getRenderTarget() {
        if (this.cache) {
            if (this.imgBitmap == null) {
                this.cacheImageBitmap()
            }
            return this.imgBitmap
        } else {
            return this.canvas
        }
    }

    /** 調整畫布大小 */

    resize(width: number, height: number) {
        this.width = width != null ? width : this.width;
        this.height = height != null ? height : this.height;
    }

    /** 清空畫布 */

    clear() {
        if (this.context) {
            this.context.clearRect(0, 0, this.width, this.height)
        }
    }

    /** 當此位圖快取時，將render target轉換成img or imagebitmap加速渲染 */

    private cacheImageBitmap(){
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

    /** 取得位元位置的像素元素 RGBA */

    getPixel(x: number, y: number): [number, number, number, number] {
        let imgData = this.getImageData()
        if (imgData) {
            let site = (x * (imgData.width * 4)) + (y * 4)
            return [
                imgData.data[site],
                imgData.data[site + 1],
                imgData.data[site + 2],
                imgData.data[site + 3]
            ]
        } else {
            return [0, 0, 0, 0]
        }
    }

    /** 獲取快取圖片資料 */

    getImageData(){
        if (this.imgData == null) {
            if (this.context) {
                this.imgData = this.context.getImageData(0, 0, this.width, this.height)
            }
        }
        return this.imgData
    }

    /** 清空圖片並貼上圖片資料 */

    putImageData(imgData: ImageData){
        if (this.context) {
            this.clear()
            this.context.putImageData(imgData, 0, 0)
        }
    }
}
