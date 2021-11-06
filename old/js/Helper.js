/**
 * @class HelperModule
 * @desc 具擴展性的多元物件
 */

class HelperModule {

    constructor(){
        this.arc = Math.PI / 180;
        this.rarc = 180 / Math.PI;
        this.trigonometric = {};
        for( let i = -360 ; i < 360 ; i++ ){
            this.trigonometric[i] = {};
            this.trigonometric[i].sin = Math.sin(i * this.arc);
            this.trigonometric[i].cos = Math.cos(i * this.arc);
        }
    }
    
    /**
     * @function sinByRad(deg)
     * @desc 獲取角度轉換弧度後的sin值
     * @returns {number}
     */
    
    sinByRad(deg){
        if( this.trigonometric[Math.round(deg)] ){
            return this.trigonometric[Math.round(deg)].sin
        }else{
            return Math.sin(deg * this.arc);
        }
    }

    /**
     * @function cosByRad(deg)
     * @desc 獲取角度轉換弧度後的cos值
     * @returns {number}
     */
    
    cosByRad(deg){
        if( this.trigonometric[Math.round(deg)] ){
            return this.trigonometric[Math.round(deg)].cos
        }else{
            return Math.cos(deg * this.arc);
        }
    }

    /**
     * @function getVector(deg,distance)
     * @desc 獲取向量
     * @returns {x,y}
     */

    getVector( deg, distance ){
    	return { 
            x : distance * this.cosByRad(deg),
            y : distance * this.sinByRad(deg)
        };
    }

    /**
     * @function randInt(min,max)
     * @desc 求整數範圍內的隨機值
     * @returns {number}
     */

    randInt( min, max ){
        return Math.floor( Math.random() * ( max-min + 1 ) + min );
    }

    /**
     * @function getAngle(x,y,ax,ay)
     * @desc 求兩點角度
     * @returns {number}
     */

    getAngle( x, y, ax, ay ){
        if( x == ax && y == ay ){ return 0; }
        var angle = Math.atan2(( ay - y ), ( ax - x )) * this.rarc;
        return angle > 0 ? angle : 360 + angle;
    }

    /**
     * @function getVisibility(view)
     * @desc 檢測目前螢幕裝置大小
     * @param {string} view xs, sm, md, le, xl
     * @returns {boolean}
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