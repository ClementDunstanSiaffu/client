
import { React, jsx, appActions } from 'jimu-core'
import Container from '../assets/css/style'
import '../assets/css/style.scss'
import { ArrowGoBackOutlined } from 'jimu-icons/outlined/directional/arrow-go-back'
import helper from '../helper/helper'
import { AdvancedSelectionTableContext } from '../context/context'

export default class AttributesContents extends React.PureComponent<any, any> {
  static contextType?: React.Context<any> = AdvancedSelectionTableContext

  backToTableContents = () => {
    const advancedSelectionTable = this.context?.parent
    advancedSelectionTable.setState({ component_type: 'LAYERS_CONTENTS', selectedAttributes: [] })
  }

  openPopup = (attribute: any) => {
    const advancedSelectionTable = this.context?.parent
    const title = this.context?.layerTitle
    let contents = ' '
    let openDivTag = '<div>'
    const attributKeysArray = helper.getAttributeKeyArray(attribute)
    attributKeysArray.map((attributeKey, k) => {
      openDivTag +=
                `<div class = "attribute-container">
                    <span class = "attribute-key">${attributeKey}<span> : <span class = "attribute-value">${attribute[attributeKey]}<span>
                </div>`
    })
    contents = openDivTag + '</div>'
    let popupContents = { title: title, contents: contents, location: null }
    if (attribute?.location) {
      popupContents = { title: title, contents: contents, location: attribute?.location }
    }
    advancedSelectionTable?.setState({ popup: true }, () => {
      advancedSelectionTable?.openPopup(popupContents)
    })
  }

  render (): React.ReactNode {
    const attributes = this.context?.selectedAttributes
    if (this.context?.component_type === 'ATTRIBUTE_CONTENTS') {
      return (
        <>
          <Container width="100%" style = {{ paddingLeft: 20 }}>
            <div className = "layer-content-container">
              <div className='check-box-container' onClick={this.backToTableContents}><ArrowGoBackOutlined /></div>
              <div className='layer-title'>{this.context?.layerTitle}</div>
            </div>
            <Container style = {{ marginTop: 20 }} height={450} width = {'100%'} overflow = "auto">
              {
                attributes?.map((attribute: any, k: number) => {
                  let attributeName = k
                  if (attribute && Object.keys(attribute).length > 0) {
                    attributeName = attribute[Object.keys(attribute)[0]]
                  }
                  return (
                    <div key = {k} className = "attribute-contents-container" onClick = {() => this.openPopup(attribute)}>
                      <div className='check-box-container'>
                        <Container
                          width={50}
                          height = {2}
                          borderBottomColor = "purple"
                          borderBottomWidth={1}
                          style = {{ marginRight: 10 }}
                        >
                        </Container>
                      </div>
                      <div className='flex-auto'>{this.context?.layerTitle}:{attributeName}</div>
                    </div>
                  )
                })
              }
            </Container>
          </Container>
        </>
      )
    }
    return null
  }
}
