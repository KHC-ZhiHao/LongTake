import { Event } from './base';
import { Loader } from './loader';
import { Animate } from './animate';
import { DebugOptions } from './debug';
import { Sprite, ImageSprite, TextSprite } from './sprite';
declare type Channels = {
    addChild: {
        sprite: Sprite;
    };
    keydown: {
        key: string;
        code: string;
    };
    keyup: {
        key: string;
        code: string;
    };
    click: {
        x: number;
        y: number;
    };
    pointerdown: {
        x: number;
        y: number;
    };
    pointermove: {
        x: number;
        y: number;
    };
    pointerup: {};
    update: {
        timeTick: number;
        runningTime: number;
    };
};
/** 核心 */
export declare class LongTake extends Event<Channels> {
    /** 繪製圖的寬 */
    readonly width: number;
    /** 繪製圖的高 */
    readonly height: number;
    private _stop;
    private timeTick;
    private runningTime;
    private debug;
    private ticker;
    private remove;
    private frame;
    private frameTime;
    private frameTimeBuffer;
    private updateFrequency;
    /** 目前運行的canvas */
    private target;
    private context;
    private pointerEvent;
    private listenerWindowGroup;
    private listenerGroup;
    /** 主要運行的container，由本核心驅動內部精靈的update和event */
    private container;
    private interactive;
    private requestUpdate;
    private computedRunningTime;
    private update;
    private renderFrame;
    constructor(target: string | HTMLCanvasElement, width?: number, height?: number);
    static getDeviceFrameRate(accuracy?: number): Promise<number>;
    static get version(): string;
    static get helper(): {
        arc: number;
        rarc: number;
        ifEmpty<T>(data: T | undefined, def: T): T;
        sinByRad(deg: number): number;
        cosByRad(deg: number): number;
        getVector(deg: number, distance: number): {
            x: number;
            y: number;
        };
        randInt(min: number, max: number): number;
        getAngle(x: number, y: number, ax: number, ay: number): number;
        getRotationPosition(px: number, py: number, x: number, y: number, angle: number): {
            x: number;
            y: number;
        };
        getVisibility(): "xs" | "sm" | "md" | "lg" | "xl";
        getRandomColor(): string;
        twoPointDistance(x: number, y: number, x2: number, y2: number): number;
        imageResize(image: HTMLImageElement, scale: number): Promise<HTMLImageElement>;
    };
    static get renderPack(): {
        insetShadow(sprite: Sprite, options?: Partial<{
            blur: number;
            color: string;
            spread: number;
        }>): void;
        feather(sprite: Sprite, options?: Partial<{
            radius: number;
            strength: number;
        }>): void;
        blur(sprite: Sprite, options?: Partial<{
            radius: number;
        }>): void;
        colorTo: (sprite: Sprite, options?: Partial<{
            color: string;
            alpha: number;
        }>) => void;
        fillRoundRect: (sprite: Sprite, options?: Partial<{
            round: number;
            color: string;
        }>) => void;
    };
    static get Sprite(): typeof Sprite;
    static get ImageSprite(): typeof ImageSprite;
    static get TextSprite(): typeof TextSprite;
    static get Animate(): typeof Animate;
    static get Loader(): typeof Loader;
    get helper(): {
        arc: number;
        rarc: number;
        ifEmpty<T>(data: T | undefined, def: T): T;
        sinByRad(deg: number): number;
        cosByRad(deg: number): number;
        getVector(deg: number, distance: number): {
            x: number;
            y: number;
        };
        randInt(min: number, max: number): number;
        getAngle(x: number, y: number, ax: number, ay: number): number;
        getRotationPosition(px: number, py: number, x: number, y: number, angle: number): {
            x: number;
            y: number;
        };
        getVisibility(): "xs" | "sm" | "md" | "lg" | "xl";
        getRandomColor(): string;
        twoPointDistance(x: number, y: number, x2: number, y2: number): number;
        imageResize(image: HTMLImageElement, scale: number): Promise<HTMLImageElement>;
    };
    get isInteractive(): boolean;
    get playing(): boolean;
    /** 指定渲染幀率 */
    setFrame(frame: number): void;
    /** 指定更新率 */
    setUpdateFrequency(frequency: number): void;
    /** 只渲染不觸發 update 鉤子 */
    stop(): void;
    /** 如果為停止狀態的話繼續運行 */
    play(): void;
    /** 獲取所有子精靈 */
    getAllChildren(): Sprite[];
    /** 啟用開發者模式 */
    enabledDebugMode(active?: boolean, options?: DebugOptions): void;
    /** 清空所有精靈 */
    clear(): void;
    /** 關閉這個Longtake */
    close(): void;
    /** 加入一個精靈至 Container 底下 */
    addChildren(sprite: Sprite): void;
    /** 獲取運行時間(毫秒)，只會得到 10 的倍數結果 */
    getRunningTime(): number;
    /** 啟動互動模式 */
    enableInteractive(): null | undefined;
    private stageUpdate;
    private bitmapUpdate;
}
export {};
