/** @jsx jsx */
import { React, css, jsx, ThemeVariables, SerializedStyles, polished, defaultMessages as jimuCoreDefaultMessages, IntlShape } from 'jimu-core'
import { Icon, Button, defaultMessages as jimuUIDefaultMessages } from 'jimu-ui'
import defaultMessages from '../translations/default'
import { getConfigIcon } from '../constants'

const { epConfigIcon } = getConfigIcon()

interface Props {
  intl: IntlShape
  title: string
  onBack: () => void
  onClose: () => void
  hideBackArrow?: boolean
  theme: ThemeVariables
}

export default class SidepopperBackArrow extends React.PureComponent<Props> {
  backRef = React.createRef<HTMLDivElement>()
  getStyle (theme: ThemeVariables): SerializedStyles {
    return css`
      .setting-header {
        padding: ${polished.rem(18)} ${polished.rem(16)} ${polished.rem(0)} ${polished.rem(16)}
      }

      .setting-title {
        font-size: ${polished.rem(16)};
        color: ${theme?.colors?.palette?.dark?.[600]}
      }
    `
  }

  nls = (id: string) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages, jimuCoreDefaultMessages)
    //for unit testing no need to mock intl we can directly use default en msg
    if (this.props.intl && this.props.intl.formatMessage) {
      return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] })
    } else {
      return messages[id]
    }
  }

  backRefFocus = () => {
    setTimeout(() => {
      this.backRef?.current?.focus()
    }, 50)
  }

  render () {
    return (
      <div tabIndex={-1} className='w-100 h-100' css={this.getStyle(this.props.theme)}>
        <div tabIndex={-1} className='w-100 d-flex align-items-center justify-content-between setting-header border-0' style={{ height: '38px' }}>
          {(!this.props.hideBackArrow)
            ? <div tabIndex={-1} className='h-100'>
              <div ref={this.backRef} tabIndex={0} className='d-flex align-items-center h-100' style={{ cursor: 'pointer' }}
                onClick={this.props.onBack}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    this.props.onBack()
                  }
                }}>
                <div className='d-flex align-items-center' title={this.nls('backButton')} aria-label={this.nls('backButton')}>
                  <Icon icon={epConfigIcon.iconBack} autoFlip size='14' className='text-dark' />
                </div>
                <div aria-label={this.props.title}
                  className='pl-2 setting-title' style={{ maxWidth: '190px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  title={this.props.title}
                >{this.props.title}
                </div>
              </div>
            </div>
            : <div aria-label={this.props.title} tabIndex={0} className='setting-title mt-1' style={{ maxWidth: '190px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
             title={this.props.title}>
              {this.props.title}
            </div>}
          <Button role={'button'} aria-label={this.nls('close')} title={this.nls('close')} size='sm' icon type='tertiary' onClick={this.props.onClose}>
            <Icon icon={epConfigIcon.iconClose} size='16' /></Button>
        </div>
        {this.props.children}
      </div>
    )
  }
}
