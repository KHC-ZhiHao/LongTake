import { Core } from './core'

export class Camera {
    x = 0 
    y = 0
    core: Core
    rect: DOMRect
    constructor(core: Core) {
        this.core = core
        this.rect = core.target.getBoundingClientRect()
    }
    get offsetX() {
        return this.checkBorder(this.x, this.core.width, this.rect.width)
    }
    get offsetY() { 
        return this.checkBorder(this.y, this.core.height, this.rect.height)
    }
    checkBorder(pos: number, view: number, target: number){
        let now = pos
        let front = target / 2
        let back = view - front
        if (now > front) {
            if (now > back) {
                return view - target
            } else {
                return (now - front)
            }
        }
        return 0
    }
}
