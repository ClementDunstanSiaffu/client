/** @jsx jsx */
import { ImmutableObject, IMThemeButtonStylesByState, jsx, ThemeBoxStyles } from 'jimu-core'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { Tabs, Tab, hooks, defaultMessages as jimuUiDefaultMessages } from 'jimu-ui'
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker'
import defaultMessages from './translations/default'
import { useTheme2 } from 'jimu-theme'
import { FontSetting } from './font-setting'

interface AdvancedSettingProps {
  variant: IMThemeButtonStylesByState
  onChange: (state: string, key: string, value: any) => void
}

const BoxStates = ['default', 'active', 'hover']
export const SettingAdvanced = (props: AdvancedSettingProps) => {
  const { variant, onChange } = props
  const translate = hooks.useTranslate(defaultMessages, jimuUiDefaultMessages)
  const theme = useTheme2()

  return (
    <SettingRow className="sw-controller__advanced-setting" flow="wrap">
      <Tabs type='pills' className="flex-grow-1 w-100 h-100" fill defaultValue={BoxStates[0]}>
        {
          BoxStates.map((state, x) => {
            const themeBoxStyles = variant?.[state] as ImmutableObject<ThemeBoxStyles>
            return (
              <Tab key={x} id={state} className="tab-title-item" title={translate(state)}>
                <SettingRow className="mt-3" label={translate('textFormatOverride')} flow="no-wrap">
                  <FontSetting
                    aria-label={translate('textFormatOverride')}
                    bold={themeBoxStyles?.bold as boolean}
                    italic={themeBoxStyles?.italic as boolean}
                    underline={themeBoxStyles?.underline as boolean}
                    strike={themeBoxStyles?.strike as boolean}
                    color={themeBoxStyles?.color}
                    onChange={(key, value) => onChange(state, key, value)}
                  />
                </SettingRow>
                <SettingRow className="mt-2" label={translate('iconBackgroundOverride')} flow="no-wrap">
                  <ThemeColorPicker
                    aria-label={translate('iconBackgroundOverride')}
                    specificTheme={theme}
                    value={themeBoxStyles?.bg}
                    onChange={(value) => onChange(state, 'bg', value)}
                  />
                </SettingRow>
              </Tab>
            )
          })
        }
      </Tabs>
    </SettingRow>
  )
}
