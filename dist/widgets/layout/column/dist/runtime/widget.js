System.register(["jimu-core","jimu-ui","jimu-layouts/layout-runtime"],(function(e,t){var o={},r={},s={};return{setters:[function(e){o.React=e.React,o.css=e.css,o.jsx=e.jsx},function(e){r.WidgetPlaceholder=e.WidgetPlaceholder},function(e){s.ColumnLayoutViewer=e.ColumnLayoutViewer}],execute:function(){e((()=>{var e={34317:e=>{e.exports='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M15 2H1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2ZM2 0h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2ZM1 6h14v1H1V6Zm0 5h14v1H1v-1Z"></path></svg>'},48891:e=>{"use strict";e.exports=o},74758:e=>{"use strict";e.exports=s},30726:e=>{"use strict";e.exports=r}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="";var i={};return n.p=window.jimuConfig.baseUrl,(()=>{"use strict";n.r(i),n.d(i,{default:()=>s});var e=n(48891),t=n(30726),o=n(74758);const r=n(34317);class s extends e.React.PureComponent{getStyle(){return e.css`
      & > div.column-layout {
        height: 100%;
        overflow: hidden;
        display: flex;

        & > .trail-container {
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
        }
      }
    `}render(){const{layouts:s,id:n,intl:i,builderSupportModules:u}=this.props,l=window.jimuConfig.isInBuilder?u.widgetModules.ColumnLayoutBuilder:o.ColumnLayoutViewer;if(null==l)return(0,e.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"}},"No layout component!");const a=Object.keys(s)[0];return(0,e.jsx)("div",{className:"widget-column-layout w-100 h-100",css:this.getStyle(),style:{overflow:"auto"}},(0,e.jsx)(l,{layouts:s[a]},(0,e.jsx)(t.WidgetPlaceholder,{icon:r,widgetId:n,style:{border:"none",height:"100%",pointerEvents:"none",position:"absolute"},message:i.formatMessage({id:"tips",defaultMessage:"Column"})})))}}})(),i})())}}}));