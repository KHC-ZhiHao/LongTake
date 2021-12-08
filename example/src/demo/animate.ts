import { DemoAttr } from './index'

export const animate: DemoAttr[] = [
    {
        name: 'firework',
        title: 'Fire Work',
        desc: '點擊畫面可以發射一發煙火。',
        code: /* javascript */ `
            (longtake, LongTake) => {
                const minRandom = (min, max) => {
                    return Math.random() * (max - min) + min
                }
                class Bomb extends LongTake.Sprite {
                    constructor(x, y) {
                        super()
                        let size = minRandom(10, 20)
                        this.resize(size, size)
                        this.setAnchor(0.5, 0.5)
                        this.x = x
                        this.y = y
                        this.opacity = 0
                        this.angle = minRandom(0, Math.PI * 2)
                        this.speed = minRandom(1, 10)
                        this.friction = 0.95
                        this.gravity = 1
                        this.size = minRandom(3, 6)
                        this.alpha = 1
                        this.decay = minRandom(0.015, 0.03)
                    }
                    update() {
                        this.speed *= this.friction
                        this.x += Math.cos(this.angle) * this.speed
                        this.y += Math.sin(this.angle) * this.speed + this.gravity
                        this.alpha -= this.decay
                        this.rotation = this.alpha * 360
                        this.opacity = 255
                        this.scale(this.alpha, this.alpha)
                        if (this.alpha <= this.decay) {
                            this.remove()
                        }
                    }
                    render() {
                        this.context.fillStyle = this.helper.getRandomColor()
                        this.context.fillRect(0, 0, this.width, this.height)
                        this.cache()
                    }
                }
                
                class FireWork extends LongTake.Sprite {
                    constructor(tx, ty) {
                        super()
                        this.tx = tx
                        this.ty = ty
                        this.x = tx
                        this.y = ty + 200
                        this.opacity = 0
                        this.resize(10, 10)
                        this.setAnchor(0.5, 0.5)
                        this.animate = new LongTake.Animate({
                            duration: 300,
                            easing: 'easeInCirc',
                            action: t => {
                                this.y = ty + (200 * (1 - t))
                                this.opacity = t * 2 * 255
                            }
                        })
                    }
                    update() {
                        if (this.animate.over) {
                            for (let i = 0; i < 10; i++) {
                                longtake.addChildren(new Bomb(this.x, this.y))
                            }
                            this.remove()
                        } else {
                            this.animate.move()
                        }
                    }
                    render() {
                        this.context.fillStyle = this.helper.getRandomColor()
                        this.context.fillRect(0, 0, this.width, this.height)
                        this.cache()
                    }
                }
                longtake.addChildren(new FireWork(longtake.width / 2, longtake.height / 2))
                longtake.on('click', ({ x, y }) => {
                    longtake.addChildren(new FireWork(x, y))
                })
            }
        `
    },
    {
        name: 'bear-party',
        title: 'Bear Party',
        desc: '點擊畫面能產生更多高熊。',
        code: /* javascript */ `
            (longtake, LongTake) => {
                let count = 5
                let image = new Image()
                image.src = 'images/KaohBear.png'
                class Bear extends LongTake.ImageSprite {
                    constructor(x, y) {
                        super(image)
                        let vector = this.helper.getVector(this.helper.randInt(0, 360), 5)
                        this.x = x
                        this.y = y
                        this.vx = vector.x
                        this.vy = vector.y
                        this.setAnchor(0.5)
                    }
                    update() {
                        this.x += this.vx
                        this.y += this.vy
                        let size = this.getRealSize()
                        if (this.x + size.width / 2 > longtake.width || this.x - size.width / 2 < 0) {
                            this.vx *= -1
                        }
                        if (this.y + size.height / 2 > longtake.height || this.y - size.height / 2 < 0) {
                            this.vy *= -1
                        }
                    }
                }
                class CountText extends LongTake.TextSprite {
                    constructor() {
                        super({
                            padding: 24,
                            fontSize: 24
                        })
                    }
                    create() {
                        this.x = longtake.width / 2
                        this.y = 20
                        this.z = 100
                        this.setAnchor(0.5, 0.5)
                        this.setContent(5)
                    }
                }
                let countText = new CountText()
                image.onload = () => {
                    for (let i = 0; i < 5; i++) {
                        longtake.addChildren(new Bear(longtake.width / 2, longtake.height / 2))
                    }
                    longtake.addChildren(countText)
                    longtake.on('click', ({ x, y }) => {
                        count += 5
                        countText.setContent(count.toString())
                        for (let i = 0; i < 5; i++) {
                            longtake.addChildren(new Bear(x, y))
                        }
                    })
                }
            }
        `
    },
    {
        name: 'live',
        title: 'Live2D',
        desc: '複雜元件組合的示範。',
        code: /* javascript */ `
            (longtake, LongTake) => {
                const loader = new LongTake.Loader()
                loader.add('Grandma-1', 'images/grandma/Grandma-1.png')
                loader.add('Grandma-2', 'images/grandma/Grandma-2.png')
                loader.add('Grandma-3', 'images/grandma/Grandma-3.png')
                loader.add('Grandma-4', 'images/grandma/Grandma-4.png')
                loader.add('Grandma-4-2', 'images/grandma/Grandma-4-2.png')
                loader.add('Grandma-5', 'images/grandma/Grandma-5.png')
                loader.add('Grandma-5-2', 'images/grandma/Grandma-5-2.png')
                loader.add('Grandma-6', 'images/grandma/Grandma-6.png')
                loader.add('Grandma-7', 'images/grandma/Grandma-7.png')
                loader.add('Grandma-8', 'images/grandma/Grandma-8.png')
                loader.add('Grandma-9', 'images/grandma/Grandma-9.png')
    
                class Hair extends LongTake.ImageSprite {
                    constructor() {
                        super(loader.get('Grandma-6'))
                        this.animate = new LongTake.Animate({
                            duration: 300,
                            easing: 'easeInOutQuad',
                            alternate: true,
                            action: t => {
                                this.skewY = (t - 2.5) * 0.025
                            }
                        })
                    }
                    create() {
                        this.x = 45 + this.width / 2
                        this.y = this.height
                        this.setAnchor(0.5, 1)
                    }
                    update() {
                        this.animate.move()
                    }
                }
    
                class Eye extends LongTake.ImageSprite {
                    constructor(image) {
                        super(loader.get(image))
                    }
                    create() {
                        this.x = 170
                        this.y = 290 - this.height
                    }
                }
                
                class Face extends LongTake.ImageSprite {
                    constructor(image) {
                        super(loader.get(image))
                    }
                    create() {
                        this.x = 74
                        this.y = 383 - this.height
                    }
                }
                
                class Head extends LongTake.Sprite {
                    constructor() {
                        super()
                        this.animate = new LongTake.Animate({
                            duration: 1200,
                            easing: 'easeInQuad',
                            alternate: true,
                            action: t => {
                                this.rotation = (t - 0.2) * 1
                            }
                        })
                        this.eyeAnimate = new LongTake.Animate({
                            duration: 2000,
                            alternate: true,
                            action: t => {
                                let now = Math.floor(t * 10)
                                if (now === 1) {
                                    this.eye1.hidden()
                                    this.eye2.unHidden()
                                } else {
                                    this.eye1.unHidden()
                                    this.eye2.hidden()
                                }
                            }
                        })
                        this.headAnimate = new LongTake.Animate({
                            duration: 1000,
                            alternate: true,
                            action: t => {
                                let now = Math.floor(t * 10)
                                if (now % 2 === 1) {
                                    this.face1.hidden()
                                    this.face2.unHidden()
                                } else {
                                    this.face1.unHidden()
                                    this.face2.hidden()
                                }
                            }
                        })
                        this.eye1 = new Eye('Grandma-5')
                        this.eye2 = new Eye('Grandma-5-2')
                        this.face1 = new Face('Grandma-4')
                        this.face2 = new Face('Grandma-4-2')
                        this.eye2.hidden()
                        this.face2.hidden()
                        this.addChildren(this.face1)
                        this.addChildren(this.face2)
                        this.addChildren(this.eye1)
                        this.addChildren(this.eye2)
                        this.addChildren(new Hair())
                    }
                    update() {
                        this.animate.move()
                        this.eyeAnimate.move()
                        if (this.parent.stopTalk === false) {
                            this.headAnimate.move()
                        } else {
                            this.face1.unHidden()
                            this.face2.hidden()
                        }
                    }
                }
                
                class Body extends LongTake.ImageSprite {
                    constructor() {
                        super(loader.get('Grandma-3'))
                        this.animate = new LongTake.Animate({
                            duration: 1200,
                            easing: 'easeInQuad',
                            alternate: true,
                            action: t => {
                                this.scale(1 + t * 0.025, 1 + t * 0.025)
                                this.rotation = (t - 0.5) * 1
                            }
                        })
                    }
                    create() {
                        this.x = 378 - this.width / 2
                        this.y = 548 - this.height / 2
                        this.setAnchor(0.5, 0.5)
                    }
                    update() {
                        this.animate.move()
                    }
                }
                
                class LeftHand extends LongTake.ImageSprite {
                    constructor() {
                        super(loader.get('Grandma-7'))
                        this.animate = new LongTake.Animate({
                            duration: 1200,
                            easing: 'easeInQuad',
                            alternate: true,
                            action: t => {
                                this.rotation = (t - 0.2) * -5
                            }
                        })
                    }
                    create() {
                        this.y = 548
                        this.setAnchor(0, 1)
                    }
                    update() {
                        this.animate.move()
                    }
                }
                
                class RightHand extends LongTake.ImageSprite {
                    constructor() {
                        super(loader.get('Grandma-2'))
                        this.animate = new LongTake.Animate({
                            duration: 1200,
                            easing: 'easeInQuad',
                            alternate: true,
                            action: t => {
                                this.rotation = (t - 0.5) * -5
                            }
                        })
                    }
                    create() {
                        this.setAnchor(0.5, 0)
                        this.x = 480 - this.width / 2
                        this.y = 238 + this.height / 2
                    }
                    update() {
                        this.animate.move()
                    }
                }
                
                class MessageBox extends LongTake.Sprite {
                    constructor() {
                        super()
                        this.words = []
                        this.messagesPause = 0
                        this.messages = [
                            [
                                '人生很多事',
                                '會隨著時間好轉。'
                            ],
                            [
                                '早安',
                                '感謝',
                                '祝你一天順利。'
                            ]
                        ]
                        this.talkIndex = this.helper.randInt(0, this.messages.length - 1)
                        this.animate = new LongTake.Animate({
                            duration: 1200,
                            easing: 'easeInOutQuad',
                            alternate: true,
                            action: t => {
                                this.rotation = (t - 0.2) * 2
                            }
                        })
                    }
                    mine() {
                        this.words = []
                        this.unCache()
                        this.messagesPause = 0
                        this.parent.stopTalk = false
                        this.talkIndex = (this.talkIndex + 1) % (this.messages.length)
                        let messages = this.messages[this.talkIndex]
                        if (messages.length === 3) {
                            this.talk(messages[0], 5, 17)
                            this.talk(messages[1], 5, 31)
                            this.talk(messages[2], 5, 45)
                        }
                        if (messages.length === 2) {
                            this.talk(messages[0], 5, 24)
                            this.talk(messages[1], 5, 38)
                        }
                        if (messages.length === 1) {
                            this.talk(messages[0], 5, 31)
                        }
                    }
                    talk(message, x, y) {
                        for (let i = 0; i < message.length; i++) {
                            this.words.push([message[i], x + i * 10, y])
                        }
                    }
                    create() {
                        this.x = 417
                        this.y = 33
                        this.resize(loader.get('Grandma-9'))
                    }
                    update() {
                        this.animate.move()
                    }
                    render() {
                        this.messagesPause += 1
                        this.context.drawImage(loader.get('Grandma-9'), 0, 0)
                        this.context.rotate(-0.035)
                        this.context.scale(3, 3)
                        let pause = 5
                        let index = Math.floor(this.messagesPause / pause)
                        for (let i = 0; i < index; i++) {
                            this.context.fillText(this.words[i][0], this.words[i][1], this.words[i][2])
                        }
                        if (index === this.words.length) {
                            this.cache()
                            this.parent.stopTalk = true
                        }
                    }
                }
                
                class Grandma extends LongTake.Sprite {
                    constructor() {
                        super()
                        this.box = new MessageBox()
                        this.stopTalk = false
                        this.table = new LongTake.ImageSprite(loader.get('Grandma-8'))
                        this.table.y = 83
                        this.addChildren(new RightHand())
                        this.addChildren(new Body())
                        this.addChildren(new Head())
                        this.addChildren(new LeftHand())
                        this.addChildren(this.table)
                        this.addChildren(this.box)
                        this.y = 30
                        this.x = (longtake.width - loader.get('Grandma-1').width) / 2
                    }
                    create() {
                        this.box.mine()
                        this.on('click', () => {
                            this.box.mine()
                        })
                    }
                }
                loader.start()
                loader.onload(() => {
                    longtake.addChildren(new Grandma())
                })   
            }
        `
    }
]
