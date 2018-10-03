class RenderBuffer extends ModuleBase {

    constructor(main){
        super("RenderBuffer");
        this.main = main;
        this.stage = main.stage;
        this.bitmap = new Bitmap( main.width, main.height );
        this.context = this.bitmap.context;
        this.camera = main.camera;
        this.resize( main.width, main.height );
    }

    resize( width, height ){
        this.bitmap.resize( width, height );
    }

    draw(){
        this.context.clearRect( 0, 0, this.main.width, this.main.height );
        this.render(this.stage);
    }

    render(sprite){
        if( sprite.canShow ){
            this.transform(sprite);
            this.context.drawImage( sprite.bitmap.getRenderTarget(), Math.floor(sprite.screenX + this.camera.offsetX), Math.floor(sprite.screenY + this.camera.offsetY) ); 
            let len = sprite.children.length;
            for( let i = 0 ; i < len ; i++ ){
                this.render(sprite.children[i]);
            }
            this.restore(sprite);
        }
    }

    transform(sprite){
        let posX = sprite.posX;
        let posY = sprite.posY;
        let context = this.context;
            context.translate( posX, posY );
        if( sprite.opacity !== 255 ){
            context.globalAlpha = sprite.opacity / 255;
        }
        if( sprite.blendMode ){
            context.globalCompositeOperation = sprite.blendMode;
        }
        if( sprite.rotation !== 0 ){
            context.rotate( sprite.rotation * sprite.helper.arc );
        }
        if( sprite.scaleHeight !== 1 || sprite.scaleWidth !== 1 ){
            context.scale( sprite.scaleWidth, sprite.scaleHeight );
        }
        if( sprite.skewX !== 0 || sprite.skewY !== 0 ){
            context.transform( 1, sprite.skewX, sprite.skewY, 1, 0, 0 );
        }
        context.translate( -(posX), -(posY) );
    }

    restore(sprite){
        let posX = sprite.posX;
        let posY = sprite.posY;
        let context = this.context;
            context.translate( posX, posY );
        if( sprite.opacity !== 255 ){
            context.globalAlpha = sprite.opacity / 255;
        }
        if( sprite.blendMode ){
            context.globalCompositeOperation = sprite.blendMode;
        }
        if( sprite.rotation !== 0 ){
            context.rotate( -(sprite.rotation * sprite.helper.arc) );
        }
        if( sprite.scaleHeight !== 1 || sprite.scaleWidth !== 1 ){
            context.scale(  1 / sprite.scaleWidth, 1 / sprite.scaleHeight );
        }
        if( sprite.skewX !== 0 || sprite.skewY !== 0 ){
            context.transform( 1, -sprite.skewX, -sprite.skewY, 1, 0, 0 );
        }
        context.translate( -posX, -posY );
    }

}
