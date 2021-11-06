import { Base } from './base'
import { Core } from './core'
import { Sprite } from './sprite'
import { Bitmap } from './bitmap'

/**一個靜態的精靈容器，負責呈現精靈與位圖的計算結果 */

export class Container extends Base {

    core: Core
    /** 主精靈 */
    stage = new Sprite('Stage')
    /** 主位圖 */
    bitmap: Bitmap
    /** 當 Container 綁定 Core 時，該值會隨著鼠標或觸碰位置改變 */
    pointerX = 0
    /** 當 Container 綁定 Core 時，該值會隨著鼠標或觸碰位置改變 */
    pointerY = 0
    
    private stackOpacity: number[] = []
    constructor(width: number, height: number, core: Core) {
        super('Container')
        this.core = core || null
        this.stage.resize(0, 0)
        this.stage.render = () => this.stage.cache()
        this.bitmap = new Bitmap()
        this.bitmap.resize(width, height)
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
        if (sprite.canShow()) {
            let screenX = Math.round(sprite.screenX)
            let screenY = Math.round(sprite.screenY)
            let realPosition = sprite.getRealPosition()
            this.transform(sprite)
            if (realPosition.x < this.width && realPosition.y < this.height) {
                let image = sprite.bitmap.getRenderTarget()
                if (image) {
                    this.bitmap.context.drawImage(image, screenX, screenY)
                }
            }
            sprite.eachChildren(child => this.render(child))
            this.restore(sprite)
        }
    }

    transform(sprite: Sprite) {
        let context = this.bitmap.context
        if (sprite.scaleHeight !== 1 || sprite.scaleWidth !== 1) {
            context.save()
        }
        if (sprite.opacity !== 255) {
            this.stackOpacity.push(sprite.opacity)
            const alpha = this.stackOpacity.reduce((a, b) =>  a + b, 0)
            context.globalAlpha = alpha / (255 * this.stackOpacity.length)
        }
        if (sprite.blendMode !== 'source-over') {
            context.globalCompositeOperation = sprite.blendMode
        }
        if (sprite.hasTransform() === false) {
            return null
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
            context.transform( 1, sprite.skewX, sprite.skewY, 1, 0, 0 )
        }
        context.translate(-posX, -posY)
    }

    restore(sprite: Sprite) {
        let context = this.bitmap.context
        if (sprite.scaleHeight !== 1 || sprite.scaleWidth !== 1) {
            context.restore()
            return null
        }
        if (sprite.opacity !== 255) {
            this.stackOpacity.pop()
            if (this.stackOpacity.length === 0) {
                context.globalAlpha = 1
            } else {
                const alpha = this.stackOpacity.reduce((a, b) => a + b, 0)
                context.globalAlpha = alpha / (255 * this.stackOpacity.length)
            }
        }
        if (sprite.blendMode !== 'source-over') {
            context.globalCompositeOperation = 'source-over'
        }
        if (sprite.hasTransform() === false) {
            return null
        }
        let posX = sprite.posX
        let posY = sprite.posY
        context.translate(posX, posY)
        if (sprite.rotation !== 0) {
            context.rotate(-(sprite.rotation * sprite.helper.arc))
        }
        if (sprite.skewX !== 0 || sprite.skewY !== 0) {
            context.transform(1, -sprite.skewX, -sprite.skewY, 1, 0, 0)
        }
        context.translate(-posX, -posY)
    }
}
