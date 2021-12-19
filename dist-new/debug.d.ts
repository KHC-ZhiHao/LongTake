import { Base } from './base';
import { Sprite } from './sprite';
import { Bitmap } from './bitmap';
import { LongTake } from './longtake';
export declare type DebugOptions = {};
declare class PositionBitmap extends Bitmap {
    constructor();
}
export declare class Debug extends Base {
    now: number;
    core: LongTake;
    bitmap: Bitmap;
    options: DebugOptions;
    context: CanvasRenderingContext2D;
    selectSprite: Sprite | null;
    positionBitmap: PositionBitmap;
    constructor(core: LongTake, options: DebugOptions);
    private bindDrag;
    private bindEvent;
    renderSprite(sprite: Sprite): void;
    renderSpriteInfo(): void;
    render(): void;
}
export {};
