class Container extends ModuleBase {

    constructor( width, height ){
        super("Container");
        this.width = width;
        this.height = height;
        this.camera = { offsetX : 0, offsetY : 0, }
        this.initStage();
        this.buffer = new RenderBuffer(this);
        this.bitmap = new Bitmap( width, height );
        this.bitmap.cache = true;
        this.rendering = false;
    }

    post(data){
        if( this.rendering === false ){
            this.rendering = true;
            this.data = data;
            this.update();
            this.rendering = false;
        }
    }

    getImageBitmap(callback){
        callback(this.bitmap.getRenderTarget());
    }

    addChildren(sprite){
        this.stage.addChildren(sprite);
    }

    initStage(){
        this.stage = new Sprite("Stage");
        this.stage.install(this);
        this.stage.resize(0,0);
        this.stage.render = function(){
            this.cache();
        }
    }

    update(){
        this.bitmap.clearCache();
        this.stage.mainUpdate();
        this.stage.mainRender();
        this.buffer.draw();
        this.bitmap.clear();
        this.bitmap.context.drawImage( this.buffer.bitmap.canvas, 0, 0 );
    }

    getEasing(name){
        if( Easing[name] && name !== "constructor" ){
            return Easing[name];
        }else{
            this.systemError( "getEasing", "Name not found.", name );
        }
    }

}