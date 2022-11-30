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

/***/ "./your-extensions/themes/demo-theme/style.ts":
/*!****************************************************!*\
  !*** ./your-extensions/themes/demo-theme/style.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Global\": () => (/* binding */ globalFonts)\n/* harmony export */ });\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ \"jimu-core\");\n\n// custom styles applied to the Button component from Jimu UI:\n// const customButtonStyles = (props) => {\n//   const theme = props.theme;\n//   const buttonType = props.type;\n//   console.log(this,props.theme.colors.primary)\n//   return css`\n//     /* make the primary button's text to be bold and has a shadow */\n//     ${buttonType === 'primary' && `\n//       font-weight: ${theme.typography.weights.bold};\n//       box-shadow: ${theme.boxShadows.default};\n//     `}\n//   `;\n// }\n// export {customButtonStyles as Button}\n// const globalCss = (props)=>{\n//   return css `\n//     body{\n//       font-size:80%;\n//       background-color:orange\n//     }\n//   `;\n// }\n// export {globalCss as Global}\nconst globalFonts = (props) => {\n    return jimu_core__WEBPACK_IMPORTED_MODULE_0__.css `\n    @import url('https://fonts.googleapis.com/css?family=Open+Sans');\n  `;\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvdGhlbWVzL2RlbW8tdGhlbWUvc3R5bGUudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4Yi1jbGllbnQvLi95b3VyLWV4dGVuc2lvbnMvdGhlbWVzL2RlbW8tdGhlbWUvc3R5bGUudHM/NTlhOSJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ2ppbXUtY29yZSc7XG5cbi8vIGN1c3RvbSBzdHlsZXMgYXBwbGllZCB0byB0aGUgQnV0dG9uIGNvbXBvbmVudCBmcm9tIEppbXUgVUk6XG4vLyBjb25zdCBjdXN0b21CdXR0b25TdHlsZXMgPSAocHJvcHMpID0+IHtcbi8vICAgY29uc3QgdGhlbWUgPSBwcm9wcy50aGVtZTtcbi8vICAgY29uc3QgYnV0dG9uVHlwZSA9IHByb3BzLnR5cGU7XG4vLyAgIGNvbnNvbGUubG9nKHRoaXMscHJvcHMudGhlbWUuY29sb3JzLnByaW1hcnkpXG4vLyAgIHJldHVybiBjc3NgXG4vLyAgICAgLyogbWFrZSB0aGUgcHJpbWFyeSBidXR0b24ncyB0ZXh0IHRvIGJlIGJvbGQgYW5kIGhhcyBhIHNoYWRvdyAqL1xuLy8gICAgICR7YnV0dG9uVHlwZSA9PT0gJ3ByaW1hcnknICYmIGBcbi8vICAgICAgIGZvbnQtd2VpZ2h0OiAke3RoZW1lLnR5cG9ncmFwaHkud2VpZ2h0cy5ib2xkfTtcbi8vICAgICAgIGJveC1zaGFkb3c6ICR7dGhlbWUuYm94U2hhZG93cy5kZWZhdWx0fTtcbi8vICAgICBgfVxuLy8gICBgO1xuLy8gfVxuXG4vLyBleHBvcnQge2N1c3RvbUJ1dHRvblN0eWxlcyBhcyBCdXR0b259XG5cbi8vIGNvbnN0IGdsb2JhbENzcyA9IChwcm9wcyk9Pntcbi8vICAgcmV0dXJuIGNzcyBgXG4vLyAgICAgYm9keXtcbi8vICAgICAgIGZvbnQtc2l6ZTo4MCU7XG4vLyAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOm9yYW5nZVxuLy8gICAgIH1cbi8vICAgYDtcbi8vIH1cblxuLy8gZXhwb3J0IHtnbG9iYWxDc3MgYXMgR2xvYmFsfVxuXG5jb25zdCBnbG9iYWxGb250cyA9IChwcm9wcyk9PntcbiAgcmV0dXJuIGNzcyBgXG4gICAgQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnMnKTtcbiAgYFxufVxuXG5leHBvcnQge2dsb2JhbEZvbnRzIGFzIEdsb2JhbH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./your-extensions/themes/demo-theme/style.ts\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./your-extensions/themes/demo-theme/style.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});