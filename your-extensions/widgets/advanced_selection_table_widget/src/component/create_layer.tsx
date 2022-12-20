
import { React, jsx, appActions } from 'jimu-core'
import { TextInput, Button } from 'jimu-ui'
import ModalComponent from './common/modal'
import { AdvancedSelectionTableContext } from '../context/context'

class CreateLayerInput extends React.PureComponent<any, any> {
  static contextType?: React.Context<any> = AdvancedSelectionTableContext

  getLayerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const advancedSelectionTable = this.context?.parent
    advancedSelectionTable?.setState({ layerName: event.target.value })
  }

  render (): React.ReactNode {
    const layerName = this.context?.layerName
    return <TextInput placeholder='layer name' width = "80%" value={layerName} onChange = {(event) => this.getLayerName(event)}/>
  }
}

export default class CreateLayer extends React.PureComponent<any, any> {
  static contextType?: React.Context<any> = AdvancedSelectionTableContext

  onClose = () => {
    const advancedSelectionTable = this.context?.parent
    advancedSelectionTable?.setState({ opencreateLayer: false })
  }

  createLayer = () => {
    const layerTitle = this.context?.layerName
    const advancedSelectionTable = this.context?.parent
    advancedSelectionTable.setState({ createdLayerTitle: layerTitle }, () => {
      advancedSelectionTable.addCreatedLayer()
    })
  }

  render (): React.ReactNode {
    const opencreateLayer = this.context?.opencreateLayer
    return (
            <ModalComponent
                isOpen = {opencreateLayer}
                modalTitle='Create layer'
                modalBody={<CreateLayerInput/>}
                toggle = {this.onClose}
            >
                <Button onClick={this.createLayer}>
                    OK
                </Button>
                {' '}
                <Button onClick={this.onClose} type="primary">
                    Cancel
                </Button>
            </ModalComponent>
    )
  }
}
