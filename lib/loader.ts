import { Base } from './base'

/** 針對圖片預載入的載具 */

export class Loader extends Base {
    private data: Record<string, ImageBitmap | HTMLImageElement> = {}
    private files: Record<string, string> = {}
    private completed = 0
    private fileLength = 0
    private isStart = false
    constructor() {
        super('Loader')
    }

    /** 驗證檔案是否正確 */

    private validateFile(file: string | HTMLCanvasElement) {
        if (typeof file === 'string') {
            let type = file.split('.').pop()
            if (type) {
                if (['png', 'jpg'].indexOf(type) !== -1 || file.slice(0, 5) === 'data:') {
                    return file
                }

            }
        } else if (file instanceof Element) {
            if ((file as HTMLCanvasElement).tagName === 'CANVAS') {
                return file.toDataURL('image/png')
            }
        }
        throw this.systemError('validateFile', 'File type not allowed( png, jpg, canvas element, base64url ).', file)
    }

    /** 等待載入完成，若載入已完成，直接執行 callback */

    onload(callback: () => void) {
        if (this.completed >= this.fileLength) {
            callback()
        } else {
            setTimeout(() => this.onload(callback), 100)
        }
    }

    /** 執行載入 */

    start(loading?: (completed: number, fileLength: number) => void) {
        if (this.isStart) {
            return null
        }
        this.isStart = true
        for (let name in this.files) {
            let image = new Image()
            image.onload = () => {
                if (window.createImageBitmap) {
                    window.createImageBitmap(image).then(bitmap => {
                        this.data[name] = bitmap
                    })
                } else {
                    this.data[name] = image
                }
                this.completed += 1
                if (typeof loading === 'function') {
                    loading(this.completed, this.fileLength)
                }
                if (this.completed === this.fileLength) {
                    this.files = {}
                }
            }
            image.src = this.files[name]
        }
    }

    /** 加入一個等待載入檔案 */

    add(name: string, src: string) {
        if (this.files[name] == null) {
            this.fileLength += 1
            this.files[name] = this.validateFile(src)
        } else {
            this.systemError('add', 'Name conflict.', name)
        }
    }

    /** 取得一個載入完畢的檔案 */

    get(name: string) {
        if (this.data[name]) {
            return this.data[name]
        }
        this.systemError('get', 'Data not found.', name)
    }

    /** 清除指定資料 */

    remove(name: string) {
        if (this.data[name]) {
            delete this.data[name]
        }
    }

    /** 清除所有快取 */

    clear() {
        this.each(this.data, (data, key) => this.remove(key))
    }
}
