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
    core: LongTake
    bitmap: Bitmap = {} as any
    options: DebugOptions
    context: CanvasRenderingContext2D
    positionBitmap = new PositionBitmap()
    constructor(core: LongTake, options: DebugOptions) {
        super('Container')
        this.core = core
        this.bitmap = new Bitmap(core.width, core.height)
        this.options = options
        this.context = this.bitmap.context
        this.bindEvent()
    }
    private bindEvent() {
        let click = () => console.log('123')
        let sprites = this.core.stage.getTotalChildren()
        for (let sprite of sprites) {
            sprite.on('click', click)
        }
        this.core.on('addChild', ({ sprite }) => {
            sprite.on('click', click)
        })
    }
    render() {
        this.bitmap.clear()
        let context = this.context
        let sprites = this.core.stage.getTotalChildren()
        for (let sprite of sprites) {
            let posX = sprite.posX
            let posY = sprite.posY
            let size = sprite.getRealSize()
            let position = sprite.getRealPosition()
            context.drawImage(this.positionBitmap.getRenderTarget(), posX - 10, posY - 10)
            let rx = sprite.screenX
            let ry = sprite.screenY
            context.strokeRect(position.x, position.y, size.width, size.height)
        }
    }
}
