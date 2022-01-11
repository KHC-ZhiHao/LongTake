<br>

<p align="center"><img style="max-width: 300px" src="./logo.png"></p>

<h1 align="center">LongTake</h1>
<h3 align="center">Web Canvas Animate Library</h3>

<p align="center">
    <a href="https://www.npmjs.com/package/longtake">
        <img src="https://img.shields.io/npm/v/longtake.svg">
    </a>
    <a href="https://standardjs.com/">
        <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" style="max-width:100%;">
    </a>
    <a href="https://github.com/KHC-ZhiHao/LongTake">
        <img src="https://img.shields.io/github/stars/KHC-ZhiHao/LongTake.svg?style=social">
    </a>
    <br>
</p>

LongTake 是個輕巧、快速的繪製動畫的函式庫。

[Demos](https://khc-zhihao.github.io/LongTake)

[APIs](https://github.com/KHC-ZhiHao/LongTake/blob/master/apis/summary.md)

[v0.4 以下版本文件請看](https://khc-zhihao.github.io/LongTake/old)

### 輕便、簡單建立、快速擴展

當你想為你的網站添加一些動態渲染、過場特效，但需求又不到檯面上那些功能過於強大的繪圖庫，本庫將是你的好選擇。

```html
<script src="./dist/index.js"></script>
<canvas id="app" width="800" height="600"></canvas>
<script>
    //建立一個實際大小為 1920 * 1080 的畫布
    const app = new LongTake(document.getElementById('app'), 1920, 1080)
</script>
```

webpack

```bash
npm install longtake
```

```js
import LongTake from 'longtake'
const app = new LongTake(document.getElementById('app'), 1920, 1080)
```

### 精靈與精靈樹

Sprite 為該系統的基本單位，每個 Sprite 都封裝了`位元圖`與`變形`等模式，基本上就是...不要管這麼多了，建立 Sprite 就對了!

```js
const app = new LongTake(document.getElementById('app'), 800, 600)
class Rect extends LongTake.Sprite {
    create() {
        this.resize(50,50)
        this.setAnchor(0.5)
        this.x = app.width / 2
        this.y = app.height / 2
    }
    update() {
        this.rotation += 1
    }
    render() {
        this.fillRect(0, 0, this.width, this.height)
        this.cache()
    }
}
app.addChildren(new Rect())
```

### 預載入機制

Loader 將協助您在呈現動畫之前先將圖片載入完成，讓主題圖片不破碎呈現。

```ts
let loader = new LongTake.Loader()
loader.add('bear', './img/HighBear.png')
// start為執行載入，你可以在這建立讀取畫面的呈現
loader.start()
// onload為載入完畢執行，你可以隨意使用onload，如果圖片已經載入完成即執行
loader.onload(() => {
    const app = new LongTake(document.getElementById('app'), 800, 600)
    // do something...
})
```

### 動畫與緩動函數

Animate 是決定畫面活潑與否的關鍵，本庫內建了30種 [緩動函數](https://easings.net/zh-tw) 為你的動畫添加生命。

```js
class Sprite extends LongTake.Sprite {
    create() {
        this.animate = new LongTake.Animate({
            duration : 1000,
            easing : "easeInQuad",
            action : (t, d)=>{
                // t 為 0 ~ 1
                // d 為 1 ~ 0
            }
        })
    }
    update() {
        this.animate.move()
    }
    render() {
        this.fillRect(0, 0, this.width, this.height)
        this.cache()
    }
}
```

### 事件監聽

LongTake 提供了基礎的事件監聽，可以建立簡單的互動模型。

```js
let sprite = new LongTake.Sprite()
sprite.on('click', () => {
    // do something...
})
```

### Close

如果你要捨棄頁面時，記得關閉正在運行的 LongTake 。

```js
const app = new LongTake(document.getElementById('app'), 800, 600)
// 當你要捨棄頁面...
app.close()
```
