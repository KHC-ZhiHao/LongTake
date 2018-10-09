/**
 * @class Bitmap
 * @desc 為掌管位元圖的物件
 */

class Bitmap extends ModuleBase {

    constructor( width = 100, height = 100, element, context = '2d' ){
        super("Bitmap");
        this.offscreenCanvasSupport = !!self.OffscreenCanvas;
        this.canvas = element || this.offscreenCanvasSupport ? new OffscreenCanvas(width, height) : document.createElement('canvas');
        this.context = this.canvas.getContext(context);
        this.cache = false;
        this.imgData = null;
        this.imgBitmap = null;
        if( element == null ){ this.resize( width, height ) }
    }

    static isBitmap(object){
        return object instanceof this;
    }

    get width(){ return this.canvas.width }
    set width(val){ this.canvas.width = val; }

    get height(){ return this.canvas.height }
    set height(val){ this.canvas.height = val; }

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

    cacheImageBitmap(){
        if( this.offscreenCanvasSupport ){
            this.imgBitmap = this.canvas.transferToImageBitmap();
            //this.imgBitmap.close();
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

}
