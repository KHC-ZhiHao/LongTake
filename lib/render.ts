import { Sprite } from './sprite'
class Render {
    sprite: Sprite
    constructor(sprite: Sprite) {
        this.sprite = sprite
    }
    totalSizeBorder(color: string) {
        let context = this.sprite.context
        context.save()
        context.restore()
    }
}
