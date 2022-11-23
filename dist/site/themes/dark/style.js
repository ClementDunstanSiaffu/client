System.register(["jimu-core"],(function(o,r){var e={};return{setters:[function(o){e.css=o.css}],execute:function(){o((()=>{"use strict";var o={891:o=>{o.exports=e}},r={};function t(e){var l=r[e];if(void 0!==l)return l.exports;var a=r[e]={exports:{}};return o[e](a,a.exports,t),a.exports}t.d=(o,r)=>{for(var e in r)t.o(r,e)&&!t.o(o,e)&&Object.defineProperty(o,e,{enumerable:!0,get:r[e]})},t.o=(o,r)=>Object.prototype.hasOwnProperty.call(o,r),t.r=o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})};var l={};return(()=>{t.r(l),t.d(l,{DropdownToggle:()=>r,Global:()=>i,Nav:()=>e,Select:()=>a});var o=t(891);const r=r=>{const e=r.type,t=r.theme,l=t&&t.colors&&t.colors.palette&&{default:{bg:t.colors.palette.light[200],borderColor:t.colors.palette.light[200]},hover:{bg:t.colors.palette.light[100],borderColor:t.colors.palette.light[100]},active:{bg:t.colors.palette.light[200],borderColor:t.colors.palette.primary[700]}};return l?o.css`
    ${(void 0===e||"default"===e)&&o.css`
      background: ${l.default.bg};
      border-color: ${l.default.borderColor};
      &:hover {
        background: ${l.hover.bg};
        border-color: ${l.hover.borderColor};
      }
      &:not(:disabled):not(.disabled):active,
      &:not(:disabled):not(.disabled).active,
      &[aria-expanded="true"] {
        background: ${l.active.bg};
        border-color: ${l.active.borderColor};
      }
    `}
  `:""},e=r=>{const e=r.pills;return o.css`
    ${e&&o.css`
      .nav-item {
        &:not(:first-of-type):not(:last-of-type) {
          .nav-link {
            border-radius: 0;
          }
        }
        &:first-of-type {
          .nav-link {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
        &:last-of-type {
          .nav-link {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
      }
    `}
  `},a=r=>{var e,t,l;const a=r.theme;return o.css`
    .dropdown-button {
      .caret-icon {
        color: ${null===(l=null===(t=null===(e=null==a?void 0:a.colors)||void 0===e?void 0:e.palette)||void 0===t?void 0:t.dark)||void 0===l?void 0:l[600]};
        svg {
          height: 8px;
          width: 8px;
        }
      }
    }
  `},i=r=>{const e=r.theme;return o.css`
    html, body {
      overflow: hidden;
    }
    html.scrollable {
      overflow: auto;
      body {
        overflow: unset;
      }
    }
    /* Scrollbar */
    ${e&&o.css`
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: ${e.colors.palette.light[500]};
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: ${e.colors.palette.light[800]};
      }
    `}
    .jimu-widget-setting--header {
      padding: ${e.sizes[3]} ${e.sizes[3]};
      margin-bottom: 0;
      padding-bottom: 0;
      line-height: 1;
    }
  `}})(),l})())}}}));