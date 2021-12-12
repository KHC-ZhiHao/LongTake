import { Sprite } from './sprite'
import { helper } from './helper'

export const renderPack = {
    /** 將精靈覆蓋上指定顏色 */
    colorTo: (sprite: Sprite, options: Partial<{
        color: string
        alpha: number
    }>) => {
        let color = helper.ifEmpty(options.color, '#000')
        let alpha = helper.ifEmpty(options.alpha, 255)
        sprite.context.save()
        sprite.context.globalAlpha = alpha / 255
        sprite.context.globalCompositeOperation = 'source-atop'
        sprite.context.fillStyle = color
        sprite.context.fillRect(0, 0, sprite.width, sprite.height)
        sprite.context.globalCompositeOperation = 'source-over'
        sprite.context.restore()
    },
    /** 繪製填滿的圓角矩形 */
    fillRoundRect: (sprite: Sprite, options: Partial<{
        round: number
        color: string
    }> = {}) => {
        let round = helper.ifEmpty(options.round, 0)
        let color = helper.ifEmpty(options.color, '#000')
        let width = sprite.width
        let height = sprite.height
        let roundOffset = round / 2
        sprite.context.save()
        sprite.context.lineJoin = 'round'
        sprite.context.lineWidth = round
        sprite.context.fillStyle = color
        sprite.context.strokeStyle = color
        sprite.context.fillRect(roundOffset, roundOffset, width - round, height - round)
        sprite.context.strokeRect(roundOffset, roundOffset, width - round, height - round)
        sprite.context.restore()
    }
}
