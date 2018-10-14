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

    /**
     * @function getVisibility(view)
     * @desc 檢測目前螢幕裝置大小
     * @param {string} view xs, sm, md, le, xl
     */

    getVisibility(view){
        let width = document.body.clientWidth;
        if( width < 600 ){ return view === "xs"; }
        if( width >= 600 && width < 960 ){ return ['sm','xs'].indexOf(view) !== -1 }
        if( width >= 960 && width < 1264 ){ return ['sm','xs','md'].indexOf(view) !== -1 }
        if( width >= 1264 && width < 1904 ){ return ['sm','xs','md','lg'].indexOf(view) !== -1 }
        if( width >= 1904 ){ return ['sm','xs','md','lg','xl'].indexOf(view) !== -1 }
        return false;
    }

}

let Helper = new HelperModule;