// import {MessageManager, ExtentChangeMessage, MessageType} from 'jimu-core';
import Action from './action'
import LayerList from '../widget'

export default class Leabel extends Action {
  isUseForShowingLabel: boolean

  constructor (widget: LayerList, title: string, isUseForShowingLabel?: boolean) {
    super()
    this.id = 'label'
    this.title = title
    this.className = 'esri-icon-labels'
    this.group = 0
    this.widget = widget
    this.isUseForShowingLabel = isUseForShowingLabel
  }

  isValid = (layerItem): boolean => {
    if (!this.useMapWidget() || !this.widget.props.config.label || !layerItem?.layer?.labelingInfo) {
      return false
    }
    if (this.isUseForShowingLabel && !layerItem?.layer?.labelsVisible) {
      return true
    } else if (!this.isUseForShowingLabel && layerItem?.layer?.labelsVisible) {
      return true
    } else {
      return false
    }
  }

  execute = (layerItem): void => {
    layerItem.layer.labelsVisible = !layerItem.layer.labelsVisible
    this.refreshListItems()
  }
}
