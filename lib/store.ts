import { Event } from './base'
import { helper } from './helper'
import { Sprite } from "./sprite"

type Channels<T> = {
    pick: {
        id: string
        sprite: T
        recycle: () => void
    }
}

export class Store<T extends Sprite> extends Event<Channels<T>> {
    _list: {
        id: string
        sprite: T
        running: boolean
    }[] = []

    constructor() {
        super('store')
    }

    static preGen<T extends Sprite>(params: {
        preGenCount: number
        creater: () => T
    }) {
        const store = new Store<T>()
        const create = () => {
            const newTarget = params.creater()
            const id = store.add(newTarget)
            newTarget.on('remove', () => {
                store.recycle(id)
            })
        }
        for (let i = 0; i < params.preGenCount; i++) {
            create()
        }
        return {
            store,
            take: () => {
                let target = store.get()
                if (target) {
                    return target
                }
                create()
                return store.get()
            }
        }
    }

    get size() {
        return this._list.length
    }

    get waitingSize() {
        return this._list.filter(item => !item.running).length
    }

    add(sprite: T) {
        const id = Date.now().toString() + helper.randInt(100000, 999999)
        this._list.push({
            id,
            sprite,
            running: false
        })
        return id
    }

    get(): null | T {
        return this.getWithDetail()?.sprite ?? null
    }

    getWithDetail(): null | {
        id: string
        sprite: T
        recycle: () => void
    } {
        const item = this._list.find(item => !item.running)
        if (item) {
            item.running = true
            this.emit('pick', {
                id: item.id,
                sprite: item.sprite,
                recycle: () => {
                    item.running = false
                }
            })
            return {
                id: item.id,
                sprite: item.sprite,
                recycle: () => {
                    item.running = false
                }
            }
        }
        return null
    }

    recycle(id: string) {
        const item = this._list.find(item => item.id === id)
        if (item) {
            item.running = false
        }
    }

    clear() {
        this._list.length = 0
    }
}
