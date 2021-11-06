import { Base } from './base';
/** 為掌管位圖的物件 */
export declare class Bitmap extends Base {
    /** 內部指向的離屏canvas */
    canvas: HTMLCanvasElement;
    /** cavnas 2d context */
    context: CanvasRenderingContext2D;
    /** 是否為快取狀態 */
    cache: boolean;
    /** 由 context.getImageData 取得的 int8Array 位圖元素 */
    imgData: ImageData | null;
    /** 由快取產生的圖片buffer */
    imgBitmap: HTMLImageElement | null;
    private _width;
    private _height;
    constructor(element?: HTMLCanvasElement);
    static isBitmap(object: any): boolean;
    get width(): number;
    set width(val: number);
    get height(): number;
    set height(val: number);
    /** 獲取渲染目標 */
    getRenderTarget(): HTMLCanvasElement | HTMLImageElement | null;
    /** 調整畫布大小 */
    resize(width: number, height: number): void;
    /** 清空畫布 */
    clear(): void;
    /** 當此位圖快取時，將render target轉換成img or imagebitmap加速渲染 */
    private cacheImageBitmap;
    /** 解除並清除圖片資料快取 */
    clearCache(): void;
    /** 取得位元位置的像素元素 RGBA */
    getPixel(x: number, y: number): [number, number, number, number];
    /** 獲取快取圖片資料 */
    getImageData(): ImageData | null;
    /** 清空圖片並貼上圖片資料 */
    putImageData(imgData: ImageData): void;
}
