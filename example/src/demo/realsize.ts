import { LongTake } from 'longtake'

(longtake: LongTake) => {
    class Target extends LongTake.Sprite {
        create() {
            this.resize(50, 50)
            this.setAnchor(0.5, 0.5)
            this.opacity = 225
        }
        update() {
            //this.rotation += 1
        }
        render() {
            this.context.fillRect(0, 0, this.width, this.height)
            this.context.strokeStyle = '#fff'
            this.context.lineWidth = 5
            this.context.strokeRect(0, 0, this.width, this.height)
        }
    }
    let t1 = new Target()
    let t2 = new Target()
    let t3 = new Target()
    let t4 = new Target()
    let wrapper = new LongTake.Sprite()
    wrapper.create = () => {
        wrapper.x = longtake.width / 2
        wrapper.y = longtake.height / 2
        wrapper.setAnchor(0.5, 0.5)
    }
    wrapper.update = () => {
        let size = t1.getScreenSize()
        wrapper.resize(size)
    }
    wrapper.render = () => {
        let context = wrapper.context
        context.strokeStyle = 'red'
        context.strokeRect(0, 0, wrapper.width, wrapper.height)
    }
    //t1.addChildren(t2)
    //t1.addChildren(t3)
    //t3.addChildren(t4)
    t2.x = 25
    t3.x = -25
    t4.x = -25
    wrapper.addChildren(t1)
    longtake.addChildren(wrapper)
}