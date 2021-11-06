import { Core } from './core'

export class Camera {
    x = 0 
    y = 0
    core: Core

    constructor(core: Core) {
        this.core = core
    }

    get offsetX() {
        return this.checkBorder(this.x, this.core.width * this.core.viewScale, this.core.targetRect.width)
    }

    get offsetY() { 
        return this.checkBorder(this.y, this.core.height * this.core.viewScale, this.core.targetRect.height)
    }

    checkBorder(pos: number, view: number, target: number){
        let now = pos * this.core.viewScale
        let front = target / 2
        let back = view - front
        if (now > front) {
            if (now > back) {
                return view - target
            } else {
                return (now - front) / this.core.viewScale
            }
        }
        return 0
    }
}
