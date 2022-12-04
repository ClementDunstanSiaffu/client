/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
System.register(["jimu-core","jimu-arcgis","esri/widgets/Sketch/SketchViewModel","esri/layers/GraphicsLayer","esri/geometry/geometryEngineAsync"], function(__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {
	var __WEBPACK_EXTERNAL_MODULE_jimu_core__ = {};
	var __WEBPACK_EXTERNAL_MODULE_jimu_arcgis__ = {};
	var __WEBPACK_EXTERNAL_MODULE_esri_widgets_Sketch_SketchViewModel__ = {};
	var __WEBPACK_EXTERNAL_MODULE_esri_layers_GraphicsLayer__ = {};
	var __WEBPACK_EXTERNAL_MODULE_esri_geometry_geometryEngineAsync__ = {};
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_core__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_arcgis__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_esri_widgets_Sketch_SketchViewModel__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_esri_layers_GraphicsLayer__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_esri_geometry_geometryEngineAsync__, "__esModule", { value: true });
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
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_esri_geometry_geometryEngineAsync__[key] = module[key];
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MapViewWidget)\n/* harmony export */ });\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ \"jimu-core\");\n/* harmony import */ var jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jimu-arcgis */ \"jimu-arcgis\");\n/* harmony import */ var esri_widgets_Sketch_SketchViewModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! esri/widgets/Sketch/SketchViewModel */ \"esri/widgets/Sketch/SketchViewModel\");\n/* harmony import */ var esri_layers_GraphicsLayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! esri/layers/GraphicsLayer */ \"esri/layers/GraphicsLayer\");\n/* harmony import */ var esri_geometry_geometryEngineAsync__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! esri/geometry/geometryEngineAsync */ \"esri/geometry/geometryEngineAsync\");\n/* harmony import */ var _helper_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helper/helper */ \"./your-extensions/widgets/advanced_selection_map_widget/src/helper/helper.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\n\nlet sketchLayer = new esri_layers_GraphicsLayer__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\nclass MapViewWidget extends jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.PureComponent {\n    constructor() {\n        super(...arguments);\n        this.state = { layers: [], activeView: null };\n        this.sketch = null;\n        this.mapLayer = null;\n        this.layer = null;\n        this.getMapLayers = (activeView) => {\n            const newLayersArray = Object.keys(activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews).reduce((newLayerArray, item) => {\n                var _a, _b, _c, _d, _e, _f, _g;\n                let object = {\n                    layerName: (_c = (_b = (_a = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : item,\n                    layerId: (_e = (_d = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _d === void 0 ? void 0 : _d.jimuLayerId) !== null && _e !== void 0 ? _e : \" \",\n                    keyName: item,\n                    id: (_g = (_f = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _f === void 0 ? void 0 : _f.layer) === null || _g === void 0 ? void 0 : _g.id\n                };\n                newLayerArray.push(object);\n                return newLayerArray;\n            }, []);\n            newLayersArray.reverse();\n            this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"layers\", newLayersArray));\n            this.setState({ activeView: activeView });\n            let view = activeView === null || activeView === void 0 ? void 0 : activeView.view;\n            const sketchViewlModel = new esri_widgets_Sketch_SketchViewModel__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({ layer: sketchLayer, view: view });\n            this.sketch = sketchViewlModel;\n            // this.layer = new FeatureLayer({\n            //     source:graphic,\n            //     objectIdField: \"OBJECTID\",\n            // })\n            // console.log(this.layer,\"check layer created\")\n        };\n        this.selectFeatureLayer = (geometry) => {\n            // console.log(geometry,\"check geometry\")\n            // this.state.activeView?.view?.whenLayerView(sketchLayer).then(function(layerView){\n            //     console.log(layerView,\"layer view\")\n            //     layerView.watch(\"updating\", function(val){\n            //       if(!val){  // wait for the layer view to finish updating\n            //         layerView.queryGraphics(geometry).then(function(results){\n            //           console.log(results,'check results');  // prints the array of client-side graphics to the console\n            //         });\n            //       }\n            //     });\n            //   })\n            // let query = this.layer.createQuery();\n            // query.returnGeometry = true;\n            // query.geometry = geometry;\n            // query.outFields = [\"*\"]\n            // const query = {\n            //     spatialRelationship: \"intersects\", // Relationship operation to apply\n            //     // geometry: geometry,\n            //     outFields: [\"*\"],\n            //     returnGeometry: true\n            // }\n            var _a;\n            // if (this.layer){\n            //     this.layer?.queryFeatures(query).then((results)=>{\n            //         console.log(results,\"check results\")\n            //     }).catch((err)=>{\n            //         console.log(err,\"check error\")\n            //     })\n            // }\n            if (this.state.activeView) {\n                (_a = this.state.activeView) === null || _a === void 0 ? void 0 : _a.selectFeaturesByGraphic(geometry, \"intersects\").then((results) => {\n                    const selectedLayersContents = _helper_helper__WEBPACK_IMPORTED_MODULE_5__[\"default\"].getSelectedContentsLayer(results);\n                    console.log(selectedLayersContents, \"check contents\");\n                    this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"layerContents\", selectedLayersContents));\n                }).catch((err) => { console.log(err, \"check err\"); });\n            }\n        };\n    }\n    static mapExtraStateProps(state) {\n        return { stateValue: state.widgetsState };\n    }\n    componentDidUpdate(prevProps, prevState, snapshot) {\n        var _a, _b, _c, _d;\n        if (((_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.stateValue[\"value\"]) === null || _b === void 0 ? void 0 : _b.sketch) && ((_c = this.props.stateValue[\"value\"]) === null || _c === void 0 ? void 0 : _c.geometryType)) {\n            if (this.sketch) {\n                this.sketch.create((_d = this.props.stateValue[\"value\"]) === null || _d === void 0 ? void 0 : _d.geometryType);\n                if (this.state.activeView) {\n                    this.state.activeView.view.map.add(sketchLayer);\n                    this.sketch.on(\"create\", (event) => __awaiter(this, void 0, void 0, function* () {\n                        if ((event === null || event === void 0 ? void 0 : event.state) === \"complete\") {\n                            // console.log(event?.graphic?.geometry,\"check geometry\")\n                            const geometries = sketchLayer.graphics.map((graphic) => {\n                                return graphic.geometry;\n                            });\n                            // console.log(geometries,\"check geometries\")\n                            const querySelectedLayer = yield esri_geometry_geometryEngineAsync__WEBPACK_IMPORTED_MODULE_4__[\"default\"].union(geometries.toArray());\n                            // this.selectFeatureLayer(querySelectedLayer)\n                            this.selectFeatureLayer(event === null || event === void 0 ? void 0 : event.graphic);\n                        }\n                    }));\n                }\n            }\n        }\n    }\n    render() {\n        var _a, _b;\n        return (jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"div\", { className: \"widget-starter jimu-widget\" }, ((_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.useMapWidgetIds) === null || _b === void 0 ? void 0 : _b.length) > 0 &&\n            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__.JimuMapViewComponent, { useMapWidgetId: this.props.useMapWidgetIds[0], onActiveViewChange: this.getMapLayers })));\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9hZHZhbmNlZF9zZWxlY3Rpb25fbWFwX3dpZGdldC9zcmMvcnVudGltZS93aWRnZXQudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFXQTtBQUVBO0FBQUE7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQXNDQTtBQS9HQTtBQUNBO0FBQ0E7QUF5RUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFJQTtBQU9BO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvYWR2YW5jZWRfc2VsZWN0aW9uX21hcF93aWRnZXQvc3JjL3J1bnRpbWUvd2lkZ2V0LnRzeD9lOTM3Il0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtSZWFjdCxqc3gsQWxsV2lkZ2V0UHJvcHMsYXBwQWN0aW9ucyxJTVN0YXRlfSBmcm9tICdqaW11LWNvcmUnXG5pbXBvcnQgeyBKaW11TWFwVmlld0NvbXBvbmVudCxKaW11TWFwVmlldyxKaW11RmVhdHVyZUxheWVyVmlld30gZnJvbSAnamltdS1hcmNnaXMnO1xuaW1wb3J0IFNrZXRjaFZpZXdNb2RlbCBmcm9tIFwiZXNyaS93aWRnZXRzL1NrZXRjaC9Ta2V0Y2hWaWV3TW9kZWxcIjtcbmltcG9ydCBHcmFwaGljc0xheWVyIGZyb20gJ2VzcmkvbGF5ZXJzL0dyYXBoaWNzTGF5ZXInO1xuaW1wb3J0IGdlb21ldHJ5RW5naW5lQXN5bmMgZnJvbSAnZXNyaS9nZW9tZXRyeS9nZW9tZXRyeUVuZ2luZUFzeW5jJ1xuaW1wb3J0IENTVkxheWVyIGZyb20gJ2VzcmkvbGF5ZXJzL0NTVkxheWVyJztcbmltcG9ydCBGZWF0dXJlTGF5ZXIgZnJvbSAnZXNyaS9sYXllcnMvRmVhdHVyZUxheWVyJ1xuaW1wb3J0IGhlbHBlciBmcm9tICcuLi9oZWxwZXIvaGVscGVyJ1xuXG50eXBlIHN0YXRlVmFsdWVUeXBlID0ge1xuICAgIHN0YXRlVmFsdWU6YW55XG59XG5cbnR5cGUgU3RhdGVUeXBlID0ge1xuICAgIGxheWVyczphbnksXG4gICAgYWN0aXZlVmlldzpKaW11TWFwVmlld1xufVxuXG5sZXQgIHNrZXRjaExheWVyID0gbmV3IEdyYXBoaWNzTGF5ZXIoKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXBWaWV3V2lkZ2V0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudDxBbGxXaWRnZXRQcm9wczxhbnk+JnN0YXRlVmFsdWVUeXBlLFN0YXRlVHlwZT57XG5cbiAgICBzdGF0aWMgbWFwRXh0cmFTdGF0ZVByb3BzKHN0YXRlOklNU3RhdGUpe1xuICAgICAgICByZXR1cm4ge3N0YXRlVmFsdWU6c3RhdGUud2lkZ2V0c1N0YXRlfTtcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtsYXllcnM6W10sYWN0aXZlVmlldzpudWxsfTtcbiAgICBza2V0Y2ggPSBudWxsO1xuICAgIG1hcExheWVyID0gbnVsbDtcbiAgICBsYXllciA9IG51bGw7XG5cbiAgICBnZXRNYXBMYXllcnMgPSAoYWN0aXZlVmlldzpKaW11TWFwVmlldyk9PntcbiAgICAgICAgY29uc3QgbmV3TGF5ZXJzQXJyYXkgPSBPYmplY3Qua2V5cyhhY3RpdmVWaWV3Py5qaW11TGF5ZXJWaWV3cykucmVkdWNlKChuZXdMYXllckFycmF5LGl0ZW0pPT57XG4gICAgICAgICAgICBsZXQgb2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgIGxheWVyTmFtZTphY3RpdmVWaWV3Py5qaW11TGF5ZXJWaWV3c1tpdGVtXT8ubGF5ZXI/LnRpdGxlPz9pdGVtLFxuICAgICAgICAgICAgICAgIGxheWVySWQ6YWN0aXZlVmlldz8uamltdUxheWVyVmlld3NbaXRlbV0/LmppbXVMYXllcklkPz9cIiBcIixcbiAgICAgICAgICAgICAgICBrZXlOYW1lOml0ZW0sXG4gICAgICAgICAgICAgICAgaWQ6YWN0aXZlVmlldz8uamltdUxheWVyVmlld3NbaXRlbV0/LmxheWVyPy5pZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5ld0xheWVyQXJyYXkucHVzaChvYmplY3QpO1xuICAgICAgICAgICAgcmV0dXJuIG5ld0xheWVyQXJyYXk7XG4gICAgICAgIH0sW10pXG4gICAgICAgIG5ld0xheWVyc0FycmF5LnJldmVyc2UoKVxuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGFwcEFjdGlvbnMud2lkZ2V0U3RhdGVQcm9wQ2hhbmdlKFwidmFsdWVcIixcImxheWVyc1wiLG5ld0xheWVyc0FycmF5KSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZVZpZXc6YWN0aXZlVmlld30pO1xuICAgICAgICBsZXQgdmlldyA9IGFjdGl2ZVZpZXc/LnZpZXc7XG4gICAgICAgIGNvbnN0IHNrZXRjaFZpZXdsTW9kZWwgPSBuZXcgU2tldGNoVmlld01vZGVsKHtsYXllcjpza2V0Y2hMYXllcix2aWV3OnZpZXd9KVxuICAgICAgICB0aGlzLnNrZXRjaCA9IHNrZXRjaFZpZXdsTW9kZWw7XG5cbiAgICAgICAgLy8gdGhpcy5sYXllciA9IG5ldyBGZWF0dXJlTGF5ZXIoe1xuICAgICAgICAvLyAgICAgc291cmNlOmdyYXBoaWMsXG4gICAgICAgIC8vICAgICBvYmplY3RJZEZpZWxkOiBcIk9CSkVDVElEXCIsXG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubGF5ZXIsXCJjaGVjayBsYXllciBjcmVhdGVkXCIpXG4gICAgfVxuXG4gICAgc2VsZWN0RmVhdHVyZUxheWVyID0gKGdlb21ldHJ5OmFueSk9PntcbiAgICAgICAgLy8gY29uc29sZS5sb2coZ2VvbWV0cnksXCJjaGVjayBnZW9tZXRyeVwiKVxuICAgICAgICAvLyB0aGlzLnN0YXRlLmFjdGl2ZVZpZXc/LnZpZXc/LndoZW5MYXllclZpZXcoc2tldGNoTGF5ZXIpLnRoZW4oZnVuY3Rpb24obGF5ZXJWaWV3KXtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGxheWVyVmlldyxcImxheWVyIHZpZXdcIilcbiAgICAgICAgLy8gICAgIGxheWVyVmlldy53YXRjaChcInVwZGF0aW5nXCIsIGZ1bmN0aW9uKHZhbCl7XG4gICAgICAgIC8vICAgICAgIGlmKCF2YWwpeyAgLy8gd2FpdCBmb3IgdGhlIGxheWVyIHZpZXcgdG8gZmluaXNoIHVwZGF0aW5nXG4gICAgICAgIC8vICAgICAgICAgbGF5ZXJWaWV3LnF1ZXJ5R3JhcGhpY3MoZ2VvbWV0cnkpLnRoZW4oZnVuY3Rpb24ocmVzdWx0cyl7XG4gICAgICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRzLCdjaGVjayByZXN1bHRzJyk7ICAvLyBwcmludHMgdGhlIGFycmF5IG9mIGNsaWVudC1zaWRlIGdyYXBoaWNzIHRvIHRoZSBjb25zb2xlXG4gICAgICAgIC8vICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgIH1cbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyAgIH0pXG4gICAgICAgIC8vIGxldCBxdWVyeSA9IHRoaXMubGF5ZXIuY3JlYXRlUXVlcnkoKTtcbiAgICAgICAgLy8gcXVlcnkucmV0dXJuR2VvbWV0cnkgPSB0cnVlO1xuICAgICAgICAvLyBxdWVyeS5nZW9tZXRyeSA9IGdlb21ldHJ5O1xuICAgICAgICAvLyBxdWVyeS5vdXRGaWVsZHMgPSBbXCIqXCJdXG4gICAgICAgIC8vIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICAvLyAgICAgc3BhdGlhbFJlbGF0aW9uc2hpcDogXCJpbnRlcnNlY3RzXCIsIC8vIFJlbGF0aW9uc2hpcCBvcGVyYXRpb24gdG8gYXBwbHlcbiAgICAgICAgLy8gICAgIC8vIGdlb21ldHJ5OiBnZW9tZXRyeSxcbiAgICAgICAgLy8gICAgIG91dEZpZWxkczogW1wiKlwiXSxcbiAgICAgICAgLy8gICAgIHJldHVybkdlb21ldHJ5OiB0cnVlXG4gICAgICAgIC8vIH1cbiAgIFxuICAgICAgICAvLyBpZiAodGhpcy5sYXllcil7XG4gICAgICAgIC8vICAgICB0aGlzLmxheWVyPy5xdWVyeUZlYXR1cmVzKHF1ZXJ5KS50aGVuKChyZXN1bHRzKT0+e1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHMsXCJjaGVjayByZXN1bHRzXCIpXG4gICAgICAgIC8vICAgICB9KS5jYXRjaCgoZXJyKT0+e1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGVycixcImNoZWNrIGVycm9yXCIpXG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZVZpZXcpe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5hY3RpdmVWaWV3Py5zZWxlY3RGZWF0dXJlc0J5R3JhcGhpYyhnZW9tZXRyeSxcImludGVyc2VjdHNcIikudGhlbigocmVzdWx0cyk9PntcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZExheWVyc0NvbnRlbnRzID0gaGVscGVyLmdldFNlbGVjdGVkQ29udGVudHNMYXllcihyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZExheWVyc0NvbnRlbnRzLFwiY2hlY2sgY29udGVudHNcIilcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGFwcEFjdGlvbnMud2lkZ2V0U3RhdGVQcm9wQ2hhbmdlKFwidmFsdWVcIixcImxheWVyQ29udGVudHNcIixzZWxlY3RlZExheWVyc0NvbnRlbnRzKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycik9Pntjb25zb2xlLmxvZyhlcnIsXCJjaGVjayBlcnJcIil9KVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzOiBSZWFkb25seTxBbGxXaWRnZXRQcm9wczxhbnk+PiwgcHJldlN0YXRlOiBSZWFkb25seTxhbnk+LCBzbmFwc2hvdD86IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wcm9wcz8uc3RhdGVWYWx1ZVtcInZhbHVlXCJdPy5za2V0Y2ggJiYgdGhpcy5wcm9wcy5zdGF0ZVZhbHVlW1widmFsdWVcIl0/Lmdlb21ldHJ5VHlwZSl7XG4gICAgICAgICAgICBpZiAodGhpcy5za2V0Y2gpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2tldGNoLmNyZWF0ZSh0aGlzLnByb3BzLnN0YXRlVmFsdWVbXCJ2YWx1ZVwiXT8uZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVWaWV3KXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5hY3RpdmVWaWV3LnZpZXcubWFwLmFkZChza2V0Y2hMYXllcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tldGNoLm9uKFwiY3JlYXRlXCIsIGFzeW5jKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQ/LnN0YXRlID09PSBcImNvbXBsZXRlXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50Py5ncmFwaGljPy5nZW9tZXRyeSxcImNoZWNrIGdlb21ldHJ5XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2VvbWV0cmllcyA9IHNrZXRjaExheWVyLmdyYXBoaWNzLm1hcCgoZ3JhcGhpYyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdyYXBoaWMuZ2VvbWV0cnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnZW9tZXRyaWVzLFwiY2hlY2sgZ2VvbWV0cmllc1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5U2VsZWN0ZWRMYXllciA9IGF3YWl0IGdlb21ldHJ5RW5naW5lQXN5bmMudW5pb24oZ2VvbWV0cmllcy50b0FycmF5KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2VsZWN0RmVhdHVyZUxheWVyKHF1ZXJ5U2VsZWN0ZWRMYXllcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEZlYXR1cmVMYXllcihldmVudD8uZ3JhcGhpYylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXN0YXJ0ZXIgamltdS13aWRnZXRcIj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHM/LnVzZU1hcFdpZGdldElkcz8ubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICA8SmltdU1hcFZpZXdDb21wb25lbnQgXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VNYXBXaWRnZXRJZD17dGhpcy5wcm9wcy51c2VNYXBXaWRnZXRJZHNbMF19XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFjdGl2ZVZpZXdDaGFuZ2UgPSB7dGhpcy5nZXRNYXBMYXllcnN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./your-extensions/widgets/advanced_selection_map_widget/src/runtime/widget.tsx\n");

/***/ }),

/***/ "esri/geometry/geometryEngineAsync":
/*!****************************************************!*\
  !*** external "esri/geometry/geometryEngineAsync" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_esri_geometry_geometryEngineAsync__;

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