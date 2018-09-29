/**
 * @class Bitmap
 * @desc 為掌管位元圖的物件
 */

class Bitmap extends ModuleBase {

    constructor( width = 100, height = 100, element ){
        super("Bitmap");
        this.canvas = element || document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.transform = true;
        this.cache = false;
        this.imgData = null;
<<<<<<< HEAD
        this.imgBitmap = null;
=======
        this.image = null;
        this.bindRender = this.render.bind(this);
>>>>>>> 8c09db8b235c315e6359216644507634a5e31bce
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
        if( this.imgBitmap ){
            return this.imgBitmap;
        }else if( this.cache == false ){
            return this.canvas;
        }else {
            this.cacheImgBitmap();
            return this.canvas;
        }
    }

<<<<<<< HEAD
=======
    render(sprite){
        if( this.transform ){
            this.context.save();
            this.drawTransform(sprite);
        }
        this.draw( sprite.bitmap, sprite.screenX, sprite.screenY );
        sprite.eachChildren(this.bindRender);
        if( this.transform ){
            this.context.restore();
        }
    }

    drawTransform(sprite){
        //中心
        let posX = sprite.posX;
        let posY = sprite.posY;
        let context = this.context;
        context.translate( posX, posY );
        //遮罩
        if( sprite.mask ){
            sprite.mask();
            sprite.context.clip();
        }
        if( sprite.opacity !== 255 ){
            context.globalAlpha = sprite.opacity / 255;
        }
        //合成
        if( sprite.blendMode ){
            context.globalCompositeOperation = sprite.blendMode;
        }
        if( sprite.rotation !== 0 ){
            context.rotate( sprite.rotation * sprite.main.math.arc );
        }
        if( sprite.scaleHeight !== 1 || sprite.scaleWidth !== 1 ){
            context.scale( sprite.scaleWidth, sprite.scaleHeight );
        }
        if( sprite.skewX !== 0 || sprite.skewY !== 0 ){
            context.transform( 1, sprite.skewX, sprite.skewY, 1, 0, 0 );
        }
        //回歸原點
        context.translate( -(posX), -(posY) );
    }

>>>>>>> 8c09db8b235c315e6359216644507634a5e31bce
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
        this.context.drawImage( bitmap.getRenderTarget(), Math.floor(x), Math.floor(y) );
    }

    cacheImgBitmap(){
        let img = new Image();
            img.onload = ()=>{ this.imgBitmap = img }
            img.src = this.canvas.toDataURL();
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
