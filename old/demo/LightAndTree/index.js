
let app = new LongTake( 'app', 1920, 1280 );
let loader = new LongTake.Loader();

loader.add( 'leaf1', './img/leaf1.png' );
loader.add( 'leaf2', './img/leaf2.png' );
loader.add( 'main', './img/main.jpg' );
loader.add( 'cap', './img/cap.png' )
loader.add( 'ray', './img/lightray.png' );
loader.add( 'shadow', './img/shadow.png' )
loader.add( 'branch1', './img/branch1.png' );
loader.add( 'branch2', './img/branch2.png' );
loader.start();

let main = new LongTake.Sprite("main");
let branch1 = new LongTake.Sprite("branch1");
    branch1.z = 7;
let branch2 = new LongTake.Sprite("branch2");
    branch2.z = 5;
let cap = new LongTake.Sprite("cap");
    cap.z = 9;
let shadow = new LongTake.Sprite("shadow");
    shadow.z = 10;

//================================
//
// camera
//

app.setCamera( app.width / 2, app.height / 2 );
app.forElementResize( app.target.parentElement, 1 );
app.onWindowResize = function(){
    app.forElementResize( app.target.parentElement, 1 );
};

//================================
//
// Leaf
//

class Leaf extends LongTake.Sprite{

    constructor(){
        super("Leaf");
    }

    create(){
        let flow = this.helper.randInt( 0, 500 ) * ( this.helper.randInt( 1, 2 ) === 1 ? -1 : 1 );
        let flow2 = this.helper.randInt( 0, 1000 );
        this.z = this.helper.randInt( 1, 8 );
        this.trun = 0;
        this.trunSpeed = Math.random() * 0.01 + 0.01;
        this.size = Math.random() * (this.z / 50) + 0.3;
        this.scale(this.size);
        this.path = new Ppath2D();
        this.path.moveTo( this.helper.randInt( -300, 600), -200 );
        this.path.smoothCurve( flow, flow2, this.main.width - this.helper.randInt( -600, 300 ) , this.main.height + 200 );
        this.fromImage(loader.get('leaf' + this.helper.randInt( 1, 2)));
        this.animate = new LongTake.Animate({
            duration : this.helper.randInt( 10000, 15000 ),
            action : (t)=>{
                let p = this.path.getLinePosition(t);
                let v = this.path.getDirection(t);
                this.x = p.x;
                this.y = p.y;
                this.rotation = v;
            }
        })
    }

    update(){
        this.animate.move();
        this.trun += this.trunSpeed;
        this.scaleHeight = Math.sin(this.trun) * this.size;
        if( this.animate.over ){
            app.addChildren( new Leaf() );
            this.remove();
        }
    }
}

//================================
//
// Ray
//

class Ray extends LongTake.Sprite{

    constructor(x){
        super("Ray");
        this.x = x;
    }

    create(){
        this.dir = this.helper.randInt( 10, 70 ) * (this.helper.randInt( 1, 2 ) === 1 ? 1 : -1);
        this.oriX = this.x;
        this.z = 3;
        this.scale(this.helper.randInt( 3, 5 ) / 2);
        this.blendMode = "lighten";
        this.fromImage(loader.get('ray'));
        this.animate = new LongTake.Animate({
            easing : "easeInOutQuint",
            duration : this.helper.randInt( 3000, 6000 ),
            alternate : true,
            action : (t)=>{
                this.x = this.oriX + t * this.dir;
                this.opacity = 150 - 100 * t;
            }
        })
    }

    update(){
        this.animate.move();
    }

}

//================================
//
// Main
//

loader.onload(()=>{
    app.addChildren( main.fromImage(loader.get('main')) );
    app.addChildren( shadow.fromImage(loader.get('shadow')) );
    app.addChildren( branch1.fromImage(loader.get('branch1')) );
    app.addChildren( branch2.fromImage(loader.get('branch2')) );
    app.addChildren( cap.fromImage(loader.get('cap')) );
    app.addChildren( new Ray(200) );
    app.addChildren( new Ray(500) );
    app.addChildren( new Ray(700) );
    for( let i = 0; i < 20 ; i++ ){
        app.addChildren( new Leaf() );
    }
});

