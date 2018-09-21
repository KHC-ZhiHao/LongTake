
class Animate extends ModuleBase {

    /**
     * @member {Sprite} sprite 目標精靈
     * @member {number} begin 起始時間
     * @member {number} duration 持續時間
     * @member {string} easing 緩動函數
     * @member {boolean} reverse 反轉前進
     * @member {boolean} alternate 巡迴播放
     * @member {function} action 執行動作
     */

    constructor( sprite, begin, duration, easing, alternate, action ){
        super("Animate");
        this.sprite = sprite;
        this.checkSprite();
        this.validate({
            time : [begin, 0],
            duration : [duration, 0],
            easing : [easing, "linear"],
            alternate : [alternate, false],
            action : [action, function(){}],
        });
        this.over = false;
        this.reverse = false;
        this.actionEasing = this.sprite.main.getEasing(this.easing);
        this.pace = 1000 / this.sprite.main.framePerSecond;
    }

    /**
     * @function checkSprite()
     * @desc 確認是否為可執行的精靈
     */

    checkSprite(){
        if( Sprite.isSprite(this.sprite) ){
            if( this.sprite.main == null ){
                this.systemError( "checkSprite", "Sprite not install. Call Animate in the create please.", this.sprite );
            }
        }else{
            this.systemError( "checkSprite", "Sprite not a Sprite module", this.sprite );
        }
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
        if( this.over ){
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
        }
        return time || 1;
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
