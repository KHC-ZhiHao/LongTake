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

    resize(width, height) {
        this.width = width != null ? width : this.width;
        this.height = height != null ? height : this.height;
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
