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
        this.stage.eachChildrenDeep((child)=>{ child.close(); });
        this.stage = null;
        window.removeEventListener( 'resize', this.windowResize.bind(this) );
    }

    //=============================
    //
    // camera
    //

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
     * @function look(x,y)
     * @desc 移動攝影機至x,y
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
    
    resetPointerCoordinate(event){
        this.container.pointerX = ( event.offsetX / this.viewScale + this.camera.offsetX ) * ( this.target.width / this.targetRect.width );
        this.container.pointerY = ( event.offsetY / this.viewScale + this.camera.offsetY ) * ( this.target.height / this.targetRect.height ) ;
    }

    targetResize( width, height ){
        this.target.width = width;
        this.target.height = height;
        this.targetRect = this.target.getBoundingClientRect();
    }

    windowResize(){
        this.targetRect = this.target.getBoundingClientRect();
        this.onWindowResize();
    }

    onWindowResize(){}

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
        let offsetX = this.camera.offsetX;
        let offsetY = this.camera.offsetY;
        let tWidth = this.width;
        let tHeight = this.height;
        this.container.stageRender();
        this.context.clearRect( 0, 0, this.width, this.height );
        this.context.drawImage( this.container.bitmap.canvas, offsetX, offsetY, tWidth, tHeight, 0, 0, tWidth, tHeight );
    }

}