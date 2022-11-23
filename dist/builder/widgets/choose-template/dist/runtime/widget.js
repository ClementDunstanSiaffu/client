System.register(["jimu-core","jimu-for-builder","jimu-for-builder/service","jimu-for-builder/templates","jimu-theme","jimu-ui"],(function(e,t){var s={},i={},a={},l={},r={},o={};return{setters:[function(e){s.React=e.React,s.SessionManager=e.SessionManager,s.classNames=e.classNames,s.css=e.css,s.defaultMessages=e.defaultMessages,s.getAppStore=e.getAppStore,s.jimuHistory=e.jimuHistory,s.jsx=e.jsx,s.polished=e.polished,s.portalUrlUtils=e.portalUrlUtils,s.privilegeUtils=e.privilegeUtils,s.queryString=e.queryString,s.urlUtils=e.urlUtils},function(e){i.builderActions=e.builderActions},function(e){a.SearchType=e.SearchType,a.appServices=e.appServices},function(e){l.getAppTemplates=e.getAppTemplates},function(e){r.useTheme=e.useTheme},function(e){o.AlertPopup=e.AlertPopup,o.Button=e.Button,o.ButtonGroup=e.ButtonGroup,o.Image=e.Image,o.Nav=e.Nav,o.NavItem=e.NavItem,o.NavLink=e.NavLink,o.Navbar=e.Navbar,o.SVG=e.SVG,o.TextInput=e.TextInput,o.defaultMessages=e.defaultMessages,o.hooks=e.hooks}],execute:function(){e((()=>{var e={5339:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m8.745 8 6.1 6.1a.527.527 0 1 1-.745.746L8 8.746l-6.1 6.1a.527.527 0 1 1-.746-.746l6.1-6.1-6.1-6.1a.527.527 0 0 1 .746-.746l6.1 6.1 6.1-6.1a.527.527 0 0 1 .746.746L8.746 8Z" fill="#000"></path></svg>'},8450:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 1a2 2 0 0 1 2 2v6.5a.5.5 0 0 1-1 0V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h6.5a.5.5 0 0 1 0 1H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10Zm-1.849 10.151a.517.517 0 0 1 .73 0l2.923 2.923a.517.517 0 0 1-.73.73l-2.923-2.922a.517.517 0 0 1 0-.73ZM8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-1a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" fill="#000"></path></svg>'},224:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Zm-1.27 4.936a6.5 6.5 0 1 1 .707-.707l4.136 4.137a.5.5 0 1 1-.707.707l-4.137-4.137Z" fill="#000"></path></svg>'},3007:e=>{e.exports="data:image/png;base64,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"},62:e=>{e.exports="data:image/png;base64,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"},8891:e=>{"use strict";e.exports=s},3137:e=>{"use strict";e.exports=i},6325:e=>{"use strict";e.exports=a},6262:e=>{"use strict";e.exports=l},4796:e=>{"use strict";e.exports=r},726:e=>{"use strict";e.exports=o}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var a=t[s]={exports:{}};return e[s](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="";var c={};return n.p=window.jimuConfig.baseUrl,(()=>{"use strict";n.r(c),n.d(c,{default:()=>O});var e,t,s,i=n(8891);!function(e){e.Default="Default",e.My="My",e.Favorites="Favorites",e.MyGroup="MyGroup",e.ArcGisOnline="ArcGisOnline",e.LivingAtlas="LivingAtlas",e.MyOrganization="MyOrganization"}(e||(e={})),function(e){e.MyPortalTemplate="MyPortalTemplate",e.MyTemplate="MyTemplate",e.ExbAdmin="ExbAdmin",e.ArcGISOnline="ArcGISOnline",e.Favorites="Favorites",e.LivingAtlas="LivingAtlas",e.MyGroup="MyGroup",e.MyOrganization="MyOrganization"}(t||(t={})),function(e){e.Published="Published",e.Draft="Draft",e.Changed="Changed"}(s||(s={}));var a=n(3137),l=n(6325),r=n(726);const o={_widgetLabel:"Create a new experience",untitledExperience:"Untitled experience",telplateListTitle:"Templates",searchPlaceholder:"Search",create:"Create",chooseTemplateDefault:"Default",my:"My templates",shared:"Shared templates",choseTemplate:"Select a template to start",templateSummary:"This is the summary of the item.",publicTemplate:"Public",noTemplatesAvailable:"No templates available. ",myFavorites:"My favorites",createError:"There was a problem when create new application.",noResource:"Resource does not exist or is inaccessible",warningPopUpTitle:"Warning",templateMultiPages:"Multi-pages",viewTemplateDetail:"View details"};var p=n(8450),A=n.n(p);const h=e=>{const{className:t}=e,s=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(i=Object.getOwnPropertySymbols(e);a<i.length;a++)t.indexOf(i[a])<0&&Object.prototype.propertyIsEnumerable.call(e,i[a])&&(s[i[a]]=e[i[a]])}return s}(e,["className"]),a=(0,i.classNames)("jimu-icon jimu-icon-component",t);return i.React.createElement(r.SVG,Object.assign({className:a,src:A()},s))};class m extends i.React.PureComponent{constructor(e){super(e),this.onCreateClick=()=>{const{name:e,isExperiencesTemplate:t}=this.props.info;if(t)return this.props.crateAppByTemplate(this.props.info),!1;this.props.onCreateClick(e)},this.clickThumbnailToCreate=()=>{const{name:e}=this.props.info;this.checkThumbnailIsAdd()&&this.props.onCreateClick(e)},this.checkThumbnailIsAdd=()=>{const{name:e,isExperiencesTemplate:t}=this.props.info;return!(t||"default"!==e&&"default2"!==e)},this.nls=e=>{const t=Object.assign({},o,r.defaultMessages);return this.props.intl?this.props.intl.formatMessage({id:e,defaultMessage:t[e]}):e},this.getStyle=()=>{var e,t,s,a;const{theme:l}=this.props,r=l?l.colors.palette.dark[300]:"",o=l?l.colors.white:"";return i.css`
      width: ${i.polished.rem(240)};
      height: ${i.polished.rem(260)};
      margin: 0 ${i.polished.rem(14)}  ${i.polished.rem(30)}  ${i.polished.rem(14)};
      display: flex;
      flex-direction: column;
      .new-oblique-filled {
        right: 0;
        top: 0;
        color: ${l.colors.palette.warning[700]};
        z-index: 10;
      }
      .image-container {
        position: relative;
        height: ${i.polished.rem(160)};
        width: ${i.polished.rem(240)};
        > img {
          width: 100%;
          max-width: 100%;
          max-height: 100%;
        }
        flex-shrink: 0;
        flex-grow: 0;

        .flip-image{
          transform: scaleX(-1);
        }
        .description {
          position: absolute;
          padding: ${i.polished.rem(16)};
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: ${i.polished.rgba(o,.5)};
          color: ${l.colors.black};
          font-size: 13px;
          .content {
            overflow: hidden;
            width: 100%;
            height: 100%;
            overflow-y:auto;
          }
        }
        .description-cursor {
          cursor: pointer;
        }
        .multi-pages {
          height: ${i.polished.rem(26)};
          line-height: ${i.polished.rem(26)};
          color: ${null===(e=null==l?void 0:l.colors)||void 0===e?void 0:e.black};
          font-size: ${i.polished.rem(13)};
          padding: 0 ${i.polished.rem(14)};
          bottom: 0;
          right: 0;
          background: ${null===(a=null===(s=null===(t=null==l?void 0:l.colors)||void 0===t?void 0:t.palette)||void 0===s?void 0:s.primary)||void 0===a?void 0:a[100]};
        }
      }
      .action-button {
        max-width:${i.polished.rem(154)};
        color:${l.colors.black};
        display: block;
      }
      .info{
        padding: ${i.polished.rem(16)};
        flex-shrink: 1;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          ${Object.assign({},i.polished.ellipsis())}
          font-size: ${i.polished.rem(16)};
          color:${l.colors.palette.dark[800]};
        }
      }
      .buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon-btn:first-of-type {
          margin-left: -4px;
        }
      }
      &.disabled {
        > img {
          opacity: 0.6;
        }
        .jimu-icon {
          color: ${r};
          cursor: default;
        }
        .info{
          .title {
            color: ${l.colors.palette.dark[600]};
          }
        }
      }
    `},this.getPublishStatus=e=>{let t;return(e.typeKeywords||[]).forEach((e=>{if(null==e?void 0:e.includes("status:"))switch(e.split(": ")[1]){case s.Published:case s.Changed:t=s.Published;break;case s.Draft:t=s.Draft}})),t},this.showDesc=()=>{this.setState({showDesc:!0})},this.hideDesc=()=>{this.setState({showDesc:!1})},this.initPreviewUrl=()=>{const{isExperiencesTemplate:e,id:t,name:s,isPortalRequest:a,isArcGisOnlineRequest:l}=this.props.info;let r="";if(e||l||a)r=i.urlUtils.getAppUrl({appId:t,isTemplate:!0,isArcGisOnlineTemplate:l,isPortalRequest:a});else{r=i.urlUtils.getAppUrl({appId:t,isTemplate:!0,isArcGisOnlineTemplate:l,isPortalRequest:!1,isDraft:!1,defaultTemplateName:s});const e=(0,i.getAppStore)().getState().queryObject,a=null==e?void 0:e.webmap,o=null==e?void 0:e.webscene,n=a?`&webmap=${a}`:o?`&webscene=${o}`:"";r=`${r}${n}`,n&&(r=r.replace("/../",encodeURIComponent("/../")))}this.setState({previewUrl:r})},this.isRTL=(0,i.getAppStore)().getState().appContext.isRTL,this.state={showDesc:!1,previewUrl:"",thumbnail:""}}componentDidMount(){this.initPreviewUrl()}componentDidUpdate(){this.initPreviewUrl()}render(){const{disabled:e,style:t}=this.props,{title:a,image:l,snippet:o,flipThumbnail:n,isMultiplePage:c}=this.props.info,{showDesc:p,previewUrl:A}=this.state,{capabilities:m,info:d}=this.props,g=this.getPublishStatus(d),u=p&&(null==l?void 0:l.gifSrc);return(0,i.jsx)("div",{css:this.getStyle(),className:(0,i.classNames)("template bg-secondary",{disabled:e}),style:t},(0,i.jsx)("div",{className:"image-container position-relative",onMouseEnter:this.showDesc,onMouseLeave:this.hideDesc},(0,i.jsx)(r.Image,{src:u?l.gifSrc:l.src,alt:a,className:this.isRTL&&n?"flip-image":""}),c&&(0,i.jsx)("div",{className:"multi-pages position-absolute"},this.nls("templateMultiPages")),p&&(0,i.jsx)("div",{className:(0,i.classNames)("description",{"description-cursor":this.checkThumbnailIsAdd()}),onClick:this.clickThumbnailToCreate},(0,i.jsx)("div",{className:"content"},(0,i.jsx)("div",null,o||this.nls("templateSummary"))))),(0,i.jsx)("div",{className:"info"},(0,i.jsx)("div",{className:"title",title:a},a),(0,i.jsx)("div",{className:"buttons"},m.canCreateExperience&&g!==s.Draft&&(0,i.jsx)(r.Button,{disabled:e,size:"sm",className:"action-button text-truncate",type:"primary",onClick:this.onCreateClick,title:this.nls("create")},this.nls("create")," "),m.canViewExperience&&(0,i.jsx)(r.Button,{size:"sm",icon:!0,type:"tertiary",title:this.nls("preview"),href:A,target:"_blank"},(0,i.jsx)(h,{size:16})))))}}m.defaultProps={disabled:!1};class d extends i.React.PureComponent{constructor(){super(...arguments),this.nls=e=>this.props.intl?this.props.intl.formatMessage({id:e,defaultMessage:o[e]}):e,this.getStyle=()=>{var e;const{theme:t}=this.props,s=null===(e=null==t?void 0:t.colors)||void 0===e?void 0:e.palette;return i.css`
      & {
        width: 100%;
        top: 25%;
        left: 0;
      }
      .empty-message {
        text-align: center;
        font-size: ${i.polished.rem(22)};
        line-height: ${i.polished.rem(22)};
        color: ${null==s?void 0:s.dark[600]};
        margin-top: ${i.polished.rem(30)};
      }
      .icon-con img{
        display: block;
        text-align: center;
        width: 26.7%;
        margin: 0 auto;
        opacity: 0.6;
      }
      @media (min-width: 1600px) {
        .icon-con img{
          width: 20%;
        }
      }
    `}}render(){return(0,i.jsx)("div",{css:this.getStyle(),className:"choose-template-empty-con position-absolute","data-testid":"empty"},(0,i.jsx)("div",{className:"icon-con"},(0,i.jsx)(r.Image,{src:n(62),"data-testid":"empty-icon"})),(0,i.jsx)("p",{className:"empty-message"},this.nls("noTemplatesAvailable")))}}var g=n(6262),u=n(5339),v=n.n(u);const f=e=>{const{className:t}=e,s=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(i=Object.getOwnPropertySymbols(e);a<i.length;a++)t.indexOf(i[a])<0&&Object.prototype.propertyIsEnumerable.call(e,i[a])&&(s[i[a]]=e[i[a]])}return s}(e,["className"]),a=(0,i.classNames)("jimu-icon jimu-icon-component",t);return i.React.createElement(r.SVG,Object.assign({className:a,src:v()},s))};var b=n(224),w=n.n(b);const y=e=>{const{className:t}=e,s=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(i=Object.getOwnPropertySymbols(e);a<i.length;a++)t.indexOf(i[a])<0&&Object.prototype.propertyIsEnumerable.call(e,i[a])&&(s[i[a]]=e[i[a]])}return s}(e,["className"]),a=(0,i.classNames)("jimu-icon jimu-icon-component",t);return i.React.createElement(r.SVG,Object.assign({className:a,src:w()},s))};var T=n(4796);const x=Object.assign({},o,r.defaultMessages),B=e=>{var t,s;const a=r.hooks.useTranslate(x),l=(0,T.useTheme)(),{onTagsChange:o,selectedTags:n}=e,c=[{value:null,label:a("all")},{value:"Blank",label:a("blankTemplate")},{value:"WAB classic",label:a("wabClassicTemplate")},{value:"Map centric",label:a("mapCentricTemplate")},{value:"Dashboard",label:a("dashboardTemplate")},{value:"Web page",label:a("webPageTemplate")},{value:"Website",label:a("websiteTemplate")}],p=i.css`
    & {
      padding-top: ${i.polished.rem(20)};
      padding-bottom: ${i.polished.rem(30)};
      button.template-tag {
        & {
          margin-right: ${i.polished.rem(10)};
          padding-left: ${i.polished.rem(16)};
          padding-right: ${i.polished.rem(16)};
        }
        &:active, &:hover, &:not(:disabled):not(.disabled).active {
          background-color: ${null===(t=l.colors)||void 0===t?void 0:t.primary};
          border-color: ${null===(s=l.colors)||void 0===s?void 0:s.primary};
        }
      }
    }
  `,A=e=>{const t=!n||0===(null==n?void 0:n.length);return e?n.includes(e):t};return(0,i.jsx)(r.ButtonGroup,{className:"top-padding default-template-button-con",css:p},c.map((e=>(0,i.jsx)(r.Button,{className:"template-tag",type:"secondary",key:e.value,title:e.label,active:A(e.value),onClick:()=>{var t;t=e.value,o(t?[t]:[])}},e.label))))};class O extends i.React.PureComponent{constructor(s){super(s),this.onDefaultTemplateTagChange=e=>{this.setState({selectedTags:e},(()=>{this.getDefaultTemplate()}))},this.getDefaultTemplate=()=>{const{selectedTags:e}=this.state,t=(0,g.getAppTemplates)(e).map((e=>({isExperiencesTemplate:!1,name:e.name,title:e.label,image:{src:e.thumbnail,gifSrc:null==e?void 0:e.gifThumbnail},description:e.description,isMapAware:e.isMapAware,snippet:e.description,flipThumbnail:e.flipThumbnail,isNewTemplate:e.isNewTemplate,isMultiplePage:e.isMultiplePage})));this.setState({defaultTemplate:t,templates:t})},this.nls=e=>this.props.intl?this.props.intl.formatMessage({id:e,defaultMessage:Object.assign(Object.assign(Object.assign({},o),r.defaultMessages),i.defaultMessages)[e]}):e,this.createAppByDefaultTemplate=e=>{this.setState({loading:!0});const t=this.nls("untitledExperience"),s=this.getQueryString("folderId"),r=(0,i.getAppStore)().getState().queryObject;l.appServices.createAppByDefaultTemplate(t,e,s,null==r?void 0:r.webmap,null==r?void 0:r.webscene).then((e=>{this.setState({loading:!1}),this.props.dispatch(a.builderActions.refreshAppListAction(!0)),i.jimuHistory.browserHistory.push(this.getBuilderLink(e.id))}),(e=>{this.setState({loading:!1}),console.error(e)})).catch((e=>{this.setState({loading:!1,isShowAlertPopup:!0,alertPopupMessage:this.nls("createError")})}))},this.searchLivingAtlasGroups=()=>{const e=(0,i.getAppStore)().getState().portalSelf,t=null==e?void 0:e.livingAtlasGroupQuery;if(!t)return!1;const s={num:1,start:0,sortField:"title",sortOrder:"asc",q:t};l.appServices.searchGroups(s).then((e=>{const t=null==e?void 0:e.results.map((e=>null==e?void 0:e.id)),s=t.length>0?t.join(" OR "):null;this.setState({esriLivingAtlasGroupId:s})}))},this.checkIsShowLivingAtlas=()=>{const e=(0,i.getAppStore)().getState().portalSelf;this.setState({isShowLivingAtlas:!!(null==e?void 0:e.livingAtlasGroupQuery)})},this.onCreateClick=e=>{this.selectTemplate(e),this.createAppByDefaultTemplate(e)},this.selectTemplate=e=>{this.props.dispatch(a.builderActions.selectTemplate(e))},this._matchearchText=e=>{const{searchTextForRequest:t}=this.state;return!t||!e||e.toLowerCase().indexOf(t.toLowerCase())>-1},this.getBuilderLink=e=>{let t=window.jimuConfig.mountPath+"builder/?id="+e;return this.getQueryString("locale")&&(t=i.urlUtils.appendQueryParam(t,"locale",this.getQueryString("locale"))),this.getQueryString("__env__")&&(t=i.urlUtils.appendQueryParam(t,"__env__",this.getQueryString("__env__"))),t},this.crateAppByTemplate=e=>{this.setState({loading:!0});const t=this.getQueryString("folderId");l.appServices.createAppByItemTemplate(e,t).then((e=>{e&&(window.location.href=this.getBuilderLink(e)),this.setState({loading:!1})}),(e=>{const t=e&&(null==e?void 0:e.indexOf("Resource does not exist"))>-1?this.nls("noResource"):this.nls("createError");this.setState({loading:!1,isShowAlertPopup:!0,alertPopupMessage:t})}))},this.checkIsOwner=e=>{const t=(0,i.getAppStore)().getState().user;return!(!t||!e||t.username!==e)},this.filterTemplateChange=t=>{const{defaultTemplate:s}=this.state;t!==this.state.accessType&&(t===e.Default?this.setState({templates:s,accessType:t,isMyLocalTemplateLoadAll:!1},(()=>{this.filterDefaultTemplate()})):this.setState({templates:[],accessType:t,isMyLocalTemplateLoadAll:!1},(()=>{this.refreshTemplate()})))},this.refreshTemplate=()=>{this.setState({templates:[],exbAdminTemplates:[],otherTemplate:[]},(()=>{this.refreshAction()}))},this.refreshAction=(s=!1)=>{const{accessType:i,esriLivingAtlasGroupId:a,isMyLocalTemplateLoadAll:l}=this.state,r=window.jimuConfig.isDevEdition&&l;let o=t.MyTemplate;if(i===e.ArcGisOnline){const e=this.getRequestOption(t.ExbAdmin,s);this.searchTemplate(e,s,t.ExbAdmin)}switch(i){case e.My:o=r?t.MyPortalTemplate:t.MyTemplate;break;case e.ArcGisOnline:o=t.ArcGISOnline;break;case e.MyGroup:o=t.MyGroup;break;case e.MyOrganization:o=t.MyOrganization;break;case e.Favorites:o=t.Favorites;break;case e.LivingAtlas:o=t.LivingAtlas}if(i===e.LivingAtlas&&!a)return!1;const n=this.getRequestOption(o,s);this.searchTemplate(n,s,o)},this.getSearchType=e=>{const s=e===t.LivingAtlas||e===t.MyPortalTemplate,i=e===t.ExbAdmin||e===t.ArcGISOnline;let a;return a=s?l.SearchType.Portal:i?l.SearchType.AGOL:l.SearchType.Other,a},this.getAppPortalUrl=e=>{},this.setTemplateData=(e,s,i)=>{i===t.MyPortalTemplate?this.setMyPortalTemplateData(e,s):this.setTemplateListData(e,s,i)},this.searchMyPortalTemplate=(e,t=!1)=>{this.isSearchMyPortalTemplate(e,t)&&this.setState({isMyLocalTemplateLoadAll:t,myPortaltemplates:[]},(()=>{this.refreshAction()}))},this.isSearchMyPortalTemplate=(s,i)=>{const{accessType:a,myTemplatesInDevEdtion:l}=this.state;let r=!0;return a===e.My&&s!==t.MyPortalTemplate||(r=!1),l.length>=this.pageNumber&&(r=!1),i||(r=!1),r},this.initTemplateInfo=(e,s)=>{const{portalUrl:a}=this.props,l=s===t.LivingAtlas||s===t.MyPortalTemplate,r=s===t.ExbAdmin||s===t.ArcGISOnline,o=window.jimuConfig.isDevEdition&&s===t.MyTemplate,n=i.portalUrlUtils.isAGOLDomain(a),c=r&&!n?"https://maps.arcgis.com":a;return e.map((e=>Object.assign(Object.assign({},e),{isExperiencesTemplate:!0,image:{src:this.thumbnail(e.thumbnail,e.id,r,l)},isArcGisOnlineRequest:r,isPortalRequest:l,portalUrl:c,isLocalApp:o})))},this.setTemplateListData=(e,s,i)=>{let{otherTemplate:a,exbAdminTemplates:l,templates:r}=this.state;a=s?a:[],l=s?l:[],r=s?r:[],s?(a=a.concat(e),l=l.concat(e)):(a=e,l=e),i===t.MyTemplate&&window.jimuConfig.isDevEdition&&this.setState({myTemplatesInDevEdtion:e}),i===t.ExbAdmin?this.setState({exbAdminTemplates:l}):this.setState({otherTemplate:a,templates:r.concat(e)})},this.setMyPortalTemplateData=(e,t=!1)=>{let{myPortaltemplates:s}=this.state;const{templates:i}=this.state;s=t?s:[],s=t?s.concat(e):e,this.setState({myPortaltemplates:s,templates:i.concat(e)})},this.checkMyLocalTemplateIsLoadAll=(s,i,a=t.MyPortalTemplate)=>{const{accessType:l}=this.state;return l===e.My&&(a===t.MyPortalTemplate||l===e.My&&s>i)},this.getRequestOption=(s,a=!1)=>{if(this.state.accessType===e.Default)return null;const l={start:1,q:'type: "Web Experience Template"',sortField:"modified",sortOrder:"desc",num:30};if(i.SessionManager.getInstance().getMainSession()){l.q=this.getRequestOptionParamsQ(s);const e=this.getPageStartAndNum(a,s);l.num=e.num,l.start=e.start}return window.jimuConfig.isDevEdition&&s===t.MyTemplate&&(l.portalUrl=this.props.portalUrl),l},this.getRequestOptionParamsQ=(e=t.ArcGISOnline)=>{var s;const{esriLivingAtlasGroupId:a}=this.state,l=i.SessionManager.getInstance().getMainSession(),r=(0,i.getAppStore)().getState().user,o=(null==r?void 0:r.favGroupId)||"",n='type: "Web Experience Template"',{searchTextForRequest:c}=this.state,p=c?`AND (${this.state.searchTextForRequest})`:"";if(!l)return`${n} ${p}`;const A=null===(s=null==r?void 0:r.groups)||void 0===s?void 0:s.map((e=>e.id)),h=(null==l?void 0:l.username)||"",m=(null==A?void 0:A.length)>0?A.join(" OR "):"",d=a?`group:(${a})`:"";switch(e){case t.ExbAdmin:return`${n} AND owner:ExB_team ${p}`;case t.MyTemplate:case t.MyPortalTemplate:return`${n} orgid:${null==r?void 0:r.orgId} AND owner:${h} ${p}`;case t.MyGroup:return`group: (${m}) (access:shared OR access:public OR access:org) ${n} ${p}`;case t.MyOrganization:return`orgid:${null==r?void 0:r.orgId} ${n}  ${p}`;case t.Favorites:return`group: "${o}" ${n} ${p}`;case t.ArcGISOnline:return`${n} AND NOT owner:ExB_team ${p}`;case t.LivingAtlas:return`${n} ${d} ${p}`}},this.getPageStartAndNum=(e,s)=>{const{otherTemplate:i,exbAdminTemplates:a,myPortaltemplates:l}=this.state,r={num:this.getPageNumber(e,s),start:1};if(!e)return r;switch(s){case t.ExbAdmin:r.start=a.length+1;break;case t.MyPortalTemplate:r.start=l.length+1;break;default:r.start=i.length+1}return r},this.getPageNumber=(e,s)=>{const{myTemplatesInDevEdtion:i}=this.state,a=this.contentNode.clientWidth,l=this.contentNode.clientHeight;let r=Math.ceil(l/260)*Math.ceil(a/238)||30;return s!==t.MyPortalTemplate||e||(r=r-i.length||0),this.pageNumber=r,r},this.thumbnail=(t,s,a=!1,l=!1)=>{const{accessType:r}=this.state,o=r===e.My,c=i.portalUrlUtils.isAGOLDomain(this.props.portalUrl),p=window.jimuConfig.isDevEdition&&o&&!l,A=a?i.urlUtils.getArcgisOnlineUrl():this.props.portalUrl,h=i.SessionManager.getInstance().getSessionByUrl(A),m=a&&!c?"":`?token=${null==h?void 0:h.token}`;let d;if(t){const e=window.location.origin+"/apps/"+s+"/"+d,i=A+"/sharing/rest/content/items/"+s+"/info/"+t+m;d=p?e:i}else d=n(3007);return d},this.getMyTemplateThumbnail=(e,t)=>{let s;const a=i.SessionManager.getInstance().getSessionByUrl(this.props.portalUrl),l=a&&a.token?"?token="+a.token:"";return s=window.jimuConfig.isDevEdition?window.location.origin+"/apps/"+t+"/"+e:this.props.portalUrl+"/sharing/rest/content/items/"+t+"/info/"+e+l,s},this.getStyle=()=>{var e,t;const{theme:s}=this.props,a=s?s.colors.palette.light[800]:"";return i.css`
      height: 100%;
      .header-bar {
        width: 100%;
        height: ${i.polished.rem(60)};
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 ${i.polished.rem(30)};
        font-size: 20px;
        border-bottom: 1px solid ${a};
        color:${s.colors.palette.dark[600]};
        font-weight:500;
        background:${s.colors.palette.light[400]};
        svg {
          margin-right: 0;
        }
        &>div {
          color: ${s.colors.palette.dark[600]};
        }
        &>div:hover {
          color: ${s.colors.black};
        }
        .jimu-icon {
          cursor: pointer;
        }
      }
      .loading-con {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: ${i.polished.rgba(s.colors.white,.2)};
      }
      .homescreen {
        width:${i.polished.rem(810)};
        margin: 0 auto;
      }
      .top-padding{
        padding-right: ${i.polished.rem(32)};
        padding-left: ${i.polished.rem(16)};
      }
      .header {
        width: 100%;
        padding-bottom: ${i.polished.rem(20)};
        padding-top: ${i.polished.rem(24)};
        align-items: flex-end;
        .filterbar-input {
          width:${i.polished.rem(160)};
          margin-right:${i.polished.rem(20)};
        }
      }
      .search-con {
        &{
          padding-top: ${i.polished.rem(30)};
        }
        &>span {
          font-size: ${i.polished.rem(20)};
          line-height: ${i.polished.rem(20)};
          color: ${null===(t=null===(e=null==s?void 0:s.colors)||void 0===e?void 0:e.palette)||void 0===t?void 0:t.dark[600]};
        }
        .banner {
          position: relative;
          .jimu-icon {
            color: ${s.colors.palette.dark[600]};
            cursor: pointer;
          }
          .searchbox {
            padding-left:${i.polished.rem(28)};
            font-size:${i.polished.rem(14)};
            height: ${i.polished.rem(32)};
            width:${i.polished.rem(228)};
            cursor: text;
            box-sizing: border-box;
            padding-right: ${i.polished.rem(20)};
            input {
              flex: 1;
            }
          }
          .searchbox::-ms-clear{
            display: none;
          }
          .icon-close-con {
            color: ${s.colors.palette.dark[600]};
          }
        }
      }

      .section {
        display: flex;
        flex-wrap: wrap;
        overflow-x: hidden;
        overflow-y: auto;
        align-content: flex-start;
        height: calc(100% - ${i.polished.rem(165)});
        min-width: ${i.polished.rem(822)};
        padding-bottom: ${i.polished.rem(30)};
        box-sizing: border-box;
        .bottom_space {
          width: 100%;
          height: ${i.polished.rem(80)};
        }
      }
      .template-con {
        flex-wrap:wrap;
        align-content: flex-start;
      }
      .template-title {
        font-size: ${i.polished.rem(14)};
        color:${s.colors.palette.dark[400]};
        .navbar-nav button.nav-link {
          & {
            color:${s.colors.palette.dark[400]};
          }
          &:hover, &:focus {
            color:${s.colors.black};
          }
        }
        .tap-link a.active {
          font-weight:500;
        }
        .header-nav-bar-con {
          padding:0;
          .navbar-nav {
            border: none;
          }
          .nav-item {
            flex: auto;
          }
        }
        a {
          width:auto;
        }
        .nav-item a.nav-link {
          width: auto;
          white-space: nowrap;
          color: inherit;
        }
        .nav-item a.nav-link:hover, .nav-item a.nav-link:focus {
          color: ${s.colors.black};
        }
        .tap-margin-r {
          margin-right:${i.polished.rem(12)};
        }
      }
      @media only screen and (min-width: 1280px) {
        .homescreen {
          width:${i.polished.rem(1090)};
        }
        .top-padding{
          padding-right: ${i.polished.rem(32)};
          padding-left: ${i.polished.rem(16)};
        }
        .search-con .banner .searchbox {
          width:${i.polished.rem(400)};
        }
        .template-title  .tap-margin-r {
          margin-right:${i.polished.rem(22)};
        }
      }
      @media only screen and (min-width: 1400px) {
        .top-padding{
          padding-right: ${i.polished.rem(37)};
          padding-left: ${i.polished.rem(16)};
        }
        .homescreen {
            width:${i.polished.rem(1360)};
        }
        .template-title  .tap-margin-r {
          margin-right:${i.polished.rem(32)};
        }
      }
      @media only screen and (min-width: 1680px) {
        .homescreen {
            width:${i.polished.rem(1630)};
        }
      }

    `},this.close=()=>{"back"===this.getQueryString("redirect")?i.jimuHistory.browserHistory.back():window.location.href=window.jimuConfig.mountPath},this.isTemplateDisabled=e=>!1,this.onSearch=t=>{const{accessType:s}=this.state,i=s===e.Default,a=0===t.length||t.length>2?t:this.state.searchTextForRequest;this.setState({searchText:t,searchTextForRequest:a,isMyLocalTemplateLoadAll:!1},(()=>{if(t.length>0&&t.length<3)return!1;clearTimeout(this.onSearchTextInputed),this.onSearchTextInputed=setTimeout((()=>{i?this.filterDefaultTemplate():this.refreshAction()}),500)}))},this.handleKeydown=t=>{const s=t.target.value,{accessType:i}=this.state,a=i===e.Default;"Enter"===t.key&&s&&this.setState({searchTextForRequest:s},(()=>{clearTimeout(this.onSearchTextInputed),a?this.filterDefaultTemplate():this.refreshAction()}))},this.clearSearchText=()=>{const{accessType:t,searchTextForRequest:s}=this.state,i=t===e.Default;this.setState({searchText:"",searchTextForRequest:""},(()=>{s&&(clearTimeout(this.onSearchTextInputed),i?this.filterDefaultTemplate():this.refreshAction())}))},this.filterDefaultTemplate=()=>{const{defaultTemplate:e}=this.state,t=e.filter((e=>this._matchearchText(e.title)));this.setState({templates:t})},this.checkUserPrivilege=()=>{const{CheckTarget:e}=i.privilegeUtils;i.privilegeUtils.checkExbAccess(e.AppList).then((e=>{(null==e?void 0:e.capabilities)&&this.setState({capabilities:e.capabilities})}))},this.toggleAlertPopup=()=>{this.setState({isShowAlertPopup:!this.state.isShowAlertPopup,alertPopupMessage:""})},this.filterTemplateByWebmapOrWebsceneUrlParam=e=>this.hasWebmapOrWebsceneUrlParam?e.filter((e=>e.isMapAware)):e,this.state={loading:!1,isShowAlertPopup:!1,alertPopupMessage:"",searchText:"",searchTextForRequest:"",accessType:e.Default,defaultTemplate:[],templates:[],exbAdminTemplates:[],otherTemplate:[],livingAtlasTemplate:[],myPortaltemplates:[],myTemplatesInDevEdtion:[],capabilities:{canCreateExperience:!1,canDeleteExperience:!1,canShareExperience:!1,canUpdateExperience:!1,canViewExperience:!1},esriLivingAtlasGroupId:null,isMyLocalTemplateLoadAll:!1,isShowLivingAtlas:!1,selectedTags:[]};const c=(0,i.getAppStore)().getState().queryObject;this.hasWebmapOrWebsceneUrlParam=!(!(null==c?void 0:c.webmap)&&!(null==c?void 0:c.webscene))}componentDidMount(){this.getDefaultTemplate(),this.checkUserPrivilege(),this.contentNode&&this.contentNode.addEventListener("scroll",this.onScrollHandle.bind(this))}componentDidUpdate(){var e;const{isShowLivingAtlas:t}=this.state;t!==!!(null===(e=(0,i.getAppStore)().getState().portalSelf)||void 0===e?void 0:e.livingAtlasGroupQuery)&&(this.searchLivingAtlasGroups(),this.checkIsShowLivingAtlas())}onScrollHandle(e){const t=e.target.clientHeight,s=e.target.scrollHeight,i=t+e.target.scrollTop+1>s;!this.state.loading&&i&&this.refreshAction(!0)}getQueryString(e){return i.queryString.parse(window.location.search)[e]||""}searchTemplate(e,s=!1,i=t.ArcGISOnline){if(!e)return;let a=null;this.setState({loading:!0});const r=this.getSearchType(i);a=l.appServices.searchApp(e,r),a.then((e=>{const t=e.results;if(!a)return void this.setState({loading:!1});const l=this.initTemplateInfo(t,i);if(this.setTemplateData(l,s,i),this.setState({loading:!1}),window.jimuConfig.isDevEdition){const t=this.checkMyLocalTemplateIsLoadAll(e.nextStart,e.total,i);this.searchMyPortalTemplate(i,t)}}),(()=>{this.setState({loading:!1})}))}render(){const{templates:t,searchText:s,capabilities:a,isShowAlertPopup:l,alertPopupMessage:o,exbAdminTemplates:n,accessType:c,isShowLivingAtlas:p,selectedTags:A}=this.state,{theme:h,intl:g}=this.props,u=this.filterTemplateByWebmapOrWebsceneUrlParam(c===e.ArcGisOnline?n.concat(t):t);return(0,i.jsx)("div",{css:this.getStyle(),className:"widget-choose-template bg-light-300","data-testid":"widget-choose-template"},!this.hasWebmapOrWebsceneUrlParam&&(0,i.jsx)("div",{className:"header-bar"},this.nls("template"),(0,i.jsx)(r.Button,{type:"tertiary","data-testid":"close-button",onClick:this.close,title:this.nls("back")},(0,i.jsx)(f,{size:20}))),(0,i.jsx)("div",{className:"homescreen"},(0,i.jsx)("div",{className:"d-flex search-con top-padding align-items-center"},(0,i.jsx)("span",{className:"flex-grow-1"},this.nls("choseTemplate")),(0,i.jsx)("div",{className:"d-flex"},(0,i.jsx)("div",{className:"banner d-flex position-relative"},(0,i.jsx)(r.TextInput,{prefix:(0,i.jsx)(y,{className:"search-icon position-relative",size:16}),className:"searchbox",placeholder:this.nls("searchPlaceholder"),value:s,allowClear:!0,onKeyDown:e=>{this.handleKeydown(e)},onChange:e=>{this.onSearch(e.target.value)}})))),(0,i.jsx)("div",{className:"header d-flex top-padding"},!this.hasWebmapOrWebsceneUrlParam&&(0,i.jsx)("div",{className:"template-title flex-grow-1"},(0,i.jsx)(r.Navbar,{className:"header-nav-bar-con",border:!1,color:"false",light:!0},(0,i.jsx)(r.Nav,{underline:!0,navbar:!0,justified:!0,fill:!0,"data-testid":"template-menu"},(0,i.jsx)(r.NavItem,{className:"tap-link tap-margin-r",title:this.nls("chooseTemplateDefault"),onClick:()=>{this.filterTemplateChange(e.Default)}},(0,i.jsx)(r.NavLink,{tag:"button",active:c===e.Default},this.nls("chooseTemplateDefault"))),(0,i.jsx)(r.NavItem,{className:"tap-link tap-margin-r",title:this.nls("my"),onClick:()=>{this.filterTemplateChange(e.My)}},(0,i.jsx)(r.NavLink,{tag:"button",active:c===e.My},this.nls("my"))),!window.jimuConfig.isDevEdition&&(0,i.jsx)(r.NavItem,{className:"tap-link tap-margin-r",title:this.nls("myFavorites"),onClick:()=>{this.filterTemplateChange(e.Favorites)}},(0,i.jsx)(r.NavLink,{tag:"button",active:c===e.Favorites},this.nls("myFavorites"))),!window.jimuConfig.isDevEdition&&(0,i.jsx)(r.NavItem,{className:"tap-link tap-margin-r",title:this.nls("myGroup"),onClick:()=>{this.filterTemplateChange(e.MyGroup)}},(0,i.jsx)(r.NavLink,{tag:"button",active:c===e.MyGroup},this.nls("myGroup"))),!window.jimuConfig.isDevEdition&&(0,i.jsx)(r.NavItem,{className:"tap-link tap-margin-r",title:this.nls("myOrganization"),onClick:()=>{this.filterTemplateChange(e.MyOrganization)}},(0,i.jsx)(r.NavLink,{tag:"button",active:c===e.MyOrganization},this.nls("myOrganization"))),(0,i.jsx)(r.NavItem,{className:"tap-link tap-margin-r",title:"ArcGIS Online",onClick:()=>{this.filterTemplateChange(e.ArcGisOnline)}},(0,i.jsx)(r.NavLink,{tag:"button",active:c===e.ArcGisOnline},"ArcGIS Online")),p&&(0,i.jsx)(r.NavItem,{className:"tap-link tap-margin-r",title:this.nls("livingAtlas"),onClick:()=>{this.filterTemplateChange(e.LivingAtlas)}},(0,i.jsx)(r.NavLink,{tag:"button",active:c===e.LivingAtlas},this.nls("livingAtlas"))))))),c===e.Default&&(0,i.jsx)(B,{selectedTags:A,onTagsChange:this.onDefaultTemplateTagChange})),(0,i.jsx)("div",{className:"section position-relative",ref:e=>{this.contentNode=e}},(0,i.jsx)("div",{className:"d-flex template-con homescreen",ref:e=>{this.appListContainer=e}},u.length>0&&u.map(((e,t)=>(0,i.jsx)(m,{key:t,theme:h,info:e,intl:g,accessType:this.state.accessType,disabled:this.isTemplateDisabled(e),onCreateClick:this.onCreateClick,capabilities:a,crateAppByTemplate:this.crateAppByTemplate}))),0===u.length&&!this.state.loading&&(0,i.jsx)(d,{theme:h,intl:g})),(0,i.jsx)("div",{className:"bottom_space"})),this.state.loading&&(0,i.jsx)("div",{className:"loading-con"},(0,i.jsx)("div",{style:{position:"absolute",left:"50%",top:"50%"},className:"jimu-primary-loading"})),(0,i.jsx)(r.AlertPopup,{isOpen:l,title:this.nls("warningPopUpTitle"),hideCancel:!0,toggle:this.toggleAlertPopup},(0,i.jsx)("div",{style:{fontSize:"1rem"}},o)))}}O.scrollTop=0})(),c})())}}}));