System.register(["jimu-core","jimu-for-builder","jimu-layouts/layout-builder","jimu-layouts/layout-runtime","jimu-ui","jimu-ui/advanced/data-source-selector","jimu-ui/advanced/setting-components"],(function(e,t){var o={},i={},s={},n={},a={},r={},l={};return{setters:[function(e){o.APP_FRAME_NAME_IN_BUILDER=e.APP_FRAME_NAME_IN_BUILDER,o.AppMode=e.AppMode,o.BrowserSizeMode=e.BrowserSizeMode,o.Immutable=e.Immutable,o.LayoutItemType=e.LayoutItemType,o.PageMode=e.PageMode,o.PagePart=e.PagePart,o.React=e.React,o.ReactDOM=e.ReactDOM,o.ReactRedux=e.ReactRedux,o.WidgetType=e.WidgetType,o.appConfigUtils=e.appConfigUtils,o.classNames=e.classNames,o.css=e.css,o.getAppStore=e.getAppStore,o.jsx=e.jsx,o.lodash=e.lodash,o.queryString=e.queryString,o.urlUtils=e.urlUtils,o.utils=e.utils},function(e){i.AppResourceManager=e.AppResourceManager,i.AppWidgetManager=e.AppWidgetManager,i.WidgetSettingManager=e.WidgetSettingManager,i.appConfigUtils=e.appConfigUtils,i.appStateActions=e.appStateActions,i.builderActions=e.builderActions,i.builderAppSync=e.builderAppSync,i.getAppConfigAction=e.getAppConfigAction},function(e){s.getRootLayoutId=e.getRootLayoutId},function(e){n.LayoutItemSizeModes=e.LayoutItemSizeModes,n.searchUtils=e.searchUtils,n.utils=e.utils},function(e){a.Button=e.Button,a.Checkbox=e.Checkbox,a.Label=e.Label,a.Loading=e.Loading,a.LoadingType=e.LoadingType,a.Modal=e.Modal,a.ModalBody=e.ModalBody,a.ModalFooter=e.ModalFooter,a.SVG=e.SVG,a.styleUtils=e.styleUtils},function(e){r.DataSourceRemoveWaringReason=e.DataSourceRemoveWaringReason,r.DataSourceRemoveWarningPopup=e.DataSourceRemoveWarningPopup,r.dataComponentsUtils=e.dataComponentsUtils},function(e){l.WidgetSelector=e.WidgetSelector}],execute:function(){e((()=>{var e={9964:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 2.125 14.334 14H1.667L8 2.125Zm-.882-.47a1 1 0 0 1 1.765 0l6.333 11.874A1 1 0 0 1 14.334 15H1.667a1 1 0 0 1-.882-1.47L7.118 1.653ZM8 4.874a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0L8.9 5.87a.905.905 0 0 0-.9-.995Zm1 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" fill="#000"></path></svg>'},8891:e=>{"use strict";e.exports=o},3137:e=>{"use strict";e.exports=i},7282:e=>{"use strict";e.exports=s},4758:e=>{"use strict";e.exports=n},726:e=>{"use strict";e.exports=a},338:e=>{"use strict";e.exports=r},7756:e=>{"use strict";e.exports=l}},t={};function d(o){var i=t[o];if(void 0!==i)return i.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,d),s.exports}d.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return d.d(t,{a:t}),t},d.d=(e,t)=>{for(var o in t)d.o(t,o)&&!d.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},d.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),d.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.p="";var u={};return d.p=window.jimuConfig.baseUrl,(()=>{"use strict";d.r(u),d.d(u,{default:()=>b});var e=d(8891),t=d(3137),o=d(726),i=d(7756);const s=e.css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;function n(t,o,i){return e.css`
    ${t?s:""};
    overflow: auto;

    .content-section {
      height: 100%;
      width: 100%;
      overflow: auto;
    }

    .content {
      padding: 1.5rem;
      margin: 0 auto;
    }

    .top-section {
      margin-top: 5px;
    }

    .page-name {
      color: ${i.colors.palette.dark[200]};
    }

    .body-section {
      width: 100%;
      display: flex;
      margin-top: 5px;
      overflow: visible;
      position: relative;
      align-items: center;
      // box-shadow: 0 2px 5px 1px rgba(0,0,0,0.15);

      .device-frame {
        position: relative;
        overflow: hidden;
        height: ${o>0?`${o}px`:"auto"};
        flex-grow: 0;
        flex-shrink: 0;

        &.center-origin {
          transform-origin: top center;
          align-self: center;
        }
        &.left-origin {
          transform-origin: top left;
          align-self: flex-start;
        }

        iframe {
          width: 100%;
          // height: 100%;
          border: none;
          position: relative;
          overflow: visible;
        }
      }
    }
  `}var a=d(4758),r=d(7282),l=function(e,t,o,i){return new(o||(o=Promise))((function(s,n){function a(e){try{l(i.next(e))}catch(e){n(e)}}function r(e){try{l(i.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(a,r)}l((i=i.apply(e,t||[])).next())}))};function p(o,i,s){var n,r,d,u,p,g;return l(this,void 0,void 0,(function*(){const{layoutId:h,layoutItemId:m}=s,f=null===(r=null===(n=o.layouts[h])||void 0===n?void 0:n.content[m])||void 0===r?void 0:r.widgetId,v=o.widgets[f],y=Object.keys(null!==(d=null==v?void 0:v.layouts)&&void 0!==d?d:{})[0],S=null===(p=null===(u=null==v?void 0:v.layouts)||void 0===u?void 0:u[y])||void 0===p?void 0:p[i];if(!S)return yield Promise.resolve(o);const C=o.layouts[S],I=Object.keys(null!==(g=C.content)&&void 0!==g?g:{}).sort(((e,t)=>parseInt(C.content[e].bbox.left,10)-parseInt(C.content[t].bbox.left,10)));let{embedLayoutId:w,updatedAppConfig:M}=yield function(o,i,s){return l(this,void 0,void 0,(function*(){const n=(0,t.getAppConfigAction)(o),r=t.appConfigUtils.getUniqueId(o,"widget"),l={uri:"widgets/layout/column/",id:r},d=yield t.AppWidgetManager.getInstance().handleNewWidgetJson(l);n.createWidget((0,e.Immutable)(d));const u=(0,e.Immutable)({bbox:{left:0,width:12},id:`${a.utils.getMaximumId(o.layouts[s])+1}`,type:e.LayoutItemType.Widget,widgetId:l.id,setting:{autoProps:{height:a.LayoutItemSizeModes.Auto},autoHeight:!0}}),p=n.appConfig.widgets[r],c=Object.keys(p.layouts)[0],g=p.layouts[c][i],h=o.layouts[s].order;return{widgetId:r,embedLayoutId:g,updatedAppConfig:n.appConfig.setIn(["layouts",s,"content",u.id],u).setIn(["layouts",s,"order"],[].concat(null!=h?h:[],u.id))}}))}(o,i,S);for(let e=0;e<I.length;e+=1){const o=M.layouts[S].content[I[e]],i=a.utils.calHeightOfLayoutItem(200,o),s=c(M,{layoutId:S,layoutItemId:I[e]},w),n=s.layoutInfo;M=s.appConfig;let r=(0,t.getAppConfigAction)(M);r.editLayoutItemBBox(n,{width:"auto",height:i.height}).editLayoutItemSetting(n,i.setting),M=r.appConfig}return M=M.setIn(["layouts",h,"content",m,"setting","autoHeight"],!0).setIn(["layouts",h,"content",m,"setting","autoProps","height"],a.LayoutItemSizeModes.Auto),Promise.resolve(M)}))}function c(e,t,o){var i;const{layoutId:s,layoutItemId:n}=t,r=e.layouts[s].content[n],l=e.layouts[o],d=`${a.utils.getMaximumId(l)+1}`,u=r.set("id",d).setIn(["setting","autoProps","width"],a.LayoutItemSizeModes.Auto);let p=e.setIn(["layouts",o,"content",d],u).setIn(["layouts",o,"order"],[].concat(null!==(i=l.order)&&void 0!==i?i:[],d)),c=e.layouts[s];const g=[].concat(c.order),h=g.indexOf(n);return g.splice(h,1),c=c.set("content",c.content.without(n)).set("order",g),p=p.setIn(["layouts",s],c),{appConfig:p,layoutInfo:{layoutId:o,layoutItemId:d}}}var g=d(9964),h=d.n(g);const m=t=>{const{className:i}=t,s=function(e,t){var o={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(o[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(i=Object.getOwnPropertySymbols(e);s<i.length;s++)t.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(e,i[s])&&(o[i[s]]=e[i[s]])}return o}(t,["className"]),n=(0,e.classNames)("jimu-icon jimu-icon-component",i);return e.React.createElement(o.SVG,Object.assign({className:n,src:h()},s))};class f extends e.React.PureComponent{constructor(t){super(t),this.handleCloseBtn=()=>{this.isOkClick=!1,this.setState({isOpen:!1});const{toggle:e,isOpen:t}=this.props;void 0!==t&&e&&e()},this.handleOkClick=()=>{this.isOkClick=!0,this.setState({isOpen:!1});const{toggle:e,isOpen:t}=this.props;void 0!==t&&e&&e()},this.handleToggle=()=>{this.setState({isOpen:!this.state.isOpen});const{toggle:e,isOpen:t}=this.props;void 0!==t&&e&&e()},this.onModalClosed=()=>{const{onClosed:e}=this.props;e&&e(this.isOkClick),this.isOkClick=!1},this.formatMessage=e=>this.props.formatMessage(e),this.getStyle=()=>e.css`
      .modal-body{
        overflow-y: auto;
        max-height: 360px;
        padding: 0;
      }
      .modal-content{
        width: auto;
        background: var(--light-300);
        padding: 30px;
        border: none;
      }
      .modal-footer{
        padding: 0;
        margin-top: 30px;
        .btn {
          min-width: 80px;
          + .btn {
            margin-left: 10px;
          }
        }
      }
      &.modal-dialog{
        width: auto;
      }
      .choose-template-description{
        width: 100%;
        font-size: ${14/17}rem;
        user-select:none;
      }

      .title-icon {
        padding: 0 6px;
      }
      .title-label {
        font-size: 1rem;
        color: var(--black);
      }

      .message {
        color: var(--dark-800);
        margin-left: 36px;
        margin-top: 1rem;
      }
    `,this.state={isOpen:!!t.isOpen}}render(){let{isOpen:t}=this.props;return t=void 0===t?this.state.isOpen:t,(0,e.jsx)(o.Modal,{css:this.getStyle(),modalClassName:"toc-add-page-modal",backdropClassName:"toc-add-page-modal",isOpen:t,onClosed:this.onModalClosed,toggle:this.handleToggle,centered:!0},(0,e.jsx)(o.ModalBody,null,(0,e.jsx)("div",{className:"d-flex align-items-center"},(0,e.jsx)("div",{className:"title-icon"},(0,e.jsx)(m,{size:24,color:"var(--warning-600)"})),(0,e.jsx)("div",{className:"title-label"},this.props.title)),(0,e.jsx)("div",{className:"message font-body2"},this.props.children)),(0,e.jsx)(o.ModalFooter,null,(0,e.jsx)(o.Button,{type:"primary",onClick:this.handleOkClick},this.formatMessage("certainly")),(0,e.jsx)(o.Button,{onClick:this.handleCloseBtn},this.formatMessage("cancel"))))}}class v extends e.React.PureComponent{constructor(o){super(o),this.formatMessage=(e,t)=>this.props.formatMessage(e,t),this.toggleLayoutMode=()=>{const{isAuto:e}=this.props;e?this.handleToggleCustomConfirm():this.handleToggleAutoConfirm()},this.handleToggleAutoConfirm=()=>{this.setState({showAutoConfirm:!this.state.showAutoConfirm})},this.autoConfirmClosed=e=>{e&&(this.props.isHeader?this.resetHeader():this.props.isFooter?this.resetFooter():this.props.isDialog?this.resetDialog():this.resetPageBody())},this.handleToggleCustomConfirm=()=>{this.setState({showCustomConfirm:!this.state.showCustomConfirm})},this.customConfirmClosed=e=>{e&&(this.props.isHeader?this.unLockHeaderLayout():this.props.isFooter?this.unLockFooterLayout():this.props.isDialog?this.unLockDialogLayout():this.unLockPageBodyLayout())},this.unLockFooterLayout=()=>{const{browserSizeMode:e,mainSizeMode:o}=this.props;(0,t.getAppConfigAction)().createLayoutForSizeModeForFooter(e,o).exec()},this.unLockHeaderLayout=()=>{const{browserSizeMode:e,mainSizeMode:o}=this.props;(0,t.getAppConfigAction)().createLayoutForSizeModeForHeader(e,o).exec()},this.unLockPageBodyLayout=()=>{return o=this,i=void 0,n=function*(){const{browserSizeMode:o,mainSizeMode:i,pageId:s}=this.props,n=(0,t.getAppConfigAction)(),a=n.appConfig.pages[s];n.createLayoutForSizeModeForPageBody(o,i,s);let r=n.appConfig;if(a.mode===e.PageMode.AutoScroll&&o===e.BrowserSizeMode.Small){const e=r.pages[s].layout[o];r=yield function(e,t,o){return l(this,void 0,void 0,(function*(){const i=[],s=o=>{var n;const a=e.layouts[o],r=null!==(n=a.order)&&void 0!==n?n:[];for(let n=0;n<r.length;n++){const l=a.content[r[n]];if(l.widgetId){const a=e.widgets[l.widgetId];if("widgets/layout/row/"===(null==a?void 0:a.uri)&&i.push({layoutId:o,layoutItemId:r[n]}),null==a?void 0:a.layouts)for(let e in a.layouts){const o=a.layouts[e][t];o&&s(o)}}}};s(o);let n=e;for(let e=0;e<i.length;e++)n=yield p(n,t,i[e]);return Promise.resolve(n)}))}(r,o,e)}(0,t.getAppConfigAction)(r).exec()},new((s=void 0)||(s=Promise))((function(e,t){function a(e){try{l(n.next(e))}catch(e){t(e)}}function r(e){try{l(n.throw(e))}catch(e){t(e)}}function l(t){var o;t.done?e(t.value):(o=t.value,o instanceof s?o:new s((function(e){e(o)}))).then(a,r)}l((n=n.apply(o,i||[])).next())}));var o,i,s,n},this.unLockDialogLayout=()=>{const{browserSizeMode:e,mainSizeMode:o,dialogId:i}=this.props,s=(0,t.getAppConfigAction)();s.createLayoutForSizeModeForDialog(e,o,i);const n=s.appConfig;(0,t.getAppConfigAction)(n).exec()},this.resetHeader=()=>{const{browserSizeMode:e}=this.props;(0,t.getAppConfigAction)().removeSizeModeLayoutFromHeader(e).exec()},this.resetFooter=()=>{const{browserSizeMode:e}=this.props;(0,t.getAppConfigAction)().removeSizeModeLayoutFromFooter(e).exec()},this.resetPageBody=()=>{const{browserSizeMode:e,pageId:o}=this.props;(0,t.getAppConfigAction)().removeSizeModeLayoutFromPageBody(o,e).exec()},this.resetDialog=()=>{const{browserSizeMode:e,dialogId:o}=this.props;(0,t.getAppConfigAction)().removeSizeModeLayoutFromDialog(o,e).exec()},this.state={showAutoConfirm:!1,showCustomConfirm:!1}}getStyle(){const{isAuto:t,isHeader:o,isFooter:i}=this.props;let s;return i?s=e.css`position: absolute;`:o||i||(s=e.css`
        position: sticky;
        transform: translateZ(1px);
      `),e.css`
      ${s};
      .state-toggle-btn{
        cursor: pointer;
        position: relative;
        padding: 0 1rem;
        overflow: hidden;
        background: var(--light-500);
        border-radius: 2px;
      }
      .toggle-part {
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
      }
      .toggle-highlight {
        position: absolute;
        height: 30px;
        left: 0;
        right: 0;
        background-color: var(--primary);
        transition: 0.2s;
        top: ${t?0:30}px;
      }
    `}getSizeModeNls(t){switch(t){case e.BrowserSizeMode.Small:return this.formatMessage("smallScreen");case e.BrowserSizeMode.Medium:return this.formatMessage("mediumScreen");default:return this.formatMessage("largeScreen")}}render(){const{isAuto:t,theme:o,mainSizeMode:i}=this.props,s=this.getSizeModeNls(i);return(0,e.jsx)("div",{style:this.props.style,css:this.getStyle()},(0,e.jsx)("div",{className:"d-flex flex-column state-toggle-btn",onClick:this.toggleLayoutMode,title:t?`${this.formatMessage("autoEnabledTip",{label:s})} ${this.formatMessage("customDisabledTip")}`:`${this.formatMessage("customEnabledTip")} ${this.formatMessage("autoDisabledTip")}`},(0,e.jsx)("div",{className:"toggle-part text-nowrap"},this.formatMessage("auto")),(0,e.jsx)("div",{className:"toggle-part text-nowrap"},this.formatMessage("custom")),(0,e.jsx)("div",{className:"toggle-highlight"})),(0,e.jsx)(f,{theme:o,toggle:this.handleToggleAutoConfirm,onClosed:this.autoConfirmClosed,title:this.formatMessage("enableConfirm"),isOpen:this.state.showAutoConfirm,formatMessage:this.props.formatMessage},(0,e.jsx)("div",null,(0,e.jsx)("div",null,this.formatMessage("autoConfirmMsg",{label:s,auto:this.formatMessage("auto").toLocaleLowerCase()})))),(0,e.jsx)(f,{theme:o,toggle:this.handleToggleCustomConfirm,onClosed:this.customConfirmClosed,title:this.formatMessage("enableConfirm"),isOpen:this.state.showCustomConfirm,formatMessage:this.props.formatMessage},(0,e.jsx)("div",null,(0,e.jsx)("div",null,this.formatMessage("customConfirmMsg1",{custom:this.formatMessage("custom").toLocaleLowerCase()})),(0,e.jsx)("div",{css:e.css`margin-top: 1rem;`},this.formatMessage("customConfirmMsg2")))))}}const y={certainly:"OK",autoEnabledTip:"Auto layout is enabled. Widgets are synced with those on the {label} and arranged automatically.",autoDisabledTip:"Click to enable auto layout.",customEnabledTip:"Custom layout is enabled. Widgets added in other device modes will not be automatically added here. Alternatively, you can manually add them from the pending list on the Insert panel.",customDisabledTip:"Click to enable custom layout.",confirm:"Confirm",enableConfirm:"Are you sure you want to enable it?",autoConfirmMsg:"By enabling {auto}, the widgets will be synced with those on the {label} and arranged automatically.",customConfirmMsg1:"By enabling {custom}, you can manually arrange widgets for this device mode.",customConfirmMsg2:"However, widgets added in other device modes will not be automatically added here. Alternatively, you can manually add them from the pending list on the Insert panel.",dragToResize:"Drag to resize",largeScreen:"Large screen device",mediumScreen:"Medium screen device",smallScreen:"Small screen device",deleteWarning:'Deleting a widget will remove it from all devices views. Use "Move to the pending list" button to remove it from current device view and preserve it in the others.',confirmDelete:"Are you sure you want to delete this widget from all devices?"};function S(){return`${e.utils.getLocalStorageAppKey()}-confirm-delete-widget`}function C(o,i,s,n){var r,l,d;if(!o)return!1;if("false"===e.utils.readLocalStorage(S()))return!1;if(!function(o){var i;if(!o)return!1;const s=(0,t.getAppConfigAction)().appConfig,{layoutId:n,layoutItemId:a}=o,r=s.layouts[n].content[a];return!!r&&(r.type===e.LayoutItemType.Section||r.type===e.LayoutItemType.ScreenGroup||!(r.type!==e.LayoutItemType.Widget||!r.widgetId)&&(null===(i=s.widgets[r.widgetId].manifest)||void 0===i?void 0:i.widgetType)!==e.WidgetType.Layout)}(o))return!1;const u=(0,t.getAppConfigAction)().appConfig;let p;return p=i===e.PagePart.Header?null===(r=u.header)||void 0===r?void 0:r.layout:i===e.PagePart.Footer?null===(l=u.footer)||void 0===l?void 0:l.layout:i===e.PagePart.Body?u.pages[s].layout:null===(d=u.dialogs[n])||void 0===d?void 0:d.layout,Object.keys(null!=p?p:{}).length>1&&function(o,i){var s,n;const{layoutId:r,layoutItemId:l}=o,d=(0,t.getAppConfigAction)().appConfig,u=d.layouts[r].content[l],p=u.type;let c;p===e.LayoutItemType.Widget?c=u.widgetId:p===e.LayoutItemType.Section?c=u.sectionId:p===e.LayoutItemType.ScreenGroup&&(c=u.screenGroupId);const g=null!==(n=null===(s=(0,e.getAppStore)().getState().appStateInBuilder)||void 0===s?void 0:s.browserSizeMode)&&void 0!==n?n:e.BrowserSizeMode.Large;return Object.keys(i).filter((e=>e!==g)).some((e=>a.searchUtils.getContentsInLayoutRecursive(d,i[e],p,e).includes(c)))}(o,p)}function I(t){const{activePagePart:i,currentPageId:s,currentDialogId:n,formatMessage:a,onConfirmDelete:r,onCancelDelete:l}=t,[d,u]=e.React.useState(!1),p=e.ReactRedux.useSelector((e=>{var t;return null===(t=e.builder)||void 0===t?void 0:t.contentToDelete}),e.ReactRedux.shallowEqual),c=e.React.useMemo((()=>C(p,i,s,n)),[p,i,s,n]),g=e.React.useCallback((()=>{r(p)}),[p]);e.React.useEffect((()=>{p&&!c&&g()}),[p,c]);const h=e.React.useCallback((()=>{u(!d)}),[d]),f=e.React.useCallback((()=>{u(!1),l()}),[]),v=e.React.useCallback((()=>{var t;t=!d,e.utils.setLocalStorage(S(),`${t}`),g(),u(!1)}),[p,d]);return c?(0,e.jsx)(o.Modal,{isOpen:!0,centered:!0,css:e.css`
    .modal-body{
      overflow-y: auto;
      max-height: 360px;
      padding: 0;
    }
    .modal-content{
      width: auto;
      background: var(--light-300);
      padding: 30px;
      border: none;
    }
    .modal-footer{
      padding: 0;
      margin-top: 30px;
      .btn {
        min-width: 80px;
        + .btn {
          margin-left: 10px;
        }
      }
    }
    &.modal-dialog{
      width: auto;
    }

    .title-icon {
      padding: 0 6px;
    }
    .title-label {
      font-size: 1rem;
      color: var(--black);
    }

    .message {
      margin-left: 36px;
      margin-top: 1rem;
    }
  `},(0,e.jsx)(o.ModalBody,null,(0,e.jsx)("div",{className:"d-flex align-items-start"},(0,e.jsx)("div",{className:"title-icon"},(0,e.jsx)(m,{size:24,color:"var(--danger)"})),(0,e.jsx)("div",{className:"title-label"},a("confirmDelete"))),(0,e.jsx)("div",{className:"message"},(0,e.jsx)("div",{"data-testid":"confirmDeleteMessage",className:"font-body2",css:e.css`
            color: var(--dark-800);
          `},a("deleteWarning")),(0,e.jsx)("div",{css:e.css`margin-top: 1.5rem;`},(0,e.jsx)(o.Label,{check:!0,className:"justify-content-start align-items-start",css:e.css`
              color: var(--black);
            `},(0,e.jsx)(o.Checkbox,{"data-testid":"dontShowAgain",style:{cursor:"pointer"},className:"mr-2",checked:d,onChange:h}),a("dialogPreventDisplayAgainDefaultText"))))),(0,e.jsx)(o.ModalFooter,null,(0,e.jsx)(o.Button,{"data-testid":"deleteBtn",type:"danger",onClick:v},a("delete")),(0,e.jsx)(o.Button,{"data-testid":"cancelBtn",onClick:f},a("cancel")))):null}var w=d(338);function M(o){var i,s,n;const a=e.ReactRedux.useSelector((e=>{var t;return null===(t=e.builder)||void 0===t?void 0:t.contentToDelete}),e.ReactRedux.shallowEqual),r=e.React.useMemo((()=>function(o){var i,s,n,a,r;let l=!1;const{layoutId:d,layoutItemId:u}=o,p=(0,t.getAppConfigAction)().appConfig,c=null===(n=null===(s=null===(i=p.layouts)||void 0===i?void 0:i[d])||void 0===s?void 0:s.content)||void 0===n?void 0:n[u];if((null==c?void 0:c.type)===e.LayoutItemType.Widget&&c.widgetId){const e=null===(a=p.widgets)||void 0===a?void 0:a[c.widgetId];(null===(r=null==e?void 0:e.outputDataSources)||void 0===r?void 0:r.length)>0&&(l=e.outputDataSources.some((e=>w.dataComponentsUtils.getWidgetsUsingDsOrItsDescendantDss(e,p.widgets).length>0)))}return l}(a)),[a]),l=e.React.useCallback((()=>{o.onConfirmDelete(a)}),[a]);e.React.useEffect((()=>{a&&!r&&l()}),[a,r]);const d=e.React.useCallback((()=>{o.onCancelDelete()}),[]);if(!r)return null;const u=(0,t.getAppConfigAction)().appConfig,p=null===(n=null===(s=null===(i=null==u?void 0:u.layouts)||void 0===i?void 0:i[null==a?void 0:a.layoutId])||void 0===s?void 0:s.content)||void 0===n?void 0:n[null==a?void 0:a.layoutItemId];return(0,e.jsx)(w.DataSourceRemoveWarningPopup,{isOpen:!0,toggle:d,widgetId:null==p?void 0:p.widgetId,reason:w.DataSourceRemoveWaringReason.SourceWidgetRemoved,afterRemove:l})}class b extends e.React.PureComponent{constructor(o){super(o),this.resizeIframe=()=>{const{viewportSize:t,pageMode:o,appMode:i,currentDialogId:s}=this.props;if(i!==e.AppMode.Design||s)return void(this.deviceRef.current.style.height=`${t.height}px`);if(o!==e.PageMode.AutoScroll)return;const n=this.appIframe.contentWindow.document.documentElement.querySelector("div#app > div.page-renderer");if(n){const e=n.getBoundingClientRect(),o=Math.round(Math.max(e.height,t.height));this.deviceRef.current.style.height=`${o}px`}},this.formatMessage=(e,t)=>this.props.intl.formatMessage({id:e,defaultMessage:y[e]},t),this.onChooseWidget=o=>{const i={id:e.appConfigUtils.getUniqueId(this.props.appConfig,"widget"),uri:o,context:e.appConfigUtils.getWidgetContext(o)};t.AppWidgetManager.getInstance().handleNewWidgetJson(i).then((e=>{this.props.dispatch(t.builderActions.closeChooseWidgetPopup())}))},this.clearSelectionInApp=()=>{t.builderAppSync.publishChangeSelectionToApp(null)},this.showConfirmDeleteDsDialog=()=>{this.setState({shouldShowDeleteDsDialog:!0})},this.hideConfirmDeleteDsDialog=()=>{this.setState({shouldShowDeleteDsDialog:!1})},this.removeLayoutItem=o=>{this.resetConfirmDeleteContent(),function(o){var i,s,n,l,d,u;if((null===(s=null===(i=(0,e.getAppStore)().getState().appStateInBuilder)||void 0===i?void 0:i.appRuntimeInfo)||void 0===s?void 0:s.appMode)!==e.AppMode.Design)return;const{layoutId:p,layoutItemId:c}=o,g=(0,t.getAppConfigAction)().appConfig,h=null===(l=null===(n=g.layouts[p])||void 0===n?void 0:n.content)||void 0===l?void 0:l[c];var m;h&&(null!==(u=null===(d=g.forBuilderAttributes)||void 0===d?void 0:d.lockLayout)&&void 0!==u&&u?h.type===e.LayoutItemType.Widget&&h.widgetId&&function(e,o){(0,t.getAppConfigAction)().updateLayoutItem(e,"widgetId",void 0).removeWidget(o).exec()}(o,h.widgetId):h.type===e.LayoutItemType.Widget?h.widgetId?function(e,o){const i=(0,t.getAppConfigAction)(),s=a.searchUtils.findParentLayoutItem(e,i.appConfig,(0,r.getRootLayoutId)(),a.utils.getCurrentSizeMode());i.removeWidget(o).exec(),t.builderAppSync.publishChangeSelectionToApp(s)}(o,h.widgetId):function(e){const o=(0,t.getAppConfigAction)(),i=a.searchUtils.findParentLayoutItem(e,o.appConfig,(0,r.getRootLayoutId)(),a.utils.getCurrentSizeMode());o.removeLayoutItem(e,!1).exec(),t.builderAppSync.publishChangeSelectionToApp(i)}(o):h.type===e.LayoutItemType.Section?function(e,o){const i=(0,t.getAppConfigAction)(),s=a.searchUtils.findParentLayoutItem(e,i.appConfig,(0,r.getRootLayoutId)(),a.utils.getCurrentSizeMode());i.removeSection(o).exec(),t.builderAppSync.publishChangeSelectionToApp(s)}(o,h.sectionId):h.type===e.LayoutItemType.ScreenGroup&&(m=h.screenGroupId,(0,t.getAppConfigAction)().removeScreenGroup(m).exec(),t.builderAppSync.publishChangeSelectionToApp(null)))}({layoutId:null==o?void 0:o.layoutId,layoutItemId:null==o?void 0:o.layoutItemId})},this.resetConfirmDeleteContent=()=>{this.hideConfirmDeleteDsDialog(),(0,e.getAppStore)().dispatch(t.builderActions.confirmDeleteContentChanged(null))},this.state={appUrl:null,isPortrait:!0,shouldShowDeleteDsDialog:!1},this.resizeRef=e.React.createRef(),this.deviceRef=e.React.createRef(),this.contentRef=e.React.createRef(),this.debounceResizeIframe=e.lodash.debounce(this.resizeIframe,200)}componentDidMount(){this.setAppUrl(),e.lodash.defer((()=>this.resizeIframe()))}componentDidUpdate(t){this.setAppUrl();const{viewportSize:o,zoomScale:i,appMode:s}=this.props;this.viewportWidth===o.width&&Math.round(10*this.zoomScale)===Math.round(10*i)||(this.viewportWidth=o.width,this.zoomScale=i,this.applyZoomScale(this.props.zoomScale)),s!==t.appMode&&s===e.AppMode.Run&&this.contentRef.current&&(this.contentRef.current.scrollTop=0),this.debounceResizeIframe()}setAppUrl(){const o=e.urlUtils.getAppIdPageIdFromUrl().pageId;if(o&&"default"!==o)return;let i=`${window.jimuConfig.mountPath}experience/`;const s=this.props.queryObject;let n,a={draft:"true"};if(s.id?(n=s.id,n.startsWith("/")&&(n=n.substring(1)),n.endsWith("/")&&(n=n.substring(0,n.length-1)),window.jimuConfig.useStructuralUrl?i+=this.props.queryObject.id+"/":a.id=this.props.queryObject.id):s.app_config&&(n=s.app_config,a.config=s.app_config),a=Object.assign(a,s.without("id","config","views","theme")),i+="?"+e.queryString.stringify(a),this.state.appUrl!==i){if(this.props.currentAppId!==n){const e=t.AppResourceManager.getInstance();e.clearResources(this.props.currentAppId),e.clearResources(n),t.WidgetSettingManager.getInstance().destoryAllWidgetSettingClasses()}this.setState({appUrl:i})}this.props.currentAppId!==n&&this.props.dispatch(t.appStateActions.inAppAppStateChanged(null))}calAvailableWidth(){const e=this.contentRef.current.getBoundingClientRect();let t=parseFloat(o.styleUtils.remToPixel("3rem"));return isNaN(t)&&(t=48),e.width-t}applyZoomScale(e,t){const{viewportSize:o}=this.props;(null!=t?t:this.calAvailableWidth())<o.width?(this.deviceRef.current.classList.add("left-origin"),this.deviceRef.current.classList.remove("center-origin")):(this.deviceRef.current.classList.add("center-origin"),this.deviceRef.current.classList.remove("left-origin")),this.deviceRef.current.style.transform=`scale(${e})`}getButtonGroupStyle(){return e.css`
      position: absolute !important;
      right: 20px;
      top: 15px;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
      button {
        background: white !important;
        border: none !important;
      }

      button:focus {
        box-shadow: none !important;
      }

      button.active {
        background: #00a6b6 !important;
      }
    `}syncLayoutHandler(){var t,o,i,s;const{appConfig:n,appMode:a,currentPageId:r,browserSizeMode:l,viewportSize:d,currentDialogId:u}=this.props;if(!n||a!==e.AppMode.Design)return null;const p=n.mainSizeMode;if(l===p)return null;let c;c=(null===(o=null===(t=this.deviceRef)||void 0===t?void 0:t.current)||void 0===o?void 0:o.classList.contains("center-origin"))?`calc(50% + ${d.width/2+10}px)`:`${d.width+10}px`;const g=null===(i=n.pages)||void 0===i?void 0:i[r],h=null===(s=n.dialogs)||void 0===s?void 0:s[u],m=n.header&&g.header&&(n.header.height[l]||n.header.height[p])||0;return(0,e.jsx)("div",{css:e.css`
          position: absolute;
          top: 0;
          bottom: 0;
          left: ${c};
        `,className:"d-flex flex-column sync-layout-handler"},g.header&&!u&&(0,e.jsx)(v,{isAuto:!n.header.layout[l],formatMessage:this.formatMessage,theme:this.props.theme,pageId:r,browserSizeMode:l,mainSizeMode:n.mainSizeMode,isHeader:!0}),!u&&(0,e.jsx)(v,{isAuto:!g.layout[l],formatMessage:this.formatMessage,theme:this.props.theme,browserSizeMode:l,mainSizeMode:n.mainSizeMode,pageId:r,style:{marginTop:`${Math.max(+m-60,20)}px`,top:20}}),g.footer&&!u&&(0,e.jsx)(v,{isAuto:!n.footer.layout[l],formatMessage:this.formatMessage,theme:this.props.theme,browserSizeMode:l,mainSizeMode:n.mainSizeMode,pageId:r,isFooter:!0,style:{bottom:30}}),u&&(0,e.jsx)(v,{isAuto:!h.layout[l],formatMessage:this.formatMessage,theme:this.props.theme,browserSizeMode:l,mainSizeMode:n.mainSizeMode,dialogId:u,isDialog:!0,style:{top:"calc( 50% - 30px)",position:"fixed"}}))}render(){var s;const{appConfig:a,theme:r,pageMode:l,viewportSize:d,loadAppConfigError:u}=this.props,p=l===e.PageMode.FitWindow,c=this.getScaledViewportSize(),g=null!==(s=null==d?void 0:d.height)&&void 0!==s?s:0,h=a||u;return(0,e.jsx)("div",{css:n(p,g,r),onClick:this.clearSelectionInApp,className:"jimu-widget widget-builder-app-loader"},!h&&e.ReactDOM.createPortal((0,e.jsx)(o.Loading,{type:o.LoadingType.Primary}),document.body),(0,e.jsx)("div",{className:"content-section",ref:this.contentRef},(0,e.jsx)("div",{className:"content",style:{minHeight:p?c.height+100:null,minWidth:"100%",width:`calc(${c.width}px + 3rem)`}},(0,e.jsx)("div",{ref:this.resizeRef,className:(0,e.classNames)("body-section d-flex flex-column justify-content-start")},(0,e.jsx)("div",{ref:this.deviceRef,className:(0,e.classNames)("device-frame shadow d-flex flex-grow-1",{invisible:!h}),style:Object.assign(Object.assign({},this.getDeviceSize()),{overflow:"visible"})},(0,e.jsx)("iframe",{allowFullScreen:!0,name:e.APP_FRAME_NAME_IN_BUILDER,src:this.state.appUrl,className:"config-preview",ref:e=>this.appIframe=e}),this.syncLayoutHandler())),this.props.showChooseWidgetPopup&&(0,e.jsx)(i.WidgetSelector,{onOK:this.onChooseWidget,title:"Choose Widget",onCancel:()=>this.props.dispatch(t.builderActions.closeChooseWidgetPopup())}))),(0,e.jsx)(I,{formatMessage:this.formatMessage,activePagePart:this.props.activePagePart,currentPageId:this.props.currentPageId,currentDialogId:this.props.currentDialogId,onConfirmDelete:this.showConfirmDeleteDsDialog,onCancelDelete:this.resetConfirmDeleteContent}),this.state.shouldShowDeleteDsDialog&&(0,e.jsx)(M,{onConfirmDelete:this.removeLayoutItem,onCancelDelete:this.resetConfirmDeleteContent}))}getDeviceSize(){const{pageMode:t,viewportSize:o,appMode:i,currentDialogId:s}=this.props;return t===e.PageMode.FitWindow||i!==e.AppMode.Design||t===e.PageMode.AutoScroll&&s?o:{width:o.width}}getScaledViewportSize(){const{viewportSize:e}=this.props,{zoomScale:t}=this.props;return{width:e.width*t,height:e.height*t}}}b.mapExtraStateProps=(t,o)=>{var i,s,n,a,r,l,d,u,p,c,g,h,m,f,v,y,S,C,I,w,M;const b=null===(s=null===(i=t.appStateInBuilder)||void 0===i?void 0:i.appRuntimeInfo)||void 0===s?void 0:s.currentPageId,x=(null===(n=t.appStateInBuilder)||void 0===n?void 0:n.browserSizeMode)||e.BrowserSizeMode.Large;let A;b&&(A=null===(d=null===(l=null===(r=null===(a=t.appStateInBuilder)||void 0===a?void 0:a.appConfig)||void 0===r?void 0:r.pages)||void 0===l?void 0:l[b])||void 0===d?void 0:d.mode);const L=e.utils.findViewportSize(null===(u=t.appStateInBuilder)||void 0===u?void 0:u.appConfig,x);return{showChooseWidgetPopup:t.builder.showChooseWidgetPopup,currentDialogId:null===(c=null===(p=t.appStateInBuilder)||void 0===p?void 0:p.appRuntimeInfo)||void 0===c?void 0:c.currentDialogId,currentPageId:b,pageMode:A,viewportSize:L,appConfig:null===(g=t.appStateInBuilder)||void 0===g?void 0:g.appConfig,loadAppConfigError:null===(h=t.appStateInBuilder)||void 0===h?void 0:h.loadAppConfigError,currentAppId:t.builder.currentAppId,browserSizeMode:x,appMode:null===(f=null===(m=t.appStateInBuilder)||void 0===m?void 0:m.appRuntimeInfo)||void 0===f?void 0:f.appMode,zoomScale:null!==(S=null===(y=null===(v=t.appStateInBuilder)||void 0===v?void 0:v.appRuntimeInfo)||void 0===y?void 0:y.zoomScale)&&void 0!==S?S:1,widgetsRuntimeInfo:null===(C=t.appStateInBuilder)||void 0===C?void 0:C.widgetsRuntimeInfo,activePagePart:null===(w=null===(I=t.appStateInBuilder)||void 0===I?void 0:I.appRuntimeInfo)||void 0===w?void 0:w.activePagePart,isRTL:null===(M=t.appContext)||void 0===M?void 0:M.isRTL,queryObject:t.queryObject}}})(),u})())}}}));