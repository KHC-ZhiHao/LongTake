export const basic = {
    code: `
        (longtake, LongTake) => {
            let sprite = new LongTake.Sprite('basic')
            sprite.create = () => {
                sprite.x = longtake.width / 2
                sprite.y = longtake.height / 2
                sprite.resize(20, 20)
                sprite.setAnchor(0.5, 0.5)
            }
            sprite.update = () => {
                sprite.rotation += 1
            }
            sprite.render = () => {
                let context = sprite.context
                context.fillRect(0, 0, sprite.width, sprite.height)
            }
            longtake.addChildren(sprite)
        }
    `
}
