
let app = new LongTake( 'app', 1920, 1280 );
    app.setCamera( app.width / 2, app.height / 2 );
    app.forElementResize( app.target.parentElement, 1 );
    app.onWindowResize = function(){
        app.forElementResize( app.target.parentElement, 1 );
    };

let loader = new LongTake.Loader();
    loader.add( 'space', './img/space.png' );
    loader.add( 'farm', './img/farm.png' );
    loader.add( 'fan', './img/fan.png' );
    loader.start();

//================================
//
// Main
//

loader.onload(()=>{

    let space = new LongTake.Sprite("Space");
        space.fromImage(loader.get('space'));
        space.create = function(){
            this.x = this.width / 2;
            this.y = this.height;
            this.scale(3);
            this.setAnchor(0.5);
        }
        space.update = function(){
            this.rotation -= 0.01;
        }

    let farm = new LongTake.Sprite("Farm");
        farm.fromImage(loader.get('farm'));

    let fan = new LongTake.Sprite("fan");
        fan.create = function(){
            this.fromImage(loader.get('fan'));
            this.setAnchor(0.5);
            this.x = 695 + this.width / 2;
            this.y = 428 + this.height / 2;
        }
        fan.update = function(){
            this.rotation += 1;
        }
    
    app.addChildren(space);
    app.addChildren(farm);
    app.addChildren(fan);

});

