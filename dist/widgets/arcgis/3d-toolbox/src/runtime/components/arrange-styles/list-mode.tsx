/** @jsx jsx */
import { React, jsx, ImmutableObject, ImmutableArray } from 'jimu-core'
import { hooks, defaultMessages as jimuUIMessages } from 'jimu-ui'
import { JimuMapView } from 'jimu-arcgis'
import defaultMessages from '../../translations/default'

import { Tool3D, ToolsID } from '../../../constraints'

import { ToolPanel } from '../tool-panel/index'

import { DaylightOutlined } from 'jimu-icons/outlined/gis/daylight'
import { WeatherOutlined } from 'jimu-icons/outlined/gis/weather'
import { ShadowCastOutlined } from 'jimu-icons/outlined/gis/shadow-cast'
import { LineOfSightOutlined } from 'jimu-icons/outlined/gis/line-of-sight'

export interface Props {
  toolsConfig: ImmutableArray<Tool3D>
  findToolConfigById: (toolID: ToolsID) => ImmutableObject<Tool3D>
  useMapWidgetId: string
  jimuMapView: JimuMapView
}

export const ListMode = React.memo((props: Props) => {
  const translate = hooks.useTranslate(defaultMessages, jimuUIMessages)

  const [shownModeState, setShownModeState] = React.useState<ImmutableObject<Tool3D>>(null)

  const onItemClick = React.useCallback((tool: ImmutableObject<Tool3D>) => {
    setShownModeState(tool)
  }, [])

  const _getListItem = React.useCallback((tool: ImmutableObject<Tool3D>) => {
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

    return <div className='list-item d-flex align-items-center pl-2 py-1 my-3' title={name} key={tool.id} onClick={() => onItemClick(tool)}>
        <div className='d-flex list-item-icon mx-2'>{icon}</div>
        <div className='d-flex list-item-name'>{name}</div>
      </div>
  }, [translate, onItemClick])

  return (
    <React.Fragment>
      <div className='list-item-container d-flex h-100'>
        {(shownModeState == null) && <div className='main-list w-100'>
          {
            props.toolsConfig.map((tool) => {
              return _getListItem(tool)
            })
          }
        </div>}

        {/* Daylight */}
        {//(shownModeState?.id === ToolsID.Daylight) &&
          <ToolPanel
            mode={ToolsID.Daylight}
            toolConfig={props.findToolConfigById(ToolsID.Daylight)}
            useMapWidgetId={props.useMapWidgetId}
            jimuMapView={props.jimuMapView}

            shownModeState={shownModeState}
            isShowBackBtn={true}
            onBackBtnClick={() => setShownModeState(null)}
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
            isShowBackBtn={true}
            onBackBtnClick={() => setShownModeState(null)}
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
            isShowBackBtn={true}
            onBackBtnClick={() => setShownModeState(null)}
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
            isShowBackBtn={true}
            onBackBtnClick={() => setShownModeState(null)}
          ></ToolPanel>
        }
      </div>
    </React.Fragment>
  )
})
