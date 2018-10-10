class HelperModule {

    constructor(){
        this.arc = Math.PI / 180;
        this.trigonometric = {};
        for( let i = -360 ; i < 360 ; i++ ){
            this.trigonometric[i] = {};
            this.trigonometric[i].sin = Math.sin(i * this.arc);
            this.trigonometric[i].cos = Math.cos(i * this.arc);
        }
    }
    
    sinByDeg(deg){
        return this.trigonometric[Math.round(deg)].sin;
    }
    
    cosByDeg(deg){
        return this.trigonometric[Math.round(deg)].cos;
    }

    getVector( deg, distance ){
    	return { 
            x : distance * this.cosByDeg(deg),
            y : distance * this.sinByDeg(deg)
        };
    }

    randInt( min, max ){
        return Math.floor( Math.random() * ( max-min + 1 ) + min );
    }

}

let Helper = new HelperModule;