/** @jsx jsx */
import { React, jsx, ImmutableArray, moduleLoader } from 'jimu-core'
import { hooks, Checkbox } from 'jimu-ui'
import { JimuMapView } from 'jimu-arcgis'
import { JimuDrawCreatedDescriptor, JimuDrawCreationMode } from 'jimu-ui/advanced/map'
import { CreateToolType } from '../config'
import { EntityStatusType, StatusIndicator } from '../common/common-components'
import defaultMessage from './translations/default'
export interface InteractiveDrawProps {
  jimuMapView: JimuMapView
  toolTypes: ImmutableArray<CreateToolType>
  onDrawEnd: (graphic: __esri.Graphic, getLayerFun?, clearAfterApply?: boolean) => void
}

const sketchToolInfoMap = {
  [CreateToolType.Point]: { drawToolName: 'point', esriClassName: 'esri-icon-point', toolIndex: 0 },
  [CreateToolType.Polyline]: { drawToolName: 'polyline', esriClassName: 'esri-icon-polyline', toolIndex: 4 },
  [CreateToolType.Polygon]: { drawToolName: 'polygon', esriClassName: 'esri-icon-polygon', toolIndex: 2 },
  [CreateToolType.Rectangle]: {
    drawToolName: 'rectangle',
    esriClassName: 'esri-icon-checkbox-unchecked',
    toolIndex: 1
  },
  [CreateToolType.Circle]: { drawToolName: 'circle', esriClassName: 'esri-icon-radio-unchecked', toolIndex: 3 }
}

export function InteractiveDraw (props: InteractiveDrawProps) {
  const { toolTypes = [], jimuMapView, onDrawEnd } = props
  const getI18nMessage = hooks.useTranslate(defaultMessage)
  const [mapModule, setMapModule] = React.useState(null)
  const getLayerFunRef = React.useRef<() => __esri.GraphicsLayer>(null)
  const graphicRef = React.useRef(null)
  const [clearAfterApply, setClearAfterApply] = React.useState(false)

  const visibleElements = React.useMemo(() => {
    return {
      createTools: Object.entries(sketchToolInfoMap).reduce(
        (result, [key, value]) => ({ ...result, [value.drawToolName]: toolTypes.includes(key as CreateToolType) }),
        { point: false }
      ),
      selectionTools: {
        'lasso-selection': false,
        'rectangle-selection': false
      },
      settingsMenu: false,
      undoRedoMenu: false
    }
  }, [toolTypes])

  hooks.useEffectOnce(() => {
    moduleLoader.loadModule('jimu-ui/advanced/map').then((result) => {
      setMapModule(result)
    })
  })

  const handleDrawToolCreated = React.useCallback((jimuDrawToolsRef: JimuDrawCreatedDescriptor) => {
    getLayerFunRef.current = jimuDrawToolsRef.getGraphicsLayer
  }, [])

  const handleDrawStart = React.useCallback(() => {
    getLayerFunRef.current && (getLayerFunRef.current)().removeAll()
  }, [])

  const handleDrawEnd = React.useCallback(
    (graphic) => {
      graphicRef.current = graphic
      onDrawEnd(graphic, getLayerFunRef.current, clearAfterApply)
    },
    [onDrawEnd, clearAfterApply]
  )

  const handleCleared = React.useCallback(() => {
    graphicRef.current = null
    onDrawEnd(null)
  }, [onDrawEnd])

  const handleClearSettingChange = React.useCallback((e) => {
    if (graphicRef.current) {
      onDrawEnd(graphicRef.current, getLayerFunRef.current, e.target.checked)
    }
    setClearAfterApply(e.target.checked)
  }, [onDrawEnd])

  const JimuDraw = mapModule?.JimuDraw
  if (!JimuDraw) {
    return <StatusIndicator statusType={EntityStatusType.Loading} />
  }
  const isAvailbel = Object.keys(visibleElements.createTools).some(toolName => visibleElements.createTools[toolName])
  if (!isAvailbel) {
    return null
  }
  return (
    <div>
      <JimuDraw
        jimuMapView={jimuMapView}
        disableSymbolSelector
        drawingOptions={{
          creationMode: JimuDrawCreationMode.Single,
          updateOnGraphicClick: false,
          visibleElements: visibleElements
        }}
        uiOptions={{
          isHideBorder: true
        }}
        onJimuDrawCreated={handleDrawToolCreated}
        onDrawingStarted={handleDrawStart}
        onDrawingFinished={handleDrawEnd}
        onDrawingCleared={handleCleared}
      />
      <label className='d-flex align-items-center'>
        <Checkbox checked={clearAfterApply} onChange={handleClearSettingChange} className='mr-2' />
        {getI18nMessage('clearDrawing')}
      </label>
    </div>
  )
}
