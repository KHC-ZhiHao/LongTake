import { LongTake, Sprite, Animate, ImageSprite, Loader } from 'longtake'

const loader = new Loader()

loader.add('BackGround', './images/theme-sheep/main-banner-background.png')
loader.add('SheepBody', './images/theme-sheep/sheep-body.png')
loader.add('SheepBody1', './images/theme-sheep/sheep-body-1.png')
loader.add('SheepBody2', './images/theme-sheep/sheep-body-2.png')
loader.add('SheepBody3', './images/theme-sheep/sheep-body-3.png')
loader.add('SheepBody4', './images/theme-sheep/sheep-body-4.png')
loader.add('SheepBody5', './images/theme-sheep/sheep-body-5.png')

const inIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

export const sheepRender = async(app: LongTake) => {
    class Sand extends Sprite {
        speed = 0
        init() {
            this.x = 0
            this.y = Math.random() * app.height
            this.speed = Math.random() * 10 + 3
            this.width = Math.random() * 2 + 3
            this.height = Math.random() * 2 + 2
            this.rotation = this.helper.randInt(-10, 10)
            this.opacity = Math.random() * 50 + 150
        }
        create() {
            this.init()
            this.x = Math.random() * app.width
        }
        update() {
            let vector = this.helper.getVector(this.rotation, this.speed)
            this.x += vector.x
            this.y += vector.y
            if (this.x > app.width + 100) {
                this.init()
            }
        }
        render() {
            this.context.fillStyle = '#A16B47'
            this.context.fillRect(0, 0, this.width, this.height)
            this.cache()
        }
    }

    class Sheep extends ImageSprite {
        animate = new Animate({
            duration: 2000,
            easing: 'easeInOutSine',
            alternate: true,
            action: t => {
                this.scale(1 + t * 0.01, 1 + t * 0.01)
                this.rotation = (t - 0.7) * -1
            }
        })
        constructor() {
            super(loader.get('SheepBody'))
        }
        create() {
            this.setAnchor(0.5, 1)
        }
        update() {
            if (inIOS === false) {
                this.animate.move()
            }
        }
    }

    class Wool extends ImageSprite {
        offsetX: number
        offsetY: number
        animate = new Animate({
            duration: this.helper.randInt(400, 600),
            alternate: true,
            easing: 'easeInOutSine',
            action: t => {
                this.skewX = (-0.5 + t) / this.helper.randInt(17, 23)
            }
        })
        constructor(image: string, offsetX: number, offsetY: number) {
            super(loader.get(image))
            this.offsetX = offsetX
            this.offsetY = offsetY
        }
        create() {
            this.setAnchor(0, 0.5)
            this.y = this.offsetY - 2
            this.x = this.offsetX - (this.width / 2)
            this.opacity = 200
        }
        update() {
            this.animate.move()
        }
    }

    loader.start()
    loader.onload(() => {
        app.addChildren(new ImageSprite(loader.get('BackGround')))
        for (let i = 0; i < 25; i++) {
            app.addChildren(new Sand())
        }
        let container = new Sprite()
        container.x = app.width / 2 - 5
        container.y = app.height - app.height * 0.230
        container.rotation = -5
        container.scale(0.9, 0.9)
        container.addChildren(new Sheep())
        container.addChildren(new Wool('SheepBody1', -30, -85))
        container.addChildren(new Wool('SheepBody2', -5, -60))
        container.addChildren(new Wool('SheepBody3', -45, -50))
        container.addChildren(new Wool('SheepBody4', 20, -60))
        container.addChildren(new Wool('SheepBody5', 43, -60))
        app.addChildren(container)
    })
}
