import Ppath2D from 'ppath2d'
import { LongTake, ImageSprite, Loader, Animate } from 'longtake'

const loader = new Loader()

loader.add('cap', '/images/theme-tree/cap.png')
loader.add('ray', '/images/theme-tree/lightray.png')
loader.add('main', '/images/theme-tree/main.jpg')
loader.add('leaf1', '/images/theme-tree/leaf1.png')
loader.add('leaf2', '/images/theme-tree/leaf2.png')
loader.add('shadow', '/images/theme-tree/shadow.png')
loader.add('branch1', '/images/theme-tree/branch1.png')
loader.add('branch2', '/images/theme-tree/branch2.png')

export const treeRender = async(app: LongTake) => {
    class Leaf extends ImageSprite {
        path = new Ppath2D()
        size = 0
        trun = 0
        trunSpeed = Math.random() * 0.01 + 0.01
        animate: Animate
        constructor() {
            let image = loader.get('leaf' + LongTake.helper.randInt(1, 2))
            super(image as HTMLImageElement)
            let duration = this.helper.randInt(10000, 15000)
            this.animate = new Animate({
                begin: this.helper.randInt(1, duration),
                duration,
                action: (t) => {
                    let p = this.path.getLinePosition(t)
                    let v = this.path.getDirection(t)
                    this.x = p.x
                    this.y = p.y
                    this.rotation = v
                }
            })
        }
        create() {
            let flow = this.helper.randInt(0, 500) * (this.helper.randInt(1, 2) === 1 ? -1 : 1)
            let flow2 = this.helper.randInt(0, 1000)
            this.z = this.helper.randInt(1, 8)
            this.size = Math.random() * (this.z / 50) + 0.3
            this.scale(this.size, this.size)
            this.path = new Ppath2D()
            this.path.moveTo(this.helper.randInt(-300, 600), -200)
            this.path.smoothCurve(flow, flow2, app.width - this.helper.randInt(-600, 300), app.height + 200)
        }
        update() {
            this.animate.move()
            this.trun += this.trunSpeed
            this.scaleHeight = Math.sin(this.trun) * this.size
            if (this.animate.over) {
                app.addChildren(new Leaf())
                this.remove()
            }
        }
    }

    class Ray extends ImageSprite {
        dir = this.helper.randInt(10, 70) * (this.helper.randInt(1, 2) === 1 ? 1 : -1)
        oriX: number
        animate = new Animate({
            easing: 'easeInOutQuint',
            duration: this.helper.randInt(3000, 6000),
            alternate: true,
            action: (t) => {
                this.x = this.oriX + t * this.dir
                this.opacity = 150 - 100 * t
            }
        })
        constructor(x) {
            super(loader.get('ray') as HTMLImageElement)
            this.x = x
            this.oriX = this.x
        }
        create() {
            let scale = this.helper.randInt(3, 5) / 2
            this.z = 3
            this.scale(scale, scale)
            this.blendMode = 'lighten'
        }
        update() {
            this.animate.move()
        }
    }

    loader.start()
    loader.onload(() => {
        let cap = new ImageSprite(loader.get('cap') as HTMLImageElement)
        let main = new ImageSprite(loader.get('main') as HTMLImageElement)
        let shadow = new ImageSprite(loader.get('shadow') as HTMLImageElement)
        let branch1 = new ImageSprite(loader.get('branch1') as HTMLImageElement)
        let branch2 = new ImageSprite(loader.get('branch2') as HTMLImageElement)
        app.addChildren(main)
        app.addChildren(shadow)
        app.addChildren(branch1)
        app.addChildren(branch2)
        app.addChildren(cap)
        app.addChildren(new Ray(300))
        app.addChildren(new Ray(600))
        app.addChildren(new Ray(700))
        for (let i = 0; i < 20; i++) {
            app.addChildren(new Leaf())
        }
        cap.z = 9
        shadow.z = 10
        branch1.z = 7
        branch2.z = 5
    })
}
