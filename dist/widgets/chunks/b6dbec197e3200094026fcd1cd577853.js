"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkexb_client"] = self["webpackChunkexb_client"] || []).push([["node_modules_arcgis_core_layers_support_labelFormatUtils_js"],{

/***/ "./node_modules/@arcgis/core/layers/support/labelFormatUtils.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@arcgis/core/layers/support/labelFormatUtils.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createLabelFunction\": () => (/* binding */ m),\n/* harmony export */   \"formatField\": () => (/* binding */ d)\n/* harmony export */ });\n/* harmony import */ var _core_Error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Error.js */ \"./node_modules/@arcgis/core/core/Error.js\");\n/* harmony import */ var _core_Logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/Logger.js */ \"./node_modules/@arcgis/core/core/Logger.js\");\n/* harmony import */ var _core_maybe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/maybe.js */ \"./node_modules/@arcgis/core/core/maybe.js\");\n/* harmony import */ var _intl_date_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../intl/date.js */ \"./node_modules/@arcgis/core/intl/date.js\");\n/* harmony import */ var _intl_number_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../intl/number.js */ \"./node_modules/@arcgis/core/intl/number.js\");\n/* harmony import */ var _fieldUtils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fieldUtils.js */ \"./node_modules/@arcgis/core/layers/support/fieldUtils.js\");\n/* harmony import */ var _labelUtils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./labelUtils.js */ \"./node_modules/@arcgis/core/layers/support/labelUtils.js\");\n/* harmony import */ var _support_arcadeOnDemand_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../support/arcadeOnDemand.js */ \"./node_modules/@arcgis/core/support/arcadeOnDemand.js\");\n/*\nAll material copyright ESRI, All Rights Reserved, unless otherwise specified.\nSee https://js.arcgis.com/4.25/esri/copyright.txt for details.\n*/\nconst c=_core_Logger_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getLogger(\"esri.layers.support.labelFormatUtils\"),f={type:\"simple\",evaluate:()=>null},p={getAttribute:(e,r)=>e.field(r)};async function m(r,a,n){if(!r||!r.symbol)return f;const o=r.where,i=(0,_labelUtils_js__WEBPACK_IMPORTED_MODULE_6__.getLabelExpression)(r),m=o?await Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../../core/sql/WhereClause.js */ \"./node_modules/@arcgis/core/core/sql/WhereClause.js\")):null;let g;if(\"arcade\"===i.type){const r=await (0,_support_arcadeOnDemand_js__WEBPACK_IMPORTED_MODULE_7__.createLabelExpression)(i.expression,n,a);if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_2__.isNone)(r))return f;g={type:\"arcade\",evaluate(t){try{const e=r.evaluate({$feature:\"attributes\"in t?r.repurposeFeature(t):t});if(null!=e)return e.toString()}catch(a){c.error(new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"arcade-expression-error\",\"Encountered an error when evaluating label expression for feature\",{feature:t,expression:i}))}return null},needsHydrationToEvaluate:()=>null==(0,_labelUtils_js__WEBPACK_IMPORTED_MODULE_6__.getSingleFieldArcadeExpression)(i.expression)}}else g={type:\"simple\",evaluate:e=>i.expression.replace(/{[^}]*}/g,(r=>{const t=r.slice(1,-1),n=a.get(t);if(!n)return r;let o=null;if(\"attributes\"in e){e&&e.attributes&&(o=e.attributes[n.name])}else o=e.field(n.name);return null==o?\"\":d(o,n)}))};if(o){let r;try{r=m.WhereClause.create(o,a)}catch(y){return c.error(new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"bad-where-clause\",\"Encountered an error when evaluating where clause, ignoring\",{where:o,error:y})),f}const t=g.evaluate;g.evaluate=a=>{const n=\"attributes\"in a?void 0:p;try{if(r.testFeature(a,n))return t(a)}catch(y){c.error(new _core_Error_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"bad-where-clause\",\"Encountered an error when evaluating where clause for feature\",{where:o,feature:a,error:y}))}return null}}return g}function d(e,r){if(null==e)return\"\";const t=r.domain;if(t)if(\"codedValue\"===t.type||\"coded-value\"===t.type){const r=e;for(const e of t.codedValues)if(e.code===r)return e.name}else if(\"range\"===t.type){const r=+e,a=\"range\"in t?t.range[0]:t.minValue,n=\"range\"in t?t.range[1]:t.maxValue;if(a<=r&&r<=n)return t.name}let l=e;return\"date\"===r.type||\"esriFieldTypeDate\"===r.type?l=(0,_intl_date_js__WEBPACK_IMPORTED_MODULE_3__.formatDate)(l,(0,_intl_date_js__WEBPACK_IMPORTED_MODULE_3__.convertDateFormatToIntlOptions)(\"short-date\")):(0,_fieldUtils_js__WEBPACK_IMPORTED_MODULE_5__.isNumericField)(r)&&(l=(0,_intl_number_js__WEBPACK_IMPORTED_MODULE_4__.formatNumber)(+l)),l||\"\"}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL2xheWVycy9zdXBwb3J0L2xhYmVsRm9ybWF0VXRpbHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BhcmNnaXMvY29yZS9sYXllcnMvc3VwcG9ydC9sYWJlbEZvcm1hdFV0aWxzLmpzPzJjN2YiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbkFsbCBtYXRlcmlhbCBjb3B5cmlnaHQgRVNSSSwgQWxsIFJpZ2h0cyBSZXNlcnZlZCwgdW5sZXNzIG90aGVyd2lzZSBzcGVjaWZpZWQuXG5TZWUgaHR0cHM6Ly9qcy5hcmNnaXMuY29tLzQuMjUvZXNyaS9jb3B5cmlnaHQudHh0IGZvciBkZXRhaWxzLlxuKi9cbmltcG9ydCBlIGZyb21cIi4uLy4uL2NvcmUvRXJyb3IuanNcIjtpbXBvcnQgciBmcm9tXCIuLi8uLi9jb3JlL0xvZ2dlci5qc1wiO2ltcG9ydHtpc05vbmUgYXMgdH1mcm9tXCIuLi8uLi9jb3JlL21heWJlLmpzXCI7aW1wb3J0e2Zvcm1hdERhdGUgYXMgYSxjb252ZXJ0RGF0ZUZvcm1hdFRvSW50bE9wdGlvbnMgYXMgbn1mcm9tXCIuLi8uLi9pbnRsL2RhdGUuanNcIjtpbXBvcnR7Zm9ybWF0TnVtYmVyIGFzIG99ZnJvbVwiLi4vLi4vaW50bC9udW1iZXIuanNcIjtpbXBvcnR7aXNOdW1lcmljRmllbGQgYXMgaX1mcm9tXCIuL2ZpZWxkVXRpbHMuanNcIjtpbXBvcnR7Z2V0TGFiZWxFeHByZXNzaW9uIGFzIGwsZ2V0U2luZ2xlRmllbGRBcmNhZGVFeHByZXNzaW9uIGFzIHV9ZnJvbVwiLi9sYWJlbFV0aWxzLmpzXCI7aW1wb3J0e2NyZWF0ZUxhYmVsRXhwcmVzc2lvbiBhcyBzfWZyb21cIi4uLy4uL3N1cHBvcnQvYXJjYWRlT25EZW1hbmQuanNcIjtjb25zdCBjPXIuZ2V0TG9nZ2VyKFwiZXNyaS5sYXllcnMuc3VwcG9ydC5sYWJlbEZvcm1hdFV0aWxzXCIpLGY9e3R5cGU6XCJzaW1wbGVcIixldmFsdWF0ZTooKT0+bnVsbH0scD17Z2V0QXR0cmlidXRlOihlLHIpPT5lLmZpZWxkKHIpfTthc3luYyBmdW5jdGlvbiBtKHIsYSxuKXtpZighcnx8IXIuc3ltYm9sKXJldHVybiBmO2NvbnN0IG89ci53aGVyZSxpPWwociksbT1vP2F3YWl0IGltcG9ydChcIi4uLy4uL2NvcmUvc3FsL1doZXJlQ2xhdXNlLmpzXCIpOm51bGw7bGV0IGc7aWYoXCJhcmNhZGVcIj09PWkudHlwZSl7Y29uc3Qgcj1hd2FpdCBzKGkuZXhwcmVzc2lvbixuLGEpO2lmKHQocikpcmV0dXJuIGY7Zz17dHlwZTpcImFyY2FkZVwiLGV2YWx1YXRlKHQpe3RyeXtjb25zdCBlPXIuZXZhbHVhdGUoeyRmZWF0dXJlOlwiYXR0cmlidXRlc1wiaW4gdD9yLnJlcHVycG9zZUZlYXR1cmUodCk6dH0pO2lmKG51bGwhPWUpcmV0dXJuIGUudG9TdHJpbmcoKX1jYXRjaChhKXtjLmVycm9yKG5ldyBlKFwiYXJjYWRlLWV4cHJlc3Npb24tZXJyb3JcIixcIkVuY291bnRlcmVkIGFuIGVycm9yIHdoZW4gZXZhbHVhdGluZyBsYWJlbCBleHByZXNzaW9uIGZvciBmZWF0dXJlXCIse2ZlYXR1cmU6dCxleHByZXNzaW9uOml9KSl9cmV0dXJuIG51bGx9LG5lZWRzSHlkcmF0aW9uVG9FdmFsdWF0ZTooKT0+bnVsbD09dShpLmV4cHJlc3Npb24pfX1lbHNlIGc9e3R5cGU6XCJzaW1wbGVcIixldmFsdWF0ZTplPT5pLmV4cHJlc3Npb24ucmVwbGFjZSgve1tefV0qfS9nLChyPT57Y29uc3QgdD1yLnNsaWNlKDEsLTEpLG49YS5nZXQodCk7aWYoIW4pcmV0dXJuIHI7bGV0IG89bnVsbDtpZihcImF0dHJpYnV0ZXNcImluIGUpe2UmJmUuYXR0cmlidXRlcyYmKG89ZS5hdHRyaWJ1dGVzW24ubmFtZV0pfWVsc2Ugbz1lLmZpZWxkKG4ubmFtZSk7cmV0dXJuIG51bGw9PW8/XCJcIjpkKG8sbil9KSl9O2lmKG8pe2xldCByO3RyeXtyPW0uV2hlcmVDbGF1c2UuY3JlYXRlKG8sYSl9Y2F0Y2goeSl7cmV0dXJuIGMuZXJyb3IobmV3IGUoXCJiYWQtd2hlcmUtY2xhdXNlXCIsXCJFbmNvdW50ZXJlZCBhbiBlcnJvciB3aGVuIGV2YWx1YXRpbmcgd2hlcmUgY2xhdXNlLCBpZ25vcmluZ1wiLHt3aGVyZTpvLGVycm9yOnl9KSksZn1jb25zdCB0PWcuZXZhbHVhdGU7Zy5ldmFsdWF0ZT1hPT57Y29uc3Qgbj1cImF0dHJpYnV0ZXNcImluIGE/dm9pZCAwOnA7dHJ5e2lmKHIudGVzdEZlYXR1cmUoYSxuKSlyZXR1cm4gdChhKX1jYXRjaCh5KXtjLmVycm9yKG5ldyBlKFwiYmFkLXdoZXJlLWNsYXVzZVwiLFwiRW5jb3VudGVyZWQgYW4gZXJyb3Igd2hlbiBldmFsdWF0aW5nIHdoZXJlIGNsYXVzZSBmb3IgZmVhdHVyZVwiLHt3aGVyZTpvLGZlYXR1cmU6YSxlcnJvcjp5fSkpfXJldHVybiBudWxsfX1yZXR1cm4gZ31mdW5jdGlvbiBkKGUscil7aWYobnVsbD09ZSlyZXR1cm5cIlwiO2NvbnN0IHQ9ci5kb21haW47aWYodClpZihcImNvZGVkVmFsdWVcIj09PXQudHlwZXx8XCJjb2RlZC12YWx1ZVwiPT09dC50eXBlKXtjb25zdCByPWU7Zm9yKGNvbnN0IGUgb2YgdC5jb2RlZFZhbHVlcylpZihlLmNvZGU9PT1yKXJldHVybiBlLm5hbWV9ZWxzZSBpZihcInJhbmdlXCI9PT10LnR5cGUpe2NvbnN0IHI9K2UsYT1cInJhbmdlXCJpbiB0P3QucmFuZ2VbMF06dC5taW5WYWx1ZSxuPVwicmFuZ2VcImluIHQ/dC5yYW5nZVsxXTp0Lm1heFZhbHVlO2lmKGE8PXImJnI8PW4pcmV0dXJuIHQubmFtZX1sZXQgbD1lO3JldHVyblwiZGF0ZVwiPT09ci50eXBlfHxcImVzcmlGaWVsZFR5cGVEYXRlXCI9PT1yLnR5cGU/bD1hKGwsbihcInNob3J0LWRhdGVcIikpOmkocikmJihsPW8oK2wpKSxsfHxcIlwifWV4cG9ydHttIGFzIGNyZWF0ZUxhYmVsRnVuY3Rpb24sZCBhcyBmb3JtYXRGaWVsZH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@arcgis/core/layers/support/labelFormatUtils.js\n");

/***/ }),

/***/ "./node_modules/@arcgis/core/layers/support/labelUtils.js":
/*!****************************************************************!*\
  !*** ./node_modules/@arcgis/core/layers/support/labelUtils.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"convertTemplatedStringToArcade\": () => (/* binding */ w),\n/* harmony export */   \"getLabelExpression\": () => (/* binding */ x),\n/* harmony export */   \"getLabelExpressionArcade\": () => (/* binding */ f),\n/* harmony export */   \"getLabelExpressionSingleField\": () => (/* binding */ g),\n/* harmony export */   \"getSingleFieldArcadeExpression\": () => (/* binding */ _),\n/* harmony export */   \"getSingleFieldTemplatedString\": () => (/* binding */ $),\n/* harmony export */   \"sqlToTemplateString\": () => (/* binding */ p),\n/* harmony export */   \"templateStringToSql\": () => (/* binding */ u)\n/* harmony export */ });\n/* harmony import */ var _core_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/string.js */ \"./node_modules/@arcgis/core/core/string.js\");\n/*\nAll material copyright ESRI, All Rights Reserved, unless otherwise specified.\nSee https://js.arcgis.com/4.25/esri/copyright.txt for details.\n*/\nconst n=\"__begin__\",r=\"__end__\",s=new RegExp(n,\"ig\"),t=new RegExp(r,\"ig\"),o=new RegExp(\"^\"+n,\"i\"),i=new RegExp(r+\"$\",\"i\"),l='\"',a=l+\" + \",c=\" + \"+l;function p(e){return e.replace(new RegExp(\"\\\\[\",\"g\"),\"{\").replace(new RegExp(\"\\\\]\",\"g\"),\"}\")}function u(e){return e.replace(new RegExp(\"\\\\{\",\"g\"),\"[\").replace(new RegExp(\"\\\\}\",\"g\"),\"]\")}function x(e){const n={expression:\"\",type:\"none\"};return e.labelExpressionInfo?e.labelExpressionInfo.value?(n.expression=e.labelExpressionInfo.value,n.type=\"conventional\"):e.labelExpressionInfo.expression&&(n.expression=e.labelExpressionInfo.expression,n.type=\"arcade\"):null!=e.labelExpression&&(n.expression=p(e.labelExpression),n.type=\"conventional\"),n}function f(e){const n=x(e);if(!n)return null;switch(n.type){case\"conventional\":return w(n.expression);case\"arcade\":return n.expression}return null}function g(e){const n=x(e);if(!n)return null;switch(n.type){case\"conventional\":return $(n.expression);case\"arcade\":return _(n.expression)}return null}function w(p){let u;return p?(u=(0,_core_string_js__WEBPACK_IMPORTED_MODULE_0__.replace)(p,(e=>n+'$feature[\"'+e+'\"]'+r)),u=o.test(u)?u.replace(o,\"\"):l+u,u=i.test(u)?u.replace(i,\"\"):u+l,u=u.replace(s,a).replace(t,c)):u='\"\"',u}const E=/^\\s*\\{([^}]+)\\}\\s*$/i;function $(e){const n=e.match(E);return n&&n[1].trim()||null}const b=/^\\s*(?:(?:\\$feature\\.(\\w+))|(?:\\$feature\\[([\"'])([\\w\\s]+)(\\2)\\]));?\\s*$/i,m=/^\\s*(?:(?:\\$feature\\.(\\w+))|(?:\\$feature\\[([\"'])([\\w\\s]+)(\\2)\\]));?\\s*(?:DomainName\\(\\s*\\$feature\\s*,\\s*([\"'])(\\1|\\3)(\\5)\\s*\\));?\\s*$/i,R=/^\\s*(?:DomainName\\(\\s*\\$feature\\s*,\\s*([\"'])([\\w\\s]+)(\\1)\\s*\\));?\\s*$/i;function _(e){if(!e)return null;let n=b.exec(e)||m.exec(e);return n?n[1]||n[3]:(n=R.exec(e),n?n[2]:null)}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL2xheWVycy9zdXBwb3J0L2xhYmVsVXRpbHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL2xheWVycy9zdXBwb3J0L2xhYmVsVXRpbHMuanM/MjdjMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQWxsIG1hdGVyaWFsIGNvcHlyaWdodCBFU1JJLCBBbGwgUmlnaHRzIFJlc2VydmVkLCB1bmxlc3Mgb3RoZXJ3aXNlIHNwZWNpZmllZC5cblNlZSBodHRwczovL2pzLmFyY2dpcy5jb20vNC4yNS9lc3JpL2NvcHlyaWdodC50eHQgZm9yIGRldGFpbHMuXG4qL1xuaW1wb3J0e3JlcGxhY2UgYXMgZX1mcm9tXCIuLi8uLi9jb3JlL3N0cmluZy5qc1wiO2NvbnN0IG49XCJfX2JlZ2luX19cIixyPVwiX19lbmRfX1wiLHM9bmV3IFJlZ0V4cChuLFwiaWdcIiksdD1uZXcgUmVnRXhwKHIsXCJpZ1wiKSxvPW5ldyBSZWdFeHAoXCJeXCIrbixcImlcIiksaT1uZXcgUmVnRXhwKHIrXCIkXCIsXCJpXCIpLGw9J1wiJyxhPWwrXCIgKyBcIixjPVwiICsgXCIrbDtmdW5jdGlvbiBwKGUpe3JldHVybiBlLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcXFxbXCIsXCJnXCIpLFwie1wiKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJcXFxcXVwiLFwiZ1wiKSxcIn1cIil9ZnVuY3Rpb24gdShlKXtyZXR1cm4gZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJcXFxce1wiLFwiZ1wiKSxcIltcIikucmVwbGFjZShuZXcgUmVnRXhwKFwiXFxcXH1cIixcImdcIiksXCJdXCIpfWZ1bmN0aW9uIHgoZSl7Y29uc3Qgbj17ZXhwcmVzc2lvbjpcIlwiLHR5cGU6XCJub25lXCJ9O3JldHVybiBlLmxhYmVsRXhwcmVzc2lvbkluZm8/ZS5sYWJlbEV4cHJlc3Npb25JbmZvLnZhbHVlPyhuLmV4cHJlc3Npb249ZS5sYWJlbEV4cHJlc3Npb25JbmZvLnZhbHVlLG4udHlwZT1cImNvbnZlbnRpb25hbFwiKTplLmxhYmVsRXhwcmVzc2lvbkluZm8uZXhwcmVzc2lvbiYmKG4uZXhwcmVzc2lvbj1lLmxhYmVsRXhwcmVzc2lvbkluZm8uZXhwcmVzc2lvbixuLnR5cGU9XCJhcmNhZGVcIik6bnVsbCE9ZS5sYWJlbEV4cHJlc3Npb24mJihuLmV4cHJlc3Npb249cChlLmxhYmVsRXhwcmVzc2lvbiksbi50eXBlPVwiY29udmVudGlvbmFsXCIpLG59ZnVuY3Rpb24gZihlKXtjb25zdCBuPXgoZSk7aWYoIW4pcmV0dXJuIG51bGw7c3dpdGNoKG4udHlwZSl7Y2FzZVwiY29udmVudGlvbmFsXCI6cmV0dXJuIHcobi5leHByZXNzaW9uKTtjYXNlXCJhcmNhZGVcIjpyZXR1cm4gbi5leHByZXNzaW9ufXJldHVybiBudWxsfWZ1bmN0aW9uIGcoZSl7Y29uc3Qgbj14KGUpO2lmKCFuKXJldHVybiBudWxsO3N3aXRjaChuLnR5cGUpe2Nhc2VcImNvbnZlbnRpb25hbFwiOnJldHVybiAkKG4uZXhwcmVzc2lvbik7Y2FzZVwiYXJjYWRlXCI6cmV0dXJuIF8obi5leHByZXNzaW9uKX1yZXR1cm4gbnVsbH1mdW5jdGlvbiB3KHApe2xldCB1O3JldHVybiBwPyh1PWUocCwoZT0+bisnJGZlYXR1cmVbXCInK2UrJ1wiXScrcikpLHU9by50ZXN0KHUpP3UucmVwbGFjZShvLFwiXCIpOmwrdSx1PWkudGVzdCh1KT91LnJlcGxhY2UoaSxcIlwiKTp1K2wsdT11LnJlcGxhY2UocyxhKS5yZXBsYWNlKHQsYykpOnU9J1wiXCInLHV9Y29uc3QgRT0vXlxccypcXHsoW159XSspXFx9XFxzKiQvaTtmdW5jdGlvbiAkKGUpe2NvbnN0IG49ZS5tYXRjaChFKTtyZXR1cm4gbiYmblsxXS50cmltKCl8fG51bGx9Y29uc3QgYj0vXlxccyooPzooPzpcXCRmZWF0dXJlXFwuKFxcdyspKXwoPzpcXCRmZWF0dXJlXFxbKFtcIiddKShbXFx3XFxzXSspKFxcMilcXF0pKTs/XFxzKiQvaSxtPS9eXFxzKig/Oig/OlxcJGZlYXR1cmVcXC4oXFx3KykpfCg/OlxcJGZlYXR1cmVcXFsoW1wiJ10pKFtcXHdcXHNdKykoXFwyKVxcXSkpOz9cXHMqKD86RG9tYWluTmFtZVxcKFxccypcXCRmZWF0dXJlXFxzKixcXHMqKFtcIiddKShcXDF8XFwzKShcXDUpXFxzKlxcKSk7P1xccyokL2ksUj0vXlxccyooPzpEb21haW5OYW1lXFwoXFxzKlxcJGZlYXR1cmVcXHMqLFxccyooW1wiJ10pKFtcXHdcXHNdKykoXFwxKVxccypcXCkpOz9cXHMqJC9pO2Z1bmN0aW9uIF8oZSl7aWYoIWUpcmV0dXJuIG51bGw7bGV0IG49Yi5leGVjKGUpfHxtLmV4ZWMoZSk7cmV0dXJuIG4/blsxXXx8blszXToobj1SLmV4ZWMoZSksbj9uWzJdOm51bGwpfWV4cG9ydHt3IGFzIGNvbnZlcnRUZW1wbGF0ZWRTdHJpbmdUb0FyY2FkZSx4IGFzIGdldExhYmVsRXhwcmVzc2lvbixmIGFzIGdldExhYmVsRXhwcmVzc2lvbkFyY2FkZSxnIGFzIGdldExhYmVsRXhwcmVzc2lvblNpbmdsZUZpZWxkLF8gYXMgZ2V0U2luZ2xlRmllbGRBcmNhZGVFeHByZXNzaW9uLCQgYXMgZ2V0U2luZ2xlRmllbGRUZW1wbGF0ZWRTdHJpbmcscCBhcyBzcWxUb1RlbXBsYXRlU3RyaW5nLHUgYXMgdGVtcGxhdGVTdHJpbmdUb1NxbH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@arcgis/core/layers/support/labelUtils.js\n");

/***/ })

}]);