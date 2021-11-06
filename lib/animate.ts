import { Base } from './base'
import { easings, Easings } from './easing'

type Options = {
    /**
     * 起始運行時間
     * @default 0
     */
    begin?: number
    /**
     * 移動曲線
     * @see https://easings.net/zh-tw
     * @default 'linear'
     */
    easing?: Easings
    /**
     * 巡迴播放
     * @default false
     */
    alternate?: boolean
    /**
     * 反轉前進
     * @default false
     */
    reverse?: boolean
}

type Channels = {
    move: {
        time: number
    }
}

/** 一個動畫的載具 */

export class Animate extends Base<Channels> {
    /** 總運行時間 */
    private duration: number
    private easing: Easings
    private alternate: boolean
    private reverse: boolean
    /** 現在運行的偵數 */
    private time: number
    private over = false
    private actionEasing: any
    constructor(duration: number, options: Options) {
        super('Animate')
        this.time = options.begin || 0
        this.easing = options.easing || 'linear'
        this.reverse = options.reverse || false
        this.duration = duration
        this.alternate = options.alternate || false
        this.actionEasing = easings[this.easing]
        if (this.reverse) {
            this.time = this.duration
        }
    }

    /**
     * 執行是否結束
     */

    isOver() {
        return this.over
    }

    /**
     * 往前推動一偵
     */

    move(push = 60) {
        let pace = 1000 / push
        if (this.over === false) {
            let time = this.actionEasing(this.time += this.reverse ? -pace : pace, this.duration)
            this.emit('move', {
                time
            })
            if (this.alternate) {
                if (this.time >= this.duration) {
                    this.reverse = true
                } else if (this.reverse && this.time <= 0) {
                    this.reverse = false
                }
            } else if (this.reverse && this.time <= 0) {
                this.over = true
            } else if (this.time >= this.duration) {
                this.over = true
            }
            return time
        }
        return 1
    }

    /**
     * 重起計算
     */

    restart() {
        this.time = this.reverse ? this.duration : 0
        this.over = false
    }
}
