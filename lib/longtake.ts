import { Base } from './base'
import { Container } from './container'
import { Loader } from './loader'
import { helper } from './helper'
import { Animate } from './animate'
import { Sprite, ImageSprite } from './sprite'

class Camera {
    x = 0
    y = 0
    core: LongTake
    constructor(core: LongTake) {
        this.core = core
    }

    get offsetX() {
        return this.checkBorder(this.x, this.core.width, this.core.targetRect.width)
    }

    get offsetY() {
        return this.checkBorder(this.y, this.core.height, this.core.targetRect.height)
    }

    checkBorder(now: number, view: number, target: number) {
        now = now
        let front = target / 2
        let back = view - front
        return now > front ? (now > back ? view - target : (now - front)) : 0
    }
}

/** 核心 */

export class LongTake extends Base {
    /** 目前運行的canvas實際大小 */
    targetRect: DOMRect
    event: Record<string, (event: any) => void> = {}
    eventAction: Record<string, any> = {}
    /** 繪製圖的寬 */
    readonly width: number
    /** 繪製圖的高 */
    readonly height: number
    private ticker: any = null
    private remove = false
    /** 目前運行的canvas */
    private target: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    /** 主要運行的container，由本核心驅動內部精靈的update和event */
    private container: Container
    private camera = new Camera(this)
    private bindUpdate = this.update.bind(this)
    private bindWindowResize = this.windowResize.bind(this)
    private supportRequestAnimationFrame = !!window.requestAnimationFrame
    private requestAnimationFrame = (callback: any) => {
        if (this.supportRequestAnimationFrame) {
            return window.requestAnimationFrame(callback)
        } else {
            return setTimeout(callback, 1000 / 60)
        }
    }
    constructor(target: string | HTMLCanvasElement, width: number, height: number) {
        super('Main')
        this.target = typeof target === 'string' ? document.getElementById(target) as any : target
        this.context = this.target.getContext('2d')!
        this.width = width
        this.height = height
        this.container = new Container(this.width, this.height, this)
        this.targetRect = this.target.getBoundingClientRect()
        this.addEvent('click', this.resetPointerCoordinate)
        this.addEvent('pointermove', this.resetPointerCoordinate)
        this.windowResize()
        this.update()
        window.addEventListener('resize', this.bindWindowResize)
    }

    static get helper() {
        return helper
    }

    static get Sprite() {
        return Sprite
    }

    static get ImageSprite() {
        return ImageSprite
    }

    static get Animate() {
        return Animate
    }

    static get Loader() {
        return Loader
    }

    /** 清空所有精靈 */

    clear() {
        this.container.stage.clearChildren()
    }

    /** 關閉這個Longtake */

    close() {
        this.clear()
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

    /** 加入一個精靈至 container 底下 */

    addChildren(sprite: Sprite) {
        this.container.addChildren(sprite)
    }

    /** 重新設定矯正過後的觸及位置 */

    private resetPointerCoordinate(event: { offsetX: number, offsetY: number }) {
        this.container.pointerX = (event.offsetX + this.camera.offsetX) * (this.target.width / this.targetRect.width)
        this.container.pointerY = (event.offsetY + this.camera.offsetY) * (this.target.height / this.targetRect.height)
    }

    private windowResize() {
        this.targetRect = this.target.getBoundingClientRect()
    }

    private update() {
        if (this.remove === true) {
            if (this.supportRequestAnimationFrame) {
                window.cancelAnimationFrame(this.ticker)
            } else {
                window.clearTimeout(this.ticker)
            }
            return null
        }
        this.stageUpdate()
        this.bitmapUpdate()
        this.eventAction = {}
        this.ticker = this.requestAnimationFrame(this.bindUpdate)
    }

    private stageUpdate() {
        this.container.stage.mainEvent(this.eventAction)
        this.container.stageUpdate()
    }

    private bitmapUpdate() {
        this.container.stageRender()
        this.context.clearRect(0, 0, this.width, this.height)
        this.context.drawImage(this.container.bitmap.canvas, - this.camera.offsetX, -this.camera.offsetY)
    }
}
