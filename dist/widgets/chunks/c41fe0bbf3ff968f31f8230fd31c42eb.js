"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkexb_client"] = self["webpackChunkexb_client"] || []).push([["node_modules_arcgis_core_layers_TileLayer_js"],{

/***/ "./node_modules/@arcgis/core/layers/TileLayer.js":
/*!*******************************************************!*\
  !*** ./node_modules/@arcgis/core/layers/TileLayer.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ B)\n/* harmony export */ });\n/* harmony import */ var _chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../chunks/tslib.es6.js */ \"./node_modules/@arcgis/core/chunks/tslib.es6.js\");\n/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../request.js */ \"./node_modules/@arcgis/core/request.js\");\n/* harmony import */ var _core_Error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Error.js */ \"./node_modules/@arcgis/core/core/Error.js\");\n/* harmony import */ var _core_HandleOwner_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/HandleOwner.js */ \"./node_modules/@arcgis/core/core/HandleOwner.js\");\n/* harmony import */ var _core_maybe_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/maybe.js */ \"./node_modules/@arcgis/core/core/maybe.js\");\n/* harmony import */ var _core_MultiOriginJSONSupport_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/MultiOriginJSONSupport.js */ \"./node_modules/@arcgis/core/core/MultiOriginJSONSupport.js\");\n/* harmony import */ var _core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/promiseUtils.js */ \"./node_modules/@arcgis/core/core/promiseUtils.js\");\n/* harmony import */ var _core_urlUtils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/urlUtils.js */ \"./node_modules/@arcgis/core/core/urlUtils.js\");\n/* harmony import */ var _core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/accessorSupport/decorators/property.js */ \"./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js\");\n/* harmony import */ var _core_arrayUtils_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/arrayUtils.js */ \"./node_modules/@arcgis/core/core/arrayUtils.js\");\n/* harmony import */ var _core_accessorSupport_decorators_cast_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/accessorSupport/decorators/cast.js */ \"./node_modules/@arcgis/core/core/accessorSupport/decorators/cast.js\");\n/* harmony import */ var _core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../core/accessorSupport/decorators/reader.js */ \"./node_modules/@arcgis/core/core/accessorSupport/decorators/reader.js\");\n/* harmony import */ var _core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../core/accessorSupport/decorators/subclass.js */ \"./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js\");\n/* harmony import */ var _core_accessorSupport_decorators_writer_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../core/accessorSupport/decorators/writer.js */ \"./node_modules/@arcgis/core/core/accessorSupport/decorators/writer.js\");\n/* harmony import */ var _geometry_SpatialReference_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../geometry/SpatialReference.js */ \"./node_modules/@arcgis/core/geometry/SpatialReference.js\");\n/* harmony import */ var _Layer_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Layer.js */ \"./node_modules/@arcgis/core/layers/Layer.js\");\n/* harmony import */ var _mixins_APIKeyMixin_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./mixins/APIKeyMixin.js */ \"./node_modules/@arcgis/core/layers/mixins/APIKeyMixin.js\");\n/* harmony import */ var _mixins_ArcGISCachedService_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./mixins/ArcGISCachedService.js */ \"./node_modules/@arcgis/core/layers/mixins/ArcGISCachedService.js\");\n/* harmony import */ var _mixins_ArcGISMapService_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./mixins/ArcGISMapService.js */ \"./node_modules/@arcgis/core/layers/mixins/ArcGISMapService.js\");\n/* harmony import */ var _mixins_ArcGISService_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./mixins/ArcGISService.js */ \"./node_modules/@arcgis/core/layers/mixins/ArcGISService.js\");\n/* harmony import */ var _mixins_BlendLayer_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./mixins/BlendLayer.js */ \"./node_modules/@arcgis/core/layers/mixins/BlendLayer.js\");\n/* harmony import */ var _mixins_CustomParametersMixin_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./mixins/CustomParametersMixin.js */ \"./node_modules/@arcgis/core/layers/mixins/CustomParametersMixin.js\");\n/* harmony import */ var _mixins_OperationalLayer_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./mixins/OperationalLayer.js */ \"./node_modules/@arcgis/core/layers/mixins/OperationalLayer.js\");\n/* harmony import */ var _mixins_PortalLayer_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./mixins/PortalLayer.js */ \"./node_modules/@arcgis/core/layers/mixins/PortalLayer.js\");\n/* harmony import */ var _mixins_RefreshableLayer_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./mixins/RefreshableLayer.js */ \"./node_modules/@arcgis/core/layers/mixins/RefreshableLayer.js\");\n/* harmony import */ var _mixins_ScaleRangeLayer_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./mixins/ScaleRangeLayer.js */ \"./node_modules/@arcgis/core/layers/mixins/ScaleRangeLayer.js\");\n/* harmony import */ var _mixins_SublayersOwner_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./mixins/SublayersOwner.js */ \"./node_modules/@arcgis/core/layers/mixins/SublayersOwner.js\");\n/* harmony import */ var _support_arcgisLayerUrl_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./support/arcgisLayerUrl.js */ \"./node_modules/@arcgis/core/layers/support/arcgisLayerUrl.js\");\n/* harmony import */ var _support_commonProperties_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./support/commonProperties.js */ \"./node_modules/@arcgis/core/layers/support/commonProperties.js\");\n/* harmony import */ var _support_Sublayer_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./support/Sublayer.js */ \"./node_modules/@arcgis/core/layers/support/Sublayer.js\");\n/*\nAll material copyright ESRI, All Rights Reserved, unless otherwise specified.\nSee https://js.arcgis.com/4.25/esri/copyright.txt for details.\n*/\nconst M=[\"Canvas/World_Dark_Gray_Base\",\"Canvas/World_Dark_Gray_Reference\",\"Canvas/World_Light_Gray_Base\",\"Canvas/World_Light_Gray_Reference\",\"Elevation/World_Hillshade\",\"Elevation/World_Hillshade_Dark\",\"Ocean/World_Ocean_Base\",\"Ocean/World_Ocean_Reference\",\"Ocean_Basemap\",\"Reference/World_Boundaries_and_Places\",\"Reference/World_Boundaries_and_Places_Alternate\",\"Reference/World_Transportation\",\"World_Imagery\",\"World_Street_Map\",\"World_Topo_Map\"];let W=class extends((0,_mixins_BlendLayer_js__WEBPACK_IMPORTED_MODULE_20__.BlendLayer)((0,_mixins_SublayersOwner_js__WEBPACK_IMPORTED_MODULE_26__.SublayersOwner)((0,_mixins_ScaleRangeLayer_js__WEBPACK_IMPORTED_MODULE_25__.ScaleRangeLayer)((0,_mixins_OperationalLayer_js__WEBPACK_IMPORTED_MODULE_22__.OperationalLayer)((0,_mixins_PortalLayer_js__WEBPACK_IMPORTED_MODULE_23__.PortalLayer)((0,_mixins_ArcGISCachedService_js__WEBPACK_IMPORTED_MODULE_17__.ArcGISCachedService)((0,_mixins_ArcGISMapService_js__WEBPACK_IMPORTED_MODULE_18__.ArcGISMapService)((0,_mixins_ArcGISService_js__WEBPACK_IMPORTED_MODULE_19__.ArcGISService)((0,_core_MultiOriginJSONSupport_js__WEBPACK_IMPORTED_MODULE_5__.MultiOriginJSONMixin)((0,_core_HandleOwner_js__WEBPACK_IMPORTED_MODULE_3__.HandleOwnerMixin)((0,_mixins_RefreshableLayer_js__WEBPACK_IMPORTED_MODULE_24__.RefreshableLayer)((0,_mixins_APIKeyMixin_js__WEBPACK_IMPORTED_MODULE_16__.APIKeyMixin)((0,_mixins_CustomParametersMixin_js__WEBPACK_IMPORTED_MODULE_21__.CustomParametersMixin)(_Layer_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"])))))))))))))){constructor(...e){super(...e),this.listMode=\"show\",this.isReference=null,this.operationalLayerType=\"ArcGISTiledMapServiceLayer\",this.resampling=!0,this.sourceJSON=null,this.spatialReference=null,this.path=null,this.sublayers=null,this.type=\"tile\",this.url=null}normalizeCtorArgs(e,r){return\"string\"==typeof e?{url:e,...r}:e}load(e){const r=(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:[\"Map Service\"]},e).catch(_core_promiseUtils_js__WEBPACK_IMPORTED_MODULE_6__.throwIfAbortError).then((()=>this._fetchService(r)))),Promise.resolve(this)}get attributionDataUrl(){const e=this.parsedUrl?.path.toLowerCase();return e?this._getDefaultAttribution(this._getMapName(e)):null}readSpatialReference(e,r){return(e=e||r.tileInfo&&r.tileInfo.spatialReference)&&_geometry_SpatialReference_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"].fromJSON(e)}writeSublayers(e,r,t,s){if(!this.loaded||!e)return;const i=e.slice().reverse().flatten((({sublayers:e})=>e&&e.toArray().reverse())).toArray(),o=[],a={writeSublayerStructure:!1,...s};i.forEach((e=>{const r=e.write({},a);o.push(r)}));o.some((e=>Object.keys(e).length>1))&&(r.layers=o)}get tileServers(){return this._getDefaultTileServers(this.parsedUrl.path)}castTileServers(e){return Array.isArray(e)?e.map((e=>(0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_7__.urlToObject)(e).path)):null}fetchTile(e,t,s,i={}){const{signal:o}=i,a=this.getTileUrl(e,t,s),l={responseType:\"image\",signal:o,query:{...this.refreshParameters}};return (0,_request_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(a,l).then((e=>e.data))}async fetchImageBitmapTile(e,t,s,i={}){const{signal:o}=i,a=this.getTileUrl(e,t,s),l={responseType:\"blob\",signal:o,query:{...this.refreshParameters}},n=await (0,_request_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(a,l);return createImageBitmap(n.data)}getTileUrl(e,r,t){const s=!this.tilemapCache&&this.supportsBlankTile,i=(0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_7__.objectToQuery)({...this.parsedUrl.query,blankTile:!s&&null,...this.customParameters,token:this.apiKey}),o=this.tileServers;return`${o&&o.length?o[r%o.length]:this.parsedUrl.path}/tile/${e}/${r}/${t}${i?\"?\"+i:\"\"}`}_fetchService(e){return new Promise(((s,o)=>{if(this.sourceJSON){if(null!=this.sourceJSON.bandCount&&null!=this.sourceJSON.pixelSizeX)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"tile-layer:unsupported-url\",\"use ImageryTileLayer to open a tiled image service\");return void s({data:this.sourceJSON})}if(!this.parsedUrl)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"tile-layer:undefined-url\",\"layer's url is not defined\");const a=(0,_support_arcgisLayerUrl_js__WEBPACK_IMPORTED_MODULE_27__.parse)(this.parsedUrl.path);if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(a)&&\"ImageServer\"===a.serverType)throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"tile-layer:unsupported-url\",\"use ImageryTileLayer to open a tiled image service\");(0,_request_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.parsedUrl.path,{query:{f:\"json\",...this.parsedUrl.query,...this.customParameters,token:this.apiKey},responseType:\"json\",signal:e}).then(s,o)})).then((r=>{if(r.ssl&&(this.url=this.url.replace(/^http:/i,\"https:\")),this.sourceJSON=r.data,this.read(r.data,{origin:\"service\",url:this.parsedUrl}),10.1===this.version&&!(0,_support_arcgisLayerUrl_js__WEBPACK_IMPORTED_MODULE_27__.isHostedAgolService)(this.url))return this._fetchServerVersion(this.url,e).then((e=>{this.read({currentVersion:e})})).catch((()=>{}))}))}_fetchServerVersion(e,s){if(!(0,_support_arcgisLayerUrl_js__WEBPACK_IMPORTED_MODULE_27__.isArcGISUrl)(e))return Promise.reject();const i=e.replace(/(.*\\/rest)\\/.*/i,\"$1\")+\"/info\";return (0,_request_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(i,{query:{f:\"json\",...this.customParameters,token:this.apiKey},responseType:\"json\",signal:s}).then((e=>{if(e.data&&e.data.currentVersion)return e.data.currentVersion;throw new _core_Error_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"tile-layer:version-not-available\")}))}_getMapName(e){const r=e.match(/^(?:https?:)?\\/\\/(server\\.arcgisonline\\.com|services\\.arcgisonline\\.com|ibasemaps-api\\.arcgis\\.com)\\/arcgis\\/rest\\/services\\/([^\\/]+(\\/[^\\/]+)*)\\/mapserver/i);return r&&r[2]}_getDefaultAttribution(e){if(!e)return;let r;e=e.toLowerCase();for(let t=0,s=M.length;t<s;t++)if(r=M[t],r.toLowerCase().includes(e))return (0,_core_urlUtils_js__WEBPACK_IMPORTED_MODULE_7__.makeAbsolute)(\"//static.arcgis.com/attribution/\"+r)}_getDefaultTileServers(e){const r=-1!==e.search(/^(?:https?:)?\\/\\/server\\.arcgisonline\\.com/i),t=-1!==e.search(/^(?:https?:)?\\/\\/services\\.arcgisonline\\.com/i);return r||t?[e,e.replace(r?/server\\.arcgisonline/i:/services\\.arcgisonline/i,r?\"services.arcgisonline\":\"server.arcgisonline\")]:[]}get hasOverriddenFetchTile(){return!this.fetchTile.__isDefault__}};(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__.property)({readOnly:!0})],W.prototype,\"attributionDataUrl\",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__.property)({type:[\"show\",\"hide\",\"hide-children\"]})],W.prototype,\"listMode\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__.property)({json:{read:!0,write:!0}})],W.prototype,\"blendMode\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__.property)({type:Boolean,json:{read:!1,write:{enabled:!0,overridePolicy:()=>({enabled:!1})}}})],W.prototype,\"isReference\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__.property)({readOnly:!0,type:[\"ArcGISTiledMapServiceLayer\"]})],W.prototype,\"operationalLayerType\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__.property)({type:Boolean})],W.prototype,\"resampling\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__.property)()],W.prototype,\"sourceJSON\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__.property)({type:_geometry_SpatialReference_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"]})],W.prototype,\"spatialReference\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_11__.reader)(\"spatialReference\",[\"spatialReference\",\"tileInfo\"])],W.prototype,\"readSpatialReference\",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__.property)({type:String,json:{origins:{\"web-scene\":{read:!0,write:!0}},read:!1}})],W.prototype,\"path\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__.property)({readOnly:!0})],W.prototype,\"sublayers\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_writer_js__WEBPACK_IMPORTED_MODULE_13__.writer)(\"sublayers\",{layers:{type:[_support_Sublayer_js__WEBPACK_IMPORTED_MODULE_29__[\"default\"]]}})],W.prototype,\"writeSublayers\",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__.property)({json:{read:!1,write:!1}})],W.prototype,\"popupEnabled\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__.property)()],W.prototype,\"tileServers\",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_cast_js__WEBPACK_IMPORTED_MODULE_10__.cast)(\"tileServers\")],W.prototype,\"castTileServers\",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__.property)({readOnly:!0,json:{read:!1}})],W.prototype,\"type\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_8__.property)(_support_commonProperties_js__WEBPACK_IMPORTED_MODULE_28__.url)],W.prototype,\"url\",void 0),W=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_12__.subclass)(\"esri.layers.TileLayer\")],W),W.prototype.fetchTile.__isDefault__=!0;const B=W;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL2xheWVycy9UaWxlTGF5ZXIuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BhcmNnaXMvY29yZS9sYXllcnMvVGlsZUxheWVyLmpzPzk4YWEiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbkFsbCBtYXRlcmlhbCBjb3B5cmlnaHQgRVNSSSwgQWxsIFJpZ2h0cyBSZXNlcnZlZCwgdW5sZXNzIG90aGVyd2lzZSBzcGVjaWZpZWQuXG5TZWUgaHR0cHM6Ly9qcy5hcmNnaXMuY29tLzQuMjUvZXNyaS9jb3B5cmlnaHQudHh0IGZvciBkZXRhaWxzLlxuKi9cbmltcG9ydHtfIGFzIGV9ZnJvbVwiLi4vY2h1bmtzL3RzbGliLmVzNi5qc1wiO2ltcG9ydCByIGZyb21cIi4uL3JlcXVlc3QuanNcIjtpbXBvcnQgdCBmcm9tXCIuLi9jb3JlL0Vycm9yLmpzXCI7aW1wb3J0e0hhbmRsZU93bmVyTWl4aW4gYXMgc31mcm9tXCIuLi9jb3JlL0hhbmRsZU93bmVyLmpzXCI7aW1wb3J0e2lzU29tZSBhcyBpfWZyb21cIi4uL2NvcmUvbWF5YmUuanNcIjtpbXBvcnR7TXVsdGlPcmlnaW5KU09OTWl4aW4gYXMgb31mcm9tXCIuLi9jb3JlL011bHRpT3JpZ2luSlNPTlN1cHBvcnQuanNcIjtpbXBvcnR7dGhyb3dJZkFib3J0RXJyb3IgYXMgYX1mcm9tXCIuLi9jb3JlL3Byb21pc2VVdGlscy5qc1wiO2ltcG9ydHt1cmxUb09iamVjdCBhcyBsLG9iamVjdFRvUXVlcnkgYXMgbixtYWtlQWJzb2x1dGUgYXMgcH1mcm9tXCIuLi9jb3JlL3VybFV0aWxzLmpzXCI7aW1wb3J0e3Byb3BlcnR5IGFzIGN9ZnJvbVwiLi4vY29yZS9hY2Nlc3NvclN1cHBvcnQvZGVjb3JhdG9ycy9wcm9wZXJ0eS5qc1wiO2ltcG9ydFwiLi4vY29yZS9hcnJheVV0aWxzLmpzXCI7aW1wb3J0e2Nhc3QgYXMgdX1mcm9tXCIuLi9jb3JlL2FjY2Vzc29yU3VwcG9ydC9kZWNvcmF0b3JzL2Nhc3QuanNcIjtpbXBvcnR7cmVhZGVyIGFzIG19ZnJvbVwiLi4vY29yZS9hY2Nlc3NvclN1cHBvcnQvZGVjb3JhdG9ycy9yZWFkZXIuanNcIjtpbXBvcnR7c3ViY2xhc3MgYXMgaH1mcm9tXCIuLi9jb3JlL2FjY2Vzc29yU3VwcG9ydC9kZWNvcmF0b3JzL3N1YmNsYXNzLmpzXCI7aW1wb3J0e3dyaXRlciBhcyBkfWZyb21cIi4uL2NvcmUvYWNjZXNzb3JTdXBwb3J0L2RlY29yYXRvcnMvd3JpdGVyLmpzXCI7aW1wb3J0IHkgZnJvbVwiLi4vZ2VvbWV0cnkvU3BhdGlhbFJlZmVyZW5jZS5qc1wiO2ltcG9ydCBmIGZyb21cIi4vTGF5ZXIuanNcIjtpbXBvcnR7QVBJS2V5TWl4aW4gYXMgdn1mcm9tXCIuL21peGlucy9BUElLZXlNaXhpbi5qc1wiO2ltcG9ydHtBcmNHSVNDYWNoZWRTZXJ2aWNlIGFzIGd9ZnJvbVwiLi9taXhpbnMvQXJjR0lTQ2FjaGVkU2VydmljZS5qc1wiO2ltcG9ydHtBcmNHSVNNYXBTZXJ2aWNlIGFzIFN9ZnJvbVwiLi9taXhpbnMvQXJjR0lTTWFwU2VydmljZS5qc1wiO2ltcG9ydHtBcmNHSVNTZXJ2aWNlIGFzIF99ZnJvbVwiLi9taXhpbnMvQXJjR0lTU2VydmljZS5qc1wiO2ltcG9ydHtCbGVuZExheWVyIGFzIGp9ZnJvbVwiLi9taXhpbnMvQmxlbmRMYXllci5qc1wiO2ltcG9ydHtDdXN0b21QYXJhbWV0ZXJzTWl4aW4gYXMgYn1mcm9tXCIuL21peGlucy9DdXN0b21QYXJhbWV0ZXJzTWl4aW4uanNcIjtpbXBvcnR7T3BlcmF0aW9uYWxMYXllciBhcyBUfWZyb21cIi4vbWl4aW5zL09wZXJhdGlvbmFsTGF5ZXIuanNcIjtpbXBvcnR7UG9ydGFsTGF5ZXIgYXMgd31mcm9tXCIuL21peGlucy9Qb3J0YWxMYXllci5qc1wiO2ltcG9ydHtSZWZyZXNoYWJsZUxheWVyIGFzIE99ZnJvbVwiLi9taXhpbnMvUmVmcmVzaGFibGVMYXllci5qc1wiO2ltcG9ydHtTY2FsZVJhbmdlTGF5ZXIgYXMgTH1mcm9tXCIuL21peGlucy9TY2FsZVJhbmdlTGF5ZXIuanNcIjtpbXBvcnR7U3VibGF5ZXJzT3duZXIgYXMgUn1mcm9tXCIuL21peGlucy9TdWJsYXllcnNPd25lci5qc1wiO2ltcG9ydHtwYXJzZSBhcyBVLGlzSG9zdGVkQWdvbFNlcnZpY2UgYXMgUCxpc0FyY0dJU1VybCBhcyB4fWZyb21cIi4vc3VwcG9ydC9hcmNnaXNMYXllclVybC5qc1wiO2ltcG9ydHt1cmwgYXMgSX1mcm9tXCIuL3N1cHBvcnQvY29tbW9uUHJvcGVydGllcy5qc1wiO2ltcG9ydCBBIGZyb21cIi4vc3VwcG9ydC9TdWJsYXllci5qc1wiO2NvbnN0IE09W1wiQ2FudmFzL1dvcmxkX0RhcmtfR3JheV9CYXNlXCIsXCJDYW52YXMvV29ybGRfRGFya19HcmF5X1JlZmVyZW5jZVwiLFwiQ2FudmFzL1dvcmxkX0xpZ2h0X0dyYXlfQmFzZVwiLFwiQ2FudmFzL1dvcmxkX0xpZ2h0X0dyYXlfUmVmZXJlbmNlXCIsXCJFbGV2YXRpb24vV29ybGRfSGlsbHNoYWRlXCIsXCJFbGV2YXRpb24vV29ybGRfSGlsbHNoYWRlX0RhcmtcIixcIk9jZWFuL1dvcmxkX09jZWFuX0Jhc2VcIixcIk9jZWFuL1dvcmxkX09jZWFuX1JlZmVyZW5jZVwiLFwiT2NlYW5fQmFzZW1hcFwiLFwiUmVmZXJlbmNlL1dvcmxkX0JvdW5kYXJpZXNfYW5kX1BsYWNlc1wiLFwiUmVmZXJlbmNlL1dvcmxkX0JvdW5kYXJpZXNfYW5kX1BsYWNlc19BbHRlcm5hdGVcIixcIlJlZmVyZW5jZS9Xb3JsZF9UcmFuc3BvcnRhdGlvblwiLFwiV29ybGRfSW1hZ2VyeVwiLFwiV29ybGRfU3RyZWV0X01hcFwiLFwiV29ybGRfVG9wb19NYXBcIl07bGV0IFc9Y2xhc3MgZXh0ZW5kcyhqKFIoTChUKHcoZyhTKF8obyhzKE8odihiKGYpKSkpKSkpKSkpKSkpKXtjb25zdHJ1Y3RvciguLi5lKXtzdXBlciguLi5lKSx0aGlzLmxpc3RNb2RlPVwic2hvd1wiLHRoaXMuaXNSZWZlcmVuY2U9bnVsbCx0aGlzLm9wZXJhdGlvbmFsTGF5ZXJUeXBlPVwiQXJjR0lTVGlsZWRNYXBTZXJ2aWNlTGF5ZXJcIix0aGlzLnJlc2FtcGxpbmc9ITAsdGhpcy5zb3VyY2VKU09OPW51bGwsdGhpcy5zcGF0aWFsUmVmZXJlbmNlPW51bGwsdGhpcy5wYXRoPW51bGwsdGhpcy5zdWJsYXllcnM9bnVsbCx0aGlzLnR5cGU9XCJ0aWxlXCIsdGhpcy51cmw9bnVsbH1ub3JtYWxpemVDdG9yQXJncyhlLHIpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBlP3t1cmw6ZSwuLi5yfTplfWxvYWQoZSl7Y29uc3Qgcj1pKGUpP2Uuc2lnbmFsOm51bGw7cmV0dXJuIHRoaXMuYWRkUmVzb2x2aW5nUHJvbWlzZSh0aGlzLmxvYWRGcm9tUG9ydGFsKHtzdXBwb3J0ZWRUeXBlczpbXCJNYXAgU2VydmljZVwiXX0sZSkuY2F0Y2goYSkudGhlbigoKCk9PnRoaXMuX2ZldGNoU2VydmljZShyKSkpKSxQcm9taXNlLnJlc29sdmUodGhpcyl9Z2V0IGF0dHJpYnV0aW9uRGF0YVVybCgpe2NvbnN0IGU9dGhpcy5wYXJzZWRVcmw/LnBhdGgudG9Mb3dlckNhc2UoKTtyZXR1cm4gZT90aGlzLl9nZXREZWZhdWx0QXR0cmlidXRpb24odGhpcy5fZ2V0TWFwTmFtZShlKSk6bnVsbH1yZWFkU3BhdGlhbFJlZmVyZW5jZShlLHIpe3JldHVybihlPWV8fHIudGlsZUluZm8mJnIudGlsZUluZm8uc3BhdGlhbFJlZmVyZW5jZSkmJnkuZnJvbUpTT04oZSl9d3JpdGVTdWJsYXllcnMoZSxyLHQscyl7aWYoIXRoaXMubG9hZGVkfHwhZSlyZXR1cm47Y29uc3QgaT1lLnNsaWNlKCkucmV2ZXJzZSgpLmZsYXR0ZW4oKCh7c3VibGF5ZXJzOmV9KT0+ZSYmZS50b0FycmF5KCkucmV2ZXJzZSgpKSkudG9BcnJheSgpLG89W10sYT17d3JpdGVTdWJsYXllclN0cnVjdHVyZTohMSwuLi5zfTtpLmZvckVhY2goKGU9Pntjb25zdCByPWUud3JpdGUoe30sYSk7by5wdXNoKHIpfSkpO28uc29tZSgoZT0+T2JqZWN0LmtleXMoZSkubGVuZ3RoPjEpKSYmKHIubGF5ZXJzPW8pfWdldCB0aWxlU2VydmVycygpe3JldHVybiB0aGlzLl9nZXREZWZhdWx0VGlsZVNlcnZlcnModGhpcy5wYXJzZWRVcmwucGF0aCl9Y2FzdFRpbGVTZXJ2ZXJzKGUpe3JldHVybiBBcnJheS5pc0FycmF5KGUpP2UubWFwKChlPT5sKGUpLnBhdGgpKTpudWxsfWZldGNoVGlsZShlLHQscyxpPXt9KXtjb25zdHtzaWduYWw6b309aSxhPXRoaXMuZ2V0VGlsZVVybChlLHQscyksbD17cmVzcG9uc2VUeXBlOlwiaW1hZ2VcIixzaWduYWw6byxxdWVyeTp7Li4udGhpcy5yZWZyZXNoUGFyYW1ldGVyc319O3JldHVybiByKGEsbCkudGhlbigoZT0+ZS5kYXRhKSl9YXN5bmMgZmV0Y2hJbWFnZUJpdG1hcFRpbGUoZSx0LHMsaT17fSl7Y29uc3R7c2lnbmFsOm99PWksYT10aGlzLmdldFRpbGVVcmwoZSx0LHMpLGw9e3Jlc3BvbnNlVHlwZTpcImJsb2JcIixzaWduYWw6byxxdWVyeTp7Li4udGhpcy5yZWZyZXNoUGFyYW1ldGVyc319LG49YXdhaXQgcihhLGwpO3JldHVybiBjcmVhdGVJbWFnZUJpdG1hcChuLmRhdGEpfWdldFRpbGVVcmwoZSxyLHQpe2NvbnN0IHM9IXRoaXMudGlsZW1hcENhY2hlJiZ0aGlzLnN1cHBvcnRzQmxhbmtUaWxlLGk9bih7Li4udGhpcy5wYXJzZWRVcmwucXVlcnksYmxhbmtUaWxlOiFzJiZudWxsLC4uLnRoaXMuY3VzdG9tUGFyYW1ldGVycyx0b2tlbjp0aGlzLmFwaUtleX0pLG89dGhpcy50aWxlU2VydmVycztyZXR1cm5gJHtvJiZvLmxlbmd0aD9vW3Ilby5sZW5ndGhdOnRoaXMucGFyc2VkVXJsLnBhdGh9L3RpbGUvJHtlfS8ke3J9LyR7dH0ke2k/XCI/XCIraTpcIlwifWB9X2ZldGNoU2VydmljZShlKXtyZXR1cm4gbmV3IFByb21pc2UoKChzLG8pPT57aWYodGhpcy5zb3VyY2VKU09OKXtpZihudWxsIT10aGlzLnNvdXJjZUpTT04uYmFuZENvdW50JiZudWxsIT10aGlzLnNvdXJjZUpTT04ucGl4ZWxTaXplWCl0aHJvdyBuZXcgdChcInRpbGUtbGF5ZXI6dW5zdXBwb3J0ZWQtdXJsXCIsXCJ1c2UgSW1hZ2VyeVRpbGVMYXllciB0byBvcGVuIGEgdGlsZWQgaW1hZ2Ugc2VydmljZVwiKTtyZXR1cm4gdm9pZCBzKHtkYXRhOnRoaXMuc291cmNlSlNPTn0pfWlmKCF0aGlzLnBhcnNlZFVybCl0aHJvdyBuZXcgdChcInRpbGUtbGF5ZXI6dW5kZWZpbmVkLXVybFwiLFwibGF5ZXIncyB1cmwgaXMgbm90IGRlZmluZWRcIik7Y29uc3QgYT1VKHRoaXMucGFyc2VkVXJsLnBhdGgpO2lmKGkoYSkmJlwiSW1hZ2VTZXJ2ZXJcIj09PWEuc2VydmVyVHlwZSl0aHJvdyBuZXcgdChcInRpbGUtbGF5ZXI6dW5zdXBwb3J0ZWQtdXJsXCIsXCJ1c2UgSW1hZ2VyeVRpbGVMYXllciB0byBvcGVuIGEgdGlsZWQgaW1hZ2Ugc2VydmljZVwiKTtyKHRoaXMucGFyc2VkVXJsLnBhdGgse3F1ZXJ5OntmOlwianNvblwiLC4uLnRoaXMucGFyc2VkVXJsLnF1ZXJ5LC4uLnRoaXMuY3VzdG9tUGFyYW1ldGVycyx0b2tlbjp0aGlzLmFwaUtleX0scmVzcG9uc2VUeXBlOlwianNvblwiLHNpZ25hbDplfSkudGhlbihzLG8pfSkpLnRoZW4oKHI9PntpZihyLnNzbCYmKHRoaXMudXJsPXRoaXMudXJsLnJlcGxhY2UoL15odHRwOi9pLFwiaHR0cHM6XCIpKSx0aGlzLnNvdXJjZUpTT049ci5kYXRhLHRoaXMucmVhZChyLmRhdGEse29yaWdpbjpcInNlcnZpY2VcIix1cmw6dGhpcy5wYXJzZWRVcmx9KSwxMC4xPT09dGhpcy52ZXJzaW9uJiYhUCh0aGlzLnVybCkpcmV0dXJuIHRoaXMuX2ZldGNoU2VydmVyVmVyc2lvbih0aGlzLnVybCxlKS50aGVuKChlPT57dGhpcy5yZWFkKHtjdXJyZW50VmVyc2lvbjplfSl9KSkuY2F0Y2goKCgpPT57fSkpfSkpfV9mZXRjaFNlcnZlclZlcnNpb24oZSxzKXtpZigheChlKSlyZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtjb25zdCBpPWUucmVwbGFjZSgvKC4qXFwvcmVzdClcXC8uKi9pLFwiJDFcIikrXCIvaW5mb1wiO3JldHVybiByKGkse3F1ZXJ5OntmOlwianNvblwiLC4uLnRoaXMuY3VzdG9tUGFyYW1ldGVycyx0b2tlbjp0aGlzLmFwaUtleX0scmVzcG9uc2VUeXBlOlwianNvblwiLHNpZ25hbDpzfSkudGhlbigoZT0+e2lmKGUuZGF0YSYmZS5kYXRhLmN1cnJlbnRWZXJzaW9uKXJldHVybiBlLmRhdGEuY3VycmVudFZlcnNpb247dGhyb3cgbmV3IHQoXCJ0aWxlLWxheWVyOnZlcnNpb24tbm90LWF2YWlsYWJsZVwiKX0pKX1fZ2V0TWFwTmFtZShlKXtjb25zdCByPWUubWF0Y2goL14oPzpodHRwcz86KT9cXC9cXC8oc2VydmVyXFwuYXJjZ2lzb25saW5lXFwuY29tfHNlcnZpY2VzXFwuYXJjZ2lzb25saW5lXFwuY29tfGliYXNlbWFwcy1hcGlcXC5hcmNnaXNcXC5jb20pXFwvYXJjZ2lzXFwvcmVzdFxcL3NlcnZpY2VzXFwvKFteXFwvXSsoXFwvW15cXC9dKykqKVxcL21hcHNlcnZlci9pKTtyZXR1cm4gciYmclsyXX1fZ2V0RGVmYXVsdEF0dHJpYnV0aW9uKGUpe2lmKCFlKXJldHVybjtsZXQgcjtlPWUudG9Mb3dlckNhc2UoKTtmb3IobGV0IHQ9MCxzPU0ubGVuZ3RoO3Q8czt0KyspaWYocj1NW3RdLHIudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhlKSlyZXR1cm4gcChcIi8vc3RhdGljLmFyY2dpcy5jb20vYXR0cmlidXRpb24vXCIrcil9X2dldERlZmF1bHRUaWxlU2VydmVycyhlKXtjb25zdCByPS0xIT09ZS5zZWFyY2goL14oPzpodHRwcz86KT9cXC9cXC9zZXJ2ZXJcXC5hcmNnaXNvbmxpbmVcXC5jb20vaSksdD0tMSE9PWUuc2VhcmNoKC9eKD86aHR0cHM/Oik/XFwvXFwvc2VydmljZXNcXC5hcmNnaXNvbmxpbmVcXC5jb20vaSk7cmV0dXJuIHJ8fHQ/W2UsZS5yZXBsYWNlKHI/L3NlcnZlclxcLmFyY2dpc29ubGluZS9pOi9zZXJ2aWNlc1xcLmFyY2dpc29ubGluZS9pLHI/XCJzZXJ2aWNlcy5hcmNnaXNvbmxpbmVcIjpcInNlcnZlci5hcmNnaXNvbmxpbmVcIildOltdfWdldCBoYXNPdmVycmlkZGVuRmV0Y2hUaWxlKCl7cmV0dXJuIXRoaXMuZmV0Y2hUaWxlLl9faXNEZWZhdWx0X199fTtlKFtjKHtyZWFkT25seTohMH0pXSxXLnByb3RvdHlwZSxcImF0dHJpYnV0aW9uRGF0YVVybFwiLG51bGwpLGUoW2Moe3R5cGU6W1wic2hvd1wiLFwiaGlkZVwiLFwiaGlkZS1jaGlsZHJlblwiXX0pXSxXLnByb3RvdHlwZSxcImxpc3RNb2RlXCIsdm9pZCAwKSxlKFtjKHtqc29uOntyZWFkOiEwLHdyaXRlOiEwfX0pXSxXLnByb3RvdHlwZSxcImJsZW5kTW9kZVwiLHZvaWQgMCksZShbYyh7dHlwZTpCb29sZWFuLGpzb246e3JlYWQ6ITEsd3JpdGU6e2VuYWJsZWQ6ITAsb3ZlcnJpZGVQb2xpY3k6KCk9Pih7ZW5hYmxlZDohMX0pfX19KV0sVy5wcm90b3R5cGUsXCJpc1JlZmVyZW5jZVwiLHZvaWQgMCksZShbYyh7cmVhZE9ubHk6ITAsdHlwZTpbXCJBcmNHSVNUaWxlZE1hcFNlcnZpY2VMYXllclwiXX0pXSxXLnByb3RvdHlwZSxcIm9wZXJhdGlvbmFsTGF5ZXJUeXBlXCIsdm9pZCAwKSxlKFtjKHt0eXBlOkJvb2xlYW59KV0sVy5wcm90b3R5cGUsXCJyZXNhbXBsaW5nXCIsdm9pZCAwKSxlKFtjKCldLFcucHJvdG90eXBlLFwic291cmNlSlNPTlwiLHZvaWQgMCksZShbYyh7dHlwZTp5fSldLFcucHJvdG90eXBlLFwic3BhdGlhbFJlZmVyZW5jZVwiLHZvaWQgMCksZShbbShcInNwYXRpYWxSZWZlcmVuY2VcIixbXCJzcGF0aWFsUmVmZXJlbmNlXCIsXCJ0aWxlSW5mb1wiXSldLFcucHJvdG90eXBlLFwicmVhZFNwYXRpYWxSZWZlcmVuY2VcIixudWxsKSxlKFtjKHt0eXBlOlN0cmluZyxqc29uOntvcmlnaW5zOntcIndlYi1zY2VuZVwiOntyZWFkOiEwLHdyaXRlOiEwfX0scmVhZDohMX19KV0sVy5wcm90b3R5cGUsXCJwYXRoXCIsdm9pZCAwKSxlKFtjKHtyZWFkT25seTohMH0pXSxXLnByb3RvdHlwZSxcInN1YmxheWVyc1wiLHZvaWQgMCksZShbZChcInN1YmxheWVyc1wiLHtsYXllcnM6e3R5cGU6W0FdfX0pXSxXLnByb3RvdHlwZSxcIndyaXRlU3VibGF5ZXJzXCIsbnVsbCksZShbYyh7anNvbjp7cmVhZDohMSx3cml0ZTohMX19KV0sVy5wcm90b3R5cGUsXCJwb3B1cEVuYWJsZWRcIix2b2lkIDApLGUoW2MoKV0sVy5wcm90b3R5cGUsXCJ0aWxlU2VydmVyc1wiLG51bGwpLGUoW3UoXCJ0aWxlU2VydmVyc1wiKV0sVy5wcm90b3R5cGUsXCJjYXN0VGlsZVNlcnZlcnNcIixudWxsKSxlKFtjKHtyZWFkT25seTohMCxqc29uOntyZWFkOiExfX0pXSxXLnByb3RvdHlwZSxcInR5cGVcIix2b2lkIDApLGUoW2MoSSldLFcucHJvdG90eXBlLFwidXJsXCIsdm9pZCAwKSxXPWUoW2goXCJlc3JpLmxheWVycy5UaWxlTGF5ZXJcIildLFcpLFcucHJvdG90eXBlLmZldGNoVGlsZS5fX2lzRGVmYXVsdF9fPSEwO2NvbnN0IEI9VztleHBvcnR7QiBhcyBkZWZhdWx0fTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/@arcgis/core/layers/TileLayer.js\n");

/***/ }),

/***/ "./node_modules/@arcgis/core/layers/mixins/ArcGISCachedService.js":
/*!************************************************************************!*\
  !*** ./node_modules/@arcgis/core/layers/mixins/ArcGISCachedService.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ArcGISCachedService\": () => (/* binding */ s)\n/* harmony export */ });\n/* harmony import */ var _chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../chunks/tslib.es6.js */ \"./node_modules/@arcgis/core/chunks/tslib.es6.js\");\n/* harmony import */ var _geometry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../geometry.js */ \"./node_modules/@arcgis/core/geometry.js\");\n/* harmony import */ var _core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/accessorSupport/decorators/property.js */ \"./node_modules/@arcgis/core/core/accessorSupport/decorators/property.js\");\n/* harmony import */ var _core_arrayUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/arrayUtils.js */ \"./node_modules/@arcgis/core/core/arrayUtils.js\");\n/* harmony import */ var _core_accessorSupport_ensureType_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/accessorSupport/ensureType.js */ \"./node_modules/@arcgis/core/core/accessorSupport/ensureType.js\");\n/* harmony import */ var _core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/accessorSupport/decorators/reader.js */ \"./node_modules/@arcgis/core/core/accessorSupport/decorators/reader.js\");\n/* harmony import */ var _core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/accessorSupport/decorators/subclass.js */ \"./node_modules/@arcgis/core/core/accessorSupport/decorators/subclass.js\");\n/* harmony import */ var _support_serviceTileInfoProperty_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../support/serviceTileInfoProperty.js */ \"./node_modules/@arcgis/core/layers/support/serviceTileInfoProperty.js\");\n/* harmony import */ var _support_TilemapCache_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../support/TilemapCache.js */ \"./node_modules/@arcgis/core/layers/support/TilemapCache.js\");\n/* harmony import */ var _geometry_SpatialReference_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../geometry/SpatialReference.js */ \"./node_modules/@arcgis/core/geometry/SpatialReference.js\");\n/*\nAll material copyright ESRI, All Rights Reserved, unless otherwise specified.\nSee https://js.arcgis.com/4.25/esri/copyright.txt for details.\n*/\nconst s=s=>{let l=class extends s{constructor(){super(...arguments),this.copyright=null,this.minScale=0,this.maxScale=0,this.spatialReference=null,this.tileInfo=null,this.tilemapCache=null}readMinScale(e,r){return null!=r.minLOD&&null!=r.maxLOD?e:0}readMaxScale(e,r){return null!=r.minLOD&&null!=r.maxLOD?e:0}get supportsBlankTile(){return this.version>=10.2}readTilemapCache(e,r){return r.capabilities&&r.capabilities.includes(\"Tilemap\")?new _support_TilemapCache_js__WEBPACK_IMPORTED_MODULE_8__.TilemapCache({layer:this}):null}};return (0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_2__.property)({json:{read:{source:\"copyrightText\"}}})],l.prototype,\"copyright\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_2__.property)()],l.prototype,\"minScale\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_5__.reader)(\"service\",\"minScale\")],l.prototype,\"readMinScale\",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_2__.property)()],l.prototype,\"maxScale\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_5__.reader)(\"service\",\"maxScale\")],l.prototype,\"readMaxScale\",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_2__.property)({type:_geometry_SpatialReference_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]})],l.prototype,\"spatialReference\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_2__.property)({readOnly:!0})],l.prototype,\"supportsBlankTile\",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_2__.property)(_support_serviceTileInfoProperty_js__WEBPACK_IMPORTED_MODULE_7__.serviceTileInfoProperty)],l.prototype,\"tileInfo\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_2__.property)()],l.prototype,\"tilemapCache\",void 0),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_reader_js__WEBPACK_IMPORTED_MODULE_5__.reader)(\"service\",\"tilemapCache\",[\"capabilities\"])],l.prototype,\"readTilemapCache\",null),(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_property_js__WEBPACK_IMPORTED_MODULE_2__.property)()],l.prototype,\"version\",void 0),l=(0,_chunks_tslib_es6_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_core_accessorSupport_decorators_subclass_js__WEBPACK_IMPORTED_MODULE_6__.subclass)(\"esri.layers.mixins.ArcGISCachedService\")],l),l};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL2xheWVycy9taXhpbnMvQXJjR0lTQ2FjaGVkU2VydmljZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BhcmNnaXMvY29yZS9sYXllcnMvbWl4aW5zL0FyY0dJU0NhY2hlZFNlcnZpY2UuanM/ZDkwZSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQWxsIG1hdGVyaWFsIGNvcHlyaWdodCBFU1JJLCBBbGwgUmlnaHRzIFJlc2VydmVkLCB1bmxlc3Mgb3RoZXJ3aXNlIHNwZWNpZmllZC5cblNlZSBodHRwczovL2pzLmFyY2dpcy5jb20vNC4yNS9lc3JpL2NvcHlyaWdodC50eHQgZm9yIGRldGFpbHMuXG4qL1xuaW1wb3J0e18gYXMgZX1mcm9tXCIuLi8uLi9jaHVua3MvdHNsaWIuZXM2LmpzXCI7aW1wb3J0XCIuLi8uLi9nZW9tZXRyeS5qc1wiO2ltcG9ydHtwcm9wZXJ0eSBhcyByfWZyb21cIi4uLy4uL2NvcmUvYWNjZXNzb3JTdXBwb3J0L2RlY29yYXRvcnMvcHJvcGVydHkuanNcIjtpbXBvcnRcIi4uLy4uL2NvcmUvYXJyYXlVdGlscy5qc1wiO2ltcG9ydFwiLi4vLi4vY29yZS9hY2Nlc3NvclN1cHBvcnQvZW5zdXJlVHlwZS5qc1wiO2ltcG9ydHtyZWFkZXIgYXMgb31mcm9tXCIuLi8uLi9jb3JlL2FjY2Vzc29yU3VwcG9ydC9kZWNvcmF0b3JzL3JlYWRlci5qc1wiO2ltcG9ydHtzdWJjbGFzcyBhcyB0fWZyb21cIi4uLy4uL2NvcmUvYWNjZXNzb3JTdXBwb3J0L2RlY29yYXRvcnMvc3ViY2xhc3MuanNcIjtpbXBvcnR7c2VydmljZVRpbGVJbmZvUHJvcGVydHkgYXMgaX1mcm9tXCIuLi9zdXBwb3J0L3NlcnZpY2VUaWxlSW5mb1Byb3BlcnR5LmpzXCI7aW1wb3J0e1RpbGVtYXBDYWNoZSBhcyBwfWZyb21cIi4uL3N1cHBvcnQvVGlsZW1hcENhY2hlLmpzXCI7aW1wb3J0IGEgZnJvbVwiLi4vLi4vZ2VvbWV0cnkvU3BhdGlhbFJlZmVyZW5jZS5qc1wiO2NvbnN0IHM9cz0+e2xldCBsPWNsYXNzIGV4dGVuZHMgc3tjb25zdHJ1Y3Rvcigpe3N1cGVyKC4uLmFyZ3VtZW50cyksdGhpcy5jb3B5cmlnaHQ9bnVsbCx0aGlzLm1pblNjYWxlPTAsdGhpcy5tYXhTY2FsZT0wLHRoaXMuc3BhdGlhbFJlZmVyZW5jZT1udWxsLHRoaXMudGlsZUluZm89bnVsbCx0aGlzLnRpbGVtYXBDYWNoZT1udWxsfXJlYWRNaW5TY2FsZShlLHIpe3JldHVybiBudWxsIT1yLm1pbkxPRCYmbnVsbCE9ci5tYXhMT0Q/ZTowfXJlYWRNYXhTY2FsZShlLHIpe3JldHVybiBudWxsIT1yLm1pbkxPRCYmbnVsbCE9ci5tYXhMT0Q/ZTowfWdldCBzdXBwb3J0c0JsYW5rVGlsZSgpe3JldHVybiB0aGlzLnZlcnNpb24+PTEwLjJ9cmVhZFRpbGVtYXBDYWNoZShlLHIpe3JldHVybiByLmNhcGFiaWxpdGllcyYmci5jYXBhYmlsaXRpZXMuaW5jbHVkZXMoXCJUaWxlbWFwXCIpP25ldyBwKHtsYXllcjp0aGlzfSk6bnVsbH19O3JldHVybiBlKFtyKHtqc29uOntyZWFkOntzb3VyY2U6XCJjb3B5cmlnaHRUZXh0XCJ9fX0pXSxsLnByb3RvdHlwZSxcImNvcHlyaWdodFwiLHZvaWQgMCksZShbcigpXSxsLnByb3RvdHlwZSxcIm1pblNjYWxlXCIsdm9pZCAwKSxlKFtvKFwic2VydmljZVwiLFwibWluU2NhbGVcIildLGwucHJvdG90eXBlLFwicmVhZE1pblNjYWxlXCIsbnVsbCksZShbcigpXSxsLnByb3RvdHlwZSxcIm1heFNjYWxlXCIsdm9pZCAwKSxlKFtvKFwic2VydmljZVwiLFwibWF4U2NhbGVcIildLGwucHJvdG90eXBlLFwicmVhZE1heFNjYWxlXCIsbnVsbCksZShbcih7dHlwZTphfSldLGwucHJvdG90eXBlLFwic3BhdGlhbFJlZmVyZW5jZVwiLHZvaWQgMCksZShbcih7cmVhZE9ubHk6ITB9KV0sbC5wcm90b3R5cGUsXCJzdXBwb3J0c0JsYW5rVGlsZVwiLG51bGwpLGUoW3IoaSldLGwucHJvdG90eXBlLFwidGlsZUluZm9cIix2b2lkIDApLGUoW3IoKV0sbC5wcm90b3R5cGUsXCJ0aWxlbWFwQ2FjaGVcIix2b2lkIDApLGUoW28oXCJzZXJ2aWNlXCIsXCJ0aWxlbWFwQ2FjaGVcIixbXCJjYXBhYmlsaXRpZXNcIl0pXSxsLnByb3RvdHlwZSxcInJlYWRUaWxlbWFwQ2FjaGVcIixudWxsKSxlKFtyKCldLGwucHJvdG90eXBlLFwidmVyc2lvblwiLHZvaWQgMCksbD1lKFt0KFwiZXNyaS5sYXllcnMubWl4aW5zLkFyY0dJU0NhY2hlZFNlcnZpY2VcIildLGwpLGx9O2V4cG9ydHtzIGFzIEFyY0dJU0NhY2hlZFNlcnZpY2V9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@arcgis/core/layers/mixins/ArcGISCachedService.js\n");

/***/ })

}]);