const createAnimationFrame = (callback: (frame: number) => void) => {
    if (window && window.requestAnimationFrame) {
        window.requestAnimationFrame(callback)
    } else {
        // 1000 / 60
        setTimeout(callback, 16.6666666666667)
    }
}

export class Ticker {
    runningTime = 0
    constructor() { ... }
    run(callback: () => void) {
        this.runningTime += 1
    }
}
