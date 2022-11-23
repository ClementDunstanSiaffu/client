/** @jsx jsx */
import { React } from 'jimu-core'
import { JimuMapView } from 'jimu-arcgis'
import Weather from 'esri/widgets/Weather'
//import WeatherViewModel from 'esri/widgets/Weather/WeatherViewModel'
import { WeatherConfig, WeatherType } from '../../../constraints'
import { useEnvDefault } from './utils/env-defaults'

export interface WeatherProps {
  jimuMapView: JimuMapView
  weatherConfig: WeatherConfig
  onUpdated: () => void
}
export const useWeather = (props: WeatherProps) => {
  const { cacheDefaultWeather, restoreDefaultWeather } = useEnvDefault()

  const { onUpdated } = props
  const widgetRef = React.useRef<__esri.Weather>(null)
  const DEFALUT_PARAMS = React.useMemo(() => {
    return {
      cloudCover: 0.5,
      precipitation: 0.5,
      fogStrength: 0.5
    }
  }, [])

  const envWatcher = React.useRef<__esri.WatchHandle>(null)

  const setDefaultConfig = React.useCallback((type: WeatherType, view: __esri.SceneView) => {
    switch (type) {
      case WeatherType.Sunny:{
        const params = props.weatherConfig.sunnyConfig

        view.environment.weather = {
          type: type,
          cloudCover: params?.cloudCover ?? DEFALUT_PARAMS.cloudCover
        } as __esri.SunnyWeather
        break
      }
      case WeatherType.Cloudy:{
        const params = props.weatherConfig.cloudyConfig

        view.environment.weather = {
          type: type,
          cloudCover: params?.cloudCover ?? DEFALUT_PARAMS.cloudCover
        } as __esri.CloudyWeather
        break
      }
      case WeatherType.Rainy:{
        const params = props.weatherConfig.rainyConfig

        view.environment.weather = {
          type: type,
          cloudCover: params?.cloudCover ?? DEFALUT_PARAMS.cloudCover,
          precipitation: params?.precipitation ?? DEFALUT_PARAMS.precipitation
        } as __esri.RainyWeather
        break
      }
      case WeatherType.Snowy:{
        const params = props.weatherConfig.snowyConfig

        view.environment.weather = {
          type: type,
          cloudCover: params?.cloudCover ?? DEFALUT_PARAMS.cloudCover,
          precipitation: params?.precipitation ?? DEFALUT_PARAMS.precipitation
          //snowCover: params?.snowCover ?? 'disabled'
        } as __esri.SnowyWeather
        break
      }
      case WeatherType.Foggy:{
        const params = props.weatherConfig.foggyConfig

        view.environment.weather = {
          type: type,
          fogStrength: params?.fogStrength ?? DEFALUT_PARAMS.fogStrength
        } as __esri.FoggyWeather
        break
      }

      default: {
        break
      }
    }
  }, [props.weatherConfig, DEFALUT_PARAMS])

  //1
  const _updateWidget = React.useCallback((domRef: HTMLDivElement) => {
    const view = props.jimuMapView?.view as __esri.SceneView
    cacheDefaultWeather(view)

    setDefaultConfig(props.weatherConfig.weatherType, view)

    widgetRef.current = new Weather({
      //id: props.id,
      container: domRef,
      view: view
      // viewModel: new WeatherViewModel({
      //   view: view//,
      //   //weatherType: props.weatherConfig.weatherType
      // })
    })

    widgetRef.current.when(() => {
      onUpdated()
      // init weatherType
      //widgetRef.current.viewModel.setWeatherByType(props.weatherConfig.weatherType)

      // every time when switching weather type, set default config ,#10116
      envWatcher.current = view.watch('environment.weather.type', () => {
        //console.log('==>111 ' + view.environment.weather.type)
        setDefaultConfig(view.environment.weather.type as WeatherType, view)
      })
    })

    return widgetRef.current
  }, [props.jimuMapView, props.weatherConfig.weatherType,
    setDefaultConfig,
    cacheDefaultWeather, onUpdated])

  const _destoryWidget = React.useCallback(() => {
    envWatcher?.current?.remove()

    restoreDefaultWeather(props.jimuMapView.view as __esri.SceneView)
  }, [props.jimuMapView,
    restoreDefaultWeather])

  // export interfaces
  return {
    // ref
    weatherRef: widgetRef.current,
    // update
    updateWeatherWidget: _updateWidget,
    // remove
    destoryWeatherWidget: _destoryWidget
  }
}
