import { Base } from './base'
import { Container } from './container'
import { Sprite } from './sprite'
import { Loader } from './loader'
import { Animate } from './animate'

class Camera {
    x = 0
    y = 0
    core: LongTake
    constructor(core: LongTake) {
        this.core = core
    }

    get offsetX() {
        return this.checkBorder(this.x, this.core.width * this.core.viewScale, this.core.targetRect.width)
    }

    get offsetY() {
        return this.checkBorder(this.y, this.core.height * this.core.viewScale, this.core.targetRect.height)
    }

    checkBorder(now: number, view: number, target: number) {
        now = now * this.core.viewScale
        let front = target / 2
        let back = view - front
        return now > front ? (now > back ? view - target : (now - front) / this.core.viewScale) : 0
    }
}

/** 核心 */

export class LongTake extends Base {
    /** 繪製圖的寬 */
    width: number
    /** 繪製圖的高 */
    height: number
    ticker = 0
    remove = false
    /** 目前運行的canvas */
    target: HTMLCanvasElement
    context: CanvasRenderingContext2D
    /** 目前實際運行的fps */
    baseFps = 0
    /** 整體視圖倍率 */
    viewScale = 1
    /** 目前運行的偵數 */
    framePerSecond = 60
    bindUpdate = this.update.bind(this)
    /** 目前運行的canvas實際大小 */
    targetRect: DOMRect
    /** 主要運行的container，由本核心驅動內部精靈的update和event */
    container: Container
    event: Record<string, (event: any) => void> = {}
    eventAction: Record<string, any> = {}
    private requestAnimationFrame: (callback: any) => number
    private camera = new Camera(this)
    private bindWindowResize = this.windowResize.bind(this)
    constructor(target: string | HTMLCanvasElement, width: number, height: number) {
        super('Main')
        this.target = typeof target === 'string' ? document.getElementById(target) as any : target
        this.context = this.target.getContext('2d')!
        this.width = width
        this.height = height
        this.container = new Container(this.width, this.height, this)
        this.targetRect = this.target.getBoundingClientRect()
        this.requestAnimationFrame = window.requestAnimationFrame || (callback => setTimeout(callback, 1000 / 60))
        this.addEvent('click', this.resetPointerCoordinate)
        this.addEvent('pointermove', this.resetPointerCoordinate)
        this.windowResize()
        this.update()
        window.addEventListener('resize', this.bindWindowResize)
    }

    static get Sprite() {
        return Sprite
    }

    static get Animate() {
        return Animate
    }

    static get Loader() {
        return Loader
    }

    /** 設置動畫的FPS */

    setFPS(fps: number) {
        if (typeof fps === 'number' && fps > 0 && fps <= 60) {
            this.framePerSecond = fps
        } else {
            this.systemError('setFPS', 'FPS must between 1 to 60.', fps)
        }
    }

    /** 關閉這個Longtake */

    close() {
        this.remove = true
        this.container.stage.eachChildrenDeep((child) => {
            child.close()
        })
        window.removeEventListener('resize', this.bindWindowResize)
    }

    /** 移動鏡頭至 x,y */

    setCamera(x: number, y: number) {
        this.camera.x = x
        this.camera.y = y
    }

    /** 監聽一個事件 */

    addEvent(eventName: string, callback?: (event: any) => void) {
        if (this.event[eventName] == null) {
            this.event[eventName] = (event) => {
                if (this.eventAction[eventName] == null) {
                    this.eventAction[eventName] = event
                    if (callback) {
                        callback.bind(this)(event)
                    }
                }
            }
            this.target.addEventListener(eventName, this.event[eventName])
        }
    }

    /** 重新設定矯正過後的觸及位置 */

    resetPointerCoordinate(event: { offsetX: number, offsetY: number }) {
        this.container.pointerX = (event.offsetX / this.viewScale + this.camera.offsetX) * (this.target.width / this.targetRect.width)
        this.container.pointerY = (event.offsetY / this.viewScale + this.camera.offsetY) * (this.target.height / this.targetRect.height)
    }

    /** 調整視圖 canvas 的大小 */

    targetResize(width: number, height: number) {
        this.target.width = width
        this.target.height = height
        this.targetRect = this.target.getBoundingClientRect()
    }

    windowResize() {
        this.targetRect = this.target.getBoundingClientRect()
        this.onWindowResize()
    }

    /** 當畫面旋轉或縮放時觸發該function(自定義) */

    onWindowResize() { /* module set */ }

    /** 縮放視圖倍率至指定element大小(cover縮放模式) */

    forElementResize(element: HTMLElement, scale = 1) {
        this.targetResize(element.clientWidth, element.clientHeight)
        if (element.clientWidth / this.width < element.clientHeight / this.height) {
            this.viewScale = element.clientHeight / this.height * scale
        } else {
            this.viewScale = element.clientWidth / this.width * scale
        }
        this.context.restore()
        this.context.save()
        this.context.scale(this.viewScale, this.viewScale)
    }

    /** 加入一個精靈至 container 底下 */

    addChildren(sprite: Sprite) {
        this.container.addChildren(sprite)
    }

    update() {
        if (this.remove === true) {
            window.cancelAnimationFrame(this.ticker)
            return null
        }
        this.baseFps += this.framePerSecond
        this.stageUpdate()
        if (this.baseFps >= 60) {
            this.bitmapUpdate()
            this.baseFps = this.baseFps % 60
        }
        this.eventAction = {}
        this.ticker = this.requestAnimationFrame(this.bindUpdate)
    }

    stageUpdate() {
        this.container.stage.mainEvent(this.eventAction)
        this.container.stageUpdate()
    }

    bitmapUpdate() {
        this.container.stageRender()
        this.context.clearRect(0, 0, this.width, this.height)
        this.context.drawImage(this.container.bitmap.canvas, - this.camera.offsetX, -this.camera.offsetY)
    }
}
