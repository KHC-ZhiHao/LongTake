
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
        let context = this.context;
        if( sprite.opacity !== 255 ){
            context.globalAlpha = sprite.opacity / 255;
        }
        if( sprite.blendMode ){
            context.globalCompositeOperation = sprite.blendMode;
        }
        if( sprite.isTransform() === false ){ return; }
        let posX = sprite.posX;
        let posY = sprite.posY;
        if( sprite.scaleHeight !== 1 || sprite.scaleWidth !== 1 ){
            context.save();
        }
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
        let context = this.context;
        if( sprite.opacity !== 255 ){
            context.globalAlpha = sprite.parent ? sprite.parent.opacity / 255 : 1;
        }
        if( sprite.blendMode ){
            context.globalCompositeOperation = sprite.blendMode;
        }
        if( sprite.isTransform() === false ){ return; }
        let posX = sprite.posX;
        let posY = sprite.posY;
        if( sprite.scaleHeight !== 1 || sprite.scaleWidth !== 1 ){
            context.restore();
            return;
        }
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