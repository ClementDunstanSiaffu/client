"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkexb_client"] = self["webpackChunkexb_client"] || []).push([["node_modules_arcgis_core_arcade_functions_featuresetgeom_js-node_modules_arcgis_core_layers_s-8344b4"],{

/***/ "./node_modules/@arcgis/core/arcade/functions/featuresetgeom.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@arcgis/core/arcade/functions/featuresetgeom.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"registerFunctions\": () => (/* binding */ R)\n/* harmony export */ });\n/* harmony import */ var _executionError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../executionError.js */ \"./node_modules/@arcgis/core/arcade/executionError.js\");\n/* harmony import */ var _kernel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../kernel.js */ \"./node_modules/@arcgis/core/arcade/kernel.js\");\n/* harmony import */ var _chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../chunks/languageUtils.js */ \"./node_modules/@arcgis/core/chunks/languageUtils.js\");\n/* harmony import */ var _featureset_actions_SpatialFilter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../featureset/actions/SpatialFilter.js */ \"./node_modules/@arcgis/core/arcade/featureset/actions/SpatialFilter.js\");\n/* harmony import */ var _featureset_sources_Empty_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../featureset/sources/Empty.js */ \"./node_modules/@arcgis/core/arcade/featureset/sources/Empty.js\");\n/* harmony import */ var _geometry_Geometry_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../geometry/Geometry.js */ \"./node_modules/@arcgis/core/geometry/Geometry.js\");\n/* harmony import */ var _geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../geometry/geometryEngineAsync.js */ \"./node_modules/@arcgis/core/geometry/geometryEngineAsync.js\");\n/*\nAll material copyright ESRI, All Rights Reserved, unless otherwise specified.\nSee https://js.arcgis.com/4.25/esri/copyright.txt for details.\n*/\nfunction h(e){return e instanceof _geometry_Geometry_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]}function S(i,a,c,S){return S(i,a,(async(S,R,v)=>{if(v.length<2)throw new _executionError_js__WEBPACK_IMPORTED_MODULE_0__.ArcadeExecutionError(i,_executionError_js__WEBPACK_IMPORTED_MODULE_0__.ExecutionErrorCodes.WrongNumberOfParameters,a);if(null===(v=(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.G)(v))[0]&&null===v[1])return!1;if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.T)(v[0])){if(v[1]instanceof _geometry_Geometry_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])return new _featureset_actions_SpatialFilter_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({parentfeatureset:v[0],relation:c,relationGeom:v[1]});if(null===v[1])return new _featureset_sources_Empty_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({parentfeatureset:v[0]});throw new _executionError_js__WEBPACK_IMPORTED_MODULE_0__.ArcadeExecutionError(i,_executionError_js__WEBPACK_IMPORTED_MODULE_0__.ExecutionErrorCodes.InvalidParameter,a)}if(h(v[0])){if(h(v[1])){switch(c){case\"esriSpatialRelEnvelopeIntersects\":return (0,_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__.intersects)((0,_kernel_js__WEBPACK_IMPORTED_MODULE_1__.shapeExtent)(v[0]),(0,_kernel_js__WEBPACK_IMPORTED_MODULE_1__.shapeExtent)(v[1]));case\"esriSpatialRelIntersects\":return (0,_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__.intersects)(v[0],v[1]);case\"esriSpatialRelContains\":return (0,_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__.contains)(v[0],v[1]);case\"esriSpatialRelOverlaps\":return (0,_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__.overlaps)(v[0],v[1]);case\"esriSpatialRelWithin\":return (0,_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__.within)(v[0],v[1]);case\"esriSpatialRelTouches\":return (0,_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__.touches)(v[0],v[1]);case\"esriSpatialRelCrosses\":return (0,_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__.crosses)(v[0],v[1])}throw new _executionError_js__WEBPACK_IMPORTED_MODULE_0__.ArcadeExecutionError(i,_executionError_js__WEBPACK_IMPORTED_MODULE_0__.ExecutionErrorCodes.InvalidParameter,a)}if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.T)(v[1]))return new _featureset_actions_SpatialFilter_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({parentfeatureset:v[1],relation:c,relationGeom:v[0]});if(null===v[1])return!1;throw new _executionError_js__WEBPACK_IMPORTED_MODULE_0__.ArcadeExecutionError(i,_executionError_js__WEBPACK_IMPORTED_MODULE_0__.ExecutionErrorCodes.InvalidParameter,a)}if(null!==v[0])throw new _executionError_js__WEBPACK_IMPORTED_MODULE_0__.ArcadeExecutionError(i,_executionError_js__WEBPACK_IMPORTED_MODULE_0__.ExecutionErrorCodes.InvalidParameter,a);return (0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.T)(v[1])?new _featureset_sources_Empty_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({parentfeatureset:v[1]}):!(v[1]instanceof _geometry_Geometry_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]||null===v[1])&&void 0}))}function R(t){\"async\"===t.mode&&(t.functions.intersects=function(e,n){return S(e,n,\"esriSpatialRelIntersects\",t.standardFunctionAsync)},t.functions.envelopeintersects=function(e,n){return S(e,n,\"esriSpatialRelEnvelopeIntersects\",t.standardFunctionAsync)},t.signatures.push({name:\"envelopeintersects\",min:2,max:2}),t.functions.contains=function(e,n){return S(e,n,\"esriSpatialRelContains\",t.standardFunctionAsync)},t.functions.overlaps=function(e,n){return S(e,n,\"esriSpatialRelOverlaps\",t.standardFunctionAsync)},t.functions.within=function(e,n){return S(e,n,\"esriSpatialRelWithin\",t.standardFunctionAsync)},t.functions.touches=function(e,n){return S(e,n,\"esriSpatialRelTouches\",t.standardFunctionAsync)},t.functions.crosses=function(e,n){return S(e,n,\"esriSpatialRelCrosses\",t.standardFunctionAsync)},t.functions.relate=function(u,f){return t.standardFunctionAsync(u,f,((t,p,m)=>{if(m=(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.G)(m),(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.y)(m,3,3,u,f),h(m[0])&&h(m[1]))return (0,_geometry_geometryEngineAsync_js__WEBPACK_IMPORTED_MODULE_6__.relate)(m[0],m[1],(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.j)(m[2]));if(m[0]instanceof _geometry_Geometry_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]&&null===m[1])return!1;if(m[1]instanceof _geometry_Geometry_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]&&null===m[0])return!1;if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.T)(m[0])&&null===m[1])return new _featureset_sources_Empty_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({parentfeatureset:m[0]});if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.T)(m[1])&&null===m[0])return new _featureset_sources_Empty_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({parentfeatureset:m[1]});if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.T)(m[0])&&m[1]instanceof _geometry_Geometry_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])return m[0].relate(m[1],(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.j)(m[2]));if((0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.T)(m[1])&&m[0]instanceof _geometry_Geometry_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])return m[1].relate(m[0],(0,_chunks_languageUtils_js__WEBPACK_IMPORTED_MODULE_2__.j)(m[2]));if(null===m[0]&&null===m[1])return!1;throw new _executionError_js__WEBPACK_IMPORTED_MODULE_0__.ArcadeExecutionError(u,_executionError_js__WEBPACK_IMPORTED_MODULE_0__.ExecutionErrorCodes.InvalidParameter,f)}))})}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL2FyY2FkZS9mdW5jdGlvbnMvZmVhdHVyZXNldGdlb20uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL25vZGVfbW9kdWxlcy9AYXJjZ2lzL2NvcmUvYXJjYWRlL2Z1bmN0aW9ucy9mZWF0dXJlc2V0Z2VvbS5qcz8zN2MxIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG5BbGwgbWF0ZXJpYWwgY29weXJpZ2h0IEVTUkksIEFsbCBSaWdodHMgUmVzZXJ2ZWQsIHVubGVzcyBvdGhlcndpc2Ugc3BlY2lmaWVkLlxuU2VlIGh0dHBzOi8vanMuYXJjZ2lzLmNvbS80LjI1L2VzcmkvY29weXJpZ2h0LnR4dCBmb3IgZGV0YWlscy5cbiovXG5pbXBvcnR7QXJjYWRlRXhlY3V0aW9uRXJyb3IgYXMgZSxFeGVjdXRpb25FcnJvckNvZGVzIGFzIG59ZnJvbVwiLi4vZXhlY3V0aW9uRXJyb3IuanNcIjtpbXBvcnR7c2hhcGVFeHRlbnQgYXMgdH1mcm9tXCIuLi9rZXJuZWwuanNcIjtpbXBvcnR7RyBhcyByLHkgYXMgaSxqIGFzIGEsVCBhcyBzfWZyb21cIi4uLy4uL2NodW5rcy9sYW5ndWFnZVV0aWxzLmpzXCI7aW1wb3J0IHUgZnJvbVwiLi4vZmVhdHVyZXNldC9hY3Rpb25zL1NwYXRpYWxGaWx0ZXIuanNcIjtpbXBvcnQgbyBmcm9tXCIuLi9mZWF0dXJlc2V0L3NvdXJjZXMvRW1wdHkuanNcIjtpbXBvcnQgbCBmcm9tXCIuLi8uLi9nZW9tZXRyeS9HZW9tZXRyeS5qc1wiO2ltcG9ydHtyZWxhdGUgYXMgYyxjcm9zc2VzIGFzIGYsdG91Y2hlcyBhcyBwLHdpdGhpbiBhcyBtLG92ZXJsYXBzIGFzIGQsY29udGFpbnMgYXMgdyxpbnRlcnNlY3RzIGFzIHl9ZnJvbVwiLi4vLi4vZ2VvbWV0cnkvZ2VvbWV0cnlFbmdpbmVBc3luYy5qc1wiO2Z1bmN0aW9uIGgoZSl7cmV0dXJuIGUgaW5zdGFuY2VvZiBsfWZ1bmN0aW9uIFMoaSxhLGMsUyl7cmV0dXJuIFMoaSxhLChhc3luYyhTLFIsdik9PntpZih2Lmxlbmd0aDwyKXRocm93IG5ldyBlKGksbi5Xcm9uZ051bWJlck9mUGFyYW1ldGVycyxhKTtpZihudWxsPT09KHY9cih2KSlbMF0mJm51bGw9PT12WzFdKXJldHVybiExO2lmKHModlswXSkpe2lmKHZbMV1pbnN0YW5jZW9mIGwpcmV0dXJuIG5ldyB1KHtwYXJlbnRmZWF0dXJlc2V0OnZbMF0scmVsYXRpb246YyxyZWxhdGlvbkdlb206dlsxXX0pO2lmKG51bGw9PT12WzFdKXJldHVybiBuZXcgbyh7cGFyZW50ZmVhdHVyZXNldDp2WzBdfSk7dGhyb3cgbmV3IGUoaSxuLkludmFsaWRQYXJhbWV0ZXIsYSl9aWYoaCh2WzBdKSl7aWYoaCh2WzFdKSl7c3dpdGNoKGMpe2Nhc2VcImVzcmlTcGF0aWFsUmVsRW52ZWxvcGVJbnRlcnNlY3RzXCI6cmV0dXJuIHkodCh2WzBdKSx0KHZbMV0pKTtjYXNlXCJlc3JpU3BhdGlhbFJlbEludGVyc2VjdHNcIjpyZXR1cm4geSh2WzBdLHZbMV0pO2Nhc2VcImVzcmlTcGF0aWFsUmVsQ29udGFpbnNcIjpyZXR1cm4gdyh2WzBdLHZbMV0pO2Nhc2VcImVzcmlTcGF0aWFsUmVsT3ZlcmxhcHNcIjpyZXR1cm4gZCh2WzBdLHZbMV0pO2Nhc2VcImVzcmlTcGF0aWFsUmVsV2l0aGluXCI6cmV0dXJuIG0odlswXSx2WzFdKTtjYXNlXCJlc3JpU3BhdGlhbFJlbFRvdWNoZXNcIjpyZXR1cm4gcCh2WzBdLHZbMV0pO2Nhc2VcImVzcmlTcGF0aWFsUmVsQ3Jvc3Nlc1wiOnJldHVybiBmKHZbMF0sdlsxXSl9dGhyb3cgbmV3IGUoaSxuLkludmFsaWRQYXJhbWV0ZXIsYSl9aWYocyh2WzFdKSlyZXR1cm4gbmV3IHUoe3BhcmVudGZlYXR1cmVzZXQ6dlsxXSxyZWxhdGlvbjpjLHJlbGF0aW9uR2VvbTp2WzBdfSk7aWYobnVsbD09PXZbMV0pcmV0dXJuITE7dGhyb3cgbmV3IGUoaSxuLkludmFsaWRQYXJhbWV0ZXIsYSl9aWYobnVsbCE9PXZbMF0pdGhyb3cgbmV3IGUoaSxuLkludmFsaWRQYXJhbWV0ZXIsYSk7cmV0dXJuIHModlsxXSk/bmV3IG8oe3BhcmVudGZlYXR1cmVzZXQ6dlsxXX0pOiEodlsxXWluc3RhbmNlb2YgbHx8bnVsbD09PXZbMV0pJiZ2b2lkIDB9KSl9ZnVuY3Rpb24gUih0KXtcImFzeW5jXCI9PT10Lm1vZGUmJih0LmZ1bmN0aW9ucy5pbnRlcnNlY3RzPWZ1bmN0aW9uKGUsbil7cmV0dXJuIFMoZSxuLFwiZXNyaVNwYXRpYWxSZWxJbnRlcnNlY3RzXCIsdC5zdGFuZGFyZEZ1bmN0aW9uQXN5bmMpfSx0LmZ1bmN0aW9ucy5lbnZlbG9wZWludGVyc2VjdHM9ZnVuY3Rpb24oZSxuKXtyZXR1cm4gUyhlLG4sXCJlc3JpU3BhdGlhbFJlbEVudmVsb3BlSW50ZXJzZWN0c1wiLHQuc3RhbmRhcmRGdW5jdGlvbkFzeW5jKX0sdC5zaWduYXR1cmVzLnB1c2goe25hbWU6XCJlbnZlbG9wZWludGVyc2VjdHNcIixtaW46MixtYXg6Mn0pLHQuZnVuY3Rpb25zLmNvbnRhaW5zPWZ1bmN0aW9uKGUsbil7cmV0dXJuIFMoZSxuLFwiZXNyaVNwYXRpYWxSZWxDb250YWluc1wiLHQuc3RhbmRhcmRGdW5jdGlvbkFzeW5jKX0sdC5mdW5jdGlvbnMub3ZlcmxhcHM9ZnVuY3Rpb24oZSxuKXtyZXR1cm4gUyhlLG4sXCJlc3JpU3BhdGlhbFJlbE92ZXJsYXBzXCIsdC5zdGFuZGFyZEZ1bmN0aW9uQXN5bmMpfSx0LmZ1bmN0aW9ucy53aXRoaW49ZnVuY3Rpb24oZSxuKXtyZXR1cm4gUyhlLG4sXCJlc3JpU3BhdGlhbFJlbFdpdGhpblwiLHQuc3RhbmRhcmRGdW5jdGlvbkFzeW5jKX0sdC5mdW5jdGlvbnMudG91Y2hlcz1mdW5jdGlvbihlLG4pe3JldHVybiBTKGUsbixcImVzcmlTcGF0aWFsUmVsVG91Y2hlc1wiLHQuc3RhbmRhcmRGdW5jdGlvbkFzeW5jKX0sdC5mdW5jdGlvbnMuY3Jvc3Nlcz1mdW5jdGlvbihlLG4pe3JldHVybiBTKGUsbixcImVzcmlTcGF0aWFsUmVsQ3Jvc3Nlc1wiLHQuc3RhbmRhcmRGdW5jdGlvbkFzeW5jKX0sdC5mdW5jdGlvbnMucmVsYXRlPWZ1bmN0aW9uKHUsZil7cmV0dXJuIHQuc3RhbmRhcmRGdW5jdGlvbkFzeW5jKHUsZiwoKHQscCxtKT0+e2lmKG09cihtKSxpKG0sMywzLHUsZiksaChtWzBdKSYmaChtWzFdKSlyZXR1cm4gYyhtWzBdLG1bMV0sYShtWzJdKSk7aWYobVswXWluc3RhbmNlb2YgbCYmbnVsbD09PW1bMV0pcmV0dXJuITE7aWYobVsxXWluc3RhbmNlb2YgbCYmbnVsbD09PW1bMF0pcmV0dXJuITE7aWYocyhtWzBdKSYmbnVsbD09PW1bMV0pcmV0dXJuIG5ldyBvKHtwYXJlbnRmZWF0dXJlc2V0Om1bMF19KTtpZihzKG1bMV0pJiZudWxsPT09bVswXSlyZXR1cm4gbmV3IG8oe3BhcmVudGZlYXR1cmVzZXQ6bVsxXX0pO2lmKHMobVswXSkmJm1bMV1pbnN0YW5jZW9mIGwpcmV0dXJuIG1bMF0ucmVsYXRlKG1bMV0sYShtWzJdKSk7aWYocyhtWzFdKSYmbVswXWluc3RhbmNlb2YgbClyZXR1cm4gbVsxXS5yZWxhdGUobVswXSxhKG1bMl0pKTtpZihudWxsPT09bVswXSYmbnVsbD09PW1bMV0pcmV0dXJuITE7dGhyb3cgbmV3IGUodSxuLkludmFsaWRQYXJhbWV0ZXIsZil9KSl9KX1leHBvcnR7UiBhcyByZWdpc3RlckZ1bmN0aW9uc307XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@arcgis/core/arcade/functions/featuresetgeom.js\n");

/***/ }),

/***/ "./node_modules/@arcgis/core/layers/support/FieldsIndex.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@arcgis/core/layers/support/FieldsIndex.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ r)\n/* harmony export */ });\n/* harmony import */ var _fieldUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fieldUtils.js */ \"./node_modules/@arcgis/core/layers/support/fieldUtils.js\");\n/*\nAll material copyright ESRI, All Rights Reserved, unless otherwise specified.\nSee https://js.arcgis.com/4.25/esri/copyright.txt for details.\n*/\nfunction s(e){return\"date\"===e.type||\"esriFieldTypeDate\"===e.type}function l(e){return\"oid\"===e.type||\"esriFieldTypeOID\"===e.type}function d(e){return\"global-id\"===e.type||\"esriFieldTypeGlobalID\"===e.type}class r{constructor(i=[]){if(this.fields=[],this._fieldsMap=new Map,this._normalizedFieldsMap=new Map,this._dateFieldsSet=new Set,this._numericFieldsSet=new Set,this.dateFields=[],this.numericFields=[],this._requiredFields=null,!i)return;this.fields=i;const t=[];for(const r of i){const i=r&&r.name;if(i){const u=n(i),h=a(i);this._fieldsMap.set(i,r),this._fieldsMap.set(u,r),this._normalizedFieldsMap.set(h,r),t.push(u),s(r)?(this.dateFields.push(r),this._dateFieldsSet.add(r)):(0,_fieldUtils_js__WEBPACK_IMPORTED_MODULE_0__.isNumericField)(r)&&(this._numericFieldsSet.add(r),this.numericFields.push(r)),l(r)||d(r)||(r.editable=null==r.editable||!!r.editable,r.nullable=null==r.nullable||!!r.nullable)}}t.sort(),this.uid=t.join(\",\")}destroy(){this._fieldsMap.clear()}get requiredFields(){if(!this._requiredFields){this._requiredFields=[];for(const e of this.fields)l(e)||d(e)||e.nullable||void 0!==(0,_fieldUtils_js__WEBPACK_IMPORTED_MODULE_0__.getFieldDefaultValue)(e)||this._requiredFields.push(e)}return this._requiredFields}has(e){return null!=this.get(e)}get(e){if(!e)return;let i=this._fieldsMap.get(e);return i||(i=this._fieldsMap.get(n(e))??this._normalizedFieldsMap.get(a(e)),i&&this._fieldsMap.set(e,i),i)}isDateField(e){return this._dateFieldsSet.has(this.get(e))}isNumericField(e){return this._numericFieldsSet.has(this.get(e))}normalizeFieldName(e){const i=this.get(e);if(i)return i.name??void 0}}function n(e){return e.trim().toLowerCase()}function a(e){return (0,_fieldUtils_js__WEBPACK_IMPORTED_MODULE_0__.normalizeFieldName)(e).toLowerCase()}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL2xheWVycy9zdXBwb3J0L0ZpZWxkc0luZGV4LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL2xheWVycy9zdXBwb3J0L0ZpZWxkc0luZGV4LmpzPzRkOGUiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbkFsbCBtYXRlcmlhbCBjb3B5cmlnaHQgRVNSSSwgQWxsIFJpZ2h0cyBSZXNlcnZlZCwgdW5sZXNzIG90aGVyd2lzZSBzcGVjaWZpZWQuXG5TZWUgaHR0cHM6Ly9qcy5hcmNnaXMuY29tLzQuMjUvZXNyaS9jb3B5cmlnaHQudHh0IGZvciBkZXRhaWxzLlxuKi9cbmltcG9ydHtpc051bWVyaWNGaWVsZCBhcyBlLGdldEZpZWxkRGVmYXVsdFZhbHVlIGFzIGksbm9ybWFsaXplRmllbGROYW1lIGFzIHR9ZnJvbVwiLi9maWVsZFV0aWxzLmpzXCI7ZnVuY3Rpb24gcyhlKXtyZXR1cm5cImRhdGVcIj09PWUudHlwZXx8XCJlc3JpRmllbGRUeXBlRGF0ZVwiPT09ZS50eXBlfWZ1bmN0aW9uIGwoZSl7cmV0dXJuXCJvaWRcIj09PWUudHlwZXx8XCJlc3JpRmllbGRUeXBlT0lEXCI9PT1lLnR5cGV9ZnVuY3Rpb24gZChlKXtyZXR1cm5cImdsb2JhbC1pZFwiPT09ZS50eXBlfHxcImVzcmlGaWVsZFR5cGVHbG9iYWxJRFwiPT09ZS50eXBlfWNsYXNzIHJ7Y29uc3RydWN0b3IoaT1bXSl7aWYodGhpcy5maWVsZHM9W10sdGhpcy5fZmllbGRzTWFwPW5ldyBNYXAsdGhpcy5fbm9ybWFsaXplZEZpZWxkc01hcD1uZXcgTWFwLHRoaXMuX2RhdGVGaWVsZHNTZXQ9bmV3IFNldCx0aGlzLl9udW1lcmljRmllbGRzU2V0PW5ldyBTZXQsdGhpcy5kYXRlRmllbGRzPVtdLHRoaXMubnVtZXJpY0ZpZWxkcz1bXSx0aGlzLl9yZXF1aXJlZEZpZWxkcz1udWxsLCFpKXJldHVybjt0aGlzLmZpZWxkcz1pO2NvbnN0IHQ9W107Zm9yKGNvbnN0IHIgb2YgaSl7Y29uc3QgaT1yJiZyLm5hbWU7aWYoaSl7Y29uc3QgdT1uKGkpLGg9YShpKTt0aGlzLl9maWVsZHNNYXAuc2V0KGksciksdGhpcy5fZmllbGRzTWFwLnNldCh1LHIpLHRoaXMuX25vcm1hbGl6ZWRGaWVsZHNNYXAuc2V0KGgsciksdC5wdXNoKHUpLHMocik/KHRoaXMuZGF0ZUZpZWxkcy5wdXNoKHIpLHRoaXMuX2RhdGVGaWVsZHNTZXQuYWRkKHIpKTplKHIpJiYodGhpcy5fbnVtZXJpY0ZpZWxkc1NldC5hZGQociksdGhpcy5udW1lcmljRmllbGRzLnB1c2gocikpLGwocil8fGQocil8fChyLmVkaXRhYmxlPW51bGw9PXIuZWRpdGFibGV8fCEhci5lZGl0YWJsZSxyLm51bGxhYmxlPW51bGw9PXIubnVsbGFibGV8fCEhci5udWxsYWJsZSl9fXQuc29ydCgpLHRoaXMudWlkPXQuam9pbihcIixcIil9ZGVzdHJveSgpe3RoaXMuX2ZpZWxkc01hcC5jbGVhcigpfWdldCByZXF1aXJlZEZpZWxkcygpe2lmKCF0aGlzLl9yZXF1aXJlZEZpZWxkcyl7dGhpcy5fcmVxdWlyZWRGaWVsZHM9W107Zm9yKGNvbnN0IGUgb2YgdGhpcy5maWVsZHMpbChlKXx8ZChlKXx8ZS5udWxsYWJsZXx8dm9pZCAwIT09aShlKXx8dGhpcy5fcmVxdWlyZWRGaWVsZHMucHVzaChlKX1yZXR1cm4gdGhpcy5fcmVxdWlyZWRGaWVsZHN9aGFzKGUpe3JldHVybiBudWxsIT10aGlzLmdldChlKX1nZXQoZSl7aWYoIWUpcmV0dXJuO2xldCBpPXRoaXMuX2ZpZWxkc01hcC5nZXQoZSk7cmV0dXJuIGl8fChpPXRoaXMuX2ZpZWxkc01hcC5nZXQobihlKSk/P3RoaXMuX25vcm1hbGl6ZWRGaWVsZHNNYXAuZ2V0KGEoZSkpLGkmJnRoaXMuX2ZpZWxkc01hcC5zZXQoZSxpKSxpKX1pc0RhdGVGaWVsZChlKXtyZXR1cm4gdGhpcy5fZGF0ZUZpZWxkc1NldC5oYXModGhpcy5nZXQoZSkpfWlzTnVtZXJpY0ZpZWxkKGUpe3JldHVybiB0aGlzLl9udW1lcmljRmllbGRzU2V0Lmhhcyh0aGlzLmdldChlKSl9bm9ybWFsaXplRmllbGROYW1lKGUpe2NvbnN0IGk9dGhpcy5nZXQoZSk7aWYoaSlyZXR1cm4gaS5uYW1lPz92b2lkIDB9fWZ1bmN0aW9uIG4oZSl7cmV0dXJuIGUudHJpbSgpLnRvTG93ZXJDYXNlKCl9ZnVuY3Rpb24gYShlKXtyZXR1cm4gdChlKS50b0xvd2VyQ2FzZSgpfWV4cG9ydHtyIGFzIGRlZmF1bHR9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@arcgis/core/layers/support/FieldsIndex.js\n");

/***/ })

}]);