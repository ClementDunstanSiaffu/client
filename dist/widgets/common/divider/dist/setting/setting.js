System.register(["jimu-core","jimu-for-builder","jimu-ui/advanced/setting-components","jimu-ui/advanced/style-setting-components","jimu-ui/basic/color-picker","jimu-ui"],(function(t,e){var i={},o={},n={},s={},r={},l={};return{setters:[function(t){i.React=t.React,i.classNames=t.classNames,i.css=t.css,i.jsx=t.jsx,i.polished=t.polished},function(t){o.getAppConfigAction=t.getAppConfigAction},function(t){n.DirectionSelector=t.DirectionSelector,n.SettingRow=t.SettingRow,n.SettingSection=t.SettingSection},function(t){s.InputUnit=t.InputUnit},function(t){r.ThemeColorPicker=t.ThemeColorPicker},function(t){l.DistanceUnits=t.DistanceUnits,l.Option=t.Option,l.Select=t.Select,l.Slider=t.Slider,l.TextInput=t.TextInput,l.defaultMessages=t.defaultMessages}],execute:function(){t((()=>{var t={48891:t=>{"use strict";t.exports=i},23137:t=>{"use strict";t.exports=o},30726:t=>{"use strict";t.exports=l},77756:t=>{"use strict";t.exports=n},55505:t=>{"use strict";t.exports=s},41362:t=>{"use strict";t.exports=r}},e={};function a(i){var o=e[i];if(void 0!==o)return o.exports;var n=e[i]={exports:{}};return t[i](n,n.exports,a),n.exports}a.d=(t,e)=>{for(var i in e)a.o(e,i)&&!a.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},a.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),a.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.p="";var d={};return a.p=window.jimuConfig.baseUrl,(()=>{"use strict";a.r(d),a.d(d,{default:()=>y});var t,e,i,o,n,s=a(48891),r=a(23137),l=a(77756),h=a(55505),p=a(41362),u=a(30726);!function(t){t.Regular="REGULAR",t.Hover="HOVER"}(t||(t={})),function(t){t.Horizontal="Horizontal",t.Vertical="Vertical"}(e||(e={})),function(t){t.Style0="Style0",t.Style1="Style1",t.Style2="Style2",t.Style3="Style3",t.Style4="Style4",t.Style5="Style5",t.Style6="Style6",t.Style7="Style7",t.Style8="Style8",t.Style9="Style9",t.Style10="Style10"}(i||(i={})),function(t){t.None="None",t.Point0="Point0",t.Point1="Point1",t.Point2="Point2",t.Point3="Point3",t.Point4="Point4",t.Point5="Point5",t.Point6="Point6",t.Point7="Point7",t.Point8="Point8"}(o||(o={})),function(t){t.None="None",t.Default="Default",t.Style1="Style1",t.Style2="Style2",t.Style3="Style3",t.Style4="Style4",t.Style5="Style5",t.Style6="Style6",t.Style7="Style7",t.Style8="Style8",t.Style9="Style9",t.Style10="Style10",t.Style11="Style11",t.Style12="Style12",t.Style13="Style13",t.Style14="Style14",t.Style15="Style15",t.Style16="Style16",t.Style17="Style17",t.Style18="Style18",t.Style19="Style19"}(n||(n={}));const c={stroke:"Stroke",endpoints:"End point",startpoints:"Start point",nonePoint:"None",dividerSize:"Size",strokeSolid:"Solid",strokeDashed:"Dashed",strokeDotted:"Dotted",strokeDashdotted:"Dashdotted",strokeLongDashed:"Long dashed",strokeDouble:"Double",strokeThinThick:"Thin thick",strokeThickThin:"Thick thin",strokeTriple:"Triple",pointCircle:"Circle",pointCross:"Cross",pointLine:"Line",pointSquare:"Square",pointDiamond:"Diamond",pointInverted:"Inverted arrow",pointArrow:"Arrow",pointOpenArrow:"Open arrow",pointInvertedArrow:"Inverted open arrow"};class g extends s.React.PureComponent{constructor(t){super(t),this.getStyle=()=>{var t,e;const{theme:i}=this.props;return s.css`
      .scale-con {
        & {
          width: 100%;
          top: ${s.polished.rem(-2)};
        }
        span {
          height: ${s.polished.rem(3)};
          width: 1px;
          background: ${null===(e=null===(t=null==i?void 0:i.colors)||void 0===t?void 0:t.palette)||void 0===e?void 0:e.light[800]};
        }
      }
      .range-number-inp {
        width: ${s.polished.rem(46)};
      }
    `},this.getScale=()=>{const t=[];for(let e=0;e<99;e++)t.push((0,s.jsx)("span",{className:"position-absolute",key:e,style:{left:1*(e+1)+"%"}}));return(0,s.jsx)("div",{className:"scale-con position-absolute left-0 right-0"},t)},this.onChange=t=>{const e=t.target.value;if(!this.checkNumber(e)||e===this.preRangeValue)return!1;if(Number(e)<0||Number(e)>100)return!1;const i=e/100*2+3;this.setState({value:i}),this.preRangeValue=e,clearTimeout(this.updateConfigTimeout),this.updateConfigTimeout=setTimeout((()=>{var t;null===(t=null==this?void 0:this.props)||void 0===t||t.onChange(i)}),100)},this.getRangeValue=()=>{const{value:t}=this.props,e=100*(t-3)/2;return e>0?e:0},this.checkNumber=(t,e=0)=>{if(0===(null==t?void 0:t.length))return!0;if(isNaN(Number(t)))return!1;{const i=Number(t);return Number.isInteger(i)&&i>=e}},this.state={value:(null==t?void 0:t.value)||0}}componentWillUnmount(){clearTimeout(this.updateConfigTimeout)}render(){const{pointStyle:t,intl:e}=this.props,i=this.getRangeValue();return(0,s.jsx)("div",{className:"range-input w-100 position-relative d-flex align-items-center",css:this.getStyle()},(0,s.jsx)("div",{className:"flex-grow-1"},(0,s.jsx)(u.Slider,{title:e("dividerSize"),disabled:t===o.None,value:i,min:0,max:100,step:1,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":i,className:"slider mr-2",onChange:this.onChange})),(0,s.jsx)(u.TextInput,{size:"sm",className:"ml-3 range-number-inp",value:i.toFixed(),onChange:this.onChange}))}}function $(t,e=1.5,i=null){if(!t)return"0px";const o=i?Number(i.split("px")[0]):0;let n=Number(t.split("px")[0]);return n=o>n?o:n,n*e<1?"1px":`${Math.round(n*e)}px`}class S extends s.React.PureComponent{constructor(t){super(t),this.nls=t=>this.props.intl?this.props.intl.formatMessage({id:t,defaultMessage:c[t]}):t,this.getLineStyles=()=>{const{isPointStart:t}=this.props,i=[],n=function(t,i,o=e.Horizontal,n=!0){const r=$(t,1),l=$(t,.5),a=$(t,.1),d=$(t,.3);i=i||"transparent";const h=o===e.Horizontal;let p={None:"None"},u={None:"None"};p.Point0=s.css`
    & {
      width: ${r};
      height: ${r};
      border-radius: 50%;
      background-color: ${i};
      left: ${n?0:"unset"};
      right: ${n?"unset":0};
      top: 50%;
      transform: translateY(-50%);
    }
  `,p.Point1=s.css`
    & {
      width: ${d};
      height: ${r};
      background-color: ${i};
      left: ${n?"4%":"unset"};
      right: ${n?"unset":"4%"};
      top: 50%;
      transform: translateY(-50%);
    }
  `,p.Point2=s.css`
    & {
      width: ${d};
      height: ${r};
      background-color: ${i};
      left: ${n?0:"unset"};
      right: ${n?"unset":0};
      top: 50%;
      transform: translateY(-50%);
    }
  `,p.Point3=s.css`
    & {
      width: ${r};
      height: ${r};
      background-color: ${i};
      left: ${n?0:"unset"};
      right: ${n?"unset":0};
      top: 50%;
      transform: translateY(-50%);
    }
  `,p.Point4=s.css`
    & {
      width: ${$(t,.71)};
      height: ${$(t,.71)};
      background-color: ${i};
      left: ${n?$(t,.2):"unset"};
      right: ${n?"unset":$(t,.2)};
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }
  `;const c=s.css`
    .jimu-rtl & {
      border-color: transparent ${i} transparent transparent;
    }
    & {
      width: 0;
      height: 0;
      border-width: ${l};
      border-style: solid;
      border-color: transparent transparent transparent ${i};
      left: ${n?0:"unset"};
      right: ${n?"unset":`-${$(t,.5)}`};
      top: 50%;
      transform: translateY(-50%);
    }
  `,g=s.css`
    .jimu-rtl & {
      border-color: transparent transparent transparent ${i};
    }
    & {
      width: 0;
      height: 0;
      border-width: ${l};
      border-style: solid;
      border-color: transparent ${i} transparent transparent;
      left: ${n?`-${$(t,.5)}`:"unset"};
      right: ${n?"unset":0};
      top: 50%;
      transform: translateY(-50%);
    }
  `,S=s.css`
    .jimu-rtl & {
      border-top: ${d} solid ${i};
      border-left: ${d} solid ${i};
    }
    .jimu-ltr & {
      border-bottom: ${d} solid ${i};
      border-left: ${d} solid ${i};
    }
    & {
      width: ${$(t,.8)};
      height: ${$(t,.8)};
      left: ${n?`${$(t,.2)}`:"unset"};
      right: ${n?"unset":`-${$(t,.2)}`};
      top: 50%;
      border-radius: ${a};
      transform: translateY(-50%) rotate(45deg);
    }
  `,m=s.css`
    .jimu-rtl & {
      border-right: ${d} solid ${i};
      border-bottom: ${d} solid ${i};
    }
    .jimu-ltr & {
      border-top: ${d} solid ${i};
      border-right: ${d} solid ${i};
    }
    & {
      width: ${$(t,.8)};
      height: ${$(t,.8)};
      left: ${n?`-${$(t,.2)}`:"unset"};
      right: ${n?"unset":`${$(t,.2)}`};
      top: 50%;
      border-radius: ${a};
      transform: translateY(-50%) rotate(45deg);
    }
  `;u.Point0=s.css`
    & {
      width: ${r};
      height: ${r};
      border-radius: 50%;
      background-color: ${i};
      top: ${n?0:"unset"};
      bottom: ${n?"unset":0};
      left: 50%;
      transform: translateX(-50%);
    }
  `,u.Point1=s.css`
    & {
      width: ${r};
      height: ${d};
      background-color: ${i};
      top: ${n?"4%":"unset"};
      bottom: ${n?"unset":"4%"};
      left: 50%;
      transform: translateX(-50%);
    }
  `,u.Point2=s.css`
    & {
      width: ${r};
      height: ${d};
      background-color: ${i};
      top: ${n?0:"unset"};
      bottom: ${n?"unset":0};
      left: 50%;
      transform: translateX(-50%);
    }
  `,u.Point3=s.css`
    & {
      width: ${r};
      height: ${r};
      background-color: ${i};
      top: ${n?0:"unset"};
      bottom: ${n?"unset":0};
      left: 50%;
      transform: translateX(-50%);
    }
  `,u.Point4=s.css`
    & {
      width: ${$(t,.71)};
      height: ${$(t,.71)};
      background-color: ${i};
      top: ${n?$(t,.2):"unset"};
      bottom: ${n?"unset":$(t,.2)};
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
    }
  `;const b=s.css`
    & {
      width: 0;
      height: 0;
      border-width: ${l};
      border-style: solid;
      border-color: transparent transparent ${i} transparent;
      top: ${n?`-${$(t,.5)}`:"unset"};
      bottom: ${n?"unset":0};
      left: 50%;
      transform: translateX(-50%);
    }
  `,y=s.css`
    & {
      width: 0;
      height: 0;
      border-width: ${l};
      border-style: solid;
      border-color: ${i} transparent transparent transparent;
      top: ${n?0:"unset"};
      bottom: ${n?"unset":`-${$(t,.5)}`};
      left: 50%;
      transform: translateX(-50%);
    }
  `,v=s.css`
    .jimu-rtl & {
      border-bottom: ${d} solid ${i};
      border-left: ${d} solid ${i};
    }
    .jimu-ltr & {
      border-bottom: ${d} solid ${i};
      border-right: ${d} solid ${i};
    }
    & {
      width: ${$(t,.8)};
      height: ${$(t,.8)};
      top: ${n?`-${$(t,.2)}`:"unset"};
      bottom: ${n?"unset":`${$(t,.2)}`};
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      border-radius: ${a};
    }
  `,f=s.css`
    .jimu-rtl & {
      border-top: ${d} solid ${i};
      border-right: ${d} solid ${i};
    }
    .jimu-ltr & {
      border-top: ${d} solid ${i};
      border-left: ${d} solid ${i};
    }
    & {
      width: ${$(t,.8)};
      height: ${$(t,.8)};
      top: ${n?`${$(t,.2)}`:"unset"};
      bottom: ${n?"unset":`-${$(t,.2)}`};
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      border-radius: ${a};
    }
  `;let x,P;return n?(x={Point5:c,Point6:g,Point7:S,Point8:m},P={Point5:y,Point6:b,Point7:f,Point8:v}):(x={Point5:g,Point6:c,Point7:m,Point8:S},P={Point5:b,Point6:y,Point7:v,Point8:f}),p=Object.assign(Object.assign({},p),x),u=Object.assign(Object.assign({},u),P),h?p:u}("11px","#fff",e.Horizontal,t);for(const t in n){const e=n[t],s=t===o.None?{value:t}:{style:e,value:t};i.push(s)}return i},this.getStyle=()=>s.css`
      & {
        width: ${s.polished.rem(84)};
      }
      & > div {
        width: 100%;
      }
    `,this.getOptionStyle=()=>s.css`
      & {
        display: block;
        width: 100%;
      }
      &.divider-line-con {
        margin: ${s.polished.rem(8)} 0 ${s.polished.rem(8)} ${s.polished.rem(2)};
        height: ${s.polished.rem(2)};
      }
      .points {
        /* left: 0;
        top: 50%;
        transform: translateY(-50%); */
      }
    `,this.getSelectStyle=()=>s.css`
      .dropdown-menu--inner {
        width: ${s.polished.rem(94)};
      }
      & {
        width: ${s.polished.rem(94)};
      }
    `,this.getDividerLineStyle=()=>{const{isPointStart:t}=this.props;return function(t,e,i,o,n){const r=e?"5.5px":0,l=e?"4.4px":0,a=i?"5.5px":0,d=i?"4.4px":0,h=s.css`
    left: ${r};
    right: ${a};
    top: 50%;
    transform: translateY(-50%);
    &.point-start-Point1,
    &.point-start-Point2,
    &.point-start-Point5 {
      left: 0;
    }
    &.point-end-Point1,
    &.point-end-Point2,
    &.point-end-Point5 {
      right: 0;
    }
    &.point-start-Point7 {
      left: ${l};
    }
    &.point-end-Point7 {
      right: ${d};
    }
  `;s.css`
    top: ${r};
    bottom: ${a};
    left: 50%;
    transform: translateX(-50%);
    &.point-start-Point1,
    &.point-start-Point2,
    &.point-start-Point5 {
      top: 0;
    }
    &.point-end-Point1,
    &.point-end-Point2,
    &.point-end-Point5 {
      bottom: 0;
    }
  `;return h}(0,t,!t)},this.pointTitle={None:this.nls("nonePoint"),Point0:this.nls("pointCircle"),Point1:this.nls("pointCross"),Point2:this.nls("pointLine"),Point3:this.nls("pointSquare"),Point4:this.nls("pointDiamond"),Point5:this.nls("pointInverted"),Point6:this.nls("pointArrow"),Point7:this.nls("pointOpenArrow"),Point8:this.nls("pointInvertedArrow")}}_onLineStyleChange(t){const e=t.target.value;this.props.onChange(e)}render(){const{value:t,className:e,style:i,isPointStart:n}=this.props,r=n?"point-start-":"point-end-";return(0,s.jsx)("div",{className:(0,s.classNames)(e,"style-setting--line-style-selector"),style:i,css:this.getStyle()},(0,s.jsx)(u.Select,{size:"sm",name:"lineType",value:t,title:this.pointTitle[t],onChange:this._onLineStyleChange.bind(this),css:this.getSelectStyle(),"aria-label":this.pointTitle[t]},this.getLineStyles().map(((t,e)=>(0,s.jsx)(u.Option,{"aria-label":t.value,role:"option",tabIndex:e,key:e,value:t.value,title:this.pointTitle[t.value],description:this.pointTitle[t.value]},(0,s.jsx)("div",{className:"w-100 pl-1 pr-1"},t.value===o.None&&(0,s.jsx)("div",{className:"position-relative",css:this.getOptionStyle()},(0,s.jsx)("span",null,this.nls("nonePoint"))),t.value!==o.None&&(0,s.jsx)("div",{className:"position-relative divider-line-con",css:this.getOptionStyle()},(0,s.jsx)("div",{className:(0,s.classNames)("position-absolute divider-line",`${r}${t.value}`),css:this.getDividerLineStyle(),style:{border:"1px solid #fff"}}),(0,s.jsx)("span",{className:"position-absolute points",css:t.style}))))))))}}S.defaultProps={value:o.None,onChange:()=>{}};class m extends s.React.PureComponent{constructor(t){super(t),this.nls=t=>this.props.intl?this.props.intl.formatMessage({id:t,defaultMessage:c[t]}):t,this.getLineStyles=()=>{const t=[],i=function(t,i,o=e.Horizontal,n=!1){const r=o===e.Horizontal,l={},a={};return i=i||"transparent",l.Style0=s.css`
    & {
      border-bottom: ${t} solid ${i};
    }
  `,l.Style1=s.css`
    & {
      border-bottom: ${t} dashed ${i};
    }
  `,l.Style2=s.css`
    & {
      border-bottom: ${t} dotted ${i};
    }
  `,l.Style3=s.css`
    & {
      height: ${t};
      position: relative;
    }
    &:before {
      position: absolute;
      content: '';
      height: ${t};
      left: ${$(t,4)};
      right: 0;
      background-image: repeating-linear-gradient(
        to right,
        ${i} 0,
        ${i} ${$(t,1)},
        transparent 0,
        transparent ${$(t,6)}
      );
    }
    &:after {
      position: absolute;
      content: '';
      height: ${t};
      left: 0;
      right: 0;
      background-image: repeating-linear-gradient(
        to right,
        ${i} 0,
        ${i} ${$(t,3)},
        transparent 0,
        transparent ${$(t,6)}
      );
    }
  `,l.Style6=s.css`
    & {
      height: ${t};
      background-image: repeating-linear-gradient(
        to right,
        ${i} 0,
        ${i} ${$(t,4)},
        transparent 0,
        transparent ${$(t,6)}
      );
    }
  `,l.Style7=s.css`
    & {
      border-color: ${i};
      border-bottom-style: double;
      border-bottom-width: ${n?"4px":t};
    }
  `,l.Style8=s.css`
    & {
      height: ${t};
      min-height: ${n?"6px":"unset"};
      position: relative;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: ${$(t,.2,"4px")};
      background: ${i};
    }
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: ${$(t,.4,"4px")};
      background: ${i};
    }
  `,l.Style9=s.css`
    & {
      height: ${t};
      min-height: ${n?"6px":"unset"};
      position: relative;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: ${$(t,.4,"4px")};
      background: ${i};
    }
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: ${$(t,.2,"4px")};
      background: ${i};
    }
  `,l.Style10=s.css`
    & {
      height: ${t};
      min-height: ${n?"8px":"unset"};
      position: relative;
      background-clip: content-box;
      border-top: ${$(t,.167)} solid ${i};
      border-bottom: ${$(t,.167)} solid ${i};
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      height: ${n?"2px":$(t,.3)};
      background: ${i};
      transform: translateY(-50%);
    }
  `,a.Style0=s.css`
    & {
      border-left: ${t} solid ${i};
    }
  `,a.Style1=s.css`
    & {
      border-left: ${t} dashed ${i};
    }
  `,a.Style2=s.css`
    & {
      border-left: ${t} dotted ${i};
    }
  `,a.Style3=s.css`
    & {
      width: ${t};
      position: relative;
    }
    &:before {
      position: absolute;
      content: '';
      width: ${t};
      top: ${$(t,3.8)};
      bottom: 0;
      background-image: repeating-linear-gradient(
        to bottom,
        ${i} 0,
        ${i} ${$(t,1)},
        transparent 0,
        transparent ${$(t,6)}
      );
    }
    &:after {
      position: absolute;
      content: '';
      width: ${t};
      top: 0;
      bottom: 0;
      background-image: repeating-linear-gradient(
        to bottom,
        ${i} 0,
        ${i} ${$(t,2.5)},
        transparent 0,
        transparent ${$(t,6)}
      );
    }
  `,a.Style6=s.css`
    & {
      width: ${t};
      background-image: repeating-linear-gradient(
        to bottom,
        ${i} 0,
        ${i} ${$(t,4)},
        transparent 0,
        transparent ${$(t,6)}
      );
    }
  `,a.Style7=s.css`
    & {
      border-left: ${t} double ${i};
    }
  `,a.Style8=s.css`
    & {
      width: ${t};
      position: relative;
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${$(t,.2,"4px")};
      background: ${i};
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: ${$(t,.4,"4px")};
      background: ${i};
    }
  `,a.Style9=s.css`
    & {
      width: ${t};
      position: relative;
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${$(t,.4,"4px")};
      background: ${i};
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: ${$(t,.2,"4px")};
      background: ${i};
    }
  `,a.Style10=s.css`
    & {
      width: ${t};
      position: relative;
      background-clip: content-box;
      border-left: ${$(t,.167)} solid ${i};
      border-right: ${$(t,.167)} solid ${i};
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: ${n?"2px":$(t,.3)};
      background: ${i};
      transform: translateX(-50%);
    }
  `,r?l:a}("2px","#fff",e.Horizontal,!0);for(const e in i)t.push({style:i[e],value:e});return t},this.getStyle=()=>s.css`
      & {
        width: ${s.polished.rem(92)};
      }
    `,this.lineTitle={Style0:this.nls("strokeSolid"),Style1:this.nls("strokeDashed"),Style2:this.nls("strokeDotted"),Style3:this.nls("strokeDashdotted"),Style6:this.nls("strokeLongDashed"),Style7:this.nls("strokeDouble"),Style8:this.nls("strokeThinThick"),Style9:this.nls("strokeThickThin"),Style10:this.nls("strokeTriple")}}_onLineStyleChange(t){const e=t.target.value;this.props.onChange(e)}render(){const{value:t,className:e,style:i}=this.props,o=s.css`
      width: 100%;
      margin: 6px 0;
    `;return(0,s.jsx)("div",{className:(0,s.classNames)(e,"style-setting--line-style-selector"),style:i,css:this.getStyle()},(0,s.jsx)(u.Select,{size:"sm",name:"lineType",value:t,title:this.lineTitle[t],onChange:this._onLineStyleChange.bind(this),"aria-label":this.lineTitle[t]},this.getLineStyles().map(((t,e)=>(0,s.jsx)(u.Option,{"aria-label":t.value,tabIndex:e,role:"option",key:e,value:t.value,title:this.lineTitle[t.value]},(0,s.jsx)("div",{css:[t.style,o]}))))))}}m.defaultProps={value:i.Style0,onChange:()=>{}};const b="jimu-widget-";class y extends s.React.PureComponent{constructor(t){var o,l;super(t),this.hasSetLineSize=!1,this.units=[u.DistanceUnits.PIXEL],this.getStyle=t=>{var e,i;return s.css`
      .padding-top-0 {
        padding-top: 0;
      }
      .unit-width {
        width: ${s.polished.rem(60)};
        min-width: ${s.polished.rem(60)};
      }
      .start-end-point .jimu-widget-setting--section-header h6 {
        font-size: ${s.polished.rem(13)};
        color: ${null===(i=null===(e=null==t?void 0:t.colors)||void 0===e?void 0:e.palette)||void 0===i?void 0:i.dark[400]};
      }
    `},this.onSettingChange=(t,e)=>{let i=this.props.config;i=Array.isArray(t)?i.setIn(t,e):i.set(t,e),i.themeStyle.quickStyleType!==n.None&&(i=i.setIn(["themeStyle","quickStyleType"],n.None)),this.props.onSettingChange({id:this.props.id,config:i})},this.onRadioChange=(t,e,i)=>{t.currentTarget.checked&&(this.onSettingChange(e,i),(0,r.getAppConfigAction)().exchangeWidthAndHeight().exec())},this.onDirectionChange=t=>{const i=t?e.Vertical:e.Horizontal,{direction:o}=this.props.config;if(i===o)return!1;this.onSettingChange("direction",i),(0,r.getAppConfigAction)().exchangeWidthAndHeight().exec()},this.translate=(t,e,i)=>{const o=e?u.defaultMessages:c;return this.props.intl.formatMessage({id:t,defaultMessage:o[t]},i)},this.onDividerLineStyleChange=(t,e)=>{this.onSettingChange(["dividerStyle",t],e)},this.onLineStyleChange=t=>{var e,o,n,s,r;const{config:l,id:a}=this.props;if(t===(null===(n=null===(o=null===(e=null==this?void 0:this.props)||void 0===e?void 0:e.config)||void 0===o?void 0:o.strokeStyle)||void 0===n?void 0:n.type))return!1;let d=l.setIn(["strokeStyle","type"],t);const h=t===i.Style7||t===i.Style8||t===i.Style9||t===i.Style10,p=null===(r=null===(s=null==l?void 0:l.strokeStyle)||void 0===s?void 0:s.size)||void 0===r?void 0:r.split("px")[0];this.hasSetLineSize||(h&&Number(p)<8&&(d=d.setIn(["strokeStyle","size"],"8px")),!h&&Number(p)>2&&(d=d.setIn(["strokeStyle","size"],"2px"))),this.props.onSettingChange({id:a,config:d})},this.onStrokeSizeChange=t=>{var e,i,o;const n=`${t.distance}${t.unit}`;if(n===(null===(o=null===(i=null===(e=null==this?void 0:this.props)||void 0===e?void 0:e.config)||void 0===i?void 0:i.strokeStyle)||void 0===o?void 0:o.size)||t.distance<1)return!1;this.onSettingChange(["strokeStyle","size"],n),this.hasSetLineSize=!0},this.onStrokeSizeAccepct=t=>{var e,i,o;const n=`${t.distance}${t.unit}`;if(n===(null===(o=null===(i=null===(e=null==this?void 0:this.props)||void 0===e?void 0:e.config)||void 0===i?void 0:i.strokeStyle)||void 0===o?void 0:o.size)||t.distance<1)return!1;this.onSettingChange(["strokeStyle","size"],n),this.hasSetLineSize=!0},this.onColorChange=t=>{var e,i,o;if(t===(null===(o=null===(i=null===(e=null==this?void 0:this.props)||void 0===e?void 0:e.config)||void 0===i?void 0:i.strokeStyle)||void 0===o?void 0:o.color))return!1;this.onSettingChange(["strokeStyle","color"],t)},this.onPointStyleChange=(t,e)=>{var i,o;if(e===(null===(o=null===(i=null==this?void 0:this.props)||void 0===i?void 0:i.config[t])||void 0===o?void 0:o.pointStyle))return!1;this.onSettingChange([t,"pointStyle"],e)},this.onPointSizeChange=(t,e)=>{var i,o;if(e===(null===(o=null===(i=null==this?void 0:this.props)||void 0===i?void 0:i.config[t])||void 0===o?void 0:o.pointSize))return!1;this.onSettingChange([t,"pointSize"],e)},this.state={isLinkSettingShown:!1,isAdvance:!1,strokeSize:null===(l=null===(o=null==t?void 0:t.config)||void 0===o?void 0:o.strokeStyle)||void 0===l?void 0:l.size}}render(){const{config:t,theme:i,theme2:n,intl:r}=this.props,{direction:a,strokeStyle:d,pointEnd:u,pointStart:c}=t;return(0,s.jsx)("div",{className:(0,s.classNames)(`${b}card-setting`,`${b}setting`),css:this.getStyle(this.props.theme)},(0,s.jsx)(l.SettingSection,null,(0,s.jsx)(l.SettingRow,{role:"group",label:this.translate("direction",!0),"aria-label":this.translate("direction",!0)},(0,s.jsx)(l.DirectionSelector,{vertical:a===e.Vertical,onChange:this.onDirectionChange,"aria-pressed":!0}))),(0,s.jsx)(l.SettingSection,{title:this.translate("style",!0),className:"border-bottom-0"},(0,s.jsx)(l.SettingRow,{role:"group",label:this.translate("color"),"aria-label":this.translate("color")},(0,s.jsx)(p.ThemeColorPicker,{value:null==d?void 0:d.color,specificTheme:n,onChange:this.onColorChange})),(0,s.jsx)(l.SettingRow,{role:"group",label:this.translate("stroke"),"aria-label":this.translate("stroke")},(0,s.jsx)(m,{intl:r,value:(null==d?void 0:d.type)||null,onChange:this.onLineStyleChange,className:"mr-2 f-grow-1"}),(0,s.jsx)("div",{className:"unit-width"},(0,s.jsx)(h.InputUnit,{units:this.units,value:null==d?void 0:d.size,onChange:this.onStrokeSizeChange,className:"item"})))),(0,s.jsx)(l.SettingSection,{className:"pt-0 start-end-point"},(0,s.jsx)(l.SettingRow,{role:"group",label:this.translate("startpoints"),"aria-label":this.translate("startpoints")},(0,s.jsx)("div",{className:"d-flex align-items-center"},(0,s.jsx)(S,{intl:r,value:null==c?void 0:c.pointStyle,isPointStart:!0,onChange:t=>{this.onPointStyleChange("pointStart",t)}}))),(null==c?void 0:c.pointStyle)!==o.None&&(0,s.jsx)(l.SettingRow,{role:"group","aria-label":this.translate("startpoints")},(0,s.jsx)(g,{theme:i,pointStyle:null==c?void 0:c.pointStyle,value:null==c?void 0:c.pointSize,intl:this.translate,onChange:t=>{this.onPointSizeChange("pointStart",t)}})),(0,s.jsx)(l.SettingRow,{role:"group",label:this.translate("endpoints"),"aria-label":this.translate("endpoints")},(0,s.jsx)("div",{className:"d-flex align-items-center"},(0,s.jsx)(S,{intl:r,value:null==u?void 0:u.pointStyle,isPointStart:!1,onChange:t=>{this.onPointStyleChange("pointEnd",t)}}))),(null==u?void 0:u.pointStyle)!==o.None&&(0,s.jsx)(l.SettingRow,{role:"group","aria-label":this.translate("endpoints")},(0,s.jsx)(g,{theme:i,pointStyle:null==u?void 0:u.pointStyle,value:null==u?void 0:u.pointSize,intl:this.translate,onChange:t=>{this.onPointSizeChange("pointEnd",t)}}))))}}})(),d})())}}}));