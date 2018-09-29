/**
 * @class LongTake(canvasDom,width,height)
 * @desc 核心驅動
 */

class LongTake extends ModuleBase {

    /**
     * @member {number} width 繪製圖的寬
     * @member {number} height 繪製圖的高
     * @member {number} ticker 目前運行的偵數
     * @member {object} target 目前運行的canvas
     * @member {number} framePerSecond 最大FPS數
     * @member {number} baseFps 目前實際運行的fps
     * @member {boolean} stopOfAboveWindow 超出視窗外是否停止渲染
     */

    constructor( target, width, height ){
        super("Main");
        this.width = width;
        this.height = height;
        this.ticker = 0;
        this.target = target;
        this.targetRect = this.target.getBoundingClientRect();
        this.framePerSecond = 60;
        this.stopOfAboveWindow = true;
        this.baseFps = 0;
        this.remove = false;
        this.bindUpdate = this.update.bind(this);

        this.initStage();
        this.initEvent();
        this.initBitmap();
        this.initCamera();
        
        window.requestAnimationFrame = window.requestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame ||
        function(callback) { window.setTimeout(callback, 1000 / 60); };

        this.update();
    }

    close(){
        this.remove = true;
        this.target = null;
        this.stage.eachChildrenDeep((child)=>{
            child.close();
        });
        this.stage = null;
    }

    //=============================
    //
    // system
    //

    /**
     * @function initBitmap()
     * @desc 初始化位元圖
     */

    initBitmap(){
        if( this.target instanceof Element && this.target.tagName === "CANVAS" ){
            this.bitmap = this.target.getContext('2d');
            this.bitmap.globalCompositeOperation = "copy";
            this.buffer = new RenderBuffer(this);
        }else{
            this.systemError("initBitmap", "Object not a cavnas.", this.target);
        }
    }

    /**
     * @function register(sprite)
     * @desc 當sprite優先註冊過事件，在此回補註冊至LongTake
     */

    register(sprite){
        this.each( sprite.event, ( value )=>{
            if( this.event[value.event] == null ){
                this.addEvent(value.event);
            }
        });
    }

    /**
     * @function setFPS(fps)
     * @desc 設置動畫的FPS
     */

    setFPS(fps){
        if( typeof fps === "number" && fps > 0 && fps <= 60 ){
            this.framePerSecond = fps;
        }else{
            this.systemError("setFPS", "FPS must between 1 to 60.", fps);
        }
    }

    /**
     * @function getVisibility(view)
     * @desc 檢測目前螢幕裝置大小
     * @param {string} view xs, sm, md, le, xl
     */

    getVisibility(view){
        let width = document.body.clientWidth;
        if( width < 600 ){ return view === "xs"; }
        if( width >= 600 && width < 960 ){ return ['sm','xs'].indexOf(view) !== -1 }
        if( width >= 960 && width < 1264 ){ return ['sm','xs','md'].indexOf(view) !== -1 }
        if( width >= 1264 && width < 1904 ){ return ['sm','xs','md','lg'].indexOf(view) !== -1 }
        if( width >= 1904 ){ return ['sm','xs','md','lg','xl'].indexOf(view) !== -1 }
        return false;
    }

    

    //=============================
    //
    // easing
    //

    /**
     * @function getEasing(name)
     * @desc 取得緩動函數的function
     * @see {easing} https://easings.net/zh-tw
     */

    getEasing(name){
        if( Easing[name] && name !== "constructor" ){
            return Easing[name];
        }else{
            this.systemError( "getEasing", "Name not found.", name );
        }
    }

    //=============================
    //
    // camera
    //

    initCamera(){
        this.camera = {
            sprite : null,
            offsetX : 0,
            offsetY : 0,
        }
    }

    /**
     * @function follow(sprite)
     * @desc 指定跟隨一個精靈
     */

    follow( sprite ){
        if( Sprite.isSprite(sprite) ){
            this.camera.sprite = sprite;
        }else{
            this.systemError( "follow", "Object not a sprite", sprite );
        }
    }

    /**
     * @function unFollow()
     * @desc 移除跟隨模式
     */

    unFollow(){
        this.camera.sprite = null;
        this.camera.offsetX = 0;
        this.camera.offsetY = 0;
    }

    updateCamera(){
        if( this.camera.sprite && this.camera.sprite.main ){
            let sprite = this.camera.sprite;
            let screenX = sprite.screenX + sprite.width * sprite.anchorX;
            let screenY = sprite.screenY + sprite.height * sprite.anchorY;
            this.camera.offsetX = this.updateCameraOfSide( screenX, this.targetRect.width, this.width );
            this.camera.offsetY = this.updateCameraOfSide( screenY, this.targetRect.height, this.height );
        }
    }

    /**
     * @function updateCameraOfSide(screen,rect,main)
     * @desc 計算是否在畫面邊緣
     */

    updateCameraOfSide( screen, rect, main ){
        let left = rect / 2;
        let right = main - left;
        if( screen < left ){ return 0; }
        if( screen > right ){ return 0 - main + rect }
        return 0 - screen + left;
    }

    //=============================
    //
    // event
    //

    /**
     * @member {number} pointerX 使用者最後的點擊位置X(校準過)
     * @member {number} pointerY 使用者最後的點擊位置Y(校準過)
     */

    initEvent(){
        this.event = {};
        this.eventAction = {};
        this.pointerX = 0;
        this.pointerY = 0;
        this.addEvent( "resize", this.targetResize )
        this.addEvent( "pointermove", this.pointerMove );
        this.targetResize();
    }

    /**
     * @function addEvent(eventName,callback)
     * @desc 監聽一個事件
     * @param {function} callback 觸發事件
     */

    addEvent( eventName, callback ){
        if( this.event[eventName] == null ){
            this.event[eventName] = (event)=>{
                if( this.eventAction[eventName] == null ){
                    this.eventAction[eventName] = event;
                    if( callback ){ callback.bind(this)(event) }
                }
            }
            this.target.addEventListener( eventName, this.event[eventName] );
        }
    }
    
    pointerMove(event){
        this.pointerX = ( event.offsetX - this.camera.offsetX * this.targetRect.width / this.target.width ) * this.target.width / this.targetRect.width;
        this.pointerY = ( event.offsetY - this.camera.offsetY * this.targetRect.height / this.target.height ) * this.target.height / this.targetRect.height;
    }

    targetResize(){
        this.targetRect = this.target.getBoundingClientRect();
    }

    //=============================
    //
    // stage
    //

    /**
     * @member {Sprite} stage 頂層精靈，由此往下加入精靈
     */

    initStage(){
        this.stage = new Sprite("Stage");
        this.stage.install(this);
        this.stage.resize(this.width, this.height);
    }

    //=============================
    //
    // update
    //

    update(){
        if( this.remove == true ){
            window.cancelAnimationFrame(this.ticker);
        }
        this.baseFps += this.framePerSecond;
        if( this.stopOfAboveWindow === false 
            || window.pageYOffset < this.target.offsetTop + this.targetRect.height
            || window.pageYOffset + document.body.scrollHeight > this.target.offsetTop ){
            this.stageUpdate();
            if( this.baseFps >= 60 ){
                this.asyncRefresh = true;
                this.bitmapUpdate();
                this.baseFps = this.baseFps % 60;
            }
            this.eventAction = {};
        }
        this.ticker = window.requestAnimationFrame(this.bindUpdate);
    }

    stageUpdate(){
        this.stage.mainEvent();
        this.stage.mainUpdate();
    }

    bitmapUpdate(){
        if( this.camera.sprite ){ this.updateCamera(); }
        this.stage.mainRender();
        this.buffer.draw();
        this.bitmap.drawImage( this.buffer.canvas, this.camera.offsetX, this.camera.offsetY );
    }

}