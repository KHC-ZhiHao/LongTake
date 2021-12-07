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
            let { x, y } = this.helper.getVector(this.dir, 1)
            this.x = x
            this.y = y
            this.rotation = this.dir
        }
    }
    class CountText extends LongTake.TextSprite {
        create() {
            this.z = 100
        }
        update() {
            this.setContent(count.toString())
        }
    }
    image.onload = () => {
        longtake.addChildren(new CountText())
        longtake.on('click', ({ x, y }) => {
            longtake.addChildren(new Bear(x, y))
        })
    }
}
