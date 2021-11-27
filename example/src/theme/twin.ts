import { LongTake, Sprite, ImageSprite, Loader, Animate } from 'longtake'

const loader = new Loader()

loader.add('vr1', '/images/theme-twin/vr1.png')
loader.add('vr2', '/images/theme-twin/vr2.png')
loader.add('vr3', '/images/theme-twin/vr3.png')
loader.add('vr4', '/images/theme-twin/vr4.png')
loader.add('vr5', '/images/theme-twin/vr5.png')
loader.add('vl1', '/images/theme-twin/vl1.png')
loader.add('vl2', '/images/theme-twin/vl2.png')
loader.add('vl3', '/images/theme-twin/vl3.png')
loader.add('vl4', '/images/theme-twin/vl4.png')
loader.add('vl5', '/images/theme-twin/vl5.png')
loader.add('rock', '/images/theme-twin/rock.png')
loader.add('wave', '/images/theme-twin/wave.png')
loader.add('scene', '/images/theme-twin/scene.png')
loader.add('light', '/images/theme-twin/light.png')
loader.add('butterfly', '/images/theme-twin/butterfly.png')

export const twinRender = async (app: LongTake) => {

    loader.start()

    class WaterFull extends Sprite {
        time = 400
        create() {
            this.width = 600
            this.height = this.main.height
            this.opacity = 50
            this.x = this.main.width / 2 - this.width / 2
        }
        update() {
            if (this.time === 0) {
                return
            }
            if (this.time % 10 === 0) {
                this.addChildren(new WaterFullFlow())
            }
            this.time -= 1
        }
    }

    class WaterFullFlow extends Sprite {
        animate = new Animate({
            duration: 1000,
            action: t => {
                this.y = -this.height + (this.main.height + this.height) * t
            }
        })
        create() {
            this.resize(3, this.helper.randInt(250, 300))
            this.x = this.helper.randInt(0, this.parent.width)
        }
        update() {
            if (this.animate.over) {
                this.animate.restart()
            } else {
                this.animate.move()
            }
        }
        render() {
            this.context.fillStyle = '#FFF'
            this.context.fillRect(0, 0, this.width, this.height)
            this.cache()
        }
    }

    class WaveWrapper extends Sprite {
        imgWidth: number
        waveScale: number
        constructor(scale = 1) {
            super()
            this.opacity = 200 * scale
            this.imgWidth = loader.get('wave').width * scale / 4
            this.waveScale = scale
        }
        create() {
            this.y = this.main.height - 10
            this.resize(this.main.width, 10)
            let t = this.main.width / this.imgWidth
            for (let i = 0; i < t; i++) {
                this.addChildren(new Wave(this.imgWidth * i, this.waveScale))
            }
        }
        render() {
            this.context.fillStyle = '#FFF'
            this.context.fillRect(0, 0, this.width, this.height)
            this.cache()
        }
    }

    class Wave extends ImageSprite {
        dir = this.helper.randInt(10, 30)
        speed = 50000
        start = 0
        animate: Animate = null
        constructor(x, scale = 1) {
            super(loader.get('wave'))
            this.x = x
            this.scale(scale, scale)
        }
        create() {
            this.start = this.speed * (this.x / this.main.width)
            this.setAnchor(0.5, 1)
            this.animate = new LongTake.Animate({
                begin: this.start,
                duration: this.speed,
                action: t => {
                    this.x = -this.width + (this.main.width + this.width * 2) * t
                    this.y = this.dir * 2 + this.dir * Math.sin(t * 360)
                }
            })
        }
        update() {
            if (this.animate && this.animate.over) {
                this.animate.restart()
            } else {
                this.animate.move()
            }
        }
    }

    class VortexWrapper extends Sprite {
        constructor(x, y) {
            super()
            this.x = x
            this.y = y
        }
    }

    class VortexUnit extends ImageSprite {
        flow = -1 * this.helper.randInt(5, 10)
        swing = Math.random() * 1.5
        visibility = this.helper.getVisibility()
        animate: Animate
        create() {
            this.setAnchor(0.5)
            this.x = this.width / 2
            this.y = this.height / 2
            this.animate = new Animate({
                begin: this.helper.randInt(0, 1000),
                duration: this.helper.randInt(1500, 2000),
                alternate: true,
                easing: 'easeOutCubic',
                action: (t) => {
                    if (this.visibility === 'md') {
                        this.rotation = t * this.swing
                    }
                    this.y = this.height / 2 + this.flow * t
                }
            })
        }

        update() {
            if (this.animate) {
                this.animate.move()
            }
        }
    }

    loader.onload(() => {
        let bg = new Sprite()
        bg.create = function() {
            this.width = app.width
            this.height = app.height
        }
        bg.render = () => {
            bg.context.fillStyle = '#646464'
            bg.context.rect(0, 0, bg.width, bg.height)
            bg.context.fill()
            bg.cache()
        }

        let scene = new ImageSprite(loader.get('scene'))
        scene.create = function() {
            this.y = this.main.height - this.height
        }

        let light = new ImageSprite(loader.get('light'))
        light.create = function() {
            this.opacity = 10
        }

        let rock = new ImageSprite(loader.get('rock'))
        rock.create = function () {
            this.x = 1015
            this.y = this.main.height - this.height
        }

        let butterfly = new ImageSprite(loader.get('butterfly'))
        butterfly.create = function() {
            this.x = 1010
            this.y = 486
            this.animate = new Animate({
                duration: 3000,
                alternate: true,
                action: (t) => {
                    this.y = 486 + -5 * t
                }
            })
            this.light = new Sprite()
            this.light.create = function() {
                this.setAnchor(0.5)
                this.width = this.parent.width * 2
                this.height = this.width
                this.x = this.parent.width / 2
                this.y = this.parent.width / 2
                this.animate = new Animate({
                    duration: 3000,
                    alternate: true,
                    action: (t) => {
                        this.opacity = 50 * t + 25
                    }
                })
            }
            this.light.update = function() {
                this.animate.move()
            }
            this.light.render = function() {
                let r = this.width / 2
                let grd = this.context.createRadialGradient(r, r, r / 3, r, r, r)
                grd.addColorStop(0, '#24bfe2')
                grd.addColorStop(1, 'rgba(32,191,226,0)')
                this.context.fillStyle = grd
                this.context.arc(r, r, r, 0, 2 * Math.PI)
                this.context.fill()
                this.cache()
            }
            this.addChildren(this.light)
        }

        butterfly.update = function () {
            this.animate.move()
        }

        let rightVortex = new VortexWrapper(1080, 100)
        rightVortex.addChildren(new VortexUnit(loader.get('vr1')))
        rightVortex.addChildren(new VortexUnit(loader.get('vr2')))
        rightVortex.addChildren(new VortexUnit(loader.get('vr3')))
        rightVortex.addChildren(new VortexUnit(loader.get('vr4')))
        rightVortex.addChildren(new VortexUnit(loader.get('vr5')))

        let leftVortex = new VortexWrapper(695, 300)
        leftVortex.addChildren(new VortexUnit(loader.get('vl1')))
        leftVortex.addChildren(new VortexUnit(loader.get('vl2')))
        leftVortex.addChildren(new VortexUnit(loader.get('vl3')))
        leftVortex.addChildren(new VortexUnit(loader.get('vl4')))
        leftVortex.addChildren(new VortexUnit(loader.get('vl5')))

        app.addChildren(bg)
        app.addChildren(light)
        app.addChildren(leftVortex)
        app.addChildren(new WaterFull())
        if (LongTake.helper.getVisibility() === 'md') {
            app.addChildren(new WaveWrapper(0.5))
        }
        app.addChildren(rock)
        app.addChildren(new WaveWrapper(0.7))
        app.addChildren(scene)
        app.addChildren(butterfly)
        app.addChildren(new WaveWrapper(0.9))
        app.addChildren(new WaveWrapper(1))
        app.addChildren(rightVortex)
    })
}
