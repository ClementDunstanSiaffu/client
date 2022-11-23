import { React, jsx } from 'jimu-core'
import { ClickOutlined } from 'jimu-icons/outlined/application/click'
import { styled } from 'jimu-theme'

const Root = styled.div`
  overflow: hidden;
  height: calc(100% - 102px);
  .jimu-icon {
    color: var(--dark-200);
  }
  p {
    color: var(--dark-500);
  }
`

export const Placeholder = ({ placeholder, messageId }): React.ReactElement => {
  return (
    <Root
      className='placeholder d-flex flex-column align-items-center justify-content-center p-3'>
      <div className='d-flex flex-column align-items-center'>
        <ClickOutlined size={48} />
        <p className='mt-3 text-center' id={messageId}>
          {placeholder}
        </p>
      </div>
    </Root>
  )
}
