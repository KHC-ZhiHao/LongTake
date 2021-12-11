import { Base } from './base'

/** 為掌管位圖的物件 */

export class Bitmap extends Base {
    /** 內部指向的離屏 canvas */
    readonly canvas: HTMLCanvasElement
    /** cavnas 2d context */
    readonly context: CanvasRenderingContext2D
    /** 是否為快取狀態 */
    cache = false
    /** 由快取產生的圖片buffer */
    private imgBitmap: HTMLImageElement | ImageBitmap | null = null
    private _width = 0
    private _height = 0

    constructor(width = 100, height = 100, element?: HTMLCanvasElement) {
        super('Bitmap')
        this.canvas = element || document.createElement('canvas')
        this.context = this.canvas.getContext('2d')!
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
        this.width = width != null ? (Math.floor(width) || 1) : this.width
        this.height = height != null ? (Math.floor(height) || 1) : this.height
    }

    /** 清空畫布 */

    clear() {
        this.context.clearRect(0, 0, this.width, this.height)
    }

    /** 當此位圖快取時，將 render target 轉換成 img or imagebitmap 加速渲染 */

    cacheImageBitmap() {
        if (typeof window.createImageBitmap !== 'undefined') {
            createImageBitmap(this.canvas).then(ImageBitmap => {
                this.imgBitmap = ImageBitmap
            })
        } else {
            let img = new Image()
            img.onload = () => {
                this.imgBitmap = img
            }
            img.src = this.canvas.toDataURL()
        }
    }

    /** 解除並清除圖片資料快取 */

    clearCache() {
        this.imgBitmap = null
    }

    /** 獲取快取圖片資料 */

    getImageData() {
        return this.context.getImageData(0, 0, this.width, this.height)
    }

    /** 獲得排除空白空間的矩形 */

    getTrimSize() {
        let { data, width } = this.getImageData()
        let bound = {
            top: null! as number,
            left: null! as number,
            right: null! as number,
            bottom: null! as number
        }
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] !== 0) {
                let x = (i / 4) % width
                let y = ~~((i / 4) / width)
                if (bound.top == null) {
                    bound.top = y
                }
                if (bound.left == null) {
                    bound.left = x
                } else if (x < bound.left) {
                    bound.left = x
                }
                if (bound.right == null) {
                    bound.right = x
                } else if (bound.right < x) {
                    bound.right = x
                }
                if (bound.bottom == null) {
                    bound.bottom = y
                } else if (bound.bottom < y) {
                    bound.bottom = y
                }
            }
        }
        let trimHeight = bound.bottom - bound.top
        let trimWidth = bound.right - bound.left
        return {
            top: bound.top,
            left: bound.left,
            width: trimWidth,
            height: trimHeight
        }
    }
}
