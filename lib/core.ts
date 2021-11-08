import { Base } from './base'
import { Ticker } from './ticker'
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
    /** 主要運行的 containers */
    containers: Container[] = []
    private camera = new Camera(this)
    private ticker = new Ticker(() => {
        this.container.stageUpdate()
        this.container.stageRender()
        this.context.clearRect(0, 0, this.width, this.height)
        this.context.drawImage(this.container.bitmap.canvas, -this.camera.offsetX, -this.camera.offsetY)
    })
    constructor(target: HTMLCanvasElement, width: number, height: number){
        super('Main')
        this.width = width
        this.height = height
        this.target = target
        this.context = this.target.getContext('2d')!
        this.container = new Container(this.width, this.height, this)
        this.ticker.start()
    }

    /**
     * @function close()
     * @desc 關閉這個Longtake
     */

    close(){
        this.ticker.close()
    }

    /** 移動鏡頭至指定位置 */

    setCamera(x: number, y: number) {
        this.camera.x = x
        this.camera.y = y
    }

    /**
     * @function addChildren(sprite)
     * @desc 加入一個精靈至container底下
     */

    addContainer(sprite: Sprite) {
        this.container.addChildren(sprite)
    }
}
