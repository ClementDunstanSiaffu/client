System.register(["jimu-core"],(function(e,r){var o={};return{setters:[function(e){o.css=e.css,o.polished=e.polished}],execute:function(){e((()=>{"use strict";var e={891:e=>{e.exports=o}},r={};function t(o){var n=r[o];if(void 0!==n)return n.exports;var s=r[o]={exports:{}};return e[o](s,s.exports,t),s.exports}t.d=(e,r)=>{for(var o in r)t.o(r,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};return(()=>{t.r(n),t.d(n,{Button:()=>r,DropdownToggle:()=>o});var e=t(891);const r=r=>{var o;const t=r.theme,n=r.type||"default";return e.css`
    ${"primary"===n||"danger"===n?(s=null===(o=null==t?void 0:t.colors)||void 0===o?void 0:o[n],e.css`
    box-shadow: 0 2px 8px 1px ${e.polished.rgba(s||"black",.4)};
    &:disabled {
      box-shadow: none;
    }
  `):""}
  `;var s},o=o=>e.css`
    ${!o.nav&&r(o)}
  `})(),n})())}}}));