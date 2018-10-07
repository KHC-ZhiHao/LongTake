let bunnys = 0;
let ballElement = document.getElementById("many");
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
        this.rotation = ( Math.random() - 0.5 ) * 15;
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

class BunnyContainer extends LongTake.Container {

    constructor( bunnyImage, px, py ){
        super(800,600);
        this.px = px;
        this.py = py;
        this.bunnyImage = bunnyImage;
        this.init();
    }

    init(){
        for( let i = 0 ; i < 2000 ; i++ ){
            this.addChildren( new LTJump( this.bunnyImage, this.px, this.py ) );
        }
    }

}

class Scene extends LongTake.Sprite {

    constructor(bunnyImage){
        super("Scene");
        bunnys += 2000;
        
        this.bunnyImage = bunnyImage;
        this.bindDrawer = this.renderByBitmap.bind(this);
        this.resize(800,600);
    }
    
    create(){
        this.container = getBunnyContainer( this.bunnyImage, this.main.pointerX, this.main.pointerY );
    }

    update(){
        this.container.post(null);
    }

    render(){
        this.container.getImageBitmap(this.bindDrawer);
    }

    renderByBitmap(imagebitmap){
        this.bitmap.clear();
        this.context.drawImage( imagebitmap, 0, 0 );
    }

}

function getBunnyContainer( bunnyImage, px, py ){

    if( OffscreenCanvas ){
        let workerString = ` 
            var container = null;
            var global = self;
            onmessage = (message)=>{
                if( container == null ){
                    self.importScripts( message.data.url + '/LongTake/dist/index.js' );
                    ${LTJump.toString()}
                    ${BunnyContainer.toString()}
                    container = new BunnyContainer( message.data.img, ${px}, ${py} );
                }else if( message.data === true ){
                    container.getImageBitmap((bitmap)=>{
                        postMessage(bitmap);
                    });
                }else{
                    container.post();
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
            post : function(){
                worker.postMessage(null);
            },
            getImageBitmap : function(callback){
                worker.postMessage(true);
                worker.onmessage = function(e){
                    callback(e.data);
                };
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

