import { Base } from './base'
import { Sprite } from './sprite'
import { Bitmap } from './bitmap'
import { LongTake } from './longtake'

/** 一個靜態的精靈容器，負責呈現精靈與位圖的計算結果 */

export class Container extends Base {
    /** 指向LongTake */
    core: LongTake
    /** 主精靈 */
    stage: Sprite
    /** 主位圖 */
    bitmap: Bitmap = {} as any
    context: CanvasRenderingContext2D
    constructor(width: number, height: number, core: LongTake) {
        super('Container')
        this.core = core
        this.stage = new Sprite()
        this.bitmap = new Bitmap(width, height)
        this.context = this.bitmap.context
        this.stage._install(this)
        this.stage._status.isStage = true
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
        this.stage._mainUpdate()
    }

    stageRender() {
        this.stage._mainRender()
        this.draw()
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
            let needSave = this.needSave(sprite)
            if (sprite.antiAliasing === false) {
                this.context.imageSmoothingEnabled = false
            }
            if (needSave) {
                this.context.save()
                this.transform(sprite)
            }
            this.context.drawImage(sprite._bitmap.getRenderTarget(), screenX, screenY, sprite.width, sprite.height)
            if (sprite.antiAliasing === false) {
                this.context.imageSmoothingEnabled = true
            }
            let len = sprite._children.length
            for (let i = 0; i < len; i++) {
                this.render(sprite._children[i])
            }
            if (needSave) {
                this.context.restore()
            }
        }
    }

    private needSave(sprite: Sprite) {
        if (this.context.globalCompositeOperation === sprite.blendMode && sprite.opacity === 255 && sprite.isTransform() === false) {
            return false
        } else {
            return true
        }
    }

    transform(sprite: Sprite) {
        let context = this.context
        let blendMode = sprite.blendMode
        if (sprite.opacity !== 255) {
            context.globalAlpha = context.globalAlpha * (sprite.opacity / 255)
        }
        if (blendMode !== this.context.globalCompositeOperation) {
            context.globalCompositeOperation = blendMode as any
        }
        if (sprite.isTransform()) {
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
}
