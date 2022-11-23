/**@jsx jsx */
import { React, jsx, css, classNames, ImmutableObject, Immutable } from 'jimu-core'
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker'
import { convertStripColors } from '../utils'
import { Button, Label } from 'jimu-ui'
import { getTheme2 } from 'jimu-theme'
import { SeriesColors } from '../../../../../../../../utils/default'
import { MinusCircleOutlined } from 'jimu-icons/outlined/editor/minus-circle'
import { ColorMatch } from '../../../../../../../../config'

interface ColorItemProps {
  className?: string
  label: string
  value: ImmutableObject<ColorMatch>
  onChange?: (value: ImmutableObject<ColorMatch>) => void
  deletable?: boolean
  onDelete?: () => void
}

const presetSeriesColors = convertStripColors(SeriesColors)

const style = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  label {
    width: 88%;
    flex-grow: 1;
    display: inline-flex;
    justify-content: space-between;
    .label {
      max-width: 70%;
    }
  }
`
const defaultValue = Immutable({}) as ImmutableObject<ColorMatch>
export const ColorItem = (props: ColorItemProps): React.ReactElement => {
  const { className, value: propValue = defaultValue, label, onChange, deletable, onDelete } = props
  const _fillColor = propValue._fillColor

  const appTheme = getTheme2()

  const handleColorChange = (color: string) => {
    const value = propValue.set('_fillColor', color)
    onChange?.(value)
  }

  const handleDeleteClick = () => {
    onDelete?.()
  }

  return (
    <div css={style} className={classNames('color-item', className)}>
      <Label check>
        <span className='label text-truncate' title={label}>{label}</span>
        <ThemeColorPicker disableReset disableAlpha={!deletable} specificTheme={appTheme} presetColors={presetSeriesColors} value={_fillColor} onChange={handleColorChange} />
      </Label>
      {
        deletable && <Button type='tertiary' icon size='sm' onClick={handleDeleteClick}><MinusCircleOutlined size='m' /></Button>
      }
    </div>
  )
}
