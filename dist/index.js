"use strict";var _createClass=function(){function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function _toConsumableArray(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}!function(t,e){"undefined"!=typeof module&&"object"===("undefined"==typeof exports?"undefined":_typeof(exports))?module.exports=e():"function"==typeof define&&(define.amd||define.cmd)?define(function(){return e}):t.LongTake=e()}("undefined"!=typeof window?window:global,function(){var n=function(){function e(t){_classCallCheck(this,e),this.moduleBase={name:t||"No module base name."}}return _createClass(e,[{key:"each",value:function(t,e){if("object"===(void 0===t?"undefined":_typeof(t)))if(Array.isArray(t))for(var i=t.length,n=0;n<i;n++){if("_break"===e(t[n],n))break}else for(var a in t){if("_break"===e(t[a],a))break}else this.systemError("each","Not a object or array.",t)}},{key:"systemError",value:function(t,e,i){throw i&&(console.log("%c error object is : ","color:#FFF; background:red"),console.log(i)),new Error("(☉д⊙)!! "+this.moduleBase.name+" => "+t+" -> "+e)}}]),e}(),a=new(function(){function e(){_classCallCheck(this,e),this.arc=Math.PI/180,this.trigonometric={};for(var t=-360;t<360;t++)this.trigonometric[t]={},this.trigonometric[t].sin=Math.sin(t*this.arc),this.trigonometric[t].cos=Math.cos(t*this.arc)}return _createClass(e,[{key:"sinByRad",value:function(t){return this.trigonometric[Math.round(t)]?this.trigonometric[Math.round(t)].sin:Math.sin(t*this.arc)}},{key:"cosByRad",value:function(t){return this.trigonometric[Math.round(t)]?this.trigonometric[Math.round(t)].cos:Math.cos(t*this.arc)}},{key:"getVector",value:function(t,e){return{x:e*this.cosByRad(t),y:e*this.sinByRad(t)}}},{key:"randInt",value:function(t,e){return Math.floor(Math.random()*(e-t+1)+t)}},{key:"getVisibility",value:function(t){var e=document.body.clientWidth;return e<600?"xs"===t:600<=e&&e<960?-1!==["sm","xs"].indexOf(t):960<=e&&e<1264?-1!==["sm","xs","md"].indexOf(t):1264<=e&&e<1904?-1!==["sm","xs","md","lg"].indexOf(t):1904<=e&&-1!==["sm","xs","md","lg","xl"].indexOf(t)}}]),e}()),t=function(t){function e(){_classCallCheck(this,e);var t=_possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"Loader"));return t.data={},t.files={},t.fileLength=0,t.completed=0,t}return _inherits(e,n),_createClass(e,[{key:"onload",value:function(t){var e=this;this.completed>=this.fileLength?t():setTimeout(function(){e.onload(t)},100)}},{key:"start",value:function(i){var n=this,t=function(e){var t=new Image;t.onload=function(){createImageBitmap?createImageBitmap(t).then(function(t){n.data[e]=t}):n.data[e]=t,n.completed+=1,"function"==typeof i&&i(n.completed,n.fileLength),n.completed===n.fileLength&&(delete n.files,delete n.types)},t.src=n.files[e]};for(var e in this.files)t(e)}},{key:"add",value:function(t,e){null==this.files[t]?(this.fileLength+=1,this.files[t]=this.validateFile(e)):this.systemError("add","Name conflict.",t)}},{key:"validateFile",value:function(t){var e=t.split(".").pop();return-1!==["png","jpg"].indexOf(e)||"data:"===t.slice(0,5)?t:t instanceof Element&&t.tagName("CANVAS")?canvas.toDataURL("image/png"):void this.systemError("validateFile","File type not allowed( png, jpg, canvas element, base64url ).",t)}},{key:"get",value:function(t){if(this.data[t])return this.data[t];this.systemError("get","Data not found.",t)}},{key:"close",value:function(t){t&&this.data[t]?(this.data[t].src="",this.data[t]=null):this.each(this.data,function(t){t.src="",t=null})}}]),e}(),s=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"get",value:function(t){return e[t]&&"constructor"!==t&&"get"!==t?e[t]:e.linear}},{key:"linear",value:function(t,e){return t/e}},{key:"easeInQuad",value:function(t,e){return 1*(t/=e)*t}},{key:"easeOutQuad",value:function(t,e){return-1*(t/=e)*(t-2)}},{key:"easeInOutQuad",value:function(t,e){return(t/=e/2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},{key:"easeInCubic",value:function(t,e){return 1*(t/=e)*t*t}},{key:"easeOutCubic",value:function(t,e){return 1*((t=t/e-1)*t*t+1)}},{key:"easeInOutCubic",value:function(t,e){return(t/=e/2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},{key:"easeInQuart",value:function(t,e){return 1*(t/=e)*t*t*t}},{key:"easeOutQuart",value:function(t,e){return-1*((t=t/e-1)*t*t*t-1)}},{key:"easeInOutQuart",value:function(t,e){return(t/=e/2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},{key:"easeInQuint",value:function(t,e){return 1*(t/=e)*t*t*t*t}},{key:"easeOutQuint",value:function(t,e){return 1*((t=t/e-1)*t*t*t*t+1)}},{key:"easeInOutQuint",value:function(t,e){return(t/=e/2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},{key:"easeInSine",value:function(t,e){return-1*Math.cos(t/e*(Math.PI/2))+1}},{key:"easeOutSine",value:function(t,e){return 1*Math.sin(t/e*(Math.PI/2))}},{key:"easeInOutSine",value:function(t,e){return-.5*(Math.cos(Math.PI*t/e)-1)}},{key:"easeInExpo",value:function(t,e){return 0==t?0:1*Math.pow(2,10*(t/e-1))}},{key:"easeOutExpo",value:function(t,e){return t==e?1:1*(1-Math.pow(2,-10*t/e))}},{key:"easeInOutExpo",value:function(t,e){return 0==t?0:t==e?1:(t/=e/2)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*--t))}},{key:"easeInCirc",value:function(t,e){return-1*(Math.sqrt(1-(t/=e)*t)-1)}},{key:"easeOutCirc",value:function(t,e){return 1*Math.sqrt(1-(t=t/e-1)*t)}},{key:"easeInOutCirc",value:function(t,e){return(t/=e/2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},{key:"easeInElastic",value:function(t,e){var i=1.70158,n=0,a=1;if(0==t)return 0;if(1==(t/=e))return 1;if(n||(n=.3*e),a<1){a=1;i=n/4}else i=n/(2*Math.PI)*Math.asin(1/a);return-a*Math.pow(2,10*(t-=1))*Math.sin((t*e-i)*(2*Math.PI)/n)}},{key:"easeOutElastic",value:function(t,e){var i=1.70158,n=0,a=1;if(0==t)return 0;if(1==(t/=e))return 1;if(n||(n=.3*e),a<1){a=1;i=n/4}else i=n/(2*Math.PI)*Math.asin(1/a);return a*Math.pow(2,-10*t)*Math.sin((t*e-i)*(2*Math.PI)/n)+1}},{key:"easeInOutElastic",value:function(t,e){var i=1.70158,n=0,a=1;if(0==t)return 0;if(2==(t/=e/2))return 1;if(n||(n=e*(.3*1.5)),a<1){a=1;i=n/4}return t<1?a*Math.pow(2,10*(t-=1))*Math.sin((t*e-i)*(2*Math.PI)/n)*-.5:a*Math.pow(2,-10*(t-=1))*Math.sin((t*e-i)*(2*Math.PI)/n)*.5+1}},{key:"easeInBack",value:function(t,e){return 1*(t/=e)*t*(2.70158*t-1.70158)}},{key:"easeOutBack",value:function(t,e){return 1*((t=t/e-1)*t*(2.70158*t+1.70158)+1)}},{key:"easeInOutBack",value:function(t,e){var i=1.70158;return(t/=e/2)<1?t*t*((1+(i*=1.525))*t-i)*.5:.5*((t-=2)*t*((1+(i*=1.525))*t+i)+2)}},{key:"easeInBounce",value:function(t,e){return 1-this.easeOutBounce(e-t,e)}},{key:"easeOutBounce",value:function(t,e){return(t/=e)<1/2.75?7.5625*t*t*1:t<2/2.75?1*(7.5625*(t-=1.5/2.75)*t+.75):t<2.5/2.75?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)}},{key:"easeInOutBounce",value:function(t,e){return t<e/2?.5*this.easeInBounce(2*t,e):.5*this.easeOutBounce(2*t-e,e)+.5}}]),e}(),r=function(t){function s(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:100,e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:100,i=arguments[2],n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:"2d";_classCallCheck(this,s);var a=_possibleConstructorReturn(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,"Bitmap"));return a.offscreenCanvasSupport=!!self.OffscreenCanvas,a.canvas=i||a.offscreenCanvasSupport?new OffscreenCanvas(t,e):document.createElement("canvas"),a.context=a.canvas.getContext(n),a.cache=!1,a.imgData=null,a.imgBitmap=null,a._width=a.canvas.width,a._height=a.canvas.height,null==i&&a.resize(t,e),a}return _inherits(s,n),_createClass(s,[{key:"getRenderTarget",value:function(){return this.imgBitmap&&!0===this.cache?this.imgBitmap:!1===this.cache?this.canvas:(this.cacheImageBitmap(),this.offscreenCanvasSupport?this.imgBitmap:this.canvas)}},{key:"resize",value:function(t,e){this.width=t||this.width,this.height=e||this.height}},{key:"clear",value:function(){this.context.clearRect(0,0,this.width,this.height)}},{key:"cacheImageBitmap",value:function(){var t=this;if(this.offscreenCanvasSupport)this.imgBitmap=this.canvas.transferToImageBitmap();else{var e=new Image;e.onload=function(){t.imgBitmap=e},e.src=this.canvas.toDataURL()}}},{key:"clearCache",value:function(){this.imgData=null,this.imgBitmap=null}},{key:"getPixel",value:function(t,e){var i=this.getImageData(),n=t*(4*i.width)+4*e;return[i.data[n],i.data[n+1],i.data[n+2],i.data[n+3]]}},{key:"getImageData",value:function(){return null==this.imgData&&(this.imgData=this.context.getImageData(0,0,this.width,this.height)),this.imgData}},{key:"putImageData",value:function(t){this.clear(),this.context.putImageData(t,0,0)}},{key:"width",get:function(){return this._width},set:function(t){this._width=t,this.canvas.width=t}},{key:"height",get:function(){return this._height},set:function(t){this._height=t,this.canvas.height=t}}],[{key:"isBitmap",value:function(t){return t instanceof this}}]),s}(),o=function(t){function a(t,e,i){_classCallCheck(this,a);var n=_possibleConstructorReturn(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,"Container"));return n.data=null,n.core=i||null,n.bitmap=new r(t,e),n.context=n.bitmap.context,n.pointerX=0,n.pointerY=0,n.initStage(),n}return _inherits(a,n),_createClass(a,[{key:"initStage",value:function(){this.stage=new h("Stage"),this.stage.install(this),this.stage.resize(0,0),this.stage.render=function(){this.cache()}}},{key:"register",value:function(t){var e=this;this.core&&this.each(t.event,function(t){null==e.core.event[t.event]&&e.core.addEvent(t.event)})}},{key:"post",value:function(t){this.data=t,this.stageUpdate(),this.stageRender()}},{key:"stageUpdate",value:function(){this.stage.mainUpdate()}},{key:"stageRender",value:function(){this.stage.mainRender(),this.draw()}},{key:"getImageBitmap",value:function(t){if(this.bitmap.offscreenCanvasSupport){var e=this.bitmap.canvas.transferToImageBitmap();t(e),e.close()}else t(this.bitmap.canvas)}},{key:"addChildren",value:function(t){this.stage.addChildren(t)}},{key:"draw",value:function(){this.bitmap.clear(),this.render(this.stage)}},{key:"render",value:function(t){if(t.canShow){var e=Math.round(t.screenX),i=Math.round(t.screenY),n=t.getRealPosition();this.transform(t),n.x<this.width&&n.y<this.height&&this.context.drawImage(t.bitmap.getRenderTarget(),e,i);for(var a=t.children.length,s=0;s<a;s++)this.render(t.children[s]);this.restore(t)}}},{key:"transform",value:function(t){var e=this.context;if(255!==t.opacity&&(e.globalAlpha=t.opacity/255),t.blendMode&&(e.globalCompositeOperation=t.blendMode),!1!==t.isTransform()){var i=t.posX,n=t.posY;1===t.scaleHeight&&1===t.scaleWidth||e.save(),e.translate(i,n),1===t.scaleHeight&&1===t.scaleWidth||e.scale(t.scaleWidth,t.scaleHeight),0!==t.rotation&&e.rotate(t.rotation*t.helper.arc),0===t.skewX&&0===t.skewY||e.transform(1,t.skewX,t.skewY,1,0,0),e.translate(-i,-n)}}},{key:"restore",value:function(t){var e=this.context;if(255!==t.opacity&&(e.globalAlpha=t.parent?t.parent.opacity/255:1),t.blendMode&&(e.globalCompositeOperation=t.blendMode),!1!==t.isTransform()){var i=t.posX,n=t.posY;1===t.scaleHeight&&1===t.scaleWidth?(e.translate(i,n),0!==t.rotation&&e.rotate(-t.rotation*t.helper.arc),0===t.skewX&&0===t.skewY||e.transform(1,-t.skewX,-t.skewY,1,0,0),e.translate(-i,-n)):e.restore()}}},{key:"width",get:function(){return this.bitmap.canvas.width}},{key:"height",get:function(){return this.bitmap.canvas.height}}]),a}(),e=function(t){function a(t,e,i){_classCallCheck(this,a);var n=_possibleConstructorReturn(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,"Main"));return n.width=e,n.height=i,n.ticker=0,n.remove=!1,n.target="string"==typeof t?document.getElementById(t):t,n.context=n.target.getContext("2d"),n.baseFps=0,n.viewScale=1,n.framePerSecond=60,n.bindUpdate=n.update.bind(n),n.targetRect=n.target.getBoundingClientRect(),n.container=new o(n.width,n.height,n),window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)},n.initEvent(),n.initCamera(),n.update(),n}return _inherits(a,n),_createClass(a,[{key:"setFPS",value:function(t){"number"==typeof t&&0<t&&t<=60?this.framePerSecond=t:this.systemError("setFPS","FPS must between 1 to 60.",t)}},{key:"close",value:function(){this.remove=!0,this.target=null,this.stage.eachChildrenDeep(function(t){t.close()}),this.stage=null,window.removeEventListener("resize",this.windowResize.bind(this))}},{key:"initCamera",value:function(){this.camera=new(function(){function e(t){_classCallCheck(this,e),this.x=0,this.y=0,this.core=t}return _createClass(e,[{key:"checkBorder",value:function(t,e,i){var n=i/2;return n<(t=t*this.core.viewScale)?e-n<t?e-i:(t-n)/this.core.viewScale:0}},{key:"offsetX",get:function(){return this.checkBorder(this.x,this.core.width*this.core.viewScale,this.core.targetRect.width)}},{key:"offsetY",get:function(){return this.checkBorder(this.y,this.core.height*this.core.viewScale,this.core.targetRect.height)}}]),e}())(this)}},{key:"setCamera",value:function(t,e){this.camera.x=t,this.camera.y=e}},{key:"initEvent",value:function(){this.event={},this.eventAction={},this.addEvent("click",this.resetPointerCoordinate),this.addEvent("pointermove",this.resetPointerCoordinate),this.windowResize(),window.addEventListener("resize",this.windowResize.bind(this))}},{key:"addEvent",value:function(e,i){var n=this;null==this.event[e]&&(this.event[e]=function(t){null==n.eventAction[e]&&(n.eventAction[e]=t,i&&i.bind(n)(t))},this.target.addEventListener(e,this.event[e]))}},{key:"resetPointerCoordinate",value:function(t){this.container.pointerX=(t.offsetX/this.viewScale+this.camera.offsetX)*(this.target.width/this.targetRect.width),this.container.pointerY=(t.offsetY/this.viewScale+this.camera.offsetY)*(this.target.height/this.targetRect.height)}},{key:"targetResize",value:function(t,e){this.target.width=t,this.target.height=e,this.targetRect=this.target.getBoundingClientRect()}},{key:"windowResize",value:function(){this.targetRect=this.target.getBoundingClientRect(),this.onWindowResize()}},{key:"onWindowResize",value:function(){}},{key:"forElementResize",value:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1;this.targetResize(t.clientWidth,t.clientHeight),t.clientWidth/this.width<t.clientHeight/this.height?this.viewScale=t.clientHeight/this.height*e:this.viewScale=t.clientWidth/this.width*e,this.context.restore(),this.context.save(),this.context.scale(this.viewScale,this.viewScale)}},{key:"addChildren",value:function(t){this.container.addChildren(t)}},{key:"update",value:function(){1==this.remove&&window.cancelAnimationFrame(this.ticker),this.baseFps+=this.framePerSecond,this.stageUpdate(),60<=this.baseFps&&(this.bitmapUpdate(),this.baseFps=this.baseFps%60),this.eventAction={},this.ticker=window.requestAnimationFrame(this.bindUpdate)}},{key:"stageUpdate",value:function(){this.container.stage.mainEvent(this.eventAction),this.container.stageUpdate()}},{key:"bitmapUpdate",value:function(){this.container.stageRender(),this.context.clearRect(0,0,this.width,this.height),this.context.drawImage(this.container.bitmap.canvas,-this.camera.offsetX,-this.camera.offsetY)}}]),a}(),i=function(t){function i(t){_classCallCheck(this,i);var e=_possibleConstructorReturn(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,"Animate"));return e.validate({push:[t.push,60],time:[t.begin,0],duration:[t.duration,0],easing:[t.easing,"linear"],alternate:[t.alternate,!1],reverse:[t.reverse,!1],action:[t.action,function(){}]}),e.over=!1,e.actionEasing=s.get(e.easing),e.pace=1e3/e.push,e}return _inherits(i,n),_createClass(i,[{key:"validate",value:function(t){for(var e in t){var i=t[e][0],n=t[e][1];i?(void 0===i?"undefined":_typeof(i))===(void 0===n?"undefined":_typeof(n))?this[e]=i:this.systemError("validated","Type error",i):this[e]=n}}},{key:"move",value:function(){if(!1!==this.over)return 1;var t=this.actionEasing(this.time+=this.reverse?-this.pace:this.pace,this.duration);return this.action(t),this.alternate?this.time>=this.duration?this.reverse=!0:this.reverse&&this.time<=0&&(this.reverse=!1):this.time>=this.duration&&(this.over=!0),t}},{key:"restart",value:function(){this.time=0,this.over=!1}}]),i}(),h=function(t){function i(t){_classCallCheck(this,i);var e=_possibleConstructorReturn(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,t||"Sprite"));return e.name=t||"No name",e.main=null,e.helper=a,e.bindUpdateForChild=e.updateForChild.bind(e),e.initEvent(),e.initRender(),e.initStatus(),e.initBitmap(),e.initFamily(),e.initPosition(),e.initTransform(),e}return _inherits(i,n),_createClass(i,[{key:"eachChildren",value:function(t){for(var e=this.children.length,i=0;i<e;i++)t(this.children[i])}},{key:"eachChildrenDeep",value:function(i){!function e(t){t.eachChildren(function(t){i(t),e(t)})}(this)}},{key:"super",value:function(t){var e;this.__proto__[t]?(e=this.__proto__[t]).call.apply(e,[this].concat(_toConsumableArray([].concat(Array.prototype.slice.call(arguments)).slice(1)))):this.systemError("super","Prototype not found.",t)}},{key:"install",value:function(t){this.main=t,this.main.register(this),this.create()}},{key:"create",value:function(){}},{key:"initBitmap",value:function(){var t=this.parent||{};this.bitmap=new r(t.width||100,t.height||100),this.context=this.bitmap.context}},{key:"resize",value:function(t,e){"object"===(void 0===t?"undefined":_typeof(t))?t.width&&t.height?this.bitmap.resize(t.width,t.height):this.systemError("resize","Object must have width and height.",t):this.bitmap.resize(t,e)}},{key:"initFamily",value:function(){this.parent=null,this.children=[]}},{key:"addChildren",value:function(t){i.isSprite(t)?null==t.parent?((t.parent=this).children.push(t),this.sortChildren()):this.systemError("addChildren","Sprite have parent.",t):this.systemError("addChildren","Object not a sprite",t)}},{key:"sortChildren",value:function(){var e=[],i=[];this.eachChildren(function(t){null==i[t.z]&&(i[t.z]=[]),i[t.z].push(t)}),this.each(i,function(t){Array.isArray(t)&&(e=e.concat(t))}),this.children=e}},{key:"initEvent",value:function(){this.event={}}},{key:"on",value:function(t,e,i){null==this.event[t]?(this.main.core&&this.main.core.addEvent(e),this.event[t]={event:e,callback:i}):this.systemError("on","Event name("+t+") conflict.")}},{key:"unon",value:function(t){this.event[t]=null}},{key:"mainEvent",value:function(e){var t=this;null==this.main&&this.install(this.parent.main),this.each(e,function(e,i){t.each(t.event,function(t){t.event===i&&t.callback(e)})}),this.eachChildren(function(t){t.mainEvent(e)})}},{key:"initTransform",value:function(){this.transform={skewX:0,skewY:0,scaleWidth:1,scaleHeight:1,rotation:0,opacity:255}}},{key:"isTransform",value:function(){var t=this.transform;return!(0===t.skewX&&0===t.skewY&&1===t.scaleWidth&&1===t.scaleHeight&&0===t.rotation)}},{key:"scale",value:function(t,e){this.scaleWidth=t,this.scaleHeight=e||t}},{key:"initPosition",value:function(){this.position={x:0,y:0,z:0,screenX:0,screenY:0,anchorX:0,anchorY:0}}},{key:"setAnchor",value:function(t,e){this.anchorX=t,this.anchorY=e||t}},{key:"initStatus",value:function(){this.status={sort:!1,cache:!1,remove:!1,hidden:!1,realSize:null,childrenDead:!1}}},{key:"cache",value:function(){this.status.cache=!0,this.bitmap.cache=!0}},{key:"unCache",value:function(){this.status.cache=!1,this.bitmap.cache=!1}},{key:"hidden",value:function(t){this.status.hidden=!t||!!t}},{key:"unHidden",value:function(){this.status.hidden=!1}},{key:"getRealSize",value:function(){if(null==this.status.realSize){var t=this.width+this.skewY*this.height,e=this.height+this.skewX*this.width,i=Math.abs(this.helper.sinByRad(this.rotation)),n=Math.abs(this.helper.cosByRad(this.rotation));this.status.realSize={width:(t*n+e*i)*this.screenScaleWidth,height:(e*n+t*i)*this.screenScaleHeight}}return this.status.realSize}},{key:"getRealPosition",value:function(){return{x:this.screenX*(null==this.parent?1:this.parent.screenScaleWidth),y:this.screenY*(null==this.parent?1:this.parent.screenScaleHeight)}}},{key:"update",value:function(){}},{key:"mainUpdate",value:function(){null==this.main&&this.install(this.parent.main),this.position.screenX=null,this.position.screenY=null,this.status.realSize=null,this.status.sort&&(this.status.sort=!1,this.sortChildren()),this.update(),this.eachChildren(this.bindUpdateForChild),this.status.childrenDead&&(this.status.childrenDead=!1,this.children=this.children.filter(function(t){return t.status.remove&&t.close(),!t.status.remove}))}},{key:"updateForChild",value:function(t){0==t.status.remove?t.mainUpdate():this.status.childrenDead=!0}},{key:"close",value:function(){this.id=-1,this.parent=null}},{key:"remove",value:function(){this.status.remove=!0}},{key:"removeChild",value:function(t){i.isSprite(t)?t.parent===this?t.remove():this.systemError("removeChild","Have'n this sprite",t):this.systemError("removeChild","Not a sprite",t)}},{key:"clearChildren",value:function(){var e=this;this.eachChildren(function(t){e.removeChild(t)})}},{key:"removeChildrenByName",value:function(e){var i=this;this.eachChildren(function(t){t.name===e&&i.removeChild(t)})}},{key:"removeChildrenByIndex",value:function(t){"number"==typeof t&&this.children[t]&&this.children[t].remove()}},{key:"initRender",value:function(){this.filter}},{key:"render",value:function(){}},{key:"mainRender",value:function(){this.eachChildren(this.renderForChild),this.canRender&&(this.context.save(),this.render(),this.context.restore(),this.renderFilter(this.filter),this.context.restore(),this.bitmap.clearCache())}},{key:"renderForChild",value:function(t){t.mainRender()}},{key:"fromImage",value:function(t){return this.resize(t),this.render=function(){this.context.drawImage(t,0,0),this.cache()},this}},{key:"renderFilter",value:function(e){if(e){var t=this.bitmap.getImageData();e(t),this.bitmap.putImageData(t),this.eachChildren(function(t){t.renderFilter(e)})}}},{key:"inRect",value:function(t,e){var i=this.getRealSize(),n=this.getRealPosition();return t>=n.x&&t<=n.x+i.width&&e>=n.y&&e<=n.y+i.height}},{key:"width",get:function(){return this.bitmap.width},set:function(t){this.bitmap.width=t}},{key:"height",get:function(){return this.bitmap.height},set:function(t){this.bitmap.height=t}},{key:"scaleWidth",get:function(){return this.transform.scaleWidth},set:function(t){this.transform.scaleWidth=t}},{key:"scaleHeight",get:function(){return this.transform.scaleHeight},set:function(t){this.transform.scaleHeight=t}},{key:"screenScaleWidth",get:function(){return null==this.parent?this.scaleWidth:this.scaleWidth*this.parent.screenScaleWidth}},{key:"screenScaleHeight",get:function(){return null==this.parent?this.scaleHeight:this.scaleHeight*this.parent.screenScaleHeight}},{key:"rotation",get:function(){return this.transform.rotation},set:function(t){this.transform.rotation=t%360}},{key:"blendMode",get:function(){return this.transform.blendMode},set:function(t){this.transform.blendMode=t}},{key:"opacity",get:function(){return this.transform.opacity},set:function(t){t<=0&&(t=0),255<=t&&(t=255),this.transform.opacity=t}},{key:"skewX",get:function(){return this.transform.skewX},set:function(t){this.transform.skewX=t}},{key:"skewY",get:function(){return this.transform.skewY},set:function(t){this.transform.skewY=t}},{key:"x",get:function(){return this.position.x},set:function(t){"number"==typeof t&&(this.position.x=t||0)}},{key:"y",get:function(){return this.position.y},set:function(t){"number"==typeof t&&(this.position.y=t||0)}},{key:"z",get:function(){return this.position.z},set:function(t){"number"==typeof t&&(this.position.z=t,this.parent&&(this.parent.status.sort=!0))}},{key:"screenX",get:function(){return null==this.position.screenX&&(this.position.screenX=(this.parent?this.parent.screenX+this.parent.width*this.parent.anchorX:0)+this.x-this.width*this.anchorX),this.position.screenX}},{key:"screenY",get:function(){return null==this.position.screenY&&(this.position.screenY=(this.parent?this.parent.screenY+this.parent.height*this.parent.anchorY:0)+this.y-this.height*this.anchorY),this.position.screenY}},{key:"posX",get:function(){return this.screenX+this.width*this.anchorX}},{key:"posY",get:function(){return this.screenY+this.height*this.anchorY}},{key:"anchorX",get:function(){return this.position.anchorX},set:function(t){this.position.anchorX=t}},{key:"anchorY",get:function(){return this.position.anchorY},set:function(t){this.position.anchorY=t}},{key:"canRender",get:function(){return!this.status.cache}},{key:"canShow",get:function(){return!this.status.hidden}}],[{key:"isSprite",value:function(t){return t instanceof this}}]),i}(),c=e;return c.Sprite=h,c.Bitmap=r,c.Loader=t,c.Helper=a,c.Animate=i,c.Container=o,c});