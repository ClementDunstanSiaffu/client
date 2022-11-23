System.register(["jimu-core","jimu-for-builder","jimu-layouts/layout-runtime","jimu-theme","jimu-ui"],(function(e,t){var s={},i={},o={},a={},n={};return{setters:[function(e){s.APP_FRAME_NAME_IN_BUILDER=e.APP_FRAME_NAME_IN_BUILDER,s.AppMode=e.AppMode,s.LayoutItemType=e.LayoutItemType,s.PagePart=e.PagePart,s.PageType=e.PageType,s.React=e.React,s.ReactRedux=e.ReactRedux,s.WidgetType=e.WidgetType,s.classNames=e.classNames,s.css=e.css,s.defaultMessages=e.defaultMessages,s.getAppStore=e.getAppStore,s.injectIntl=e.injectIntl,s.jsx=e.jsx,s.polished=e.polished},function(e){i.builderActions=e.builderActions,i.helpUtils=e.helpUtils,i.utils=e.utils},function(e){o.searchUtils=e.searchUtils},function(e){a.withTheme=e.withTheme},function(e){n.Button=e.Button,n.Collapse=e.Collapse,n.Icon=e.Icon,n.Loading=e.Loading,n.LoadingType=e.LoadingType,n.Popper=e.Popper,n.SVG=e.SVG,n.Tab=e.Tab,n.Tabs=e.Tabs,n.TextInput=e.TextInput,n.defaultMessages=e.defaultMessages}],execute:function(){e((()=>{var e={4077:e=>{e.exports='<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.596 6.357c.39-.59.944-1.055 1.595-1.337L15.544.094a1.143 1.143 0 0 1 .91 0L30 5.97V23.66a3.6 3.6 0 0 1-.596 1.983 3.648 3.648 0 0 1-1.595 1.337l-11.353 4.927a1.144 1.144 0 0 1-.91 0L2 26.029V8.34a3.6 3.6 0 0 1 .596-1.984Zm3.419 15.162c.009.016.022.029.037.038l9.594 5.351a.721.721 0 0 0 .705 0l9.144-5.103a.994.994 0 0 0 .37-.356.95.95 0 0 0 .135-.488v-9.89a.852.852 0 0 0-.122-.438.89.89 0 0 0-.331-.32l-9.497-5.3a.106.106 0 0 0-.104 0l-2.415 1.348a.069.069 0 0 0-.026.025.066.066 0 0 0 .026.092l8.947 4.992c.39.218.716.532.941.91.226.378.345.807.345 1.243v5.514c0 .08-.021.157-.062.226a.459.459 0 0 1-.172.165l-5.633 3.145a3.904 3.904 0 0 1-1.899.49c-.666 0-1.32-.169-1.898-.49L8.972 19.81a1.457 1.457 0 0 1-.542-.524 1.394 1.394 0 0 1-.198-.715V11.76a.069.069 0 0 1 .07-.068c.012 0 .024.003.035.009l7.651 4.268c.05.028.092.068.121.117a.313.313 0 0 1 .045.16v2.526c0 .012.003.024.009.034a.068.068 0 0 0 .06.033.073.073 0 0 0 .035-.009l1.972-1.1c.28-.156.511-.38.673-.651.161-.27.247-.577.247-.89v-.964c0-.278-.076-.55-.22-.79-.144-.241-.35-.44-.598-.58L9.65 9.011a.885.885 0 0 0-.86 0L6.052 10.54a.104.104 0 0 0-.052.088v10.842c0 .018.006.035.015.05Z" fill="#000"></path></svg>'},2700:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 2h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1ZM1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3Zm3 2h8V4H4v1Zm8 3H4V7h8v1Zm-8 3h6v-1H4v1Z" fill="#000"></path></svg>'},9788:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.146 4.653a.485.485 0 0 1 .708 0L8 10.24l5.146-5.587a.485.485 0 0 1 .708 0 .538.538 0 0 1 0 .738l-5.5 5.956a.485.485 0 0 1-.708 0l-5.5-5.956a.538.538 0 0 1 0-.738Z" fill="#000"></path></svg>'},6009:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.854 11.347a.486.486 0 0 1-.708 0L8 5.76l-5.146 5.587a.485.485 0 0 1-.708 0 .538.538 0 0 1 0-.738l5.5-5.956a.485.485 0 0 1 .708 0l5.5 5.956a.538.538 0 0 1 0 .738Z" fill="#000"></path></svg>'},224:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Zm-1.27 4.936a6.5 6.5 0 1 1 .707-.707l4.136 4.137a.5.5 0 1 1-.707.707l-4.137-4.137Z" fill="#000"></path></svg>'},1397:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm1 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-7.676 2.228H7.34c-.213-1.138.621-2.13 1.375-3.025C9.28 6.532 9.8 5.914 9.8 5.328 9.8 4.5 9.2 3.9 7.976 3.9c-.816 0-1.572.36-2.268 1.092l-.648-.6C5.852 3.552 6.788 3 8.096 3c1.692 0 2.772.864 2.772 2.244 0 .864-.652 1.628-1.3 2.387-.71.831-1.413 1.655-1.244 2.597Zm.3 2.172c0 .48-.348.792-.768.792-.432 0-.78-.312-.78-.792 0-.48.348-.804.78-.804.42 0 .768.324.768.804Z" fill="#000"></path></svg>'},8866:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.5 7.5A.5.5 0 0 1 7 7h1.5v4.5h1a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h1V8H7a.5.5 0 0 1-.5-.5Z" fill="#000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm0-1A7 7 0 1 0 8 1a7 7 0 0 0 0 14Z" fill="#000"></path></svg>'},8891:e=>{"use strict";e.exports=s},3137:e=>{"use strict";e.exports=i},4758:e=>{"use strict";e.exports=o},4796:e=>{"use strict";e.exports=a},726:e=>{"use strict";e.exports=n}},t={};function r(s){var i=t[s];if(void 0!==i)return i.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="";var l={};return r.p=window.jimuConfig.baseUrl,(()=>{"use strict";r.r(l),r.d(l,{default:()=>_});var e=r(8891),t=r(726),s=r(3137),i=r(4796),o=r(2700),a=r.n(o);const n=s=>{const{className:i}=s,o=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s}(s,["className"]),n=(0,e.classNames)("jimu-icon jimu-icon-component",i);return e.React.createElement(t.SVG,Object.assign({className:n,src:a()},o))};class p extends e.React.PureComponent{constructor(t){super(t),this.onSelectItem=e=>{this.stopBubble(e),this.props.onSelect&&this.props.onSelect(this.props.item)},this.beginDrag=t=>{if(this.props.appMode!==e.AppMode.Design)return;const{item:s}=this.props;if(t.dataTransfer&&t.dataTransfer.setData("exbWidget",s.name||s.id),window._dragging_widget_item=Object.assign(Object.assign({},s),{count:this.uniqueId}),this.uniqueId++,!this.appFrameDoc){const t=document.querySelector(`iframe[name="${e.APP_FRAME_NAME_IN_BUILDER}"]`);this.appFrameDoc=t.contentDocument||t.contentWindow.document}this.appFrameDoc&&this.appFrameDoc.documentElement.classList.add("exb-h5-dragging")},this.endDrag=e=>{window._dragging_widget_item=null,this.appFrameDoc&&this.appFrameDoc.documentElement.classList.remove("exb-h5-dragging")},this.MemoChildFunctionComponent=e.React.memo((({item:t,fullLine:s})=>this.props.children?(0,e.jsx)("div",{className:"w-100 h-100"},this.props.children(t,s)):null)),this.uniqueId=0}stopBubble(e){e&&e.stopPropagation?e.stopPropagation():window.event&&(window.event.cancelBubble=!0)}maskStyle(){return e.css`
      position: absolute;
      user-select: none;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: transparent;
      cursor: default;

      &.can-drag {
        cursor: pointer;

        &:active {
          cursor: grabbing;
        }
      }
    `}render(){const{item:t,fullLine:s,appMode:i}=this.props,o=this.MemoChildFunctionComponent;return(0,e.jsx)("div",{className:(0,e.classNames)({"col-6":!s,col:s,[this.props.className]:!!this.props.className}),draggable:i===e.AppMode.Design,onClick:this.onSelectItem,onDragStart:this.beginDrag,onDragEnd:this.endDrag,key:t.name,title:t.label,"data-widget-name":t.name},"function"==typeof this.props.children?(0,e.jsx)(o,{item:t,fullLine:s}):this.props.children,(0,e.jsx)("div",{className:(0,e.classNames)({"can-drag":i===e.AppMode.Design}),css:this.maskStyle()}))}}const d="Insert widget";var c=r(8866),u=r.n(c);const m=s=>{const{className:i}=s,o=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s}(s,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return e.React.createElement(t.SVG,Object.assign({className:a,src:u()},o))},g=()=>{const t="#fff",s="#5f5fff",i="0 2px 12px 0 rgba(95,95,255,0.40)",o="#fff",a="#4949ff";return e.css`
    width: 240px;
    padding: 1rem;
    h1, h2, h3, h4, h5, h6 {
      color: var(--dark-600);
    }
    .btn-primary {
      min-width: 100px;
      color: ${t};
      background-color: ${s};
      border: 1px solid transparent;
      box-shadow: ${i};
      &:hover {
        color: ${o};
        background-color: ${a};
        border: 1px solid transparent;
      }
    }
  `},h=(0,e.injectIntl)((function(i){var o,a;const{widgetItem:n,intl:r}=i,[l,p]=e.React.useState(!1),d=e.React.useRef(),c=e.React.useMemo((()=>r.formatMessage({id:"widgetHelpIconLabel",defaultMessage:"About this widget"})),[r]),u=e.React.useMemo((()=>r.formatMessage({id:"widgetGuideStart",defaultMessage:"Take a tour"})),[r]);return(0,e.jsx)(e.React.Fragment,null,(0,e.jsx)(t.Button,{type:"tertiary",className:"widget-help-btn",icon:!0,size:"sm",title:c,onClick:()=>{p(!l)},ref:d},(0,e.jsx)(m,null),(0,e.jsx)("span",{className:"sr-only"},u),(0,e.jsx)(t.Popper,{showArrow:!0,css:g,open:l,placement:"right",offset:[0,10],reference:d.current,toggle:()=>{p(!1)}},(0,e.jsx)("h5",null,null==n?void 0:n.label),(0,e.jsx)("p",null,null==n?void 0:n.desription),(null===(a=null===(o=null==n?void 0:n.manifest)||void 0===o?void 0:o.properties)||void 0===a?void 0:a.hasGuide)&&(0,e.jsx)(t.Button,{className:"float-right",type:"primary",size:"sm",onClick:t=>{(0,e.getAppStore)().dispatch(s.builderActions.startGuide(n.uri)),p(!1)}},u))))}));var f=r(4077),v=r.n(f);const b=s=>{const{className:i}=s,o=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s}(s,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return e.React.createElement(t.SVG,Object.assign({className:a,src:v()},o))};class x extends e.React.PureComponent{constructor(){super(...arguments),this.getListItemJSX=({item:t,appMode:s})=>{if(!t)return(0,e.jsx)("div",{className:"col-6",style:{visibility:"hidden"}});const i=this.Item;return(0,e.jsx)(p,{item:t,fullLine:!1,className:"widget-card-item mt-2",appMode:s},(()=>(0,e.jsx)(i,{item:t,hideLabel:!1})))},this.getRequireEnterpriseIconTooltip=e=>{if((null==e?void 0:e.length)>0){const s=e.join(", ");return this.props.intl.formatMessage({id:"requireEnterpriseAndUserTypeExtensions",defaultMessage:t.defaultMessages.requireEnterpriseAndUserTypeExtensions},{userTypeExtensions:s})}return this.props.intl.formatMessage({id:"requireEnterprise",defaultMessage:t.defaultMessages.requireEnterprise})},this.getCustomWidgetItemDetailUrl=t=>{var s;const i=null===(s=(0,e.getAppStore)().getState())||void 0===s?void 0:s.portalUrl;return t&&i?`${i.replace(/\/sharing\/rest/,"").replace(/\/$/,"")}/home/item.html?id=${t}`:null},this.Item=({item:s,hideLabel:i})=>{var o,a,r,l,p,d;return(0,e.jsx)("div",{className:(0,e.classNames)("d-flex justify-content-center w-100 h-100 widget-card-item-content",{"align-items-start":!i,"align-items-center":i,"pt-0":i}),key:s.name,"aria-label":s.label,tabIndex:0,role:"button"},(0,e.jsx)("div",{className:(0,e.classNames)("d-flex flex-column",{"h-100":!i})},(null===(a=null===(o=s.manifest)||void 0===o?void 0:o.properties)||void 0===a?void 0:a.hasGuide)&&(0,e.jsx)(h,{widgetItem:s}),(null===(r=s.manifest)||void 0===r?void 0:r.requireEnterprise)&&(0,e.jsx)(t.Button,{title:this.getRequireEnterpriseIconTooltip(null===(l=s.manifest)||void 0===l?void 0:l.requiredUserTypeExtensions),type:"tertiary",className:"widget-enterprise-btn",icon:!0,size:"sm"},(0,e.jsx)(b,null)),s.itemId&&(0,e.jsx)(t.Button,{type:"tertiary",className:"widget-help-btn",icon:!0,size:"sm",title:this.props.intl.formatMessage({id:"details",defaultMessage:t.defaultMessages.details}),href:this.getCustomWidgetItemDetailUrl(s.itemId),target:"_blank"},(0,e.jsx)(n,null)),(0,e.jsx)("div",{className:"d-flex justify-content-center"},(0,e.jsx)("div",{className:"widget-card-image"},s.icon&&(0,e.jsx)(t.Icon,{className:"w-100",icon:s.icon,size:20,autoFlip:null===(d=null===(p=s.manifest)||void 0===p?void 0:p.properties)||void 0===d?void 0:d.flipIcon}))),!i&&(0,e.jsx)("div",{className:(0,e.classNames)("widget-card-name flex-grow-1 d-flex align-items-center mt-0")},(0,e.jsx)("span",{className:"text-center text-truncate widget-card-name-content"},s.label))))}}render(){return this.getListItemJSX(this.props)}}function y(e,t){return!!e&&(!t||e.toLocaleLowerCase().includes(t.toLocaleLowerCase()))}function w(e){var t,s,i;const o=Object.keys((null===(t=null==e?void 0:e.appRuntimeInfo)||void 0===t?void 0:t.sectionNavInfos)||{}).map((t=>{var s;return null===(s=e.appRuntimeInfo.sectionNavInfos[t])||void 0===s?void 0:s.currentViewId}));return"insert"===(o[0]||"insert")&&(null===(i=null===(s=null==e?void 0:e.widgetsState)||void 0===s?void 0:s["left-sidebar"])||void 0===i?void 0:i.collapse)}var j=r(6009),I=r.n(j);const M=s=>{const{className:i}=s,o=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s}(s,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return e.React.createElement(t.SVG,Object.assign({className:a,src:I()},o))};var S=r(9788),P=r.n(S);const N=s=>{const{className:i}=s,o=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s}(s,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return e.React.createElement(t.SVG,Object.assign({className:a,src:P()},o))};var L=r(1397),O=r.n(L);const C=s=>{const{className:i}=s,o=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s}(s,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return e.React.createElement(t.SVG,Object.assign({className:a,src:O()},o))},T=s.utils.CUSTOM_GROUP;class R extends e.React.PureComponent{constructor(){super(...arguments),this.sectionItem={itemType:e.LayoutItemType.Section,label:this.props.intl.formatMessage({id:"section",defaultMessage:e.defaultMessages.section}),uri:"",manifest:{properties:{},defaultSize:{width:500,height:500}},icon:"./widgets/element-selector/dist/runtime/assets/section.svg",name:"section",group:9,order:900},this.placeholderItem={itemType:e.LayoutItemType.Widget,label:this.props.intl.formatMessage({id:"placeholder",defaultMessage:t.defaultMessages.placeholder}),uri:null,manifest:{defaultSize:{width:300,height:300}},icon:"./widgets/element-selector/dist/runtime/assets/placeholder.svg",name:"placeholder",group:8,order:899},this.groupLabelMap={1:this.props.intl.formatMessage({id:"mapCentric",defaultMessage:t.defaultMessages.mapCentric}),2:this.props.intl.formatMessage({id:"dataCentric",defaultMessage:t.defaultMessages.dataCentric}),3:this.props.intl.formatMessage({id:"pageElements",defaultMessage:t.defaultMessages.pageElements}),4:this.props.intl.formatMessage({id:"menuAndTollbars",defaultMessage:t.defaultMessages.menuAndTollbars}),8:this.props.intl.formatMessage({id:"layout",defaultMessage:e.defaultMessages.layout}),9:this.props.intl.formatMessage({id:"section",defaultMessage:e.defaultMessages.section}),[T]:this.props.intl.formatMessage({id:"custom",defaultMessage:t.defaultMessages.custom})}}isLoading(e){return!e}getGroupLabel(e){return this.groupLabelMap[e]}getCommonGroups(e){const t={};return(e||[]).forEach((e=>{e.group!==T&&(t[e.group]||(t[e.group]={label:this.getGroupLabel(e.group),groupId:e.group,itemList:[]}),t[e.group].itemList.push(e))})),t}getCustomGroup(e,t){return{label:this.getGroupLabel(T),groupId:T,itemList:(t||[]).concat((null==e?void 0:e.filter((e=>e.group===T)))||[])}}render(){const i=this.props.commonWidgetList||[];return(0,e.jsx)("div",{className:"flex-column bg-light-300 d-flex w-100 h-100"},(0,e.jsx)("div",{className:"jimu-builder-panel--content choose-widget-popup-content text-black"},this.isLoading(this.props.commonWidgetList)?(0,e.jsx)("div",{className:"loading-container w-100 h-100"},(0,e.jsx)(t.Loading,{type:t.LoadingType.Secondary})):(0,e.jsx)("div",null,Object.values(this.getCommonGroups(i.concat([this.placeholderItem,this.sectionItem]))).sort(((e,t)=>e.groupId-t.groupId)).map(((t,s)=>(0,e.jsx)(V,{key:s,group:t,appMode:this.props.appMode,searchValue:this.props.searchValue,intl:this.props.intl}))),s.utils.showCustomWidgets(i)&&(0,e.jsx)(V,{group:this.getCustomGroup(i,this.props.remoteCustomWidgetList),appMode:this.props.appMode,searchValue:this.props.searchValue,isLoading:this.isLoading(this.props.remoteCustomWidgetList),intl:this.props.intl}))))}}class E extends e.React.PureComponent{constructor(e){super(e),this.getCustomWidgetUrl=()=>{var e,t;(null===(e=this.props.group)||void 0===e?void 0:e.groupId)===T&&(null===(t=s.helpUtils.getBuildAppsHelpLink("add-custom-widgets"))||void 0===t||t.then((e=>{e&&this.setState({customWidgetHref:e})})))},this.toggle=()=>{this.setState({isOpen:!this.state.isOpen})},this.state={isOpen:!0,customWidgetHref:"#"}}componentDidMount(){this.getCustomWidgetUrl()}componentDidUpdate(e){e.portalSelf!==this.props.portalSelf&&this.getCustomWidgetUrl()}render(){if(!this.props.group)return null;const s=this.props.group.itemList.filter((e=>y(e.label,this.props.searchValue))),i=this.props.searchValue?s.length>0:this.state.isOpen;return(0,e.jsx)("div",{className:"container-fluid mb-4 mt-2 px-3",role:"group","aria-label":this.props.group.label},(0,e.jsx)("div",{className:"w-100 d-flex justify-content-between"},(0,e.jsx)("h4",{className:"new-elements-title w-75 text-break",title:this.props.group.label},this.props.group.label),(0,e.jsx)("div",{className:"d-flex justify-content-end"},this.props.group.groupId===T&&(0,e.jsx)(t.Button,{icon:!0,size:"sm",type:"tertiary",title:this.props.intl.formatMessage({id:"help",defaultMessage:t.defaultMessages.help}),href:this.state.customWidgetHref,target:"_blank"},(0,e.jsx)(C,null)),(0,e.jsx)(t.Button,{icon:!0,size:"sm",type:"tertiary",onClick:this.toggle},i?(0,e.jsx)(M,null):(0,e.jsx)(N,null)))),(0,e.jsx)(t.Collapse,{className:"row no-gutters",isOpen:i},this.props.isLoading?(0,e.jsx)("div",{className:"loading-container w-100 h-100"},(0,e.jsx)(t.Loading,{type:t.LoadingType.Secondary})):s.sort(((e,t)=>e.order-t.order)).map(((t,s)=>t?(0,e.jsx)(x,{item:t,hideLabel:!1,intl:this.props.intl,appMode:this.props.appMode,key:s}):(0,e.jsx)("div",{className:"col-6",style:{visibility:"hidden"},key:s})))))}}const V=e.ReactRedux.connect((e=>({portalSelf:e.portalSelf})))(E),k=(0,i.withTheme)(R);var B=r(4758);class z extends e.React.PureComponent{constructor(){super(...arguments),this.getListItemJSX=t=>{if(!t)return(0,e.jsx)("div",{className:"col-6",style:{visibility:"hidden"}});const s=this.Item;return(0,e.jsx)("div",{key:t.name||t.id},(0,e.jsx)(p,{item:t,fullLine:!0,appMode:this.props.appMode,className:"dragable-element p-0 mb-12"},(()=>(0,e.jsx)(s,{item:t}))))},this.Item=({item:s})=>{var i,o;const a="string"==typeof s.icon?s.icon:s.icon&&s.icon.svg,n="string"==typeof s.icon?null:s.icon&&s.icon.properties&&s.icon.properties.color;return(0,e.jsx)("div",{title:s.label,className:"d-flex align-items-center pendding-elements-item px-2","aria-label":s.label,tabIndex:0,role:"button"},(0,e.jsx)("div",{className:"pendding-elements-item-icon-container d-flex justify-content-center align-items-center"},(0,e.jsx)(t.Icon,{className:"pendding-elements-item-icon",icon:a,color:n,autoFlip:null===(o=null===(i=s.manifest)||void 0===i?void 0:i.properties)||void 0===o?void 0:o.flipIcon})),(0,e.jsx)("div",{className:"text-truncate pendding-elements-item-label"},s.label))}}render(){return(0,e.jsx)("div",{className:"w-100"},this.getListItemJSX(this.props.item))}}const W=(0,i.withTheme)(z);class A extends e.React.PureComponent{constructor(){super(...arguments),this.convertLayoutItemToElementItem=(t,s)=>{var i,o,a;const n=this.props.layouts[t.layoutId].content[t.layoutItemId],r=null===(i=(0,e.getAppStore)().getState().appStateInBuilder)||void 0===i?void 0:i.appConfig,l=B.searchUtils.getWidgetIdThatUseTheLayoutId(r,t.layoutId);if(n.type===e.LayoutItemType.Widget){const i=n.widgetId,o=this.props.widgets[i];let a;a=l&&this.props.widgets[l].manifest.widgetType!==e.WidgetType.Layout?Object.keys(this.props.widgets[l].layouts).length>1&&this.props.layouts[t.layoutId].label?this.props.widgets[l].label+"-"+this.props.layouts[t.layoutId].label+"-"+o.label:this.props.widgets[l].label+"-"+o.label:o.label;const r=o&&o.icon?"string"==typeof o.icon?o.icon:o.icon.asMutable({deep:!0}):"./widgets/element-selector/dist/runtime/assets/section.svg";return{id:n.widgetId,itemType:e.LayoutItemType.Widget,layoutInfo:t,isFromCurrentSizeMode:s,label:a,uri:o&&o.uri,icon:r,isPending:!0,manifest:o&&o.manifest&&o.manifest.asMutable({deep:!0})}}if(n.type===e.LayoutItemType.Section){const i=n.sectionId,a=null===(o=this.props.sections)||void 0===o?void 0:o[i],r=a&&a.icon?"string"==typeof a.icon?a.icon:a.icon.asMutable({deep:!0}):"./widgets/element-selector/dist/runtime/assets/section.svg";return{id:i,itemType:e.LayoutItemType.Section,layoutInfo:t,isFromCurrentSizeMode:s,label:a&&a.label,uri:"",icon:r,isPending:!0,manifest:{properties:{}}}}if(n.type===e.LayoutItemType.ScreenGroup){const i=n.screenGroupId,o=null===(a=this.props.screenGroups)||void 0===a?void 0:a[i],r=o&&o.icon?"string"==typeof o.icon?o.icon:o.icon.asMutable({deep:!0}):"./widgets/element-selector/dist/runtime/assets/screen-group.svg";return{id:i,itemType:e.LayoutItemType.ScreenGroup,layoutInfo:t,isFromCurrentSizeMode:s,label:o&&o.label,uri:"",icon:r,isPending:!0,manifest:{properties:{}}}}return null}}render(){var t,s,i,o,a,n,r,l,p,d,c,u,m,g;if(!this.props.currentPageId||!(null===(t=this.props.pages)||void 0===t?void 0:t[this.props.currentPageId])||(null===(i=null===(s=this.props.pages)||void 0===s?void 0:s[this.props.currentPageId])||void 0===i?void 0:i.type)!==e.PageType.Normal)return null;if(this.props.activeOptsSectionViewId&&"insert"!==this.props.activeOptsSectionViewId)return null;const h=null===(o=(0,e.getAppStore)().getState().appStateInBuilder)||void 0===o?void 0:o.appConfig;if(!h)return null;let f;f=this.props.activePagePart===e.PagePart.Header?null===(n=null===(a=h.header)||void 0===a?void 0:a.layout)||void 0===n?void 0:n[this.props.browserSizeMode]:this.props.activePagePart===e.PagePart.Footer?null===(l=null===(r=h.footer)||void 0===r?void 0:r.layout)||void 0===l?void 0:l[this.props.browserSizeMode]:this.props.activePagePart===e.PagePart.Body?null===(c=null===(d=null===(p=h.pages)||void 0===p?void 0:p[this.props.currentPageId])||void 0===d?void 0:d.layout)||void 0===c?void 0:c[this.props.browserSizeMode]:null===(g=null===(m=null===(u=h.dialogs)||void 0===u?void 0:u[this.props.currentDialogId])||void 0===m?void 0:m.layout)||void 0===g?void 0:g[this.props.browserSizeMode];const v=f?B.searchUtils.getPendingLayoutItemsFromOtherSizeModeInPage(h,this.props.currentPageId,this.props.browserSizeMode,this.props.activePagePart):[],b=f?B.searchUtils.getPendingLayoutItemsFromOtherSizeModeInDialog(h,this.props.currentDialogId,this.props.browserSizeMode):[],x=v.map((e=>this.convertLayoutItemToElementItem(e,!1))).concat(b.map((e=>this.convertLayoutItemToElementItem(e,!1)))),w=f?B.searchUtils.getPendingLayoutItemsInPage(h,this.props.currentPageId,this.props.browserSizeMode,this.props.activePagePart):[],j=f?B.searchUtils.getPendingLayoutItemsInDialog(h,this.props.currentDialogId,this.props.browserSizeMode):[],I=w.map((e=>this.convertLayoutItemToElementItem(e,!0))).concat(j.map((e=>this.convertLayoutItemToElementItem(e,!0)))),M=x.concat(I).filter((e=>y(e.label,this.props.searchValue)));return(0,e.jsx)("div",{className:"flex-column bg-light-300 d-flex px-3 pb-3"},0===M.length&&(0,e.jsx)("div",{className:"pt-1 text-white-50 text-left text-break"},this.props.intl.formatMessage({id:"pendingElementsInfo",defaultMessage:"This area lists widgets that have been configured but not on the current canvas. They may exist in other device modes."})),M.map((t=>(0,e.jsx)(W,{key:t.id,item:t,appMode:this.props.appMode}))))}}const $=e.ReactRedux.connect((function(e){var t,s,i,o,a,n,r,l,p,d,c,u,m,g,h,f,v,b;return w(e)?{currentPageId:null===(t=e.appStateInBuilder)||void 0===t?void 0:t.appRuntimeInfo.currentPageId,currentDialogId:null===(s=e.appStateInBuilder)||void 0===s?void 0:s.appRuntimeInfo.currentDialogId,appMode:null===(i=e.appStateInBuilder)||void 0===i?void 0:i.appRuntimeInfo.appMode,browserSizeMode:null===(o=e.appStateInBuilder)||void 0===o?void 0:o.browserSizeMode,activePagePart:null===(a=e.appStateInBuilder)||void 0===a?void 0:a.appRuntimeInfo.activePagePart,layouts:null===(r=null===(n=e.appStateInBuilder)||void 0===n?void 0:n.appConfig)||void 0===r?void 0:r.layouts,widgets:null===(p=null===(l=e.appStateInBuilder)||void 0===l?void 0:l.appConfig)||void 0===p?void 0:p.widgets,pages:null===(c=null===(d=e.appStateInBuilder)||void 0===d?void 0:d.appConfig)||void 0===c?void 0:c.pages,sections:null===(m=null===(u=e.appStateInBuilder)||void 0===u?void 0:u.appConfig)||void 0===m?void 0:m.sections,screenGroups:null===(h=null===(g=e.appStateInBuilder)||void 0===g?void 0:g.appConfig)||void 0===h?void 0:h.screenGroups,activeOptsSectionViewId:null===(b=null===(v=null===(f=e.appRuntimeInfo)||void 0===f?void 0:f.sectionNavInfos)||void 0===v?void 0:v["opts-section"])||void 0===b?void 0:b.currentViewId}:{}}))((0,i.withTheme)(A));var D=r(224),U=r.n(D);const G=s=>{const{className:i}=s,o=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s}(s,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return e.React.createElement(t.SVG,Object.assign({className:a,src:U()},o))};class _ extends e.React.PureComponent{constructor(t){super(t),this.onSearchIconClick=e=>{this.setState({isSearchInputShown:!this.state.isSearchInputShown})},this.onSearchValueChange=e=>{this.setState({searchValue:e.target.value})},this.MemoNewElements=e.React.memo((t=>(0,e.jsx)(k,{commonWidgetList:t.commonWidgetList,remoteCustomWidgetList:t.remoteCustomWidgetList,appMode:t.appMode,intl:t.intl,searchValue:t.searchValue}))),this.MemoPendingElements=e.React.memo((t=>(0,e.jsx)($,{intl:t.intl,searchValue:t.searchValue}))),this.state={commonWidgetList:null,remoteCustomWidgetList:null,isSearchInputShown:!1,searchValue:""}}componentDidMount(){s.utils.fetchCommonWidgetList().then((e=>this.setState({commonWidgetList:e}))),s.utils.fetchRemoteCustomWidgetList().then((e=>this.setState({remoteCustomWidgetList:e})))}componentDidUpdate(e,t){t.isSearchInputShown!==this.state.isSearchInputShown&&this.state.isSearchInputShown&&this.searchInput&&(this.searchInput.focus(),this.searchInput.select())}render(){const s=this.MemoNewElements,i=this.MemoPendingElements,o=this.props.intl.formatMessage({id:"search",defaultMessage:e.defaultMessages.search});return(0,e.jsx)("div",{css:(a=this.props.theme,e.css`
  .widget-builder-header-insert-elements {
    .text-dark-600{
      color: ${a.colors.palette.dark[600]};
    }
    .mb-10{
      margin-bottom: ${e.polished.rem(10)};
    }
    .mb-18{
      margin-bottom: ${e.polished.rem(18)};
    }
    .mb-12{
      margin-bottom: ${e.polished.rem(12)};
    }
    .title{
      padding: 18px 16px 8px 16px !important;
      font-size: 1rem !important;
      font-weight: 500;
      .search-icon{
        cursor: pointer;
        width: 30px;
      }
    }
    .search-input{
      height: 26px;
      border-radius: 2px;
    }
    .loading-container{
      position: relative;
    }
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    text-align: left;
    /* border-right: 1px solid ${a.colors.palette.light[800]}; */
    .collapse-btn{
      cursor: pointer;
      .jimu-icon{
        vertical-align: top;
      }
    }
    .jimu-nav{
      flex-shrink: 0;
      flex-grow: 0;
    }
    .new-elements-title{
      font-size: 14px;
      font-weight: 600;
      color: ${a.colors.palette.dark[600]};
      margin-bottom: ${e.polished.rem(8)};
    }
    .jimu-nav{
      height: ${e.polished.rem(43)} !important;
    }
    .jimu-tab{
      height: calc(100% - 50px);
    }
    .with-search-input.jimu-tab{
      height: calc(100% - 90px);
    }
    .tab-content{
      overflow: auto;
      padding-top: ${e.polished.rem(18)};
    }

    .dragable-element:hover{
      .pendding-elements-item{
        background-color: ${a.colors.palette.light[600]};
      }
    }

    .pendding-elements-item{
      height: ${e.polished.rem(32)};
      background: ${a.colors.secondary};

      .pendding-elements-item-icon-container{
        margin-right: ${e.polished.rem(8)};
        .pendding-elements-item-icon{
          width: ${e.polished.rem(16)};
          height: ${e.polished.rem(16)};
          color: ${a.colors.palette.dark[800]};
        }
      }
      .pendding-elements-item-label{
        max-width: ${e.polished.rem(180)};
        color: ${a.colors.palette.dark[800]};
        line-height: ${e.polished.rem(32)};
        font-size: ${e.polished.rem(13)};
      }
    }

    .btn{
      .jimu-icon{
        margin: 0;
      }
    }
    .jimu-builder-panel--header {
      padding: ${a.sizes[2]} ${a.sizes[3]};
      display: flex;
      flex-direction: row;
      align-items: center;
      h3 {
        margin: 0;
        line-height: 1.5;
        flex-grow: 1;
      }
    }
    .jimu-builder-panel--content {
      height: 100%;
      overflow: auto;
      .widget-card-item{
        height: 80px;
        font-size: 13px;

        user-select: none;
        cursor: pointer;
        .widget-card-item-content{
          position: relative;
          padding-top: 16px;
          background-color: ${a.colors.palette.light[500]};
        }
        &:hover .widget-card-item-content{
          background-color: ${a.colors.palette.light[600]};
        }
        .widget-card-image{
          width: 20px;
          height: 20px;
          &:after{
            display: none;
          }
        }

        .widget-card-name{
          max-width: 100px;
          margin: 0 auto;
          .widget-card-name-content{
            line-height: 1rem;
            max-height:2rem;
            white-space: normal;
          }
        }

        .widget-help-btn {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 1;
        }

        .widget-enterprise-btn {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
      }

      .row {
        .col-6:nth-of-type(2n) {
          padding-left: ${a.sizes[1]};
        }
        .col-6:nth-of-type(2n+1) {
          padding-right: ${a.sizes[1]};
        }

        .col {
          flex-basis: 100%;
        }
      }
    }
    &.widget-popup-hide-animation{
      transition: transform 0.3s ease-out;
      &.from-left {
        transform: translateX(-100%);
      }
      &.from-right {
        transform: translateX(100%);
      }
    }
    &.widget-popup-show-animation{
      transition: transform 0.3s ease-in;
      &.from-left {
        transform: translateX(0%);
      }
      &.from-right {
        transform: translateX(0%);
      }
    }
    &.from-left {
      left: 0;
    }
    &.from-right {
      right: 0;
    }
  }`)},(0,e.jsx)("div",{className:"jimu-builder-panel widget-builder-header-insert-elements from-left flex-column bg-light-300"},(0,e.jsx)("div",{className:"jimu-builder-panel--header d-flex flex-row justify-content-between text-dark-600 title"},(0,e.jsx)("div",{className:"flex-grow-1 m-0 text-truncate text-left",title:this.props.intl.formatMessage({id:"element",defaultMessage:d})},this.props.intl.formatMessage({id:"element",defaultMessage:d})),(0,e.jsx)("div",{className:"search-icon d-flex align-items-start justify-content-end",onClick:this.onSearchIconClick},(0,e.jsx)(t.Button,{size:"sm",icon:!0,type:"tertiary",title:o,"aria-label":o,"aria-pressed":this.state.isSearchInputShown},(0,e.jsx)(G,{size:"m"})))),(0,e.jsx)("div",{className:"w-100 px-3"},this.state.isSearchInputShown&&(0,e.jsx)(t.TextInput,{value:this.state.searchValue,onChange:this.onSearchValueChange,className:"search-input my-2",placeholder:this.props.intl.formatMessage({id:"search",defaultMessage:e.defaultMessages.search}),ref:e=>{this.searchInput=e},allowClear:!0})),(0,e.jsx)(t.Tabs,{type:"underline",fill:!0,className:(0,e.classNames)({"with-search-input":this.state.isSearchInputShown}),defaultValue:"new"},(0,e.jsx)(t.Tab,{id:"new",className:"w-50",title:this.props.intl.formatMessage({id:"new",defaultMessage:"New"})},(0,e.jsx)(s,{commonWidgetList:this.state.commonWidgetList,remoteCustomWidgetList:this.state.remoteCustomWidgetList,appMode:this.props.appMode,intl:this.props.intl,searchValue:this.state.searchValue})),(0,e.jsx)(t.Tab,{id:"pending",className:"w-50",title:this.props.intl.formatMessage({id:"pending",defaultMessage:"Pending"})},(0,e.jsx)(i,{intl:this.props.intl,searchValue:this.state.searchValue})))));var a}}_.mapExtraStateProps=e=>{var t,s,i;return w(e)?{appMode:null===(t=e.appStateInBuilder)||void 0===t?void 0:t.appRuntimeInfo.appMode,appPath:e.appPath,browserSizeMode:null===(s=e.appStateInBuilder)||void 0===s?void 0:s.browserSizeMode,activePagePart:null===(i=e.appStateInBuilder)||void 0===i?void 0:i.appRuntimeInfo.activePagePart}:{}}})(),l})())}}}));