import { DataSourceManager } from 'jimu-core'
import { FeatureLayerDataSource } from 'jimu-core/data-source'
import { JimuMapView, MapViewManager } from 'jimu-arcgis'
import UtilityNetworkTrace from 'esri/widgets/UtilityNetworkTrace'
import watchUtils from 'esri/core/watchUtils'

export default class WidgetModel {
  private static instance: WidgetModel;

  public unt: UtilityNetworkTrace = null

  private props: any = null

  readonly mvManager: MapViewManager = MapViewManager.getInstance();

  static getInstance (): WidgetModel {
    if (!WidgetModel.instance) {
      WidgetModel.instance = new WidgetModel()
    }
    return WidgetModel.instance
  }

  /****** PUBLIC METHODS ****/
  public loadPropsFromView (props) {
    this.props = props
  }

  public loadTraceWidgetFromAPI (jmv: any, domRef: any): UtilityNetworkTrace {
    if (this.unt !== null) {
      if (this.unt.viewModel !== null) {
        this.unt.viewModel.reset()
      }
    }
    const unt = new UtilityNetworkTrace({
      container: domRef,
      view: jmv.view,
      showSelectionAttributes: true,
      selectOnComplete: true,
      showGraphicsOnComplete: true,
      selectedTraces: [],
      flags: []
    })
    this.unt = unt
    this.registerEvents()
    return unt
  }

  public registerEvents () {
    // @ts-expect-error: 'select-features' event is not documented for 4.23, let us fix it later.
    this.unt.on('select-features', (res) => {
      this.clearSelection(res)
      const mapDS = this.getActiveMap()
      const mapLyrVws = mapDS.jimuLayerViews
      const dsObj = DataSourceManager.getInstance()
      // @ts-expect-error: 'res' is not documented as a result set from this event.
      res.resultSet.forEach((arrResult) => {
        arrResult.forEach((rs) => {
          //dsObj.forEach((ds) => {
          for (const key in mapLyrVws) {
            const ds = dsObj.getDataSource(mapLyrVws[key].layerDataSourceId)
            if (ds.type === 'FEATURE_LAYER') {
              const objectIdList = []
              const featDatRecList = []
              // @ts-expect-error
              if (ds.layer.id === rs.layer.id) {
                rs.featureSet.features.forEach((feat) => {
                  featDatRecList.push(ds.buildRecord(feat))
                  objectIdList.push(feat.attributes.objectid)
                })
                ds.selectRecordsByIds(objectIdList.map(String), featDatRecList, true)
              }
            }
          }
        })
      })
    })
    // @ts-expect-error: 'clear-selection' event is not documented for 4.23, let us fix it later.
    this.unt.on('clear-selection', (res) => {
      if (this.unt) {
        this.clearSelection(res)
      }
    })
    const fsDS = this.getFeatureLayerDS()
    if (fsDS !== null) {
      this.unt.gdbVersion = fsDS.getGDBVersion()
      watchUtils.watch(fsDS.layer, 'gdbVersion', async (value) => {
        this.unt.gdbVersion = value
      })
    }
  }

  public clearSelection (res) {
    const mapDS = this.getActiveMap()
    if (mapDS !== null) {
      const mapLyrVws = mapDS.jimuLayerViews
      const dsObj = DataSourceManager.getInstance()
      if (res.resultSet.length > 0) {
        res.resultSet.forEach((arrResult) => {
          arrResult.forEach((rs) => {
            for (const key in mapLyrVws) {
              const ds = dsObj.getDataSource(mapLyrVws[key].layerDataSourceId)
              if (ds) {
                if (ds.type === 'FEATURE_LAYER') {
                  //const dsJson = ds.getDataSourceJson()
                  // @ts-expect-error
                  if (ds.layer.id === rs.layer.id) {
                    ds.clearSelection()
                  }
                }
              }
            }
          })
        })
      } else {
        for (const key in mapLyrVws) {
          const ds = dsObj.getDataSource(mapLyrVws[key].layerDataSourceId)
          if (ds) {
            if (ds.type === 'FEATURE_LAYER') {
              //const dsJson = ds.getDataSourceJson()
              //if (dsJson.url !== null && dsJson.url === rs.layerUrl) {
              ds.clearSelection()
              //}
            }
          }
        }
      }
    }
  }

  public clearAll () {
    //const mapDS = this.getActiveMap()
    //const mapLyrVws = mapDS.jimuLayerViews
    let activeMap = null
    const allIds = this.mvManager.getAllJimuMapViewIds()
    allIds.forEach((ids) => {
      const jmapView = this.mvManager.getJimuMapViewById(ids)
      if (jmapView.isActive) {
        activeMap = jmapView
      }
    })

    if (activeMap !== null) {
      const dsObj = DataSourceManager.getInstance()
      const mapLyrVws = activeMap.jimuLayerViews
      for (const key in mapLyrVws) {
        const ds = dsObj.getDataSource(mapLyrVws[key].layerDataSourceId)
        if (ds) {
          if (ds.type === 'FEATURE_LAYER') {
            ds.clearSelection()
          }
        }
      }
      activeMap.view.graphics.removeAll()
      this.callResetOnJSWidget()
    }
  }

  public callResetOnJSWidget () {
    if (this.unt !== null) {
      if (this.unt.viewModel !== null) {
        //@ts-expect-error
        if (this.unt.viewModel._unObject !== null) {
          this.unt.viewModel.reset()
        }
      }
    }
  }

  public getActiveMap (): JimuMapView {
    let returnVal = null
    if (this.props) {
      if (this.props.config.useMapWidget) {
        const mapViewGroups = this.mvManager.getJimuMapViewGroup(this.props.config.useMapWidgetIds)
        if (mapViewGroups && mapViewGroups.jimuMapViews) {
          for (const id in mapViewGroups.jimuMapViews) {
            if (mapViewGroups.jimuMapViews[id].dataSourceId) {
              if (
                mapViewGroups.jimuMapViews[id].isActive ||
                mapViewGroups.jimuMapViews[id].isActive === undefined
              ) {
                returnVal = mapViewGroups.jimuMapViews[id]
              }
            }
          }
        }
      }
    }
    return returnVal
  }

  public getFeatureLayerDS (): FeatureLayerDataSource {
    const mapDS = this.getActiveMap()
    if (mapDS !== null) {
      const mapLyrVws = mapDS.jimuLayerViews
      const dsObj = DataSourceManager.getInstance()
      for (const key in mapLyrVws) {
        const ds = dsObj.getDataSource(mapLyrVws[key].layerDataSourceId)
        if (ds) {
          if (ds.type === 'FEATURE_LAYER') {
            const flDS = ds as FeatureLayerDataSource
            const lyrDef = flDS.getLayerDefinition()
            const unField = lyrDef.fields.some((fld) => {
              return fld.name.toLowerCase() === 'subnetworkname'
            })
            if (unField) { return flDS }
          }
        } else {
          return null
        }
      }
      return null
    } else {
      return null
    }
  }
}
