import { Base } from './base'
import { helper } from './helper'
import { Easings, easings } from './easing'

type AnimateOptions = {
    /**
     * 每次前進的偵數
     * @default 0
     */
    push: number
    /**
     * 起始時間
     * @default 0
     */
    begin: number
    /**
     * 持續時間
     * @default 1
     */
    duration: number
    /**
     * 緩動函數
     * @see https://easings.net/zh-tw
     * @default 'linear'
     */
    easing: Easings
    /**
     * 反轉前進
     * @default false
     */
    reverse: boolean
    /**
     * 巡迴播放
     * @default false
     */
    alternate: boolean
    /** 執行動作 */
    action: (t: number) => void
}

/**
 * @desc 一個動畫的載具
 * @see {easing} https://easings.net/zh-tw
 */

export class Animate extends Base {
    /** 執行結束 */
    over = false
    private time = 0
    private options: AnimateOptions
    readonly actionEasing: any
    readonly pace: number
    constructor(options: Partial<AnimateOptions>) {
        super('Animate')
        this.options = {
            push: helper.ifEmpty(options.push, 60),
            begin: helper.ifEmpty(options.begin, 0),
            duration: helper.ifEmpty(options.duration, 1),
            easing: helper.ifEmpty<Easings>(options.easing, 'linear'),
            alternate: helper.ifEmpty(options.alternate, false),
            reverse: helper.ifEmpty(options.reverse, false),
            action: helper.ifEmpty(options.action, (() => null))
        }
        this.over = false
        this.actionEasing = easings[this.options.easing]
        this.pace = 1000 / this.options.push
        this.time = this.options.begin
    }

    /**
     * 往前推動一偵
     */

    move() {
        let { push, reverse, duration, action, alternate } = this.options
        let pace = 1000 / push
        if (this.over === false) {
            this.time += reverse ? -pace : pace
            let time = this.actionEasing(this.time, duration)
            action(time)
            if (alternate) {
                if (this.time >= duration) {
                    this.options.reverse = true
                } else if (reverse && this.time <= 0) {
                    this.options.reverse = false
                }
            } else if (reverse && this.time <= 0) {
                this.over = true
            } else if (this.time >= duration) {
                this.over = true
            }
            return time
        }
        return 1
    }

    /** 重起計算 */

    restart() {
        this.time = this.options.reverse ? this.options.duration : 0
        this.over = false
    }
}