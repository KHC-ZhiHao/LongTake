# LongTake

[![NPM Version][npm-image]][npm-url]

### 入門級 Canvas 2d 函式庫

[API Document](https://khc-zhihao.github.io/LongTake/document.html)

### DEMO

[LightAndTree](https://khc-zhihao.github.io/LongTake/demo/LightAndTree/index.html)

[TwinVortex](https://khc-zhihao.github.io/LongTake/demo/TwinVortex/index.html)

[Farm](https://khc-zhihao.github.io/LongTake/demo/Farm/index.html)

### 安裝

webpack

```bash
$ npm i longtake
```

html

```html
<script src="https://rawcdn.githack.com/KHC-ZhiHao/LongTake/master/dist/index.js"></script>
```

### LongTake 是協助你快速建立符合設計師動畫需求的函式庫，他將保持以下特點：

* [輕便、簡單建立、快速擴展](#輕便簡單建立快速擴展)
* [精靈與精靈樹](#精靈與精靈樹)
* [預載入機制](#預載入機制)
* [動畫與緩動函數](#動畫與緩動函數)
* [事件監聽](#事件監聽)
* [鏡頭定位](#鏡頭定位)
* [RWD優化策略](#rwd優化策略)
* [OffscreenCanvas support](#offscreenCanvas)
* [Close](#close)

### 輕便、簡單建立、快速擴展

LongTake 雖然不到 30kb，但該有的都有，當你想為你的網站添加一些動態渲染、過場特效，但需求又不到檯面上那些功能過於強大的繪圖庫，本庫將是你的好選擇。

```html
<script src="./dist/index.js"></script>
<canvas id="app" width="800" height="600"></canvas>
```

```js
//建立一個實際大小為 1920 * 1080 的畫布
let app = new LongTake('app', 1920, 1080);
```

webpack

```js
import LongTake from 'longtake'
let app = new LongTake('app', 1920, 1080);
```

### 精靈與精靈樹

Sprite 為該系統的基本單位，每個 Sprite 都封裝了 Bitmap、Layer、Filter 與運作週期等模式，基本上就是...我們不要管這麼多了，建立 Sprite 就對了!

```js
let rect = new LongTake.Sprite();
    rect.create = function(){
        this.resize(50,50);
        this.setAnchor(0.5);
        this.x = this.main.width / 2;
        this.y = this.main.height / 2;
    }
    rect.update = function(){
        this.rotation += 1;
    }
    rect.render = function(){
        this.context.fillRect(0, 0, this.width, this.height);
        this.cache();
    }

let app = new LongTake('app', 800, 600);
    app.addChildren(rect);
```

每個 Sprite 都有自己的子代，你可以用繼承的方式建立樹，樹會繼承變形、透明度、濾鏡等。

>混和模式 `globalCompositeOperation` 單一性的特性只能做單層的繼承。

```js
class Rect extends LongTake.Sprite {

    constructor(){
        super("Rect");
    }

    create(){
        this.resize(30,30);
        this.setAnchor(0.5);
    }

    update(){
        this.rotation += 1;
    }

    render(){
        this.fillRect(0, 0, this.width, this.height);
        this.cache();
    }

}

let rectWrapper = new LongTake.Sprite("wrapper");
    rectWrapper.addChildren(new Rect());
    rectWrapper.addChildren(new Rect());

let app = new LongTake('app', 800, 600);
    app.addChildren(rectWrapper);

```

### 預載入機制

Loader 將協助您在呈現動畫之前先將圖片載入完成，讓主題圖片不破碎呈現。

```js
let loader = new LongTake.Loader();
    loader.add('bear', './img/HighBear.png');

    //start為執行載入，你可以在這建立讀取畫面的呈現
    loader.start((onload, finish)=>{
        //onload 為載入完成的數量
        //finish 為載入總目標數量
    });

    //onload為載入完畢執行，你可以隨意使用onload，如果圖片已經載入完成即執行
    loader.onload(()=>{
        //do something...
    });
```

### 動畫與緩動函數

Animate 是決定畫面活潑與否的關鍵，本庫內建了30種 [緩動函數](https://easings.net/zh-tw) 為你的動畫添加生命。

```js
let sprite = new LongTake.Sprite();
    sprite.create = function(){
        this.animate = new LongTake.Animate({
            duration : 1000,
            easing : "easeInQuad",
            action : (t)=>{
                //t 為 0 ~ 1
            }
        });
    }
    sprite.update = function(){
        this.animate.move();
    }
```

### 事件監聽

本庫採用了軟性的監聽機制，所有的 Event 都會在 LongTake Core 中被註冊，再藉由生命週期去觸發，並非即時性的反應。

```js
let sprite = new LongTake.Sprite();
    sprite.create = function(){
        this.on('remove', 'click', ()=>{
            if(this.inRect(this.main.pointerX, this.main.pointerY)){
                this.remove();
            }
        });
    }
```

### 鏡頭定位

因應 RWD 版型在畫面會被裁切的可能下，Camera 能夠將畫面中央帶到你想看的位置上

```js
let app = new LongTake('app', 800, 600);
    app.setCamera(400, 300);
```

### RWD 優化策略

在高解析度的 Canvas 在 CSS 的自適應的呈現下，往往效果不是很理想，因此你能建立一個父類的 DOM 讓 Canvas 去參考他的呈現。

```html
<div id="wrapper" style="width: 100%; height: 100vh;">
    <canvas id="app" width="1920" height="1080"></canvas>
</div>
```
```js
let app = new LongTake('app', 1920, 1080);
    app.setCamera(app.width / 2, app.height);
    app.forElementResize(app.target.parentElement, 1);
    app.onWindowResize = function(){
        app.forElementResize(app.target.parentElement, 1);
    };
```

### OffscreenCanvas

Container 是一個靜態的容器，在支援 OffscreenCanvas2D 的瀏覽器下，所有的 Bitmap 會指向 OffscreenCanvas2D 而不是 DOM，這讓建立 Worker 環境有了曙光。

可以從這麼[範例](https://github.com/KHC-ZhiHao/LongTake/blob/master/test/worker/index.js)中得知我是如何實踐Worker中繪製canvas的。

>目前 OffscreenCanvas 的支援程度並不高，所以使用這方法基本上只是徒增自己麻煩...

### Close

這是我在開發 Vue 過程時遇到的問題，在 SPA 開發過程有時候 requestAnimationFrame 的綁定並沒有隨著頁面跳轉移除不斷運行的 LongTakeCore，close 將協助擺脫這個輪迴。

```js
//vue.js
created(){
    this.app = new LongTake('app', 800, 600);
},
destroyed(){
    this.app.close();
}
```

[npm-image]: https://img.shields.io/npm/v/longtake.svg
[npm-url]: https://npmjs.org/package/longtake
