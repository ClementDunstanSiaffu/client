/** @jsx jsx */
import { React, jsx, ImmutableObject, ImmutableArray } from 'jimu-core'
import { hooks, Button, Popper, Label, defaultMessages as jimuUIMessages } from 'jimu-ui'
import { useTheme } from 'jimu-theme'
import { JimuMapView } from 'jimu-arcgis'
import defaultMessages from '../../translations/default'

import { Tool3D, ToolsID, ArrangementDirection } from '../../../constraints'
import { ToolPanel } from '../tool-panel/index'
import { getPopperStyle } from './style'

import { DaylightOutlined } from 'jimu-icons/outlined/gis/daylight'
import { WeatherOutlined } from 'jimu-icons/outlined/gis/weather'
import { ShadowCastOutlined } from 'jimu-icons/outlined/gis/shadow-cast'
import { LineOfSightOutlined } from 'jimu-icons/outlined/gis/line-of-sight'
import { CloseOutlined } from 'jimu-icons/outlined/editor/close'

export interface Props {
  direction: ArrangementDirection
  toolsConfig: ImmutableArray<Tool3D>
  findToolConfigById: (toolID: ToolsID) => ImmutableObject<Tool3D>
  useMapWidgetId: string
  jimuMapView: JimuMapView
}

export const IconMode = React.memo((props: Props) => {
  const theme = useTheme()
  const translate = hooks.useTranslate(defaultMessages, jimuUIMessages)
  const popperPositionRef = React.useRef(null)
  const [shownModeState, setPopperModeState] = React.useState<ImmutableObject<Tool3D>>(null)
  const [popupVisibleState, setPopupVisibleState] = React.useState(false)

  // const togglePoppup = React.useCallback((isOpenFlag: boolean/*, forceCloseFlag: boolean*/) => {
  //   const isOpen = isOpenFlag
  //   //let isChange = (popupVisibleState !== isOpen)
  //   // if (forceCloseFlag) { //forceCloseFlag, e.g. page change / unmount
  //   //   isChange = true
  //   //   isOpen = false
  //   // }
  //   setPopupVisibleState(isOpen)
  //   // if (typeof props.onPopperToggle === 'function' && isChange) {
  //   //   props.onPopperToggle(isOpen)
  //   // }
  // }, [/*props, popupVisibleState*/])
  const _closePoppup = React.useCallback(() => {
    setPopperModeState(null)
    setPopupVisibleState(false)
  }, [])
  // unmount // hooks.useUnmount(() => {
  React.useEffect(() => {
    return () => {
      _closePoppup()
    }
  }, [props.toolsConfig, _closePoppup])

  // const _currentActiveToolChanged = props.currentActiveToolChanged
  const handlePoppupToggle = React.useCallback((evt) => {
    let closePopper = false
    const isSwitchExbPage = (typeof evt === 'undefined')
    // if (isSwitchExbPage) {
    //   _currentActiveToolChanged(null)
    // }
    if (isSwitchExbPage || (evt && evt.key && evt?.key === 'Escape')) {
      closePopper = true
    }
    // if (!evt.key) {
    // TODO mouse click do not hide, like bookmark
    // }

    //const forceCloseFlag = isSwitchExbPage
    if (closePopper) {
      //togglePoppup(false/*, forceCloseFlag*/)
      //props.popperPositionRef?.focus() // 508 focus on PreviewBtn
      _closePoppup()
    }
  }, [_closePoppup/*togglePoppup*/])
  // version
  // const [popperVersion, setPopperVersion] = React.useState(props.popperVersion ?? 0)
  // React.useEffect(() => {
  //   setPopperVersion((_curPopperVersion) => _curPopperVersion + 1)
  // }, [popupVisibleState, props.popperVersion, props.popperPositionRef, props.popperIsVisible])

  // icons
  const _findToolConfigById = props.findToolConfigById
  const _getIconItem = React.useCallback((tool: ImmutableObject<Tool3D>) => {
    if (!tool.enable) {
      return null //disable
    }

    const name = translate('' + tool.id)
    let icon = null
    switch (tool.id) {
      case ToolsID.Daylight: {
        icon = <DaylightOutlined />
        break
      }
      case ToolsID.Weather: {
        icon = <WeatherOutlined />
        break
      }
      case ToolsID.ShadowCast: {
        icon = <ShadowCastOutlined />
        break
      }
      case ToolsID.LineOfSight: {
        icon = <LineOfSightOutlined />
        break
      }

      default: {
        break
      }
    }

    return <div className='icon-item d-flex' key={tool.id}>
      <Button type='tertiary' className='w-100' size='sm' icon={true}
        active={shownModeState?.id === tool.id} title={name} data-id={tool.id}
        onClick={(evt) => {
          const target = (evt.target as HTMLElement)
          popperPositionRef.current = target.dataset.id ? target : target.parentElement //click on the icon-resizer

          const id = (popperPositionRef.current.dataset.id) as ToolsID
          setPopperModeState(_findToolConfigById(id))
          setPopupVisibleState(!!id)
          //togglePoppup(id)
        }}>
        {icon}
      </Button>
    </div>
  }, [shownModeState, translate, _findToolConfigById])

  const directionClass = props.direction === ArrangementDirection.Horizontal ? 'flex-row' : 'flex-column'
  return (
    <React.Fragment>
      <div className={'icon-item-container d-flex p-1 ' + directionClass}>
        {
          props.toolsConfig.map((tool) => {
            return _getIconItem(tool)
          })
        }
      </div>

      <Popper
        reference={popperPositionRef.current}
        placement={(props.direction === ArrangementDirection.Vertical) ? 'right' : 'bottom'}
        //className='surface-2 border-0'
        offset={[0, 12]}
        showArrow={true}
        open={popupVisibleState}
        keepMount={true}
        //version={popperVersion}
        toggle={handlePoppupToggle}
        forceLatestFocusElements={true}
        //css={popperStyles()}
      >
        <div className={'content-container'} css={getPopperStyle(theme)}>
          {/* header */}
          <div className={'popper-header d-flex px-3 pt-2 align-items-center justify-content-between'}>
            <Label className="popper-title mt-0">{translate(shownModeState?.id ? shownModeState.id : '_widgetLabel')}</Label>
            <Button className='print-button pr-0' type='tertiary' size='sm' onClick={_closePoppup}>
              <CloseOutlined />
            </Button>
          </div>
          {/* content */}
          <div className={'popper-content'}>
            {/* Daylight */}
            {//(shownModeState?.id === ToolsID.Daylight) &&
              <ToolPanel
                mode={ToolsID.Daylight}
                toolConfig={props.findToolConfigById(ToolsID.Daylight)}
                useMapWidgetId={props.useMapWidgetId}
                jimuMapView={props.jimuMapView}

                shownModeState={shownModeState}
                onBackBtnClick={_closePoppup}
              ></ToolPanel>
            }

            {/* Weather */}
            {//(shownModeState?.id === ToolsID.Weather) &&
              <ToolPanel
                mode={ToolsID.Weather}
                toolConfig={props.findToolConfigById(ToolsID.Weather)}
                useMapWidgetId={props.useMapWidgetId}
                jimuMapView={props.jimuMapView}

                shownModeState={shownModeState}
                onBackBtnClick={_closePoppup}
              ></ToolPanel>
            }

            {/* ShadowCast */}
            {//(shownModeState?.id === ToolsID.ShadowCast) &&
              <ToolPanel
                mode={ToolsID.ShadowCast}
                toolConfig={props.findToolConfigById(ToolsID.ShadowCast)}
                useMapWidgetId={props.useMapWidgetId}
                jimuMapView={props.jimuMapView}

                shownModeState={shownModeState}
                onBackBtnClick={_closePoppup}
              ></ToolPanel>
            }

            {/* LineOfSight */}
            {//(shownModeState?.id === ToolsID.LineOfSight) &&
              <ToolPanel
                mode={ToolsID.LineOfSight}
                toolConfig={props.findToolConfigById(ToolsID.LineOfSight)}
                useMapWidgetId={props.useMapWidgetId}
                jimuMapView={props.jimuMapView}

                shownModeState={shownModeState}
                onBackBtnClick={_closePoppup}
              ></ToolPanel>
            }
          </div>
        </div>
      </Popper>
    </React.Fragment>
  )
})
