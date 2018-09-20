class HelperModuel {

    constructor(){
        this.arc = Math.PI / 180;
    }
    
    sinByDeg(deg){
        return Math.sin( (deg % 360) * this.arc );
    }
    
    cosByDeg(deg){
        return Math.cos( (deg % 360) * this.arc );
    }

}

let Helper = new HelperModuel;