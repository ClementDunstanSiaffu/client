/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
System.register(["jimu-core"], function(__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {
	var __WEBPACK_EXTERNAL_MODULE_jimu_core__ = {};
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_core__, "__esModule", { value: true });
	return {
		setters: [
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_core__[key] = module[key];
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

/***/ "./your-extensions/widgets/display_geometry/src/runtime/widget.tsx":
/*!*************************************************************************!*\
  !*** ./your-extensions/widgets/display_geometry/src/runtime/widget.tsx ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DisplayGeometry)\n/* harmony export */ });\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ \"jimu-core\");\n\nclass DisplayGeometry extends jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.PureComponent {\n    static mapExtraStateProps(state) {\n        return { stateValue: state.widgetsState };\n    }\n    render() {\n        var _a, _b, _c, _d, _e, _f, _g;\n        if ((_b = (_a = this.props.stateValue) === null || _a === void 0 ? void 0 : _a[\"id\"]) === null || _b === void 0 ? void 0 : _b.displayGeomtry) {\n            return (jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"div\", { style: { width: \"100%\", height: \"100%\", position: \"absolute\", top: 0, bottom: 0 } },\n                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"div\", { style: { marginLeft: \"auto\", marginRight: \"auto\" } },\n                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"div\", { style: { fontSize: 20, color: \"grey\" } }, \"Path coordinates\"),\n                    ((_e = (_d = (_c = this.props.stateValue) === null || _c === void 0 ? void 0 : _c[\"id\"]) === null || _d === void 0 ? void 0 : _d.paths) === null || _e === void 0 ? void 0 : _e.length) > 0 ?\n                        (_g = (_f = this.props.stateValue) === null || _f === void 0 ? void 0 : _f[\"id\"]) === null || _g === void 0 ? void 0 : _g.paths.map((path) => {\n                            return (jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(\"div\", { style: { marginTop: 20, marginLeft: 20 } }, path));\n                        }) : null)));\n        }\n        return null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9kaXNwbGF5X2dlb21ldHJ5L3NyYy9ydW50aW1lL3dpZGdldC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFLQTtBQUtBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL3lvdXItZXh0ZW5zaW9ucy93aWRnZXRzL2Rpc3BsYXlfZ2VvbWV0cnkvc3JjL3J1bnRpbWUvd2lkZ2V0LnRzeD8yZDQ1Il0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtSZWFjdCxqc3gsQWxsV2lkZ2V0UHJvcHMsIGFwcEFjdGlvbnMsfSBmcm9tICdqaW11LWNvcmUnO1xuaW1wb3J0IHsgSU1TdGF0ZSB9IGZyb20gJ2ppbXUtY29yZS9saWIvdHlwZXMvc3RhdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc3BsYXlHZW9tZXRyeSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQ8QWxsV2lkZ2V0UHJvcHM8e30+JntzdGF0ZVZhbHVlOmFueX0sYW55PntcblxuICAgIHN0YXRpYyBtYXBFeHRyYVN0YXRlUHJvcHMoc3RhdGU6SU1TdGF0ZSl7XG4gICAgICAgIHJldHVybiB7c3RhdGVWYWx1ZTpzdGF0ZS53aWRnZXRzU3RhdGV9XG4gICAgfVxuXG4gICByZW5kZXIoKTogUmVhY3QuUmVhY3ROb2RlIHtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5zdGF0ZVZhbHVlPy5bXCJpZFwiXT8uZGlzcGxheUdlb210cnkpe1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6XCIxMDAlXCIsaGVpZ2h0OlwiMTAwJVwiLHBvc2l0aW9uOlwiYWJzb2x1dGVcIix0b3A6MCxib3R0b206MH19PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlID0ge3ttYXJnaW5MZWZ0OlwiYXV0b1wiLG1hcmdpblJpZ2h0OlwiYXV0b1wifX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlID0ge3tmb250U2l6ZToyMCxjb2xvcjpcImdyZXlcIn19PlBhdGggY29vcmRpbmF0ZXM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnN0YXRlVmFsdWU/LltcImlkXCJdPy5wYXRocz8ubGVuZ3RoID4gMCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zdGF0ZVZhbHVlPy5bXCJpZFwiXT8ucGF0aHMubWFwKChwYXRoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZSA9IHt7bWFyZ2luVG9wOjIwLG1hcmdpbkxlZnQ6MjB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGF0aH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk6bnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgIHJldHVybiBudWxsO1xuICAgfVxufVxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./your-extensions/widgets/display_geometry/src/runtime/widget.tsx\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./your-extensions/widgets/display_geometry/src/runtime/widget.tsx");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});