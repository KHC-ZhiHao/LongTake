import { DemoAttr } from './index'

export const render: DemoAttr[] = [
    {
        name: 'blur',
        title: 'Blur',
        desc: '將精靈圖像模糊化，這非常耗效能，請善用 cache 。',
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
        title: 'Color To',
        desc: '將精靈蓋上一層顏色。',
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
        desc: '羽化圖像邊緣。',
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
