/** @jsx jsx */
import { React, jsx, ImmutableObject } from 'jimu-core'
import { hooks, Button, Label, Loading, LoadingType, defaultMessages as jimuUIMessages } from 'jimu-ui'
import { useTheme } from 'jimu-theme'
import { JimuMapView } from 'jimu-arcgis'
import defaultMessages from '../../translations/default'
import {
  Tool3D, ToolsID,
  DaylightConfig, WeatherConfig, ShadowCastConfig, LineOfSightConfig
} from '../../../constraints'
import { getStyle } from './style'

import { useDaylight } from './daylight'
import { useWeather } from './weather'
import { useShadowCast } from './shadowcast'
import { useLineOfSight } from './lineofsight'

import { ArrowLeftOutlined } from 'jimu-icons/outlined/directional/arrow-left'

export interface Props {
  mode: ToolsID // mode for this panel
  toolConfig: ImmutableObject<Tool3D>
  useMapWidgetId: string
  jimuMapView: JimuMapView

  shownModeState: ImmutableObject<Tool3D> // show state
  isShowBackBtn?: boolean
  onBackBtnClick: () => void
  // for clear fun, driven by state
  //clearVersion4KeepApiWidgetState?: number
  //onBackAndClearClick?: () => void
}

export const ToolPanel = React.memo((props: Props) => {
  const theme = useTheme()
  const translate = hooks.useTranslate(defaultMessages, jimuUIMessages)

  const domContainerRef = React.useRef<HTMLDivElement>(null)
  const widgetRef = React.useRef<__esri.Daylight | __esri.Weather | __esri.ShadowCast | __esri.LineOfSight>(null)

  const keepApiWidgetFlagRef = React.useRef<boolean>(props.toolConfig.activedOnLoad)
  React.useEffect(() => {
    keepApiWidgetFlagRef.current = props.toolConfig.activedOnLoad
  }, [props.toolConfig]) // update flag when config changed

  const [isLoadingState, setIsLoadingState] = React.useState<boolean>(true) // API loading flag
  const hideApiLoading = React.useCallback(() => {
    setIsLoadingState(false)
  }, [])

  // widgets
  const { updateDaylightWidget, destoryDaylightWidget } = useDaylight({
    jimuMapView: props.jimuMapView,
    daylightConfig: props.toolConfig.config as DaylightConfig,
    onUpdated: hideApiLoading
  })
  const { updateWeatherWidget, destoryWeatherWidget } = useWeather({
    jimuMapView: props.jimuMapView,
    weatherConfig: props.toolConfig.config as WeatherConfig,
    onUpdated: hideApiLoading
  })
  const { updateShadowCastWidget, destoryShadowCastWidget } = useShadowCast({
    jimuMapView: props.jimuMapView,
    shadowCastConfig: props.toolConfig.config as ShadowCastConfig,
    onUpdated: hideApiLoading
  })
  const { updateLineOfSightWidget, destoryLineOfSightWidget } = useLineOfSight({
    jimuMapView: props.jimuMapView,
    lineOfSightConfig: props.toolConfig.config as LineOfSightConfig,
    onUpdated: hideApiLoading
  })

  function createContainerDom (id: ToolsID) {
    const c = document.createElement('div')
    c.className = id + '-container w-100'
    domContainerRef.current.innerHTML = ''
    domContainerRef.current.appendChild(c)

    return c
  }

  const destoryWidget = React.useCallback(() => {
    //console.log('==> destoryWidget ' + props.mode)
    if (widgetRef.current?.view?.map) {
      // subclass destruction implementation
      switch (props.mode) {
        case ToolsID.Daylight: {
          destoryDaylightWidget()
          break
        }
        case ToolsID.Weather: {
          destoryWeatherWidget()
          break
        }
        case ToolsID.ShadowCast: {
          destoryShadowCastWidget()
          break
        }
        case ToolsID.LineOfSight: {
          destoryLineOfSightWidget()
          break
        }

        default: {
          break
        }
      }
    }

    widgetRef?.current?.destroy()
    widgetRef.current = null

    if (domContainerRef?.current) {
      domContainerRef.current.innerHTML = ''
    }
  }, [props.mode,
    destoryDaylightWidget, destoryWeatherWidget,
    destoryShadowCastWidget, destoryLineOfSightWidget])

  const initWidget = React.useCallback(() => {
    destoryWidget()
    //console.log('==> initWidget ' + props.mode)

    const isEnable = props.toolConfig.enable
    if (isEnable) {
      switch (props.mode) {
        case ToolsID.Daylight: {
          widgetRef.current = updateDaylightWidget(createContainerDom(props.mode))
          break
        }
        case ToolsID.Weather: {
          widgetRef.current = updateWeatherWidget(createContainerDom(props.mode))
          break
        }
        case ToolsID.ShadowCast: {
          widgetRef.current = updateShadowCastWidget(createContainerDom(props.mode))
          break
        }
        case ToolsID.LineOfSight: {
          widgetRef.current = updateLineOfSightWidget(createContainerDom(props.mode))
          break
        }

        default: {
          break
        }
      }
    }
  }, [props.mode, props.toolConfig, //props.jimuMapView,
    destoryWidget,
    updateDaylightWidget, updateWeatherWidget, updateShadowCastWidget, updateLineOfSightWidget
  ])

  // on map changed
  React.useEffect(() => {
    if (!props.useMapWidgetId) {
      destoryWidget()
    }

    return () => {
      destoryWidget()
    }
  }, [props.jimuMapView?.view, props.useMapWidgetId,
    props.toolConfig,
    destoryWidget, initWidget])

  // on shownModeState changed
  const { onBackBtnClick } = props
  React.useEffect(() => {
    if (props.shownModeState?.id === props.mode) {
      keepApiWidgetFlagRef.current = true // reset to true
    }// else : 1.init by 'toolConfig.activedOnLoad'; 2. destory by click 'Back&Clear'

    if (keepApiWidgetFlagRef?.current) {
      if (!widgetRef.current && props.useMapWidgetId && props.jimuMapView?.view) {
        initWidget()
      }
    } else {
      if (widgetRef.current) {
        destoryWidget()
      }
    }
  }, [props.mode,
    props.useMapWidgetId, props.jimuMapView?.view, // map changed
    props.shownModeState, //show state
    props.toolConfig, // config changed
    //keepApiWidgetState,
    destoryWidget, initWidget
  ])

  const _isShow = (props.shownModeState?.id === props.mode)
  const clearTips = (props.mode === ToolsID.Daylight || props.mode === ToolsID.Weather) ? translate('clearEffect') : translate('clearAnalysis')
  return (
    <div className={'p-2 w-100 ' + (_isShow ? 'd-block' : 'd-none')} css={getStyle(theme)}>
      {((props.isShowBackBtn) && (typeof onBackBtnClick === 'function')) &&
        <div className="tool-header d-flex align-items-center">
          <Button className="pr-1" type='tertiary' onClick={onBackBtnClick}>
            <ArrowLeftOutlined size={16} autoFlip={true}/>
          </Button>

          <Label className="label m-0">{translate(props.mode)}</Label>
        </div>
      }

      <div className="tool-content">
        {isLoadingState && <div className="api-loader m-2">
          <Loading type={LoadingType.Secondary}></Loading>
        </div>}

        <div ref={domContainerRef}></div>

        <div className="tool-footer w-100 px-3 mb-2">
          <Button type="secondary" className={'w-100'} onClick={() => {
            keepApiWidgetFlagRef.current = false
            //setKeepApiWidgetState(false)
            onBackBtnClick()
          }}>{clearTips}</Button>
        </div>
      </div>
    </div>
  )
})
