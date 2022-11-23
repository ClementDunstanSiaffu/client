System.register(["jimu-core"],(function(e,r){var t={};return{setters:[function(e){t.css=e.css}],execute:function(){e((()=>{"use strict";var e={891:e=>{e.exports=t}},r={};function A(t){var o=r[t];if(void 0!==o)return o.exports;var a=r[t]={exports:{}};return e[t](a,a.exports,A),a.exports}A.d=(e,r)=>{for(var t in r)A.o(r,t)&&!A.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},A.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),A.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{A.r(o),A.d(o,{Global:()=>r});var e=A(891);const r=r=>{const t=r.theme;return e.css`
    ${t&&e.css`
      /* Scrollbar */
      ::-webkit-scrollbar-track {
        width: 7px;
        height: 7px;
        background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAABCAYAAAASC7TOAAAAFklEQVQYV2NkQAL///+XYmRkfAYTAgA2lgQCRkeKWAAAAABJRU5ErkJggg==');
        &:horizontal {
          background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAHCAYAAADJTCeUAAAAEklEQVQYV2NgQAX///+XQhMCADeNAxg/eOklAAAAAElFTkSuQmCC');
        }
      }

      ::-webkit-scrollbar-thumb {
        background: ${t.colors.palette.light[800]||"#6c7278"};
        transition: background .15s;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: ${t.colors.palette.dark[800]||"#808589"};
      }
    `}
  `}})(),o})())}}}));