class Bitmap extends ModuleBase {

    constructor( width = 100, height = 100, element ){
        super("Bitmap");
        this.autoResize = false;
        this.canvas = element || document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.imgData = null;
        if( element == null ){
            this.resize( width, height );
        }
    }

    static isBitmap(object){
        return object instanceof this;
    }

    setAutoResize(bool){
        this.autoResize = !!bool;
    }

    get width(){ return this.canvas.width }
    set width(val){ 
        this.canvas.width = val;
    }

    get height(){ return this.canvas.height }
    set height(val){ 
        this.canvas.height = val;
    }

    resize(width, height){
        this.width = width || this.width;
        this.height = height || this.height;
    }

    clear(){
        this.context.clearRect( 0, 0, this.width, this.height );
    }

    draw( bitmap, x, y ){
        this.context.drawImage( bitmap.canvas, x, y );
    }

    clearImgDataCache(){
        this.imgData = null;
    }

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

    getImageData(){
        if( this.imgData == null ){
            this.imgData = this.context.getImageData(0,0,this.width,this.height);
        }
        return this.imgData;
    }

    putImageData(imgData){
        this.clear();
        this.context.putImageData(imgData,0,0);
    }

    /**
     * @function crop()
     * @desc 裁切掉透明的部分並回傳新的bitmap
     */

    crop(){
        let pix = { x : [], y : [], }
        for( let y = 0; y < this.height ; y++ ){
            for( let x = 0; x < this.width ; x++ ){
                if( this.getPixel(x,y)[3] > 0 ){
                    pix.x.push(x);
                    pix.y.push(y);
                }
            }
        }
        if( pix.x.length === 0 || pix.y.length === 0 ){ return new Bitmap( 0, 0 ); }
        pix.x.sort(function(a,b){return a-b});
        pix.y.sort(function(a,b){return a-b});
        let n = pix.x.length - 1;
        let w = pix.x[n] - pix.x[0];
        let h = pix.y[n] - pix.y[0];
        let bitmap = new Bitmap( this.width, this.height );
            bitmap.putImageData( this.context.getImageData(pix.x[0], pix.y[0], w, h) );
        return bitmap;
    }

}
