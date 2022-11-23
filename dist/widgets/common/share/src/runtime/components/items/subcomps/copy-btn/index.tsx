/** @jsx jsx */
import { React, jsx, useIntl } from 'jimu-core'
import { Button, defaultMessages, Tooltip } from 'jimu-ui'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTimer } from './hooks/useTimer'
import nls from '../../../../translations/default'
import { getStyles } from './styles'
import { CopyOutlined } from 'jimu-icons/outlined/editor/copy'
import { CheckOutlined } from 'jimu-icons/outlined/application/check'

interface Props {
  text: string
  onCopy: ((text, result) => void)
}

export const CopyBtn = React.memo((props: Props) => {
  const [isShowSuccessfullyCopied, setIsShowSuccessfullyCopied] = React.useState(null)
  const [initTimer, clearTimer] = useTimer(3000, setIsShowSuccessfullyCopied)

  React.useEffect(() => {
    clearTimer()
  }, [props.text, clearTimer])

  const onCopy = React.useCallback((text, result) => {
    props.onCopy(text, result) // stopPropagation(evt)
    initTimer()
  }, [props, initTimer])

  const copyNls = useIntl().formatMessage({ id: 'copy', defaultMessage: nls.copyString })
  const copiedToClipboardNls = useIntl().formatMessage({ id: 'copiedToClipboard', defaultMessage: defaultMessages.copiedToClipboard })
  const title = (isShowSuccessfullyCopied ? copiedToClipboardNls : copyNls)
  return <div css={getStyles()} >
    <CopyToClipboard onCopy={onCopy} text={props.text} options={{ format: 'text/plain' }} data-testid='copy-btn'>
      <Tooltip title={title} placement='auto-end'>
        <Button className='copy-btn jimu-outline-inside d-flex' icon type='tertiary'>
          {/* 1. Btn: copy to clipboard */}
          {!isShowSuccessfullyCopied &&
            <CopyOutlined size='m' autoFlip />
          }
          {/* 2. Btn: successfully copied */}
          {isShowSuccessfullyCopied &&
            <CheckOutlined size='m' autoFlip />
          }
        </Button>
      </Tooltip>
    </CopyToClipboard >
  </div>
})
