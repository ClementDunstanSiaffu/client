System.register(["jimu-core","jimu-for-builder/service","jimu-theme","jimu-ui","jimu-ui/basic/item-selector"],(function(e,t){var i={},s={},a={},o={},l={};return{setters:[function(e){i.FormattedDate=e.FormattedDate,i.Immutable=e.Immutable,i.React=e.React,i.SessionManager=e.SessionManager,i.classNames=e.classNames,i.css=e.css,i.defaultMessages=e.defaultMessages,i.getAppStore=e.getAppStore,i.isKeyboardMode=e.isKeyboardMode,i.jsx=e.jsx,i.lodash=e.lodash,i.moduleLoader=e.moduleLoader,i.polished=e.polished,i.privilegeUtils=e.privilegeUtils,i.queryString=e.queryString,i.urlUtils=e.urlUtils,i.version=e.version},function(e){s.AppType=e.AppType,s.SearchType=e.SearchType,s.appServices=e.appServices},function(e){a.useTheme=e.useTheme,a.withTheme=e.withTheme},function(e){o.AlertPopup=e.AlertPopup,o.Button=e.Button,o.ButtonGroup=e.ButtonGroup,o.Card=e.Card,o.CardBody=e.CardBody,o.Container=e.Container,o.Dropdown=e.Dropdown,o.DropdownButton=e.DropdownButton,o.DropdownItem=e.DropdownItem,o.DropdownMenu=e.DropdownMenu,o.DropdownToggle=e.DropdownToggle,o.Modal=e.Modal,o.ModalBody=e.ModalBody,o.ModalFooter=e.ModalFooter,o.ModalHeader=e.ModalHeader,o.Nav=e.Nav,o.NavItem=e.NavItem,o.NavLink=e.NavLink,o.Navbar=e.Navbar,o.Option=e.Option,o.SVG=e.SVG,o.Select=e.Select,o.TagInput=e.TagInput,o.TextArea=e.TextArea,o.TextInput=e.TextInput,o.Tooltip=e.Tooltip,o.defaultMessages=e.defaultMessages,o.hooks=e.hooks},function(e){l.SortOrder=e.SortOrder}],execute:function(){e((()=>{var e={394:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m8 .5 2.373 5.07L16 6.23l-4.16 3.792 1.104 5.478L8 12.773 3.056 15.5l1.102-5.478L0 6.229l5.625-.66L8 .5Z" fill="#000"></path></svg>'},369:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm5 1a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" fill="#000"></path></svg>'},791:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 2a2 2 0 1 0-2 2H4a2 2 0 0 0-2 2v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1 1V7H4v3H3V6a1 1 0 0 1 1-1h3.184a3.05 3.05 0 0 1 .596-1H6a2 2 0 0 0 2-2ZM6 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6 3a2 2 0 1 0-2 2H8a2 2 0 0 0-2 2v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1h1a1 1 0 0 0 1-1v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0 2-2ZM9 6a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm4 8v-4a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v4h1v-3h1v4h2v-4h1v3h1Z" fill="#000"></path></svg>'},962:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v3a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2V4a4 4 0 0 1 4-4ZM5 7h1V4a2 2 0 1 1 4 0v3h1V4a3 3 0 0 0-6 0v3Zm4 0V4a1 1 0 0 0-2 0v3h2Zm3 1H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1ZM7 9h1v1h1v1H8v1h1v1H8v1H7V9Z" fill="#000"></path></svg>'},763:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 2v1h5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9v-4H8v4H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1Zm1 10v3h4a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H8V2H4v2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h4v-3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1ZM7 9h3V6H7v3Zm2-2H8v1h1V7Zm2-1v3h3V6h-3Zm1 2h1V7h-1v1ZM3 9h3V6H3v3Zm2-2H4v1h1V7Z" fill="#000"></path></svg>'},19:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm3.83 3.162c.067.24.01.47-.273.47a.669.669 0 0 0 .16-.55l.012.009c.036.024.071.049.1.071h.001Zm-.371-.95h-.001.001Zm0 0 .206.072a.803.803 0 0 0-.428.158.406.406 0 0 1 .222-.23ZM7.792 1.01c.212-.019.426-.015.638.012l-.054.083-.1-.004c-.173-.007-.462-.02-.553-.006.04-.04.04-.043.042-.047.001-.004.003-.009.028-.038h-.001ZM2.113 11.777c.128.2.266.394.414.58a.918.918 0 0 1 .166-.175 6.77 6.77 0 0 0-.58-.405Zm8.02 2.89a6.986 6.986 0 0 1-7.058-1.695c-.003-.07 0-.08.059-.122 1-.692.512-1.033-1.055-2.047-.123-.084-.179-.132-.19-.165-.049-1.08-.069-1.115-.236-1.41-.09-.157-.223-.39-.426-.903a2.123 2.123 0 0 0-.222-.427 6.967 6.967 0 0 1 1.911-4.701c.1.001.191.006.276.01.44.023.697.036.9-.483.015-.04.06-.16.073-.121.156.009.273.038.369.061.335.083.43.107 1.149-.961.072-.11.126-.232.157-.36.2-.065.405-.119.613-.166-.465.623-.137 1.095.319 1.095.064 0 .22-.067.402-.146.22-.096.482-.21.668-.241l.22.013c.454.03.678.046.981-.35.083-.15.183-.29.3-.416a6.936 6.936 0 0 1 1.548.498c-.294.224-.322.322-.359.45a1.02 1.02 0 0 1-.201.388c-.334.444-.017.803.425 1.138a2.06 2.06 0 0 0-.28.242.59.59 0 0 0-.223-.321.67.67 0 0 0-.735-.596.599.599 0 0 0-.147 1.122c.01.197.12.376.292.473-.145.214-.097.373-.035.58l.025.083c-.023 0-.082-.013-.148-.028a1.419 1.419 0 0 0-.226-.041c-.72 0-.785 1.215-.46 1.543-.734.632-.802.776-.895.971l-.022.046a1.921 1.921 0 0 0-1.248 1.686.5.5 0 0 1-.16.403.53.53 0 0 0-.157.279c-.102.485.146.728.435 1.006.14.137.187.267.235.403.062.172.127.354.393.57.518.432.805.388 1.404.298l.199-.03a2.338 2.338 0 0 1 1.257.134c.09.021.181.057.1.298a.596.596 0 0 0 .133.739.275.275 0 0 1 .11.19c.031.397-.053.484-.186.621-.081.084-.18.186-.284.389v.001Zm.583-8.812-.2-.098.113.209a.838.838 0 0 1-.315.284.668.668 0 0 1-.094.14c.019.025-.069.16-.089.185.682-.151 1.73-.077 1.63.616.186.205.43.35.698.416a.533.533 0 0 1 .656-.356c.072 0 .143.034.212.068.047.023.093.045.138.057.18-.013.356-.06.52-.136a1.301 1.301 0 0 0-.088-.284 1.575 1.575 0 0 0-.27-.038c-.184-.015-.34-.027-.487-.217a.593.593 0 0 1-.914-.493 2.055 2.055 0 0 0-.325-.339c-.326.324-.52.198-.83-.002l-.1-.064a.313.313 0 0 0-.255.052Zm-1.196.124L9.46 5.97a2.155 2.155 0 0 0-.005.147.732.732 0 0 1 .063-.137h.001v-.001Zm1.844 8.159v.001-.001Zm-.241-1.172c.275.324.366.766.241 1.172a6.994 6.994 0 0 0 .786-11.766.082.082 0 0 0-.022.005c-.008.003-.016.006-.024.006 1.222.672.219 2.643-.96 1.935a.87.87 0 0 1-.691.33.781.781 0 0 1-.065.216l.033.098a.798.798 0 0 1 .36.04.95.95 0 0 1 .705.183c.585-.355 1.233.179 1.488.733a.8.8 0 0 1 .72.205.945.945 0 0 1 .935.511 1.3 1.3 0 0 1 .112.342v-.001c.314.902-.943 1.41-1.646 1.118-.571.749-1.988.007-2.121-.763a3.404 3.404 0 0 0-.521.017c-.372.033-.68.06-.944-.26-.085.127-.362.382-.56.564a2.295 2.295 0 0 0-.208.201c-.18.476-.408.548-.63.618-.244.077-.482.153-.646.758a1.9 1.9 0 0 0-.043.332c-.014.223-.025.41-.29.703.24.224.435.492.573.79.172.585.576.531 1.1.462.347-.046.746-.098 1.165.022.075.026.332.082.432.104l.041.009a.954.954 0 0 1 .68 1.316Z" fill="#000"></path></svg>'},73:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.373 5.57 8 .5 5.625 5.57 0 6.23l4.158 3.792L3.056 15.5 8 12.773l4.944 2.727-1.103-5.478L16 6.229l-5.627-.66ZM8 2.857l1.705 3.641 4.002.469-2.957 2.697.788 3.918L8 11.631l-3.539 1.951.79-3.918-2.959-2.697 4.002-.469L8 2.857Z" fill="#000"></path></svg>'},159:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 1h5v5H1V1ZM0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H1a1 1 0 0 1-1-1V1Zm1 9h5v5H1v-5Zm-1 0a1 1 0 0 1 1-1h6v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-5Zm15 0h-5v5h5v-5ZM9 9v6a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H9Zm1-8h5v5h-5V1ZM9 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H9V1Z" fill="#000"></path></svg>'},484:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 2.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM5.5 2a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1h-10ZM5 8.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5Zm.5 5.5a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1h-10Zm-4-4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM3 14.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" fill="#000"></path></svg>'},467:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 12c-2.667 0-5.667-1.333-7-4 1.333-2.667 4.333-4 7-4s5.667 1.333 7 4c-1.333 2.667-4.333 4-7 4Zm0-7c-2.618 0-4.578.967-6 3 1.422 2.033 3.382 3 6 3s4.578-.967 6-3c-1.422-2.033-3.382-3-6-3Zm0 5.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm0-1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="#000"></path></svg>'},788:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.146 4.653a.485.485 0 0 1 .708 0L8 10.24l5.146-5.587a.485.485 0 0 1 .708 0 .538.538 0 0 1 0 .738l-5.5 5.956a.485.485 0 0 1-.708 0l-5.5-5.956a.538.538 0 0 1 0-.738Z" fill="#000"></path></svg>'},959:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4ZM1 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5ZM1.5 9a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1h-10ZM1.5 12a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1h-13Z" fill="#000"></path></svg>'},820:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 13a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4ZM1 9.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5ZM1.5 7a.5.5 0 0 1 0-1h10a.5.5 0 0 1 0 1h-10ZM1.5 4a.5.5 0 0 1 0-1h13a.5.5 0 0 1 0 1h-13Z" fill="#000"></path></svg>'},339:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m8.745 8 6.1 6.1a.527.527 0 1 1-.745.746L8 8.746l-6.1 6.1a.527.527 0 1 1-.746-.746l6.1-6.1-6.1-6.1a.527.527 0 0 1 .746-.746l6.1 6.1 6.1-6.1a.527.527 0 0 1 .746.746L8.746 8Z" fill="#000"></path></svg>'},216:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.226 1.312c-.403-.404-1.044-.417-1.431-.03L2.49 8.587l-.48 2.674a.637.637 0 0 0 .73.73l2.673-.48 7.305-7.306c.387-.387.374-1.028-.03-1.431l-1.462-1.462Zm-8.113 9.575.32-1.781 4.991-4.992 1.462 1.462-4.992 4.991-1.781.32Zm7.473-6.012 1.402-1.4-1.462-1.463-1.401 1.402 1.461 1.461Z" fill="#000"></path><path d="M1.5 14a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1h-13Z" fill="#000"></path></svg>'},309:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.027.516A.522.522 0 0 0 7.5 0a.522.522 0 0 0-.527.516v9.508L4.4 7.527a.535.535 0 0 0-.746 0 .508.508 0 0 0 0 .73L7.5 12l3.846-3.743a.508.508 0 0 0 0-.73.535.535 0 0 0-.746 0l-2.573 2.497V.516ZM1 8v7h13V8h1v8H0V8h1Z" fill="#000"></path></svg>'},933:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 1H1v14h14v-5h-1v4H2V2h4V1Zm4 1h3.242L7.257 7.985l.707.707L14 2.657V6h1V1h-5v1Z" fill="#000"></path></svg>'},750:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0a.5.5 0 0 0-.5.5V7H.5a.5.5 0 0 0 0 1H7v6.5a.5.5 0 0 0 1 0V8h6.5a.5.5 0 0 0 0-1H8V.5a.5.5 0 0 0-.5-.5Z" fill="#000"></path></svg>'},224:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Zm-1.27 4.936a6.5 6.5 0 1 1 .707-.707l4.136 4.137a.5.5 0 1 1-.707.707l-4.137-4.137Z" fill="#000"></path></svg>'},866:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.5 7.5A.5.5 0 0 1 7 7h1.5v4.5h1a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h1V8H7a.5.5 0 0 1-.5-.5Z" fill="#000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm0-1A7 7 0 1 0 8 1a7 7 0 0 0 0 14Z" fill="#000"></path></svg>'},964:e=>{e.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 2.125 14.334 14H1.667L8 2.125Zm-.882-.47a1 1 0 0 1 1.765 0l6.333 11.874A1 1 0 0 1 14.334 15H1.667a1 1 0 0 1-.882-1.47L7.118 1.653ZM8 4.874a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0L8.9 5.87a.905.905 0 0 0-.9-.995Zm1 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" fill="#000"></path></svg>'},891:e=>{"use strict";e.exports=i},325:e=>{"use strict";e.exports=s},796:e=>{"use strict";e.exports=a},726:e=>{"use strict";e.exports=o},878:e=>{"use strict";e.exports=l}},t={};function r(i){var s=t[i];if(void 0!==s)return s.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,r),a.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var i in t)r.o(t,i)&&!r.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="";var n={};return r.p=window.jimuConfig.baseUrl,(()=>{"use strict";r.r(n),r.d(n,{default:()=>nt});var e,t,i,s,a,o,l,p,c,d=r(891);!function(e){e.Me="me",e.NotMe="notme",e.Anyone="anyone",e.MyFavorites="MyFavorites",e.Public="Public",e.Default="Default"}(e||(e={})),function(e){e.AllFolder="AllFolder",e.OtherFolder="OtherFolder"}(t||(t={})),function(e){e.AllGroup="AllGroup",e.Org="Org",e.OtherGroup="OtherGroup"}(i||(i={})),function(e){e.Default="Default",e.My="My",e.Shared="Shared"}(s||(s={})),function(e){e.Modified="modified",e.Title="title",e.NumViews="numViews",e.Created="created"}(a||(a={})),function(e){e.Public="public",e.Private="private",e.Org="org",e.Shared="shared"}(o||(o={})),function(e){e.Org="Org",e.Group="Group",e.OrgAndGroupNotMe="OrgAndGroupNotMe",e.ExbAdmin="ExbAdmin",e.My="My",e.Folder="Folder",e.All="All",e.Favorites="Favorites",e.AllFavorites="AllFavorites",e.PubLic="Public"}(l||(l={})),function(e){e.OrgAdmin="org_admin",e.OrgPublisher="org_publisher",e.OrgUser="org_user",e.CustomRoles="custom_roles"}(p||(p={})),function(e){e.Published="Published",e.Draft="Draft",e.Changed="Changed"}(c||(c={}));var h=r(726);const m=d.React.createContext({deleteApp:e=>{},refreshList:()=>{},duplicateAppItem:e=>{},createApp:e=>{},favoriteTogle:(e,t)=>{return i=void 0,s=void 0,o=function*(){return yield Promise.resolve(!0)},new((a=void 0)||(a=Promise))((function(e,t){function l(e){try{n(o.next(e))}catch(e){t(e)}}function r(e){try{n(o.throw(e))}catch(e){t(e)}}function n(t){var i;t.done?e(t.value):(i=t.value,i instanceof a?i:new a((function(e){e(i)}))).then(l,r)}n((o=o.apply(i,s||[])).next())}));var i,s,a,o},getFolderList:()=>{},isLoadSkeleton:!1,theme:null,skeletonNum:null});var u=r(796);const g={homePageSearch:"Search",newApp:"Create new",labelByModified:"Recent experiences",labelByTitle:"Experiences sorted by title",labelByView:"Experiences sorted by view count",labelByCreateTime:"Experiences sorted by creation time",labelByLastCreated:"Experiences sorted by last created",templateLabelByModified:"Recent templates",templateLabelByTitle:"Templates sorted by title",templateLabelByView:"Templates sorted by view count",templateLabelByCreateTime:"Templates sorted by creation time",templateLabelByLastCreated:"Templates sorted by last created",ownByMe:"Owned by me",ownByAnyone:"Owned by anyone",sharedWithMe:"Shared with me",orderByModified:"Last modified",orderByTitle:"Title",orderByView:"Most views",applistViews:"View count",applistItemViews:"Views",applistView:"view",editInfo:"Edit info",viewDetail:"View details",appListDelete:"Delete",appListName:"Name",appListDescription:"Description",download:"Download",launchApp:"Launch",appListMore:"More",popUpOk:"OK",popUpCancel:"Cancel",popUpTitle:"Warning",popUpDiscription1:"You don't have permission to edit this web experience. Currently, you can only edit your own items.",popUpDiscription2:"You can view or duplicate it.",descriptionRemind:"Here is the description of the item.",itemDeleteRemind:"Are you sure you want to delete this item?",untitledExperience:"Untitled experience",webExperience:"Web Experience",webExperienceTemplate:"Web Experience Template",createExperience:"Create your first experience",toCreate:"Click {createNewElement} to start a new experience",click:"Click",appListEdit:"Edit",everyone:"Shared: Everyone",noOne:"Shared: No One",sharedOrganization:"Shared: Organization",group:"Shared: Group",appListPublished:"Published",appListDraft:"Draft",unpublishedChanges:"Unpublished changes",appTypeTemplate:"Experience Template",appTypeExperience:"Experience",publishedTitle:"This item can be viewed by users you've shared with.",publishedUnsaveTitle:"There are unpublished changes since last publishing.",itemStatusDraft:"Draft",draftStatusTitle:"This item is not published. It can only be viewed by you.",cardView:"Card view",listView:"List view",createNewTitle:"Create a new experience from this template",itemDescribtion:"Here is the description of the item.",favorites:"Favorites",myFavorites:"My favorites",itemInFavorites:"Item in Favorites",addFavorites:"Add to favorites",removeFromFavorites:"Remove from Favorites",noItemsYet:"No items yet.",templateEmptyText:"You can generate a template from an experience in the builder.",sharedEmptyText:"No items are shared with you. ",favoritesEmptyText:"When you find an item you like, click Add to Favorites to see it here.",noPublicItems:"No public items.",publicTemplate:"Public",allApp:"All",myOrg:"Organization",defaultTemplate:"Default",unableDelete:"Item could not be deleted since it is delete protected.",deleteError:"There was a problem deleting this application.",createError:"There was a problem when create new application.",duplicateError:"There was a problem when duplicate application.",noResource:"Resource does not exist or is inaccessible",noSearchResult:"No experiences found. Please try other search criteria.",noTemplates:"No templates found. Please try other search criteria.",actionsLabel:"Import",importAction:"Import from my account",uploadAction:"Import from my computer",importTips:"Import an app from your ArcGIS portal",importApp:"Import App",upgradeApp:"Upgrade App",upgradeBtn:"Upgrade",fileTypeError:"This file type is not supported.",checkVersionError:"Failed to import the app ${APP_NAME} !",importing:"Importing",upgrading:"Upgrading",uploading:"Uploading",upgradeContent:"The apps you select include items built with a higher version of ArcGIS Experience Builder.",upgradeContentFooter:"Click Upgrade to upgrade and import it. Click Cancel to quit.",importUpperVersion:"Failed to import the app {APP_NAME} . This app is created by a newer version {VERSION_NUMBER} of ArcGIS Experience Builder.",importSuccess:"Upgrade and import the app {APP_NAME} successfully!",upgradeFailure:"Failed to upgrade the app {APP_NAME}!",importFailure:"Failed to import the app {APP_NAME}!",exportFailure:"Failed to export the app {APP_NAME}!",appExport:"Export",exportAppSuccess:"Export success!",moreDetails:"More details",importAppVersionErr:"Failed to import the app {TITLE} . This app is created by a newer version {APP_VERSION} of ArcGIS Experience Builder.",importAppPortalUrlErr:"Failed to import the app. This app can only be imported by users of portal: {PORTAL_URL}",importAppTypeErr:"Failed to import app. This is an app template. Please switch to the Templates tab and try again.",importTemplateTypeErr:"Failed to import template. This is an app. Please switch to the Apps tab and try again.",importWidgetVersionErr:"Fail to import. Some widgets used in the app are newer version. App name:[{TITLE}], widget: {ERR_MESSAGE}"};var v=r(325),f=r(339),w=r.n(f);const b=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:w()},i))};var x=r(964),y=r.n(x);const j=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:y()},i))};var S=function(e,t,i,s){return new(i||(i=Promise))((function(a,o){function l(e){try{n(s.next(e))}catch(e){o(e)}}function r(e){try{n(s.throw(e))}catch(e){o(e)}}function n(e){var t;e.done?a(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(l,r)}n((s=s.apply(e,t||[])).next())}))};const I=Object.assign({},g,h.defaultMessages,d.defaultMessages);class N extends d.React.PureComponent{constructor(e){var t,i,s,a;super(e),this.__unmount=!1,this.supportedResourceSuffix={IMAGE:[".png",".jpg",".gif",".jpeg"]},this.getItemData=()=>{const{appItem:e}=this.props;v.appServices.getAppInfo(e).then((e=>{this.updateAppItem(e)}),(e=>{console.error(e)}))},this.updateAppItem=e=>{var t;const{appItem:i,appIndex:s}=this.props;for(const t in e)i[t]=e[t];this.setState({localAppItem:(0,d.Immutable)(i)},(()=>{this.updateState()})),null===(t=null==this?void 0:this.props)||void 0===t||t.updateAppList(i,s)},this.updateState=()=>{const{localAppItem:e}=this.state,t=((null==e?void 0:e.tags)?null==e?void 0:e.tags.asMutable():[]).filter((e=>e||!1));this.setState({currentTitleInput:e.title,currentDescriptInput:e.description?e.description:"",summary:(null==e?void 0:e.snippet)||"",tags:t,ownerFolder:e.ownerFolder||"/"})},this.uploadThumbnail=()=>S(this,void 0,void 0,(function*(){const e=this.getFiles();if(!e)return yield Promise.resolve(!0);const t=d.SessionManager.getInstance().getSessionByUrl(this.props.portalUrl),i={id:this.props.appItem.id,f:"json",token:null==t?void 0:t.token,thumbnail:e};return yield v.appServices.updateAppThumbnail(i,this.props.appItem.owner).then((()=>S(this,void 0,void 0,(function*(){return this.isUpdateThumbnail=!0,yield Promise.resolve(!0)}))),(e=>S(this,void 0,void 0,(function*(){return this.setState({loading:!1}),yield Promise.reject(e)}))))})),this.getFiles=()=>{const e=this.fileInput.current.files;if(!e||!e[0])return!1;const t=e[0].name;if(e[0].size>10485760)return this.setState({errorTipsText:this.nls("fileSizeTips",{maxSize:"10M"}),isShowAlertPopup:!0}),this.fileInput.current.value=null,!1;const i=t.split(".")[t.split(".").length-1],s=`.${i}`;if(!this.supportedResourceSuffix.IMAGE.includes(s.toLowerCase()))return this.setState({errorTipsText:this.nls("editAppErrorMessage")}),this.handleToggle(),!1;const a=new File([e[0]],`thumbnail${(new Date).getTime()}${s}`,{type:`image/${i}`}),o=window.URL.createObjectURL(a);return this.setState({files:o}),a},this.titleInputChange=(e,t=!1)=>{let i=e.target.value;i=i.length>250?i.slice(0,250):i;let s=(0,d.Immutable)(this.state.localAppItem);window.jimuConfig.isDevEdition&&(s=s.set("text","")),t&&(i=/^[ ]*$/.test(i)?this.props.appItem.title:i,i=i.replace(/(^\s*)|(\s*$)/g,"")),s=s.set("title",i),this.setState({localAppItem:s,currentTitleInput:i})},this.descriptInputChange=e=>{let t=(0,d.Immutable)(this.state.localAppItem);window.jimuConfig.isDevEdition&&(t=t.set("text","")),t=t.set("description",e),this.setState({currentDescriptInput:e,localAppItem:t})},this.nls=(e,t)=>this.props.intl?this.props.intl.formatMessage({id:e,defaultMessage:I[e]},t):e,this.onConfirm=()=>{this.setState({loading:!0}),this.uploadThumbnail().then((()=>{this.changeItemsFolder().then((()=>{this.updateAppInfo()}),(e=>{this.setState({loading:!1}),console.error(e)}))}),(e=>{this.setState({loading:!1}),console.error(e)}))},this.updateAppInfo=()=>{const{appIndex:e}=this.props,t=this.state.localAppItem.asMutable({deep:!0});t.clearEmptyFields=!0,(null==t?void 0:t.portalUrl)&&delete t.portalUrl,delete t.thumbnail,v.appServices.updateAppInfo(t).then((()=>{var i;this.isUpdateThumbnail?this.getItemData():null===(i=null==this?void 0:this.props)||void 0===i||i.updateAppList(t,e),this.setState({loading:!1}),this.props.onEditInfoOk()}),(e=>{this.setState({loading:!1}),console.error(e)}))},this.changeItemsFolder=()=>S(this,void 0,void 0,(function*(){const{id:e}=this.props.appItem,t=this.props.appItem.ownerFolder||"/",{ownerFolder:i}=this.state,s={itemId:e,folderId:this.state.ownerFolder,authentication:null};return t!==i&&i?yield v.appServices.changeAppFolder(s).then((()=>S(this,void 0,void 0,(function*(){const e=(0,d.Immutable)(this.state.localAppItem);return e.set("ownerFolder",i),this.setState({localAppItem:e}),yield Promise.resolve(!0)}))),(e=>S(this,void 0,void 0,(function*(){return yield Promise.reject(!1)})))):yield Promise.resolve(!0)})),this.nameOnChange=e=>{let t=e.target.value;t.length>250&&(t=t.slice(0,250)),this.setState({currentTitleInput:t})},this.getUserTags=()=>{if(window.jimuConfig.isDevEdition)return!1;const e=(0,d.getAppStore)().getState().user.username;v.appServices.getUserTags(e).then((e=>{var t;const i=null===(t=null==e?void 0:e.tags)||void 0===t?void 0:t.map((e=>e.tag));this.setState({userTags:i||[]})}))},this.getThumbnailUrl=()=>{const e=this.props.appItem.thumbnail;let t=e;const i=d.SessionManager.getInstance().getSessionByUrl(this.props.portalUrl);return t=t?this.props.portalUrl+"/sharing/rest/content/items/"+this.props.appItem.id+"/info/"+t+"?token="+(null==i?void 0:i.token):this.props.folderUrl+"./dist/runtime/assets/defaultthumb.png",e&&window.jimuConfig.isDevEdition&&(t=window.location.origin+"/apps/"+this.props.appItem.id+"/"+e),t},this.alignButtonWidth=(e,t)=>{this[e]=t},this.handleToggle=()=>{const{isShowAlertPopup:e}=this.state;this.setState({isShowAlertPopup:!e})},this.descriptionEditorFocus=e=>{e.stopPropagation(),this.props.setDescribtionFocusStatus(!0),this.setState({isDescriptionEditorEnabled:!0})},this.editInfoContentClick=e=>{var t;const i=e.target||e.srcElement;e.stopPropagation(),i&&(null===(t=null==i?void 0:i.className)||void 0===t?void 0:t.indexOf("info-content-textarea"))<0&&(this.props.setDescribtionFocusStatus(!1),this.setState({isDescriptionEditorEnabled:!1}))},this.onTagInputChange=e=>{const t=Object.assign({},this.state.localAppItem);t.tags=(0,d.Immutable)(e),this.setState({tags:e,localAppItem:(0,d.Immutable)(t)})},this.onSummaryChange=(e,t=!1)=>{e.stopPropagation();let i=e.target.value;window.jimuConfig.isDevEdition||(i=i.length>250?i.slice(0,250):i);let s=(0,d.Immutable)(this.state.localAppItem);t&&(i=i&&i.replace(/(^\s*)|(\s*$)/g,"")),s=s.set("snippet",i),this.setState({localAppItem:s,summary:i})},this.onFolderChange=e=>{const t=e.target.value;this.setState({ownerFolder:t})},this.getAlertPopupStyle=()=>d.css`
      & {
        font-size: ${d.polished.rem(16)};
      }
      &>div {
        width: ${d.polished.rem(20)};
        margin-right: ${d.polished.rem(12)};
      }
    `,this.state={localAppItem:(0,d.Immutable)(this.props.appItem),currentTitleInput:this.props.appItem.title,currentDescriptInput:this.props.appItem.description?this.props.appItem.description:"",summary:(null===(i=null===(t=null==this?void 0:this.props)||void 0===t?void 0:t.appItem)||void 0===i?void 0:i.snippet)||"",loading:!1,files:"",buttonWidth:"",isShowAlertPopup:!1,isDescriptionEditorEnabled:!1,RichTextEditor:null,tags:(null===(a=null===(s=null==this?void 0:this.props)||void 0===s?void 0:s.appItem)||void 0===a?void 0:a.tags)||[],userTags:[],ownerFolder:this.props.appItem.ownerFolder||"/",errorTipsText:null},this.fileInput=d.React.createRef(),this.isUpdateThumbnail=!1}componentDidMount(){var e;this.getUserTags(),this.getItemData(),null===(e=null==this?void 0:this.context)||void 0===e||e.getFolderList()}getStyle(){const e=this.props.theme,{buttonWidth:t}=this.state,i=e.colors&&e.colors.palette?e.colors.palette.dark[300]:"#9fa4a7",s=e.colors&&e.colors.palette?e.colors.palette.light[300]:"#282828",a=e.colors&&e.colors.palette?e.colors.palette.light[800]:"#6a6a6a",o=e.colors&&e.colors.palette?e.colors.palette.dark[400]:"#a8a8a8",l=e.colors&&e.colors.palette?e.colors.palette.primary[700]:"#00D8ED";return d.css`
      .app-editinfo {
        width: ${d.polished.rem(640)};
        height: auto;
        left: 50%;
        top: 50%;
        margin-left: ${d.polished.rem(-350)};
        transform: translateY(-50%);
        background: ${s};
        border: 1px solid ${a};
        padding-bottom: ${d.polished.rem(30)};
        .info-title {
          height: ${d.polished.rem(54)};
          border-bottom: 1px solid ${a};
          font-weight: 500;
        }

        .info-title-text {
          padding-left: ${d.polished.rem(30)};
          font-size: ${d.polished.rem(16)};
          color: ${o};
          overflow: hidden;
          max-width: 85%;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .info-title-close {
          margin-right: ${d.polished.rem(30)};
          cursor: pointer;
        }
        .input-wrapper {
          border: none;
        }
        .tag-text-input-container {
          -webkit-appearance: none;
        }
        .info-content {
          padding: ${d.polished.rem(40)} ${d.polished.rem(30)} 0;
          height: calc(100% - ${d.polished.rem(55)});

          .info-content-pic {
            width: ${d.polished.rem(240)};
            height: ${d.polished.rem(160)};
            background-size: cover;
            background-position: top center;
            margin-right: ${d.polished.rem(20)};
          }
          .edit-thumbnail-btn {
            width: ${d.polished.rem(240)};
            margin-top: ${d.polished.rem(11)};
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            box-sizing: border-box;
            display: block;
          }
          .edit-thumbnail-btn-con:hover .edit-thumbnail-btn {
            background: ${a};
          }
          .edit-thumbnail-inp {
            bottom: 0;
            left: 0;
            width: ${d.polished.rem(240)};
            height: ${d.polished.rem(34)};
            opacity: 0;
            cursor: pointer;
          }
          .info-content-btn-group {
            padding-top: ${d.polished.rem(36)};
          }

          .info-content-otherinfo {
            width: ${d.polished.rem(350)};

            .info-content-label {
              font-size: ${d.polished.rem(14)};
              line-height: ${d.polished.rem(18)};
              color: ${i};
              font-weight: 600;
              margin-bottom: ${d.polished.rem(10)} !important;
              overflow: hidden;
              text-overflow: ellipsis;
              box-sizing: border-box;
              max-width: ${d.polished.rem(380)};
            }

            .info-title-input {
              margin-bottom: ${d.polished.rem(16)};
            }

            .info-content-text {
            }
            .info-content-textarea-con {
              height: ${d.polished.rem(80)};
              margin-bottom: ${d.polished.rem(16)};
            }
            .info-content-textarea {
              width: ${d.polished.rem(350)};
              height: ${d.polished.rem(80)};
              resize: none;
              padding: ${d.polished.rem(4)} ${d.polished.rem(6)};
              box-sizing: border-box;
              font-size: ${d.polished.rem(14)};
            }
            .focus {
              border-color: ${l};
            }
            .info-content-btn {
              min-width: ${t||d.polished.rem(100)};
            }
            .select-choices-con {
              margin-bottom: ${d.polished.rem(16)};
            }
          }
        }
      }
    `}render(){const e=this.getThumbnailUrl(),t=this.props.theme.colors&&this.props.theme.colors.palette?this.props.theme.colors.palette.dark[400]:"#a8a8a8",{isShowAlertPopup:i,tags:s,userTags:a,summary:o,ownerFolder:l,errorTipsText:r}=this.state,{folderListData:n}=this.props;return(0,d.jsx)("div",{css:this.getStyle(),className:"edit-info-con",onClick:e=>{this.editInfoContentClick(e)},"data-testid":"editInfo"},(0,d.jsx)("div",{className:"app-editinfo position-fixed"},(0,d.jsx)("div",{className:"bg-light-300 info-title align-items-center d-flex justify-content-between"},(0,d.jsx)("div",{className:"info-title-text",title:this.nls("editExperienceInfo")},this.props.isTemplateList?this.nls("editExperienceTemplateInfo"):this.nls("editExperienceInfo")),(0,d.jsx)(h.Button,{icon:!0,type:"tertiary",className:"info-title-close",onClick:e=>{e.stopPropagation(),e.preventDefault(),this.props.onEditInfoCancel()}},(0,d.jsx)(b,{color:t}))),(0,d.jsx)("div",{className:"bg-light-300 info-content"},(0,d.jsx)("div",{className:"d-flex justify-content-center"},(0,d.jsx)("div",null,(0,d.jsx)("div",{"data-testid":"thumbnailCon",className:"info-content-pic",style:{backgroundImage:"url("+(this.state.files||e)+")"}}),(0,d.jsx)("div",{className:"position-relative edit-thumbnail-btn-con"},(0,d.jsx)(h.Button,{className:"edit-thumbnail-btn",title:this.nls("editThumbnail"),onClick:this.updateAppInfo},this.nls("editThumbnail")),(0,d.jsx)("input",{"data-testid":"thumbnailInput",title:this.nls("editThumbnail"),ref:this.fileInput,className:"position-absolute edit-thumbnail-inp",type:"file",accept:".png, .jpeg, .jpg, .gif, .bmp",onChange:this.getFiles}))),(0,d.jsx)("div",{className:"info-content-otherinfo"},(0,d.jsx)("div",{className:"info-content-label",title:this.nls("appListName")},this.nls("appListName")),(0,d.jsx)(h.TextInput,{value:this.state.currentTitleInput,className:"info-title-input",onChange:this.nameOnChange,onBlur:e=>{this.titleInputChange(e,!0)},onKeyUp:e=>{this.titleInputChange(e)}}),(0,d.jsx)("div",{className:"info-content-label",title:this.nls("summaryField")},this.nls("summaryField")),(0,d.jsx)(h.TextArea,{placeholder:this.nls("summaryPlaceholder"),value:o,className:"info-content-textarea form-control mb-3",onBlur:e=>{this.onSummaryChange(e,!0)},onKeyDown:e=>{this.onSummaryChange(e)},onChange:e=>{this.setState({summary:e.target.value})}}),!window.jimuConfig.isDevEdition&&(0,d.jsx)("div",{className:"select-choices-con"},(0,d.jsx)("div",{className:"info-content-label",title:this.nls("tags")},this.nls("tags")),(0,d.jsx)(h.TagInput,{data:s,selectListData:a,onChange:this.onTagInputChange,name:this.nls("tagsLowerCase"),menuProps:{maxHeight:80}})),!window.jimuConfig.isDevEdition&&(0,d.jsx)("div",null,(0,d.jsx)("div",{className:"info-content-label",title:this.nls("saveInFolder")},this.nls("saveInFolder")),(0,d.jsx)(h.Select,{value:l,onChange:this.onFolderChange},n.map((e=>(0,d.jsx)(h.Option,{value:e.value,key:e.value},e.text))))),(0,d.jsx)("div",{className:"d-flex justify-content-end info-content-btn-group"},(0,d.jsx)(h.Button,{type:"primary",className:"info-content-btn mr-2",ref:e=>{this.alignButtonWidth("okButton",e)},onClick:this.onConfirm,title:this.nls("ok")},this.nls("ok")),(0,d.jsx)(h.Button,{className:"info-content-btn",onClick:()=>{this.props.onEditInfoCancel()},ref:e=>{this.alignButtonWidth("cancelButton",e)},title:this.nls("cancel")},this.nls("cancel"))))))),this.state.loading&&(0,d.jsx)("div",{style:{position:"absolute",left:"50%",top:"50%"},className:"jimu-primary-loading"}),(0,d.jsx)(h.AlertPopup,{isOpen:i,hideCancel:!0,toggle:this.handleToggle,hideHeader:!0},(0,d.jsx)("div",{className:"align-middle pt-2 alert-popup-con d-flex ",css:this.getAlertPopupStyle()},(0,d.jsx)("div",null,(0,d.jsx)(j,{className:"align-middle",size:"l",color:"var(--warning-600)"})),(0,d.jsx)("span",{className:"align-middle flex-grow-1"},r))))}}N.contextType=m;const $=(0,u.withTheme)(N);class O extends d.React.PureComponent{constructor(){super(...arguments),this.getStyle=()=>d.css`
      svg {
        color: #fff;
      }
      /* &.modal-header button.close {
        padding: 0;
        margin: 0;
      } */
    `,this.stopPropagation=e=>{e.stopPropagation()}}render(){const{isOpen:e}=this.props,t=this.props.intl?this.props.intl.formatMessage({id:"appListDelete",defaultMessage:g.appListDelete}):g.appListDelete,i=this.props.intl?this.props.intl.formatMessage({id:"popUpCancel",defaultMessage:g.popUpCancel}):g.popUpCancel,s=this.props.intl?this.props.intl.formatMessage({id:"itemDeleteRemind",defaultMessage:g.itemDeleteRemind}):g.itemDeleteRemind;return(0,d.jsx)(m.Consumer,null,(({deleteApp:a})=>(0,d.jsx)(h.Modal,{className:(0,d.classNames)("d-flex justify-content-center"),isOpen:e,centered:!0,toggle:this.props.deleteToggle,onClick:e=>{this.stopPropagation(e)}},(0,d.jsx)(h.ModalHeader,{tag:"h4",toggle:this.props.deleteToggle,className:"item-delete-header",css:this.getStyle()},t),(0,d.jsx)(h.ModalBody,null,s),(0,d.jsx)(h.ModalFooter,null,(0,d.jsx)(h.Button,{type:"danger",onClick:e=>{this.stopPropagation(e),a(this.props.itemId),this.props.deleteToggle()}},t),(0,d.jsx)(h.Button,{type:"secondary",onClick:e=>{this.stopPropagation(e),this.props.deleteToggle()}},i)))))}}var T=r(369),k=r.n(T);const E=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:k()},i))};class M extends d.React.PureComponent{constructor(e){super(e),this.eidtInfoStyle={width:"100%",height:"100%",maxWidth:"5000px",margin:0},this.getStyle=()=>d.css`
      .modal-content {
        background: none;
      }
    `,this.appLaunch=()=>{const e=this.props.isTemplateList?"template":"experience",t=window.jimuConfig.useStructuralUrl?`${window.jimuConfig.mountPath}${e}/${this.props.appItem.id}/`:`${window.jimuConfig.mountPath}${e}/?id=${this.props.appItem.id}`;window.open(t)},this.viewDetails=()=>{const e=`${this.props.portalUrl}/home/item.html?id=${this.props.appItem.id}`;window.open(e)},this.showEditInfo=()=>{setTimeout((()=>{this.setState({isShownEditInfo:!0})}),(0,d.isKeyboardMode)()?250:0)},this.onEditInfoCancel=()=>{this.setState({isShownEditInfo:!1})},this.onEditInfoOk=()=>{this.setState({isShownEditInfo:!1})},this.deleteToggle=()=>{this.setState({isShowDeleteAlertPopup:!this.state.isShowDeleteAlertPopup})},this.setDescribtionFocusStatus=(e=!1)=>{this.setState({isDescriptionEditorFocus:e})},this.editInfoModalClick=e=>{e.stopPropagation(),this.setDescribtionFocusStatus(!1)},this.downloadApp=()=>{const e=d.SessionManager.getInstance().getMainSession(),t=null==e?void 0:e.token,i=`/download/${this.props.appItem.id}?locale=${this.props.intl.locale}&token=${t}`;i&&window.open(i)},this.state={isOpen:!1,isShownEditInfo:!1,isShowDeleteAlertPopup:!1,isDescriptionEditorFocus:!1}}render(){const e=window.jimuConfig.isDevEdition,t=this.state.isShownEditInfo,{editPrivileges:i,isTemplateList:s,updateAppList:a,appIndex:o,isPublish:l,appItem:r}=this.props,{isShowDeleteAlertPopup:n,isDescriptionEditorFocus:p}=this.state;return(0,d.jsx)(m.Consumer,null,(({deleteApp:c,refreshList:m,duplicateAppItem:u})=>(0,d.jsx)("div",{css:this.getStyle(),className:this.props.className},(0,d.jsx)(h.Dropdown,{direction:"right",size:"sm",isOpen:this.state.isOpen,className:"app-list-dropdown",onClick:e=>{e.stopPropagation(),e.preventDefault()},toggle:()=>this.setState({isOpen:!this.state.isOpen})},(0,d.jsx)(h.DropdownToggle,{size:"sm",type:"tertiary",title:this.props.intl?this.props.intl.formatMessage({id:"appListMore",defaultMessage:g.appListMore}):g.appListMore},(0,d.jsx)(E,{className:"app-list-iconfill app-list-icon-margin dropdown-icon",style:{marginRight:"3px"}})),(0,d.jsx)(h.DropdownMenu,{className:"app-list-dropdown"},i.canDuplicate&&(0,d.jsx)(h.DropdownItem,{className:"pb-1",onClick:()=>u(r),title:this.props.intl.formatMessage({id:"duplicate",defaultMessage:h.defaultMessages.duplicate})},this.props.intl.formatMessage({id:"duplicate",defaultMessage:h.defaultMessages.duplicate})),i.canEdit&&(0,d.jsx)(h.DropdownItem,{className:"pb-1",onClick:this.showEditInfo,title:this.props.intl.formatMessage({id:"editInfo",defaultMessage:g.editInfo})},this.props.intl.formatMessage({id:"editInfo",defaultMessage:g.editInfo})),!e&&(0,d.jsx)(h.DropdownItem,{className:"pb-1",onClick:this.viewDetails,title:this.props.intl.formatMessage({id:"viewDetail",defaultMessage:g.viewDetail})},this.props.intl.formatMessage({id:"viewDetail",defaultMessage:g.viewDetail})),i.canDelete&&(0,d.jsx)(h.DropdownItem,{className:"pb-1",onClick:()=>{this.deleteToggle()},title:this.props.intl.formatMessage({id:"appListDelete",defaultMessage:g.appListDelete})},this.props.intl.formatMessage({id:"appListDelete",defaultMessage:g.appListDelete})),e&&l&&(0,d.jsx)(h.DropdownItem,{onClick:this.downloadApp},this.props.intl.formatMessage({id:"download",defaultMessage:g.download})))),t&&(0,d.jsx)(h.Modal,{onClick:e=>{this.editInfoModalClick(e)},disableActivateOverlay:!0,css:this.getStyle(),isOpen:t,style:this.eidtInfoStyle,contentClassName:"h-100 w-100"},(0,d.jsx)($,{appIndex:o,updateAppList:a,appItem:this.props.appItem,portalUrl:this.props.portalUrl,folderUrl:this.props.folderUrl,onEditInfoCancel:this.onEditInfoCancel,intl:this.props.intl,isDescriptionEditorFocus:p,isTemplateList:s,setDescribtionFocusStatus:this.setDescribtionFocusStatus,folderListData:this.props.folderListData,onEditInfoOk:this.onEditInfoOk})),(0,d.jsx)(O,{isOpen:n,deleteToggle:this.deleteToggle,itemId:this.props.appItem.id,intl:this.props.intl}))))}}var A=r(962),P=r.n(A);const D=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:P()},i))};var C=r(763),L=r.n(C);const F=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:L()},i))};var R=r(19),U=r.n(R);const B=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:U()},i))};var V=r(791),_=r.n(V);const G=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:_()},i))},Z=Object.assign({},g,h.defaultMessages,d.defaultMessages);class z extends d.React.PureComponent{constructor(e){super(e),this.toggle=()=>{this.setState({tooltipOpen:!this.state.tooltipOpen})},this.handleItemClick=()=>{const e=this.judgeUserEditPrivileges(this.props.updateGroupItemId);if(this.props.isTemplateList||!this.props.isPrivilegeCheckEnd||e.canEdit)return!1;this.setState({isShowAlertPopup:!0})},this.getCardLinkUrl=()=>{const e=this.judgeUserEditPrivileges(this.props.updateGroupItemId);if(this.props.isTemplateList||!this.props.isPrivilegeCheckEnd||!e.canEdit)return null;let t=this.getQueryString("locale");t=t?`&locale=${t}`:"";const i=this.getQueryString("__env__")?`&__env__=${this.getQueryString("__env__")}`:"";return`${window.jimuConfig.mountPath}builder/?id=${this.props.appItem.id}${t}${i}`},this.handleItemKeydown=e=>{"Enter"!==e.key&&" "!==e.key||this.handleItemClick()},this.editTemplateClick=()=>{if(!this.judgeUserEditPrivileges(this.props.updateGroupItemId).canEdit||!this.props.isPrivilegeCheckEnd)return!1;let e=window.jimuConfig.mountPath+"builder/?id="+this.props.appItem.id;this.getQueryString("locale")&&(e=d.urlUtils.appendQueryParam(e,"locale",this.getQueryString("locale"))),this.getQueryString("__env__")&&(e=d.urlUtils.appendQueryParam(e,"__env__",this.getQueryString("__env__"))),window.location.href=e},this.appLaunch=e=>{e.stopPropagation(),e.preventDefault()},this.checkIsOwner=()=>{const e=(0,d.getAppStore)().getState().user;return!(!e||!this.props.appItem.owner||(null==e?void 0:e.username)!==this.props.appItem.owner)},this.viewDetails=e=>{this.appLaunch(e);const t=`${this.props.portalUrl}/home/item.html?id=${this.props.appItem.id}`;window.open(t)},this.handleToggle=()=>{this.setState({isShowAlertPopup:!this.state.isShowAlertPopup})},this.initExtraState=()=>{const e=`${this.props.portalUrl}/home/item.html?id=${this.props.appItem.id}`;this.setState({detailUrl:e})},this.getThumbnail=()=>{const e=this.props.appItem.thumbnail,{isExbTeamCommonTemplate:t,id:i,isDefaultTemplate:s}=this.props.appItem,{portalUrl:a,folderUrl:o,isTemplateList:l}=this.props;let r=e;const n=l?"templateDefaultthumb.png":"defaultthumb.png",p=d.SessionManager.getInstance().getSessionByUrl(a),c=p&&(null==p?void 0:p.token)?"?token="+p.token:"";return r=r?a+"/sharing/rest/content/items/"+i+"/info/"+e+c:o+`./dist/runtime/assets/${n}`,e&&this.state.isDevEdition&&(r=window.location.origin+"/apps/"+i+"/"+e),s&&(r=e),t&&e&&(r=a+"/sharing/rest/content/items/"+i+"/info/"+e+c),r},this.getPreviewUrl=()=>{const{isTemplateList:e}=this.props,{id:t,isExbTeamCommonTemplate:i}=this.props.appItem;return d.urlUtils.getAppUrl({appId:t,isTemplate:e,isArcGisOnlineTemplate:i})},this.getPreviewTemplateAppUrl=()=>{let e=this.getPreviewUrl();return this.getQueryString("locale")&&(e=d.urlUtils.appendQueryParam(e,"locale",this.getQueryString("locale"))),this.getQueryString("__env__")&&(e=d.urlUtils.appendQueryParam(e,"__env__",this.getQueryString("__env__"))),e},this.getPreviewAppUrl=()=>{const e=this.props.isTemplateList?"template":"experience";let t=window.jimuConfig.useStructuralUrl?`${window.jimuConfig.mountPath}${e}/${this.props.appItem.id}/`:`${window.jimuConfig.mountPath}${e}/?id=${this.props.appItem.id}`;return this.getQueryString("locale")&&(t=d.urlUtils.appendQueryParam(t,"locale",this.getQueryString("locale"))),this.getQueryString("__env__")&&(t=d.urlUtils.appendQueryParam(t,"__env__",this.getQueryString("__env__"))),t},this.getShareState=e=>{const t={shareType:null,tips:this.nls("everyone")};if(!e)return null;switch(e){case"public":t.tips=this.nls("everyone"),t.shareType=o.Public;break;case"private":t.tips=this.nls("noOne"),t.shareType=o.Private;break;case"org":t.tips=this.nls("sharedOrganization"),t.shareType=o.Org;break;case"shared":t.tips=this.nls("group"),t.shareType=o.Shared}return t},this.getIconByShareType=e=>{switch(e){case o.Public:return d.React.createElement(B,{className:"app-list-iconfill mr-0"});case o.Private:return d.React.createElement(D,{className:"app-list-iconfill mr-0"});case o.Org:return d.React.createElement(F,{className:"app-list-iconfill mr-0"});case o.Shared:return d.React.createElement(G,{className:"app-list-iconfill mr-0"})}},this.getPublishStatus=e=>{const t=e.typeKeywords||[];let{publishStatus:i,publishStatusText:s}=this.state;t.forEach((e=>{if(e.includes("status:"))switch(e.split(": ")[1]){case c.Published:i=c.Published,s=this.nls("appListPublished");break;case c.Draft:i=c.Draft,s=this.nls("appListDraft");break;case c.Changed:i=c.Changed,s=this.nls("unpublishedChanges")}})),this.setState({publishStatus:i,publishStatusText:s})},this.isHideEditDropBtn=()=>!!this.state.isDevEdition||!this.props.appItem.isDefaultTemplate&&void 0,this.nls=(e,t)=>this.props.intl.formatMessage({id:e,defaultMessage:Z[e]},t),this.getFavoriteStatus=e=>{const{appItem:t}=this.props;let i=!1;return i=e.includes(t.id),i},this.judgeUserEditPrivileges=(e=(0,d.Immutable)([]))=>{const{appItem:t,capabilities:i}=this.props,s=null==t?void 0:t.userRole,{canUpdateExperience:a,canDeleteExperience:o,canViewExperience:l,canCreateExperience:r}=i,n={canDelete:o||!1,canEdit:a||!1,canCreate:r||!1,canView:l||!1,canDuplicate:!1},c=this.checkIsOwner()||s===p.OrgAdmin&&(null==t?void 0:t.isOrgItem),h=e.asMutable().includes(t.id);return c?n.canDuplicate=!0:h||(n.canDelete=!1,n.canEdit=!1),(0,d.Immutable)(n)},this.state={tooltipOpen:!1,itemSelected:!1,isShowAlertPopup:!1,isDevEdition:window.jimuConfig.isDevEdition,thumbnail:"",detailUrl:"",limitsTips:"",publishStatus:"",publishStatusText:""}}componentDidMount(){this.initExtraState(),this.getPublishStatus(this.props.appItem)}getQueryString(e){return d.queryString.parse(window.location.search)[e]||""}}var H=r(933),Q=r.n(H);const W=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:Q()},i))};var q=r(750),K=r.n(q);const Y=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:K()},i))};var J=r(467),X=r.n(J);const ee=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:X()},i))},te=e=>{const t=d.css`
    .app-link {
      display: block;
      padding: 0;
      text-align: left;
    }
  `;return(0,d.jsx)("div",{className:(0,d.classNames)(null==e?void 0:e.className),css:t},(()=>{const t=(0,d.jsx)(h.Button,{"data-testid":"card-item",className:"app-item-link app-link",href:null==e?void 0:e.href,role:"listitem","aria-label":null==e?void 0:e.title,type:"tertiary","aria-describedby":`${e.a11yMessageId}`},null==e?void 0:e.children),i=(0,d.jsx)("div",{className:"app-link",role:"listitem","aria-label":null==e?void 0:e.title,"aria-describedby":`${e.a11yMessageId}`,onClick:e.onClick,onKeyDown:e.onKeyDown,"data-testid":"card-item"},null==e?void 0:e.children);return(null==e?void 0:e.href)?t:i})())};var ie=r(216),se=r.n(ie);const ae=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:se()},i))};var oe=r(394),le=r.n(oe);const re=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:le()},i))};var ne=r(73),pe=r.n(ne);const ce=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:pe()},i))};class de extends z{render(){const{isDevEdition:e,isShowAlertPopup:t,publishStatus:i,publishStatusText:s}=this.state,{appItem:a}=this.props,{id:o,type:l}=a,{updateAppList:r,appIndex:n}=this.props,p=this.getShareState(this.props.appItem.access),u=this.getFavoriteStatus(this.props.allFavoritesIdData),g=this.judgeUserEditPrivileges(this.props.updateGroupItemId),f=`${o}-message`;return d.React.createElement(m.Consumer,null,(({createApp:m,favoriteTogle:w})=>d.React.createElement(h.Card,{className:"detailview-item",style:{position:"relative",cursor:this.props.isTemplateList?"auto":"pointer"}},d.React.createElement(te,{className:"flex-grow-1 w-100 position-relative card-item-link-con",href:this.getCardLinkUrl(),onClick:this.handleItemClick,onKeyDown:this.handleItemKeydown,a11yMessageId:`${f}`,title:this.props.appItem.title},d.React.createElement("div",{className:"sr-only",id:f},d.React.createElement("div",null,`${s}`),d.React.createElement("div",null,`${this.nls("owner")}: ${this.props.appItem.owner}`),d.React.createElement("div",null,this.nls("updated"),":",d.React.createElement(d.FormattedDate,{value:new Date(this.props.appItem.modified),year:"numeric",month:"2-digit",day:"2-digit"})),d.React.createElement("div",null,`${this.nls("applistItemViews")}: ${this.props.appItem.numViews}`)),d.React.createElement("div",{className:"w-100 app-list-detailview-pic position-relative",style:{backgroundImage:"url("+this.getThumbnail()+")"}},i&&d.React.createElement("div",{className:(0,d.classNames)("publish-status position-absolute text-truncate",i),title:s,"data-testid":"publishStatus"},s)),d.React.createElement(h.CardBody,{className:"w-100 flex-grow-1  justify-content-between flex-column item-message-con"},d.React.createElement("h2",{className:"app-list-h2 item-card-title",title:this.props.appItem.title},this.props.appItem.title),d.React.createElement("div",{className:"app-list-h3 app-list-detailview-name",title:this.props.appItem.owner},this.props.appItem.owner),d.React.createElement("div",{className:"app-list-h3 app-list-detailview-time"},this.props.appItem.modified&&d.React.createElement(d.FormattedDate,{value:new Date(this.props.appItem.modified),year:"numeric",month:"2-digit",day:"2-digit"})))),!this.props.isTemplateList&&d.React.createElement("div",{className:"d-flex justify-content-between align-items-center edit-item-con"},e?d.React.createElement("div",{className:"app-list-h3"}):d.React.createElement("div",{className:"app-list-h3 item-views-number pl-1 pt-1 pb-1",title:`${this.nls("applistItemViews")}: ${this.props.appItem.numViews}`},d.React.createElement(h.Button,{rel:"noreferrer",title:`${this.nls("applistItemViews")}: ${this.props.appItem.numViews}`,target:"_blank",href:`${this.props.portalUrl}/home/item.html?id=${this.props.appItem.id}`,type:"tertiary",className:"border-0 mr-1 pr-1"},d.React.createElement(ee,{className:"app-list-iconfill mr-1"}),d.React.createElement("span",null,this.props.appItem.numViews))),d.React.createElement("div",{className:"d-flex align-items-center item-btn-box"},!e&&d.React.createElement(h.Button,{rel:"noreferrer",title:p.tips,type:"tertiary",className:"pl-1 pr-1 app-item-launch border-0 mr-2",target:"_blank",href:`${this.props.portalUrl}/home/item.html?id=${this.props.appItem.id}`},this.getIconByShareType(p.shareType)),!e&&g.canView&&d.React.createElement(h.Button,{rel:"noreferrer",title:u?this.nls("removeFromFavorites"):this.nls("addFavorites"),type:"tertiary",className:(0,d.classNames)("pl-1 pr-1 app-item-launch border-0 mr-2",{favorite:u}),onClick:e=>{this.appLaunch(e),w(u,o)}},u?d.React.createElement(re,{className:"app-list-iconfill mr-0"}):d.React.createElement(ce,{className:"app-list-iconfill mr-0"})),g.canView&&d.React.createElement(h.Button,{type:"tertiary",rel:"noreferrer",title:this.nls("launchApp"),className:" pl-1 pr-1 app-item-launch border-0 margin-4",target:"_blank",href:this.getPreviewAppUrl()},d.React.createElement(W,{className:"app-list-iconfill mr-0"})),d.React.createElement(M,{appIndex:n,updateAppList:r,className:"app-item-more",portalUrl:this.props.portalUrl,intl:this.props.intl,appItem:this.props.appItem,folderUrl:this.props.folderUrl,isOwner:this.checkIsOwner(),isPublish:i!==c.Draft,isTemplateList:this.props.isTemplateList,folderListData:this.props.folderListData,editPrivileges:g}))),this.props.isTemplateList&&d.React.createElement("div",{className:"d-flex justify-content-between align-items-center edit-item-con edit-item-con-template"},d.React.createElement("div",{className:"item-btn-box template-item-btn-box"},g.canView&&d.React.createElement(h.Button,{type:"tertiary",rel:"noreferrer",title:this.nls("launchApp"),className:"float-left pl-1 pr-1 app-item-launch border-0 mr-2",target:"_blank",href:this.getPreviewTemplateAppUrl()},d.React.createElement(W,{className:"app-list-iconfill mr-0"})),!e&&l!==v.AppType.ExperienceType&&g.canView&&d.React.createElement(h.Button,{rel:"noreferrer",title:u?this.nls("removeFromFavorites"):this.nls("addFavorites"),type:"tertiary",className:(0,d.classNames)("pl-1 pr-1 app-item-launch border-0 mr-2 float-left",{favorite:u}),onClick:e=>{this.appLaunch(e),w(u,o)}},u?d.React.createElement(re,{className:"app-list-iconfill mr-0"}):d.React.createElement(ce,{className:"app-list-iconfill mr-0"})),g.canEdit&&d.React.createElement(h.Button,{rel:"noreferrer",type:"tertiary",className:"float-left pl-1 pr-1 app-item-launch border-0 mr-2",title:this.nls("appListEdit"),onClick:this.editTemplateClick},d.React.createElement(ae,{className:"app-list-iconfill mr-0"})),g.canCreate&&i!==c.Draft&&d.React.createElement(h.Button,{rel:"noreferrer",type:"tertiary",className:"float-left pl-1 pr-1 app-item-launch border-0 mr-2",onClick:e=>{this.appLaunch(e),m(a)},title:this.nls("createNewTitle")},d.React.createElement(Y,{className:"app-list-iconfill mr-0"}))),d.React.createElement("div",{className:"d-flex align-items-center item-btn-box"},d.React.createElement(M,{className:"float-right app-item-more",appIndex:n,updateAppList:r,portalUrl:this.props.portalUrl,intl:this.props.intl,appItem:this.props.appItem,folderUrl:this.props.folderUrl,isOwner:this.checkIsOwner(),isPublish:i!==c.Draft,isTemplateList:this.props.isTemplateList,folderListData:this.props.folderListData,editPrivileges:g}))),d.React.createElement(h.AlertPopup,{isOpen:t,title:this.nls("popUpTitle"),hideCancel:!0,toggle:this.handleToggle},d.React.createElement("div",{style:{fontSize:"1rem"}},this.nls("noEditContentPrivilegesError"))))))}}class he extends d.React.PureComponent{constructor(){super(...arguments),this.renderCardSkeleton=()=>(0,d.jsx)(h.Card,{button:!0,className:"detailview-item",css:this.getStyle()},(0,d.jsx)("div",{className:"h-100 w-100"},(0,d.jsx)("div",{className:"w-100 app-list-detailview-pic position-relative skeleton-pic"}),(0,d.jsx)(h.CardBody,{className:"w-100  justify-content-between flex-column item-message-con",style:{height:"48%"}},(0,d.jsx)("h2",{className:"app-list-h2 item-card-title skeleton-title"}),(0,d.jsx)("div",{className:"app-list-h3 app-list-detailview-name skeleton-name"}),(0,d.jsx)("div",{className:"app-list-h3 app-list-detailview-time skeleton-time"}),(0,d.jsx)("div",{className:"d-flex align-items-center item-btn-box skeleton-btn-box position-relative"},(0,d.jsx)("div",null,(0,d.jsx)("span",{className:"skeleton-btn"}),(0,d.jsx)("span",{className:"skeleton-btn skeleton-lg-btn"})),(0,d.jsx)("div",{className:"text-right flex-grow-1 right-btn-con"},(0,d.jsx)("span",{className:"skeleton-btn"}),(0,d.jsx)("span",{className:"skeleton-btn"}),(0,d.jsx)("span",{className:"skeleton-btn"}),(0,d.jsx)("span",{className:"skeleton-btn"})))))),this.renderListSkeleton=()=>{const e=window.jimuConfig.isDevEdition;return(0,d.jsx)("div",{className:"mb-3 ml-0 mr-0 position-relative app-item-backcolor listview-item item-list-con d-flex",css:this.getStyle()},(0,d.jsx)("div",{className:"p-0 position-absolute app-list-listview-pic-con"},(0,d.jsx)("div",{className:"app-list-listview-pic skeleton-list-pic"})),(0,d.jsx)("div",{className:(0,d.classNames)("d-flex align-items-center item-list-name-con",{"item-list-name-con-dev":e})},(0,d.jsx)("div",{className:"app-list-h2 d-flex align-items-center"},(0,d.jsx)("div",{className:"flex-grow-1 text-truncate skeleton-list-title"}))),(0,d.jsx)("div",{className:"d-flex align-items-center item-list-owner "},(0,d.jsx)("div",{className:"app-list-h3 app-list-listview-name item-list-border-l"},(0,d.jsx)("span",{className:"skeleton-list-name"}))),(0,d.jsx)("div",{className:"d-flex align-items-center item-list-border-l item-list-time"},(0,d.jsx)("div",{className:"app-list-h3 skeleton-list-time"})),!e&&(0,d.jsx)("div",{className:"d-flex align-items-center item-list-border-l app-list-views-con app-list-views"},!this.props.isTemplateList&&(0,d.jsx)("div",{className:"app-list-h3 app-list-listview-view"},(0,d.jsx)("span",{className:"skeleton-btn cir-btn"}),(0,d.jsx)("span",{className:"skeleton-btn skeleton-view-num"}))),(0,d.jsx)("div",{className:(0,d.classNames)("align-items-center d-flex item-list-icon-con justify-content-end skeleton-list-icon-con")},(0,d.jsx)("span",{className:"skeleton-btn cir-btn mr-16"}),(0,d.jsx)("span",{className:"skeleton-btn cir-btn mr-16"}),(0,d.jsx)("span",{className:"skeleton-btn cir-btn mr-16"}),(0,d.jsx)("span",{className:"skeleton-btn cir-btn mr-16"})))}}getStyle(){var e,t,i,s,a,o,l,r,n;const p=this.props.theme;return d.css`
      .skeleton-pic,
      .skeleton-time,
      .skeleton-name,
      .skeleton-title,
      .skeleton-btn,
      .skeleton-list-pic,
      .skeleton-list-title,
      .skeleton-list-name,
      .skeleton-list-time {
        background: ${null===(i=null===(t=null===(e=null==p?void 0:p.colors)||void 0===e?void 0:e.palette)||void 0===t?void 0:t.secondary)||void 0===i?void 0:i[600]};
      }
      .item-message-con {
        .skeleton-title {
          height: ${d.polished.rem(32)};
        }
        .skeleton-name {
          height: ${d.polished.rem(18)};
          width: ${d.polished.rem(173)};
          margin-bottom: ${d.polished.rem(12)};
        }
        .skeleton-time {
          height: ${d.polished.rem(18)};
          width: ${d.polished.rem(120)};
          margin-bottom: ${d.polished.rem(12)};
        }
        .skeleton-btn-box {
          border-top: 1px solid ${null===(o=null===(a=null===(s=null==p?void 0:p.colors)||void 0===s?void 0:s.palette)||void 0===a?void 0:a.secondary)||void 0===o?void 0:o[600]};
          box-sizing: border-box;
          padding-top: ${d.polished.rem(10)};
        }
        .skeleton-btn {
          display: inline-block;
          width: ${d.polished.rem(16)};
          height: ${d.polished.rem(16)};
          border-radius: 50%;
          margin-right: ${d.polished.rem(4)};
        }
        .skeleton-lg-btn {
          border-radius: 0;
          width: ${d.polished.rem(32)};
        }
        .right-btn-con .skeleton-btn {
          margin-right: 0;
          margin-left: ${d.polished.rem(16)};
        }
      }
      &.listview-item {
        .item-list-owner .app-list-listview-name {
          margin-top: 0;
        }
        .app-list-listview-pic-con .skeleton-list-pic {
          background: ${null===(n=null===(r=null===(l=null==p?void 0:p.colors)||void 0===l?void 0:l.palette)||void 0===r?void 0:r.secondary)||void 0===n?void 0:n[600]};
        }
        .skeleton-list-title {
          width: ${d.polished.rem(200)};
          height: ${d.polished.rem(22)};
        }
        .skeleton-list-name {
          display: inline-block;
          width: ${d.polished.rem(120)};
          height: ${d.polished.rem(22)};
        }
        .skeleton-list-time {
          width: ${d.polished.rem(74)};
          height: ${d.polished.rem(22)};
        }
        .cir-btn {
          display: inline-block;
          width: ${d.polished.rem(16)};
          height: ${d.polished.rem(16)};
          border-radius: 50%;
        }
        .skeleton-view-num {
          width: ${d.polished.rem(32)};
          height: ${d.polished.rem(18)};
          margin-left: ${d.polished.rem(4)};
        }
        .mr-16 {
          margin-right: ${d.polished.rem(16)};
        }
      }
    `}render(){return this.props.isCardSkeleton?this.renderCardSkeleton():this.renderListSkeleton()}}class me extends d.React.PureComponent{constructor(){super(...arguments),this.renderSkeleton=()=>{var e;const t=[],i=this.context.skeletonNum||6;for(let s=0;s<i;s++)t.push(d.React.createElement(he,{key:s,theme:null===(e=null==this?void 0:this.context)||void 0===e?void 0:e.theme,isTemplateList:this.props.isTemplateList,isCardSkeleton:!0}));return t}}getViewContent(){var e;const t=this.props.apps.length,{isPrivilegeCheckEnd:i,updateAppList:s}=this.props;return d.React.createElement("div",{className:"app-list-detailview-content","data-testid":"app-item-list-card",role:"list"},t>0&&this.props.apps.map(((e,t)=>d.React.createElement(de,{appIndex:t,updateAppList:s,allFavoritesIdData:this.props.allFavoritesIdData,updateGroupItemId:this.props.updateGroupItemId,portalUrl:this.props.portalUrl,intl:this.props.intl,key:e.id,folderUrl:this.props.folderUrl,appItem:e.asMutable({deep:!0}),itemIdx:t,capabilities:this.props.capabilities,folderListData:this.props.folderListData,isPrivilegeCheckEnd:i,isTemplateList:this.props.isTemplateList}))),(null===(e=null==this?void 0:this.context)||void 0===e?void 0:e.isLoadSkeleton)&&this.renderSkeleton())}render(){const e=this.getViewContent();return d.React.createElement("div",{className:"app-list-detailview"},e)}}me.contextType=m;class ue extends z{render(){const{isDevEdition:e,publishStatus:t,publishStatusText:i}=this.state,{isTemplateList:s,appIndex:a,appItem:o,updateAppList:l}=this.props,{id:r,modified:n,type:p}=o,u=this.getShareState(this.props.appItem.access),g=this.getFavoriteStatus(this.props.allFavoritesIdData),f=this.judgeUserEditPrivileges(this.props.updateGroupItemId),w=`${r}-message`,b=d.css`
      &>.app-item-link {
        cursor: ${s?"auto":"pointer"}
      }
      .app-link {
        display: flex;
        flex: 1;
        width: 100%;
      }
    `;return(0,d.jsx)(m.Consumer,null,(({createApp:m,favoriteTogle:x})=>(0,d.jsx)("div",null,(0,d.jsx)("div",{className:(0,d.classNames)("mb-3 ml-0 mr-0 position-relative app-item-backcolor  listview-item item-list-con d-flex d-block app-item-link"),onMouseEnter:()=>{this.setState({itemSelected:!0})},onMouseLeave:()=>{this.setState({itemSelected:!1})},"data-testid":"list-item",css:b},(0,d.jsx)(te,{className:"d-flex flex-grow-1 list-view-link-con",title:this.props.appItem.title,href:this.getCardLinkUrl(),onClick:this.handleItemClick,onKeyDown:this.handleItemKeydown,a11yMessageId:`${w}`},(0,d.jsx)("div",{className:"sr-only",id:w},(0,d.jsx)("div",null,`${i}`),(0,d.jsx)("div",null,`${this.nls("owner")}: ${this.props.appItem.owner}`),(0,d.jsx)("div",null,this.nls("updated"),":",(0,d.jsx)(d.FormattedDate,{value:new Date(this.props.appItem.modified),year:"numeric",month:"2-digit",day:"2-digit"})),(0,d.jsx)("div",null,`${this.nls("applistItemViews")}: ${this.props.appItem.numViews}`)),(0,d.jsx)("div",{className:"p-0 position-absolute app-list-listview-pic-con"},(0,d.jsx)("div",{className:"app-list-listview-pic",style:{backgroundImage:"url("+this.getThumbnail()+")"}})),(0,d.jsx)("div",{className:(0,d.classNames)("d-flex align-items-center item-list-name-con",{"item-list-name-con-dev":e})},(0,d.jsx)("div",{className:"app-list-h2 d-flex align-items-center",style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:this.props.appItem.title},(0,d.jsx)("div",{className:"flex-grow-1 text-truncate"},this.props.appItem.title),t&&(0,d.jsx)("div",{className:(0,d.classNames)("publish-status text-truncate list-publish-status ",t),title:i,"data-testid":"publishStatus"},i))),(0,d.jsx)("div",{className:"d-flex align-items-center item-list-owner "},(0,d.jsx)("div",{className:"app-list-h3 app-list-listview-name item-list-border-l",title:this.props.appItem.owner},this.props.appItem.owner)),(0,d.jsx)("div",{className:"d-flex align-items-center item-list-border-l item-list-time"},(0,d.jsx)("div",{className:"app-list-h3"},n&&(0,d.jsx)(d.FormattedDate,{value:new Date(this.props.appItem.modified),year:"numeric",month:"2-digit",day:"2-digit"})))),(0,d.jsx)("div",{className:"d-flex"},!e&&(0,d.jsx)("div",{title:`${this.nls("applistItemViews")}: ${this.props.appItem.numViews}`,className:"d-flex align-items-center item-list-border-l app-list-views-con app-list-views"},!s&&(0,d.jsx)("div",{className:"app-list-h3 app-list-listview-view pl-1 pt-1 pb-1"},(0,d.jsx)(h.Button,{rel:"noreferrer",title:`${this.nls("applistItemViews")}: ${this.props.appItem.numViews}`,type:"tertiary",className:"pr-1 border-0 mr-1",target:"_blank",href:`${this.props.portalUrl}/home/item.html?id=${this.props.appItem.id}`},(0,d.jsx)(ee,{className:"app-list-iconfill mr-1"}),(0,d.jsx)("span",null,this.props.appItem.numViews)))),(0,d.jsx)("div",{className:(0,d.classNames)("align-items-center d-flex item-list-icon-con justify-content-end",{templateIconCon:s,decIconCon:e})},!s&&(0,d.jsx)("div",{className:"d-flex align-items-center"},!e&&(0,d.jsx)(h.Button,{rel:"noreferrer",type:"tertiary",title:u.tips,className:"float-right pl-1 pr-1 app-item-launch border-0 mr-2",target:"_blank",href:`${this.props.portalUrl}/home/item.html?id=${this.props.appItem.id}`},this.getIconByShareType(u.shareType)),!e&&f.canView&&(0,d.jsx)(h.Button,{rel:"noreferrer",title:g?this.nls("removeFromFavorites"):this.nls("addFavorites"),type:"tertiary",className:(0,d.classNames)("pl-1 pr-1 app-item-launch border-0 mr-2",{favorite:g}),onClick:e=>{this.appLaunch(e),x(g,r)}},g?(0,d.jsx)(re,{className:"app-list-iconfill mr-0"}):(0,d.jsx)(ce,{className:"app-list-iconfill mr-0"})),f.canView&&(0,d.jsx)(h.Button,{"data-testid":"launchApp",rel:"noreferrer",title:this.nls("launchApp"),className:"float-right  btn  app-item-launch border-0 margin-4",type:"tertiary",target:"_blank",href:this.getPreviewAppUrl()},(0,d.jsx)(W,{className:"app-list-iconfill mr-0"})),(0,d.jsx)(M,{updateAppList:l,appIndex:a,className:"float-right mr-2",portalUrl:this.props.portalUrl,intl:this.props.intl,appItem:this.props.appItem,folderUrl:this.props.folderUrl,isOwner:this.checkIsOwner(),isPublish:t!==c.Draft,isTemplateList:s,folderListData:this.props.folderListData,editPrivileges:f})),s&&(0,d.jsx)("div",{className:(0,d.classNames)("d-flex align-items-center justify-content-end",!this.checkIsOwner()&&"icon-con-padding-r")},f.canView&&(0,d.jsx)(h.Button,{type:"tertiary",rel:"noreferrer",title:this.nls("launchApp"),className:"float-right pl-1 pr-1 app-item-launch border-0 mr-2",target:"_blank",href:this.getPreviewTemplateAppUrl()},(0,d.jsx)(W,{className:"app-list-iconfill mr-0"})),!e&&p!==v.AppType.ExperienceType&&f.canView&&(0,d.jsx)(h.Button,{rel:"noreferrer",title:g?this.nls("removeFromFavorites"):this.nls("addFavorites"),type:"tertiary",className:(0,d.classNames)("pl-1 pr-1 app-item-launch border-0 mr-2 float-right",{favorite:g}),onClick:e=>{this.appLaunch(e),x(g,r)}},g?(0,d.jsx)(re,{className:"app-list-iconfill mr-0"}):(0,d.jsx)(ce,{className:"app-list-iconfill mr-0"})),f.canEdit&&(0,d.jsx)(h.Button,{rel:"noreferrer",type:"tertiary",className:"float-right pl-1 pr-1 app-item-launch border-0 mr-2",title:this.nls("appListEdit"),onClick:this.editTemplateClick},(0,d.jsx)(ae,{className:"app-list-iconfill mr-0"})),f.canCreate&&t!==c.Draft&&(0,d.jsx)(h.Button,{rel:"noreferrer",type:"tertiary",className:"float-right pl-1 pr-1 app-item-launch border-0 margin-4",title:this.nls("createNewTitle"),onClick:e=>{this.appLaunch(e),m(o)}},(0,d.jsx)(Y,{className:"app-list-iconfill mr-0"})),(0,d.jsx)(M,{className:"float-right mr-2",updateAppList:l,appIndex:a,portalUrl:this.props.portalUrl,intl:this.props.intl,appItem:this.props.appItem,folderUrl:this.props.folderUrl,isOwner:this.checkIsOwner(),isTemplateList:s,isPublish:t!==c.Draft,folderListData:this.props.folderListData,editPrivileges:f})))),(0,d.jsx)(h.AlertPopup,{isOpen:this.state.isShowAlertPopup,title:this.nls("popUpTitle"),hideCancel:!0,toggle:this.handleToggle},(0,d.jsx)("div",{style:{fontSize:"1rem"}},this.nls("noEditContentPrivilegesError")))))))}}class ge extends d.React.PureComponent{constructor(e){super(e),this.renderSkeleton=()=>{var e;const t=this.context.skeletonNum||6,i=[];for(let s=0;s<t;s++)i.push(d.React.createElement(he,{key:s,theme:null===(e=null==this?void 0:this.context)||void 0===e?void 0:e.theme,isCardSkeleton:!1,isTemplateList:this.props.isTemplateList}));return i},this.toggle=()=>{this.setState({tooltipOpen:!this.state.tooltipOpen})},this.state={tooltipOpen:!1}}getViewContent(){const e=this.props.apps.length,{isPrivilegeCheckEnd:t,updateAppList:i}=this.props;if(e<1)return null;{let e=null,s=null;return e=this.props.apps.map(((e,s)=>d.React.createElement(ue,{appIndex:s,updateAppList:i,allFavoritesIdData:this.props.allFavoritesIdData,updateGroupItemId:this.props.updateGroupItemId,portalUrl:this.props.portalUrl,folderUrl:this.props.folderUrl,key:e.id,itemIdx:s,appItem:e.asMutable({deep:!0}),intl:this.props.intl,capabilities:this.props.capabilities,folderListData:this.props.folderListData,isPrivilegeCheckEnd:t,isTemplateList:this.props.isTemplateList}))),s=d.React.createElement(h.Container,{className:"app-list-listview-container",role:"list",style:{maxWidth:"100%"}},e),s}}render(){var e;const t=this.getViewContent();return d.React.createElement("div",{className:"app-list-listview w-100","data-testid":"app-item-list-list"},t,d.React.createElement(h.Container,{className:"app-list-listview-container",style:{maxWidth:"100%"}},(null===(e=null==this?void 0:this.context)||void 0===e?void 0:e.isLoadSkeleton)&&this.renderSkeleton()))}}ge.contextType=m;class ve extends d.React.PureComponent{render(){const{apps:e,isDetailContent:t,portalUrl:i,intl:s,folderUrl:a,switchListView:o,isTemplateList:l,allFavoritesIdData:r,capabilities:n,updateGroupItemId:p,folderListData:c,isPrivilegeCheckEnd:h,updateAppList:m}=this.props;return d.React.createElement("div",{className:"app-list-view"},t&&d.React.createElement(me,{updateAppList:m,allFavoritesIdData:r,updateGroupItemId:p,portalUrl:i,intl:s,folderUrl:a,apps:e,capabilities:n,switchListView:o,folderListData:c,isPrivilegeCheckEnd:h,isTemplateList:l}),!t&&d.React.createElement(ge,{updateAppList:m,allFavoritesIdData:r,updateGroupItemId:p,portalUrl:this.props.portalUrl,intl:this.props.intl,folderUrl:a,apps:e,capabilities:n,switchListView:o,folderListData:c,isPrivilegeCheckEnd:h,isTemplateList:l}))}}function fe(e){return d.css`
    &.invalid-message {
      text-align: center;
      top: 50%;
      font-size: ${d.polished.rem(16)};
      color: ${e.colors.palette.dark[600]};
      min-width: ${d.polished.rem(800)};
      width: 100%;
      box-sizing: border-box;
      padding:0 ${d.polished.rem(50)};
    }
    .loading-con {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: ${d.polished.rgba(e.colors.white,.2)};
    }
    .widget-builder-app-list {
      overflow-y: auto;

      .widget-builder-app-list-screen {
        width:${d.polished.rem(824)};
        margin: auto;
      }

      button.app-list-newapp:hover{
        color: ${e.colors.black} !important;
      }

      .modal-content {
        background:none;
      }

      .app-list-newapp {
        padding-left: ${d.polished.rem(16)};
        padding-right: ${d.polished.rem(16)};
        font-size: ${d.polished.rem(16)};
        margin-left: ${d.polished.rem(20)};
        height:${d.polished.rem(40)};
        white-space: nowrap;
        .app-list-newapp-icon {
          margin-right: ${d.polished.rem(8)};
        }
      }

      .app-list-search-container {
        padding-left: ${d.polished.rem(16)};
      }

      .app-list-h1 {
        font-size: ${d.polished.rem(24)};
      }

      .app-list-h2 {
        font-size: ${d.polished.rem(16)};
      }

      .app-list-h3 {
        font-size: ${d.polished.rem(13)};
      }

      .app-list-maxwidth {
        max-width: ${75}rem;
        top:40px;
      }

      .app-list-banner {
        overflow: hidden;
        width: 100%;
        height: ${5}rem;
        align-items: center;
        .list-title {
          font-size:${1.25}rem;
          color: ${e.colors.palette.dark[600]};
          margin-bottom: 0;
        }
      }

      .app-list-filterbar {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        padding-top: ${1.875}rem;
        padding-bottom: ${1.875}rem;
        border-top: 1px solid ${e.colors.palette.secondary[800]};
        .search-con {
          position:relative;
          align-items:center;
          border-radius:2px;
          background:${e.colors.palette.light[200]};
          /* width:${d.polished.rem(257)}; */
          width:${d.polished.rem(228)};
        }
        .app-list-switchview-con {
          border-radius: 2px;
          overflow:hidden;
          display: inline-block;
          vertical-align: middle;
        }
        .app-list-switchview {
          border-radius: 0;
        }
        .app-list-switchview-right {
          border-radius: 0;
        }
        .app-list-searchIconFill {
          color: ${e.colors.palette.dark[600]};
        }
        .app-list-searchbox:focus + .clear-con{
          display: block;
        }
        .clear-con {
          right: ${d.polished.rem(6)};
          cursor: pointer;
          color: ${e.colors.palette.dark[600]};
          transition: all ease .5s;
          /* display: none; */
        }
        .clear-con:hover {
          color: ${e.colors.black};
        }
        .app-list-searchbox {
          color: ${e.colors.black};
          width: 100%;
          height: ${2}rem;
          font-size:${.875}rem;
          box-sizing: border-box;
        }
        .app-list-searchbox::-ms-clear{
          display: none;
        }
        .app-list-clear {
          cursor: pointer;
        }
        .app-list-searchbox::-webkit-input-placeholder {
          color: ${e.colors.palette.dark[400]};
        }
        .app-list-searchbox:-moz-placeholder {
          color: ${e.colors.palette.dark[400]};
        }
        .app-list-searchbox:-ms-input-placeholder {
          color: ${e.colors.palette.dark[400]};
        }
        .filterbar-input {
          width: ${8.75}rem;
          margin-right:${d.polished.rem(10)};
          height:${d.polished.rem(32)};
          line-height:${d.polished.rem(32)};
          cursor: pointer;
          display: inline-block;
          vertical-align: middle;
        }

        .app-list-filterbar-title {
          padding-left: ${d.polished.rem(16)};
          padding-right: ${d.polished.rem(16)};
        }
      }
      .favorite {
        color: ${e.colors.palette.warning[500]};
      }
      .margin-4 {
        margin-right: ${d.polished.rem(4)};
      }
      .app-list-item-scroll-con {
        height: calc(100% - ${d.polished.rem(200)});
        overflow-y: auto;
        overflow-y: overlay;
        min-width: ${d.polished.rem(824)};
      }
      .app-list-content {
        width: 100%;
        padding-bottom: ${3.125}rem;
        padding-top: ${.25}rem;
      }
      .top-space {
        height: ${11.625}rem;
      }
      .app-list-detailview {
        width: 100%;

        .app-list-detailview-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          /* max-width: ${d.polished.rem(120)}; */
        }

        .app-list-detailview-content {
          width: 100%;

          display: flex;
          flex-wrap: wrap;

          .app-list-detailview-pic {
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
            height: ${d.polished.rem(160)};
          }
          .app-list-detailview-pic-cursor {
            cursor: pointer;
          }
        }

        .dropdown-toggle::after {
          display: none !important;
        }
      }

      .app-list-listview {

        .app-list-listview-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .app-list-listview-view {
          &{
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          button {
            vertical-align: middle;
          }
          button:hover {
            color:${e.colors.palette.dark[600]};
          }
          span {
            display: inline-block;
            vertical-align: middle;
            margin-bottom: ${d.polished.rem(-2)};
            color:${e.colors.palette.dark[600]};
          }
        }
        .app-list-views-con {
          padding-right: 5px;
        }
        .app-list-listview-container {
          position: relative;
          padding-left: ${d.polished.rem(16)};
          padding-right: ${d.polished.rem(16)};
        }

        .app-list-listview-pic {
          width:${d.polished.rem(60)};
          height:${d.polished.rem(40)};
          left:0;
          top:0;
          background-size: cover;
          background-position: center center;
          background-color: ${e.colors.palette.dark[600]};
          position: inherit;
        }
        .app-list-detailview-pic-cursor {
          cursor: pointer;
        }
        .app-list-listview-pic-con {
          z-index: 10;
        }
      }

      .detailview-item {
        width: ${d.polished.rem(244)};
        height: ${d.polished.rem(330)};
        margin: 0 ${d.polished.rem(15)} ${d.polished.rem(30)} ${d.polished.rem(15)};
        border: 1px solid ${e.colors.palette.light[300]};
        background: ${e.colors.palette.light[500]};
      }
      .app-item-link {
        text-decoration: none;
      }

      .app-item-more {
        margin-right: -0.625rem;
      }

      .app-item-backcolor {
        background-color: ${e.colors.palette.light[500]};
      }

      .app-item-launch:focus {
        box-shadow: none !important;
      }
      .icon-con-padding-r {
        padding-right:${d.polished.rem(5)};
      }
      .app-list-icon-margin {
        fill: #BCC4CD !important;
        margin-right: 0;
        margin-left: 0;
      }

      .app-list-dropdown {
        padding: 0;
        margin: 0;
        min-width: 0;
      }

      .dropdown-toggle::after {
        display: none !important;
      }

      .app-list-searchIconFill {
        fill: ${e.colors.palette.dark[600]} !important;
        color: ${e.colors.palette.dark[600]} !important;
      }

      .item-message-con {
        padding:${d.polished.rem(12)};
        padding-bottom:0;
      }
      .item-card-title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        height:${d.polished.rem(46)};
        color:${e.colors.palette.dark[800]};
        font-size:${1}rem;
        margin-bottom:${d.polished.rem(16)};
      }
      .app-list-detailview-name, .app-list-detailview-time {
        color:${e.colors.palette.dark[600]};
        font-size:${.8125}rem;
        line-height:${1.25}rem;
        min-height:${1.25}rem;
        padding-bottom:${d.polished.rem(5)};
      }
      .card-item-link-con {
        & {
          height: 0;
          overflow: hidden;
        }
        .app-link {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      }
      .edit-item-con-template {
        height: ${2.5}rem;
      }
      .edit-item-con {
        & {
          height: ${2.5}rem;
          margin-left:${d.polished.rem(12)};
          margin-right:${d.polished.rem(12)};
          border-top:1px solid ${e.colors.palette.light[800]};
          margin-bottom:${d.polished.rem(3)};
        }
        .item-views-number {
          color:${e.colors.palette.dark[600]};
          max-width: ${d.polished.rem(118)};
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .item-views-number button {
          vertical-align: middle;
        }
        .item-views-number button:hover {
          color:${e.colors.palette.dark[600]};
        }
        .item-views-number span {
          display: inline-block;
          vertical-align: middle;
        }
        .template-item-btn-box {
          margin-left: ${d.polished.rem(-4)};
        }
      }
      .description-con {
        & {
          background-color: ${d.polished.rgba(e.colors.white,.8)};
          left:0;
          top:0;
          right:0;
          bottom:0;
          box-sizing: border-box;
          padding:${d.polished.rem(16)};
          color:${e.colors.palette.dark[800]};
          font-size:${.75}rem;
          opacity: 0;
          transition: all ease .2s;
          overflow-y:scroll;
        }
        div {

        }
      }
      .dropdown-toggle svg.jimu-icon {
        transform: rotate(0deg);
        margin-right: 3px;
      }
      .app-list-detailview-pic:hover .description-con {
        opacity: 1;
      }
      .publish-status {
        background: ${e.colors.palette.warning[800]};
        height: ${d.polished.rem(18)};
        line-height: ${d.polished.rem(18)};
        right: ${d.polished.rem(8)};
        top: ${d.polished.rem(8)};
        color: ${e.colors.palette.warning[100]};
        padding: 0 ${d.polished.rem(6)};
        border-radius: 2px;
        font-size: ${d.polished.rem(10)};
        box-sizing: border-box;
        font-weight: bold;
      }
      .list-publish-status {
        max-width: ${d.polished.rem(100)};
        margin: 0 ${d.polished.rem(16)} 0 ${d.polished.rem(10)};
        min-width: ${d.polished.rem(40)};
        text-align: center;
      }
      .Published {
        color: ${e.colors.palette.success[100]};
        background: ${e.colors.palette.success[800]};
      }
      .Changed {
        color: ${e.colors.palette.danger[100]};
        background: ${e.colors.palette.danger[800]};
      }
      .list-view-link-con {
        width: ${d.polished.rem(541)};
      }
      .item-list-con {
        & {
          height:${d.polished.rem(44)};
          background: ${e.colors.palette.light[500]};
          border: 2px solid ${e.colors.palette.light[300]};;
          transition: all ease .3s;
        }
        .item-list-name-con {
          padding-left:${d.polished.rem(76)};
          font-size:${1}rem;
          color:${e.colors.palette.dark[800]};
          flex-grow: 1;
          max-width: 36%;
        }
        .item-list-owner {
          width: ${d.polished.rem(160)};
          box-sizing: border-box;
        }
        .item-list-time {
          width: ${d.polished.rem(99)};
        }
        .app-list-views {
          width: ${d.polished.rem(80)};
        }
        .item-list-icon-con {
          padding-right:0;
          width: ${d.polished.rem(167)};
        }

        .item-list-icon-con>div {
          height: ${d.polished.rem(24)};
        }
        .item-list-name-con-dev {
          max-width: 46%;
        }
        .item-list-name-con-default {
          max-width: 83%;
        }
        .app-list-h3 {
          color:${e.colors.palette.dark[600]};
        }
        .item-list-border-l {
          border-left: 1px solid ${e.colors.palette.secondary[800]};
          box-sizing:border-box;
          padding-left:${d.polished.rem(16)};
          height:${d.polished.rem(24)};
          margin-top:${d.polished.rem(8)};
          box-sizing: border-box;
        }

      }
      @media only screen and (min-width: 1280px) {
        .list-view-link-con {
          width: ${d.polished.rem(541)};
        }
        .widget-builder-app-list-screen {
          width:${d.polished.rem(1100)};
        }
        .app-list-filterbar .search-con {
            width:${d.polished.rem(400)};
        }
        .app-list-filterbar .filterbar-input {
          width: ${d.polished.rem(170)};
          margin-right:${d.polished.rem(20)};
        }
        .item-list-con {
          .item-list-name-con {
            max-width: 53%;
          }
          .item-list-name-con-dev {
            max-width: 60%;
          }
          .item-list-name-con-default {
            max-width: 88%;
          }
        }
      }
      @media only screen and (min-width: 1400px) {
        .list-view-link-con {
          width: ${d.polished.rem(817)};
        }
        .widget-builder-app-list-screen {
            width:${d.polished.rem(1372)};
        }
        .app-list-filterbar .filterbar-input {
          width: ${d.polished.rem(200)};
        }
        .item-list-con {
          .item-list-name-con{
            max-width: 48%;
          }
          .item-list-owner {
            width: ${d.polished.rem(260)};
          }
          .item-list-time {
            width: ${d.polished.rem(159)};
          }
          .app-list-views {
            width: ${d.polished.rem(106)};
          }
          .item-list-name-con-dev {
            max-width: 59%;
          }
          .item-list-name-con-default {
            max-width: 90%;
          }
        }
      }

      @media only screen and (min-width: 1680px) {
        .list-view-link-con {
          width: ${d.polished.rem(1345)};
        }
        .widget-builder-app-list-screen {
            width:${d.polished.rem(1654)};
        }
        .item-list-con {
          .item-list-name-con{
            max-width: 57.5%;
          }
          .item-list-name-con-dev {
            max-width: 64%;
          }
          .item-list-name-con-default {
            max-width: 90%;
          }
        }
      }
    }
  `}var we=r(309),be=r.n(we);const xe=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:be()},i))};var ye=r(878),je=r(788),Se=r.n(je);const Ie=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:Se()},i))};class Ne extends d.React.PureComponent{constructor(e){super(e),this.getTextAndIndexById=(e,t)=>{let{text:i}=this.state;return e.forEach(((e,s)=>{t===e.value&&(i=e.text)})),i},this.toggleDropdown=()=>{const{dropdownOpen:e}=this.state;this.setState({dropdownOpen:!e})},this.optionClick=(e,t,i)=>{const{onChange:s,onOptionClick:a,value:o}=this.props;this.setState({text:t}),this.toggleDropdown(),o!==i&&s&&s(i),a&&a(i)},this.state={dropdownOpen:!1,text:""}}componentDidMount(){}getStyle(){const{colors:e}=this.props.theme;return d.css`
      .dropdown button,
      .dropdown button:not(:disabled):not(.disabled):active {
        background: ${e.palette.light[200]};
        padding-right: 0;
      }
      .dropdown button {
        color: ${e.black};
      }
      .dropdown span {
        display: flex;
        align-items: center;
        svg {
          margin-right: ${d.polished.rem(6)};
        }
      }
    `}getDropdownStyle(){const{colors:e}=this.props.theme;return d.css`
      & {
        background: ${e.palette.secondary[400]};
        border: 1px solid ${e.palette.secondary[600]};
        border-radius: 2px;
        font-size: ${d.polished.rem(14)};
        padding: 0;
      }
      .dropdown-menu--inner {
        max-height: ${d.polished.rem(200)};
      }
      .dropdown-menu--inner .active {
        background: ${e.palette.primary[500]};
      }
      .icon-con {
        width: ${d.polished.rem(12)};
        height: ${d.polished.rem(12)};
        display: inline-block;
        vertical-align: middle;
        margin-right: ${d.polished.rem(8)};
      }
      .icon-con svg {
        display: block;
      }
    `}render(){const{dropdownOpen:e}=this.state,{dropDownData:t,isShowSelectIcon:i,className:s,value:a}=this.props,o=this.getTextAndIndexById(t,a);return(0,d.jsx)("div",{className:(0,d.classNames)("d-inline-block align-middle",s),css:this.getStyle()},(0,d.jsx)(h.Dropdown,{size:"sm",toggle:this.toggleDropdown,isOpen:e,className:"h-100",autoWidth:!0,menuItemCheckMode:"singleCheck",activeIcon:i},(0,d.jsx)(h.DropdownToggle,{size:"sm",type:"tertiary",className:"dropdown d-flex filterbar-input",title:o},(0,d.jsx)("div",{className:"flex-grow-1 text-left text-truncate"},o),(0,d.jsx)(Ie,{size:"s",className:"toollist-item-icon"})),(0,d.jsx)(h.DropdownMenu,{css:this.getDropdownStyle()},t.map(((e,t)=>(0,d.jsx)(h.DropdownItem,{key:t,onClick:t=>{this.optionClick(t,e.text,e.value)},className:(0,d.classNames)({active:a===e.value}),title:e.text,active:a===e.value},(0,d.jsx)("div",{className:"text-truncate"},e.text)))))))}}const $e=(0,u.withTheme)(Ne);var Oe=r(820),Te=r.n(Oe);const ke=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:Te()},i))};var Ee=r(959),Me=r.n(Ee);const Ae=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:Me()},i))};var Pe=r(224),De=r.n(Pe);const Ce=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:De()},i))},{useRef:Le}=d.React,Fe=e=>{const t=Le(),i=Le(),s=Le(),a=Le(!1),{className:o,onScrollTop:l,onScroll:r,onScrollBottom:n}=e,p=d.css`
    & {
      overflow-y: auto;
      overflow-y: overlay;
    }
    .top-marking, .buttom-marking {
      width: 3px;
      height: 3px;
      right: 0;
    }
    .top-marking {
      top: 0;
    }
    .buttom-marking {
      bottom: 10px;
    }
    .list-scroll-con {
      padding-top: 1px;
    }
  `,c=(e,t,i,s)=>{const a=new IntersectionObserver((function(e,t){const s=e[0].intersectionRatio>0;i&&i(s)}),s||{root:t});return a.observe(e),a},h=e=>{l&&l(e)},m=e=>{n&&n(e)};return(0,d.jsx)("div",{className:(0,d.classNames)("w-100 h-100",o),css:p,ref:e=>{e&&!a.current&&(c(null==i?void 0:i.current,null==t?void 0:t.current,m),c(null==s?void 0:s.current,null==t?void 0:t.current,h),a.current=!0)}},(0,d.jsx)("div",{className:"position-relative w-100 list-scroll-con",onScroll:()=>{r&&r()}},(0,d.jsx)("span",{className:"top-marking position-absolute",ref:s}),null==e?void 0:e.children,(0,d.jsx)("span",{className:"buttom-marking position-absolute",ref:i})))};var Re=r(866),Ue=r.n(Re);const Be=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:Ue()},i))},Ve=e=>{const t=h.hooks.useTranslate(h.defaultMessages,d.defaultMessages),i=(0,u.useTheme)(),{className:s,appItem:a,isExperiencesTemplate:o,portalUrl:l,folderUrl:r,selectedApp:n,onItemSelected:p}=e,c=d.css`
    & {
      width: ${d.polished.rem(244)};
      height: ${d.polished.rem(280)};
      margin: 0 ${d.polished.rem(15)} ${d.polished.rem(30)} ${d.polished.rem(15)};
      border: 1px solid ${i.colors.palette.light[300]};
      background: ${i.colors.palette.light[500]};
      display: inline-block;
      cursor: pointer;
    }
    .app-item-link {
      text-decoration: none;
    }
    .app-thumbnail-con {
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      height: 56%;
    }
    .card-info-con {
      & {
        padding: ${d.polished.rem(12)};
      }
      h2 {
        font-size: ${d.polished.rem(16)};
        line-height: ${d.polished.rem(20)};
        color: ${i.colors.palette.dark[800]};
        height: ${d.polished.rem(40)};
      }
      .mt-13 {
        margin-top: ${d.polished.rem(13)};
      }
      .mt-10 {
        margin-top: ${d.polished.rem(4)};
      }
    }
  `;return(0,d.jsx)(h.Card,{className:(0,d.classNames)("import-card-item",s),css:c,onClick:()=>{(null==n?void 0:n.id)===(null==a?void 0:a.id)?p(null):p(a)},active:(null==n?void 0:n.id)===(null==a?void 0:a.id)},(0,d.jsx)("div",{className:"app-thumbnail-con w-100",style:{backgroundImage:"url("+(()=>{const e=a.thumbnail,{id:t}=a;let i=e;const s=o?"templateDefaultthumb.png":"defaultthumb.png",n=d.SessionManager.getInstance().getSessionByUrl(l),p=n&&(null==n?void 0:n.token)?"?token="+n.token:"";return i=i?`${l}/sharing/rest/content/items/${t}/info/${e}${p}`:r+`./dist/runtime/assets/${s}`,i})()+")"}}),(0,d.jsx)(h.CardBody,{className:"card-info-con"},(0,d.jsx)("h2",{title:a.title,className:"text-truncate w-100"},a.title),(0,d.jsx)("div",{className:"app-list-h3 mt-13"},a.modified&&(0,d.jsx)(d.FormattedDate,{value:new Date(a.modified),year:"numeric",month:"2-digit",day:"2-digit"})),(0,d.jsx)("div",{className:"d-flex align-items-center mt-10"},(0,d.jsx)("div",{className:"flex-grow-1"},a.owner),(0,d.jsx)(h.Button,{type:"tertiary",size:"sm",title:t("details"),target:"_blank",href:`${l}/home/item.html?id=${a.id}`,icon:!0},(0,d.jsx)(Be,null)))))},_e=e=>d.css`
    &.widget-ds-setting-add-data-popup {
      max-width: ${d.polished.rem(5e5)};
      margin: 0;
    }
    .selector-right-header{
      padding: ${d.polished.rem(23)} ${d.polished.rem(20)} ${d.polished.rem(12)} ${d.polished.rem(20)};
    }
    .widget-builder-app-list-screen {
      width:${d.polished.rem(824)};
      margin: auto;
      height: calc(100% - 65px);
      .p-15 {
        padding-left: ${d.polished.rem(15)};
        padding-right: ${d.polished.rem(15)};
      }
    }
    .filterbar-input {
      width: ${d.polished.rem(140)};
      margin-right:${d.polished.rem(10)};
      height:${d.polished.rem(32)};
      line-height:${d.polished.rem(32)};
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
    }
    .classify-con {
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      padding-top: ${d.polished.rem(30)};
      padding-bottom: ${d.polished.rem(30)};
    }
    @media only screen and (min-width: 1280px) {
      .widget-builder-app-list-screen {
        width:${d.polished.rem(1100)};
      }
    }
    @media only screen and (min-width: 1400px) {
      .widget-builder-app-list-screen {
          width:${d.polished.rem(1372)};
      }
    }
    @media only screen and (min-width: 1680px) {
      .widget-builder-app-list-screen {
          width:${d.polished.rem(1654)};
      }
    }
    .template-title {
      font-size: ${d.polished.rem(14)};
      color:${e.colors.palette.dark[400]};
      .navbar-nav button.nav-link {
        & {
          color:${e.colors.palette.dark[400]};
        }
        &:hover, &:focus {
          color:${e.colors.black};
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
        color: ${e.colors.black};
      }
      .tap-margin-r {
        margin-right:${d.polished.rem(12)};
      }
    }
    .app-item-list-con {
      height: calc(100% - 189px);
      padding-bottom: ${d.polished.rem(30)};
    }
    .portal-app-classify-con .filterbar-input {
      margin-right: 0 !important;
    }
    .loading-con {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: ${d.polished.rgba(e.colors.white,.2)};
    }
    .item-selected-con{
      width: ${d.polished.rem(300)};
      background-color: ${e.colors.palette.light[600]};
      box-shadow: 0 0 10px 4px ${d.polished.rgba(e.colors.white,.3)};
      position: absolute;
      right: 30px;
      bottom: 30px;
      .added-ds-items{
        max-height: ${d.polished.rem(500)};
        overflow-y: auto;
        overflow-x: hidden;
      }
      .small-done-btn{
        max-width: ${d.polished.rem(100)};
      }
    }
    .item-selector-search {
      width: ${d.polished.rem(300)};
    }
  `;class Ge extends d.React.PureComponent{constructor(t){super(t),this.getEmptyText=()=>{const{isTemplateList:t,accessType:i}=this.props;let{emptyTextTop:s,emptyTextBottom:a}=this.state;switch(i){case e.Me:case e.Anyone:t?(s=this.nls("noItemsYet"),a=this.nls("templateEmptyText")):s=this.nls("createExperience");break;case e.NotMe:s=this.nls("sharedEmptyText");break;case e.MyFavorites:s=this.nls("noItemsYet"),a=this.nls("favoritesEmptyText");break;case e.Public:s=this.nls("noPublicItems");break;case e.Default:s=this.nls("noItemsYet")}this.setState({emptyTextTop:s,emptyTextBottom:a})},this.nls=e=>this.props.intl?this.props.intl.formatMessage({id:e,defaultMessage:g[e]}):e,this.state={emptyTextTop:"",emptyTextBottom:""}}componentDidMount(){this.getEmptyText()}getStyle(){const e=this.props.theme,t=e.colors&&e.colors.palette?e.colors.palette.dark[400]:"#a8a8a8",i=e.colors&&e.colors.palette?e.colors.palette.dark[600]:"#c5c5c5",s=this.props.folderUrl+"./dist/runtime/assets/empty.png",a=this.props.folderUrl+"./dist/runtime/assets/no_item.png";return d.css`
      & {
        width: 100%;
        margin-top: ${d.polished.rem(120)};
      }
      div {
        text-align: center;
      }
      .empty-con {
        width: 100%;
        top: 50%;
      }
      .icon-con {
        width: ${d.polished.rem(458)};
        height: ${d.polished.rem(303)};
        background: url(${s}) no-repeat left top;
        background-size: contain;
        margin: 0 auto;
        opacity: 0.4;
      }
      .search-empty {
        background-image: url(${a});
        height: ${d.polished.rem(458/1.32)};
      }
      .create-experience {
        color: ${i};
        font-size: ${d.polished.rem(16)};
        line-height: ${d.polished.rem(16)};
        margin-top: ${d.polished.rem(30)};
        font-weight: 500;
      }
      .remind-to-click {
        color: ${t};
        font-size: ${d.polished.rem(14)};
        line-height: ${d.polished.rem(14)};
        margin-top: ${d.polished.rem(20)};
      }
      .remind-to-click span {
        color: ${i};
        font-weight: 500;
      }
      @media only screen and (max-width: 1600px) {
        & {
          margin-top: ${d.polished.rem(80)};
        }
      }
      @media only screen and (max-width: 1360px) {
        & {
          width: 100%;
          margin-top: ${d.polished.rem(0)};
        }
        .icon-con {
          width: ${d.polished.rem(200)};
          height: ${d.polished.rem(132)};
        }
        .search-empty {
          height: ${d.polished.rem(200/1.32)};
        }
        .create-experience {
          margin-top: ${d.polished.rem(20)};
        }
        .remind-to-click {
          margin-top: ${d.polished.rem(10)};
        }
      }
      @media only screen and (max-width: 1176px) {
        & {
          margin-top: ${d.polished.rem(20)};
        }
      }
    `}render(){const{accessType:t,isTemplateList:i,searchText:s,isImportAppListEmpty:a}=this.props,{emptyTextTop:o,emptyTextBottom:l}=this.state,r=this.props.intl.formatMessage({id:"toCreate",defaultMessage:g.toCreate},{createNewElement:(0,d.jsx)("span",{key:"toCreate"},"+ ",this.nls("newApp"))});return(0,d.jsx)("div",{css:this.getStyle(),className:"app-list-empty-con"},0===s.length&&!a&&(0,d.jsx)("div",{className:"empty-con"},(0,d.jsx)("div",{className:"icon-con"}),o&&(0,d.jsx)("div",{className:"create-experience"},o),l&&(0,d.jsx)("div",{className:"create-experience"},l),!i&&(t===e.Me||t===e.Anyone)&&(0,d.jsx)("div",{className:"remind-to-click"},r)),0===s.length&&a&&(0,d.jsx)("div",{className:"empty-con"},(0,d.jsx)("div",{className:"icon-con"}),(0,d.jsx)("div",{className:"create-experience"},this.nls("noItemsYet"))),s.length>0&&(0,d.jsx)("div",{className:"empty-con"},(0,d.jsx)("div",{className:"icon-con search-empty"}),(0,d.jsx)("div",{className:"create-experience"},i?this.nls("noTemplates"):this.nls("noSearchResult"))))}}const Ze=(0,u.withTheme)(Ge),{useRef:ze,useEffect:He,useState:Qe}=d.React;var We;!function(e){e.My="My",e.MyGroup="MyGroup",e.MyOrganization="MyOrganization"}(We||(We={}));const qe=e=>{const s=h.hooks.useTranslate(g,h.defaultMessages,d.defaultMessages),o=(0,u.useTheme)(),l=ze(),r=ze(null),n=ze(!1),p=ze(0),c=ze(!1),m=ze([]),f=ze(t.AllFolder),w=ze(i.AllGroup),x=ze(ye.SortOrder.Desc),y=ze(a.Modified),j=ze(We.My),{isOpen:S,folderList:I,groupList:N,sortData:$,isExperiencesTemplate:O,portalUrl:T,folderUrl:k,intl:E,toggle:M,refreshAppList:A,setErrorMessage:P,toggleErrorPopper:D}=e,[C,L]=Qe(We.My),[F,R]=Qe(""),[U,B]=Qe(t.AllFolder),[V,_]=Qe(i.AllGroup),[G,Z]=Qe(ye.SortOrder.Desc),[z,H]=Qe(a.Modified),[Q,W]=Qe([]),[q,K]=Qe(!1),[Y,J]=Qe(null);He((()=>{f.current=U,w.current=V,x.current=G,y.current=z,j.current=C,n.current=!1,S&&(te(!1),ie(F),J(null))}),[S,G,z,U,C,V]),He((()=>{S&&((null==F?void 0:F.length)>2||0===(null==F?void 0:F.length))&&(te(!1),n.current=!1,r.current(F))}),[F]),He((()=>{m.current=Q}),[Q]),He((()=>{r.current=d.lodash.debounce(ie,400)}),[S]);const X=()=>{M&&M()},ee=e=>{C!==e&&(J(null),L(e))},te=(e=!1)=>{c.current=e},ie=e=>{const t=se(e);t&&(K(!0),v.appServices.searchApp(t,v.SearchType.Portal).then((e=>{const t=e.results;n.current=!0;let i=[];i=c.current?m.current.concat(t):t,W(i),p.current=(null==e?void 0:e.total)||0,K(!1)}),(()=>{K(!1)})))},se=e=>{const t=oe();return{start:t.start,q:ae(e),sortField:y.current,sortOrder:x.current,num:t.num}},ae=e=>{var s;const a=d.SessionManager.getInstance().getMainSession(),o=(0,d.getAppStore)().getState().user,l=O?'type: "Web Experience Template"':'type: "Web Experience"',r=e?`AND (${e})`:"";if(!a)return`${l} ${r}`;const n=null===(s=null==o?void 0:o.groups)||void 0===s?void 0:s.map((e=>e.id)),p=(null==a?void 0:a.username)||"",c=(null==n?void 0:n.length)>0?n.join(" OR "):"",h="(access:shared OR access:public OR access:org)";switch(j.current){case We.My:return f.current===t.AllFolder?`${l} orgid:${null==o?void 0:o.orgId} AND owner:${p} ${r}`:`${l} ownerfolder: ${f.current} AND owner:${p} ${r}`;case We.MyGroup:return w.current===i.AllGroup?`group: (${c}) ${h} ${l} ${r}`:`group: (${w.current}) ${h} ${l} ${r}`;case We.MyOrganization:return`orgid:${null==o?void 0:o.orgId} ${l}  ${r}`}},oe=()=>{const e={num:le(),start:1};return c.current?(e.start=m.current.length+1,e):e},le=()=>{if(null==l?void 0:l.current){const e=l.current.clientWidth,t=l.current.clientHeight;return Math.ceil(t/244)*Math.ceil(e/238)||30}return 30},re=()=>{const e=G===ye.SortOrder.Asc?ye.SortOrder.Desc:ye.SortOrder.Asc;Z(e)},ne=e=>{const t=e?e.setIn(["isLocalApp"],!1).setIn(["portalUrl"],T):null;J(t)};return(0,d.jsx)(h.Modal,{isOpen:S,css:_e(o),toggle:X,contentClassName:"border-0 h-100",className:"widget-ds-setting-add-data-popup w-100 h-100",keyboard:!1},(0,d.jsx)("div",{className:"h-100 d-flex flex-column"},(0,d.jsx)("div",{className:"selector-right-header w-100 d-flex justify-content-end"},(0,d.jsx)(h.Button,{type:"tertiary",size:"sm",icon:!0,className:"close-icon",onClick:()=>{M()},title:s("close"),"aria-label":s("close")},(0,d.jsx)(b,{size:"l"}))),(0,d.jsx)("div",{className:"template-title widget-builder-app-list-screen flex-grow-1 d-flex flex-column"},(0,d.jsx)("div",{className:"d-flex w-100 p-15"},(0,d.jsx)(h.Navbar,{className:"header-nav-bar-con flex-grow-1",border:!1,color:"false",light:!0},(0,d.jsx)(h.Nav,{underline:!0,navbar:!0,justified:!0,fill:!0,"data-testid":"template-menu"},(0,d.jsx)(h.NavItem,{className:"tap-link tap-margin-r",title:s("myContent"),onClick:()=>{ee(We.My)}},(0,d.jsx)(h.NavLink,{tag:"button",active:C===We.My},s("myContent"))),(0,d.jsx)(h.NavItem,{className:"tap-link tap-margin-r",title:s("myOrganization"),onClick:()=>{ee(We.MyOrganization)}},(0,d.jsx)(h.NavLink,{tag:"button",active:C===We.MyOrganization},s("myOrganization"))),(0,d.jsx)(h.NavItem,{className:"tap-link tap-margin-r",title:s("myGroup"),onClick:()=>{ee(We.MyGroup)}},(0,d.jsx)(h.NavLink,{tag:"button",active:C===We.MyGroup},s("myGroup"))))),(0,d.jsx)("div",{className:"item-selector-search"},(0,d.jsx)(h.TextInput,{prefix:(0,d.jsx)(Ce,{size:"m",className:"text-dark-600"}),onKeyDown:e=>{const t=e.target.value;"Enter"===e.key&&t&&(te(!1),n.current=!1,r.current(t))},placeholder:s("search"),onChange:e=>{const t=e.target.value;R(t)},className:"search-input w-100",value:F,allowClear:!0}))),(0,d.jsx)("div",{className:"classify-con d-flex p-15"},(0,d.jsx)("div",{className:"flex-grow-1"},C===We.My&&(0,d.jsx)($e,{onChange:e=>{B(e)},value:U,isShowSelectIcon:!0,dropDownData:I}),C===We.MyGroup&&(0,d.jsx)($e,{onChange:e=>{_(e)},value:V,isShowSelectIcon:!0,dropDownData:(()=>{const e=null==N?void 0:N.filter((e=>e.value!==i.Org));return(0,d.Immutable)(e)})()})),(0,d.jsx)("div",{className:"d-flex align-items-center portal-app-classify-con"},(0,d.jsx)("div",{className:"mr-2"},s("sortBy")),(0,d.jsx)($e,{onChange:e=>{H(e)},value:z,isShowSelectIcon:!0,dropDownData:$}),(0,d.jsx)("div",{className:"item-selector-sort-order"},G===ye.SortOrder.Desc?(0,d.jsx)(h.Button,{type:"tertiary",onClick:re,title:s("decending"),"aria-label":s("decending")},(0,d.jsx)(ke,{size:"m"})):(0,d.jsx)(h.Button,{type:"tertiary",onClick:re,title:s("ascending"),"aria-label":s("ascending")},(0,d.jsx)(Ae,{size:"m"}))))),(0,d.jsx)("div",{className:"flex-grow-1 app-item-list-con",ref:l},(0,d.jsx)(Fe,{className:"scroll-con",onScrollBottom:e=>{var t;e&&n.current&&p.current>(null===(t=m.current)||void 0===t?void 0:t.length)&&(te(!0),ie(F))}},Q.map(((e,t)=>(0,d.jsx)(Ve,{appItem:(0,d.Immutable)(e),key:t,portalUrl:T,isExperiencesTemplate:O,folderUrl:k,onItemSelected:ne,selectedApp:Y}))),0===(null==Q?void 0:Q.length)&&!q&&(0,d.jsx)(Ze,{searchText:F,isTemplateList:O,accessType:C,intl:E,portalUrl:T,folderUrl:k,isImportAppListEmpty:!0}))),Y&&(0,d.jsx)("div",{className:"item-selected-con d-flex align-items-center py-3 px-3"},(0,d.jsx)("div",{className:"d-flex align-items-center flex-grow-1"},(0,d.jsx)("span",{className:"mr-2"},"1"),(0,d.jsx)("span",{className:"mr-2"},s("selected"))),(0,d.jsx)("div",{className:"small-done-btn"},(0,d.jsx)(h.Button,{onClick:()=>{var e;e=null==Y?void 0:Y.asMutable({deep:!0}),K(!0),v.appServices.importAppFromPortal(e).then((e=>{K(!1),A(!1),X()}),(t=>{var i,a;K(!1),X(),(null==t?void 0:t.errMsg)&&(null===(i=null==t?void 0:t.errMsg)||void 0===i?void 0:i.errCode)?P(s("importUpperVersion",{APP_NAME:e.title,VERSION_NUMBER:(null===(a=null==t?void 0:t.errMsg)||void 0===a?void 0:a.portalAppversion)||""})):P(s("importFailure",{APP_NAME:e.title})),D()}))},type:"primary",className:"text-truncate w-100",title:s("done"),"aria-label":s("done")},s("done")))),q&&(0,d.jsx)("div",{className:"loading-con"},(0,d.jsx)("div",{style:{position:"absolute",left:"50%",top:"50%"},className:"jimu-primary-loading"})))))},Ke=e=>{const t=d.css`
    svg {
      color: #fff;
    }
  `,{okText:i,cancelText:s,isOpen:a,errorMessage:o,headerText:l,toggle:r,onConfirm:n,onCancel:p}=e;return(0,d.jsx)(h.Modal,{className:(0,d.classNames)("d-flex justify-content-center"),isOpen:a,centered:!0,toggle:r,onClick:e=>{(e=>{e.stopPropagation()})(e)}},l&&(0,d.jsx)(h.ModalHeader,{tag:"h4",toggle:r,className:"item-delete-header",css:t},l),(0,d.jsx)(h.ModalBody,null,o),(0,d.jsx)(h.ModalFooter,null,i&&(0,d.jsx)(h.Button,{type:"danger",onClick:()=>{n&&n(),r()}},i),s&&(0,d.jsx)(h.Button,{type:"secondary",onClick:()=>{p&&p(),r()}},s)))},{useState:Ye,useRef:Je}=d.React;var Xe;!function(e){e.My="My",e.MyGroup="MyGroup",e.MyOrganization="MyOrganization"}(Xe||(Xe={}));const et=e=>{const t=Je(null),i=Je(!1),s=h.hooks.useTranslate(g,h.defaultMessages,d.defaultMessages),{folderUrl:a,portalUrl:o,isExperiencesTemplate:l,folderList:r,groupList:n,sortData:p,intl:c,refreshAppList:m,toggleLoading:u}=e,f=d.css`
    .file-input {
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      opacity: 0;
    }
  `,[w,b]=Ye(!1),[x,y]=Ye(!1),[j,S]=Ye(!1),[I,N]=Ye(""),$=()=>{S(!j)},O=()=>{y(!x)},T=()=>{var e,i;const s=t.current.files;return(null===(i=null===(e=null==s?void 0:s[0])||void 0===e?void 0:e.name)||void 0===i?void 0:i.replace(/\.zip/,""))||""},k=e=>{u(e),i.current=e};return(0,d.jsx)("div",{className:"import-app-con"},(0,d.jsx)(h.Dropdown,{size:"sm",toggle:e=>{var t;const i=null===(t=null==e?void 0:e.currentTarget)||void 0===t?void 0:t.className;if((null==i?void 0:i.indexOf("file-con"))>-1)return!1;b(!w)},isOpen:w,className:"h-100",autoWidth:!0},(0,d.jsx)(h.DropdownButton,{size:"lg",className:"dropdown d-flex filterbar-input",title:s("actionsLabel")},(0,d.jsx)(xe,{autoFlip:!0,className:"app-list-newapp-icon mr-2"}),s("actionsLabel")),(0,d.jsx)(h.DropdownMenu,{css:f},(0,d.jsx)(h.DropdownItem,{size:"lg",onClick:O,title:s("importAction")},s("importAction")),(0,d.jsx)(h.DropdownItem,{size:"lg",className:"position-relative file-con",title:s("uploadAction")},(0,d.jsx)("input",{ref:t,className:"position-absolute file-input w-100 h-100",type:"file",accept:".zip",onChange:e=>{var a,r;if(i.current)return!1;const n=t.current.files,p=l?"Web Experience Template":"Web Experience",c=(0,d.getAppStore)().getState().user;if(!(null==n?void 0:n[0]))return!1;const h=null===(r=null===(a=null==n?void 0:n[0])||void 0===a?void 0:a.name)||void 0===r?void 0:r.replace(/\.zip/,""),u={description:"",owner:null==c?void 0:c.username,tags:[],thumbnail:null,title:h,type:p,snippet:"",typeKeywords:[p,"Ready To Use","JavaScript","status: Draft"],currentVersion:d.version,portalUrl:o,username:null==c?void 0:c.username,appZip:null==n?void 0:n[0]};k(!0),v.appServices.importItem(u).then((e=>{k(!1);const i=(null==e?void 0:e.error)||null;if(i){if("002"===i.errorCode){const e=null==i?void 0:i.appVersion;N(s("importUpperVersion",{APP_NAME:T(),VERSION_NUMBER:e}).replace(/\$/gi," "))}else"003"===i.errorCode||"001"===i.errorCode||"004"===i.errorCode?N(s("invalidResourceExperience")):N(s("importFailure",{APP_NAME:T()}).replace(/\$/gi," "));S(!0)}else m();t.current.value=null}),(e=>{k(!1),N(s("importFailure",{APP_NAME:T()}).replace(/\$/gi," ")),t.current.value=null,S(!0)}))},title:s("uploadAction")}),s("uploadAction")))),(0,d.jsx)(qe,{isOpen:x,toggle:O,folderList:r,groupList:n,sortData:p,isExperiencesTemplate:l,portalUrl:o,folderUrl:a,intl:c,refreshAppList:m,setErrorMessage:e=>{N(null==e?void 0:e.replace(/\$/gi," "))},toggleErrorPopper:$}),(0,d.jsx)(Ke,{isOpen:j,toggle:$,headerText:s("uploadImageError"),errorMessage:I,onConfirm:$,okText:s("ok")}))};var tt=r(159),it=r.n(tt);const st=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:it()},i))};var at=r(484),ot=r.n(at);const lt=e=>{const{className:t}=e,i=function(e,t){var i={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(i[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(i[s[a]]=e[s[a]])}return i}(e,["className"]),s=(0,d.classNames)("jimu-icon jimu-icon-component",t);return d.React.createElement(h.SVG,Object.assign({className:s,src:ot()},i))};var rt=function(e,t,i,s){return new(i||(i=Promise))((function(a,o){function l(e){try{n(s.next(e))}catch(e){o(e)}}function r(e){try{n(s.throw(e))}catch(e){o(e)}}function n(e){var t;e.done?a(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(l,r)}n((s=s.apply(e,t||[])).next())}))};class nt extends d.React.PureComponent{constructor(o){super(o),this.searchPromise=null,this.isLoadModuleForBuilder=!0,this.scrollPosition=0,this.isHasPreload=!1,this.nextStart=null,this.appListTotal=null,this.isHadSearchList=!1,this.preloadData=()=>{if(!(0,d.getAppStore)().getState().portalSelf)return!1;this.getRole(),this.checkUserPrivilege(),this.getFoldersAndGroup(),this.getParamsAndRefresh(),this.initDropdownData(),this.contentNode&&(this.contentNode.addEventListener("scroll",this.onScrollHandle.bind(this)),this.contentNode.scrollTop=nt.scrollTop),this.isHasPreload=!0},this.preloadModule=()=>{if(!this.isLoadModuleForBuilder)return!1;const e=[d.moduleLoader.loadModule("jimu-arcgis"),d.moduleLoader.loadModule("jimu-for-builder"),d.moduleLoader.loadModule("jimu-layouts/layout-runtime.js"),d.moduleLoader.loadModule("jimu-for-builder/service.js"),d.moduleLoader.loadModule("jimu-layouts/layout-builder.js"),d.moduleLoader.loadModule("jimu-ui/advanced/style-setting-components.js"),d.moduleLoader.loadModule("jimu-ui/basic/color-picker.js"),d.moduleLoader.loadModule("jimu-ui/advanced/setting-components.js"),d.moduleLoader.loadModule("jimu-ui/advanced/theme-components.js"),d.moduleLoader.loadModule("jimu-ui/advanced/data-source-selector.js"),d.moduleLoader.loadModule("jimu-ui/basic/item-selector.js"),d.moduleLoader.loadModule("jimu-ui/advanced/resource-selector.js"),d.moduleLoader.loadModule("jimu-core/data-source.js"),d.moduleLoader.loadModule("jimu-ui/basic/imagecrop.js"),d.moduleLoader.loadModule("jimu-core/react-dom/server.js")];Promise.all(e).then((e=>{this.isLoadModuleForBuilder=!1}))},this.getRole=()=>{var e,t;let{userRole:i}=this.state;switch(null===(t=null===(e=this.props)||void 0===e?void 0:e.user)||void 0===t?void 0:t.role){case p.OrgAdmin:i=p.OrgAdmin;break;case p.OrgPublisher:i=p.OrgPublisher;break;case p.OrgUser:i=p.OrgUser;break;default:i=p.CustomRoles}this.setState({userRole:i})},this.initDropdownData=()=>{const{sortDropdownData:t,classifyDropdownData:i}=this.state;window.jimuConfig.isDevEdition||(t.push({value:"numViews",text:this.nls("applistViews")}),i.push({value:e.MyFavorites,text:this.nls("myFavorites")}),i.push({value:e.NotMe,text:this.nls("sharedWithMe")})),this.setState({sortDropdownData:t,classifyDropdownData:i})},this.getGroupList=()=>{var e;const t=(null===(e=this.props.user)||void 0===e?void 0:e.groups)||(0,d.Immutable)([]),s=[{value:i.AllGroup,text:this.nls("allApp")},{value:i.Org,text:this.nls("myOrganization",!0)}],{updateGroupIdData:a}=this.state;t.forEach((e=>{const t={value:e.id,text:e.title};e.capabilities.indexOf("updateitemcontrol")>-1&&a.push(e.id),s.push(t)})),this.setState({groupListData:s,updateGroupIdData:a})},this.getFolderList=()=>v.appServices.getFolders({num:1}).then((e=>{const t=e||[];this.initFolderListData(t)}),(e=>Promise.reject(e))),this.initFolderListData=e=>{const{user:i}=this.props,s=(null==i?void 0:i.username)||"",a=[{value:t.AllFolder,text:this.nls("allApp")}];s&&a.push({value:"root",text:s}),e.forEach((e=>{const t={value:e.id,text:e.title};a.push(t)})),this.setState({folderListData:a})},this.nls=(e,t=!1)=>t?this.props.intl?this.props.intl.formatMessage({id:e,defaultMessage:h.defaultMessages[e]}):e:this.props.intl?this.props.intl.formatMessage({id:e,defaultMessage:g[e]}):e,this.getRequestOption=(e,t=!1,i=l.My)=>{let s=(0,d.Immutable)({});s=s.merge({q:this.getSharedRequestOptionAttrQ(i)}),e&&(s="title"===e?s.merge({sortField:e,sortOrder:"asc"}):s.merge({sortField:e,sortOrder:"desc"})),window.jimuConfig.isDevEdition&&(s=s.merge({portalUrl:this.props.portalUrl}));const a=this.getPageNumAndStartNum(t,i);return s=s.merge({num:a.num,start:a.start}),s},this.getPageNumAndStartNum=(e,t=l.Group)=>{const i={num:30,start:1},{exbAdminTemplate:s,myTemplate:a}=this.state;return e&&(t===l.ExbAdmin?i.start=s.length+1:i.start=a.length+1),i},this.getSharedRequestOptionAttrQ=(e=l.Group)=>{const{groupId:t,folderId:i,userRole:s,searchTextForRequest:a}=this.state,o=d.SessionManager.getInstance().getMainSession(),r=this.props.user,n=this.getExperienceType(),{isTemplateList:c}=this.props.config,h=(null==r?void 0:r.favGroupId)||"",m=(null==o?void 0:o.username)||"",u=a?`(${a})`:"";if(!o||!r)return`type: ${n} ${u}`;const g=(null==r?void 0:r.groups.map((e=>e.id)))||[],v=`type: ${this.getExperienceType()}`,f=g.length>0?g.join(" OR "):"",w=f?"OR "+f:"",b=`NOT owner:${m}`,x="(access:shared OR access:public OR access:org)",y=s===p.OrgAdmin?"(access:org OR access:private)":"access:org",j=s===p.OrgAdmin?"(access:org OR access:private)":"(access:org)",S=c?j:y,I=f?`((orgid:${null==r?void 0:r.orgId} ${y}) OR (group: (${f}) ${x}))`:`(orgid:${null==r?void 0:r.orgId} ${y})`,N=`(orgid:${null==r?void 0:r.orgId} ${S}) OR (group: (${h} ${w}))`;switch(e){case l.Group:return`group:(${t}) type: ${n} ${x} NOT owner:${m} ${u}`;case l.Org:return`orgid:${null==r?void 0:r.orgId} ${v} ${y} NOT owner:${m} ${u}`;case l.OrgAndGroupNotMe:return`${I} ${v} ${b} ${u}`;case l.All:return window.jimuConfig.isDevEdition?`type: ${n} ${u}`:`${v} (${N} OR (owner:${m} AND NOT owner:ExB_team)) ${u}`;case l.ExbAdmin:return`type: "Web Experience Template" AND owner:ExB_team ${u}`;case l.My:return`type: ${n} orgid:${null==r?void 0:r.orgId} AND owner:${m} ${u}`;case l.Folder:return`type: ${n} ownerfolder: ${i} AND owner:${m} ${u}`;case l.Favorites:case l.AllFavorites:return`group: "${h}" type: ${n} ${u}`;case l.PubLic:return`type: ${n} access:public NOT owner:${m} AND NOT owner:ExB_team ${u}`}},this.refresh=(e,t=!1)=>{e&&!this.isRefuseSearchRequest()&&(this.searchPromise=null,this.searchPromise=this.appServiceSearchApp(e),this.searchPromise.then((e=>{const i=e.results;this.searchPromise?(this.refreshSetState(i,t),this.nextStart=e.nextStart,this.appListTotal=e.total,this.setState({isLoadSkeleton:!1,loading:!1})):this.setState({isLoadSkeleton:!1})}),(()=>{this.setState({isLoadSkeleton:!1,loading:!1})})))},this.refreshSetState=(e,t=!1)=>{const i=t?this.state.apps.asMutable({deep:!0}):[],s=t?this.state.myTemplate.asMutable({deep:!0}):[];let a=[];a=t?s.concat(e):e,e=this.initAppInfo(e),this.setState({myTemplate:(0,d.Immutable)(a),apps:(0,d.Immutable)(i.concat(e))},(()=>{this.getItemsGroups((0,d.Immutable)(e),!1,t),this.getItemsGroups((0,d.Immutable)(e),!0,t),this.isHadSearchList=!0})),clearTimeout(this.preloadModulesTimeout),this.preloadModulesTimeout=setTimeout((()=>{this.preloadModule()}),1e3)},this.initAppInfo=e=>{const{userRole:t}=this.state;return e.map((e=>{var i;return e.isLocalApp=window.jimuConfig.isDevEdition,e.portalUrl=null===(i=null==this?void 0:this.props)||void 0===i?void 0:i.portalUrl,e.userRole=t,e}))},this.isRefuseSearchRequest=()=>{const{accessType:t}=this.state,{isTemplateList:i}=this.props.config;return!(!window.jimuConfig.isDevEdition||!i||t!==e.NotMe)},this.getItemsGroups=(t,i=!1,s=!1)=>{if(window.jimuConfig.isDevEdition)return!1;const a=this.props.user,o=null==a?void 0:a.favGroupId,{updateGroupIdData:l,accessType:r}=this.state,n=s?this.state.allFavoritesIdData.asMutable({deep:!0}):[],p=s?this.state.updateGroupItemId.asMutable({deep:!0}):[];if(r===e.Me&&i||0===t.length||i&&0===l.length)return!1;let c=i?p:n;const h={items:t.map((e=>e.id)).join(","),groups:i?l.join(","):o};v.appServices.getAppGroups(h).then((e=>{var t,s;for(const i in e)null===(s=null===(t=e[i])||void 0===t?void 0:t.items)||void 0===s||s.forEach((e=>{c=c.concat([e.itemId])}));i?this.setState({updateGroupItemId:(0,d.Immutable)(c)}):this.setState({allFavoritesIdData:(0,d.Immutable)(c)})}))},this.appServiceSearchApp=e=>rt(this,void 0,void 0,(function*(){return yield v.appServices.searchApp(e,v.SearchType.Other)})),this.newApp=()=>{let e=`${window.jimuConfig.mountPath}builder/`;const t=this.getFolderIdForCreateApp();e=window.jimuConfig.useStructuralUrl?`${e}page/template`:`${e}?page=template`;const i=this.getQueryString("locale");i&&(e=d.urlUtils.appendQueryParam(e,"locale",i)),t&&(e=d.urlUtils.appendQueryParam(e,"folderId",t)),e=d.urlUtils.appendQueryParam(e,"redirect","homePage"),this.getQueryString("__env__")&&(e=d.urlUtils.appendQueryParam(e,"__env__",this.getQueryString("__env__"))),window.location.assign(e)},this.deleteApp=e=>{this.setState({loading:!0}),v.appServices.deleteApp(e).then((()=>{this.setState({loading:!1}),this.removeItem(e)}),(e=>{const t="CONT_0048"===(null==e?void 0:e.code)?this.nls("unableDelete"):this.nls("deleteError");this.setState({loading:!1,isShowAlertPopup:!0,alertPopupMessage:t})}))},this.refreshList=(e=!0)=>{this.setState({filterTitle:this.props.config.isTemplateList?this.nls("templateLabelByModified"):this.nls("labelByModified")}),e&&this.setState({searchText:""}),setTimeout((()=>{this.getParamsAndRefresh()}),1e3)},this.getFilterTitle=()=>{},this.duplicateAppItem=e=>{this.setState({loading:!0});const t=this.getFolderIdForCreateApp();v.appServices.duplicateApp(e,t).then((e=>{this.setState({loading:!1}),e&&this.refreshList(!1)}),(e=>{const t=e&&e.indexOf("Resource does not exist")>-1?this.nls("noResource"):this.nls("duplicateError");this.setState({loading:!1,isShowAlertPopup:!0,alertPopupMessage:t})}))},this.toggleLoading=e=>{this.setState({loading:e})},this.createApp=e=>{let t=this.getQueryString("locale");t=t?`&locale=${t}`:"",this.setState({loading:!0});const i=this.getFolderIdForCreateApp();v.appServices.createAppByItemTemplate(e,i).then((e=>{if(e){const i=window.jimuConfig.mountPath+"builder/?id="+e+t;window.location.href=i}this.setState({loading:!1})}),(e=>{const t=e&&e.indexOf("Resource does not exist")>-1?this.nls("noResource"):this.nls("createError");this.setState({loading:!1,isShowAlertPopup:!0,alertPopupMessage:t})}))},this.switchListView=e=>{this.setState({isDetailContent:e})},this.accessChange=s=>{let{subclassification:a}=this.state;s===e.Me?a=t.AllFolder:s===e.NotMe&&(a=i.AllGroup),this.setState({accessType:s,subclassification:a,subclassificationValue:a},(()=>{this.getParamsAndRefresh()}))},this.sharedAccessChange=e=>{const t=e.target.value;if(t===s.Default){const e=this.props.config.isTemplateList?this.nls("templateLabelByTitle"):this.nls("labelByTitle");this.setState({filterField:"title",filterTitle:e})}this.setState({sharedAccesstype:t},(()=>{this.getParamsAndRefresh()}))},this.filterFieldChange=e=>{let t="";const{isTemplateList:i}=this.props.config;switch(e){case a.Title:t=i?this.nls("templateLabelByTitle"):this.nls("labelByTitle");break;case a.NumViews:t=i?this.nls("templateLabelByView"):this.nls("labelByView");break;case a.Modified:t=i?this.nls("templateLabelByModified"):this.nls("labelByModified");break;case a.Created:t=i?this.nls("templateLabelByLastCreated"):this.nls("labelByLastCreated")}this.setState({filterField:e,filterTitle:t},(()=>{0!==this.state.apps.length&&this.getParamsAndRefresh()}))},this.handleKeydown=e=>{const t=e.target.value;"Enter"===e.key&&t&&this.setState({searchTextForRequest:t},(()=>{clearTimeout(this.onSearchTextInputed),this.getParamsAndRefresh()}))},this.searchTextChange=e=>{const t=e.target.value,i=t.length<3&&t.length>0;let{searchTextForRequest:s}=this.state;s=i?s:t,this.setState({searchText:t,searchTextForRequest:s},(()=>{if(i)return!1;clearTimeout(this.onSearchTextInputed),this.onSearchTextInputed=setTimeout((()=>{this.getParamsAndRefresh()}),500)}))},this.clearSearchText=()=>{const{searchTextForRequest:e}=this.state;clearTimeout(this.onSearchTextInputed),this.setState({searchText:"",searchTextForRequest:""},(()=>{e&&this.getParamsAndRefresh()}))},this._matchearchText=e=>{const{searchText:t}=this.state;return!t||!e||e.toLowerCase().indexOf(t.toLowerCase())>-1},this.getSubclassification=s=>{let{folderId:a,groupId:o,subclassification:l}=this.state;const{accessType:r}=this.state;switch(r){case e.Me:s===t.AllFolder?(l=t.AllFolder,a=""):(l=t.OtherFolder,a=s);break;case e.NotMe:s===i.AllGroup||s===i.Org?(l=s,o=""):(l=i.OtherGroup,o=s)}this.setState({folderId:a,groupId:o,subclassification:l,subclassificationValue:s},(()=>{this.getParamsAndRefresh()}))},this.favoriteTogle=(e,t)=>rt(this,void 0,void 0,(function*(){const i=this.props.user,s={everyone:!1,org:!1,groups:null==i?void 0:i.favGroupId,items:t};return this.setState({loading:!0}),e?yield this.removeFromFavorites(s):yield this.addToFavorite(s)})),this.addToFavorite=e=>rt(this,void 0,void 0,(function*(){const t=this.state.allFavoritesIdData.asMutable();return yield v.appServices.addToFavorites(e).then((i=>rt(this,void 0,void 0,(function*(){return t.push(e.items),this.setState({allFavoritesIdData:(0,d.Immutable)(t),loading:!1}),yield Promise.resolve(i)}))),(e=>rt(this,void 0,void 0,(function*(){return this.setState({loading:!1}),yield Promise.reject(e)}))))})),this.removeFromFavorites=t=>rt(this,void 0,void 0,(function*(){const{accessType:i,allFavoritesIdData:s}=this.state,a=s.filter((e=>e!==t.items));return v.appServices.removeFromFavorites(t).then((s=>rt(this,void 0,void 0,(function*(){return this.setState({loading:!1,allFavoritesIdData:(0,d.Immutable)(a)}),i===e.MyFavorites&&this.removeItem(t.items),yield Promise.resolve(s)}))),(e=>rt(this,void 0,void 0,(function*(){return this.setState({loading:!1}),yield Promise.reject(e)}))))})),this.removeItem=e=>{const t=this.state.apps.asMutable({deep:!0}),i=this.state.myTemplate.asMutable({deep:!0}),s=t.filter((t=>t.id!==e)),a=i.filter((t=>t.id!==e));this.setState({apps:(0,d.Immutable)(s),myTemplate:(0,d.Immutable)(a)})},this.getSubclassificationData=t=>{const{folderListData:i,groupListData:s}=this.state;let a=[];return t===e.Me&&(a=i),t===e.NotMe&&(a=s),a},this.isShowClassifyDropdown=()=>{const t=!!d.SessionManager.getInstance().getMainSession(),i=window.jimuConfig.isDevEdition,{accessType:s}=this.state;return t&&(s===e.Me||s===e.NotMe)&&!i},this.checkUserPrivilege=()=>rt(this,void 0,void 0,(function*(){const{CheckTarget:e}=d.privilegeUtils,{capabilities:t}=this.state;return yield d.privilegeUtils.checkExbAccess(e.AppList).then((e=>{this.setState({valid:null==e?void 0:e.valid,invalidMessage:null==e?void 0:e.invalidMessage,capabilities:(null==e?void 0:e.capabilities)||t,isPrivilegeCheckEnd:!0})}))})),this.toggleAlertPopup=()=>{this.setState({isShowAlertPopup:!this.state.isShowAlertPopup,alertPopupMessage:""})},this.filterUserFolder=()=>this.state.folderListData.map((e=>e.value.includes("root")?{value:"/",text:e.text}:e)).filter((e=>!e.value.includes("AllFolder"))),this.updateAppList=(e,t)=>{if(!e)return;const i=this.state.apps.asMutable({deep:!0}),s=i[t];i[t]=Object.assign(Object.assign({},s),e),this.setState({apps:(0,d.Immutable)(i)})},this.isShowAccessTypeDropdown=()=>{const{userRole:e}=this.state;return!(!d.SessionManager.getInstance().getMainSession()||window.jimuConfig.isDevEdition&&(!window.jimuConfig.isDevEdition||e!==p.OrgAdmin))},this.getItemRowNumber=()=>{var e;const t=null===(e=this.appListContainer)||void 0===e?void 0:e.clientWidth;return Math.floor(t/244)},this.state={apps:(0,d.Immutable)([]),exbAdminTemplate:(0,d.Immutable)([]),myTemplate:(0,d.Immutable)([]),isDetailContent:!0,accessType:e.Me,filterTitle:this.props.config.isTemplateList?this.nls("templateLabelByModified"):this.nls("labelByModified"),filterField:a.Modified,searchText:"",searchTextForRequest:"",loading:!1,isLoadSkeleton:!1,experienceType:v.AppType.ExperienceType,sharedAccesstype:s.Default,isRoleViewer:!0,folderId:"",groupId:"",subclassification:t.AllFolder,subclassificationValue:t.AllFolder,folderListData:[],groupListData:[],allFavoritesIdData:(0,d.Immutable)([]),updateGroupIdData:[],updateGroupItemId:(0,d.Immutable)([]),userRole:p.CustomRoles,valid:!0,invalidMessage:"",isShowAlertPopup:!1,alertPopupMessage:"",isPrivilegeCheckEnd:!1,capabilities:{canCreateExperience:!1,canDeleteExperience:!1,canShareExperience:!1,canUpdateExperience:!1,canViewExperience:!1},classifyDropdownData:[{value:e.Anyone,text:this.nls("allApp")},{value:e.Me,text:this.nls("ownByMe")}],sortDropdownData:[{value:a.Modified,text:this.nls("orderByModified")},{value:a.Title,text:this.nls("orderByTitle")},{value:a.Created,text:this.nls("lastCreated",!0)}]},this.onScrollHandle=this.onScrollHandle.bind(this)}componentDidMount(){const{portalUrl:e}=this.props;e&&!this.isHasPreload&&this.preloadData()}componentDidUpdate(e){const{config:t,queryObject:i,portalUrl:s}=this.props,a=t.isTemplateList||!1,o="templatelist"===(null==i?void 0:i.views),l=(null==e?void 0:e.portalUrl)!==s,r=o===a&&!this.isHasPreload;(l||r)&&this.preloadData(),(null==e?void 0:e.user)!==this.props.user&&this.isHasPreload&&this.getParamsAndRefresh(),(null==e?void 0:e.user)!==this.props.user&&this.getRole()}getFoldersAndGroup(){this.getFolderList(),this.getGroupList()}onScrollHandle(e){const t=e.target.clientHeight,i=e.target.scrollHeight-2,s=e.target.scrollTop;if(s>this.scrollPosition){const e=t+s>=i;!this.state.isLoadSkeleton&&e&&0!==this.state.apps.length&&this.getParamsAndRefresh(!0)}this.scrollPosition=s}componentWillUnmount(){this.contentNode&&(this.contentNode.removeEventListener("scroll",this.onScrollHandle.bind(this)),nt.scrollTop=this.contentNode.scrollTop)}getExperienceType(){let e=v.AppType.ExperienceType;return this.props.config.isTemplateList&&(e=v.AppType.TemplateType),this.setState({experienceType:e}),`"${e}"`}getQueryString(e){return d.queryString.parse(window.location.search)[e]||""}getParamsAndRefresh(s=!1){const a=this.nextStart,o=this.appListTotal,r=a&&o&&(a>o||a<0)&&s;if(!this.props.user||r)return;s?this.isHadSearchList=!1:(this.nextStart=null,this.appListTotal=null,this.setState({apps:(0,d.Immutable)([])})),this.setState({isLoadSkeleton:!0});const{accessType:n,subclassification:p}=this.state;if(n===e.Default)return this.setState({isLoadSkeleton:!1}),!1;let c=l.My;switch(n){case e.Me:c=p===t.AllFolder?l.My:l.Folder;break;case e.Anyone:c=l.All;break;case e.NotMe:c=p===i.AllGroup?l.OrgAndGroupNotMe:p===i.Org?l.Org:l.Group;break;case e.MyFavorites:c=l.Favorites;break;case e.Public:c=l.PubLic}const h=this.getRequestOption(this.state.filterField,s,c);this.refresh(h,s)}experiencesRefresh(e=!1){const t=this.getRequestOption(this.state.filterField,e);this.setState({isLoadSkeleton:!0}),this.refresh(t,e)}getFolderIdForCreateApp(){const{folderId:e}=this.state,t=!e.includes("root");return e&&!window.jimuConfig.isDevEdition&&t?e:null}render(){const{isDetailContent:e,loading:t,accessType:i,classifyDropdownData:s,sortDropdownData:a,subclassificationValue:o,allFavoritesIdData:l,capabilities:r,updateGroupItemId:n,valid:p,invalidMessage:c,apps:u,isShowAlertPopup:g,alertPopupMessage:v,searchText:f,isPrivilegeCheckEnd:w,isLoadSkeleton:b,folderListData:x,groupListData:y}=this.state,j=this.props.config.isTemplateList||!1,S=this.getSubclassificationData(i),I=this.getItemRowNumber(),N={deleteApp:this.deleteApp,refreshList:this.refreshList,duplicateAppItem:this.duplicateAppItem,createApp:this.createApp,favoriteTogle:this.favoriteTogle,getFolderList:this.getFolderList,isLoadSkeleton:b,theme:this.props.theme,skeletonNum:I};return p||this.props.isTest?(0,d.jsx)(m.Provider,{value:N},(0,d.jsx)("div",{css:fe(this.props.theme),className:"h-100","data-testid":"app-list"},(0,d.jsx)("div",{className:"widget-builder-app-list bg-light-300 h-100"},(0,d.jsx)("div",{className:"banner-con bg-light-300"},(0,d.jsx)("div",{className:"widget-builder-app-list-screen"},(0,d.jsx)("div",{style:{overflow:"hidden"},className:"app-list-search-container"},(0,d.jsx)("div",{className:"app-list-banner d-flex justify-content-between",style:{position:"relative"}},(0,d.jsx)("h2",{className:" list-title flex-grow-1"},this.state.filterTitle),window.jimuConfig.isDevEdition&&(0,d.jsx)("div",null,(0,d.jsx)(et,{folderList:(0,d.Immutable)(x),groupList:(0,d.Immutable)(y),sortData:(0,d.Immutable)(a),isExperiencesTemplate:j,portalUrl:this.props.portalUrl,folderUrl:this.props.context.folderUrl,intl:this.props.intl,refreshAppList:this.refreshList,toggleLoading:this.toggleLoading})),!j&&r.canCreateExperience&&(0,d.jsx)(h.Button,{className:"float-left btn-lg pt-0 pb-0 app-list-newapp mr-4",size:"lg",type:"primary",onClick:this.newApp},(0,d.jsx)(Y,{autoFlip:!0,className:"app-list-newapp-icon"}),this.nls("newApp"))))),(0,d.jsx)("div",{className:"app-list-filterbar "},(0,d.jsx)("div",{className:"d-flex justify-content-between align-items-center app-list-filterbar-title widget-builder-app-list-screen"},(0,d.jsx)("div",{className:"search-con d-flex position-relative"},(0,d.jsx)(h.TextInput,{className:"float-left app-list-searchbox app-list-h1 flex-sm-fill",placeholder:this.nls("homePageSearch"),onChange:this.searchTextChange,value:f,prefix:(0,d.jsx)(Ce,{autoFlip:!1,className:"app-list-searchIconFill"}),allowClear:!0,ref:e=>{this.searchInput=e},onKeyDown:e=>{this.handleKeydown(e)}})),(0,d.jsx)("div",{className:"text-right align-middle"},this.isShowAccessTypeDropdown()&&(0,d.jsx)($e,{onChange:this.accessChange,value:i,isShowSelectIcon:!0,dropDownData:(0,d.Immutable)(s)}),this.isShowClassifyDropdown()&&S.length>0&&(0,d.jsx)($e,{onChange:this.getSubclassification,value:o,isShowSelectIcon:!0,dropDownData:(0,d.Immutable)(S)}),(0,d.jsx)($e,{onChange:this.filterFieldChange,value:this.state.filterField,isShowSelectIcon:!0,dropDownData:(0,d.Immutable)(a)}),(0,d.jsx)("div",{className:"app-list-switchview-con","data-testid":"icon-view-con"},(0,d.jsx)(h.ButtonGroup,null,(0,d.jsx)(h.Tooltip,{placement:"bottom",title:this.nls("cardView")},(0,d.jsx)(h.Button,{icon:!0,type:e?"primary":void 0,className:" app-list-switchview jimu-outline-inside",onClick:()=>this.switchListView(!0),"data-testid":"icon-view-card","aria-pressed":e},(0,d.jsx)(st,{autoFlip:!0,className:"app-list-iconfill app-list-iconmargin",size:14}))),(0,d.jsx)(h.Tooltip,{placement:"bottom",title:this.nls("listView")},(0,d.jsx)(h.Button,{icon:!0,"data-testid":"icon-view-list",type:e?void 0:"primary","aria-pressed":!e,className:" app-list-switchview jimu-outline-inside app-list-switchview-btton app-list-switchview-right",onClick:()=>this.switchListView(!1)},(0,d.jsx)(lt,{autoFlip:!0,className:"app-list-iconfill app-list-iconmargin",size:14}))))))))),(0,d.jsx)("div",{className:"app-list-item-scroll-con",ref:e=>this.contentNode=e},(0,d.jsx)("div",{className:"widget-builder-app-list-screen",ref:e=>{this.appListContainer=e}},(0,d.jsx)("div",{className:"app-list-content",id:"itemContent"},(0,d.jsx)(ve,{isDetailContent:this.state.isDetailContent,portalUrl:this.props.portalUrl,intl:this.props.intl,folderUrl:this.props.context.folderUrl,apps:u,switchListView:this.switchListView,isTemplateList:j,allFavoritesIdData:l,capabilities:r,updateGroupItemId:n,folderListData:this.filterUserFolder(),isPrivilegeCheckEnd:w,updateAppList:this.updateAppList}))),u.length<1&&!t&&!b&&this.isHadSearchList&&(0,d.jsx)(Ze,{searchText:f,isTemplateList:j,accessType:i,intl:this.props.intl,portalUrl:this.props.portalUrl,folderUrl:this.props.context.folderUrl}))),this.state.loading&&(0,d.jsx)("div",{className:"loading-con"},(0,d.jsx)("div",{style:{position:"absolute",left:"50%",top:"50%"},className:"jimu-primary-loading"})),(0,d.jsx)(h.AlertPopup,{isOpen:g,title:this.nls("popUpTitle"),hideCancel:!0,toggle:this.toggleAlertPopup},(0,d.jsx)("div",{style:{fontSize:"1rem"}},v)))):(0,d.jsx)("div",{css:fe(this.props.theme),className:"invalid-message position-absolute"},c)}}nt.scrollTop=0,nt.mapExtraStateProps=(e,t)=>({queryObject:e.queryObject})})(),n})())}}}));