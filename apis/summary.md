# API 文件

[LongTake](#longtake)

[Bitmap](#bitmap)

[Sprite](#sprite)

[TextSprite](#textsprite)

[ImageSprite](#imagesprite)

[Animate](#animate)

[Loader](#loader)

[helper](#helper)

[helper](#helper)

## LongTake

### Constructor

```ts
new LongTake(target: string | HTMLCanvasElement, width?: number, height?: number)
```

### Events

pointer 相關事件必須啟用 enableInteractive() 才會生效。

#### click

* data: { x: number, y: number }

被點擊時觸發。

#### keydown

* data: { key: string, code: number }

鍵盤案下時觸發。

#### keyup

* data: { key: string, code: number }

鍵盤釋放時觸發。

#### addChild

* data: { sprite: Sprite }

加入一組子精靈後觸發。

#### pointerdown

* data: { x: number, y: number }

指標或是觸控開始時觸發。

#### pointermove

* data: { x: number, y: number }

指標或是觸控開始後移動時觸發。

#### pointerup

* data: {}

指標或是觸控離開時觸發。

### Properties

#### helper

* readonly
* type: Helper

幫助性物件。

### Methods

#### stop(): void

只渲染不觸發 update 鉤子。

#### play(): void

如果為停止狀態的話繼續運行。

#### getAllChildren(): Sprite[]

獲取所有子精靈。

#### enabledDebugMode(active = true, options: DebugOptions = {}): void

啟用開發者模式。

#### clear(): void

清空所有精靈。

#### close(): void

關閉這個Longtake。

#### addChildren(sprite: Sprite): void

加入一個精靈至 container 底下。

#### enableInteractive(): void

啟動互動模式。

## Sprite

### Constructor

```ts
new LongTake.Sprite()
```

### Static

#### isSprite(object: any): boolean

檢測一個物件是否為精靈。

### Events

#### click

* data: {}

被點擊時觸發。

#### remove

* data: {}

從父類被移除時觸發。

#### inited

* data: {}

完成 creata、update、render 第一輪後會被觸發。

### Properties

#### parent

* readonly
* type: Sprite | null = null

父精靈。

#### children

* readonly
* type: Sprite[]

子精靈組。

#### context: Context2D

* readonly
* type: CanvasRenderingContext2D

#### helper

* readonly
* type: Helper

#### width

* type: number

精靈寬。

#### height

* type: number

精靈高。

#### scaleWidth

* type: number

放大寬。

#### scaleHeight

* type: number

放大高。

#### antiAliasing

* type: boolean
* default: true

是否啟用抗鋸齒。

#### screenScaleWidth

* readonly
* type: number

該精靈在最後顯示的總倍率寬。

#### screenScaleHeight

* readonly
* type: number

該精靈在最後顯示的總倍率高。

#### rotation

* type: number

旋轉。

#### blendMode

* type: BlendMode

合成模式。

#### opacity

* type: 0 ~ 255

透明度。

#### skewX

* type: number

傾斜X。

#### skewY

* type: number

傾斜Y。

#### x

* type: number

定位點X。

#### y

* type: number

定位點Y。

#### z

* type: number

高度。

#### anchorX

* type: number

#### anchorY

* type: number

#### posX

* readonly
* type: number

#### posY

* readonly
* type: number

#### screenX

* readonly
* type: number

#### screenY

* readonly
* type: number

#### canRender

* readonly
* type: boolean

#### canShow

* readonly
* type: boolean

### Methods

#### eachChildren(callback: (child: Sprite) => void): void

迭代所有子精靈。

#### eachChildrenDeep(callback: (child: Sprite) => void): void

迭代所有子精靈(包含子精靈的子精靈)。

#### getAllChildren(): Sprite[]

獲取所有子精靈，包含子精靈的子精靈。

#### resize(width: number | { width: number, height: number }, height?: number): void

調整精靈的大小。

#### addChildren(sprite: Sprite): void

加入一個子精靈。

#### isTransform(): boolean

是否有變形。

#### scale(width: number, height: number): void

設定放大倍率。

#### setAnchor(x: number, y?: number): void

設定錨點。

#### inRect(x: number, y: number): boolean

座標是否在精靈的矩形範圍內。

#### cache(): void

不再執行 render 的方法，並將現在的結果快取成圖片。

#### unCache(): void

解除快取狀態。

#### hidden(): void

隱藏。

#### unHidden(): void

解除隱藏。

#### getRealStatus(): { width..., height... }

獲取該精靈實際呈現在畫布上的狀態數據。

#### getRealRect(): { p0, p1, p2, p3 }

獲取精靈在畫布的準確位置。

#### remove(): void

移除自己於父精靈下。

#### removeChild(sprite: Sprite): void

移除指定的子精靈。

#### clearChildren(): void

移除全部的子精靈。

#### removeChildrenByIndex(index: number): void

移除指定 index 的精靈。

## TextSprite

Extends: Sprite

針對文字顯示的精靈。

### Constructor

```ts
new LongTake.TextSprite({
    color: '#000'
    round: 0,
    padding: 4
    fontSize: 24
    fontFamily: 'Arial',
    backgroundColor: '#DDD'
})
```

### Methods

#### setContent(text: string): void

設置文字內容。

## ImageSprite

負責顯示圖片的精靈。

### Constructor

```ts
const img = new Image()
img.onload = () => {
    new LongTake.TextSprite(img)
}
img.src = '/myimage.png'
```

## Animate

動畫執行的載具。

### Constructor

```ts
new LongTake.Animate({
    /**
     * 每次前進的偵數
     * @default 0
     */
    push: 0,
    /**
     * 起始時間
     * @default 0
     */
    begin: 0,
    /**
     * 持續時間
     * @default 1
     */
    duration: 1000,
    /**
     * 緩動函數
     * @default 'linear'
     */
    easing: 'linear',
    /**
     * 反轉前進
     * @default false
     */
    reverse: false,
    /**
     * 巡迴播放
     * @default false
     */
    alternate: false,
    /**
     * 等待指定毫秒後執行
     * @default 0
     */
    delay: number
    /**
     * 執行動作
     */
    action: (t: number, d: number) => void
})
```

### Methods

#### move(): void

推動一偵。

#### restart(): void

返回原始狀態。

## Loader

```ts
new LongTake.Loader()
```

### Methods

#### onload(callback: () => void

等待載入完成，若載入已完成，直接執行 callback。

#### start(loading?: (completed: number, fileLength: number) => void): void

執行載入。

#### add(name: string, src: string, replace?: ReplaceCallback)

* ReplaceCallback: `(name: string, image: HTMLImageElement) => Promise<HTMLImageElement>`

加入一個等待載入檔案，如果 replace 有值，就可以攔截加載完成的照片。

#### get(name: string): void

取得一個載入完畢的檔案。

#### remove(name: string): void

清除指定資料。

#### clear(): void

清除所有快取。

## helper

小工具組。

### Properties

#### arc

* readonly
* type: Math.PI / 180

#### rarc

* readonly
* type: 180 / Math.PI

### Methods

#### ifEmpty<T>(data: T | undefined, def: T): T

指定的值如果是 null，則回傳預設值。

#### sinByRad(deg: number): number

獲取角度轉換弧度後的 sin 值。

#### cosByRad(deg: number): number

獲取角度轉換弧度後的cos值。

#### getVector(deg: number, distance: number): { x: number, y: number }

獲取向量。

#### randInt(min: number, max: number): number

求整數範圍內的隨機值。

#### getAngle(x: number, y: number, ax: number, ay: number): number

求兩點角度。

#### getVisibility(): "xs" | "sm" | "md" | "lg" | "xl"

檢測目前螢幕裝置大小。

#### getRandomColor(): string

隨機獲取顏色。

#### imageResize(image: HTMLImageElement, scale: number): Promise<HTMLImageElement>

依照比例縮小圖片。

#### getRotationPosition(px: number, py: number, x: number, y: number, angle: number)

獲取指定點旋轉後角度的新座標。
