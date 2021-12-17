import { Base } from './base';
import { Sprite } from './sprite';
import { Bitmap } from './bitmap';
import { LongTake } from './longtake';
/** 一個靜態的精靈容器，負責呈現精靈與位圖的計算結果 */
export declare class Container extends Base {
    /** 指向LongTake */
    core: LongTake;
    /** 主精靈 */
    stage: Sprite;
    /** 主位圖 */
    bitmap: Bitmap;
    context: CanvasRenderingContext2D;
    constructor(width: number, height: number, core: LongTake);
    /** 位圖寬(與位圖同步) */
    get width(): number;
    /** 位圖高(與位圖同步) */
    get height(): number;
    stageUpdate(): void;
    stageRender(): void;
    /** 加入一個子精靈 */
    addChildren(sprite: Sprite): void;
    draw(): void;
    render(sprite: Sprite): void;
    private needSave;
    transform(sprite: Sprite): void;
}
