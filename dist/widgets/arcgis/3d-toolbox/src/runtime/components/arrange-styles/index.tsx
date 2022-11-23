/** @jsx jsx */
import { React, jsx, Immutable, ImmutableObject } from 'jimu-core'
import { useTheme } from 'jimu-theme'
import { JimuMapView } from 'jimu-arcgis'
import { Tool3D, ToolsID, ArrangementStyle } from '../../../constraints'

import { ListMode } from './list-mode'
import { IconMode } from './icon-mode'
import { getStyle } from './style'
import { IMConfig } from '../../../config'

export interface ArrangeStylesRef {
  updateWidgets
  destoryWidgets
}

export interface Props {
  config: IMConfig
  useMapWidgetId: string
  jimuMapView: JimuMapView
}

export const ArrangeStyles = React.memo((props: Props) => {
  const theme = useTheme()

  function findToolConfigById (toolID: ToolsID): ImmutableObject<Tool3D> {
    return Immutable(props.config.tools.find((tool) =>
      (tool.id === toolID)
    ))
  }

  return (
    <div className='h-100' css={getStyle(theme)}>
      {(props.config.arrangement.style === ArrangementStyle.List) &&
        <ListMode
          toolsConfig={props.config.tools}
          findToolConfigById={findToolConfigById}
          useMapWidgetId={props.useMapWidgetId}
          jimuMapView={props.jimuMapView}
        ></ListMode>
      }

      {(props.config.arrangement.style === ArrangementStyle.Icon) &&
        <IconMode
          direction={props.config.arrangement.direction}
          toolsConfig={props.config.tools}
          findToolConfigById={findToolConfigById}
          useMapWidgetId={props.useMapWidgetId}
          jimuMapView={props.jimuMapView}
        ></IconMode>
      }
    </div>
  )
})
