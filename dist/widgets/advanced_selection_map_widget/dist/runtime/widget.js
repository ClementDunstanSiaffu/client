/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
System.register(["jimu-core","jimu-arcgis","esri/widgets/Sketch/SketchViewModel","esri/layers/GraphicsLayer"], function(__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {
	var __WEBPACK_EXTERNAL_MODULE_jimu_core__ = {};
	var __WEBPACK_EXTERNAL_MODULE_jimu_arcgis__ = {};
	var __WEBPACK_EXTERNAL_MODULE_esri_widgets_Sketch_SketchViewModel__ = {};
	var __WEBPACK_EXTERNAL_MODULE_esri_layers_GraphicsLayer__ = {};
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_core__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_arcgis__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_esri_widgets_Sketch_SketchViewModel__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_esri_layers_GraphicsLayer__, "__esModule", { value: true });
	return {
		setters: [
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_core__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_arcgis__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_esri_widgets_Sketch_SketchViewModel__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_esri_layers_GraphicsLayer__[key] = module[key];
				});
			}
		],
		execute: function() {
			__WEBPACK_DYNAMIC_EXPORT__(
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./jimu-core/lib/set-public-path.ts":
/*!******************************************!*\
  !*** ./jimu-core/lib/set-public-path.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\n * Webpack will replace __webpack_public_path__ with __webpack_require__.p to set the public path dynamically.\n * The reason why we can't set the publicPath in webpack config is: we change the publicPath when download.\n * */\n// eslint-disable-next-line\n// @ts-ignore\n__webpack_require__.p = window.jimuConfig.baseUrl;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qaW11LWNvcmUvbGliL3NldC1wdWJsaWMtcGF0aC50cy5qcyIsIm1hcHBpbmdzIjoiQUFBQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vamltdS1jb3JlL2xpYi9zZXQtcHVibGljLXBhdGgudHM/OGQyYyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogV2VicGFjayB3aWxsIHJlcGxhY2UgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gd2l0aCBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgdG8gc2V0IHRoZSBwdWJsaWMgcGF0aCBkeW5hbWljYWxseS5cclxuICogVGhlIHJlYXNvbiB3aHkgd2UgY2FuJ3Qgc2V0IHRoZSBwdWJsaWNQYXRoIGluIHdlYnBhY2sgY29uZmlnIGlzOiB3ZSBjaGFuZ2UgdGhlIHB1YmxpY1BhdGggd2hlbiBkb3dubG9hZC5cclxuICogKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbi8vIEB0cy1pZ25vcmVcclxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSB3aW5kb3cuamltdUNvbmZpZy5iYXNlVXJsXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./jimu-core/lib/set-public-path.ts\n");

/***/ }),

/***/ "./your-extensions/widgets/advanced_selection_map_widget/src/helper/helper.ts":
/*!************************************************************************************!*\
  !*** ./your-extensions/widgets/advanced_selection_map_widget/src/helper/helper.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Helper {\n    constructor() {\n        this.getSelectedContentsLayer = (results, checkedLayers) => {\n            let selectedLayersArray = [];\n            if ((results === null || results === void 0 ? void 0 : results.length) > 0) {\n                selectedLayersArray = results.reduce((newArray, items) => {\n                    var _a, _b, _c, _d;\n                    if ((items === null || items === void 0 ? void 0 : items.length) > 0) {\n                        let selectedLayerContents = {};\n                        let currentLayerId = (_b = (_a = items[0]) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.id;\n                        if (checkedLayers.indexOf(currentLayerId) !== -1) {\n                            selectedLayerContents[\"id\"] = (_d = (_c = items[0]) === null || _c === void 0 ? void 0 : _c.layer) === null || _d === void 0 ? void 0 : _d.id;\n                            selectedLayerContents[\"attributes\"] = this.getAttributes(items);\n                            newArray.push(selectedLayerContents);\n                        }\n                    }\n                    return newArray;\n                }, []);\n            }\n            return selectedLayersArray;\n        };\n        this.getAttributes = (items) => {\n            const attributesArray = items.reduce((newArray, item) => {\n                if (item === null || item === void 0 ? void 0 : item.attributes) {\n                    newArray.push(item.attributes);\n                }\n                return newArray;\n            }, []);\n            return attributesArray;\n        };\n        this.getNumberOfAttributes = (layersContents) => {\n            var _a, _b, _c, _d;\n            let layerContentsObject = {};\n            for (let i = 0; i < layersContents.length; i++) {\n                layerContentsObject = Object.assign(Object.assign({}, layerContentsObject), { [(_a = layersContents[i]) === null || _a === void 0 ? void 0 : _a.id]: (_d = (_c = (_b = layersContents[i]) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0 });\n            }\n            return layerContentsObject;\n        };\n        this.makeLayeInvisible = (clickedLayer, results) => {\n            var _a, _b, _c;\n            let index = -1;\n            if (results.length > 0) {\n                for (let i = 0; i < results.length; i++) {\n                    let items = results[i];\n                    if (items.length > 0) {\n                        for (let j = 0; j < items.length; j++) {\n                            let layerId = (_b = (_a = items[0]) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.id;\n                            index = clickedLayer.indexOf(layerId);\n                            if (index == -1) {\n                                if ((_c = items[j]) === null || _c === void 0 ? void 0 : _c.hasOwnProperty(\"visible\")) {\n                                    items[j].visible = false;\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n        };\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Helper());\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9hZHZhbmNlZF9zZWxlY3Rpb25fbWFwX3dpZGdldC9zcmMvaGVscGVyL2hlbHBlci50cy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBS0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUFBO0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvYWR2YW5jZWRfc2VsZWN0aW9uX21hcF93aWRnZXQvc3JjL2hlbHBlci9oZWxwZXIudHM/YzA3OSJdLCJzb3VyY2VzQ29udGVudCI6WyJ0eXBlIHNlbGVjdGVkTGF5ZXJUeXBlID0ge1xuICAgIGlkOnN0cmluZyxcbiAgICBhdHRyaWJ1dGVzOmFueVtdXG59XG5cbmNsYXNzIEhlbHBlciB7XG5cbiAgICBnZXRTZWxlY3RlZENvbnRlbnRzTGF5ZXIgPShyZXN1bHRzOmFueSxjaGVja2VkTGF5ZXJzOnN0cmluZ1tdKTpzZWxlY3RlZExheWVyVHlwZVtdPT57XG4gICAgICAgIGxldCBzZWxlY3RlZExheWVyc0FycmF5ID0gW107XG4gICAgICAgIGlmIChyZXN1bHRzPy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHNlbGVjdGVkTGF5ZXJzQXJyYXkgPSByZXN1bHRzLnJlZHVjZSgobmV3QXJyYXksaXRlbXM6YW55W10pPT57XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zPy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkTGF5ZXJDb250ZW50cyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudExheWVySWQgPSBpdGVtc1swXT8ubGF5ZXI/LmlkO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tlZExheWVycy5pbmRleE9mKGN1cnJlbnRMYXllcklkKSAhPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRMYXllckNvbnRlbnRzW1wiaWRcIl0gPSBpdGVtc1swXT8ubGF5ZXI/LmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRMYXllckNvbnRlbnRzW1wiYXR0cmlidXRlc1wiXSA9IHRoaXMuZ2V0QXR0cmlidXRlcyhpdGVtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdBcnJheS5wdXNoKHNlbGVjdGVkTGF5ZXJDb250ZW50cylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3QXJyYXk7XG4gICAgICAgICAgICB9LFtdKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxlY3RlZExheWVyc0FycmF5O1xuICAgIH1cblxuICAgIGdldEF0dHJpYnV0ZXMgPSAoaXRlbXM6YW55W10pOmFueVtdPT57XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXNBcnJheSA9IGl0ZW1zLnJlZHVjZSgobmV3QXJyYXksaXRlbSk9PntcbiAgICAgICAgICAgIGlmIChpdGVtPy5hdHRyaWJ1dGVzKXtcbiAgICAgICAgICAgICAgICBuZXdBcnJheS5wdXNoKGl0ZW0uYXR0cmlidXRlcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXdBcnJheTtcbiAgICAgICAgfSxbXSlcbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXNBcnJheTtcbiAgICB9XG5cbiAgICBnZXROdW1iZXJPZkF0dHJpYnV0ZXMgPSAobGF5ZXJzQ29udGVudHM6e2lkOnN0cmluZyxhdHRyaWJ1dGVzOmFueVtdfVtdKT0+e1xuICAgICAgICBsZXQgbGF5ZXJDb250ZW50c09iamVjdCA9IHt9O1xuICAgICAgICAgZm9yIChsZXQgaT0wO2kgPCBsYXllcnNDb250ZW50cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICBsYXllckNvbnRlbnRzT2JqZWN0ID0gey4uLmxheWVyQ29udGVudHNPYmplY3QsW2xheWVyc0NvbnRlbnRzW2ldPy5pZF06bGF5ZXJzQ29udGVudHNbaV0/LmF0dHJpYnV0ZXM/Lmxlbmd0aD8/MH1cbiAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxheWVyQ29udGVudHNPYmplY3Q7XG4gICAgIH1cblxuICAgIG1ha2VMYXllSW52aXNpYmxlID0gKGNsaWNrZWRMYXllcjpzdHJpbmdbXSxyZXN1bHRzOmFueVtdKT0+e1xuICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7aSA8IHJlc3VsdHMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zID0gcmVzdWx0c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwO2ogPCBpdGVtcy5sZW5ndGg7aisrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYXllcklkID0gaXRlbXNbMF0/LmxheWVyPy5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gY2xpY2tlZExheWVyLmluZGV4T2YobGF5ZXJJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1tqXT8uaGFzT3duUHJvcGVydHkoXCJ2aXNpYmxlXCIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNbal0udmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBIZWxwZXIoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./your-extensions/widgets/advanced_selection_map_widget/src/helper/helper.ts\n");

/***/ }),

/***/ "./your-extensions/widgets/advanced_selection_map_widget/src/runtime/widget.tsx":
/*!**************************************************************************************!*\
  !*** ./your-extensions/widgets/advanced_selection_map_widget/src/runtime/widget.tsx ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MapViewWidget)\n/* harmony export */ });\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ \"jimu-core\");\n/* harmony import */ var jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jimu-arcgis */ \"jimu-arcgis\");\n/* harmony import */ var esri_widgets_Sketch_SketchViewModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! esri/widgets/Sketch/SketchViewModel */ \"esri/widgets/Sketch/SketchViewModel\");\n/* harmony import */ var esri_layers_GraphicsLayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! esri/layers/GraphicsLayer */ \"esri/layers/GraphicsLayer\");\n/* harmony import */ var _helper_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helper/helper */ \"./your-extensions/widgets/advanced_selection_map_widget/src/helper/helper.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\nlet sketchLayer = new esri_layers_GraphicsLayer__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\nlet zoomOut = {\n    title: \"Zoom Out\",\n    id: \"zoom-out\",\n    class: \"esri-icon-zoom-out-magnifying-glass\"\n};\nclass MapViewWidget extends jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.PureComponent {\n    constructor() {\n        super(...arguments);\n        this.state = { layers: [], activeView: null, geometry: null };\n        this.sketch = null;\n        this.mapLayer = null;\n        this.layer = null;\n        this.getMapLayers = (activeView) => {\n            var _a;\n            const newLayersArray = (_a = Object.keys(activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews)) === null || _a === void 0 ? void 0 : _a.reduce((newLayerArray, item) => {\n                var _a, _b, _c, _d, _e, _f, _g;\n                let object = {\n                    layerName: (_c = (_b = (_a = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : item,\n                    layerId: (_e = (_d = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _d === void 0 ? void 0 : _d.jimuLayerId) !== null && _e !== void 0 ? _e : \" \",\n                    keyName: item,\n                    id: (_g = (_f = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _f === void 0 ? void 0 : _f.layer) === null || _g === void 0 ? void 0 : _g.id\n                };\n                newLayerArray.push(object);\n                return newLayerArray;\n            }, []);\n            newLayersArray.reverse();\n            this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"layers\", newLayersArray));\n            this.setState({ activeView: activeView });\n            let view = activeView === null || activeView === void 0 ? void 0 : activeView.view;\n            const sketchViewlModel = new esri_widgets_Sketch_SketchViewModel__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({ layer: sketchLayer, view: view });\n            this.sketch = sketchViewlModel;\n            view === null || view === void 0 ? void 0 : view.popup.actions.push(zoomOut);\n            view === null || view === void 0 ? void 0 : view.popup.watch(\"visible\", (visible) => {\n                var _a, _b, _c;\n                if (visible && !((_c = (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.stateValue) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.popup)) {\n                    view.popup.visible = false;\n                }\n                else {\n                    this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"popup\", false));\n                }\n            });\n        };\n        this.selectFeatureLayer = (geometry) => {\n            var _a, _b, _c, _d;\n            const checkedLayers = (_c = (_b = (_a = this.props.stateValue) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.checkedLayers) !== null && _c !== void 0 ? _c : [];\n            if (this.state.activeView) {\n                (_d = this.state.activeView) === null || _d === void 0 ? void 0 : _d.selectFeaturesByGraphic(geometry, \"contains\").then((results) => {\n                    const selectedLayersContents = _helper_helper__WEBPACK_IMPORTED_MODULE_4__[\"default\"].getSelectedContentsLayer(results, checkedLayers);\n                    this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"layerContents\", selectedLayersContents));\n                    const numberOfAttributes = _helper_helper__WEBPACK_IMPORTED_MODULE_4__[\"default\"].getNumberOfAttributes(selectedLayersContents);\n                    this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"numberOfAttribute\", numberOfAttributes));\n                }).catch((err) => { });\n            }\n        };\n        this.startSketching = () => {\n            var _a;\n            if (this.sketch) {\n                this.sketch.create((_a = this.props.stateValue[\"value\"]) === null || _a === void 0 ? void 0 : _a.geometryType);\n                if (this.state.activeView) {\n                    this.state.activeView.view.map.add(sketchLayer);\n                    this.sketch.on(\"create\", (event) => __awaiter(this, void 0, void 0, function* () {\n                        var _b;\n                        if ((event === null || event === void 0 ? void 0 : event.state) === \"complete\") {\n                            this.selectFeatureLayer(event === null || event === void 0 ? void 0 : event.graphic);\n                            this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"sketch\", false));\n                            this.setState({ geometry: (_b = event === null || event === void 0 ? void 0 : event.graphic) === null || _b === void 0 ? void 0 : _b.geometry });\n                        }\n                    }));\n                    this.sketch.on(\"update\", (event) => {\n                        var _a;\n                        (_a = this.sketch) === null || _a === void 0 ? void 0 : _a.delete();\n                        this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"layerContents\", []));\n                    });\n                }\n            }\n        };\n        this.openPopup = () => {\n            var _a, _b;\n            const popcontents = this.props.stateValue.value.popupContents;\n            if ((_b = (_a = this.state.activeView) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.popup) {\n                const popup = this.state.activeView.view.popup;\n                popup.visible = true;\n                popup.title = popcontents === null || popcontents === void 0 ? void 0 : popcontents.title;\n                popup.content = popcontents === null || popcontents === void 0 ? void 0 : popcontents.contents;\n                try {\n                    popup.open();\n                }\n                catch (err) {\n                }\n                popup === null || popup === void 0 ? void 0 : popup.on(\"trigger-action\", (event) => {\n                    if (event.action.id === \"zoom-out\") {\n                        this.zoomOut();\n                    }\n                });\n            }\n        };\n        this.onClickZoomIn = () => {\n            var _a, _b;\n            const view = (_a = this.state.activeView) === null || _a === void 0 ? void 0 : _a.view;\n            const extent = (_b = this.state.geometry) === null || _b === void 0 ? void 0 : _b.extent;\n            if (view && extent) {\n                view.goTo(extent);\n            }\n        };\n    }\n    static mapExtraStateProps(state) {\n        return { stateValue: state.widgetsState };\n    }\n    zoomOut() {\n        var _a;\n        const view = (_a = this.state.activeView) === null || _a === void 0 ? void 0 : _a.view;\n        view === null || view === void 0 ? void 0 : view.goTo({ center: view === null || view === void 0 ? void 0 : view.center, zoom: (view === null || view === void 0 ? void 0 : view.zoom) - 2 });\n    }\n    componentDidUpdate(prevProps, prevState, snapshot) {\n        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;\n        if (((_c = (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.stateValue) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.sketch) && ((_e = (_d = this.props.stateValue) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.geometryType)) {\n            this.startSketching();\n        }\n        if (((_h = (_g = (_f = this.props) === null || _f === void 0 ? void 0 : _f.stateValue) === null || _g === void 0 ? void 0 : _g.value) === null || _h === void 0 ? void 0 : _h.popup) && ((_k = (_j = this.props.stateValue) === null || _j === void 0 ? void 0 : _j.value) === null || _k === void 0 ? void 0 : _k.popupContents)) {\n            this.openPopup();\n        }\n        if ((_m = (_l = this.props.stateValue) === null || _l === void 0 ? void 0 : _l.value) === null || _m === void 0 ? void 0 : _m.zoomIn) {\n            this.onClickZoomIn();\n        }\n    }\n    render() {\n        var _a, _b;\n        return (jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"div\", { className: \"widget-starter jimu-widget\" }, ((_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.useMapWidgetIds) === null || _b === void 0 ? void 0 : _b.length) > 0 &&\n            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__.JimuMapViewComponent, { useMapWidgetId: this.props.useMapWidgetIds[0], onActiveViewChange: this.getMapLayers })));\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9hZHZhbmNlZF9zZWxlY3Rpb25fbWFwX3dpZGdldC9zcmMvcnVudGltZS93aWRnZXQudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFZQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBOztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTJCQTtBQWpJQTtBQUNBO0FBQ0E7QUFvRUE7O0FBQ0E7QUFDQTtBQUNBO0FBK0JBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFJQTtBQU9BO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvYWR2YW5jZWRfc2VsZWN0aW9uX21hcF93aWRnZXQvc3JjL3J1bnRpbWUvd2lkZ2V0LnRzeD9lOTM3Il0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtSZWFjdCxqc3gsQWxsV2lkZ2V0UHJvcHMsYXBwQWN0aW9ucyxJTVN0YXRlfSBmcm9tICdqaW11LWNvcmUnXG5pbXBvcnQgeyBKaW11TWFwVmlld0NvbXBvbmVudCxKaW11TWFwVmlldyxKaW11RmVhdHVyZUxheWVyVmlld30gZnJvbSAnamltdS1hcmNnaXMnO1xuaW1wb3J0IFNrZXRjaFZpZXdNb2RlbCBmcm9tIFwiZXNyaS93aWRnZXRzL1NrZXRjaC9Ta2V0Y2hWaWV3TW9kZWxcIjtcbmltcG9ydCBHcmFwaGljc0xheWVyIGZyb20gJ2VzcmkvbGF5ZXJzL0dyYXBoaWNzTGF5ZXInO1xuaW1wb3J0IGdlb21ldHJ5RW5naW5lQXN5bmMgZnJvbSAnZXNyaS9nZW9tZXRyeS9nZW9tZXRyeUVuZ2luZUFzeW5jJ1xuaW1wb3J0IGhlbHBlciBmcm9tICcuLi9oZWxwZXIvaGVscGVyJ1xuXG50eXBlIHN0YXRlVmFsdWVUeXBlID0ge1xuICAgIHN0YXRlVmFsdWU6YW55XG59XG5cbnR5cGUgU3RhdGVUeXBlID0ge1xuICAgIGxheWVyczphbnksXG4gICAgYWN0aXZlVmlldzpKaW11TWFwVmlldyxcbiAgICBnZW9tZXRyeTphbnlcbn1cblxubGV0ICBza2V0Y2hMYXllciA9IG5ldyBHcmFwaGljc0xheWVyKClcblxubGV0IHpvb21PdXQgPSB7XG4gICAgdGl0bGU6XCJab29tIE91dFwiLFxuICAgIGlkOlwiem9vbS1vdXRcIixcbiAgICBjbGFzczpcImVzcmktaWNvbi16b29tLW91dC1tYWduaWZ5aW5nLWdsYXNzXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwVmlld1dpZGdldCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQ8QWxsV2lkZ2V0UHJvcHM8YW55PiZzdGF0ZVZhbHVlVHlwZSxTdGF0ZVR5cGU+e1xuXG4gICAgc3RhdGljIG1hcEV4dHJhU3RhdGVQcm9wcyhzdGF0ZTpJTVN0YXRlKXtcbiAgICAgICAgcmV0dXJuIHtzdGF0ZVZhbHVlOnN0YXRlLndpZGdldHNTdGF0ZX07XG4gICAgfVxuXG4gICAgc3RhdGUgPSB7bGF5ZXJzOltdLGFjdGl2ZVZpZXc6bnVsbCxnZW9tZXRyeTpudWxsfTtcbiAgICBza2V0Y2ggPSBudWxsO1xuICAgIG1hcExheWVyID0gbnVsbDtcbiAgICBsYXllciA9IG51bGw7XG5cbiAgICBnZXRNYXBMYXllcnMgPSAoYWN0aXZlVmlldzpKaW11TWFwVmlldyk9PntcbiAgICAgICAgY29uc3QgbmV3TGF5ZXJzQXJyYXkgPSBPYmplY3Qua2V5cyhhY3RpdmVWaWV3Py5qaW11TGF5ZXJWaWV3cyk/LnJlZHVjZSgobmV3TGF5ZXJBcnJheSxpdGVtKT0+e1xuICAgICAgICAgICAgbGV0IG9iamVjdCA9IHtcbiAgICAgICAgICAgICAgICBsYXllck5hbWU6YWN0aXZlVmlldz8uamltdUxheWVyVmlld3NbaXRlbV0/LmxheWVyPy50aXRsZT8/aXRlbSxcbiAgICAgICAgICAgICAgICBsYXllcklkOmFjdGl2ZVZpZXc/LmppbXVMYXllclZpZXdzW2l0ZW1dPy5qaW11TGF5ZXJJZD8/XCIgXCIsXG4gICAgICAgICAgICAgICAga2V5TmFtZTppdGVtLFxuICAgICAgICAgICAgICAgIGlkOmFjdGl2ZVZpZXc/LmppbXVMYXllclZpZXdzW2l0ZW1dPy5sYXllcj8uaWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBuZXdMYXllckFycmF5LnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdMYXllckFycmF5O1xuICAgICAgICB9LFtdKVxuICAgICAgICBuZXdMYXllcnNBcnJheS5yZXZlcnNlKClcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChhcHBBY3Rpb25zLndpZGdldFN0YXRlUHJvcENoYW5nZShcInZhbHVlXCIsXCJsYXllcnNcIixuZXdMYXllcnNBcnJheSkpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVWaWV3OmFjdGl2ZVZpZXd9KTtcbiAgICAgICAgbGV0IHZpZXcgPSBhY3RpdmVWaWV3Py52aWV3O1xuICAgICAgICBjb25zdCBza2V0Y2hWaWV3bE1vZGVsID0gbmV3IFNrZXRjaFZpZXdNb2RlbCh7bGF5ZXI6c2tldGNoTGF5ZXIsdmlldzp2aWV3fSlcbiAgICAgICAgdGhpcy5za2V0Y2ggPSBza2V0Y2hWaWV3bE1vZGVsO1xuICAgICAgICB2aWV3Py5wb3B1cC5hY3Rpb25zLnB1c2goem9vbU91dCk7XG4gICAgICAgIHZpZXc/LnBvcHVwLndhdGNoKFwidmlzaWJsZVwiLCh2aXNpYmxlKT0+e1xuICAgICAgICAgICAgaWYodmlzaWJsZSAmJiAhdGhpcy5wcm9wcz8uc3RhdGVWYWx1ZT8udmFsdWU/LnBvcHVwKXtcbiAgICAgICAgICAgICAgICB2aWV3LnBvcHVwLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goYXBwQWN0aW9ucy53aWRnZXRTdGF0ZVByb3BDaGFuZ2UoXCJ2YWx1ZVwiLFwicG9wdXBcIixmYWxzZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNlbGVjdEZlYXR1cmVMYXllciA9IChnZW9tZXRyeTphbnkpPT57XG4gICAgICAgIGNvbnN0IGNoZWNrZWRMYXllcnMgPSB0aGlzLnByb3BzLnN0YXRlVmFsdWU/LnZhbHVlPy5jaGVja2VkTGF5ZXJzPz9bXTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlVmlldyl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmFjdGl2ZVZpZXc/LnNlbGVjdEZlYXR1cmVzQnlHcmFwaGljKGdlb21ldHJ5LFwiY29udGFpbnNcIikudGhlbigocmVzdWx0cyk9PntcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZExheWVyc0NvbnRlbnRzID0gaGVscGVyLmdldFNlbGVjdGVkQ29udGVudHNMYXllcihyZXN1bHRzLGNoZWNrZWRMYXllcnMpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goYXBwQWN0aW9ucy53aWRnZXRTdGF0ZVByb3BDaGFuZ2UoXCJ2YWx1ZVwiLFwibGF5ZXJDb250ZW50c1wiLHNlbGVjdGVkTGF5ZXJzQ29udGVudHMpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBudW1iZXJPZkF0dHJpYnV0ZXMgPSBoZWxwZXIuZ2V0TnVtYmVyT2ZBdHRyaWJ1dGVzKHNlbGVjdGVkTGF5ZXJzQ29udGVudHMpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goYXBwQWN0aW9ucy53aWRnZXRTdGF0ZVByb3BDaGFuZ2UoXCJ2YWx1ZVwiLFwibnVtYmVyT2ZBdHRyaWJ1dGVcIixudW1iZXJPZkF0dHJpYnV0ZXMpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycik9Pnt9KVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydFNrZXRjaGluZyA9ICgpPT57XG4gICAgICAgIGlmICh0aGlzLnNrZXRjaCl7XG4gICAgICAgICAgICB0aGlzLnNrZXRjaC5jcmVhdGUodGhpcy5wcm9wcy5zdGF0ZVZhbHVlW1widmFsdWVcIl0/Lmdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVWaWV3KXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmFjdGl2ZVZpZXcudmlldy5tYXAuYWRkKHNrZXRjaExheWVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNrZXRjaC5vbihcImNyZWF0ZVwiLCBhc3luYyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQ/LnN0YXRlID09PSBcImNvbXBsZXRlXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RGZWF0dXJlTGF5ZXIoZXZlbnQ/LmdyYXBoaWMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChhcHBBY3Rpb25zLndpZGdldFN0YXRlUHJvcENoYW5nZShcInZhbHVlXCIsXCJza2V0Y2hcIixmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z2VvbWV0cnk6ZXZlbnQ/LmdyYXBoaWM/Lmdlb21ldHJ5fSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNrZXRjaC5vbihcInVwZGF0ZVwiLChldmVudCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2V0Y2g/LmRlbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGFwcEFjdGlvbnMud2lkZ2V0U3RhdGVQcm9wQ2hhbmdlKFwidmFsdWVcIixcImxheWVyQ29udGVudHNcIixbXSkpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB6b29tT3V0KCkge1xuICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5zdGF0ZS5hY3RpdmVWaWV3Py52aWV3O1xuICAgICAgICB2aWV3Py5nb1RvKHtjZW50ZXI6IHZpZXc/LmNlbnRlcix6b29tOiB2aWV3Py56b29tIC0gMn0pO1xuICAgICAgfVxuXG4gICAgb3BlblBvcHVwID0gKCk9PntcbiAgICAgICAgY29uc3QgcG9wY29udGVudHMgPSAgdGhpcy5wcm9wcy5zdGF0ZVZhbHVlLnZhbHVlLnBvcHVwQ29udGVudHM7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZVZpZXc/LnZpZXc/LnBvcHVwKXtcbiAgICAgICAgICAgIGNvbnN0IHBvcHVwID0gdGhpcy5zdGF0ZS5hY3RpdmVWaWV3LnZpZXcucG9wdXA7XG4gICAgICAgICAgICBwb3B1cC52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHBvcHVwLnRpdGxlID0gcG9wY29udGVudHM/LnRpdGxlO1xuICAgICAgICAgICAgcG9wdXAuY29udGVudCA9IHBvcGNvbnRlbnRzPy5jb250ZW50cztcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBwb3B1cC5vcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaChlcnIpe1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3B1cD8ub24oXCJ0cmlnZ2VyLWFjdGlvblwiLChldmVudCk9PntcbiAgICAgICAgICAgICAgICBpZihldmVudC5hY3Rpb24uaWQgPT09IFwiem9vbS1vdXRcIil7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuem9vbU91dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsaWNrWm9vbUluID0gKCk9PntcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuc3RhdGUuYWN0aXZlVmlldz8udmlldztcbiAgICAgICAgY29uc3QgZXh0ZW50ID0gdGhpcy5zdGF0ZS5nZW9tZXRyeT8uZXh0ZW50O1xuICAgICAgICBpZiAodmlldyAmJiBleHRlbnQpe1xuICAgICAgICAgICAgdmlldy5nb1RvKGV4dGVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzOiBSZWFkb25seTxBbGxXaWRnZXRQcm9wczxhbnk+PiwgcHJldlN0YXRlOiBSZWFkb25seTxhbnk+LCBzbmFwc2hvdD86IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wcm9wcz8uc3RhdGVWYWx1ZT8udmFsdWU/LnNrZXRjaCAmJiB0aGlzLnByb3BzLnN0YXRlVmFsdWU/LnZhbHVlPy5nZW9tZXRyeVR5cGUpe1xuICAgICAgICAgICAgdGhpcy5zdGFydFNrZXRjaGluZygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzPy5zdGF0ZVZhbHVlPy52YWx1ZT8ucG9wdXAgJiYgdGhpcy5wcm9wcy5zdGF0ZVZhbHVlPy52YWx1ZT8ucG9wdXBDb250ZW50cyl7XG4gICAgICAgICAgICB0aGlzLm9wZW5Qb3B1cCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnN0YXRlVmFsdWU/LnZhbHVlPy56b29tSW4pe1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrWm9vbUluKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKTogUmVhY3QuUmVhY3ROb2RlIHtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtc3RhcnRlciBqaW11LXdpZGdldFwiPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcz8udXNlTWFwV2lkZ2V0SWRzPy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgIDxKaW11TWFwVmlld0NvbXBvbmVudCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZU1hcFdpZGdldElkPXt0aGlzLnByb3BzLnVzZU1hcFdpZGdldElkc1swXX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQWN0aXZlVmlld0NoYW5nZSA9IHt0aGlzLmdldE1hcExheWVyc31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./your-extensions/widgets/advanced_selection_map_widget/src/runtime/widget.tsx\n");

/***/ }),

/***/ "esri/layers/GraphicsLayer":
/*!********************************************!*\
  !*** external "esri/layers/GraphicsLayer" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_esri_layers_GraphicsLayer__;

/***/ }),

/***/ "esri/widgets/Sketch/SketchViewModel":
/*!******************************************************!*\
  !*** external "esri/widgets/Sketch/SketchViewModel" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_esri_widgets_Sketch_SketchViewModel__;

/***/ }),

/***/ "jimu-arcgis":
/*!******************************!*\
  !*** external "jimu-arcgis" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_arcgis__;

/***/ }),

/***/ "jimu-core":
/*!****************************!*\
  !*** external "jimu-core" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_core__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_require__("./jimu-core/lib/set-public-path.ts");
/******/ 	var __webpack_exports__ = __webpack_require__("./your-extensions/widgets/advanced_selection_map_widget/src/runtime/widget.tsx");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});