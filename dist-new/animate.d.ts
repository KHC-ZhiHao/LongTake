import { Base } from './base';
import { Easings } from './easing';
declare type Options = {
    /**
     * 起始運行時間
     * @default 0
     */
    begin?: number;
    /**
     * 移動曲線
     * @see https://easings.net/zh-tw
     * @default 'linear'
     */
    easing?: Easings;
    /**
     * 巡迴播放
     * @default false
     */
    alternate?: boolean;
    /**
     * 反轉前進
     * @default false
     */
    reverse?: boolean;
};
declare type Channels = {
    move: {
        time: number;
    };
};
/** 一個動畫的載具 */
export declare class Animate extends Base<Channels> {
    /** 總運行時間 */
    private duration;
    private easing;
    private alternate;
    private reverse;
    /** 現在運行的偵數 */
    private time;
    private over;
    private actionEasing;
    constructor(duration: number, options: Options);
    /**
     * 執行是否結束
     */
    isOver(): boolean;
    /**
     * 往前推動一偵
     */
    move(push?: number): any;
    /**
     * 重起計算
     */
    restart(): void;
}
export {};
