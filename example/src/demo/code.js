/**
 * 
 * @param {import('longtake').LongTake} longtake 
 * @param {typeof import('longtake').LongTake} LongTake 
 */
const t = (longtake, LongTake) => {

    class Bomb extends LongTake.Sprite {
        angle = minRandom(0, Math.PI * 2)
        speed = minRandom(1, 10)
        friction = 0.95
        gravity = 1
        size = minRandom(3, 6)
        alpha = 1
        decay = minRandom(0.015, 0.03)
        constructor(x, y) {
            super()
            let size = minRandom(10, 20)
            this.resize(size, size)
            this.setAnchor(0.5, 0.5)
            this.x = x
            this.y = y
            this.opacity = 0
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
            this.context.fillStyle = getRandomColor()
            this.context.fillRect(0, 0, this.width, this.height)
            this.cache()
        }
    }
    
    class FireWork extends LongTake.Sprite {
        animate = new LongTake.Animate({
            duration: 3000,
            easing: 'easeInCirc',
            action: t => {
                // let { x, y } = this.ppath2d.getLinePosition(t)
                // this.x = this.core.width / 2 + x - 60
                // this.y = this.core.height / 2 + y - 60
                // this.opacity = t * 2 * 255
            }
        })
        constructor() {
            super(x, y)
            this.x = x
            this.y = y
            this.opacity = 0
            this.resize(10, 10)
            this.setAnchor(0.5, 0.5)
        }
        update() {
            if (this.animate.over) {
                for (let i = 0; i < 10; i++) {
                    this.core.addChildren(new Bomb(this.x, this.y))
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
    longTake.addChildren(new FireWork(x, y))
    longtake.on('click', ({ x, y }) => {
        longTake.addChildren(new FireWork(x, y))
    })
}
