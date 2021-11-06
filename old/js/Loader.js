/**
 * @class Loader
 * @desc 針對圖片預載入的載具
 */

class Loader extends ModuleBase {

    constructor(){
        super("Loader");
        this.data = {};
        this.files = {};
        this.fileLength = 0;
        this.completed = 0;
    }

    /**
     * @function onload(callback)
     * @desc 等待載入完成，若載入已完成，直接執行callback
     * @param {function} callback 載入完成時執行
     */

    onload(callback){
        if( this.completed >= this.fileLength ){
            callback();
        }else{
            setTimeout(()=>{
                this.onload(callback);
            }, 100);
        }
    }

    /**
     * @function start(loading)
     * @desc 執行載入
     * @param {function(completed,length)} loading 載入時觸發的事件
     */

    start(loading){
        for( let name in this.files ){
            let image = new Image();
            image.onload = ()=>{
                if( window.createImageBitmap ){
                    window.createImageBitmap(image).then((bitmap)=>{
                        this.data[name] = bitmap;
                    });
                }else{
                    this.data[name] = image;
                }
                this.completed += 1;
                if( typeof loading === "function" ){
                    loading( this.completed, this.fileLength );
                }
                if( this.completed === this.fileLength ){
                    delete this.files;
                    delete this.types;
                }
            }
            image.src = this.files[name];
        }
    }

    /**
     * @function add(name,src)
     * @desc 加入一個等待載入檔案
     */

    add( name, src ){
        if( this.files[name] == null ){
            this.fileLength += 1;
            this.files[name] = this.validateFile(src);
        }else{
            this.systemError("add", "Name conflict.", name);
        }
    }

    /**
     * @function validateFile(file)
     * @private
     * @desc 驗證檔案是否正確
     */

    validateFile( file ){
        let type = file.split(".").pop();
        if( ['png','jpg'].indexOf(type) !== -1 || file.slice( 0, 5 ) === 'data:' ){
            return file;
        }
        if( file instanceof Element && file.tagName("CANVAS") ){
            return canvas.toDataURL("image/png");
        }
        this.systemError( "validateFile", "File type not allowed( png, jpg, canvas element, base64url ).", file );
    }

    /**
     * @function get(name)
     * @desc 取得一個載入完畢的檔案
     */

    get(name){
        if( this.data[name] ){ return this.data[name]; }
        this.systemError("get", "Data not found.", name);
    }

    /**
     * @function close(name)
     * @desc 清除快取釋放記憶體
     * @param {string} name 當此值沒有輸入，將清空全部
     */

    close( name ){
        if( name && this.data[name] ){
            this.data[name].src = "";
            this.data[name] = null
        }else{
            this.each( this.data, ( data )=>{
                data.src = "";
                data = null;
            });
        }
    }
}
