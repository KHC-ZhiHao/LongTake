

    (function( root, factory ){
    
        let moduleName = 'LongTake';
    
        if( typeof module !== 'undefined' && typeof exports === 'object' ) {
            module.exports = factory();
        }
        else if ( typeof define === 'function' && (define.amd || define.cmd) ) {
            define(function() { return factory; });
        } 
        else {
            root[moduleName] = factory();
        }
    
    })( this || (typeof window !== 'undefined' ? window : global), function(){
        /**
 * @class ModuleBase
 * @desc 所有的模塊父類
 */

class ModuleBase {

    constructor( name ){
        this.moduleBase = {
            name : name || "No module base name.",
            worker : {},
        }
    }

    /**
     * @function each(array|object,callback)
     * @desc 跑一個迴圈
     */

    each( target, callback ){
    	if( typeof target === "object" ){
    		if( Array.isArray(target) ){
    			var len = target.length;
    			for( let i = 0 ; i < len ; i++){
    				var br = callback( target[i], i );
    				if( br === "_break" ){ break; }
                    if( br === "_continue" ){ continue; }
    			}
    		}else{
    			for( let key in target ){
    				var br = callback( target[key], key );
    				if( br === "_break" ){ break; }
                    if( br === "_continue" ){ continue; }
    			}
            }
    	}else{
            this.systemError("each", "Not a object or array.", target);
        }
    }

    /**
     * @function reverseEach(array,callback)
     * @desc 反向執行迴圈
     */

    reverseEach( array, callback ){
        if( Array.isArray(array) ){
            var len = array.length;
            for( let i = len ; i >= 0 ; i-- ){
                var br = callback( array[i], i );
                if( br === "_break" ){ break; }
                if( br === "_continue" ){ continue; }
            }
    	}else{
            this.systemError("each", "Not a array.", array);
        }
    }

    /**
     * @function runWhile(callback,max)
     * @desc 執行有限迴圈
     */

    runWhile(callback, max = 10000){
        let now = 0;
        while(true){
            let br = callback(now);
            if( br === "_break" ){ break; }
            if( br === "_continue" ){ continue; }
            if( now > max ){ break; }
            now++;
        }
    }

    /**
    * @function systemError(functionName,maessage,object)
    * @desc 於console呼叫錯誤，中斷程序並顯示錯誤的物件
    */
    
    systemError( functionName, message, object ){
        if( object ){
            console.log( `%c error object is : `, 'color:#FFF; background:red' );
            console.log( object );
        }
        throw new Error( `(☉д⊙)!! ${this.moduleBase.name} => ${functionName} -> ${message}` );
    }

}
class HelperModuel {

    constructor(){
        this.arc = Math.PI / 180;
    }
    
    sinByDeg(deg){
        return Math.sin( (deg % 360) * this.arc );
    }
    
    cosByDeg(deg){
        return Math.cos( (deg % 360) * this.arc );
    }

}

let Helper = new HelperModuel;
/**
 * @class Loader
 * @desc 一個簡易的載入載具
 */

class Loader extends ModuleBase {

    constructor(){
        super("Loader");
        this.data = {};
        this.files = {};
        this.fileLength = 0;
        this.completed = 0;
    }

    /**
     * @function onload(callback)
     * @desc 等待載入完成，若載入已完成，直接執行callback
     * @param {function} callback 載入完成時執行
     */

    onload(callback){
        if( this.completed >= this.fileLength ){
            callback();
        }else{
            setTimeout(()=>{
                this.onload(callback);
            }, 100);
        }
    }

    /**
     * @function start(loading)
     * @async
     * @desc 執行載入
     * @param {function(completed,length)} loading 載入時觸發的事件
     */

    start(loading){
        for( let name in this.files ){
            this.data[name] = new Image();
            this.data[name].onload = ()=>{
                this.completed += 1;
                if( typeof loading === "function" ){
                    loading( this.completed, this.fileLength );
                }
                if( this.completed === this.fileLength ){
                    delete this.files;
                    delete this.types;
                }
            }
            this.data[name].src = this.files[name];
        }
    }

    /**
     * @function add(name,src)
     * @desc 加入一個等待載入檔案
     */

    add( name, src ){
        if( this.files[name] == null ){
            this.fileLength += 1;
            this.files[name] = this.validateFile(src);
        }else{
            this.systemError("add", "Name conflict.", name);
        }
    }

    /**
     * @function validateFile(file)
     * @private
     * @desc 驗證檔案是否正確
     */

    validateFile( file ){
        let type = file.split(".").pop();
        if( ['png','jpg'].indexOf(type) !== -1 || file.slice( 0, 5 ) === 'data:' ){
            return file;
        }
        if( file instanceof Element && file.tagName("CANVAS") ){
            return canvas.toDataURL("image/png");
        }
        this.systemError( "validateFile", "File type not allowed( png, jpg, canvas element, base64url ).", file );
    }

    /**
     * @function get(name)
     * @desc 取得一個載入完畢的檔案
     */

    get(name){
        if( this.data[name] ){ return this.data[name]; }
        this.systemError("get", "Data not found.", name);
    }

}

class Easing {

    constructor(){}

    static linear( time, over ){
        return time / over;
    }

    static easeInQuad( time, over ){
        return 1 * ( time /= over ) * time + 0;
    }

    static easeOutQuad( time, over ) {
        return -1 * ( time /= over ) * ( time - 2 );
    }

    static easeInOutQuad( time, over ){
        if ( ( time /= over / 2 ) < 1 ) return 1 / 2 * time * time;
        return -1 / 2 * ( ( --time ) * ( time - 2 ) - 1 );
    }

    static easeInCubic( time, over ){
        return 1 * ( time /= over ) * time * time;
    }

    static easeOutCubic( time, over ){
        return 1 * ( ( time = time / over - 1 ) * time * time + 1 );
    }

    static easeInOutCubic( time, over ){
        if ( ( time /= over / 2 ) < 1 ) return 1 / 2 * time * time * time;
        return 1 / 2 * ( ( time -= 2 ) * time * time + 2);
    }

    static easeInQuart( time, over ){
        return 1 * ( time /= over ) * time * time * time;
    }

    static easeOutQuart( time, over ){
        return -1 * ( ( time = time / over -1 ) * time * time * time - 1 );
    }

    static easeInOutQuart( time, over ){
        if ( ( time /= over / 2 ) < 1 ) return 1 / 2 * time * time * time * time;
        return -1 / 2 * ( ( time -= 2 ) * time * time * time - 2 );
    }

    static easeInQuint( time, over ){
        return 1 * ( time /= over ) * time * time * time * time;
    }

    static easeOutQuint( time, over ){
        return 1 * ( ( time = time / over - 1 ) * time * time * time * time + 1 );
    }

    static easeInOutQuint( time, over ){
        if ( ( time /= over / 2 ) < 1) return 1 / 2 * time * time * time * time * time;
        return 1/2 * ( ( time -= 2 ) * time * time * time * time + 2 ) + 0;
    }

    static easeInSine( time, over ){
        return -1 *  Math.cos( time / over * ( Math.PI / 2 ) ) + 1;
    }

    static easeOutSine( time, over ){
        return 1 * Math.sin( time / over * ( Math.PI / 2 ) );
    }

    static easeInOutSine( time, over ){
        return -1 / 2 * ( Math.cos ( Math.PI * time / over ) - 1 );
    }

    static easeInExpo( time, over ){
        return ( time == 0 ) ? 0 : 1 * Math.pow( 2, 10 * ( time / over - 1 ) );
    }

    static easeOutExpo( time, over ){
        return ( time == over ) ? 0 + 1 : 1 * ( -Math.pow ( 2, -10 * time / over) + 1);
    }

    static easeInOutExpo( time, over ){
        if ( time == 0 ) return 0;
        if ( time == over ) return 0 + 1;
        if ( ( time /= over / 2 ) < 1 ) return 1/2 * Math.pow( 2, 10 * ( time - 1 ) );
        return 1 / 2 * ( - Math.pow( 2, -10 * --time) + 2 );
    }

    static easeInCirc( time, over ){
        return -1 * ( Math.sqrt( 1 - ( time /= over ) * time) - 1 );
    }

    static easeOutCirc( time, over ){
        return 1 * Math.sqrt( 1 - ( time = time / over - 1 ) * time );
    }

    static easeInOutCirc( time, over ){
        if ( ( time /= over / 2 ) < 1 ) return -1 / 2 * ( Math.sqrt( 1 - time * time ) - 1 );
        return 1 / 2 * ( Math.sqrt( 1 - ( time -= 2 ) * time ) + 1 );
    }

    static easeInElastic( time, over ){
        var s = 1.70158 ;
        var p = 0;
        var a = 1;
        if ( time == 0 ) return 0;  
        if ( ( time /= over ) == 1 ) return 0 + 1;
        if ( !p ) p = over * .3 ;
        if ( a < 1 ) { a = 1; var s = p / 4 ; }
        else var s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
        return -( a * Math.pow( 2, 10 * ( time -= 1 ) ) * Math.sin( ( time * over - s ) * ( 2 * Math.PI ) / p )) + 0;
    }

    static easeOutElastic( time, over ){
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if ( time == 0 ) return 0;  if ( ( time /= over ) == 1 ) return 0 + 1;  if (!p) p = over*.3;
        if ( a < 1 ) { a = 1; var s = p / 4; }
        else var s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
        return a * Math.pow( 2, -10 * time ) * Math.sin( ( time * over - s ) * ( 2 * Math.PI ) / p ) + 1;
    }

    static easeInOutElastic( time, over ){
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if( time == 0 ) return 0;  
        if( ( time /= over / 2 ) == 2 ) return 0 + 1;  
        if( !p ) p = over * ( 0.3 * 1.5 );
        if ( a < 1 ) { a = 1; var s = p / 4; }        
        if (time < 1){
            return - 0.5 * ( a * Math.pow( 2, 10 * ( time -=1 ) ) * Math.sin( ( time * over - s ) * ( 2 * Math.PI ) / p ));
        }
        return a * Math.pow( 2, -10 * ( time -= 1 ) ) * Math.sin( ( time * over - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;
    }

    static easeInBack( time, over ){
        var s = 1.70158;
        return 1 * ( time /= over ) * time * ( ( s + 1 ) * time - s);
    }

    static easeOutBack( time, over ){
        var s = 1.70158;
        return 1 * ( ( time = time / over - 1 ) * time * ( ( s + 1 ) * time + s) + 1 );
    }

    static easeInOutBack( time, over ){
        var s = 1.70158; 
        if ( ( time /= over / 2 ) < 1 ) return 1 / 2 * ( time * time * ( ( ( s *= ( 1.525 ) ) + 1 ) * time - s));
        return 1 / 2 * ( ( time -= 2 ) * time * ((( s *= ( 1.525 ) ) + 1 ) * time + s) + 2);
    }

    static easeInBounce( time, over ){
        return 1 - this.easeOutBounce( over - time, over);
    }

    static easeOutBounce( time, over ){
        if ( ( time /= over ) < ( 1 / 2.75 )) {
            return 1 * ( 7.5625 * time * time );
        } else if ( time < ( 2 / 2.75 ) ) {
            return 1 * ( 7.5625 * ( time -= ( 1.5 / 2.75 ) ) * time + 0.75 ) + 0;
        } else if ( time < ( 2.5 / 2.75 ) ) {
            return 1 * ( 7.5625 * ( time -= ( 2.25 / 2.75) ) * time + 0.9375 ) + 0;
        } else {
            return 1 * ( 7.5625 * ( time -= ( 2.625 / 2.75 ) ) * time + 0.984375);
        }
    }

    static easeInOutBounce( time, over ){
        if ( time < over / 2 ) return this.easeInBounce ( time * 2,  over ) * 0.5;
        return this.easeOutBounce( time * 2 - over, over ) * 0.5 + 1 * 0.5;
    }

}
/**
 * @class Bitmap
 * @desc 為掌管位元圖的物件
 */

class Bitmap extends ModuleBase {

    constructor( width = 100, height = 100, element ){
        super("Bitmap");
        this.autoResize = false;
        this.canvas = element || document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.imgData = null;
        if( element == null ){ this.resize( width, height ) }
    }

    static isBitmap(object){
        return object instanceof this;
    }

    get width(){ return this.canvas.width }
    set width(val){ this.canvas.width = val; }

    get height(){ return this.canvas.height }
    set height(val){ this.canvas.height = val; }

    /**
     * @function resize(width,height)
     * @desc 調整畫布大小
     */

    resize(width, height){
        this.width = width || this.width;
        this.height = height || this.height;
    }

    /**
     * @function clear()
     * @desc 清空畫布
     */

    clear(){
        this.context.clearRect( 0, 0, this.width, this.height );
    }

    /**
     * @function draw(bitmap,x,y)
     * @desc 繪製一個bitmap在畫布上
     */

    draw( bitmap, x, y ){
        this.context.drawImage( bitmap.canvas, x, y );
    }

    /**
     * @function clearImgDataCache()
     * @desc 清除圖片資料快取
     */

    clearImgDataCache(){
        this.imgData = null;
    }

    /**
     * @function getPixel(x,y)
     * @desc 取得位元位置的像素元素
     */

    getPixel(x, y){
        let imgData = this.getImageData();
        let site = ( x * ( imgData.width * 4 ) ) + ( y * 4 );
        return [
            imgData.data[site],
            imgData.data[site + 1],
            imgData.data[site + 2],
            imgData.data[site + 3],
        ];
    }

    /**
     * @function getImageData()
     * @desc 獲取快取圖片資料
     */

    getImageData(){
        if( this.imgData == null ){
            this.imgData = this.context.getImageData(0,0,this.width,this.height);
        }
        return this.imgData;
    }

    /**
     * @function putImageData()
     * @desc 清空圖片並貼上圖片資料
     */

    putImageData(imgData){
        this.clear();
        this.context.putImageData(imgData,0,0);
    }

    /**
     * @function crop()
     * @desc 裁切掉透明的部分並回傳新的bitmap
     */

    crop(){
        let pix = { x : [], y : [], }
        for( let y = 0; y < this.height ; y++ ){
            for( let x = 0; x < this.width ; x++ ){
                if( this.getPixel(x,y)[3] > 0 ){
                    pix.x.push(x);
                    pix.y.push(y);
                }
            }
        }
        if( pix.x.length === 0 || pix.y.length === 0 ){ return new Bitmap( 0, 0 ); }
        pix.x.sort(function(a,b){return a-b});
        pix.y.sort(function(a,b){return a-b});
        let n = pix.x.length - 1;
        let w = pix.x[n] - pix.x[0];
        let h = pix.y[n] - pix.y[0];
        let bitmap = new Bitmap( this.width, this.height );
            bitmap.putImageData( this.context.getImageData(pix.x[0], pix.y[0], w, h) );
        return bitmap;
    }

}

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
     */

    constructor( target, width, height ){
        super("Main");
        this.width = width;
        this.height = height;
        this.ticker = 0;
        this.target = target;
        this.targetRect = this.target.getBoundingClientRect();
        this.framePerSecond = 60;
        this.baseFps = 0;
 
        this.initBitmap();
        this.initCamera();
        this.initStage();
        this.initEvent();
        
        window.requestAnimationFrame = window.requestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame ||
        function(callback) { window.setTimeout(callback, 1000 / 60); };

        this.update();
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
            this.bitmap = new Bitmap( 0 , 0, this.target );
            this.buffer = new Bitmap( this.width, this.height );
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
        this.pointerX = ( event.offsetX - this.camera.offsetX ) * this.target.width / this.targetRect.width;
        this.pointerY = ( event.offsetY - this.camera.offsetY ) * this.target.height / this.targetRect.height;
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
        this.baseFps -= 1;
        this.stageUpdate();
        this.bitmapUpdate();
        this.eventAction = {};
        if( this.baseFps <= 0 ){ 
            this.baseFps = 60 / this.framePerSecond;
        }
        this.ticker = window.requestAnimationFrame(()=>{
            this.update();
        });
    }

    stageUpdate(){
        this.buffer.clear();
        this.stage.mainEvent();
        this.stage.mainUpdate(this.ticker + 1);
        if( this.baseFps <= 0 ){
            this.stage.mainRender();
            this.stage.drawBuffer(this.buffer);
        }
    }

    bitmapUpdate(){
        if( this.baseFps <= 0 ){
            if( this.camera.sprite ){ this.updateCamera(); }
            this.bitmap.clear();
            this.bitmap.context.drawImage( this.buffer.canvas, this.camera.offsetX, this.camera.offsetY );
        }
    }

}

class Animate extends ModuleBase {

    /**
     * @member {Sprite} sprite 目標精靈
     * @member {number} begin 起始時間
     * @member {number} duration 持續時間
     * @member {string} easing 緩動函數
     * @member {boolean} reverse 反轉前進
     * @member {boolean} alternate 巡迴播放
     * @member {function} action 執行動作
     */

    constructor( sprite, begin, duration, easing, alternate, action ){
        super("Animate");
        this.sprite = sprite;
        this.checkSprite();
        this.validate({
            time : [begin, 0],
            duration : [duration, 0],
            easing : [easing, "linear"],
            alternate : [alternate, false],
            action : [action, function(){}],
        });
        this.over = false;
        this.reverse = false;
        this.actionEasing = this.sprite.main.getEasing(this.easing);
        this.pace = 1000 / this.sprite.main.framePerSecond;
    }

    /**
     * @function checkSprite()
     * @desc 確認是否為可執行的精靈
     */

    checkSprite(){
        if( Sprite.isSprite(this.sprite) ){
            if( this.sprite.main == null ){
                this.systemError( "checkSprite", "Sprite not install. Call Animate in the create please.", this.sprite );
            }
        }else{
            this.systemError( "checkSprite", "Sprite not a Sprite module", this.sprite );
        }
    }

    /**
     * @function validate(data)
     * @desc 驗證正確並賦予資料
     */

    validate(data){
        for( let key in data ){
            let head = data[key][0];
            let aims = data[key][1];
            if( head ){
                if( typeof head === typeof aims ){
                    this[key] = head;
                }else{
                    this.systemError("validated", "Type error", head);
                }
            }else{
                this[key] = aims;
            }
        }
    }

    /**
     * @function move()
     * @desc 往前推動一偵
     */
    
    move(){
        if( this.over === false ){
            let time = this.actionEasing( this.time += this.reverse ? -this.pace : this.pace, this.duration );
            this.action( time );
            if( this.alternate ){
                if( this.time >= this.duration ){
                    this.reverse = true;
                }else if( this.reverse && this.time <= 0 ){
                    this.reverse = false;
                }
            }else if( this.time >= this.duration ){
                this.over = true;
            }
            return time;
        }
        return 1;
    }

    /**
     * @function restart()
     * @desc 重起計算
     */

    restart(){
        this.time = 0;
        this.over = false;
    }

}


/**
 * @class Sprite(moduleName)
 * @desc 建立一個動畫精靈，為LongTake的驅動核心
 */

class Sprite extends ModuleBase {

    constructor(moduleName){
        super( moduleName || "Sprite" );
        this.name = moduleName || "No name",
        this.main = null;
        this.initEvent();
        this.initRender();
        this.initStatus();
        this.initBitmap();
        this.initFamily();
        this.initPosition();
        this.initContainer();
    }

    /**
     * @function isSprite(target)
     * @static
     * @desc 檢測一個物件是否為精靈
     */

    static isSprite(object){
        return object instanceof this;
    }

    /**
     * @function eachChildren(callback)
     * @desc 迭代所有子精靈
     */

    eachChildren(callback){
        let len = this.children.length;
        for( let i = 0 ; i < len ; i++ ){ callback(this.children[i]); }
    }

    /**
     * @function eachChildrenDeep(callback)
     * @desc 迭代所有子精靈(包含子精靈的子精靈)
     */

    eachChildrenDeep(callback){
        let each = function(sprite){
            sprite.eachChildren((children)=>{
                callback(children);
                each(children);
            });
        }
        each(this);
    }

    /**
     * @function super(name);
     * @desc 當實體化該精靈後，可以使用super呼叫實體化前的函式
     * @param {string} name 呼叫函式名稱
     */

    super(name){
        if( this.__proto__[name] ){
            this.__proto__[name].call(this, ...[...arguments].slice(1));
        }else{
            this.systemError("super", "Prototype not found.", name);
        }
    }

    //=============================
    //
    // install
    //

    /**
     * @function install(main)
     * @desc 被加入LongTake時執行，並載入LongTake
     */

    install(main){
        this.main = main;
        this.main.register(this);
        this.create();
    }

    /**
     * @function create()
     * @desc 當被加入stage時呼叫該函式
     */

    create(){ /* user set */ }

    //=============================
    //
    // bitmap
    //

    initBitmap(){
        let parent = this.parent || {};
        this.bitmap = new Bitmap( parent.width || 100, parent.height || 100 );
        this.context = this.bitmap.context;
    }

    /**
     * @member {number} width 精靈寬(和位圖同步)
     * @member {number} height 精靈高(和位圖同步)
     */

    get width(){ return this.bitmap.width }
    get height(){ return this.bitmap.height }

    /**
     * @function resize(width,height)
     * @desc 調整精靈的bitmap大小
     * @param {object|number} width 當傳入為具有width和height的物件，會調整成該大小
     */

    resize( width, height ){
        if( typeof width === "object" ){
            if( width.width && width.height ){
                this.bitmap.resize( width.width, width.height )
            }else{
                this.systemError( "resize", "Object must have width and height.", width );
            }
        }else{
            this.bitmap.resize(width, height)
        }
    }

    //=============================
    //
    // family
    //

    /**
     * @member {Sprite} parent 父精靈
     * @member {array} children 子精靈組
     */

    initFamily(){
        this.parent = null;
        this.children = [];
    }

    /**
     * @function addChildren(sprite)
     * @desc 加入一個子精靈
     */

    addChildren(sprite){
        if( Sprite.isSprite(sprite) ){
            if( sprite.parent == null ){
                sprite.parent = this;
                this.children.push(sprite);
                this.sortChildren();
            }else{
                this.systemError('addChildren', 'Sprite have parent.', sprite);
            }
        }else{
            this.systemError('addChildren', 'Object not a sprite', sprite);
        }
    }

    /**
     * @function sortChildren()
     * @desc 重新排列子精靈
     */

    sortChildren(){
        let newData = [];
        let childList = [];
        this.eachChildren((child)=>{
            if( childList[child.z] == null ){ childList[child.z] = []; }
            childList[child.z].push(child)
        })
        this.each( childList, (list)=>{
            if( Array.isArray(list) ){ newData = newData.concat(list); }
        });
        this.children = newData;
    }

    //=============================
    //
    // event
    //

    initEvent(){
        this.event = {};
    }

    /**
     * @function on(name,event,callback)
     * @desc 監聽一個事件
     */

    on( name, event, callback ){
        if( this.event[name] == null ){
            if( this.main ){ this.main.addEvent(event); }
            this.event[name] = {
                event : event,
                callback : callback,
            }
        }else{
            this.systemError( 'on', `Event name(${name}) conflict.` )
        }
    }

    /**
     * @function unon(name)
     * @desc 移除監聽的事件
     */

    unon( name ){
        this.event[name] = null;
    }

    mainEvent(){
        if( this.main == null ){ this.install(this.parent.main); }
        this.each( this.main.eventAction, ( event, key )=>{
            this.each( this.event, (data)=>{
                if( data.event === key ){ data.callback(event); }
            });
        });
        this.eachChildren((children)=>{
            children.mainEvent();
        });
    }

    //=============================
    //
    // container
    //

    /**
     * @member {number} skewX 傾斜X
     * @member {number} skewY 傾斜Y
     * @member {number} scaleWidth 放大寬
     * @member {number} scaleHeight 放大高
     * @member {number} rotation 旋轉
     * @member {number} opacity 透明度
     * @member {number} blendMode 合成模式
     */

    initContainer(){
        this.container = {
            skewX : 0,
            skewY : 0,
            scaleWidth : 1,
            scaleHeight : 1,
            rotation : 0,
            opacity : 255,
            blendMode : null, 
        }
    }

    /**
     * @function scale(width,height)
     * @desc 放大倍率
     */

    scale( width, height ){
        this.scaleWidth = width;
        this.scaleHeight = height || width;
    }

    get scaleWidth(){ return this.container.scaleWidth }
    set scaleWidth(val){
        this.container.scaleWidth = val;
    }

    get scaleHeight(){ return this.container.scaleHeight }
    set scaleHeight(val){
        this.container.scaleHeight = val;
    }

    get rotation(){ return this.container.rotation }
    set rotation(val){
        this.container.rotation = val % 360;
    }

    get blendMode(){ return this.container.blendMode };
    set blendMode(val){
        this.container.blendMode = val;
    }

    get opacity(){ return this.container.opacity };
    set opacity(val){
        if( val <= 0 ){ val = 0; }
        if( val >= 255 ){ val = 255; }
        this.container.opacity = val;
    }

    get skewX(){ return this.container.skewX }
    set skewX(val){
        this.container.skewX = val;
    }

    get skewY(){ return this.container.skewY }
    set skewY(val){
        this.container.skewY = val;
    }

    //=============================
    //
    // position
    //

    /**
     * @member {number} x 定位點X
     * @member {number} y 定位點Y
     * @member {number} z 高度，每次設定會重新排序
     * @member {number} anchorX 錨點X
     * @member {number} anchorY 錨點Y
     */

    initPosition(){
        this.position = {
            x : 0,
            y : 0,
            z : 0,
            anchorX : 0,
            anchorY : 0,
        }
    }

    /**
     * @function setAnchor(x,y)
     * @desc 設定錨點
     */

    setAnchor(x, y){
        this.anchorX = x;
        this.anchorY = y || x
    }

    get x(){ return this.position.x }
    set x(val){ 
        if( typeof val === "number" ) {
            this.position.x = val || 0;
        }
    }

    get y(){ return this.position.y }
    set y(val){ 
        if( typeof val === "number" ) {
            this.position.y = val || 0;
        }
     }

    get z(){ return this.position.z }
    set z(val){
        if( typeof val === "number" ){
            this.position.z = val;
            if( this.parent ){ this.parent.status.sort = true; }
        }
    }

    get screenX(){ return (this.parent ? this.parent.screenX + this.parent.width * this.parent.anchorX : 0) + this.x - this.width * this.anchorX }
    get screenY(){ return (this.parent ? this.parent.screenY + this.parent.height * this.parent.anchorY : 0) + this.y - this.height * this.anchorY }

    get posX(){ return this.screenX + this.width * this.anchorX }
    get posY(){ return this.screenY + this.height * this.anchorY }

    get anchorX(){ return this.position.anchorX }
    set anchorX(val){
        this.position.anchorX = val;
    }

    get anchorY(){ return this.position.anchorY }
    set anchorY(val){
        this.position.anchorY = val;
    }
    
    //=============================
    //
    // status
    //

    initStatus(){
        this.status = {
            sort : false,
            cache : false,
            remove : false,
            hidden : false,
            readSize : null,
        }
    }

    get canRender(){ return !this.status.cache; }
    get canShow(){ return !this.status.hidden && !this.getOffscreen() }

    /**
     * @function cache()
     * @desc 快取目前渲染的bitmap
     */

    cache(){
        this.status.cache = true;
    }

    /**
     * @function unCache()
     * @desc 手動解除快取狀態
     */

    unCache(){
        this.status.cache = false;
    }

    /**
     * @function hidden()
     * @desc 隱藏
     */

    hidden(bool){
        this.status.hidden = bool ? !!bool : true;
    }

    /**
     * @function unHidden()
     * @desc 解除隱藏
     */

    unHidden(){
        this.status.hidden = false;
    }

    /**
     * @function getMaxSize()
     * @desc 獲取該精靈預期最大的大小
     */

    getRealSize(){
        if( this.status.readSize == null ){
            let width = this.width + this.skewY * this.height;
            let height = this.height + this.skewX * this.width;
            let s = Math.abs(Helper.sinByDeg(this.rotation));
            let c = Math.abs(Helper.cosByDeg(this.rotation));
            this.status.readSize = {
                width : ( width * c + height * s ) * this.scaleWidth,
                height : ( height * c + width * s ) * this.scaleHeight,
            }
        }
        return this.status.readSize;
    }

    /**
     * @function getOffscreen()
     * @desc 獲取該精靈是否在視窗外
     */

    getOffscreen(){
        if( this.main ){
            let size = this.getRealSize();
            if( this.screenX <= this.main.camera.offsetX + this.main.bitmap.width 
                && this.screenY <= this.main.camera.offsetY + this.main.bitmap.height
                && this.screenX + size.width >= this.main.camera.offsetX 
                && this.screenY + size.height >= this.main.camera.offsetY){
                    return false;
            }
        }
        return true;
    }

    //=============================
    //
    // update
    //

    /**
     * @function update()
     * @desc 每次渲染圖形時執行此函式，目的為精靈的動作
     */

    update(){ /* module set */ }

    /**
     * @function mainUpdate()
     * @desc 每次執行update時呼叫此函式，處理Z值更動的排序與移除子精靈
     */

    mainUpdate(ticker){
        this.status.readSize = null;
        let remove = false;
        if( this.status.sort ){
            this.status.sort = false;
            this.sortChildren();
        }
        this.update(ticker);
        this.eachChildren((children)=>{
            if( children.status.remove == false ){
                children.mainUpdate(ticker);
            }else{
                remove = true;
            }
        });
        if( remove ){
            this.children = this.children.filter((c)=>{
                if( c.status.remove ){ 
                    c.id = -1; 
                    c.parent = null; 
                }
                return !c.status.remove;
            });
        }
    }

    //=============================
    //
    // remove
    //

    /**
     * @function remove()
     * @desc 移除自己
     */

    remove(){
        this.status.remove = true;
    }

    /**
     * @function removeChild(sprite)
     * @desc 移除指定的子精靈
     */

    removeChild(sprite){
        if( Sprite.isSprite(sprite) ){
            if( sprite.parent === this ){
                sprite.remove();
            }else{
                this.systemError("removeChild", "Have'n this sprite", sprite);
            }
        }else{
            this.systemError("removeChild", "Not a sprite", sprite);
        }
    }

    /**
     * @function clearChildren()
     * @desc 移除全部的子精靈
     */

    clearChildren(){
        this.eachChildren((children)=>{
            this.removeChild(children);
        })
    }

    /**
     * @function removeChildrenByName(name)
     * @desc 移除指定name的精靈
     */

    removeChildrenByName(name){
        this.eachChildren((children)=>{
            if( children.name === name ){ this.removeChild(children); }
        })
    }

    /**
     * @function removeChildrenByIndex(index)
     * @desc 移除指定index的精靈
     */

    removeChildrenByIndex(index){
        if( typeof index === "number" && this.children[index] ){
            this.children[index].remove();
        }
    }

    //=============================
    //
    // render
    //

    /**
     * @function filter(imgData)
     * @default null
     * @desc 渲染濾鏡的函式
     */

    /**
     * @function mask()
     * @default null
     * @desc 建立遮罩的函式
     */

    initRender(){
        this.mask = null;
        this.filter == null;
    }

    /**
     * @function render(this)
     * @desc 渲染bitmap的方法
     */
    
    render(){ /* module set */ }

    /**
     * @function mainRender(force)
     * @desc 主要渲染程序，包含渲染與濾鏡
     * @param {boolean} force 無視快取強制重新渲染(切忌渲染需要高效能的成本付出)
     */

    mainRender(force){
        this.eachChildren((children)=>{children.mainRender();})
        if( this.canRender || force ){ 
            this.context.save();
            this.render(this);
            this.context.restore();
            this.renderFilter(this.filter);
            this.context.restore();
            this.bitmap.clearImgDataCache();
        }
    }

    /**
     * @function renderFilter(filter)
     * @desc 操作堆疊渲染的函式
     */

    renderFilter(filter){
        if( filter ){
            let imgData = this.bitmap.getImageData();
            filter(imgData);
            this.bitmap.putImageData(imgData);
            this.eachChildren((child) => {child.renderFilter(filter);});
        }
    }

    /**
     * @function drawImage(imageName,x,y)
     * @desc 繪製加載完成的圖片
     */

    drawImage(imageName,x = 0, y = 0){
        let image = this.main.getImageByName(imageName);
        this.context.drawImage( image, x, y );
    }

    /**
     * @function resizeFromImage()
     * @desc 調整至加載圖片的大小
     */

    resizeFromImage(imageName){
        let image = this.main.getImageByName(imageName);
        this.resize( image.width, image.height );
    }

    /**
     * @function resizeMax()
     * @desc 調整大小至LongTake大小
     */

    resizeMax(){
        if( this.main ){
            this.resize( this.main.width, this.main.height );
        }else{
            this.systemError("resizeMax", "Function call must in the create or update.");
        }
    }

    //=============================
    //
    // draw
    //

    /**
     * @function drawBuffer(buffer)
     * @desc 對一個buffer準備進行繪製
     */

    drawBuffer(buffer){
        if( this.canShow ){
            buffer.context.save();
            this.drawTransform(buffer);
            this.drawBitmap(buffer);
            buffer.context.restore();
        }
    }

    /**
     * @function drawTransform(buffer)
     * @desc 繪製buffer前的轉換行為
     */

    drawTransform(buffer){
        //中心
        let posX = this.posX;
        let posY = this.posY;
        buffer.context.translate( posX, posY );
        //遮罩
        if( this.mask ){
            this.mask();
            this.context.clip();
        }
        if( this.opacity !== 255 ){
            buffer.context.globalAlpha = this.opacity / 255;
        }
        //合成
        if( this.blendMode ){
            buffer.context.globalCompositeOperation = this.blendMode;
        }
        if( this.rotation !== 0 ){
            buffer.context.rotate( this.rotation * this.main.math.arc );
        }
        if( this.scaleHeight !== 1 || this.scaleWidth !== 1 ){
            buffer.context.scale( this.scaleWidth, this.scaleHeight );
        }
        if( this.skewX !== 0 || this.skewY !== 0 ){
            buffer.context.transform( 1, this.skewX, this.skewY, 1, 0, 0 );
        }
        //回歸原點
        buffer.context.translate( -(posX), -(posY) );
    }

    /**
     * @function drawBitmap(buffer)
     * @desc 將自身的bitmap繪製buffer上
     */

    drawBitmap(buffer){
        buffer.draw( this.bitmap, this.screenX, this.screenY );
        this.eachChildren((children)=>{ children.drawBuffer(buffer); });
    }

    //=============================
    //
    // check
    //

    /**
     * @function inRect(x,y)
     * @desc 測試座標是否在精靈的矩形範圍內
     */

    inRect(x,y){
        let rect = this.getRealSize();
        return ( x >= this.screenX && x <= this.screenX + rect.width ) 
            && ( y >= this.screenY && y <= this.screenY + rect.height );
    }

}


            let __re = LongTake;
            __re.Sprite = Sprite;
__re.Bitmap = Bitmap;
__re.Loader = Loader;
__re.Animate = Animate;

            return __re;
        
    })
