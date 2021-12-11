function getLayerPosition(event: any) {
    let target = event.targetTouches[0].target
    let parent = target.parentNode
    let firstOffsetTop = null
    let position = {
        x: (event.targetTouches) ? event.targetTouches[0].pageX : event.clientX,
        y: (event.targetTouches) ? event.targetTouches[0].pageY : event.clientY
    }
    while (parent.offsetParent) {
        if (firstOffsetTop == null) {
            firstOffsetTop = parent.offsetTop
        }
        position.y -= parent.offsetTop - parent.scrollTop
        parent = parent.offsetParent
    }
    position.y += firstOffsetTop
    return position
}

const inSafari = () => {
    let navigator = window.navigator
    let ua = navigator.userAgent
    let iOS = !!ua.match(/iP(ad|od|hone)/i)
    let hasSafariInUa = !!ua.match(/Safari/i)
    let noOtherBrowsersInUa = !ua.match(/Chrome|CriOS|OPiOS|mercury|FxiOS|Firefox/i)
    let result = false
    if (iOS) {
        let webkit = !!ua.match(/WebKit/i)
        result = webkit && hasSafariInUa && noOtherBrowsersInUa
        // @ts-ignore
    } else if (typeof window !== 'undefined' && window.safari !== undefined) {
        result = true
    } else {
        result = hasSafariInUa && noOtherBrowsersInUa
    }
    return result
}

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
    if (inSafari()) {
        group.add('touchstart', event => {
            let { x, y } = getLayerPosition(event)
            start({
                x,
                y
            })
        })
        group.add('touchmove', event => {
            let { x, y } = getLayerPosition(event)
            move({
                x,
                y
            })
        })
        group.add('touchend', () => {
            end()
        })
        group.add('mousedown', event => {
            start({
                x: event.layerX,
                y: event.layerY
            })
        })
        group.add('mousemove', event => {
            move({
                x: event.layerX,
                y: event.layerY
            })
        })
        group.add('mouseup', () => {
            end()
        })
    } else {
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
    }
    return group
}
