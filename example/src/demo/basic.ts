import { DemoAttr } from './index'

export const basic: DemoAttr[] = [
    {
        name: 'basic',
        title: 'Basic',
        desc: '快速建立一個 Sprite。',
        code: /* javascript */`
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
    },
    {
        name: 'children',
        title: 'Children',
        desc: '可以在 Sprite 加入子代，下列例子示範如何繼承透明度。',
        code: /* javascript */ `
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
    },
    {
        name: 'text',
        title: 'Text',
        desc: '透過 TextSprite 可以繪製一個符合文字長度的 Sprite。',
        code: /* javascript */ `
            (longtake, LongTake) => {
                class Text extends LongTake.TextSprite {
                    constructor(text) {
                        super({
                            color: 'blue',
                            fontSize: 48,
                            backgroundColor: '#FF0000',
                            resolution: 2,
                            padding: 20
                        })
                        this.x = longtake.width / 2
                        this.y = longtake.height / 2
                        this.setAnchor(0.5)
                        this.setContent(text)
                    }
                }
                longtake.addChildren(new Text('Hello Big World!'))
            }
        `
    },
    {
        name: 'image',
        title: 'Image',
        desc: '透過 ImageSprite 可以輕鬆顯示圖片。',
        code: /* javascript */ `
            (longtake, LongTake) => {
                class Bear extends LongTake.ImageSprite {
                    constructor(image) {
                        super(image)
                        this.x = longtake.width / 2
                        this.y = longtake.height / 2
                        this.setAnchor(0.5)
                    }
                    update() {
                        this.rotation += 1
                    }
                }
                let image = new Image()
                image.src = 'images/KaohBear.png'
                image.onload = () => {
                    longtake.addChildren(new Bear(image))
                }
            }
        `
    }
]
