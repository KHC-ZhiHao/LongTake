/** 所有的模塊父類 */

export class Base {
    private moduleBase = {
        name: 'No module base name.'
    }

    constructor(name: string) {
        if (name) {
            this.moduleBase.name = name
        }
    }

    /** 於 console 呼叫錯誤，中斷程序並顯示錯誤的物件 */

    systemError(functionName: string, message: string, object?: any) {
        if (object) {
            console.log(`%c error object is : `, 'color:#FFF; background:red')
            console.log(object)
        }
        throw new Error(`(☉д⊙)!! ${this.moduleBase.name} => ${functionName} -> ${message}`)
    }
}

// Event

type ListenerContext = {
    /** 唯一並隨機的 Listener ID */
    id: string
    /** 關閉這個 Listener  */
    off: () => void
    /** 一組可供當下 Listener 儲存的空白物件 */
    state: Record<string, any>
}

type ListenerCallback<T> = (data: T, context: ListenerContext) => void

class Listener<T> {
    /** 唯一並隨機的 Listener ID */
    readonly id = Date.now().toString() + Math.floor(Math.random() * 1000000)
    /** 一組可供當下 Listener 儲存的空白物件 */
    readonly state: Record<string, any> = {}
    /** 監聽的頻道 */
    readonly channel: string
    private callback: ListenerCallback<T>
    private manager: Event<any>

    constructor(manager: Event<any>, channel: string, callback: ListenerCallback<any>) {
        this.manager = manager
        this.channel = channel
        this.callback = callback
    }

    /** 觸發這個監聽對象 */

    invoke(data: T) {
        this.callback(data, {
            id: this.id,
            off: () => this.off(),
            state: this.state
        })
    }

    /** 關閉這個 Listener */

    off() {
        this.manager.off(this.channel, this.id)
    }
}

export class Event<T extends Record<string, Record<string, any>>> extends Base {
    private listeners: Map<string, Listener<any>[]> = new Map()

    /** 獲取指定頻道的監聽數量 */

    getChannelListenerSize<K extends keyof T>(channel: K) {
        let listeners = this.listeners.get(channel as string)
        if (listeners) {
            return listeners.length
        } else {
            return 0
        }
    }

    /** 發送資料至指定頻道 */

    emit<K extends keyof T>(channel: K, data: T[K]) {
        let listeners = this.listeners.get(channel as string)
        if (listeners) {
            for (let listener of listeners) {
                listener.invoke(data)
            }
        }
    }

    /** 停止指定 ID 的監聽者 */

    off<K extends keyof T>(channel: K, id: string) {
        let key = channel as string
        let listeners = this.listeners.get(key)
        if (listeners) {
            this.listeners.set(key, listeners.filter(e => e.id !== id))
        }
    }

    /** 監聽指定頻道 */

    on<K extends keyof T>(channel: K, callback: ListenerCallback<T[K]>) {
        let key = channel as string
        let listener: Listener<T[K]> = new Listener(this, key, callback)
        if (this.listeners.has(key) === false) {
            this.listeners.set(key, [])
        }
        (this.listeners.get(key) as any).unshift(listener)
        return listener
    }
}
