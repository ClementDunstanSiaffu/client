/** @jsx jsx */
import { React, jsx, css, AllWidgetProps, DataSourceManager, DataSourceStatus, FeatureLayerDataSource, dataSourceUtils, UseUtility, UtilityManager, getAppStore } from 'jimu-core'
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { hooks, defaultMessages as jimuUIMessages, WidgetPlaceholder } from 'jimu-ui'
import Directions from 'esri/widgets/Directions'
import FeatureLayer from 'esri/layers/FeatureLayer'

import { IMConfig, IMSearchConfig } from '../config'
import { DefaultJSAPISearchProperties } from '../constants'
import { getDirectionPointOutputDsId, getDirectionLineOutputDsId, getRouteOutputDsId, getStopOutputDsId } from '../utils'
import defaultMessages from './translations/default'
import WidgetIcon from 'jimu-icons/svg/outlined/brand/widget-direction.svg'

const { useEffect, useState, useRef, useCallback, useMemo } = React

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const { config, id } = props
  const { searchConfig, routeConfig } = config
  const useMapWidgetId = props.useMapWidgetIds?.[0]
  const [jimuMapView, setJimuMapView] = useState<JimuMapView>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const directionsRef = useRef<__esri.Directions>(null)
  const watchLastRouteRef = useRef<__esri.WatchHandle>(null)
  const translate = hooks.useTranslate(defaultMessages, jimuUIMessages)
  const defaultSearchHint = useMemo(() => translate('findAddressOrPlace'), [translate])

  const onActiveMapViewChange = useCallback(activeView => {
    setJimuMapView(activeView)
  }, [])

  const isReadyToRenderDirections = useCallback((): boolean => {
    if (useMapWidgetId && routeConfig?.useUtility && searchConfig?.dataConfig?.[0]?.useUtility) {
      const utilities = getAppStore().getState().appConfig?.utilities
      return !!(utilities && utilities[routeConfig.useUtility.utilityId] && utilities[searchConfig.dataConfig[0].useUtility.utilityId])
    } else {
      return false
    }
  }, [useMapWidgetId, routeConfig?.useUtility, searchConfig?.dataConfig])

  useEffect(() => {
    if (isReadyToRenderDirections() && jimuMapView?.view && containerRef.current) {
      updateDirectionsWidget()
    } else {
      destroyDirectionsWidget()
    }

    async function updateDirectionsWidget () {
      destroyDirectionsWidget()
      const routeServiceUrl = await getUrlOfUseUtility(routeConfig?.useUtility)
      const searchProperties = await convertSearchConfigToJSAPISearchProperties(searchConfig, defaultSearchHint)
      /**
       * If can not get url of used utility, won't update directions.
       */
      if (!routeServiceUrl || !searchProperties?.sources?.[0]?.url) {
        return
      }
      const c = document.createElement('div')
      c.className = 'directions-container'
      containerRef.current.innerHTML = ''
      containerRef.current.appendChild(c)
      directionsRef.current = new Directions({
        id,
        container: c,
        view: jimuMapView?.view,
        routeServiceUrl: routeServiceUrl,
        searchProperties: searchProperties
      })
      // Set route parameters to get needed data from route service.
      directionsRef.current.viewModel.routeParameters.returnRoutes = true
      directionsRef.current.viewModel.routeParameters.returnDirections = true
      directionsRef.current.viewModel.routeParameters.returnStops = true

      setOutputDssNotReady(id)
      watchLastRoute()
    }

    function watchLastRoute () {
      watchLastRouteRef.current = directionsRef.current.watch('lastRoute', () => {
        if (directionsRef.current.lastRoute) { // If there is route result, change status of output data sources to unloaded.
          setOutputDssUnloadedAndSetLayer(id, directionsRef.current.lastRoute)
        } else { // If there isn't route result, change status of output data sources to not_ready.
          setOutputDssNotReady(id)
        }
      })
    }

    function destroyDirectionsWidget () {
      // If do not have map, destroy will throw error.
      if (directionsRef.current?.view?.map) {
        directionsRef.current.destroy()
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      try {
        // Remove save as popper.
        const saveAsPopper = document.querySelector('calcite-panel.esri-save-layer')?.parentElement
        if (saveAsPopper && saveAsPopper.tagName.toUpperCase() === 'CALCITE-POPOVER') {
          document.body.removeChild(saveAsPopper)
        }
      } catch (e) {}
    }

    return () => {
      watchLastRouteRef.current?.remove()
      destroyDirectionsWidget()
    }
  }, [id, jimuMapView?.view, searchConfig, routeConfig?.useUtility, defaultSearchHint, isReadyToRenderDirections])

  return (
    <div className='widget-directions jimu-widget'>
      {
        isReadyToRenderDirections()
          ? <JimuMapViewComponent useMapWidgetId={useMapWidgetId} onActiveViewChange={onActiveMapViewChange} />
          : <WidgetPlaceholder widgetId={id} icon={WidgetIcon} message={translate('_widgetLabel')} />
      }
      <div ref={containerRef} css={style}></div>
    </div>
  )
}

export default Widget

const style = css`
  width: 100% !important;
  height: 100% !important;
  .directions-container{
    width: 100% !important;
    height: 100% !important;
    .esri-search{
      .esri-search__container{
        .esri-search__sources-button{
          z-index: 0;
          border-top: none;
          border-right: solid 1px var(--light-300);
          border-bottom: none;
          border-left: none;
          margin-right: 1px;
        }
        .esri-search__input-container{
          margin: auto;
          .esri-search__clear-button{
            z-index: 0;
            right: 4px;
          }
        }
      }
    }
    .esri-directions__panel-content{
      padding: 0 0 20px 0;
    }
  }
`

async function convertSearchConfigToJSAPISearchProperties (searchConfig: IMSearchConfig, defaultHint: string): Promise< __esri.DirectionsSearchProperties & { locationEnabled?: boolean }> {
  const properties: __esri.DirectionsSearchProperties & { locationEnabled?: boolean } = { ...DefaultJSAPISearchProperties }

  const hint = searchConfig?.generalConfig?.hint || defaultHint
  if (hint) {
    properties.allPlaceholder = hint
  }
  if (typeof searchConfig?.suggestionConfig?.maxSuggestions === 'number') {
    properties.maxSuggestions = searchConfig.suggestionConfig.maxSuggestions
  }
  if (typeof searchConfig?.suggestionConfig?.isUseCurrentLoation === 'boolean') {
    properties.locationEnabled = searchConfig.suggestionConfig.isUseCurrentLoation
  }
  if (Array.isArray(searchConfig?.dataConfig)) {
    const sourcesPromise = searchConfig.dataConfig.map(async c => {
      const geocodeURL = await getUrlOfUseUtility(c.useUtility)
      const sources = {
        url: geocodeURL,
        name: c.label,
        placeholder: c.hint || defaultHint
      } as __esri.LocatorSearchSource
      return Promise.resolve(sources)
    })
    await Promise.all(sourcesPromise).then(sources => {
      properties.sources = sources as any
    })
  }

  return Promise.resolve(properties)
}

function getUrlOfUseUtility (useUtility: UseUtility): Promise<string> {
  if (!useUtility) {
    return Promise.resolve(null)
  }
  return UtilityManager.getInstance().getUrlOfUseUtility(useUtility).catch(e => null)
}

async function setOutputDssNotReady (widgetId: string) {
  try {
    const stopOutputDs = await DataSourceManager.getInstance().createDataSource(getStopOutputDsId(widgetId)) as FeatureLayerDataSource
    const routeOutputDs = await DataSourceManager.getInstance().createDataSource(getRouteOutputDsId(widgetId)) as FeatureLayerDataSource
    const directionPointOutputDs = await DataSourceManager.getInstance().createDataSource(getDirectionPointOutputDsId(widgetId)) as FeatureLayerDataSource
    const directionLineOutputDs = await DataSourceManager.getInstance().createDataSource(getDirectionLineOutputDsId(widgetId)) as FeatureLayerDataSource

    setDsNotReady(stopOutputDs)
    setDsNotReady(routeOutputDs)
    setDsNotReady(directionPointOutputDs)
    setDsNotReady(directionLineOutputDs)
  } catch (e) {
    console.log('Failed to create directions output data sources. ', e)
  }
}

async function setOutputDssUnloadedAndSetLayer (widgetId: string, result: __esri.RouteLayerSolveResult) {
  try {
    const stopOutputDs = await DataSourceManager.getInstance().createDataSource(getStopOutputDsId(widgetId)) as FeatureLayerDataSource
    const routeOutputDs = await DataSourceManager.getInstance().createDataSource(getRouteOutputDsId(widgetId)) as FeatureLayerDataSource
    const directionPointOutputDs = await DataSourceManager.getInstance().createDataSource(getDirectionPointOutputDsId(widgetId)) as FeatureLayerDataSource
    const directionLineOutputDs = await DataSourceManager.getInstance().createDataSource(getDirectionLineOutputDsId(widgetId)) as FeatureLayerDataSource

    createJSAPILayerForDs(stopOutputDs, 'point', convertToJSAPIGraphic(result.stops?.toArray()))
    createJSAPILayerForDs(routeOutputDs, 'polyline', convertToJSAPIGraphic(result.routeInfo ? [result.routeInfo] : []))
    createJSAPILayerForDs(directionPointOutputDs, 'point', convertToJSAPIGraphic(result.directionPoints?.toArray()))
    createJSAPILayerForDs(directionLineOutputDs, 'polyline', convertToJSAPIGraphic(result.directionLines?.toArray()))

    setDsUnloaded(stopOutputDs)
    setDsUnloaded(routeOutputDs)
    setDsUnloaded(directionPointOutputDs)
    setDsUnloaded(directionLineOutputDs)
  } catch (e) {
    console.log('Failed to create directions output data sources. ', e)
  }
}

function setDsNotReady (ds: FeatureLayerDataSource) {
  if (ds) {
    ds.setStatus(DataSourceStatus.NotReady)
    ds.setCountStatus(DataSourceStatus.NotReady)
  }
}

function setDsUnloaded (ds: FeatureLayerDataSource) {
  if (ds) {
    ds.setStatus(DataSourceStatus.Unloaded)
    ds.setCountStatus(DataSourceStatus.Unloaded)
  }
}

function createJSAPILayerForDs (ds: FeatureLayerDataSource, geoType: 'point' | 'polyline', source: __esri.Graphic[]) {
  if (!ds) {
    return
  }
  const idField = ds.getSchema().fields[ds.getIdField()]
  ds.layer = new FeatureLayer({
    id: ds.id,
    fields: dataSourceUtils.changeJimuFieldsToJSAPIFields(ds.getSchema().fields, idField),
    objectIdField: idField?.name,
    geometryType: geoType,
    source: source
  })
  ds.addSourceVersion()
}

function convertToJSAPIGraphic (res: __esri.Stop[] | __esri.RouteInfo[] | __esri.DirectionLine[] | __esri.DirectionPoint[]): __esri.Graphic[] {
  if (!res) {
    return []
  }
  return res.map((r: __esri.Stop |__esri.RouteInfo | __esri.DirectionLine | __esri.DirectionPoint) => r?.toGraphic()).filter(g => !!g)
}
