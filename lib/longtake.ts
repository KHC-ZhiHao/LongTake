import { Event } from './base'
import { Store } from './store'
import { Loader } from './loader'
import { helper } from './helper'
import { Animate } from './animate'
import { Container } from './container'
import { renderPack } from './render'
import { Debug, DebugOptions } from './debug'
import { ListenerGroup, pointer } from './event'
import { Sprite, ImageSprite, TextSprite } from './sprite'

type Channels = {
    addChild: {
        sprite: Sprite
    }
    keydown: {
        key: string
        code: string
    }
    keyup: {
        key: string
        code: string
    }
    click: {
        x: number
        y: number
    }
    pointerdown: {
        x: number
        y: number
    }
    pointermove: {
        x: number
        y: number
    }
    pointerup: {}
    update: {
        timeTick: number
        runningTime: number
    }
}

/** 核心 */

export class LongTake extends Event<Channels> {
    /** 繪製圖的寬 */
    readonly width: number
    /** 繪製圖的高 */
    readonly height: number
    private _stop: boolean = false
    private timeTick = 0
    private runningTime = 0
    private debug: Debug | null = null
    private remove = false
    private frame = 1000 / 60
    private frameTime = 0
    private frameTimeBuffer = 0
    private updateTimeBuffer = 0
    private updateFrequency = 1000 / 60
    /** 目前運行的canvas */
    private target: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private pointerEvent: ListenerGroup
    private listenerWindowGroup: ListenerGroup
    private listenerGroup: ListenerGroup
    /** 主要運行的container，由本核心驅動內部精靈的update和event */
    private container: Container
    private interactive = false
    private update = () => {
        if (this.remove === true) {
            return null
        }
        if (this._stop === false) {
            this.stageUpdate()
        }
        this.timeTick += 1
        this.emit('update', {
            timeTick: this.timeTick,
            runningTime: this.runningTime
        })
    }
    private renderFrame = (time: number) => {
        if (this.remove === false) {
            let diff = time - this.frameTime
            this.frameTime = time
            this.runningTime += diff
            this.frameTimeBuffer += diff
            this.updateTimeBuffer += diff
            if (this.frameTimeBuffer + 0.01 >= this.frame) {
                this.frameTimeBuffer = 0
                this.bitmapUpdate()
            }
            if (this.updateTimeBuffer >= this.updateFrequency) {
                this.updateTimeBuffer = 0
                this.update()
            }
            requestAnimationFrame(this.renderFrame)
        }
    }
    constructor(target: string | HTMLCanvasElement, width?: number, height?: number) {
        super('Main')
        this.target = typeof target === 'string' ? document.getElementById(target) as any : target
        this.context = this.target.getContext('2d')!
        this.context.imageSmoothingEnabled = false
        this.width = width != null ? width : this.target.width
        this.height = height != null ? height : this.target.height
        this.container = new Container(this.width, this.height, this)
        this.pointerEvent = new ListenerGroup(this.target)
        this.listenerGroup = new ListenerGroup(this.target)
        this.listenerWindowGroup = new ListenerGroup(window)
        this.listenerGroup.add('click', event => this.emit('click', {
            x: event.offsetX,
            y: event.offsetY
        }))
        this.listenerWindowGroup.add('keydown', event => this.emit('keydown', {
            key: event.key,
            code: event.keyCode
        }))
        this.listenerWindowGroup.add('keyup', event => this.emit('keyup', {
            key: event.key,
            code: event.keyCode
        }))
        this.on('click', (data) => {
            this.container.stage.eachChildren(child => child._onClick(data.x, data.y))
        })
        this.update()
        this.renderFrame(0)
    }

    static async getDeviceFrameRate(accuracy = 3) {
        if (window.requestAnimationFrame) {
            let count = accuracy
            let rates: number[] = []
            let handler = (): Promise<number> => {
                return new Promise((resolve) => {
                    window.requestAnimationFrame(t1 => {
                        window.requestAnimationFrame(t2 => {
                            resolve(1000 / (t2 - t1))
                        })
                    })
                })
            }
            while (true) {
                if (count === 0) {
                    break
                }
                rates.push(await handler())
                count -= 1
            }
            let valid = rates.slice(1)
            if (valid.length >= 1) {
                return Math.round(valid.reduce((a, b) => a + b, 0) / (valid.length))
            } else {
                return 60
            }
        } else {
            return 60
        }
    }

    static get version() {
        return '0.5.6'
    }

    static get helper() {
        return helper
    }

    static get renderPack() {
        return renderPack
    }

    static get Store() {
        return Store
    }

    static get Sprite() {
        return Sprite
    }

    static get ImageSprite() {
        return ImageSprite
    }

    static get TextSprite() {
        return TextSprite
    }

    static get Animate() {
        return Animate
    }

    static get Loader() {
        return Loader
    }

    get helper() {
        return helper
    }

    get isInteractive() {
        return this.interactive
    }

    get playing() {
        return this._stop === false
    }

    get isColse() {
        return this.remove
    }

    /** 指定渲染幀率 */

    setFrame(frame: number) {
        this.frame = 1000 / frame
    }

    /** 指定更新率 */

    setUpdateFrequency(frequency: number) {
        this.updateFrequency = frequency
    }

    /** 只渲染不觸發 update 鉤子 */

    stop() {
        this._stop = true
    }

    /** 如果為停止狀態的話繼續運行 */

    play() {
        this._stop = false
    }

    /** 獲取所有子精靈 */

    getAllChildren() {
        return this.container.stage.getAllChildren()
    }

    /** 啟用開發者模式 */

    enabledDebugMode(active = true, options: DebugOptions = {}) {
        if (active) {
            this.debug = new Debug(this, options)
        } else {
            if (this.debug) {
                this.debug.close()
            }
            this.debug = null
        }
    }

    /** 清空所有精靈 */

    clear() {
        this.container.stage.clearChildren()
    }

    /** 關閉這個Longtake */

    close() {
        this.remove = true
        this.pointerEvent.close()
        this.listenerGroup.close()
        this.listenerWindowGroup.close()
        this.container.stage.eachChildrenDeep(child => child._close())
        if (this.interactive) {
            this.interactive = false
            this.target.style.touchAction = 'auto'
        }
    }

    /** 加入一個精靈至 Container 底下 */

    addChildren(sprite: Sprite) {
        this.container.addChildren(sprite)
    }

    /** 獲取運行時間(毫秒) */

    getRunningTime() {
        return this.runningTime
    }

    /** 啟動互動模式 */

    enableInteractive() {
        if (this.interactive) {
            return null
        }
        this.interactive = true
        this.pointerEvent = pointer(this.target, {
            end: () => this.emit('pointerup', {}),
            move: ({ x, y }) => this.emit('pointermove', { x, y }),
            start: ({ x, y }) => this.emit('pointerdown', { x, y })
        })
        this.target.style.touchAction = 'none'
    }

    private stageUpdate() {
        this.container.stageUpdate()
    }

    private async bitmapUpdate() {
        this.container.stageRender()
        this.context.clearRect(0, 0, this.width, this.height)
        this.context.drawImage(this.container.bitmap.canvas, 0, 0, this.width, this.height)
        if (this.debug) {
            this.debug.render()
            this.context.drawImage(this.debug.bitmap.canvas, 0, 0, this.width, this.height)
        }
    }
}
