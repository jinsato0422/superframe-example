!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}({0:function(t,e,n){n(47),n(48),n(49),n(50)},47:function(t,e){if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");AFRAME.registerComponent("entity-generator",{schema:{mixin:{"default":""},num:{"default":10}},init:function(){for(var t=this.data,e=0;e<t.num;e++){var n=document.createElement("a-entity");n.setAttribute("mixin",t.mixin),this.el.appendChild(n)}}})},48:function(t,e){function n(t,e,n){for(var r=[],i=Math.ceil(e/t.columns),o=0;o<i;o++)for(var a=0;a<t.columns;a++)r.push([a*t.margin,o*t.margin,0]);return r}function r(t,e,n){for(var r=[],i=0;i<e;i++){var o=i*(2*Math.PI)/e;r.push([n.x+t.radius*Math.cos(o),n.y,n.z+t.radius*Math.sin(o)])}return r}function i(t,e,r){return t.columns=e,n(t,e,r)}function o(t,e,n){return s([[1,0,0],[0,1,0],[0,0,1],[-1,0,0],[0,-1,0],[0,0,-1]],n,t.radius/2)}function a(t,e,n){var r=(1+Math.sqrt(5))/2,i=1/r,o=2-r,a=-1*i,u=-1*o;return s([[-1,o,0],[-1,u,0],[0,-1,o],[0,-1,u],[0,1,o],[0,1,u],[1,o,0],[1,u,0],[i,i,i],[i,i,a],[i,a,i],[i,a,a],[o,0,1],[o,0,-1],[a,i,i],[a,i,a],[a,a,i],[a,a,a],[u,0,1],[u,0,-1]],n,t.radius/2)}function u(t,e,n){var r=Math.sqrt(3),i=-1/Math.sqrt(3),o=2*Math.sqrt(2/3);return s([[0,0,r+i],[-1,0,i],[1,0,i],[0,o,0]],n,t.radius/2)}function s(t,e,n){return e=[e.x,e.y,e.z],t.map(function(t){return t.map(function(t,r){return t*n+e[r]})})}function c(t,e){t.forEach(function(t,n){var r=e[n];t.setAttribute("position",{x:r[0],y:r[1],z:r[2]})})}AFRAME.registerComponent("layout",{schema:{columns:{"default":1,min:0,"if":{type:["box"]}},margin:{"default":1,min:0,"if":{type:["box","line"]}},radius:{"default":1,min:0,"if":{type:["circle","cube","dodecahedron","pyramid"]}},type:{"default":"line",oneOf:["box","circle","cube","dodecahedron","line","pyramid"]}},init:function(){var t=this,e=this.el;this.children=e.getChildEntities(),this.initialPositions=[],this.children.forEach(function(e){function n(){var n=e.getComputedAttribute("position");t.initialPositions.push([n.x,n.y,n.z])}return e.hasLoaded?n():void e.addEventListener("loaded",n)}),e.addEventListener("child-attached",function(n){n.detail.el.parentNode===e&&(t.children.push(n.detail.el),t.update())})},update:function(t){var e,s,l=this.children,f=this.data,p=this.el,d=l.length,h=p.getComputedAttribute("position");switch(f.type){case"box":e=n;break;case"circle":e=r;break;case"cube":e=o;break;case"dodecahedron":e=a;break;case"pyramid":e=u;break;default:e=i}s=e(f,d,h),c(l,s)},remove:function(){this.el.removeEventListener("child-attached",this.childAttachedCallback),c(this.children,this.initialPositions)}}),t.exports.getBoxPositions=n,t.exports.getCirclePositions=r,t.exports.getLinePositions=i,t.exports.getCubePositions=o,t.exports.getDodecahedronPositions=a,t.exports.getPyramidPositions=u},49:function(t,e){!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){function r(t,e,n){return new Promise(function(r){f(e).then(function(){y[t]={template:u(e)(n.trim()),type:e},r(y[t])})})}function i(t,e,n){switch(e){case b:return t(n);case g:return t(n);case x:return Mustache.render(t,n);case w:return t.render(n);default:return console.log(t),console.log(n),p(t,n)}}function o(t,e){var n=document.querySelector(t),i=n.getAttribute("type"),o=n.innerHTML;if(!e){if(!i)throw new Error("Must provide `type` attribute for <script> templates (e.g., handlebars, jade, nunjucks, html)");if(-1!==i.indexOf("handlebars"))e=b;else if(-1!==i.indexOf("jade"))e=g;else if(-1!==i.indexOf("mustache"))e=x;else if(-1!==i.indexOf("nunjucks"))e=w;else{if(-1===i.indexOf("html"))return void m("Template type could not be inferred from the script tag. Please add a type.");e=j}}return new Promise(function(n){r(t,e,o).then(function(t){n(t,e)})})}function a(t,e){return new Promise(function(n){var i;i=new XMLHttpRequest,i.addEventListener("load",function(){r(t,e,i.response).then(function(t){n(t,e)})}),i.open("GET",t),i.send()})}function u(t){switch(t){case b:return s;case g:return c;case x:return s;case w:return l;default:return function(t){return t}}}function s(t){return Handlebars.compile(t)}function c(t){return jade.compile(t)}function l(t){return nunjucks.compile(t)}function f(t){return new Promise(function(e){if(!t||"html"===t)return e();var n=A[t];if(A[t]===!0)return e();n||(n=document.createElement("script"),A[t]=n,n.setAttribute("src",S[t]),v('Lazy-loading %s engine. Please add <script src="%s"> to your page.',t,S[t]),document.body.appendChild(n));var r=n.onload||function(){};n.onload=function(){r(),A[t]=!0,e()}})}var p=n(11),d=AFRAME.utils.debug,h=AFRAME.utils.extend,y={},m=d("template-component:error"),v=d("template-component:info"),b="handlebars",g="jade",x="mustache",w="nunjucks",j="html",A={};A[b]=!!window.Handlebars,A[g]=!!window.jade,A[x]=!!window.Mustache,A[w]=!!window.nunjucks;var S={};S[b]="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js",S[g]="https://cdnjs.cloudflare.com/ajax/libs/jade/1.11.0/jade.min.js",S[x]="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.2.1/mustache.min.js",S[w]="https://cdnjs.cloudflare.com/ajax/libs/nunjucks/2.3.0/nunjucks.min.js",AFRAME.registerComponent("template",{schema:{insert:{"default":"beforeend"},type:{"default":""},src:{"default":""},data:{"default":""}},update:function(t){var e=this.data,n=this.el,r="#"===e.src[0]?o:a,i=y[e.src];if(t&&t.src!==e.src)for(;n.firstChild;)n.removeChild(n.firstChild);return i?void this.renderTemplate(i):void r(e.src,e.type).then(this.renderTemplate.bind(this))},renderTemplate:function(t){var e=this.el,n=this.data,r={};Object.keys(e.dataset).forEach(function(t){r[t]=e.dataset[t]}),n.data&&(r=h(r,e.getComputedAttribute(n.data)));var o=i(t.template,t.type,r);e.insertAdjacentHTML(n.insert,o)}}),AFRAME.registerComponent("template-set",{schema:{on:{type:"string"},src:{type:"string"},data:{type:"string"}},init:function(){var t=this.data,e=this.el;e.addEventListener(t.on,function(){e.setAttribute("template",{src:t.src,data:t.data})})}})},function(t,e){"use strict";var n=Array.prototype.forEach,r=Object.create;t.exports=function(t){var e=r(null);return n.call(arguments,function(t){e[t]=!0}),e}},function(t,e){"use strict";t.exports=function(t){if(null==t)throw new TypeError("Cannot use null or undefined");return t}},function(t,e,n){"use strict";t.exports=n(12)()?Array.from:n(13)},function(t,e){"use strict";var n=Array.prototype.forEach,r=Object.create,i=function(t,e){var n;for(n in t)e[n]=t[n]};t.exports=function(t){var e=r(null);return n.call(arguments,function(t){null!=t&&i(Object(t),e)}),e}},function(t,e,n){"use strict";t.exports=n(28)()?Object.assign:n(29)},function(t,e){"use strict";t.exports=function(t){return"function"==typeof t}},function(t,e){"use strict";t.exports=function(t){if("function"!=typeof t)throw new TypeError(t+" is not a function");return t}},function(t,e,n){"use strict";t.exports=n(33)()?String.prototype.contains:n(34)},function(t,e,n){"use strict";var r=n(3),i=n(1);t.exports=i.apply(null,r("\n\r\u2028\u2029"))},function(t,e,n){"use strict";var r,i,o,a,u,s,c,l,f,p,d=n(36);u=function(t){return"\\"===t?s:"$"===t?c:(i+=t,u)},s=function(t){return"\\"!==t&&"$"!==t&&(i+="\\"),i+=t,u},c=function(t){return"{"===t?(o.push(i),i="",l):"$"===t?(i+="$",c):(i+="$"+t,u)},l=function(t){var e,n=p.slice(r);return d(n,"}",function(t){return d.nest>=0?d.next():void(e=t)}),null!=e?(a.push(p.slice(r,r+e)),r+=e,i="",u):(e=n.length,r+=e,i+=n,l)},f=function(t){return"\\"!==t&&"}"!==t&&(i+="\\"),i+=t,l},t.exports=function(t){var e,n,d;for(i="",o=[],a=[],p=String(t),e=p.length,n=u,r=0;e>r;++r)n=n(p[r]);return n===u?o.push(i):n===s?o.push(i+"\\"):n===c?o.push(i+"$"):n===l?o[o.length-1]+="${"+i:n===f&&(o[o.length-1]+="${"+i+"\\"),d={literals:o,substitutions:a},o=a=null,d}},function(t,e,n){"use strict";var r=n(10),i=n(41);t.exports=function(t,e){return i(r(t),e,arguments[2])}},function(t,e){"use strict";t.exports=function(){var t,e,n=Array.from;return"function"==typeof n&&(t=["raz","dwa"],e=n(t),Boolean(e&&e!==t&&"dwa"===e[1]))}},function(t,e,n){"use strict";var r=n(20).iterator,i=n(14),o=n(15),a=n(27),u=n(7),s=n(2),c=n(35),l=Array.isArray,f=Function.prototype.call,p={configurable:!0,enumerable:!0,writable:!0,value:null},d=Object.defineProperty;t.exports=function(t){var e,n,h,y,m,v,b,g,x,w,j=arguments[1],A=arguments[2];if(t=Object(s(t)),null!=j&&u(j),this&&this!==Array&&o(this))e=this;else{if(!j){if(i(t))return m=t.length,1!==m?Array.apply(null,t):(y=new Array(1),y[0]=t[0],y);if(l(t)){for(y=new Array(m=t.length),n=0;m>n;++n)y[n]=t[n];return y}}y=[]}if(!l(t))if(void 0!==(x=t[r])){for(b=u(x).call(t),e&&(y=new e),g=b.next(),n=0;!g.done;)w=j?f.call(j,A,g.value,n):g.value,e?(p.value=w,d(y,n,p)):y[n]=w,g=b.next(),++n;m=n}else if(c(t)){for(m=t.length,e&&(y=new e),n=0,h=0;m>n;++n)w=t[n],m>n+1&&(v=w.charCodeAt(0),v>=55296&&56319>=v&&(w+=t[++n])),w=j?f.call(j,A,w,h):w,e?(p.value=w,d(y,h,p)):y[h]=w,++h;m=h}if(void 0===m)for(m=a(t.length),e&&(y=new e(m)),n=0;m>n;++n)w=j?f.call(j,A,t[n],n):t[n],e?(p.value=w,d(y,n,p)):y[n]=w;return e&&(p.value=null,y.length=m),y}},function(t,e){"use strict";var n=Object.prototype.toString,r=n.call(function(){return arguments}());t.exports=function(t){return n.call(t)===r}},function(t,e,n){"use strict";var r=Object.prototype.toString,i=r.call(n(16));t.exports=function(t){return"function"==typeof t&&r.call(t)===i}},function(t,e){"use strict";t.exports=function(){}},function(t,e,n){"use strict";t.exports=n(18)()?Math.sign:n(19)},function(t,e){"use strict";t.exports=function(){var t=Math.sign;return"function"==typeof t&&(1===t(10)&&-1===t(-20))}},function(t,e){"use strict";t.exports=function(t){return t=Number(t),isNaN(t)||0===t?t:t>0?1:-1}},function(t,e,n){"use strict";t.exports=n(21)()?Symbol:n(24)},function(t,e){"use strict";var n={object:!0,symbol:!0};t.exports=function(){var t;if("function"!=typeof Symbol)return!1;t=Symbol("test symbol");try{String(t)}catch(e){return!1}return!(!n[typeof Symbol.iterator]||!n[typeof Symbol.toPrimitive])&&!!n[typeof Symbol.toStringTag]}},function(t,e){"use strict";t.exports=function(t){return!!t&&("symbol"==typeof t||!!t.constructor&&("Symbol"===t.constructor.name&&"Symbol"===t[t.constructor.toStringTag]))}},function(t,e,n){"use strict";var r,i=n(5),o=n(4),a=n(6),u=n(8);r=t.exports=function(t,e){var n,r,a,s,c;return arguments.length<2||"string"!=typeof t?(s=e,e=t,t=null):s=arguments[2],null==t?(n=a=!0,r=!1):(n=u.call(t,"c"),r=u.call(t,"e"),a=u.call(t,"w")),c={value:e,configurable:n,enumerable:r,writable:a},s?i(o(s),c):c},r.gs=function(t,e,n){var r,s,c,l;return"string"!=typeof t?(c=n,n=e,e=t,t=null):c=arguments[3],null==e?e=void 0:a(e)?null==n?n=void 0:a(n)||(c=n,n=void 0):(c=e,e=n=void 0),null==t?(r=!0,s=!1):(r=u.call(t,"c"),s=u.call(t,"e")),l={get:e,set:n,configurable:r,enumerable:s},c?i(o(c),l):l}},function(t,e,n){"use strict";var r,i,o,a,u=n(23),s=n(25),c=Object.create,l=Object.defineProperties,f=Object.defineProperty,p=Object.prototype,d=c(null);if("function"==typeof Symbol){r=Symbol;try{String(r()),a=!0}catch(h){}}var y=function(){var t=c(null);return function(e){for(var n,r,i=0;t[e+(i||"")];)++i;return e+=i||"",t[e]=!0,n="@@"+e,f(p,n,u.gs(null,function(t){r||(r=!0,f(this,n,u(t)),r=!1)})),n}}();o=function(t){if(this instanceof o)throw new TypeError("TypeError: Symbol is not a constructor");return i(t)},t.exports=i=function m(t){var e;if(this instanceof m)throw new TypeError("TypeError: Symbol is not a constructor");return a?r(t):(e=c(o.prototype),t=void 0===t?"":String(t),l(e,{__description__:u("",t),__name__:u("",y(t))}))},l(i,{"for":u(function(t){return d[t]?d[t]:d[t]=i(String(t))}),keyFor:u(function(t){var e;s(t);for(e in d)if(d[e]===t)return e}),hasInstance:u("",r&&r.hasInstance||i("hasInstance")),isConcatSpreadable:u("",r&&r.isConcatSpreadable||i("isConcatSpreadable")),iterator:u("",r&&r.iterator||i("iterator")),match:u("",r&&r.match||i("match")),replace:u("",r&&r.replace||i("replace")),search:u("",r&&r.search||i("search")),species:u("",r&&r.species||i("species")),split:u("",r&&r.split||i("split")),toPrimitive:u("",r&&r.toPrimitive||i("toPrimitive")),toStringTag:u("",r&&r.toStringTag||i("toStringTag")),unscopables:u("",r&&r.unscopables||i("unscopables"))}),l(o.prototype,{constructor:u(i),toString:u("",function(){return this.__name__})}),l(i.prototype,{toString:u(function(){return"Symbol ("+s(this).__description__+")"}),valueOf:u(function(){return s(this)})}),f(i.prototype,i.toPrimitive,u("",function(){var t=s(this);return"symbol"==typeof t?t:t.toString()})),f(i.prototype,i.toStringTag,u("c","Symbol")),f(o.prototype,i.toStringTag,u("c",i.prototype[i.toStringTag])),f(o.prototype,i.toPrimitive,u("c",i.prototype[i.toPrimitive]))},function(t,e,n){"use strict";var r=n(22);t.exports=function(t){if(!r(t))throw new TypeError(t+" is not a symbol");return t}},function(t,e,n){"use strict";var r=n(17),i=Math.abs,o=Math.floor;t.exports=function(t){return isNaN(t)?0:(t=Number(t),0!==t&&isFinite(t)?r(t)*o(i(t)):t)}},function(t,e,n){"use strict";var r=n(26),i=Math.max;t.exports=function(t){return i(0,r(t))}},function(t,e){"use strict";t.exports=function(){var t,e=Object.assign;return"function"==typeof e&&(t={foo:"raz"},e(t,{bar:"dwa"},{trzy:"trzy"}),t.foo+t.bar+t.trzy==="razdwatrzy")}},function(t,e,n){"use strict";var r=n(30),i=n(2),o=Math.max;t.exports=function(t,e){var n,a,u,s=o(arguments.length,2);for(t=Object(i(t)),u=function(r){try{t[r]=e[r]}catch(i){n||(n=i)}},a=1;s>a;++a)e=arguments[a],r(e).forEach(u);if(void 0!==n)throw n;return t}},function(t,e,n){"use strict";t.exports=n(31)()?Object.keys:n(32)},function(t,e){"use strict";t.exports=function(){try{return Object.keys("primitive"),!0}catch(t){return!1}}},function(t,e){"use strict";var n=Object.keys;t.exports=function(t){return n(null==t?t:Object(t))}},function(t,e){"use strict";var n="razdwatrzy";t.exports=function(){return"function"==typeof n.contains&&(n.contains("dwa")===!0&&n.contains("foo")===!1)}},function(t,e){"use strict";var n=String.prototype.indexOf;t.exports=function(t){return n.call(this,t,arguments[1])>-1}},function(t,e){"use strict";var n=Object.prototype.toString,r=n.call("");t.exports=function(t){return"string"==typeof t||t&&"object"==typeof t&&(t instanceof String||n.call(t)===r)||!1}},function(t,e,n){"use strict";var r,i,o,a,u,s,c,l,f,p,d,h,y,m,v,b,g,x,w,j,A,S,O,E,C,M,T,P=n(3),k=n(1),z=n(2),F=n(7),_=n(39),L=n(9),R=n(38),$=Object.prototype.hasOwnProperty,q=k.apply(null,P(";{=([,<>+-*/%&|^!~?:}")),B=k.apply(null,P(";{=([,<>+-*/%&|^!~?:})]."));r=function(t){if(h&&!(d>=t))for(;d!==t;){if(!h)return;$.call(R,h)?$.call(L,h)&&(m=d,++y):b=h,h=j[++d]}},i=function(t){null!=C&&x.push([M,C,t]),M={point:d+1,line:y,column:d+1-m},C=d},o=function(){var t;return M.raw=j.slice(C,d),w.push(M),x.length?(t=x.pop(),M=t[0],C=t[1],void(T=t[2])):(M=null,C=null,void(T=null))},a=function(){var t=T;return T=g,++g,r(d+1),i(t),u},s=function(){if("'"===h||'"'===h)return E=h,h=j[++d],c;if("("===h||"{"===h||"["===h)++g;else if(")"===h||"}"===h||"]"===h)T===--g&&o();else if("/"===h&&$.call(q,b))return h=j[++d],p;return h!==A||!S&&b&&!v&&!$.call(B,b)?(b=h,h=j[++d],u):O(d,b,g)},l=function(){for(;;){if(!h)return;if($.call(L,h))return m=d+1,void++y;h=j[++d]}},f=function(){for(;;){if(!h)return;if("*"!==h)$.call(L,h)&&(m=d+1,++y),h=j[++d];else if(h=j[++d],"/"===h)return}},u=function(){var t;for(v=!1;;){if(!h)return;if($.call(R,h))v=!0,$.call(L,h)&&(m=d+1,++y);else{if("/"!==h)break;if(t=j[d+1],"/"===t)h=j[d+=2],v=!0,l();else{if("*"!==t)break;h=j[d+=2],v=!0,f()}}h=j[++d]}return s},c=function(){for(;;){if(!h)return;if(h===E)return h=j[++d],b=E,u;"\\"===h&&$.call(L,j[++d])&&(m=d+1,++y),h=j[++d]}},p=function(){for(;;){if(!h)return;if("/"===h)return b="/",h=j[++d],u;"\\"===h&&++d,h=j[++d]}},t.exports=e=function(t,n,r){var i;if(j=String(z(t)),A=String(z(n)),1!==A.length)throw new TypeError(A+" should be one character long string");for(O=F(r),S=$.call(B,A),d=0,h=j[d],y=1,m=0,v=!1,b=null,g=0,x=[],w=[],e.forceStop=!1,i=u;i;)i=i();return w},Object.defineProperties(e,{$ws:_(u),$common:_(s),collectNest:_(a),move:_(r),index:_.gs(function(){return d}),line:_.gs(function(){return y}),nest:_.gs(function(){return g}),columnIndex:_.gs(function(){return m}),next:_(function(t){return h?(r(d+(t||1)),u()):void 0}),resume:_(function(){return s})})},function(t,e,n){"use strict";var r=n(3),i=n(1);t.exports=i.apply(null,r(" \f\t\x0B​  ​᠎ ​  ​  ​  ​  ​  ​​​  ​　"))},function(t,e,n){"use strict";var r=n(1),i=n(9),o=n(37);t.exports=r.apply(null,Object.keys(i).concat(Object.keys(o)))},function(t,e,n){"use strict";var r,i=n(5),o=n(4),a=n(6),u=n(8);r=t.exports=function(t,e){var n,r,a,s,c;return arguments.length<2||"string"!=typeof t?(s=e,e=t,t=null):s=arguments[2],null==t?(n=a=!0,r=!1):(n=u.call(t,"c"),r=u.call(t,"e"),a=u.call(t,"w")),c={value:e,configurable:n,enumerable:r,writable:a},s?i(o(s),c):c},r.gs=function(t,e,n){var r,s,c,l;return"string"!=typeof t?(c=n,n=e,e=t,t=null):c=arguments[3],null==e?e=void 0:a(e)?null==n?n=void 0:a(n)||(c=n,n=void 0):(c=e,e=n=void 0),null==t?(r=!0,s=!1):(r=u.call(t,"c"),s=u.call(t,"e")),l={get:e,set:n,configurable:r,enumerable:s},c?i(o(c),l):l}},function(t,e){"use strict";var n=Array.prototype.reduce;t.exports=function(t){var e=arguments;return n.call(t,function(t,n,r){return t+(void 0===e[r]?"":String(e[r]))+n})}},function(t,e,n){"use strict";var r=n(42),i=n(40);t.exports=function(t,e){return i.apply(null,r(t,e,arguments[2]))}},function(t,e,n){"use strict";var r=n(2),i=n(4),o=Array.prototype.map,a=Object.keys,u=JSON.stringify;t.exports=function(t,e){var n,s,c,l=Object(arguments[2]);return r(t)&&r(t.literals)&&r(t.substitutions),e=i(e),n=a(e),s=n.join(", "),c=n.map(function(t){return e[t]}),[t.literals].concat(o.call(t.substitutions,function(t){var e;if(t){try{e=new Function(s,"return ("+t+")")}catch(n){throw new TypeError("Unable to compile expression:\n\targs: "+u(s)+"\n\tbody: "+u(t)+"\n\terror: "+n.stack)}try{return e.apply(null,c)}catch(n){if(l.partial)return"${"+t+"}";throw new TypeError("Unable to resolve expression:\n\targs: "+u(s)+"\n\tbody: "+u(t)+"\n\terror: "+n.stack)}}}))}}])},50:function(t,e){if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");var n;AFRAME.registerSystem("audioanalyser",{init:function(){this.analysers={}},getOrCreateAnalyser:function(t){n||(n=new AudioContext);var e=this.analysers,r=n.createAnalyser(),i=t.src,o=i.getAttribute("src");if(e[o])return e[o];var a=n.createMediaElementSource(i);return a.connect(r),r.connect(n.destination),r.smoothingTimeConstant=t.smoothingTimeConstant,r.fftSize=t.fftSize,e[o]=r,e[o]}}),AFRAME.registerComponent("audioanalyser",{schema:{enableBeatDetection:{"default":!0},enableLevels:{"default":!0},enableWaveform:{"default":!0},enableVolume:{"default":!0},fftSize:{"default":2048},smoothingTimeConstant:{"default":.8},src:{type:"selector"},unique:{"default":!1}},init:function(){this.analyser=null,this.levels=null,this.waveform=null,this.volume=0},update:function(){function t(t){n.analyser=t,e.enableLevels&&(n.levels=new Uint8Array(n.analyser.frequencyBinCount)),e.enableWaveform&&(n.waveform=new Uint8Array(n.analyser.fftSize)),n.el.emit("audioanalyser-ready",{analyser:t})}var e=this.data,n=this,r=this.system;e.src&&t(e.unique?r.createAnalyser(e):r.getOrCreateAnalyser(e))},tick:function(){var t=this.data;if(this.analyser){if((t.enableLevels||t.enableVolume)&&this.analyser.getByteFrequencyData(this.levels),t.enableWaveform&&this.analyser.getByteTimeDomainData(this.waveform),t.enableVolume||t.enableBeatDetection){for(var e=0,n=0;n<this.levels.length;n++)e+=this.levels[n];this.volume=e/this.levels.length}if(t.enableBeatDetection){var r=.99,i=60,o=.15;volume=this.volume,this.beatCutOff||(this.beatCutOff=volume),volume>this.beatCutOff&&volume>o?(console.log("[audioanalyser] Beat detected."),this.el.emit("audioanalyser-beat"),this.beatCutOff=1.5*volume,this.beatTime=0):this.beatTime<=i?this.beatTime++:(this.beatCutOff*=r,this.beatCutOff=Math.max(this.beatCutOff,o))}}}})}});