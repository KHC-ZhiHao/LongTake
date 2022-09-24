export class ListenerGroup {
    private element: Element | Window
    private listeners: [string, any][] = []
    constructor(element: Element | Window) {
        this.element = element
    }
    add(name: string, callback: (...params: any[]) => void) {
        this.element.addEventListener(name, callback)
        this.listeners.push([name, callback])
    }
    close() {
        this.listeners.forEach(([name, callback]) => {
            this.element.removeEventListener(name, callback)
        })
        this.listeners = []
    }
}

type Site = {
    x: number
    y: number
}

export const pointer = (element: Element, params: {
    end: () => void
    move: (params: Site) => void
    start: (params: Site) => void
}) => {
    let { start, move, end } = params
    let group = new ListenerGroup(element)
    group.add('pointerdown', event => {
        start({
            x: event.offsetX,
            y: event.offsetY
        })
    })
    group.add('pointermove', event => {
        move({
            x: event.offsetX,
            y: event.offsetY
        })
    })
    group.add('pointerup', () => {
        end()
    })
    return group
}
