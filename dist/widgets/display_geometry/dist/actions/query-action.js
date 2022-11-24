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
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./your-extensions/widgets/display_geometry/src/actions/query-action.ts":
/*!******************************************************************************!*\
  !*** ./your-extensions/widgets/display_geometry/src/actions/query-action.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ QueryAction)\n/* harmony export */ });\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ \"jimu-core\");\n\nclass QueryAction extends jimu_core__WEBPACK_IMPORTED_MODULE_0__.AbstractMessageAction {\n    filterMessageDescription(messageDescription) {\n        return [jimu_core__WEBPACK_IMPORTED_MODULE_0__.MessageType.StringSelectionChange, jimu_core__WEBPACK_IMPORTED_MODULE_0__.MessageType.DataRecordsSelectionChange].indexOf(messageDescription.messageType) > -1;\n    }\n    filterMessage(message) { return true; }\n    //set action setting uri\n    getSettingComponentUri(messageType, messageWidgetId) {\n        return 'actions/query-action-setting';\n    }\n    onExecute(message, actionConfig) {\n        console.log(\"on execute action is called\", message);\n        let q = `${actionConfig.fieldName} = '${message}'`;\n        switch (message.type) {\n            case jimu_core__WEBPACK_IMPORTED_MODULE_0__.MessageType.StringSelectionChange:\n                q = `${actionConfig.fieldName} = '${message.str}'`;\n                break;\n            case jimu_core__WEBPACK_IMPORTED_MODULE_0__.MessageType.DataRecordsSelectionChange:\n                console.log(\"display widget is called yahweee\");\n                q = `${actionConfig.fieldName} = ` +\n                    `'${message.records[0].getFieldValue(actionConfig.fieldName)}'`;\n                break;\n        }\n        //Save queryString to store\n        (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.getAppStore)().dispatch(jimu_core__WEBPACK_IMPORTED_MODULE_0__.appActions.widgetStatePropChange(this.widgetId, 'queryString', q));\n        jimu_core__WEBPACK_IMPORTED_MODULE_0__.WidgetManager.getInstance().openWidget(this.widgetId);\n        return true;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9kaXNwbGF5X2dlb21ldHJ5L3NyYy9hY3Rpb25zL3F1ZXJ5LWFjdGlvbi50cy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvZGlzcGxheV9nZW9tZXRyeS9zcmMvYWN0aW9ucy9xdWVyeS1hY3Rpb24udHM/OTBlMyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7QWJzdHJhY3RNZXNzYWdlQWN0aW9uLCBNZXNzYWdlVHlwZSwgTWVzc2FnZSwgZ2V0QXBwU3RvcmUsIGFwcEFjdGlvbnMsIFN0cmluZ1NlbGVjdGlvbkNoYW5nZU1lc3NhZ2UsIERhdGFSZWNvcmRzU2VsZWN0aW9uQ2hhbmdlTWVzc2FnZSwgTWVzc2FnZURlc2NyaXB0aW9uLCBXaWRnZXRNYW5hZ2VyfSBmcm9tICdqaW11LWNvcmUnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVlcnlBY3Rpb24gZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VBY3Rpb257XG4gIFxuZmlsdGVyTWVzc2FnZURlc2NyaXB0aW9uKG1lc3NhZ2VEZXNjcmlwdGlvbjogTWVzc2FnZURlc2NyaXB0aW9uKTogYm9vbGVhbntcbiAgICByZXR1cm4gW01lc3NhZ2VUeXBlLlN0cmluZ1NlbGVjdGlvbkNoYW5nZSwgTWVzc2FnZVR5cGUuRGF0YVJlY29yZHNTZWxlY3Rpb25DaGFuZ2VdLmluZGV4T2YobWVzc2FnZURlc2NyaXB0aW9uLm1lc3NhZ2VUeXBlKSA+IC0xO1xufVxuXG5maWx0ZXJNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpOiBib29sZWFue3JldHVybiB0cnVlOyB9XG5cbi8vc2V0IGFjdGlvbiBzZXR0aW5nIHVyaVxuZ2V0U2V0dGluZ0NvbXBvbmVudFVyaShtZXNzYWdlVHlwZTogTWVzc2FnZVR5cGUsIG1lc3NhZ2VXaWRnZXRJZD86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdhY3Rpb25zL3F1ZXJ5LWFjdGlvbi1zZXR0aW5nJztcbn1cblxub25FeGVjdXRlKG1lc3NhZ2U6IE1lc3NhZ2UsIGFjdGlvbkNvbmZpZz86IGFueSk6IFByb21pc2U8Ym9vbGVhbj4gfCBib29sZWFue1xuICBjb25zb2xlLmxvZyhcIm9uIGV4ZWN1dGUgYWN0aW9uIGlzIGNhbGxlZFwiLG1lc3NhZ2UpXG4gICAgbGV0IHEgPSBgJHthY3Rpb25Db25maWcuZmllbGROYW1lfSA9ICcke21lc3NhZ2V9J2BcbiAgICBzd2l0Y2gobWVzc2FnZS50eXBlKXtcbiAgICAgIGNhc2UgTWVzc2FnZVR5cGUuU3RyaW5nU2VsZWN0aW9uQ2hhbmdlOlxuICAgICAgICBxID0gYCR7YWN0aW9uQ29uZmlnLmZpZWxkTmFtZX0gPSAnJHsobWVzc2FnZSBhcyBTdHJpbmdTZWxlY3Rpb25DaGFuZ2VNZXNzYWdlKS5zdHJ9J2BcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE1lc3NhZ2VUeXBlLkRhdGFSZWNvcmRzU2VsZWN0aW9uQ2hhbmdlOlxuICAgICAgICBjb25zb2xlLmxvZyhcImRpc3BsYXkgd2lkZ2V0IGlzIGNhbGxlZCB5YWh3ZWVlXCIpXG4gICAgICAgIHEgPSBgJHthY3Rpb25Db25maWcuZmllbGROYW1lfSA9IGAgK1xuICAgICAgICAgIGAnJHsobWVzc2FnZSBhcyBEYXRhUmVjb3Jkc1NlbGVjdGlvbkNoYW5nZU1lc3NhZ2UpLnJlY29yZHNbMF0uZ2V0RmllbGRWYWx1ZShhY3Rpb25Db25maWcuZmllbGROYW1lKX0nYFxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvL1NhdmUgcXVlcnlTdHJpbmcgdG8gc3RvcmVcbiAgICBnZXRBcHBTdG9yZSgpLmRpc3BhdGNoKGFwcEFjdGlvbnMud2lkZ2V0U3RhdGVQcm9wQ2hhbmdlKHRoaXMud2lkZ2V0SWQsICdxdWVyeVN0cmluZycsIHEpKTtcbiAgICBXaWRnZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkub3BlbldpZGdldCh0aGlzLndpZGdldElkKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./your-extensions/widgets/display_geometry/src/actions/query-action.ts\n");

/***/ }),

/***/ "jimu-core":
/*!****************************!*\
  !*** external "jimu-core" ***!
  \****************************/
/***/ ((module) => {

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./your-extensions/widgets/display_geometry/src/actions/query-action.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});