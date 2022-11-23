/** @jsx jsx */
import {
  React, AllWidgetProps, jsx, DataSource, ReactResizeDetector, MultipleDataSourceComponent, IMDataSourceInfo, DataSourceStatus,
  MapServiceDataSource, DataSourceManager, Immutable, DataSourceTypes
} from 'jimu-core'
import { FeatureLayerDataSource, JimuLayerView, JimuMapView, loadArcGISJSAPIModules, MapViewManager, ArcGISDataSourceTypes } from 'jimu-arcgis'
import { Alert, hooks, WidgetPlaceholder } from 'jimu-ui'
import { IMConfig, TimeDisplayStrategy } from '../config'
import TimeLine from './components/timeline'
import { getCalculatedTimeSettings, getInsideLayersFromWebmap, getTimeSettingsFromHonoredWebMap } from '../utils/utils'
import { MapDataSourceImpl } from 'jimu-arcgis/arcgis-data-source'
import defaultMessages from './translations/default'

const widgetIcon = require('jimu-icons/svg/outlined/brand/widget-timeline.svg')

type TimelineProps = AllWidgetProps<IMConfig>
const Widget = (props: TimelineProps) => {
  const {
    useDataSources, theme, id, config, intl
  } = props
  const {
    enablePlayControl, speed: _speed, autoPlay, timeSettings, honorTimeSettings, dataSourceType,
    timeStyle, foregroundColor, backgroundColor, sliderColor
  } = config
  const [timeExtent, setTimeExtent] = React.useState(null)
  const [applied, setApplied] = React.useState(true)
  const [speed, setSpeed] = React.useState(_speed)

  // Used to store all layer useDss from widget dataSources
  const [layerUseDss, setLayerUseDss] = React.useState(null)

  const [watchUtils, setWatchUtils] = React.useState(null)
  const [dataSources, setDataSources] = React.useState(null)
  const [isDsUpdating, setDsUpdating] = React.useState(true)
  const [isDsLoading, setDsLoading] = React.useState(true)
  const [width, setWidth] = React.useState(null)
  const [timeSettingsForRuntime, setDataSourcesForRuntime] = React.useState(null)
  const widgetRef = React.useRef<HTMLDivElement>(null)

  const mvManager = React.useMemo(() => MapViewManager.getInstance(), [])
  const dsManager = React.useMemo(() => DataSourceManager.getInstance(), [])

  React.useEffect(() => {
    setWidth(widgetRef.current?.clientWidth)
    loadArcGISJSAPIModules([
      'esri/core/watchUtils'
    ]).then(modules => {
      setWatchUtils(modules[0])
    })

    return () => {
      onTimeChanged(null, null, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    setDataSources(null)
    if (dataSourceType !== DataSourceTypes.FeatureLayer) {
      let _layerUseDss = null
      if (useDataSources?.length > 0) {
        _layerUseDss = []
        const promises = []
        useDataSources.forEach(useDs => {
          promises.push(dsManager.createDataSourceByUseDataSource(Immutable(useDs)))
        })
        Promise.all(promises).then(dataSources => { // maps, or mapServices
          const _dataSources = {}
          dataSources.forEach(ds => {
            _dataSources[ds.id] = ds
          })
          dataSources.forEach(ds => {
            ds.getAllChildDataSources().forEach(layerDs => { // inside layers
              if (layerDs.type === DataSourceTypes.FeatureLayer && layerDs.supportTime()) {
                _layerUseDss.push({
                  dataSourceId: layerDs.id,
                  mainDataSourceId: layerDs.getMainDataSource()?.id,
                  dataViewId: layerDs.dataViewId,
                  rootDataSourceId: layerDs.getRootDataSource()?.id
                })
              }
            })
          })
          setDataSources(_dataSources)
          setLayerUseDss(Immutable(_layerUseDss))
        }).catch(err => {})
      }
    } else {
      setLayerUseDss(useDataSources)
    }
  }, [useDataSources, dsManager, dataSourceType, setLayerUseDss, setDataSources])

  React.useEffect(() => {
    if (dataSources && watchUtils) {
      if (honorTimeSettings) {
        const { settings, speed } = getTimeSettingsFromHonoredWebMap(dataSources, true)
        setSpeed(speed)
        setDataSourcesForRuntime(settings)
      } else {
        const _timeSettings = getCalculatedTimeSettings(timeSettings, dataSources, true)
        setSpeed(_speed)
        setDataSourcesForRuntime(_timeSettings)
      }
    }
  }, [dataSources, watchUtils, honorTimeSettings, _speed, timeSettings])

  /** Call it when timeline plays for each extent since mapViewIds could be updated.
   *  1. Map widgets are created or rendered after timeline is ready. (Runtime & Builder)
   *  2. Selected webMap, or WebMap including selected mapServices or layers are used/removed by map widgets. (Builder)
   */
  const watchDsUpdating = () => {
    let layerIds = []
    let mapDs = null
    const allMapViewIds = mvManager.getAllJimuMapViewIds()
    if (dataSourceType === ArcGISDataSourceTypes.WebMap) {
      mapDs = dataSources[Object.keys(dataSources)[0]] as MapDataSourceImpl
      layerIds = mapDs.getAllChildDataSources().map(layerDs => layerDs.id)
    } else { // MapService, Feature layers
      layerIds = Object.keys(dataSources)
    }

    const requests = []
    layerIds.forEach(layerId => {
      const rootDs = mapDs || dataSources[layerId].getRootDataSource()
      if (rootDs?.type === ArcGISDataSourceTypes.WebMap) {
        const mapViewIds = allMapViewIds.filter(id => mvManager.getJimuMapViewById(id).dataSourceId === rootDs.id)
        mapViewIds.forEach(mapViewId => {
          const mapView = mvManager.getJimuMapViewById(mapViewId)
          const layerView = getLayerViewByLayerId(mapView, layerId)
          layerView?.view && requests.push(watchUtils.whenFalseOnce(layerView.view, 'updating'))
        })
      }
    })

    Promise.all(requests).then((result) => {
      setDsUpdating(false)
    })
  }

  const getLayerViewByLayerId = (mapView: JimuMapView, layerId: string): JimuLayerView => {
    let layerView = null
    Object.keys(mapView.jimuLayerViews).forEach(vid => {
      if (mapView.jimuLayerViews[vid].layerDataSourceId === layerId) {
        layerView = mapView.jimuLayerViews[vid]
      }
    })
    return layerView
  }

  const onTimeChanged = hooks.useEventCallback((startTime: number, endTime: number, unmount = false) => {
    if (!dataSources) {
      return
    }
    const queryParams = { time: unmount ? null : [startTime, endTime] } as any
    if (!unmount) {
      watchDsUpdating()
    }
    if (dataSourceType === ArcGISDataSourceTypes.WebMap) {
      const layers = getInsideLayersFromWebmap(dataSources, config.timeSettings?.layerList)
      Object.keys(layers).forEach(lyId => {
        updateLayerQueryParams(layers[lyId], queryParams, id)
      })
    } else {
      Object.keys(dataSources).forEach(dsId => {
        updateLayerQueryParams(dataSources[dsId], queryParams, id)
      })
    }
  })

  React.useEffect(() => {
    if (timeExtent) {
      onTimeChanged(timeExtent[0], timeExtent[1], !applied)
    }
  }, [timeExtent, applied, onTimeChanged])

  const updateLayerQueryParams = (layerDs, queryParams, id) => {
    if (layerDs.type === DataSourceTypes.MapService) {
      layerDs = layerDs as MapServiceDataSource
      if (layerDs.supportTime?.()) {
        layerDs.changeTimeExtent?.(queryParams.time, id)
      }
    } else if (layerDs.type === DataSourceTypes.FeatureLayer) {
      layerDs = layerDs as FeatureLayerDataSource
      if (layerDs.supportTime?.()) {
        layerDs.updateQueryParams?.(queryParams, id)
      }
    }
  }

  const onResize = (width) => {
    setWidth(width)
  }

  if (!useDataSources || useDataSources.length === 0) {
    return <WidgetPlaceholder
      icon={widgetIcon} widgetId={id}
      message={intl.formatMessage({ id: '_widgetLabel', defaultMessage: defaultMessages._widgetLabel })}
    />
  } else if ((dataSources && watchUtils && timeSettingsForRuntime === null) || timeSettingsForRuntime?.startTime?.value > timeSettingsForRuntime?.endTime?.value) {
    const noTlFromHonoredMap = 'Oops! Seems like something went wrong with this map and we cannot get any valid time settings.'
    const dateExtentError = 'Please check the widget configurations to make sure the time span is valid.'
    return <div className='placeholder-container w-100 h-100 position-relative'>
      <WidgetPlaceholder
        icon={widgetIcon} widgetId={id}
        message={intl.formatMessage({ id: '_widgetLabel', defaultMessage: defaultMessages._widgetLabel })}
      />
      <Alert
        buttonType='tertiary' form='tooltip' size='small' type='warning' withIcon={true} className='position-absolute'
        style={{ bottom: 10, right: 10, backgroundColor: 'var(--warning-100)', border: '1px solid var(--warning-300)' }}
        text={ timeSettingsForRuntime === null ? noTlFromHonoredMap : dateExtentError}
      />
    </div>
  } else {
    return (
      <div className='timeline-widget' ref={el => (widgetRef.current = el)}>
        <ReactResizeDetector handleWidth onResize={onResize}/>
        {
          layerUseDss?.length > 0 && <MultipleDataSourceComponent useDataSources={layerUseDss}>
            {(dss: { [dataSourceId: string]: DataSource }, infos: { [dataSourceId: string]: IMDataSourceInfo }) => {
              // set ds
              if (dataSourceType === DataSourceTypes.FeatureLayer) {
                const isCreated = Object.keys(infos).filter(dsId => [DataSourceStatus.Created, DataSourceStatus.CreateError].includes(infos[dsId]?.instanceStatus)).length === useDataSources.length
                if (!dataSources && isCreated && Object.keys(dss).length === useDataSources.length) {
                  setTimeout(() => {
                    setDataSources(dss)
                  }, 0)
                }
              }
              // set loading
              const isDsNotLoading = Object.keys(infos).filter(dsId => infos[dsId] && infos[dsId].status !== DataSourceStatus.Loading).length === Object.keys(infos).length
              setTimeout(() => {
                setDsLoading(!isDsNotLoading)
              }, 0)
            }}
          </MultipleDataSourceComponent>
          }

        {
          dataSources && timeSettingsForRuntime && <TimeLine
            theme={theme}
            width={width}
            updating={isDsLoading || isDsUpdating}
            startTime={timeSettingsForRuntime.startTime?.value}
            endTime={timeSettingsForRuntime.endTime?.value}
            accuracy={timeSettingsForRuntime.accuracy}
            stepLength={timeSettingsForRuntime.stepLength}
            dividedCount={timeSettingsForRuntime.dividedCount}
            cumulatively={timeSettingsForRuntime.timeDisplayStrategy === TimeDisplayStrategy.cumulatively}
            timeStyle={timeStyle}
            foregroundColor={foregroundColor}
            backgroundColor={backgroundColor}
            sliderColor={sliderColor}
            enablePlayControl={enablePlayControl}
            speed={speed}
            autoPlay={autoPlay}
            applied={applied}
            onTimeChanged={(sTime, eTime) => setTimeExtent([sTime, eTime])}
            onApplyStateChanged={applied => setApplied(applied)}
          />
        }
      </div>
    )
  }
}

export default Widget
