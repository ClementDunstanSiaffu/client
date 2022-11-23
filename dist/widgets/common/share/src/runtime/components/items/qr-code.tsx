/** @jsx jsx */
import { jsx } from 'jimu-core'
import { defaultMessages } from 'jimu-ui'
import { QRCode as JimuQRCode } from 'jimu-ui/basic/qr-code'
import BaseItem, { ShownMode, ExpandType, BaseItemConstraint } from './base-item'
import { ItemsName } from '../../../config'
import { ItemBtn, IconImages } from './subcomps/item-btn'

const IconImage: IconImages = {
  default: require('./assets/icons/default/qrcode.svg'),
  white: require('./assets/icons/white/qrcode.svg'),
  black: require('./assets/icons/black/qrcode.svg')
}

export interface QRCodeConstraint extends BaseItemConstraint {

}

export class QRCode extends BaseItem<QRCodeConstraint> {
  onClick = (ref) => {
    this.props.onItemClick(ItemsName.QRcode, ref, ExpandType.ShowInPopup)
  }

  render () {
    let content = null
    const { shownMode } = this.props
    const qrcodeNls = this.props.intl.formatMessage({ id: ItemsName.QRcode, defaultMessage: defaultMessages.qrcode })

    if (shownMode !== ShownMode.Btn) {
      content = (
        <div>
          <JimuQRCode value={this.props.url} level='L' size={156} includeMargin downloadFileName='Exb_QRCode' />
        </div>
      )
    } else {
      content = (
        <ItemBtn
          name={ItemsName.QRcode}
          intl={this.props.intl}
          nls={qrcodeNls}
          iconImages={IconImage}
          attr={this.props}

          onClick={this.onClick}

          a11yFocusElement={this.props.a11yFocusElement}
          a11yIsBtnHaspopup={true}
        />
      )
    }

    return content
  }
}
