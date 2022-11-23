/** @jsx jsx */
import { React, jsx } from 'jimu-core'
import { hooks, Switch, defaultMessages as jimuUIMessages } from 'jimu-ui'
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import defaultMessages from '../../../translations/default'
import { Tool3D } from '../../../../constraints'

export interface Props {
  toolConfig: Tool3D
  onAcitvedChanged: (acitvedOnLoadFlag: boolean) => void
}

export const AcitvedOnLoad = React.memo((props: Props) => {
  const translate = hooks.useTranslate(defaultMessages, jimuUIMessages)

  const _onAcitvedChanged = props.onAcitvedChanged
  const onChanged = React.useCallback((checkedFlag: boolean) => {
    _onAcitvedChanged(checkedFlag)
  }, [_onAcitvedChanged])

  return (
    <React.Fragment>
      <SettingSection>
        <SettingRow label={translate('activedOnLoad')}>
          <Switch aria-label={translate('activedOnLoad')}
            checked={props.toolConfig.activedOnLoad}
            onChange={evt => { onChanged(evt.target.checked) }}/>
        </SettingRow>
      </SettingSection>
    </React.Fragment>
  )
})
