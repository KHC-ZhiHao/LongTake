import { Base } from './base'
import { utils } from './utils'
import { Camera } from './camera'
import { Sprite } from './sprite'
import { Container } from './container'

export class Core extends Base {
    /** 繪製圖的寬 */
    width: number
    /** 繪製圖的高 */
    height: number
    /** 目前運行的 canvas */
    target: HTMLCanvasElement
    /** 目前運行的 canvas context 2d */
    context: CanvasRenderingContext2D
    /** 主要運行的 container，由本核心驅動內部精靈的 update 和 event */
    container: Container
    /** 目前實際運行的 fps */
    baseFps = 0
    /** 整體視圖倍率 */
    viewScale = 1
    private stop = false
    private camera = new Camera(this)
    private framePerSecond = 60
    private binded = {
        update: this.update.bind(this)
    }
    /** 目前運行的 canvas 實際大小 */
    constructor(target: HTMLCanvasElement, width: number, height: number){
        super('Main')
        this.width = width
        this.height = height
        this.target = target
        this.context = this.target.getContext('2d')!
        this.container = new Container(this.width, this.height, this)
        this.update()
    }

    get targetRect() {
        return this.target.getBoundingClientRect()
    }

    /** 設置動畫的FPS */

    setFPS(fps: number){
        if (typeof fps === 'number' && fps > 0 && fps <= 60) {
            this.framePerSecond = fps
        } else {
            this.systemError('setFPS', 'FPS must between 1 to 60.', fps)
        }
    }

    /**
     * @function close()
     * @desc 關閉這個Longtake
     */

    close(){
        this.stop = true
    }

    //=============================
    //
    // camera
    //

    /** 移動鏡頭至指定位置 */

    setCamera(x: number, y: number) {
        this.camera.x = x
        this.camera.y = y
    }

    //=============================
    //
    // event
    //

    /**
     * @function targetResize(width,height)
     * @desc 調整視圖canvas的大小
     */

    targetResize(width: number, height: number) {
        this.target.width = width
        this.target.height = height
    }

    /**
     * @function addChildren(sprite)
     * @desc 加入一個精靈至container底下
     */

    addChildren(sprite: Sprite) {
        this.container.addChildren(sprite)
    }

    //=============================
    //
    // update
    //

    private update() {
        if (this.stop === true) {
            return null
        }
        this.baseFps += this.framePerSecond
        this.container.stageUpdate()
        if( this.baseFps >= 60 ){
            this.bitmapUpdate()
            this.baseFps = this.baseFps % 60
        }
        utils.requestAnimationFrame(this.binded.update)
    }

    bitmapUpdate() {
        this.container.stageRender()
        this.context.clearRect(0, 0, this.width, this.height)
        this.context.drawImage(this.container.bitmap.canvas, -this.camera.offsetX, -this.camera.offsetY)
    }
}
