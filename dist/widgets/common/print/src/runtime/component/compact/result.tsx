/** @jsx jsx */
import { React, jsx, css, classNames } from 'jimu-core'
import { Button, hooks, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { PrintResultState, IMPrintResultListItemTyle } from '../../../config'
import defaultMessage from '../../translations/default'
import { PageOutlined } from 'jimu-icons/outlined/data/page'
import PrintLoading from '../loading-icon'
import { WrongOutlined } from 'jimu-icons/outlined/suggested/wrong'

interface Props {
  prinResult: IMPrintResultListItemTyle
  restPrint: () => void
}

const Result = (props: Props) => {
  const nls = hooks.useTranslate(defaultMessage, jimuiDefaultMessage)

  const { prinResult, restPrint } = props

  const STYLE = css`
    .error-link, .error-link:hover {
      color: var(--dark);
      & svg {
        color: var(--danger-800);
      }
    }
  `

  const renderResultItemIcon = () => {
    switch (prinResult?.state) {
      case PrintResultState.Loading:
        return <PrintLoading/>
      case PrintResultState.Success:
        return (<PageOutlined/>)
      case PrintResultState.Error:
        return (<span title={nls('uploadImageError')}><WrongOutlined /></span>)
    }
  }

  return (
    <div className='d-flex flex-column h-100 w-100' css={STYLE}>
      <Button
        href={prinResult?.url}
        disabled={!prinResult?.url}
        target='_blank'
        size='sm'
        aria-label={prinResult?.title}
        title={prinResult?.title}
        type='tertiary'
        className={classNames('d-flex align-items-center', { 'error-link': prinResult?.state === PrintResultState.Error })}
      >
        {renderResultItemIcon()}
        <div className='ml-2'>{prinResult?.title}</div>
      </Button>
      <div className='flex-grow-1 d-flex align-items-end'>
        <div className='flex-grow-1'></div>
        <Button type='primary' onClick={restPrint}>{nls('reset')}</Button>
      </div>
    </div>
  )
}

export default Result
