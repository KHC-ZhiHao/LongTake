
let stats = new Stats();
    stats.showPanel( 0 );
document.body.appendChild( stats.dom );

let call = LongTake.prototype.update;

LongTake.prototype.update = function(){
    stats.begin();
    call.call(this);
    stats.end();
}

class LTJump extends LongTake.Sprite {

    constructor( img, x = 0, y = 0 ){
        super("Point");
        this.x = x;
        this.y = y;
        this.img = img;
        this.speedX = Math.random() * 10;
        this.speedY = Math.random() * 10 - 5;
        this.resize(this.img);
    }
    
    create(){
        this.maxX = this.main.width;
        this.maxY = this.main.height;
        this.setAnchor(0,1);
    }
    
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.5 //gravity
        
        if (this.x > this.maxX){
            this.speedX *= -1;
            this.x = this.maxX;
        }else if (this.x < 0){
            this.speedX *= -1;
            this.x = 0;
        }
        
        if (this.y > this.maxY){
            this.speedY *= -0.85;
            this.y = this.maxY;
            if( Math.random() > 0.5 ){
                this.speedY -= Math.random() * 6;
            }
        }else if ( this.y < 0 ){
            this.speedY = 1;
            this.y = 0;
        }
    }
    
    render(){
        this.context.drawImage( this.img, 0, 0 );
        this.cache();
    }
 
}

class Scene extends LongTake.Sprite {

    constructor(bunnyImage){
        super("Scene");
        this.bunnyImage = bunnyImage;
        this.img = null;
    }
    
    create(){
        this.container = getBunnyContainer( this.bunnyImage, this.main.pointerX, this.main.pointerY );
    }

    update(){
        this.container.post( null, ( bitmap )=>{
            if( this.img ){
                this.img = bitmap;
            }else{
                this.img = bitmap;
                this.resize(this.img);
            }
        })
    }

    render(){
        if( this.img ){
            this.bitmap.clear();
            this.context.drawImage( this.img, 0, 0 );
        }
    }

}

class BunnyContainer extends LongTake.Container {

    constructor( bunnyImage, px, py ){
        super(800,600);
        this.px = px;
        this.py = py;
        this.bunnyImage = bunnyImage;
        this.init();
    }

    init(){
        for( let i = 0 ; i < 3000 ; i++ ){
            this.addChildren( new LTJump( this.bunnyImage, this.px, this.py ) );
        }
    }

}

function getBunnyContainer( bunnyImage, px, py ){

    if( OffscreenCanvas ){
        let workerString = ` 
            var container = null;
            var global = self;
            onmessage = (message)=>{
                if( container == null ){
                    self.importScripts( message.data.url + '/dist/index.js' );
                    ${LTJump.toString()}
                    ${BunnyContainer.toString()}
                    container = new BunnyContainer( message.data.img, ${px}, ${py} );
                }else{
                    container.post( null, (bitmap)=>{
                        postMessage(bitmap);
                    })
                }
            }
        `
        let blob = new Blob([workerString], {type: 'application/javascript'});
        let worker = new Worker(URL.createObjectURL(blob));
        worker.postMessage({
            img : bunnyImage,
            url : document.location.protocol + '//' + document.location.host,
        });
        return {
            post : function( data, callback ){
                worker.onmessage = function(message){
                    callback(message.data);
                }
                worker.postMessage(null);
            }
        }
    }else{
        return new BunnyContainer( bunnyImage, px, py );
    }

}

var app = new LongTake( document.getElementById("app"), 800, 600 );
var scene = new LongTake.Sprite();
var loader = new LongTake.Loader();
    loader.add('bunny', '../../img/bunny.png');
    loader.start();

loader.onload(()=>{
    app.stage.on('c', 'click', ()=>{
        app.addChildren(new Scene(loader.get('bunny')));
    });
});

