let bears = 0;
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

class BearContainer extends LongTake.Container {

    constructor( image, px, py ){
        super(800,600);
        this.px = px;
        this.py = py;
        this.image = image;
        this.init();
    }

    init(){
        for( let i = 0 ; i < 2000 ; i++ ){
            this.addChildren( new LTJump( this.image, this.px, this.py ) );
        }
    }

}

class Scene extends LongTake.Sprite {

    constructor(image){
        super("Scene");
        bears += 2000;
        ballElement.innerText = bears;
        this.image = image;
        this.bindDrawer = this.renderByBitmap.bind(this);
        this.resize(800,600);
    }
    
    create(){
        this.container = getBearContainer( this.image, this.main.pointerX, this.main.pointerY );
    }

    update(){
        this.container.post(null);
    }

    render(){
        this.container.getImageBitmap(this.bindDrawer);
    }

    renderByBitmap(imagebitmap){
        if( imagebitmap ){
            this.bitmap.clear();
            this.context.drawImage( imagebitmap, 0, 0 );
            imagebitmap.close();
        }
    }

}

function getBearContainer( image, px, py ){

    if( window.OffscreenCanvas ){
        let workerString = ` 
            var container = null;
            var global = self;
            onmessage = (message)=>{
                if( container == null ){
                    self.importScripts( message.data.url + '/LongTake/dist/index.js' );
                    ${LTJump.toString()}
                    ${BearContainer.toString()}
                    container = new BearContainer( message.data.img, ${px}, ${py} );
                }else if( message.data === true ){
                    container.getImageBitmap((bitmap)=>{
                        postMessage(bitmap, [bitmap]);
                    });
                }else{
                    container.post();
                }
            }
        `
        let blob = new Blob([workerString], {type: 'application/javascript'});
        let url = URL.createObjectURL(blob);
        let worker = new Worker(url);
        URL.revokeObjectURL(url);
        blob = null;
        worker.postMessage({
            img : image,
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
        return new BearContainer( image, px, py );
    }

}

var app = new LongTake( document.getElementById("app"), 800, 600 );
var scene = new LongTake.Sprite();
var loader = new LongTake.Loader();
    loader.add('bear', '../../img/KaohBear.png');
    loader.start();

loader.onload(()=>{
    app.container.stage.on('c', 'click', ()=>{
        app.addChildren(new Scene(loader.get('bear')));
    });
});
