/* eslint-disable no-useless-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable @typescript-eslint/no-this-alias */
/** @jsx jsx */
import Graphic from 'esri/Graphic'
import GraphicsLayer from 'esri/layers/GraphicsLayer'
import PictureMarkerSymbol from 'esri/symbols/PictureMarkerSymbol'
import D from './dbg-log'
import Circle from 'esri/geometry/Circle'
import Point from 'esri/geometry/Point'
import MapSearch from './map-search'

/**
 *  Map actions:
 *   - user clicks somewhere on the map - this resets map graphicsLayer and draws new graphics
 *     based on settings.  The map graphics may be a dot for location, and then either circles
 *     or drive/walk polygons.
 *   - user clicks on a point feature
 */
export default class BAMapActions {
    private readonly showSearch: boolean
    private searchControl: any
    private runReportOnClick: boolean
    //private readonly mapView: any
    private graphicsLayer: any
    private map: any
    private view: any
    private readonly search: any
    private bufferSizes: [number]
    private bufferSizesString: string
    private units: string
    private bufferType: string
    private readonly callback: any
    private readonly context: any
    private readonly mapWidgetId: string
    private readonly widgetId: string
    private readonly colors: any
    private settingsLatitude: any
    private settingsLongitude: any
    private ignorePropChanges: boolean = false

    /** constructor
     *
     * @param showSearch = boolean turns on search control top-right of map
     * @param reportChangeCallback = Function to call when map actions cause
     * a change in the displayed infographic
     * Return:
     * {
     *      type: <'point' or 'polygon'>,
     *      latitude: <for point type only>,
     *      longitude: <for point type only>,
     *      rings:<polygon only>,
     *      displayName: <location name = may be empty>
     * }
     */
    constructor (widgetId: string, mapId: string, showSearch: boolean, reportChangeCallback: any, context) {
      // set to 'true' to display logs
      D.showDebugConsoleLogs = false
      D.log('map-actions', 'constructor')

      this.widgetId = widgetId
      this.mapWidgetId = mapId
      this.showSearch = (typeof showSearch === 'undefined') ? true : showSearch
      this.runReportOnClick = false
      this.bufferType = 'ring' // may be 'ring', 'drivetime', or 'walktime'
      this.bufferSizes = [1]
      this.bufferSizesString = '1'
      this.units = 'miles'
      this.context = context
      this.callback = reportChangeCallback
      this.colors = [
        {
          color: [245, 172, 70, 0.4],
          outline: {
            color: [204, 50, 2, 0.7],
            width: 1
          }
        },
        {
          color: [70, 178, 121, 0.3],
          outline: {
            color: [70, 178, 121, 0.7],
            width: 1
          }
        },
        {
          color: [120, 144, 173, 0.3],
          outline: {
            color: [17, 59, 143, 0.7],
            width: 1
          }
        }
      ]
    }

    /** setReportOnClick
     *
     * @param flag = boolean that generates a new report for every map click
     */
    public setReportOnClick (flag: boolean) {
      this.runReportOnClick = flag
    }

    public updateMap () {
      if (!this.ignorePropChanges) {
        this.syncSettings()
        this.render(this.context.infographicLatitude, this.context.infographicLongitude, false)
      } else D.log('map-actions', 'updateMap ignored prop change')
    }

    _allowPropChanges = this._debounce(function () {
      this.ignorePropChanges = false
    }, 1000, false)

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    _debounce (func: any, wait: number, immediate: boolean) {
      let timeout
      return function () {
        const context: any = this; const args: any = arguments
        const later: any = function () {
          timeout = null
          if (!immediate) func.apply(context, args)
        }
        const callNow: boolean = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
      }
    }

    private syncSettings () {
      this.context.getConfigVals()
      const values: [number] = [] as any
      const sArr: [string] = this.context.bufferSizes.split(',')
      sArr.forEach(v => {
        values.push(parseFloat(v))
      })
      this.bufferSizes = values
      this.bufferSizesString = this.context.bufferSizes
      this.bufferType = this.context.bufferType
      this.units = this.context.bufferUnits
      this.settingsLatitude = this.context.infographicLatitude
      this.settingsLongitude = this.context.infographicLongitude
    }

    /* initialize
     *      This function sets up the map action handlers and
     *      search control.  It should only be called once on
     *      startup for any given map.
     *
     *      view : jsapi MapView
     */
    public initialize (view) {
      D.log('map-actions', 'initialize()...')
      if (!view) {
        throw new Error('BA map actions initialize: invalid view')
      }
      if (this.view) {
        return
      }
      const self = this
      self.map = view.map
      self.view = view
      const id = 'baGraphics' + Date.now()
      self.graphicsLayer = new GraphicsLayer({ id: id })
      self.map.add(self.graphicsLayer)
      // Add Search control and handler
      const srMarker = new PictureMarkerSymbol({
        width: 14,
        height: 26.6,
        xoffset: 0,
        yoffset: 12.6,
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAjCAYAAAB2KjFhAAACtUlEQVRIS+2WS0wTURSG/zvT0kpfkGJ4pGCViA1Em9CtCQVx5QIWhiVRo8GdSNypqHElkcgOlzVh5ap1X6nEiAkQXzGBxkSKtZC0jdTSB7SdMXdwRjudB+w5q5t7T775z3/OzR0CWbT4x90Glh0CMEx43g1C3FIKz6/zhKwDCJYrldBWZIaupSDiqsE/3mBjmGeMyXLF7GiBubEVhmN2sIY6KblS3kO58BvFX5soZrbA7eYCWY67vR2Z2aZJAoyqMTLMvLXN47a1eeRiUSrmUSrmhHSGNYA11oGtMyO3FcVOYnW9xHH9VKUAcw1MfHSc9HktzvYaEN34B6suymSxCwozsQ+ReHi6n7gG7/iNZvv88W6/Ikgdtl+Y2d6I5NfXqJQK/cQ1MPHQ1uZ5oFSeSFdWtn9Ky93b/olsYvURhUWcXef7TPamGmWXfM3oPeVAi8OIeDKLpWgSrxY3qvIY1gjCl5GOvn2jCLOaWUyN9sDX6aj5wNJaErdm3yNbKAlnurCp0W709ThVPQy+i+H+ixV92OlWC+bGe1VB4sHlx2GsxTPayqhPkyNdurB7gRWEFmPasBsXT+D6YIcu7MnLz5gLf9OG0e7Njp3ThV2bXsBSNKUNo518ftML6p1aUK+oZwfqJgVRIAXLg47E1acLgvkHgtGk1kYTJkfOCEMrxnI0hbuBZSTSeWlPd87kaprqeWwkUopVHxqmdTePYMqTdeRZ9d1svzARtLnODlmbO1XvoqpnhMBkaUAhHUM2/iVE6ONrZZjIoZ+6v6BiZhOZ7yufdjjOL7ybesAaZQog+qpX/R6oKayCqYCoKAmmpVCCaYBqYGpAAbabF8z+3yPxh0XsXJUycVPuYWm3IIyAFkhRmRowl/4hdU2uSFOZHFjv7PDm0xtC+9VAmspkwOAOxw1rgWj+H4uVH6hj08HSAAAAAElFTkSuQmCC'
      })

      if (self.showSearch) {
        self.searchControl = MapSearch.registerCallbacks(
          self.widgetId,
          self.mapWidgetId,
          self.view,
          async function onReceivedSearchResults (results, bamInstance) {
            self.ignorePropChanges = true
            // update widget location
            self.settingsLatitude = self.context.infographicLatitude = results.latitude
            self.settingsLongitude = self.context.infographicLongitude = results.longitude

            D.log('map-actions', 'onReceivedSearchResults =', results, bamInstance)
            self.render(results.latitude, results.longitude, true)
          },
          function onSearchCleared (bamInstance) {
            self.ignorePropChanges = true
            self.settingsLatitude = self.context.infographicLatitude = undefined
            self.settingsLongitude = self.context.infographicLongitude = undefined
            const id = '#' + bamInstance.context.props.id
            self.graphicsLayer.removeAll()
            const elem = document.querySelector(id)
            if (elem) {
              elem.setAttribute('report-geometry', '')
              elem.setAttribute('report-location', '')
            }
          },
          self
        )
      }

      // Events
      self.view.on('click', evt => {
        if (self.runReportOnClick) {
          D.log('map-actions', 'onMapClick()...')
          self.graphicsLayer.removeAll()
          if (self.searchControl) { self.searchControl.searchTerm = '' }

          // allow UI to catch up
          function _later () {
            // Check for features under the click
            // Priorities:  1=Point, 2=Polygon, other=ignore
            self.view.hitTest(evt, {}).then(
              function (response) {
                if ((response.results.length <= 0) || (!getGraphics(response))) {
                  const clickPoint = self.view.toMap({
                    x: evt.x,
                    y: evt.y
                  })
                  self.ignorePropChanges = true
                  self.settingsLatitude = self.context.infographicLatitude = clickPoint.latitude
                  self.settingsLongitude = self.context.infographicLongitude = clickPoint.longitude

                  self.render.call(self, clickPoint.latitude, clickPoint.longitude, true)
                }
              }
            )
          }
          setTimeout(_later, 0)
        }

        function getGraphics (response): any {
          let pt: any, poly: any
          if (response.results.length > 0) {
            for (let ii = 0; ii < response.results.length; ii++) {
              const graphic = response.results[ii].graphic
              if (!graphic.geometry) {
                continue
              } else {
                switch (graphic.geometry.type) {
                  case ('polygon'): {
                    if (!poly) poly = [ii, graphic]
                    break
                  }
                  case ('point'): {
                    if (!pt) pt = [ii, graphic]
                  }
                }
              }
            }
            if (pt) {
              try {
                highlightPoint(response, pt)
              } catch (ex) {
                console.log(ex)
              }
            } else if (poly) {
              try {
                highlightPolygon(response, poly)
              } catch (ex) {
                console.log(ex)
              }
            } else {
              return false
            }
            return true
          } else {
            return false
          }
        }

        function highlightPoint (response: any, data: any) {
          const graphic = data[1]
          const attributes = graphic.attributes
          const ptLat = graphic.geometry.latitude
          const ptLon = graphic.geometry.longitude
          // update widget lat/lon
          self.ignorePropChanges = true
          self.settingsLatitude = self.context.infographicLatitude = ptLat
          self.settingsLongitude = self.context.infographicLongitude = ptLon

          if (self.callback) {
            self.callback({
              type: 'point',
              latitude: ptLat,
              longitude: ptLon,
              displayName: attributes.name || ''
            }, self.context)
          }
        }

        function highlightPolygon (response: any, data: any) {
          const polyLat = evt.mapPoint.latitude
          const polyLon = evt.mapPoint.longitude
          // update widget lat/lon
          self.ignorePropChanges = true
          self.settingsLatitude = self.context.infographicLatitude = polyLat
          self.settingsLongitude = self.context.infographicLongitude = polyLon
          if (self.callback) {
            self.callback({
              latitude: polyLat,
              longitude: polyLon,
              type: 'polygon',
              rings: data[1].geometry.rings,
              spatial: data[1].geometry.spatialReference,
              displayName: ''
            }, self.context)
          }
        }
      })

      if (self.context.infographicLatitude && self.context.infographicLongitude) {
        self.render(self.context.infographicLatitude, self.context.infographicLongitude, false)
      }
    }

    private drawRings (lat, lon) {
      const self = this
      let outerGraphic
      D.log('drawRings', 'Rendering map graphics, rings= ' + this.bufferSizes.length)
      for (let ii = this.bufferSizes.length - 1; ii >= 0; ii--) {
        const buffer = new Circle({
          // @ts-expect-error
          center: [lon, lat],
          geodesic: true,
          numberOfPoints: 64,
          // @ts-expect-error
          radiusUnit: this.units,
          radius: this.bufferSizes[ii]
        })
        const symbol = {
          type: 'simple-fill',
          color: this.colors[ii].color,
          style: 'solid',
          outline: this.colors[ii].outline
        }
        const gr = new Graphic({ geometry: buffer, symbol: symbol })
        if (!outerGraphic) { outerGraphic = gr }

        this.graphicsLayer.add(gr)
      }
      this.view.goTo(outerGraphic.geometry)
    }

    public render (lat, lon, noClear) {
      const self = this
      this.syncSettings()
      if (!noClear) { this.graphicsLayer.removeAll() }

      // At this point, the MapSearch code has already rendered the search
      // report rings or geometry (at the search result location) as temporary
      // graphics on the map.
      //
      // This callback will set the arcgis-infographic props for report-location
      // or report-geometry so that the infographic is updated.
      //
      const id = '#' + this.context.props.id
      const elem = document.querySelector(id)
      if (elem) {
        if (this.bufferType === 'ring') {
          // force units to miles/kilometers
          if (this.context.bufferUnits === 'minutes') {
            this.units = this.context.bufferUnits = 'miles'
          }
          self.view.center = [lon, lat]
          self.view.zoom = 10

          // draw 1 or more rings on map
          this.drawRings(lat, lon)

          // Show the found search location dot
          // const ptSym = new SimpleMarkerSymbol({
          //   color: [51, 51, 204, 0.15],
          //   outline: {
          //     color: 'blue',
          //     width: 1
          //   },
          //   size: '6px'
          // })

          const ptSym = new PictureMarkerSymbol({
            width: 14,
            height: 26.6,
            xoffset: 0,
            yoffset: 12.6,
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAjCAYAAAB2KjFhAAACtUlEQVRIS+2WS0wTURSG/zvT0kpfkGJ4pGCViA1Em9CtCQVx5QIWhiVRo8GdSNypqHElkcgOlzVh5ap1X6nEiAkQXzGBxkSKtZC0jdTSB7SdMXdwRjudB+w5q5t7T775z3/OzR0CWbT4x90Glh0CMEx43g1C3FIKz6/zhKwDCJYrldBWZIaupSDiqsE/3mBjmGeMyXLF7GiBubEVhmN2sIY6KblS3kO58BvFX5soZrbA7eYCWY67vR2Z2aZJAoyqMTLMvLXN47a1eeRiUSrmUSrmhHSGNYA11oGtMyO3FcVOYnW9xHH9VKUAcw1MfHSc9HktzvYaEN34B6suymSxCwozsQ+ReHi6n7gG7/iNZvv88W6/Ikgdtl+Y2d6I5NfXqJQK/cQ1MPHQ1uZ5oFSeSFdWtn9Ky93b/olsYvURhUWcXef7TPamGmWXfM3oPeVAi8OIeDKLpWgSrxY3qvIY1gjCl5GOvn2jCLOaWUyN9sDX6aj5wNJaErdm3yNbKAlnurCp0W709ThVPQy+i+H+ixV92OlWC+bGe1VB4sHlx2GsxTPayqhPkyNdurB7gRWEFmPasBsXT+D6YIcu7MnLz5gLf9OG0e7Njp3ThV2bXsBSNKUNo518ftML6p1aUK+oZwfqJgVRIAXLg47E1acLgvkHgtGk1kYTJkfOCEMrxnI0hbuBZSTSeWlPd87kaprqeWwkUopVHxqmdTePYMqTdeRZ9d1svzARtLnODlmbO1XvoqpnhMBkaUAhHUM2/iVE6ONrZZjIoZ+6v6BiZhOZ7yufdjjOL7ybesAaZQog+qpX/R6oKayCqYCoKAmmpVCCaYBqYGpAAbabF8z+3yPxh0XsXJUycVPuYWm3IIyAFkhRmRowl/4hdU2uSFOZHFjv7PDm0xtC+9VAmspkwOAOxw1rgWj+H4uVH6hj08HSAAAAAElFTkSuQmCC'
          })

          const pt = new Point({ longitude: lon, latitude: lat, spatialReference: self.map.spatialReference })
          const gr = new Graphic({ geometry: pt, symbol: ptSym })
          this.graphicsLayer.add(gr)

          // Update the Stencil Component with new location
          elem.setAttribute('report-geometry', '')
          const s = lon + ', ' + lat
          elem.setAttribute('report-location', s)

          self._allowPropChanges()
        } else {
          //TODO: update stencil component with new location and
          // fetch buffer geometry from element.  This call causes
          // a new infographic to be rendered, and updates all the
          // component props below.

          // @ts-expect-error
          elem.generateBuffers(
            this.bufferType,
            this.bufferSizesString, // "1,3,5"
            this.units, // 'minutes', 'miles', or 'kilometers'
            lat.toString(),
            lon.toString()
          ).then(
            function (data) {
              if (!data || data.error) {
                console.log('map actions generateBuffers: ', data.error)
              } else if (data.length > 0) {
                let outerPoly
                for (let ii = data.length - 1; ii >= 0; ii--) {
                  // create map graphics for the drive/walk rings
                  const polygon = {
                    type: 'polygon',
                    rings: data[ii].rings[0]
                  }
                  const simpleFillSymbol = {
                    type: 'simple-fill',
                    color: self.colors[ii].color,
                    outline: self.colors[ii].outline
                  }
                  const polyGraphic = new Graphic({
                    // @ts-expect-error
                    geometry: polygon,
                    symbol: simpleFillSymbol
                  })
                  self.graphicsLayer.add(polyGraphic)
                  if (!outerPoly) outerPoly = polyGraphic
                }
                self.view.goTo(outerPoly.geometry)
              }

              // Show the found search location dot
              const ptSym = new PictureMarkerSymbol({
                width: 14,
                height: 26.6,
                xoffset: 0,
                yoffset: 12.6,
                url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAjCAYAAAB2KjFhAAACtUlEQVRIS+2WS0wTURSG/zvT0kpfkGJ4pGCViA1Em9CtCQVx5QIWhiVRo8GdSNypqHElkcgOlzVh5ap1X6nEiAkQXzGBxkSKtZC0jdTSB7SdMXdwRjudB+w5q5t7T775z3/OzR0CWbT4x90Glh0CMEx43g1C3FIKz6/zhKwDCJYrldBWZIaupSDiqsE/3mBjmGeMyXLF7GiBubEVhmN2sIY6KblS3kO58BvFX5soZrbA7eYCWY67vR2Z2aZJAoyqMTLMvLXN47a1eeRiUSrmUSrmhHSGNYA11oGtMyO3FcVOYnW9xHH9VKUAcw1MfHSc9HktzvYaEN34B6suymSxCwozsQ+ReHi6n7gG7/iNZvv88W6/Ikgdtl+Y2d6I5NfXqJQK/cQ1MPHQ1uZ5oFSeSFdWtn9Ky93b/olsYvURhUWcXef7TPamGmWXfM3oPeVAi8OIeDKLpWgSrxY3qvIY1gjCl5GOvn2jCLOaWUyN9sDX6aj5wNJaErdm3yNbKAlnurCp0W709ThVPQy+i+H+ixV92OlWC+bGe1VB4sHlx2GsxTPayqhPkyNdurB7gRWEFmPasBsXT+D6YIcu7MnLz5gLf9OG0e7Njp3ThV2bXsBSNKUNo518ftML6p1aUK+oZwfqJgVRIAXLg47E1acLgvkHgtGk1kYTJkfOCEMrxnI0hbuBZSTSeWlPd87kaprqeWwkUopVHxqmdTePYMqTdeRZ9d1svzARtLnODlmbO1XvoqpnhMBkaUAhHUM2/iVE6ONrZZjIoZ+6v6BiZhOZ7yufdjjOL7ybesAaZQog+qpX/R6oKayCqYCoKAmmpVCCaYBqYGpAAbabF8z+3yPxh0XsXJUycVPuYWm3IIyAFkhRmRowl/4hdU2uSFOZHFjv7PDm0xtC+9VAmspkwOAOxw1rgWj+H4uVH6hj08HSAAAAAElFTkSuQmCC'
              })
              // const ptSym = new SimpleMarkerSymbol({
              //   color: [51, 51, 204, 0.15],
              //   outline: {
              //     color: 'blue',
              //     width: 1
              //   },
              //   size: '6px'
              // })

              const pt = new Point({ longitude: lon, latitude: lat, spatialReference: self.map.spatialReference })
              const gr = new Graphic({ geometry: pt, symbol: ptSym })
              self.graphicsLayer.add(gr)

              self._allowPropChanges()
            },
            function (err) {
              console.log(err)
            })
        }
      }
    }
}
