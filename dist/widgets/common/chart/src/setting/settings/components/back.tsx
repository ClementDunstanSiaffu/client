/** @jsx jsx */
import { css, jsx, React, SerializedStyles } from 'jimu-core'
import { Button, defaultMessages, hooks } from 'jimu-ui'
import { ArrowLeftOutlined } from 'jimu-icons/outlined/directional/arrow-left'
import { useTheme } from 'jimu-theme'

export interface BackProps {
  className?: string
  onClick: () => void
  text?: string
}

const useStyle = (): SerializedStyles => {
  const theme = useTheme()
  const dark400 = theme?.colors?.palette.dark[400]

  return React.useMemo(() => {
    return css`
      span {
        color: ${dark400};
      }
    `
  }, [dark400])
}

export const Back = (props: BackProps): React.ReactElement => {
  const translate = hooks.useTranslate(defaultMessages)
  const style = useStyle()

  const { className, onClick, text = translate('back') } = props
  return (
    <Button
      css={style}
      className={className}
      icon
      size='sm'
      type='tertiary'
      onClick={onClick}
    >
      <ArrowLeftOutlined />
      <span className='font-body1 ml-2'>{text}</span>
    </Button>
  )
}
