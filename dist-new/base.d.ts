declare type Channels = Record<string, Record<string, any>>;
declare type ListenersCallback<T = any> = (Context: {
    id: string;
    data: T;
}) => void;
export declare class Base<T extends Channels = Channels> {
    protected _baseAttr: {
        name: string;
        listeners: Map<string, {
            id: string;
            callback: ListenersCallback;
        }[]>;
    };
    constructor(name: string);
    /**
    * 監聽指定事件，並回傳 ID
    */
    on<K extends keyof T>(channel: K, callback: ListenersCallback<T[K]>): string;
    /**
    * 關閉指定監聽對象，透過 ID 刪除
    */
    off<K extends keyof T>(channel: K, id: string): void;
    /**
    * 發送指定事件
    */
    protected emit<K extends keyof T>(channel: K, data: T[K]): void;
    /**
    * 於 console 印列錯誤，中斷程序並顯示錯誤的物件
    */
    protected systemError(functionName: string, message: string, object: any): void;
}
export {};
