System.register(["jimu-core","jimu-arcgis","jimu-ui","jimu-core/dnd","jimu-theme"],(function(e,t){var n={},a={},l={},o={},i={};return{setters:[function(e){n.AppMode=e.AppMode,n.DataSourceManager=e.DataSourceManager,n.DataSourceStatus=e.DataSourceStatus,n.DataSourceTypes=e.DataSourceTypes,n.Immutable=e.Immutable,n.MultipleDataSourceComponent=e.MultipleDataSourceComponent,n.React=e.React,n.ReactRedux=e.ReactRedux,n.ReactResizeDetector=e.ReactResizeDetector,n.classNames=e.classNames,n.css=e.css,n.dataSourceUtils=e.dataSourceUtils,n.dateUtils=e.dateUtils,n.defaultMessages=e.defaultMessages,n.getAppStore=e.getAppStore,n.jsx=e.jsx,n.lodash=e.lodash,n.polished=e.polished,n.useIntl=e.useIntl},function(e){a.ArcGISDataSourceTypes=e.ArcGISDataSourceTypes,a.MapViewManager=e.MapViewManager,a.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules},function(e){l.Alert=e.Alert,l.Button=e.Button,l.Dropdown=e.Dropdown,l.DropdownButton=e.DropdownButton,l.DropdownItem=e.DropdownItem,l.DropdownMenu=e.DropdownMenu,l.Icon=e.Icon,l.Label=e.Label,l.Popper=e.Popper,l.SVG=e.SVG,l.Switch=e.Switch,l.Tooltip=e.Tooltip,l.WidgetPlaceholder=e.WidgetPlaceholder,l.defaultMessages=e.defaultMessages,l.hooks=e.hooks},function(e){o.interact=e.interact},function(e){i.getThemeColorValue=e.getThemeColorValue}],execute:function(){e((()=>{var e={43980:e=>{e.exports='<svg viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M.322.03A.504.504 0 0 1 .96.305L4 8 .96 15.694a.504.504 0 0 1-.638.276.464.464 0 0 1-.29-.606L2.94 8 .031.636A.464.464 0 0 1 .322.03Z" fill="#282828"></path></svg>'},74695:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 3c1.175 0 2.27.337 3.195.92l.9-.598A7 7 0 0 0 2.5 13.33h10.999A6.97 6.97 0 0 0 15 9a6.968 6.968 0 0 0-1.256-4.002l-.603.906C13.686 6.808 14 7.867 14 9a5.968 5.968 0 0 1-1.008 3.33H3.008A6 6 0 0 1 8 3Zm-.183 6.9a1.322 1.322 0 0 1-.43-2.159L13 4 9.258 9.612a1.322 1.322 0 0 1-1.441.287Z" fill="#000"></path></svg>'},66376:e=>{e.exports='<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m9 6.809 3.276 1.638.448-.894L10 6.19V3H9v3.809Z" fill="#000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10.293 11.943A5.501 5.501 0 0 0 9.5 1a5.5 5.5 0 0 0-.792 10.943L9.5 13l.793-1.057ZM14 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM12 16.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-1 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" fill="#000"></path><path d="M6 16H0v1h6v-1ZM13 16h6v1h-6v-1Z" fill="#000"></path></svg>'},59455:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Zm1 0A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8Z" fill="#000"></path></svg>'},83909:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 2.22V1l1 .7 8.128 5.69L12 8l-.872.61L3 14.3 2 15V2.22ZM10.256 8 3 13.08V2.92L10.256 8ZM14 1h-1v14h1V1Z" fill="#000"></path></svg>'},57986:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 1H4v14h1V1Zm7 0h-1v14h1V1Z" fill="#000"></path></svg>'},56097:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m2 1 12 7-12 7V1Zm9.983 6.999L3 2.723v10.553l8.983-5.277Z" fill="#000"></path></svg>'},80272:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Zm1 0A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM7.5 4.5a.5.5 0 0 1 1 0v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3Z" fill="#000"></path></svg>'},10148:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14 2.22V1l-1 .7-8.128 5.69L4 8l.872.61L13 14.3l1 .7V2.22ZM5.744 8 13 13.08V2.92L5.744 8ZM2 1h1v14H2V1Z" fill="#000"></path></svg>'},88866:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.5 7.5A.5.5 0 0 1 7 7h1.5v4.5h1a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h1V8H7a.5.5 0 0 1-.5-.5Z" fill="#000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm0-1A7 7 0 1 0 8 1a7 7 0 0 0 0 14Z" fill="#000"></path></svg>'},26826:e=>{"use strict";e.exports=a},48891:e=>{"use strict";e.exports=n},54020:e=>{"use strict";e.exports=o},34796:e=>{"use strict";e.exports=i},30726:e=>{"use strict";e.exports=l}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var l=t[n]={exports:{}};return e[n](l,l.exports,r),l.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="";var s={};return r.p=window.jimuConfig.baseUrl,(()=>{"use strict";r.r(s),r.d(s,{default:()=>ue});var e,t,n,a=r(48891),l=r(26826),o=r(30726);!function(e){e.Classic="CLASSIC",e.Modern="MODERN"}(e||(e={})),function(e){e.Slowest="SLOWEST",e.Slow="SLOW",e.Medium="MEDIUM",e.Fast="FAST",e.Fastest="FASTEST"}(t||(t={})),function(e){e.current="CURRENT",e.cumulatively="CUMULATIVE"}(n||(n={}));const i=["year","month","day"],c=["hour","minute"],u="d/M/y",d="h:mm:ss a";var m;!function(e){e[e.year=31536e3]="year",e[e.month=2592e3]="month",e[e.day=86400]="day",e[e.hour=3600]="hour",e[e.minute=60]="minute",e[e.second=1]="second"}(m||(m={}));const p={slowest:5e3,slow:4e3,medium:3e3,fast:2e3,fastest:1e3};function h(e,t=!0){let n=null;if(e)if("number"==typeof e.value)n=e.value;else{const l=new Date;l.setMinutes(0),l.setSeconds(0),l.setMilliseconds(0),e.value===a.dateUtils.VirtualDateType.Today?(l.setHours(0),n=l.getTime()+f(e),n=t?n:n+1e3*m.day):e.value===a.dateUtils.VirtualDateType.Now&&(n=l.getTime()+f(e),n=t?n:n+1e3*m.hour)}return n}function f(e){return e.offset?e.offset.val*m[e.offset.unit]*1e3:0}function g(e,t){let n=null;const o=Object.keys(e).map((t=>e[t]))[0];if(o.type===l.ArcGISDataSourceTypes.WebMap){const e=[];o.getAllChildDataSources().forEach((t=>{(t.type===a.DataSourceTypes.MapService&&t.supportTime()||t.type===a.DataSourceTypes.FeatureLayer&&null===a.dataSourceUtils.findMapServiceDataSource(t)&&t.supportTime())&&e.push(t)}));const l=(null==t?void 0:t.map((e=>e.dataSourceId)))||[];n={},e.forEach((e=>{(0===l.length||l.includes(e.id))&&(n[e.id]=e)}))}return n}function v(e,t){const n=[...i,...c],a=[],l=t-e;return n.forEach((e=>{l>=1e3*m[e]&&a.push(e)})),a}var y;function b(e,t,n){let a=!1;const l=n.day.value;if(1!==l){const n=e.getMonth()+1;2===l?(2===n&&28===t||30===t)&&(a=!0):7===l?(2===n&&21===t||28===t)&&(a=!0):10===l?20===t&&(a=!0):15===l&&15===t&&(a=!0)}return a}function w(e,t,n,a,l){if(e){const o=a[a.length-1];if(!o)return!0;const i=D(o.label),r=D(t);i/(1===a.length?1:2)+r/2>(n-parseFloat(o.position)/100)*l&&(e=!1)}return e}function x(e,t,n=!1){let a="";return e.day?a=t.getFullYear():e.month?(a=t.getFullYear(),n&&(a+="/"+(t.getMonth()+1))):a=t.getFullYear(),a}function S(e,t){const n=t.getMonth()+1;let a="";return!e.day||e.hour&&1===e.hour.value?1!==n&&(a=n):a=n+"/"+t.getDate(),a}function M(e,t){let n=e.getDate();const a=e.getMonth()+1;return t.hour&&(n=a+"/"+n),n}function j(e,t){return e.getHours()+":00"}function k(e,t){let n=e.getMinutes();return t.second&&(n=e.getHours()+":"+n),n}!function(e){e[e.year=1]="year",e[e.month=2]="month",e[e.day=3]="day",e[e.hour=4]="hour",e[e.minute=5]="minute",e[e.second=6]="second"}(y||(y={}));const T={};function D(e,t,n){const a=window;if(void 0===a.measureCanvasCTX){const e=document.createElement("canvas");a.measureCanvasCTX=e.getContext("2d")}if(T[e])return T[e];const l=a.measureCanvasCTX.measureText(e).width+10;return T[e]=l,l}function R(e,t,n){switch(e){case"year":t.setFullYear(t.getFullYear()+n);break;case"month":t.setMonth(t.getMonth()+n);break;case"day":t.setDate(t.getDate()+n);break;case"hour":t.setHours(t.getHours()+n);break;case"minute":t.setMinutes(t.getMinutes()+n)}return t.getTime()}function O(e,t,n,a,l,o=!0){let i;const r=o?1:-1;if(l)i=n+1/l*(t-e)*r,i=Math.round(i),Math.abs(i-e)<1e4?i=e:Math.abs(i-t)<1e4&&(i=t);else{const e=new Date(n),t=a.val*r;switch(null==a?void 0:a.unit){case"year":e.setFullYear(e.getFullYear()+t);break;case"month":e.setMonth(e.getMonth()+t);break;case"day":e.setDate(e.getDate()+t);break;case"hour":e.setHours(e.getHours()+t);break;case"minute":e.setMinutes(e.getMinutes()+t)}i=e.getTime()}return i}function C(e,t,n,a){let l=!1;const o=1/a/2*100;return n>=e-o&&n<=t+o&&(l=!0),l}function N(e,t,n){return(null==n?void 0:n.zoomLevel)===t&&0!==t?n.maxWidth/e:Math.pow(2,t)}function E(e,t,n){return e*N(e,t,n)}var L=r(54020);const I={_widgetLabel:"Timeline"};var P=r(80272),z=r.n(P);const A=e=>{const{className:t}=e,n=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var l=0;for(a=Object.getOwnPropertySymbols(e);l<a.length;l++)t.indexOf(a[l])<0&&Object.prototype.propertyIsEnumerable.call(e,a[l])&&(n[a[l]]=e[a[l]])}return n}(e,["className"]),l=(0,a.classNames)("jimu-icon jimu-icon-component",t);return a.React.createElement(o.SVG,Object.assign({className:l,src:z()},n))};var V=r(59455),W=r.n(V);const $=e=>{const{className:t}=e,n=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var l=0;for(a=Object.getOwnPropertySymbols(e);l<a.length;l++)t.indexOf(a[l])<0&&Object.prototype.propertyIsEnumerable.call(e,a[l])&&(n[a[l]]=e[a[l]])}return n}(e,["className"]),l=(0,a.classNames)("jimu-icon jimu-icon-component",t);return a.React.createElement(o.SVG,Object.assign({className:l,src:W()},n))};var F=r(88866),Z=r.n(F);const B=e=>{const{className:t}=e,n=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var l=0;for(a=Object.getOwnPropertySymbols(e);l<a.length;l++)t.indexOf(a[l])<0&&Object.prototype.propertyIsEnumerable.call(e,a[l])&&(n[a[l]]=e[a[l]])}return n}(e,["className"]),l=(0,a.classNames)("jimu-icon jimu-icon-component",t);return a.React.createElement(o.SVG,Object.assign({className:l,src:Z()},n))};var U=r(56097),G=r.n(U);const H=e=>{const{className:t}=e,n=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var l=0;for(a=Object.getOwnPropertySymbols(e);l<a.length;l++)t.indexOf(a[l])<0&&Object.prototype.propertyIsEnumerable.call(e,a[l])&&(n[a[l]]=e[a[l]])}return n}(e,["className"]),l=(0,a.classNames)("jimu-icon jimu-icon-component",t);return a.React.createElement(o.SVG,Object.assign({className:l,src:G()},n))};var Y=r(57986),_=r.n(Y);const J=e=>{const{className:t}=e,n=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var l=0;for(a=Object.getOwnPropertySymbols(e);l<a.length;l++)t.indexOf(a[l])<0&&Object.prototype.propertyIsEnumerable.call(e,a[l])&&(n[a[l]]=e[a[l]])}return n}(e,["className"]),l=(0,a.classNames)("jimu-icon jimu-icon-component",t);return a.React.createElement(o.SVG,Object.assign({className:l,src:_()},n))};var X=r(10148),Q=r.n(X);const q=e=>{const{className:t}=e,n=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var l=0;for(a=Object.getOwnPropertySymbols(e);l<a.length;l++)t.indexOf(a[l])<0&&Object.prototype.propertyIsEnumerable.call(e,a[l])&&(n[a[l]]=e[a[l]])}return n}(e,["className"]),l=(0,a.classNames)("jimu-icon jimu-icon-component",t);return a.React.createElement(o.SVG,Object.assign({className:l,src:Q()},n))};var K=r(83909),ee=r.n(K);const te=e=>{const{className:t}=e,n=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var l=0;for(a=Object.getOwnPropertySymbols(e);l<a.length;l++)t.indexOf(a[l])<0&&Object.prototype.propertyIsEnumerable.call(e,a[l])&&(n[a[l]]=e[a[l]])}return n}(e,["className"]),l=(0,a.classNames)("jimu-icon jimu-icon-component",t);return a.React.createElement(o.SVG,Object.assign({className:l,src:ee()},n))};var ne=r(74695),ae=r.n(ne);const le=e=>{const{className:t}=e,n=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var l=0;for(a=Object.getOwnPropertySymbols(e);l<a.length;l++)t.indexOf(a[l])<0&&Object.prototype.propertyIsEnumerable.call(e,a[l])&&(n[a[l]]=e[a[l]])}return n}(e,["className"]),l=(0,a.classNames)("jimu-icon jimu-icon-component",t);return a.React.createElement(o.SVG,Object.assign({className:l,src:ae()},n))};var oe=r(34796);const ie=r(43980),re=Object.assign({},I,a.defaultMessages,o.defaultMessages),se=function(n){const{width:l,height:i,applied:r,timeStyle:s=e.Classic,foregroundColor:c,backgroundColor:h,sliderColor:f,theme:g,startTime:v,endTime:T,accuracy:D="year",stepLength:I,dividedCount:P,cumulatively:z=!1,enablePlayControl:V=!1,speed:W=t.Medium,autoPlay:F,updating:Z=!1,onTimeChanged:U,onApplyStateChanged:G}=n,[Y,_]=a.React.useState(l),[X,Q]=a.React.useState(i);a.React.useEffect((()=>{_(l-(s===e.Classic?64:80)),Q(s===e.Classic?52:80)}),[l,i,s]);const[K,ee]=a.React.useState(0),[ne,ae]=a.React.useState(null),se=(0,a.useIntl)(),ce=(()=>{const e=(0,a.useIntl)();return a.React.useCallback(((t,n)=>e.formatMessage({id:t,defaultMessage:re[t]},n)),[e])})(),ue=a.React.useMemo((()=>[{value:t.Slowest,label:ce("slowest")},{value:t.Slow,label:ce("slow")},{value:t.Medium,label:ce("medium")},{value:t.Fast,label:ce("fast")},{value:t.Fastest,label:ce("fastest")}]),[]),[de,me]=a.React.useState(W);a.React.useEffect((()=>{me(W)}),[W]);const[pe,he]=a.React.useState(F||!1),fe=a.React.useRef(null),ge=a.React.useRef(null),[ve,ye]=a.React.useState(null),[be,we]=a.React.useState(0),[xe,Se]=a.React.useState(v),[Me,je]=a.React.useState(null),[ke,Te]=a.React.useState(null),[De,Re]=a.React.useState(null),[Oe,Ce]=a.React.useState(null),[Ne,Ee]=a.React.useState(null),Le=a.React.useRef(null),Ie=a.React.useRef(null),Pe=a.React.useRef(null),ze=a.React.useRef(null),Ae=a.React.useRef(null),[Ve,We]=a.React.useState(!1);a.React.useEffect((()=>(fe.current.addEventListener("mousedown",Ge),()=>{var e;null===(e=fe.current)||void 0===e||e.removeEventListener("mousedown",Ge),null==Ne||Ne.unset()})),[]),a.React.useEffect((()=>{Le.current&&Ee(function(e,t,n,a,l){let o,i,r,s,c,u,d,p;return e(t).resizable({edges:{left:".resize-left",right:".resize-right"}}).on("resizestart",(e=>{e.stopPropagation(),r=n(),c=r.startValue,u=r.endValue,d=r.startValue,p=r.endValue,s=u-c,o=0;const a=t.getBoundingClientRect();i=a.width,t.style.minWidth="0px"})).on("resizemove",(e=>{const{extent:t}=r;e.stopPropagation();const n=e.deltaRect;o+=n.width;const l=s&&i+o,h=function(e,t,n,a,l,o){let i=e,r=t;const s=(n[1]-n[0])/a*l;return o.edges.left?i=e-s:r=t+s,{newStart:i,newEnd:r}}(d,p,t,l,o,e),f=function(e,t,n,a,l,o,i){const{width:r,extent:s,stepLength:c,accuracy:u,dividedCount:d}=n;let p=a,h=l;if(c){const n=Math.round((s[1]-s[0])*t/r/m[u]/1e3);e.edges.left?p=R(u,new Date(i),-n):h=R(u,new Date(o),n)}else{const n=(s[1]-s[0])/d,a=Math.round((s[1]-s[0])*t/r/n);e.edges.left?p=i-a*n:h=o+a*n}return e.edges.left?(p=Math.min(p,h),p=Math.max(s[0],p),p=Math.min(s[1],p)):(h=Math.max(p,h),h=Math.min(s[1],h),h=Math.max(s[0],h)),{newStart:p,newEnd:h}}(e,l||o,r,c,u,h.newStart,h.newEnd);a(f.newStart,f.newEnd),d=f.newStart,p=f.newEnd})).on("resizeend",(e=>{e.stopPropagation(),l(d,p)}))}(L.interact,Le.current,Ze,Qe,qe))}),[s]),a.React.useEffect((()=>{ge.current={left:0,x:0},We(!1),we(0),ee(0),he(F),Te(null),Se(v);const e=z?v:O(v,T,v,I,P);je(e),Z?setTimeout((()=>{U(v,e)}),2e3):U(v,e)}),[F,v,z,T,D,I,P]),a.React.useEffect((()=>{const e=function(e){const{width:t,startTime:n,endTime:a,accuracy:l="hour"}=e,o=y[l],i={year:null,month:null,day:null,hour:null,minute:null,second:null},r=function(e,t,n){const a=n/4;let l,o;const i=(t.getTime()-e.getTime())/31536e6,r=a/i;return r>=1?(l=1,o=4*r):(r>=.2?l=5:r>=.1&&r<.2?l=10:r>=.02&&r<.1?l=50:r<.02&&(l=100),o=n/(i/l)),{value:l,tickWidth:o/n}}(new Date(n),new Date(a),t);if(i.year={value:r.value,tickWidth:r.tickWidth},y.month<=o&&1===r.value){const e=function(e,t){const n=e*t/4;let a=null;return n>=12?a=1:n>=4?a=3:n>=2&&(a=6),{value:a,tickWidth:e/(12/a)}}(r.tickWidth,t);if(null!==e.value&&(i.month={value:e.value,tickWidth:e.tickWidth},y.day<=o&&1===e.value)){const e=function(e,t,n){let a;const l=(t-e)/864e5,o=n/4/l;return a=o>=1?1:o>=.5&&o<1?2:o>=1/7&&o<.5?7:o>=.1&&o<1/7?10:o>=1/15&&o<.1?15:null,{value:a,tickWidth:1/(l/a)}}(n,a,t);if(null!==e.value&&(i.day={value:e.value,tickWidth:e.tickWidth},y.hour<=o&&1===e.value)){const n=function(e,t){const n=e*t/4;let a;return n>=24?a=1:n>=12&&n<24?a=2:n>=4&&n<12?a=6:n>=3&&n<4?a=8:n>=2&&n<3?a=12:n<2&&(a=null),{value:a,tickWidth:e/(24/a)}}(e.tickWidth,t);if(null!==n.value&&(i.hour={value:n.value,tickWidth:n.tickWidth},y.minute<=o&&1===n.value)){const e=function(e,t){const n=e*t/4;let a;return n>=60?a=1:n>=12&&n<60?a=5:n>=6&&n<12?a=10:n>=4&&n<6?a=15:n>=2&&n<4?a=30:n<2&&(a=null),{value:a,tickWidth:e/(60/a)}}(n.tickWidth,t);null!==e.value&&(i.minute={value:e.value,tickWidth:e.tickWidth})}}}}return i}({width:E(Y,K,ne),startTime:v,endTime:T,accuracy:D});ye(e)}),[Y,v,T,D,K,ne]),a.React.useEffect((()=>{const e=function(e,t,n,a){if(e<0)return;const l=(n-t)/m[a]/1e3,o=Math.max(e,32*l);let i=0;for(;E(e,i)<o||30===i;)i++;return{maxWidth:o,zoomLevel:i}}(Y,v,T,D);ae(e)}),[Y,v,T,D]);const $e=a.ReactRedux.useSelector((e=>{var t,n;return pe?(null===(t=e.appRuntimeInfo)||void 0===t?void 0:t.appMode)===a.AppMode.Design||(null===(n=e.appRuntimeInfo)||void 0===n?void 0:n.isPrintPreview):null})),Fe=a.React.useRef($e),Ze=o.hooks.useEventCallback((()=>({startValue:De||xe,endValue:Oe||ke||Me,extent:[v,T],width:E(Y,K,ne),accuracy:D,stepLength:I,dividedCount:P}))),Be=o.hooks.useEventCallback((e=>{a.lodash.debounce((()=>{const t=N(Y,K,ne),n=e.clientX-ge.current.x;let a=ge.current.left-n/(t*Y)*100;a=Math.min(a/100,(t-1)/t),a=a<0?0:a,we(100*a)}),50)()})),Ue=o.hooks.useEventCallback((()=>{fe.current.style.cursor="grab",fe.current.style.removeProperty("user-select"),document.removeEventListener("mousemove",Be),document.removeEventListener("mouseup",Ue)})),Ge=o.hooks.useEventCallback((e=>{0!==K&&"BUTTON"!==e.target.tagName&&(fe.current.style.cursor="grabbing",fe.current.style.userSelect="none",ge.current={left:be,x:e.clientX},document.addEventListener("mousemove",Be),document.addEventListener("mouseup",Ue))})),He=a.React.useCallback(((e=xe,t=Me,n)=>{if(e<=v)return void we(0);const a=T-v,l=a/N(Y,K,ne),o=v+be/100*a;let i;if(n&&e>=o+l)i=Math.min(e,T-l);else{if(n||!(t<=o))return;i=Math.max(v,t-l)}we((i-v)/(T-v)*100)}),[K,v,T,be,xe,Me,Y,ne]),Ye=a.React.useCallback((e=>{const t=K+(e?1:-1);if(0===t)return void we(0);const n=T-v,a=N(Y,K,ne),l=N(Y,t,ne),o=v+be/100*n,i=o+n/a;let r=be;if((ke||Me)===T&&(ke||Me)===i)return r=(T-n/l-v)/(T-v)*100,void we(r);if(!(xe>=i||Me<=o&&xe!==Me)){const t=(xe-v)/(T-v)*100-be;r=e?be+t/2:be-t}r=Math.max(0,r),r=Math.min(r,(l-1)/l*100),we(r)}),[K,v,T,be,Y,xe,Me,ke,ne]),_e=a.React.useCallback((e=>{const t=O(v,T,Me,I,P,e);let n=v,a=T;if(z){const n=e&&Me>=T,l=!e&&v===Me;if(e&&t>T)(ke||P)&&e?(a=v,Te(null)):(a=t,Te(T));else{if(l)return;a=n?v:t,Te(null)}}else{const l=O(v,T,xe,I,P,e),o=!e&&v===xe,i=!e&&l<v,r=e&&l>=T;if(l<T&&t>T)(ke||P)&&e?(n=v,a=v+Me-xe,Te(null)):(n=l,a=t,Te(T));else{if(o)return;i||r?(n=v,a=v+Me-xe):(n=l,a=t),Te(null)}Se(n)}je(a),0!==K&&He(n,a,e),U(n,a)}),[P,T,Me,v,xe,I,z,U,He]),Je=a.React.useCallback((()=>{ze.current&&(clearInterval(ze.current),ze.current=null)}),[]),Xe=a.React.useCallback((()=>{Je(),ze.current=setInterval((()=>{Z||_e(!0)}),p[de.toLowerCase()])}),[de,Je,Z,_e]);a.React.useEffect((()=>{if(!ze.current){if($e||!pe||Z)return void Je();Xe()}return()=>{Je()}}),[pe,Z,$e,Je,Xe]),a.React.useEffect((()=>{if(Fe.current!==$e&&null!==$e){if(Fe.current=$e,$e)return void Je();pe&&!Z&&Xe()}}),[$e,Xe,Je,pe,Z]);const Qe=(e,t)=>{Re(e),Ce(t)},qe=(e,t)=>{Qe(null,null),Se(e),je(t),U(e,t)},Ke=a.React.useMemo((()=>{if(!ve)return null;const e=E(Y,K,ne),t=Y/e*100+be,n=e/Y,l=function(e,t,n,a,l,o,i,r){const s=new Date(n),c=new Date(a),u=s.getFullYear(),d=c.getFullYear(),m=[],p=[],h={value:u,label:x(e,s,!0),position:0};C(l,o,0,i)&&(m.push(h),p.push(h));let f=function(e,t){let n=new Date(e).getFullYear(),a=null;for(;!a;)n%100%t==0&&(a=n),n++;return a}(n,e.year.value);f===u&&(f=u+e.year.value);for(let r=f;r<=d;r+=e.year.value){const s=new Date(r,0,1,0,0,0),c=(s.getTime()-n)/(a-n);if(!C(l,o,100*c,i))continue;let d=!1;const h=e.year.tickWidth*t/52;h>=1?d=!0:h<.03?d=r%50==0&&r-u>=49:h<.15?d=r%(10*e.year.value)==0&&r-u>=9:h<.3?d=r%(5*e.year.value)==0&&r-u>=4:h<1&&(d=r%2==0);const f=x(e,s);d=w(d,f,c,p,t);const g={value:r,label:d?f:null,position:100*c+"%"};d&&p.push(g),m.push(g)}return m}(ve,e,v,T,be,t,n),o=function(e,t,n,a,l,o,i){if(!e.month||e.month.tickWidth>1&&new Date(a).getMonth()===new Date(n).getMonth())return[];const r=new Date(n),s=new Date(a),c=r.getMonth()+1,u=s.getMonth()+1,d=r.getFullYear(),m=12-c+12*(s.getFullYear()-d-1)+u+1,p=[],h=[];let f=function(e,t){const n=new Date(e);n.setDate(1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n.setMilliseconds(0),e>n.getTime()&&n.setMonth(n.getMonth()+1);let a=n.getMonth(),l=null;for(;!l;)a%t!=0&&11!==a||(l=a),a++;return l+1}(n,e.month.value);f===c&&(f=c+e.month.value);let g=!1;for(let r=f-c;r<=m-1;r+=e.month.value){const s=new Date(d,c+r-1,1,0,0,0),u=(s.getTime()-n)/(a-n);if(!C(l,o,100*u,i))continue;if(!g||0===s.getMonth()){const t=new Date(s.getFullYear(),s.getMonth()-1,1,0,0,0),l=t.getTime()-n,o=Math.max(l,0)/(a-n);if(h.unshift({value:t.getFullYear(),label:x(e,t,!g),position:100*o+"%"}),g=!0,0===s.getMonth())continue}let m=!1;const f=e.month.tickWidth*t;e.year.tickWidth*t>58&&(m=f>=28||(f>=15?s.getMonth()%3==0:(s.getMonth()+1)%12==7));const v=S(e,s);m=w(m,v,u,h,t);const y={value:s.getMonth()+1,label:m?v:null,position:100*u+"%"};m&&h.push(y),p.push(y)}return p}(ve,e,v,T,be,t,n),i=function(e,t,n,a,l,o,i){if(!e.day)return[];const r=new Date(n),s=r.getDate(),c=r.getFullYear(),u=r.getMonth(),d=Math.ceil((a-n)/864e5)+1,m=[],p=[],h={value:s,label:S(e,r),position:0};p.push(h);let f=function(e,t){let n=new Date(e).getDate(),a=null;for(;!a;)(n-1)%t==0&&1!==n&&(a=n),n++;return a}(n,e.day.value);f===s&&(f=s+e.day.value);for(let r=f-s;r<=d-1;r+=e.day.value){const d=new Date(c,u,s+r,0,0,0),h=d.getDate();if(1===h)continue;const f=(d.getTime()-n)/(a-n);if(!C(l,o,100*f,i))continue;let g=!1;const v=e.day.tickWidth*t;e.month.tickWidth*t>100&&(v>=30?g=!0:v>=15?g=h%2==0:v>=8?g=(h-1)%7==0:v>=3&&(g=11===h||21===h));const y=M(d,e);g=w(g,y,f,p,t);const x={value:h,label:g?y:"",position:100*f+"%"};if(g&&p.push(x),m.push(x),b(d,h,e)){const e=new Date(d.getTime());e.setDate(1),e.setMonth(e.getMonth()+1),r+=(e.getTime()-d.getTime())/864e5-1}}return m}(ve,e,v,T,be,t,n),r=function(e,t,n,a,l,o,i){if(!e.hour)return[];const r=new Date(n),s=r.getHours(),c=r.getFullYear(),u=r.getMonth(),d=r.getDate(),m=Math.ceil((a-n)/36e5)+1,p=[],h=[],f={value:s,label:M(r,e),position:0};h.push(f);let g=function(e,t){let n=new Date(e).getHours(),a=null;for(;!a;)n%t==0&&(a=n),n++;return a}(n,e.hour.value);g===s&&(g=s+e.hour.value);for(let r=g-s;r<=m-1;r+=e.hour.value){const m=new Date(c,u,d,s+r,0,0),f=m.getHours();if(0===f)continue;if(m.getTime()>a)break;const g=(m.getTime()-n)/(a-n);if(!C(l,o,100*g,i))continue;let v=!1;const y=e.day.tickWidth*t,b=e.hour.tickWidth*t;y<60?v=!1:y<100?v=f%12==0:b>=40?v=!0:b>=20?v=f%2==0:b>=6.67?v=f%6==0:b>=5?v=f%8==0:b>=3.3&&(v=f%12==0);const x=j(m);v=w(v,x,g,h,t);const S={value:f,label:v?x:"",position:100*g+"%"};v&&h.push(S),p.push(S)}return p}(ve,e,v,T,be,t,n),s=function(e,t,n,a,l,o,i){if(!e.minute)return[];const r=new Date(n),s=r.getMinutes(),c=r.getFullYear(),u=r.getMonth(),d=r.getDate(),m=r.getHours(),p=(a-n)/6e4+1,h=[],f=[],g={value:s,label:j(r),position:0};f.push(g);let v=function(e,t){let n=new Date(e).getMinutes(),a=null;for(;!a;)n%t==0&&(a=n),n++;return a}(n,e.minute.value);v===s&&(v=s+e.minute.value);for(let r=v-s;r<=p-1;r+=e.minute.value){const p=new Date(c,u,d,m,s+r,0),g=p.getMinutes();if(0===p.getMinutes())continue;const v=(p.getTime()-n)/(a-n);if(!C(l,o,100*v,i))continue;let y=!1;const b=e.hour.tickWidth*t,x=e.minute.tickWidth*t;b<60?y=!1:b<=160?y=g%30==0:b<300?y=g%15==0:x>28?y=!0:x>20?y=g%2==0:b>15?y=g%5==0:b>10&&(y=g%10==0);const S=k(p,e);y=w(y,S,v,f,t);const M={value:p.getMinutes(),label:y?S:"",position:100*v+"%"};y&&f.push(M),h.push(M)}return h}(ve,e,v,T,be,t,n),c=function(e,t,n,a,l,o){const i={labels:{},ticks:{}},r=[];t.length>1&&r.push("year"),n.length>1&&r.push("month"),a.length>1&&r.push("day"),l.length>1&&r.push("hour"),o.length>1&&r.push("minute");const s=r[r.length-1],c=Object.keys(e).filter((t=>e[t]));if(1===r.length)c.forEach((e=>{i.ticks[e]="medium",i.labels[e]="short"}));else{if(2===r.length)i.ticks[s]="medium",c.forEach((e=>{e!==s&&(i.ticks[e]="long")}));else{const e=r[r.length-2];i.ticks[s]="short",i.ticks[e]="medium",c.forEach((t=>{t!==s&&t!==e&&(i.ticks[t]="long")}))}i.labels=i.ticks}return i}(ve,l,o,i,r,s),u=["year","month","day","hour","minute"];return(0,a.jsx)("div",{className:"timeline-ticks"},[l,o,i,r,s].map(((e,t)=>e.map(((e,n)=>{const l=e.position,o=u[t];return(0,a.jsx)("div",{key:`item-${t}-${n}`,className:"timeline-tick-container","data-unit":o,style:{left:l}},e.label&&(0,a.jsx)("div",{className:`timeline-tick_label ${c.labels[o]}-label ${"year"===o&&0===n&&0===be?"timeline-first_label":""}`},e.label),(0,a.jsx)("div",{key:n,className:(0,a.classNames)(`timeline-tick ${c.ticks[o]}-tick`,e.label?"has-label":"no-label")}))})))))}),[ve,K,be]),et=a.React.useMemo((()=>function(e,t,n,l,o){const i=(0,a.getAppStore)().getState().appContext.isRTL;return n=(0,oe.getThemeColorValue)(n||e.colors.black,e),l=l||e.colors.white,o=(0,oe.getThemeColorValue)(o||e.colors.palette.primary[600]),a.css`
    color: red;
    height: fit-content;
    color: ${n};
    background: ${l||"transparent"};

    // Common style
    .timeline-header, .timeline-footer {
      height: 16px;
      display: flex;
      flex-direction: ${i?"row-reverse":"row"};
      align-items: center;
      justify-content: space-between;
      .zoom-container {
        min-width: 36px;
        display: flex;
        flex-direction: ${i?"row-reverse":"row"};
      }
      .range-label {
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .timeline-content {
      overflow-x: hidden;

      .timeline-whole {
        .timeline-ticks {
          position: relative;
          .timeline-tick-container {
            position: absolute;
            user-select: none;
            .timeline-tick {
              width: 1px;
              background: ${a.polished.rgba(n,.5)};
            }
            .timeline-tick_label {
              font-size: 11px;
              font-weight: 400;
              line-height: 15px;
              width: max-content;
              transform: translate(${i?"50%":"-50%"});
              color: foregroundColor;
              &.long-label {
                font-weight: 600;
              }
              &.medium-label {
                font-weight: 500;
              }
              &.short-label {
                font-weight: 400;
              }
              &.timeline-first_label {
                /* transform: ${"translate(-7px)"}; */
                transform: translate(0);
              }
            }

          }

        }
        .timeline-arrow {
          position: absolute;
          &.left-arrow{
            transform: scaleX(-1);
          }
        }
      }

      .timeline-range-container {
        height: 8px;
        /* width: ${"calc(100% - 14px)"}; */
        width: 100%;
        border-radius: 4px;
        background-color: ${a.polished.rgba(n,.2)};
        .resize-handlers {
          height: 100%;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          background-color: ${o};

          .resize-handler {
            width: 8px;
            height: 8px;
            padding: 0;
            overflow: visible;
            border-radius: 8px;
            background: ${o};
            border: 2px solid ${o};
          }

          &:hover {
            .resize-handler {
              background: ${l};
            }
          }
        }
      }
    }
    .jimu-btn {
        color: ${n};
        border-radius: 16px;
        &:hover:not(:disabled) {
          color: ${n};
          background-color: ${a.polished.rgba(n,.2)};
        }
        &.disabled {
          color: ${a.polished.rgba(n,.2)};
        }
        .jimu-icon {
          margin: 0
        }

        .icon-btn-sizer {
          min-width: 0;
          min-height: 0;
        }
    }

    // Clasic style
    &.timeline-classic {
      padding: 1rem 1.5rem;
      .timeline-middle {
        .timeline-content {
          margin: 1rem 0.5rem;
          .timeline-whole {
            .timeline-ticks {
              padding-top: 0.75rem;
              .timeline-tick-container {
                .timeline-tick {
                  &.long-tick {
                    height: 12px;
                    &.no-label {
                      margin-top: 19px;
                    }
                    &.has-label {
                      margin-top: 0;
                    }
                  }
                  &.medium-tick {
                    height: 8px;
                    &.no-label {
                      margin-top: 23px;
                    }
                    &.has-label {
                      margin-top: 8px;
                    }
                  }
                  &.short-tick {
                    height: 4px;
                    &.no-label {
                      margin-top: 27px;
                    }
                    &.has-label {
                      margin-top: 12px;
                    }
                  }
                }
                .timeline-tick_label {
                  margin-bottom: 4px;
                }
              }
            }
            .timeline-arrow {
              top: 78px;
              &.left-arrow{
                left: ${i?"unset":"20px"};
                right: ${i?"20px":"unset"};
              }
              &.right-arrow{
                left: ${i?"20px":"unset"};
                right: ${i?"unset":"20px"};
              }
            }
          }
          .timeline-range-container .resize-handlers .resize-handler {
            min-width: 8px;
          }
        }
      }
      .timeline-footer {
        flex-direction: ${i?"row-reverse":"row"};
        .play-container {
          min-width: 65px;
          .play-btn {
            margin: 0 0.25rem;
          }
        }
      }

      .jimu-btn {
        padding: 0 !important;
      }
    }

    // Modern style
    &.timeline-modern {
      display: flex;
      flex-direction: ${i?"row-reverse":"row"};
      padding: 1rem;
      height: 156px;
      .timeline-left, .timeline-right {
        display: flex;
        .play-container {
          display: flex;
          margin-top: 0.5rem;
          flex-direction: column-reverse;
          justify-content: center;
          .next-btn {
            margin-bottom: 0.25rem;
          }
        }
      }
      .timeline-middle {
        flex-grow: 1;
        .timeline-header{
          .range-label {
            margin: 0 0.25rem
          }
          .jimu-btn {
            padding: 0 !important;
          }
        }

        .timeline-content {
          height: 115px;
          margin: 0.5rem;
          margin-bottom: 0;
          .timeline-content-inside {
            border: 1px solid ${a.polished.rgba(n,.5)};
            border-radius: 8px;
          }

          .timeline-whole {
            display: flex;
            flex-direction: column;
            .timeline-ticks {
              .timeline-tick-container {
                display: flex;
                flex-direction: column-reverse;
                .timeline-tick {
                  &.long-tick {
                    height: 32px;
                  }
                  &.medium-tick {
                    height: 16px;
                    margin-top: 16px;
                  }
                  &.short-tick {
                    height: 8px;
                    margin-top: 24px;
                  }
                }
                .timeline-tick_label {
                  margin-top: 0.5rem;
                }
              }
            }
            .timeline-arrow {
              top: 68px;
              &.left-arrow{
                left: ${i?"unset":"50px"};
                right: ${i?"50px":"unset"};
              }
              &.right-arrow{
                left: ${i?"50px":"unset"};
                right: ${i?"unset":"50px"};
              }
            }

            .timeline-range-container {
              width: 100%;
              background: transparent;
              .resize-handlers {
                background-color: ${a.polished.rgba(o,.7)};
                .resize-handler {
                  min-width: 4px;
                  width: 4px;
                  height: calc(100% - 10px);
                  margin: 5px 0;
                  /**TODO */
                  background: transparent;
                  border: none;
                  &.show-bg { /** When handlers.w = 0 */
                    background-color: ${a.polished.rgba(o,.7)};
                    height: 100%;
                    margin: 0;
                    &:hover {
                      background-color: ${a.polished.rgba(o,.9)};
                    }
                  }
                }
                &:hover {
                  .resize-handler {
                    background: ${a.polished.rgba(o,.7)};
                  }
                }
              }
            }
          }
        }
      }

    }
  `}(g,0,c,h,f)),[g,7,c,h,f]),tt=a.React.useMemo((()=>(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",disabled:0===K,onClick:()=>{Ye(!1),ee(Math.max(0,K-1))}},(0,a.jsx)($,null))),[K,Ye]),nt=a.React.useMemo((()=>(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",disabled:K===(null==ne?void 0:ne.zoomLevel),onClick:()=>{Ye(!0),ee(Math.min(null==ne?void 0:ne.zoomLevel,K+1))}},(0,a.jsx)(A,null))),[K,ne,Ye]),at=a.React.useMemo((()=>V?(0,a.jsx)(o.Tooltip,{title:ce(pe?"pause":"play"),placement:"bottom"},(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",className:"play-btn",onClick:()=>he(!pe)},pe?(0,a.jsx)(J,null):(0,a.jsx)(H,null))):null),[V,pe,ce]),lt=a.React.useMemo((()=>(0,a.jsx)(a.React.Fragment,null,(0,a.jsx)(o.Tooltip,{title:ce("previous"),placement:"bottom"},(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",onClick:e=>_e(!1)},(0,a.jsx)(q,null))),s===e.Classic&&at,(0,a.jsx)(o.Tooltip,{title:ce("next"),placement:"bottom"},(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",className:"next-btn",onClick:e=>_e(!0)},(0,a.jsx)(te,null))))),[ce,s,_e,at]),ot=a.React.useMemo((()=>{const e=a.dateUtils.formatDateLocally(v,se,u,d),t=a.dateUtils.formatDateLocally(T,se,u,d);return(0,a.jsx)(a.React.Fragment,null,(0,a.jsx)(o.Button,{type:"tertiary",size:"sm",onClick:e=>We(!Ve),ref:e=>{Ae.current=e}},(0,a.jsx)(B,null)),(0,a.jsx)(o.Popper,{open:Ve,keepMount:!0,showArrow:!0,reference:Ae,toggle:e=>{We(!e),a.lodash.defer((()=>{Ae.current.focus()}))}},(0,a.jsx)("div",{className:"p-3"},(0,a.jsx)("div",{className:"mb-2"},`${e} - ${t}`),(0,a.jsx)(o.Label,{check:!0,className:"d-flex align-items-center"},(0,a.jsx)("h5",{className:"flex-grow-1 mb-0"},"Timeline filtering applied"),(0,a.jsx)(o.Switch,{checked:r,onChange:(e,t)=>{G(t)}})))))}),[v,T,se,Ve,r,G]),it=a.React.useMemo((()=>(0,a.jsx)(o.Dropdown,{activeIcon:!0},(0,a.jsx)(o.Tooltip,{title:ce("speed"),placement:"bottom"},(0,a.jsx)(o.DropdownButton,{icon:!0,type:"tertiary",arrow:!1,"aria-label":ce("speed"),"a11y-description":ue.filter((e=>e.value===de))[0].label},(0,a.jsx)(le,null))),(0,a.jsx)(o.DropdownMenu,null,ue.map((e=>(0,a.jsx)(o.DropdownItem,{key:e.value,value:e.value,active:e.value===de,onClick:e=>me(e.target.value)},e.label)))))),[ue,de,ce]),rt=o.hooks.useEventCallback((e=>{const t=T-v,n=N(Y,K,ne);let a=(v+be/100*t+t/n*(e?1:-1)-v)/(T-v)*100;a=Math.max(0,a),a=Math.min(a,(n-1)/n*100),we(a)})),st=N(Y,K,ne),ct=(0,a.getAppStore)().getState().appContext.isRTL,ut=De||xe,dt=Oe||ke||Me,{startPositionForStep:mt,widthForStep:pt}=((t,n)=>{let a=(t-v)/(T-v),l=(n-v)/(T-v)-a;return t===T?(a=s===e.Classic?"calc(100% - 16px)":"calc(100% - 8px)",l=0):a=100*a+"%",{startPositionForStep:a,widthForStep:l}})(ut,dt),ht=a.dateUtils.formatDateLocally(ut,se,u,d),ft=a.dateUtils.formatDateLocally(dt,se,u,d),gt=0!==be,vt=100-be-1/st*100>1e-11;return(0,a.jsx)("div",{css:et,dir:"ltr",className:(0,a.classNames)("timeline w-100",{"timeline-classic":s===e.Classic,"timeline-modern":s===e.Modern})},s===e.Modern&&(0,a.jsx)("div",{className:"timeline-left"},(0,a.jsx)("div",{className:"play-container"},lt)),(0,a.jsx)("div",{className:"timeline-middle"},(0,a.jsx)("div",{className:"timeline-header"},s===e.Classic&&(0,a.jsx)("div",{className:"range-label",dir:ct?"rtl":"ltr"},ht+" - "+ft),s===e.Modern&&(0,a.jsx)(a.React.Fragment,null,ot,(0,a.jsx)("div",{className:"range-label",dir:ct?"rtl":"ltr"},ht+" - "+ft)),(0,a.jsx)("div",{className:"zoom-container"},0===K?tt:(0,a.jsx)(o.Tooltip,{title:ce("zoomOut"),placement:"bottom"},tt),K===(null==ne?void 0:ne.zoomLevel)?nt:(0,a.jsx)(o.Tooltip,{title:ce("zoomIn"),placement:"bottom"},nt))),(0,a.jsx)("div",{className:"timeline-content"},(0,a.jsx)("div",{className:"timeline-content-inside"},(0,a.jsx)("div",{className:"timeline-whole",ref:e=>fe.current=e,style:{width:100*st+"%",height:X+"px",marginLeft:-be*st+"%"}},s===e.Modern&&(0,a.jsx)("div",{style:{height:X-32+"px"}}),Ke,s===e.Modern&&(0,a.jsx)("div",{className:"timeline-range-container",style:{height:X+"px",marginTop:-(X-32)+"px"}},(0,a.jsx)("div",{className:"resize-handlers",ref:e=>Le.current=e,style:{marginLeft:mt,width:100*pt+"%"}},(0,a.jsx)("button",{className:"resize-handler resize-left "+(ut===dt?"show-bg":""),ref:e=>{Ie.current=e},title:ht}),(0,a.jsx)("button",{className:"resize-handler resize-right "+(ut===dt?"show-bg":""),ref:e=>{Pe.current=e},title:ft}))),gt&&(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",className:"timeline-arrow left-arrow",style:{left:s===e.Modern&&!V&&ct?"25px":"null"},onClick:e=>rt(!1)},(0,a.jsx)(o.Icon,{width:4,height:16,icon:ie})),vt&&(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",className:"timeline-arrow right-arrow",style:{right:s!==e.Modern||V||ct?"null":"25px"},onClick:e=>rt(!0)},(0,a.jsx)(o.Icon,{width:4,height:16,icon:ie}))),s===e.Classic&&(0,a.jsx)("div",{className:"timeline-range-container",style:{width:100*st+"%",marginLeft:-be*st+"%"}},(0,a.jsx)("div",{className:"resize-handlers",ref:e=>Le.current=e,style:{marginLeft:mt,width:100*pt+"%"}},(0,a.jsx)("button",{className:"resize-handler resize-left",ref:e=>{Ie.current=e},title:ht}),(0,a.jsx)("button",{className:"resize-handler resize-right",ref:e=>{Pe.current=e},title:ft}))))),s===e.Classic&&(0,a.jsx)("div",{className:"timeline-footer"},ot,(0,a.jsx)("div",{className:"play-container"},lt),V?it:(0,a.jsx)("div",null))),s===e.Modern&&(0,a.jsx)("div",{className:"timeline-right"},(0,a.jsx)("div",{className:"play-container"},at,V&&it)))},ce=r(66376),ue=e=>{var i,r,s,c;const{useDataSources:u,theme:d,id:f,config:y,intl:b}=e,{enablePlayControl:w,speed:x,autoPlay:S,timeSettings:M,honorTimeSettings:j,dataSourceType:k,timeStyle:T,foregroundColor:D,backgroundColor:R,sliderColor:O}=y,[C,N]=a.React.useState(null),[E,L]=a.React.useState(!0),[P,z]=a.React.useState(x),[A,V]=a.React.useState(null),[W,$]=a.React.useState(null),[F,Z]=a.React.useState(null),[B,U]=a.React.useState(!0),[G,H]=a.React.useState(!0),[Y,_]=a.React.useState(null),[J,X]=a.React.useState(null),Q=a.React.useRef(null),q=a.React.useMemo((()=>l.MapViewManager.getInstance()),[]),K=a.React.useMemo((()=>a.DataSourceManager.getInstance()),[]);a.React.useEffect((()=>{var e;return _(null===(e=Q.current)||void 0===e?void 0:e.clientWidth),(0,l.loadArcGISJSAPIModules)(["esri/core/watchUtils"]).then((e=>{$(e[0])})),()=>{ee(null,null,!0)}}),[]),a.React.useEffect((()=>{if(Z(null),k!==a.DataSourceTypes.FeatureLayer){let e=null;if((null==u?void 0:u.length)>0){e=[];const t=[];u.forEach((e=>{t.push(K.createDataSourceByUseDataSource((0,a.Immutable)(e)))})),Promise.all(t).then((t=>{const n={};t.forEach((e=>{n[e.id]=e})),t.forEach((t=>{t.getAllChildDataSources().forEach((t=>{var n,l;t.type===a.DataSourceTypes.FeatureLayer&&t.supportTime()&&e.push({dataSourceId:t.id,mainDataSourceId:null===(n=t.getMainDataSource())||void 0===n?void 0:n.id,dataViewId:t.dataViewId,rootDataSourceId:null===(l=t.getRootDataSource())||void 0===l?void 0:l.id})}))})),Z(n),V((0,a.Immutable)(e))})).catch((e=>{}))}}else V(u)}),[u,K,k,V,Z]),a.React.useEffect((()=>{if(F&&W)if(j){const{settings:e,speed:a}=function(e,a=!1){var o,i,r;let s=null;const c=e[Object.keys(e).filter((t=>e[t].type===l.ArcGISDataSourceTypes.WebMap))[0]],u=null===(r=null===(i=null===(o=null==c?void 0:c.getItemData())||void 0===o?void 0:o.widgets)||void 0===i?void 0:i.timeSlider)||void 0===r?void 0:r.properties;let d;if(u){const{startTime:e,endTime:l,timeStopInterval:o,numberOfStops:i,thumbMovingRate:r,thumbCount:c}=u;if(a&&(d=function(e){let n;const a=1e3*Math.ceil(e/1e3);return Object.keys(p).some((e=>p[e]===a&&(n=e.toUpperCase(),!0))),n||(a>p.slowest?n=t.Slowest:a<p.fastest&&(n=t.Fastest)),n}(r)),s={layerList:null,startTime:{value:e},endTime:{value:l},timeDisplayStrategy:2===c?n.current:n.cumulatively},o){const e=function(e){switch(e){case"esriTimeUnitsMonths":return"month";case"esriTimeUnitsDays":return"day";case"esriTimeUnitsHours":return"hour";case"esriTimeUnitsMinutes":return"minute";default:return"year"}}(o.units);s.accuracy=e,s.stepLength={val:o.interval,unit:e}}else if(i){s.dividedCount=i;const t=v(e,l);s.accuracy=t[0];const n=(l-e)/i;t.some((e=>n>=1e3*m[e]&&(s.accuracy=e,!0)))}}return{settings:s,speed:d}}(F,!0);z(a),X(e)}else{const e=function(e,t,n=!1){const{startTime:l,endTime:o,layerList:i,accuracy:r,stepLength:s}=e||{};let c;const{startTime:u,endTime:d}=function(e,t,n,a){let l=h(n),o=h(a,!1),i=null,r=null;if(!l||!o){const n=g(e,t);n&&(e=n),Object.keys(e).forEach((t=>{var n,a;const s=e[t].getTimeInfo();if(!l){const e=null===(n=null==s?void 0:s.timeExtent)||void 0===n?void 0:n[0];i=i?Math.min(i,e):e}if(!o){const e=null===(a=null==s?void 0:s.timeExtent)||void 0===a?void 0:a[1];r=r?Math.max(r,e):e}})),l=l||i,o=o||r}return{startTime:l,endTime:o}}(t,i,l,o),p=v(u,d),f=p[0],y=function(e,t,n){const a=(t-e)/1e3/m[n];return{val:a>10?10:a>5?5:1,unit:n}}(u,d,f);if(e){c=(0,a.Immutable)(e);const t=!p.includes(r);t&&(c=c.set("accuracy",f)),s&&(t||m[s.unit]>m[f]||1e3*m[s.unit]*s.val>d-u)&&(c=c.set("stepLength",y))}else c=(0,a.Immutable)(function(e,t){return{layerList:null,startTime:{value:a.dateUtils.VirtualDateType.Min},endTime:{value:a.dateUtils.VirtualDateType.Max},timeDisplayStrategy:"CURRENT",dividedCount:null,accuracy:e,stepLength:t}}(f,y));return n?(c=c.set("startTime",{value:u}).set("endTime",{value:d}),c):(0,a.Immutable)({config:c,exactStartTime:u,exactEndTime:d,minAccuracy:f,accuracyList:p})}(M,F,!0);z(x),X(e)}}),[F,W,j,x,M]);const ee=o.hooks.useEventCallback(((e,t,n=!1)=>{var a;if(!F)return;const o={time:n?null:[e,t]};if(n||(()=>{let e=[],t=null;const n=q.getAllJimuMapViewIds();k===l.ArcGISDataSourceTypes.WebMap?(t=F[Object.keys(F)[0]],e=t.getAllChildDataSources().map((e=>e.id))):e=Object.keys(F);const a=[];e.forEach((e=>{const o=t||F[e].getRootDataSource();if((null==o?void 0:o.type)===l.ArcGISDataSourceTypes.WebMap){const t=n.filter((e=>q.getJimuMapViewById(e).dataSourceId===o.id));t.forEach((t=>{const n=((e,t)=>{let n=null;return Object.keys(e.jimuLayerViews).forEach((a=>{e.jimuLayerViews[a].layerDataSourceId===t&&(n=e.jimuLayerViews[a])})),n})(q.getJimuMapViewById(t),e);(null==n?void 0:n.view)&&a.push(W.whenFalseOnce(n.view,"updating"))}))}})),Promise.all(a).then((e=>{U(!1)}))})(),k===l.ArcGISDataSourceTypes.WebMap){const e=g(F,null===(a=y.timeSettings)||void 0===a?void 0:a.layerList);Object.keys(e).forEach((t=>{te(e[t],o,f)}))}else Object.keys(F).forEach((e=>{te(F[e],o,f)}))}));a.React.useEffect((()=>{C&&ee(C[0],C[1],!E)}),[C,E,ee]);const te=(e,t,n)=>{var l,o,i,r;e.type===a.DataSourceTypes.MapService?(null===(l=(e=e).supportTime)||void 0===l?void 0:l.call(e))&&(null===(o=e.changeTimeExtent)||void 0===o||o.call(e,t.time,n)):e.type===a.DataSourceTypes.FeatureLayer&&(null===(i=(e=e).supportTime)||void 0===i?void 0:i.call(e))&&(null===(r=e.updateQueryParams)||void 0===r||r.call(e,t,n))},ne=e=>{_(e)};if(u&&0!==u.length){if(F&&W&&null===J||(null===(i=null==J?void 0:J.startTime)||void 0===i?void 0:i.value)>(null===(r=null==J?void 0:J.endTime)||void 0===r?void 0:r.value)){const e="Oops! Seems like something went wrong with this map and we cannot get any valid time settings.",t="Please check the widget configurations to make sure the time span is valid.";return(0,a.jsx)("div",{className:"placeholder-container w-100 h-100 position-relative"},(0,a.jsx)(o.WidgetPlaceholder,{icon:ce,widgetId:f,message:b.formatMessage({id:"_widgetLabel",defaultMessage:I._widgetLabel})}),(0,a.jsx)(o.Alert,{buttonType:"tertiary",form:"tooltip",size:"small",type:"warning",withIcon:!0,className:"position-absolute",style:{bottom:10,right:10,backgroundColor:"var(--warning-100)",border:"1px solid var(--warning-300)"},text:null===J?e:t}))}return(0,a.jsx)("div",{className:"timeline-widget",ref:e=>Q.current=e},(0,a.jsx)(a.ReactResizeDetector,{handleWidth:!0,onResize:ne}),(null==A?void 0:A.length)>0&&(0,a.jsx)(a.MultipleDataSourceComponent,{useDataSources:A},((e,t)=>{if(k===a.DataSourceTypes.FeatureLayer){const n=Object.keys(t).filter((e=>{var n;return[a.DataSourceStatus.Created,a.DataSourceStatus.CreateError].includes(null===(n=t[e])||void 0===n?void 0:n.instanceStatus)})).length===u.length;!F&&n&&Object.keys(e).length===u.length&&setTimeout((()=>{Z(e)}),0)}const n=Object.keys(t).filter((e=>t[e]&&t[e].status!==a.DataSourceStatus.Loading)).length===Object.keys(t).length;setTimeout((()=>{H(!n)}),0)})),F&&J&&(0,a.jsx)(se,{theme:d,width:Y,updating:G||B,startTime:null===(s=J.startTime)||void 0===s?void 0:s.value,endTime:null===(c=J.endTime)||void 0===c?void 0:c.value,accuracy:J.accuracy,stepLength:J.stepLength,dividedCount:J.dividedCount,cumulatively:J.timeDisplayStrategy===n.cumulatively,timeStyle:T,foregroundColor:D,backgroundColor:R,sliderColor:O,enablePlayControl:w,speed:P,autoPlay:S,applied:E,onTimeChanged:(e,t)=>N([e,t]),onApplyStateChanged:e=>L(e)}))}return(0,a.jsx)(o.WidgetPlaceholder,{icon:ce,widgetId:f,message:b.formatMessage({id:"_widgetLabel",defaultMessage:I._widgetLabel})})}})(),s})())}}}));