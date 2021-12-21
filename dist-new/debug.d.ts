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
    listeners: any[];
    positionBitmap: PositionBitmap;
    constructor(core: LongTake, options: DebugOptions);
    close(): void;
    private bindDrag;
    renderSprite(sprite: Sprite, color: string): void;
    renderSpriteInfo(): void;
    render(): void;
}
export {};
