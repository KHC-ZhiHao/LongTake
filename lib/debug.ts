import { Base } from './base'
import { Sprite } from './sprite'
import { Bitmap } from './bitmap'
import { LongTake } from './longtake'

export type DebugOptions = {}

class PositionBitmap extends Bitmap {
    constructor() {
        super(20, 20)
        this.context.strokeStyle = '#000'
        this.context.arc(10, 10, 6, 0, Math.PI * 2)
        this.context.stroke()
        this.context.beginPath()
        this.context.moveTo(0, 10)
        this.context.lineTo(20, 10)
        this.context.moveTo(10, 0)
        this.context.lineTo(10, 20)
        this.context.closePath()
        this.context.stroke()
        this.cacheImageBitmap()
    }
}

export class Debug extends Base {
    now = 0
    core: LongTake
    bitmap: Bitmap = {} as any
    options: DebugOptions
    context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
    selectSprite: Sprite | null = null
    listeners: any[] = []
    positionBitmap = new PositionBitmap()
    constructor(core: LongTake, options: DebugOptions) {
        super('Debug')
        this.core = core
        this.bitmap = new Bitmap(core.width, core.height)
        this.options = options
        this.context = this.bitmap.context
        this.bindDrag()
    }
    close() {
        this.listeners.forEach(listener => listener.off())
    }
    private bindDrag() {
        let dragging = false
        let dragX = 0
        let dragY = 0
        this.core.enableInteractive()
        this.listeners.push(this.core.on('pointerdown', ({ x, y }) => {
            if (this.core.playing === false && this.selectSprite && this.selectSprite.inRect(x, y)) {
                dragX = x
                dragY = y
                dragging = true
            }
        }))
        this.listeners.push(this.core.on('pointermove', ({ x, y }) => {
            let sprites = this.core.getAllChildren().reverse()
            this.selectSprite = null
            for (let sprite of sprites) {
                if (sprite.inRect(x, y)) {
                    this.selectSprite = sprite
                }
            }
            if (this.selectSprite && dragging) {
                this.selectSprite.x += x - dragX
                this.selectSprite.y += y - dragY
                dragX = x
                dragY = y
            }
        }))
        this.listeners.push(this.core.on('pointerup', () => {
            if (dragging) {
                dragging = false
            }
        }))
        this.listeners.push(this.core.on('click', ({ x, y }) => {
            if (x > 5 && y > 5 && x < 70 && y < 20) {
                if (this.core.playing) {
                    this.core.stop()
                } else {
                    this.core.play()
                }
            }
        }))
    }
    renderSprite(sprite: Sprite, color: string) {
        let context = this.context
        let { posX, posY } = sprite.getRealStatus()
        let { p0, p1, p2, p3 } = sprite.getRealRect()
        context.save()
        context.strokeStyle = color
        context.beginPath()
        context.arc(posX, posY, 6, 0, Math.PI * 2)
        context.stroke()
        context.beginPath()
        context.moveTo(posX - 10, posY)
        context.lineTo(posX + 10, posY)
        context.stroke()
        context.beginPath()
        context.moveTo(posX, posY - 10)
        context.lineTo(posX, posY + 10)
        context.stroke()
        context.beginPath()
        context.moveTo(p0.x, p0.y)
        context.lineTo(p1.x, p1.y)
        context.lineTo(p2.x, p2.y)
        context.lineTo(p3.x, p3.y)
        context.closePath()
        context.stroke()
        context.restore()
    }
    renderSpriteInfo() {
        let sprite = this.selectSprite
        if (sprite) {
            let context = this.context
            let line = 11
            let textBaseLine = 85
            let posX = sprite.posX
            let posY = sprite.posY
            context.fillStyle = '#000'
            context.fillRect(5, 67, 120, 13 * line + 15)
            context.fillStyle = '#fff'
            context.fillText(`X: ${sprite.x.toFixed(0)}, ${posX.toFixed(0)}`, 15, textBaseLine)
            context.fillText(`Y: ${sprite.y.toFixed(0)}, ${posY.toFixed(0)}`, 15, textBaseLine + 13 * 1)
            context.fillText(`W: ${sprite.width.toFixed(0)}`, 15, textBaseLine + 13 * 2)
            context.fillText(`H: ${sprite.height.toFixed(0)}`, 15, textBaseLine + 13 * 3)
            context.fillText(`SW: ${sprite.scaleWidth.toFixed(2)}`, 15, textBaseLine + 13 * 4)
            context.fillText(`SH: ${sprite.scaleHeight.toFixed(2)}`, 15, textBaseLine + 13 * 5)
            context.fillText(`A: ${sprite.anchorX.toFixed(2)}, ${sprite.anchorY.toFixed(2)}`, 15, textBaseLine + 13 * 6)
            context.fillText(`O: ${sprite.opacity.toFixed(2)}`, 15, textBaseLine + 13 * 7)
            context.fillText(`SX: ${sprite.skewX.toFixed(2)}`, 15, textBaseLine + 13 * 8)
            context.fillText(`SY: ${sprite.skewY.toFixed(2)}`, 15, textBaseLine + 13 * 9)
            context.fillText(`R: ${sprite.rotation.toFixed(2)}`, 15, textBaseLine + 13 * 10)
        }
    }
    render() {
        let now = performance.now()
        let context = this.context
        let fps = 1 / ((now - this.now) / 1000)
        this.bitmap.clear()
        this.now = now
        if (this.selectSprite) {
            this.renderSprite(this.selectSprite, 'blue')
            if (this.selectSprite.parent && this.selectSprite.parent._status.isStage === false) {
                this.renderSprite(this.selectSprite.parent, 'red')
            }
            this.selectSprite.eachChildrenDeep(sprite => this.renderSprite(sprite, 'green'))
            this.renderSpriteInfo()
        }
        context.fillStyle = this.core.playing ? 'green' : 'red'
        context.fillRect(5, 5, 70, 15)
        context.fillStyle = '#000'
        context.fillRect(5, 25, 70, 38)
        context.fillStyle = '#fff'
        context.fillText('FPS:' + fps.toFixed(1), 15, 42)
        context.fillText('SC:' + this.core.getAllChildren().length, 15, 54)
    }
}
