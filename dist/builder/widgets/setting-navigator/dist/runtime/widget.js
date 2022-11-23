System.register(["jimu-core","jimu-for-builder","jimu-ui"],(function(e,t){var s={},i={},o={};return{setters:[function(e){s.AppMode=e.AppMode,s.React=e.React,s.appActions=e.appActions,s.classNames=e.classNames,s.css=e.css,s.defaultMessages=e.defaultMessages,s.getAppStore=e.getAppStore,s.jimuHistory=e.jimuHistory,s.jsx=e.jsx,s.polished=e.polished},function(e){i.builderActions=e.builderActions,i.helpUtils=e.helpUtils},function(e){o.Dropdown=e.Dropdown,o.DropdownButton=e.DropdownButton,o.DropdownItem=e.DropdownItem,o.DropdownMenu=e.DropdownMenu,o.Icon=e.Icon,o.Nav=e.Nav,o.NavItem=e.NavItem,o.NavLink=e.NavLink,o.Popper=e.Popper,o.defaultMessages=e.defaultMessages}],execute:function(){e((()=>{var e={8891:e=>{"use strict";e.exports=s},3137:e=>{"use strict";e.exports=i},726:e=>{"use strict";e.exports=o}},t={};function a(s){var i=t[s];if(void 0!==i)return i.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,a),o.exports}a.d=(e,t)=>{for(var s in t)a.o(t,s)&&!a.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.p="";var r={};return a.p=window.jimuConfig.baseUrl,(()=>{"use strict";a.r(r),a.d(r,{default:()=>p});var e=a(8891),t=a(726),s=a(3137);const i="Show help guide",o="What's new",n={page:"./widgets/setting-navigator/dist/runtime/assets/page.svg",data:"./widgets/setting-navigator/dist/runtime/assets/data.svg",utility:"./widgets/setting-navigator/dist/runtime/assets/utility.svg",theme:"./widgets/setting-navigator/dist/runtime/assets/theme.svg",insert:"./widgets/setting-navigator/dist/runtime/assets/insert.svg"},l="left-sidebar";class p extends e.React.PureComponent{constructor(i){super(i),this.viewLabel={page:this.props.intl.formatMessage({id:"page",defaultMessage:e.defaultMessages.page}),data:this.props.intl.formatMessage({id:"data",defaultMessage:t.defaultMessages.data}),theme:this.props.intl.formatMessage({id:"theme",defaultMessage:e.defaultMessages.theme}),utility:this.props.intl.formatMessage({id:"utility",defaultMessage:t.defaultMessages.utility}),insert:this.props.intl.formatMessage({id:"insert",defaultMessage:t.defaultMessages.insert})},this.onInsertMouseEnter=e=>{"insert"===e&&this.getWhetherViewDisabled("insert")&&this.setState({isInsertDisabledPopperShown:!0})},this.onInsertMouseLeave=e=>{"insert"===e&&this.setState({isInsertDisabledPopperShown:!1})},this.getHelpUrl=()=>{var e;null===(e=null===s.helpUtils||void 0===s.helpUtils?void 0:s.helpUtils.getHomeHelpLink())||void 0===e||e.then((e=>{e&&this.setState({helpHref:e})}))},this.getWhatsNewUrl=()=>{var e;null===(e=null===s.helpUtils||void 0===s.helpUtils?void 0:s.helpUtils.getWhatsNewLink())||void 0===e||e.then((e=>{e&&this.setState({whatsNewHref:e})}))},this.getStyle=t=>e.css`
      height: 100%;
      margin: 0;
      padding: 0;
      background-color: ${t.colors.secondary};

      .jimu-nav-link-wrapper{
        > div{
          display: flex;
          justify-content: center;
        }
      }

      .nav.nav-underline {
        border: 0 !important;
        .nav-item{
          display: flex !important;
        }
        .nav-item:focus{
          border: 0;
          outline: none;
          box-shadow: 0 0 0;
        }
        .nav-item > .jimu-link{
          height: auto !important;
          padding-left: 0;
          padding-right: 0;
          position: relative;
          border-width: 0 !important;
          &::before {
            content: " ";
            display: block;
            position: absolute;
            width: 4px;
            height: 100%;
            top: 0;
            left: -4px;
            background-color: ${t.colors.palette.primary[600]};
            transition: left ease-in .2s .2s;
            z-index: 1;
          }
          > .jimu-icon {
            margin: 0;
          }
          &:active,
          &.active {
            border-left-width: 0 !important;
            &::before {
              left: 0;
            }
          }
        }
      }

      .top-sections {
        .link-icon-color{
          svg{
            margin-right: 0 !important;
            margin-left: 0 !important;
          }
        }

        .link-icon-color:not(.disable-setting){
          &:hover{
            svg{
              color: ${t.colors.dark} !important;
            }
          }
        }
      }

      .nav-item:hover{
        background-color: ${t.colors.palette.secondary[600]};
      }

      .active-setting:not(.disable-setting){
        background-color: ${t.colors.palette.light[800]};
      }

      .disable-setting{
        &.nav-item:focus, &.nav-item button:focus, &.nav-item:active, &.nav-item button:active, &.nav-item:hover, &.nav-item button:hover{
          outline: none !important;
          cursor: default !important;
          border: 0 !important;
          box-shadow: 0 0 0 !important;
        }
        &.nav-item button:active::before{
          width: 0 !important;
        }
      }

      .link-focus{
        &:focus, button:focus{
          border: 0;
          box-shadow: 0 0 0;
        }
      }

      .top-sections{
        height: ${e.polished.rem(275)};
      }
      .bottom-sections{
        position: absolute;
        bottom: 0;
        .func-buttons{
          margin: 0.25rem;
          >span{
            display: inline-block;
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .dropdown-button.cover-dropdown-button:hover{
            background-color: ${t.colors.palette.secondary[600]};
            svg{
              color: ${t.colors.dark} !important
            }
          }
        }
      }
    `,this.state={isInsertDisabledPopperShown:!1,helpHref:"#",whatsNewHref:"#"}}componentDidMount(){this.getHelpUrl(),this.getWhatsNewUrl(),this.getWhetherDisableInsert(this.props)&&"insert"===this.props.currentViewId&&e.jimuHistory.changeView("opts-section","page")}componentDidUpdate(t){this.getWhetherDisableInsert(this.props)&&!this.getWhetherDisableInsert(t)&&"insert"===this.props.currentViewId&&e.jimuHistory.changeView("opts-section","page"),this.props.portalUrl!==(null==t?void 0:t.portalUrl)&&(this.getHelpUrl(),this.getWhatsNewUrl())}getWhetherDisableInsert(t){return t.lockLayoutLabel||t.appMode===e.AppMode.Run}changeView(t){this.getWhetherViewDisabled(t)||(this.props.currentViewId===t?(0,e.getAppStore)().dispatch(e.appActions.widgetStatePropChange(l,"collapse",!this.props.sidebarVisible)):(e.jimuHistory.changeView("opts-section",t),this.props.sidebarVisible||(0,e.getAppStore)().dispatch(e.appActions.widgetStatePropChange(l,"collapse",!0))))}getWhetherViewDisabled(e){return this.getWhetherDisableInsert(this.props)&&"insert"===e}getWhetherViewActive(e){return e===this.props.currentViewId&&this.props.sidebarVisible}render(){const a="active-setting",{sectionJson:r,theme:l}=this.props,p=this.props.intl.formatMessage({id:"liveView",defaultMessage:"Live view"}),d=this.props.intl.formatMessage({id:"lockLayouts",defaultMessage:"Lock layout"}),c=this.props.intl.formatMessage({id:"diableInsertDueToLiveViewTip",defaultMessage:"Unable to add widgets in {liveViewElement} mode. Turn off {liveViewElement} to enable it."},{liveViewElement:(0,e.jsx)("strong",{key:"diableInsertDueToLiveViewTip"},p)});c[1]=(0,e.jsx)("strong",{key:"diableInsertDueToLiveViewTip_1"},p),c[3]=(0,e.jsx)("strong",{key:"diableInsertDueToLiveViewTip_2"},p);const u=this.props.intl.formatMessage({id:"diableInsertDueToLockLayoutTip",defaultMessage:"Unable to insert a widget from here when layout editing is disabled. Turn off the {lockLayoutElement} option to enable it."},{lockLayoutElement:(0,e.jsx)("strong",{key:"diableInsertDueToLockLayoutTip"},d)}),h=this.props.intl.formatMessage({id:"help",defaultMessage:t.defaultMessages.help});return(0,e.jsx)("div",{css:this.getStyle(l),className:"widget-builder-setting-navigator h-100"},(0,e.jsx)(t.Popper,{open:this.state.isInsertDisabledPopperShown,showArrow:!0,reference:this.insertDom,placement:"right",offset:[0,2],css:e.css`
            width: ${e.polished.rem(300)};
            padding: ${e.polished.rem(12)};
            background-color: ${l.colors.palette.light[500]};
            color: ${l.colors.palette.dark[800]};
            font-size: ${e.polished.rem(13)};
            strong{
              font-size: ${e.polished.rem(16)};
              color: ${l.colors.black};
            }
            .jimu-popper--arrow::after {
              border-right-color: ${l.colors.palette.light[500]} !important;
            }
          `},(0,e.jsx)("div",{className:"insert-disable-tooltip"},this.props.appMode===e.AppMode.Run?(0,e.jsx)("div",null,(0,e.jsx)("div",null,c)):(0,e.jsx)("div",null,(0,e.jsx)("div",null,u)))),(0,e.jsx)(t.Nav,{fill:!0,underline:!0,vertical:!0,right:!0,className:"top-sections"},r.views.map((s=>{const i=this.getWhetherViewDisabled(s),o=this.getWhetherViewActive(s);return(0,e.jsx)(t.NavItem,{key:s,className:(0,e.classNames)("link-icon-color",{[a]:o,"disable-setting":i}),disabled:i,onMouseEnter:()=>this.onInsertMouseEnter(s),onMouseLeave:()=>this.onInsertMouseLeave(s)},(0,e.jsx)(t.NavLink,{iconPosition:"above",tag:"button",active:o,onClick:e=>this.changeView(s),themeStyle:{icon:!0},title:this.viewLabel[s],"aria-label":this.viewLabel[s],"aria-pressed":o?"true":"false"},(0,e.jsx)("div",{className:"w-100 h-100",ref:e=>{"insert"===s&&(this.insertDom=e)}},(0,e.jsx)(t.Icon,{className:(0,e.classNames)({[a]:o}),icon:n[s],size:"20",color:i?this.props.theme.colors.palette.secondary[800]:o?this.props.theme.colors.dark:this.props.theme.colors.palette.dark[600]}))))}))),(0,e.jsx)("div",{className:"bottom-sections w-100"},(0,e.jsx)("div",{className:"func-buttons"},(0,e.jsx)(t.Dropdown,{direction:"right",className:"link-focus link-icon-color w-100 d-flex justify-content-center"},(0,e.jsx)(t.DropdownButton,{css:e.css`min-height: 3rem`,icon:!0,arrow:!1,title:h,"aria-label":h,className:"cover-dropdown-button"},(0,e.jsx)(t.Icon,{autoFlip:"ar"===window.locale.split("-")[0],icon:"./widgets/setting-navigator/dist/runtime/assets/help.svg",color:this.props.theme.colors.palette.dark[600]})),(0,e.jsx)(t.DropdownMenu,null,(0,e.jsx)(t.DropdownItem,{tag:"a",href:this.state.helpHref,target:"_blank",title:h},(0,e.jsx)(t.Icon,{autoFlip:!0,icon:"./widgets/setting-navigator/dist/runtime/assets/help-document.svg",className:"mr-2"}),h),(0,e.jsx)(t.DropdownItem,{title:this.props.intl.formatMessage({id:"showGuide",defaultMessage:i}),onClick:()=>{(0,e.getAppStore)().dispatch(s.builderActions.startGuide("opening-tour"))}},(0,e.jsx)(t.Icon,{icon:"./widgets/setting-navigator/dist/runtime/assets/launch.svg",className:"mr-2"}),this.props.intl.formatMessage({id:"showGuide",defaultMessage:i})),(0,e.jsx)(t.DropdownItem,{title:this.props.intl.formatMessage({id:"whatsNew",defaultMessage:o}),tag:"a",rel:"noreferrer",target:"_blank",href:this.state.whatsNewHref},(0,e.jsx)(t.Icon,{icon:"./widgets/setting-navigator/dist/runtime/assets/whats-new.svg",className:"mr-2"}),this.props.intl.formatMessage({id:"whatsNew",defaultMessage:o})))))))}}p.mapExtraStateProps=(e,t)=>{var s,i,o,a,r,n,l,p,d;const c=Object.keys(e.appRuntimeInfo.sectionNavInfos||{}).map((t=>e.appRuntimeInfo.sectionNavInfos[t].currentViewId));return{sectionJson:null===(s=e.appConfig)||void 0===s?void 0:s.sections[t.config.sectionId],currentViewId:c[0]?c[0]:"insert",sidebarVisible:null===(a=null===(o=null===(i=e.widgetsState)||void 0===i?void 0:i["left-sidebar"])||void 0===o?void 0:o.collapse)||void 0===a||a,lockLayoutLabel:null===(l=null===(n=null===(r=e.appStateInBuilder)||void 0===r?void 0:r.appConfig)||void 0===n?void 0:n.forBuilderAttributes)||void 0===l?void 0:l.lockLayout,appMode:null===(p=e.appStateInBuilder)||void 0===p?void 0:p.appRuntimeInfo.appMode,portalUrl:null===(d=e.appStateInBuilder)||void 0===d?void 0:d.portalUrl}}})(),r})())}}}));