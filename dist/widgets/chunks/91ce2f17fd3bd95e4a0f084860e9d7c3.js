"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkexb_client"] = self["webpackChunkexb_client"] || []).push([["node_modules_arcgis_core_core_uuid_js"],{

/***/ "./node_modules/@arcgis/core/core/uuid.js":
/*!************************************************!*\
  !*** ./node_modules/@arcgis/core/core/uuid.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"generateUUID\": () => (/* binding */ n)\n/* harmony export */ });\n/*\nAll material copyright ESRI, All Rights Reserved, unless otherwise specified.\nSee https://js.arcgis.com/4.25/esri/copyright.txt for details.\n*/\nconst t=\"randomUUID\"in crypto;function n(){if(t)return crypto.randomUUID();const n=crypto.getRandomValues(new Uint16Array(8));n[3]=4095&n[3]|16384,n[4]=16383&n[4]|32768;const r=t=>n[t].toString(16).padStart(4,\"0\");return r(0)+r(1)+\"-\"+r(2)+\"-\"+r(3)+\"-\"+r(4)+\"-\"+r(5)+r(6)+r(7)}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL2NvcmUvdXVpZC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL2NvcmUvdXVpZC5qcz9hNjU4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qXG5BbGwgbWF0ZXJpYWwgY29weXJpZ2h0IEVTUkksIEFsbCBSaWdodHMgUmVzZXJ2ZWQsIHVubGVzcyBvdGhlcndpc2Ugc3BlY2lmaWVkLlxuU2VlIGh0dHBzOi8vanMuYXJjZ2lzLmNvbS80LjI1L2VzcmkvY29weXJpZ2h0LnR4dCBmb3IgZGV0YWlscy5cbiovXG5jb25zdCB0PVwicmFuZG9tVVVJRFwiaW4gY3J5cHRvO2Z1bmN0aW9uIG4oKXtpZih0KXJldHVybiBjcnlwdG8ucmFuZG9tVVVJRCgpO2NvbnN0IG49Y3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDE2QXJyYXkoOCkpO25bM109NDA5NSZuWzNdfDE2Mzg0LG5bNF09MTYzODMmbls0XXwzMjc2ODtjb25zdCByPXQ9Pm5bdF0udG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDQsXCIwXCIpO3JldHVybiByKDApK3IoMSkrXCItXCIrcigyKStcIi1cIityKDMpK1wiLVwiK3IoNCkrXCItXCIrcig1KStyKDYpK3IoNyl9ZXhwb3J0e24gYXMgZ2VuZXJhdGVVVUlEfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/@arcgis/core/core/uuid.js\n");

/***/ })

}]);