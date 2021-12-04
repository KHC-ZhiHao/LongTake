import { LongTake, ImageSprite, Loader } from 'longtake'

const loader = new Loader()

loader.add('fan', './images/theme-farm/fan.png')
loader.add('farm', './images/theme-farm/farm.png')
loader.add('space', './images/theme-farm/space.png')

export const farmRender = async(app: LongTake) => {
    loader.start()
    loader.onload(() => {
        let fan = new ImageSprite(loader.get('fan') as HTMLImageElement)
        let farm = new ImageSprite(loader.get('farm') as HTMLImageElement)
        let space = new ImageSprite(loader.get('space') as HTMLImageElement)
        space.create = function() {
            this.x = this.width / 2
            this.y = this.height
            this.scale(3)
            this.setAnchor(0.5)
        }
        space.update = function() {
            this.rotation -= 0.01
        }
        fan.create = function() {
            this.setAnchor(0.5)
            this.x = 695 + this.width / 2
            this.y = 428 + this.height / 2
        }
        fan.update = function() {
            this.rotation += 1
        }
        app.addChildren(space)
        app.addChildren(farm)
        app.addChildren(fan)
    })
}
