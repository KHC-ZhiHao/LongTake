
/**
 * @class Animate(options)
 * @desc 一個動畫的載具
 * @see {easing} https://easings.net/zh-tw
 */

class Animate extends ModuleBase {

    /**
     * @argument options 動畫選項
     * @param {number} push 每次前進的偵數
     * @param {number} begin 起始時間
     * @param {number} duration 持續時間
     * @param {string} easing 緩動函數
     * @param {boolean} reverse 反轉前進
     * @param {boolean} alternate 巡迴播放
     * @param {function} action 執行動作
     */

    constructor( options ){
        super("Animate");
        this.validate({
            push : [ options.push, 60 ],
            time : [ options.begin, 0],
            duration : [ options.duration, 0],
            easing : [ options.easing, "linear"],
            alternate : [ options.alternate, false],
            reverse : [ options.reverse, false],
            action : [ options.action, function(){}],
        });
        this.over = false;
        this.actionEasing = Easing.get(this.easing);
        this.pace = 1000 / this.push;
    }

    /**
     * @function validate(data)
     * @desc 驗證正確並賦予資料
     */

    validate(data){
        for( let key in data ){
            let head = data[key][0];
            let aims = data[key][1];
            if( head ){
                if( typeof head === typeof aims ){
                    this[key] = head;
                }else{
                    this.systemError("validated", "Type error", head);
                }
            }else{
                this[key] = aims;
            }
        }
    }

    /**
     * @function move()
     * @desc 往前推動一偵
     */
    
    move(){
        if( this.over === false ){
            let time = this.actionEasing( this.time += this.reverse ? -this.pace : this.pace, this.duration );
            this.action( time );
            if( this.alternate ){
                if( this.time >= this.duration ){
                    this.reverse = true;
                }else if( this.reverse && this.time <= 0 ){
                    this.reverse = false;
                }
            }else if( this.time >= this.duration ){
                this.over = true;
            }
            return time;
        }
        return 1;
    }

    /**
     * @function restart()
     * @desc 重起計算
     */

    restart(){
        this.time = 0;
        this.over = false;
    }

}
