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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Helper {\n    constructor() {\n        this.getSelectedContentsLayer = (results) => {\n            let selectedLayersArray = [];\n            if ((results === null || results === void 0 ? void 0 : results.length) > 0) {\n                selectedLayersArray = results.reduce((newArray, items) => {\n                    var _a, _b;\n                    if ((items === null || items === void 0 ? void 0 : items.length) > 0) {\n                        let selectedLayerContents = {};\n                        selectedLayerContents[\"id\"] = (_b = (_a = items[0]) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.id;\n                        selectedLayerContents[\"attributes\"] = this.getAttributes(items);\n                        newArray.push(selectedLayerContents);\n                    }\n                    return newArray;\n                }, []);\n            }\n            return selectedLayersArray;\n        };\n        this.getAttributes = (items) => {\n            const attributesArray = items.reduce((newArray, item) => {\n                if (item === null || item === void 0 ? void 0 : item.attributes) {\n                    newArray.push(item.attributes);\n                }\n                return newArray;\n            }, []);\n            return attributesArray;\n        };\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Helper());\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9hZHZhbmNlZF9zZWxlY3Rpb25fbWFwX3dpZGdldC9zcmMvaGVscGVyL2hlbHBlci50cy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBS0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUFBO0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvYWR2YW5jZWRfc2VsZWN0aW9uX21hcF93aWRnZXQvc3JjL2hlbHBlci9oZWxwZXIudHM/YzA3OSJdLCJzb3VyY2VzQ29udGVudCI6WyJ0eXBlIHNlbGVjdGVkTGF5ZXJUeXBlID0ge1xuICAgIGlkOnN0cmluZyxcbiAgICBhdHRyaWJ1dGVzOmFueVtdXG59XG5cbmNsYXNzIEhlbHBlciB7XG5cbiAgICBnZXRTZWxlY3RlZENvbnRlbnRzTGF5ZXIgPShyZXN1bHRzOmFueSk6c2VsZWN0ZWRMYXllclR5cGVbXT0+e1xuICAgICAgICBsZXQgc2VsZWN0ZWRMYXllcnNBcnJheSA9IFtdO1xuICAgICAgICBpZiAocmVzdWx0cz8ubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBzZWxlY3RlZExheWVyc0FycmF5ID0gcmVzdWx0cy5yZWR1Y2UoKG5ld0FycmF5LGl0ZW1zOmFueVtdKT0+e1xuICAgICAgICAgICAgICAgIGlmIChpdGVtcz8ubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZExheWVyQ29udGVudHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRMYXllckNvbnRlbnRzW1wiaWRcIl0gPSBpdGVtc1swXT8ubGF5ZXI/LmlkO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZExheWVyQ29udGVudHNbXCJhdHRyaWJ1dGVzXCJdID0gdGhpcy5nZXRBdHRyaWJ1dGVzKGl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QXJyYXkucHVzaChzZWxlY3RlZExheWVyQ29udGVudHMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdBcnJheTtcbiAgICAgICAgICAgIH0sW10pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkTGF5ZXJzQXJyYXk7XG4gICAgfVxuXG4gICAgZ2V0QXR0cmlidXRlcyA9IChpdGVtczphbnlbXSk6YW55W109PntcbiAgICAgICAgY29uc3QgYXR0cmlidXRlc0FycmF5ID0gaXRlbXMucmVkdWNlKChuZXdBcnJheSxpdGVtKT0+e1xuICAgICAgICAgICAgaWYgKGl0ZW0/LmF0dHJpYnV0ZXMpe1xuICAgICAgICAgICAgICAgIG5ld0FycmF5LnB1c2goaXRlbS5hdHRyaWJ1dGVzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ld0FycmF5O1xuICAgICAgICB9LFtdKVxuICAgICAgICByZXR1cm4gYXR0cmlidXRlc0FycmF5O1xuICAgIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBIZWxwZXIoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./your-extensions/widgets/advanced_selection_map_widget/src/helper/helper.ts\n");

/***/ }),

/***/ "./your-extensions/widgets/advanced_selection_map_widget/src/runtime/widget.tsx":
/*!**************************************************************************************!*\
  !*** ./your-extensions/widgets/advanced_selection_map_widget/src/runtime/widget.tsx ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MapViewWidget)\n/* harmony export */ });\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ \"jimu-core\");\n/* harmony import */ var jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jimu-arcgis */ \"jimu-arcgis\");\n/* harmony import */ var esri_widgets_Sketch_SketchViewModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! esri/widgets/Sketch/SketchViewModel */ \"esri/widgets/Sketch/SketchViewModel\");\n/* harmony import */ var esri_layers_GraphicsLayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! esri/layers/GraphicsLayer */ \"esri/layers/GraphicsLayer\");\n/* harmony import */ var _helper_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helper/helper */ \"./your-extensions/widgets/advanced_selection_map_widget/src/helper/helper.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\nlet sketchLayer = new esri_layers_GraphicsLayer__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\nclass MapViewWidget extends jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.PureComponent {\n    constructor() {\n        super(...arguments);\n        this.state = { layers: [], activeView: null };\n        this.sketch = null;\n        this.mapLayer = null;\n        this.layer = null;\n        this.getMapLayers = (activeView) => {\n            const newLayersArray = Object.keys(activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews).reduce((newLayerArray, item) => {\n                var _a, _b, _c, _d, _e, _f, _g;\n                let object = {\n                    layerName: (_c = (_b = (_a = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : item,\n                    layerId: (_e = (_d = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _d === void 0 ? void 0 : _d.jimuLayerId) !== null && _e !== void 0 ? _e : \" \",\n                    keyName: item,\n                    id: (_g = (_f = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _f === void 0 ? void 0 : _f.layer) === null || _g === void 0 ? void 0 : _g.id\n                };\n                newLayerArray.push(object);\n                return newLayerArray;\n            }, []);\n            newLayersArray.reverse();\n            this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"layers\", newLayersArray));\n            this.setState({ activeView: activeView });\n            let view = activeView === null || activeView === void 0 ? void 0 : activeView.view;\n            const sketchViewlModel = new esri_widgets_Sketch_SketchViewModel__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({ layer: sketchLayer, view: view });\n            this.sketch = sketchViewlModel;\n        };\n        this.selectFeatureLayer = (geometry) => {\n            var _a;\n            if (this.state.activeView) {\n                (_a = this.state.activeView) === null || _a === void 0 ? void 0 : _a.selectFeaturesByGraphic(geometry, \"intersects\").then((results) => {\n                    const selectedLayersContents = _helper_helper__WEBPACK_IMPORTED_MODULE_4__[\"default\"].getSelectedContentsLayer(results);\n                    this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"layerContents\", selectedLayersContents));\n                }).catch((err) => { console.log(err, \"check err\"); });\n            }\n        };\n    }\n    static mapExtraStateProps(state) {\n        return { stateValue: state.widgetsState };\n    }\n    componentDidUpdate(prevProps, prevState, snapshot) {\n        var _a, _b, _c, _d;\n        if (((_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.stateValue[\"value\"]) === null || _b === void 0 ? void 0 : _b.sketch) && ((_c = this.props.stateValue[\"value\"]) === null || _c === void 0 ? void 0 : _c.geometryType)) {\n            if (this.sketch) {\n                this.sketch.create((_d = this.props.stateValue[\"value\"]) === null || _d === void 0 ? void 0 : _d.geometryType);\n                if (this.state.activeView) {\n                    this.state.activeView.view.map.add(sketchLayer);\n                    this.sketch.on(\"create\", (event) => __awaiter(this, void 0, void 0, function* () {\n                        if ((event === null || event === void 0 ? void 0 : event.state) === \"complete\") {\n                            this.selectFeatureLayer(event === null || event === void 0 ? void 0 : event.graphic);\n                        }\n                    }));\n                }\n            }\n        }\n    }\n    render() {\n        var _a, _b;\n        return (jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"div\", { className: \"widget-starter jimu-widget\" }, ((_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.useMapWidgetIds) === null || _b === void 0 ? void 0 : _b.length) > 0 &&\n            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__.JimuMapViewComponent, { useMapWidgetId: this.props.useMapWidgetIds[0], onActiveViewChange: this.getMapLayers })));\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9hZHZhbmNlZF9zZWxlY3Rpb25fbWFwX3dpZGdldC9zcmMvcnVudGltZS93aWRnZXQudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFXQTtBQUVBO0FBQUE7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUErQkE7QUFwRUE7QUFDQTtBQUNBO0FBcUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUlBO0FBT0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4Yi1jbGllbnQvLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9hZHZhbmNlZF9zZWxlY3Rpb25fbWFwX3dpZGdldC9zcmMvcnVudGltZS93aWRnZXQudHN4P2U5MzciXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge1JlYWN0LGpzeCxBbGxXaWRnZXRQcm9wcyxhcHBBY3Rpb25zLElNU3RhdGV9IGZyb20gJ2ppbXUtY29yZSdcbmltcG9ydCB7IEppbXVNYXBWaWV3Q29tcG9uZW50LEppbXVNYXBWaWV3LEppbXVGZWF0dXJlTGF5ZXJWaWV3fSBmcm9tICdqaW11LWFyY2dpcyc7XG5pbXBvcnQgU2tldGNoVmlld01vZGVsIGZyb20gXCJlc3JpL3dpZGdldHMvU2tldGNoL1NrZXRjaFZpZXdNb2RlbFwiO1xuaW1wb3J0IEdyYXBoaWNzTGF5ZXIgZnJvbSAnZXNyaS9sYXllcnMvR3JhcGhpY3NMYXllcic7XG5pbXBvcnQgZ2VvbWV0cnlFbmdpbmVBc3luYyBmcm9tICdlc3JpL2dlb21ldHJ5L2dlb21ldHJ5RW5naW5lQXN5bmMnXG5pbXBvcnQgaGVscGVyIGZyb20gJy4uL2hlbHBlci9oZWxwZXInXG5cbnR5cGUgc3RhdGVWYWx1ZVR5cGUgPSB7XG4gICAgc3RhdGVWYWx1ZTphbnlcbn1cblxudHlwZSBTdGF0ZVR5cGUgPSB7XG4gICAgbGF5ZXJzOmFueSxcbiAgICBhY3RpdmVWaWV3OkppbXVNYXBWaWV3XG59XG5cbmxldCAgc2tldGNoTGF5ZXIgPSBuZXcgR3JhcGhpY3NMYXllcigpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcFZpZXdXaWRnZXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PEFsbFdpZGdldFByb3BzPGFueT4mc3RhdGVWYWx1ZVR5cGUsU3RhdGVUeXBlPntcblxuICAgIHN0YXRpYyBtYXBFeHRyYVN0YXRlUHJvcHMoc3RhdGU6SU1TdGF0ZSl7XG4gICAgICAgIHJldHVybiB7c3RhdGVWYWx1ZTpzdGF0ZS53aWRnZXRzU3RhdGV9O1xuICAgIH1cblxuICAgIHN0YXRlID0ge2xheWVyczpbXSxhY3RpdmVWaWV3Om51bGx9O1xuICAgIHNrZXRjaCA9IG51bGw7XG4gICAgbWFwTGF5ZXIgPSBudWxsO1xuICAgIGxheWVyID0gbnVsbDtcblxuICAgIGdldE1hcExheWVycyA9IChhY3RpdmVWaWV3OkppbXVNYXBWaWV3KT0+e1xuICAgICAgICBjb25zdCBuZXdMYXllcnNBcnJheSA9IE9iamVjdC5rZXlzKGFjdGl2ZVZpZXc/LmppbXVMYXllclZpZXdzKS5yZWR1Y2UoKG5ld0xheWVyQXJyYXksaXRlbSk9PntcbiAgICAgICAgICAgIGxldCBvYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgbGF5ZXJOYW1lOmFjdGl2ZVZpZXc/LmppbXVMYXllclZpZXdzW2l0ZW1dPy5sYXllcj8udGl0bGU/P2l0ZW0sXG4gICAgICAgICAgICAgICAgbGF5ZXJJZDphY3RpdmVWaWV3Py5qaW11TGF5ZXJWaWV3c1tpdGVtXT8uamltdUxheWVySWQ/P1wiIFwiLFxuICAgICAgICAgICAgICAgIGtleU5hbWU6aXRlbSxcbiAgICAgICAgICAgICAgICBpZDphY3RpdmVWaWV3Py5qaW11TGF5ZXJWaWV3c1tpdGVtXT8ubGF5ZXI/LmlkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbmV3TGF5ZXJBcnJheS5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3TGF5ZXJBcnJheTtcbiAgICAgICAgfSxbXSlcbiAgICAgICAgbmV3TGF5ZXJzQXJyYXkucmV2ZXJzZSgpXG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goYXBwQWN0aW9ucy53aWRnZXRTdGF0ZVByb3BDaGFuZ2UoXCJ2YWx1ZVwiLFwibGF5ZXJzXCIsbmV3TGF5ZXJzQXJyYXkpKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlVmlldzphY3RpdmVWaWV3fSk7XG4gICAgICAgIGxldCB2aWV3ID0gYWN0aXZlVmlldz8udmlldztcbiAgICAgICAgY29uc3Qgc2tldGNoVmlld2xNb2RlbCA9IG5ldyBTa2V0Y2hWaWV3TW9kZWwoe2xheWVyOnNrZXRjaExheWVyLHZpZXc6dmlld30pXG4gICAgICAgIHRoaXMuc2tldGNoID0gc2tldGNoVmlld2xNb2RlbDtcbiAgICB9XG5cbiAgICBzZWxlY3RGZWF0dXJlTGF5ZXIgPSAoZ2VvbWV0cnk6YW55KT0+e1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVWaWV3KXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuYWN0aXZlVmlldz8uc2VsZWN0RmVhdHVyZXNCeUdyYXBoaWMoZ2VvbWV0cnksXCJpbnRlcnNlY3RzXCIpLnRoZW4oKHJlc3VsdHMpPT57XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRMYXllcnNDb250ZW50cyA9IGhlbHBlci5nZXRTZWxlY3RlZENvbnRlbnRzTGF5ZXIocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChhcHBBY3Rpb25zLndpZGdldFN0YXRlUHJvcENoYW5nZShcInZhbHVlXCIsXCJsYXllckNvbnRlbnRzXCIsc2VsZWN0ZWRMYXllcnNDb250ZW50cykpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnIpPT57Y29uc29sZS5sb2coZXJyLFwiY2hlY2sgZXJyXCIpfSlcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wczogUmVhZG9ubHk8QWxsV2lkZ2V0UHJvcHM8YW55Pj4sIHByZXZTdGF0ZTogUmVhZG9ubHk8YW55Piwgc25hcHNob3Q/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHM/LnN0YXRlVmFsdWVbXCJ2YWx1ZVwiXT8uc2tldGNoICYmIHRoaXMucHJvcHMuc3RhdGVWYWx1ZVtcInZhbHVlXCJdPy5nZW9tZXRyeVR5cGUpe1xuICAgICAgICAgICAgaWYgKHRoaXMuc2tldGNoKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNrZXRjaC5jcmVhdGUodGhpcy5wcm9wcy5zdGF0ZVZhbHVlW1widmFsdWVcIl0/Lmdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlVmlldyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYWN0aXZlVmlldy52aWV3Lm1hcC5hZGQoc2tldGNoTGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNrZXRjaC5vbihcImNyZWF0ZVwiLCBhc3luYyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50Py5zdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEZlYXR1cmVMYXllcihldmVudD8uZ3JhcGhpYylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXN0YXJ0ZXIgamltdS13aWRnZXRcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHM/LnVzZU1hcFdpZGdldElkcz8ubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICA8SmltdU1hcFZpZXdDb21wb25lbnQgXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VNYXBXaWRnZXRJZD17dGhpcy5wcm9wcy51c2VNYXBXaWRnZXRJZHNbMF19XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFjdGl2ZVZpZXdDaGFuZ2UgPSB7dGhpcy5nZXRNYXBMYXllcnN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./your-extensions/widgets/advanced_selection_map_widget/src/runtime/widget.tsx\n");

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