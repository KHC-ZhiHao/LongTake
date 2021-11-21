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
export const children = {
    code: `
        (longtake, LongTake) => {
            class DemoSprite extends LongTake.Sprite {
                constructor(isRoot) {
                    super()
                    this.isRoot = isRoot
                }
                create() {
                    this.resize(100, 100)
                    this.opacity = 200
                    this.setAnchor(0.5, 0.5)
                    if (this.isRoot) {
                        this.x = longtake.width / 2
                        this.y = longtake.height / 2
                    } else {
                        this.x = this.width - 10
                    }
                }
                update() {
                    if (this.isRoot) {
                        this.rotation += 1
                    }
                }
                render = () => {
                    let context = this.context
                    context.fillRect(0, 0, this.width, this.height)
                }
            }
            let s1 = new DemoSprite(true)
            let s2 = new DemoSprite()
            let s3 = new DemoSprite()
            s1.addChildren(s2)
            s2.addChildren(s3)
            longtake.addChildren(s1)
        }
    `
}
