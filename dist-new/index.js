!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.LongTake=e():t.LongTake=e()}(this||("undefined"!=typeof window?window:global),(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist-new/",n(n.s=6)}([function(t,e,n){"use strict";var r,i=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__values||function(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(e,"__esModule",{value:!0}),e.Event=e.Base=void 0;var a=function(){function t(t){this.moduleBase={name:"No module base name."},t&&(this.moduleBase.name=t)}return t.prototype.each=function(t,e){if("object"==typeof t)if(Array.isArray(t))for(var n=t.length,r=0;r<n;r++){if("_break"===e(t[r],r))break}else for(var i in t){if("_break"===e(t[i],i))break}else this.systemError("each","Not a object or array.",t)},t.prototype.systemError=function(t,e,n){throw n&&(console.log("%c error object is : ","color:#FFF; background:red"),console.log(n)),new Error("(☉д⊙)!! "+this.moduleBase.name+" => "+t+" -> "+e)},t}();e.Base=a;var s=function(){function t(t,e,n){this.id=Date.now().toString()+Math.floor(1e6*Math.random()),this.state={},this.manager=t,this.channel=e,this.callback=n}return t.prototype.invoke=function(t){var e=this;this.callback(t,{id:this.id,off:function(){return e.off()},state:this.state})},t.prototype.off=function(){this.manager.off(this.channel,this.id)},t}(),c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.listeners=new Map,e}return i(e,t),e.prototype.getChannelListenerSize=function(t){var e=this.listeners.get(t);return e?e.length:0},e.prototype.emit=function(t,e){var n,r,i=this.listeners.get(t);if(i)try{for(var a=o(i),s=a.next();!s.done;s=a.next()){s.value.invoke(e)}}catch(t){n={error:t}}finally{try{s&&!s.done&&(r=a.return)&&r.call(a)}finally{if(n)throw n.error}}},e.prototype.off=function(t,e){var n=t,r=this.listeners.get(n);r&&this.listeners.set(n,r.filter((function(t){return t.id!==e})))},e.prototype.on=function(t,e){var n=t,r=new s(this,n,e);return!1===this.listeners.has(n)&&this.listeners.set(n,[]),this.listeners.get(n).unshift(r),r},e}(a);e.Event=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.helper=void 0;for(var r=Math.PI/180,i=180/Math.PI,o={},a=-360;a<360;a++)o[a]={sin:Math.sin(a*r),cos:Math.cos(a*r)};e.helper={arc:r,rarc:i,ifEmpty:function(t,e){return null!=t?t:e},sinByRad:function(t){return o[Math.round(t)]?o[Math.round(t)].sin:Math.sin(t*r)},cosByRad:function(t){return o[Math.round(t)]?o[Math.round(t)].cos:Math.cos(t*r)},getVector:function(t,n){return{x:n*e.helper.cosByRad(t),y:n*e.helper.sinByRad(t)}},randInt:function(t,e){return Math.floor(Math.random()*(e-t+1)+t)},getAngle:function(t,e,n,r){if(t===n&&e===r)return 0;var o=Math.atan2(r-e,n-t)*i;return o>0?o:360+o},getVisibility:function(){var t=window.screen.availWidth;return t<600?"xs":t>=600&&t<960?"sm":t>=960&&t<1264?"md":t>=1264&&t<1904?"lg":"xl"},getRandomColor:function(){for(var t="#",e=0;e<6;e++)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}}},function(t,e,n){"use strict";var r,i=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.TextSprite=e.ImageSprite=e.Sprite=void 0;var o=n(0),a=n(1),s=n(5),c=function(t){function e(){var e=t.call(this,"Sprite")||this;return e.parent=null,e._bitmap=new s.Bitmap(100,100),e._main=null,e._children=[],e._status={sort:!1,cache:!1,inited:!1,remove:!1,hidden:!1,antiAliasing:!0,childrenDead:!1},e._transform={skewX:0,skewY:0,scaleWidth:1,scaleHeight:1,rotation:0,opacity:255,blendMode:"inherit"},e._position={x:0,y:0,z:0,screenX:0,screenY:0,anchorX:0,anchorY:0},e.bindUpdateForChild=e.updateForChild.bind(e),e.bindUpdateForChild=e.updateForChild.bind(e),e}return i(e,t),Object.defineProperty(e.prototype,"context",{get:function(){return this._bitmap.context},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"helper",{get:function(){return a.helper},enumerable:!1,configurable:!0}),e.isSprite=function(t){return t instanceof this},e.prototype._onClick=function(t,e){var n=this,r=!1;this.eachChildren((function(i){var o=i.on("click",(function(){!1===r&&(r=!0,n.emit("click",{}))}));i._onClick(t,e),o.off()})),!1===r&&this.getChannelListenerSize("click")&&this.inRect(t,e)&&this.emit("click",{})},e.prototype.eachChildren=function(t){for(var e=this._children.length,n=0;n<e;n++)t(this._children[n])},e.prototype.eachChildrenDeep=function(t){var e=function(n){n.eachChildren((function(n){t(n),e(n)}))};e(this)},e.prototype._install=function(t){null==this._main?(this._main=t,this.create(this)):this.systemError("install","sprite already installed",this)},e.prototype.create=function(t){},Object.defineProperty(e.prototype,"width",{get:function(){return this._bitmap.width},set:function(t){this._bitmap.width=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this._bitmap.height},set:function(t){this._bitmap.height=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"antiAliasing",{get:function(){return this._status.antiAliasing},set:function(t){this._status.antiAliasing=t},enumerable:!1,configurable:!0}),e.prototype.resize=function(t,e){"object"==typeof t?null!=t.width&&null!=t.height?this._bitmap.resize(t.width,t.height):this.systemError("resize","Object must have width and height.",t):this._bitmap.resize(t,e||this.height)},e.prototype.addChildren=function(t){e.isSprite(t)?null==t.parent?(t.parent=this,this._children.push(t),this._sortChildren()):this.systemError("addChildren","Sprite have parent.",t):this.systemError("addChildren","Object not a sprite",t)},e.prototype._sortChildren=function(){var t=[],e=[];this.eachChildren((function(t){null==e[t.z]&&(e[t.z]=[]),e[t.z].push(t)})),this.each(e,(function(e){Array.isArray(e)&&(t=t.concat(e))})),this._children=t},e.prototype.isTransform=function(){var t=this._transform;return!(0===t.skewX&&0===t.skewY&&1===t.scaleWidth&&1===t.scaleHeight&&0===t.rotation)},e.prototype.scale=function(t,e){this.scaleWidth=t,this.scaleHeight=null==e?t:e},Object.defineProperty(e.prototype,"scaleWidth",{get:function(){return this._transform.scaleWidth},set:function(t){this._transform.scaleWidth=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"scaleHeight",{get:function(){return this._transform.scaleHeight},set:function(t){this._transform.scaleHeight=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"screenScaleWidth",{get:function(){return null==this.parent?this.scaleWidth:this.scaleWidth*this.parent.screenScaleWidth},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"screenScaleHeight",{get:function(){return null==this.parent?this.scaleHeight:this.scaleHeight*this.parent.screenScaleHeight},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"rotation",{get:function(){return this._transform.rotation},set:function(t){this._transform.rotation=t%360},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"blendMode",{get:function(){return this.parent&&"inherit"===this._transform.blendMode?this.parent._transform.blendMode:this._transform.blendMode},set:function(t){this._transform.blendMode=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"opacity",{get:function(){return this._transform.opacity},set:function(t){t<=0&&(t=0),t>=255&&(t=255),this._transform.opacity=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"skewX",{get:function(){return this._transform.skewX},set:function(t){this._transform.skewX=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"skewY",{get:function(){return this._transform.skewY},set:function(t){this._transform.skewY=t},enumerable:!1,configurable:!0}),e.prototype.setAnchor=function(t,e){this.anchorX=t,this.anchorY=null==e?t:e},Object.defineProperty(e.prototype,"x",{get:function(){return this._position.x},set:function(t){"number"==typeof t&&(this._position.x=t||0)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"y",{get:function(){return this._position.y},set:function(t){"number"==typeof t&&(this._position.y=t||0)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"z",{get:function(){return this._position.z},set:function(t){"number"==typeof t&&(this._position.z=t,this.parent&&(this.parent._status.sort=!0))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"screenX",{get:function(){return(this.parent?this.parent.screenX+this.parent.width*this.parent.anchorX:0)+this.x-this.width*this.anchorX},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"screenY",{get:function(){return(this.parent?this.parent.screenY+this.parent.height*this.parent.anchorY:0)+this.y-this.height*this.anchorY},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"posX",{get:function(){return this.screenX+this.width*this.anchorX},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"posY",{get:function(){return this.screenY+this.height*this.anchorY},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"anchorX",{get:function(){return this._position.anchorX},set:function(t){this._position.anchorX=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"anchorY",{get:function(){return this._position.anchorY},set:function(t){this._position.anchorY=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"canRender",{get:function(){return!this._status.cache},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"canShow",{get:function(){return!this._status.hidden},enumerable:!1,configurable:!0}),e.prototype.cache=function(){this._status.cache=!0,this._bitmap.cache=!0},e.prototype.unCache=function(){this._status.cache=!1,this._bitmap.cache=!1},e.prototype.hidden=function(){this._status.hidden=!0},e.prototype.unHidden=function(){this._status.hidden=!1},e.prototype.getRealSize=function(){var t=this.width+this.skewY*this.height,e=this.height+this.skewX*this.width,n=Math.abs(this.helper.sinByRad(this.rotation)),r=Math.abs(this.helper.cosByRad(this.rotation));return{width:(t*r+e*n)*this.screenScaleWidth,height:(e*r+t*n)*this.screenScaleHeight}},e.prototype.getRealPosition=function(){return{x:this.screenX*(null==this.parent?1:this.parent.screenScaleWidth),y:this.screenY*(null==this.parent?1:this.parent.screenScaleHeight)}},e.prototype.update=function(t){},e.prototype._mainUpdate=function(){if(null==this._main&&this.parent&&this.parent._main&&this._install(this.parent._main),this._status.sort&&(this._status.sort=!1,this._sortChildren()),this.update(this),this.eachChildren(this.bindUpdateForChild),this._status.childrenDead){var t=[];this._status.childrenDead=!1,this._children=this._children.filter((function(e){return e._status.remove&&(e._close(),t.push(e)),!e._status.remove})),t.forEach((function(t){return t.emit("remove",{})}))}},e.prototype.updateForChild=function(t){!1===t._status.remove?t._mainUpdate():this._status.childrenDead=!0},e.prototype._close=function(){this._main=null,this.parent=null},e.prototype.remove=function(){this._status.remove=!0},e.prototype.removeChild=function(t){e.isSprite(t)?t.parent===this?t.remove():this.systemError("removeChild","Have'n this sprite",t):this.systemError("removeChild","Not a sprite",t)},e.prototype.clearChildren=function(){var t=this;this.eachChildren((function(e){t.removeChild(e)}))},e.prototype.removeChildrenByIndex=function(t){"number"==typeof t&&this._children[t]&&this._children[t].remove()},e.prototype.render=function(t){},e.prototype._mainRender=function(){this.eachChildren(this.renderForChild),this.canRender&&(this.render(this),this._bitmap.clearCache()),!1===this._status.inited&&this.emit("inited",{})},e.prototype.renderForChild=function(t){t._mainRender()},e.prototype.inRect=function(t,e){var n=this.getRealSize(),r=this.getRealPosition();return t>=r.x&&t<=r.x+n.width&&e>=r.y&&e<=r.y+n.height},e}(o.Event);e.Sprite=c;var u=function(t){function e(e){var n=t.call(this)||this;return n.render=null,n.on("inited",(function(){return n.cache()})),n.resize(e),n.render=function(){n.context.drawImage(e,0,0)},n}return i(e,t),e}(c);e.ImageSprite=u;var h=function(t){function e(e){void 0===e&&(e={});var n=t.call(this)||this;return n.text="",n.trim={top:0,left:0,width:0,height:0},n.render=null,n.antiAliasing=!1,n.options={color:n.helper.ifEmpty(e.color,"#000"),padding:n.helper.ifEmpty(e.padding,0),fontSize:n.helper.ifEmpty(e.fontSize,18),fontFamily:n.helper.ifEmpty(e.fontFamily,"Arial"),backgroundColor:n.helper.ifEmpty(e.backgroundColor,null)},n.render=function(){n.context.clearRect(0,0,n.width,n.height),n.options.backgroundColor&&(n.context.fillStyle=n.options.backgroundColor,n.context.fillRect(0,0,n.width,n.height));var t=-1*n.trim.left+n.options.padding,e=n.trim.top/2*-1+n.options.padding;n.drawText(n.context,t,e),n.cache()},n}return i(e,t),e.prototype.drawText=function(t,e,n){t.textBaseline="top",t.font=this.options.fontSize+"px "+this.options.fontFamily,t.fillStyle=this.options.color,t.fillText(this.text||"",Math.round(e)+.5,Math.round(n)+.5)},e.prototype.getByteLength=function(t){for(var e=t.length,n=t.length-1;n>=0;n--){var r=t.charCodeAt(n);r>127&&r<=2047?e++:r>2047&&r<=65535&&(e+=2),r>=56320&&r<=57343&&n--}return e},e.prototype.setContent=function(t){var e=this.options.fontSize+14,n=2*this.options.padding,r=new s.Bitmap(e*this.getByteLength(t),e);this.text=t,this.drawText(r.context,0,4),this.trim=r.getTrimSize(),this.resize(this.trim.width+n,this.trim.height+n),this.unCache()},e}(c);e.TextSprite=h},function(t,e,n){"use strict";var r,i=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.Loader=void 0;var o=function(t){function e(){var e=t.call(this,"Loader")||this;return e.data={},e.files={},e.completed=0,e.fileLength=0,e.isStart=!1,e}return i(e,t),e.prototype.validateFile=function(t){if("string"==typeof t){var e=t.split(".").pop();if(e&&(-1!==["png","jpg"].indexOf(e)||"data:"===t.slice(0,5)))return t}else if(t instanceof Element&&"CANVAS"===t.tagName)return t.toDataURL("image/png");throw this.systemError("validateFile","File type not allowed( png, jpg, canvas element, base64url ).",t)},e.prototype.onload=function(t){var e=this;this.completed>=this.fileLength?t():setTimeout((function(){return e.onload(t)}),100)},e.prototype.start=function(t){var e=this;if(this.isStart)return null;this.isStart=!0;var n=function(n){var i=new Image;i.onload=function(){window.createImageBitmap?window.createImageBitmap(i).then((function(t){e.data[n]=t})):e.data[n]=i,e.completed+=1,"function"==typeof t&&t(e.completed,e.fileLength),e.completed===e.fileLength&&(e.files={})},i.src=r.files[n]},r=this;for(var i in this.files)n(i)},e.prototype.add=function(t,e){null==this.files[t]?(this.fileLength+=1,this.files[t]=this.validateFile(e)):this.systemError("add","Name conflict.",t)},e.prototype.get=function(t){if(this.data[t])return this.data[t];this.systemError("get","Data not found.",t)},e.prototype.remove=function(t){this.data[t]&&delete this.data[t]},e.prototype.clear=function(){var t=this;this.each(this.data,(function(e,n){return t.remove(n)}))},e}(n(0).Base);e.Loader=o},function(t,e,n){"use strict";var r,i=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.Animate=void 0;var o=n(0),a=n(1),s=n(7),c=function(t){function e(e){var n=t.call(this,"Animate")||this;return n.over=!1,n.time=0,n.options={push:a.helper.ifEmpty(e.push,60),begin:a.helper.ifEmpty(e.begin,0),duration:a.helper.ifEmpty(e.duration,1),easing:a.helper.ifEmpty(e.easing,"linear"),alternate:a.helper.ifEmpty(e.alternate,!1),reverse:a.helper.ifEmpty(e.reverse,!1),action:a.helper.ifEmpty(e.action,(function(){return null}))},n.over=!1,n.actionEasing=s.easings[n.options.easing],n.pace=1e3/n.options.push,n.time=n.options.begin,n}return i(e,t),e.prototype.move=function(){var t=this.options,e=t.push,n=t.reverse,r=t.duration,i=t.action,o=t.alternate,a=1e3/e;if(!1===this.over){this.time+=n?-a:a;var s=this.actionEasing(this.time,r);return i(s),o?this.time>=r?this.options.reverse=!0:n&&this.time<=0&&(this.options.reverse=!1):(n&&this.time<=0||this.time>=r)&&(this.over=!0),s}return 1},e.prototype.restart=function(){this.time=this.options.reverse?this.options.duration:0,this.over=!1},e}(o.Base);e.Animate=c},function(t,e,n){"use strict";var r,i=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.Bitmap=void 0;var o=function(t){function e(e,n,r){void 0===e&&(e=100),void 0===n&&(n=100);var i=t.call(this,"Bitmap")||this;return i.cache=!1,i.imgBitmap=null,i._width=0,i._height=0,i.canvas=r||document.createElement("canvas"),i.context=i.canvas.getContext("2d"),i.imgBitmap=null,i._width=i.canvas.width,i._height=i.canvas.height,null==r&&i.resize(e,n),i}return i(e,t),e.isBitmap=function(t){return t instanceof this},Object.defineProperty(e.prototype,"width",{get:function(){return this._width},set:function(t){this._width=t,this.canvas.width=t||1},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this._height},set:function(t){this._height=t,this.canvas.height=t||1},enumerable:!1,configurable:!0}),e.prototype.getRenderTarget=function(){return this.imgBitmap&&!0===this.cache?this.imgBitmap:(!1===this.cache||this.cacheImageBitmap(),this.canvas)},e.prototype.resize=function(t,e){this.width=null!=t?Math.floor(t)||1:this.width,this.height=null!=e?Math.floor(e)||1:this.height},e.prototype.clear=function(){this.context.clearRect(0,0,this.width,this.height)},e.prototype.cacheImageBitmap=function(){var t=this;if(void 0!==window.createImageBitmap)createImageBitmap(this.canvas).then((function(e){t.imgBitmap=e}));else{var e=new Image;e.onload=function(){t.imgBitmap=e},e.src=this.canvas.toDataURL()}},e.prototype.clearCache=function(){this.imgBitmap=null},e.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)},e.prototype.getTrimSize=function(){for(var t=this.getImageData(),e=t.data,n=t.width,r={top:null,left:null,right:null,bottom:null},i=0;i<e.length;i+=4)if(0!==e[i+3]){var o=i/4%n,a=~~(i/4/n);null==r.top&&(r.top=a),(null==r.left||o<r.left)&&(r.left=o),(null==r.right||r.right<o)&&(r.right=o),(null==r.bottom||r.bottom<a)&&(r.bottom=a)}var s=r.bottom-r.top,c=r.right-r.left;return{top:r.top,left:r.left,width:c,height:s}},e}(n(0).Base);e.Bitmap=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ImageSprite=e.TextSprite=e.LongTake=e.Animate=e.Loader=e.Sprite=e.helper=void 0;var r=n(1),i=n(3),o=n(4),a=n(8),s=n(2);e.helper=r.helper,e.Sprite=s.Sprite,e.Loader=i.Loader,e.Animate=o.Animate,e.LongTake=a.LongTake,e.TextSprite=s.TextSprite,e.ImageSprite=s.ImageSprite,t.exports=e.LongTake,t.exports.LongTake=e.LongTake,e.default=e.LongTake},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.easings=void 0,e.easings={linear:function(t,e){return t/e},easeInQuad:function(t,e){return 1*(t/=e)*t},easeOutQuad:function(t,e){return-1*(t/=e)*(t-2)},easeInOutQuad:function(t,e){return(t/=e/2)<1?.5*t*t:-.5*(--t*(t-2)-1)},easeInCubic:function(t,e){return 1*(t/=e)*t*t},easeOutCubic:function(t,e){return 1*((t=t/e-1)*t*t+1)},easeInOutCubic:function(t,e){return(t/=e/2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t,e){return 1*(t/=e)*t*t*t},easeOutQuart:function(t,e){return-1*((t=t/e-1)*t*t*t-1)},easeInOutQuart:function(t,e){return(t/=e/2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},easeInQuint:function(t,e){return 1*(t/=e)*t*t*t*t},easeOutQuint:function(t,e){return 1*((t=t/e-1)*t*t*t*t+1)},easeInOutQuint:function(t,e){return(t/=e/2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t,e){return-1*Math.cos(t/e*(Math.PI/2))+1},easeOutSine:function(t,e){return 1*Math.sin(t/e*(Math.PI/2))},easeInOutSine:function(t,e){return-.5*(Math.cos(Math.PI*t/e)-1)},easeInExpo:function(t,e){return 0===t?0:1*Math.pow(2,10*(t/e-1))},easeOutExpo:function(t,e){return t===e?1:1*(1-Math.pow(2,-10*t/e))},easeInOutExpo:function(t,e){return 0===t?0:t===e?1:(t/=e/2)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*--t))},easeInCirc:function(t,e){return-1*(Math.sqrt(1-(t/=e)*t)-1)},easeOutCirc:function(t,e){return 1*Math.sqrt(1-(t=t/e-1)*t)},easeInOutCirc:function(t,e){return(t/=e/2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t,e){var n=1.70158,r=0,i=1;return 0===t?0:1==(t/=e)?1:(r||(r=.3*e),i<1?(i=1,n=r/4):n=r/(2*Math.PI)*Math.asin(1/i),-i*Math.pow(2,10*(t-=1))*Math.sin((t*e-n)*(2*Math.PI)/r))},easeOutElastic:function(t,e){var n=1.70158,r=0,i=1;return 0===t?0:1==(t/=e)?1:(r||(r=.3*e),i<1?(i=1,n=r/4):n=r/(2*Math.PI)*Math.asin(1/i),i*Math.pow(2,-10*t)*Math.sin((t*e-n)*(2*Math.PI)/r)+1)},easeInOutElastic:function(t,e){var n=1.70158,r=0,i=1;return 0===t?0:2==(t/=e/2)?1:(r||(r=e*(.3*1.5)),i<1&&(i=1,n=r/4),t<1?i*Math.pow(2,10*(t-=1))*Math.sin((t*e-n)*(2*Math.PI)/r)*-.5:i*Math.pow(2,-10*(t-=1))*Math.sin((t*e-n)*(2*Math.PI)/r)*.5+1)},easeInBack:function(t,e){var n=1.70158;return 1*(t/=e)*t*((n+1)*t-n)},easeOutBack:function(t,e){var n=1.70158;return 1*((t=t/e-1)*t*((n+1)*t+n)+1)},easeInOutBack:function(t,e){var n=1.70158;return(t/=e/2)<1?t*t*((1+(n*=1.525))*t-n)*.5:.5*((t-=2)*t*((1+(n*=1.525))*t+n)+2)},easeInBounce:function(t,n){return 1-e.easings.easeOutBounce(n-t,n)},easeOutBounce:function(t,e){return(t/=e)<1/2.75?7.5625*t*t*1:t<2/2.75?1*(7.5625*(t-=1.5/2.75)*t+.75):t<2.5/2.75?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t,n){return t<n/2?.5*e.easings.easeInBounce(2*t,n):.5*e.easings.easeOutBounce(2*t-n,n)+.5}}},function(t,e,n){"use strict";var r,i=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function a(t){try{c(r.next(t))}catch(t){o(t)}}function s(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,s)}c((r=r.apply(t,e||[])).next())}))},a=this&&this.__generator||function(t,e){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.LongTake=void 0;var s=n(0),c=n(3),u=n(1),h=n(4),p=n(9),l=n(2),f=n(10),d=function(t){function e(e,n,r){var i=t.call(this,"Main")||this;return i.ticker=null,i.remove=!1,i.bindUpdate=i.update.bind(i),i.interactive=!1,i.supportRequestAnimationFrame=!!window.requestAnimationFrame,i.requestAnimationFrame=function(t){return i.supportRequestAnimationFrame?window.requestAnimationFrame(t):setTimeout(t,1e3/60)},i.target="string"==typeof e?document.getElementById(e):e,i.context=i.target.getContext("2d"),i.context.imageSmoothingEnabled=!1,i.width=null!=n?n:i.target.width,i.height=null!=r?r:i.target.height,i.container=new p.Container(i.width,i.height,i),i.pointerEvent=new f.ListenerGroup(i.target),i.listenerGroup=new f.ListenerGroup(i.target),i.listenerWindowGroup=new f.ListenerGroup(window),i.listenerGroup.add("click",(function(t){return i.emit("click",{x:t.offsetX,y:t.offsetY})})),i.listenerWindowGroup.add("keydown",(function(t){return i.emit("keydown",{key:t.key,code:t.keyCode})})),i.listenerWindowGroup.add("keyup",(function(t){return i.emit("keyup",{key:t.key,code:t.keyCode})})),i.on("click",(function(t){i.container.stage.eachChildren((function(e){return e._onClick(t.x,t.y)}))})),i.update(),i}return i(e,t),Object.defineProperty(e,"version",{get:function(){return"1.0"},enumerable:!1,configurable:!0}),Object.defineProperty(e,"helper",{get:function(){return u.helper},enumerable:!1,configurable:!0}),Object.defineProperty(e,"Sprite",{get:function(){return l.Sprite},enumerable:!1,configurable:!0}),Object.defineProperty(e,"ImageSprite",{get:function(){return l.ImageSprite},enumerable:!1,configurable:!0}),Object.defineProperty(e,"TextSprite",{get:function(){return l.TextSprite},enumerable:!1,configurable:!0}),Object.defineProperty(e,"Animate",{get:function(){return h.Animate},enumerable:!1,configurable:!0}),Object.defineProperty(e,"Loader",{get:function(){return c.Loader},enumerable:!1,configurable:!0}),e.prototype.clear=function(){this.container.stage.clearChildren()},e.prototype.close=function(){this.clear(),this.remove=!0,this.pointerEvent.close(),this.listenerGroup.close(),this.listenerWindowGroup.close(),this.container.stage.eachChildrenDeep((function(t){t._close()})),this.interactive&&(this.interactive=!1,this.target.style.touchAction="auto")},e.prototype.addChildren=function(t){this.container.addChildren(t)},e.prototype.enableInteractive=function(){var t=this;if(this.interactive)return console.warn("interactive already enabled."),null;this.interactive=!0,this.pointerEvent=(0,f.pointer)(this.target,{end:function(){return t.emit("pointerup",{})},move:function(e){var n=e.x,r=e.y;return t.emit("pointermove",{x:n,y:r})},start:function(e){var n=e.x,r=e.y;return t.emit("pointerdown",{x:n,y:r})}}),this.target.style.touchAction="none"},e.prototype.update=function(){if(!0===this.remove)return this.supportRequestAnimationFrame?window.cancelAnimationFrame(this.ticker):window.clearTimeout(this.ticker),null;this.stageUpdate(),this.bitmapUpdate(),this.ticker=this.requestAnimationFrame(this.bindUpdate)},e.prototype.stageUpdate=function(){this.container.stageUpdate()},e.prototype.bitmapUpdate=function(){return o(this,void 0,void 0,(function(){return a(this,(function(t){return this.container.stageRender(),this.context.clearRect(0,0,this.width,this.height),this.context.drawImage(this.container.bitmap.canvas,0,0,this.width,this.height),[2]}))}))},e}(s.Event);e.LongTake=d},function(t,e,n){"use strict";var r,i=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.Container=void 0;var o=n(0),a=n(2),s=n(5),c=function(t){function e(e,n,r){var i=t.call(this,"Container")||this;return i.core=null,i.bitmap={},i.pointerX=0,i.pointerY=0,i.core=r||null,i.stage=new a.Sprite,i.bitmap=new s.Bitmap(e,n),i.context=i.bitmap.context,i.stage._install(i),i.stage.resize(0,0),i.stage.blendMode="source-over",i.stage.render=function(){return i.stage.cache()},i}return i(e,t),Object.defineProperty(e.prototype,"width",{get:function(){return this.bitmap.canvas.width},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this.bitmap.canvas.height},enumerable:!1,configurable:!0}),e.prototype.stageUpdate=function(){this.stage._mainUpdate()},e.prototype.stageRender=function(){this.stage._mainRender(),this.draw()},e.prototype.addChildren=function(t){this.stage.addChildren(t)},e.prototype.draw=function(){this.bitmap.clear(),this.render(this.stage)},e.prototype.render=function(t){if(t.canShow){var e=Math.round(t.screenX),n=Math.round(t.screenY),r=this.needSave(t);!1===t.antiAliasing&&(this.context.imageSmoothingEnabled=!1),r&&this.context.save(),this.transform(t),this.context.drawImage(t._bitmap.getRenderTarget(),e,n,t.width,t.height),!1===t.antiAliasing&&(this.context.imageSmoothingEnabled=!0);for(var i=t._children.length,o=0;o<i;o++)this.render(t._children[o]);r&&this.context.restore()}},e.prototype.needSave=function(t){return this.context.globalCompositeOperation!==t.blendMode||255!==t.opacity||!1!==t.isTransform()},e.prototype.transform=function(t){var e=this.context,n=t.blendMode;if(255!==t.opacity&&(e.globalAlpha=e.globalAlpha*(t.opacity/255)),n!==this.context.globalCompositeOperation&&(e.globalCompositeOperation=n),t.isTransform()){var r=t.posX,i=t.posY;e.translate(r,i),1===t.scaleHeight&&1===t.scaleWidth||e.scale(t.scaleWidth,t.scaleHeight),0!==t.rotation&&e.rotate(t.rotation*t.helper.arc),0===t.skewX&&0===t.skewY||e.transform(1,t.skewX,t.skewY,1,0,0),e.translate(-r,-i)}},e}(o.Base);e.Container=c},function(t,e,n){"use strict";var r=this&&this.__read||function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,i,o=n.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(t){i={error:t}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a};function i(t){for(var e=t.targetTouches[0].target.parentNode,n=null,r={x:t.targetTouches?t.targetTouches[0].pageX:t.clientX,y:t.targetTouches?t.targetTouches[0].pageY:t.clientY};e.offsetParent;)null==n&&(n=e.offsetTop),r.y-=e.offsetTop-e.scrollTop,e=e.offsetParent;return r.y+=n,r}Object.defineProperty(e,"__esModule",{value:!0}),e.pointer=e.ListenerGroup=void 0;var o=function(){function t(t){this.listeners=[],this.element=t}return t.prototype.add=function(t,e){this.element.addEventListener(t,e),this.listeners.push([t,e])},t.prototype.close=function(){var t=this;this.listeners.forEach((function(e){var n=r(e,2),i=n[0],o=n[1];t.element.removeEventListener(i,o)})),this.listeners=[]},t}();e.ListenerGroup=o;e.pointer=function(t,e){var n=e.start,r=e.move,a=e.end,s=new o(t);return!function(){var t=window.navigator.userAgent,e=!!t.match(/iP(ad|od|hone)/i),n=!!t.match(/Safari/i),r=!t.match(/Chrome|CriOS|OPiOS|mercury|FxiOS|Firefox/i),i=!1;e?i=!!t.match(/WebKit/i)&&n&&r:i="undefined"!=typeof window&&void 0!==window.safari||n&&r;return i}()?(s.add("pointerdown",(function(t){n({x:t.offsetX,y:t.offsetY})})),s.add("pointermove",(function(t){r({x:t.offsetX,y:t.offsetY})})),s.add("pointerup",(function(){a()}))):(s.add("touchstart",(function(t){var e=i(t),r=e.x,o=e.y;n({x:r,y:o})})),s.add("touchmove",(function(t){var e=i(t),n=e.x,o=e.y;r({x:n,y:o})})),s.add("touchend",(function(){a()})),s.add("mousedown",(function(t){n({x:t.layerX,y:t.layerY})})),s.add("mousemove",(function(t){r({x:t.layerX,y:t.layerY})})),s.add("mouseup",(function(){a()}))),s}}])}));