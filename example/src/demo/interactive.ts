import { DemoAttr } from './index'

export const interactive: DemoAttr[] = [
    {
        name: 'click',
        title: 'Click',
        desc: '透過 on("click") 可以監聽 Sprite 是否有被點擊。',
        code: /* javascript */ `
            (longtake, LongTake) => {
                class Button extends LongTake.Sprite {
                    constructor(x, y) {
                        super()
                        this.count = 0
                        this.x = x
                        this.y = y
                        this.setAnchor(0.5)
                        this.on('click', () => {
                            this.count += 1
                            this.unCache()
                        })
                    }
                    render() {
                        this.context.fillStyle = '#000'
                        this.context.fillRect(0, 0, this.width, this.height)
                        this.context.fillStyle = '#fff'
                        this.context.textBaseline = 'top'
                        this.context.fillText(this.count, 0, 0)
                        this.cache()
                    }
                }
                let centerX = longtake.width / 2
                let centerY = longtake.height / 2
                let mainBtn = new Button(centerX, centerY)
                mainBtn.addChildren(new Button(30, 30))
                longtake.addChildren(mainBtn)
            }
        `
    },
    {
        name: 'drag',
        title: 'Drag',
        desc: '啟用 enableInteractive() 啟用 pointer 互動事件，可以嘗試拖曳方塊。',
        code: /* javascript */ `
            (longtake, LongTake) => {
                class Block extends LongTake.Sprite {
                    constructor() {
                        super()
                        this.x = longtake.width / 2
                        this.y = longtake.height / 2
                        this.setAnchor(0.5)
                    }
                    render() {
                        this.context.fillStyle = '#000'
                        this.context.fillRect(0, 0, this.width, this.height)
                        this.cache()
                    }
                }
                let block = new Block()
                let dragging = false
                // 要使用 pointer 相關事件必須啟用互動模式
                longtake.enableInteractive()
                longtake.on('pointerdown', ({ x, y }) => {
                    if (block.inRect(x, y)) {
                        dragging = true
                    }
                })
                longtake.on('pointermove', ({ x, y }) => {
                    if (dragging) {
                        block.x = x
                        block.y = y
                    }
                })
                longtake.on('pointerup', () => {
                    if (dragging) {
                        dragging = false
                    }
                })
                longtake.addChildren(block)
            }
        `
    },
    {
        name: 'debug',
        title: 'Debug',
        desc: '',
        code: /* javascript */ `
            (longtake, LongTake) => {
                class Bear extends LongTake.ImageSprite {
                    constructor(image, anchor, x, y) {
                        super(image)
                        this.x = x
                        this.y = y
                        this.setAnchor(anchor)
                        this.rotation = 45
                    }
                }
                let image = new Image()
                image.src = 'images/KaohBear.png'
                image.onload = () => {
                    longtake.enabledDebugMode()
                    let bear1 = new Bear(image, 0.75, longtake.width / 2, longtake.height / 2)
                    let bear2 = new Bear(image, 0, 30, 30)
                    // bear1.scale(2, 2)
                    // bear2.scale(0.75, 0.75)
                    bear2.update = () => {
                        bear2.rotation += 1
                    }
                    bear1.addChildren(bear2)
                    longtake.addChildren(bear1)
                }
            }
        `
    }
]
