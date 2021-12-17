import { Base } from './base';
import { Bitmap } from './bitmap';
import { LongTake } from './longtake';
export declare type DebugOptions = {};
declare class PositionBitmap extends Bitmap {
    constructor();
}
export declare class Debug extends Base {
    core: LongTake;
    bitmap: Bitmap;
    options: DebugOptions;
    context: CanvasRenderingContext2D;
    positionBitmap: PositionBitmap;
    constructor(core: LongTake, options: DebugOptions);
    private bindEvent;
    render(): void;
}
export {};
