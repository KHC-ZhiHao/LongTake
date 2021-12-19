import { Base } from './base'
import { Sprite, TextSprite } from './sprite'
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
    context: CanvasRenderingContext2D
    selectSprite: Sprite | null = null
    positionBitmap = new PositionBitmap()
    constructor(core: LongTake, options: DebugOptions) {
        super('Container')
        this.core = core
        this.bitmap = new Bitmap(core.width, core.height)
        this.options = options
        this.context = this.bitmap.context
        this.bindEvent()
        this.bindDrag()
    }
    private bindDrag() {
        let dragging = false
        this.core.enableInteractive()
        this.core.on('pointerdown', ({ x, y }) => {
            if (this.selectSprite && this.selectSprite.inRect(x, y)) {
                dragging = true
            }
        })
        this.core.on('pointermove', ({ x, y }) => {
            let sprites = this.core.stage.getTotalChildren().reverse()
            this.selectSprite = null
            for (let sprite of sprites) {
                if (sprite.inRect(x, y)) {
                    this.selectSprite = sprite
                }
            }
            if (this.selectSprite && dragging) {
                this.selectSprite.moveByScreen(x, y)
            }
        })
        this.core.on('pointerup', () => {
            if (dragging) {
                dragging = false
            }
        })
    }
    private bindEvent() {
        this.core.on('click', ({ x, y }) => {
            if (x > 5 && y > 5 && x < 70 && y < 15) {
                if (this.core.playing) {
                    this.core.stop()
                } else {
                    this.core.play()
                }
            }
        })
    }
    renderSprite(sprite: Sprite) {
        let context = this.context
        let posX = sprite.screenPosX
        let posY = sprite.screenPosY
        let { p0, p1, p2, p3 } = sprite.getRealRect()
        context.drawImage(this.positionBitmap.getRenderTarget(), posX - 10, posY - 10)
        context.beginPath()
        context.moveTo(p0.x, p0.y)
        context.lineTo(p1.x, p1.y)
        context.lineTo(p2.x, p2.y)
        context.lineTo(p3.x, p3.y)
        context.closePath()
        context.stroke()
    }
    renderSpriteInfo() {
        let sprite = this.selectSprite
        if (sprite) {
            let context = this.context
            let line = 9
            let textBaseLine = 85
            let posX = sprite.screenPosX
            let posY = sprite.screenPosY
            context.fillStyle = '#000'
            context.fillRect(5, 67, 120, 13 * line + 15)
            context.fillStyle = '#fff'
            context.fillText(`X: ${sprite.x.toFixed(0)}, ${posX.toFixed(0)}`, 15, textBaseLine)
            context.fillText(`Y: ${sprite.y.toFixed(0)}, ${posY.toFixed(0)}`, 15, textBaseLine + 13 * 1)
            context.fillText(`W: ${sprite.width.toFixed(0)}, ${sprite.screenWidth.toFixed(0)}`, 15, textBaseLine + 13 * 2)
            context.fillText(`H: ${sprite.height.toFixed(0)}, ${sprite.screenHeight.toFixed(0)}`, 15, textBaseLine + 13 * 3)
            context.fillText(`A: ${sprite.anchorX.toFixed(2)}, ${sprite.anchorY.toFixed(2)}`, 15, textBaseLine + 13 * 4)
            context.fillText(`O: ${sprite.opacity.toFixed(2)}`, 15, textBaseLine + 13 * 5)
            context.fillText(`SX: ${sprite.skewX.toFixed(2)}, ${sprite.screenSkewX.toFixed(2)}`, 15, textBaseLine + 13 * 6)
            context.fillText(`SY: ${sprite.skewY.toFixed(2)}, ${sprite.screenSkewY.toFixed(2)}`, 15, textBaseLine + 13 * 7)
            context.fillText(`R: ${sprite.rotation.toFixed(2)}, ${sprite.screenRotation.toFixed(2)}`, 15, textBaseLine + 13 * 8)
        }
    }
    render() {
        let now = performance.now()
        let context = this.context
        let fps = 1 / ((now - this.now) / 1000)
        this.bitmap.clear()
        this.now = now
        if (this.selectSprite) {
            this.renderSprite(this.selectSprite)
            if (this.selectSprite.parent && this.selectSprite.parent !== this.core.stage) {
                this.renderSprite(this.selectSprite.parent)
            }
            this.selectSprite.eachChildrenDeep(sprite => this.renderSprite(sprite))
            this.renderSpriteInfo()
        }
        context.fillStyle = this.core.playing ? 'green' : 'red'
        context.fillRect(5, 5, 70, 15)
        context.fillStyle = '#000'
        context.fillRect(5, 25, 70, 38)
        context.fillStyle = '#fff'
        context.fillText('FPS:' + fps.toFixed(1), 15, 42)
        context.fillText('SC:' + this.core.stage.getTotalChildren().length, 15, 54)
    }
}
