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

/***/ "./your-extensions/widgets/advanced_selection_map_widget/src/runtime/widget.tsx":
/*!**************************************************************************************!*\
  !*** ./your-extensions/widgets/advanced_selection_map_widget/src/runtime/widget.tsx ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MapViewWidget)\n/* harmony export */ });\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ \"jimu-core\");\n/* harmony import */ var jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jimu-arcgis */ \"jimu-arcgis\");\n/* harmony import */ var esri_widgets_Sketch_SketchViewModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! esri/widgets/Sketch/SketchViewModel */ \"esri/widgets/Sketch/SketchViewModel\");\n/* harmony import */ var esri_layers_GraphicsLayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! esri/layers/GraphicsLayer */ \"esri/layers/GraphicsLayer\");\n\n\n\n\nconst sketchLayer = new esri_layers_GraphicsLayer__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\nclass MapViewWidget extends jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.PureComponent {\n    constructor() {\n        super(...arguments);\n        this.state = { layers: [], activeView: null };\n        this.sketch = null;\n        this.getMapLayers = (activeView) => {\n            let lastView = null;\n            const newLayersArray = Object.keys(activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews).reduce((newLayerArray, item) => {\n                var _a, _b, _c, _d, _e, _f;\n                let object = {\n                    layerName: (_c = (_b = (_a = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : item,\n                    layerId: (_e = (_d = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _d === void 0 ? void 0 : _d.jimuLayerId) !== null && _e !== void 0 ? _e : \" \",\n                    keyName: item\n                };\n                newLayerArray.push(object);\n                lastView = (_f = activeView === null || activeView === void 0 ? void 0 : activeView.jimuLayerViews[item]) === null || _f === void 0 ? void 0 : _f.view;\n                return newLayerArray;\n            }, []);\n            this.props.dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(\"value\", \"layers\", newLayersArray));\n            this.setState({ activeView: activeView });\n            let view = activeView === null || activeView === void 0 ? void 0 : activeView.view;\n            const sketchViewlModel = new esri_widgets_Sketch_SketchViewModel__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n                layer: sketchLayer,\n                view: view\n            });\n            this.sketch = sketchViewlModel;\n            // sketchViewlModel.on(\"create\", (event) => {\n            //     console.log(\"is it called\")\n            //     if (event.state === \"complete\") {\n            //     }\n            // });\n            // const startSketching = (geometryType:any)=>{\n            //     console.log(sketchViewlModel,geometryType,\"check geometry type\")\n            //     sketchViewlModel.create(geometryType)\n            // }\n            // this.props.dispatch(appActions.widgetStatePropChange(\"value\",\"sketch\",startSketching))\n        };\n    }\n    static mapExtraStateProps(state) {\n        return { stateValue: state.widgetsState };\n    }\n    componentDidUpdate(prevProps, prevState, snapshot) {\n        var _a, _b, _c, _d;\n        if (((_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.stateValue[\"value\"]) === null || _b === void 0 ? void 0 : _b.sketch) && ((_c = this.props.stateValue[\"value\"]) === null || _c === void 0 ? void 0 : _c.geometryType)) {\n            if (this.sketch) {\n                this.sketch.create((_d = this.props.stateValue[\"value\"]) === null || _d === void 0 ? void 0 : _d.geometryType);\n                if (this.state.activeView) {\n                    this.state.activeView.view.map.add(sketchLayer);\n                    this.sketch.on(\"create\", (event) => {\n                        console.log(event, \"check event\");\n                    });\n                }\n            }\n        }\n    }\n    render() {\n        var _a, _b;\n        return (jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"div\", { className: \"widget-starter jimu-widget\" }, ((_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.useMapWidgetIds) === null || _b === void 0 ? void 0 : _b.length) > 0 &&\n            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__.JimuMapViewComponent, { useMapWidgetId: this.props.useMapWidgetIds[0], onActiveViewChange: this.getMapLayers })));\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9hZHZhbmNlZF9zZWxlY3Rpb25fbWFwX3dpZGdldC9zcmMvcnVudGltZS93aWRnZXQudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQTtBQUVBO0FBQUE7O0FBTUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQThCQTtBQXhFQTtBQUNBO0FBQ0E7QUEwQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7O0FBQ0E7QUFJQTtBQU9BO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvYWR2YW5jZWRfc2VsZWN0aW9uX21hcF93aWRnZXQvc3JjL3J1bnRpbWUvd2lkZ2V0LnRzeD9lOTM3Il0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtSZWFjdCxqc3gsQWxsV2lkZ2V0UHJvcHMsYXBwQWN0aW9ucyxJTVN0YXRlfSBmcm9tICdqaW11LWNvcmUnXG5pbXBvcnQgeyBKaW11TWFwVmlld0NvbXBvbmVudCxKaW11TWFwVmlldyB9IGZyb20gJ2ppbXUtYXJjZ2lzJztcbmltcG9ydCBTa2V0Y2hWaWV3TW9kZWwgZnJvbSBcImVzcmkvd2lkZ2V0cy9Ta2V0Y2gvU2tldGNoVmlld01vZGVsXCI7XG5pbXBvcnQgR3JhcGhpY3NMYXllciBmcm9tICdlc3JpL2xheWVycy9HcmFwaGljc0xheWVyJztcbmltcG9ydCBNYXBWaWV3IGZyb20gXCJAYXJjZ2lzL2NvcmUvdmlld3MvTWFwVmlld1wiO1xuXG5cbnR5cGUgc3RhdGVWYWx1ZVR5cGUgPSB7XG4gICAgc3RhdGVWYWx1ZTphbnlcbn1cblxuY29uc3QgIHNrZXRjaExheWVyID0gbmV3IEdyYXBoaWNzTGF5ZXIoKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXBWaWV3V2lkZ2V0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudDxBbGxXaWRnZXRQcm9wczxhbnk+JnN0YXRlVmFsdWVUeXBlLGFueT57XG5cbiAgICBzdGF0aWMgbWFwRXh0cmFTdGF0ZVByb3BzKHN0YXRlOklNU3RhdGUpe1xuICAgICAgICByZXR1cm4ge3N0YXRlVmFsdWU6c3RhdGUud2lkZ2V0c1N0YXRlfTtcbiAgICB9XG5cbiAgICBzdGF0ZSA9IHtsYXllcnM6W10sYWN0aXZlVmlldzpudWxsfTtcbiAgICBza2V0Y2ggPSBudWxsO1xuXG5cbiAgICBnZXRNYXBMYXllcnMgPSAoYWN0aXZlVmlldzpKaW11TWFwVmlldyk9PntcbiAgICAgICAgbGV0IGxhc3RWaWV3ID0gbnVsbDtcbiAgICAgICAgY29uc3QgbmV3TGF5ZXJzQXJyYXkgPSBPYmplY3Qua2V5cyhhY3RpdmVWaWV3Py5qaW11TGF5ZXJWaWV3cykucmVkdWNlKChuZXdMYXllckFycmF5LGl0ZW0pPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyTmFtZTphY3RpdmVWaWV3Py5qaW11TGF5ZXJWaWV3c1tpdGVtXT8ubGF5ZXI/LnRpdGxlPz9pdGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVySWQ6YWN0aXZlVmlldz8uamltdUxheWVyVmlld3NbaXRlbV0/LmppbXVMYXllcklkPz9cIiBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlOYW1lOml0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdMYXllckFycmF5LnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RWaWV3ID0gYWN0aXZlVmlldz8uamltdUxheWVyVmlld3NbaXRlbV0/LnZpZXc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3TGF5ZXJBcnJheTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxbXSlcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChhcHBBY3Rpb25zLndpZGdldFN0YXRlUHJvcENoYW5nZShcInZhbHVlXCIsXCJsYXllcnNcIixuZXdMYXllcnNBcnJheSkpO1xuICBcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmVWaWV3OmFjdGl2ZVZpZXd9KTtcbiAgICAgICAgbGV0IHZpZXcgPSBhY3RpdmVWaWV3Py52aWV3O1xuICAgICAgICBjb25zdCBza2V0Y2hWaWV3bE1vZGVsID0gbmV3IFNrZXRjaFZpZXdNb2RlbCh7XG4gICAgICAgICAgICBsYXllcjpza2V0Y2hMYXllcixcbiAgICAgICAgICAgIHZpZXc6dmlld1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLnNrZXRjaCA9IHNrZXRjaFZpZXdsTW9kZWw7XG4gICAgICAgIC8vIHNrZXRjaFZpZXdsTW9kZWwub24oXCJjcmVhdGVcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcImlzIGl0IGNhbGxlZFwiKVxuICAgICAgICAvLyAgICAgaWYgKGV2ZW50LnN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIGNvbnN0IHN0YXJ0U2tldGNoaW5nID0gKGdlb21ldHJ5VHlwZTphbnkpPT57XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhza2V0Y2hWaWV3bE1vZGVsLGdlb21ldHJ5VHlwZSxcImNoZWNrIGdlb21ldHJ5IHR5cGVcIilcbiAgICAgICAgLy8gICAgIHNrZXRjaFZpZXdsTW9kZWwuY3JlYXRlKGdlb21ldHJ5VHlwZSlcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB0aGlzLnByb3BzLmRpc3BhdGNoKGFwcEFjdGlvbnMud2lkZ2V0U3RhdGVQcm9wQ2hhbmdlKFwidmFsdWVcIixcInNrZXRjaFwiLHN0YXJ0U2tldGNoaW5nKSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzOiBSZWFkb25seTxBbGxXaWRnZXRQcm9wczxhbnk+PiwgcHJldlN0YXRlOiBSZWFkb25seTxhbnk+LCBzbmFwc2hvdD86IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wcm9wcz8uc3RhdGVWYWx1ZVtcInZhbHVlXCJdPy5za2V0Y2ggJiYgdGhpcy5wcm9wcy5zdGF0ZVZhbHVlW1widmFsdWVcIl0/Lmdlb21ldHJ5VHlwZSl7XG4gICAgICAgICAgICBpZiAodGhpcy5za2V0Y2gpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2tldGNoLmNyZWF0ZSh0aGlzLnByb3BzLnN0YXRlVmFsdWVbXCJ2YWx1ZVwiXT8uZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVWaWV3KXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5hY3RpdmVWaWV3LnZpZXcubWFwLmFkZChza2V0Y2hMYXllcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tldGNoLm9uKFwiY3JlYXRlXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQsXCJjaGVjayBldmVudFwiKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHJlbmRlcigpOiBSZWFjdC5SZWFjdE5vZGUge1xuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1zdGFydGVyIGppbXUtd2lkZ2V0XCI+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzPy51c2VNYXBXaWRnZXRJZHM/Lmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgPEppbXVNYXBWaWV3Q29tcG9uZW50IFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlTWFwV2lkZ2V0SWQ9e3RoaXMucHJvcHMudXNlTWFwV2lkZ2V0SWRzWzBdfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25BY3RpdmVWaWV3Q2hhbmdlID0ge3RoaXMuZ2V0TWFwTGF5ZXJzfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./your-extensions/widgets/advanced_selection_map_widget/src/runtime/widget.tsx\n");

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