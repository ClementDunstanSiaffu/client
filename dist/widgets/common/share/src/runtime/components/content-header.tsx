/** @jsx jsx */
import { React, jsx, css, IntlShape } from 'jimu-core'
import { UiMode, ItemsName, BackableList } from '../../config'
import { Button } from 'jimu-ui'
import nls from '../translations/default'
import { BackBtn } from './back-btn'

import { CloseOutlined } from 'jimu-icons/outlined/editor/close'

const { useCallback } = React

interface Props {
  intl: IntlShape

  uiMode: UiMode
  shownItem: ItemsName
  isInController: boolean

  onBackBtnClick: () => void
  onPopupBtnClick: () => void
}

export const ContentHeader = React.memo((props: Props) => {
  const headerStyle = css`
    &.content-header{
      margin-bottom: 1rem;

      .title{
        font-weight: bolder;
        font-size: 1rem;

        max-height: 24px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      .jimu-icon{
        margin: 0;
      }
    }
  `

  const renderBackBtn = useCallback(() => {
    let content = null
    if (BackableList.includes(props.shownItem)) {
      content = <BackBtn uiMode={props.uiMode} onBackBtnClick={props.onBackBtnClick}></BackBtn>
    }
    return content
  }, [props.shownItem, props.uiMode, props.onBackBtnClick])

  const renderPopupTitle = useCallback(() => {
    let popupTitle = props.intl.formatMessage({ id: 'popupTitle', defaultMessage: nls.popupTitle })
    const shownItem = props.shownItem

    if (shownItem === ItemsName.QRcode) {
      popupTitle = props.intl.formatMessage({ id: 'qrcodeTitle', defaultMessage: nls.qrcodeTitle })
    } else if (shownItem === ItemsName.Sharelink) {
      popupTitle = props.intl.formatMessage({ id: 'shareLinkTitle', defaultMessage: nls.shareLinkTitle })
    } else if (shownItem === ItemsName.Embed) {
      popupTitle = props.intl.formatMessage({ id: 'embedTitle', defaultMessage: nls.embedTitle })
    }
    return popupTitle
  }, [props.shownItem, props.intl])

  // Renderer
  const backBtn = renderBackBtn()
  const popupTitle = renderPopupTitle()
  const hideMainContentHeaderInController = (props.shownItem === null && props.isInController)// hide header when Sharelink in Controller
  return (
    <React.Fragment>
      {!(hideMainContentHeaderInController) &&
        < div className='d-flex content-header justify-content-between align-items-center w-100' css={headerStyle}>
          <div className='d-flex w-100'>
            { /* 1. backBtn */}
            {backBtn}
            { /* 2. title */}
            <div className='title d-flex' title={popupTitle} aria-label={popupTitle}>{popupTitle}</div>
          </div>

          { /* 3. closeBtn */}
          {!props.isInController &&
            <Button className='close d-flex' onClick={props.onPopupBtnClick}>
              <CloseOutlined size='m' />
            </Button>
          }
        </div>
      }
    </React.Fragment >
  )
})
