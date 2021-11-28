import { Base } from './base'
import { Sprite } from './sprite'
import { Bitmap } from './bitmap'
import { LongTake } from './longtake'

/** 一個靜態的精靈容器，負責呈現精靈與位圖的計算結果 */

export class Container extends Base {
    /** 是否指向LongTakeCore */
    core: LongTake | null = null
    /** 主精靈 */
    stage: Sprite
    /** 主位圖 */
    bitmap: Bitmap = {} as any
    context: CanvasRenderingContext2D
    /** 當此Container指向LongTakeCore時，該值會隨著鼠標或觸碰位置改變 */
    pointerX = 0
    /** 當此Container指向LongTakeCore時，該值會隨著鼠標或觸碰位置改變 */
    pointerY = 0
    constructor(width: number, height: number, core?: LongTake) {
        super('Container')
        this.core = core || null
        this.stage = new Sprite('Stage')
        this.bitmap = new Bitmap(width, height)
        this.context = this.bitmap.context
        this.stage.install(this)
        this.stage.resize(0, 0)
        this.stage.blendMode = 'source-over'
        this.stage.render = () => this.stage.cache()
    }

    /** 位圖寬(與位圖同步) */
    get width() {
        return this.bitmap.canvas.width
    }
    /** 位圖高(與位圖同步) */
    get height() {
        return this.bitmap.canvas.height
    }

    stageUpdate() {
        this.stage.mainUpdate()
    }

    stageRender() {
        this.stage.mainRender()
        this.draw()
    }

    /** 獲取該 Container 的 ImageBitmap */

    getImageBitmap(callback: (canvas: HTMLCanvasElement) => void) {
        callback(this.bitmap.canvas)
    }

    /** 加入一個子精靈 */

    addChildren(sprite: Sprite) {
        this.stage.addChildren(sprite)
    }

    draw() {
        this.bitmap.clear()
        this.render(this.stage)
    }

    render(sprite: Sprite) {
        if (sprite.canShow) {
            let screenX = Math.round(sprite.screenX)
            let screenY = Math.round(sprite.screenY)
            let realPosition = sprite.getRealPosition()
            this.context.save()
            this.transform(sprite)
            if (realPosition.x < this.width && realPosition.y < this.height) {
                this.context.drawImage(sprite.bitmap.getRenderTarget(), screenX, screenY)
            }
            let len = sprite.children.length
            for (let i = 0; i < len; i++) {
                this.render(sprite.children[i])
            }
            this.context.restore()
        }
    }

    transform(sprite: Sprite) {
        let context = this.context
        context.globalAlpha = context.globalAlpha * (sprite.opacity / 255)
        context.globalCompositeOperation = sprite.blendMode
        if (sprite.isTransform() === false) {
            return
        }
        let posX = sprite.posX
        let posY = sprite.posY
        context.translate(posX, posY)
        if (sprite.scaleHeight !== 1 || sprite.scaleWidth !== 1) {
            context.scale(sprite.scaleWidth, sprite.scaleHeight)
        }
        if (sprite.rotation !== 0) {
            context.rotate(sprite.rotation * sprite.helper.arc)
        }
        if (sprite.skewX !== 0 || sprite.skewY !== 0) {
            context.transform(1, sprite.skewX, sprite.skewY, 1, 0, 0)
        }
        context.translate(-(posX), -(posY))
    }
}
