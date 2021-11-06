import { Core } from './core';
export declare class Camera {
    x: number;
    y: number;
    core: Core;
    constructor(core: Core);
    get offsetX(): number;
    get offsetY(): number;
    checkBorder(pos: number, view: number, target: number): number;
}
