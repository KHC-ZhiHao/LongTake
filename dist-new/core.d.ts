import { Base } from './base';
import { Sprite } from './sprite';
import { Container } from './container';
export declare class Core extends Base {
    /** 繪製圖的寬 */
    width: number;
    /** 繪製圖的高 */
    height: number;
    /** 目前運行的偵數 */
    ticker: number;
    /** 目前運行的 canvas */
    target: HTMLCanvasElement;
    /** 目前運行的 canvas context 2d */
    context: CanvasRenderingContext2D;
    /** 主要運行的 container，由本核心驅動內部精靈的 update 和 event */
    container: Container;
    /** 目前實際運行的 fps */
    baseFps: number;
    /** 整體視圖倍率 */
    viewScale: number;
    private remove;
    private camera;
    private framePerSecond;
    animationFrame: ((callback: FrameRequestCallback) => number) & typeof requestAnimationFrame;
    /** 目前運行的 canvas 實際大小 */
    constructor(target: HTMLCanvasElement, width: number, height: number);
    get targetRect(): DOMRect;
    /** 設置動畫的FPS */
    setFPS(fps: number): void;
    /**
     * @function close()
     * @desc 關閉這個Longtake
     */
    close(): void;
    /** 移動鏡頭至指定位置 */
    setCamera(x: number, y: number): void;
    /**
     * @function targetResize(width,height)
     * @desc 調整視圖canvas的大小
     */
    targetResize(width: number, height: number): void;
    /**
     * @function addChildren(sprite)
     * @desc 加入一個精靈至container底下
     */
    addChildren(sprite: Sprite): void;
    update(): null | undefined;
    stageUpdate(): void;
    bitmapUpdate(): void;
}
