import { Base } from './base';
/** 針對圖片預載入的載具 */
export declare class Loader extends Base {
    data: Record<string, ImageBitmap | HTMLImageElement>;
    files: Record<string, string>;
    fileLength: number;
    completed: number;
    constructor();
    /** 等待載入完成，若載入已完成，直接執行 callback */
    onload(callback: () => void): void;
    /** 執行載入 */
    start(loading: (completed: number, fileLength: number) => void): void;
    /** 加入一個等待載入檔案 */
    add(name: string, src: string): void;
    /** 驗證檔案是否正確 */
    private validateFile;
    /** 取得一個載入完畢的檔案 */
    get(name: string): ImageBitmap | HTMLImageElement | undefined;
    /** 清除快取釋放記憶體 */
    close(name?: string): void;
}
