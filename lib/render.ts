import { Sprite } from './sprite'
import { helper } from './helper'

export const renderPack = {
    /** 邊緣羽化 */
    feather(sprite: Sprite, options: Partial<{
        radius: number
        strength: number
    }> = {}) {
        let radius = Math.floor(helper.ifEmpty(options.radius, 3))
        let strength = Math.floor(helper.ifEmpty(options.strength, 3))
        let canvas = sprite._bitmap.canvas
        let context = sprite.context
        let copy = document.createElement('canvas')
        copy.width = sprite._bitmap.width
        copy.height = sprite._bitmap.height
        let copyContext = copy.getContext('2d')
        copyContext?.drawImage(canvas, 0, 0)
        context.save()
        context.fillStyle = '#000'
        context.fillRect(0, 0, sprite.width, sprite.height)
        context.globalCompositeOperation = 'destination-out'
        context.drawImage(copy, 0, 0)
        context.globalCompositeOperation = 'source-over'
        context.shadowColor = '#000'
        context.shadowOffsetX = 0
        context.shadowOffsetY = 0
        context.shadowBlur = radius
        for (let i = 0; i < strength; i++) {
            context.drawImage(canvas, 0, 0)
        }
        context.shadowBlur = 0
        context.globalCompositeOperation = 'source-out'
        context.drawImage(copy, 0, 0)
        context.restore()
    },
    /** 高斯模糊 */
    blur(sprite: Sprite, options: Partial<{
        radius: number
    }> = {}) {
        sprite.context.save()
        let radius = Math.floor(helper.ifEmpty(options.radius, 5))
        let imgData = sprite._bitmap.getImageData()
        let pixes = new Uint8ClampedArray(imgData.data)
        let gaussMatrix = []
        let gaussSum = 0
        let x = 0
        let y = 0
        let r = 0
        let g = 0
        let b = 0
        let a = 0
        let i = 0
        let j = 0
        let k = 0
        let w = 0
        const width = imgData.width
        const height = imgData.height
        a = 1 / (Math.sqrt(2 * Math.PI) * radius)
        b = -1 / (2 * radius * radius)
        for (i = -radius; i <= radius; i++) {
            gaussMatrix.push(a * Math.exp(b * i * i))
        }
        for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
                r = g = b = a = gaussSum = 0
                for (j = -radius; j <= radius; j++) {
                    k = x + j
                    if (k >= 0 && k < width) {
                        i = (y * width + k) * 4
                        w = gaussMatrix[j + radius]
                        r += pixes[i] * w
                        g += pixes[i + 1] * w
                        b += pixes[i + 2] * w
                        a += pixes[i + 3] * w
                        gaussSum += w
                    }
                }
                i = (y * width + x) * 4
                imgData.data.set([r, g, b, a].map(v => v / gaussSum), i)
            }
        }
        pixes.set(imgData.data)
        for (x = 0; x < width; x++) {
            for (y = 0; y < height; y++) {
                r = g = b = a = gaussSum = 0
                for (j = -radius; j <= radius; j++) {
                    k = y + j
                    if (k >= 0 && k < height) {
                        i = (k * width + x) * 4
                        w = gaussMatrix[j + radius]
                        r += pixes[i] * w
                        g += pixes[i + 1] * w
                        b += pixes[i + 2] * w
                        a += pixes[i + 3] * w
                        gaussSum += w
                    }
                }
                i = (y * width + x) * 4
                imgData.data.set([r, g, b, a].map(v => v / gaussSum), i)
            }
        }
        sprite.context.putImageData(imgData, 0, 0)
        sprite.context.restore()
    },
    /** 將精靈覆蓋上指定顏色 */
    colorTo: (sprite: Sprite, options: Partial<{
        color: string
        alpha: number
    }> = {}) => {
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
