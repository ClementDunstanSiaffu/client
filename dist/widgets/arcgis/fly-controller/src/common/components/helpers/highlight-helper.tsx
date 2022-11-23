import { React } from 'jimu-core'
import { JimuMapView } from 'jimu-arcgis'
import { FlyItemMode } from '../../../config'
import * as utils from '../../utils/utils'

export interface HighlightCache {
  hover: {
    graphic: __esri.Graphic
    hanlder: __esri.Handle
  }
  selected: {
    graphics: __esri.Graphic[]
    hanlder: __esri.Handle
  }
}

interface Props {
  jimuMapView: JimuMapView
  flyStyle: FlyItemMode

  hoverPickingGraphics: __esri.Graphic[]
  selectedPickingGraphics: __esri.Graphic[]
}

export default class HighlightHelper extends React.PureComponent<Props> {
  highlightCache: HighlightCache

  constructor (props) {
    super(props)
    this._resetHightlightCache()
  }

  _resetHightlightCache = (): void => {
    this.highlightCache = {
      hover: {
        graphic: null,
        hanlder: null
      },
      selected: {
        graphics: null,
        hanlder: null
      }
    }
  }

  // hover select
  removeHoverHightlightCache = (): void => {
    if (utils.isDefined(this.highlightCache.hover.hanlder)) {
      this.highlightCache.hover.hanlder.remove()
    }
    this.highlightCache.hover.graphic = null
    this.highlightCache.hover.hanlder = null
  }

  cacheHoverHightlight = (hanlder: __esri.Handle, graphic: __esri.Graphic): void => {
    this.highlightCache.hover.graphic = graphic
    this.highlightCache.hover.hanlder = hanlder
  }

  // click select
  removeSelectedHightlightCache = (): void => {
    if (utils.isDefined(this.highlightCache.selected.hanlder)) {
      this.highlightCache.selected.hanlder.remove()
    }
    this.highlightCache.selected.graphics = null
    this.highlightCache.selected.hanlder = null
  }

  cacheSelectedHightlight = (hanlder: __esri.Handle, graphics: __esri.Graphic[]): void => {
    this.highlightCache.selected.graphics = graphics
    this.highlightCache.selected.hanlder = hanlder
  }

  componentDidUpdate (prevProps: Props): void {
    if (this.props.hoverPickingGraphics !== prevProps.hoverPickingGraphics) {
      this.removeHoverHightlightCache()
      this.highlightGraphicsByHover(this.props.hoverPickingGraphics)
    }

    if (this.props.selectedPickingGraphics !== prevProps.selectedPickingGraphics) {
      this.removeSelectedHightlightCache()
      this.highlightGraphicsBySelect(this.props.selectedPickingGraphics)
    }
  }

  componentWillUnmount (): void {
    this.clear()
    this._resetHightlightCache()
  }

  render (): React.ReactElement {
    return null
  }

  highlightGraphicsByHover = (graphics: __esri.Graphic[]): void => {
    const graphic = utils.isDefined(graphics) ? graphics[0] : null
    if (graphic === null) {
      return
    }

    const type = graphic?.geometry?.type
    if ((type === 'polyline' && (this.props.flyStyle === FlyItemMode.Path)) ||
      (type === 'point' && (this.props.flyStyle === FlyItemMode.Rotate))) {
      this.props.jimuMapView?.view.whenLayerView(graphic.layer).then((layerView) => {
        const _layerView = layerView as __esri.FeatureLayerView
        this.cacheHoverHightlight(_layerView.highlight(graphic), graphic)
      })
    }
  }

  highlightGraphicsBySelect = (graphics: __esri.Graphic[]): void => {
    const graphic = utils.isDefined(graphics) ? graphics[0] : null
    if (graphic === null) {
      return
    }

    this.props.jimuMapView?.view.whenLayerView(graphic.layer).then((layerView) => {
      const _layerView = layerView as __esri.FeatureLayerView
      const hanlder = _layerView.highlight(graphic)
      this.cacheSelectedHightlight(hanlder, graphics)
    })
  }

  clear = (): void => {
    this.removeHoverHightlightCache()
    this.removeSelectedHightlightCache()
  }
}
