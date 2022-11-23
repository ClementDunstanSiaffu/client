/** @jsx jsx */
import { React } from 'jimu-core'
import { JimuMapView } from 'jimu-arcgis'
import ShadowCast from 'esri/widgets/ShadowCast'
import ShadowCastViewModel from 'esri/widgets/ShadowCast/ShadowCastViewModel'
import { ShadowCastConfig } from '../../../constraints'

export interface ShadowCastProps {
  jimuMapView: JimuMapView
  shadowCastConfig: ShadowCastConfig
  onUpdated: () => void
}
export const useShadowCast = (props: ShadowCastProps) => {
  const { onUpdated } = props
  const widgetRef = React.useRef<__esri.ShadowCast>(null)

  //1
  const _updateWidget = React.useCallback((domRef: HTMLDivElement) => {
    widgetRef.current = new ShadowCast({
      //id: props.id,
      container: domRef,
      view: props.jimuMapView?.view,
      visibleElements: {
        timezone: props.shadowCastConfig.timezone,
        datePicker: props.shadowCastConfig.datePicker
      },
      viewModel: new ShadowCastViewModel({
        view: props.jimuMapView?.view,
        visualizationType: props.shadowCastConfig.visType
      })
    })

    widgetRef.current.when(() => {
      onUpdated()
    })

    return widgetRef.current
  }, [props.jimuMapView, props.shadowCastConfig,
    onUpdated])

  const _destoryWidget = React.useCallback(() => {
  }, [])

  // export interfaces
  return {
    // ref
    shadowCastRef: widgetRef.current,
    // update
    updateShadowCastWidget: _updateWidget,
    // remove
    destoryShadowCastWidget: _destoryWidget
  }
}
