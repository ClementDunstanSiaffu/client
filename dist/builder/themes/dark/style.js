System.register(["jimu-core"],(function(o,r){var e={};return{setters:[function(o){e.css=o.css,e.polished=o.polished}],execute:function(){o((()=>{"use strict";var o={8891:o=>{o.exports=e}},r={};function t(e){var l=r[e];if(void 0!==l)return l.exports;var d=r[e]={exports:{}};return o[e](d,d.exports,t),d.exports}t.d=(o,r)=>{for(var e in r)t.o(r,e)&&!t.o(o,e)&&Object.defineProperty(o,e,{enumerable:!0,get:r[e]})},t.o=(o,r)=>Object.prototype.hasOwnProperty.call(o,r),t.r=o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})};var l={};return(()=>{t.r(l),t.d(l,{Bubble:()=>e,DropdownToggle:()=>r,Expression:()=>d,Global:()=>n,Nav:()=>i,Select:()=>a});var o=t(8891);const r=r=>{var e;const t=r.type,l=r.theme,d=(null===(e=null==l?void 0:l.colors)||void 0===e?void 0:e.palette)&&{default:{bg:l.colors.palette.light[200],borderColor:l.colors.palette.light[200]},hover:{bg:l.colors.palette.light[100],borderColor:l.colors.palette.light[100]},active:{bg:l.colors.palette.light[200],borderColor:l.colors.palette.primary[700]}};return d?o.css`
    ${(void 0===t||"default"===t)&&o.css`
      background: ${d.default.bg};
      border-color: ${d.default.borderColor};
      &:hover {
        background: ${d.hover.bg};
        border-color: ${d.hover.borderColor};
      }
      &:not(:disabled):not(.disabled):active,
      &:not(:disabled):not(.disabled).active,
      &[aria-expanded="true"] {
        background: ${d.active.bg};
        border-color: ${d.active.borderColor};
      }
    `}
  `:""},e=r=>{var e,t;const l=r.theme,d=null===(e=null==l?void 0:l.colors)||void 0===e?void 0:e.palette.light[300],i=null===(t=null==l?void 0:l.colors)||void 0===t?void 0:t.palette.light[800];return o.css`
    user-select: none;
    > * {
      user-select: none;
    }
    border-radius: 10px;
    background-color: ${d};
    border-color: ${i};
    &[data-popper-placement^="top"] {
      > .jimu-popper--arrow::after {
        border-top-color: ${d} !important;
      }
    }
    &[data-popper-placement^="bottom"] {
      > .jimu-popper--arrow::after {
        border-bottom-color: ${d} !important;
      }
    }
    &[data-popper-placement^="left"] {
      > .jimu-popper--arrow::after {
        border-left-color: ${d} !important;
      }
    }
    &[data-popper-placement^="right"] {
      > .jimu-popper--arrow::after {
        border-right-color: ${d} !important;
      }
    }
    
  `},d=r=>{var e,t,l,d,i,a;const{theme:n}=r,s=n.colors.palette.light[300],c=null===(l=null===(t=null===(e=n.colors)||void 0===e?void 0:e.palette)||void 0===t?void 0:t.dark)||void 0===l?void 0:l[600],p=null===(a=null===(i=null===(d=n.colors)||void 0===d?void 0:d.palette)||void 0===i?void 0:i.dark)||void 0===a?void 0:a[200],b=n.colors.black;return o.css`
    > * {
      user-select: none;
    }
    width: ${o.polished.rem("285px")};
    height: ${o.polished.rem("500px")};
    color: ${b};
    background: ${s};
    .panel-header {
      background: ${s};
      color: ${c};
      > .actions > .jimu-btn {
        color: ${c};
        & :hover {
          color: ${b};
        }
        &:disabled {
          color: ${p};
        }
      }
    }
    .expression-body {
      height: 100%;
    }
  `},i=r=>{const e=r.pills;return o.css`
    ${e&&o.css`
      border-top-width: 0;
      border-left-width: 0;
      border-right-width: 0;
      .nav-item {
        .nav-link {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    `}
  `},a=r=>{var e,t,l;const d=r.theme;return o.css`
    .dropdown-button {
      .caret-icon {
        color: ${null===(l=null===(t=null===(e=null==d?void 0:d.colors)||void 0===e?void 0:e.palette)||void 0===t?void 0:t.dark)||void 0===l?void 0:l[600]};
        svg {
          height: 8px;
          width: 8px;
        }
      }
    }
  `},n=r=>{const e=r.theme;return o.css`
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
      line-height: 1;
    }
  `}})(),l})())}}}));