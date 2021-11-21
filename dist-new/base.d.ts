/** 所有的模塊父類 */
export declare class Base {
    private moduleBase;
    constructor(name: string);
    /** 跑一個迴圈 */
    each(target: Array<any> | Record<string, any>, callback: (data: any, index: any) => '_break' | '_continue' | void): void;
    /** 於 console 呼叫錯誤，中斷程序並顯示錯誤的物件 */
    systemError(functionName: string, message: string, object?: any): void;
}
