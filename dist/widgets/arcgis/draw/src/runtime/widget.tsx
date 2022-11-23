/** @jsx jsx */
import { React, jsx, AllWidgetProps, useIntl } from 'jimu-core'
import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis'
import { WidgetPlaceholder } from 'jimu-ui'
import { IMConfig, DrawingTool } from '../config'
import { JimuDraw, JimuDrawCreationMode } from 'jimu-ui/advanced/map'

import defaultMessages from './translations/default'
import DrawIcon from 'jimu-icons/svg/outlined/brand/widget-draw.svg'

function Widget (props: AllWidgetProps<IMConfig>): React.ReactElement {
  const [currentJimuMapView, setCurrentJimuMapView] = React.useState(null)
  const handleActiveViewChange = (jimuMapView: JimuMapView): void => {
    setCurrentJimuMapView(jimuMapView)
  }

  // visibleElements
  const visibleElements = {} as __esri.SketchVisibleElements
  visibleElements.createTools = {
    point: props.config.drawingTools.includes(DrawingTool.Point),
    polyline: props.config.drawingTools.includes(DrawingTool.Polyline),
    polygon: props.config.drawingTools.includes(DrawingTool.Polygon),
    rectangle: props.config.drawingTools.includes(DrawingTool.Rectangle),
    circle: props.config.drawingTools.includes(DrawingTool.Circle)
  }

  // hide API setting icon for 10.1
  visibleElements.settingsMenu = false

  const isShowPlaceHolderFlag = (!currentJimuMapView)
  const placeHolderTips = useIntl().formatMessage({ id: '_widgetLabel', defaultMessage: defaultMessages._widgetLabel })
  // Renderer
  return <div className='draw-widget-container h-100'>
    { /* 1.placeholder */ }
    {isShowPlaceHolderFlag &&
      <div style={{ width: '440px', height: '444px' }}>
        <WidgetPlaceholder
          icon={DrawIcon} widgetId={props.id} message={placeHolderTips}
        />
      </div>
    }
    { /* 2.jimu-draw */ }
    {!isShowPlaceHolderFlag &&
      <JimuDraw
        jimuMapView={currentJimuMapView}
        isDisplayCanvasLayer={props.config.isDisplayCanvasLayer}
        // api options
        drawingOptions={{
          creationMode: props.config.drawMode as unknown as JimuDrawCreationMode,
          visibleElements: visibleElements,
          // snapping
          //snappingOptions?: __esri.SnappingOptionsProperties
          // defaults
          updateOnGraphicClick: true,
          // drawingEffect3D
          drawingElevationMode3D: props.config.drawingElevationMode3D
        }}
        // ui
        uiOptions={{
          arrangement: props.config.arrangement
        }}
        // measurements
        // eslint-disable-next-line
        measurementsInfo={props.config.measurementsInfo.asMutable() as any}
        measurementsUnitsInfos={props.config.measurementsUnitsInfos.asMutable()}
        // other options
      ></JimuDraw>
    }
    { /* 3.map view comp */ }
    <JimuMapViewComponent
      useMapWidgetId={props.useMapWidgetIds?.[0]}
      onActiveViewChange={handleActiveViewChange}
    />
  </div>
}

export default Widget
