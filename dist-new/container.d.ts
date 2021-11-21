import { Base } from './base';
import { Sprite } from './sprite';
import { Bitmap } from './bitmap';
import { LongTake } from './longtake';
/** 一個靜態的精靈容器，負責呈現精靈與位圖的計算結果 */
export declare class Container extends Base {
    /** 是否指向LongTakeCore */
    core: LongTake | null;
    /** 主精靈 */
    stage: Sprite;
    /** 主位圖 */
    bitmap: Bitmap;
    context: CanvasRenderingContext2D;
    /** 當此Container指向LongTakeCore時，該值會隨著鼠標或觸碰位置改變 */
    pointerX: number;
    /** 當此Container指向LongTakeCore時，該值會隨著鼠標或觸碰位置改變 */
    pointerY: number;
    private stackOpacity;
    constructor(width: number, height: number, core?: LongTake);
    /** 位圖寬(與位圖同步) */
    get width(): number;
    /** 位圖高(與位圖同步) */
    get height(): number;
    /** 當 sprite 優先註冊過事件，在 install container 的時候回補註冊至 LongTake */
    register(sprite: Sprite): void;
    stageUpdate(): void;
    stageRender(): void;
    /** 獲取該 Container 的 ImageBitmap */
    getImageBitmap(callback: (canvas: HTMLCanvasElement) => void): void;
    /** 加入一個子精靈 */
    addChildren(sprite: Sprite): void;
    draw(): void;
    render(sprite: Sprite): void;
    transform(sprite: Sprite): void;
    restore(sprite: Sprite): void;
}
