/**@jsx jsx */
import { React, jsx, css, classNames } from 'jimu-core'
import { Button, hooks, Label, TextInput, ValidityResult, defaultMessages as jimuDefaultMessages, Tooltip } from 'jimu-ui'
import { MinusCircleOutlined } from 'jimu-icons/outlined/editor/minus-circle'
import { PlusCircleOutlined } from 'jimu-icons/outlined/editor/plus-circle'
import defaultMessages from '../../../../../../../translations/default'

interface ColorAdderProps {
  className?: string
  validity?: (text: string) => ValidityResult
  onChange?: (text: string) => void
}

const style = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  > .editor {
    width: 100%;
    > .top-part {
      width: 100%;
      display: flex;
      justify-content: space-between;
      > .jimu-input {
        width: 88%;
      }
      > .jimu-btn {
        align-self: flex-start;
      }
    }
    > .info-msg {
      color: var(--dark-600);
      width: 88%;
    }
  }
`

export const ColorAdder = (props: ColorAdderProps): React.ReactElement => {
  const { className, validity, onChange } = props
  const translate = hooks.useTranslate(jimuDefaultMessages, defaultMessages)
  const ref = React.useRef<HTMLInputElement>(null)
  const [editable, setEditable] = React.useState(false)
  const [text, setText] = React.useState('')

  const handleAddClick = () => {
    setEditable(!editable)
    setTimeout(() => {
      ref?.current?.focus()
    })
  }

  const handlekeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      const valid = validity(text).valid
      if (text && valid) {
        setText('')
        onChange?.(text)
        setEditable(false)
      }
    }
  }

  const handleCancleClick = () => {
    setText('')
    setEditable(false)
  }

  return (
    <div className={classNames('color-adder', className)} css={style}>
      {!editable && <Label check>
        {translate('addCategory')}
        <Tooltip title={translate('addCategoryTip')} showArrow enterDelay={300}>
          <Button type='tertiary' icon className='add' size='sm' onClick={handleAddClick}><PlusCircleOutlined size='m' /></Button>
        </Tooltip>
      </Label>}
      {editable && <div className='editor'>
        <div className='top-part'>
          <TextInput
            ref={ref}
            size='sm'
            placeholder={translate('categoryName')}
            value={text}
            onKeyDown={handlekeyDown}
            onChange={(e) => setText(e.target.value)}
            checkValidityOnAccept={validity as any} />
          <Button icon type='tertiary' size='sm' onClick={handleCancleClick} title={translate('commonModalCancel')}><MinusCircleOutlined size='m' /></Button>
        </div>
        <div className='info-msg mt-1'>{translate('pressEnter')}</div>
      </div>}
    </div>
  )
}
