import { Event } from './base';
import { Bitmap } from './bitmap';
import { Container } from './container';
/**
 * 合成模式
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
 */
declare type BlendMode = 'inherit' | 'source-over' | 'source-in' | 'source-out' | 'source-atop' | 'destination-over' | 'destination-in' | 'destination-out' | 'destination-atop' | 'lighter' | 'copy' | 'xor' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
declare type Channels = {
    click: {};
};
/** 建立一個動畫精靈，為 LongTake 的驅動核心 */
export declare class Sprite extends Event<Channels> {
    main: Container | null;
    bitmap: Bitmap;
    parent: Sprite | null;
    context: CanvasRenderingContext2D;
    _children: Sprite[];
    _status: {
        sort: boolean;
        cache: boolean;
        remove: boolean;
        hidden: boolean;
        childrenDead: boolean;
    };
    _transform: {
        skewX: number;
        skewY: number;
        scaleWidth: number;
        scaleHeight: number;
        rotation: number;
        opacity: number;
        blendMode: BlendMode;
    };
    _position: {
        x: number;
        y: number;
        z: number;
        screenX: number;
        screenY: number;
        anchorX: number;
        anchorY: number;
    };
    private bindUpdateForChild;
    constructor();
    get helper(): {
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
        getRandomColor(): string;
    };
    /** 檢測一個物件是否為精靈 */
    static isSprite(object: any): boolean;
    _onClick(screenX: number, screenY: number): void;
    /** 迭代所有子精靈 */
    eachChildren(callback: (child: Sprite) => void): void;
    /** 迭代所有子精靈(包含子精靈的子精靈) */
    eachChildrenDeep(callback: (child: Sprite) => void): void;
    /** 被加入 LongTake 時執行，並載入 LongTake */
    _install(main: Container): void;
    /** 當被加入stage時呼叫該函式 */
    create(sprite: this): void;
    /** 精靈寬(和Bitmap同步) */
    get width(): number;
    /** 精靈寬(和Bitmap同步) */
    set width(val: number);
    /** 精靈高(和Bitmap同步) */
    get height(): number;
    /** 精靈高(和Bitmap同步) */
    set height(val: number);
    /** 調整精靈的bitmap大小 */
    resize(width: number | {
        width: number;
        height: number;
    }, height?: number): void;
    /** 加入一個子精靈 */
    addChildren(sprite: Sprite): void;
    /** 重新排列子精靈，當子精靈有 Z 值改變時會自動觸發 */
    _sortChildren(): void;
    /** 是否有變形 */
    isTransform(): boolean;
    /** 設定放大倍率 */
    scale(width: number, height: number): void;
    /** 放大寬 */
    get scaleWidth(): number;
    /** 放大寬 */
    set scaleWidth(val: number);
    /** 放大高 */
    get scaleHeight(): number;
    /** 放大高 */
    set scaleHeight(val: number);
    /** 該精靈在最後顯示的總倍率寬 */
    get screenScaleWidth(): number;
    /** 該精靈在最後顯示的總倍率高 */
    get screenScaleHeight(): number;
    /** 旋轉 */
    get rotation(): number;
    /** 旋轉 */
    set rotation(val: number);
    /** 合成模式 */
    get blendMode(): BlendMode;
    /** 合成模式 */
    set blendMode(val: BlendMode);
    /** 透明度 */
    get opacity(): number;
    /** 透明度 */
    set opacity(val: number);
    /** 傾斜X */
    get skewX(): number;
    /** 傾斜X */
    set skewX(val: number);
    /** 傾斜Y */
    get skewY(): number;
    /** 傾斜Y */
    set skewY(val: number);
    /** 設定錨點 */
    setAnchor(x: number, y?: number): void;
    /** 定位點X */
    get x(): number;
    /** 定位點X */
    set x(val: number);
    /** 定位點Y */
    get y(): number;
    /** 定位點Y */
    set y(val: number);
    /** 高度，每次設定會重新排序 */
    get z(): number;
    /** 高度，每次設定會重新排序 */
    set z(val: number);
    /** 絕對位置X */
    get screenX(): number;
    /** 絕對位置Y */
    get screenY(): number;
    /** 絕對位置的錨點位置X */
    get posX(): number;
    /** 絕對位置的錨點位置Y */
    get posY(): number;
    /** 錨點X */
    get anchorX(): number;
    /** 錨點X */
    set anchorX(val: number);
    /** 錨點Y */
    get anchorY(): number;
    /** 錨點Y */
    set anchorY(val: number);
    get canRender(): boolean;
    get canShow(): boolean;
    /** 快取目前渲染的 Bitmap */
    cache(): void;
    /** 解除快取狀態 */
    unCache(): void;
    /** 隱藏 */
    hidden(bool: boolean): void;
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
    update(sprite: this): void;
    /** 每次執行 update 時呼叫此函式，處理 Z 值更動的排序與移除子精靈 */
    _mainUpdate(): void;
    /** 呼叫子精靈更新 */
    private updateForChild;
    /** 移除自身的綁定資訊(容易出錯，請使用remove讓精靈在迭代過程中被移除) */
    _close(): void;
    /** 移除自己於父精靈下 */
    remove(): void;
    /** 移除指定的子精靈 */
    removeChild(sprite: Sprite): void;
    /** 移除全部的子精靈 */
    clearChildren(): void;
    /** 移除指定 index 的精靈 */
    removeChildrenByIndex(index: number): void;
    /** 渲染 bitmap 的方法 */
    render(sprite: this): void;
    /** 主要渲染程序，包含渲染與濾鏡 */
    _mainRender(): void;
    /** 呼叫子精靈渲染 */
    private renderForChild;
    /** 座標是否在精靈的矩形範圍內 */
    inRect(x: number, y: number): boolean;
}
export declare class ImageSprite extends Sprite {
    readonly render: any;
    constructor(image: HTMLImageElement | ImageBitmap);
}
declare type TextOptions = {
    color: string;
    padding: number;
    fontSize: number;
    fontFamily: string;
    backgroundColor: string | null;
};
export declare class TextSprite extends Sprite {
    private text;
    private options;
    readonly render: any;
    constructor(options?: Partial<TextOptions>);
    private drawText;
    private getByteLength;
    setContent(text: string): void;
}
export {};
