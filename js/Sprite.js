
/**
 * @class Sprite(moduleName)
 * @desc 建立一個動畫精靈，為LongTake的驅動核心
 */

class Sprite extends ModuleBase {

    constructor(moduleName){
        super( moduleName || "Sprite" );
        this.name = moduleName || "No name",
        this.main = null;
        this.initEvent();
        this.initRender();
        this.initStatus();
        this.initBitmap();
        this.initFamily();
        this.initShadow();
        this.initPosition();
        this.initContainer();
    }

    /**
     * @function isSprite(target)
     * @static
     * @desc 檢測一個物件是否為精靈
     */

    static isSprite(object){
        return object instanceof this;
    }

    /**
     * @function eachChildren(callback)
     * @desc 迭代所有子精靈
     */

    eachChildren(callback){
        let len = this.children.length;
        for( let i = 0 ; i < len ; i++ ){ callback(this.children[i]); }
    }

    /**
     * @function eachChildrenDeep(callback)
     * @desc 迭代所有子精靈(包含子精靈的子精靈)
     */

    eachChildrenDeep(callback){
        let each = function(sprite){
            sprite.eachChildren((children)=>{
                callback(children);
                each(children);
            });
        }
        each(this);
    }

    /**
     * @function super(name);
     * @desc 當實體化該精靈後，可以使用super呼叫實體化前的函式
     * @param {string} name 呼叫函式名稱
     */

    super(name){
        if( this.__proto__[name] ){
            this.__proto__[name].call(this, ...[...arguments].slice(1));
        }else{
            this.systemError("super", "Prototype not found.", name);
        }
    }

    //=============================
    //
    // install
    //

    /**
     * @private
     * @function install(main)
     * @desc 被加入LongTake時執行，並載入LongTake
     */

    install(main){
        this.main = main;
        this.main.register(this);
        this.create();
    }

    /**
     * @function create()
     * @desc 當被加入stage時呼叫該函式
     */

    create(){ /* user set */ }

    //=============================
    //
    // bitmap
    //

    initBitmap(){
        let parent = this.parent || {};
        this.bitmap = new Bitmap( parent.width || 100, parent.height || 100 );
        this.context = this.bitmap.context;
    }

    get width(){ return this.bitmap.width }
    get height(){ return this.bitmap.height }

    /**
     * @function resize(width,height)
     * @desc 調整精靈的bitmap大小
     * @param {object|number} width 當傳入為具有width和height的物件，會調整成該大小
     */

    resize( width, height ){
        if( typeof width === "object" && width.width && width.height ){
            this.bitmap.resize( width.width, width.height )
        }else{
            this.bitmap.resize(width, height)
        }
    }

    //=============================
    //
    // family
    //

    initFamily(){
        this.parent = null;
        this.children = [];
    }

    /**
     * @function addChildren(sprite)
     * @desc 加入一個子精靈
     */

    addChildren(sprite){
        if( Sprite.isSprite(sprite) ){
            if( sprite.parent == null ){
                sprite.parent = this;
                this.children.push(sprite);
                this.sortChildren();
            }else{
                this.systemError('addChildren', 'Sprite have parent.', sprite);
            }
        }else{
            this.systemError('addChildren', 'Object not a sprite', sprite);
        }
    }

    /**
     * @function sortChildren()
     * @desc 重新排列子精靈
     */

    sortChildren(){
        let newData = [];
        let childList = [];
        this.eachChildren((child)=>{
            if( childList[child.z] == null ){ childList[child.z] = []; }
            childList[child.z].push(child)
        })
        this.each( childList, (list)=>{
            if( Array.isArray(list) ){ newData = newData.concat(list); }
        });
        this.children = newData;
    }

    //=============================
    //
    // shadow
    //

    initShadow(){
        this.shadowData = {
            offsetX : 0,
            offsetY : 0,
            color : "#000",
            blur : 0,
            use : false,
        }
    }
    
    setShadow(data){
        if( typeof data === "object" ){
            this.shadowData = Object.assign( this.shadowData, data );
            this.shadowData.use = true;
        }else{
            this.systemError( "setShadow", "Data must a object.", data );
        }
    }

    //=============================
    //
    // event
    //

    initEvent(){
        this.event = {};
    }

    /**
     * @function on(name,event,callback)
     * @desc 監聽一個事件
     */

    on( name, event, callback ){
        if( this.event[name] == null ){
            if( this.main ){ this.main.addEvent(event); }
            this.event[name] = {
                event : event,
                callback : callback,
            }
        }else{
            this.systemError( 'on', `Event name(${name}) conflict.` )
        }
    }

    /**
     * @function unon(name)
     * @desc 移除監聽的事件
     */

    unon( name ){
        this.event[name] = null;
    }

    mainEvent(){
        if( this.main == null ){ this.install(this.parent.main); }
        this.each( this.main.eventAction, ( event, key )=>{
            this.each( this.event, (data)=>{
                if( data.event === key ){ data.callback(event); }
            });
        });
        this.eachChildren((children)=>{
            children.mainEvent();
        });
    }

    //=============================
    //
    // container
    //

    initContainer(){
        this.container = {
            skewX : 0,
            skewY : 0,
            scaleWidth : 1,
            scaleHeight : 1,
            rotation : 0,
            opacity : 255,
            blendMode : null, 
        }
    }

    /**
     * @function scale(width,height)
     * @desc 放大倍率
     */

    scale( width, height ){
        this.scaleWidth = width;
        this.scaleHeight = height || width;
    }

    get scaleWidth(){ return this.container.scaleWidth }
    set scaleWidth(val){
        this.container.scaleWidth = val;
    }

    get scaleHeight(){ return this.container.scaleHeight }
    set scaleHeight(val){
        this.container.scaleHeight = val;
    }

    get rotation(){ return this.container.rotation }
    set rotation(val){
        this.container.rotation = val % 360;
    }

    get blendMode(){ return this.container.blendMode };
    set blendMode(val){
        this.container.blendMode = val;
    }

    get opacity(){ return this.container.opacity };
    set opacity(val){
        this.container.opacity = val > 255 ? 255 : val;
    }

    get skewX(){ return this.container.skewX }
    set skewX(val){
        this.container.skewX = val;
    }

    get skewY(){ return this.container.skewY }
    set skewY(val){
        this.container.skewY = val;
    }

    //=============================
    //
    // position
    //

    initPosition(){
        this.position = {
            x : 0,
            y : 0,
            z : 0,
            anchorX : 0,
            anchorY : 0,
        }
    }

    /**
     * @function setAnchor(x,y)
     * @desc 設定錨點
     */

    setAnchor(x, y){
        this.anchorX = x;
        this.anchorY = y || x
    }

    get x(){ return this.position.x }
    set x(val){ 
        if( typeof val === "number" ) {
            this.position.x = val || 0;
        }
    }

    get y(){ return this.position.y }
    set y(val){ 
        if( typeof val === "number" ) {
            this.position.y = val || 0;
        }
     }

    get z(){ return this.position.z }
    set z(val){ 
        this.position.z = val;
        if( this.parent ){ this.parent.status.sort = true; }
    }

    get screenX(){ return (this.parent ? this.parent.screenX + this.parent.width * this.parent.anchorX : 0) + this.x - this.width * this.anchorX }
    get screenY(){ return (this.parent ? this.parent.screenY + this.parent.height * this.parent.anchorY : 0) + this.y - this.height * this.anchorY }

    get posX(){ return this.screenX + this.width * this.anchorX }
    get posY(){ return this.screenY + this.height * this.anchorY }

    get anchorX(){ return this.position.anchorX }
    set anchorX(val){
        this.position.anchorX = val;
    }

    get anchorY(){ return this.position.anchorY }
    set anchorY(val){
        this.position.anchorY = val;
    }
    
    //=============================
    //
    // status
    //

    initStatus(){
        this.status = {
            sort : false,
            cache : false,
            remove : false,
            hidden : false,
            readSize : null,
        }
    }

    get canRender(){ return !this.status.cache; }
    get canShow(){ return !this.status.hidden && !this.getOffscreen() }

    /**
     * @function cache()
     * @desc 快取目前渲染的bitmap
     */

    cache(){
        this.status.cache = true;
    }

    /**
     * @function unCache()
     * @desc 手動解除快取狀態
     */

    unCache(){
        this.status.cache = false;
    }

    /**
     * @function hidden()
     * @desc 隱藏
     */

    hidden(bool){
        this.status.hidden = bool ? !!bool : true;
    }

    /**
     * @function unHidden()
     * @desc 解除隱藏
     */

    unHidden(){
        this.status.hidden = false;
    }

    /**
     * @function getMaxSize()
     * @desc 獲取該精靈預期最大的大小
     */

    getRealSize(){
        if( this.status.readSize == null ){
            let width = this.width + this.skewY * this.height;
            let height = this.height + this.skewX * this.width;
            let s = Math.abs(Helper.sinByDeg(this.rotation));
            let c = Math.abs(Helper.cosByDeg(this.rotation));
            this.status.readSize = {
                width : ( width * c + height * s ) * this.scaleWidth,
                height : ( height * c + width * s ) * this.scaleHeight,
            }
        }
        return this.status.readSize;
    }

    /**
     * @function getOffscreen()
     * @desc 獲取該精靈是否在視窗外
     */

    getOffscreen(){
        if( this.main ){
            let size = this.getRealSize();
            if( this.screenX <= this.main.camera.offsetX + this.main.bitmap.width 
                && this.screenY <= this.main.camera.offsetY + this.main.bitmap.height
                && this.screenX + size.width >= this.main.camera.offsetX 
                && this.screenY + size.height >= this.main.camera.offsetY){
                    return false;
            }
        }
        return true;
    }

    //=============================
    //
    // update
    //

    /**
     * @function update()
     * @desc 每次渲染圖形時執行此函式，目的為精靈的動作
     */

    update(){ /* module set */ }

    /**
     * @function mainUpdate()
     * @desc 每次執行update時呼叫此函式，處理Z值更動的排序與移除子精靈
     */

    mainUpdate(ticker){
        this.status.readSize = null;
        let remove = false;
        if( this.status.sort ){
            this.status.sort = false;
            this.sortChildren();
        }
        this.update(ticker);
        this.eachChildren((children)=>{
            if( children.status.remove == false ){
                children.mainUpdate(ticker);
            }else{
                remove = true;
            }
        });
        if( remove ){
            this.children = this.children.filter((c)=>{
                if( c.status.remove ){ 
                    c.id = -1; 
                    c.parent = null; 
                }
                return !c.status.remove;
            });
        }
    }

    //=============================
    //
    // remove
    //

    /**
     * @function remove()
     * @desc 移除自己
     */

    remove(){
        this.status.remove = true;
    }

    /**
     * @function removeChild(sprite)
     * @desc 移除指定的子精靈
     */

    removeChild(sprite){
        if( Sprite.isSprite(sprite) ){
            if( sprite.parent === this ){
                sprite.remove();
            }else{
                this.systemError("removeChild", "Have'n this sprite", sprite);
            }
        }else{
            this.systemError("removeChild", "Not a sprite", sprite);
        }
    }

    /**
     * @function clearChildren()
     * @desc 移除全部的子精靈
     */

    clearChildren(){
        this.eachChildren((children)=>{
            this.removeChild(children);
        })
    }

    /**
     * @function removeChildrenByName(name)
     * @desc 移除指定name的精靈
     */

    removeChildrenByName(name){
        this.eachChildren((children)=>{
            if( children.name === name ){ this.removeChild(children); }
        })
    }

    /**
     * @function removeChildrenByIndex(index)
     * @desc 移除指定index的精靈
     */

    removeChildrenByIndex(index){
        if( typeof index === "number" && this.children[index] ){
            this.children[index].remove();
        }
    }

    //=============================
    //
    // render
    //

    /**
     * @function filter(imgData)
     * @default null
     * @desc 渲染濾鏡的函式
     */

    /**
     * @function mask()
     * @default null
     * @desc 建立遮罩的函式
     */

    initRender(){
        this.mask = null;
        this.filter == null;
    }

    /**
     * @function render(this)
     * @desc 渲染bitmap的方法
     */
    
    render(){ /* module set */ }

    /**
     * @function mainRender(force)
     * @desc 主要渲染程序，包含渲染與濾鏡
     * @param {boolean} force 無視快取強制重新渲染(切忌渲染需要高效能的成本付出)
     */

    mainRender(force){
        this.eachChildren((children)=>{children.mainRender();})
        if( this.canRender || force ){ 
            this.context.save();
            this.render(this);
            this.context.restore();
            this.renderFilter(this.filter);
            this.context.restore();
            this.bitmap.clearImgDataCache();
        }
    }

    /**
     * @function renderFilter(filter)
     * @desc 操作堆疊渲染的函式
     */

    renderFilter(filter){
        if( filter ){
            let imgData = this.bitmap.getImageData();
            filter(imgData);
            this.bitmap.putImageData(imgData);
            this.eachChildren((child) => {child.renderFilter(filter);});
        }
    }

    /**
     * @function drawImage(imageName,x,y)
     * @desc 繪製加載完成的圖片
     */

    drawImage(imageName,x = 0, y = 0){
        let image = this.main.getImageByName(imageName);
        this.context.drawImage( image, x, y );
    }

    /**
     * @function resizeFromImage()
     * @desc 調整至加載圖片的大小
     */

    resizeFromImage(imageName){
        let image = this.main.getImageByName(imageName);
        this.resize( image.width, image.height );
    }

    /**
     * @function resizeMax()
     * @desc 調整大小至LongTake大小
     */

    resizeMax(){
        if( this.main ){
            this.resize( this.main.width, this.main.height );
        }else{
            this.systemError("resizeMax", "Function call must in the create or update.");
        }
    }

    //=============================
    //
    // draw
    //

    /**
     * @function drawBuffer(buffer)
     * @desc 對一個buffer準備進行繪製
     */

    drawBuffer(buffer){
        if( this.canShow ){
            buffer.context.save();
            this.drawTransform(buffer);
            this.drawBitmap(buffer);
            buffer.context.restore();
        }
    }

    /**
     * @function drawTransform(buffer)
     * @desc 繪製buffer前的轉換行為
     */

    drawTransform(buffer){
        //中心
        let posX = this.posX;
        let posY = this.posY;
        buffer.context.translate( posX, posY );
        //遮罩
        if( this.mask ){
            this.mask();
            this.context.clip();
        }
        if( this.opacity !== 255 ){
            buffer.context.globalAlpha = this.opacity / 255;
        }
        //合成
        if( this.blendMode ){
            buffer.context.globalCompositeOperation = this.blendMode;
        }
        if( this.rotation !== 0 ){
            buffer.context.rotate( this.rotation * this.main.math.arc );
        }
        if( this.scaleHeight !== 1 || this.scaleWidth !== 1 ){
            buffer.context.scale( this.scaleWidth, this.scaleHeight );
        }
        if( this.skewX !== 0 || this.skewY !== 0 ){
            buffer.context.transform( 1, this.skewX, this.skewY, 1, 0, 0 );
        }
        //回歸原點
        buffer.context.translate( -(posX), -(posY) );
    }

    /**
     * @function drawBitmap(buffer)
     * @desc 將自身的bitmap繪製buffer上
     */

    drawBitmap(buffer){
        if( this.shadowData.use ){
            buffer.context.save();
            buffer.context.shadowBlur = this.shadowData.blur;
            buffer.context.shadowColor = this.shadowData.color;
            buffer.context.shadowOffsetX = this.shadowData.offsetX;
            buffer.context.shadowOffsetY = this.shadowData.offsetY;
            buffer.draw( this.bitmap, this.screenX, this.screenY );
            buffer.context.restore();
        }else{
            buffer.draw( this.bitmap, this.screenX, this.screenY );
        }
        this.eachChildren((children)=>{ children.drawBuffer(buffer); });
    }

    //=============================
    //
    // check
    //

    inRect(x,y){
        let rect = this.getRealSize();
        return ( x >= this.screenX && x <= this.screenX + rect.width ) 
            && ( y >= this.screenY && y <= this.screenY + rect.height );
    }

}
