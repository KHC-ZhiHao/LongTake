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
                    render() {
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
        name: 'high_refresh_rate',
        title: 'Height Refresh Rate',
        desc: '由於 Longtake 本意是讓人無腦建立簡單動畫，所以所有刷新率都是基於 60 fps 出發的，但也可以透過一些手段開啟高刷新率動畫。',
        code: /* javascript */ `
            (longtake, LongTake) => {
                const status = {
                    fps: 60
                }
                class Text extends LongTake.TextSprite {
                    constructor(content) {
                        super({
                            fontSize: 48,
                            resolution: 2,
                            padding: 20,
                            round: 20
                        })
                        this.x = longtake.width / 2
                        this.y = longtake.height / 2 - 150
                        this.setAnchor(0.5)
                        this.setContent(content)
                    }
                }
                class Bear extends LongTake.ImageSprite {
                    constructor(image) {
                        super(image)
                        this.x = longtake.width / 2 - 100
                        this.y = longtake.height / 2
                        this.setAnchor(0.5)
                        // 每個動畫的推動也要配合現在的 fps
                        this.animate = new LongTake.Animate({
                            push: 1000 / status.fps,
                            duration: 2000,
                            alternate: true,
                            easing: 'easeInOutQuint',
                            action: (t) => {
                                this.x = (longtake.width / 2 - 100) + (200 * t)
                                this.rotation = 360 * t
                            }
                        })
                    }
                    update() {
                        this.animate.move()
                    }
                }
                LongTake.getDeviceFrameRate().then(rate => {
                    // 將刷新率等同於裝置最大刷新率
                    longtake.setFrame(rate)
                    longtake.setUpdateFrequency(1000 / rate)
                    status.fps = rate
                    const image = new Image()
                    const text = new Text(rate + ' FPS')
                    image.src = 'images/KaohBear.png'
                    image.onload = () => {
                        longtake.addChildren(text)
                        longtake.addChildren(new Bear(image))
                    }
                    let int = setInterval(() => {
                        if (longtake.isColse === false) {
                            LongTake.getDeviceFrameRate().then(rate => {
                                text.setContent(rate + ' FPS')
                            })
                        } else {
                            clearInterval(int)
                        }
                    }, 1000)
                })
            }
        `
    }
]
