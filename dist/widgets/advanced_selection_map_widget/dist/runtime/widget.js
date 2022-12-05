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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MapViewWidget)\n/* harmony export */ });\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ \"jimu-core\");\n/* harmony import */ var jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jimu-arcgis */ \"jimu-arcgis\");\n/* harmony import */ var esri_widgets_Sketch_SketchViewModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! esri/widgets/Sketch/SketchViewModel */ \"esri/widgets/Sketch/SketchViewModel\");\n/* harmony import */ var esri_layers_GraphicsLayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! esri/layers/GraphicsLayer */ \"esri/layers/GraphicsLayer\");\n/* harmony import */ var _helper_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helper/helper */ \"./your-extensions/widgets/advanced_selection_map_widget/src/helper/helper.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\nlet sketchLayer = new esri_layers_GraphicsLayer__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\nlet zoomOut = {\n    title: \"Zoom Out\",\n    id: \"zoom-out\",\n    class: \"esri-icon-zoom-out-magnifying-glass\"\n};\nclass MapViewWidget extends jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.PureComponent {\n    constructor() {\n        super(...arguments);\n        this.state = { layers: [], activeView: null };\n        this.sketch = null;\n        this.mapLayer = null;\n        this.layer = null;\n        this.getMapLayers = (activeView) => {\n            const newLayersArray = Object.keys(activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews).reduce((newLayerArray, item) => {\n                var _a, _b, _c, _d, _e, _f, _g;\n                let object = {\n                    layerName: (_c = (_b = (_a = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : item,\n                    layerId: (_e = (_d = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _d === void 0 ? void 0 : _d.jimuLayerId) !== null && _e !== void 0 ? _e : \" \",\n                    keyName: item,\n                    id: (_g = (_f = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _f === void 0 ? void 0 : _f.layer) === null || _g === void 0 ? void 0 : _g.id\n                };\n                newLayerArray.push(object);\n                return newLayerArray;\n            }, []);\n            newLayersArray.reverse();\n            this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"layers\", newLayersArray));\n            this.setState({ activeView: activeView });\n            let view = activeView === null || activeView === void 0 ? void 0 : activeView.view;\n            const sketchViewlModel = new esri_widgets_Sketch_SketchViewModel__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({ layer: sketchLayer, view: view });\n            this.sketch = sketchViewlModel;\n            view.popup.actions.push(zoomOut);\n        };\n        this.selectFeatureLayer = (geometry) => {\n            var _a;\n            if (this.state.activeView) {\n                (_a = this.state.activeView) === null || _a === void 0 ? void 0 : _a.selectFeaturesByGraphic(geometry, \"intersects\").then((results) => {\n                    const selectedLayersContents = _helper_helper__WEBPACK_IMPORTED_MODULE_4__[\"default\"].getSelectedContentsLayer(results);\n                    this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"layerContents\", selectedLayersContents));\n                }).catch((err) => { });\n            }\n        };\n        this.startSketching = () => {\n            var _a;\n            if (this.sketch) {\n                this.sketch.create((_a = this.props.stateValue[\"value\"]) === null || _a === void 0 ? void 0 : _a.geometryType);\n                if (this.state.activeView) {\n                    this.state.activeView.view.map.add(sketchLayer);\n                    this.sketch.on(\"create\", (event) => __awaiter(this, void 0, void 0, function* () {\n                        if ((event === null || event === void 0 ? void 0 : event.state) === \"complete\") {\n                            this.selectFeatureLayer(event === null || event === void 0 ? void 0 : event.graphic);\n                            this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"sketch\", false));\n                        }\n                    }));\n                    this.sketch.on(\"update\", (event) => {\n                        var _a;\n                        (_a = this.sketch) === null || _a === void 0 ? void 0 : _a.delete();\n                    });\n                }\n            }\n        };\n        this.openPopup = () => {\n            var _a, _b;\n            const popcontents = this.props.stateValue.value.popupContents;\n            if ((_b = (_a = this.state.activeView) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.popup) {\n                const popup = this.state.activeView.view.popup;\n                popup.title = popcontents === null || popcontents === void 0 ? void 0 : popcontents.title;\n                popup.content = popcontents === null || popcontents === void 0 ? void 0 : popcontents.contents;\n                try {\n                    popup.open();\n                }\n                catch (err) {\n                }\n                popup === null || popup === void 0 ? void 0 : popup.on(\"trigger-action\", (event) => {\n                    if (event.action.id === \"zoom-out\") {\n                        this.zoomOut();\n                    }\n                });\n            }\n        };\n    }\n    static mapExtraStateProps(state) {\n        return { stateValue: state.widgetsState };\n    }\n    zoomOut() {\n        var _a;\n        const view = (_a = this.state.activeView) === null || _a === void 0 ? void 0 : _a.view;\n        view.goTo({ center: view === null || view === void 0 ? void 0 : view.center, zoom: (view === null || view === void 0 ? void 0 : view.zoom) - 2 });\n    }\n    componentDidUpdate(prevProps, prevState, snapshot) {\n        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;\n        if (((_c = (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.stateValue) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.sketch) && ((_e = (_d = this.props.stateValue) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.geometryType)) {\n            this.startSketching();\n        }\n        if (((_h = (_g = (_f = this.props) === null || _f === void 0 ? void 0 : _f.stateValue) === null || _g === void 0 ? void 0 : _g.value) === null || _h === void 0 ? void 0 : _h.popup) && ((_k = (_j = this.props.stateValue) === null || _j === void 0 ? void 0 : _j.value) === null || _k === void 0 ? void 0 : _k.popupContents)) {\n            this.openPopup();\n        }\n    }\n    render() {\n        var _a, _b;\n        return (jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"div\", { className: \"widget-starter jimu-widget\" }, ((_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.useMapWidgetIds) === null || _b === void 0 ? void 0 : _b.length) > 0 &&\n            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__.JimuMapViewComponent, { useMapWidgetId: this.props.useMapWidgetIds[0], onActiveViewChange: this.getMapLayers })));\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9hZHZhbmNlZF9zZWxlY3Rpb25fbWFwX3dpZGdldC9zcmMvcnVudGltZS93aWRnZXQudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFXQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBOztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFPQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBd0JBO0FBekdBO0FBQ0E7QUFDQTtBQXdEQTs7QUFDQTtBQUNBO0FBQ0E7QUFzQkE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUlBO0FBT0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4Yi1jbGllbnQvLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9hZHZhbmNlZF9zZWxlY3Rpb25fbWFwX3dpZGdldC9zcmMvcnVudGltZS93aWRnZXQudHN4P2U5MzciXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge1JlYWN0LGpzeCxBbGxXaWRnZXRQcm9wcyxhcHBBY3Rpb25zLElNU3RhdGV9IGZyb20gJ2ppbXUtY29yZSdcbmltcG9ydCB7IEppbXVNYXBWaWV3Q29tcG9uZW50LEppbXVNYXBWaWV3LEppbXVGZWF0dXJlTGF5ZXJWaWV3fSBmcm9tICdqaW11LWFyY2dpcyc7XG5pbXBvcnQgU2tldGNoVmlld01vZGVsIGZyb20gXCJlc3JpL3dpZGdldHMvU2tldGNoL1NrZXRjaFZpZXdNb2RlbFwiO1xuaW1wb3J0IEdyYXBoaWNzTGF5ZXIgZnJvbSAnZXNyaS9sYXllcnMvR3JhcGhpY3NMYXllcic7XG5pbXBvcnQgZ2VvbWV0cnlFbmdpbmVBc3luYyBmcm9tICdlc3JpL2dlb21ldHJ5L2dlb21ldHJ5RW5naW5lQXN5bmMnXG5pbXBvcnQgaGVscGVyIGZyb20gJy4uL2hlbHBlci9oZWxwZXInXG5cbnR5cGUgc3RhdGVWYWx1ZVR5cGUgPSB7XG4gICAgc3RhdGVWYWx1ZTphbnlcbn1cblxudHlwZSBTdGF0ZVR5cGUgPSB7XG4gICAgbGF5ZXJzOmFueSxcbiAgICBhY3RpdmVWaWV3OkppbXVNYXBWaWV3XG59XG5cbmxldCAgc2tldGNoTGF5ZXIgPSBuZXcgR3JhcGhpY3NMYXllcigpXG5cbmxldCB6b29tT3V0ID0ge1xuICAgIHRpdGxlOlwiWm9vbSBPdXRcIixcbiAgICBpZDpcInpvb20tb3V0XCIsXG4gICAgY2xhc3M6XCJlc3JpLWljb24tem9vbS1vdXQtbWFnbmlmeWluZy1nbGFzc1wiXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcFZpZXdXaWRnZXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PEFsbFdpZGdldFByb3BzPGFueT4mc3RhdGVWYWx1ZVR5cGUsU3RhdGVUeXBlPntcblxuICAgIHN0YXRpYyBtYXBFeHRyYVN0YXRlUHJvcHMoc3RhdGU6SU1TdGF0ZSl7XG4gICAgICAgIHJldHVybiB7c3RhdGVWYWx1ZTpzdGF0ZS53aWRnZXRzU3RhdGV9O1xuICAgIH1cblxuICAgIHN0YXRlID0ge2xheWVyczpbXSxhY3RpdmVWaWV3Om51bGx9O1xuICAgIHNrZXRjaCA9IG51bGw7XG4gICAgbWFwTGF5ZXIgPSBudWxsO1xuICAgIGxheWVyID0gbnVsbDtcblxuICAgIGdldE1hcExheWVycyA9IChhY3RpdmVWaWV3OkppbXVNYXBWaWV3KT0+e1xuICAgICAgICBjb25zdCBuZXdMYXllcnNBcnJheSA9IE9iamVjdC5rZXlzKGFjdGl2ZVZpZXc/LmppbXVMYXllclZpZXdzKS5yZWR1Y2UoKG5ld0xheWVyQXJyYXksaXRlbSk9PntcbiAgICAgICAgICAgIGxldCBvYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgbGF5ZXJOYW1lOmFjdGl2ZVZpZXc/LmppbXVMYXllclZpZXdzW2l0ZW1dPy5sYXllcj8udGl0bGU/P2l0ZW0sXG4gICAgICAgICAgICAgICAgbGF5ZXJJZDphY3RpdmVWaWV3Py5qaW11TGF5ZXJWaWV3c1tpdGVtXT8uamltdUxheWVySWQ/P1wiIFwiLFxuICAgICAgICAgICAgICAgIGtleU5hbWU6aXRlbSxcbiAgICAgICAgICAgICAgICBpZDphY3RpdmVWaWV3Py5qaW11TGF5ZXJWaWV3c1tpdGVtXT8ubGF5ZXI/LmlkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbmV3TGF5ZXJBcnJheS5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3TGF5ZXJBcnJheTtcbiAgICAgICAgfSxbXSlcbiAgICAgICAgbmV3TGF5ZXJzQXJyYXkucmV2ZXJzZSgpXG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goYXBwQWN0aW9ucy53aWRnZXRTdGF0ZVByb3BDaGFuZ2UoXCJ2YWx1ZVwiLFwibGF5ZXJzXCIsbmV3TGF5ZXJzQXJyYXkpKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlVmlldzphY3RpdmVWaWV3fSk7XG4gICAgICAgIGxldCB2aWV3ID0gYWN0aXZlVmlldz8udmlldztcbiAgICAgICAgY29uc3Qgc2tldGNoVmlld2xNb2RlbCA9IG5ldyBTa2V0Y2hWaWV3TW9kZWwoe2xheWVyOnNrZXRjaExheWVyLHZpZXc6dmlld30pXG4gICAgICAgIHRoaXMuc2tldGNoID0gc2tldGNoVmlld2xNb2RlbDtcbiAgICAgICAgdmlldy5wb3B1cC5hY3Rpb25zLnB1c2goem9vbU91dCk7XG4gICAgfVxuXG4gICAgc2VsZWN0RmVhdHVyZUxheWVyID0gKGdlb21ldHJ5OmFueSk9PntcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlVmlldyl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmFjdGl2ZVZpZXc/LnNlbGVjdEZlYXR1cmVzQnlHcmFwaGljKGdlb21ldHJ5LFwiaW50ZXJzZWN0c1wiKS50aGVuKChyZXN1bHRzKT0+e1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkTGF5ZXJzQ29udGVudHMgPSBoZWxwZXIuZ2V0U2VsZWN0ZWRDb250ZW50c0xheWVyKHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goYXBwQWN0aW9ucy53aWRnZXRTdGF0ZVByb3BDaGFuZ2UoXCJ2YWx1ZVwiLFwibGF5ZXJDb250ZW50c1wiLHNlbGVjdGVkTGF5ZXJzQ29udGVudHMpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKT0+e30pXG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0U2tldGNoaW5nID0gKCk9PntcbiAgICAgICAgaWYgKHRoaXMuc2tldGNoKXtcbiAgICAgICAgICAgIHRoaXMuc2tldGNoLmNyZWF0ZSh0aGlzLnByb3BzLnN0YXRlVmFsdWVbXCJ2YWx1ZVwiXT8uZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZVZpZXcpe1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYWN0aXZlVmlldy52aWV3Lm1hcC5hZGQoc2tldGNoTGF5ZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2tldGNoLm9uKFwiY3JlYXRlXCIsIGFzeW5jKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudD8uc3RhdGUgPT09IFwiY29tcGxldGVcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEZlYXR1cmVMYXllcihldmVudD8uZ3JhcGhpYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGFwcEFjdGlvbnMud2lkZ2V0U3RhdGVQcm9wQ2hhbmdlKFwidmFsdWVcIixcInNrZXRjaFwiLGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNrZXRjaC5vbihcInVwZGF0ZVwiLChldmVudCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2V0Y2g/LmRlbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB6b29tT3V0KCkge1xuICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5zdGF0ZS5hY3RpdmVWaWV3Py52aWV3O1xuICAgICAgICB2aWV3LmdvVG8oe2NlbnRlcjogdmlldz8uY2VudGVyLHpvb206IHZpZXc/Lnpvb20gLSAyfSk7XG4gICAgICB9XG5cbiAgICBvcGVuUG9wdXAgPSAoKT0+e1xuICAgICAgICBjb25zdCBwb3Bjb250ZW50cyA9ICB0aGlzLnByb3BzLnN0YXRlVmFsdWUudmFsdWUucG9wdXBDb250ZW50cztcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlVmlldz8udmlldz8ucG9wdXApe1xuICAgICAgICAgICAgY29uc3QgcG9wdXAgPSB0aGlzLnN0YXRlLmFjdGl2ZVZpZXcudmlldy5wb3B1cDtcbiAgICAgICAgICAgIHBvcHVwLnRpdGxlID0gcG9wY29udGVudHM/LnRpdGxlO1xuICAgICAgICAgICAgcG9wdXAuY29udGVudCA9IHBvcGNvbnRlbnRzPy5jb250ZW50cztcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBwb3B1cC5vcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaChlcnIpe1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3B1cD8ub24oXCJ0cmlnZ2VyLWFjdGlvblwiLChldmVudCk9PntcbiAgICAgICAgICAgICAgICBpZihldmVudC5hY3Rpb24uaWQgPT09IFwiem9vbS1vdXRcIil7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuem9vbU91dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzOiBSZWFkb25seTxBbGxXaWRnZXRQcm9wczxhbnk+PiwgcHJldlN0YXRlOiBSZWFkb25seTxhbnk+LCBzbmFwc2hvdD86IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wcm9wcz8uc3RhdGVWYWx1ZT8udmFsdWU/LnNrZXRjaCAmJiB0aGlzLnByb3BzLnN0YXRlVmFsdWU/LnZhbHVlPy5nZW9tZXRyeVR5cGUpe1xuICAgICAgICAgICAgdGhpcy5zdGFydFNrZXRjaGluZygpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHM/LnN0YXRlVmFsdWU/LnZhbHVlPy5wb3B1cCAmJiB0aGlzLnByb3BzLnN0YXRlVmFsdWU/LnZhbHVlPy5wb3B1cENvbnRlbnRzKXtcbiAgICAgICAgICAgIHRoaXMub3BlblBvcHVwKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpOiBSZWFjdC5SZWFjdE5vZGUge1xuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1zdGFydGVyIGppbXUtd2lkZ2V0XCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzPy51c2VNYXBXaWRnZXRJZHM/Lmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgPEppbXVNYXBWaWV3Q29tcG9uZW50IFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlTWFwV2lkZ2V0SWQ9e3RoaXMucHJvcHMudXNlTWFwV2lkZ2V0SWRzWzBdfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25BY3RpdmVWaWV3Q2hhbmdlID0ge3RoaXMuZ2V0TWFwTGF5ZXJzfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./your-extensions/widgets/advanced_selection_map_widget/src/runtime/widget.tsx\n");

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