"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkexb_client"] = self["webpackChunkexb_client"] || []).push([["node_modules_arcgis_core_geometry_support_buffer_types_js-node_modules_arcgis_core_geometry_s-ca3435"],{

/***/ "./node_modules/@arcgis/core/geometry/support/buffer/types.js":
/*!********************************************************************!*\
  !*** ./node_modules/@arcgis/core/geometry/support/buffer/types.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"elementTypeSize\": () => (/* binding */ e),\n/* harmony export */   \"isInteger\": () => (/* binding */ s),\n/* harmony export */   \"isSigned\": () => (/* binding */ c),\n/* harmony export */   \"maximumValue\": () => (/* binding */ r)\n/* harmony export */ });\n/*\nAll material copyright ESRI, All Rights Reserved, unless otherwise specified.\nSee https://js.arcgis.com/4.25/esri/copyright.txt for details.\n*/\nfunction e(e){switch(e){case\"u8\":case\"i8\":return 1;case\"u16\":case\"i16\":return 2;case\"u32\":case\"i32\":case\"f32\":return 4;case\"f64\":return 8}}function c(e){switch(e){case\"u8\":case\"u16\":case\"u32\":return!1;case\"i8\":case\"i16\":case\"i32\":case\"f32\":case\"f64\":return!0}}function s(e){switch(e){case\"u8\":case\"u16\":case\"u32\":case\"i8\":case\"i16\":case\"i32\":return!0;case\"f32\":case\"f64\":return!1}}function r(e){switch(e){case\"u8\":return 255;case\"u16\":return 65535;case\"u32\":return 4294967295;case\"i8\":return 127;case\"i16\":return 32767;case\"i32\":return 2147483647;case\"f32\":return 3402823e32;case\"f64\":return 179769e303}}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL2dlb21ldHJ5L3N1cHBvcnQvYnVmZmVyL3R5cGVzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL25vZGVfbW9kdWxlcy9AYXJjZ2lzL2NvcmUvZ2VvbWV0cnkvc3VwcG9ydC9idWZmZXIvdHlwZXMuanM/NDZlMiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQWxsIG1hdGVyaWFsIGNvcHlyaWdodCBFU1JJLCBBbGwgUmlnaHRzIFJlc2VydmVkLCB1bmxlc3Mgb3RoZXJ3aXNlIHNwZWNpZmllZC5cblNlZSBodHRwczovL2pzLmFyY2dpcy5jb20vNC4yNS9lc3JpL2NvcHlyaWdodC50eHQgZm9yIGRldGFpbHMuXG4qL1xuZnVuY3Rpb24gZShlKXtzd2l0Y2goZSl7Y2FzZVwidThcIjpjYXNlXCJpOFwiOnJldHVybiAxO2Nhc2VcInUxNlwiOmNhc2VcImkxNlwiOnJldHVybiAyO2Nhc2VcInUzMlwiOmNhc2VcImkzMlwiOmNhc2VcImYzMlwiOnJldHVybiA0O2Nhc2VcImY2NFwiOnJldHVybiA4fX1mdW5jdGlvbiBjKGUpe3N3aXRjaChlKXtjYXNlXCJ1OFwiOmNhc2VcInUxNlwiOmNhc2VcInUzMlwiOnJldHVybiExO2Nhc2VcImk4XCI6Y2FzZVwiaTE2XCI6Y2FzZVwiaTMyXCI6Y2FzZVwiZjMyXCI6Y2FzZVwiZjY0XCI6cmV0dXJuITB9fWZ1bmN0aW9uIHMoZSl7c3dpdGNoKGUpe2Nhc2VcInU4XCI6Y2FzZVwidTE2XCI6Y2FzZVwidTMyXCI6Y2FzZVwiaThcIjpjYXNlXCJpMTZcIjpjYXNlXCJpMzJcIjpyZXR1cm4hMDtjYXNlXCJmMzJcIjpjYXNlXCJmNjRcIjpyZXR1cm4hMX19ZnVuY3Rpb24gcihlKXtzd2l0Y2goZSl7Y2FzZVwidThcIjpyZXR1cm4gMjU1O2Nhc2VcInUxNlwiOnJldHVybiA2NTUzNTtjYXNlXCJ1MzJcIjpyZXR1cm4gNDI5NDk2NzI5NTtjYXNlXCJpOFwiOnJldHVybiAxMjc7Y2FzZVwiaTE2XCI6cmV0dXJuIDMyNzY3O2Nhc2VcImkzMlwiOnJldHVybiAyMTQ3NDgzNjQ3O2Nhc2VcImYzMlwiOnJldHVybiAzNDAyODIzZTMyO2Nhc2VcImY2NFwiOnJldHVybiAxNzk3NjllMzAzfX1leHBvcnR7ZSBhcyBlbGVtZW50VHlwZVNpemUscyBhcyBpc0ludGVnZXIsYyBhcyBpc1NpZ25lZCxyIGFzIG1heGltdW1WYWx1ZX07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@arcgis/core/geometry/support/buffer/types.js\n");

/***/ }),

/***/ "./node_modules/@arcgis/core/geometry/support/meshUtils/loadGLTFMesh.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@arcgis/core/geometry/support/meshUtils/loadGLTFMesh.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadGLTFMesh\": () => (/* binding */ W)\n/* harmony export */ });\n/* harmony import */ var _Color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Color.js */ \"./node_modules/@arcgis/core/Color.js\");\n/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../request.js */ \"./node_modules/@arcgis/core/request.js\");\n/* harmony import */ var _core_MapUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/MapUtils.js */ \"./node_modules/@arcgis/core/core/MapUtils.js\");\n/* harmony import */ var _core_mathUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/mathUtils.js */ \"./node_modules/@arcgis/core/core/mathUtils.js\");\n/* harmony import */ var _core_maybe_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/maybe.js */ \"./node_modules/@arcgis/core/core/maybe.js\");\n/* harmony import */ var _chunks_mat3_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../chunks/mat3.js */ \"./node_modules/@arcgis/core/chunks/mat3.js\");\n/* harmony import */ var _chunks_mat3f64_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../chunks/mat3f64.js */ \"./node_modules/@arcgis/core/chunks/mat3f64.js\");\n/* harmony import */ var _chunks_vec3f64_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../chunks/vec3f64.js */ \"./node_modules/@arcgis/core/chunks/vec3f64.js\");\n/* harmony import */ var _chunks_vec4f64_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../chunks/vec4f64.js */ \"./node_modules/@arcgis/core/chunks/vec4f64.js\");\n/* harmony import */ var _MeshComponent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../MeshComponent.js */ \"./node_modules/@arcgis/core/geometry/support/MeshComponent.js\");\n/* harmony import */ var _MeshMaterialMetallicRoughness_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../MeshMaterialMetallicRoughness.js */ \"./node_modules/@arcgis/core/geometry/support/MeshMaterialMetallicRoughness.js\");\n/* harmony import */ var _MeshTexture_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../MeshTexture.js */ \"./node_modules/@arcgis/core/geometry/support/MeshTexture.js\");\n/* harmony import */ var _MeshVertexAttributes_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../MeshVertexAttributes.js */ \"./node_modules/@arcgis/core/geometry/support/MeshVertexAttributes.js\");\n/* harmony import */ var _buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../buffer/BufferView.js */ \"./node_modules/@arcgis/core/geometry/support/buffer/BufferView.js\");\n/* harmony import */ var _chunks_vec32_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../chunks/vec32.js */ \"./node_modules/@arcgis/core/chunks/vec32.js\");\n/* harmony import */ var _chunks_vec42_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../chunks/vec42.js */ \"./node_modules/@arcgis/core/chunks/vec42.js\");\n/* harmony import */ var _buffer_utils_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../buffer/utils.js */ \"./node_modules/@arcgis/core/geometry/support/buffer/utils.js\");\n/* harmony import */ var _georeference_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./georeference.js */ \"./node_modules/@arcgis/core/geometry/support/meshUtils/georeference.js\");\n/* harmony import */ var _views_3d_glTF_DefaultLoadingContext_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../views/3d/glTF/DefaultLoadingContext.js */ \"./node_modules/@arcgis/core/views/3d/glTF/DefaultLoadingContext.js\");\n/* harmony import */ var _views_3d_glTF_loader_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../views/3d/glTF/loader.js */ \"./node_modules/@arcgis/core/views/3d/glTF/loader.js\");\n/* harmony import */ var _views_3d_glTF_internal_indexUtils_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../views/3d/glTF/internal/indexUtils.js */ \"./node_modules/@arcgis/core/views/3d/glTF/internal/indexUtils.js\");\n/* harmony import */ var _views_3d_webgl_engine_lib_Indices_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../views/3d/webgl-engine/lib/Indices.js */ \"./node_modules/@arcgis/core/views/3d/webgl-engine/lib/Indices.js\");\n/* harmony import */ var _views_3d_webgl_engine_materials_DefaultMaterial_COLOR_GAMMA_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../views/3d/webgl-engine/materials/DefaultMaterial_COLOR_GAMMA.js */ \"./node_modules/@arcgis/core/views/3d/webgl-engine/materials/DefaultMaterial_COLOR_GAMMA.js\");\n/* harmony import */ var _views_webgl_enums_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../views/webgl/enums.js */ \"./node_modules/@arcgis/core/views/webgl/enums.js\");\n/* harmony import */ var _chunks_vec33_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../chunks/vec33.js */ \"./node_modules/@arcgis/core/chunks/vec33.js\");\n/* harmony import */ var _chunks_vec43_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../chunks/vec43.js */ \"./node_modules/@arcgis/core/chunks/vec43.js\");\n/* harmony import */ var _chunks_vec22_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../chunks/vec22.js */ \"./node_modules/@arcgis/core/chunks/vec22.js\");\n/*\nAll material copyright ESRI, All Rights Reserved, unless otherwise specified.\nSee https://js.arcgis.com/4.25/esri/copyright.txt for details.\n*/\nasync function W(e,t,r){const o=new _views_3d_glTF_DefaultLoadingContext_js__WEBPACK_IMPORTED_MODULE_18__.DefaultLoadingContext(X(r)),s=(await (0,_views_3d_glTF_loader_js__WEBPACK_IMPORTED_MODULE_19__.loadGLTF)(o,t,r,!0)).model,i=s.lods.shift(),a=new Map,c=new Map;s.textures.forEach(((e,t)=>a.set(t,te(e)))),s.materials.forEach(((e,t)=>c.set(t,re(e,a))));const u=ee(i);for(const n of u.parts)oe(u,n,c);const{position:l,normal:f,tangent:m,color:p,texCoord0:d}=u.vertexAttributes,x={position:l.typedBuffer,normal:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(f)?f.typedBuffer:null,tangent:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(m)?m.typedBuffer:null,uv:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(d)?d.typedBuffer:null,color:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(p)?p.typedBuffer:null},T=(0,_georeference_js__WEBPACK_IMPORTED_MODULE_17__.georeferenceByTransform)(x,e,r);return{transform:T.transform,components:u.components,spatialReference:e.spatialReference,vertexAttributes:new _MeshVertexAttributes_js__WEBPACK_IMPORTED_MODULE_12__.MeshVertexAttributes({position:T.vertexAttributes.position,normal:T.vertexAttributes.normal,tangent:T.vertexAttributes.tangent,color:x.color,uv:x.uv})}}function X(e){const r=e?.resolveFile;return r?{busy:!1,request:async(e,o,s)=>{const i=r(e),a=\"image\"===o?\"image\":\"binary\"===o?\"array-buffer\":\"json\";return(await (0,_request_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(i,{responseType:a,signal:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(s)?s.signal:null})).data}}:null}function Y(e,t){if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isNone)(e))return\"-\";const o=e.typedBuffer;return`${(0,_core_MapUtils_js__WEBPACK_IMPORTED_MODULE_2__.getOrCreateMapValue)(t,o.buffer,(()=>t.size))}/${o.byteOffset}/${o.byteLength}`}function Z(e){return (0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(e)?e.toString():\"-\"}function ee(e){let t=0;const has={color:!1,tangent:!1,normal:!1,texCoord0:!1},o=new Map,n=new Map,s=[];for(const i of e.parts){const{attributes:{position:e,normal:a,color:c,tangent:u,texCoord0:l}}=i,f=`\\n      ${Y(e,o)}/\\n      ${Y(a,o)}/\\n      ${Y(c,o)}/\\n      ${Y(u,o)}/\\n      ${Y(l,o)}/\\n      ${Z(i.transform)}\\n    `;let m=!1;const p=(0,_core_MapUtils_js__WEBPACK_IMPORTED_MODULE_2__.getOrCreateMapValue)(n,f,(()=>(m=!0,{start:t,length:e.count})));m&&(t+=e.count),a&&(has.normal=!0),c&&(has.color=!0),u&&(has.tangent=!0),l&&(has.texCoord0=!0),s.push({gltf:i,writeVertices:m,region:p})}return{vertexAttributes:{position:(0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_16__.createBuffer)(_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_13__.BufferViewVec3f64,t),normal:has.normal?(0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_16__.createBuffer)(_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_13__.BufferViewVec3f,t):null,tangent:has.tangent?(0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_16__.createBuffer)(_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_13__.BufferViewVec4f,t):null,color:has.color?(0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_16__.createBuffer)(_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_13__.BufferViewVec4u8,t):null,texCoord0:has.texCoord0?(0,_buffer_utils_js__WEBPACK_IMPORTED_MODULE_16__.createBuffer)(_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_13__.BufferViewVec2f,t):null},parts:s,components:[]}}function te(e){return new _MeshTexture_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]({data:e.data,wrap:ae(e.parameters.wrap)})}function re(t,r){const o=new _Color_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](le(t.color,t.opacity)),n=t.emissiveFactor?new _Color_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](fe(t.emissiveFactor)):null;return new _MeshMaterialMetallicRoughness_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]({color:o,colorTexture:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.unwrap)((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.applySome)(t.textureColor,(e=>r.get(e)))),normalTexture:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.unwrap)((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.applySome)(t.textureNormal,(e=>r.get(e)))),emissiveColor:n,emissiveTexture:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.unwrap)((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.applySome)(t.textureEmissive,(e=>r.get(e)))),occlusionTexture:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.unwrap)((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.applySome)(t.textureOcclusion,(e=>r.get(e)))),alphaMode:ie(t.alphaMode),alphaCutoff:t.alphaCutoff,doubleSided:t.doubleSided,metallic:t.metallicFactor,roughness:t.roughnessFactor,metallicRoughnessTexture:(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.unwrap)((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.applySome)(t.textureMetallicRoughness,(e=>r.get(e)))),colorTextureTransform:t.colorTextureTransform,normalTextureTransform:t.normalTextureTransform,occlusionTextureTransform:t.occlusionTextureTransform,emissiveTextureTransform:t.emissiveTextureTransform,metallicRoughnessTextureTransform:t.metallicRoughnessTextureTransform})}function oe(e,t,r){t.writeVertices&&ne(e,t);const o=t.gltf,n=se(o.indices||o.attributes.position.count,o.primitiveType),s=t.region.start;if(s)for(let i=0;i<n.length;i++)n[i]+=s;e.components.push(new _MeshComponent_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({faces:n,material:r.get(o.material),trustSourceNormals:!0}))}function ne(e,t){const{position:r,normal:s,tangent:i,color:a,texCoord0:l}=e.vertexAttributes,f=t.region.start,{attributes:m,transform:p}=t.gltf,d=m.position.count;if((0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_14__.t)(r.slice(f,d),m.position,p),(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(m.normal)&&(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(s)){const e=(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_5__.b)((0,_chunks_mat3f64_js__WEBPACK_IMPORTED_MODULE_6__.c)(),p),t=s.slice(f,d);(0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_14__.a)(t,m.normal,e),(0,_core_mathUtils_js__WEBPACK_IMPORTED_MODULE_3__.hasScaling)(e)&&(0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_14__.n)(t,t)}else (0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(s)&&(0,_chunks_vec33_js__WEBPACK_IMPORTED_MODULE_24__.f)(s,0,0,1,{dstIndex:f,count:d});if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(m.tangent)&&(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(i)){const e=(0,_chunks_mat3_js__WEBPACK_IMPORTED_MODULE_5__.b)((0,_chunks_mat3f64_js__WEBPACK_IMPORTED_MODULE_6__.c)(),p),t=i.slice(f,d);(0,_chunks_vec42_js__WEBPACK_IMPORTED_MODULE_15__.t)(t,m.tangent,e),(0,_core_mathUtils_js__WEBPACK_IMPORTED_MODULE_3__.hasScaling)(e)&&(0,_chunks_vec42_js__WEBPACK_IMPORTED_MODULE_15__.n)(t,t)}else (0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(i)&&(0,_chunks_vec43_js__WEBPACK_IMPORTED_MODULE_25__.f)(i,0,0,1,1,{dstIndex:f,count:d});if((0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(m.texCoord0)&&(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(l)?(0,_chunks_vec22_js__WEBPACK_IMPORTED_MODULE_26__.n)(l.slice(f,d),m.texCoord0):(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(l)&&(0,_chunks_vec22_js__WEBPACK_IMPORTED_MODULE_26__.f)(l,0,0,{dstIndex:f,count:d}),(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(m.color)&&(0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(a)){const e=m.color,t=a.slice(f,d);if(4===e.elementCount)e instanceof _buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_13__.BufferViewVec4f?(0,_chunks_vec42_js__WEBPACK_IMPORTED_MODULE_15__.s)(t,e,255):e instanceof _buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_13__.BufferViewVec4u8?(0,_chunks_vec43_js__WEBPACK_IMPORTED_MODULE_25__.c)(t,e):e instanceof _buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_13__.BufferViewVec4u16&&(0,_chunks_vec42_js__WEBPACK_IMPORTED_MODULE_15__.a)(t,e,8);else{(0,_chunks_vec43_js__WEBPACK_IMPORTED_MODULE_25__.f)(t,255,255,255,255);const r=_buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_13__.BufferViewVec3u8.fromTypedArray(t.typedBuffer,t.typedBufferStride);e instanceof _buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_13__.BufferViewVec3f?(0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_14__.s)(r,e,255):e instanceof _buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_13__.BufferViewVec3u8?(0,_chunks_vec33_js__WEBPACK_IMPORTED_MODULE_24__.c)(r,e):e instanceof _buffer_BufferView_js__WEBPACK_IMPORTED_MODULE_13__.BufferViewVec3u16&&(0,_chunks_vec32_js__WEBPACK_IMPORTED_MODULE_14__.b)(r,e,8)}}else (0,_core_maybe_js__WEBPACK_IMPORTED_MODULE_4__.isSome)(a)&&(0,_chunks_vec43_js__WEBPACK_IMPORTED_MODULE_25__.f)(a.slice(f,d),255,255,255,255)}function se(e,t){switch(t){case _views_webgl_enums_js__WEBPACK_IMPORTED_MODULE_23__.PrimitiveType.TRIANGLES:return (0,_views_3d_glTF_internal_indexUtils_js__WEBPACK_IMPORTED_MODULE_20__.trianglesToTriangles)(e,_views_3d_webgl_engine_lib_Indices_js__WEBPACK_IMPORTED_MODULE_21__.generateIndexArray);case _views_webgl_enums_js__WEBPACK_IMPORTED_MODULE_23__.PrimitiveType.TRIANGLE_STRIP:return (0,_views_3d_glTF_internal_indexUtils_js__WEBPACK_IMPORTED_MODULE_20__.triangleStripToTriangles)(e);case _views_webgl_enums_js__WEBPACK_IMPORTED_MODULE_23__.PrimitiveType.TRIANGLE_FAN:return (0,_views_3d_glTF_internal_indexUtils_js__WEBPACK_IMPORTED_MODULE_20__.triangleFanToTriangles)(e)}}function ie(e){switch(e){case\"OPAQUE\":return\"opaque\";case\"MASK\":return\"mask\";case\"BLEND\":return\"blend\"}}function ae(e){return{horizontal:ce(e.s),vertical:ce(e.t)}}function ce(e){switch(e){case _views_webgl_enums_js__WEBPACK_IMPORTED_MODULE_23__.TextureWrapMode.CLAMP_TO_EDGE:return\"clamp\";case _views_webgl_enums_js__WEBPACK_IMPORTED_MODULE_23__.TextureWrapMode.MIRRORED_REPEAT:return\"mirror\";case _views_webgl_enums_js__WEBPACK_IMPORTED_MODULE_23__.TextureWrapMode.REPEAT:return\"repeat\"}}function ue(e){return e**(1/_views_3d_webgl_engine_materials_DefaultMaterial_COLOR_GAMMA_js__WEBPACK_IMPORTED_MODULE_22__.COLOR_GAMMA)*255}function le(e,t){return (0,_chunks_vec4f64_js__WEBPACK_IMPORTED_MODULE_8__.f)(ue(e[0]),ue(e[1]),ue(e[2]),t)}function fe(e){return (0,_chunks_vec3f64_js__WEBPACK_IMPORTED_MODULE_7__.f)(ue(e[0]),ue(e[1]),ue(e[2]))}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL2dlb21ldHJ5L3N1cHBvcnQvbWVzaFV0aWxzL2xvYWRHTFRGTWVzaC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL2dlb21ldHJ5L3N1cHBvcnQvbWVzaFV0aWxzL2xvYWRHTFRGTWVzaC5qcz81ZDFlIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG5BbGwgbWF0ZXJpYWwgY29weXJpZ2h0IEVTUkksIEFsbCBSaWdodHMgUmVzZXJ2ZWQsIHVubGVzcyBvdGhlcndpc2Ugc3BlY2lmaWVkLlxuU2VlIGh0dHBzOi8vanMuYXJjZ2lzLmNvbS80LjI1L2VzcmkvY29weXJpZ2h0LnR4dCBmb3IgZGV0YWlscy5cbiovXG5pbXBvcnQgZSBmcm9tXCIuLi8uLi8uLi9Db2xvci5qc1wiO2ltcG9ydCB0IGZyb21cIi4uLy4uLy4uL3JlcXVlc3QuanNcIjtpbXBvcnR7Z2V0T3JDcmVhdGVNYXBWYWx1ZSBhcyByfWZyb21cIi4uLy4uLy4uL2NvcmUvTWFwVXRpbHMuanNcIjtpbXBvcnR7aGFzU2NhbGluZyBhcyBvfWZyb21cIi4uLy4uLy4uL2NvcmUvbWF0aFV0aWxzLmpzXCI7aW1wb3J0e2lzU29tZSBhcyBuLHVud3JhcCBhcyBzLGFwcGx5U29tZSBhcyBpLGlzTm9uZSBhcyBhfWZyb21cIi4uLy4uLy4uL2NvcmUvbWF5YmUuanNcIjtpbXBvcnR7YiBhcyBjfWZyb21cIi4uLy4uLy4uL2NodW5rcy9tYXQzLmpzXCI7aW1wb3J0e2MgYXMgdX1mcm9tXCIuLi8uLi8uLi9jaHVua3MvbWF0M2Y2NC5qc1wiO2ltcG9ydHtmIGFzIGx9ZnJvbVwiLi4vLi4vLi4vY2h1bmtzL3ZlYzNmNjQuanNcIjtpbXBvcnR7Zn1mcm9tXCIuLi8uLi8uLi9jaHVua3MvdmVjNGY2NC5qc1wiO2ltcG9ydCBtIGZyb21cIi4uL01lc2hDb21wb25lbnQuanNcIjtpbXBvcnQgcCBmcm9tXCIuLi9NZXNoTWF0ZXJpYWxNZXRhbGxpY1JvdWdobmVzcy5qc1wiO2ltcG9ydCBkIGZyb21cIi4uL01lc2hUZXh0dXJlLmpzXCI7aW1wb3J0e01lc2hWZXJ0ZXhBdHRyaWJ1dGVzIGFzIGd9ZnJvbVwiLi4vTWVzaFZlcnRleEF0dHJpYnV0ZXMuanNcIjtpbXBvcnR7QnVmZmVyVmlld1ZlYzRmIGFzIHgsQnVmZmVyVmlld1ZlYzR1OCBhcyBULEJ1ZmZlclZpZXdWZWM0dTE2IGFzIGgsQnVmZmVyVmlld1ZlYzN1OCBhcyB2LEJ1ZmZlclZpZXdWZWMzZiBhcyB3LEJ1ZmZlclZpZXdWZWMzdTE2IGFzIGIsQnVmZmVyVmlld1ZlYzNmNjQgYXMgaixCdWZmZXJWaWV3VmVjMmYgYXMgeX1mcm9tXCIuLi9idWZmZXIvQnVmZmVyVmlldy5qc1wiO2ltcG9ydHt0IGFzIEEsYSBhcyBNLG4gYXMgQyxzIGFzIFIsYiBhcyBFfWZyb21cIi4uLy4uLy4uL2NodW5rcy92ZWMzMi5qc1wiO2ltcG9ydHt0IGFzIGssbiBhcyBCLHMgYXMgRixhIGFzIEl9ZnJvbVwiLi4vLi4vLi4vY2h1bmtzL3ZlYzQyLmpzXCI7aW1wb3J0e2NyZWF0ZUJ1ZmZlciBhcyAkfWZyb21cIi4uL2J1ZmZlci91dGlscy5qc1wiO2ltcG9ydHtnZW9yZWZlcmVuY2VCeVRyYW5zZm9ybSBhcyBMfWZyb21cIi4vZ2VvcmVmZXJlbmNlLmpzXCI7aW1wb3J0e0RlZmF1bHRMb2FkaW5nQ29udGV4dCBhcyBTfWZyb21cIi4uLy4uLy4uL3ZpZXdzLzNkL2dsVEYvRGVmYXVsdExvYWRpbmdDb250ZXh0LmpzXCI7aW1wb3J0e2xvYWRHTFRGIGFzIE59ZnJvbVwiLi4vLi4vLi4vdmlld3MvM2QvZ2xURi9sb2FkZXIuanNcIjtpbXBvcnR7dHJpYW5nbGVGYW5Ub1RyaWFuZ2xlcyBhcyBPLHRyaWFuZ2xlU3RyaXBUb1RyaWFuZ2xlcyBhcyBfLHRyaWFuZ2xlc1RvVHJpYW5nbGVzIGFzIER9ZnJvbVwiLi4vLi4vLi4vdmlld3MvM2QvZ2xURi9pbnRlcm5hbC9pbmRleFV0aWxzLmpzXCI7aW1wb3J0e2dlbmVyYXRlSW5kZXhBcnJheSBhcyBHfWZyb21cIi4uLy4uLy4uL3ZpZXdzLzNkL3dlYmdsLWVuZ2luZS9saWIvSW5kaWNlcy5qc1wiO2ltcG9ydHtDT0xPUl9HQU1NQSBhcyBQfWZyb21cIi4uLy4uLy4uL3ZpZXdzLzNkL3dlYmdsLWVuZ2luZS9tYXRlcmlhbHMvRGVmYXVsdE1hdGVyaWFsX0NPTE9SX0dBTU1BLmpzXCI7aW1wb3J0e1ByaW1pdGl2ZVR5cGUgYXMgVSxUZXh0dXJlV3JhcE1vZGUgYXMgVn1mcm9tXCIuLi8uLi8uLi92aWV3cy93ZWJnbC9lbnVtcy5qc1wiO2ltcG9ydHtmIGFzIHEsYyBhcyB6fWZyb21cIi4uLy4uLy4uL2NodW5rcy92ZWMzMy5qc1wiO2ltcG9ydHtmIGFzIEssYyBhcyBRfWZyb21cIi4uLy4uLy4uL2NodW5rcy92ZWM0My5qc1wiO2ltcG9ydHtuIGFzIEgsZiBhcyBKfWZyb21cIi4uLy4uLy4uL2NodW5rcy92ZWMyMi5qc1wiO2FzeW5jIGZ1bmN0aW9uIFcoZSx0LHIpe2NvbnN0IG89bmV3IFMoWChyKSkscz0oYXdhaXQgTihvLHQsciwhMCkpLm1vZGVsLGk9cy5sb2RzLnNoaWZ0KCksYT1uZXcgTWFwLGM9bmV3IE1hcDtzLnRleHR1cmVzLmZvckVhY2goKChlLHQpPT5hLnNldCh0LHRlKGUpKSkpLHMubWF0ZXJpYWxzLmZvckVhY2goKChlLHQpPT5jLnNldCh0LHJlKGUsYSkpKSk7Y29uc3QgdT1lZShpKTtmb3IoY29uc3QgbiBvZiB1LnBhcnRzKW9lKHUsbixjKTtjb25zdHtwb3NpdGlvbjpsLG5vcm1hbDpmLHRhbmdlbnQ6bSxjb2xvcjpwLHRleENvb3JkMDpkfT11LnZlcnRleEF0dHJpYnV0ZXMseD17cG9zaXRpb246bC50eXBlZEJ1ZmZlcixub3JtYWw6bihmKT9mLnR5cGVkQnVmZmVyOm51bGwsdGFuZ2VudDpuKG0pP20udHlwZWRCdWZmZXI6bnVsbCx1djpuKGQpP2QudHlwZWRCdWZmZXI6bnVsbCxjb2xvcjpuKHApP3AudHlwZWRCdWZmZXI6bnVsbH0sVD1MKHgsZSxyKTtyZXR1cm57dHJhbnNmb3JtOlQudHJhbnNmb3JtLGNvbXBvbmVudHM6dS5jb21wb25lbnRzLHNwYXRpYWxSZWZlcmVuY2U6ZS5zcGF0aWFsUmVmZXJlbmNlLHZlcnRleEF0dHJpYnV0ZXM6bmV3IGcoe3Bvc2l0aW9uOlQudmVydGV4QXR0cmlidXRlcy5wb3NpdGlvbixub3JtYWw6VC52ZXJ0ZXhBdHRyaWJ1dGVzLm5vcm1hbCx0YW5nZW50OlQudmVydGV4QXR0cmlidXRlcy50YW5nZW50LGNvbG9yOnguY29sb3IsdXY6eC51dn0pfX1mdW5jdGlvbiBYKGUpe2NvbnN0IHI9ZT8ucmVzb2x2ZUZpbGU7cmV0dXJuIHI/e2J1c3k6ITEscmVxdWVzdDphc3luYyhlLG8scyk9Pntjb25zdCBpPXIoZSksYT1cImltYWdlXCI9PT1vP1wiaW1hZ2VcIjpcImJpbmFyeVwiPT09bz9cImFycmF5LWJ1ZmZlclwiOlwianNvblwiO3JldHVybihhd2FpdCB0KGkse3Jlc3BvbnNlVHlwZTphLHNpZ25hbDpuKHMpP3Muc2lnbmFsOm51bGx9KSkuZGF0YX19Om51bGx9ZnVuY3Rpb24gWShlLHQpe2lmKGEoZSkpcmV0dXJuXCItXCI7Y29uc3Qgbz1lLnR5cGVkQnVmZmVyO3JldHVybmAke3IodCxvLmJ1ZmZlciwoKCk9PnQuc2l6ZSkpfS8ke28uYnl0ZU9mZnNldH0vJHtvLmJ5dGVMZW5ndGh9YH1mdW5jdGlvbiBaKGUpe3JldHVybiBuKGUpP2UudG9TdHJpbmcoKTpcIi1cIn1mdW5jdGlvbiBlZShlKXtsZXQgdD0wO2NvbnN0IGhhcz17Y29sb3I6ITEsdGFuZ2VudDohMSxub3JtYWw6ITEsdGV4Q29vcmQwOiExfSxvPW5ldyBNYXAsbj1uZXcgTWFwLHM9W107Zm9yKGNvbnN0IGkgb2YgZS5wYXJ0cyl7Y29uc3R7YXR0cmlidXRlczp7cG9zaXRpb246ZSxub3JtYWw6YSxjb2xvcjpjLHRhbmdlbnQ6dSx0ZXhDb29yZDA6bH19PWksZj1gXFxuICAgICAgJHtZKGUsbyl9L1xcbiAgICAgICR7WShhLG8pfS9cXG4gICAgICAke1koYyxvKX0vXFxuICAgICAgJHtZKHUsbyl9L1xcbiAgICAgICR7WShsLG8pfS9cXG4gICAgICAke1ooaS50cmFuc2Zvcm0pfVxcbiAgICBgO2xldCBtPSExO2NvbnN0IHA9cihuLGYsKCgpPT4obT0hMCx7c3RhcnQ6dCxsZW5ndGg6ZS5jb3VudH0pKSk7bSYmKHQrPWUuY291bnQpLGEmJihoYXMubm9ybWFsPSEwKSxjJiYoaGFzLmNvbG9yPSEwKSx1JiYoaGFzLnRhbmdlbnQ9ITApLGwmJihoYXMudGV4Q29vcmQwPSEwKSxzLnB1c2goe2dsdGY6aSx3cml0ZVZlcnRpY2VzOm0scmVnaW9uOnB9KX1yZXR1cm57dmVydGV4QXR0cmlidXRlczp7cG9zaXRpb246JChqLHQpLG5vcm1hbDpoYXMubm9ybWFsPyQodyx0KTpudWxsLHRhbmdlbnQ6aGFzLnRhbmdlbnQ/JCh4LHQpOm51bGwsY29sb3I6aGFzLmNvbG9yPyQoVCx0KTpudWxsLHRleENvb3JkMDpoYXMudGV4Q29vcmQwPyQoeSx0KTpudWxsfSxwYXJ0czpzLGNvbXBvbmVudHM6W119fWZ1bmN0aW9uIHRlKGUpe3JldHVybiBuZXcgZCh7ZGF0YTplLmRhdGEsd3JhcDphZShlLnBhcmFtZXRlcnMud3JhcCl9KX1mdW5jdGlvbiByZSh0LHIpe2NvbnN0IG89bmV3IGUobGUodC5jb2xvcix0Lm9wYWNpdHkpKSxuPXQuZW1pc3NpdmVGYWN0b3I/bmV3IGUoZmUodC5lbWlzc2l2ZUZhY3RvcikpOm51bGw7cmV0dXJuIG5ldyBwKHtjb2xvcjpvLGNvbG9yVGV4dHVyZTpzKGkodC50ZXh0dXJlQ29sb3IsKGU9PnIuZ2V0KGUpKSkpLG5vcm1hbFRleHR1cmU6cyhpKHQudGV4dHVyZU5vcm1hbCwoZT0+ci5nZXQoZSkpKSksZW1pc3NpdmVDb2xvcjpuLGVtaXNzaXZlVGV4dHVyZTpzKGkodC50ZXh0dXJlRW1pc3NpdmUsKGU9PnIuZ2V0KGUpKSkpLG9jY2x1c2lvblRleHR1cmU6cyhpKHQudGV4dHVyZU9jY2x1c2lvbiwoZT0+ci5nZXQoZSkpKSksYWxwaGFNb2RlOmllKHQuYWxwaGFNb2RlKSxhbHBoYUN1dG9mZjp0LmFscGhhQ3V0b2ZmLGRvdWJsZVNpZGVkOnQuZG91YmxlU2lkZWQsbWV0YWxsaWM6dC5tZXRhbGxpY0ZhY3Rvcixyb3VnaG5lc3M6dC5yb3VnaG5lc3NGYWN0b3IsbWV0YWxsaWNSb3VnaG5lc3NUZXh0dXJlOnMoaSh0LnRleHR1cmVNZXRhbGxpY1JvdWdobmVzcywoZT0+ci5nZXQoZSkpKSksY29sb3JUZXh0dXJlVHJhbnNmb3JtOnQuY29sb3JUZXh0dXJlVHJhbnNmb3JtLG5vcm1hbFRleHR1cmVUcmFuc2Zvcm06dC5ub3JtYWxUZXh0dXJlVHJhbnNmb3JtLG9jY2x1c2lvblRleHR1cmVUcmFuc2Zvcm06dC5vY2NsdXNpb25UZXh0dXJlVHJhbnNmb3JtLGVtaXNzaXZlVGV4dHVyZVRyYW5zZm9ybTp0LmVtaXNzaXZlVGV4dHVyZVRyYW5zZm9ybSxtZXRhbGxpY1JvdWdobmVzc1RleHR1cmVUcmFuc2Zvcm06dC5tZXRhbGxpY1JvdWdobmVzc1RleHR1cmVUcmFuc2Zvcm19KX1mdW5jdGlvbiBvZShlLHQscil7dC53cml0ZVZlcnRpY2VzJiZuZShlLHQpO2NvbnN0IG89dC5nbHRmLG49c2Uoby5pbmRpY2VzfHxvLmF0dHJpYnV0ZXMucG9zaXRpb24uY291bnQsby5wcmltaXRpdmVUeXBlKSxzPXQucmVnaW9uLnN0YXJ0O2lmKHMpZm9yKGxldCBpPTA7aTxuLmxlbmd0aDtpKyspbltpXSs9cztlLmNvbXBvbmVudHMucHVzaChuZXcgbSh7ZmFjZXM6bixtYXRlcmlhbDpyLmdldChvLm1hdGVyaWFsKSx0cnVzdFNvdXJjZU5vcm1hbHM6ITB9KSl9ZnVuY3Rpb24gbmUoZSx0KXtjb25zdHtwb3NpdGlvbjpyLG5vcm1hbDpzLHRhbmdlbnQ6aSxjb2xvcjphLHRleENvb3JkMDpsfT1lLnZlcnRleEF0dHJpYnV0ZXMsZj10LnJlZ2lvbi5zdGFydCx7YXR0cmlidXRlczptLHRyYW5zZm9ybTpwfT10LmdsdGYsZD1tLnBvc2l0aW9uLmNvdW50O2lmKEEoci5zbGljZShmLGQpLG0ucG9zaXRpb24scCksbihtLm5vcm1hbCkmJm4ocykpe2NvbnN0IGU9Yyh1KCkscCksdD1zLnNsaWNlKGYsZCk7TSh0LG0ubm9ybWFsLGUpLG8oZSkmJkModCx0KX1lbHNlIG4ocykmJnEocywwLDAsMSx7ZHN0SW5kZXg6Zixjb3VudDpkfSk7aWYobihtLnRhbmdlbnQpJiZuKGkpKXtjb25zdCBlPWModSgpLHApLHQ9aS5zbGljZShmLGQpO2sodCxtLnRhbmdlbnQsZSksbyhlKSYmQih0LHQpfWVsc2UgbihpKSYmSyhpLDAsMCwxLDEse2RzdEluZGV4OmYsY291bnQ6ZH0pO2lmKG4obS50ZXhDb29yZDApJiZuKGwpP0gobC5zbGljZShmLGQpLG0udGV4Q29vcmQwKTpuKGwpJiZKKGwsMCwwLHtkc3RJbmRleDpmLGNvdW50OmR9KSxuKG0uY29sb3IpJiZuKGEpKXtjb25zdCBlPW0uY29sb3IsdD1hLnNsaWNlKGYsZCk7aWYoND09PWUuZWxlbWVudENvdW50KWUgaW5zdGFuY2VvZiB4P0YodCxlLDI1NSk6ZSBpbnN0YW5jZW9mIFQ/USh0LGUpOmUgaW5zdGFuY2VvZiBoJiZJKHQsZSw4KTtlbHNle0sodCwyNTUsMjU1LDI1NSwyNTUpO2NvbnN0IHI9di5mcm9tVHlwZWRBcnJheSh0LnR5cGVkQnVmZmVyLHQudHlwZWRCdWZmZXJTdHJpZGUpO2UgaW5zdGFuY2VvZiB3P1IocixlLDI1NSk6ZSBpbnN0YW5jZW9mIHY/eihyLGUpOmUgaW5zdGFuY2VvZiBiJiZFKHIsZSw4KX19ZWxzZSBuKGEpJiZLKGEuc2xpY2UoZixkKSwyNTUsMjU1LDI1NSwyNTUpfWZ1bmN0aW9uIHNlKGUsdCl7c3dpdGNoKHQpe2Nhc2UgVS5UUklBTkdMRVM6cmV0dXJuIEQoZSxHKTtjYXNlIFUuVFJJQU5HTEVfU1RSSVA6cmV0dXJuIF8oZSk7Y2FzZSBVLlRSSUFOR0xFX0ZBTjpyZXR1cm4gTyhlKX19ZnVuY3Rpb24gaWUoZSl7c3dpdGNoKGUpe2Nhc2VcIk9QQVFVRVwiOnJldHVyblwib3BhcXVlXCI7Y2FzZVwiTUFTS1wiOnJldHVyblwibWFza1wiO2Nhc2VcIkJMRU5EXCI6cmV0dXJuXCJibGVuZFwifX1mdW5jdGlvbiBhZShlKXtyZXR1cm57aG9yaXpvbnRhbDpjZShlLnMpLHZlcnRpY2FsOmNlKGUudCl9fWZ1bmN0aW9uIGNlKGUpe3N3aXRjaChlKXtjYXNlIFYuQ0xBTVBfVE9fRURHRTpyZXR1cm5cImNsYW1wXCI7Y2FzZSBWLk1JUlJPUkVEX1JFUEVBVDpyZXR1cm5cIm1pcnJvclwiO2Nhc2UgVi5SRVBFQVQ6cmV0dXJuXCJyZXBlYXRcIn19ZnVuY3Rpb24gdWUoZSl7cmV0dXJuIGUqKigxL1ApKjI1NX1mdW5jdGlvbiBsZShlLHQpe3JldHVybiBmKHVlKGVbMF0pLHVlKGVbMV0pLHVlKGVbMl0pLHQpfWZ1bmN0aW9uIGZlKGUpe3JldHVybiBsKHVlKGVbMF0pLHVlKGVbMV0pLHVlKGVbMl0pKX1leHBvcnR7VyBhcyBsb2FkR0xURk1lc2h9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@arcgis/core/geometry/support/meshUtils/loadGLTFMesh.js\n");

/***/ }),

/***/ "./node_modules/@arcgis/core/views/3d/webgl-engine/lib/Indices.js":
/*!************************************************************************!*\
  !*** ./node_modules/@arcgis/core/views/3d/webgl-engine/lib/Indices.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"compactIndices\": () => (/* binding */ n),\n/* harmony export */   \"generateDefaultIndexArray\": () => (/* binding */ u),\n/* harmony export */   \"generateIndexArray\": () => (/* binding */ o),\n/* harmony export */   \"newIndexArray\": () => (/* binding */ t)\n/* harmony export */ });\n/*\nAll material copyright ESRI, All Rights Reserved, unless otherwise specified.\nSee https://js.arcgis.com/4.25/esri/copyright.txt for details.\n*/\nconst r=1024;function n(n){if(Array.isArray(n)){if(n.length<r)return n;for(const r of n)if(r>=65536)return new Uint32Array(n);return new Uint16Array(n)}if(n.BYTES_PER_ELEMENT===Uint16Array.BYTES_PER_ELEMENT)return n;for(const r of n)if(r>=65536)return n;return new Uint16Array(n)}function t(n){const t=3*n;return t<=r?new Array(t):t<=65536?new Uint16Array(t):new Uint32Array(t)}let e=(()=>{const r=new Uint32Array(131072);for(let n=0;n<r.length;++n)r[n]=n;return r})();const i=[0],f=(()=>{const r=new Uint16Array(65536);for(let n=0;n<r.length;++n)r[n]=n;return r})();function u(n){if(1===n)return i;if(n<r)return Array.from(new Uint16Array(f.buffer,0,n));if(n<f.length)return new Uint16Array(f.buffer,0,n);if(n>e.length){const r=Math.max(2*e.length,n);e=new Uint32Array(r);for(let n=0;n<e.length;n++)e[n]=n}return new Uint32Array(e.buffer,0,n)}function o(n){if(1===n)return i;if(n<r)return Array.from(new Uint16Array(f.buffer,0,n));if(n<f.length)return new Uint16Array(f.slice(0,n));if(n>e.length){const r=new Uint32Array(n);for(let n=0;n<r.length;n++)r[n]=n;return r}return new Uint32Array(e.slice(0,n))}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL3ZpZXdzLzNkL3dlYmdsLWVuZ2luZS9saWIvSW5kaWNlcy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL3ZpZXdzLzNkL3dlYmdsLWVuZ2luZS9saWIvSW5kaWNlcy5qcz80NDE0Il0sInNvdXJjZXNDb250ZW50IjpbIi8qXG5BbGwgbWF0ZXJpYWwgY29weXJpZ2h0IEVTUkksIEFsbCBSaWdodHMgUmVzZXJ2ZWQsIHVubGVzcyBvdGhlcndpc2Ugc3BlY2lmaWVkLlxuU2VlIGh0dHBzOi8vanMuYXJjZ2lzLmNvbS80LjI1L2VzcmkvY29weXJpZ2h0LnR4dCBmb3IgZGV0YWlscy5cbiovXG5jb25zdCByPTEwMjQ7ZnVuY3Rpb24gbihuKXtpZihBcnJheS5pc0FycmF5KG4pKXtpZihuLmxlbmd0aDxyKXJldHVybiBuO2Zvcihjb25zdCByIG9mIG4paWYocj49NjU1MzYpcmV0dXJuIG5ldyBVaW50MzJBcnJheShuKTtyZXR1cm4gbmV3IFVpbnQxNkFycmF5KG4pfWlmKG4uQllURVNfUEVSX0VMRU1FTlQ9PT1VaW50MTZBcnJheS5CWVRFU19QRVJfRUxFTUVOVClyZXR1cm4gbjtmb3IoY29uc3QgciBvZiBuKWlmKHI+PTY1NTM2KXJldHVybiBuO3JldHVybiBuZXcgVWludDE2QXJyYXkobil9ZnVuY3Rpb24gdChuKXtjb25zdCB0PTMqbjtyZXR1cm4gdDw9cj9uZXcgQXJyYXkodCk6dDw9NjU1MzY/bmV3IFVpbnQxNkFycmF5KHQpOm5ldyBVaW50MzJBcnJheSh0KX1sZXQgZT0oKCk9Pntjb25zdCByPW5ldyBVaW50MzJBcnJheSgxMzEwNzIpO2ZvcihsZXQgbj0wO248ci5sZW5ndGg7KytuKXJbbl09bjtyZXR1cm4gcn0pKCk7Y29uc3QgaT1bMF0sZj0oKCk9Pntjb25zdCByPW5ldyBVaW50MTZBcnJheSg2NTUzNik7Zm9yKGxldCBuPTA7bjxyLmxlbmd0aDsrK24pcltuXT1uO3JldHVybiByfSkoKTtmdW5jdGlvbiB1KG4pe2lmKDE9PT1uKXJldHVybiBpO2lmKG48cilyZXR1cm4gQXJyYXkuZnJvbShuZXcgVWludDE2QXJyYXkoZi5idWZmZXIsMCxuKSk7aWYobjxmLmxlbmd0aClyZXR1cm4gbmV3IFVpbnQxNkFycmF5KGYuYnVmZmVyLDAsbik7aWYobj5lLmxlbmd0aCl7Y29uc3Qgcj1NYXRoLm1heCgyKmUubGVuZ3RoLG4pO2U9bmV3IFVpbnQzMkFycmF5KHIpO2ZvcihsZXQgbj0wO248ZS5sZW5ndGg7bisrKWVbbl09bn1yZXR1cm4gbmV3IFVpbnQzMkFycmF5KGUuYnVmZmVyLDAsbil9ZnVuY3Rpb24gbyhuKXtpZigxPT09bilyZXR1cm4gaTtpZihuPHIpcmV0dXJuIEFycmF5LmZyb20obmV3IFVpbnQxNkFycmF5KGYuYnVmZmVyLDAsbikpO2lmKG48Zi5sZW5ndGgpcmV0dXJuIG5ldyBVaW50MTZBcnJheShmLnNsaWNlKDAsbikpO2lmKG4+ZS5sZW5ndGgpe2NvbnN0IHI9bmV3IFVpbnQzMkFycmF5KG4pO2ZvcihsZXQgbj0wO248ci5sZW5ndGg7bisrKXJbbl09bjtyZXR1cm4gcn1yZXR1cm4gbmV3IFVpbnQzMkFycmF5KGUuc2xpY2UoMCxuKSl9ZXhwb3J0e24gYXMgY29tcGFjdEluZGljZXMsdSBhcyBnZW5lcmF0ZURlZmF1bHRJbmRleEFycmF5LG8gYXMgZ2VuZXJhdGVJbmRleEFycmF5LHQgYXMgbmV3SW5kZXhBcnJheX07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@arcgis/core/views/3d/webgl-engine/lib/Indices.js\n");

/***/ })

}]);