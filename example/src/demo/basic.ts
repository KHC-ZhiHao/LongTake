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
                            padding: 20,
                            round: 20
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
    },
    {
        name: 'blur',
        title: 'Blur',
        desc: '',
        code: /* javascript */ `
            (longtake, LongTake) => {
                class Bear extends LongTake.ImageSprite {
                    constructor(image) {
                        super(image, {
                            padding: 30
                        })
                        this.x = longtake.width / 2
                        this.y = longtake.height / 2
                        this.setAnchor(0.5)
                        this.on('inited', () => {
                            LongTake.renderPack.blur(this, {
                                radius: 10
                            })
                        })
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
    },
    {
        name: 'colorto',
        title: 'Colot To',
        desc: 'ImageSprite 可以透過 inited 事件在 image cache 之前搭配 renderPack 更改像素資源。',
        code: /* javascript */ `
            (longtake, LongTake) => {
                class Bear extends LongTake.ImageSprite {
                    constructor(image) {
                        super(image)
                        this.x = longtake.width / 2
                        this.y = longtake.height / 2
                        this.setAnchor(0.5)
                        this.on('inited', () => {
                            LongTake.renderPack.colorTo(this, {
                                color: 'blue',
                                alpha: 255 / 2
                            })
                        })
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
    },
    {
        name: 'feather',
        title: 'Feather',
        desc: '',
        code: /* javascript */ `
            (longtake, LongTake) => {
                class Bear extends LongTake.ImageSprite {
                    constructor(image) {
                        super(image)
                        this.x = longtake.width / 2
                        this.y = longtake.height / 2
                        this.setAnchor(0.5)
                        this.on('inited', () => {
                            LongTake.renderPack.feather(this, {
                                radius: 5,
                                strength: 5
                            })
                        })
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
