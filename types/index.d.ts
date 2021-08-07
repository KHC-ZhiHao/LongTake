declare class LongTake {
    constructor(target: string | HTMLCanvasElement, width: number, height: number)
    static Loader: new () => Loader
    static Sprite: new () => Sprite
    static Bitmap: new () => Bitmap
    static Helper: new () => Helper
    static Animate: new () => Animate
    static Container: new () => Container
    /** 繪製圖的寬 */
    readonly width: number
    /** 繪製圖的高 */
    readonly height: number
    /** 目前運行的偵數 */
    readonly ticker: number
    /** 最大 FPS 數 */
    readonly framePerSecond: number
    /** 目前實際運行的 FPS */
    readonly baseFps: number
    /** 整體視圖倍率 */
    readonly viewScale: number
    /** 目前運行的 canvas */
    readonly target: HTMLCanvasElement
    /** 目前運行的 canvas 實際大小 */
    readonly targetRect: {
        x: number
        y: number
        width: number
        height: number
        top: number
        right: number
        bottom: number
        left: number
    }
    /** 主要運行的 Container，由本核心驅動內部精靈的 Update 和 Event */
    readonly container: Container
    /** 設置 FPS */
    setFPS(fps: number): void
    /** 關閉整個執行程式 */
    close(): void
    /** 移動鏡頭至指定位置 */
    setCamera(x: number, y: number): void
    /** 監聽一個事件 */
    addEvent(name: string, handler: (event: any) => void): void
    /** 調整 Canvas 的大小 */
    targetResize(width: number, height: number): void
    /** 當畫面旋轉或縮放時觸發該 function (自定義) */
    onWindowResize(): void
    /** 縮放視圖倍率至指定 Element 大小(Cover 縮放模式) */
    forElementResize(element: HTMLElement, scale?): void
    /** 加入一個精靈至 Container 底下 */
    addChildren(sprite: Sprite): void
}

declare class Helper {
    /** 獲取角度轉換弧度後的 sin 值 */
    sinByRad(deg: number): number
    /** 獲取角度轉換弧度後的 cos 值 */
    cosByRad(deg: number): number
    /** 獲取向量 */
    getVector(deg: number, distance: number): {
        x: number
        y: number
    }
    /** 求整數範圍內的隨機值 */
    randInt(min: number, max: number): number
    /** 求兩點角度 */
    getAngle(x: number, y: number, ax: number, ay: number): number
    /** 檢測目前螢幕裝置大小 */
    getVisibility(view: 'xs' | 'sm' | 'md' | 'le' | 'xl'): boolean
}

declare class Bitmap {
    /** 是否支援離屏渲染 */
    readonly offscreenCanvasSupport: boolean
    /** 指向的離屏 Canvas (如果支援) */
    readonly canvas: OffscreenCanvas
    /** Context */
    readonly context: CanvasRenderingContext2D
    /** 是否為快取狀態 */
    readonly cache: boolean
    /** 由 context.getImageData 取得的 int8Array 位圖元素 */
    readonly imgData: unknown
    /** 由快取產生的圖片 Buffer */
    readonly imgBitmap: unknown
    /** 調整畫布大小 */
    resize(width: number, height: number): void
    /** 清空畫布 */
    clear(): void
    /** 解除並清除圖片資料快取 */
    clearCache(): void
    /** 取得位元位置的像素元素 */
    getPixel(x: number, y: number): [
        number,
        number,
        number,
        number
    ]
}

declare class Container {
    constructor(width: number, height: number)
    /** 是否指向 LongTakeCore */
    readonly core: LongTake
    /** 主精靈 */
    readonly stage: Sprite
    /** 主位圖 */
    readonly bitmap: Bitmap
    /** 位圖寬(與位圖同步) */
    readonly width: number
    /** 位圖高(與位圖同步) */
    readonly height: number
    /** 當此 Container 指向 LongTakeCore 時，該值會隨著鼠標或觸碰位置改變 */
    readonly pointerX: number
    /** 當此 Container 指向 LongTakeCore 時，該值會隨著鼠標或觸碰位置改變 */
    readonly pointerY: number
    /** 當 Sprite 優先註冊過事件，在 Install Container 的時候回補註冊至 LongTake */
    register(sprite: Sprite): void
    /** 發送一個 Data 給 Container 並觸發重渲染 */
    post(data: any): void
    /** 獲取該 Container 的 ImageBitmap */
    getImageBitmap(callback: (ImageBitmap: ImageBitmap) => void)
    /** 加入一個子精靈 */
    addChildren(sprite: Sprite): void
}

declare class Sprite {
    static isSprite(target: any): boolean
    constructor(name?: string)
    /** Sprite Name */
    readonly name: string
    /** Helper */
    readonly helper: Helper
    /** 精靈寬(和 Bitmap 同步) */
    readonly width: number
    /** 精靈高(和 Bitmap 同步) */
    readonly height: number
    /** 父精靈 */
    readonly parent?: Sprite
    /** 子精靈組 */
    readonly children: Sprite[]
    /** 傾斜 X */
    skewX: number
    /** 傾斜 Y */
    skewY: number
    /** 放大寬 */
    scaleWidth: number
    /** 放大高 */
    scaleHeight: number
    /** 旋轉 */
    rotation: number
    /** 透明度 */
    opacity: number
    /**
     * 合成模式
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
     */
    blendMode:
         'source-over'
        |'source-in'
        |'source-out'
        |'source-atop'
        |'destination-over'
        |'destination-in'
        |'destination-out'
        |'destination-atop'
        |'lighter'
        |'copy'
        |'xor'
        |'multiply'
        |'screen'
        |'overlay'
        |'darken'
        |'lighten'
        |'color-dodge'
        |'color-burn'
        |'hard-light'
        |'soft-light'
        |'difference'
        |'exclusion'
        |'hue'
        |'saturation'
        |'color'
        |'luminosity'
    /** 該精靈在最後顯示的總倍率寬 */
    screenScaleWidth: number
    /** 該精靈在最後顯示的總倍率高 */
    screenScaleHeight: number
    /** 定位點 X */
    x: number
    /** 定位點 Y */
    y: number
    /** 高度，每次設定會重新排序 */
    z: number
    /** 錨點 X */
    anchorX: number
    /** 錨點 Y */
    anchorY: number
    /** 迭代所有子精靈 */
    eachChildren(callback: (sprite: Sprite) => void): void
    /** 迭代所有子精靈(包含子精靈的子精靈) */
    eachChildrenDeep(callback: (sprite: Sprite) => void): void
    /** 當實體化該精靈後，可以使用 super 呼叫實體化前的函式 */
    super(name: string): void
    /** 當被加入 Stage 時呼叫該函式 */
    create(): void
    /** 調整精靈的 Bitmap 大小 */
    resize(width: number | { width: number, height: number }, height?: number): void
    /** 加入一個子精靈 */
    addChildren(sprite: string)
    /** 重新排列子精靈，當子精靈有 Z 值改變時會自動觸發 */
    sortChildren(): void
    /** 監聽一個事件 */
    on(name: string, event: string, callback: (event: any) => void): void
    /** 移除監聽的事件 */
    unon(name: string): void
    /** 是否有變形 */
    isTransform(): boolean
    /** 設定放大倍率 */
    scale(width: number, height: number): void
    /** 設定錨點 */
    setAnchor(x: number, y: number): void
    /** 快取目前渲染的 Bitmap */
    cache(): void
    /** 手動解除快取狀態 */
    unCache(): void
    /** 隱藏 */
    hidden(): void
    /** 解除隱藏 */
    unHidden(): void
    /** 獲取該精靈實際呈現的大小 */
    getRealSize(): { width: number, height: number }
    /** 獲取精靈在畫布的準確位置 */
    getRealPosition(): { x: number, y: number }
    /** 每次渲染圖形時執行此函式，目的為精靈的動作 */
    update(): void
    /** 移除自己於父精靈下 */
    remove(): void
    /** 移除指定的子精靈 */
    removeChild(sprite: Sprite): void
    /** 移除全部的子精靈 */
    clearChildren(): void
    /** 移除指定 Name 的精靈 */
    removeChildrenByName(name: string): void
    /** 移除指定 Index 的精靈 */
    removeChildrenByIndex(index: number): void
    /**
     * 渲染濾鏡的函式，預設為 null
     * @example
     * this.filter = () => { ... }
     */
    filter?(imgData: ImageData): void
    /** 渲染 Bitmap 的方法 */
    render(): void
    /** 將精靈設置成 Img 檔案的解析度，並將 Render 宣告成渲染該圖片並快取 */
    fromImage(img: HTMLImageElement): void
    /** 迭代像素 */
    eachImgData(imgData: ImageData, callback: (pixel: {
        red: number
        green: number
        blue : number
        alpha: number
    }, render: (r: number, g: number, b: number, alpha: number) => void) => void): void
    /** 座標是否在精靈的矩形範圍內 */
    inRect(x: number, y: number): boolean
}

type Easing =
      'linear'
    | 'easeInQuad'
    | 'easeOutQuad'
    | 'easeInOutQuad'
    | 'easeInCubic'
    | 'easeOutCubic'
    | 'easeInOutCubic'
    | 'easeInQuart'
    | 'easeOutQuart'
    | 'easeInOutQuart'
    | 'easeInQuint'
    | 'easeOutQuint'
    | 'easeInOutQuint'
    | 'easeInSine'
    | 'easeOutSine'
    | 'easeInOutSine'
    | 'easeInExpo'
    | 'easeOutExpo'
    | 'easeInOutExpo'
    | 'easeInCirc'
    | 'easeOutCirc'
    | 'easeInOutCirc'
    | 'easeInElastic'
    | 'easeOutElastic'
    | 'easeInOutElastic'
    | 'easeInBack'
    | 'easeOutBack'
    | 'easeInOutBack'
    | 'easeInBounce'
    | 'easeOutBounce'
    | 'easeInOutBounce'

type AnimateOptions = {
    /**
     * 每次前進的偵數
     * @default 0
     */
    push: number
    /**
     * 起始時間
     * @default 0
     */
    begin: number
    /**
     * 持續時間
     * @default 0
     */
    duration: number
    /**
     * 緩動函數
     * @see https://easings.net/zh-tw
     * @default 'linear'
     */
    easing: Easing
    /**
     * 反轉前進
     * @default false
     */
    reverse: boolean
    /**
     * 巡迴播放
     * @default false
     */
    alternate: boolean
    /** 執行動作 */
    action: (t: number) => void
}

/** 一個動畫的載具 */

declare class Animate {
    constructor(options: Partial<AnimateOptions>)
    readonly over: boolean
    /**
     * 往前推動一偵
     * @returns {number} 返回當下偵數
     */
    move(): number
    /**
     * 重起計算
     */
    restart(): void
}

declare class Loader {
    readonly data: Record<string, ImageBitmap | HTMLImageElement>
    readonly completed: number
    readonly fileLength: number
    /** 等待載入完成，若載入已完成，直接執行 Callback */
    onload(callback: () => void): void
    /** 執行載入 */
    start(loading?: (completed: number, length: number) => void): void
    /** 加入一個等待載入檔案 */
    add(name: string, src: string)
    /** 取得一個載入完畢的檔案 */
    get(name): ImageBitmap | HTMLImageElement
    /**
     * 清除快取釋放記憶體
     * @param {string} name 當不存在此值沒有輸入，將清空全部
     */
    close(name?: string)
}

export default LongTake
