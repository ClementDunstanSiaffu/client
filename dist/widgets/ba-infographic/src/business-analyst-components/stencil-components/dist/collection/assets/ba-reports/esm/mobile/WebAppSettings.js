import{ArcGISClient}from"./ArcGISClient";var WebAppSettings=function(){function e(){}return e.getBusinessAnalystOrganizationalSettings=function(){return ArcGISClient.getPortalResource("BusinessAnalyst_Organizational_Settings.json")},e.getDisabledReports=function(){return new Promise((function(n){var t=function(e){n({}),console.log(e)};ArcGISClient.executeSelf().then((function(r){var i=r.user.roleId||r.user.role;e.getBusinessAnalystOrganizationalSettings().then((function(e){var t=e["userRoles.disabledAreas.reports"];t&&t[i]?n(t[i]):n({})})).catch(t)})).catch(t)}))},e.getUserGalleryInfographicReportIds=function(){return new Promise((function(n,t){e._searchGalleryInfographicPreferencesItem().then((function(e){if(e){var r=e.id;ArcGISClient.getItemData(r).then((function(e){n(e&&e.data&&e.data.myGalleryInfographicReportIds)})).catch((function(e){return t(e)}))}else t(null)})).catch((function(e){return t(e)}))}))},e._searchGalleryInfographicPreferencesItem=function(){return e._searchUserItem("esriFavoriteReportTemplates")},e._searchUserItem=function(e){return new Promise((function(n,t){ArcGISClient.executeSelf().then((function(r){var i=r.user.username,c={type:"Web Mapping Application",typekeywords:e,owner:i};ArcGISClient.searchItems(c,{num:1},void 0).then((function(e){n(e&&e.length&&e[0])})).catch((function(e){return t(e)}))})).catch((function(e){return t(e)}))}))},e}();export{WebAppSettings};