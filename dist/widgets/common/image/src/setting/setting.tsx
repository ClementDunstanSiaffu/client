/** @jsx jsx */
import {
  React, IMState, ThemeVariables, SerializedStyles, ImmutableArray, IMUseDataSource,
  Immutable, ImmutableObject, css, jsx, Expression, UseDataSource, expressionUtils, CONSTANTS, DataSourceManager,
  ImageDisplayQualityMode
} from 'jimu-core'
import { AllWidgetSettingProps } from 'jimu-for-builder'
import { SettingSection, SettingRow, LinkSelector, IMLinkParam } from 'jimu-ui/advanced/setting-components'
import { Select, ImageParam, CropParam, ImageFillMode, Slider, NumericInput, Tabs, Tab, Tooltip, imageUtils } from 'jimu-ui'
import { ImageSelector } from 'jimu-ui/advanced/resource-selector'
import { DataSourceSelector, AllDataSourceTypes } from 'jimu-ui/advanced/data-source-selector'

import { IMConfig, ShapeStyle, ImgSourceType, DynamicUrlType } from '../config'
import { PreDefinedConfigs } from './predefined-configs'
import defaultMessages from './translations/default'
import ShapeSelector from './components/shape-selector'
import ToolTipSetting from './components/tooltip-setting'
import AltTextSetting from './components/alttext-setting'
import DynamicUrlSetting from './components/dynamicurl-setting'

interface ExtraProps{
  preDefinedConfigs: PreDefinedInfo
}

interface PreDefinedInfo {
  shapes: ImmutableObject<{ [shapeName: string]: ShapeStyle }>
}

interface State {
  currentTipInput: string
  currentAltTextInput: string
  shadowOpen: boolean
  isSrcPopupOpen: boolean
  isToolTipPopupOpen: boolean
  isAltTextPopupOpen: boolean
}

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig> & ExtraProps, State> {
  supportedTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.SceneLayer])
  onSymbolScaleChanged = null
  minSymbolScale: number = 0.5
  maxSymbolScale: number = 5
  SymbolScaleStep: number = 0.1
  linkSettingTrigger = React.createRef<HTMLButtonElement>()
  displayQualityTrigger = React.createRef<HTMLInputElement>()

  constructor (props) {
    super(props)

    this.state = {
      currentTipInput: this.props.config.functionConfig.toolTip,
      currentAltTextInput: this.props.config.functionConfig.altText,
      shadowOpen: !!this.props.config.styleConfig.boxShadow,
      isSrcPopupOpen: false,
      isToolTipPopupOpen: false,
      isAltTextPopupOpen: false
    }
  }

  getStyle (theme: ThemeVariables): SerializedStyles {
    return css`
      .widget-setting-image {
        font-size: 13px;
        font-weight: lighter;
        overflow-y: auto;

        .setting-function {

          .setting-function-item {
            overflow: hidden;

            .setting-function-item-input {
              width: 200px;
            }
          }
        }

        .widget-image-chooseshape-item {
          border: 2px solid transparent;
        }

        .border-selected {
          border: 2px solid ${theme.colors.palette.primary[600]} !important;
        }

        .uploadInput {
          position: absolute;
          opacity: 0;
          left: 0;
          top: 0;
          cursor: pointer;
        }

        .uploadFileName {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          opacity: 0.5;
        }

        .uploadInput-container {
          position: relative;
        }

        .setting-exterior {

          .exterior-shape-item {
            padding-bottom: 100%;
            cursor: pointer;
          }
        }

        .setting-stylepicker-selected {
          border-width: 2px !important;
        }

        .set-link-btn{
          background-color: ${theme.colors.palette.light[500]};
        }
        .set-link-btn:hover, .set-link-btn:hover.set-link-btn:active{
          background-color: ${theme.colors.palette.light[400]};
        }

        .set-clear-image {
          &:focus {
            outline: none;
            box-shadow: none !important;
            text-decoration: none;
          }
        }

        .set-image-display-quality .image-display-quality-option {
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
        }
      }
    `
  }

  formatMessage = (id: string, values?: { [key: string]: any }) => {
    const messages = Object.assign({}, defaultMessages)
    return this.props.intl.formatMessage(
      { id: id, defaultMessage: messages[id] },
      values
    )
  }

  componentDidUpdate (prevProps: AllWidgetSettingProps<IMConfig>) {
    if (this.props.useDataSourcesEnabled !== prevProps.useDataSourcesEnabled) {
      const checked = this.props.useDataSourcesEnabled

      let functionConfig = Immutable(this.props.config.functionConfig)

      if (checked) {
        if (this.props.config.functionConfig.imgSourceType === ImgSourceType.ByStaticUrl) {
          functionConfig = functionConfig.set('imgSourceType', ImgSourceType.ByDynamicUrl)
        }
      } else {
        if (this.props.config.functionConfig.imgSourceType === ImgSourceType.ByDynamicUrl) {
          functionConfig = functionConfig.set('imgSourceType', ImgSourceType.ByStaticUrl)
        }
      }

      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.set('functionConfig', functionConfig)
      })
    }

    if (!this.props.useDataSourcesEnabled) {
      if (this.props.config?.functionConfig?.toolTip !== prevProps.config?.functionConfig?.toolTip) {
        this.setState({
          currentTipInput: (this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTip) || ''
        })
      }

      if (this.props.config?.functionConfig?.altText !== prevProps.config?.functionConfig?.altText) {
        this.setState({
          currentAltTextInput: (this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.altText) || ''
        })
      }

      if (!imageUtils.canUseImageDisplayQuality(this.props.config?.functionConfig?.imageParam)) {
        this.props.onSettingChange({
          id: this.props.id,
          config: this.props.config.setIn(['functionConfig', 'imageDisplayQualityMode'], ImageDisplayQualityMode.Orginial)
        })
      }
    }
  }

  static mapExtraStateProps = (state: IMState) => {
    return {
      preDefinedConfigs: PreDefinedConfigs
    }
  }

  settingLinkConfirm = (linkResult: IMLinkParam) => {
    const { id, config, onSettingChange } = this.props
    const srcExpression = this.getSrcExpression()
    const toolTipExpression = this.getToolTipExpression()
    const altTextExpression = this.getAltTextExpression()
    const useExpression = linkResult?.expression?.asMutable({ deep: true })
    const mergedUseDataSources = this.mergeUseDataSources(srcExpression, toolTipExpression, altTextExpression, useExpression)

    onSettingChange({
      id,
      config: config.setIn(['functionConfig', 'linkParam'], linkResult),
      useDataSources: mergedUseDataSources as any
    })
  }

  updateStyle = (key: string, value: any) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['styleConfig', key], value)
    })
  }

  shapeChange = (shapeName: string) => {
    let style = Immutable(this.props.config.styleConfig)
    style = style.set('shape', shapeName)
    style = style.set('borderRadius', this.props.preDefinedConfigs.shapes[shapeName].borderRadius)

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['styleConfig'], style)
    })
  }

  altTextConfigChange = () => {
    const config = {
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'altText'], this.state.currentAltTextInput)
        .setIn(['functionConfig', 'altTextExpression'], null),
      useDataSources: this.getUseDataSourcesWithoutFields()
    }
    this.props.onSettingChange(config)
  }

  toolTipConfigChange = () => {
    const config = {
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'toolTip'], this.state.currentTipInput)
        .setIn(['functionConfig', 'toolTipExpression'], null),
      useDataSources: this.getUseDataSourcesWithoutFields()
    }
    this.props.onSettingChange(config)
  }

  imgSourceTypeChanged = (imgSourceType: ImgSourceType) => {
    let functionConfig = Immutable(this.props.config.functionConfig)

    functionConfig = functionConfig.set('dynamicUrlType', null)
    functionConfig = functionConfig.set('imgSourceType', imgSourceType)
    functionConfig = functionConfig.set('srcExpression', null)
    functionConfig = functionConfig.set('imageParam', this.resetImageParam(this.props.config.functionConfig.imageParam))

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('functionConfig', functionConfig)
    })
  }

  dynamicUrlTypeChanged = (dynamicUrlType: DynamicUrlType) => {
    let functionConfig = Immutable(this.props.config.functionConfig)
    functionConfig = functionConfig.set('dynamicUrlType', dynamicUrlType)
    functionConfig = functionConfig.set('imgSourceType', ImgSourceType.ByDynamicUrl)
    functionConfig = functionConfig.set('srcExpression', null)
    functionConfig = functionConfig.set('imageParam', this.resetImageParam(this.props.config.functionConfig.imageParam))
    functionConfig = functionConfig.set('altTextWithAttachmentName', null)
    functionConfig = functionConfig.set('toolTipWithAttachmentName', null)

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('functionConfig', functionConfig)
    })
  }

  openSrcPopup = () => {
    this.setState({
      isSrcPopupOpen: true,
      isAltTextPopupOpen: false,
      isToolTipPopupOpen: false
    })
  }

  closeSrcPopup = () => {
    this.setState({ isSrcPopupOpen: false })
  }

  openToolTipPopup = () => {
    this.setState({
      isSrcPopupOpen: false,
      isAltTextPopupOpen: false,
      isToolTipPopupOpen: true
    })
  }

  closeToolTipPopup = () => {
    this.setState({ isToolTipPopupOpen: false })
  }

  openAltTextPopup = () => {
    this.setState({
      isSrcPopupOpen: false,
      isAltTextPopupOpen: true,
      isToolTipPopupOpen: false
    })
  }

  closeAltTextPopup = () => {
    this.setState({ isAltTextPopupOpen: false })
  }

  getUseDataSourcesWithoutFields = (): UseDataSource[] => {
    if (this.props.useDataSources && this.props.useDataSources[0] && this.props.useDataSources[0].dataSourceId) {
      return [(this.props.useDataSources[0] as any).without('fields')]
    } else {
      return []
    }
  }

  getSrcExpression = (): Expression => {
    const expression = this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.srcExpression &&
      this.props.config.functionConfig.srcExpression
    return (expression && expression.asMutable({ deep: true })) || null
  }

  getToolTipExpression = (): Expression => {
    const expression = this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTipExpression &&
      this.props.config.functionConfig.toolTipExpression
    return (expression && expression.asMutable({ deep: true })) || null
  }

  getAltTextExpression = (): Expression => {
    const expression = this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.altTextExpression &&
      this.props.config.functionConfig.altTextExpression
    return (expression && expression.asMutable({ deep: true })) || null
  }

  getLinkExpression = (): Expression => {
    const expression = this.props?.config?.functionConfig?.linkParam?.expression
    return (expression && expression.asMutable({ deep: true })) || null
  }

  onToolTipExpChange = (expression: Expression) => {
    if (!expression) {
      return
    }

    const srcExpression = this.getSrcExpression()
    const altTextExpression = this.getAltTextExpression()
    const linkExpression = this.getLinkExpression()
    const mergedUseDataSources = this.mergeUseDataSources(srcExpression, expression, altTextExpression, linkExpression)
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'toolTipExpression'], expression).setIn(['functionConfig', 'toolTip'], ''),
      useDataSources: mergedUseDataSources as any
    })
    this.setState({ isToolTipPopupOpen: false })
  }

  onAltTextExpChange = (expression: Expression) => {
    if (!expression) {
      return
    }

    const srcExpression = this.getSrcExpression()
    const toolTipExpression = this.getToolTipExpression()
    const linkExpression = this.getLinkExpression()
    const mergedUseDataSources = this.mergeUseDataSources(srcExpression, toolTipExpression, expression, linkExpression)
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'altTextExpression'], expression).setIn(['functionConfig', 'altText'], ''),
      useDataSources: mergedUseDataSources as any
    })
    this.setState({ isAltTextPopupOpen: false })
  }

  onSrcExpChange = (expression: Expression) => {
    if (!expression) {
      return
    }

    const toolTipExpression = this.getToolTipExpression()
    const altTextExpression = this.getAltTextExpression()
    const linkExpression = this.getLinkExpression()
    const mergedUseDataSources = this.mergeUseDataSources(expression, toolTipExpression, altTextExpression, linkExpression)
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'srcExpression'], expression).setIn(['functionConfig', 'imageParam'],
        this.resetImageParam(this.props.config.functionConfig.imageParam)),
      useDataSources: mergedUseDataSources as any
    })
    this.setState({ isSrcPopupOpen: false })
  }

  mergeUseDataSources = (srcExpression: Expression, toolTipExpression: Expression, altTextExpression: Expression, linkExpression: Expression): ImmutableArray<UseDataSource> => {
    const srcDss = expressionUtils.getUseDataSourceFromExpParts(srcExpression && srcExpression.parts, this.props.useDataSources)
    const toolTipDss = expressionUtils.getUseDataSourceFromExpParts(toolTipExpression && toolTipExpression.parts, this.props.useDataSources)
    const altTextDss = expressionUtils.getUseDataSourceFromExpParts(altTextExpression && altTextExpression.parts, this.props.useDataSources)
    const linkDss = expressionUtils.getUseDataSourceFromExpParts(linkExpression && linkExpression.parts, this.props.useDataSources)
    return this.mergeUseDataSourcesByDss(srcDss, toolTipDss, altTextDss, linkDss)
  }

  mergeUseDataSourcesByDss = (srcDss: ImmutableArray<UseDataSource>, toolTipDss: ImmutableArray<UseDataSource>,
    altTextDss: ImmutableArray<UseDataSource>, linkDss: ImmutableArray<UseDataSource>): ImmutableArray<UseDataSource> => {
    const useDataSourcesWithoutFields = this.getUseDataSourcesWithoutFields()
    let mergedUseDss = expressionUtils.mergeUseDataSources(useDataSourcesWithoutFields as any, toolTipDss)
    mergedUseDss = expressionUtils.mergeUseDataSources(mergedUseDss, altTextDss)
    mergedUseDss = expressionUtils.mergeUseDataSources(mergedUseDss, srcDss)
    mergedUseDss = expressionUtils.mergeUseDataSources(mergedUseDss, linkDss)
    return mergedUseDss
  }

  onResourceChange = (imageParam: ImageParam) => {
    let tempImageParam: ImageParam = imageParam
    if (!tempImageParam) {
      tempImageParam = {}
    }

    let functionConfig = Immutable(this.props.config.functionConfig)
    if (functionConfig.imageParam && functionConfig.imageParam.cropParam) {
      tempImageParam.cropParam = {
        svgViewBox: functionConfig.imageParam.cropParam.svgViewBox,
        svgPath: functionConfig.imageParam.cropParam.svgPath,
        cropShape: functionConfig.imageParam.cropParam.cropShape
      }
    }
    functionConfig = functionConfig.set('imageParam', tempImageParam)
    functionConfig = functionConfig.set('imgSourceType', '')
    functionConfig = functionConfig.set('srcExpression', null)

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('functionConfig', functionConfig)
    })
  }

  resetImageParam = (imageParam: ImmutableObject<ImageParam>) => {
    if (!imageParam || !imageParam.cropParam) {
      return null
    } else {
      return {
        cropParam: imageParam.cropParam
      }
    }
  }

  onToggleUseDataEnabled = (useDataSourcesEnabled: boolean) => {
    this.props.onSettingChange({
      id: this.props.id,
      useDataSourcesEnabled
    })
  }

  onDataSourceChange = (useDataSources: UseDataSource[]) => {
    if (!useDataSources) {
      return
    }

    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: useDataSources,
      config: this.props.config.setIn(['functionConfig', 'dynamicUrlType'], null)
        .setIn(['functionConfig', 'altTextWithAttachmentName'], null)
        .setIn(['functionConfig', 'toolTipWithAttachmentName'], null)
        .setIn(['functionConfig', 'isSelectedFromRepeatedDataSourceContext'], null)
        .setIn(['functionConfig', 'useDataSourceForMainDataAndViewSelector'], null)
    })
  }

  onTypeNoSupportChange = () => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'dynamicUrlType'], null)
        .setIn(['functionConfig', 'altTextWithAttachmentName'], null)
        .setIn(['functionConfig', 'toolTipWithAttachmentName'], null)
        .setIn(['functionConfig', 'isSelectedFromRepeatedDataSourceContext'], null)
        .setIn(['functionConfig', 'useDataSourceForMainDataAndViewSelector'], null)
    })
  }

  onDataSourceRemoved = () => {
    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: [],
      config: this.props.config.setIn(['functionConfig', 'dynamicUrlType'], null)
        .setIn(['functionConfig', 'altTextWithAttachmentName'], null)
        .setIn(['functionConfig', 'toolTipWithAttachmentName'], null)
    })
  }

  handleChooseShape = (cropParam: ImmutableObject<CropParam>) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'imageParam', 'cropParam'], cropParam)
    })
  }

  handleImageFillModeChange = (imageFillMode: ImageFillMode) => {
    let config = this.props.config.setIn(['functionConfig', 'imageFillMode'], imageFillMode)
    if (config.functionConfig.imageParam && config.functionConfig.imageParam.originalUrl) {
      config = config.setIn(['functionConfig', 'imageParam', 'url'], config.functionConfig.imageParam.originalUrl)
    }

    if (config.functionConfig.imageParam && config.functionConfig.imageParam.cropParam) {
      config = config.setIn(['functionConfig', 'imageParam', 'cropParam'], {
        svgViewBox: config.functionConfig.imageParam.cropParam.svgViewBox,
        svgPath: config.functionConfig.imageParam.cropParam.svgPath,
        cropShape: config.functionConfig.imageParam.cropParam.cropShape
      })
    }

    this.props.onSettingChange({
      id: this.props.id,
      config: config
    })
  }

  getIsDataSourceUsed = () => {
    return this.props.useDataSourcesEnabled
  }

  handleSymbolScaleChange = (inputValue) => {
    const value = parseFloat(inputValue)

    if (value === this.props.config.functionConfig.symbolScale) {
      return
    }

    clearTimeout(this.onSymbolScaleChanged)
    this.onSymbolScaleChanged = setTimeout(() => {
      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.setIn(['functionConfig', 'symbolScale'], value)
      })
    }, 500)
  }

  onToolTipTextInputChange = (toolTip: string) => {
    this.setState({ currentTipInput: toolTip })
  }

  onAltTextTextInputChange = (altText: string) => {
    this.setState({ currentAltTextInput: altText })
  }

  onToolTipWithSomeKeyChange = (key: string, value: boolean) => {
    const config = {
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'toolTip'], null)
        .setIn(['functionConfig', 'toolTipExpression'], null)
        .setIn(['functionConfig', key], value),
      useDataSources: this.getUseDataSourcesWithoutFields()
    }
    this.props.onSettingChange(config)
  }

  onAltTextWithSomeKeyChange = (key: string, value: boolean) => {
    const config = {
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'altText'], null)
        .setIn(['functionConfig', 'altTextExpression'], null)
        .setIn(['functionConfig', key], value),
      useDataSources: this.getUseDataSourcesWithoutFields()
    }
    this.props.onSettingChange(config)
  }

  onTabSelect = title => {
    const isDynamicSource = title === 'dynamicSource'

    if (isDynamicSource) {
      this.imgSourceTypeChanged(ImgSourceType.ByDynamicUrl)
    } else {
      this.imgSourceTypeChanged(ImgSourceType.ByUpload)
    }
  }

  onSelectedUseDsChangeForSymbol = (useDataSource: IMUseDataSource, isSelectedFromRepeatedDataSourceContext: boolean) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'useDataSourceForMainDataAndViewSelector'], useDataSource)
        .setIn(['functionConfig', 'isSelectedFromRepeatedDataSourceContext'], isSelectedFromRepeatedDataSourceContext)
    })
  }

  onSelectedUseDsChangeForAttachment = (useDataSource: IMUseDataSource, isSelectedFromRepeatedDataSourceContext: boolean) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'useDataSourceForMainDataAndViewSelector'], useDataSource)
        .setIn(['functionConfig', 'isSelectedFromRepeatedDataSourceContext'], isSelectedFromRepeatedDataSourceContext)
    })
  }

  getWhetherDsIdInUseDss = (dsId: string): boolean => {
    if (!dsId) {
      return false
    }
    const useDataSources = this.props.useDataSources || []
    const isSelectionDataView = dsId.split('-').reverse()[0] === CONSTANTS.SELECTION_DATA_VIEW_ID
    if (isSelectionDataView) {
      const ds = DataSourceManager.getInstance().getDataSource(dsId)
      const mainDs = ds && ds.getMainDataSource()
      const mainDataSourceId = mainDs && mainDs.id
      return useDataSources.some(u => u.mainDataSourceId === mainDataSourceId)
    }
    return useDataSources.some(u => u.dataSourceId === dsId)
  }

  onImageDisplayQualityChange = (event) => {
    const { value } = event.currentTarget
    const mode: ImageDisplayQualityMode = imageUtils.getImageDisplayQualityModeByValue(value)
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'imageDisplayQualityMode'], mode)
    })
  }

  render () {
    const { config, useDataSourcesEnabled } = this.props
    const { functionConfig } = config
    const fileName = functionConfig?.imageParam?.originalName
    const selectedName = fileName || this.formatMessage('imageNoneSource')
    const modeWithSlideTitleMap = {
      [ImageDisplayQualityMode.Low]: this.formatMessage('displayQualityTooltipWithLow'),
      [ImageDisplayQualityMode.Medium]: this.formatMessage('displayQualityTooltipWithMedium'),
      [ImageDisplayQualityMode.High]: this.formatMessage('displayQualityTooltipWithHigh'),
      [ImageDisplayQualityMode.Orginial]: this.formatMessage('displayQualityTooltipWithOriginal')
    }

    return (
      <div css={this.getStyle(this.props.theme)} className='jimu-widget'>
        <div className='widget-setting-image'>
          <SettingSection>
            <SettingRow>
              <div className='choose-ds w-100'>
                <DataSourceSelector
                  types={this.supportedTypes} useDataSourcesEnabled={useDataSourcesEnabled}
                  useDataSources={this.props.useDataSources} onToggleUseDataEnabled={this.onToggleUseDataEnabled}
                  onChange={this.onDataSourceChange} widgetId={this.props.id}
                />
              </div>
            </SettingRow>
            {!useDataSourcesEnabled && <SettingRow label={this.formatMessage('imageSource')} role='group' aria-label={this.formatMessage('imageSource')} flow='wrap'>
              <div className='w-100 d-flex align-items-center'>
                <div style={{ minWidth: '60px' }}>
                  <ImageSelector
                    buttonClassName='text-dark d-flex justify-content-center btn-browse'
                    widgetId={this.props.id} buttonLabel={this.formatMessage('imageSet')} buttonSize='sm'
                    onChange={this.onResourceChange} imageParam={functionConfig?.imageParam}
                    aria-describedby='image-selected-name'
                    trigger={this.displayQualityTrigger.current}
                  />
                </div>
                <div
                  style={{ width: '70px' }}
                  className='uploadFileName ml-2'
                  title={selectedName}
                >
                  {selectedName}
                </div>
                <div
                  id='image-selected-name'
                  style={{ display: 'none' }}
                >
                  {this.formatMessage('numSelected', { number: selectedName })}
                </div>
              </div>
            </SettingRow>}

            {/* The component is used to set image display quality by Jimu-ui Slider component
              * Hide image display quality for developer edition now
              */}
            {!window.jimuConfig.isDevEdition &&
            !useDataSourcesEnabled &&
            functionConfig?.imageParam?.originalUrl &&
            imageUtils.canUseImageDisplayQuality(this.props.config.functionConfig?.imageParam) &&
            <SettingRow className='flex-wrap' label={this.formatMessage('imageDisplayQuality')} role='group' aria-label={this.formatMessage('imageDisplayQuality')} flow='wrap'>
              <div className='set-image-display-quality w-100 d-flex flex-wrap align-items-center'>
                <Tooltip placement='bottom' title={modeWithSlideTitleMap[this.props.config.functionConfig.imageDisplayQualityMode]}>
                  <Slider
                      ref={this.displayQualityTrigger}
                      style={{ transform: 'translateY(-4px)' }}
                      className='image-display-quality-range'
                      list='image-display-quality-datalist'
                      aria-label='set-image-display-quality'
                      data-field='space'
                      defaultValue={imageUtils.getImageDisplayQualityValueByMode(this.props.config.functionConfig.imageDisplayQualityMode)}
                      min={0} max={99.99} step={33.33}
                      onChange={this.onImageDisplayQualityChange}
                    />
                </Tooltip>
                <datalist id='image-display-quality-datalist' className='display-none'>
                  <option value='0' label={modeWithSlideTitleMap[ImageDisplayQualityMode.Low]}></option>
                  <option value='99.99' label={modeWithSlideTitleMap[ImageDisplayQualityMode.Orginial]}></option>
                </datalist>

                <div className="image-display-quality-option-wrapper text-dark-400 d-flex w-100 justify-content-between" style={{ marginTop: '4px' }}>
                  <div className="image-display-quality-option">{modeWithSlideTitleMap[ImageDisplayQualityMode.Low]}</div>
                  <div className="image-display-quality-option">{modeWithSlideTitleMap[ImageDisplayQualityMode.Orginial]}</div>
                </div>
              </div>
            </SettingRow>
            }
            {useDataSourcesEnabled && <div className='mt-3'>
              <Tabs fill type='pills' onChange={this.onTabSelect} value={this.props.config.functionConfig.imgSourceType === ImgSourceType.ByDynamicUrl ? 'dynamicSource' : 'staticSource'}>
                <Tab
                  id='staticSource'
                  title={this.formatMessage('staticSource')}
                >
                  <div className='mt-3'>
                    {(!this.props.config.functionConfig.imgSourceType || this.props.config.functionConfig.imgSourceType === ImgSourceType.ByUpload) && <SettingRow>
                      <div className='w-100 d-flex align-items-center'>
                        <div style={{ minWidth: '60px' }}>
                          <ImageSelector
                            buttonClassName='text-dark d-flex justify-content-center btn-browse'
                            widgetId={this.props.id} buttonLabel={this.formatMessage('imageSet')} buttonSize='sm'
                            disabled={(this.props.config.functionConfig.imgSourceType === ImgSourceType.ByStaticUrl) ||
                            (this.props.config.functionConfig.imgSourceType === ImgSourceType.ByDynamicUrl)}
                            onChange={this.onResourceChange} imageParam={this.props.config.functionConfig.imageParam}
                            buttonDescribedby={'image-ds-selected-name'}
                          />
                        </div>
                        <div
                          style={{ width: '70px' }}
                          className='uploadFileName ml-2'
                          title={selectedName}
                        >
                          {selectedName}
                        </div>
                        <div
                          id='image-ds-selected-name'
                          style={{ display: 'none' }}
                        >
                          {this.formatMessage('numSelected', { number: selectedName })}
                        </div>
                      </div>
                    </SettingRow>}
                  </div>
                </Tab>
                <Tab
                  id='dynamicSource'
                  title={this.formatMessage('dynamicSource')}
                >
                  <div className='mt-3'>
                    {((this.props.config.functionConfig.imgSourceType === ImgSourceType.ByDynamicUrl)) &&
                      <DynamicUrlSetting
                        dynamicUrlType={this.props.config.functionConfig.dynamicUrlType}
                        srcExpression={this.getSrcExpression()}
                        useDataSources={this.props.useDataSources}
                        isSrcPopupOpen={this.state.isSrcPopupOpen}
                        onDynamicUrlTypeChanged={this.dynamicUrlTypeChanged}
                        onSrcExpChange={this.onSrcExpChange}
                        openSrcPopup={this.openSrcPopup}
                        closeSrcPopup={this.closeSrcPopup}
                        widgetId={this.props.id}
                        intl={this.props.intl}
                        isSelectedFromRepeatedDataSourceContext={this.props.config.functionConfig.isSelectedFromRepeatedDataSourceContext}
                        useDataSourceForMainDataAndViewSelector={this.getWhetherDsIdInUseDss(this.props.config.functionConfig?.useDataSourceForMainDataAndViewSelector?.dataSourceId)
                          ? this.props.config.functionConfig.useDataSourceForMainDataAndViewSelector
                          : null}
                        onSelectedUseDsChangeForSymbol={this.onSelectedUseDsChangeForSymbol}
                        onSelectedUseDsChangeForAttachment={this.onSelectedUseDsChangeForAttachment}
                        onTypeNoSupportChange={this.onTypeNoSupportChange}
                      />}
                  </div>
                </Tab>
              </Tabs>
            </div>}
          </SettingSection>
          <SettingSection>
            <SettingRow>
              <LinkSelector
                onSettingConfirm={this.settingLinkConfirm}
                linkParam={this.props.config.functionConfig.linkParam}
                useDataSources={this.getIsDataSourceUsed() && this.props.useDataSources}
                widgetId={this.props.id}
              />
            </SettingRow>
            <ToolTipSetting
              imgSourceType={this.props.config.functionConfig.imgSourceType}
              dynamicUrlType={this.props.config.functionConfig.dynamicUrlType}
              intl={this.props.intl} useDataSourcesEnabled={useDataSourcesEnabled}
              useDataSources={this.props.useDataSources} openToolTipPopup={this.openToolTipPopup}
              closeToolTipPopup={this.closeToolTipPopup} toolTipExpression={this.getToolTipExpression()}
              onToolTipExpChange={this.onToolTipExpChange} isToolTipPopupOpen={this.state.isToolTipPopupOpen}
              toolTipConfigChange={this.toolTipConfigChange} onToolTipTextInputChange={this.onToolTipTextInputChange}
              toolTipText={this.state.currentTipInput}
              widgetId={this.props.id}
              toolTipWithAttachmentName={this.props.config.functionConfig.toolTipWithAttachmentName}
              onToolTipWithAttachmentNameChange={(toolTipWithAttachmentName) => { this.onToolTipWithSomeKeyChange('toolTipWithAttachmentName', toolTipWithAttachmentName) }}
            />
            <AltTextSetting
              imgSourceType={this.props.config.functionConfig.imgSourceType}
              dynamicUrlType={this.props.config.functionConfig.dynamicUrlType}
              intl={this.props.intl} useDataSourcesEnabled={useDataSourcesEnabled}
              useDataSources={this.props.useDataSources} openAltTextPopup={this.openAltTextPopup}
              closeAltTextPopup={this.closeAltTextPopup} altTextExpression={this.getAltTextExpression()}
              onAltTextExpChange={this.onAltTextExpChange} isAltTextPopupOpen={this.state.isAltTextPopupOpen}
              altTextConfigChange={this.altTextConfigChange} onAltTextTextInputChange={this.onAltTextTextInputChange}
              altTextText={this.state.currentAltTextInput}
              widgetId={this.props.id}
              altTextWithAttachmentName={this.props.config.functionConfig.altTextWithAttachmentName}
              onAltTextWithAttachmentNameChange={(altTextWithAttachmentName) => { this.onAltTextWithSomeKeyChange('altTextWithAttachmentName', altTextWithAttachmentName) }}
            />
          </SettingSection>
          <SettingSection>
            {functionConfig?.dynamicUrlType !== DynamicUrlType.Symbol &&
              <SettingRow label={this.formatMessage('imagePosition')}>
                <div style={{ width: '50%' }}>
                  <Select
                    size='sm' value={functionConfig?.imageFillMode || ImageFillMode.Fill}
                    onChange={(e) => this.handleImageFillModeChange(e.target.value as ImageFillMode)}
                    aria-label={this.formatMessage('imagePosition')}
                  >
                    <option key={0} value={ImageFillMode.Fill}>{this.props.intl.formatMessage({ id: 'imageFill', defaultMessage: defaultMessages.imageFill })}</option>
                    <option key={1} value={ImageFillMode.Fit}>{this.props.intl.formatMessage({ id: 'imageFit', defaultMessage: defaultMessages.imageFit })}</option>
                  </Select>
                </div>
              </SettingRow>}
            {functionConfig?.dynamicUrlType === DynamicUrlType.Symbol &&
              <SettingRow flow='wrap' label={this.formatMessage('imageSymbolScale')}>
                <div className='d-flex justify-content-between w-100 align-items-center'>
                  <Slider
                    style={{ width: '60%' }}
                    data-field='space'
                    onChange={(evt) => { this.handleSymbolScaleChange(evt.currentTarget.value) }}
                    value={this.props.config.functionConfig.symbolScale ? this.props.config.functionConfig.symbolScale : 1}
                    title='0.5-5'
                    size='sm'
                    min={this.minSymbolScale}
                    max={this.maxSymbolScale}
                    step={this.SymbolScaleStep}
                  />
                  <NumericInput
                    style={{ width: '35%' }} showHandlers={false} min={this.minSymbolScale}
                    max={this.maxSymbolScale}
                    value={this.props.config.functionConfig.symbolScale ? this.props.config.functionConfig.symbolScale : 1}
                    onBlur={(evt) => { this.handleSymbolScaleChange(evt.currentTarget.value) }}
                    title='0.5-5'
                  />
                </div>
              </SettingRow>}
            {functionConfig?.dynamicUrlType !== DynamicUrlType.Symbol &&
              <SettingRow flow='wrap' label={this.formatMessage('imageShape')} role='group' aria-label={this.formatMessage('imageShape')}>
                <ShapeSelector
                  theme={this.props.theme} cropParam={functionConfig?.imageParam?.cropParam}
                  onShapeChoosed={(cropParam) => { this.handleChooseShape(cropParam) }} intl={this.props.intl}
                />
              </SettingRow>}
          </SettingSection>
        </div>
      </div>
    )
  }
}
