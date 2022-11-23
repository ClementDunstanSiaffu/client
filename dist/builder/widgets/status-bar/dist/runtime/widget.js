System.register(["jimu-core","jimu-for-builder","jimu-ui","jimu-ui/advanced/setting-components"],(function(e,t){var o={},a={},r={},i={};return{setters:[function(e){o.BrowserSizeMode=e.BrowserSizeMode,o.DialogMode=e.DialogMode,o.PageType=e.PageType,o.React=e.React,o.ReactRedux=e.ReactRedux,o.appActions=e.appActions,o.classNames=e.classNames,o.css=e.css,o.getAppStore=e.getAppStore,o.jsx=e.jsx,o.utils=e.utils},function(e){a.builderAppSync=e.builderAppSync,a.getAppConfigAction=e.getAppConfigAction},function(e){r.Button=e.Button,r.Dropdown=e.Dropdown,r.DropdownItem=e.DropdownItem,r.DropdownMenu=e.DropdownMenu,r.DropdownToggle=e.DropdownToggle,r.Icon=e.Icon,r.SVG=e.SVG,r.styleUtils=e.styleUtils},function(e){i.changeCurrentDialog=e.changeCurrentDialog,i.changeCurrentPage=e.changeCurrentPage}],execute:function(){e((()=>{var e={9203:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14 1H8v3H7V1H1v6h3v1H1v6h6v-3h1v3h6V8h-3V7h3V1ZM1 0a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1Z" fill="#000"></path></svg>'},3626:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14 1v13H1V7.46l2.138 2.348a.508.508 0 0 0 .752-.684L2.867 8H6V7H2.794l1.023-1.124a.508.508 0 0 0-.752-.685L1 7.46V1h13Zm0-1a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h13Zm-1.867 7L11.11 5.876a.508.508 0 1 1 .752-.684L14 7.54l-2.065 2.268a.508.508 0 0 1-.752-.684L12.207 8H9V7h3.133Z" fill="#000"></path></svg>'},8992:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 7.5A.5.5 0 0 1 .5 7h14a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5Z" fill="#000"></path></svg>'},4750:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0a.5.5 0 0 0-.5.5V7H.5a.5.5 0 0 0 0 1H7v6.5a.5.5 0 0 0 1 0V8h6.5a.5.5 0 0 0 0-1H8V.5a.5.5 0 0 0-.5-.5Z" fill="#000"></path></svg>'},8891:e=>{"use strict";e.exports=o},3137:e=>{"use strict";e.exports=a},726:e=>{"use strict";e.exports=r},7756:e=>{"use strict";e.exports=i}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="";var s={};return n.p=window.jimuConfig.baseUrl,(()=>{"use strict";n.r(s),n.d(s,{default:()=>k});var e=n(8891),t=n(726),o=n(3137),a=n(7756);function r(o){const{pageId:a,label:r,isInFolder:i,isFolder:n,isActive:s,hasSubPage:l,onSelect:p}=o,c=e.React.useCallback((()=>{p(a)}),[a,p]);return(0,e.jsx)(t.DropdownItem,{className:(0,e.classNames)({"page-item":!n||l,"in-folder":i,folder:n&&!l,"has-subpage":l,active:s}),active:s,header:n&&!l,onClick:c},(0,e.jsx)("div",{className:"text-truncate w-100",title:r},r))}function i(e){(0,a.changeCurrentPage)(e)}function l(t){const a=e.ReactRedux.useSelector((e=>{var t,o;return null===(o=null===(t=e.appStateInBuilder)||void 0===t?void 0:t.appConfig)||void 0===o?void 0:o.pageStructure})),n=[];if(a){const t=(0,o.getAppConfigAction)().appConfig.pages;a.forEach((o=>{var a,r;const i=Object.keys(o)[0],s=t[i];if(s.type===e.PageType.Normal)if((null===(a=o[i])||void 0===a?void 0:a.length)>0){const a=[];o[i].forEach((o=>{const r=t[o];r.type===e.PageType.Normal&&a.push({pageId:o,label:r.label,isInFolder:!0})})),a.length>0?(n.push({pageId:i,label:s.label,isFolder:!0,hasSubPage:!0}),n.push(...a)):n.push({pageId:i,label:s.label})}else n.push({pageId:i,label:s.label});else if(s.type===e.PageType.Folder){const a=[];(null===(r=o[i])||void 0===r?void 0:r.length)>0&&o[i].forEach((o=>{const r=t[o];r.type===e.PageType.Normal&&a.push({pageId:o,label:r.label,isInFolder:!0})})),a.length>0&&(n.push({pageId:i,label:s.label,isFolder:!0}),n.push(...a))}}))}return(0,e.jsx)(e.React.Fragment,null,n.map((o=>(0,e.jsx)(r,Object.assign({key:o.pageId,onSelect:i,isActive:o.pageId===t.currentPageId},o)))))}function p(e){(0,a.changeCurrentDialog)(e)}function c(o){const a=e.ReactRedux.useSelector((e=>{var t,o;return null===(o=null===(t=e.appStateInBuilder)||void 0===t?void 0:t.appConfig)||void 0===o?void 0:o.dialogs}));if(!a||0===Object.keys(a).length)return null;const r=[],i=[];return Object.keys(a).forEach((t=>{const o=a[t];o.mode===e.DialogMode.Fixed?r.push({id:t,label:o.label}):o.mode===e.DialogMode.Anchored&&i.push({id:t,label:o.label})})),(0,e.jsx)(e.React.Fragment,null,(0,e.jsx)(t.DropdownItem,{header:!0,className:"page-header"},o.formatMessage("dialog")),(0,e.jsx)(t.DropdownItem,{className:"folder",header:!0},o.formatMessage("fixedWindows")),r.map((a=>(0,e.jsx)(t.DropdownItem,{key:a.id,className:(0,e.classNames)("page-item in-folder",{active:o.currentDialogId===a.id}),active:o.currentDialogId===a.id,onClick:()=>p(a.id)},(0,e.jsx)("div",{className:"text-truncate w-100",title:a.label},a.label)))),(0,e.jsx)(t.DropdownItem,{className:"folder",header:!0},o.formatMessage("anchoredWindows")),i.map((a=>(0,e.jsx)(t.DropdownItem,{key:a.id,className:(0,e.classNames)("page-item in-folder",{active:o.currentDialogId===a.id}),active:o.currentDialogId===a.id,onClick:()=>p(a.id)},(0,e.jsx)("div",{className:"text-truncate w-100",title:a.label},a.label)))))}var d=n(8992),u=n.n(d);const g=o=>{const{className:a}=o,r=function(e,t){var o={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(o[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(o[a[r]]=e[a[r]])}return o}(o,["className"]),i=(0,e.classNames)("jimu-icon jimu-icon-component",a);return e.React.createElement(t.SVG,Object.assign({className:i,src:u()},r))};var m=n(4750),h=n.n(m);const v=o=>{const{className:a}=o,r=function(e,t){var o={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(o[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(o[a[r]]=e[a[r]])}return o}(o,["className"]),i=(0,e.classNames)("jimu-icon jimu-icon-component",a);return e.React.createElement(t.SVG,Object.assign({className:i,src:h()},r))};var b=n(3626),f=n.n(b);const x=o=>{const{className:a}=o,r=function(e,t){var o={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(o[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(o[a[r]]=e[a[r]])}return o}(o,["className"]),i=(0,e.classNames)("jimu-icon jimu-icon-component",a);return e.React.createElement(t.SVG,Object.assign({className:i,src:f()},r))};var w=n(9203),y=n.n(w);const S=o=>{const{className:a}=o,r=function(e,t){var o={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(o[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(o[a[r]]=e[a[r]])}return o}(o,["className"]),i=(0,e.classNames)("jimu-icon jimu-icon-component",a);return e.React.createElement(t.SVG,Object.assign({className:i,src:y()},r))},j=.5;class k extends e.React.PureComponent{constructor(a){super(a),this.formatMessage=(e,t)=>this.props.intl.formatMessage({id:e},t),this.onPreviewScaleChange=e=>{e.stopPropagation();const t=this.fromRangeToZoomScale(Number(e.currentTarget.value));this.updateScale(t)},this.zoomout=e=>{e.stopPropagation();const{zoomScale:t}=this.props,o=Math.round(100*t),a=10*Math.floor(o/10);let r;r=o===a?t-.1:a/100,r=Math.round(10*r)/10,r=Math.max(j,r),this.updateScale(r)},this.zoomin=e=>{e.stopPropagation();const{zoomScale:t}=this.props,o=Math.round(100*t),a=10*Math.ceil(o/10);let r;r=o===a?t+.1:a/100,r=Math.round(10*r)/10,r=Math.min(2,r),this.updateScale(r)},this.zoomToFit=e=>{e.stopPropagation();const{viewportSize:t}=this.props;let o=this.calAvailableWidth()/t.width;o=Math.floor(100*o)/100,o=Math.max(.5,Math.min(2,o)),this.updateScale(o)},this.zoomToNormal=e=>{e.stopPropagation(),this.updateScale(1)},this.stopPropgation=e=>{e.stopPropagation()},this.toggleSettingPanel=()=>{(0,e.getAppStore)().dispatch(e.appActions.widgetStatePropChange("right-sidebar","collapse",!this.props.settingPanelVisible))},this.onDropDownToggle=e=>{const{isPageListOpen:t}=this.state;this.setState({isPageListOpen:!t}),e.stopPropagation()},this.handlePageListItemClick=(e,t)=>{e.stopPropagation();const{currentPageId:a}=this.props;t!==a&&(o.builderAppSync.publishChangeSelectionToApp(null),o.builderAppSync.publishPageChangeToApp(t))},this.getDropdownStyle=()=>e.css`
      padding: unset;
      max-width: 240px;

      .page-header {
        height: 2rem;
        background-color: var(--light-700);
        color: var(--dark-800) !important;
        font-size: 14px;
        line-height: 2rem;
        display: flex !important;
        align-items: center;
      }

      .page-item {
        font-size: 13px;
        color: var(--black) !important;
        padding: 0 24px !important;
        height: 2rem;

        &:not(.active):hover {
          background: var(--light-600) !important;
        }

        &.active {
          background: var(--primary);
        }
      }

      .folder {
        font-size: 13px;
        color: var(--dark-500) !important;
        padding: 0 !important;
        margin: 0 24px;
        height: 2rem;
        line-height: 2rem;
      }

      .page-header,
      .folder {
        &:focus {
          outline: none;
        }
      }

      .in-folder {
        padding-left: 2.25rem !important;
      }
    `,this.renderPageList=()=>{var o;const{isPageListOpen:a}=this.state,{pages:r,currentPageId:i,currentDialogId:n,currentDialogLabel:s}=this.props,p=n?s:null===(o=null==r?void 0:r[i])||void 0===o?void 0:o.label;return(0,e.jsx)("div",{className:"d-flex page-list align-items-center ml-3"},(0,e.jsx)("div",{className:"page-label"},n?this.formatMessage("dialog"):this.formatMessage("page"),":"),(0,e.jsx)(t.Dropdown,{direction:"up",size:"sm",toggle:this.onDropDownToggle,isOpen:a,menuItemCheckMode:"singleCheck"},(0,e.jsx)(t.DropdownToggle,{className:"text-truncate",title:p,css:e.css`max-width: 240px`,icon:!0,size:"sm",type:"tertiary",caret:!0},p),(0,e.jsx)(t.DropdownMenu,{css:this.getDropdownStyle()},(0,e.jsx)(t.DropdownItem,{header:!0,className:"page-header"},this.formatMessage("page")),(0,e.jsx)(l,{currentPageId:n?null:i}),(0,e.jsx)(c,{currentDialogId:n,formatMessage:this.formatMessage}))))},this.state={isPageListOpen:!1}}calAvailableWidth(){const e=document.querySelector('div[data-widgetid="app-loader"]').getBoundingClientRect();let o=parseFloat(t.styleUtils.remToPixel("3rem"));return isNaN(o)&&(o=48),e.width-o-10}updateScale(e){o.builderAppSync.publichChangeZoomScaleToApp(e)}percentageZoomScale(){const{zoomScale:t}=this.props;return e.utils.formatPercentageNumber(`${Math.round(100*t)}%`)}mapStep(){return.1}fromZoomScaleToRange(e){return e<1?50*(e-j)/.5+0:e>1?50*(e-1)/1+50:50}fromRangeToZoomScale(e){return e<50?.5*(e-0)/50+j:e>50?1*(e-50)/50+1:1}calBackground(){const t=100*(this.fromZoomScaleToRange(this.props.zoomScale)-0)/100+"%",o=`linear-gradient(to right, var(--dark-600) 0%, var(--dark-600) ${t}, var(--light-800) ${t}, var(--light-600))`;return e.css`
      &::-webkit-slider-runnable-track {
        background: ${o} !important;
      }
      &::-moz-range-track {
        background: ${o} !important;
      }
      &::-ms-track {
        background: ${o} !important;
      }
    `}render(){const{zoomScale:o,settingPanelVisible:a}=this.props;return(0,e.jsx)("div",{css:(r=this.props.theme,e.css`
    overflow: hidden;
    height: 100%;
    background-color: var(--secondary);
    border-top: 1px solid var(--light-800);

    .zoom-section {
      .percentage-label {
        width: 4rem;
        color: var(--dark-800);
      }
      .form-control-range {
        margin: 0 8px 1px;
      }
    }

    .btn {
      padding: 0 0 2px;

      .jimu-icon {
        margin-right: 0;
        margin-left: 0;
      }
    }

    .dropdown-toggle-content {
      font-size: 12px;
      line-height: 16px;
    }

    .setting-panel-visible {
      background-color: var(--light-700);
      .btn {
        color: var(--black);
      }
    }

    .jimu-dropdown .jimu-icon {
      transform: rotate(180deg);
    }

    .page-list {
      .page-label {
        color: var(--dark-800);
        font-size: 12px;
        margin-right: 8px;
      }
      .icon-btn {
        color: var(--dark-800);
        &:hover {
          color: var(--black);
        }
        .jimu-icon {
          margin-left: 6px;
        }
      }
    }

    input[type='range'] {
      -webkit-appearance: none;
      background: transparent;
    }
    input[type='range']:focus {
      outline: none;
    }
    input[type='range']::-webkit-slider-runnable-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      background: var(--light-800);
      border-radius: 2px;
    }
    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 12px;
      width: 12px;
      border-radius: 6px;
      cursor: pointer;
      background: var(--light-300);
      border: 2px solid var(--dark-600);
      margin-top: -5px;

      &:hover {
        border-color: var(--black);
      }
    }
    input[type='range']:focus::-webkit-slider-runnable-track {
      background: var(--light-800);
    }
    input[type='range']::-moz-range-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      background: var(--light-800);
      border-radius: 2px;
    }
    input[type='range']::-moz-range-thumb {
      height: 10px;
      width: 10px;
      border-radius: 8px;
      cursor: pointer;
      background: var(--light-300);
      border: 2px solid var(--dark-600);
      margin-top: -5px;
      &:hover {
        border-color: var(--black);
      }
    }
    input[type='range']::-ms-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      background: ${null===(n=null===(i=null==r?void 0:r.colors)||void 0===i?void 0:i.palette)||void 0===n?void 0:n.light[800]};
      border-radius: 2px;
    }
    input[type='range']::-ms-thumb {
      height: 10px;
      width: 10px;
      border-radius: 8px;
      cursor: pointer;
      background: ${null===(l=null===(s=null==r?void 0:r.colors)||void 0===s?void 0:s.palette)||void 0===l?void 0:l.light[300]};
      border: 2px solid ${null===(c=null===(p=null==r?void 0:r.colors)||void 0===p?void 0:p.palette)||void 0===c?void 0:c.dark[600]};
      margin-top: 0px;
      &:hover {
        border-color: ${null===(d=null==r?void 0:r.colors)||void 0===d?void 0:d.black};
      }
    }
  `),className:"jimu-widget widget-status-bar d-flex"},this.renderPageList(),(0,e.jsx)("div",{className:"zoom-section flex-grow-1 d-flex justify-content-end align-items-center"},(0,e.jsx)(t.Button,{type:"tertiary",disabled:o<=j,title:this.formatMessage("zoomOut"),onClick:this.zoomout},(0,e.jsx)(g,{size:"s"})),(0,e.jsx)("input",{css:this.calBackground(),type:"range",className:"form-control-range",min:0,max:100,step:this.mapStep(),value:this.fromZoomScaleToRange(o),onClick:this.stopPropgation,onChange:this.onPreviewScaleChange}),(0,e.jsx)(t.Button,{type:"tertiary",disabled:o>=2,title:this.formatMessage("zoomIn"),onClick:this.zoomin},(0,e.jsx)(v,{size:"s"})),(0,e.jsx)(t.Dropdown,{direction:"up",size:"sm",className:"ml-2"},(0,e.jsx)(t.DropdownToggle,{icon:!0,size:"sm",type:"tertiary"},this.percentageZoomScale()),(0,e.jsx)(t.DropdownMenu,{css:e.css`min-width: 5rem;`},[200,175,150,125,100,75,50].map((o=>(0,e.jsx)(t.DropdownItem,{className:"justify-content-center",key:o,onClick:()=>this.updateScale(o/100)},e.utils.formatPercentageNumber(`${o}%`)))))),(0,e.jsx)(t.Button,{type:"tertiary",className:"ml-2",onClick:this.zoomToNormal,title:this.formatMessage("zoomToNormal")},(0,e.jsx)(S,{size:"s",className:"m-0"})),(0,e.jsx)(t.Button,{type:"tertiary",className:"ml-2",onClick:this.zoomToFit,title:this.formatMessage("zoomToFit")},(0,e.jsx)(x,{size:"s",className:"m-0"}))),(0,e.jsx)("div",{className:(0,e.classNames)("setting-panel-section d-flex justify-content-center align-items-center ml-4 mr-2",{"setting-panel-visible":a})},(0,e.jsx)(t.Button,{type:"tertiary",title:a?this.formatMessage("closeSettingPanel"):this.formatMessage("openSettingPanel"),className:"px-2",onClick:this.toggleSettingPanel},(0,e.jsx)(t.Icon,{icon:"./widgets/status-bar/dist/runtime/assets/setting-panel.svg",width:12,height:12,className:"m-0",autoFlip:!0}))));var r,i,n,s,l,p,c,d}}k.mapExtraStateProps=(t,o)=>{var a,r,i,n,s,l,p,c,d,u,g,m,h,v,b,f,x,w,y;const S=null!==(i=null===(r=null===(a=t.appStateInBuilder)||void 0===a?void 0:a.appRuntimeInfo)||void 0===r?void 0:r.zoomScale)&&void 0!==i?i:1,j=null!==(s=null===(n=t.appStateInBuilder)||void 0===n?void 0:n.browserSizeMode)&&void 0!==s?s:e.BrowserSizeMode.Large,k=e.utils.findViewportSize(null===(l=t.appStateInBuilder)||void 0===l?void 0:l.appConfig,j),P=null===(c=null===(p=null==t?void 0:t.appStateInBuilder)||void 0===p?void 0:p.appConfig)||void 0===c?void 0:c.pages,I=null===(u=null===(d=null==t?void 0:t.appStateInBuilder)||void 0===d?void 0:d.appConfig)||void 0===u?void 0:u.pageStructure,N=null===(m=null===(g=null==t?void 0:t.appStateInBuilder)||void 0===g?void 0:g.appRuntimeInfo)||void 0===m?void 0:m.currentPageId,O=null===(v=null===(h=null==t?void 0:t.appStateInBuilder)||void 0===h?void 0:h.appRuntimeInfo)||void 0===v?void 0:v.currentDialogId,M=O?null===(b=null==t?void 0:t.appStateInBuilder)||void 0===b?void 0:b.appConfig.dialogs[O].label:null;return{zoomScale:S,viewportSize:k,settingPanelVisible:null===(w=null===(x=null===(f=t.widgetsState)||void 0===f?void 0:f["right-sidebar"])||void 0===x?void 0:x.collapse)||void 0===w||w,pages:P,pageStructure:I,currentPageId:N,currentDialogId:O,currentDialogLabel:M,locale:null===(y=null==t?void 0:t.appContext)||void 0===y?void 0:y.locale}}})(),s})())}}}));