/** @jsx jsx */
import { React, jsx, css, lodash, loadArcGISJSAPIModules, Immutable } from 'jimu-core'
import { Button, hooks, Checkbox, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { JimuMapView } from 'jimu-arcgis'
import defaultMessage from '../translations/default'
import { ScalebarUnitType, PrintExtentType, IMPrintTemplateProperties, MapFrameUnit as Unit } from '../../config'
import { getPreviewLayerId } from '../utils/utils'
import { px2meter } from '../../utils/unit-conversion'
import { checkIsMapOnly } from '../../utils/utils'
import GraphicsLayer from 'esri/layers/GraphicsLayer'
const { useState, useEffect, useRef } = React

interface Props {
  id: string
  scale: number
  scalebarUnit: ScalebarUnitType
  printExtentType: PrintExtentType
  jimuMapView: JimuMapView
  selectedTemplate: IMPrintTemplateProperties
  className?: string
}

const PreviewExtent = (props: Props) => {
  const { jimuMapView, id, selectedTemplate, className } = props
  const nls = hooks.useTranslate(defaultMessage, jimuiDefaultMessage)
  const GISAPIModules = useRef(null)
  const selectedTemplateRef = useRef(null as IMPrintTemplateProperties)
  const debounceShowGraphicOnMapRef = useRef(null)
  const curExtentRef = useRef(jimuMapView?.view?.extent)
  const curScaleRef = useRef(jimuMapView?.view?.scale)
  const STYLE = css`

  `

  const [previewExtent, setPreviewExtent] = useState(false)
  const [curExtent, setCurExtent] = useState(jimuMapView?.view?.extent)
  const [curScale, setCurScale] = useState(jimuMapView?.view?.scale)

  const handlePreviewExtent = () => {
    setPreviewExtent(!previewExtent)
    if (!previewExtent) {
      showGraphicOnMap()
    } else {
      removeAllGraphics()
    }
  }

  useEffect(() => {
    debounceShowGraphicOnMapRef.current = lodash.debounce(showGraphicOnMap, 400)
    loadArcGISJSAPIModules(['esri/layers/GraphicsLayer', 'esri/Graphic', 'esri/geometry/Polygon', 'esri/geometry/Extent', 'esri/geometry/Point', 'esri/geometry/support/WKIDUnitConversion']).then(modules => {
      GISAPIModules.current = modules
    })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const isTemplateChange = selectedTemplate?.templateId !== selectedTemplateRef.current?.templateId
    const isMapPrintExtentChange = selectedTemplate?.printExtentType !== selectedTemplateRef.current?.printExtentType
    const isOutScaleChange = selectedTemplate?.outScale !== selectedTemplateRef.current?.outScale
    const isDpiChange = selectedTemplate?.exportOptions?.dpi !== selectedTemplateRef.current?.exportOptions?.dpi
    const isMapSizeChange = checkIsMapSizeChange()
    selectedTemplateRef.current = selectedTemplate
    if (previewExtent && (isTemplateChange || isMapPrintExtentChange || isOutScaleChange || isMapSizeChange || isDpiChange)) {
      debounceShowGraphicOnMapRef.current()
    }
    // eslint-disable-next-line
  }, [selectedTemplate])

  useEffect(() => {
    if (previewExtent && curExtent) {
      debounceShowGraphicOnMapRef.current()
    }
    // eslint-disable-next-line
  }, [curExtent, curScale])

  useEffect(() => {
    if (jimuMapView) {
      viewWatcher()
      setCurExtent(Immutable(JSON.parse(JSON.stringify(jimuMapView?.view?.extent?.toJSON()))))
    } else {
      setCurExtent(null)
    }
    // eslint-disable-next-line
  }, [jimuMapView])

  const checkIsMapSizeChange = () => {
    const isMapOnly = checkIsMapOnly(selectedTemplate?.layout)
    if (!isMapOnly) {
      return false
    }
    const isWidthChange = selectedTemplate?.exportOptions?.width !== selectedTemplateRef.current?.exportOptions?.width
    const isHeightChange = selectedTemplate?.exportOptions?.height !== selectedTemplateRef.current?.exportOptions?.height
    return isWidthChange || isHeightChange
  }

  const viewWatcher = () => {
    jimuMapView?.view?.watch('extent', (newExtent) => {
      const newCurExtent = JSON.parse(JSON.stringify(newExtent.toJSON()))
      setCurExtent(Immutable(newCurExtent))
      curExtentRef.current = newExtent
    })
    jimuMapView?.view?.watch('scale', (newScale) => {
      setCurScale(newScale)
      curScaleRef.current = newScale
    })
  }

  const showGraphicOnMap = () => {
    const graphicsLayer = getGraphicsLayer()
    const Graphic = GISAPIModules.current[1]

    const geomLayout = selectedTemplateRef.current?.printExtentType === PrintExtentType.CurrentMapExtent ? getGeomLayoutByExtent() : getGeomLayoutByScale()
    const graLayout = new Graphic(geomLayout, {
      type: 'simple-fill',
      color: [0, 216, 237, 0.3],
      outline: {
        color: [0, 0, 0],
        width: '4px'
      }
    })
    graphicsLayer.graphics.removeAll()
    graphicsLayer.graphics.add(graLayout)
  }

  const getGeomLayoutByScale = () => {
    const { mapFrameSize, mapFrameUnit, layout } = selectedTemplateRef.current?.asMutable({ deep: true })
    const unitValue = getUnitValueForSR()
    const pageUnitToMeters = getUnitToMetersFactor(mapFrameUnit)
    const Polygon = GISAPIModules.current[2]
    const isMapOnly = checkIsMapOnly(layout)
    const centerPt = curExtentRef?.current?.center

    const scale = selectedTemplateRef.current?.printExtentType === PrintExtentType.SetMapScale ? selectedTemplateRef.current?.outScale : curScaleRef.current
    const mapSizeInPrintResult = isMapOnly ? getPageSizeByExportMapSize() : { width: mapFrameSize[0], height: mapFrameSize[1] }
    const unitRatio = {
      x: isMapOnly ? 1 : pageUnitToMeters.x / unitValue?.x,
      y: isMapOnly ? 1 : pageUnitToMeters.y / unitValue?.y
    }
    const mapDims = { x: mapSizeInPrintResult.width, y: mapSizeInPrintResult.height }

    // Calculate the boundaries for the print area
    // Convert the print page size to the size of the current map unit, and multiply it by the scale to get the width and height of the preview border
    const minX = centerPt?.x - mapDims?.x / 2 * scale * unitRatio?.x
    const minY = centerPt?.y - mapDims?.y / 2 * scale * unitRatio?.y
    const maxX = centerPt?.x + mapDims?.x / 2 * scale * unitRatio?.x
    const maxY = centerPt?.y + mapDims?.y / 2 * scale * unitRatio?.y

    // list the points in clockwise order (this is the paper)
    const ringLayoutPerim = [[minX, minY], [minX, maxY], [maxX, maxY], [maxX, minY], [minX, minY]]

    const geomLayout = new Polygon({
      spatialReference: curExtentRef?.current?.spatialReference
    })
    geomLayout.addRing(ringLayoutPerim)
    return geomLayout
  }

  const getGeomLayoutByExtent = () => {
    const Extent = GISAPIModules.current[3]
    const { mapFrameSize, layout, exportOptions } = selectedTemplateRef.current?.asMutable({ deep: true })
    const isMapOnly = checkIsMapOnly(layout)
    const Polygon = GISAPIModules.current[2]
    let extent = Immutable(curExtentRef.current?.toJSON())
    const mapAspectRatio = jimuMapView?.view?.width / jimuMapView?.view?.height
    const mapInPrintResultAspectRatio = isMapOnly ? exportOptions?.width / exportOptions?.height : mapFrameSize[0] / mapFrameSize[1]

    //When using the current map extent, we need to adjust the extent of the extent according to the aspect ratio to ensure that the preview frame is consistent with the print result.
    const height = extent?.height || jimuMapView?.view?.height
    const width = extent?.width || jimuMapView?.view?.width
    if (mapAspectRatio > mapInPrintResultAspectRatio) {
      const newMapHeight = width / mapInPrintResultAspectRatio
      const newCoordinate = getNewCoordinate(false, newMapHeight / height)
      extent = extent.set('height', newMapHeight).set('ymin', newCoordinate?.mim).set('ymax', newCoordinate?.max)
    } else if (mapAspectRatio < mapInPrintResultAspectRatio) {
      const newMapWidth = height * mapInPrintResultAspectRatio
      const newCoordinate = getNewCoordinate(true, newMapWidth / width)
      extent = extent.set('width', newMapWidth).set('xmin', newCoordinate?.mim).set('xmax', newCoordinate?.max)
    }

    const previewExtent = new Extent({
      xmax: extent?.xmax,
      xmin: extent?.xmin,
      ymax: extent?.ymax,
      ymin: extent?.ymin,
      zmax: extent?.zmax,
      zmin: extent?.zmin,
      spatialReference: extent?.spatialReference
    })
    return Polygon.fromExtent(previewExtent)
  }

  const getNewCoordinate = (isX: boolean, changeRatio: number) => {
    const extent = curExtentRef.current?.toJSON()
    const centerPt = curExtentRef?.current?.center
    const oldLength = isX ? (extent?.xmax - extent?.xmin) : (extent?.ymax - extent?.ymin)
    const newLength = oldLength * changeRatio
    const newMax = isX ? centerPt?.x + newLength / 2 : centerPt?.y + newLength / 2
    const newMin = isX ? centerPt?.x - newLength / 2 : centerPt?.y - newLength / 2
    return {
      max: newMax,
      mim: newMin
    }
  }

  const getPageSizeByExportMapSize = () => {
    //Convert the px size to the current map unit size
    const { exportOptions } = selectedTemplateRef.current?.asMutable({ deep: true })
    const unitValue = getUnitValueForSR()
    return {
      width: px2meter(exportOptions?.width, true, exportOptions?.dpi) * unitValue?.x,
      height: px2meter(exportOptions?.height, false, exportOptions?.dpi) * unitValue?.y
    }
  }

  const getUnitToMetersFactor = (unit: string) => {
    switch (unit?.toUpperCase()) {
      case Unit.Centimeter:
        return { x: 0.01, y: 0.01 }
      case Unit.Inch:
        return { x: 0.0254, y: 0.0254 }
      case Unit.Millimeter:
        return { x: 0.001, y: 0.001 }
      case Unit.Point:
        return { x: 0.0254 * 1 / 72, y: 0.0254 * 1 / 72 }
      default:
        return { x: NaN, y: NaN }
    }
  }

  const getUnitValueForSR = () => {
    const lookup = GISAPIModules.current[5]
    let wkid; let wkt; const sr = curExtentRef?.current?.spatialReference
    if (sr) {
      wkid = sr.wkid
      wkt = sr.wkt
    }

    let unitValue = null
    if (wkid) {
      unitValue = lookup.values[lookup[wkid]]
    } else if (wkt && (wkt.search(/^PROJCS/i) !== -1)) {
      const result = /UNIT\[([^\]]+)\]\]$/i.exec(wkt)
      if (result && result[1]) {
        unitValue = parseFloat(result[1].split(',')[1])
      }
    }
    return { x: unitValue, y: unitValue }
  }

  const getGraphicsLayer = (): GraphicsLayer => {
    let layer = null
    const GraphicsLayer = GISAPIModules.current[0]
    const layerId = getPreviewLayerId(id, jimuMapView.id)
    if (jimuMapView.view?.map) {
      layer = jimuMapView.view.map.findLayerById(layerId)
      if (!layer) {
        layer = new GraphicsLayer({
          id: layerId,
          title: layerId
        })
        jimuMapView.view.map.add(layer)
      }
    }
    return layer
  }

  const removeAllGraphics = (): void => {
    const layerId = getPreviewLayerId(id, jimuMapView.id)
    const graphicsLayer = jimuMapView.view.map.findLayerById(layerId) as GraphicsLayer
    graphicsLayer && graphicsLayer.graphics.removeAll()
  }

  return (
    <div className={className} css={STYLE}>
      <Button
        title={nls('previewPrint')}
        className='d-flex w-100 align-items-center'
        type='tertiary'
        style={{ paddingLeft: 0, paddingRight: 0 }}
        onClick={handlePreviewExtent}
      >
        <Checkbox
          title={nls('previewPrint')}
          className='lock-item-ratio'
          data-field='mapSize'
          checked={previewExtent}
        />
        <div className='text-left ml-2 text-truncate'>
          {nls('previewPrint')}
        </div>
      </Button>
    </div>
  )
}

export default PreviewExtent
