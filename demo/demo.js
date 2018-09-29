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
    
var loader = new LongTake.Loader();
    loader.add( "bunny", "../img/bunny.png" )
    loader.start();

loader.onload(()=>{
    
    var app = new LongTake( document.getElementById("app"), 800, 600 );

    app.addEvent( "pointerdown", ()=>{
        for( let i = 0 ; i < 1000 ; i++ ){
            addBunny( app.pointerX, app.pointerY );
        }
    });

    function addBunny( x, y ){
        let bunny = new LTJump( loader.get("bunny"), x, y );
        bunny.transform = false;
        app.stage.addChildren(bunny);
        bunnys += 1;
        ballElement.innerText = bunnys;
    }
    
});