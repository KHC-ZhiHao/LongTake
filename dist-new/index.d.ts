import { Loader as _Loader } from './loader';
import { Animate as _Animate } from './animate';
import { LongTake as _LongTake } from './longtake';
import { Sprite as _Sprite, ImageSprite as _ImageSprite } from './sprite';
export declare type Sprite = _Sprite;
export declare type Loader = _Loader;
export declare type Animate = _Animate;
export declare type ImageSprite = _ImageSprite;
export declare type LongTake = _LongTake;
export declare const helper: {
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
export declare const Sprite: typeof _Sprite;
export declare const Loader: typeof _Loader;
export declare const Animate: typeof _Animate;
export declare const LongTake: typeof _LongTake;
export declare const ImageSprite: typeof _ImageSprite;
export default LongTake;