import { Base } from './base';
import { Bitmap } from './bitmap';
import { BlendMode } from './types';
/** 建立一個動畫精靈，為 LongTake 的驅動單位 */
export declare class Sprite extends Base {
    name: string;
    parent: Sprite | null;
    helper: {
        arc: number;
        rarc: number;
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
    bitmap: Bitmap;
    context: CanvasRenderingContext2D;
    private children;
    private readonly status;
    readonly transform: {
        skewX: number;
        skewY: number;
        scaleWidth: number;
        scaleHeight: number;
        rotation: number;
        opacity: number;
        blendMode: BlendMode;
    };
    readonly position: {
        x: number;
        y: number;
        z: number;
        anchorX: number;
        anchorY: number;
    };
    constructor(name: string);
    /** 檢測一個物件是否為精靈 */
    static isSprite(object: any): boolean;
    /** 迭代所有子精靈 */
    eachChildren(callback: (sprite: Sprite) => void): void;
    /** 迭代所有子精靈(包含子精靈的子精靈) */
    eachChildrenDeep(callback: (sprite: Sprite) => void): void;
    /** Sprite 加入 Core 時執行初始化 */
    protected install(): void;
    /** 當被加入 container stage 時呼叫該函式 */
    create(): void;
    /**
     * @member {number} width 精靈寬(和Bitmap同步)
     * @member {number} height 精靈高(和Bitmap同步)
     */
    get width(): number;
    set width(val: number);
    get height(): number;
    set height(val: number);
    /** 調整精靈的bitmap大小 */
    resize(width: number, height: number): void;
    /** 加入一個子精靈 */
    addChildren(sprite: Sprite): void;
    /** 重新排序子精靈，當子精靈有Z值改變時會自動觸發 */
    private sortChildren;
    /** 是否有變形 */
    hasTransform(): boolean;
    /** 設定放大倍率 */
    scale(width: number, height?: number): void;
    get scaleWidth(): number;
    set scaleWidth(val: number);
    get scaleHeight(): number;
    set scaleHeight(val: number);
    get screenScaleWidth(): number;
    get screenScaleHeight(): number;
    get rotation(): number;
    set rotation(val: number);
    get blendMode(): BlendMode;
    set blendMode(val: BlendMode);
    get opacity(): number;
    set opacity(val: number);
    get skewX(): number;
    set skewX(val: number);
    get skewY(): number;
    set skewY(val: number);
    /** 設定錨點 */
    setAnchor(x: number, y: number): void;
    get x(): number;
    set x(val: number);
    get y(): number;
    set y(val: number);
    get z(): number;
    set z(val: number);
    get screenX(): number;
    get screenY(): number;
    get posX(): number;
    get posY(): number;
    get anchorX(): number;
    set anchorX(val: number);
    get anchorY(): number;
    set anchorY(val: number);
    canRender(): boolean;
    canShow(): boolean;
    /** 快取目前渲染的 bitmap */
    cache(): void;
    /** 手動解除快取狀態 */
    unCache(): void;
    /** 隱藏 */
    hidden(hidden: boolean): void;
    /** 解除隱藏 */
    unHidden(): void;
    /** 獲取該精靈實際呈現的大小 */
    getRealSize(): {
        width: number;
        height: number;
    };
    /** 獲取精靈在畫布的準確位置 */
    getRealPosition(): {
        x: number;
        y: number;
    };
    /** 每次渲染圖形時執行此函式，目的為精靈的動作 */
    update(): void;
    /** 每次執行update時呼叫此函式，處理Z值更動的排序與移除子精靈 */
    _mainUpdate(): void;
    /** 移除自己於父精靈下 */
    remove(): void;
    /** 移除指定的子精靈 */
    removeChild(sprite: Sprite): void;
    /** 移除全部的子精靈 */
    clearChildren(): void;
    /** 渲染 bitmap 的方法 */
    render(): void;
    /**
     * @function mainRender()
     * @private
     * @desc 主要渲染程序，包含渲染與濾鏡
     */
    _mainRender(): void;
    /** 將精靈設置成img檔案的解析度，並渲染該圖片且快取 */
    fromImage(img: HTMLImageElement): this;
    /** 座標是否在精靈的矩形範圍內 */
    inRect(x: number, y: number): boolean;
}
