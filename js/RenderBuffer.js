class RenderBuffer extends ModuleBase {

    constructor(main){
        super("RenderBuffer");
        this.main = main;
        this.stage = main.stage;
        this.bitmap = new Bitmap( main.width, main.height );
        this.context = this.bitmap.context;
        this.camera = main.camera || {};
        this.resize( main.width, main.height );
    }

    resize( width, height ){
        this.bitmap.resize( width, height );
    }

    draw(){
        this.bitmap.clear();
        this.render(this.stage);
    }

    render(sprite){
        if( sprite.canShow ){
            let offsetX = sprite.screenX + ( this.camera.offsetX || 0 );
            let offsetY = sprite.screenY + ( this.camera.offsetY || 0 );
            this.transform(sprite);
            this.context.drawImage( sprite.bitmap.getRenderTarget(), Math.floor(offsetX), Math.floor(offsetY) ); 
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
        if( sprite.scaleHeight !== 1 || sprite.scaleWidth !== 1 ){
            context.save();
        }
        context.translate( posX, posY );
        if( sprite.opacity !== 255 ){
            context.globalAlpha = sprite.opacity / 255;
        }
        if( sprite.blendMode ){
            context.globalCompositeOperation = sprite.blendMode;
        }
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
        let posX = sprite.posX;
        let posY = sprite.posY;
        let context = this.context;
        if( sprite.scaleHeight !== 1 || sprite.scaleWidth !== 1 ){
            context.restore();
            return;
        }
        context.translate( posX, posY );
        if( sprite.opacity !== 255 ){
            context.globalAlpha = sprite.parent ? sprite.parent.opacity / 255 : 1;
        }
        if( sprite.blendMode ){
            context.globalCompositeOperation = sprite.blendMode;
        }
        if( sprite.rotation !== 0 ){
            context.rotate( -(sprite.rotation * sprite.helper.arc) );
        }
        if( sprite.skewX !== 0 || sprite.skewY !== 0 ){
            context.transform( 1, -sprite.skewX, -sprite.skewY, 1, 0, 0 );
        }
        context.translate( -posX, -posY );
    }

}
