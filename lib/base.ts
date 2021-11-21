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

    /** 跑一個迴圈 */

    each(target: Array<any> | Record<string, any>, callback: (data: any, index: any) => '_break' | '_continue' | void) {
        if (typeof target === 'object') {
            if (Array.isArray(target)) {
                let len = target.length
                for (let i = 0; i < len; i++) {
                    let br = callback(target[i], i)
                    if (br === '_break') {
                        break
                    }
                    if (br === '_continue') {
                        continue
                    }
                }
            } else {
                for (let key in target) {
                    let br = callback(target[key], key)
                    if (br === '_break') {
                        break
                    }
                    if (br === '_continue') {
                        continue
                    }
                }
            }
        } else {
            this.systemError('each', 'Not a object or array.', target)
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
