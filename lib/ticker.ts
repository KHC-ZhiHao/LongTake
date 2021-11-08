type TickerCallback = (runningTime: number) => void

const createAnimationFrame = (callback: () => void) => {
    if (window && window.requestAnimationFrame) {
        return () => window.requestAnimationFrame(callback)
    } else {
        return () => setTimeout(callback, 1000 / 60)
    }
}

export class Ticker {
    private stop = false
    private callback: TickerCallback
    private runningTime = 0
    private animationFrame = createAnimationFrame(this.run.bind(this))
    constructor(callback: TickerCallback) {
        this.callback = callback
    }
    private run() {
        this.runningTime += 1
        this.callback(this.runningTime)
        if (this.stop === false) {
            this.animationFrame()
        }
    }
    start() {
        this.run()
    }
    close() {
        this.stop = true
    }
}
