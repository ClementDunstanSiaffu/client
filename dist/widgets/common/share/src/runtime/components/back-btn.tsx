/** @jsx jsx */
import { React, jsx, css } from 'jimu-core'
import { Button } from 'jimu-ui'
import { UiMode } from '../../config'
import { stopPropagation } from './items/utils'

import { ArrowLeftOutlined } from 'jimu-icons/outlined/directional/arrow-left'

const { useCallback } = React
interface Props {
  uiMode: UiMode
  onBackBtnClick: (() => void)
}

export const BackBtn = React.memo((props: Props) => {
  const onBackBtnClick = useCallback((evt: React.MouseEvent<HTMLDivElement>) => {
    props.onBackBtnClick()

    stopPropagation(evt)
  }, [props])

  const style = css`
      .back-btn {
        border: none;
      }

      .separator {
        width: 0.5rem;
      }
    `

  let content = null
  if (props.uiMode === UiMode.Inline) {
    content = null
  } else {
    content = <div className='d-flex align-items-center' css={style}>
      <Button className='back-btn' size='sm' icon
        onClick={evt => onBackBtnClick(evt)} >
        <ArrowLeftOutlined size={'m'} autoFlip />
      </Button>
      <div className='separator'></div>
    </div>
  }

  return content
})
