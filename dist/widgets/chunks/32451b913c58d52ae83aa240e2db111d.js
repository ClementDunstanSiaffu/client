"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkexb_client"] = self["webpackChunkexb_client"] || []).push([["node_modules_arcgis_core_rest_query_operations_query_js"],{

/***/ "./node_modules/@arcgis/core/rest/operations/urlUtils.js":
/*!***************************************************************!*\
  !*** ./node_modules/@arcgis/core/rest/operations/urlUtils.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"mapParameters\": () => (/* binding */ t)\n/* harmony export */ });\n/*\nAll material copyright ESRI, All Rights Reserved, unless otherwise specified.\nSee https://js.arcgis.com/4.25/esri/copyright.txt for details.\n*/\nfunction t(n){const o={};for(const e in n){if(\"declaredClass\"===e)continue;const r=n[e];if(null!=r&&\"function\"!=typeof r)if(Array.isArray(r)){o[e]=[];for(let n=0;n<r.length;n++)o[e][n]=t(r[n])}else\"object\"==typeof r?r.toJSON&&(o[e]=JSON.stringify(r)):o[e]=r}return o}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL3Jlc3Qvb3BlcmF0aW9ucy91cmxVdGlscy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL3Jlc3Qvb3BlcmF0aW9ucy91cmxVdGlscy5qcz9hYTVmIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG5BbGwgbWF0ZXJpYWwgY29weXJpZ2h0IEVTUkksIEFsbCBSaWdodHMgUmVzZXJ2ZWQsIHVubGVzcyBvdGhlcndpc2Ugc3BlY2lmaWVkLlxuU2VlIGh0dHBzOi8vanMuYXJjZ2lzLmNvbS80LjI1L2VzcmkvY29weXJpZ2h0LnR4dCBmb3IgZGV0YWlscy5cbiovXG5mdW5jdGlvbiB0KG4pe2NvbnN0IG89e307Zm9yKGNvbnN0IGUgaW4gbil7aWYoXCJkZWNsYXJlZENsYXNzXCI9PT1lKWNvbnRpbnVlO2NvbnN0IHI9bltlXTtpZihudWxsIT1yJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiByKWlmKEFycmF5LmlzQXJyYXkocikpe29bZV09W107Zm9yKGxldCBuPTA7bjxyLmxlbmd0aDtuKyspb1tlXVtuXT10KHJbbl0pfWVsc2VcIm9iamVjdFwiPT10eXBlb2Ygcj9yLnRvSlNPTiYmKG9bZV09SlNPTi5zdHJpbmdpZnkocikpOm9bZV09cn1yZXR1cm4gb31leHBvcnR7dCBhcyBtYXBQYXJhbWV0ZXJzfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/@arcgis/core/rest/operations/urlUtils.js\n");

/***/ }),

/***/ "./node_modules/@arcgis/core/rest/query/operations/query.js":
/*!******************************************************************!*\
  !*** ./node_modules/@arcgis/core/rest/query/operations/query.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"encodeGeometry\": () => (/* binding */ m),\n/* harmony export */   \"executeQuery\": () => (/* binding */ c),\n/* harmony export */   \"executeQueryForCount\": () => (/* binding */ S),\n/* harmony export */   \"executeQueryForExtent\": () => (/* binding */ x),\n/* harmony export */   \"executeQueryForIds\": () => (/* binding */ p),\n/* harmony export */   \"executeQueryPBF\": () => (/* binding */ f),\n/* harmony export */   \"executeQueryPBFBuffer\": () => (/* binding */ d),\n/* harmony export */   \"queryToQueryStringParameters\": () => (/* binding */ y),\n/* harmony export */   \"runQuery\": () => (/* binding */ E)\n/* harmony export */ });\n/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../request.js */ \"./node_modules/@arcgis/core/request.js\");\n/* harmony import */ var _core_maybe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/maybe.js */ \"./node_modules/@arcgis/core/core/maybe.js\");\n/* harmony import */ var _core_urlUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/urlUtils.js */ \"./node_modules/@arcgis/core/core/urlUtils.js\");\n/* harmony import */ var _geometry_support_jsonUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../geometry/support/jsonUtils.js */ \"./node_modules/@arcgis/core/geometry/support/jsonUtils.js\");\n/* harmony import */ var _geometry_support_normalizeUtils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../geometry/support/normalizeUtils.js */ \"./node_modules/@arcgis/core/geometry/support/normalizeUtils.js\");\n/* harmony import */ var _operations_urlUtils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../operations/urlUtils.js */ \"./node_modules/@arcgis/core/rest/operations/urlUtils.js\");\n/* harmony import */ var _pbfQueryUtils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pbfQueryUtils.js */ \"./node_modules/@arcgis/core/rest/query/operations/pbfQueryUtils.js\");\n/* harmony import */ var _queryZScale_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./queryZScale.js */ \"./node_modules/@arcgis/core/rest/query/operations/queryZScale.js\");\n/*\nAll material copyright ESRI, All Rights Reserved, unless otherwise specified.\nSee https://js.arcgis.com/4.25/esri/copyright.txt for details.\n*/\nconst l=\"Layer does not support extent calculation.\";function m(e,t){if(t&&\"extent\"===e.type)return`${e.xmin},${e.ymin},${e.xmax},${e.ymax}`;if(t&&\"point\"===e.type)return`${e.x},${e.y}`;const r=e.toJSON();return delete r.spatialReference,JSON.stringify(r)}function y(e,r){const n=e.geometry,o=e.toJSON();delete o.compactGeometryEnabled,delete o.defaultSpatialReferenceEnabled;const a=o;let s,u,l;if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.isSome)(n)&&(u=n.spatialReference,l=n.spatialReference.wkid||JSON.stringify(n.spatialReference),a.geometryType=(0,_geometry_support_jsonUtils_js__WEBPACK_IMPORTED_MODULE_3__.getJsonType)(n),a.geometry=m(n,e.compactGeometryEnabled),a.inSR=l),o.groupByFieldsForStatistics&&(a.groupByFieldsForStatistics=o.groupByFieldsForStatistics.join(\",\")),o.objectIds&&(a.objectIds=o.objectIds.join(\",\")),o.orderByFields&&(a.orderByFields=o.orderByFields.join(\",\")),!o.outFields||!o.returnDistinctValues&&(r?.returnCountOnly||r?.returnExtentOnly||r?.returnIdsOnly)?delete a.outFields:o.outFields.includes(\"*\")?a.outFields=\"*\":a.outFields=o.outFields.join(\",\"),o.outSR?(a.outSR=o.outSR.wkid||JSON.stringify(o.outSR),s=e.outSpatialReference):n&&(o.returnGeometry||o.returnCentroid)&&(a.outSR=a.inSR,s=u),o.returnGeometry&&delete o.returnGeometry,o.outStatistics&&(a.outStatistics=JSON.stringify(o.outStatistics)),o.fullText&&(a.fullText=JSON.stringify(o.fullText)),o.pixelSize&&(a.pixelSize=JSON.stringify(o.pixelSize)),o.quantizationParameters&&(e.defaultSpatialReferenceEnabled&&(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.isSome)(u)&&(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.isSome)(e.quantizationParameters)&&(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.isSome)(e.quantizationParameters.extent)&&u.equals(e.quantizationParameters.extent.spatialReference)&&delete o.quantizationParameters.extent.spatialReference,a.quantizationParameters=JSON.stringify(o.quantizationParameters)),o.parameterValues&&(a.parameterValues=JSON.stringify(o.parameterValues)),o.rangeValues&&(a.rangeValues=JSON.stringify(o.rangeValues)),o.dynamicDataSource&&(a.layer=JSON.stringify({source:o.dynamicDataSource}),delete o.dynamicDataSource),o.timeExtent){const e=o.timeExtent,{start:t,end:r}=e;null==t&&null==r||(a.time=t===r?t:`${t??\"null\"},${r??\"null\"}`),delete o.timeExtent}return e.defaultSpatialReferenceEnabled&&(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.isSome)(u)&&(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.isSome)(s)&&u.equals(s)&&(a.defaultSR=a.inSR,delete a.inSR,delete a.outSR),a}async function c(e,r,n,i){const o=(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.isSome)(r.timeExtent)&&r.timeExtent.isEmpty?{data:{features:[]}}:await E(e,r,\"json\",i);return (0,_queryZScale_js__WEBPACK_IMPORTED_MODULE_7__.applyFeatureSetZUnitScaling)(r,n,o.data),o}async function f(e,r,n,i){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.isSome)(r.timeExtent)&&r.timeExtent.isEmpty)return{data:n.createFeatureResult()};const o=await d(e,r,i),a=o;return a.data=(0,_pbfQueryUtils_js__WEBPACK_IMPORTED_MODULE_6__.parsePBFFeatureQuery)(o.data,n),a}function d(e,t,r){return E(e,t,\"pbf\",r)}function p(e,r,n){return (0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.isSome)(r.timeExtent)&&r.timeExtent.isEmpty?Promise.resolve({data:{objectIds:[]}}):E(e,r,\"json\",n,{returnIdsOnly:!0})}function S(e,r,n){return (0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.isSome)(r.timeExtent)&&r.timeExtent.isEmpty?Promise.resolve({data:{count:0}}):E(e,r,\"json\",n,{returnIdsOnly:!0,returnCountOnly:!0})}function x(e,r,n){return (0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.isSome)(r.timeExtent)&&r.timeExtent.isEmpty?Promise.resolve({data:{count:0,extent:null}}):E(e,r,\"json\",n,{returnExtentOnly:!0,returnCountOnly:!0}).then((e=>{const t=e.data;if(t.hasOwnProperty(\"extent\"))return e;if(t.features)throw new Error(l);if(t.hasOwnProperty(\"count\"))throw new Error(l);return e}))}function E(i,s,u,l={},m={}){const c=\"string\"==typeof i?(0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_2__.urlToObject)(i):i,f=s.geometry?[s.geometry]:[];return l.responseType=\"pbf\"===u?\"array-buffer\":\"json\",(0,_geometry_support_normalizeUtils_js__WEBPACK_IMPORTED_MODULE_4__.normalizeCentralMeridian)(f,null,l).then((r=>{const i=r&&r[0];(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_1__.isSome)(i)&&((s=s.clone()).geometry=i);const o=(0,_operations_urlUtils_js__WEBPACK_IMPORTED_MODULE_5__.mapParameters)({...c.query,f:u,...m,...y(s,m)});return (0,_request_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])((0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_2__.join)(c.path,\"query\"),{...l,query:{...o,...l.query}})}))}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL3Jlc3QvcXVlcnkvb3BlcmF0aW9ucy9xdWVyeS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BhcmNnaXMvY29yZS9yZXN0L3F1ZXJ5L29wZXJhdGlvbnMvcXVlcnkuanM/ZWY4NSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQWxsIG1hdGVyaWFsIGNvcHlyaWdodCBFU1JJLCBBbGwgUmlnaHRzIFJlc2VydmVkLCB1bmxlc3Mgb3RoZXJ3aXNlIHNwZWNpZmllZC5cblNlZSBodHRwczovL2pzLmFyY2dpcy5jb20vNC4yNS9lc3JpL2NvcHlyaWdodC50eHQgZm9yIGRldGFpbHMuXG4qL1xuaW1wb3J0IGUgZnJvbVwiLi4vLi4vLi4vcmVxdWVzdC5qc1wiO2ltcG9ydHtpc1NvbWUgYXMgdH1mcm9tXCIuLi8uLi8uLi9jb3JlL21heWJlLmpzXCI7aW1wb3J0e3VybFRvT2JqZWN0IGFzIHIsam9pbiBhcyBufWZyb21cIi4uLy4uLy4uL2NvcmUvdXJsVXRpbHMuanNcIjtpbXBvcnR7Z2V0SnNvblR5cGUgYXMgaX1mcm9tXCIuLi8uLi8uLi9nZW9tZXRyeS9zdXBwb3J0L2pzb25VdGlscy5qc1wiO2ltcG9ydHtub3JtYWxpemVDZW50cmFsTWVyaWRpYW4gYXMgb31mcm9tXCIuLi8uLi8uLi9nZW9tZXRyeS9zdXBwb3J0L25vcm1hbGl6ZVV0aWxzLmpzXCI7aW1wb3J0e21hcFBhcmFtZXRlcnMgYXMgYX1mcm9tXCIuLi8uLi9vcGVyYXRpb25zL3VybFV0aWxzLmpzXCI7aW1wb3J0e3BhcnNlUEJGRmVhdHVyZVF1ZXJ5IGFzIHN9ZnJvbVwiLi9wYmZRdWVyeVV0aWxzLmpzXCI7aW1wb3J0e2FwcGx5RmVhdHVyZVNldFpVbml0U2NhbGluZyBhcyB1fWZyb21cIi4vcXVlcnlaU2NhbGUuanNcIjtjb25zdCBsPVwiTGF5ZXIgZG9lcyBub3Qgc3VwcG9ydCBleHRlbnQgY2FsY3VsYXRpb24uXCI7ZnVuY3Rpb24gbShlLHQpe2lmKHQmJlwiZXh0ZW50XCI9PT1lLnR5cGUpcmV0dXJuYCR7ZS54bWlufSwke2UueW1pbn0sJHtlLnhtYXh9LCR7ZS55bWF4fWA7aWYodCYmXCJwb2ludFwiPT09ZS50eXBlKXJldHVybmAke2UueH0sJHtlLnl9YDtjb25zdCByPWUudG9KU09OKCk7cmV0dXJuIGRlbGV0ZSByLnNwYXRpYWxSZWZlcmVuY2UsSlNPTi5zdHJpbmdpZnkocil9ZnVuY3Rpb24geShlLHIpe2NvbnN0IG49ZS5nZW9tZXRyeSxvPWUudG9KU09OKCk7ZGVsZXRlIG8uY29tcGFjdEdlb21ldHJ5RW5hYmxlZCxkZWxldGUgby5kZWZhdWx0U3BhdGlhbFJlZmVyZW5jZUVuYWJsZWQ7Y29uc3QgYT1vO2xldCBzLHUsbDtpZih0KG4pJiYodT1uLnNwYXRpYWxSZWZlcmVuY2UsbD1uLnNwYXRpYWxSZWZlcmVuY2Uud2tpZHx8SlNPTi5zdHJpbmdpZnkobi5zcGF0aWFsUmVmZXJlbmNlKSxhLmdlb21ldHJ5VHlwZT1pKG4pLGEuZ2VvbWV0cnk9bShuLGUuY29tcGFjdEdlb21ldHJ5RW5hYmxlZCksYS5pblNSPWwpLG8uZ3JvdXBCeUZpZWxkc0ZvclN0YXRpc3RpY3MmJihhLmdyb3VwQnlGaWVsZHNGb3JTdGF0aXN0aWNzPW8uZ3JvdXBCeUZpZWxkc0ZvclN0YXRpc3RpY3Muam9pbihcIixcIikpLG8ub2JqZWN0SWRzJiYoYS5vYmplY3RJZHM9by5vYmplY3RJZHMuam9pbihcIixcIikpLG8ub3JkZXJCeUZpZWxkcyYmKGEub3JkZXJCeUZpZWxkcz1vLm9yZGVyQnlGaWVsZHMuam9pbihcIixcIikpLCFvLm91dEZpZWxkc3x8IW8ucmV0dXJuRGlzdGluY3RWYWx1ZXMmJihyPy5yZXR1cm5Db3VudE9ubHl8fHI/LnJldHVybkV4dGVudE9ubHl8fHI/LnJldHVybklkc09ubHkpP2RlbGV0ZSBhLm91dEZpZWxkczpvLm91dEZpZWxkcy5pbmNsdWRlcyhcIipcIik/YS5vdXRGaWVsZHM9XCIqXCI6YS5vdXRGaWVsZHM9by5vdXRGaWVsZHMuam9pbihcIixcIiksby5vdXRTUj8oYS5vdXRTUj1vLm91dFNSLndraWR8fEpTT04uc3RyaW5naWZ5KG8ub3V0U1IpLHM9ZS5vdXRTcGF0aWFsUmVmZXJlbmNlKTpuJiYoby5yZXR1cm5HZW9tZXRyeXx8by5yZXR1cm5DZW50cm9pZCkmJihhLm91dFNSPWEuaW5TUixzPXUpLG8ucmV0dXJuR2VvbWV0cnkmJmRlbGV0ZSBvLnJldHVybkdlb21ldHJ5LG8ub3V0U3RhdGlzdGljcyYmKGEub3V0U3RhdGlzdGljcz1KU09OLnN0cmluZ2lmeShvLm91dFN0YXRpc3RpY3MpKSxvLmZ1bGxUZXh0JiYoYS5mdWxsVGV4dD1KU09OLnN0cmluZ2lmeShvLmZ1bGxUZXh0KSksby5waXhlbFNpemUmJihhLnBpeGVsU2l6ZT1KU09OLnN0cmluZ2lmeShvLnBpeGVsU2l6ZSkpLG8ucXVhbnRpemF0aW9uUGFyYW1ldGVycyYmKGUuZGVmYXVsdFNwYXRpYWxSZWZlcmVuY2VFbmFibGVkJiZ0KHUpJiZ0KGUucXVhbnRpemF0aW9uUGFyYW1ldGVycykmJnQoZS5xdWFudGl6YXRpb25QYXJhbWV0ZXJzLmV4dGVudCkmJnUuZXF1YWxzKGUucXVhbnRpemF0aW9uUGFyYW1ldGVycy5leHRlbnQuc3BhdGlhbFJlZmVyZW5jZSkmJmRlbGV0ZSBvLnF1YW50aXphdGlvblBhcmFtZXRlcnMuZXh0ZW50LnNwYXRpYWxSZWZlcmVuY2UsYS5xdWFudGl6YXRpb25QYXJhbWV0ZXJzPUpTT04uc3RyaW5naWZ5KG8ucXVhbnRpemF0aW9uUGFyYW1ldGVycykpLG8ucGFyYW1ldGVyVmFsdWVzJiYoYS5wYXJhbWV0ZXJWYWx1ZXM9SlNPTi5zdHJpbmdpZnkoby5wYXJhbWV0ZXJWYWx1ZXMpKSxvLnJhbmdlVmFsdWVzJiYoYS5yYW5nZVZhbHVlcz1KU09OLnN0cmluZ2lmeShvLnJhbmdlVmFsdWVzKSksby5keW5hbWljRGF0YVNvdXJjZSYmKGEubGF5ZXI9SlNPTi5zdHJpbmdpZnkoe3NvdXJjZTpvLmR5bmFtaWNEYXRhU291cmNlfSksZGVsZXRlIG8uZHluYW1pY0RhdGFTb3VyY2UpLG8udGltZUV4dGVudCl7Y29uc3QgZT1vLnRpbWVFeHRlbnQse3N0YXJ0OnQsZW5kOnJ9PWU7bnVsbD09dCYmbnVsbD09cnx8KGEudGltZT10PT09cj90OmAke3Q/P1wibnVsbFwifSwke3I/P1wibnVsbFwifWApLGRlbGV0ZSBvLnRpbWVFeHRlbnR9cmV0dXJuIGUuZGVmYXVsdFNwYXRpYWxSZWZlcmVuY2VFbmFibGVkJiZ0KHUpJiZ0KHMpJiZ1LmVxdWFscyhzKSYmKGEuZGVmYXVsdFNSPWEuaW5TUixkZWxldGUgYS5pblNSLGRlbGV0ZSBhLm91dFNSKSxhfWFzeW5jIGZ1bmN0aW9uIGMoZSxyLG4saSl7Y29uc3Qgbz10KHIudGltZUV4dGVudCkmJnIudGltZUV4dGVudC5pc0VtcHR5P3tkYXRhOntmZWF0dXJlczpbXX19OmF3YWl0IEUoZSxyLFwianNvblwiLGkpO3JldHVybiB1KHIsbixvLmRhdGEpLG99YXN5bmMgZnVuY3Rpb24gZihlLHIsbixpKXtpZih0KHIudGltZUV4dGVudCkmJnIudGltZUV4dGVudC5pc0VtcHR5KXJldHVybntkYXRhOm4uY3JlYXRlRmVhdHVyZVJlc3VsdCgpfTtjb25zdCBvPWF3YWl0IGQoZSxyLGkpLGE9bztyZXR1cm4gYS5kYXRhPXMoby5kYXRhLG4pLGF9ZnVuY3Rpb24gZChlLHQscil7cmV0dXJuIEUoZSx0LFwicGJmXCIscil9ZnVuY3Rpb24gcChlLHIsbil7cmV0dXJuIHQoci50aW1lRXh0ZW50KSYmci50aW1lRXh0ZW50LmlzRW1wdHk/UHJvbWlzZS5yZXNvbHZlKHtkYXRhOntvYmplY3RJZHM6W119fSk6RShlLHIsXCJqc29uXCIsbix7cmV0dXJuSWRzT25seTohMH0pfWZ1bmN0aW9uIFMoZSxyLG4pe3JldHVybiB0KHIudGltZUV4dGVudCkmJnIudGltZUV4dGVudC5pc0VtcHR5P1Byb21pc2UucmVzb2x2ZSh7ZGF0YTp7Y291bnQ6MH19KTpFKGUscixcImpzb25cIixuLHtyZXR1cm5JZHNPbmx5OiEwLHJldHVybkNvdW50T25seTohMH0pfWZ1bmN0aW9uIHgoZSxyLG4pe3JldHVybiB0KHIudGltZUV4dGVudCkmJnIudGltZUV4dGVudC5pc0VtcHR5P1Byb21pc2UucmVzb2x2ZSh7ZGF0YTp7Y291bnQ6MCxleHRlbnQ6bnVsbH19KTpFKGUscixcImpzb25cIixuLHtyZXR1cm5FeHRlbnRPbmx5OiEwLHJldHVybkNvdW50T25seTohMH0pLnRoZW4oKGU9Pntjb25zdCB0PWUuZGF0YTtpZih0Lmhhc093blByb3BlcnR5KFwiZXh0ZW50XCIpKXJldHVybiBlO2lmKHQuZmVhdHVyZXMpdGhyb3cgbmV3IEVycm9yKGwpO2lmKHQuaGFzT3duUHJvcGVydHkoXCJjb3VudFwiKSl0aHJvdyBuZXcgRXJyb3IobCk7cmV0dXJuIGV9KSl9ZnVuY3Rpb24gRShpLHMsdSxsPXt9LG09e30pe2NvbnN0IGM9XCJzdHJpbmdcIj09dHlwZW9mIGk/cihpKTppLGY9cy5nZW9tZXRyeT9bcy5nZW9tZXRyeV06W107cmV0dXJuIGwucmVzcG9uc2VUeXBlPVwicGJmXCI9PT11P1wiYXJyYXktYnVmZmVyXCI6XCJqc29uXCIsbyhmLG51bGwsbCkudGhlbigocj0+e2NvbnN0IGk9ciYmclswXTt0KGkpJiYoKHM9cy5jbG9uZSgpKS5nZW9tZXRyeT1pKTtjb25zdCBvPWEoey4uLmMucXVlcnksZjp1LC4uLm0sLi4ueShzLG0pfSk7cmV0dXJuIGUobihjLnBhdGgsXCJxdWVyeVwiKSx7Li4ubCxxdWVyeTp7Li4ubywuLi5sLnF1ZXJ5fX0pfSkpfWV4cG9ydHttIGFzIGVuY29kZUdlb21ldHJ5LGMgYXMgZXhlY3V0ZVF1ZXJ5LFMgYXMgZXhlY3V0ZVF1ZXJ5Rm9yQ291bnQseCBhcyBleGVjdXRlUXVlcnlGb3JFeHRlbnQscCBhcyBleGVjdXRlUXVlcnlGb3JJZHMsZiBhcyBleGVjdXRlUXVlcnlQQkYsZCBhcyBleGVjdXRlUXVlcnlQQkZCdWZmZXIseSBhcyBxdWVyeVRvUXVlcnlTdHJpbmdQYXJhbWV0ZXJzLEUgYXMgcnVuUXVlcnl9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@arcgis/core/rest/query/operations/query.js\n");

/***/ }),

/***/ "./node_modules/@arcgis/core/rest/query/operations/queryZScale.js":
/*!************************************************************************!*\
  !*** ./node_modules/@arcgis/core/rest/query/operations/queryZScale.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"applyFeatureSetZUnitScaling\": () => (/* binding */ r)\n/* harmony export */ });\n/* harmony import */ var _core_maybe_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/maybe.js */ \"./node_modules/@arcgis/core/core/maybe.js\");\n/* harmony import */ var _geometry_support_zscale_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../geometry/support/zscale.js */ \"./node_modules/@arcgis/core/geometry/support/zscale.js\");\n/*\nAll material copyright ESRI, All Rights Reserved, unless otherwise specified.\nSee https://js.arcgis.com/4.25/esri/copyright.txt for details.\n*/\nfunction r(r,t,f){if(!f||!f.features||!f.hasZ)return;const s=(0,_geometry_support_zscale_js__WEBPACK_IMPORTED_MODULE_1__.getGeometryZScaler)(f.geometryType,t,r.outSpatialReference);if(!(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_0__.isNone)(s))for(const e of f.features)s(e.geometry)}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL3Jlc3QvcXVlcnkvb3BlcmF0aW9ucy9xdWVyeVpTY2FsZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL25vZGVfbW9kdWxlcy9AYXJjZ2lzL2NvcmUvcmVzdC9xdWVyeS9vcGVyYXRpb25zL3F1ZXJ5WlNjYWxlLmpzPzRjNzIiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbkFsbCBtYXRlcmlhbCBjb3B5cmlnaHQgRVNSSSwgQWxsIFJpZ2h0cyBSZXNlcnZlZCwgdW5sZXNzIG90aGVyd2lzZSBzcGVjaWZpZWQuXG5TZWUgaHR0cHM6Ly9qcy5hcmNnaXMuY29tLzQuMjUvZXNyaS9jb3B5cmlnaHQudHh0IGZvciBkZXRhaWxzLlxuKi9cbmltcG9ydHtpc05vbmUgYXMgZX1mcm9tXCIuLi8uLi8uLi9jb3JlL21heWJlLmpzXCI7aW1wb3J0e2dldEdlb21ldHJ5WlNjYWxlciBhcyBvfWZyb21cIi4uLy4uLy4uL2dlb21ldHJ5L3N1cHBvcnQvenNjYWxlLmpzXCI7ZnVuY3Rpb24gcihyLHQsZil7aWYoIWZ8fCFmLmZlYXR1cmVzfHwhZi5oYXNaKXJldHVybjtjb25zdCBzPW8oZi5nZW9tZXRyeVR5cGUsdCxyLm91dFNwYXRpYWxSZWZlcmVuY2UpO2lmKCFlKHMpKWZvcihjb25zdCBlIG9mIGYuZmVhdHVyZXMpcyhlLmdlb21ldHJ5KX1leHBvcnR7ciBhcyBhcHBseUZlYXR1cmVTZXRaVW5pdFNjYWxpbmd9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@arcgis/core/rest/query/operations/queryZScale.js\n");

/***/ })

}]);