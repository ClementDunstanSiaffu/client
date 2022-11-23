import Search from 'esri/widgets/Search'
// import Locator from 'esri/rest/locator'
// import * as locator from 'esri/rest/locator'
// import Circle from 'esri/geometry/Circle'
import Graphic from 'esri/Graphic'
import D from './dbg-log'
import PictureMarkerSymbol from 'esri/symbols/PictureMarkerSymbol'
import GraphicsLayer from 'esri/layers/GraphicsLayer'

/**
 * This class is static and globally maintains a registry of all
 * map/widget associations to a Search control that is added to one or more
 * map widgets.  Once a search control is added to a map widget, this class
 * syncs the search events to each associated widget (as events).
 *
 * Multiple widgets can use the same search control on a single map widget.
 * Likewise, multiple map widgets can be added that can then individually
 * be associated to one or more widgets.
 *
 * Call 'registerCallbacks()' to create another widget to map association.
 * The callbacks are used to receive events when the user chooses a search
 * result or suggestion, and to know when the user clicks on the search
 * control 'X' button.
 *
 * This class will add a symbol to the map when a search result is located
 * (and clears the previous graphics).
 *
 * No other map graphics are managed by this class
 */
export default class MapSearch {
  public fixForLint: string
  constructor () {
    // to show debug logging set following to true
    D.showDebugConsoleLogs = false
  }

  public static maps: any = {}
  /**
   * Each map object contains:
   *      mapWidgetId - key
   *      view
   *      map
   *      graphicsLayer
   *      search result callback
   *      search clear collback
   *      widgets - array of registered widget callbacks
   *
   * @private
   */

  public static hasText (s) {
    return !(typeof s === 'undefined' || s === null) && typeof s === 'string' && s.length > 0 && s.trim().length > 0
  }

  /**  registerCallbacks
   *
   *  This function accepts a widget id and associates it with a map (mapWidgetId) and view.  If the map does not already
   *  have a search control, it creates one.  Then the search results and clear callbacks are registered to receive
   *  notifications from the single search control.
   *
   * @param widgetId  = element id of widget receiving search notifications
   * @param mapWidgetId  = element id of the related map widget
   * @param view  = jsapi MapView object for the map
   * @param searchResultCallback  =  callback for search result notifications (may be null or undefined)
   * @param searchClearCallback  = callback for search control cancel buttton that clears the search (may be null or undefined)
   * @param mapActionsContext = BAMapActions instance reference for the widget
   */
  public static registerCallbacks (
    widgetId: string,
    mapWidgetId: string,
    view: any,
    searchResultCallback: any,
    searchClearCallback: any,
    mapActionsContext: any) {
    let mapData
    D.log('map-search', 'registerCallbacks()...')
    if (!this.hasText(widgetId) || !this.hasText(mapWidgetId) || !view || !mapActionsContext) {
      D.log('map-search', 'map search register callbacks failed - invalid args')
      return
    }

    const myWidgetInfo = {
      widgetId: widgetId,
      searchResultCallback: searchResultCallback,
      cleared: searchClearCallback,
      mapActions: mapActionsContext
    }

    const map = MapSearch.maps[mapWidgetId]
    if (!map) {
      D.log('map-search', 'Register new widget')
      // new widget registration
      const id = 'baSearch' + Date.now()

      mapData = {
        mapWidgetId: mapWidgetId,
        view: view,
        map: view.map,
        graphicsLayer: new GraphicsLayer({ id: id }),
        searchControl: null,
        widgets: [myWidgetInfo]
      }
      mapData.map.add(mapData.graphicsLayer)
      const srMarker = new PictureMarkerSymbol({
        width: 14,
        height: 26.6,
        xoffset: 0,
        yoffset: 12.6,
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAjCAYAAAB2KjFhAAACtUlEQVRIS+2WS0wTURSG/zvT0kpfkGJ4pGCViA1Em9CtCQVx5QIWhiVRo8GdSNypqHElkcgOlzVh5ap1X6nEiAkQXzGBxkSKtZC0jdTSB7SdMXdwRjudB+w5q5t7T775z3/OzR0CWbT4x90Glh0CMEx43g1C3FIKz6/zhKwDCJYrldBWZIaupSDiqsE/3mBjmGeMyXLF7GiBubEVhmN2sIY6KblS3kO58BvFX5soZrbA7eYCWY67vR2Z2aZJAoyqMTLMvLXN47a1eeRiUSrmUSrmhHSGNYA11oGtMyO3FcVOYnW9xHH9VKUAcw1MfHSc9HktzvYaEN34B6suymSxCwozsQ+ReHi6n7gG7/iNZvv88W6/Ikgdtl+Y2d6I5NfXqJQK/cQ1MPHQ1uZ5oFSeSFdWtn9Ky93b/olsYvURhUWcXef7TPamGmWXfM3oPeVAi8OIeDKLpWgSrxY3qvIY1gjCl5GOvn2jCLOaWUyN9sDX6aj5wNJaErdm3yNbKAlnurCp0W709ThVPQy+i+H+ixV92OlWC+bGe1VB4sHlx2GsxTPayqhPkyNdurB7gRWEFmPasBsXT+D6YIcu7MnLz5gLf9OG0e7Njp3ThV2bXsBSNKUNo518ftML6p1aUK+oZwfqJgVRIAXLg47E1acLgvkHgtGk1kYTJkfOCEMrxnI0hbuBZSTSeWlPd87kaprqeWwkUopVHxqmdTePYMqTdeRZ9d1svzARtLnODlmbO1XvoqpnhMBkaUAhHUM2/iVE6ONrZZjIoZ+6v6BiZhOZ7yufdjjOL7ybesAaZQog+qpX/R6oKayCqYCoKAmmpVCCaYBqYGpAAbabF8z+3yPxh0XsXJUycVPuYWm3IIyAFkhRmRowl/4hdU2uSFOZHFjv7PDm0xtC+9VAmspkwOAOxw1rgWj+H4uVH6hj08HSAAAAAElFTkSuQmCC'
      })

      // Add Search control and handler
      // const srMarker = new PictureMarkerSymbol(
      //   {
      //     type: 'picture-marker',
      //     path: 'iVBORw0KGgoAAAANSUhEUgAAABMAAAAjCAYAAAB2KjFhAAACtUlEQVRIS+2WS0wTURSG/zvT0kpfkGJ4pGCViA1Em9CtCQVx5QIWhiVRo8GdSNypqHElkcgOlzVh5ap1X6nEiAkQXzGBxkSKtZC0jdTSB7SdMXdwRjudB+w5q5t7T775z3/OzR0CWbT4x90Glh0CMEx43g1C3FIKz6/zhKwDCJYrldBWZIaupSDiqsE/3mBjmGeMyXLF7GiBubEVhmN2sIY6KblS3kO58BvFX5soZrbA7eYCWY67vR2Z2aZJAoyqMTLMvLXN47a1eeRiUSrmUSrmhHSGNYA11oGtMyO3FcVOYnW9xHH9VKUAcw1MfHSc9HktzvYaEN34B6suymSxCwozsQ+ReHi6n7gG7/iNZvv88W6/Ikgdtl+Y2d6I5NfXqJQK/cQ1MPHQ1uZ5oFSeSFdWtn9Ky93b/olsYvURhUWcXef7TPamGmWXfM3oPeVAi8OIeDKLpWgSrxY3qvIY1gjCl5GOvn2jCLOaWUyN9sDX6aj5wNJaErdm3yNbKAlnurCp0W709ThVPQy+i+H+ixV92OlWC+bGe1VB4sHlx2GsxTPayqhPkyNdurB7gRWEFmPasBsXT+D6YIcu7MnLz5gLf9OG0e7Njp3ThV2bXsBSNKUNo518ftML6p1aUK+oZwfqJgVRIAXLg47E1acLgvkHgtGk1kYTJkfOCEMrxnI0hbuBZSTSeWlPd87kaprqeWwkUopVHxqmdTePYMqTdeRZ9d1svzARtLnODlmbO1XvoqpnhMBkaUAhHUM2/iVE6ONrZZjIoZ+6v6BiZhOZ7yufdjjOL7ybesAaZQog+qpX/R6oKayCqYCoKAmmpVCCaYBqYGpAAbabF8z+3yPxh0XsXJUycVPuYWm3IIyAFkhRmRowl/4hdU2uSFOZHFjv7PDm0xtC+9VAmspkwOAOxw1rgWj+H4uVH6hj08HSAAAAAElFTkSuQmCC'
      //   }
      // )

      mapData.searchControl = new Search({
        view: mapData.view,
        popupEnabled: false,
        sources: [
          {
            // @ts-expect-error
            //locator: new Locator('//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'),
            //locator: locator.default.addressesToLocations('//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'),
            url: 'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer',
            singleLineFieldName: 'SingleLine',
            outFields: ['Addr_type', 'Match_addr', 'StAddr', 'City'],
            name: 'ArcGIS World Geocoding Service',
            placeholder: 'Find address or place',
            resultSymbol: srMarker
          }
        ]
      })
      mapData.searchControl.viewModel.includeDefaultSources = false
      mapData.view.ui.add(mapData.searchControl, { position: 'top-right' })

      // User cleared the search string
      mapData.searchControl.on('search-clear', function (event) {
        mapData.graphicsLayer.removeAll()
        MapSearch.notifyClear(mapData)
      })

      // User performed search
      mapData.searchControl.on('select-result', function (ev) {
        D.log('MapSearch', 'ON SEARCH RESULTS...')
        const center = ev.result.extent.center
        D.log('MapSearch', 'clearing GraphicsLayer')
        mapData.graphicsLayer.removeAll()
        D.log('MapSearch', 'SEARCH_RESULT= ', ev)
        D.log('MapSearch', 'name=', ev.result.name)
        D.log('MapSearch', 'Location=', center.latitude, center.longitude)

        // Show the found search location dot
        const symbol = {
          type: 'simple-fill',
          color: [51, 51, 204, 0.15],
          style: 'solid',
          outline: {
            color: 'blue',
            width: 1
          }
        }
        const gr = new Graphic({ symbol: symbol })
        D.log('MapSearch', 'adding search result graphic=', gr)
        mapData.graphicsLayer.add(gr)

        const details = {
          type: 'point',
          latitude: center.latitude,
          longitude: center.longitude,
          displayName: ev.result.name
        }
        MapSearch.notifySearchResults(mapData, details)
      })

      // Register the map info
      MapSearch.maps[mapWidgetId] = mapData
    } else {
      D.log('map-search', 'associate widget to existing map')
      // map in use.  In this case the Search control has already been
      // created and added to the map.  In this case we just want to
      // register this widget to get callbacks for search events.
      let item
      for (let ii = 0; ii < map.widgets.length; ii++) {
        item = map.widgets[ii]
        if (item.widgetId === myWidgetInfo.widgetId) {
          // update existing widget data
          map.widgets[ii] = myWidgetInfo
          return
        }
      }
      // new registered widget
      map.widgets.push(myWidgetInfo)
    }
    if (mapData && mapData.searchControl) {
      return mapData.searchControl
    }
    return null
  }

  private static notifyClear (mapData) {
    D.log('MapSearch', 'notify Search Cleared for ' + mapData.widgets.length + ' widgets')
    // for all registered widgets, notify each
    for (let ii = 0; ii < mapData.widgets.length; ii++) {
      const w = mapData.widgets[ii]
      if (w.cleared) {
        try {
          w.cleared(w.mapActions)
        } catch (ex) {
          throw new Error('Map Search clear notify failed')
        }
      }
    }
  }

  private static notifySearchResults (mapData, details) {
    D.log('MapSearch', 'notify SR for ' + mapData.widgets.length)
    // for all registered widgets, notify each
    for (let ii = 0; ii < mapData.widgets.length; ii++) {
      const w = mapData.widgets[ii]
      D.log('MapSearch', 'widget' + ii + ' =', w)
      if (w.searchResultCallback) {
        try {
          w.searchResultCallback(details, w.mapActions)
        } catch (ex) {
          throw new Error('Map Search clear notify failed')
        }
      }
    }
  }
}
