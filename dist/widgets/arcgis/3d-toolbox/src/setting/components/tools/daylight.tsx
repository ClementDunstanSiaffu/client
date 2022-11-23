/** @jsx jsx */
import { React, jsx } from 'jimu-core'
import { hooks, Switch, Select, NumericInput, Radio, Label, defaultMessages as jimuUIMessages } from 'jimu-ui'
import defaultMessages from '../../translations/default'
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { Tool3D, DaylightConfig, DateOrSeason, Season } from '../../../constraints'
import { AcitvedOnLoad } from './sub-comp/actived-on-load'

export interface Props {
  toolConfig: Tool3D
  hanldeToolSettingChanged: (toolConfig: Tool3D, config: any, activedOnLoadFlag?: boolean) => Tool3D
  // cb
  onSettingChanged: (toolConfig: Tool3D) => void
}

export const Daylight = React.memo((props: Props) => {
  const translate = hooks.useTranslate(defaultMessages, jimuUIMessages)

  const DEFALUT_PARAMS = React.useMemo(() => {
    return {
      timeSliderStepsDefault: 5,
      timeSliderStepsMax: (60 * 2),
      timeSliderStepsMin: 1,

      speedDefault: 1.0,
      speedMax: 10,
      speedMin: 0.1
    }
  }, [])

  const { onSettingChanged, hanldeToolSettingChanged } = props
  const _onSettingChanged = React.useCallback((config: any, activedOnLoadFlag?: boolean) => {
    onSettingChanged(hanldeToolSettingChanged(props.toolConfig, config, activedOnLoadFlag))
  }, [props.toolConfig,
    onSettingChanged, hanldeToolSettingChanged])

  const _onDateOrSeasonChanged = React.useCallback((type: DateOrSeason, checked: boolean) => {
    if (checked) {
      _onSettingChanged({ dateOrSeason: type })
    }
  }, [_onSettingChanged])

  const daylightConfig = props.toolConfig.config as DaylightConfig
  const seasonTypes = [Season.SyncedWithMap, Season.Spring, Season.Summer, Season.Fall, Season.Winter]
  return (
  <React.Fragment>
    <SettingSection className='first-setting-section'>
      {/* Timezone selector */}
      <SettingRow label={translate('timezoneSelector')}>
        <Switch aria-label={translate('timezoneSelector')}
          checked={daylightConfig.timezone}
          onChange={evt => { _onSettingChanged({ timezone: evt.target.checked }) }}/>
      </SettingRow>

      {/* Time slider steps */}
      <SettingRow label={translate('timeSliderSteps')}>
        <NumericInput
          className='ml-2 numeric-input' size='sm'
          value={daylightConfig.timeSliderSteps} defaultValue={DEFALUT_PARAMS.timeSliderStepsDefault}
          min={DEFALUT_PARAMS.timeSliderStepsMin} max={DEFALUT_PARAMS.timeSliderStepsMax} step={1} precision={0}
          onChange={(val) => { _onSettingChanged({ timeSliderSteps: val }) }}
        />
      </SettingRow>

      {/* Date selector */}
      <SettingRow label={translate('dateSelector')}>
        <Switch aria-label={translate('dateSelector')}
          checked={daylightConfig.datePicker}
          onChange={evt => { _onSettingChanged({ datePicker: evt.target.checked }) }}
          />
      </SettingRow>
      {/* Date or Season */}
      {daylightConfig.datePicker &&
        <SettingRow>
          <div className='d-block'>
            <div className='d-flex align-items-center mb-2'>
              <Label className='d-flex align-items-center'>
                <Radio
                  name='dateOrSeason' className='mr-2'
                  checked={daylightConfig.dateOrSeason === DateOrSeason.Date}
                  onChange={(evt, checked) => { _onDateOrSeasonChanged(DateOrSeason.Date, checked) }}
                />
                {translate('date')}
              </Label>
            </div>
            <div className='d-flex align-items-center'>
              <Label className='d-flex align-items-center'>
                <Radio
                  name='dateOrSeason' className='mr-2'
                  checked={daylightConfig.dateOrSeason === DateOrSeason.Season}
                  onChange={(evt, checked) => { _onDateOrSeasonChanged(DateOrSeason.Season, checked) }}
                />
                {translate('season')}
              </Label>
            </div>
          </div>
        </SettingRow>
      }
      {/* Default season */}
      {(daylightConfig.dateOrSeason === DateOrSeason.Season) &&
        <React.Fragment>
          <SettingRow label={translate('defaultSeason')}></SettingRow>
          <SettingRow>
            <Select size='sm' value={daylightConfig.currentSeason} onChange={(evt) => _onSettingChanged({ currentSeason: evt.target.value })} className=''>
              {
                seasonTypes.map((type, idx) => {
                  const tip = translate(type)
                  return <option key={idx} value={type}>{tip}</option>
                })
              }
            </Select>
          </SettingRow>
        </React.Fragment>
      }

      {/* enablePlayControl */}
      <SettingRow label={translate('enablePlayControl')}>
        <Switch aria-label={translate('enablePlayControl')}
          checked={daylightConfig.playButtons}
          onChange={evt => { _onSettingChanged({ playButtons: evt.target.checked }) }}/>
      </SettingRow>
      {(daylightConfig.playButtons && daylightConfig.dateOrSeason === DateOrSeason.Date) &&
        <React.Fragment >
          {/* daytime autoPlay */}
          <SettingRow label={translate('autoPlay')}>
            <Switch aria-label={translate('autoPlay')}
              checked={daylightConfig.dateTimeAutoPlay}
              onChange={evt => { _onSettingChanged({ dateTimeAutoPlay: evt.target.checked }) }} />
          </SettingRow>
          {/* daytime play speed */}
          <SettingRow label={translate('daytimePlaySpeed')}>
            <NumericInput
              className='ml-2 numeric-input' size='sm'
              value={daylightConfig.playSpeedMultiplier} defaultValue={DEFALUT_PARAMS.speedDefault}
              min={DEFALUT_PARAMS.speedMin} max={DEFALUT_PARAMS.speedMax} step={0.5}
              onChange={(val) => { _onSettingChanged({ playSpeedMultiplier: val }) }}
            />
          </SettingRow>
        </React.Fragment>
      }

      {/*  Date time option */}
      <SettingRow label={translate('dateTimeOption')}>
        <Switch aria-label={translate('dateTimeOption')}
          checked={daylightConfig.dateTimeToggle}
          onChange={evt => { _onSettingChanged({ dateTimeToggle: evt.target.checked }) }}/>
      </SettingRow>

      {/* shadow option */}
      <SettingRow label={translate('shadowOption')}>
        <Switch aria-label={translate('shadowOption')}
          checked={daylightConfig.isShowShadows}
          onChange={evt => { _onSettingChanged({ isShowShadows: evt.target.checked }) }}/>
      </SettingRow>
    </SettingSection>

    {/* acitvedOnLoad */}
    <AcitvedOnLoad
      toolConfig={props.toolConfig}
      onAcitvedChanged={checkedFlag => _onSettingChanged(null, checkedFlag)}
    ></AcitvedOnLoad>
  </React.Fragment>
  )
})
