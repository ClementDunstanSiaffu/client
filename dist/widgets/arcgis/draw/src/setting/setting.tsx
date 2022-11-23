/** @jsx jsx */
import { React, jsx, classNames, polished } from 'jimu-core'
import { JimuMapViewSelector, SettingSection, SettingRow, SettingCollapse } from 'jimu-ui/advanced/setting-components'
import { Button, Icon, Switch, Label, Radio, defaultMessages } from 'jimu-ui'
import { AllWidgetSettingProps } from 'jimu-for-builder'
import { IMConfig, Arrangement, DrawingTool } from '../config'
import { MeasurementsUnitsInfo, DrawingElevationMode3D } from 'jimu-ui/advanced/map'
// sub-comps
import { DrawToolsSelector } from './components/draw-tools-selector'
import { MeasurementsUnitsSelector } from './components/measurements-units-selector'
//import { DrawModesSelector } from './components/wip-draw-modes-selector'
import { getStyle } from './style'
// nls
import nls from './translations/default'

import { ClickOutlined } from 'jimu-icons/outlined/application/click'

interface States {
  isSelectedMap: boolean
  isShowAdvancedSetting: boolean
}

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig>/* & ExtraProps*/, States> {
  constructor (props) {
    super(props)

    this.state = {
      isSelectedMap: !!(this.props.useMapWidgetIds?.[0]),
      isShowAdvancedSetting: false
    }
  }

  //Maps
  handleMapWidgetChange = (useMapWidgetIds: string[]): void => {
    const _isSelectMap = !!(useMapWidgetIds?.[0])
    this.setState({ isSelectedMap: _isSelectMap })

    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds
    })
  }

  handleIsDisplayCanvasLayerChange = (): void => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('isDisplayCanvasLayer', !this.props.config.isDisplayCanvasLayer)
    })
  }

  // Arrangement
  handleArrangementChange = (arrangement: Arrangement): void => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('arrangement', arrangement)
    })
  }

  handleShowAdvancedSettingClick = () => {
    this.setState({
      isShowAdvancedSetting: !this.state.isShowAdvancedSetting
    })
  }

  //DrawTools
  handleDrawToolsChange = (drawingTools: DrawingTool[]): void => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('drawingTools', drawingTools)
    })
  }

  //Measurements
  handleIsEnableMeasurementChange = (): void => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['measurementsInfo', 'enableMeasurements'], !this.props.config.measurementsInfo.enableMeasurements)
    })
  }

  handleMeasurementUnitsInfoChange = (measurementsUnitsInfos: MeasurementsUnitsInfo[]): void => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('measurementsUnitsInfos', measurementsUnitsInfos)
    })
  }
  // handleIsEnableAdvancedSettingChange = (/*isEnableAdvancedSetting: boolean*/): void => {
  //   this.props.onSettingChange({
  //     id: this.props.id,
  //     config: this.props.config.set('isEnableAdvancedSetting', !this.props.config.isEnableAdvancedSetting)
  //   })
  // }

  //DrawingElevationMode3D
  handleDrawingElevationMode3DChange = (drawingElevationMode3D: DrawingElevationMode3D): void => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('drawingElevationMode3D', drawingElevationMode3D)
    })
  }

  render () {
    const a11yDescriptionId = this.props.id + '-uimode-description'
    const a11yUIMode0Id = this.props.id + '-uimode-0'
    const a11yUIMode1Id = this.props.id + '-uimode-1'
    //Maps
    const selectMapWidgetTips = this.props.intl.formatMessage({ id: 'selectMapWidget', defaultMessage: nls.selectMapWidget })
    const selectMapHint = this.props.intl.formatMessage({ id: 'selectMapHint', defaultMessage: defaultMessages.selectMapHint })
    //const isDisplayCanvasLayerTips = this.props.intl.formatMessage({ id: 'isDisplayCanvasLayerTips', defaultMessage: nls.isDisplayCanvasLayerTips })
    //Arrangement
    const arrangementTips = this.props.intl.formatMessage({ id: 'arrangementTips', defaultMessage: nls.arrangementTips })
    const panelTips = this.props.intl.formatMessage({ id: 'panelTips', defaultMessage: nls.panelTips })
    const toolbarTips = this.props.intl.formatMessage({ id: 'toolbarTips', defaultMessage: nls.toolbarTips })

    //Advanced setting
    const advancedTips = this.props.intl.formatMessage({ id: 'advance', defaultMessage: defaultMessages.advance })
    //Drawing tools
    const drawingToolsTips = this.props.intl.formatMessage({ id: 'drawingToolsTips', defaultMessage: nls.drawingToolsTips })
    //Other options
    const isEnableMeasurementsTips = this.props.intl.formatMessage({ id: 'isEnableMeasurementsTips', defaultMessage: nls.isEnableMeasurementsTips })
    //const isEnableAdvancedSettingTips = 'Enable advanced setting'
    //DrawingElevationMode3D
    const drawingElevationMode3DTips = this.props.intl.formatMessage({ id: 'drawingElevationMode3DTips', defaultMessage: nls.drawingElevationMode3DTips })
    const relativeToGroundTips = this.props.intl.formatMessage({ id: 'relativeToGroundTips', defaultMessage: nls.relativeToGroundTips })
    const onTheGroundTips = this.props.intl.formatMessage({ id: 'onTheGroundTips', defaultMessage: nls.onTheGroundTips })

    return (
      <div css={getStyle(this.props.theme, polished)} className='widget-setting-menu jimu-widget-setting'>
        <SettingSection title={selectMapWidgetTips} className={classNames('map-selector-section', { 'border-0': !this.state.isSelectedMap })}>
          <SettingRow>
            <JimuMapViewSelector onSelect={this.handleMapWidgetChange} useMapWidgetIds={this.props.useMapWidgetIds} />
          </SettingRow>
          {/* display drawing layer sketch.layer.listMode = 'show'
          <SettingRow label={isDisplayCanvasLayerTips}>
            <Switch checked={this.props.config.isDisplayCanvasLayer} onChange={this.handleIsDisplayCanvasLayerChange}
              aria-label={isDisplayCanvasLayerTips} />
          </SettingRow>*/}
        </SettingSection>

        {/* no map tips */}
        {!this.state.isSelectedMap && <div className='d-flex placeholder-container justify-content-center align-items-center'>
          <div className='d-flex text-center placeholder justify-content-center align-items-center '>
            <ClickOutlined size={48} className='d-flex icon mb-2' />
            <p className='hint'>{selectMapHint}</p>
          </div>
        </div>}

        {/* Settings related to map after map loaded */}
        {this.state.isSelectedMap && <React.Fragment>
          {/* 2. Arrangement */}
          <SettingSection title={arrangementTips}>
            <SettingRow>
              <div className='ui-mode-card-chooser'>
                { /* Panel */}
                <Label className='d-flex flex-column ui-mode-card-wapper'>
                  <Button icon className={classNames('ui-mode-card', { active: (this.props.config.arrangement === Arrangement.Panel) })}
                    onClick={() => this.handleArrangementChange(Arrangement.Panel)}
                    aria-labelledby={a11yUIMode0Id} aria-describedby={a11yDescriptionId}>
                    <Icon width={100} height={72} icon={require('./assets/arrangements/style0.svg')} autoFlip />
                  </Button>
                  <div id={a11yUIMode0Id} className='mx-1 text-break ui-mode-label'>{panelTips}</div>
                </Label>

                <div className='ui-mode-card-separator' />

                { /* Toolbar */}
                <Label className='d-flex flex-column ui-mode-card-wapper'>
                  <Button icon className={classNames('ui-mode-card', { active: (this.props.config.arrangement === Arrangement.Toolbar) })}
                    onClick={() => this.handleArrangementChange(Arrangement.Toolbar)}
                    aria-labelledby={a11yUIMode1Id} aria-describedby={a11yDescriptionId}>
                    <Icon width={100} height={72} icon={require('./assets/arrangements/style1.svg')} autoFlip />
                  </Button>
                  <div id={a11yUIMode1Id} className='mx-1 text-break ui-mode-label'>{toolbarTips}</div>
                </Label>
              </div>
            </SettingRow>
          </SettingSection>

          {/* Advanced setting */}
          <SettingSection>
            <SettingCollapse
              label={advancedTips}
              isOpen={this.state.isShowAdvancedSetting}
              onRequestOpen={this.handleShowAdvancedSettingClick}
              onRequestClose={this.handleShowAdvancedSettingClick}>
              <React.Fragment>
                {/* 1.DrawTools */}
                <SettingSection title={drawingToolsTips} className='px-0'>
                  <DrawToolsSelector
                    items={this.props.config.drawingTools.asMutable()}
                    theme={this.props.theme} intl={this.props.intl} title={'Drawing tools'}
                    onDrawingToolsChange={this.handleDrawToolsChange}
                  />
                </SettingSection>

                {/* 2.Units */}
                <SettingSection className='px-0'>
                  {/* switch */}
                  <SettingRow label={isEnableMeasurementsTips}>
                    <Switch checked={this.props.config.measurementsInfo.enableMeasurements} onChange={this.handleIsEnableMeasurementChange}
                      aria-label={isEnableMeasurementsTips} />
                  </SettingRow>
                  {/* selector */}
                  {this.props.config.measurementsInfo.enableMeasurements && <SettingRow>
                    <MeasurementsUnitsSelector
                      theme={this.props.theme} intl={this.props.intl}
                      measurementsUnitsInfos={this.props.config.measurementsUnitsInfos?.asMutable()}
                      onUnitsSettingChange={this.handleMeasurementUnitsInfoChange}
                    />
                  </SettingRow>}
                </SettingSection>

                {/* 3.drawingElevationMode3D */}
                <SettingSection title={drawingElevationMode3DTips} className='px-0'>
                  {/* relative-to-ground */}
                  <SettingRow>
                    <Label style={{ cursor: 'pointer' }} title={relativeToGroundTips}>
                      <Radio
                        style={{ cursor: 'pointer' }} className='m-0 mr-2' title={relativeToGroundTips}
                        onChange={() => this.handleDrawingElevationMode3DChange(DrawingElevationMode3D.RelativeToGround)}
                        checked={this.props.config.drawingElevationMode3D === DrawingElevationMode3D.RelativeToGround}
                      />
                      {relativeToGroundTips}
                    </Label>
                  </SettingRow>
                  {/* on-the-ground */}
                  <SettingRow>
                    <Label style={{ cursor: 'pointer' }} title={onTheGroundTips}>
                      <Radio
                        style={{ cursor: 'pointer' }} className='m-0 mr-2' title={onTheGroundTips}
                        onChange={() => this.handleDrawingElevationMode3DChange(DrawingElevationMode3D.OnTheGround)}
                        checked={this.props.config.drawingElevationMode3D === DrawingElevationMode3D.OnTheGround}
                      />
                      {onTheGroundTips}
                    </Label>
                  </SettingRow>
                </SettingSection>
              </React.Fragment>
            </SettingCollapse>
          </SettingSection>
        </React.Fragment>}

        {/* DrawModes
        <DrawModesSelector
          theme={this.props.theme} intl={this.props.intl}
        ></DrawModesSelector> */}
      </div>
    )
  }
}
