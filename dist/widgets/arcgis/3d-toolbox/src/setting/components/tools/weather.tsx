/** @jsx jsx */
import { React, jsx } from 'jimu-core'
import { hooks, Select, NumericInput, /*Switch,*/defaultMessages as jimuUIMessages } from 'jimu-ui'
import defaultMessages from '../../translations/default'
import { SettingSection, SettingRow, SettingCollapse } from 'jimu-ui/advanced/setting-components'
import { Tool3D, WeatherConfig, WeatherType } from '../../../constraints'
import { AcitvedOnLoad } from './sub-comp/actived-on-load'

export interface Props {
  toolConfig: Tool3D
  hanldeToolSettingChanged: (toolConfig: Tool3D, config: any, activedOnLoadFlag?: boolean) => Tool3D
  // cb
  onSettingChanged: (toolConfig: Tool3D) => void
}

export const Weather = React.memo((props: Props) => {
  const translate = hooks.useTranslate(defaultMessages, jimuUIMessages)

  const { onSettingChanged, hanldeToolSettingChanged } = props
  const _onSettingChanged = React.useCallback((config: any, activedOnLoadFlag?: boolean) => {
    onSettingChanged(hanldeToolSettingChanged(props.toolConfig, config, activedOnLoadFlag))
  }, [props.toolConfig,
    onSettingChanged, hanldeToolSettingChanged])

  // SettingCollapse states
  const [isShowSunnyConfigState, setIsShowSunnyConfigState] = React.useState<boolean>(false)
  const handleIsShowSunnyConfigState = () => {
    setIsShowSunnyConfigState(!isShowSunnyConfigState)
  }
  const [isShowCloudyConfigState, setIsShowCloudyConfigState] = React.useState<boolean>(false)
  const handleIsShowCloudyConfigState = () => {
    setIsShowCloudyConfigState(!isShowCloudyConfigState)
  }
  const [isShowRainyConfigState, setIsShowRainyConfigState] = React.useState<boolean>(false)
  const handleIsShowRainyConfigState = () => {
    setIsShowRainyConfigState(!isShowRainyConfigState)
  }
  const [isShowSnowyConfigState, setIsShowSnowyConfigState] = React.useState<boolean>(false)
  const handleIsShowSnowyConfigState = () => {
    setIsShowSnowyConfigState(!isShowSnowyConfigState)
  }
  const [isShowFoggyConfigState, setIsShowFoggyConfigState] = React.useState<boolean>(false)
  const handleIsShowFoggyConfigState = () => {
    setIsShowFoggyConfigState(!isShowFoggyConfigState)
  }
  // SettingCollapse states

  const weatherTypes = [WeatherType.Sunny, WeatherType.Cloudy, WeatherType.Rainy, WeatherType.Snowy, WeatherType.Foggy]
  const weatherConfig = props.toolConfig.config as WeatherConfig
  return (
  <React.Fragment>
    <SettingSection className='first-setting-section'>
      {/* Default weather */}
      <SettingRow label={translate('defaultWeather')}></SettingRow>
      <SettingRow>
        <Select size='sm' value={weatherConfig.weatherType} onChange={(evt) => _onSettingChanged({ weatherType: evt.target.value })} className=''>
          {
            weatherTypes.map((type, idx) => {
              return <option key={idx} value={type}>{translate(type)}</option>
            })
          }
        </Select>
      </SettingRow>
    </SettingSection>

    {/* Default defaultValues */}
    <SettingSection>
      { /* label */ }
      <SettingRow label={translate('defaultValues')}></SettingRow>

      { /* 1.Sunny config */ }
      <SettingCollapse label={translate('sunnyDay')}
        isOpen={isShowSunnyConfigState}
        onRequestOpen={handleIsShowSunnyConfigState}
        onRequestClose={handleIsShowSunnyConfigState}
        className="my-3">
        <SettingRow label={translate('cloudCover')} className="mx-1 my-2">
          <NumericInput
            className='ml-2 numeric-input' size='sm'
            value={(weatherConfig.sunnyConfig).cloudCover}
            defaultValue={0.5} min={0} max={1} step={0.1}
            onChange={(val) => { _onSettingChanged({ sunnyConfig: { cloudCover: val } }) }}
          />
        </SettingRow>
      </SettingCollapse>

      { /* 2.Cloudy config */ }
      <SettingCollapse label={translate('cloudyDay')}
        isOpen={isShowCloudyConfigState}
        onRequestOpen={handleIsShowCloudyConfigState}
        onRequestClose={handleIsShowCloudyConfigState}
        className="my-3">
        <SettingRow label={translate('cloudCover')} className="mx-1 my-2">
          <NumericInput
            className='ml-2 numeric-input' size='sm'
            value={(weatherConfig.cloudyConfig).cloudCover}
            defaultValue={0.5} min={0} max={1} step={0.1}
            onChange={(val) => { _onSettingChanged({ cloudyConfig: { cloudCover: val } }) }}
          />
        </SettingRow>
      </SettingCollapse>

      { /* 3.Rainy config */ }
      <SettingCollapse label={translate('rainyDay')}
        isOpen={isShowRainyConfigState}
        onRequestOpen={handleIsShowRainyConfigState}
        onRequestClose={handleIsShowRainyConfigState}
        className="my-3">
        <React.Fragment>
          <SettingRow label={translate('cloudCover')} className="mx-1 my-2">
            <NumericInput
              className='ml-2 numeric-input' size='sm'
              value={(weatherConfig.rainyConfig).cloudCover}
              defaultValue={0.5} min={0} max={1} step={0.1}
              onChange={(val) => {
                _onSettingChanged({
                  rainyConfig: {
                    ...weatherConfig.rainyConfig,
                    ...{ cloudCover: val }
                  }
                })
              }}
            />
          </SettingRow>
          <SettingRow label={translate('precipitation')} className="mx-1 my-2">
            <NumericInput
              className='ml-2 numeric-input' size='sm'
              value={(weatherConfig.rainyConfig).precipitation}
              defaultValue={0.5} min={0} max={1} step={0.1}
              onChange={(val) => {
                _onSettingChanged({
                  rainyConfig: {
                    ...weatherConfig.rainyConfig,
                    ...{ precipitation: val }
                  }
                })
              }}
            />
          </SettingRow>
        </React.Fragment>
      </SettingCollapse>

      { /* 4.Snowy config */ }
      <SettingCollapse label={translate('snowyDay')}
        isOpen={isShowSnowyConfigState}
        onRequestOpen={handleIsShowSnowyConfigState}
        onRequestClose={handleIsShowSnowyConfigState}
        className="my-3">
        <React.Fragment>
          <SettingRow label={translate('cloudCover')} className="mx-1 my-2">
            <NumericInput
              className='ml-2 numeric-input' size='sm'
              value={(weatherConfig.snowyConfig).cloudCover}
              defaultValue={0.5} min={0} max={1} step={0.1}
              onChange={(val) => {
                _onSettingChanged({
                  snowyConfig: {
                    ...weatherConfig.snowyConfig,
                    ...{ cloudCover: val }
                  }
                })
              }}
            />
          </SettingRow>
          <SettingRow label={translate('precipitation')} className="mx-1 my-2">
            <NumericInput
              className='ml-2 numeric-input' size='sm'
              value={(weatherConfig.snowyConfig).precipitation}
              defaultValue={0.5} min={0} max={1} step={0.1}
              onChange={(val) => {
                _onSettingChanged({
                  snowyConfig: {
                    ...weatherConfig.snowyConfig,
                    ...{ precipitation: val }
                  }
                })
              }}
            />
          </SettingRow>

          {/* The show/hide option of Snow cover in Weather has been deleted in the latest API, #9780 */}
          {/* <SettingRow label={translate('snowCover')} className="mx-1 my-2">
            <Switch aria-label={translate('snowCover')}
              checked={(weatherConfig.snowyConfig.snowCover === 'enabled')}
              onChange={evt => {
                _onSettingChanged({
                  snowyConfig: {
                    ...weatherConfig.snowyConfig,
                    ...{ snowCover: evt.target.checked ? 'enabled' : 'disabled' }
                  }
                })
              }} />
          </SettingRow> */}
        </React.Fragment>
      </SettingCollapse>

      { /* 5.Foggy config */ }
      <SettingCollapse label={translate('foggyDay')}
        isOpen={isShowFoggyConfigState}
        onRequestOpen={handleIsShowFoggyConfigState}
        onRequestClose={handleIsShowFoggyConfigState}
        className="my-3">
        <SettingRow label={translate('fogStrength')} className="mx-1 my-2">
          <NumericInput
            className='ml-2 numeric-input' size='sm'
            value={(weatherConfig.foggyConfig).fogStrength}
            defaultValue={0.5} min={0} max={1} step={0.1}
            onChange={(val) => { _onSettingChanged({ foggyConfig: { fogStrength: val } }) }}
          />
        </SettingRow>
      </SettingCollapse>
    </SettingSection>

    {/* acitvedOnLoad */}
    <AcitvedOnLoad
      toolConfig={props.toolConfig}
      onAcitvedChanged={checkedFlag => _onSettingChanged(null, checkedFlag)}
    ></AcitvedOnLoad>
  </React.Fragment>
  )
})
