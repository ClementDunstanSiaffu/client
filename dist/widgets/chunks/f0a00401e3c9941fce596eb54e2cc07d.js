"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkexb_client"] = self["webpackChunkexb_client"] || []).push([["node_modules_arcgis_core_chunks_it_IT_js"],{

/***/ "./node_modules/@arcgis/core/chunks/it_IT.js":
/*!***************************************************!*\
  !*** ./node_modules/@arcgis/core/chunks/it_IT.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"i\": () => (/* binding */ _)\n/* harmony export */ });\n/* harmony import */ var _commonjsHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_commonjsHelpers.js */ \"./node_modules/@arcgis/core/chunks/_commonjsHelpers.js\");\n/*\nAll material copyright ESRI, All Rights Reserved, unless otherwise specified.\nSee https://js.arcgis.com/4.25/esri/copyright.txt for details.\n*/\nfunction a(e,r){for(var a=0;a<r.length;a++){const i=r[a];if(\"string\"!=typeof i&&!Array.isArray(i))for(const r in i)if(\"default\"!==r&&!(r in e)){const a=Object.getOwnPropertyDescriptor(i,r);a&&Object.defineProperty(e,r,a.get?a:{enumerable:!0,get:()=>i[r]})}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}))}var i,o,t,s,n={exports:{}};i=n,o=n.exports,t=function(e,r){Object.defineProperty(r,\"__esModule\",{value:!0}),r.default={_decimalSeparator:\",\",_thousandSeparator:\".\",_percentPrefix:null,_percentSuffix:\"%\",_big_number_suffix_3:\"k\",_big_number_suffix_6:\"M\",_big_number_suffix_9:\"G\",_big_number_suffix_12:\"T\",_big_number_suffix_15:\"P\",_big_number_suffix_18:\"E\",_big_number_suffix_21:\"Z\",_big_number_suffix_24:\"Y\",_small_number_suffix_3:\"m\",_small_number_suffix_6:\"μ\",_small_number_suffix_9:\"n\",_small_number_suffix_12:\"p\",_small_number_suffix_15:\"f\",_small_number_suffix_18:\"a\",_small_number_suffix_21:\"z\",_small_number_suffix_24:\"y\",_byte_suffix_B:\"B\",_byte_suffix_KB:\"KB\",_byte_suffix_MB:\"MB\",_byte_suffix_GB:\"GB\",_byte_suffix_TB:\"TB\",_byte_suffix_PB:\"PB\",_date_millisecond:\"mm:ss SSS\",_date_second:\"HH:mm:ss\",_date_minute:\"HH:mm\",_date_hour:\"HH:mm\",_date_day:\"dd MMM\",_date_week:\"ww\",_date_month:\"MMM\",_date_year:\"yyyy\",_duration_millisecond:\"SSS\",_duration_millisecond_second:\"ss.SSS\",_duration_millisecond_minute:\"mm:ss SSS\",_duration_millisecond_hour:\"HH:mm:ss SSS\",_duration_millisecond_day:\"d'g' mm:ss SSS\",_duration_millisecond_week:\"d'g' mm:ss SSS\",_duration_millisecond_month:\"M'm' dd'g' mm:ss SSS\",_duration_millisecond_year:\"y'a' MM'm' dd'g' mm:ss SSS\",_duration_second:\"ss\",_duration_second_minute:\"mm:ss\",_duration_second_hour:\"hh:mm:ss\",_duration_second_day:\"d'g' hh:mm:ss\",_duration_second_week:\"d'g' hh:mm:ss\",_duration_second_month:\"M'm' dd'g' hh:mm:ss\",_duration_second_year:\"y'a' MM'm' dd'g' hh:mm:ss\",_duration_minute:\"mm\",_duration_minute_hour:\"hh:mm\",_duration_minute_day:\"d'g' hh:mm\",_duration_minute_week:\"d'g' hh:mm\",_duration_minute_month:\"M'm' dd'g' hh:mm\",_duration_minute_year:\"y'a' MM'm' dd'g' hh:mm\",_duration_hour:\"hh'o'\",_duration_hour_day:\"d'g' hh'o'\",_duration_hour_week:\"d'g' hh'o'\",_duration_hour_month:\"M'm' dd'g' hh'o'\",_duration_hour_year:\"y'a' MM'm' dd'g' hh'o'\",_duration_day:\"d'g'\",_duration_day_week:\"d'g'\",_duration_day_month:\"M'm' dd'g'\",_duration_day_year:\"y'a' MM'm' dd'g'\",_duration_week:\"w's'\",_duration_week_month:\"w's'\",_duration_week_year:\"w's'\",_duration_month:\"M'm'\",_duration_month_year:\"y'a' MM'm'\",_duration_year:\"y'a'\",_era_ad:\"A.C.\",_era_bc:\"D.C.\",A:\"\",P:\"\",AM:\"\",PM:\"\",\"A.M.\":\"\",\"P.M.\":\"\",January:\"Gennaio\",February:\"Febbraio\",March:\"Marzo\",April:\"Aprile\",May:\"Maggio\",June:\"Giugno\",July:\"Luglio\",August:\"Agosto\",September:\"Settembre\",October:\"Ottobre\",November:\"Novembre\",December:\"Dicembre\",Jan:\"Gen\",Feb:\"Feb\",Mar:\"Mar\",Apr:\"Apr\",\"May(short)\":\"Mag\",Jun:\"Giu\",Jul:\"Lug\",Aug:\"Ago\",Sep:\"Set\",Oct:\"Ott\",Nov:\"Nov\",Dec:\"Dic\",Sunday:\"Domenica\",Monday:\"Lunedì\",Tuesday:\"Martedì\",Wednesday:\"Mercoledì\",Thursday:\"Giovedì\",Friday:\"Venerdì\",Saturday:\"Sabato\",Sun:\"Dom\",Mon:\"Lun\",Tue:\"Mar\",Wed:\"Mer\",Thu:\"Gio\",Fri:\"Ven\",Sat:\"Sab\",_dateOrd:function(e){return e+\"°\"},\"Zoom Out\":\"Riduci zoom\",Play:\"Avvia\",Stop:\"Ferma\",Legend:\"Legenda\",\"Click, tap or press ENTER to toggle\":\"Clicca, tappa o premi ENTER per attivare\",Loading:\"Caricamento\",Home:\"Home\",Chart:\"Grafico\",\"Serial chart\":\"Grafico combinato\",\"X/Y chart\":\"Grafico X/Y\",\"Pie chart\":\"Grafico a torta\",\"Gauge chart\":\"Diagramma di livello\",\"Radar chart\":\"Grafico radar\",\"Sankey diagram\":\"Diagramma di Sankey\",\"Flow diagram\":\"Diagramma di flusso\",\"Chord diagram\":\"Diagramma a corda\",\"TreeMap chart\":\"Mappa ad albero\",\"Sliced chart\":\"Grafico a fette\",Series:\"Serie\",\"Candlestick Series\":\"Serie a candele\",\"OHLC Series\":\"Serie OHLC\",\"Column Series\":\"Serie a colonne\",\"Line Series\":\"Serie a linee\",\"Pie Slice Series\":\"Serie a fetta di torta\",\"Funnel Series\":\"Serie ad imbuto\",\"Pyramid Series\":\"Serie a piramide\",\"X/Y Series\":\"Serie X/Y\",Map:\"Mappa\",\"Press ENTER to zoom in\":\"Premi ENTER per ingrandire\",\"Press ENTER to zoom out\":\"Premi ENTER per ridurre\",\"Use arrow keys to zoom in and out\":\"Usa le frecce per ingrandire e ridurre\",\"Use plus and minus keys on your keyboard to zoom in and out\":\"Utilizza i tasti più e meno sulla tastiera per ingrandire e ridurre\",Export:\"Esporta\",Image:\"Immagine\",Data:\"Dati\",Print:\"Stampa\",\"Click, tap or press ENTER to open\":\"Clicca, tappa o premi ENTER per aprire\",\"Click, tap or press ENTER to print.\":\"Clicca, tappa o premi ENTER per stampare.\",\"Click, tap or press ENTER to export as %1.\":\"Clicca, tappa o premi ENTER per esportare come %1.\",'To save the image, right-click this link and choose \"Save picture as...\"':'Per salvare l\\'immagine, fai clic con il pulsante destro del mouse su questo link e seleziona \"Salva immagine come ...\"','To save the image, right-click thumbnail on the left and choose \"Save picture as...\"':'Per salvare l\\'immagine, fare clic con il tasto destro del mouse sulla miniatura e selezionare \"Salva immagine come ...\"',\"(Press ESC to close this message)\":\"(Premere ESC per chiudere questo messaggio)\",\"Image Export Complete\":\"Esportazione immagine completata\",\"Export operation took longer than expected. Something might have gone wrong.\":\"L'operazione di esportazione ha richiesto più tempo del previsto. Potrebbe esserci qualche problema.\",\"Saved from\":\"Salvato da\",PNG:\"\",JPG:\"\",GIF:\"\",SVG:\"\",PDF:\"\",JSON:\"\",CSV:\"\",XLSX:\"\",\"Use TAB to select grip buttons or left and right arrows to change selection\":\"Utilizzare TAB per selezionare i punti di ancoraggio o i tasti freccia sinistra e destra per modificare la selezione\",\"Use left and right arrows to move selection\":\"Utilizzare le frecce sinistra e destra per spostare la selezione\",\"Use left and right arrows to move left selection\":\"Utilizzare frecce destra e sinistra per spostare la selezione sinistra\",\"Use left and right arrows to move right selection\":\"Utilizzare frecce destra e sinistra per spostare la selezione destra\",\"Use TAB select grip buttons or up and down arrows to change selection\":\"Utilizzare TAB per selezionare i punti di ancoraggio o premere le frecce su e giù per modificare la selezione\",\"Use up and down arrows to move selection\":\"Utilizzare le frecce su e giù per spostare la selezione\",\"Use up and down arrows to move lower selection\":\"Utilizzare le frecce su e giù per spostare la selezione inferiore\",\"Use up and down arrows to move upper selection\":\"Utilizzare le frecce su e giù per spostare la selezione superiore\",\"From %1 to %2\":\"Da %1 a %2\",\"From %1\":\"Da %1\",\"To %1\":\"a %1\",\"No parser available for file: %1\":\"Nessun parser disponibile per il file: %1\",\"Error parsing file: %1\":\"Errore durante l'analisi del file: %1\",\"Unable to load file: %1\":\"Impossibile caricare il file: %1\",\"Invalid date\":\"Data non valida\"}},void 0!==(s=t(_commonjsHelpers_js__WEBPACK_IMPORTED_MODULE_0__.a,o))&&(i.exports=s);const _=a({__proto__:null,default:(0,_commonjsHelpers_js__WEBPACK_IMPORTED_MODULE_0__.g)(n.exports)},[n.exports]);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGFyY2dpcy9jb3JlL2NodW5rcy9pdF9JVC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BhcmNnaXMvY29yZS9jaHVua3MvaXRfSVQuanM/YmQ5NCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQWxsIG1hdGVyaWFsIGNvcHlyaWdodCBFU1JJLCBBbGwgUmlnaHRzIFJlc2VydmVkLCB1bmxlc3Mgb3RoZXJ3aXNlIHNwZWNpZmllZC5cblNlZSBodHRwczovL2pzLmFyY2dpcy5jb20vNC4yNS9lc3JpL2NvcHlyaWdodC50eHQgZm9yIGRldGFpbHMuXG4qL1xuaW1wb3J0e2cgYXMgZSxhIGFzIHJ9ZnJvbVwiLi9fY29tbW9uanNIZWxwZXJzLmpzXCI7ZnVuY3Rpb24gYShlLHIpe2Zvcih2YXIgYT0wO2E8ci5sZW5ndGg7YSsrKXtjb25zdCBpPXJbYV07aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGkmJiFBcnJheS5pc0FycmF5KGkpKWZvcihjb25zdCByIGluIGkpaWYoXCJkZWZhdWx0XCIhPT1yJiYhKHIgaW4gZSkpe2NvbnN0IGE9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihpLHIpO2EmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLHIsYS5nZXQ/YTp7ZW51bWVyYWJsZTohMCxnZXQ6KCk9Pmlbcl19KX19cmV0dXJuIE9iamVjdC5mcmVlemUoT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsU3ltYm9sLnRvU3RyaW5nVGFnLHt2YWx1ZTpcIk1vZHVsZVwifSkpfXZhciBpLG8sdCxzLG49e2V4cG9ydHM6e319O2k9bixvPW4uZXhwb3J0cyx0PWZ1bmN0aW9uKGUscil7T2JqZWN0LmRlZmluZVByb3BlcnR5KHIsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksci5kZWZhdWx0PXtfZGVjaW1hbFNlcGFyYXRvcjpcIixcIixfdGhvdXNhbmRTZXBhcmF0b3I6XCIuXCIsX3BlcmNlbnRQcmVmaXg6bnVsbCxfcGVyY2VudFN1ZmZpeDpcIiVcIixfYmlnX251bWJlcl9zdWZmaXhfMzpcImtcIixfYmlnX251bWJlcl9zdWZmaXhfNjpcIk1cIixfYmlnX251bWJlcl9zdWZmaXhfOTpcIkdcIixfYmlnX251bWJlcl9zdWZmaXhfMTI6XCJUXCIsX2JpZ19udW1iZXJfc3VmZml4XzE1OlwiUFwiLF9iaWdfbnVtYmVyX3N1ZmZpeF8xODpcIkVcIixfYmlnX251bWJlcl9zdWZmaXhfMjE6XCJaXCIsX2JpZ19udW1iZXJfc3VmZml4XzI0OlwiWVwiLF9zbWFsbF9udW1iZXJfc3VmZml4XzM6XCJtXCIsX3NtYWxsX251bWJlcl9zdWZmaXhfNjpcIs68XCIsX3NtYWxsX251bWJlcl9zdWZmaXhfOTpcIm5cIixfc21hbGxfbnVtYmVyX3N1ZmZpeF8xMjpcInBcIixfc21hbGxfbnVtYmVyX3N1ZmZpeF8xNTpcImZcIixfc21hbGxfbnVtYmVyX3N1ZmZpeF8xODpcImFcIixfc21hbGxfbnVtYmVyX3N1ZmZpeF8yMTpcInpcIixfc21hbGxfbnVtYmVyX3N1ZmZpeF8yNDpcInlcIixfYnl0ZV9zdWZmaXhfQjpcIkJcIixfYnl0ZV9zdWZmaXhfS0I6XCJLQlwiLF9ieXRlX3N1ZmZpeF9NQjpcIk1CXCIsX2J5dGVfc3VmZml4X0dCOlwiR0JcIixfYnl0ZV9zdWZmaXhfVEI6XCJUQlwiLF9ieXRlX3N1ZmZpeF9QQjpcIlBCXCIsX2RhdGVfbWlsbGlzZWNvbmQ6XCJtbTpzcyBTU1NcIixfZGF0ZV9zZWNvbmQ6XCJISDptbTpzc1wiLF9kYXRlX21pbnV0ZTpcIkhIOm1tXCIsX2RhdGVfaG91cjpcIkhIOm1tXCIsX2RhdGVfZGF5OlwiZGQgTU1NXCIsX2RhdGVfd2VlazpcInd3XCIsX2RhdGVfbW9udGg6XCJNTU1cIixfZGF0ZV95ZWFyOlwieXl5eVwiLF9kdXJhdGlvbl9taWxsaXNlY29uZDpcIlNTU1wiLF9kdXJhdGlvbl9taWxsaXNlY29uZF9zZWNvbmQ6XCJzcy5TU1NcIixfZHVyYXRpb25fbWlsbGlzZWNvbmRfbWludXRlOlwibW06c3MgU1NTXCIsX2R1cmF0aW9uX21pbGxpc2Vjb25kX2hvdXI6XCJISDptbTpzcyBTU1NcIixfZHVyYXRpb25fbWlsbGlzZWNvbmRfZGF5OlwiZCdnJyBtbTpzcyBTU1NcIixfZHVyYXRpb25fbWlsbGlzZWNvbmRfd2VlazpcImQnZycgbW06c3MgU1NTXCIsX2R1cmF0aW9uX21pbGxpc2Vjb25kX21vbnRoOlwiTSdtJyBkZCdnJyBtbTpzcyBTU1NcIixfZHVyYXRpb25fbWlsbGlzZWNvbmRfeWVhcjpcInknYScgTU0nbScgZGQnZycgbW06c3MgU1NTXCIsX2R1cmF0aW9uX3NlY29uZDpcInNzXCIsX2R1cmF0aW9uX3NlY29uZF9taW51dGU6XCJtbTpzc1wiLF9kdXJhdGlvbl9zZWNvbmRfaG91cjpcImhoOm1tOnNzXCIsX2R1cmF0aW9uX3NlY29uZF9kYXk6XCJkJ2cnIGhoOm1tOnNzXCIsX2R1cmF0aW9uX3NlY29uZF93ZWVrOlwiZCdnJyBoaDptbTpzc1wiLF9kdXJhdGlvbl9zZWNvbmRfbW9udGg6XCJNJ20nIGRkJ2cnIGhoOm1tOnNzXCIsX2R1cmF0aW9uX3NlY29uZF95ZWFyOlwieSdhJyBNTSdtJyBkZCdnJyBoaDptbTpzc1wiLF9kdXJhdGlvbl9taW51dGU6XCJtbVwiLF9kdXJhdGlvbl9taW51dGVfaG91cjpcImhoOm1tXCIsX2R1cmF0aW9uX21pbnV0ZV9kYXk6XCJkJ2cnIGhoOm1tXCIsX2R1cmF0aW9uX21pbnV0ZV93ZWVrOlwiZCdnJyBoaDptbVwiLF9kdXJhdGlvbl9taW51dGVfbW9udGg6XCJNJ20nIGRkJ2cnIGhoOm1tXCIsX2R1cmF0aW9uX21pbnV0ZV95ZWFyOlwieSdhJyBNTSdtJyBkZCdnJyBoaDptbVwiLF9kdXJhdGlvbl9ob3VyOlwiaGgnbydcIixfZHVyYXRpb25faG91cl9kYXk6XCJkJ2cnIGhoJ28nXCIsX2R1cmF0aW9uX2hvdXJfd2VlazpcImQnZycgaGgnbydcIixfZHVyYXRpb25faG91cl9tb250aDpcIk0nbScgZGQnZycgaGgnbydcIixfZHVyYXRpb25faG91cl95ZWFyOlwieSdhJyBNTSdtJyBkZCdnJyBoaCdvJ1wiLF9kdXJhdGlvbl9kYXk6XCJkJ2cnXCIsX2R1cmF0aW9uX2RheV93ZWVrOlwiZCdnJ1wiLF9kdXJhdGlvbl9kYXlfbW9udGg6XCJNJ20nIGRkJ2cnXCIsX2R1cmF0aW9uX2RheV95ZWFyOlwieSdhJyBNTSdtJyBkZCdnJ1wiLF9kdXJhdGlvbl93ZWVrOlwidydzJ1wiLF9kdXJhdGlvbl93ZWVrX21vbnRoOlwidydzJ1wiLF9kdXJhdGlvbl93ZWVrX3llYXI6XCJ3J3MnXCIsX2R1cmF0aW9uX21vbnRoOlwiTSdtJ1wiLF9kdXJhdGlvbl9tb250aF95ZWFyOlwieSdhJyBNTSdtJ1wiLF9kdXJhdGlvbl95ZWFyOlwieSdhJ1wiLF9lcmFfYWQ6XCJBLkMuXCIsX2VyYV9iYzpcIkQuQy5cIixBOlwiXCIsUDpcIlwiLEFNOlwiXCIsUE06XCJcIixcIkEuTS5cIjpcIlwiLFwiUC5NLlwiOlwiXCIsSmFudWFyeTpcIkdlbm5haW9cIixGZWJydWFyeTpcIkZlYmJyYWlvXCIsTWFyY2g6XCJNYXJ6b1wiLEFwcmlsOlwiQXByaWxlXCIsTWF5OlwiTWFnZ2lvXCIsSnVuZTpcIkdpdWdub1wiLEp1bHk6XCJMdWdsaW9cIixBdWd1c3Q6XCJBZ29zdG9cIixTZXB0ZW1iZXI6XCJTZXR0ZW1icmVcIixPY3RvYmVyOlwiT3R0b2JyZVwiLE5vdmVtYmVyOlwiTm92ZW1icmVcIixEZWNlbWJlcjpcIkRpY2VtYnJlXCIsSmFuOlwiR2VuXCIsRmViOlwiRmViXCIsTWFyOlwiTWFyXCIsQXByOlwiQXByXCIsXCJNYXkoc2hvcnQpXCI6XCJNYWdcIixKdW46XCJHaXVcIixKdWw6XCJMdWdcIixBdWc6XCJBZ29cIixTZXA6XCJTZXRcIixPY3Q6XCJPdHRcIixOb3Y6XCJOb3ZcIixEZWM6XCJEaWNcIixTdW5kYXk6XCJEb21lbmljYVwiLE1vbmRheTpcIkx1bmVkw6xcIixUdWVzZGF5OlwiTWFydGVkw6xcIixXZWRuZXNkYXk6XCJNZXJjb2xlZMOsXCIsVGh1cnNkYXk6XCJHaW92ZWTDrFwiLEZyaWRheTpcIlZlbmVyZMOsXCIsU2F0dXJkYXk6XCJTYWJhdG9cIixTdW46XCJEb21cIixNb246XCJMdW5cIixUdWU6XCJNYXJcIixXZWQ6XCJNZXJcIixUaHU6XCJHaW9cIixGcmk6XCJWZW5cIixTYXQ6XCJTYWJcIixfZGF0ZU9yZDpmdW5jdGlvbihlKXtyZXR1cm4gZStcIsKwXCJ9LFwiWm9vbSBPdXRcIjpcIlJpZHVjaSB6b29tXCIsUGxheTpcIkF2dmlhXCIsU3RvcDpcIkZlcm1hXCIsTGVnZW5kOlwiTGVnZW5kYVwiLFwiQ2xpY2ssIHRhcCBvciBwcmVzcyBFTlRFUiB0byB0b2dnbGVcIjpcIkNsaWNjYSwgdGFwcGEgbyBwcmVtaSBFTlRFUiBwZXIgYXR0aXZhcmVcIixMb2FkaW5nOlwiQ2FyaWNhbWVudG9cIixIb21lOlwiSG9tZVwiLENoYXJ0OlwiR3JhZmljb1wiLFwiU2VyaWFsIGNoYXJ0XCI6XCJHcmFmaWNvIGNvbWJpbmF0b1wiLFwiWC9ZIGNoYXJ0XCI6XCJHcmFmaWNvIFgvWVwiLFwiUGllIGNoYXJ0XCI6XCJHcmFmaWNvIGEgdG9ydGFcIixcIkdhdWdlIGNoYXJ0XCI6XCJEaWFncmFtbWEgZGkgbGl2ZWxsb1wiLFwiUmFkYXIgY2hhcnRcIjpcIkdyYWZpY28gcmFkYXJcIixcIlNhbmtleSBkaWFncmFtXCI6XCJEaWFncmFtbWEgZGkgU2Fua2V5XCIsXCJGbG93IGRpYWdyYW1cIjpcIkRpYWdyYW1tYSBkaSBmbHVzc29cIixcIkNob3JkIGRpYWdyYW1cIjpcIkRpYWdyYW1tYSBhIGNvcmRhXCIsXCJUcmVlTWFwIGNoYXJ0XCI6XCJNYXBwYSBhZCBhbGJlcm9cIixcIlNsaWNlZCBjaGFydFwiOlwiR3JhZmljbyBhIGZldHRlXCIsU2VyaWVzOlwiU2VyaWVcIixcIkNhbmRsZXN0aWNrIFNlcmllc1wiOlwiU2VyaWUgYSBjYW5kZWxlXCIsXCJPSExDIFNlcmllc1wiOlwiU2VyaWUgT0hMQ1wiLFwiQ29sdW1uIFNlcmllc1wiOlwiU2VyaWUgYSBjb2xvbm5lXCIsXCJMaW5lIFNlcmllc1wiOlwiU2VyaWUgYSBsaW5lZVwiLFwiUGllIFNsaWNlIFNlcmllc1wiOlwiU2VyaWUgYSBmZXR0YSBkaSB0b3J0YVwiLFwiRnVubmVsIFNlcmllc1wiOlwiU2VyaWUgYWQgaW1idXRvXCIsXCJQeXJhbWlkIFNlcmllc1wiOlwiU2VyaWUgYSBwaXJhbWlkZVwiLFwiWC9ZIFNlcmllc1wiOlwiU2VyaWUgWC9ZXCIsTWFwOlwiTWFwcGFcIixcIlByZXNzIEVOVEVSIHRvIHpvb20gaW5cIjpcIlByZW1pIEVOVEVSIHBlciBpbmdyYW5kaXJlXCIsXCJQcmVzcyBFTlRFUiB0byB6b29tIG91dFwiOlwiUHJlbWkgRU5URVIgcGVyIHJpZHVycmVcIixcIlVzZSBhcnJvdyBrZXlzIHRvIHpvb20gaW4gYW5kIG91dFwiOlwiVXNhIGxlIGZyZWNjZSBwZXIgaW5ncmFuZGlyZSBlIHJpZHVycmVcIixcIlVzZSBwbHVzIGFuZCBtaW51cyBrZXlzIG9uIHlvdXIga2V5Ym9hcmQgdG8gem9vbSBpbiBhbmQgb3V0XCI6XCJVdGlsaXp6YSBpIHRhc3RpIHBpw7kgZSBtZW5vIHN1bGxhIHRhc3RpZXJhIHBlciBpbmdyYW5kaXJlIGUgcmlkdXJyZVwiLEV4cG9ydDpcIkVzcG9ydGFcIixJbWFnZTpcIkltbWFnaW5lXCIsRGF0YTpcIkRhdGlcIixQcmludDpcIlN0YW1wYVwiLFwiQ2xpY2ssIHRhcCBvciBwcmVzcyBFTlRFUiB0byBvcGVuXCI6XCJDbGljY2EsIHRhcHBhIG8gcHJlbWkgRU5URVIgcGVyIGFwcmlyZVwiLFwiQ2xpY2ssIHRhcCBvciBwcmVzcyBFTlRFUiB0byBwcmludC5cIjpcIkNsaWNjYSwgdGFwcGEgbyBwcmVtaSBFTlRFUiBwZXIgc3RhbXBhcmUuXCIsXCJDbGljaywgdGFwIG9yIHByZXNzIEVOVEVSIHRvIGV4cG9ydCBhcyAlMS5cIjpcIkNsaWNjYSwgdGFwcGEgbyBwcmVtaSBFTlRFUiBwZXIgZXNwb3J0YXJlIGNvbWUgJTEuXCIsJ1RvIHNhdmUgdGhlIGltYWdlLCByaWdodC1jbGljayB0aGlzIGxpbmsgYW5kIGNob29zZSBcIlNhdmUgcGljdHVyZSBhcy4uLlwiJzonUGVyIHNhbHZhcmUgbFxcJ2ltbWFnaW5lLCBmYWkgY2xpYyBjb24gaWwgcHVsc2FudGUgZGVzdHJvIGRlbCBtb3VzZSBzdSBxdWVzdG8gbGluayBlIHNlbGV6aW9uYSBcIlNhbHZhIGltbWFnaW5lIGNvbWUgLi4uXCInLCdUbyBzYXZlIHRoZSBpbWFnZSwgcmlnaHQtY2xpY2sgdGh1bWJuYWlsIG9uIHRoZSBsZWZ0IGFuZCBjaG9vc2UgXCJTYXZlIHBpY3R1cmUgYXMuLi5cIic6J1BlciBzYWx2YXJlIGxcXCdpbW1hZ2luZSwgZmFyZSBjbGljIGNvbiBpbCB0YXN0byBkZXN0cm8gZGVsIG1vdXNlIHN1bGxhIG1pbmlhdHVyYSBlIHNlbGV6aW9uYXJlIFwiU2FsdmEgaW1tYWdpbmUgY29tZSAuLi5cIicsXCIoUHJlc3MgRVNDIHRvIGNsb3NlIHRoaXMgbWVzc2FnZSlcIjpcIihQcmVtZXJlIEVTQyBwZXIgY2hpdWRlcmUgcXVlc3RvIG1lc3NhZ2dpbylcIixcIkltYWdlIEV4cG9ydCBDb21wbGV0ZVwiOlwiRXNwb3J0YXppb25lIGltbWFnaW5lIGNvbXBsZXRhdGFcIixcIkV4cG9ydCBvcGVyYXRpb24gdG9vayBsb25nZXIgdGhhbiBleHBlY3RlZC4gU29tZXRoaW5nIG1pZ2h0IGhhdmUgZ29uZSB3cm9uZy5cIjpcIkwnb3BlcmF6aW9uZSBkaSBlc3BvcnRhemlvbmUgaGEgcmljaGllc3RvIHBpw7kgdGVtcG8gZGVsIHByZXZpc3RvLiBQb3RyZWJiZSBlc3NlcmNpIHF1YWxjaGUgcHJvYmxlbWEuXCIsXCJTYXZlZCBmcm9tXCI6XCJTYWx2YXRvIGRhXCIsUE5HOlwiXCIsSlBHOlwiXCIsR0lGOlwiXCIsU1ZHOlwiXCIsUERGOlwiXCIsSlNPTjpcIlwiLENTVjpcIlwiLFhMU1g6XCJcIixcIlVzZSBUQUIgdG8gc2VsZWN0IGdyaXAgYnV0dG9ucyBvciBsZWZ0IGFuZCByaWdodCBhcnJvd3MgdG8gY2hhbmdlIHNlbGVjdGlvblwiOlwiVXRpbGl6emFyZSBUQUIgcGVyIHNlbGV6aW9uYXJlIGkgcHVudGkgZGkgYW5jb3JhZ2dpbyBvIGkgdGFzdGkgZnJlY2NpYSBzaW5pc3RyYSBlIGRlc3RyYSBwZXIgbW9kaWZpY2FyZSBsYSBzZWxlemlvbmVcIixcIlVzZSBsZWZ0IGFuZCByaWdodCBhcnJvd3MgdG8gbW92ZSBzZWxlY3Rpb25cIjpcIlV0aWxpenphcmUgbGUgZnJlY2NlIHNpbmlzdHJhIGUgZGVzdHJhIHBlciBzcG9zdGFyZSBsYSBzZWxlemlvbmVcIixcIlVzZSBsZWZ0IGFuZCByaWdodCBhcnJvd3MgdG8gbW92ZSBsZWZ0IHNlbGVjdGlvblwiOlwiVXRpbGl6emFyZSBmcmVjY2UgZGVzdHJhIGUgc2luaXN0cmEgcGVyIHNwb3N0YXJlIGxhIHNlbGV6aW9uZSBzaW5pc3RyYVwiLFwiVXNlIGxlZnQgYW5kIHJpZ2h0IGFycm93cyB0byBtb3ZlIHJpZ2h0IHNlbGVjdGlvblwiOlwiVXRpbGl6emFyZSBmcmVjY2UgZGVzdHJhIGUgc2luaXN0cmEgcGVyIHNwb3N0YXJlIGxhIHNlbGV6aW9uZSBkZXN0cmFcIixcIlVzZSBUQUIgc2VsZWN0IGdyaXAgYnV0dG9ucyBvciB1cCBhbmQgZG93biBhcnJvd3MgdG8gY2hhbmdlIHNlbGVjdGlvblwiOlwiVXRpbGl6emFyZSBUQUIgcGVyIHNlbGV6aW9uYXJlIGkgcHVudGkgZGkgYW5jb3JhZ2dpbyBvIHByZW1lcmUgbGUgZnJlY2NlIHN1IGUgZ2nDuSBwZXIgbW9kaWZpY2FyZSBsYSBzZWxlemlvbmVcIixcIlVzZSB1cCBhbmQgZG93biBhcnJvd3MgdG8gbW92ZSBzZWxlY3Rpb25cIjpcIlV0aWxpenphcmUgbGUgZnJlY2NlIHN1IGUgZ2nDuSBwZXIgc3Bvc3RhcmUgbGEgc2VsZXppb25lXCIsXCJVc2UgdXAgYW5kIGRvd24gYXJyb3dzIHRvIG1vdmUgbG93ZXIgc2VsZWN0aW9uXCI6XCJVdGlsaXp6YXJlIGxlIGZyZWNjZSBzdSBlIGdpw7kgcGVyIHNwb3N0YXJlIGxhIHNlbGV6aW9uZSBpbmZlcmlvcmVcIixcIlVzZSB1cCBhbmQgZG93biBhcnJvd3MgdG8gbW92ZSB1cHBlciBzZWxlY3Rpb25cIjpcIlV0aWxpenphcmUgbGUgZnJlY2NlIHN1IGUgZ2nDuSBwZXIgc3Bvc3RhcmUgbGEgc2VsZXppb25lIHN1cGVyaW9yZVwiLFwiRnJvbSAlMSB0byAlMlwiOlwiRGEgJTEgYSAlMlwiLFwiRnJvbSAlMVwiOlwiRGEgJTFcIixcIlRvICUxXCI6XCJhICUxXCIsXCJObyBwYXJzZXIgYXZhaWxhYmxlIGZvciBmaWxlOiAlMVwiOlwiTmVzc3VuIHBhcnNlciBkaXNwb25pYmlsZSBwZXIgaWwgZmlsZTogJTFcIixcIkVycm9yIHBhcnNpbmcgZmlsZTogJTFcIjpcIkVycm9yZSBkdXJhbnRlIGwnYW5hbGlzaSBkZWwgZmlsZTogJTFcIixcIlVuYWJsZSB0byBsb2FkIGZpbGU6ICUxXCI6XCJJbXBvc3NpYmlsZSBjYXJpY2FyZSBpbCBmaWxlOiAlMVwiLFwiSW52YWxpZCBkYXRlXCI6XCJEYXRhIG5vbiB2YWxpZGFcIn19LHZvaWQgMCE9PShzPXQocixvKSkmJihpLmV4cG9ydHM9cyk7Y29uc3QgXz1hKHtfX3Byb3RvX186bnVsbCxkZWZhdWx0OmUobi5leHBvcnRzKX0sW24uZXhwb3J0c10pO2V4cG9ydHtfIGFzIGl9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@arcgis/core/chunks/it_IT.js\n");

/***/ })

}]);