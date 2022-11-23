import { React } from 'jimu-core'
import { CategoryType } from '../../../../../../../../config'
import { ByFieldColorList } from './by-field'
import { ByGroupColorList, ByGroupColorListProps } from './by-group'
import defaultMessages from '../../../../../../../translations/default'
import { hooks } from 'jimu-ui'
import { SidePopperTooltip } from '../../../../../../components'
interface ColorListProps extends ByGroupColorListProps {
  open?: boolean
  onRequestClose?: () => void
  categoryType: CategoryType
}

const totalNumberLimit = 50
const numberPerLoads = 20
export const ColorList = (props: ColorListProps) => {
  const { open, onRequestClose, categoryType, value, onChange, onColorsChange, ...others } = props
  const translate = hooks.useTranslate(defaultMessages)
  const tooltip = categoryType === CategoryType.ByGroup ? translate('sliceColorTip', { numberPerLoads, totalNumberLimit }) : ''

  return <SidePopperTooltip
    trigger={null}
    position='right'
    isOpen={open}
    title={translate('sliceColor')}
    tooltip={tooltip}
    toggle={onRequestClose}
  >
    {categoryType === CategoryType.ByGroup && (
      <ByGroupColorList
        value={value}
        onColorsChange={onColorsChange}
        onChange={onChange}
        {...others}
      />
    )}
    {categoryType === CategoryType.ByField && (
      <ByFieldColorList
        onColorsChange={onColorsChange}
        value={value}
        onChange={onChange}
      />
    )}
  </SidePopperTooltip>
}
