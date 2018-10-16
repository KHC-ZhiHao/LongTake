# LongTake

### 協助你快速繪製複雜banner的入門級canvas2d函式庫

_本庫實驗正為實驗階段_

[API Document]()

### DEMO

[LightAndTree](https://khc-zhihao.github.io/LongTake/demo/LightAndTree/index.html)

[TwinVortex](https://khc-zhihao.github.io/LongTake/demo/TwinVortex/index.html)

### LongTake是協助你快速建立符合設計師動畫需求的函式庫，他將保持以下特點：

* [輕便、簡單建立、快速擴展](###輕便、簡單建立、快速擴展)
* [精靈驅動](###精靈驅動)
* [預載入機制](###預載入機制)
* [動畫與緩動函數](###動畫與緩動函數)
* [事件監聽](###事件監聽)
* [鏡頭定位](###鏡頭定位)
* [RWD優化策略](###RWD優化策略)
* [OffscreenCanvas support](###OffscreenCanvas)

### 輕便、簡單建立、快速擴展

LongTake雖然不到30kb，但該有的都有，當你想為你的網站添加一些動態渲染、過場特效，但需求又不到檯面上那些功能過於強大的繪圖庫，本庫將是你的好選擇。

```html
<script src="./dist/index.js"></script>
<canvas id="app" width="800" height="600"></canvas>
```
```js
//建立一個實際大小為1920 * 1080的畫布
let app = new LongTake( 'app', 1920, 1080 );
```

### 精靈驅動

Sprite為該系統的基本單位，每個Sprite都封裝了Bitmap、Layer、Filter與運作週期等模式，基本上就是...我們不要管這麼多了，建立Sprite就對了!

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
        this.context.fillRect( 0, 0, this.width, this.height );
        this.cache();
    }

let app = new LongTake( 'app', 800, 600 );
    app.addChildren(rect);
```

### 預載入機制

Loader將協助您在呈現動畫之前先將圖片載入完成，讓主題圖片不破碎呈現。

```js
let loader = new LongTake.Loader();
    loader.add('./img/HighBear.png');

    //start為執行載入，你可以在這建立讀取畫面的呈現
    loader.start(( onload, finish )=>{
        //onload 為載入完成的數量
        //finish 為載入總目標數量
    });

    //onload為載入完畢執行，你可以隨意使用onload，如果圖片已經載入完成即執行
    loader.onload(()=>{
        //do something...
    });
```

### 動畫與緩動函數

Animate是決定畫面活潑與否的關鍵，本庫內建了30種[緩動函數](https://easings.net/zh-tw)為你的動畫添加生命。

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

本庫採用了軟性的監聽機制，所有的Event都會在LongTake Core中被註冊，再藉由生命週期去觸發，並非即時性的反應。

```js
let sprite = new LongTake.Sprite();
    sprite.create = function(){
        this.on( 'remove', 'click', ()=>{
            if( this.inRect( this.main.pointerX, this.main.pointerY ) ){
                this.remove();
            }
        });
    }
```

### 鏡頭定位

因應RWD版型在畫面會被裁切的可能下，camera能夠將畫面中央帶到你想看的位置上

```js
let app = new LongTake( 'app', 800, 600 );
    app.setCamera( 400, 300 );
```

### RWD優化策略

在高解析度的Canvas在CSS的自適應的呈現下，往往效果不是很理想，因此你能建立一個父類的DOM讓Canvas去參考他的呈現。

```html
<div id="wrapper" style="width: 100%; height: 100vh;">
    <canvas id="app" width="1920" height="1080"></canvas>
</div>
```
```js
let app = new LongTake( 'app', 1920, 1080 );
    app.setCamera( app.width / 2, app.height );
    app.forElementResize( app.target.parentElement, 1 );
    app.onWindowResize = function(){
        app.forElementResize( app.target.parentElement, 1 );
    };
```

### OffscreenCanvas

Container是一個靜態的容器，在支援OffscreenCanvas2D的瀏覽器下，所有的bitmap會指向OffscreenCanvas2D而不是DOM，這讓建立Worker環境有了曙光。

可以從這麼[範例](https://github.com/KHC-ZhiHao/LongTake/blob/master/test/worker/index.js)中得知我是如何實踐Worker中繪製canvas的。

>目前OffscreenCanvas的支援程度並不高，所以使用這方法基本上只是徒增自己麻煩...