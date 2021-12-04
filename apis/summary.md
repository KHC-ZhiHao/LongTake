# API 文件

[LongTake](#longtake)

[Bitmap](#bitmap)

[Animate](#animate)

[Loader](#loader)

[helper](#helper)

[Sprite](#sprite)

[TextSprite](#textsprite)

[ImageSprite](#imagesprite)

## LongTake

### Constructor

```ts
new LongTake(target: string | HTMLCanvasElement, width?: number, height?: number)
```

### Methods

#### clear(): void

清空所有精靈。

#### close(): void

關閉這個Longtake。

#### addChildren(sprite: Sprite): void

加入一個精靈至 container 底下。

#### enableInteractive(): void

啟動互動模式。

## Sprite

### Static

readonly parent: Sprite | null = null
readonly context: Context2D
readonly helper: Helper

width: number
精靈寬
height: number
精靈高
scaleWidth: number
放大寬
scaleHeight: number
放大高

readonly screenScaleWidth: number
該精靈在最後顯示的總倍率寬

readonly screenScaleHeight: number
該精靈在最後顯示的總倍率高

rotation: number

旋轉。

blendMode: BlendMode

合成模式。

opacity: number

透明度。

skewX: number

傾斜X。

skewY: number

傾斜Y。

x: number

定位點X。

y: number

定位點Y。

z: number

高度，每次設定會重新排序。

anchorX: number

anchorY: number

readonly posX: number
readonly posY: number
readonly screenX: number
readonly screenY: number
readonly canRender: boolean
readonly canShow: boolean

#### isSprite(object: any): boolean

檢測一個物件是否為精靈。

### Properties



### Methods

#### eachChildren(callback: (child: Sprite) => void): void

迭代所有子精靈。

#### eachChildrenDeep(callback: (child: Sprite) => void): void

迭代所有子精靈(包含子精靈的子精靈)。

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

快取目前渲染的 Bitmap。

#### unCache(): void

解除快取狀態。

#### hidden(): void

隱藏。

#### unHidden(): void

解除隱藏。

#### getRealSize(): { width: number, height: number }

獲取該精靈實際呈現的大小。

#### getRealPosition(): { x: number, y: number }

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

## ImageSprite

## Animate

## Loader

## helper
