import { React } from 'jimu-core'
import { SettingCollapse as _SettingCollapse, SettingCollapseProps } from 'jimu-ui/advanced/setting-components'
import editOutlined from 'jimu-icons/svg/outlined/editor/edit.svg'

export const SettingCollapse = (props: SettingCollapseProps): React.ReactElement => {
  const { rightIcon = editOutlined, ...others } = props
  return (<_SettingCollapse rightIcon={rightIcon} {...others} />)
}
