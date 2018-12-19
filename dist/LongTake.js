

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
/**
 * @class HelperModule
 * @desc 具擴展性的多元物件
 */

class HelperModule {

    constructor(){
        this.arc = Math.PI / 180;
        this.rarc = 180 / Math.PI;
        this.trigonometric = {};
        for( let i = -360 ; i < 360 ; i++ ){
            this.trigonometric[i] = {};
            this.trigonometric[i].sin = Math.sin(i * this.arc);
            this.trigonometric[i].cos = Math.cos(i * this.arc);
        }
    }
    
    /**
     * @function sinByRad(deg)
     * @desc 獲取角度轉換弧度後的sin值
     * @returns {number}
     */
    
    sinByRad(deg){
        if( this.trigonometric[Math.round(deg)] ){
            return this.trigonometric[Math.round(deg)].sin
        }else{
            return Math.sin(deg * this.arc);
        }
    }

    /**
     * @function cosByRad(deg)
     * @desc 獲取角度轉換弧度後的cos值
     * @returns {number}
     */
    
    cosByRad(deg){
        if( this.trigonometric[Math.round(deg)] ){
            return this.trigonometric[Math.round(deg)].cos
        }else{
            return Math.cos(deg * this.arc);
        }
    }

    /**
     * @function getVector(deg,distance)
     * @desc 獲取向量
     * @returns {x,y}
     */

    getVector( deg, distance ){
    	return { 
            x : distance * this.cosByRad(deg),
            y : distance * this.sinByRad(deg)
        };
    }

    /**
     * @function randInt(min,max)
     * @desc 求整數範圍內的隨機值
     * @returns {number}
     */

    randInt( min, max ){
        return Math.floor( Math.random() * ( max-min + 1 ) + min );
    }

    /**
     * @function getAngle(x,y,ax,ay)
     * @desc 求兩點角度
     * @returns {number}
     */

    getAngle( x, y, ax, ay ){
        if( x == ax && y == ay ){ return 0; }
        var angle = Math.atan2(( ay - y ), ( ax - x )) * this.rarc;
        return angle > 0 ? angle : 360 + angle;
    }

    /**
     * @function getVisibility(view)
     * @desc 檢測目前螢幕裝置大小
     * @param {string} view xs, sm, md, le, xl
     * @returns {boolean}
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

}

let Helper = new HelperModule;
/**
 * @class Loader
 * @desc 針對圖片預載入的載具
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
            let image = new Image();
            image.onload = ()=>{
                if( window.createImageBitmap ){
                    window.createImageBitmap(image).then((bitmap)=>{
                        this.data[name] = bitmap;
                    });
                }else{
                    this.data[name] = image;
                }
                this.completed += 1;
                if( typeof loading === "function" ){
                    loading( this.completed, this.fileLength );
                }
                if( this.completed === this.fileLength ){
                    delete this.files;
                    delete this.types;
                }
            }
            image.src = this.files[name];
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

    /**
     * @function close(name)
     * @desc 清除快取釋放記憶體
     * @param {string} name 當此值沒有輸入，將清空全部
     */

    close( name ){
        if( name && this.data[name] ){
            this.data[name].src = "";
            this.data[name] = null
        }else{
            this.each( this.data, ( data )=>{
                data.src = "";
                data = null;
            });
        }
    }

}

/**
 * @class Easing
 * @static
 * @desc 取得緩動函數的靜態物件
 * @see {支援表} https://easings.net/zh-tw
 */

class Easing {

    /**
     * @function get(name)
     * @desc 獲取相對應的緩動函數
     */

    static get(name){
        if( Easing[name] && name !== "constructor" && name !== "get" ){
            return Easing[name];
        }else{
            return Easing.linear;
        }
    }

    static linear( time, over ){
        return time / over;
    }

    static easeInQuad( time, over ){
        return 1 * ( time /= over ) * time;
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
        return 1/2 * ( ( time -= 2 ) * time * time * time * time + 2 );
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
        return ( time == over ) ? 1 : 1 * ( -Math.pow ( 2, -10 * time / over) + 1);
    }

    static easeInOutExpo( time, over ){
        if ( time == 0 ) return 0;
        if ( time == over ) return 1;
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
        if ( ( time /= over ) == 1 ) return 1;
        if ( !p ) p = over * .3 ;
        if ( a < 1 ) { a = 1; var s = p / 4 ; }
        else var s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
        return -( a * Math.pow( 2, 10 * ( time -= 1 ) ) * Math.sin( ( time * over - s ) * ( 2 * Math.PI ) / p ));
    }

    static easeOutElastic( time, over ){
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if ( time == 0 ) return 0;  if ( ( time /= over ) == 1 ) return 1;  if (!p) p = over*.3;
        if ( a < 1 ) { a = 1; var s = p / 4; }
        else var s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
        return a * Math.pow( 2, -10 * time ) * Math.sin( ( time * over - s ) * ( 2 * Math.PI ) / p ) + 1;
    }

    static easeInOutElastic( time, over ){
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if( time == 0 ) return 0;  
        if( ( time /= over / 2 ) == 2 ) return 1;  
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
            return 1 * ( 7.5625 * ( time -= ( 1.5 / 2.75 ) ) * time + 0.75 );
        } else if ( time < ( 2.5 / 2.75 ) ) {
            return 1 * ( 7.5625 * ( time -= ( 2.25 / 2.75) ) * time + 0.9375 );
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
 * @desc 為掌管位圖的物件
 */

class Bitmap extends ModuleBase {

    /**
     * @member {boolean} offscreenCanvasSupport 是否支援離屏渲染
     * @member {element} canvas 內部指向的離屏canvas
     * @member {object} context cavnas 2d context
     * @member {boolean} cache 是否為快取狀態
     * @member {object} imgData 由context.getImageData取得的int8Array位圖元素
     * @member {object} imgBitmap 由快取產生的圖片buffer
     */

    constructor( width = 100, height = 100, element, context = '2d' ){
        super("Bitmap");
        this.offscreenCanvasSupport = typeof self === 'undefined' ? !!window.OffscreenCanvas : !!self.OffscreenCanvas;
        this.canvas = element || this.offscreenCanvasSupport ? new OffscreenCanvas(width, height) : document.createElement('canvas');
        this.context = this.canvas.getContext(context);
        this.cache = false;
        this.imgData = null;
        this.imgBitmap = null;
        this._width = this.canvas.width;
        this._height = this.canvas.height;
        if( element == null ){ this.resize( width, height ) }
    }

    static isBitmap(object){
        return object instanceof this;
    }

    get width(){ return this._width }
    set width(val){
        this._width = val;
        this.canvas.width = val;
    }

    get height(){ return this._height }
    set height(val){ 
        this._height = val;
        this.canvas.height = val;
    }

    /**
     * @function getRenderTarget()
     * @private
     * @desc 獲取渲染目標
     */

    getRenderTarget(){
        if( this.imgBitmap && this.cache === true ){
            return this.imgBitmap;
        }else if( this.cache === false ){
            return this.canvas;
        }else {
            this.cacheImageBitmap();
            return this.offscreenCanvasSupport ? this.imgBitmap : this.canvas;
        }
    }

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
     * @function cacheImageBitmap()
     * @private
     * @desc 當此位圖快取時，將render target轉換成img or imagebitmap加速渲染
     */

    cacheImageBitmap(){
        if( this.offscreenCanvasSupport ){
            this.imgBitmap = this.canvas.transferToImageBitmap();
        }else{
            let img = new Image();
            img.onload = ()=>{ this.imgBitmap = img }
            img.src = this.canvas.toDataURL();
        }
    }

    /**
     * @function clearCache()
     * @desc 解除並清除圖片資料快取
     */

    clearCache(){
        this.imgData = null;
        this.imgBitmap = null;
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
     * @private
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
     * @private
     * @desc 清空圖片並貼上圖片資料
     */

    putImageData(imgData){
        this.clear();
        this.context.putImageData(imgData,0,0);
    }

}


/**
 * @class Container(width,height)
 * @desc 一個靜態的精靈容器，負責呈現精靈與位圖的計算結果
 */

class Container extends ModuleBase {

    /**
     * @member {LongTake} core 是否指向LongTakeCore
     * @member {Sprite} stage 主精靈
     * @member {Bitmap} bitmap 主位圖
     * @member {number} width 位圖寬(與位圖同步)
     * @member {number} height 位圖高(與位圖同步)
     * @member {number} pointerX 當此Container指向LongTakeCore時，該值會隨著鼠標或觸碰位置改變
     * @member {number} pointerY 當此Container指向LongTakeCore時，該值會隨著鼠標或觸碰位置改變
     */

    constructor( width, height, core ){
        super("Container");
        this.data = null;
        this.core = core || null;
        this.bitmap = new Bitmap( width, height );
        this.context = this.bitmap.context;
        this.stackOpacity = [];
        this.pointerX = 0;
        this.pointerY = 0;
        this.initStage();
    }

    get width(){ return this.bitmap.canvas.width }
    get height(){ return this.bitmap.canvas.height }

    initStage(){
        this.stage = new Sprite("Stage");
        this.stage.install(this);
        this.stage.resize(0,0);
        this.stage.render = function(){ this.cache(); }
    }

    /**
     * @function register(sprite)
     * @desc 當sprite優先註冊過事件，在 install container 的時候回補註冊至LongTake
     */

    register(sprite){
        if( this.core ){
            this.each( sprite.event, ( value )=>{
                if( this.core.event[value.event] == null ){
                    this.core.addEvent(value.event);
                }
            });
        }
    }

    /**
     * @function post(data)
     * @desc 發送一個data給Container並觸發重渲染
     */

    post(data){
        this.data = data;
        this.stageUpdate();
        this.stageRender();
    }

    stageUpdate(){
        this.stage.mainUpdate();
    }

    stageRender(){
        this.stage.mainRender();
        this.draw();
    }

    /**
     * @function getImageBitmap(callback)
     * @desc 獲取該Container的ImageBitmap
     * @callback (ImageBitmap)
     */

    getImageBitmap(callback){
        if( this.bitmap.offscreenCanvasSupport ){
            let bitmap = this.bitmap.canvas.transferToImageBitmap();
            callback( bitmap );
            bitmap.close();
        }else{
            callback( this.bitmap.canvas );
        }
    }

    /**
     * @function addChildren(sprite)
     * @desc 加入一個子精靈
     */

    addChildren(sprite){
        this.stage.addChildren(sprite);
    }

    draw(){
        this.bitmap.clear();
        this.render(this.stage);
    }

    render( sprite ){
        if( sprite.canShow ){
            let screenX = Math.round(sprite.screenX);
            let screenY = Math.round(sprite.screenY);
            let realPosition = sprite.getRealPosition();
            this.transform(sprite);
            if( realPosition.x < this.width && realPosition.y < this.height ){
                this.context.drawImage( sprite.bitmap.getRenderTarget(), screenX, screenY );
            }
            let len = sprite.children.length;
            for( let i = 0 ; i < len ; i++ ){
                this.render(sprite.children[i]);
            }
            this.restore(sprite);
        }
    }

    transform(sprite){
        var context = this.context;
        if( sprite.scaleHeight !== 1 || sprite.scaleWidth !== 1 ){
            context.save();
        }
        if( sprite.opacity !== 255 ){
            this.stackOpacity.push(sprite.opacity);
            context.globalAlpha = this.stackOpacity.reduce(( a, b )=>{ return a + b }) / (255 * this.stackOpacity.length);
        }
        if( sprite.blendMode !== 'source-over' ){
            context.globalCompositeOperation = sprite.blendMode;
        }
        if( sprite.isTransform() === false ){ return; }
        let posX = sprite.posX;
        let posY = sprite.posY;
        context.translate( posX, posY );
        if( sprite.scaleHeight !== 1 || sprite.scaleWidth !== 1 ){
            context.scale( sprite.scaleWidth, sprite.scaleHeight );
        }
        if( sprite.rotation !== 0 ){
            context.rotate( sprite.rotation * sprite.helper.arc );
        }
        if( sprite.skewX !== 0 || sprite.skewY !== 0 ){
            context.transform( 1, sprite.skewX, sprite.skewY, 1, 0, 0 );
        }
        context.translate( -(posX), -(posY) );
    }

    restore(sprite){
        var context = this.context;
        if( sprite.scaleHeight !== 1 || sprite.scaleWidth !== 1 ){
            context.restore();
            return;
        }
        if( sprite.opacity !== 255 ){
            this.stackOpacity.pop();
            if( this.stackOpacity.length === 0 ){
                context.globalAlpha = 1;
            }else{
                context.globalAlpha = this.stackOpacity.reduce(( a, b )=>{ return a + b }) / (255 * this.stackOpacity.length);
            }
        }
        if( sprite.blendMode !== 'source-over' ){
            context.globalCompositeOperation = 'source-over';
        }
        if( sprite.isTransform() === false ){ return; }
        let posX = sprite.posX;
        let posY = sprite.posY;
        context.translate( posX, posY );
        if( sprite.rotation !== 0 ){
            context.rotate( -(sprite.rotation * sprite.helper.arc) );
        }
        if( sprite.skewX !== 0 || sprite.skewY !== 0 ){
            context.transform( 1, -sprite.skewX, -sprite.skewY, 1, 0, 0 );
        }
        context.translate( -posX, -posY );
    }

}
/**
 * @class LongTake(canvasDom,width,height)
 * @desc 核心
 */

class LongTake extends ModuleBase {

    /**
     * @member {number} width 繪製圖的寬
     * @member {number} height 繪製圖的高
     * @member {number} ticker 目前運行的偵數
     * @member {number} framePerSecond 最大FPS數
     * @member {number} baseFps 目前實際運行的fps
     * @member {number} viewScale 整體視圖倍率
     * @member {object} target 目前運行的canvas
     * @member {object} targetRect 目前運行的canvas實際大小
     * @member {Container} container 主要運行的container，由本核心驅動內部精靈的update和event
     */

    constructor( target, width, height ){
        super("Main");
        this.width = width;
        this.height = height;
        this.ticker = 0;
        this.remove = false;
        this.target = typeof target === "string" ? document.getElementById(target) : target;
        this.context = this.target.getContext('2d');
        this.baseFps = 0;
        this.viewScale = 1;
        this.framePerSecond = 60;
        this.bindUpdate = this.update.bind(this);
        this.targetRect = this.target.getBoundingClientRect();
        this.container = new Container( this.width, this.height, this );

        window.requestAnimationFrame = window.requestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame ||
        function(callback) { window.setTimeout(callback, 1000 / 60); };

        this.initEvent();
        this.initCamera();
        this.update();
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
     * @function close()
     * @desc 關閉這個Longtake
     */

    close(){
        this.remove = true;
        this.target = null;
        this.container.stage.eachChildrenDeep((child)=>{ child.close(); });
        window.removeEventListener( 'resize', this.windowResize.bind(this) );
    }

    //=============================
    //
    // camera
    //

    /**
     * @member {object} camera 鏡頭物件
     */

    initCamera(){
        this.camera = new class {

            constructor(core){ 
                this.x = 0; 
                this.y = 0;
                this.core = core;
            }

            get offsetX(){
                return this.checkBorder( this.x, this.core.width * this.core.viewScale, this.core.targetRect.width );
            }

            get offsetY(){ 
                return this.checkBorder( this.y, this.core.height * this.core.viewScale, this.core.targetRect.height );
            }

            checkBorder( now, view, target ){
                var now = now * this.core.viewScale;
                var front = target / 2;
                var back = view - front;
                return now > front ? ( now > back ? view - target : (now - front) / this.core.viewScale ) : 0;
            }

        }(this);
    }

    /**
     * @function setCamera(x,y)
     * @desc 移動鏡頭至x,y
     */

    setCamera( x, y ){
        this.camera.x = x;
        this.camera.y = y;
    }

    //=============================
    //
    // event
    //

    initEvent(){
        this.event = {};
        this.eventAction = {};
        this.addEvent( "click", this.resetPointerCoordinate )
        this.addEvent( "pointermove", this.resetPointerCoordinate );
        this.windowResize();
        window.addEventListener( 'resize', this.windowResize.bind(this) );
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

    /**
     * @function resetPointerCoordinate(event)
     * @private
     * @desc 重新設定矯正過後的觸及位置
     */
    
    resetPointerCoordinate(event){
        this.container.pointerX = ( event.offsetX / this.viewScale + this.camera.offsetX ) * ( this.target.width / this.targetRect.width );
        this.container.pointerY = ( event.offsetY / this.viewScale + this.camera.offsetY ) * ( this.target.height / this.targetRect.height ) ;
    }

    /**
     * @function targetResize(width,height)
     * @desc 調整視圖canvas的大小
     */

    targetResize( width, height ){
        this.target.width = width;
        this.target.height = height;
        this.targetRect = this.target.getBoundingClientRect();
    }

    windowResize(){
        this.targetRect = this.target.getBoundingClientRect();
        this.onWindowResize();
    }

    /**
     * @function onWindowResize()
     * @desc 當畫面旋轉或縮放時觸發該function(自定義)
     */

    onWindowResize(){}

    /**
     * @function forElementResize(element,scale)
     * @desc 縮放視圖倍率至指定element大小(cover縮放模式)
     * @param scale 縮放倍率(預設為1)
     */

    forElementResize( element, scale = 1 ){
        this.targetResize( element.clientWidth, element.clientHeight );
        if( element.clientWidth / this.width < element.clientHeight / this.height ){
            this.viewScale = element.clientHeight / this.height * scale;
        }else{
            this.viewScale = element.clientWidth / this.width * scale;
        }
        this.context.restore();
        this.context.save();
        this.context.scale( this.viewScale, this.viewScale );
    }

    /**
     * @function addChildren(sprite)
     * @desc 加入一個精靈至container底下
     */

    addChildren(sprite){
        this.container.addChildren(sprite);
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
        this.stageUpdate();
        if( this.baseFps >= 60 ){
            this.bitmapUpdate();
            this.baseFps = this.baseFps % 60;
        }
        this.eventAction = {};
        this.ticker = window.requestAnimationFrame(this.bindUpdate);
    }

    stageUpdate(){
        this.container.stage.mainEvent(this.eventAction);
        this.container.stageUpdate();
    }

    bitmapUpdate(){
        this.container.stageRender();
        this.context.clearRect( 0, 0, this.width, this.height );
        this.context.drawImage( this.container.bitmap.canvas,- this.camera.offsetX, -this.camera.offsetY );
    }

}

/**
 * @class Animate(options)
 * @desc 一個動畫的載具
 * @see {easing} https://easings.net/zh-tw
 */

class Animate extends ModuleBase {

    /**
     * @argument options 動畫選項
     * @param {number} push 每次前進的偵數
     * @param {number} begin 起始時間
     * @param {number} duration 持續時間
     * @param {string} easing 緩動函數
     * @param {boolean} reverse 反轉前進
     * @param {boolean} alternate 巡迴播放
     * @param {function} action 執行動作
     */

    constructor( options ){
        super("Animate");
        this.validate({
            push : [ options.push, 60 ],
            time : [ options.begin, 0],
            duration : [ options.duration, 0],
            easing : [ options.easing, "linear"],
            alternate : [ options.alternate, false],
            reverse : [ options.reverse, false],
            action : [ options.action, function(){}],
        });
        this.over = false;
        this.actionEasing = Easing.get(this.easing);
        this.pace = 1000 / this.push;
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
 * @class Sprite(name)
 * @desc 建立一個動畫精靈，為LongTake的驅動核心
 */

class Sprite extends ModuleBase {

    constructor(name){
        super( name || "Sprite" );
        this.name = name || "No name";
        this.main = null;
        this.helper = Helper;
        this.bindUpdateForChild = this.updateForChild.bind(this);
        this.initEvent();
        this.initRender();
        this.initStatus();
        this.initBitmap();
        this.initFamily();
        this.initPosition();
        this.initTransform();
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
     * @function super(name)
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
     * @private
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
     * @member {number} width 精靈寬(和Bitmap同步)
     * @member {number} height 精靈高(和Bitmap同步)
     */

    get width(){ return this.bitmap.width }
    set width(val){ this.bitmap.width = val }

    get height(){ return this.bitmap.height }
    set height(val){ this.bitmap.height = val }

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
     * @desc 重新排列子精靈，當子精靈有Z值改變時會自動觸發
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
            if( this.main.core ){ this.main.core.addEvent(event); }
            this.event[name] = {
                event,
                callback,
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

    mainEvent(eventAction){
        if( this.main == null ){ this.install(this.parent.main); }
        this.each( eventAction, ( event, key )=>{
            this.each( this.event, (data)=>{
                if( data.event === key ){ data.callback(event); }
            });
        });
        this.eachChildren((children)=>{
            children.mainEvent(eventAction);
        });
    }

    //=============================
    //
    // transform
    //

    /**
     * @member {number} skewX 傾斜X
     * @member {number} skewY 傾斜Y
     * @member {number} scaleWidth 放大寬
     * @member {number} scaleHeight 放大高
     * @member {number} rotation 旋轉
     * @member {number} opacity 透明度
     * @member {number} blendMode 合成模式
     * @member {number} screenScaleWidth 該精靈在最後顯示的總倍率寬
     * @member {number} screenScaleHeight 該精靈在最後顯示的總倍率高
     */

    initTransform(){
        this.transform = {
            skewX : 0,
            skewY : 0,
            scaleWidth : 1,
            scaleHeight : 1,
            rotation : 0,
            opacity : 255,
            blendMode : 'source-over',
        }
    }

    /**
     * @function isTransform()
     * @desc 是否有變形
     */

    isTransform(){
        let t = this.transform;
        return !(t.skewX === 0 && t.skewY === 0 && t.scaleWidth === 1 && t.scaleHeight === 1 && t.rotation === 0);
    }

    /**
     * @function scale(width,height)
     * @desc 設定放大倍率
     */

    scale( width, height ){
        this.scaleWidth = width;
        this.scaleHeight = height || width;
    }

    get scaleWidth(){ return this.transform.scaleWidth }
    set scaleWidth(val){
        this.transform.scaleWidth = val;
    }

    get scaleHeight(){ return this.transform.scaleHeight }
    set scaleHeight(val){
        this.transform.scaleHeight = val;
    }

    get screenScaleWidth(){ return this.parent == null ? this.scaleWidth : this.scaleWidth * this.parent.screenScaleWidth }
    get screenScaleHeight(){ return this.parent == null ? this.scaleHeight : this.scaleHeight * this.parent.screenScaleHeight }

    get rotation(){ return this.transform.rotation }
    set rotation(val){
        this.transform.rotation = val % 360;
    }

    get blendMode(){ return this.transform.blendMode };
    set blendMode(val){
        this.transform.blendMode = val;
    }

    get opacity(){ return this.transform.opacity };
    set opacity(val){
        if( val <= 0 ){ val = 0; }
        if( val >= 255 ){ val = 255; }
        this.transform.opacity = val;
    }

    get skewX(){ return this.transform.skewX }
    set skewX(val){
        this.transform.skewX = val;
    }

    get skewY(){ return this.transform.skewY }
    set skewY(val){
        this.transform.skewY = val;
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
            screenX : 0,
            screenY : 0,
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

    get screenX(){
        if( this.position.screenX == null ){
            this.position.screenX = (this.parent ? this.parent.screenX + this.parent.width * this.parent.anchorX : 0) + this.x - this.width * this.anchorX;
        }
        return this.position.screenX;
    }

    get screenY(){ 
        if( this.position.screenY == null ){
            this.position.screenY = (this.parent ? this.parent.screenY + this.parent.height * this.parent.anchorY : 0) + this.y - this.height * this.anchorY;
        }
        return this.position.screenY
    }

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
            realSize : null,
            childrenDead : false,
        }
    }

    get canRender(){ return !this.status.cache }
    get canShow(){ return !this.status.hidden }

    /**
     * @function cache()
     * @desc 快取目前渲染的bitmap
     */

    cache(){
        this.status.cache = true;
        this.bitmap.cache = true;
    }

    /**
     * @function unCache()
     * @desc 手動解除快取狀態
     */

    unCache(){
        this.status.cache = false;
        this.bitmap.cache = false;
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
     * @function getRealSize()
     * @desc 獲取該精靈實際呈現的大小
     */

    getRealSize(){
        if( this.status.realSize == null ){
            let width = this.width + this.skewY * this.height;
            let height = this.height + this.skewX * this.width;
            let s = Math.abs( this.helper.sinByRad(this.rotation) );
            let c = Math.abs( this.helper.cosByRad(this.rotation) );
            this.status.realSize = {
                width : ( width * c + height * s ) * this.screenScaleWidth,
                height : ( height * c + width * s ) * this.screenScaleHeight,
            }
        }
        return this.status.realSize;
    }

    /**
     * @function getRealPosition()
     * @desc 獲取精靈在畫布的準確位置
     */

    getRealPosition(){
        return {
            x : this.screenX * ( this.parent == null ? 1 : this.parent.screenScaleWidth ),
            y : this.screenY * ( this.parent == null ? 1 : this.parent.screenScaleHeight ),
        }
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
     * @private
     * @desc 每次執行update時呼叫此函式，處理Z值更動的排序與移除子精靈
     */

    mainUpdate(){
        if( this.main == null ){ this.install(this.parent.main); }
        this.position.screenX = null;
        this.position.screenY = null;
        this.status.realSize = null;
        if( this.status.sort ){
            this.status.sort = false;
            this.sortChildren();
        }
        this.update();
        this.eachChildren(this.bindUpdateForChild);
        if( this.status.childrenDead ){
            this.status.childrenDead = false;
            this.children = this.children.filter((child)=>{
                if( child.status.remove ){ 
                    child.close();
                }
                return !child.status.remove;
            });
        }
    }

    /**
     * @function updateForChild(child)
     * @private
     * @desc 呼叫子精靈更新
     */

    updateForChild(child){
        if( child.status.remove == false ){
            child.mainUpdate();
        }else{
            this.status.childrenDead = true;
        }
    }

    //=============================
    //
    // remove
    //

    /**
     * @function close()
     * @private
     * @desc 移除自身的綁定資訊(容易出錯，請使用remove讓精靈在迭代過程中被移除)
     */

    close(){
        this.id = -1; 
        this.parent = null; 
    }

    /**
     * @function remove()
     * @desc 移除自己於父精靈下
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

    initRender(){
        this.filter == null;
    }

    /**
     * @function render()
     * @desc 渲染bitmap的方法
     */
    
    render(){ /* module set */ }

    /**
     * @function mainRender()
     * @private
     * @desc 主要渲染程序，包含渲染與濾鏡
     */

    mainRender(){
        this.eachChildren(this.renderForChild)
        if( this.canRender ){ 
            this.context.save();
            this.render();
            this.context.restore();
            this.renderFilter(this.filter);
            this.context.restore();
            this.bitmap.clearCache();
        }
    }

    /**
     * @function renderForChild(child)
     * @private
     * @desc 呼叫子精靈渲染
     */

    renderForChild(child){
        child.mainRender();
    }

    /**
     * @function fromImage(img)
     * @desc 將精靈設置成img檔案的解析度，並將render宣告成渲染該圖片並快取
     */

    fromImage(img){
        this.resize(img);
        this.render = function(){
            this.context.drawImage( img, 0, 0 );
            this.cache();
        }
        return this;
    }

    /**
     * @function renderFilter(filter)
     * @private
     * @desc 操作堆疊渲染的函式
     */

    renderFilter(filter){
        if( filter ){
            let imgData = this.bitmap.getImageData();
            filter.call(this, imgData);
            this.bitmap.putImageData(imgData);
            this.eachChildren((child) => {child.renderFilter(filter);});
        }
    }

    /**
     * @function eachImgData(imgData,callback)
     * @desc 迭代像素
     * @callback (pixel:object,render:function)
     */

    eachImgData(imgData, callback) {
        let data = imgData.data
        let index = 0
        let render = function(r = 0, g = 0, b = 0, a = 255) {
            data[index] = r.red || r
            data[index + 1] = r.green || g
            data[index + 2] = r.blue  || b
            data[index + 3] = r.alpha || a
        }
        for (let i = 0; i < data.length; i += 4) {
            index = i
            let pixel = {
                red: data[i],
                green: data[i + 1],
                blue : data[i + 2],
                alpha: data[i + 3],
            }
            callback(pixel, render)
        }
    }

    //=============================
    //
    // check
    //

    /**
     * @function inRect(x,y)
     * @desc 座標是否在精靈的矩形範圍內
     */

    inRect(x,y){
        let rect = this.getRealSize();
        let position = this.getRealPosition();
        return ( x >= position.x && x <= position.x + rect.width ) 
            && ( y >= position.y && y <= position.y + rect.height );
    }

}


            let __re = LongTake;
            __re.Sprite = Sprite;
__re.Bitmap = Bitmap;
__re.Loader = Loader;
__re.Helper = Helper;
__re.Animate = Animate;
__re.Container = Container;

            return __re;
        
    })
