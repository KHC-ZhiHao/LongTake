
let app = new LongTake( 'app', 1920, 1080 );
    app.setCamera( app.width / 2, app.height );
    app.forElementResize( app.target.parentElement, 1 );
    app.onWindowResize = function(){
        app.forElementResize( app.target.parentElement, 1 );
    };

let loader = new LongTake.Loader();
    loader.add( 'vr1', './img/vr1.png' );
    loader.add( 'vr2', './img/vr2.png' );
    loader.add( 'vr3', './img/vr3.png' );
    loader.add( 'vr4', './img/vr4.png' );
    loader.add( 'vr5', './img/vr5.png' );
    loader.add( 'vl1', './img/vl1.png' );
    loader.add( 'vl2', './img/vl2.png' );
    loader.add( 'vl3', './img/vl3.png' );
    loader.add( 'vl4', './img/vl4.png' );
    loader.add( 'vl5', './img/vl5.png' );
    loader.add( 'rock', './img/rock.png' );
    loader.add( 'wave', './img/wave.png' );
    loader.add( 'scene', './img/scene.png' );
    loader.add( 'light', './img/light.png' );
    loader.add( 'butterfly', './img/butterfly.png' );
    loader.start();

let scene = new LongTake.Sprite();
    scene.create = function(){
        this.fromImage(loader.get('scene'));
        this.y = this.main.height - this.height;
    }

let light = new LongTake.Sprite();
    light.create = function(){
        this.opacity = 10;
        this.fromImage(loader.get('light'));
    }

let rock = new LongTake.Sprite();
    rock.create = function(){
        this.fromImage(loader.get('rock'));
        this.x = 1015;
        this.y = this.main.height - this.height;
    }

let butterfly = new LongTake.Sprite();
    butterfly.create = function(){
        this.fromImage(loader.get('butterfly'));
        this.x = 1010;
        this.y = 486;
        this.animate = new LongTake.Animate({
            duration : 3000,
            alternate : true,
            action : (t)=>{
                this.y = 486 + -5 * t ;
            },
        });
        this.light = new LongTake.Sprite();
        this.light.create = function(){
            this.setAnchor(0.5);
            this.width = this.parent.width * 2;
            this.height = this.width;
            this.x = this.parent.width / 2;
            this.y = this.parent.width / 2;
            this.animate = new LongTake.Animate({
                duration : 3000,
                alternate : true,
                action : (t)=>{
                    this.opacity = 50 * t + 25;
                },
            }); 
        }
        this.light.update = function(){
            this.animate.move();
        }
        this.light.render = function(){
            let r = this.width / 2;
            let grd = this.context.createRadialGradient( r, r, r / 3, r, r, r );
                grd.addColorStop(0,"#24bfe2");
                grd.addColorStop(1,"rgba(32,191,226,0)");
            this.context.fillStyle = grd;
            this.context.arc( r, r, r, 0, 2 * Math.PI );
            this.context.fill();
            this.cache();
        }
        this.addChildren(this.light);
    }

    butterfly.update = function(){
        this.animate.move();
    }

//================================
//
// Water full
//

class WaterFull extends LongTake.Sprite {

    constructor(){
        super("WaterFull");
    }

    create(){
        this.time = 400;
        this.width = 600;
        this.height = this.main.height;
        this.opacity = 50;
        this.x = this.main.width / 2 - this.width / 2;
    }

    update(){
        if( this.time === 0 ){ return }
        if( this.time % 10 === 0 ){
            this.addChildren(new WaterFullFlow());
        }
        this.time -= 1;
    }

}

class WaterFullFlow extends LongTake.Sprite {

    constructor(){
        super("WaterFullFlow");
    }

    create(){
        this.resize(3, this.helper.randInt( 250, 300 ));
        this.x = this.helper.randInt( 0, this.parent.width );
        this.animate = new LongTake.Animate({
            duration : 1000,
            action : (t)=>{
                this.y = -this.height + ( this.main.height + this.height ) * t ;
            },
        });
    }

    update(){
        if( this.animate.over ){
            this.animate.restart();
        }else{
            this.animate.move();
        }
    }

    render(){
        this.context.fillStyle = "#FFF";
        this.context.fillRect( 0, 0, this.width, this.height );
        this.cache();
    }

}

//================================
//
// Wave
//

class WaveWrapper extends LongTake.Sprite {

    constructor(scale = 1){
        super("WaveWrapper");
        this.opacity = 200 * scale;
        this.waveScale = scale;
        this.imgWidth = loader.get('wave').width * scale / 4;
    }

    create(){
        this.y = this.main.height - 10;
        this.resize( this.main.width , 10 );
        let t = this.main.width / this.imgWidth;
        for( let i = 0 ; i < t ; i++ ){
            this.addChildren(new Wave( this.imgWidth * i, this.waveScale));
        }
    }

    render(){
        this.context.fillStyle = "#FFF";
        this.context.fillRect( 0, 0, this.width, this.height );
        this.cache();
    }

}

class Wave extends LongTake.Sprite {

    constructor( x, scale = 1){
        super("Wave");
        this.x = x;
        this.scale(scale);
    }

    create(){
        this.dir = this.helper.randInt(10,30);
        this.speed = 50000;
        this.start = this.speed * ( this.x / this.main.width );
        this.setAnchor(0.5,1);
        this.fromImage(loader.get('wave'));
        this.animate = new LongTake.Animate({
            begin : this.start,
            duration : this.speed,
            action : (t)=>{
                this.x = -this.width + ( this.main.width + this.width * 2 ) * t;
                this.y = this.dir * 2 + this.dir * Math.sin(t * 360);
            },
        });
    }

    update(){
        if( this.animate.over ){
            this.animate.restart();
        }else{
            this.animate.move();
        }
    }

}

//================================
//
// Vortex
//

class VortexWrapper extends LongTake.Sprite {

    constructor( x, y ){
        super("VortexWrapper");
        this.x = x;
        this.y = y;
    }

}

class VortexUnit extends LongTake.Sprite {

    constructor( img ){
        super("VortexUnit");
        this.img = img;
    }

    create(){
        this.flow = -1 * this.helper.randInt( 5, 10 );
        this.swing = Math.random() * 1.5;
        this.setAnchor(0.5);
        this.fromImage(this.img);
        this.x = this.width / 2;
        this.y = this.height / 2;
        this.canRotation = this.helper.getVisibility("md")
        this.animate = new LongTake.Animate({
            begin : this.helper.randInt( 0, 1000 ),
            duration : this.helper.randInt( 1500, 2000 ),
            alternate : true,
            easing : 'easeOutCubic',
            action : (t)=>{
                if( this.canRotation ){
                    this.rotation = t * this.swing;
                }
                this.y = this.height / 2 + this.flow * t;
            },
        });
    }

    update(){
        this.animate.move();
        this.img = null;
    }

}

//================================
//
// Main
//

loader.onload(()=>{

    let rightVortex = new VortexWrapper(1080,100);
        rightVortex.addChildren( new VortexUnit(loader.get('vr1')) );
        rightVortex.addChildren( new VortexUnit(loader.get('vr2')) );
        rightVortex.addChildren( new VortexUnit(loader.get('vr3')) );
        rightVortex.addChildren( new VortexUnit(loader.get('vr4')) );
        rightVortex.addChildren( new VortexUnit(loader.get('vr5')) );

    let leftVortex = new VortexWrapper(695,300);
        leftVortex.addChildren( new VortexUnit(loader.get('vl1')) );
        leftVortex.addChildren( new VortexUnit(loader.get('vl2')) );
        leftVortex.addChildren( new VortexUnit(loader.get('vl3')) );
        leftVortex.addChildren( new VortexUnit(loader.get('vl4')) );
        leftVortex.addChildren( new VortexUnit(loader.get('vl5')) );

    app.addChildren(light);
    app.addChildren(leftVortex);
    app.addChildren(new WaterFull());
    if( LongTake.Helper.getVisibility("md") ){
        app.addChildren(new WaveWrapper(0.5))
    }
    app.addChildren(rock);
    app.addChildren(new WaveWrapper(0.7))
    app.addChildren(scene);
    app.addChildren(butterfly);
    app.addChildren(new WaveWrapper(0.9))
    app.addChildren(new WaveWrapper(1))
    app.addChildren(rightVortex);

    setTimeout(()=>{
        loader.close();
    }, 2000)

});

