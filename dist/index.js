"use strict";var _createClass=function(){function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function _toConsumableArray(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}!function(t,e){"undefined"!=typeof module&&"object"===("undefined"==typeof exports?"undefined":_typeof(exports))?module.exports=e():"function"==typeof define&&(define.amd||define.cmd)?define(function(){return e}):t.LongTake=e()}("undefined"!=typeof window?window:global,function(){var n=function(){function e(t){_classCallCheck(this,e),this.moduleBase={name:t||"No module base name.",worker:{}}}return _createClass(e,[{key:"each",value:function(t,e){if("object"===(void 0===t?"undefined":_typeof(t)))if(Array.isArray(t))for(var i=t.length,n=0;n<i;n++){if("_break"===e(t[n],n))break}else for(var a in t){if("_break"===e(t[a],a))break}else this.systemError("each","Not a object or array.",t)}},{key:"reverseEach",value:function(t,e){if(Array.isArray(t))for(var i=t.length;0<=i;i--){var n=e(t[i],i);if("_break"===n)break}else this.systemError("each","Not a array.",t)}},{key:"runWhile",value:function(t){for(var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1e4,i=0;;){var n=t(i);if("_break"===n)break;if("_continue"!==n){if(e<i)break;i++}}}},{key:"systemError",value:function(t,e,i){throw i&&(console.log("%c error object is : ","color:#FFF; background:red"),console.log(i)),new Error("(☉д⊙)!! "+this.moduleBase.name+" => "+t+" -> "+e)}}]),e}(),e=function(t){function i(t){_classCallCheck(this,i);var e=_possibleConstructorReturn(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,"RenderBuffer"));return e.main=t,e.stage=t.stage,e.width=t.width,e.height=t.height,e.canvas=document.createElement("canvas"),e.context=e.canvas.getContext("2d"),e.camera=t.camera,e.resize(t.width,t.height),e}return _inherits(i,n),_createClass(i,[{key:"resize",value:function(t,e){this.canvas.width=t,this.canvas.height=e}},{key:"draw",value:function(){this.context.clearRect(0,0,this.width,this.height),this.render(this.stage)}},{key:"render",value:function(t){if(t.canShow){this.transform(t),this.context.drawImage(t.bitmap.getRenderTarget(),Math.floor(t.screenX+this.camera.offsetX),Math.floor(t.screenY+this.camera.offsetY));for(var e=t.children.length,i=0;i<e;i++)this.render(t.children[i]);this.restore(t)}}},{key:"transform",value:function(t){var e=t.posX,i=t.posY,n=this.context;n.translate(e,i),255!==t.opacity&&(n.globalAlpha=t.opacity/255),t.blendMode&&(n.globalCompositeOperation=t.blendMode),0!==t.rotation&&n.rotate(t.rotation*t.helper.arc),1===t.scaleHeight&&1===t.scaleWidth||n.scale(t.scaleWidth,t.scaleHeight),0===t.skewX&&0===t.skewY||n.transform(1,t.skewX,t.skewY,1,0,0),n.translate(-e,-i)}},{key:"restore",value:function(t){var e=t.posX,i=t.posY,n=this.context;n.translate(e,i),255!==t.opacity&&(n.globalAlpha=1),t.blendMode&&(n.globalCompositeOperation="source-over"),0!==t.rotation&&n.rotate(-t.rotation*t.helper.arc),1===t.scaleHeight&&1===t.scaleWidth||n.scale(1/t.scaleWidth,1/t.scaleHeight),0===t.skewX&&0===t.skewY||n.transform(1,-t.skewX,-t.skewY,1,0,0),n.translate(-e,-i)}}]),i}(),a=new(function(){function t(){_classCallCheck(this,t),this.arc=Math.PI/180}return _createClass(t,[{key:"sinByDeg",value:function(t){return Math.sin(t%360*this.arc)}},{key:"cosByDeg",value:function(t){return Math.cos(t%360*this.arc)}}]),t}()),t=function(t){function e(){_classCallCheck(this,e);var t=_possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"Loader"));return t.data={},t.files={},t.fileLength=0,t.completed=0,t}return _inherits(e,n),_createClass(e,[{key:"onload",value:function(t){var e=this;this.completed>=this.fileLength?t():setTimeout(function(){e.onload(t)},100)}},{key:"start",value:function(t){var e=this;for(var i in this.files)this.data[i]=new Image,this.data[i].onload=function(){e.completed+=1,"function"==typeof t&&t(e.completed,e.fileLength),e.completed===e.fileLength&&(delete e.files,delete e.types)},this.data[i].src=this.files[i]}},{key:"add",value:function(t,e){null==this.files[t]?(this.fileLength+=1,this.files[t]=this.validateFile(e)):this.systemError("add","Name conflict.",t)}},{key:"validateFile",value:function(t){var e=t.split(".").pop();return-1!==["png","jpg"].indexOf(e)||"data:"===t.slice(0,5)?t:t instanceof Element&&t.tagName("CANVAS")?canvas.toDataURL("image/png"):void this.systemError("validateFile","File type not allowed( png, jpg, canvas element, base64url ).",t)}},{key:"get",value:function(t){if(this.data[t])return this.data[t];this.systemError("get","Data not found.",t)}}]),e}(),i=function(){function t(){_classCallCheck(this,t)}return _createClass(t,null,[{key:"linear",value:function(t,e){return t/e}},{key:"easeInQuad",value:function(t,e){return 1*(t/=e)*t+0}},{key:"easeOutQuad",value:function(t,e){return-1*(t/=e)*(t-2)}},{key:"easeInOutQuad",value:function(t,e){return(t/=e/2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},{key:"easeInCubic",value:function(t,e){return 1*(t/=e)*t*t}},{key:"easeOutCubic",value:function(t,e){return 1*((t=t/e-1)*t*t+1)}},{key:"easeInOutCubic",value:function(t,e){return(t/=e/2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},{key:"easeInQuart",value:function(t,e){return 1*(t/=e)*t*t*t}},{key:"easeOutQuart",value:function(t,e){return-1*((t=t/e-1)*t*t*t-1)}},{key:"easeInOutQuart",value:function(t,e){return(t/=e/2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},{key:"easeInQuint",value:function(t,e){return 1*(t/=e)*t*t*t*t}},{key:"easeOutQuint",value:function(t,e){return 1*((t=t/e-1)*t*t*t*t+1)}},{key:"easeInOutQuint",value:function(t,e){return(t/=e/2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)+0}},{key:"easeInSine",value:function(t,e){return-1*Math.cos(t/e*(Math.PI/2))+1}},{key:"easeOutSine",value:function(t,e){return 1*Math.sin(t/e*(Math.PI/2))}},{key:"easeInOutSine",value:function(t,e){return-.5*(Math.cos(Math.PI*t/e)-1)}},{key:"easeInExpo",value:function(t,e){return 0==t?0:1*Math.pow(2,10*(t/e-1))}},{key:"easeOutExpo",value:function(t,e){return t==e?1:1*(1-Math.pow(2,-10*t/e))}},{key:"easeInOutExpo",value:function(t,e){return 0==t?0:t==e?1:(t/=e/2)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*--t))}},{key:"easeInCirc",value:function(t,e){return-1*(Math.sqrt(1-(t/=e)*t)-1)}},{key:"easeOutCirc",value:function(t,e){return 1*Math.sqrt(1-(t=t/e-1)*t)}},{key:"easeInOutCirc",value:function(t,e){return(t/=e/2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},{key:"easeInElastic",value:function(t,e){var i=1.70158,n=0,a=1;if(0==t)return 0;if(1==(t/=e))return 1;if(n||(n=.3*e),a<1){a=1;i=n/4}else i=n/(2*Math.PI)*Math.asin(1/a);return-a*Math.pow(2,10*(t-=1))*Math.sin((t*e-i)*(2*Math.PI)/n)+0}},{key:"easeOutElastic",value:function(t,e){var i=1.70158,n=0,a=1;if(0==t)return 0;if(1==(t/=e))return 1;if(n||(n=.3*e),a<1){a=1;i=n/4}else i=n/(2*Math.PI)*Math.asin(1/a);return a*Math.pow(2,-10*t)*Math.sin((t*e-i)*(2*Math.PI)/n)+1}},{key:"easeInOutElastic",value:function(t,e){var i=1.70158,n=0,a=1;if(0==t)return 0;if(2==(t/=e/2))return 1;if(n||(n=e*(.3*1.5)),a<1){a=1;i=n/4}return t<1?a*Math.pow(2,10*(t-=1))*Math.sin((t*e-i)*(2*Math.PI)/n)*-.5:a*Math.pow(2,-10*(t-=1))*Math.sin((t*e-i)*(2*Math.PI)/n)*.5+1}},{key:"easeInBack",value:function(t,e){return 1*(t/=e)*t*(2.70158*t-1.70158)}},{key:"easeOutBack",value:function(t,e){return 1*((t=t/e-1)*t*(2.70158*t+1.70158)+1)}},{key:"easeInOutBack",value:function(t,e){var i=1.70158;return(t/=e/2)<1?t*t*((1+(i*=1.525))*t-i)*.5:.5*((t-=2)*t*((1+(i*=1.525))*t+i)+2)}},{key:"easeInBounce",value:function(t,e){return 1-this.easeOutBounce(e-t,e)}},{key:"easeOutBounce",value:function(t,e){return(t/=e)<1/2.75?7.5625*t*t*1:t<2/2.75?1*(7.5625*(t-=1.5/2.75)*t+.75)+0:t<2.5/2.75?1*(7.5625*(t-=2.25/2.75)*t+.9375)+0:1*(7.5625*(t-=2.625/2.75)*t+.984375)}},{key:"easeInOutBounce",value:function(t,e){return t<e/2?.5*this.easeInBounce(2*t,e):.5*this.easeOutBounce(2*t-e,e)+.5}}]),t}(),s=function(t){function a(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:100,e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:100,i=arguments[2];_classCallCheck(this,a);var n=_possibleConstructorReturn(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,"Bitmap"));return n.canvas=i||document.createElement("canvas"),n.context=n.canvas.getContext("2d"),n.transform=!0,n.cache=!1,n.imgData=null,(n.imgBitmap=null)==i&&n.resize(t,e),n}return _inherits(a,n),_createClass(a,[{key:"getRenderTarget",value:function(){return this.imgBitmap?this.imgBitmap:(0==this.cache||this.cacheImgBitmap(),this.canvas)}},{key:"resize",value:function(t,e){this.width=t||this.width,this.height=e||this.height}},{key:"clear",value:function(){this.context.clearRect(0,0,this.width,this.height)}},{key:"draw",value:function(t,e,i){this.context.drawImage(t.getRenderTarget(),Math.floor(e),Math.floor(i))}},{key:"cacheImgBitmap",value:function(){var t=this,e=new Image;e.onload=function(){t.imgBitmap=e},e.src=this.canvas.toDataURL()}},{key:"clearCache",value:function(){this.imgData=null,this.imgBitmap=null}},{key:"getPixel",value:function(t,e){var i=this.getImageData(),n=t*(4*i.width)+4*e;return[i.data[n],i.data[n+1],i.data[n+2],i.data[n+3]]}},{key:"getImageData",value:function(){return null==this.imgData&&(this.imgData=this.context.getImageData(0,0,this.width,this.height)),this.imgData}},{key:"putImageData",value:function(t){this.clear(),this.context.putImageData(t,0,0)}},{key:"width",get:function(){return this.canvas.width},set:function(t){this.canvas.width=t}},{key:"height",get:function(){return this.canvas.height},set:function(t){this.canvas.height=t}}],[{key:"isBitmap",value:function(t){return t instanceof this}}]),a}(),r=function(t){function a(t,e,i){_classCallCheck(this,a);var n=_possibleConstructorReturn(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,"Main"));return n.width=e,n.height=i,n.ticker=0,n.target=t,n.targetRect=n.target.getBoundingClientRect(),n.framePerSecond=60,n.stopOfAboveWindow=!0,n.baseFps=0,n.remove=!1,n.bindUpdate=n.update.bind(n),n.initStage(),n.initCamera(),n.initBitmap(),n.initEvent(),window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)},n.update(),n}return _inherits(a,n),_createClass(a,[{key:"close",value:function(){this.remove=!0,this.target=null,this.stage.eachChildrenDeep(function(t){t.close()}),this.stage=null}},{key:"initBitmap",value:function(){this.target instanceof Element&&"CANVAS"===this.target.tagName?(this.target.style.touchAction="pan-y",this.bitmap=this.target.getContext("2d"),this.bitmap.globalCompositeOperation="copy",this.buffer=new e(this)):this.systemError("initBitmap","Object not a cavnas.",this.target)}},{key:"register",value:function(t){var e=this;this.each(t.event,function(t){null==e.event[t.event]&&e.addEvent(t.event)})}},{key:"setFPS",value:function(t){"number"==typeof t&&0<t&&t<=60?this.framePerSecond=t:this.systemError("setFPS","FPS must between 1 to 60.",t)}},{key:"getVisibility",value:function(t){var e=document.body.clientWidth;return e<600?"xs"===t:600<=e&&e<960?-1!==["sm","xs"].indexOf(t):960<=e&&e<1264?-1!==["sm","xs","md"].indexOf(t):1264<=e&&e<1904?-1!==["sm","xs","md","lg"].indexOf(t):1904<=e&&-1!==["sm","xs","md","lg","xl"].indexOf(t)}},{key:"getEasing",value:function(t){if(i[t]&&"constructor"!==t)return i[t];this.systemError("getEasing","Name not found.",t)}},{key:"initCamera",value:function(){this.camera={sprite:null,offsetX:0,offsetY:0}}},{key:"follow",value:function(t){h.isSprite(t)?this.camera.sprite=t:this.systemError("follow","Object not a sprite",t)}},{key:"unFollow",value:function(){this.camera.sprite=null,this.camera.offsetX=0,this.camera.offsetY=0}},{key:"updateCamera",value:function(){if(this.camera.sprite&&this.camera.sprite.main){var t=this.camera.sprite,e=t.screenX+t.width*t.anchorX,i=t.screenY+t.height*t.anchorY;this.camera.offsetX=this.updateCameraOfSide(e,this.targetRect.width,this.width),this.camera.offsetY=this.updateCameraOfSide(i,this.targetRect.height,this.height)}}},{key:"updateCameraOfSide",value:function(t,e,i){var n=e/2;return t<n?0:i-n<t?0-i+e:0-t+n}},{key:"initEvent",value:function(){this.event={},this.globalEvent={},this.eventAction={},this.pointerX=0,this.pointerY=0,this.addEvent("resize",this.targetResize),this.addEvent("pointermove",this.pointerMove),this.targetResize()}},{key:"addEvent",value:function(e,i,t){var n=this;null==this.event[e]&&(this.event[e]=function(t){null==n.eventAction[e]&&(n.eventAction[e]=t,i&&i.bind(n)(t))},this.target.addEventListener(e,this.event[e]))}},{key:"pointerMove",value:function(t){this.pointerX=(t.offsetX-this.camera.offsetX*this.targetRect.width/this.target.width)*this.target.width/this.targetRect.width,this.pointerY=(t.offsetY-this.camera.offsetY*this.targetRect.height/this.target.height)*this.target.height/this.targetRect.height}},{key:"targetResize",value:function(){this.targetRect=this.target.getBoundingClientRect(),this.buffer.resize(this.target.width,this.target.height),this.bitmap.globalCompositeOperation="copy"}},{key:"responsiveResize",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:1,e=this.target.parentElement.clientWidth*t,i=e/this.target.width*t;e<this.target.width&&(this.target.height*=i,this.target.width=e),this.stage.scale(i),this.targetResize()}},{key:"initStage",value:function(){this.stage=new h("Stage"),this.stage.install(this),this.stage.resize(this.width,this.height)}},{key:"update",value:function(){1==this.remove&&window.cancelAnimationFrame(this.ticker),this.baseFps+=this.framePerSecond,(!1===this.stopOfAboveWindow||window.pageYOffset<this.target.offsetTop+this.targetRect.height||window.pageYOffset+document.body.scrollHeight>this.target.offsetTop)&&(this.stageUpdate(),60<=this.baseFps&&(this.asyncRefresh=!0,this.bitmapUpdate(),this.baseFps=this.baseFps%60),this.eventAction={}),this.ticker=window.requestAnimationFrame(this.bindUpdate)}},{key:"stageUpdate",value:function(){this.stage.mainEvent(),this.stage.mainUpdate()}},{key:"bitmapUpdate",value:function(){this.camera.sprite&&this.updateCamera(),this.stage.mainRender(),this.buffer.draw(),this.bitmap.drawImage(this.buffer.canvas,0,0)}}]),a}(),o=function(t){function o(t,e,i,n,a,s){_classCallCheck(this,o);var r=_possibleConstructorReturn(this,(o.__proto__||Object.getPrototypeOf(o)).call(this,"Animate"));return r.sprite=t,r.checkSprite(),r.validate({time:[e,0],duration:[i,0],easing:[n,"linear"],alternate:[a,!1],action:[s,function(){}]}),r.over=!1,r.reverse=!1,r.actionEasing=r.sprite.main.getEasing(r.easing),r.pace=1e3/r.sprite.main.framePerSecond,r}return _inherits(o,n),_createClass(o,[{key:"checkSprite",value:function(){h.isSprite(this.sprite)?null==this.sprite.main&&this.systemError("checkSprite","Sprite not install. Call Animate in the create please.",this.sprite):this.systemError("checkSprite","Sprite not a Sprite module",this.sprite)}},{key:"validate",value:function(t){for(var e in t){var i=t[e][0],n=t[e][1];i?(void 0===i?"undefined":_typeof(i))===(void 0===n?"undefined":_typeof(n))?this[e]=i:this.systemError("validated","Type error",i):this[e]=n}}},{key:"move",value:function(){if(!1!==this.over)return 1;var t=this.actionEasing(this.time+=this.reverse?-this.pace:this.pace,this.duration);return this.action(t),this.alternate?this.time>=this.duration?this.reverse=!0:this.reverse&&this.time<=0&&(this.reverse=!1):this.time>=this.duration&&(this.over=!0),t}},{key:"restart",value:function(){this.time=0,this.over=!1}}]),o}(),h=function(t){function i(t){_classCallCheck(this,i);var e=_possibleConstructorReturn(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,t||"Sprite"));return e.name=t||"No name",e.main=null,e.helper=a,e.initEvent(),e.initRender(),e.initStatus(),e.initBitmap(),e.initFamily(),e.initPosition(),e.initContainer(),e}return _inherits(i,n),_createClass(i,[{key:"eachChildren",value:function(t){for(var e=this.children.length,i=0;i<e;i++)t(this.children[i])}},{key:"eachChildrenDeep",value:function(i){!function e(t){t.eachChildren(function(t){i(t),e(t)})}(this)}},{key:"super",value:function(t){var e;this.__proto__[t]?(e=this.__proto__[t]).call.apply(e,[this].concat(_toConsumableArray([].concat(Array.prototype.slice.call(arguments)).slice(1)))):this.systemError("super","Prototype not found.",t)}},{key:"install",value:function(t){this.main=t,this.main.register(this),this.create()}},{key:"create",value:function(){}},{key:"initBitmap",value:function(){var t=this.parent||{};this.bitmap=new s(t.width||100,t.height||100),this.context=this.bitmap.context}},{key:"resize",value:function(t,e){"object"===(void 0===t?"undefined":_typeof(t))?t.width&&t.height?this.bitmap.resize(t.width,t.height):this.systemError("resize","Object must have width and height.",t):this.bitmap.resize(t,e)}},{key:"initFamily",value:function(){this.parent=null,this.children=[]}},{key:"addChildren",value:function(t){i.isSprite(t)?null==t.parent?((t.parent=this).children.push(t),this.sortChildren()):this.systemError("addChildren","Sprite have parent.",t):this.systemError("addChildren","Object not a sprite",t)}},{key:"sortChildren",value:function(){var e=[],i=[];this.eachChildren(function(t){null==i[t.z]&&(i[t.z]=[]),i[t.z].push(t)}),this.each(i,function(t){Array.isArray(t)&&(e=e.concat(t))}),this.children=e}},{key:"initEvent",value:function(){this.event={}}},{key:"on",value:function(t,e,i){null==this.event[t]?(this.main&&this.main.addEvent(e),this.event[t]={event:e,callback:i}):this.systemError("on","Event name("+t+") conflict.")}},{key:"unon",value:function(t){this.event[t]=null}},{key:"mainEvent",value:function(){var t=this;null==this.main&&this.install(this.parent.main),this.each(this.main.eventAction,function(e,i){t.each(t.event,function(t){t.event===i&&t.callback(e)})}),this.eachChildren(function(t){t.mainEvent()})}},{key:"initContainer",value:function(){this.container={skewX:0,skewY:0,scaleWidth:1,scaleHeight:1,rotation:0,opacity:255}}},{key:"scale",value:function(t,e){this.scaleWidth=t,this.scaleHeight=e||t}},{key:"initPosition",value:function(){this.position={x:0,y:0,z:0,anchorX:0,anchorY:0}}},{key:"setAnchor",value:function(t,e){this.anchorX=t,this.anchorY=e||t}},{key:"initStatus",value:function(){this.status={sort:!1,cache:!1,remove:!1,hidden:!1,realSize:null,childrenDead:!1}}},{key:"cache",value:function(){this.status.cache=!0,this.bitmap.cache=!0}},{key:"unCache",value:function(){this.status.cache=!1,this.bitmap.cache=!1}},{key:"hidden",value:function(t){this.status.hidden=!t||!!t}},{key:"unHidden",value:function(){this.status.hidden=!1}},{key:"getRealSize",value:function(){if(null==this.status.realSize){var t=this.width+this.skewY*this.height,e=this.height+this.skewX*this.width,i=Math.abs(this.helper.sinByDeg(this.rotation)),n=Math.abs(this.helper.cosByDeg(this.rotation));this.status.realSize={width:(t*n+e*i)*this.screenScaleWidth,height:(e*n+t*i)*this.screenScaleWidth}}return this.status.realSize}},{key:"getRealPosition",value:function(){return{x:this.screenX*this.parent==null?1:this.parent.scaleWidth,y:this.screenY*this.parent==null?1:this.parent.scaleHeight}}},{key:"update",value:function(){}},{key:"mainUpdate",value:function(){this.status.readSize=null,this.status.sort&&(this.status.sort=!1,this.sortChildren()),this.update(),this.eachChildren(this.updateForChild),this.childrenDead&&(this.childrenDead=!1,this.children=this.children.filter(function(t){return t.status.remove&&t.close(),!c.status.remove}))}},{key:"updateForChild",value:function(t){0==t.status.remove?t.mainUpdate():this.childrenDead=!0}},{key:"close",value:function(){this.id=-1,this.parent=null}},{key:"remove",value:function(){this.status.remove=!0}},{key:"removeChild",value:function(t){i.isSprite(t)?t.parent===this?t.remove():this.systemError("removeChild","Have'n this sprite",t):this.systemError("removeChild","Not a sprite",t)}},{key:"clearChildren",value:function(){var e=this;this.eachChildren(function(t){e.removeChild(t)})}},{key:"removeChildrenByName",value:function(e){var i=this;this.eachChildren(function(t){t.name===e&&i.removeChild(t)})}},{key:"removeChildrenByIndex",value:function(t){"number"==typeof t&&this.children[t]&&this.children[t].remove()}},{key:"initRender",value:function(){this.filter}},{key:"render",value:function(){}},{key:"mainRender",value:function(){this.eachChildren(this.renderForChild),this.canRender&&(this.context.save(),this.render(),this.context.restore(),this.renderFilter(this.filter),this.context.restore(),this.bitmap.clearCache())}},{key:"renderForChild",value:function(t){t.mainRender()}},{key:"renderFilter",value:function(e){if(e){var t=this.bitmap.getImageData();e(t),this.bitmap.putImageData(t),this.eachChildren(function(t){t.renderFilter(e)})}}},{key:"drawImage",value:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,n=this.main.getImageByName(t);this.context.drawImage(n,e,i)}},{key:"resizeFromImage",value:function(t){var e=this.main.getImageByName(t);this.resize(e.width,e.height)}},{key:"resizeMax",value:function(){this.main?this.resize(this.main.width,this.main.height):this.systemError("resizeMax","Function call must in the create or update.")}},{key:"inRect",value:function(t,e){var i=this.getRealSize(),n=this.getRealPosition();return t>=n.x&&t<=n.x+i.width&&e>=n.y&&e<=n.y+i.height}},{key:"width",get:function(){return this.bitmap.width}},{key:"height",get:function(){return this.bitmap.height}},{key:"scaleWidth",get:function(){return this.container.scaleWidth},set:function(t){this.container.scaleWidth=t}},{key:"scaleHeight",get:function(){return this.container.scaleHeight},set:function(t){this.container.scaleHeight=t}},{key:"screenScaleWidth",get:function(){return null===this.parent?this.scaleWidth:this.scaleWidth*this.parent.scaleWidth}},{key:"screenScaleHeight",get:function(){return null===this.parent?this.scaleHeight:this.scaleHeight*this.parent.screenScaleHeight}},{key:"rotation",get:function(){return this.container.rotation},set:function(t){this.container.rotation=t%360}},{key:"blendMode",get:function(){return this.container.blendMode},set:function(t){this.container.blendMode=t}},{key:"opacity",get:function(){return this.container.opacity},set:function(t){t<=0&&(t=0),255<=t&&(t=255),this.container.opacity=t}},{key:"skewX",get:function(){return this.container.skewX},set:function(t){this.container.skewX=t}},{key:"skewY",get:function(){return this.container.skewY},set:function(t){this.container.skewY=t}},{key:"x",get:function(){return this.position.x},set:function(t){"number"==typeof t&&(this.position.x=t||0)}},{key:"y",get:function(){return this.position.y},set:function(t){"number"==typeof t&&(this.position.y=t||0)}},{key:"z",get:function(){return this.position.z},set:function(t){"number"==typeof t&&(this.position.z=t,this.parent&&(this.parent.status.sort=!0))}},{key:"screenX",get:function(){return(this.parent?this.parent.screenX+this.parent.width*this.parent.anchorX:0)+this.x-this.width*this.anchorX}},{key:"screenY",get:function(){return(this.parent?this.parent.screenY+this.parent.height*this.parent.anchorY:0)+this.y-this.height*this.anchorY}},{key:"posX",get:function(){return this.screenX+this.width*this.anchorX}},{key:"posY",get:function(){return this.screenY+this.height*this.anchorY}},{key:"anchorX",get:function(){return this.position.anchorX},set:function(t){this.position.anchorX=t}},{key:"anchorY",get:function(){return this.position.anchorY},set:function(t){this.position.anchorY=t}},{key:"canRender",get:function(){return!this.status.cache}},{key:"canShow",get:function(){return!this.status.hidden}}],[{key:"isSprite",value:function(t){return t instanceof this}}]),i}(),u=r;return u.Sprite=h,u.Bitmap=s,u.Loader=t,u.Animate=o,u});