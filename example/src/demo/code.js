/**
 * 
 * @param {import('longtake').LongTake} longtake 
 * @param {typeof import('longtake').LongTake} LongTake 
 */
const t = (longtake, LongTake) => {

    const loader = new LongTake.Loader()

    loader.add('Grandma-0', 'images/Grandma-0.png')
    loader.add('Grandma-2', 'images/Grandma-2.png')
    loader.add('Grandma-3', 'images/Grandma-3.png')
    loader.add('Grandma-4', 'images/Grandma-4.png')
    loader.add('Grandma-4-2', 'images/Grandma-4-2.png')
    loader.add('Grandma-5', 'images/Grandma-5.png')
    loader.add('Grandma-5-2', 'images/Grandma-5-2.png')
    loader.add('Grandma-6', 'images/Grandma-6.png')
    loader.add('Grandma-7', 'images/Grandma-7.png')
    loader.add('Grandma-8', 'images/Grandma-8.png')
    loader.add('Grandma-9', 'images/Grandma-9.png')

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
            this.talkIndex = this.helper.randInt(0, this.messages.length)
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
            this.talkIndex = (this.talkIndex + 1) % this.messages.length
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
    
    class Grandma extends LongTake.ImageSprite {
        box = new MessageBox()
        stopTalk = false
        constructor() {
            super(loader.get('Grandma-8'))
            let table = new LongTake.Sprite()
            table.y = 83
            this.addChildren(new RightHand())
            this.addChildren(new Body())
            this.addChildren(new Head())
            this.addChildren(new LeftHand())
            this.addChildren(table)
            this.addChildren(this.box)
            this.y = 17
            this.x = 5
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
        longTake.addChildren(new Grandma())
    })
}
