import { Base } from './base';
import { Loader } from './loader';
import { Animate } from './animate';
import { Sprite, ImageSprite } from './sprite';
/** 核心 */
export declare class LongTake extends Base {
    /** 目前運行的canvas實際大小 */
    targetRect: DOMRect;
    event: Record<string, (event: any) => void>;
    eventAction: Record<string, any>;
    /** 繪製圖的寬 */
    readonly width: number;
    /** 繪製圖的高 */
    readonly height: number;
    private ticker;
    private remove;
    /** 目前運行的canvas */
    private target;
    private context;
    /** 主要運行的container，由本核心驅動內部精靈的update和event */
    private container;
    private camera;
    private bindUpdate;
    private bindWindowResize;
    private supportRequestAnimationFrame;
    private requestAnimationFrame;
    constructor(target: string | HTMLCanvasElement, width: number, height: number);
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
    };
    static get Sprite(): typeof Sprite;
    static get ImageSprite(): typeof ImageSprite;
    static get Animate(): typeof Animate;
    static get Loader(): typeof Loader;
    /** 清空所有精靈 */
    clear(): void;
    /** 關閉這個Longtake */
    close(): void;
    /** 移動鏡頭至 x,y */
    setCamera(x: number, y: number): void;
    /** 監聽一個事件 */
    addEvent(eventName: string, callback?: (event: any) => void): void;
    /** 加入一個精靈至 container 底下 */
    addChildren(sprite: Sprite): void;
    /** 重新設定矯正過後的觸及位置 */
    private resetPointerCoordinate;
    private windowResize;
    private update;
    private stageUpdate;
    private bitmapUpdate;
}
