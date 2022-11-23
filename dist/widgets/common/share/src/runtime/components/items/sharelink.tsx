/** @jsx jsx */
import { jsx, css, SerializedStyles } from 'jimu-core'
import { defaultMessages, Label, TextInput, Checkbox } from 'jimu-ui'

import BaseItem, { ShownMode, ExpandType, BaseItemConstraint } from './base-item'
import nls from '../../translations/default'
import { ItemsName, UiMode } from '../../../config'
import { ItemBtn, IconImages } from './subcomps/item-btn'
import { CopyBtn } from './subcomps/copy-btn'

// shortLink
import * as ShortLinkUtil from '../short-link'

const IconImage: IconImages = {
  default: require('./assets/icons/default/sharelink.svg'),
  white: require('./assets/icons/white/sharelink.svg'),
  black: require('./assets/icons/black/sharelink.svg')
}

export interface ShareLinkConstraint extends BaseItemConstraint {
  longUrl: string
  onShortUrlChange: ((shortUrl: string) => void)
  onLongUrlChange: ((longUrl: string) => void)
  updateUrl: (() => string) | (() => void)

  onCopy?: ((text: string, result: boolean) => void)
}
interface State {
  url: string
  isShortLink: boolean
}

export class ShareLink extends BaseItem<ShareLinkConstraint, State> {
  constructor (props) {
    super(props)
    // this.init(ItemsName.Sharelink, '#35465C', ExpandType.ShowInPopup);
    this.state = {
      url: this.props.url || '',
      isShortLink: !(this.props.url === this.props.longUrl)
    }
  }

  // componentDidMount() {
  //   this.setState({ isShortLink: true });
  //   var urlObj = this.props.updateUrl();
  //   ShortLink.fetchShortLink(urlObj.location).then((shortUrl) => {
  //     this.setState({ url: shortUrl });
  //     this.props.onShortUrlChange(shortUrl);
  //   }, (longUrl) => {
  //     this.setState({ isShortLink: false });
  //   })
  // }

  onClickCopy = (/* { target: { innerHTML } } */) => {
  }

  onCopy = (text, result) => {
    if (typeof this.props?.onCopy === 'function') {
      this.props.onCopy(text, result)
    }
  }

  onShortUrlChange = (e) => {
    const url = e.target.value
    this.setState({ url: url/*, copied: false */ })
    this.props.onShortUrlChange(url)
  }

  onClick = (ref) => {
    this.props.onItemClick(ItemsName.Sharelink, ref, ExpandType.ShowInPopup, false)
  }

  toggleShortLink = (isChecked) => {
    let href = ''
    const res = this.props.updateUrl()
    if (res) {
      href = res
    }
    // console.log('is ShortLink click==>' + isChecked);
    this.setState({ isShortLink: isChecked })

    if (isChecked) {
      ShortLinkUtil.fetchShortLink(href).then((shortUrl) => {
        this.setState({ url: shortUrl })
        this.props.onShortUrlChange(shortUrl)
      }, (longUrl) => {
        this.setState({ isShortLink: false })
      })
    } else {
      this.setState({ url: href })
      this.props.onLongUrlChange(href)// let other's itme use longURL
    }
  }

  getStyle = (): SerializedStyles => {
    return css`
      .short-link-wapper {
        margin-bottom: 1rem;
      }

      .share-link-input {
        border: none;
      }
      .share-link-group {
        margin: 10px 0 18px 0;
      }

      .short-link-label {
        margin: 0 0.5rem;
      }
    `
  }

  render () {
    let content = null
    const { shownMode } = this.props

    const titleNls = this.props.intl.formatMessage({ id: 'link'/*ItemsName.Sharelink*/, defaultMessage: defaultMessages.link/*defaultMessages.sharelink*/ })
    const shortLinkNls = this.props.intl.formatMessage({ id: 'shortLink', defaultMessage: nls.shortLink })

    if (shownMode !== ShownMode.Btn) {
      content = (
        <div css={this.getCommonStyle()}>
          <div css={this.getStyle()}>
            <div className='share-inputs-wrapper share-link-group d-flex justify-content-between align-items-center'>
              <TextInput name='text' className='share-link-input d-flex w-100' value={this.state.url} onChange={this.onShortUrlChange} />
              <CopyBtn text={this.state.url} onCopy={this.onCopy}></CopyBtn>
            </div>

            <div className='d-flex justify-content-between short-link-wapper'>
              <Label className='d-flex align-items-center'>
                <Checkbox checked={this.state.isShortLink} onChange={evt => this.toggleShortLink(evt.target.checked)} ></Checkbox>
                <span className='mx-2'>{shortLinkNls}</span>
              </Label>
            </div>

            {this.props.uiMode === UiMode.Popup &&
              <div className='separator-line'></div>
            }
          </div>
        </div>
      )
    } else {
      content = (
        <div css={this.getStyle()}>
          <ItemBtn
            name={ItemsName.Sharelink}
            intl={this.props.intl}
            nls={titleNls}
            iconImages={IconImage}
            attr={this.props}

            onClick={this.onClick}

            a11yFocusElement={this.props.a11yFocusElement}
            a11yIsBtnHaspopup={true}
          />
        </div>
      )
    }

    return content
  }
}
