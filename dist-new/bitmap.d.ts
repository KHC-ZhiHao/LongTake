import { Base } from './base';
/** 為掌管位圖的物件 */
export declare class Bitmap extends Base {
    /** 內部指向的離屏 canvas */
    readonly canvas: HTMLCanvasElement;
    /** cavnas 2d context */
    readonly context: CanvasRenderingContext2D;
    /** 是否為快取狀態 */
    cache: boolean;
    /** 由快取產生的圖片buffer */
    private imgBitmap;
    private _width;
    private _height;
    constructor(width?: number, height?: number, element?: HTMLCanvasElement);
    static isBitmap(object: any): boolean;
    get width(): number;
    set width(val: number);
    get height(): number;
    set height(val: number);
    /** 獲取渲染目標 */
    getRenderTarget(): HTMLCanvasElement | HTMLImageElement | ImageBitmap;
    /** 調整畫布大小 */
    resize(width: number, height: number): void;
    /** 清空畫布 */
    clear(): void;
    /** 當此位圖快取時，將 render target 轉換成 img or imagebitmap 加速渲染 */
    cacheImageBitmap(): void;
    /** 解除並清除圖片資料快取 */
    clearCache(): void;
    /** 獲取快取圖片資料 */
    getImageData(): ImageData;
    /** 獲得排除空白空間的矩形 */
    getTrimSize(): {
        top: number;
        left: number;
        width: number;
        height: number;
    };
}
