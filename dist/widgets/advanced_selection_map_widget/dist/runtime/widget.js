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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Helper {\n    constructor() {\n        this.getSelectedContentsLayer = (results, checkedLayers) => {\n            let selectedLayersArray = [];\n            if ((results === null || results === void 0 ? void 0 : results.length) > 0) {\n                selectedLayersArray = results.reduce((newArray, items) => {\n                    var _a, _b, _c, _d;\n                    if ((items === null || items === void 0 ? void 0 : items.length) > 0) {\n                        let selectedLayerContents = {};\n                        let currentLayerId = (_b = (_a = items[0]) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.id;\n                        if (checkedLayers.indexOf(currentLayerId) !== -1) {\n                            selectedLayerContents[\"id\"] = (_d = (_c = items[0]) === null || _c === void 0 ? void 0 : _c.layer) === null || _d === void 0 ? void 0 : _d.id;\n                            selectedLayerContents[\"attributes\"] = this.getAttributes(items);\n                            newArray.push(selectedLayerContents);\n                        }\n                    }\n                    return newArray;\n                }, []);\n            }\n            return selectedLayersArray;\n        };\n        this.getAttributes = (items) => {\n            const attributesArray = items.reduce((newArray, item) => {\n                if (item === null || item === void 0 ? void 0 : item.attributes) {\n                    newArray.push(item.attributes);\n                }\n                return newArray;\n            }, []);\n            return attributesArray;\n        };\n        this.getNumberOfAttributes = (layersContents) => {\n            var _a, _b, _c, _d;\n            let layerContentsObject = {};\n            for (let i = 0; i < layersContents.length; i++) {\n                layerContentsObject = Object.assign(Object.assign({}, layerContentsObject), { [(_a = layersContents[i]) === null || _a === void 0 ? void 0 : _a.id]: (_d = (_c = (_b = layersContents[i]) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0 });\n            }\n            return layerContentsObject;\n        };\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Helper());\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9hZHZhbmNlZF9zZWxlY3Rpb25fbWFwX3dpZGdldC9zcmMvaGVscGVyL2hlbHBlci50cy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBTUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUFBO0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvYWR2YW5jZWRfc2VsZWN0aW9uX21hcF93aWRnZXQvc3JjL2hlbHBlci9oZWxwZXIudHM/YzA3OSJdLCJzb3VyY2VzQ29udGVudCI6WyJcbnR5cGUgc2VsZWN0ZWRMYXllclR5cGUgPSB7XG4gICAgaWQ6c3RyaW5nLFxuICAgIGF0dHJpYnV0ZXM6YW55W11cbn1cblxuY2xhc3MgSGVscGVyIHtcblxuICAgIGdldFNlbGVjdGVkQ29udGVudHNMYXllciA9KHJlc3VsdHM6YW55LGNoZWNrZWRMYXllcnM6c3RyaW5nW10pOnNlbGVjdGVkTGF5ZXJUeXBlW109PntcbiAgICAgICAgbGV0IHNlbGVjdGVkTGF5ZXJzQXJyYXkgPSBbXTtcbiAgICAgICAgaWYgKHJlc3VsdHM/Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgc2VsZWN0ZWRMYXllcnNBcnJheSA9IHJlc3VsdHMucmVkdWNlKChuZXdBcnJheSxpdGVtczphbnlbXSk9PntcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXM/Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRMYXllckNvbnRlbnRzID0ge307XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50TGF5ZXJJZCA9IGl0ZW1zWzBdPy5sYXllcj8uaWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGVja2VkTGF5ZXJzLmluZGV4T2YoY3VycmVudExheWVySWQpICE9PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZExheWVyQ29udGVudHNbXCJpZFwiXSA9IGl0ZW1zWzBdPy5sYXllcj8uaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZExheWVyQ29udGVudHNbXCJhdHRyaWJ1dGVzXCJdID0gdGhpcy5nZXRBdHRyaWJ1dGVzKGl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0FycmF5LnB1c2goc2VsZWN0ZWRMYXllckNvbnRlbnRzKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdBcnJheTtcbiAgICAgICAgICAgIH0sW10pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkTGF5ZXJzQXJyYXk7XG4gICAgfVxuXG4gICAgZ2V0QXR0cmlidXRlcyA9IChpdGVtczphbnlbXSk6YW55W109PntcbiAgICAgICAgY29uc3QgYXR0cmlidXRlc0FycmF5ID0gaXRlbXMucmVkdWNlKChuZXdBcnJheSxpdGVtKT0+e1xuICAgICAgICAgICAgaWYgKGl0ZW0/LmF0dHJpYnV0ZXMpe1xuICAgICAgICAgICAgICAgIG5ld0FycmF5LnB1c2goaXRlbS5hdHRyaWJ1dGVzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ld0FycmF5O1xuICAgICAgICB9LFtdKVxuICAgICAgICByZXR1cm4gYXR0cmlidXRlc0FycmF5O1xuICAgIH1cblxuICAgIGdldE51bWJlck9mQXR0cmlidXRlcyA9IChsYXllcnNDb250ZW50czp7aWQ6c3RyaW5nLGF0dHJpYnV0ZXM6YW55W119W10pPT57XG4gICAgICAgIGxldCBsYXllckNvbnRlbnRzT2JqZWN0ID0ge307XG4gICAgICAgICBmb3IgKGxldCBpPTA7aSA8IGxheWVyc0NvbnRlbnRzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgIGxheWVyQ29udGVudHNPYmplY3QgPSB7Li4ubGF5ZXJDb250ZW50c09iamVjdCxbbGF5ZXJzQ29udGVudHNbaV0/LmlkXTpsYXllcnNDb250ZW50c1tpXT8uYXR0cmlidXRlcz8ubGVuZ3RoPz8wfVxuICAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGF5ZXJDb250ZW50c09iamVjdDtcbiAgICB9XG5cbiAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBIZWxwZXIoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./your-extensions/widgets/advanced_selection_map_widget/src/helper/helper.ts\n");

/***/ }),

/***/ "./your-extensions/widgets/advanced_selection_map_widget/src/runtime/widget.tsx":
/*!**************************************************************************************!*\
  !*** ./your-extensions/widgets/advanced_selection_map_widget/src/runtime/widget.tsx ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MapViewWidget)\n/* harmony export */ });\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ \"jimu-core\");\n/* harmony import */ var jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jimu-arcgis */ \"jimu-arcgis\");\n/* harmony import */ var esri_widgets_Sketch_SketchViewModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! esri/widgets/Sketch/SketchViewModel */ \"esri/widgets/Sketch/SketchViewModel\");\n/* harmony import */ var esri_layers_GraphicsLayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! esri/layers/GraphicsLayer */ \"esri/layers/GraphicsLayer\");\n/* harmony import */ var _helper_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helper/helper */ \"./your-extensions/widgets/advanced_selection_map_widget/src/helper/helper.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\nlet sketchLayer = new esri_layers_GraphicsLayer__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\nlet zoomOut = {\n    title: \"Zoom Out\",\n    id: \"zoom-out\",\n    class: \"esri-icon-zoom-out-magnifying-glass\"\n};\nclass MapViewWidget extends jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.PureComponent {\n    constructor() {\n        super(...arguments);\n        this.state = { layers: [], activeView: null, geometry: null, selectedGraphic: null };\n        this.sketch = null;\n        this.mapLayer = null;\n        this.layer = null;\n        this.getMapLayers = (activeView) => {\n            var _a;\n            const newLayersArray = (_a = Object.keys(activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews)) === null || _a === void 0 ? void 0 : _a.reduce((newLayerArray, item) => {\n                var _a, _b, _c, _d, _e, _f, _g;\n                let object = {\n                    layerName: (_c = (_b = (_a = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : item,\n                    layerId: (_e = (_d = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _d === void 0 ? void 0 : _d.jimuLayerId) !== null && _e !== void 0 ? _e : \" \",\n                    keyName: item,\n                    id: (_g = (_f = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _f === void 0 ? void 0 : _f.layer) === null || _g === void 0 ? void 0 : _g.id\n                };\n                newLayerArray.push(object);\n                return newLayerArray;\n            }, []);\n            newLayersArray.reverse();\n            this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"layers\", newLayersArray));\n            this.setState({ activeView: activeView });\n            let view = activeView === null || activeView === void 0 ? void 0 : activeView.view;\n            const sketchViewlModel = new esri_widgets_Sketch_SketchViewModel__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({ layer: sketchLayer, view: view });\n            this.sketch = sketchViewlModel;\n            view === null || view === void 0 ? void 0 : view.popup.actions.push(zoomOut);\n            view === null || view === void 0 ? void 0 : view.popup.watch(\"visible\", (visible) => {\n                var _a, _b, _c;\n                if (visible && !((_c = (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.stateValue) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.popup)) {\n                    view.popup.visible = false;\n                }\n                else {\n                    this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"popup\", false));\n                }\n            });\n            view.on(\"click\", (event) => {\n                event.stopPropagation();\n                this.exportCsvAndJson();\n            });\n        };\n        this.selectFeatureLayer = (geometry) => {\n            var _a, _b, _c, _d;\n            const checkedLayers = (_c = (_b = (_a = this.props.stateValue) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.checkedLayers) !== null && _c !== void 0 ? _c : [];\n            if (this.state.activeView) {\n                (_d = this.state.activeView) === null || _d === void 0 ? void 0 : _d.selectFeaturesByGraphic(geometry, \"contains\").then((results) => {\n                    const selectedLayersContents = _helper_helper__WEBPACK_IMPORTED_MODULE_4__[\"default\"].getSelectedContentsLayer(results, checkedLayers);\n                    this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"layerContents\", selectedLayersContents));\n                    const numberOfAttributes = _helper_helper__WEBPACK_IMPORTED_MODULE_4__[\"default\"].getNumberOfAttributes(selectedLayersContents);\n                    this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"numberOfAttribute\", numberOfAttributes));\n                }).catch((err) => { });\n            }\n        };\n        this.startSketching = () => {\n            var _a, _b;\n            let mode = \"hybrid\";\n            let limitedGeometryArray = [\"rectangle\", \"circle\"];\n            let currentGeometry = (_b = (_a = this.props.stateValue[\"value\"]) === null || _a === void 0 ? void 0 : _a.geometryType) !== null && _b !== void 0 ? _b : \"rectangle\";\n            if (limitedGeometryArray.includes(currentGeometry)) {\n                mode = \"freehand\";\n            }\n            if (this.sketch) {\n                this.sketch.create(currentGeometry, { mode: mode });\n                if (this.state.activeView) {\n                    this.state.activeView.view.map.add(sketchLayer);\n                    this.sketch.on(\"create\", (event) => __awaiter(this, void 0, void 0, function* () {\n                        var _c, _d;\n                        if ((event === null || event === void 0 ? void 0 : event.state) === \"complete\") {\n                            this.selectFeatureLayer(event === null || event === void 0 ? void 0 : event.graphic);\n                            this.setState({ selectedGraphic: event === null || event === void 0 ? void 0 : event.graphic });\n                            this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"sketch\", false));\n                            this.setState({ geometry: (_c = event === null || event === void 0 ? void 0 : event.graphic) === null || _c === void 0 ? void 0 : _c.geometry });\n                            (_d = this.sketch) === null || _d === void 0 ? void 0 : _d.update([event === null || event === void 0 ? void 0 : event.graphic], {\n                                enableScaling: false,\n                                preserveAspectRatio: true,\n                                toggleToolOnClick: false,\n                            });\n                        }\n                    }));\n                    this.sketch.on(\"update\", (event) => {\n                        var _a;\n                        (_a = this.sketch) === null || _a === void 0 ? void 0 : _a.delete();\n                    });\n                }\n            }\n        };\n        this.exportCsvAndJson = () => {\n            var _a, _b, _c, _d, _e, _f, _g, _h;\n            const exportStatus = (_b = (_a = this.props.stateValue) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.exportStatus;\n            const uri = (_d = (_c = this.props.stateValue) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.uri;\n            const exportType = (_f = (_e = this.props.stateValue) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.exportType;\n            const blobValue = (_h = (_g = this.props.stateValue) === null || _g === void 0 ? void 0 : _g.value) === null || _h === void 0 ? void 0 : _h.blobValue;\n            if (exportStatus && uri) {\n                if (exportType === \"csv\") {\n                    window.open(uri, \"blank\");\n                }\n                else {\n                    if (window.saveAs && blobValue) {\n                        window.saveAs(blobValue, \"feature.json\");\n                    }\n                    else {\n                        window.open(uri, \"blank\");\n                    }\n                }\n            }\n            this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"exportStatus\", false));\n            this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"uri\", \"\"));\n            this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"exportType\", \"\"));\n            this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"blobValue\", null));\n        };\n        this.openPopup = () => {\n            var _a, _b;\n            const popcontents = this.props.stateValue.value.popupContents;\n            if ((_b = (_a = this.state.activeView) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.popup) {\n                const popup = this.state.activeView.view.popup;\n                popup.visible = true;\n                popup.title = popcontents === null || popcontents === void 0 ? void 0 : popcontents.title;\n                popup.content = popcontents === null || popcontents === void 0 ? void 0 : popcontents.contents;\n                try {\n                    popup.open();\n                }\n                catch (err) {\n                }\n                popup === null || popup === void 0 ? void 0 : popup.on(\"trigger-action\", (event) => {\n                    if (event.action.id === \"zoom-out\") {\n                        this.zoomOut();\n                    }\n                });\n            }\n        };\n        this.onClickZoomIn = () => {\n            var _a, _b;\n            const view = (_a = this.state.activeView) === null || _a === void 0 ? void 0 : _a.view;\n            const extent = (_b = this.state.geometry) === null || _b === void 0 ? void 0 : _b.extent;\n            if (view && extent) {\n                view.goTo(extent);\n            }\n        };\n    }\n    static mapExtraStateProps(state) {\n        return { stateValue: state.widgetsState };\n    }\n    zoomOut() {\n        var _a;\n        const view = (_a = this.state.activeView) === null || _a === void 0 ? void 0 : _a.view;\n        view === null || view === void 0 ? void 0 : view.goTo({ center: view === null || view === void 0 ? void 0 : view.center, zoom: (view === null || view === void 0 ? void 0 : view.zoom) - 2 });\n    }\n    componentDidUpdate(prevProps, prevState, snapshot) {\n        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;\n        if (((_c = (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.stateValue) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.sketch) && ((_e = (_d = this.props.stateValue) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.geometryType)) {\n            this.startSketching();\n        }\n        if (((_h = (_g = (_f = this.props) === null || _f === void 0 ? void 0 : _f.stateValue) === null || _g === void 0 ? void 0 : _g.value) === null || _h === void 0 ? void 0 : _h.popup) && ((_k = (_j = this.props.stateValue) === null || _j === void 0 ? void 0 : _j.value) === null || _k === void 0 ? void 0 : _k.popupContents)) {\n            this.openPopup();\n        }\n        if ((_m = (_l = this.props.stateValue) === null || _l === void 0 ? void 0 : _l.value) === null || _m === void 0 ? void 0 : _m.zoomIn) {\n            this.onClickZoomIn();\n        }\n    }\n    render() {\n        var _a, _b;\n        return (jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"div\", { className: \"widget-starter jimu-widget\" }, ((_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.useMapWidgetIds) === null || _b === void 0 ? void 0 : _b.length) > 0 &&\n            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__.JimuMapViewComponent, { useMapWidgetId: this.props.useMapWidgetIds[0], onActiveViewChange: this.getMapLayers })));\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9hZHZhbmNlZF9zZWxlY3Rpb25fbWFwX3dpZGdldC9zcmMvcnVudGltZS93aWRnZXQudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFjQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBOztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBT0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBMkJBO0FBdktBO0FBQ0E7QUFDQTtBQTBHQTs7QUFDQTtBQUNBO0FBQ0E7QUErQkE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUlBO0FBT0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4Yi1jbGllbnQvLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9hZHZhbmNlZF9zZWxlY3Rpb25fbWFwX3dpZGdldC9zcmMvcnVudGltZS93aWRnZXQudHN4P2U5MzciXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge1JlYWN0LGpzeCxBbGxXaWRnZXRQcm9wcyxhcHBBY3Rpb25zLElNU3RhdGV9IGZyb20gJ2ppbXUtY29yZSdcbmltcG9ydCB7IEppbXVNYXBWaWV3Q29tcG9uZW50LEppbXVNYXBWaWV3fSBmcm9tICdqaW11LWFyY2dpcyc7XG5pbXBvcnQgU2tldGNoVmlld01vZGVsIGZyb20gXCJlc3JpL3dpZGdldHMvU2tldGNoL1NrZXRjaFZpZXdNb2RlbFwiO1xuaW1wb3J0IEdyYXBoaWNzTGF5ZXIgZnJvbSAnZXNyaS9sYXllcnMvR3JhcGhpY3NMYXllcic7XG5pbXBvcnQgaGVscGVyIGZyb20gJy4uL2hlbHBlci9oZWxwZXInXG5cblxudHlwZSBzdGF0ZVZhbHVlVHlwZSA9IHtcbiAgICBzdGF0ZVZhbHVlOmFueVxufVxuXG50eXBlIFN0YXRlVHlwZSA9IHtcbiAgICBsYXllcnM6YW55LFxuICAgIGFjdGl2ZVZpZXc6SmltdU1hcFZpZXcsXG4gICAgZ2VvbWV0cnk6YW55LFxuICAgIHNlbGVjdGVkR3JhcGhpYzphbnlcbn1cblxubGV0ICBza2V0Y2hMYXllciA9IG5ldyBHcmFwaGljc0xheWVyKClcblxubGV0IHpvb21PdXQgPSB7XG4gICAgdGl0bGU6XCJab29tIE91dFwiLFxuICAgIGlkOlwiem9vbS1vdXRcIixcbiAgICBjbGFzczpcImVzcmktaWNvbi16b29tLW91dC1tYWduaWZ5aW5nLWdsYXNzXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwVmlld1dpZGdldCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQ8QWxsV2lkZ2V0UHJvcHM8YW55PiZzdGF0ZVZhbHVlVHlwZSxTdGF0ZVR5cGU+e1xuXG4gICAgc3RhdGljIG1hcEV4dHJhU3RhdGVQcm9wcyhzdGF0ZTpJTVN0YXRlKXtcbiAgICAgICAgcmV0dXJuIHtzdGF0ZVZhbHVlOnN0YXRlLndpZGdldHNTdGF0ZX07XG4gICAgfVxuICAgIHN0YXRlID0ge2xheWVyczpbXSxhY3RpdmVWaWV3Om51bGwsZ2VvbWV0cnk6bnVsbCxzZWxlY3RlZEdyYXBoaWM6bnVsbH07XG4gICAgc2tldGNoID0gbnVsbDtcbiAgICBtYXBMYXllciA9IG51bGw7XG4gICAgbGF5ZXIgPSBudWxsO1xuXG4gICAgZ2V0TWFwTGF5ZXJzID0gKGFjdGl2ZVZpZXc6SmltdU1hcFZpZXcpPT57XG4gICAgICAgIGNvbnN0IG5ld0xheWVyc0FycmF5ID0gT2JqZWN0LmtleXMoYWN0aXZlVmlldz8uamltdUxheWVyVmlld3MpPy5yZWR1Y2UoKG5ld0xheWVyQXJyYXksaXRlbSk9PntcbiAgICAgICAgICAgIGxldCBvYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgbGF5ZXJOYW1lOmFjdGl2ZVZpZXc/LmppbXVMYXllclZpZXdzW2l0ZW1dPy5sYXllcj8udGl0bGU/P2l0ZW0sXG4gICAgICAgICAgICAgICAgbGF5ZXJJZDphY3RpdmVWaWV3Py5qaW11TGF5ZXJWaWV3c1tpdGVtXT8uamltdUxheWVySWQ/P1wiIFwiLFxuICAgICAgICAgICAgICAgIGtleU5hbWU6aXRlbSxcbiAgICAgICAgICAgICAgICBpZDphY3RpdmVWaWV3Py5qaW11TGF5ZXJWaWV3c1tpdGVtXT8ubGF5ZXI/LmlkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbmV3TGF5ZXJBcnJheS5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3TGF5ZXJBcnJheTtcbiAgICAgICAgfSxbXSlcbiAgICAgICAgbmV3TGF5ZXJzQXJyYXkucmV2ZXJzZSgpXG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goYXBwQWN0aW9ucy53aWRnZXRTdGF0ZVByb3BDaGFuZ2UoXCJ2YWx1ZVwiLFwibGF5ZXJzXCIsbmV3TGF5ZXJzQXJyYXkpKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlVmlldzphY3RpdmVWaWV3fSk7XG4gICAgICAgIGxldCB2aWV3ID0gYWN0aXZlVmlldz8udmlldztcbiAgICAgICAgY29uc3Qgc2tldGNoVmlld2xNb2RlbCA9IG5ldyBTa2V0Y2hWaWV3TW9kZWwoe2xheWVyOnNrZXRjaExheWVyLHZpZXc6dmlld30pXG4gICAgICAgIHRoaXMuc2tldGNoID0gc2tldGNoVmlld2xNb2RlbDtcbiAgICAgICAgdmlldz8ucG9wdXAuYWN0aW9ucy5wdXNoKHpvb21PdXQpO1xuICAgICAgICB2aWV3Py5wb3B1cC53YXRjaChcInZpc2libGVcIiwodmlzaWJsZSk9PntcbiAgICAgICAgICAgIGlmKHZpc2libGUgJiYgIXRoaXMucHJvcHM/LnN0YXRlVmFsdWU/LnZhbHVlPy5wb3B1cCl7XG4gICAgICAgICAgICAgICAgdmlldy5wb3B1cC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGFwcEFjdGlvbnMud2lkZ2V0U3RhdGVQcm9wQ2hhbmdlKFwidmFsdWVcIixcInBvcHVwXCIsZmFsc2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB2aWV3Lm9uKFwiY2xpY2tcIiwoZXZlbnQpPT57XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuZXhwb3J0Q3N2QW5kSnNvbigpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc2VsZWN0RmVhdHVyZUxheWVyID0gKGdlb21ldHJ5OmFueSk9PntcbiAgICAgICAgY29uc3QgY2hlY2tlZExheWVycyA9IHRoaXMucHJvcHMuc3RhdGVWYWx1ZT8udmFsdWU/LmNoZWNrZWRMYXllcnM/P1tdO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVWaWV3KXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuYWN0aXZlVmlldz8uc2VsZWN0RmVhdHVyZXNCeUdyYXBoaWMoZ2VvbWV0cnksXCJjb250YWluc1wiKS50aGVuKChyZXN1bHRzKT0+e1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkTGF5ZXJzQ29udGVudHMgPSBoZWxwZXIuZ2V0U2VsZWN0ZWRDb250ZW50c0xheWVyKHJlc3VsdHMsY2hlY2tlZExheWVycyk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChhcHBBY3Rpb25zLndpZGdldFN0YXRlUHJvcENoYW5nZShcInZhbHVlXCIsXCJsYXllckNvbnRlbnRzXCIsc2VsZWN0ZWRMYXllcnNDb250ZW50cykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG51bWJlck9mQXR0cmlidXRlcyA9IGhlbHBlci5nZXROdW1iZXJPZkF0dHJpYnV0ZXMoc2VsZWN0ZWRMYXllcnNDb250ZW50cyk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChhcHBBY3Rpb25zLndpZGdldFN0YXRlUHJvcENoYW5nZShcInZhbHVlXCIsXCJudW1iZXJPZkF0dHJpYnV0ZVwiLG51bWJlck9mQXR0cmlidXRlcykpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKT0+e30pXG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0U2tldGNoaW5nID0gKCk9PntcbiAgICAgICAgbGV0IG1vZGUgPSBcImh5YnJpZFwiO1xuICAgICAgICBsZXQgbGltaXRlZEdlb21ldHJ5QXJyYXkgPSBbXCJyZWN0YW5nbGVcIixcImNpcmNsZVwiXTtcbiAgICAgICAgbGV0IGN1cnJlbnRHZW9tZXRyeSA9IHRoaXMucHJvcHMuc3RhdGVWYWx1ZVtcInZhbHVlXCJdPy5nZW9tZXRyeVR5cGU/P1wicmVjdGFuZ2xlXCI7XG4gICAgICAgIGlmIChsaW1pdGVkR2VvbWV0cnlBcnJheS5pbmNsdWRlcyhjdXJyZW50R2VvbWV0cnkpKXtcbiAgICAgICAgICAgIG1vZGUgPSBcImZyZWVoYW5kXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2tldGNoKXtcbiAgICAgICAgICAgIHRoaXMuc2tldGNoLmNyZWF0ZShjdXJyZW50R2VvbWV0cnkse21vZGU6bW9kZX0pO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlVmlldyl7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5hY3RpdmVWaWV3LnZpZXcubWFwLmFkZChza2V0Y2hMYXllcik7XG4gICAgICAgICAgICAgICAgdGhpcy5za2V0Y2gub24oXCJjcmVhdGVcIiwgYXN5bmMoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50Py5zdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RmVhdHVyZUxheWVyKGV2ZW50Py5ncmFwaGljKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkR3JhcGhpYzpldmVudD8uZ3JhcGhpY30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChhcHBBY3Rpb25zLndpZGdldFN0YXRlUHJvcENoYW5nZShcInZhbHVlXCIsXCJza2V0Y2hcIixmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z2VvbWV0cnk6ZXZlbnQ/LmdyYXBoaWM/Lmdlb21ldHJ5fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNrZXRjaD8udXBkYXRlKFtldmVudD8uZ3JhcGhpY10se1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZVNjYWxpbmc6ZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlc2VydmVBc3BlY3RSYXRpbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVUb29sT25DbGljazpmYWxzZSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2tldGNoLm9uKFwidXBkYXRlXCIsKGV2ZW50KT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNrZXRjaD8uZGVsZXRlKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydENzdkFuZEpzb24gPSAoKT0+e1xuICAgICAgICBjb25zdCBleHBvcnRTdGF0dXMgPSB0aGlzLnByb3BzLnN0YXRlVmFsdWU/LnZhbHVlPy5leHBvcnRTdGF0dXM7XG4gICAgICAgIGNvbnN0IHVyaSA9IHRoaXMucHJvcHMuc3RhdGVWYWx1ZT8udmFsdWU/LnVyaTtcbiAgICAgICAgY29uc3QgZXhwb3J0VHlwZSA9IHRoaXMucHJvcHMuc3RhdGVWYWx1ZT8udmFsdWU/LmV4cG9ydFR5cGU7XG4gICAgICAgIGNvbnN0IGJsb2JWYWx1ZSA9IHRoaXMucHJvcHMuc3RhdGVWYWx1ZT8udmFsdWU/LmJsb2JWYWx1ZTtcbiAgICAgICAgaWYgKGV4cG9ydFN0YXR1cyAmJiB1cmkpe1xuICAgICAgICAgICAgaWYoZXhwb3J0VHlwZSA9PT0gXCJjc3ZcIil7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4odXJpLFwiYmxhbmtcIik7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LnNhdmVBcyAmJiBibG9iVmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2F2ZUFzKGJsb2JWYWx1ZSxcImZlYXR1cmUuanNvblwiKVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cub3Blbih1cmksXCJibGFua1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChhcHBBY3Rpb25zLndpZGdldFN0YXRlUHJvcENoYW5nZShcInZhbHVlXCIsXCJleHBvcnRTdGF0dXNcIixmYWxzZSkpO1xuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGFwcEFjdGlvbnMud2lkZ2V0U3RhdGVQcm9wQ2hhbmdlKFwidmFsdWVcIixcInVyaVwiLFwiXCIpKTtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChhcHBBY3Rpb25zLndpZGdldFN0YXRlUHJvcENoYW5nZShcInZhbHVlXCIsXCJleHBvcnRUeXBlXCIsXCJcIikpO1xuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGFwcEFjdGlvbnMud2lkZ2V0U3RhdGVQcm9wQ2hhbmdlKFwidmFsdWVcIixcImJsb2JWYWx1ZVwiLG51bGwpKTtcbiAgICB9XG5cbiAgICB6b29tT3V0KCkge1xuICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5zdGF0ZS5hY3RpdmVWaWV3Py52aWV3O1xuICAgICAgICB2aWV3Py5nb1RvKHtjZW50ZXI6IHZpZXc/LmNlbnRlcix6b29tOiB2aWV3Py56b29tIC0gMn0pO1xuICAgICAgfVxuXG4gICAgb3BlblBvcHVwID0gKCk9PntcbiAgICAgICAgY29uc3QgcG9wY29udGVudHMgPSAgdGhpcy5wcm9wcy5zdGF0ZVZhbHVlLnZhbHVlLnBvcHVwQ29udGVudHM7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZVZpZXc/LnZpZXc/LnBvcHVwKXtcbiAgICAgICAgICAgIGNvbnN0IHBvcHVwID0gdGhpcy5zdGF0ZS5hY3RpdmVWaWV3LnZpZXcucG9wdXA7XG4gICAgICAgICAgICBwb3B1cC52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHBvcHVwLnRpdGxlID0gcG9wY29udGVudHM/LnRpdGxlO1xuICAgICAgICAgICAgcG9wdXAuY29udGVudCA9IHBvcGNvbnRlbnRzPy5jb250ZW50cztcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBwb3B1cC5vcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaChlcnIpe1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3B1cD8ub24oXCJ0cmlnZ2VyLWFjdGlvblwiLChldmVudCk9PntcbiAgICAgICAgICAgICAgICBpZihldmVudC5hY3Rpb24uaWQgPT09IFwiem9vbS1vdXRcIil7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuem9vbU91dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsaWNrWm9vbUluID0gKCk9PntcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuc3RhdGUuYWN0aXZlVmlldz8udmlldztcbiAgICAgICAgY29uc3QgZXh0ZW50ID0gdGhpcy5zdGF0ZS5nZW9tZXRyeT8uZXh0ZW50O1xuICAgICAgICBpZiAodmlldyAmJiBleHRlbnQpe1xuICAgICAgICAgICAgdmlldy5nb1RvKGV4dGVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzOiBSZWFkb25seTxBbGxXaWRnZXRQcm9wczxhbnk+PiwgcHJldlN0YXRlOiBSZWFkb25seTxhbnk+LCBzbmFwc2hvdD86IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wcm9wcz8uc3RhdGVWYWx1ZT8udmFsdWU/LnNrZXRjaCAmJiB0aGlzLnByb3BzLnN0YXRlVmFsdWU/LnZhbHVlPy5nZW9tZXRyeVR5cGUpe1xuICAgICAgICAgICAgdGhpcy5zdGFydFNrZXRjaGluZygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzPy5zdGF0ZVZhbHVlPy52YWx1ZT8ucG9wdXAgJiYgdGhpcy5wcm9wcy5zdGF0ZVZhbHVlPy52YWx1ZT8ucG9wdXBDb250ZW50cyl7XG4gICAgICAgICAgICB0aGlzLm9wZW5Qb3B1cCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnN0YXRlVmFsdWU/LnZhbHVlPy56b29tSW4pe1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrWm9vbUluKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKTogUmVhY3QuUmVhY3ROb2RlIHtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtc3RhcnRlciBqaW11LXdpZGdldFwiPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcz8udXNlTWFwV2lkZ2V0SWRzPy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgIDxKaW11TWFwVmlld0NvbXBvbmVudCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZU1hcFdpZGdldElkPXt0aGlzLnByb3BzLnVzZU1hcFdpZGdldElkc1swXX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQWN0aXZlVmlld0NoYW5nZSA9IHt0aGlzLmdldE1hcExheWVyc31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./your-extensions/widgets/advanced_selection_map_widget/src/runtime/widget.tsx\n");

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