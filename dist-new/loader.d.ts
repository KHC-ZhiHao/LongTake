import { Base } from './base';
/** 針對圖片預載入的載具 */
export declare class Loader extends Base {
    private data;
    private files;
    private completed;
    private fileLength;
    private isStart;
    constructor();
    /** 驗證檔案是否正確 */
    private validateFile;
    /** 等待載入完成，若載入已完成，直接執行 callback */
    onload(callback: () => void): void;
    /** 執行載入 */
    start(loading?: (completed: number, fileLength: number) => void): null | undefined;
    /** 加入一個等待載入檔案 */
    add(name: string, src: string): void;
    /** 取得一個載入完畢的檔案 */
    get(name: string): ImageBitmap | HTMLImageElement | undefined;
    /** 清除指定資料 */
    remove(name: string): void;
    /** 清除所有快取 */
    clear(): void;
}
