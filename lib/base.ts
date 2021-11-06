type Channels = Record<string, Record<string, any>>
type ListenersCallback<T = any> = (Context: { id: string, data: T }) => void

export class Base<T extends Channels = Channels> {
    protected _baseAttr: {
        name: string
        listeners: Map<string, {
            id: string
            callback: ListenersCallback
        }[]>
    }

    constructor(name: string){
        this._baseAttr = {
            name : name || "No module base name.",
            listeners: new Map()
        }
    }

    /**
    * 監聽指定事件，並回傳 ID
    */

    on<K extends keyof T>(channel: K, callback: ListenersCallback<T[K]>) {
        let id = Date.now().toString() + Math.floor(Math.random() * 100000).toString()
        let myChannel = channel as string
        if (this._baseAttr.listeners.has(myChannel)) {
            this._baseAttr.listeners.set(myChannel, [])
        }
        this._baseAttr.listeners.get(myChannel)?.push({
            id,
            callback
        })
        return id
    }

    /**
    * 關閉指定監聽對象，透過 ID 刪除
    */

    off<K extends keyof T>(channel: K, id: string) {
        let listeners = this._baseAttr.listeners.get(channel as string)
        if (listeners) {
            this._baseAttr.listeners.set(channel as string, listeners.filter(e => {
                return e.id !== id
            }))
        }
    }

    /**
    * 發送指定事件
    */

    protected emit<K extends keyof T>(channel: K, data: T[K]) {
        let listeners = this._baseAttr.listeners.get(channel as string)
        if (listeners) {
            listeners.forEach(e => e.callback({
                id: e.id,
                data
            }))
        }
    }

    /**
    * 於 console 印列錯誤，中斷程序並顯示錯誤的物件
    */
    
    protected systemError(functionName: string, message: string, object: any) {
        if (object) {
            console.log(`%c error object is : `, 'color:#FFF; background:red')
            console.log(object)
        }
        throw new Error(`(☉д⊙) Longtake!! ${this._baseAttr.name} => ${functionName} -> ${message}`)
    }
}
