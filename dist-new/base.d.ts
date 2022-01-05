/** 所有的模塊父類 */
export declare class Base {
    private moduleBase;
    constructor(name: string);
    /** 於 console 呼叫錯誤，中斷程序並顯示錯誤的物件 */
    systemError(functionName: string, message: string, object?: any): void;
}
declare type ListenerContext = {
    /** 唯一並隨機的 Listener ID */
    id: string;
    /** 關閉這個 Listener  */
    off: () => void;
    /** 一組可供當下 Listener 儲存的空白物件 */
    state: Record<string, any>;
};
declare type ListenerCallback<T> = (data: T, context: ListenerContext) => void;
declare class Listener<T> {
    /** 唯一並隨機的 Listener ID */
    readonly id: string;
    /** 一組可供當下 Listener 儲存的空白物件 */
    readonly state: Record<string, any>;
    /** 監聽的頻道 */
    readonly channel: string;
    private callback;
    private manager;
    constructor(manager: Event<any>, channel: string, callback: ListenerCallback<any>);
    /** 觸發這個監聽對象 */
    invoke(data: T): void;
    /** 關閉這個 Listener */
    off(): void;
}
export declare class Event<T extends Record<string, Record<string, any>>> extends Base {
    private listeners;
    /** 獲取指定頻道的監聽數量 */
    getChannelListenerSize<K extends keyof T>(channel: K): number;
    /** 發送資料至指定頻道 */
    emit<K extends keyof T>(channel: K, data: T[K]): void;
    /** 停止指定 ID 的監聽者 */
    off<K extends keyof T>(channel: K, id: string): void;
    /** 監聽指定頻道 */
    on<K extends keyof T>(channel: K, callback: ListenerCallback<T[K]>): Listener<T[K]>;
}
export {};
