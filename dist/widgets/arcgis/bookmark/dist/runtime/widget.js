System.register(["jimu-core","jimu-ui","jimu-core/react","jimu-arcgis","jimu-layouts/layout-runtime"],(function(e,t){var i={},a={},o={},s={},r={};return{setters:[function(e){i.AppMode=e.AppMode,i.BaseVersionManager=e.BaseVersionManager,i.BrowserSizeMode=e.BrowserSizeMode,i.React=e.React,i.TransitionContainer=e.TransitionContainer,i.appActions=e.appActions,i.classNames=e.classNames,i.css=e.css,i.defaultMessages=e.defaultMessages,i.getAppStore=e.getAppStore,i.jsx=e.jsx,i.polished=e.polished,i.utils=e.utils},function(e){a.Button=e.Button,a.Card=e.Card,a.CardBody=e.CardBody,a.Dropdown=e.Dropdown,a.DropdownButton=e.DropdownButton,a.DropdownItem=e.DropdownItem,a.DropdownMenu=e.DropdownMenu,a.ImageFillMode=e.ImageFillMode,a.ImageWithParam=e.ImageWithParam,a.NavButtonGroup=e.NavButtonGroup,a.SVG=e.SVG,a.Select=e.Select,a.TextInput=e.TextInput,a.defaultMessages=e.defaultMessages},function(e){o.Fragment=e.Fragment},function(e){s.JimuMapViewComponent=e.JimuMapViewComponent,s.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules},function(e){r.LayoutEntry=e.LayoutEntry,r.ViewVisibilityContext=e.ViewVisibilityContext,r.ViewportVisibilityContext=e.ViewportVisibilityContext}],execute:function(){e((()=>{var e={74138:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM6.25 5.621a.6.6 0 0 1 .933-.5l3.568 2.38a.6.6 0 0 1 0 .998l-3.568 2.38a.6.6 0 0 1-.933-.5V5.62Z" fill="#000"></path></svg>'},25603:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m2.556 4.75.297 9.75c0 .398.164.78.455 1.06.292.282.688.44 1.1.44h7.184c.412 0 .808-.158 1.1-.44.291-.28.455-.662.455-1.06l.297-9.75H2.556Zm4.333 8.222a.778.778 0 1 1-1.556 0V7.778a.778.778 0 1 1 1.556 0v5.194Zm3.667 0a.778.778 0 1 1-1.556 0V7.778a.778.778 0 1 1 1.556 0v5.194ZM12.058 2.5a1 1 0 0 1-.766-.357l-.659-.786A1 1 0 0 0 9.867 1H6.133a1 1 0 0 0-.766.357l-.659.786a1 1 0 0 1-.766.357H2a1 1 0 0 0-1 1V4h14v-.5a1 1 0 0 0-1-1h-1.942Z" fill="#000"></path></svg>'},20864:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 6.133c0 .598-.28 1.46-.825 2.51-.53 1.02-1.247 2.102-1.981 3.102A45.718 45.718 0 0 1 8 14.492a48.01 48.01 0 0 1-2.194-2.747c-.734-1-1.451-2.081-1.98-3.102C3.28 7.593 3 6.731 3 6.133 3 3.277 5.26 1 8 1s5 2.277 5 5.133Zm1 0c0 2.685-3.768 7.311-5.332 9.115C8.258 15.722 8 16 8 16s-.258-.279-.668-.752C5.768 13.444 2 8.819 2 6.133 2 2.746 4.686 0 8 0s6 2.746 6 6.133ZM10 5.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm1 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" fill="#000"></path></svg>'},59788:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.146 4.653a.485.485 0 0 1 .708 0L8 10.24l5.146-5.587a.485.485 0 0 1 .708 0 .538.538 0 0 1 0 .738l-5.5 5.956a.485.485 0 0 1-.708 0l-5.5-5.956a.538.538 0 0 1 0-.738Z" fill="#000"></path></svg>'},11407:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.347 2.146a.485.485 0 0 1 0 .708L5.76 8l5.587 5.146a.486.486 0 0 1 0 .708.538.538 0 0 1-.738 0l-5.956-5.5a.485.485 0 0 1 0-.708l5.956-5.5a.538.538 0 0 1 .738 0Z" fill="#000"></path></svg>'},3273:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.653 13.854a.485.485 0 0 1 0-.708L10.24 8 4.653 2.854a.485.485 0 0 1 0-.708.538.538 0 0 1 .738 0l5.956 5.5a.485.485 0 0 1 0 .708l-5.956 5.5a.538.538 0 0 1-.738 0Z" fill="#000"></path></svg>'},96009:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.854 11.347a.486.486 0 0 1-.708 0L8 5.76l-5.146 5.587a.485.485 0 0 1-.708 0 .538.538 0 0 1 0-.738l5.5-5.956a.485.485 0 0 1 .708 0l5.5 5.956a.538.538 0 0 1 0 .738Z" fill="#000"></path></svg>'},57986:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 1H4v14h1V1Zm7 0h-1v14h1V1Z" fill="#000"></path></svg>'},34750:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0a.5.5 0 0 0-.5.5V7H.5a.5.5 0 0 0 0 1H7v6.5a.5.5 0 0 0 1 0V8h6.5a.5.5 0 0 0 0-1H8V.5a.5.5 0 0 0-.5-.5Z" fill="#000"></path></svg>'},25153:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm1.5-.5a.5.5 0 0 0 0 1h8a.5.5 0 0 0 0-1h-8ZM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm1-4a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8A.5.5 0 0 1 5 8Zm.5 3.5a.5.5 0 0 0 0 1h8a.5.5 0 0 0 0-1h-8Z" fill="#000"></path></svg>'},42231:e=>{e.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB2ZXJzaW9uPSIxLjEiPg0KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNjAgKDg4MTAzKSAtIGh0dHBzOi8vc2tldGNoLmNvbSAtLT4NCiAgICA8dGl0bGU+aWNvbi1pbWFnZTwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGcgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+DQogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjcuMDAwMDAwLCAtNjU3LjAwMDAwMCkiIGZpbGw9IiNDNUM1QzUiPg0KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTY3LjAwMDAwMCwgNjU3LjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNzMuNzE0Mjg2LDg5IEwyNTYsMTk4IEwwLDE5OCBMNjQsMTE2LjI1IEwxMDkuNzE0Mjg2LDE3MC43NSBMMTczLjcxNDI4Niw4OSBaIE05OSw1OCBDMTA3LjgzNjU1Niw1OCAxMTUsNjUuMTYzNDQ0IDExNSw3NCBDMTE1LDgyLjgzNjU1NiAxMDcuODM2NTU2LDkwIDk5LDkwIEM5MC4xNjM0NDQsOTAgODMsODIuODM2NTU2IDgzLDc0IEM4Myw2NS4xNjM0NDQgOTAuMTYzNDQ0LDU4IDk5LDU4IFoiLz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg=="},26826:e=>{"use strict";e.exports=s},48891:e=>{"use strict";e.exports=i},51315:e=>{"use strict";e.exports=o},74758:e=>{"use strict";e.exports=r},30726:e=>{"use strict";e.exports=a}},t={};function n(i){var a=t[i];if(void 0!==a)return a.exports;var o=t[i]={exports:{}};return e[i](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="";var l={};return n.p=window.jimuConfig.baseUrl,(()=>{"use strict";n.r(l),n.d(l,{Widget:()=>Z,default:()=>U});var e,t,i,a,o,s,r=n(48891),d=n(30726);!function(e){e.Horizon="HORIZON",e.Vertical="VERTICAL"}(e||(e={})),function(e){e.Scroll="SCROLL",e.Paging="PAGING"}(t||(t={})),function(e){e.All="ALL",e.Selected="SELECTED"}(i||(i={})),function(e){e.Card="CARD",e.List="LIST",e.Slide1="SLIDE1",e.Slide2="SLIDE2",e.Slide3="SLIDE3",e.Gallery="GALLERY",e.Navigator="NAVIGATOR",e.Custom1="CUSTOM1",e.Custom2="CUSTOM2"}(a||(a={})),function(e){e.Default="DEFAULT",e.Regular="REGULAR",e.Hover="HOVER"}(o||(o={})),function(e){e.Snapshot="SNAPSHOT",e.Custom="CUSTOM"}(s||(s={}));const p={_widgetLabel:"Bookmark",_widgetDescription:"A widget identify specific geographic locations and save to refer later.",addBookmark:"Add bookmark",layoutTips:"This is the customizable area",bookmarkList:"Bookmark list",graphicLayer:"Bookmark graphics layer"};var c=n(51315),m=n(26826),u=n(74758);class g extends r.BaseVersionManager{constructor(){super(...arguments),this.versions=[{version:"1.2.0",description:"1.2.0",upgrader:e=>{let t=e;return t.bookmarks?(t.bookmarks.forEach(((e,i)=>{Object.keys(e.layersConfig||{}).forEach((a=>{const o=e.layersConfig[a];t=t.setIn(["bookmarks",i,"layersConfig",a],{visibility:o})}))})),t):t}}]}}const h=new g;var v=n(25153),y=n.n(v);const x=e=>{const{className:t}=e,i=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),a=(0,r.classNames)("jimu-icon jimu-icon-component",t);return r.React.createElement(d.SVG,Object.assign({className:a,src:y()},i))};var k=n(74138),b=n.n(k);const w=e=>{const{className:t}=e,i=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),a=(0,r.classNames)("jimu-icon jimu-icon-component",t);return r.React.createElement(d.SVG,Object.assign({className:a,src:b()},i))};var f=n(57986),j=n.n(f);const N=e=>{const{className:t}=e,i=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),a=(0,r.classNames)("jimu-icon jimu-icon-component",t);return r.React.createElement(d.SVG,Object.assign({className:a,src:j()},i))};var S=n(20864),I=n.n(S);const C=e=>{const{className:t}=e,i=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),a=(0,r.classNames)("jimu-icon jimu-icon-component",t);return r.React.createElement(d.SVG,Object.assign({className:a,src:I()},i))};var M=n(34750),O=n.n(M);const A=e=>{const{className:t}=e,i=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),a=(0,r.classNames)("jimu-icon jimu-icon-component",t);return r.React.createElement(d.SVG,Object.assign({className:a,src:O()},i))};var P=n(59788),B=n.n(P);const L=e=>{const{className:t}=e,i=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),a=(0,r.classNames)("jimu-icon jimu-icon-component",t);return r.React.createElement(d.SVG,Object.assign({className:a,src:B()},i))};var V=n(96009),T=n.n(V);const z=e=>{const{className:t}=e,i=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),a=(0,r.classNames)("jimu-icon jimu-icon-component",t);return r.React.createElement(d.SVG,Object.assign({className:a,src:T()},i))};var $=n(3273),R=n.n($);const D=e=>{const{className:t}=e,i=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),a=(0,r.classNames)("jimu-icon jimu-icon-component",t);return r.React.createElement(d.SVG,Object.assign({className:a,src:R()},i))};var E=n(11407),G=n.n(E);const F=e=>{const{className:t}=e,i=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),a=(0,r.classNames)("jimu-icon jimu-icon-component",t);return r.React.createElement(d.SVG,Object.assign({className:a,src:G()},i))};var H=n(25603),J=n.n(H);const W=e=>{const{className:t}=e,i=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),a=(0,r.classNames)("jimu-icon jimu-icon-component",t);return r.React.createElement(d.SVG,Object.assign({className:a,src:J()},i))};class Z extends r.React.PureComponent{constructor(l){super(l),this.Graphic=null,this.GraphicsLayer=null,this.Extent=null,this.Viewpoint=null,this.Basemap=null,this.autoOffCondition=e=>{var i,a;const{config:o,appMode:s,browserSizeMode:n}=this.props,{pageStyle:l,autoPlayAllow:d,autoInterval:p,autoLoopAllow:c}=o,m=n!==e.browserSizeMode,u=p!==(null===(i=e.config)||void 0===i?void 0:i.autoInterval)||c!==(null===(a=e.config)||void 0===a?void 0:a.autoLoopAllow);return s===r.AppMode.Design||l===t.Scroll||!d||u||m},this.getRuntimeUuid=()=>{const{id:e,mapWidgetId:t}=this.props;return`${r.utils.getLocalStorageAppKey()}-${e}-${t||"default"}-RtBmArray`},this.settingLayout=()=>{const{layoutId:e,layoutItemId:t,id:i,selectionIsSelf:a}=this.props,{isSetLayout:o}=this.state;e&&i&&t&&!o&&a&&(this.props.dispatch(r.appActions.widgetStatePropChange(i,"layoutInfo",{layoutId:e,layoutItemId:t})),this.setState({isSetLayout:!0}))},this.formatMessage=(e,t)=>{const i=Object.assign({},p,d.defaultMessages,r.defaultMessages);return this.props.intl.formatMessage({id:e,defaultMessage:i[e]},t)},this.isEditing=()=>{const{appMode:e,config:t,selectionIsSelf:i,selectionIsInSelf:a}=this.props;return!!window.jimuConfig.isInBuilder&&(i||a)&&window.jimuConfig.isInBuilder&&e!==r.AppMode.Run&&t.isTemplateConfirm},this.handleRuntimeAdd=()=>{this.rtBookmarkId++;const{jimuMapView:e}=this.state;if(!e)return;const t=e.view,{appMode:i,id:a}=this.props;if(i===r.AppMode.Run){const i=t.map.layers.toArray(),o=JSON.parse(JSON.stringify(t.map)).operationalLayers,s=[];i.forEach((e=>{for(const t in o){const i=o[t];if(e.id===i.id){s.push(e);break}}}));const n=this.getLayersConfig(s),l=`RtBm-${r.utils.getUUID()}`,d={id:l,name:`${this.formatMessage("_widgetLabel")}(${this.rtBookmarkId})`,title:`${this.formatMessage("_widgetLabel")}-${this.rtBookmarkId}`,type:t.type,extent:t.extent.toJSON(),viewpoint:t.viewpoint.toJSON(),showFlag:!0,runTimeFlag:!0,mapViewId:e.id,mapDataSourceId:e.dataSourceId,layersConfig:n},p=this.getRuntimeUuid(),c=JSON.parse(r.utils.readLocalStorage(p))||[];r.utils.setLocalStorage(p,JSON.stringify(c.concat(`${a}-${l}`))),r.utils.setLocalStorage(`${a}-${l}`,JSON.stringify(d)),this.setState({runtimeBmArray:c.concat(`${a}-${l}`)})}},this.getLayersConfig=e=>{const t=(e,i)=>(e.forEach((e=>{i[e.id]={layers:{}};const a=void 0===(null==e?void 0:e.visibility)&&!!(null==e?void 0:e.visible);i[e.id].visibility=a;const o=e.layers||e.sublayers||e.allSublayers;o&&o.length>0&&t(o,i[e.id].layers)})),i);return t(e,{})},this.showLayersConfig=(e,t,i=[],a=!1)=>{if(a)return;const o=(e,t)=>{e.forEach((e=>{var a,s,r;const n=!(i.findIndex((t=>t.id===e.id))>-1);e.visible=void 0===(null===(a=t[e.id])||void 0===a?void 0:a.visibility)?n:null===(s=t[e.id])||void 0===s?void 0:s.visibility;const l=e.layers||e.sublayers||e.allSublayers,d=null===(r=null==t?void 0:t[e.id])||void 0===r?void 0:r.layers;l&&l.length>0&&d&&Object.keys(d).length>0&&o(l.toArray(),d)}))};o(e,t)},this.showMapOrgLayer=(e,t)=>{const i=(e,t)=>{e.forEach((e=>{for(const i in t){const a=t[i];if(e.visible=!1,e.id===a.id){e.visible=!0;break}}e.layers&&e.layers.length>0&&i(e.layers.toArray(),t)}))};i(e,t)},this.onViewBookmark=e=>{var t,i;if(!e)return;const{jimuMapView:a,viewGroup:o}=this.state,{id:s,useMapWidgetIds:n}=this.props,l=(null===(i=null===(t=this.props)||void 0===t?void 0:t.stateProps)||void 0===i?void 0:i.activeBookmarkId)||0;e&&!e.runTimeFlag&&l!==e.id&&this.props.dispatch(r.appActions.widgetStatePropChange(s,"activeBookmarkId",e.id)),n&&0!==n.length&&(0,r.getAppStore)().dispatch(r.appActions.requestAutoControlMapWidget(n[0],s)),a&&(e&&a.dataSourceId!==e.mapDataSourceId?o&&o.switchMap().then((()=>{this.viewBookmark(e)})):this.viewBookmark(e))},this.viewBookmark=e=>{var t;const{appMode:a,config:o}=this.props,{jimuMapView:s}=this.state,{extent:n,viewpoint:l}=e,d={duration:1e3};if(a===r.AppMode.Run&&s&&s.view){"3d"===s.view.type?s.view.goTo({target:this.Viewpoint.fromJSON(l)},d):s.view.goTo({extent:this.Extent.fromJSON(n)},d),e.baseMap&&(s.view.map.basemap=this.Basemap.fromJSON(e.baseMap));const a=s.view.map.layers.toArray(),r=null===(t=JSON.parse(JSON.stringify(s.view.map)))||void 0===t?void 0:t.operationalLayers,p=s.dataSourceId!==e.mapDataSourceId;e.mapOriginFlag?this.showMapOrgLayer(a,e.visibleLayers):this.showLayersConfig(a,e.layersConfig,r,p);const c=e.graphics&&e.graphics.length>0;if(this.graphicsLayerCreated[s.id]){const t=s.view.map.findLayerById(this.graphicsLayerId[s.id]);if(o.displayType===i.Selected)t.removeAll(),c&&e.graphics.forEach((e=>{t.graphics.push(this.Graphic.fromJSON(e))}));else if(this.graphicsPainted[s.id][e.id]){if(c){const i=[];e.graphics.forEach((e=>{const a=t.graphics.findIndex((t=>t.attributes.id===e.attributes.id));a>-1&&i.push(t.graphics.getItemAt(a))})),t.removeMany(i),e.graphics.forEach((e=>{t.graphics.push(this.Graphic.fromJSON(e))}))}}else c&&e.graphics.forEach((e=>{t.graphics.push(this.Graphic.fromJSON(e))})),this.graphicsPainted[s.id][e.id]=!0}else{const t=(new Date).getTime(),i=`bookmark-layer-${s.id}-${t}`,a=new this.GraphicsLayer({id:i,listMode:"hide",title:this.formatMessage("graphicLayer"),elevationInfo:{mode:"relative-to-scene"}});c&&e.graphics.forEach((e=>{a.graphics.push(this.Graphic.fromJSON(e))})),s.view.map.add(a),this.graphicsPainted[s.id]={},this.graphicsPainted[s.id][e.id]=!0,this.graphicsLayerId[s.id]=a.id,this.graphicsLayerCreated[s.id]=!0}}},this.getStyle=i=>{const{id:o,appMode:s,config:l}=this.props,d=[a.Custom1,a.Custom2];return r.css`
      ${"&.bookmark-widget-"+o} {
        overflow: ${window.jimuConfig.isInBuilder&&s!==r.AppMode.Run?"hidden":"auto"};
        height: 100%;
        width: 100%;
        .bookmark-title-height{
          height: 45px;
        }
        .bookmark-list-height {
          height: calc(100% - 45px);
          overflow-y: ${window.jimuConfig.isInBuilder&&s!==r.AppMode.Run?"hidden !important":"auto"};
        }
        .bookmark-title {
          flex-grow: 1;
          padding: 0 15px;
          line-height: 45px;
          font-size: ${r.polished.rem(16)};
        }
        .bookmark-btn-container {
          width: 32px;
          height: 32px;
        }
        .bookmark-btn {
          font-weight: bold;
          font-size: ${r.polished.rem(12)};
        }
        .bookmark-view-auto {
          overflow-y: ${window.jimuConfig.isInBuilder&&s!==r.AppMode.Run&&!d.includes(l.templateType)?"hidden":"auto"};
        }
        .gallery-card-add {
          cursor: pointer;
          min-width: 200px;
          height: 189px;
          display: grid;
          border: 1px solid ${i.colors.secondary};
          background: ${i.colors.white};
          margin: ${l.direction===e.Horizon?r.polished.rem(12):r.polished.rem(16)};
        }
        .card-add {
          cursor: pointer;
          height: 159px;
          display: inline-flex;
          border: 1px solid ${i.colors.palette.light[400]};
          background: ${i.colors.white};
          width: 150px;
          margin: 15px 10px;
          position: relative;
          .add-placeholder {
            height: 120px;
          }
        }
        .list-add {
          cursor: pointer;
          height: 37px;
          display: inline-flex;
          border: 1px solid ${i.colors.palette.light[400]};
          background: ${i.colors.white};
          width: calc(100% - 30px);
          margin: 0 15px 15px;
          position: relative;
        }
        .gallery-add-icon {
          position: relative;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          margin-top: -${r.polished.rem(10)};
          margin-left: -${r.polished.rem(10)};
        }
        .bookmark-container {
          ${l.templateType!==a.Card&&l.templateType!==a.List&&"height: 100%"};
          width: 100%;
          color: ${i.colors.black};
          .bookmark-runtimeSeparator {
            margin: 10px 15px 15px;
            border: 1px dashed ${i.colors.secondary};
          }
          .widget-card-content {
            padding: 8px 9px !important;
          }
          .bookmark-card-col {
            width: 170px;
            padding: 10px 10px 0;
            position: relative;
            .widget-card-image-inner {
              width: 148px;
              height: 120px;
            }
            .card-inner {
              transition: all 0.5s;
            }
          }
          .bookmark-list-col {
            padding: ${r.polished.rem(8)} 0;
            align-items: center !important;
            margin: 8px 15px 0;
          }
          .bookmark-pointer {
            cursor: pointer;
            &:hover {
              background: ${i.colors.palette.light[200]};
            }
          }
          .bookmark-only-pointer {
            cursor: pointer;
          }
          .bookmark-custom-pointer {
            cursor: pointer;
            border: 1px solid ${i.colors.light};
            ${l.direction===e.Vertical&&"position: absolute;"}
            ${l.direction===e.Vertical&&"width: calc(100% - 40px) !important;"}
            ${l.direction===e.Vertical&&`height: calc(100% - ${l.space}px) !important;`}
          }
          .layout-height{
            height: ${l.pageStyle===t.Paging?"calc(100% - 49px)":"100%"} !important;
          }
          .border-none {
            border: none !important;
          }
          .runtime-bookmarkCard {
            .runtimeBookmarkCard-upload,
            .runtimeBookmarkCard-operation {
              display: none;
            }
            &:hover {
              .runtimeBookmarkCard-operation {
                display: block;
                position: absolute;
                right: 10px;
                background: ${i.colors.secondary};
                opacity: 0.9;
              }
              .runtimeBookmarkCard-upload {
                display: block;
                position: absolute;
                right: 10px;
                bottom: 48px;
                background: ${i.colors.secondary};
                opacity: 0.9;
              }
            }
          }
          .runtime-bookmarkList {
            display: inline-block !important;
            width: calc(100% - 30px);
            padding: ${r.polished.rem(4)} 0;
            margin: 0 15px 6px;
            align-items: center !important;
            .runtimeBookmarkList-operation {
              margin-right: 15px;
              display: none;
              height: 28px;
            }
            &:hover {
              .runtimeBookmarkList-operation {
                display: block;
              }
            }
          }
          .runtime-title-con {
            padding: 4px 0 !important;
          }
          .runtime-title {
            width: auto;
            border: none;
            background-color: transparent;
            display: inline-block !important;
            height: 29px;
            &:focus {
              border: 1px solid ${i.colors.secondary};
            }
            &:hover {
              border: 1px solid ${i.colors.secondary};
            }
          }
          .suspension-drop-btn{
            border-radius: 12px;
            border: 0;
          }
          .suspension-drop-placeholder{
            width: 32px;
          }
          .suspension-nav-placeholder1{
            height: 32px;
            width: 60px;
          }
          .suspension-nav-placeholder2{
            height: 24px;
            width: 100px;
          }
          .suspension-noborder-btn{
            border: 0;
            padding-left: ${r.polished.rem(7)};
          }
          .suspension-tools-top {
            position: absolute;
            top: 5px;
            left: 5px;
            z-index: 1;
            .jimu-dropdown {
              width: 32px;
            }
            .caret-icon {
              margin-left: ${r.polished.rem(2)};
            }
          }
          .suspension-top-number {
            position: absolute;
            top: 5px;
            right: 5px;
            background: ${i.colors.white};
            border-radius: 10px;
            opacity: 0.8;
            width: 40px;
            text-align: center;
            z-index: 1;
          }
          .suspension-tools-middle {
            display: flex;
            width: 100%;
            padding: 0 ${r.polished.rem(8)};
            position: absolute;
            top: 50%;
            margin-top: ${l.direction===e.Horizon?"-13px":"-26px"};
            z-index: 1;
            .middle-nav-group button {
              background: ${i.colors.white};
              opacity: 0.8;
              border-radius: 50%;
            }
          }
          .suspension-middle-play {
            position: absolute;
            right: 5px;
            bottom: 20px;
            z-index: 2;
          }
          .suspension-navbar {
            display: flex;
            width: 100%;
            padding: 0 ${r.polished.rem(8)};
            position: absolute;
            top: 50%;
            z-index: 1;
            .navbar-btn-pre{
              position: absolute;
              left: 5px;
              border-radius: 50%;
            }
            .navbar-btn-next{
              position: absolute;
              right: 5px;
              border-radius: 50%;
            }
          }
          .suspension-navbar-verticle {
            display: flex;
            height: 100%;
            position: absolute;
            top: 0;
            left: 50%;
            z-index: 1;
            margin-left: -13px;
            .navbar-btn-pre{
              position: absolute;
              top: 5px;
              border-radius: 50%;
            }
            .navbar-btn-next{
              position: absolute;
              bottom: 5px;
              border-radius: 50%;
            }
          }
          .suspension-tools-text {
            display: flex;
            width: 100%;
            padding: ${r.polished.rem(8)};
            position: absolute;
            border-top: 1px solid ${i.colors.secondary};
            bottom: 0;
            z-index: 1;
            .jimu-dropdown {
              width: 32px;
            }
            .caret-icon {
              margin-left: ${r.polished.rem(2)};
            }
            .nav-btn-text {
              width: 100px;
            }
          }
          .suspension-tools-bottom {
            display: flex;
            width: 100%;
            padding: 0 ${r.polished.rem(8)};
            position: absolute;
            bottom: 5px;
            z-index: 1;
            .jimu-dropdown {
              width: 32px;
            }
            .caret-icon {
              margin-left: ${r.polished.rem(3)};
            }
            .scroll-navigator {
              .btn {
                border-radius: ${i.borderRadiuses.circle};
              }
            }
            .nav-btn-bottom {
              width: ${l.autoPlayAllow?"100px":"60px"};
              border-radius: 16px;
              opacity: 0.8;
              background: ${i.colors.white};
            }
            .number-count {
              border-radius: 10px;
              opacity: 0.8;
              background: ${i.colors.white};
              width: 40px;
              text-align: center;
            }
          }
          .bookmark-slide {
            position: absolute;
            bottom: ${l.templateType===a.Slide3?"1px":"unset"};
            opacity: 0.8;
            background: ${i.colors.white};
            width: calc(100% - 2px);
            z-index: 1;
            padding: ${r.polished.rem(8)};
            .bookmark-slide-title {
              font-size: ${r.polished.rem(16)};
              font-weight: bold;
            }
            .bookmark-slide-description {
              font-size: ${r.polished.rem(13)};
              max-height: 80px;
              overflow-y: auto;
            }
          }
          .bookmark-slide-gallery {
            position: absolute;
            bottom: ${l.templateType===a.Slide3?0:"unset"};
            opacity: 0.8;
            background: ${i.colors.white};
            width: calc(100% - 2px);
            z-index: 1;
            padding: ${r.polished.rem(8)};
            .bookmark-slide-title {
              font-size: ${r.polished.rem(16)};
              font-weight: bold;
            }
            .bookmark-slide-description {
              max-height: 60px;
              overflow-y: auto;
              font-size: ${r.polished.rem(13)};
            }
          }
          .bookmark-text {
            background: ${i.colors.white};
            width: calc(100% - 2px);
            height: 60%;
            z-index: 1;
            padding: ${r.polished.rem(8)};
            .bookmark-text-title {
              font-size: ${r.polished.rem(16)};
              font-weight: bold;
            }
            .bookmark-text-description {
              height: calc(100% - 75px);
              overflow-y: auto;
              font-size: ${r.polished.rem(14)};
            }
          }
          .gallery-card {
            min-width: 200px;
            min-height: 180px;
            height: auto;
            position: relative;
            padding: ${l.direction===e.Horizon?"unset":r.polished.rem(16)};
            margin: ${l.direction===e.Horizon?r.polished.rem(12):"unset"};
            .gallery-card-inner {
              transition: all 0.5s;
              &:hover {
                transform: scale(1.05);
              }
            }
            .gallery-card-operation {
              display: none;
            }
            &:hover {
              .gallery-card-operation {
                display: block;
                position: absolute;
                top: ${l.direction===e.Horizon?0:r.polished.rem(20)};
                right: ${l.direction===e.Horizon?0:r.polished.rem(20)};
                background: ${i.colors.light};
                opacity: 0.9;
              }
            }
            .gallery-img {
              width: 198px;
              height: 150px;
              display: inline-flex;
            }
            .gallery-img-vertical {
              width: 100%;
              height: 200px;
            }
          }
          .gallery-slide-card {
            ${l.direction===e.Horizon&&`width: ${l.itemWidth}px !important`};
            ${l.direction===e.Horizon?`min-width: ${l.itemWidth}px !important`:`height: ${l.itemHeight}px !important`};
            height: calc(100% - ${r.polished.rem(32)});
            position: relative;
            margin: ${l.direction===e.Horizon?`${r.polished.rem(16)} 0`:`0 ${r.polished.rem(16)}`};
            padding-top: ${l.direction===e.Horizon?"unset":r.polished.rem(l.space)};
            ${l.direction===e.Horizon&&`margin-left: ${r.polished.rem(l.space)}`};
            &:first-of-type {
              margin-top: ${l.direction===e.Horizon?r.polished.rem(16):r.polished.rem(10)};
              padding-top: ${l.direction===e.Horizon?"unset":r.polished.rem(10)};
            }
            &:last-of-type {
              ${l.direction===e.Horizon?`padding-right: ${r.polished.rem(16)}`:`margin-bottom: ${r.polished.rem(20)}`};
            }
            .gallery-slide-inner {
              transition: all 0.5s;
              &:hover {
                transform: scale(1.05);
                .bookmark-slide-gallery {
                  width: 100%;
                }
              }
            }
          }
          .gallery-slide-lastItem {
            padding-right: 16px;
            margin-bottom: 16px;
          }
          .nav-bar {
            height: 48px;
            width: 280px;
            min-width: 280px;
            border: 1px solid ${i.colors.secondary};
            background: ${i.colors.light};
            padding: 0 ${r.polished.rem(8)};
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -24px;
            margin-left: -140px;
            .scroll-navigator {
              .btn {
                border-radius: ${i.borderRadiuses.circle};
              }
            }
            .navbtn {
              width: 100px;
            }
          }
          .example-tips {
            margin-top: -10px;
            top: 50%;
            position: relative;
            text-align: center;
          }
        }
        .bookmark-container::-webkit-scrollbar {
          display: none;
        }
        .gallery-container {
          display: inline-flex !important;
          overflow-x: ${window.jimuConfig.isInBuilder&&s!==r.AppMode.Run&&!d.includes(l.templateType)?"hidden":"auto"};
        }
        .gallery-container-ver {
          overflow-y: ${window.jimuConfig.isInBuilder&&s!==r.AppMode.Run&&!d.includes(l.templateType)?"hidden":"auto"};
        }
        .horizon-line {
          margin: 10px 15px;
          border-bottom: 1px solid ${i.colors.secondary};
        }
        .vertical-line {
          margin: 10px 15px;
          border-right: 1px solid ${i.colors.secondary};
        }
        .vertical-border {
          padding-right: ${r.polished.rem(16)};
        }
        .default-img {
          width: 100%;
          height: 100%;
          background: ${i.colors.palette.light[200]} url(${n(42231)}) center center no-repeat;
          background-size: 50% 50%;
        }
        .edit-mask {
          height: calc(100% - 49px);
          z-index: 2;
        }
      }
    `},this.onActiveViewChange=e=>{const{appMode:t,config:i}=this.props;if(this.setState({jimuMapView:e}),e&&t===r.AppMode.Run&&i.initBookmark&&!this.alreadyActiveLoading){const t=this.getMapBookmarks(e)||[],a=i.displayFromWeb?i.bookmarks.concat(t):i.bookmarks;a.length>0&&(this.alreadyActiveLoading=!0,e.view.when((()=>{this.setState({bookmarkOnViewId:a[0].id}),this.onViewBookmark(a[0])})))}},this.handleViewGroupCreate=e=>{this.setState({viewGroup:e})},this.typedImgExist=e=>{var t,i;return e.imgSourceType===s.Snapshot?null===(t=e.snapParam)||void 0===t?void 0:t.url:null===(i=e.imgParam)||void 0===i?void 0:i.url},this.renderSlideViewTop=e=>{var t,i;const a=e.imgSourceType===s.Snapshot,o=a?null===(t=e.snapParam)||void 0===t?void 0:t.url:null===(i=e.imgParam)||void 0===i?void 0:i.url;return(0,r.jsx)("div",{className:"w-100 h-100 bookmark-pointer surface-1",onClick:()=>this.onViewBookmark(e),key:e.id||`webmap-${e.name}`},(0,r.jsx)("div",{className:"bookmark-slide"},(0,r.jsx)("div",{className:"bookmark-slide-title"},e.name),(0,r.jsx)("div",{className:"bookmark-slide-description"},e.description)),o?(0,r.jsx)(d.ImageWithParam,{imageParam:a?e.snapParam:e.imgParam,altText:e.name,useFadein:!0,imageFillMode:e.imagePosition}):(0,r.jsx)("div",{className:"default-img"}))},this.renderSlideViewText=e=>{var t,i;const a=e.imgSourceType===s.Snapshot,o=a?null===(t=e.snapParam)||void 0===t?void 0:t.url:null===(i=e.imgParam)||void 0===i?void 0:i.url;return(0,r.jsx)("div",{className:"w-100 h-100 bookmark-only-pointer surface-1",onClick:()=>this.onViewBookmark(e),key:e.id||`webmap-${e.name}`},(0,r.jsx)("div",{className:"w-100",style:{height:"40%"}},o?(0,r.jsx)(d.ImageWithParam,{imageParam:a?e.snapParam:e.imgParam,altText:e.name,useFadein:!0,imageFillMode:e.imagePosition}):(0,r.jsx)("div",{className:"default-img"})),(0,r.jsx)("div",{className:"bookmark-text"},(0,r.jsx)("div",{className:"bookmark-text-title"},e.name),(0,r.jsx)("div",{className:"bookmark-text-description"},e.description)))},this.renderSlideViewBottom=e=>{var t,i;const a=e.imgSourceType===s.Snapshot,o=a?null===(t=e.snapParam)||void 0===t?void 0:t.url:null===(i=e.imgParam)||void 0===i?void 0:i.url;return(0,r.jsx)("div",{className:"w-100 h-100 bookmark-pointer surface-1",onClick:()=>this.onViewBookmark(e),key:e.id||`webmap-${e.name}`},o?(0,r.jsx)(d.ImageWithParam,{imageParam:a?e.snapParam:e.imgParam,altText:e.name,useFadein:!0,imageFillMode:e.imagePosition}):(0,r.jsx)("div",{className:"default-img"}),(0,r.jsx)("div",{className:"bookmark-slide"},(0,r.jsx)("div",{className:"bookmark-slide-title"},e.name),(0,r.jsx)("div",{className:"bookmark-slide-description"},e.description)))},this.renderCustomContents=e=>{const{LayoutEntry:t}=this.state,{layouts:i}=this.props;if(e.layoutName)return(0,r.jsx)("div",{className:"w-100 h-100 bookmark-only-pointer surface-1",onClick:()=>this.onViewBookmark(e),key:e.id},(0,r.jsx)(t,{isRepeat:!0,layouts:i[e.layoutName],isInWidget:!0,className:"layout-height"}))},this.renderCustomExample=()=>{const{LayoutEntry:e}=this.state,{layouts:t}=this.props;if(t[o.Regular])return(0,r.jsx)("div",{className:"w-100 h-100 bookmark-only-pointer surface-1"},(0,r.jsx)(e,{isRepeat:!0,layouts:t[o.Regular],isInWidget:!0,className:"layout-height"}))},this.handleArrowChange=e=>{const{config:t}=this.props,{jimuMapView:i}=this.state,a=this.getMapBookmarks(i)||[],o=t.displayFromWeb?t.bookmarks.concat(a):t.bookmarks,s=o.length;if(0===s)return;const{bookmarkOnViewId:r}=this.state;let n=o.findIndex((e=>e.id===r))>-1?o.findIndex((e=>e.id===r)):0;n!==s-1||e?0===n&&e?n=s-1:e&&n>0?n--:e||n++:n=0,this.setState({bookmarkOnViewId:o[n].id}),this.onViewBookmark(o[n])},this.handleOnViewChange=e=>{const{appMode:t,config:i}=this.props,{jimuMapView:a}=this.state,o=this.getMapBookmarks(a)||[],s=i.displayFromWeb?i.bookmarks.concat(o):i.bookmarks,n=s.findIndex((t=>t.id===e))>-1?s.findIndex((t=>t.id===e)):0;this.setState({bookmarkOnViewId:e}),t===r.AppMode.Run&&this.onViewBookmark(s[n])},this.getBookmarksOptions=e=>{const t=[];return e.forEach((e=>{t.push((0,r.jsx)("option",{key:e.id,value:e.id},e.name))})),t},this.getBookmarksDropdownItems=e=>{const{bookmarkOnViewId:t}=this.state,i=[];return e.forEach((e=>{i.push((0,r.jsx)(d.DropdownItem,{key:e.id,active:e.id===t},e.name))})),i},this.handleAutoPlay=()=>{const{config:e,useMapWidgetIds:t,id:i}=this.props,{bookmarkOnViewId:a,autoPlayStart:o,playTimer:s,jimuMapView:n}=this.state,l=this.getMapBookmarks(n)||[],d=e.displayFromWeb?e.bookmarks.concat(l):e.bookmarks;if(0===d.length)return;if(o)return s&&clearInterval(s),void this.setState({autoPlayStart:!1,playTimer:void 0});t&&0!==t.length&&(0,r.getAppStore)().dispatch(r.appActions.requestAutoControlMapWidget(t[0],i));const{autoInterval:p,autoLoopAllow:c}=e;let m=d.findIndex((e=>e.id===a));-1!==m&&m!==d.length-1||(m=0),this.setState({bookmarkOnViewId:d[m].id}),this.onViewBookmark(d[m]);const u=setInterval((()=>{if(m++,c)m>=d.length&&(m=0);else if(m>=d.length)return clearInterval(u),s&&clearInterval(s),void this.setState({autoPlayStart:!1,playTimer:void 0});this.setState({bookmarkOnViewId:d[m].id}),this.onViewBookmark(d[m])}),1e3*p+1e3);this.setState({autoPlayStart:!0,playTimer:u})},this.renderBottomTools=e=>{const{config:t}=this.props,{jimuMapView:i}=this.state,o=this.getMapBookmarks(i)||[],s=t.displayFromWeb?t.bookmarks.concat(o):t.bookmarks,n=s.length,{bookmarkOnViewId:l,autoPlayStart:p}=this.state;let m=1;return m=e?0:s.findIndex((e=>e.id===l))>-1?s.findIndex((e=>e.id===l))+1:1,(e=>{let i;switch(e){case a.Slide1:i=(0,r.jsx)("div",{className:"suspension-tools-bottom align-items-center justify-content-around"},s.length>1?(0,r.jsx)(d.Dropdown,{size:"sm",activeIcon:!0},(0,r.jsx)(d.DropdownButton,{arrow:!1,icon:!0,size:"sm",type:"default",className:"suspension-drop-btn",title:this.formatMessage("bookmarkList")},(0,r.jsx)(x,{className:"suspension-drop-btn"})),(0,r.jsx)(d.DropdownMenu,null,s.map((e=>{const t=e.id===l;return(0,r.jsx)(d.DropdownItem,{key:e.id,active:t,onClick:()=>this.handleOnViewChange(e.id)},e.name)})))):(0,r.jsx)("div",{className:"suspension-drop-placeholder"}),s.length>1?(0,r.jsx)(d.NavButtonGroup,{type:"tertiary",vertical:!1,onChange:this.handleArrowChange,className:"nav-btn-bottom",previousTitle:this.formatMessage("previous"),nextTitle:this.formatMessage("next")},(0,r.jsx)("div",{className:"bookmark-btn-container"},t.autoPlayAllow&&(0,r.jsx)(d.Button,{icon:!0,className:"bookmark-btn",type:"link",onClick:this.handleAutoPlay,title:this.formatMessage("autoPlay"),"data-testid":"triggerAuto"},p?(0,r.jsx)(N,{className:"mr-1",size:"l"}):(0,r.jsx)(w,{className:"mr-1",size:"l"})))):(0,r.jsx)("div",{className:"suspension-nav-placeholder1"}),(0,r.jsx)("span",{className:"number-count"},m,"/",n));break;case a.Slide2:case a.Custom1:case a.Custom2:i=s.length>1?(0,r.jsx)("div",{className:"suspension-tools-text align-items-center justify-content-around"},(0,r.jsx)(d.Dropdown,{size:"sm",activeIcon:!0},(0,r.jsx)(d.DropdownButton,{arrow:!1,icon:!0,size:"sm",type:"default",className:"suspension-drop-btn",title:this.formatMessage("bookmarkList")},(0,r.jsx)(x,{className:"suspension-drop-btn"})),(0,r.jsx)(d.DropdownMenu,null,s.map((e=>{const t=e.id===l;return(0,r.jsx)(d.DropdownItem,{key:e.id,active:t,onClick:()=>this.handleOnViewChange(e.id)},e.name)})))),(0,r.jsx)(d.NavButtonGroup,{type:"tertiary",vertical:!1,onChange:this.handleArrowChange,className:"nav-btn-text",previousTitle:this.formatMessage("previous"),nextTitle:this.formatMessage("next")},(0,r.jsx)("span",null,m,"/",n)),(0,r.jsx)("div",{className:"bookmark-btn-container"},t.autoPlayAllow&&(0,r.jsx)(d.Button,{icon:!0,className:"bookmark-btn",type:"link",onClick:this.handleAutoPlay,title:this.formatMessage("autoPlay")},p?(0,r.jsx)(N,{className:"mr-1",size:"l"}):(0,r.jsx)(w,{className:"mr-1",size:"l"})))):(0,r.jsx)("div",{className:"align-items-center"});break;case a.Slide3:i=(0,r.jsx)(c.Fragment,null,(0,r.jsx)("div",{className:"suspension-tools-top align-items-center justify-content-around"},s.length>1?(0,r.jsx)(d.Dropdown,{size:"sm",activeIcon:!0},(0,r.jsx)(d.DropdownButton,{arrow:!1,icon:!0,size:"sm",type:"default",className:"suspension-drop-btn",title:this.formatMessage("bookmarkList")},(0,r.jsx)(x,{className:"suspension-drop-btn"})),(0,r.jsx)(d.DropdownMenu,null,s.map((e=>{const t=e.id===l;return(0,r.jsx)(d.DropdownItem,{key:e.id,active:t,onClick:()=>this.handleOnViewChange(e.id)},e.name)})))):(0,r.jsx)("div",{className:"suspension-drop-placeholder"})),(0,r.jsx)("span",{className:"suspension-top-number"},m,"/",n),(0,r.jsx)("div",{className:"suspension-tools-middle"},s.length>1&&(0,r.jsx)(d.NavButtonGroup,{type:"tertiary",vertical:!1,onChange:this.handleArrowChange,className:"middle-nav-group",previousTitle:this.formatMessage("previous"),nextTitle:this.formatMessage("next")})),t.autoPlayAllow&&(0,r.jsx)("div",{className:"suspension-middle-play"},(0,r.jsx)(d.Button,{icon:!0,className:"bookmark-btn",type:"link",onClick:this.handleAutoPlay,title:this.formatMessage("autoPlay")},p?(0,r.jsx)(N,{className:"mr-1",size:30}):(0,r.jsx)(w,{className:"mr-1",size:30}))))}return i})(t.templateType)},this.renderSlideScroll=e=>{const t=e.map(((e,t)=>{var i,a;const o=e.imgSourceType===s.Snapshot,n=o?null===(i=e.snapParam)||void 0===i?void 0:i.url:null===(a=e.imgParam)||void 0===a?void 0:a.url;return(0,r.jsx)("div",{className:"gallery-slide-card",key:t},(0,r.jsx)("div",{className:"w-100 h-100 bookmark-pointer gallery-slide-inner surface-1",onClick:()=>this.onViewBookmark(e)},(0,r.jsx)("div",{className:"bookmark-slide-gallery"},(0,r.jsx)("div",{className:"bookmark-slide-title"},e.name),(0,r.jsx)("div",{className:"bookmark-slide-description"},e.description)),n?(0,r.jsx)(d.ImageWithParam,{imageParam:o?e.snapParam:e.imgParam,altText:e.name,useFadein:!0,imageFillMode:e.imagePosition}):(0,r.jsx)("div",{className:"default-img"})))})),i=(0,r.jsx)("div",{className:"gallery-slide-lastItem",key:"last"});return t.asMutable({deep:!0}).concat(i)},this.renderCustomScroll=e=>{const{LayoutEntry:t}=this.state,{layouts:i}=this.props,a=e.map(((e,a)=>(0,r.jsx)("div",{className:"gallery-slide-card",key:a},(0,r.jsx)("div",{className:"w-100 h-100 bookmark-custom-pointer surface-1",onClick:()=>this.onViewBookmark(e)},(0,r.jsx)(t,{isRepeat:!0,layouts:i[e.layoutName],isInWidget:!0,className:"layout-height"}))))),o=(0,r.jsx)("div",{className:"gallery-slide-lastItem",key:"last"});return a.asMutable({deep:!0}).concat(o)},this.scrollContainer=e=>{this.containerRef.current.scrollBy(e)},this.handleScroll=(t="next")=>{var i;const a=(0,r.getAppStore)().getState(),o=null===(i=null==a?void 0:a.appContext)||void 0===i?void 0:i.isRTL,{config:s}=this.props,{itemHeight:n=280,itemWidth:l=210,space:d=0}=s,p=s.direction===e.Horizon;if(this.containerRef.current&&"next"===t){const e=p?{top:0,left:o?-(l+d):l+d,behavior:"smooth"}:{top:n,left:0,behavior:"smooth"};this.scrollContainer(e)}else if(this.containerRef.current&&"previous"===t){const e=p?{top:0,left:o?l+d:-(l+d),behavior:"smooth"}:{top:-n,left:0,behavior:"smooth"};this.scrollContainer(e)}},this.renderNavbar=t=>{const{config:i}=this.props;return(0,r.jsx)("div",{key:"navBar",className:(i.direction===e.Horizon?"suspension-navbar":"suspension-navbar-verticle")+" align-items-center justify-content-between"},(0,r.jsx)(d.Button,{title:this.formatMessage("previous"),type:"primary",size:"sm",icon:!0,onClick:()=>this.handleScroll("previous"),className:"navbar-btn-pre"},t?(0,r.jsx)(F,{autoFlip:!0,size:"s"}):(0,r.jsx)(z,{autoFlip:!0,size:"s"})),(0,r.jsx)(d.Button,{title:this.formatMessage("next"),type:"primary",size:"sm",icon:!0,onClick:()=>this.handleScroll("next"),className:"navbar-btn-next"},t?(0,r.jsx)(D,{autoFlip:!0,size:"s"}):(0,r.jsx)(L,{autoFlip:!0,size:"s"})))},this.getMapBookmarks=e=>{var t,i;if(e&&(null==e?void 0:e.dataSourceId)){const a=e.view;if(!a)return;const o=null===(t=e.view)||void 0===t?void 0:t.map;let s=[];return"3d"===a.type?s=(null===(i=o.presentation)||void 0===i?void 0:i.slides)?JSON.parse(JSON.stringify(o.presentation.slides)):[]:"2d"===a.type&&(s=(null==o?void 0:o.bookmarks)?JSON.parse(JSON.stringify(o.bookmarks)):[]),s.map(((t,i)=>{var a,o;return t.id=`maporigin-${i}`,t.runTimeFlag=!0,t.mapOriginFlag=!0,t.mapDataSourceId=e.dataSourceId,(null===(a=t.thumbnail)||void 0===a?void 0:a.url)?t.imgParam={url:t.thumbnail.url}:t.imgParam={},(null===(o=t.title)||void 0===o?void 0:o.text)&&(t.name=t.title.text),t.imagePosition=d.ImageFillMode.Fill,t}))}},this.renderBookmarkList=i=>{const{appMode:o,config:n}=this.props,{transitionInfo:l}=n,{bookmarkOnViewId:p,autoPlayStart:m,jimuMapView:u}=this.state,g=this.getMapBookmarks(u)||[];n.displayFromWeb&&(i=i.concat(g));const h=i.findIndex((e=>e.id===p))>-1?i.findIndex((e=>e.id===p)):0,v=0===h?1:Math.max(0,h-1),y=n.direction===e.Horizon,x=[a.Slide1,a.Slide2,a.Slide3,a.Custom1,a.Custom2],k=n.templateType===a.Gallery||x.includes(n.templateType)&&n.pageStyle===t.Scroll;return(0,r.jsx)("div",{className:"bookmark-container "+(k?y?"gallery-container":"gallery-container-ver":""),ref:this.containerRef},(u=>{var g,x,k,b,f,j,S,I;let M;switch(u){case a.Card:M=i.map(((e,t)=>{var i,a;const n=e.imgSourceType===s.Snapshot,l=n?null===(i=e.snapParam)||void 0===i?void 0:i.url:null===(a=e.imgParam)||void 0===a?void 0:a.url;return(0,r.jsx)(c.Fragment,{key:t},(0,r.jsx)("div",{className:"d-inline-flex bookmark-card-col"},(0,r.jsx)(d.Card,{onClick:()=>this.onViewBookmark(e),className:(o===r.AppMode.Run?"bookmark-pointer":"")+" card-inner surface-1"},(0,r.jsx)("div",{className:"widget-card-image"},(0,r.jsx)("div",{className:"widget-card-image-inner"},l?(0,r.jsx)(d.ImageWithParam,{imageParam:n?e.snapParam:e.imgParam,altText:e.name,useFadein:!0,imageFillMode:e.imagePosition}):(0,r.jsx)("div",{className:"default-img"}))),(0,r.jsx)(d.CardBody,{className:"widget-card-content text-truncate"},(0,r.jsx)("span",{className:"text-capitalize",title:e.name},e.name)))))}));break;case a.List:M=i.map(((e,t)=>(0,r.jsx)("div",{key:t,onClick:()=>this.onViewBookmark(e),className:(o===r.AppMode.Run?"bookmark-pointer":"")+" d-flex bookmark-list-col surface-1"},(0,r.jsx)(C,{className:"ml-3"}),(0,r.jsx)("div",{className:"ml-2"},e.name))));break;case a.Slide1:const u=i.map((e=>this.renderSlideViewTop(e)));return(0,r.jsx)(c.Fragment,null,n.pageStyle===t.Paging?(0,r.jsx)(r.TransitionContainer,{previousIndex:v,currentIndex:h,transitionType:null===(g=null==l?void 0:l.transition)||void 0===g?void 0:g.type,direction:null===(x=null==l?void 0:l.transition)||void 0===x?void 0:x.direction,playId:null==l?void 0:l.previewId},u):this.renderSlideScroll(i),n.pageStyle===t.Scroll&&this.renderNavbar(n.direction===e.Horizon),n.pageStyle===t.Paging&&this.renderBottomTools());case a.Slide2:const O=i.map((e=>this.renderSlideViewText(e)));return(0,r.jsx)(c.Fragment,null,n.pageStyle===t.Paging?(0,r.jsx)(r.TransitionContainer,{previousIndex:v,currentIndex:h,transitionType:null===(k=null==l?void 0:l.transition)||void 0===k?void 0:k.type,direction:null===(b=null==l?void 0:l.transition)||void 0===b?void 0:b.direction,playId:null==l?void 0:l.previewId},O):this.renderSlideScroll(i),n.pageStyle===t.Scroll&&this.renderNavbar(n.direction===e.Horizon),n.pageStyle===t.Paging&&this.renderBottomTools());case a.Slide3:const P=i.map((e=>this.renderSlideViewBottom(e)));return(0,r.jsx)(c.Fragment,null,n.pageStyle===t.Paging?(0,r.jsx)(r.TransitionContainer,{previousIndex:v,currentIndex:h,transitionType:null===(f=null==l?void 0:l.transition)||void 0===f?void 0:f.type,direction:null===(j=null==l?void 0:l.transition)||void 0===j?void 0:j.direction,playId:null==l?void 0:l.previewId},P):this.renderSlideScroll(i),n.pageStyle===t.Scroll&&this.renderNavbar(n.direction===e.Horizon),n.pageStyle===t.Paging&&this.renderBottomTools());case a.Gallery:const B=this.getRuntimeUuid(),L=JSON.parse(r.utils.readLocalStorage(B))||[],V=i.map(((e,t)=>{var i,a;const n=e.imgSourceType===s.Snapshot,l=n?null===(i=e.snapParam)||void 0===i?void 0:i.url:null===(a=e.imgParam)||void 0===a?void 0:a.url;return(0,r.jsx)("div",{className:"gallery-card",key:t},(0,r.jsx)(d.Card,{onClick:()=>this.onViewBookmark(e),className:(o===r.AppMode.Run?"bookmark-pointer":"")+" gallery-card-inner surface-1"},(0,r.jsx)("div",{className:"widget-card-image bg-light-300 "+(y?"gallery-img":"gallery-img-vertical")},l?(0,r.jsx)(d.ImageWithParam,{imageParam:n?e.snapParam:e.imgParam,altText:e.name,useFadein:!0,imageFillMode:e.imagePosition}):(0,r.jsx)("div",{className:"default-img"})),(0,r.jsx)(d.CardBody,{className:"widget-card-content text-truncate"},(0,r.jsx)("span",{className:"text-capitalize",title:e.name},e.name))))})),T=L.map(((e,t)=>{const i=JSON.parse(r.utils.readLocalStorage(e)),a=r.React.createRef();return(0,r.jsx)("div",{className:"gallery-card",key:`RuntimeGallery-${t}`},(0,r.jsx)(d.Card,{onClick:()=>this.onViewBookmark(i),className:(o===r.AppMode.Run?"bookmark-pointer":"")+" gallery-card-inner surface-1"},(0,r.jsx)("div",{className:"widget-card-image bg-light-300 "+(y?"gallery-img":"gallery-img-vertical")},(0,r.jsx)("div",{className:"default-img"})),(0,r.jsx)(d.CardBody,{className:"widget-card-content text-truncate runtime-title-con"},(0,r.jsx)(d.TextInput,{className:"runtime-title w-100",ref:a,size:"sm",title:i.name,defaultValue:i.name||"",onClick:e=>e.stopPropagation(),onKeyDown:e=>this.handleKeydown(e,a),onAcceptValue:t=>this.onRuntimeBookmarkNameChange(e,t)}))),(0,r.jsx)("span",{className:"gallery-card-operation float-right"},(0,r.jsx)(d.Button,{title:this.formatMessage("deleteOption"),onClick:()=>this.handleRuntimeDelete(e),type:"tertiary",icon:!0},(0,r.jsx)(W,{size:"s"}))))})),z=n.runtimeAddAllow?(0,r.jsx)(c.Fragment,{key:"galleryAdd"},(0,r.jsx)("div",{className:"gallery-card-add",onClick:this.handleRuntimeAdd,title:this.formatMessage("addBookmark")},(0,r.jsx)("div",{className:"gallery-add-icon"},(0,r.jsx)(A,{className:"mr-1",size:"l"}))),(0,r.jsx)("div",{className:"vertical-border"})):(0,r.jsx)("div",{className:"vertical-border",key:"last"}),$=V.asMutable({deep:!0}).concat(T),R=this.renderNavbar(n.direction===e.Horizon);$.push(z),$.push(R),M=$;break;case a.Navigator:const D=n.bookmarks.length,E=n.bookmarks.findIndex((e=>e.id===p))>-1?n.bookmarks.findIndex((e=>e.id===p))+1:1;return(0,r.jsx)("div",{className:"nav-bar d-flex align-items-center justify-content-around"},(0,r.jsx)(d.Select,{size:"sm",value:p,onChange:this.handleOnViewChange,style:{width:32}},this.getBookmarksOptions(i)),(0,r.jsx)(d.Button,{icon:!0,className:"bookmark-btn",type:"tertiary",onClick:this.handleRuntimeAdd},(0,r.jsx)(A,{className:"mr-1",size:"l"})),(0,r.jsx)(d.NavButtonGroup,{type:"tertiary",circle:!0,vertical:!1,onChange:this.handleArrowChange,className:"navbtn"},(0,r.jsx)("span",null,E,"/",D)),(0,r.jsx)(d.Button,{icon:!0,className:"bookmark-btn",type:"tertiary",onClick:this.handleAutoPlay,disabled:!n.autoPlayAllow},m?(0,r.jsx)(N,{className:"mr-1",size:"l"}):(0,r.jsx)(w,{className:"mr-1",size:"l"})));case a.Custom1:case a.Custom2:const G=this.isEditing(),F=i.map((e=>this.renderCustomContents(e)));return(0,r.jsx)(c.Fragment,null,n.pageStyle===t.Paging?(0,r.jsx)(r.TransitionContainer,{previousIndex:v,currentIndex:h,transitionType:null===(S=null==l?void 0:l.transition)||void 0===S?void 0:S.type,direction:null===(I=null==l?void 0:l.transition)||void 0===I?void 0:I.direction,playId:null==l?void 0:l.previewId},F):this.renderCustomScroll(i),n.pageStyle===t.Scroll&&this.renderNavbar(n.direction===e.Horizon),n.pageStyle===t.Paging&&this.renderBottomTools(),!G&&n.pageStyle===t.Paging&&o===r.AppMode.Design&&(0,r.jsx)("div",{className:"edit-mask position-absolute w-100"}))}return M})(n.templateType))},this.renderExampleSlideScroll=e=>(0,r.jsx)("div",{className:"gallery-slide-card"},(0,r.jsx)("div",{className:"w-100 h-100 bookmark-pointer surface-1"},(0,r.jsx)("div",{className:"bookmark-slide-gallery"},(0,r.jsx)("div",{className:"bookmark-slide-title"},e.title),(0,r.jsx)("div",{className:"bookmark-slide-description"},e.description)),(0,r.jsx)("div",{className:"default-img"}))),this.renderBookmarkExample=i=>{const{appMode:o,config:s}=this.props,n=s.direction===e.Horizon,l=s.templateType===a.Gallery;return(0,r.jsx)("div",{className:"bookmark-container "+(l?n?"gallery-container":"gallery-container-ver":""),ref:this.containerRef},(l=>{let p;switch(l){case a.Card:p=new Array(3).fill(1).map(((e,t)=>(0,r.jsx)("div",{className:"d-inline-flex bookmark-card-col",key:t},(0,r.jsx)(d.Card,{className:"surface-1"},(0,r.jsx)("div",{className:"widget-card-image bg-light-300"},(0,r.jsx)("div",{className:"widget-card-image-inner"},(0,r.jsx)("div",{className:"default-img"}))),(0,r.jsx)(d.CardBody,{className:"widget-card-content text-truncate"},(0,r.jsx)("span",{className:"text-capitalize",title:i.name},i.name))))));break;case a.List:p=new Array(3).fill(1).map(((e,t)=>(0,r.jsx)("div",{className:"d-flex bookmark-list-col surface-1",key:t},(0,r.jsx)(C,{className:"ml-3"}),(0,r.jsx)("div",{className:"ml-2"},i.name))));break;case a.Slide1:p=(0,r.jsx)(c.Fragment,null,s.pageStyle===t.Paging?(0,r.jsx)(r.TransitionContainer,{previousIndex:1,currentIndex:0,transitionType:s.transition,direction:s.transitionDirection},(0,r.jsx)("div",{className:"w-100 h-100 bookmark-pointer surface-1"},(0,r.jsx)("div",{className:"bookmark-slide"},(0,r.jsx)("div",{className:"bookmark-slide-title"},i.title),(0,r.jsx)("div",{className:"bookmark-slide-description"},i.description)),(0,r.jsx)("div",{className:"default-img"}))):this.renderExampleSlideScroll(i),s.pageStyle===t.Scroll&&this.renderNavbar(s.direction===e.Horizon),s.pageStyle===t.Paging&&this.renderBottomTools(!0));break;case a.Slide2:p=(0,r.jsx)(c.Fragment,null,s.pageStyle===t.Paging?(0,r.jsx)(r.TransitionContainer,{previousIndex:1,currentIndex:0,transitionType:s.transition,direction:s.transitionDirection},(0,r.jsx)("div",{className:"w-100 h-100 bookmark-only-pointer surface-1"},(0,r.jsx)("div",{className:"w-100",style:{height:"40%"}},(0,r.jsx)("div",{className:"default-img"})),(0,r.jsx)("div",{className:"bookmark-text"},(0,r.jsx)("div",{className:"bookmark-text-title"},i.title),(0,r.jsx)("div",{className:"bookmark-text-description"},i.description)))):this.renderExampleSlideScroll(i),s.pageStyle===t.Scroll&&this.renderNavbar(s.direction===e.Horizon),s.pageStyle===t.Paging&&this.renderBottomTools(!0));break;case a.Slide3:p=(0,r.jsx)(c.Fragment,null,s.pageStyle===t.Paging?(0,r.jsx)(r.TransitionContainer,{previousIndex:1,currentIndex:0,transitionType:s.transition,direction:s.transitionDirection},(0,r.jsx)("div",{className:"w-100 h-100 bookmark-pointer surface-1"},(0,r.jsx)("div",{className:"default-img"}),(0,r.jsx)("div",{className:"bookmark-slide"},(0,r.jsx)("div",{className:"bookmark-slide-title"},i.title),(0,r.jsx)("div",{className:"bookmark-slide-description"},i.description)))):this.renderExampleSlideScroll(i),s.pageStyle===t.Scroll&&this.renderNavbar(s.direction===e.Horizon),s.pageStyle===t.Paging&&this.renderBottomTools(!0));break;case a.Gallery:p=new Array(3).fill(1).map(((e,t)=>(0,r.jsx)("div",{className:"gallery-card",key:t},(0,r.jsx)(d.Card,{className:(o===r.AppMode.Run?"bookmark-pointer":"")+" surface-1"},(0,r.jsx)("div",{className:"widget-card-image bg-light-300 "+(n?"gallery-img":"gallery-img-vertical")},(0,r.jsx)("div",{className:"default-img"})),(0,r.jsx)(d.CardBody,{className:"widget-card-content text-truncate"},(0,r.jsx)("span",{className:"text-capitalize",title:i.name},i.name))))));break;case a.Custom1:case a.Custom2:const l=this.isEditing(),m=this.renderCustomExample();p=(0,r.jsx)(c.Fragment,null,s.pageStyle===t.Paging?(0,r.jsx)(r.TransitionContainer,{previousIndex:1,currentIndex:0,transitionType:s.transition,direction:s.transitionDirection},m):(0,r.jsx)("div",{className:"gallery-slide-card"},m),s.pageStyle===t.Scroll&&this.renderNavbar(s.direction===e.Horizon),s.pageStyle===t.Paging&&this.renderBottomTools(!0),!l&&s.pageStyle===t.Paging&&o===r.AppMode.Design&&(0,r.jsx)("div",{className:"edit-mask position-absolute w-100 h-100"}))}return p})(s.templateType))},this.onRuntimeBookmarkNameChange=(e,t)=>{const i=JSON.parse(r.utils.readLocalStorage(e));i.name=t,r.utils.setLocalStorage(e,JSON.stringify(i))},this.handleKeydown=(e,t)=>{"Enter"===e.key&&t.current.blur()},this.handleRuntimeDelete=e=>{const t=this.getRuntimeUuid(),i=JSON.parse(r.utils.readLocalStorage(t))||[],a=i.findIndex((t=>t===e));a>-1&&i.splice(a,1),r.utils.setLocalStorage(t,JSON.stringify(i)),r.utils.removeFromLocalStorage(e),this.setState({runtimeBmArray:i})},this.renderRuntimeBookmarkList=()=>{const{appMode:e,config:t}=this.props,i=this.getRuntimeUuid(),o=JSON.parse(r.utils.readLocalStorage(i))||[];return(0,r.jsx)("div",{className:"bookmark-container"},(o&&o.length>0&&t.templateType!==a.Gallery||t.runtimeAddAllow)&&(0,r.jsx)("div",{className:"bookmark-runtimeSeparator"}),(()=>{let i;switch(t.templateType){case a.Card:i=o.map((t=>{const i=JSON.parse(r.utils.readLocalStorage(t)),a=r.React.createRef();return(0,r.jsx)(c.Fragment,{key:t},(0,r.jsx)("div",{className:"d-inline-flex bookmark-card-col runtime-bookmarkCard"},(0,r.jsx)(d.Card,{onClick:()=>this.onViewBookmark(i),className:(e===r.AppMode.Run?"bookmark-pointer":"")+" surface-1"},(0,r.jsx)("div",{className:"widget-card-image bg-light-300"},(0,r.jsx)("div",{className:"widget-card-image-inner"},(0,r.jsx)("div",{className:"default-img"}))),(0,r.jsx)(d.CardBody,{className:"widget-card-content runtime-title-con"},(0,r.jsx)(d.TextInput,{className:"runtime-title w-100",ref:a,size:"sm",title:i.name,defaultValue:i.name||"",onClick:e=>e.stopPropagation(),onKeyDown:e=>this.handleKeydown(e,a),onAcceptValue:e=>this.onRuntimeBookmarkNameChange(t,e)}))),(0,r.jsx)("span",{className:"runtimeBookmarkCard-operation float-right"},(0,r.jsx)(d.Button,{title:this.formatMessage("deleteOption"),onClick:()=>this.handleRuntimeDelete(t),type:"tertiary",icon:!0},(0,r.jsx)(W,{size:"s"})))))}));const s=(0,r.jsx)(c.Fragment,{key:"card-add"},(0,r.jsx)("div",{className:"card-add",onClick:this.handleRuntimeAdd,title:this.formatMessage("addBookmark")},(0,r.jsx)("div",{className:"add-placeholder"}),(0,r.jsx)("div",{className:"gallery-add-icon"},(0,r.jsx)(A,{className:"mr-1",size:"l"}))),(0,r.jsx)("div",{className:"vertical-border"}));t.runtimeAddAllow&&i.push(s);break;case a.List:i=o.map((t=>{const i=JSON.parse(r.utils.readLocalStorage(t)),a=r.React.createRef();return(0,r.jsx)("div",{key:t,onClick:()=>this.onViewBookmark(i),className:(e===r.AppMode.Run?"bookmark-pointer":"")+" d-flex runtime-bookmarkList surface-1"},(0,r.jsx)(C,{className:"ml-3"}),(0,r.jsx)(d.TextInput,{className:"runtime-title",ref:a,size:"sm",title:i.name,defaultValue:i.name||"",onKeyDown:e=>this.handleKeydown(e,a),onAcceptValue:e=>this.onRuntimeBookmarkNameChange(t,e)}),(0,r.jsx)("span",{className:"runtimeBookmarkList-operation float-right"},(0,r.jsx)(d.Button,{title:this.formatMessage("deleteOption"),onClick:()=>this.handleRuntimeDelete(t),type:"tertiary",icon:!0},(0,r.jsx)(W,{size:"s"}))))}));const n=(0,r.jsx)(c.Fragment,{key:"list-add"},(0,r.jsx)("div",{className:"list-add",onClick:this.handleRuntimeAdd,title:this.formatMessage("addBookmark")},(0,r.jsx)("div",{className:"gallery-add-icon"},(0,r.jsx)(A,{className:"mr-1",size:"l"}))),(0,r.jsx)("div",{className:"vertical-border"}));t.runtimeAddAllow&&i.push(n)}return i})())};const m=this.getRuntimeUuid(),g=JSON.parse(r.utils.readLocalStorage(m))||[],h={jimuMapView:void 0,widgetRect:void 0,apiLoaded:!1,viewGroup:void 0,bookmarkOnViewId:1,autoPlayStart:!1,LayoutEntry:null,runtimeBmArray:g,playTimer:void 0,isSetLayout:!1,isSuspendMode:!1};window.jimuConfig.isInBuilder?h.LayoutEntry=this.props.builderSupportModules.LayoutEntry:h.LayoutEntry=u.LayoutEntry;let v=0;if(g.length>0){const e=g[g.length-1],{title:t}=JSON.parse(r.utils.readLocalStorage(e)),i=t.lastIndexOf("-");v=parseInt(t.substring(i+1))}this.state=h,this.graphicsLayerCreated={},this.graphicsPainted={},this.graphicsLayerId={},this.runtimeReference=void 0,this.containerRef=r.React.createRef(),this.rtBookmarkId=v,this.showInView=!1,this.alreadyActiveLoading=!1}static getDerivedStateFromProps(e,t){if(!e||0===Object.keys(e).length||!t||0===Object.keys(t).length)return null;const{autoPlayStart:i,playTimer:a}=t;return e.autoplayActiveId!==e.id?(i&&a&&clearInterval(a),{autoPlayStart:!1,playTimer:void 0}):null}componentDidMount(){this.state.apiLoaded||(0,m.loadArcGISJSAPIModules)(["esri/Graphic","esri/layers/GraphicsLayer","esri/geometry/Extent","esri/Viewpoint","esri/Basemap"]).then((e=>{[this.Graphic,this.GraphicsLayer,this.Extent,this.Viewpoint,this.Basemap]=e,this.setState({apiLoaded:!0})}))}componentDidUpdate(e){var t,i,a,o,s,n;const{config:l,appMode:d,id:p,autoplayActiveId:c,isPrintPreview:m}=this.props,{autoPlayStart:u,playTimer:g,jimuMapView:h,isSuspendMode:v}=this.state,y=(null===(i=null===(t=this.props)||void 0===t?void 0:t.stateProps)||void 0===i?void 0:i.activeBookmarkId)||0;if(c&&h&&p!==c){const e=this.graphicsLayerId[h.id];if(!e)return;const t=h.view.map.findLayerById(e);t&&t.removeAll(),this.graphicsPainted[h.id]={}}if(e.appMode===r.AppMode.Design&&d===r.AppMode.Run&&h&&l.initBookmark){const e=this.getMapBookmarks(h)||[],t=l.displayFromWeb?l.bookmarks.concat(e):l.bookmarks;t.length>0&&this.showInView&&h.view.when((()=>{this.setState({bookmarkOnViewId:t[0].id}),this.onViewBookmark(t[0])}))}if(this.autoOffCondition(e)&&u)return g&&clearInterval(g),void this.setState({autoPlayStart:!1,playTimer:void 0});if(e.isPrintPreview!==m&&(u?(this.setState({isSuspendMode:!0}),this.handleAutoPlay()):v&&!u&&(this.setState({isSuspendMode:!1}),this.handleAutoPlay())),(null===(o=null===(a=this.props)||void 0===a?void 0:a.stateProps)||void 0===o?void 0:o.settingChangeBookmark)&&y){const e=l.bookmarks.findIndex((e=>e.id===y))>-1?l.bookmarks.findIndex((e=>e.id===y)):0;this.setState({bookmarkOnViewId:y}),this.props.dispatch(r.appActions.widgetStatePropChange(p,"settingChangeBookmark",!1)),d===r.AppMode.Run&&this.onViewBookmark(l.bookmarks[e])}if(null===(n=null===(s=this.props)||void 0===s?void 0:s.stateProps)||void 0===n?void 0:n.lastFlag){this.props.dispatch(r.appActions.widgetStatePropChange(p,"lastFlag",!1));const e=h.view.map.findLayerById(this.graphicsLayerId[h.id]);e&&e.removeAll()}this.settingLayout()}componentWillUnmount(){const{jimuMapView:e}=this.state;if(!(0,r.getAppStore)().getState().appConfig.widgets[this.props.id]&&e){const t=e.view.map.findLayerById(this.graphicsLayerId[e.id]);t&&t.removeAll();const i=this.getRuntimeUuid();(JSON.parse(r.utils.readLocalStorage(i))||[]).forEach((e=>{r.utils.removeFromLocalStorage(e)})),r.utils.removeFromLocalStorage(i)}}render(){const{config:e,id:t,useMapWidgetIds:i,theme:o,isPrintPreview:s}=this.props,{jimuMapView:n,apiLoaded:l}=this.state,{runtimeAddAllow:d}=e,p=(0,r.classNames)("jimu-widget","widget-bookmark","bookmark-widget-"+t),g=this.getMapBookmarks(n)||[],h=e.displayFromWeb?e.bookmarks.concat(g).length:e.bookmarks.length,v=this.getRuntimeUuid(),y=(JSON.parse(r.utils.readLocalStorage(v))||[]).length,x={id:99999,name:this.formatMessage("_widgetLabel"),title:this.formatMessage("_widgetLabel"),description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",type:"2d",mapViewId:"widget_egeditor-dataSource_eg",mapDataSourceId:"dataSource_eg"},k=[a.Slide1,a.Slide2,a.Slide3,a.Gallery,a.Custom1,a.Custom2];return(0,r.jsx)(u.ViewVisibilityContext.Consumer,null,(({isInView:t,isInCurrentView:n})=>{let g=!0;return g=!t||n,g||(this.alreadyActiveLoading=!1),(0,r.jsx)(c.Fragment,null,g&&(0,r.jsx)(u.ViewportVisibilityContext.Consumer,null,(t=>(t||(this.alreadyActiveLoading=!1),this.showInView=t,(0,r.jsx)("div",{className:p,css:this.getStyle(o)},(s||t)&&l&&(0,r.jsx)(c.Fragment,null,(0,r.jsx)(m.JimuMapViewComponent,{useMapWidgetId:null==i?void 0:i[0],onActiveViewChange:this.onActiveViewChange,onViewGroupCreate:this.handleViewGroupCreate}),d||0!==y||0!==h?(0,r.jsx)(c.Fragment,null,(0,r.jsx)("div",{className:"h-100 d-flex flex-wrap bookmark-view-auto"},(h>0||e.templateType===a.Gallery)&&this.renderBookmarkList(e.bookmarks),(y>0||d)&&!k.includes(e.templateType)&&this.renderRuntimeBookmarkList())):(0,r.jsx)(c.Fragment,null,(0,r.jsx)("div",{className:"h-100 d-flex flex-wrap bookmark-view-auto"},this.renderBookmarkExample(x)))))))))}))}}Z.mapExtraStateProps=(e,t)=>{var i,a,o,s,n;const l=null==e?void 0:e.appConfig,{layouts:d,layoutId:p,layoutItemId:c,builderSupportModules:m,id:u,useMapWidgetIds:g}=t,h=null===(i=null==e?void 0:e.appRuntimeInfo)||void 0===i?void 0:i.selection,v=h&&m&&m.widgetModules&&m.widgetModules.selectionInBookmark(h,u,l,!1),y=null==e?void 0:e.mapWidgetsInfo,x=g&&0!==g.length?g[0]:void 0,k=(null==e?void 0:e.browserSizeMode)||r.BrowserSizeMode.Large;return{appMode:null===(a=null==e?void 0:e.appRuntimeInfo)||void 0===a?void 0:a.appMode,appConfig:l,layouts:d,selectionIsSelf:h&&h.layoutId===p&&h.layoutItemId===c,selectionIsInSelf:v,autoplayActiveId:x?null===(o=y[x])||void 0===o?void 0:o.autoControlWidgetId:void 0,mapWidgetId:x,browserSizeMode:k,isPrintPreview:null!==(n=null===(s=null==e?void 0:e.appRuntimeInfo)||void 0===s?void 0:s.isPrintPreview)&&void 0!==n&&n}},Z.versionManager=h;const U=Z})(),l})())}}}));