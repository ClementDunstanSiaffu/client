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

/***/ "./your-extensions/widgets/display_geometry/src/actions/query-action-setting.tsx":
/*!***************************************************************************************!*\
  !*** ./your-extensions/widgets/display_geometry/src/actions/query-action-setting.tsx ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ \"jimu-core\");\n\nclass QueryActionSetting extends jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.PureComponent {\n    constructor() {\n        super(...arguments);\n        /**\n         * Returns the init config.The config contains the useDataSource attribute.\n         * Gets the value of useDataSource: Returns its DataSource if it has been specified.\n         * If not, specify the useDataSource that is already selected in the publish widget.\n        */\n        this.getInitConfig = () => {\n            const messageWidgetId = this.props.messageWidgetId;\n            const config = (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.getAppStore)().getState().appStateInBuilder.appConfig;\n            const messageWidgetJson = config.widgets[messageWidgetId];\n            let useDataSource = null;\n            if (!this.props.config.useDataSource) {\n                if (messageWidgetJson && messageWidgetJson.useDataSources && messageWidgetJson.useDataSources[0] && messageWidgetJson.useDataSources.length === 1) {\n                    useDataSource = (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.Immutable)({\n                        dataSourceId: messageWidgetJson.useDataSources[0].dataSourceId,\n                        mainDataSourceId: messageWidgetJson.useDataSources[0].mainDataSourceId,\n                        dataViewId: messageWidgetJson.useDataSources[0].dataViewId,\n                        rootDataSourceId: messageWidgetJson.useDataSources[0].rootDataSourceId\n                    });\n                }\n            }\n            else {\n                useDataSource = this.props.config.useDataSource;\n            }\n            return {\n                useDataSource: useDataSource\n            };\n        };\n    }\n    componentDidMount() {\n        const initConfig = this.getInitConfig();\n        this.props.onSettingChange({\n            actionId: this.props.actionId,\n            config: this.props.config.set('useDataSource', initConfig.useDataSource)\n        });\n    }\n    /**\n     * Get the selected DataSource from subscribe-widget through widgetId.\n     *\n     * @param widgetId The id of the widget that listens to for the message.\n    */\n    //   getDsSelectorSourceData = (widgetId: string) => {\n    //     const appConfig = getAppStore().getState()?.appStateInBuilder?.appConfig;\n    //     const widgetJson = appConfig?.widgets?.[widgetId];\n    //     const dsSelectorSource = widgetJson && widgetJson.useDataSources;\n    //     return dsSelectorSource;\n    //   }\n    /**\n     * Select the fields to query in subscribe-widget.\n    */\n    //   onFieldSelected = (allSelectedFields: IMFieldSchema[], ds: DataSource) => {\n    //     const field = allSelectedFields[0];\n    //     if(!field){\n    //       return;\n    //     }\n    //     if (this.props.config.useDataSource) {\n    //       //Save the message action configuration to config\n    //       this.props.onSettingChange({\n    //         actionId: this.props.actionId,\n    //         config: this.props.config.set('fieldName', field['name']).set('useDataSource',{\n    //           dataSourceId: this.props.config.useDataSource.dataSourceId,\n    //           mainDataSourceId: this.props.config.useDataSource.mainDataSourceId,\n    //           dataViewId: this.props.config.useDataSource.dataViewId,\n    //           rootDataSourceId: this.props.config.useDataSource.rootDataSourceId,\n    //           fields: allSelectedFields.map(f => f.jimuName)\n    //         })\n    //       });\n    //     }\n    //   }\n    render() {\n        return null;\n        // const useDataSources = this.getDsSelectorSourceData(this.props.widgetId);\n        // return <div>\n        //   <SettingSection title=\"Select field\">\n        //     {\n        //       useDataSources && useDataSources.length > 0 &&\n        //       <div className=\"mt-2\">Please choose a Field to query:\n        //         <FieldSelector\n        //           useDataSources={useDataSources}\n        //           onChange={this.onFieldSelected}\n        //           selectedFields={this.props.config.useDataSource && this.props.config.useDataSource.fields\n        //             ? this.props.config.useDataSource.fields : Immutable([])}\n        //         />\n        //       </div>\n        //     }\n        //   </SettingSection>\n        // </div>;\n    }\n}\nQueryActionSetting.defaultProps = {\n    config: (0,jimu_core__WEBPACK_IMPORTED_MODULE_0__.Immutable)({\n        useDataSource: null\n    })\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QueryActionSetting);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9kaXNwbGF5X2dlb21ldHJ5L3NyYy9hY3Rpb25zL3F1ZXJ5LWFjdGlvbi1zZXR0aW5nLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUNBO0FBWUE7QUFBQTs7QUFRQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFpRUE7QUEvREE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWpHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZ0dBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL3lvdXItZXh0ZW5zaW9ucy93aWRnZXRzL2Rpc3BsYXlfZ2VvbWV0cnkvc3JjL2FjdGlvbnMvcXVlcnktYWN0aW9uLXNldHRpbmcudHN4P2JhMjYiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge1JlYWN0LCBqc3gsIEFjdGlvblNldHRpbmdQcm9wcywgSW1tdXRhYmxlT2JqZWN0LCBJTUZpZWxkU2NoZW1hLCBnZXRBcHBTdG9yZSwgSW1tdXRhYmxlLCBVc2VEYXRhU291cmNlLCBJTVVzZURhdGFTb3VyY2UsIERhdGFTb3VyY2V9IGZyb20gJ2ppbXUtY29yZSc7XG5pbXBvcnQge0ZpZWxkU2VsZWN0b3J9IGZyb20gJ2ppbXUtdWkvYWR2YW5jZWQvZGF0YS1zb3VyY2Utc2VsZWN0b3InO1xuaW1wb3J0IHtTZXR0aW5nU2VjdGlvbn0gZnJvbSAnamltdS11aS9hZHZhbmNlZC9zZXR0aW5nLWNvbXBvbmVudHMnO1xuXG5pbnRlcmZhY2UgU3RhdGVzIHt9XG5cbmludGVyZmFjZSBDb25maWcge1xuICB1c2VEYXRhU291cmNlOiBVc2VEYXRhU291cmNlO1xufVxuXG5leHBvcnQgdHlwZSBJTUNvbmZpZyA9IEltbXV0YWJsZU9iamVjdDxDb25maWc+O1xuXG5jbGFzcyBRdWVyeUFjdGlvblNldHRpbmcgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PEFjdGlvblNldHRpbmdQcm9wczxJTUNvbmZpZz4sIFN0YXRlcz57XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjb25maWc6IEltbXV0YWJsZSh7XG4gICAgICB1c2VEYXRhU291cmNlOiBudWxsXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpbml0IGNvbmZpZy5UaGUgY29uZmlnIGNvbnRhaW5zIHRoZSB1c2VEYXRhU291cmNlIGF0dHJpYnV0ZS5cbiAgICogR2V0cyB0aGUgdmFsdWUgb2YgdXNlRGF0YVNvdXJjZTogUmV0dXJucyBpdHMgRGF0YVNvdXJjZSBpZiBpdCBoYXMgYmVlbiBzcGVjaWZpZWQuXG4gICAqIElmIG5vdCwgc3BlY2lmeSB0aGUgdXNlRGF0YVNvdXJjZSB0aGF0IGlzIGFscmVhZHkgc2VsZWN0ZWQgaW4gdGhlIHB1Ymxpc2ggd2lkZ2V0LlxuICAqL1xuICBnZXRJbml0Q29uZmlnID0gKCkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VXaWRnZXRJZCA9IHRoaXMucHJvcHMubWVzc2FnZVdpZGdldElkO1xuICAgIGNvbnN0IGNvbmZpZyA9IGdldEFwcFN0b3JlKCkuZ2V0U3RhdGUoKS5hcHBTdGF0ZUluQnVpbGRlci5hcHBDb25maWc7XG4gICAgY29uc3QgbWVzc2FnZVdpZGdldEpzb24gPSBjb25maWcud2lkZ2V0c1ttZXNzYWdlV2lkZ2V0SWRdO1xuXG4gICAgbGV0IHVzZURhdGFTb3VyY2U6IElNVXNlRGF0YVNvdXJjZSA9IG51bGw7XG4gICAgaWYgKCF0aGlzLnByb3BzLmNvbmZpZy51c2VEYXRhU291cmNlKSB7XG4gICAgICBpZiAobWVzc2FnZVdpZGdldEpzb24gJiYgbWVzc2FnZVdpZGdldEpzb24udXNlRGF0YVNvdXJjZXMgJiYgbWVzc2FnZVdpZGdldEpzb24udXNlRGF0YVNvdXJjZXNbMF0gJiYgbWVzc2FnZVdpZGdldEpzb24udXNlRGF0YVNvdXJjZXMubGVuZ3RoID09PSAxICkge1xuICAgICAgICB1c2VEYXRhU291cmNlID0gSW1tdXRhYmxlKHtcbiAgICAgICAgICBkYXRhU291cmNlSWQ6IG1lc3NhZ2VXaWRnZXRKc29uLnVzZURhdGFTb3VyY2VzWzBdLmRhdGFTb3VyY2VJZCxcbiAgICAgICAgICBtYWluRGF0YVNvdXJjZUlkOiBtZXNzYWdlV2lkZ2V0SnNvbi51c2VEYXRhU291cmNlc1swXS5tYWluRGF0YVNvdXJjZUlkLFxuICAgICAgICAgIGRhdGFWaWV3SWQ6IG1lc3NhZ2VXaWRnZXRKc29uLnVzZURhdGFTb3VyY2VzWzBdLmRhdGFWaWV3SWQsXG4gICAgICAgICAgcm9vdERhdGFTb3VyY2VJZDogbWVzc2FnZVdpZGdldEpzb24udXNlRGF0YVNvdXJjZXNbMF0ucm9vdERhdGFTb3VyY2VJZFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdXNlRGF0YVNvdXJjZSA9IHRoaXMucHJvcHMuY29uZmlnLnVzZURhdGFTb3VyY2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZURhdGFTb3VyY2U6IHVzZURhdGFTb3VyY2VcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBpbml0Q29uZmlnID0gdGhpcy5nZXRJbml0Q29uZmlnKCk7XG5cbiAgICB0aGlzLnByb3BzLm9uU2V0dGluZ0NoYW5nZSh7XG4gICAgICBhY3Rpb25JZDogdGhpcy5wcm9wcy5hY3Rpb25JZCxcbiAgICAgIGNvbmZpZzogdGhpcy5wcm9wcy5jb25maWcuc2V0KCd1c2VEYXRhU291cmNlJywgaW5pdENvbmZpZy51c2VEYXRhU291cmNlKVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc2VsZWN0ZWQgRGF0YVNvdXJjZSBmcm9tIHN1YnNjcmliZS13aWRnZXQgdGhyb3VnaCB3aWRnZXRJZC5cbiAgICpcbiAgICogQHBhcmFtIHdpZGdldElkIFRoZSBpZCBvZiB0aGUgd2lkZ2V0IHRoYXQgbGlzdGVucyB0byBmb3IgdGhlIG1lc3NhZ2UuXG4gICovXG4vLyAgIGdldERzU2VsZWN0b3JTb3VyY2VEYXRhID0gKHdpZGdldElkOiBzdHJpbmcpID0+IHtcbi8vICAgICBjb25zdCBhcHBDb25maWcgPSBnZXRBcHBTdG9yZSgpLmdldFN0YXRlKCk/LmFwcFN0YXRlSW5CdWlsZGVyPy5hcHBDb25maWc7XG4vLyAgICAgY29uc3Qgd2lkZ2V0SnNvbiA9IGFwcENvbmZpZz8ud2lkZ2V0cz8uW3dpZGdldElkXTtcbi8vICAgICBjb25zdCBkc1NlbGVjdG9yU291cmNlID0gd2lkZ2V0SnNvbiAmJiB3aWRnZXRKc29uLnVzZURhdGFTb3VyY2VzO1xuLy8gICAgIHJldHVybiBkc1NlbGVjdG9yU291cmNlO1xuLy8gICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCB0aGUgZmllbGRzIHRvIHF1ZXJ5IGluIHN1YnNjcmliZS13aWRnZXQuXG4gICovXG4vLyAgIG9uRmllbGRTZWxlY3RlZCA9IChhbGxTZWxlY3RlZEZpZWxkczogSU1GaWVsZFNjaGVtYVtdLCBkczogRGF0YVNvdXJjZSkgPT4ge1xuLy8gICAgIGNvbnN0IGZpZWxkID0gYWxsU2VsZWN0ZWRGaWVsZHNbMF07XG4vLyAgICAgaWYoIWZpZWxkKXtcbi8vICAgICAgIHJldHVybjtcbi8vICAgICB9XG4vLyAgICAgaWYgKHRoaXMucHJvcHMuY29uZmlnLnVzZURhdGFTb3VyY2UpIHtcbi8vICAgICAgIC8vU2F2ZSB0aGUgbWVzc2FnZSBhY3Rpb24gY29uZmlndXJhdGlvbiB0byBjb25maWdcbi8vICAgICAgIHRoaXMucHJvcHMub25TZXR0aW5nQ2hhbmdlKHtcbi8vICAgICAgICAgYWN0aW9uSWQ6IHRoaXMucHJvcHMuYWN0aW9uSWQsXG4vLyAgICAgICAgIGNvbmZpZzogdGhpcy5wcm9wcy5jb25maWcuc2V0KCdmaWVsZE5hbWUnLCBmaWVsZFsnbmFtZSddKS5zZXQoJ3VzZURhdGFTb3VyY2UnLHtcbi8vICAgICAgICAgICBkYXRhU291cmNlSWQ6IHRoaXMucHJvcHMuY29uZmlnLnVzZURhdGFTb3VyY2UuZGF0YVNvdXJjZUlkLFxuLy8gICAgICAgICAgIG1haW5EYXRhU291cmNlSWQ6IHRoaXMucHJvcHMuY29uZmlnLnVzZURhdGFTb3VyY2UubWFpbkRhdGFTb3VyY2VJZCxcbi8vICAgICAgICAgICBkYXRhVmlld0lkOiB0aGlzLnByb3BzLmNvbmZpZy51c2VEYXRhU291cmNlLmRhdGFWaWV3SWQsXG4vLyAgICAgICAgICAgcm9vdERhdGFTb3VyY2VJZDogdGhpcy5wcm9wcy5jb25maWcudXNlRGF0YVNvdXJjZS5yb290RGF0YVNvdXJjZUlkLFxuLy8gICAgICAgICAgIGZpZWxkczogYWxsU2VsZWN0ZWRGaWVsZHMubWFwKGYgPT4gZi5qaW11TmFtZSlcbi8vICAgICAgICAgfSlcbi8vICAgICAgIH0pO1xuLy8gICAgIH1cbi8vICAgfVxuXG4gIHJlbmRlcigpe1xuICAgIHJldHVybiBudWxsO1xuICAgIC8vIGNvbnN0IHVzZURhdGFTb3VyY2VzID0gdGhpcy5nZXREc1NlbGVjdG9yU291cmNlRGF0YSh0aGlzLnByb3BzLndpZGdldElkKTtcbiAgICAvLyByZXR1cm4gPGRpdj5cbiAgICAvLyAgIDxTZXR0aW5nU2VjdGlvbiB0aXRsZT1cIlNlbGVjdCBmaWVsZFwiPlxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgdXNlRGF0YVNvdXJjZXMgJiYgdXNlRGF0YVNvdXJjZXMubGVuZ3RoID4gMCAmJlxuICAgIC8vICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMlwiPlBsZWFzZSBjaG9vc2UgYSBGaWVsZCB0byBxdWVyeTpcbiAgICAvLyAgICAgICAgIDxGaWVsZFNlbGVjdG9yXG4gICAgLy8gICAgICAgICAgIHVzZURhdGFTb3VyY2VzPXt1c2VEYXRhU291cmNlc31cbiAgICAvLyAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25GaWVsZFNlbGVjdGVkfVxuICAgIC8vICAgICAgICAgICBzZWxlY3RlZEZpZWxkcz17dGhpcy5wcm9wcy5jb25maWcudXNlRGF0YVNvdXJjZSAmJiB0aGlzLnByb3BzLmNvbmZpZy51c2VEYXRhU291cmNlLmZpZWxkc1xuICAgIC8vICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5jb25maWcudXNlRGF0YVNvdXJjZS5maWVsZHMgOiBJbW11dGFibGUoW10pfVxuICAgIC8vICAgICAgICAgLz5cbiAgICAvLyAgICAgICA8L2Rpdj5cbiAgICAvLyAgICAgfVxuICAgIC8vICAgPC9TZXR0aW5nU2VjdGlvbj5cbiAgICAvLyA8L2Rpdj47XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUXVlcnlBY3Rpb25TZXR0aW5nOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./your-extensions/widgets/display_geometry/src/actions/query-action-setting.tsx\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./your-extensions/widgets/display_geometry/src/actions/query-action-setting.tsx");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});