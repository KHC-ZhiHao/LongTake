
/**
 * @class Container(width,height)
 * @desc 一個LongTake的靜態變體
 */

class Container extends ModuleBase {

    constructor( width, height ){
        super("Container");
        this.width = width;
        this.height = height;
        this.stage = new Sprite("Stage");
        this.stage.install(this);
        this.stage.resize(0,0);
        this.stage.render = function(){ this.cache(); }
        this.buffer = new RenderBuffer(this);
        this.bitmap = new Bitmap( width, height );
        this.rendering = false;
    }

    /**
     * @function post(data)
     * @desc 發送一個data給Container並觸發重渲染
     */

    post(data){
        if( this.rendering === false ){
            this.rendering = true;
            this.data = data;
            this.stage.mainUpdate();
            this.stage.mainRender();
            this.rendering = false;
        }
    }

    /**
     * @function getImageBitmap(callback)
     * @desc 獲取該Container的ImageBitmap
     * @callback (ImageBitmap)
     */

    getImageBitmap(callback){
        this.buffer.draw();
        this.bitmap.clear();
        this.bitmap.context.drawImage( this.buffer.bitmap.canvas, 0, 0 );
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

}