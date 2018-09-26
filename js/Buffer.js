
/**
 * @class LongTakeBuffer
 * @desc 精靈最終渲染元件，為唯一使用webgl的物件，不對外公開
 * 尚未使用
 */

class LongTakeBuffer extends ModuleBase {

    constructor( width = 100, height = 100 ){
        super("Buffer");
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl") || this.canvas.getContext("2d");
        this.mode = this.context instanceof CanvasRenderingContext2D ? "2d" : 'webgl';
        this.resize( width, height );
    }

    get width(){ return this.canvas.width }
    set width(val){ this.canvas.width = val; }

    get height(){ return this.canvas.height }
    set height(val){ this.canvas.height = val; }

    getContext(){
        return this.mode === "webgl" ? null : this.context;
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
     * @function render(sprite)
     * @desc 傳遞sprite進行渲染
     */

    render(sprite){
        this.save();
        this.drawTransform(sprite);
        this.draw( sprite.bitmap, sprite.screenX, sprite.screenY );
        sprite.eachChildren( (child)=>{ this.render(child); } );
        this.restore();
    }

    /**
     * @function clear()
     * @desc 清空畫布
     */

    clear(){
        if( this.mode === "2d" ){
            this.context.clearRect( 0, 0, this.width, this.height );        
        }else{
            this.context.clearColor(0, 0, 0, 0);
            this.context.clear(this.context.COLOR_BUFFER_BIT);
        }
    }

    drawTransform(){

    }

    /**
     * @function draw(bitmap,x,y)
     * @desc 繪製一個bitmap在畫布上
     */

    draw( bitmap, x, y ){
        this.context.drawImage( bitmap.canvas, x, y );
    }

    save(){

    }

    restore(){

    }

} 