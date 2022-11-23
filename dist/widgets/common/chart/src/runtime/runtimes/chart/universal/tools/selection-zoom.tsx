import { React, classNames } from 'jimu-core'
import { Button, hooks, Tooltip } from 'jimu-ui'
import { RangeCursorModeProps, RangeCursorModeValue, RangeCursorMode } from './range-cursor-mode'
import { TrashCheckOutlined } from 'jimu-icons/outlined/editor/trash-check'

export interface SelectionZoomProps extends Omit<RangeCursorModeProps, 'onChange'> {
  onModeChange?: (mode?: RangeCursorModeValue) => void
  onClearSelection?: () => void
}

export const SelectionZoom = (props: SelectionZoomProps): React.ReactElement => {
  const translate = hooks.useTranslate()
  const { type, className, onModeChange, onClearSelection } = props

  return <div className={classNames('selection-zoom d-flex', className)}>
    <RangeCursorMode type={type} className="mr-1" onChange={onModeChange} />
    <Tooltip title={translate('clearSelection')}>
      <Button
        size='sm'
        icon
        type='tertiary'
        onClick={onClearSelection}
      >
        <TrashCheckOutlined />
      </Button>
    </Tooltip>
  </div>
}
