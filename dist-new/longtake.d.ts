import { Event } from './base';
import { Loader } from './loader';
import { Animate } from './animate';
import { Sprite, ImageSprite, TextSprite } from './sprite';
/** 核心 */
declare type Channels = {
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
};
export declare class LongTake extends Event<Channels> {
    /** 繪製圖的寬 */
    readonly width: number;
    /** 繪製圖的高 */
    readonly height: number;
    private ticker;
    private remove;
    /** 目前運行的canvas */
    private target;
    private context;
    private pointerEvent;
    private listenerWindowGroup;
    private listenerGroup;
    /** 主要運行的container，由本核心驅動內部精靈的update和event */
    private container;
    private bindUpdate;
    private interactive;
    private supportRequestAnimationFrame;
    private requestAnimationFrame;
    constructor(target: string | HTMLCanvasElement, width?: number, height?: number);
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
        getVisibility(): "xs" | "sm" | "md" | "lg" | "xl";
        getRandomColor(): string;
        imageResize(image: HTMLImageElement, scale: number): Promise<HTMLImageElement>;
    };
    static get renderPack(): {
        colorTo: (sprite: Sprite, options: Partial<{
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
        getVisibility(): "xs" | "sm" | "md" | "lg" | "xl";
        getRandomColor(): string;
        imageResize(image: HTMLImageElement, scale: number): Promise<HTMLImageElement>;
    };
    get stage(): Sprite;
    /** 清空所有精靈 */
    clear(): void;
    /** 關閉這個Longtake */
    close(): void;
    /** 加入一個精靈至 container 底下 */
    addChildren(sprite: Sprite): void;
    /** 啟動互動模式 */
    enableInteractive(): null | undefined;
    private update;
    private stageUpdate;
    private bitmapUpdate;
}
export {};
