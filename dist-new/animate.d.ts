import { Base } from './base';
import { Easings } from './easing';
declare type AnimateOptions = {
    /**
     * 每次前進的偵數
     * @default 0
     */
    push: number;
    /**
     * 起始時間
     * @default 0
     */
    begin: number;
    /**
     * 持續時間
     * @default 1
     */
    duration: number;
    /**
     * 緩動函數
     * @see https://easings.net/zh-tw
     * @default 'linear'
     */
    easing: Easings;
    /**
     * 反轉前進
     * @default false
     */
    reverse: boolean;
    /**
     * 巡迴播放
     * @default false
     */
    alternate: boolean;
    /**
     * 等待指定毫秒後執行
     * @default 0
     */
    delay: number;
    /** 執行動作 */
    action: (t: number, d: number) => void;
};
/**
 * @desc 動畫執行的載具
 * @see {easing} https://easings.net/zh-tw
 */
export declare class Animate extends Base {
    /** 執行結束 */
    over: boolean;
    delay: number;
    private time;
    private options;
    readonly actionEasing: any;
    readonly pace: number;
    constructor(options: Partial<AnimateOptions>);
    /**
     * 往前推動一偵
     */
    move(): any;
    /** 重起計算 */
    restart(): void;
}
export {};
