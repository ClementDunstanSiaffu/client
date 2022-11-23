/** @jsx jsx */
import { React } from 'jimu-core'
import { JimuMapView } from 'jimu-arcgis'
import Daylight from 'esri/widgets/Daylight'
import DaylightViewModel from 'esri/widgets/Daylight/DaylightViewModel'
import { DaylightConfig, DateOrSeason, Season } from '../../../constraints'
import { useEnvDefault } from './utils/env-defaults'

export interface DaylightProps {
  jimuMapView: JimuMapView
  daylightConfig: DaylightConfig
  onUpdated: () => void
}
export const useDaylight = (props: DaylightProps) => {
  const { cacheDefaultLighting, restoreDefaultLighting } = useEnvDefault()

  const { onUpdated } = props
  const widgetRef = React.useRef<__esri.Daylight>(null)

  // const _initEnv = React.useCallback((view: __esri.SceneView) => {
  //   view.environment.lighting.directShadowsEnabled = props.daylightConfig.isShowShadows ?? true
  // }, [props.daylightConfig])

  //1
  const _updateWidget = React.useCallback((domRef: HTMLDivElement) => {
    const view = props.jimuMapView?.view as __esri.SceneView
    cacheDefaultLighting(view)

    //_initEnv(view)

    //vm
    // TODO
    const vmOptions: __esri.DaylightViewModelProperties = {
      view: view
    }
    // if (props.daylightConfig.dateOrSeason === DateOrSeason.Season &&
    //   props.daylightConfig.currentSeason !== Season.SyncedWithMap) {
    //   vmOptions = { ...vmOptions, ...{ currentSeason: props.daylightConfig.currentSeason } }
    // }
    // eslint-disable-next-line
    const vm = new DaylightViewModel(vmOptions) // API bug ,#9697

    widgetRef.current = new Daylight({
      //id: props.id,
      container: domRef,
      view: view,
      visibleElements: {
        timezone: props.daylightConfig.timezone,
        playButtons: props.daylightConfig.playButtons,
        datePicker: props.daylightConfig.datePicker,
        sunLightingToggle: props.daylightConfig.dateTimeToggle,
        shadowsToggle: props.daylightConfig.isShowShadows
      },
      timeSliderSteps: props.daylightConfig.timeSliderSteps,
      playSpeedMultiplier: props.daylightConfig.playSpeedMultiplier,
      dateOrSeason: props.daylightConfig.dateOrSeason ?? DateOrSeason.Date
      //viewModel: new DaylightViewModel(vmOptions) // API bug ,#9697
    })

    widgetRef.current.when(() => {
      onUpdated()

      // TODO API bug ,#9697
      if (props.daylightConfig.dateOrSeason === DateOrSeason.Season &&
        props.daylightConfig.currentSeason !== Season.SyncedWithMap) {
        //vmOptions = { ...vmOptions, ...{ currentSeason: props.daylightConfig.currentSeason } }
        widgetRef.current.viewModel.set('currentSeason', props.daylightConfig.currentSeason)
      }

      const autoPlay = props.daylightConfig.dateTimeAutoPlay
      if (props.daylightConfig.dateOrSeason === DateOrSeason.Season) {
        // widgetRef.current.viewModel.set('yearPlaying', autoPlay)
      } else {
        widgetRef.current.viewModel.set('dayPlaying', autoPlay)
      }
    })

    return widgetRef.current
  }, [props.jimuMapView, props.daylightConfig,
    //_initEnv,
    cacheDefaultLighting, onUpdated])

  const _destoryWidget = React.useCallback(() => {
    restoreDefaultLighting(props.jimuMapView.view as __esri.SceneView)
  }, [props.jimuMapView,
    restoreDefaultLighting])

  // export interfaces
  return {
    // ref
    daylightRef: widgetRef.current,
    // update
    updateDaylightWidget: _updateWidget,
    // remove
    destoryDaylightWidget: _destoryWidget
  }
}
