(() => {
    /** @type {typeof import('../../../dist-new/index').default} */
    const LongTake = window.LongTake
    const width = 800
    const height = 600
    const canvas = document.getElementById('example-canvas')
    const app = new LongTake(canvas, width, height)
    window.__app = app
})()
