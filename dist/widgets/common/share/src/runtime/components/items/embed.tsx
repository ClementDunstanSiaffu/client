/** @jsx jsx */
import { React, jsx, css, defaultMessages as jimuCoreDefaultMessages } from 'jimu-core'
import { defaultMessages as jimuUIDefaultMessages, Label, TextInput, TextArea, Select } from 'jimu-ui'

import nls from '../../translations/default'
import BaseItem, { ShownMode, ExpandType, BaseItemConstraint } from './base-item'
import { ItemsName } from '../../../config'
import { ItemBtn, IconImages } from './subcomps/item-btn'
import { CopyBtn } from './subcomps/copy-btn'
import { stopPropagation, replaceAttr } from './utils'

const IconImage: IconImages = {
  default: require('./assets/icons/default/embed.svg'),
  white: require('./assets/icons/white/embed.svg'),
  black: require('./assets/icons/black/embed.svg')
}

interface EmbedProps extends BaseItemConstraint {
  embedSize?: string
}
interface State {
  url: string
  // copied?: false;
  text?: string
  embedSize: string

  w?: number
  h?: number
}

export class Embed extends BaseItem<EmbedProps, State> {
  name: string
  defaultBgColor: string
  W_H_MAP: any
  ref: React.RefObject<any>

  constructor (props) {
    super(props)
    // this.init(ItemsName.Embed, '#35465C', ExpandType.ShowInPopup);
    this.W_H_MAP = {
      small: { w: 300, h: 200 },
      medium: { w: 800, h: 600 },
      large: { w: 1080, h: 720 }
    }

    const size = this.props.embedSize || 'medium'
    this.state = {
      url: this.props.url || '',
      text: '',

      embedSize: size,
      w: this.W_H_MAP[size].w || this.W_H_MAP.medium.w,
      h: this.W_H_MAP[size].h || this.W_H_MAP.medium.h
    }
  }

  componentDidMount () {
    this._setEmbedCode()
  }

  componentDidUpdate (prevProps, prevState: State) {
    if (prevState.w !== this.state.w || prevState.h !== this.state.h || prevState.url !== this.state.url) {
      this._setEmbedCode()
    }
  }

  onClickCopy = (/* { target: { innerHTML } } */) => {
    // console.log(`==> onClickCopy Clicked on '${innerHTML}'!`);
  }

  onCopy = () => {
    // console.log('==> onCopy');
  }

  onClick = (ref) => {
    this.props.onItemClick(ItemsName.Embed, ref, ExpandType.ShowInPopup)
  }

  _setEmbedCode = () => {
    const iframeTagStart = '<iframe'
    const iframeTagEnd = '></iframe>'
    const widthAttr = ' width="' + this.state.w + '"'
    const heightAttr = ' height="' + this.state.h + '"'
    const iframeProps = ' frameborder="0" allowfullscreen'
    const srcAttr = ' src="' + this.props.url + '"'

    let text = this.state.text
    if (!text) {
      text = iframeTagStart + widthAttr + heightAttr + iframeProps + srcAttr + iframeTagEnd
    } else {
      text = replaceAttr(text, 'iframe', 'width', this.state.w)
      text = replaceAttr(text, 'iframe', 'height', this.state.h)
      text = replaceAttr(text, 'iframe', 'src', this.props.url)
    }

    this.setState({ text: text })
  }

  onSizeChange = (e) => {
    const val = e.target.value
    this.setState({ embedSize: val })

    const wh = this.W_H_MAP[val]
    if (wh && wh.w && wh.h) {
      this.setState({ w: wh.w, h: wh.h })
    }
  }

  onWChange = (e) => {
    const val = e.target.value
    this.setState({ w: val })

    this.setState({ embedSize: 'custom' })
  }

  onHChange = (e) => {
    const val = e.target.value
    this.setState({ h: val })

    this.setState({ embedSize: 'custom' })
  }

  getStyle = () => {
    return css`
      .share-embed-input {
        height: 90px;
        resize: none;
        border: none;
      }
      .embed-copy-btn-wrapper {
        border: none;
      }
      .embed-options-label {
        font-size: 14px;
      }
      .embed-options-wrapper {
        width: 80%;

        .embed-option-size .jimu-dropdown-button {
          width: 120px;
        }

        .embed-option {
          width: 80px;
        }
        .embed-option-w {
          margin-right: 0.5rem;
        }
        .embed-option-h {
          margin-left: 0.5rem;
        }
      }
    `
  }

  render () {
    let content = null
    const { shownMode } = this.props

    const embedNls = this.props.intl.formatMessage({ id: ItemsName.Embed, defaultMessage: jimuUIDefaultMessages.embed })
    const embedOptionsNls = this.props.intl.formatMessage({ id: 'embedOptions', defaultMessage: nls.embedOptions })
    const smallNls = this.props.intl.formatMessage({ id: 'small', defaultMessage: jimuCoreDefaultMessages.small })
    const mediumNls = this.props.intl.formatMessage({ id: 'medium', defaultMessage: jimuCoreDefaultMessages.medium })
    const largeNls = this.props.intl.formatMessage({ id: 'large', defaultMessage: jimuCoreDefaultMessages.large })
    const customNls = this.props.intl.formatMessage({ id: 'custom', defaultMessage: jimuUIDefaultMessages.custom })

    if (shownMode !== ShownMode.Btn) {
      content = (
        <div css={this.getCommonStyle()}>
          <div css={this.getStyle()}>
            <div className='share-inputs-wrapper'>
              <TextArea name='text' className='share-embed-input' value={this.state.text} onChange={(evt) => {
                this.setState({ text: evt.target.value })
              }} />
              <div className='embed-copy-btn-wrapper d-flex'>
                <CopyBtn text={this.state.text} onCopy={this.onCopy}></CopyBtn>
              </div>
            </div>

            <div className='separator-line' style={{ border: 'none' }}></div>

            <div>
              <Label className='embed-options-label'>{embedOptionsNls}</Label>
              <div className='d-flex align-items-center embed-options-wrapper justify-content-between w-100'>
                <Select value={this.state.embedSize} onChange={this.onSizeChange} className='flex-fill embed-option-size' onClick={stopPropagation}>
                  <option value='small'>{smallNls}</option>
                  <option value='medium'>{mediumNls}</option>
                  <option value='large'>{largeNls}</option>
                  <option value='custom'>{customNls}</option>
                </Select>

                <div className='d-flex align-items-center'>
                  <TextInput value={this.state.w} className='flex-fill embed-option embed-option-w' onChange={this.onWChange} />
                  X
                  <TextInput value={this.state.h} className='flex-fill embed-option embed-option-h' onChange={this.onHChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      content = (
        <ItemBtn
          name={ItemsName.Embed}
          intl={this.props.intl}
          nls={embedNls}
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
