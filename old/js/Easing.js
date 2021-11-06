/**
 * @class Easing
 * @static
 * @desc 取得緩動函數的靜態物件
 * @see {支援表} https://easings.net/zh-tw
 */

class Easing {

    /**
     * @function get(name)
     * @desc 獲取相對應的緩動函數
     */

    static get(name){
        if( Easing[name] && name !== "constructor" && name !== "get" ){
            return Easing[name];
        }else{
            return Easing.linear;
        }
    }

    static linear( time, over ){
        return time / over;
    }

    static easeInQuad( time, over ){
        return 1 * ( time /= over ) * time;
    }

    static easeOutQuad( time, over ) {
        return -1 * ( time /= over ) * ( time - 2 );
    }

    static easeInOutQuad( time, over ){
        if ( ( time /= over / 2 ) < 1 ) return 1 / 2 * time * time;
        return -1 / 2 * ( ( --time ) * ( time - 2 ) - 1 );
    }

    static easeInCubic( time, over ){
        return 1 * ( time /= over ) * time * time;
    }

    static easeOutCubic( time, over ){
        return 1 * ( ( time = time / over - 1 ) * time * time + 1 );
    }

    static easeInOutCubic( time, over ){
        if ( ( time /= over / 2 ) < 1 ) return 1 / 2 * time * time * time;
        return 1 / 2 * ( ( time -= 2 ) * time * time + 2);
    }

    static easeInQuart( time, over ){
        return 1 * ( time /= over ) * time * time * time;
    }

    static easeOutQuart( time, over ){
        return -1 * ( ( time = time / over -1 ) * time * time * time - 1 );
    }

    static easeInOutQuart( time, over ){
        if ( ( time /= over / 2 ) < 1 ) return 1 / 2 * time * time * time * time;
        return -1 / 2 * ( ( time -= 2 ) * time * time * time - 2 );
    }

    static easeInQuint( time, over ){
        return 1 * ( time /= over ) * time * time * time * time;
    }

    static easeOutQuint( time, over ){
        return 1 * ( ( time = time / over - 1 ) * time * time * time * time + 1 );
    }

    static easeInOutQuint( time, over ){
        if ( ( time /= over / 2 ) < 1) return 1 / 2 * time * time * time * time * time;
        return 1/2 * ( ( time -= 2 ) * time * time * time * time + 2 );
    }

    static easeInSine( time, over ){
        return -1 *  Math.cos( time / over * ( Math.PI / 2 ) ) + 1;
    }

    static easeOutSine( time, over ){
        return 1 * Math.sin( time / over * ( Math.PI / 2 ) );
    }

    static easeInOutSine( time, over ){
        return -1 / 2 * ( Math.cos ( Math.PI * time / over ) - 1 );
    }

    static easeInExpo( time, over ){
        return ( time == 0 ) ? 0 : 1 * Math.pow( 2, 10 * ( time / over - 1 ) );
    }

    static easeOutExpo( time, over ){
        return ( time == over ) ? 1 : 1 * ( -Math.pow ( 2, -10 * time / over) + 1);
    }

    static easeInOutExpo( time, over ){
        if ( time == 0 ) return 0;
        if ( time == over ) return 1;
        if ( ( time /= over / 2 ) < 1 ) return 1/2 * Math.pow( 2, 10 * ( time - 1 ) );
        return 1 / 2 * ( - Math.pow( 2, -10 * --time) + 2 );
    }

    static easeInCirc( time, over ){
        return -1 * ( Math.sqrt( 1 - ( time /= over ) * time) - 1 );
    }

    static easeOutCirc( time, over ){
        return 1 * Math.sqrt( 1 - ( time = time / over - 1 ) * time );
    }

    static easeInOutCirc( time, over ){
        if ( ( time /= over / 2 ) < 1 ) return -1 / 2 * ( Math.sqrt( 1 - time * time ) - 1 );
        return 1 / 2 * ( Math.sqrt( 1 - ( time -= 2 ) * time ) + 1 );
    }

    static easeInElastic( time, over ){
        var s = 1.70158 ;
        var p = 0;
        var a = 1;
        if ( time == 0 ) return 0;  
        if ( ( time /= over ) == 1 ) return 1;
        if ( !p ) p = over * .3 ;
        if ( a < 1 ) { a = 1; var s = p / 4 ; }
        else var s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
        return -( a * Math.pow( 2, 10 * ( time -= 1 ) ) * Math.sin( ( time * over - s ) * ( 2 * Math.PI ) / p ));
    }

    static easeOutElastic( time, over ){
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if ( time == 0 ) return 0;  if ( ( time /= over ) == 1 ) return 1;  if (!p) p = over*.3;
        if ( a < 1 ) { a = 1; var s = p / 4; }
        else var s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
        return a * Math.pow( 2, -10 * time ) * Math.sin( ( time * over - s ) * ( 2 * Math.PI ) / p ) + 1;
    }

    static easeInOutElastic( time, over ){
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if( time == 0 ) return 0;  
        if( ( time /= over / 2 ) == 2 ) return 1;  
        if( !p ) p = over * ( 0.3 * 1.5 );
        if ( a < 1 ) { a = 1; var s = p / 4; }        
        if (time < 1){
            return - 0.5 * ( a * Math.pow( 2, 10 * ( time -=1 ) ) * Math.sin( ( time * over - s ) * ( 2 * Math.PI ) / p ));
        }
        return a * Math.pow( 2, -10 * ( time -= 1 ) ) * Math.sin( ( time * over - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;
    }

    static easeInBack( time, over ){
        var s = 1.70158;
        return 1 * ( time /= over ) * time * ( ( s + 1 ) * time - s);
    }

    static easeOutBack( time, over ){
        var s = 1.70158;
        return 1 * ( ( time = time / over - 1 ) * time * ( ( s + 1 ) * time + s) + 1 );
    }

    static easeInOutBack( time, over ){
        var s = 1.70158; 
        if ( ( time /= over / 2 ) < 1 ) return 1 / 2 * ( time * time * ( ( ( s *= ( 1.525 ) ) + 1 ) * time - s));
        return 1 / 2 * ( ( time -= 2 ) * time * ((( s *= ( 1.525 ) ) + 1 ) * time + s) + 2);
    }

    static easeInBounce( time, over ){
        return 1 - this.easeOutBounce( over - time, over);
    }

    static easeOutBounce( time, over ){
        if ( ( time /= over ) < ( 1 / 2.75 )) {
            return 1 * ( 7.5625 * time * time );
        } else if ( time < ( 2 / 2.75 ) ) {
            return 1 * ( 7.5625 * ( time -= ( 1.5 / 2.75 ) ) * time + 0.75 );
        } else if ( time < ( 2.5 / 2.75 ) ) {
            return 1 * ( 7.5625 * ( time -= ( 2.25 / 2.75) ) * time + 0.9375 );
        } else {
            return 1 * ( 7.5625 * ( time -= ( 2.625 / 2.75 ) ) * time + 0.984375);
        }
    }

    static easeInOutBounce( time, over ){
        if ( time < over / 2 ) return this.easeInBounce ( time * 2,  over ) * 0.5;
        return this.easeOutBounce( time * 2 - over, over ) * 0.5 + 1 * 0.5;
    }

}