/**
 * 
 * @param {import('longtake').LongTake} longtake 
 * @param {typeof import('longtake').LongTake} LongTake 
 */
const t = (longtake, LongTake) => {
    let count = 0
    let image = new Image()
    image.src = 'images/KaohBear.png'
    class Bear extends LongTake.ImageSprite {
        constructor(x, y) {
            super(image)
            this.x = x
            this.y = y
            this.dir = this.helper.randInt(0, 360)
            this.setAnchor(0.5)
        }
        update() {
            let { x, y } = this.helper.getVector(this.dir, 10)
            this.x += x
            this.y += y
            this.rotation = this.dir * -1
            let size = this.getRealSize()
            if (this.x + size.width / 2 > longtake.width) {
                this.dir += this.helper.randInt(80, 100)
            }
            if (this.x - size.width / 2 < 0) {
                this.dir += this.helper.randInt(80, 100)
            }
            if (this.y - size.height / 2 > longtake.height) {
                this.dir += this.helper.randInt(80, 100)
            }
            if (this.y - size.height / 2 < 0) {
                this.dir += this.helper.randInt(80, 100)
            }
        }
    }
    class CountText extends LongTake.TextSprite {
        constructor() {
            super({
                padding: 10,
                fontSize: 24
            })
        }
        create() {
            this.x = longtake.width / 2
            this.y = 20
            this.z = 100
            this.setAnchor(0.5, 0.5)
        }
    }
    let countText = new CountText()
    image.onload = () => {
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
