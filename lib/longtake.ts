import { Debug, DebugOptions } from './debug'
import { Event } from './base'
import { Loader } from './loader'
import { helper } from './helper'
import { Animate } from './animate'
import { Container } from './container'
import { Sprite, ImageSprite, TextSprite } from './sprite'
import { ListenerGroup, pointer } from './event'
import { renderPack } from './render'

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
}

/** 核心 */

export class LongTake extends Event<Channels> {
    /** 繪製圖的寬 */
    readonly width: number
    /** 繪製圖的高 */
    readonly height: number
    private _stop: boolean = false
    private debug: Debug | null = null
    private ticker: any = null
    private remove = false
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
            if (this.supportRequestAnimationFrame) {
                window.cancelAnimationFrame(this.ticker)
            } else {
                window.clearTimeout(this.ticker)
            }
            return null
        }
        if (this._stop === false) {
            this.stageUpdate()
        }
        this.bitmapUpdate()
        this.ticker = this.requestAnimationFrame(this.update)
    }
    private supportRequestAnimationFrame = !!window.requestAnimationFrame
    private requestAnimationFrame = (callback: any) => {
        if (this.supportRequestAnimationFrame) {
            return window.requestAnimationFrame(callback)
        } else {
            return setTimeout(callback, 1000 / 60)
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
    }

    static get version() {
        return '1.0'
    }

    static get helper() {
        return helper
    }

    static get renderPack() {
        return renderPack
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
