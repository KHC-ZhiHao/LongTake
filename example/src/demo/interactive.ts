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
        desc: '啟用測試模式可以進行初步的系統調教。',
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
                    let bear1 = new Bear(image, 0, longtake.width / 2, longtake.height / 2)
                    let bear2 = new Bear(image, 0, 10, 10)
                    let bear3 = new Bear(image, 0, 10, 10)
                    let bear4 = new Bear(image, 0, 10, 10)
                    let bear5 = new Bear(image, 0, 10, 10)
                    let bear6 = new Bear(image, 0, 10, 10)
                    let bear7 = new Bear(image, 0, 10, 10)
                    bear1.scale(1.25, 1.25)
                    bear2.scale(1.25, 1.25)
                    bear3.scale(1.25, 1.25)
                    bear4.scale(1.25, 1.25)
                    bear5.scale(1.25, 1.25)
                    bear6.scale(1.25, 1.25)
                    bear1.update = () => {
                        bear1.rotation += 2
                    }
                    bear7.rotation = 0
                    bear5.addChildren(bear7)
                    bear5.addChildren(bear6)
                    bear4.addChildren(bear5)
                    bear3.addChildren(bear4)
                    bear2.addChildren(bear3)
                    bear1.addChildren(bear2)
                    longtake.addChildren(bear1)
                }
            }
        `
    }
]
