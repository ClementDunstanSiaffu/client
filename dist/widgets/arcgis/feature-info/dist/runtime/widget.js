System.register(["jimu-core","jimu-ui","jimu-arcgis"],(function(t,e){var a={},s={},o={};return{setters:[function(t){a.BaseVersionManager=t.BaseVersionManager,a.DataRecordsSelectionChangeMessage=t.DataRecordsSelectionChangeMessage,a.DataSourceComponent=t.DataSourceComponent,a.DataSourceStatus=t.DataSourceStatus,a.DataSourceTypes=t.DataSourceTypes,a.MessageManager=t.MessageManager,a.React=t.React,a.appConfigUtils=t.appConfigUtils,a.css=t.css,a.getAppStore=t.getAppStore,a.jsx=t.jsx},function(t){s.Button=t.Button,s.DataActionDropDown=t.DataActionDropDown,s.Icon=t.Icon,s.WidgetPlaceholder=t.WidgetPlaceholder},function(t){o.loadArcGISJSAPIModules=t.loadArcGISJSAPIModules}],execute:function(){t((()=>{var t={87222:t=>{t.exports='<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 4a.5.5 0 0 0 0 1h8a.5.5 0 0 0 0-1h-8ZM8.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5ZM8 10.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5ZM3.5 10a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2ZM4 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5ZM3.5 4a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2ZM4 15.5 6 14v3l-2-1.5ZM16 15.5 14 14v3l2-1.5Z" fill="#000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M20 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2ZM2 1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z" fill="#000"></path></svg>'},26826:t=>{"use strict";t.exports=o},48891:t=>{"use strict";t.exports=a},30726:t=>{"use strict";t.exports=s}},e={};function r(a){var s=e[a];if(void 0!==s)return s.exports;var o=e[a]={exports:{}};return t[a](o,o.exports,r),o.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var a in e)r.o(e,a)&&!r.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.p="";var i={};return r.p=window.jimuConfig.baseUrl,(()=>{"use strict";r.r(i),r.d(i,{default:()=>v});var t,e,a=r(48891),s=r(30726);function o(t,s,o,r){let i;const n=o.backgroundColor?o.backgroundColor:t.surfaces[1].bg;let u;const d="";let c,l,h=d,p=d,g=d,f=d,S=d,v=d;"custom"===s?(i=o.textColor?o.textColor:t.colors.black,u=o.fontSize,u&&0!==u.distance&&o.fontSizeType!==e.auto&&(c=u.unit,l=u.distance,h=l+c,p=Math.round(1.428*l)+c,g=Math.round(1.142*l)+c,f=l,S=Math.round(.857*l)+c,v=Math.round(.857*l)+c)):"syncWithTheme"===s?(l=d,i=t.colors.black):(l=d,i="");let D="10px",m="auto";return r&&(D="auto",m="10px"),a.css`
    overflow: auto;
    .widget-featureInfo{
      width: 100%;
      height: 100%;
      background-color: ${n};
      color: ${i};
      font-size: ${h};
      .warning-icon{
        position: absolute;
        bottom: 10px;
        right: ${D};
        left: ${m};
      }
      .header-section{
        display: flex;
        justify-content: space-between;
        height: 40px;
        border-bottom: 1px solid #a8a8a8;
        background-color: ${n};
      }
      .data-action-placeholder{
        width: 41px;
      }
      .data-action-dropdown-content{
        width: 41px;
        padding: 9px 7px 0 7px;
      }
      .nav-section{
        flex-grow: 2;
        height: 40px;
        background-color: transparent;
        .nav-btn{
          color: ${t.colors.palette.primary[500]};
        }
        .nav-btn: hover{
          color: ${t.colors.palette.primary[600]};
        }
        .nav-btn:focus{
          box-shadow: none;
        }
      }
      .feature-info-component{
        background-color: ${"transparent"};
        padding: 0;
        .esri-feature__size-container{
          background-color: ${n};
          color: ${i};
        }
        .esri-widget * {
          font-size: ${h};
          color: ${i};
        }
        .esri-widget {
          background-color: transparent !important;
        }
        .esri-feature__title{
          padding: 10px 15px 0 15px;
          margin: auto;
        }
        .esri-feature__content-element{
        }
        .esri-widget__table tr td, .esri-widget__table tr th {
          font-size: ${v};
        }
        .esri-feature__main-container{
        }
        .esri-feature__media-previous:focus{
          outline: none;
        }
        .esri-feature__media-next:focus{
          outline: none;
        }
        .esri-feature__title {
          font-size: ${h};
        }
        .esri-feature h1 {
          font-size: ${p};
        }
        .esri-feature h2 {
          font-size: ${g};
        }
        .esri-feature h3,
        .esri-feature h4,
        .esri-feature h5,
        .esri-feature h6 {
          font-size: ${f};
        }
        .esri-feature p {
          font-size: ${h};
        }

        .esri-feature figcaption {
          font-size: ${v};
        }

        .esri-feature__media-item-title {
          font-size: ${g};
        }
        .esri-feature__media-item-caption {
          font-size: ${S};
        }
        .esri-feature__last-edited-info {
          font-size: ${v};
        }

      }
    }
  `}!function(t){t.syncWithTheme="syncWithTheme",t.usePopupDefined="usePopupDefined",t.custom="custom"}(t||(t={})),function(t){t.auto="auto",t.custom="custom"}(e||(e={}));const n="Feature Info";var u,d=r(26826);!function(t){t.Pending="Pending",t.Fulfilled="Fulfilled",t.Rejected="Rejected"}(u||(u={}));class c extends a.React.PureComponent{constructor(t){super(t),this.state={loadStatus:u.Pending}}componentDidMount(){this.createFeature()}componentDidUpdate(){if(this.feature){const t={popupTemplate:{content:""}};this.feature.graphic=this.props.graphic||t,this.feature.visibleElements=this.props.visibleElements}}destoryFeature(){this.feature&&!this.feature.destroyed&&this.feature.destroy()}createFeature(){let t;return t=this.Feature?Promise.resolve():(0,d.loadArcGISJSAPIModules)(["esri/widgets/Feature"]).then((t=>{[this.Feature]=t})),t.then((()=>{var t,e;const a=document&&document.createElement("div");a.className="jimu-widget",this.refs.featureContainer.appendChild(a);const s=this.props.dataSource.getRootDataSource();this.destoryFeature(),this.feature=new this.Feature({container:a,defaultPopupTemplateEnabled:!0,spatialReference:(null===(e=null===(t=this.props.dataSource)||void 0===t?void 0:t.layer)||void 0===e?void 0:e.spatialReference)||null,map:(null==s?void 0:s.map)||null})})).then((()=>{this.setState({loadStatus:u.Fulfilled})}))}render(){return a.React.createElement("div",{className:"feature-info-component"},a.React.createElement("div",{ref:"featureContainer"}))}}var l=function(t,e,a,s){return new(a||(a=Promise))((function(o,r){function i(t){try{u(s.next(t))}catch(t){r(t)}}function n(t){try{u(s.throw(t))}catch(t){r(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof a?e:new a((function(t){t(e)}))).then(i,n)}u((s=s.apply(t,e||[])).next())}))};class h extends a.React.PureComponent{constructor(t){super(t),this.onDataSourceCreated=t=>{this.dataSource=t,this.previousIndex=this.props.index,this.isFirstLoad=!0,this.setState({dataSourceId:this.dataSource.id})},this.onCreateDataSourceFailed=t=>{},this.onDataSourceInfoChange=t=>{var e;if(!t)return;t.status===a.DataSourceStatus.NotReady&&this.props.onDataSourceStatusChanged(a.DataSourceStatus.NotReady,null===(e=this.dataSource)||void 0===e?void 0:e.getLabel()),this.setState({dataSourceStatus:t.status,dataSourceWidgetQueries:t.widgetQueries,dataSourceVersion:t.version});const s=t.selectedIds&&t.selectedIds[0];s?(this.previousSelectedId=s,this.getDataIndexByObjectId(s).then((t=>{t>-1&&t<this.dataBuffer.count&&this.props.onSelectedRecordIdChanged(t,this.dataSource.id)}))):this.previousSelectedId&&(this.previousSelectedId=null,this.props.onUnselectedRecordIdChanged(this.dataSource.id))},this.state={dataSourceId:null,dataSourceStatus:a.DataSourceStatus.Loaded,dataSourceVersion:void 0,dataSourceWidgetQueries:void 0},this.previousIndex=0,this.previousData={id:null,count:null,index:null,graphic:null,record:null,dataSourceVersion:void 0,dataSourceId:null},this.dataBuffer={count:null,dataMap:{},pagingNum:30},this.isFirstLoad=!1,this.previousSelectedId=null}componentDidMount(){}componentDidUpdate(){return l(this,void 0,void 0,(function*(){if(this.props.useDataSource&&this.state.dataSourceId===this.props.useDataSource.dataSourceId&&this.state.dataSourceStatus===a.DataSourceStatus.Loaded){let t;this.props.index===this.previousIndex?(this.clearData(),t=this.props.index):(this.previousIndex=this.props.index,t=this.props.index);let e=this.getData(t);if(!e)return yield this.dataSource.queryCount({}).then((a=>{const s=a.count;t>=s&&(t=0),this.queryGraphics(this.dataSource,null,t,this.dataBuffer.pagingNum,s).then((t=>{0===t.graphics.length?e=null:(this.addData(t,this.dataSource.id),e=this.getData(t.index)),this.onDataChanged(this.dataSource,e),this.isFirstLoad=!1}))}));this.onDataChanged(this.dataSource,e)}}))}onDataChanged(t,e){var s,o,r,i,n,u;e?(null===(s=this.previousData)||void 0===s?void 0:s.dataSourceId)!==(null==e?void 0:e.dataSourceId)||(null===(o=this.previousData)||void 0===o?void 0:o.id)!==(null==e?void 0:e.id)||(null===(r=this.previousData)||void 0===r?void 0:r.count)!==(null==e?void 0:e.count)||(null===(i=this.previousData)||void 0===i?void 0:i.index)!==(null==e?void 0:e.index)||(null===(n=this.previousData)||void 0===n?void 0:n.dataSourceVersion)!==(null==e?void 0:e.dataSourceVersion)?this.props.onDataChanged(this.dataSource,e,this.isFirstLoad):this.props.onDataSourceStatusChanged(a.DataSourceStatus.Loaded,null===(u=this.dataSource)||void 0===u?void 0:u.getLabel()):this.props.onDataChanged(this.dataSource,e),this.previousData=e}addData(t,e){t.records.forEach(((a,s)=>{const o=t.start+s;this.dataBuffer.dataMap[o]={id:a.getId(),count:this.dataBuffer.count,index:o,graphic:t.graphics[s],record:a,dataSourceId:e,dataSourceVersion:this.state.dataSourceVersion}}))}initData(t){this.dataBuffer.count=t}getData(t){return this.dataBuffer.dataMap[t]}getDataIndexByObjectId(t){return l(this,void 0,void 0,(function*(){let e=-1;if(Object.entries(this.dataBuffer.dataMap).some((a=>{var s;return t===(null===(s=a[1])||void 0===s?void 0:s.id)&&(e=Number(a[0]),!0)})),e<0&&this.dataSource){const a=this.dataSource.getIdField();return this.dataSource.queryCount({where:`${a}<=${t}`}).then((t=>(e=t.count-1,e)))}return Promise.resolve(e)}))}clearData(){this.dataBuffer.count=null,this.dataBuffer.dataMap={}}isEmptyData(){return null===this.dataBuffer.count}getLayerObject(t){if(t.isSelectionView()){const e=t.getMainDataSource();return e.layer?e.layer.load().then((()=>l(this,void 0,void 0,(function*(){return yield Promise.resolve(e.layer)})))):e.createJSAPILayerByDataSource().then((t=>t.load().then((()=>l(this,void 0,void 0,(function*(){return yield Promise.resolve(t)}))))))}return t.layer?t.layer.load().then((()=>l(this,void 0,void 0,(function*(){return yield Promise.resolve(t.layer)})))):t.createJSAPILayerByDataSource().then((t=>t.load().then((()=>l(this,void 0,void 0,(function*(){return yield Promise.resolve(t)}))))))}queryGraphics(t,e,s,o,r){var i;return l(this,void 0,void 0,(function*(){let e,n,u=s;return this.props.onDataSourceStatusChanged(a.DataSourceStatus.Loading,null===(i=this.dataSource)||void 0===i?void 0:i.getLabel()),this.getLayerObject(t).then((e=>l(this,void 0,void 0,(function*(){if(n=e,this.isEmptyData()&&this.initData(r),this.isFirstLoad){const e=t.getSelectedRecordIds()[0];if(void 0!==e)return yield this.getDataIndexByObjectId(e).then((t=>{u=-1===t?0:t}))}})))).then((()=>{e=Math.floor(u/this.dataBuffer.pagingNum)*this.dataBuffer.pagingNum;const a={outFields:["*"],returnGeometry:!0,page:Math.floor(e/o)+1,pageSize:o};return t.query(a)})).then((a=>{const s=a.records;let r;return r=t.layer?t.isSelectionView()||t.getDataSourceJson().isOutputFromWidget?s.map((t=>(t.feature.sourceLayer=n.associatedLayer||n,t.feature.layer=n.associatedLayer||n,t.feature))):s.map((t=>t.feature)):s.map((t=>(t.feature.sourceLayer=n.associatedLayer||n,t.feature))),{index:u,start:e,num:o,graphics:r,records:s}})).catch((t=>(console.warn(t),{graphics:[],records:[]})))}))}getOrderBy(t,e){const s=[];let o;return e&&e.orderBy&&e.orderBy.length>0&&(e.orderBy.forEach((t=>{t.jimuFieldName&&s.push(`${t.jimuFieldName} ${t.order}`)})),o=t.type===a.DataSourceTypes.FeatureLayer?s.join(","):s),o}getQueryParamsFromDataSource(t){return t.getRealQueryParams({},"query")}loadGraphics(t,e){return l(this,void 0,void 0,(function*(){return this.props.onDataSourceStatusChanged(a.DataSourceStatus.Loading),yield(0,d.loadArcGISJSAPIModules)(["esri/layers/FeatureLayer","esri/rest/support/Query"]).then((a=>{const[s,o]=a,r=new o;let i=t.layer;const n=e&&e.where.sql;let u;return r.where=n||"1=1",r.returnGeometry=!1,r.outFields=["*"],u=0===this.props.maxGraphics?null:this.props.maxGraphics,r.num=this.props.limitGraphics?u:null,!i&&t.url&&(i=new s({url:t.url})),i?i.queryFeatures(r).then((t=>t.features)):[]})).catch((t=>(console.warn(t),[])))}))}render(){return a.React.createElement(a.DataSourceComponent,{useDataSource:this.props.useDataSource,query:{},widgetId:this.props.widgetId,onDataSourceCreated:this.onDataSourceCreated,onDataSourceInfoChange:this.onDataSourceInfoChange,onCreateDataSourceFailed:this.onCreateDataSourceFailed})}}class p extends a.BaseVersionManager{constructor(){super(...arguments),this.versions=[{version:"1.1.0",description:"added [styleType] and [fontSizeType]",upgrader:t=>{let e=t;return e=e.set("styleType","usePopupDefined"),e.getIn(["style","fontSize","distance"])||e.getIn(["style","textColor"])?e=e.setIn(["style","fontSizeType"],"custom"):(e=e.setIn(["style","fontSizeType"],"auto"),e=e.setIn(["style","fontSize","distance"],14)),e}}]}}const g=new p;var f=r(87222),S=r.n(f);class v extends a.React.PureComponent{constructor(t){super(t),this.onPreGraphicBtnClick=()=>{let t=this.state.currentDataIndex;t>0&&(this.setState({currentDataIndex:--t}),this.lockSelection=!1)},this.onNextGraphictBtnClick=()=>{let t=this.state.currentDataIndex;t<this.currentData.count-1&&(this.setState({currentDataIndex:++t}),this.lockSelection=!1)},this.onSelectedRecordIdChanged=(t,e)=>{t>-1&&this.dataSource.id===e&&this.setState({currentDataIndex:t})},this.onUnselectedRecordIdChanged=t=>{var e;(null===(e=this.dataSource)||void 0===e?void 0:e.id)===t&&a.MessageManager.getInstance().publishMessage(new a.DataRecordsSelectionChangeMessage(this.props.id,[]))},this.onDataSourceStatusChanged=(t,e)=>{this.setState({loadDataStatus:t,dataSourceLabel:e})},this.onDataChanged=(t,e,s)=>{this.dataSource=t,this.previousData=this.currentData,this.currentData=e,this.setState({currentDataId:this.currentData?this.currentData.id:null,currentDataIndex:this.currentData?this.currentData.index:0,loadDataStatus:a.DataSourceStatus.Loaded}),this.lockSelection||(this.selectGraphic(),this.lockSelection=!0)},this.onCurrentFeatureClick=()=>{this.selectGraphic()},this.previousData=null,this.currentData=null,this.lockSelection=!0,this.warningIcon=`<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">\n                  <path d="M0.5 0.5H25.5V25.5H0.5V0.5Z" fill=${this.props.theme.colors.palette.warning[100]}\n                    stroke="${this.props.theme.colors.palette.warning[300]}"/>\n                  <path d="M12.0995 10.87C12.0462 10.3373 12.4646 9.875 13 9.875C13.5354 9.875 13.9538 10.3373 13.9005 10.87L13.5497 14.3775C13.5215 14.6599 13.2838 14.875 13 14.875C12.7162\n                    14.875 12.4785 14.6599 12.4502 14.3775L12.0995 10.87Z" fill="${this.props.theme.colors.palette.warning[700]}"/>\n                  <path d="M13 17.875C13.5523 17.875 14 17.4273 14 16.875C14 16.3227 13.5523 15.875 13 15.875C12.4477 15.875 12 16.3227 12 16.875C12 17.4273 12.4477 17.875 13 17.875Z"\n                    fill="${this.props.theme.colors.palette.warning[700]}"/>\n                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.66666 19.875C5.91174 19.875 5.42905 19.0705 5.78431 18.4044L12.1176 6.52941C12.4941 5.82353 13.5059 5.82353 13.8824\n                    6.52941L20.2157 18.4044C20.5709 19.0705 20.0883 19.875 19.3333 19.875H6.66666ZM6.66666 18.875L13 7L19.3333 18.875H6.66666Z" fill="${this.props.theme.colors.palette.warning[700]}"/>\n                  </svg>`,this.state={currentDataId:null,currentDataIndex:0,loadDataStatus:a.DataSourceStatus.Loading,dataSourceWidgetId:null,dataSourceLabel:""}}componentDidMount(){}componentDidUpdate(){const t=this.props.useDataSources&&this.props.useDataSources[0];t?this.setState({dataSourceWidgetId:a.appConfigUtils.getWidgetIdByOutputDataSource(t)}):(this.setState({currentDataId:null,currentDataIndex:0}),this.currentData=null)}handleAction(t){}selectGraphic(){var t;const e=null===(t=this.currentData)||void 0===t?void 0:t.record;if(e&&this.dataSource){a.MessageManager.getInstance().publishMessage(new a.DataRecordsSelectionChangeMessage(this.props.id,[e]));const t=this.dataSource.getSelectedRecordIds(),s=e.getId();t.includes(s)||this.dataSource.queryById(s).then((t=>{this.dataSource.selectRecordsByIds([s],[t])}))}}getStyleConfig(){return this.props.config.style?this.props.config.style:{textColor:"",fontSizeType:e.auto,fontSize:null,backgroundColor:""}}render(){var t,e,r;const i=this.props.useMapWidgetIds&&this.props.useMapWidgetIds[0],u=this.props.useDataSources&&this.props.useDataSources[0];let d=null;d=(0,a.jsx)(h,{useDataSource:u,widgetId:this.props.id,index:this.state.currentDataIndex,limitGraphics:this.props.config.limitGraphics,maxGraphics:this.props.config.maxGraphics,onSelectedRecordIdChanged:this.onSelectedRecordIdChanged,onUnselectedRecordIdChanged:this.onUnselectedRecordIdChanged,onDataSourceStatusChanged:this.onDataSourceStatusChanged,onDataChanged:this.onDataChanged});let l=null;if(this.props.config.useMapWidget?i:u){let e=null;this.state.loadDataStatus===a.DataSourceStatus.Loading&&(e=(0,a.jsx)("div",{style:{position:"absolute",left:"50%",top:"50%"},className:"jimu-secondary-loading"}));let o=null,r=null;const i=this.props.intl.formatMessage({id:"featureInfoDataActionLabel",defaultMessage:"{layer} feature info selection"},{layer:(null===(t=this.dataSource)||void 0===t?void 0:t.getLabel())||""}),u=void 0===this.props.enableDataAction||this.props.enableDataAction;this.currentData&&this.currentData.count>0&&u&&(o=(0,a.jsx)("div",{className:"data-action-placeholder"}),r=(0,a.jsx)("div",{className:"data-action-dropdown-content"},(0,a.jsx)(s.DataActionDropDown,{dataName:i,widgetId:this.props.id,dataSource:this.dataSource,records:[this.currentData.record],type:"tertiary"})));let h=null;if(this.currentData&&this.currentData.count>1){const t=this.props.intl.formatMessage({id:"featureNumbers",defaultMessage:"{index} of {count}"},{index:this.currentData.index+1,count:this.currentData.count});h=(0,a.jsx)("div",{className:"nav-section d-flex justify-content-center align-items-center"},(0,a.jsx)(s.Button,{className:"nav-btn",type:"tertiary",size:"sm",onClick:this.onPreGraphicBtnClick}," ","<"," "),(0,a.jsx)("span",null," ",t," "),(0,a.jsx)(s.Button,{className:"nav-btn",type:"tertiary",size:"sm",onClick:this.onNextGraphictBtnClick}," ",">"," "))}let p=null;this.currentData&&(1===this.currentData.count?u:this.currentData.count>1)&&this.state.loadDataStatus!==a.DataSourceStatus.NotReady&&(p=(0,a.jsx)("div",{className:"header-section"},o,h,r));const g={title:this.props.config.title,content:{fields:this.props.config.fields,text:this.props.config.fields,media:this.props.config.media,attachments:this.props.config.attachments,expression:!0},lastEditedInfo:this.props.config.lastEditInfo};let f;if(this.state.loadDataStatus===a.DataSourceStatus.NotReady){const t=this.props.intl.formatMessage({id:"outputDataIsNotGenerated",defaultMessage:"warning"},{outputDsLabel:this.state.dataSourceLabel,sourceWidgetName:this.props.dataSourceWidgetLabel});f=(0,a.jsx)("div",{className:"widget-featureInfo"},(0,a.jsx)(s.WidgetPlaceholder,{icon:S(),message:this.props.intl.formatMessage({id:"_widgetLabel",defaultMessage:n}),widgetId:this.props.id}),(0,a.jsx)(s.Icon,{className:"warning-icon",icon:this.warningIcon,size:26,title:t,currentColor:!1}))}else f=this.currentData&&this.dataSource?(0,a.jsx)("div",{style:{cursor:"pointer"},onClick:this.onCurrentFeatureClick},(0,a.jsx)(c,{graphic:this.currentData.graphic,visibleElements:g,dataSource:this.dataSource})):(0,a.jsx)("div",{className:"no-data-message p-4 font-weight-bold",dangerouslySetInnerHTML:{__html:this.props.config.noDataMessage||this.props.intl.formatMessage({id:"noDeataMessageDefaultText",defaultMessage:"No data found."})}});l=(0,a.jsx)("div",{className:"widget-featureInfo"},e,p,f,(0,a.jsx)("div",{style:{position:"absolute",opacity:0},ref:"mapContainer"},"mapContainer"),(0,a.jsx)("div",{style:{position:"absolute",display:"none"}},d))}else l=(0,a.jsx)("div",{className:"widget-featureInfo"},(0,a.jsx)(s.WidgetPlaceholder,{icon:S(),message:this.props.intl.formatMessage({id:"_widgetLabel",defaultMessage:n}),widgetId:this.props.id})),this.currentData=null;return(0,a.jsx)("div",{css:o(this.props.theme,this.props.config.styleType,this.getStyleConfig(),null===(r=null===(e=(0,a.getAppStore)().getState())||void 0===e?void 0:e.appContext)||void 0===r?void 0:r.isRTL),className:"jimu-widget"},l)}}v.versionManager=g,v.mapExtraStateProps=(t,e)=>{var s,o;const r=e.useDataSources&&e.useDataSources[0],i=a.appConfigUtils.getWidgetIdByOutputDataSource(r);return{dataSourceWidgetLabel:null===(o=null===(s=t.appConfig)||void 0===s?void 0:s.widgets[i])||void 0===o?void 0:o.label}}})(),i})())}}}));