export type Easings = keyof typeof easings
export const easings = {
    linear(time: number, over: number) {
        return time / over
    },
    easeInQuad(time: number, over: number) {
        return 1 * (time /= over) * time
    },
    easeOutQuad(time: number, over: number) {
        return -1 * (time /= over) * (time - 2)
    },
    easeInOutQuad(time: number, over: number) {
        if ((time /= over / 2) < 1) {
            return 1 / 2 * time * time
        }
        return -1 / 2 * ((--time) * (time - 2) - 1)
    },
    easeInCubic(time: number, over: number) {
        return 1 * (time /= over) * time * time
    },
    easeOutCubic(time: number, over: number) {
        return 1 * ((time = time / over - 1) * time * time + 1)
    },
    easeInOutCubic(time: number, over: number) {
        if ((time /= over / 2) < 1) {
            return 1 / 2 * time * time * time
        }
        return 1 / 2 * ((time -= 2) * time * time + 2)
    },
    easeInQuart(time: number, over: number) {
        return 1 * (time /= over) * time * time * time
    },
    easeOutQuart(time: number, over: number) {
        return -1 * ((time = time / over - 1) * time * time * time - 1)
    },
    easeInOutQuart(time: number, over: number) {
        if ((time /= over / 2) < 1) {
            return 1 / 2 * time * time * time * time
        }
        return -1 / 2 * ((time -= 2) * time * time * time - 2)
    },
    easeInQuint(time: number, over: number) {
        return 1 * (time /= over) * time * time * time * time
    },
    easeOutQuint(time: number, over: number) {
        return 1 * ((time = time / over - 1) * time * time * time * time + 1)
    },
    easeInOutQuint(time: number, over: number) {
        if ((time /= over / 2) < 1) {
            return 1 / 2 * time * time * time * time * time
        }
        return 1 / 2 * ((time -= 2) * time * time * time * time + 2)
    },
    easeInSine(time: number, over: number) {
        return -1 * Math.cos(time / over * (Math.PI / 2)) + 1
    },
    easeOutSine(time: number, over: number) {
        return 1 * Math.sin(time / over * (Math.PI / 2))
    },
    easeInOutSine(time: number, over: number) {
        return -1 / 2 * (Math.cos(Math.PI * time / over) - 1)
    },
    easeInExpo(time: number, over: number) {
        return (time === 0) ? 0 : 1 * Math.pow(2, 10 * (time / over - 1))
    },
    easeOutExpo(time: number, over: number) {
        return (time === over) ? 1 : 1 * (-Math.pow(2, -10 * time / over) + 1)
    },
    easeInOutExpo(time: number, over: number) {
        if (time === 0) return 0
        if (time === over) return 1
        if ((time /= over / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (time - 1))
        return 1 / 2 * (- Math.pow(2, -10 * --time) + 2)
    },
    easeInCirc(time: number, over: number) {
        return -1 * (Math.sqrt(1 - (time /= over) * time) - 1)
    },
    easeOutCirc(time: number, over: number) {
        return 1 * Math.sqrt(1 - (time = time / over - 1) * time)
    },
    easeInOutCirc(time: number, over: number) {
        if ((time /= over / 2) < 1) return -1 / 2 * (Math.sqrt(1 - time * time) - 1)
        return 1 / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1)
    },
    easeInElastic(time: number, over: number) {
        let s = 1.70158
        let p = 0
        let a = 1
        if (time === 0) return 0
        if ((time /= over) === 1) return 1
        if (!p) p = over * .3
        if (a < 1) {
            a = 1
            s = p / 4
        }
        else s = p / (2 * Math.PI) * Math.asin(1 / a)
        return -(a * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * over - s) * (2 * Math.PI) / p))
    },
    easeOutElastic(time: number, over: number) {
        let s = 1.70158
        let p = 0
        let a = 1
        if (time === 0) return 0
        if ((time /= over) === 1) return 1
        if (!p) p = over * .3
        if (a < 1) {
            a = 1
            s = p / 4
        }
        else s = p / (2 * Math.PI) * Math.asin(1 / a)
        return a * Math.pow(2, -10 * time) * Math.sin((time * over - s) * (2 * Math.PI) / p) + 1
    },
    easeInOutElastic(time: number, over: number) {
        let s = 1.70158
        let p = 0
        let a = 1
        if (time === 0) return 0
        if ((time /= over / 2) === 2) return 1
        if (!p) p = over * (0.3 * 1.5)
        if (a < 1) {
            a = 1
            s = p / 4
        }
        if (time < 1) {
            return - 0.5 * (a * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * over - s) * (2 * Math.PI) / p))
        }
        return a * Math.pow(2, -10 * (time -= 1)) * Math.sin((time * over - s) * (2 * Math.PI) / p) * 0.5 + 1
    },
    easeInBack(time: number, over: number) {
        let s = 1.70158
        return 1 * (time /= over) * time * ((s + 1) * time - s)
    },
    easeOutBack(time: number, over: number) {
        let s = 1.70158
        return 1 * ((time = time / over - 1) * time * ((s + 1) * time + s) + 1)
    },
    easeInOutBack(time: number, over: number) {
        let s = 1.70158
        if ((time /= over / 2) < 1) return 1 / 2 * (time * time * (((s *= (1.525)) + 1) * time - s))
        return 1 / 2 * ((time -= 2) * time * (((s *= (1.525)) + 1) * time + s) + 2)
    },
    easeInBounce(time: number, over: number) {
        return 1 - easings.easeOutBounce(over - time, over)
    },
    easeOutBounce(time: number, over: number) {
        if ((time /= over) < (1 / 2.75)) {
            return 1 * (7.5625 * time * time)
        } else if (time < (2 / 2.75)) {
            return 1 * (7.5625 * (time -= (1.5 / 2.75)) * time + 0.75)
        } else if (time < (2.5 / 2.75)) {
            return 1 * (7.5625 * (time -= (2.25 / 2.75)) * time + 0.9375)
        } else {
            return 1 * (7.5625 * (time -= (2.625 / 2.75)) * time + 0.984375)
        }
    },
    easeInOutBounce(time: number, over: number) {
        if (time < over / 2) return easings.easeInBounce(time * 2, over) * 0.5
        return easings.easeOutBounce(time * 2 - over, over) * 0.5 + 1 * 0.5
    }
}
