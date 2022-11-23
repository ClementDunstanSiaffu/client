/** @jsx jsx */
import {
  React, css, jsx, ActionSettingProps, SerializedStyles, ImmutableObject,
  ThemeVariables, polished, Immutable
} from 'jimu-core'
import { Radio } from 'jimu-ui'
import { SymbolSelector, JimuSymbolType, JimuSymbol } from 'jimu-ui/advanced/map'
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import defaultMessages from '../setting/translations/default'
import { withTheme } from 'jimu-theme'
import { SymbolOption, loadArcGISJSAPIModules, featureUtils } from 'jimu-arcgis'

interface ExtraProps {
  theme?: ThemeVariables
}

interface States {
  isModulesLoaded?: boolean
}

interface Config {
  isUseCustomSymbol?: boolean
  symbolOption?: SymbolOption
}

export type IMConfig = ImmutableObject<Config>

class _ShowOnMapActionSetting extends React.PureComponent<ActionSettingProps<IMConfig> & ExtraProps, States> {
  modalStyle: any = {
    position: 'absolute',
    top: '0',
    bottom: '0',
    width: '259px',
    height: 'auto',
    borderRight: '',
    borderBottom: '',
    paddingBottom: '1px'
  }

  jsonUtils: typeof __esri.jsonUtils
  defaultSymbolOption: ImmutableObject<SymbolOption>

  constructor (props) {
    super(props)
    this.jsonUtils = null
    this.defaultSymbolOption = Immutable({})
    this.state = {
      isModulesLoaded: false
    }
  }

  static defaultProps = {
    config: Immutable({
      isUseCustomSymbol: true
    })
  }

  componentDidMount () {
    loadArcGISJSAPIModules([
      'esri/symbols/support/jsonUtils'
    ]).then(modules => {
      [
        this.jsonUtils
      ] = modules

      this.setState({
        isModulesLoaded: true
      })
    })
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config
    })
  }

  getStyle (theme: ThemeVariables): SerializedStyles {
    return css`
      .setting-header {
        padding: ${polished.rem(10)} ${polished.rem(16)} ${polished.rem(0)} ${polished.rem(16)}
      }

      .deleteIcon {
        cursor: pointer;
        opacity: .8;
      }

      .deleteIcon:hover {
        opacity: 1;
      }
    `
  }

  handleIsUseCustomSymbolOption = (isUseCustomSymbol: boolean) => {
    this.props.onSettingChange({
      actionId: this.props.actionId,
      //config: this.props.config.set('isUseCustomSymbol', isUseCustomSymbol)
      config: this.props.config.set('isUseCustomSymbol', isUseCustomSymbol).set('symbolOption', null)
    })
  }

  onSymbolChanged = (symbol: JimuSymbol, type: string) => {
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config.setIn(['symbolOption', type], symbol.toJSON())
    })
  }

  onSymbolCreated = (symbol: JimuSymbol, type: string) => {
    this.defaultSymbolOption = this.defaultSymbolOption.set(type, symbol?.toJSON())
    if (!this.props.config.symbolOption &&
        this.defaultSymbolOption.pointSymbol &&
        this.defaultSymbolOption.polylineSymbol &&
        this.defaultSymbolOption.polygonSymbol) {
      this.props.onSettingChange({
        actionId: this.props.actionId,
        config: this.props.config.setIn(['symbolOption'], this.defaultSymbolOption)
      })
    }
  }

  getInitSymbolFromConfig = (jimuSymbolType: JimuSymbolType): JimuSymbol => {
    let symbol
    const symbolOption = this.props.config.symbolOption
    if (this.jsonUtils) {
      if (jimuSymbolType === JimuSymbolType.Point) {
        symbol = symbolOption?.pointSymbol ? symbolOption.pointSymbol : featureUtils.getDefaultSymbol('point')
      } else if (jimuSymbolType === JimuSymbolType.Polyline) {
        symbol = symbolOption?.polylineSymbol ? symbolOption.polylineSymbol : featureUtils.getDefaultSymbol('polyline')
      } else if (jimuSymbolType === JimuSymbolType.Polygon) {
        symbol = symbolOption?.polygonSymbol ? symbolOption.polygonSymbol : featureUtils.getDefaultSymbol('polygon')
      }
    }
    // @ts-expect-error
    return symbol ? this.jsonUtils.fromJSON(symbol) : null
  }

  render () {
    return (
      <div css={this.getStyle(this.props.theme)} >
        <SettingSection title={this.props.intl.formatMessage({ id: 'symbol', defaultMessage: 'symbol' })}>
          <SettingRow>
            <div className='d-flex justify-content-between w-100 align-items-center'>
              <div className='align-items-center d-flex'>
                <Radio
                  style={{ cursor: 'pointer' }} checked={!this.props.config.isUseCustomSymbol}
                  onChange={() => this.handleIsUseCustomSymbolOption(false)}
                />
                <label className='m-0 ml-2' style={{ cursor: 'pointer' }}>
                  {this.props.intl.formatMessage({ id: 'mapAction_UseLayerDefinedSymbols', defaultMessage: defaultMessages.mapAction_UseLayerDefinedSymbols })}
                </label>
              </div>
            </div>
          </SettingRow>
          <SettingRow>
            <div className='d-flex justify-content-between w-100 align-items-center'>
              <div className='align-items-center d-flex'>
                <Radio
                  style={{ cursor: 'pointer' }} checked={this.props.config.isUseCustomSymbol}
                  onChange={() => this.handleIsUseCustomSymbolOption(true)}
                />
                <label className='m-0 ml-2' style={{ cursor: 'pointer' }}>
                  {this.props.intl.formatMessage({ id: 'mapAction_UseCustomSymbols', defaultMessage: defaultMessages.mapAction_UseCustomSymbols })}
                </label>
              </div>
            </div>
          </SettingRow>
          {this.props.config.isUseCustomSymbol && this.jsonUtils && <SettingSection>
            <SettingRow label={this.props.intl.formatMessage({ id: 'mapAction_Point', defaultMessage: defaultMessages.mapAction_Point })}>
              <SymbolSelector jimuSymbolType={JimuSymbolType.Point} symbol={this.getInitSymbolFromConfig(JimuSymbolType.Point)}
                                                                    onPointSymbolChanged={ (symbol) => this.onSymbolChanged(symbol, 'pointSymbol') }
                                                                    onCreated={ (symbolParam) => this.onSymbolCreated(symbolParam.symbol, 'pointSymbol') }/>
            </SettingRow>
            <SettingRow label={this.props.intl.formatMessage({ id: 'mapAction_Polyline', defaultMessage: defaultMessages.mapAction_Polyline })}>
              <SymbolSelector jimuSymbolType={JimuSymbolType.Polyline} symbol={this.getInitSymbolFromConfig(JimuSymbolType.Polyline)}
                                                                       onPolylineSymbolChanged={ (symbol) => this.onSymbolChanged(symbol, 'polylineSymbol') }
                                                                       onCreated={ (symbolParam) => this.onSymbolCreated(symbolParam.symbol, 'polylineSymbol') }/>
            </SettingRow>
            <SettingRow label={this.props.intl.formatMessage({ id: 'mapAction_Polygon', defaultMessage: defaultMessages.mapAction_Polygon })}>
              <SymbolSelector jimuSymbolType={JimuSymbolType.Polygon} symbol={this.getInitSymbolFromConfig(JimuSymbolType.Polygon)}
                                                                      onPolygonSymbolChanged={ (symbol) => this.onSymbolChanged(symbol, 'polygonSymbol') }
                                                                      onCreated={ (symbolParam) => this.onSymbolCreated(symbolParam.symbol, 'polygonSymbol') }/>
            </SettingRow>
          </SettingSection>}
        </SettingSection>
      </div>
    )
  }
}

export default withTheme(_ShowOnMapActionSetting)
