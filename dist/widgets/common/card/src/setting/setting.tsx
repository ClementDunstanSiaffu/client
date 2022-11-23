/** @jsx jsx */
import {
  React,
  classNames,
  IMState,
  IMAppConfig,
  ThemeVariables,
  SerializedStyles,
  css,
  jsx,
  IMThemeVariables,
  AppMode,
  BrowserSizeMode,
  appConfigUtils,
  getAppStore,
  polished,
  AnimationSetting,
  LayoutInfo,
  Immutable,
  LayoutType,
  Size,
  appActions
} from 'jimu-core'
import {
  AllWidgetSettingProps,
  getAppConfigAction,
  builderAppSync,
  templateUtils
} from 'jimu-for-builder'
import {
  searchUtils,
  defaultMessages as jimuLayoutsDefaultMessages
} from 'jimu-layouts/layout-runtime'
import {
  SettingSection,
  SettingRow,
  LinkSelector,
  IMLinkParam,
  SettingCollapse
} from 'jimu-ui/advanced/setting-components'
import {
  BackgroundSetting,
  BorderSetting,
  BoxShadowSetting,
  BorderRadiusSetting,
  TransitionSetting
} from 'jimu-ui/advanced/style-setting-components'
import {
  Switch,
  Icon,
  Button,
  defaultMessages as jimuUIDefaultMessages,
  Tooltip
} from 'jimu-ui'
import {
  IMConfig,
  ItemStyle,
  Status,
  Transition,
  defaultTransitionInfo,
  ElementSize
} from '../config'
import defaultMessages from './translations/default'
import { Fragment } from 'react'
import { Template } from 'jimu-for-builder/templates'
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
const prefix = 'jimu-widget-'

const originAllStyles: { [key: string]: Template } = {
  STYLE0: require('./template/card-style0.json'),
  STYLE1: require('./template/card-style1.json'),
  STYLE2: require('./template/card-style2.json'),
  STYLE3: require('./template/card-style3.json'),
  STYLE4: require('./template/card-style4.json'),
  STYLE5: require('./template/card-style5.json'),
  STYLE6: require('./template/card-style6.json'),
  STYLE7: require('./template/card-style7.json'),
  STYLE8: require('./template/card-style8.json'),
  STYLE9: require('./template/card-style9.json'),
  STYLE10: require('./template/card-style10.json')
}

let AllStyles: { [key: string]: Template }
const MESSAGES = Object.assign(
  {},
  defaultMessages,
  jimuUIDefaultMessages,
  jimuLayoutsDefaultMessages
)

function initStyles (widgetId: string) {
  if (AllStyles) {
    return AllStyles
  }
  AllStyles = {}
  Object.keys(originAllStyles).forEach(style => {
    AllStyles[style] = templateUtils.processForTemplate(
      originAllStyles[style],
      widgetId,
      MESSAGES
    )
  })
}

interface State {
  isAdvance: boolean
  showRegular: boolean
  showHover: boolean
  isTemplateContainScroll: boolean
  templateConWidth: number
}

interface ExtraProps {
  appConfig: IMAppConfig
  appMode: AppMode
  browserSizeMode: BrowserSizeMode
  showCardSetting: Status
  layoutInfo: LayoutInfo
  selectionIsInSelf: boolean
  settingPanelChange: string
  viewportSize?: Size
  parentSize: ElementSize
}

interface CustomeProps {
  theme: IMThemeVariables
}

export default class Setting extends React.PureComponent<
AllWidgetSettingProps<IMConfig> & ExtraProps & CustomeProps,
State
> {
  templatesContain: HTMLElement
  updatePositionTimeout: any
  static mapExtraStateProps = (
    state: IMState,
    props: AllWidgetSettingProps<IMConfig>
  ) => {
    const { id } = props
    return {
      appConfig: state?.appStateInBuilder?.appConfig,
      appMode: state?.appStateInBuilder?.appRuntimeInfo?.appMode,
      browserSizeMode: state?.appStateInBuilder?.browserSizeMode,
      showCardSetting:
        (state?.appStateInBuilder?.widgetsState[id] &&
          state?.appStateInBuilder?.widgetsState[id].showCardSetting) ||
        Status.Regular,
      layoutInfo: state?.appStateInBuilder?.widgetsState[id]?.layoutInfo,
      settingPanelChange: state?.widgetsState?.[props.id]?.settingPanelChange,
      selectionIsInSelf: state?.appStateInBuilder?.widgetsState[id]?.selectionIsInSelf,
      parentSize: state?.appStateInBuilder?.widgetsState[id]?.parentSize
    }
  }

  constructor (props) {
    super(props)
    initStyles(props.id)
    this.state = {
      isAdvance: false,
      showRegular: false,
      showHover: false,
      isTemplateContainScroll: false,
      templateConWidth: 0
    }
  }

  componentDidMount () {
    this.getIsScrollAndWidthOfTemplateCon()
    window.addEventListener('resize', this.updateStartButtonPosition)
  }

  componentDidUpdate (preProps) {
    const { config, id, layoutInfo, settingPanelChange } = this.props
    let { appConfig } = this.props
    if (!config.isInitialed && layoutInfo) {
      appConfig = getAppConfigAction().editWidget(appConfig?.asMutable({ deep: true }).widgets[id]).appConfig
      this.onItemStyleChanged(config.itemStyle, appConfig)
    }

    if (preProps.settingPanelChange !== 'content' && settingPanelChange === 'content') {
      this.updateStartButtonPosition()
    }
  }

  componentWillUnmount () {
    const { dispatch, id } = this.props
    dispatch(
      appActions.widgetStatePropChange(id, 'settingPanelChange', null)
    )
    clearTimeout(this.updatePositionTimeout)
  }

  onPropertyChange = (name, value) => {
    const { config } = this.props
    if (value === config[name]) {
      return
    }
    this.onConfigChange(name, value)
  }

  onConfigChange = (key, value) => {
    const { config } = this.props
    const newConfig = config.setIn(key, value)
    const alterProps = {
      id: this.props.id,
      config: newConfig
    }
    this.props.onSettingChange(alterProps)
  }

  onBackgroundStyleChange = (status: Status, key, value) => {
    this.onConfigChange([status, 'backgroundStyle', key], value)
  }

  onExportClick = evt => {
    const { appConfig, layouts, id, browserSizeMode } = this.props
    const currentPageId = getAppStore().getState().appStateInBuilder
      .appRuntimeInfo.currentPageId
    const pageJson =
      appConfig.pages[currentPageId === 'default' ? 'home' : currentPageId]

    const pageTemplates = [
      {
        widgetId: id,
        config: {
          layouts: appConfig.layouts.without(
            pageJson.layout[browserSizeMode],
            layouts[Status.Hover][browserSizeMode]
          ),
          widgets: appConfig.widgets.without(id),
          views: appConfig.views,
          sections: appConfig.sections
        }
      }
    ]

    const template0 = pageTemplates[0]
    template0.config.layouts &&
      Object.keys(template0.config.layouts).forEach(layoutId => {
        let layoutJson = template0.config.layouts[layoutId].without('id')
        layoutJson.content &&
          Object.keys(layoutJson.content).forEach(lEId => {
            const lEJson = (layoutJson.content[lEId] as any)
              .without('id', 'parentId', 'layoutId')
              .setIn(['setting', 'lockParent'], true)
            layoutJson = layoutJson.setIn(['content', lEId], lEJson)
          })
        template0.config.layouts = template0.config.layouts.set(
          layoutId,
          layoutJson
        )
      })

    template0.config.widgets &&
      Object.keys(template0.config.widgets).forEach((wId, index) => {
        const wJson = template0.config.widgets[wId]
        template0.config.widgets = template0.config.widgets.set(
          wId,
          wJson.without(
            'context',
            'icon',
            'label',
            'manifest',
            '_originManifest',
            'version',
            'id',
            'useDataSourcesEnabled',
            'useDataSources'
          )
        )
      })

    template0.config.sections &&
      Object.keys(template0.config.sections).forEach((sId, index) => {
        const sJson = template0.config.sections[sId]
        template0.config.sections = template0.config.sections.set(
          sId,
          sJson.without('id', 'label')
        )
      })

    template0.config.views &&
      Object.keys(template0.config.views).forEach((vId, index) => {
        const vJson = template0.config.views[vId]
        template0.config.views = template0.config.views.set(
          vId,
          vJson.without('id', 'label')
        )
      })
    console.log(JSON.stringify(pageTemplates[0]))
  }

  private readonly changeBuilderStatus = (status: Status) => {
    const { id } = this.props
    builderAppSync.publishChangeWidgetStatePropToApp({
      widgetId: id,
      propKey: 'builderStatus',
      value: status
    })
  }

  onItemStyleChanged = (style: ItemStyle, updatedAppConfig = undefined) => {
    // if(this.props.appMode === AppMode.Run) return;
    const { id } = this.props
    let { appConfig } = this.props
    if (updatedAppConfig) {
      appConfig = updatedAppConfig
    }
    const styleTemp = AllStyles[style]
    templateUtils
      .updateWidgetByTemplate(
        appConfig,
        styleTemp,
        id,
        styleTemp.widgetId,
        {},
        defaultMessages
      )
      .then(newAppConfig => {
        this._onItemStyleChange(newAppConfig, style)
      })
  }

  getUniqueIds = (
    appConfig: IMAppConfig,
    type: 'page' | 'layout' | 'widget' | 'section' | 'view',
    size: number
  ): string[] => {
    const ids: string[] = []
    for (let i = 0; i < size; i++) {
      const id = appConfigUtils.getUniqueId(appConfig, type)
      ids.push(id)
      appConfig = appConfig.setIn([type + 's', id], { id: id } as any)
    }
    return ids
  }

  getUniqueLabels = (
    appConfig: IMAppConfig,
    type: 'page' | 'layout' | 'widget' | 'section' | 'view',
    size: number
  ): string[] => {
    const labels: string[] = []
    for (let i = 0; i < size; i++) {
      const id = appConfigUtils.getUniqueId(appConfig, type)
      const label = appConfigUtils.getUniqueLabel(appConfig, type, type)
      labels.push(label)
      appConfig = appConfig.setIn([type + 's', id], {
        id: id,
        label: label
      } as any)
    }
    return labels
  }

  private readonly _onItemStyleChange = (appConfig, style) => {
    const { id, config: oldConfig } = this.props
    const appConfigAction = getAppConfigAction(appConfig)
    const wJson = appConfig.widgets[id]
    const template: Template = AllStyles[style]
    const templateWidgetJson = template.config.widgets[template.widgetId]
    wJson.layouts &&
      Object.keys(wJson.layouts).forEach(name => {
        wJson.layouts[name] &&
          Object.keys(wJson.layouts[name]).forEach(device => {
            if (
              templateWidgetJson?.layouts?.[name]?.[device] ||
              !templateWidgetJson?.layouts
            ) { return }
            const config = wJson.config
            // Judge if layout is empty
            let sizeLayouts = templateWidgetJson.layouts[name]
            if (!sizeLayouts) {
              const layoutKeys = Object.keys(templateWidgetJson.layouts)
              sizeLayouts = wJson.layouts[layoutKeys[layoutKeys.length - 1]]
            } else {
              sizeLayouts = wJson.layouts[name]
            }
            const length = Object.keys(sizeLayouts).length
            const embedLayoutJson =
              appConfig.layouts[
                sizeLayouts[Object.keys(sizeLayouts)[length - 1]]
              ]

            if (!embedLayoutJson?.content) {
              return
            }
            const desLayoutId = wJson.layouts[name][device]
            appConfigAction.editLayoutType(
              { layoutId: desLayoutId },
              embedLayoutJson.type
            )
            if (name === Status.Hover) {
              if (config[Status.Hover].enable) {
                appConfigAction.duplicateLayoutItems(
                  embedLayoutJson.id,
                  desLayoutId,
                  false
                )
              }
            } else {
              appConfigAction.duplicateLayoutItems(
                embedLayoutJson.id,
                desLayoutId,
                false
              )
            }
          })
      })

    // process inherit properties
    if (wJson.useDataSources && wJson.useDataSources.length > 0) {
      appConfigAction.copyUseDataSourceToAllChildWidgets(
        wJson.set('useDataSources', null),
        wJson
      )
    }
    this.editLayoutItemSize(appConfigAction, style)
    const config = wJson.config
      .set('itemStyle', style)
      .set('isItemStyleConfirm', false)
      .set('isInitialed', true)
    appConfigAction
      .editWidgetProperty(wJson.id, 'config', config)
      .exec(!oldConfig.isInitialed)
  }

  getStyle = (theme: ThemeVariables): SerializedStyles => {
    return css`
      &{
        .resetting-template {
          cursor: pointer;
          color: ${theme.colors.palette.primary[700]};
          vertical-align: middle;
          padding: 0;
        }
        .resetting-template:hover {
          cursor: pointer;
          color: ${theme.colors.palette.primary[800]};
        }
        .card-setting-return {
          cursor: pointer;
        }
        .setting-next {
          width: auto;
          max-width: 50%;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          text-align: end;
          font-size: ${polished.rem(13)};
        }
        .style-group {
          button {
            padding: 0;
          }
          &.advance-style-group {
            padding-bottom: ${polished.rem(4)};
          }
          button {
            flex: 1;
            flex-grow: 1;
          }
          .style-margin-r {
            margin-right: ${polished.rem(6)};
          }
          .style-img {
            cursor: pointer;
            width: 100%;
            height: 70px;
            margin: 0;
            border: 1px solid transparent;
            background-color: ${theme.colors.white};
            &.active {
              border: 2px solid ${theme.colors.primary};
            }
            &.style-img-h {
              width: 100%;
              height: auto;
            }
            &.low {
              height: 48px;
            }
            &.empty {
              height: 40px;
              line-height: 40px;
              color: ${theme.colors.palette.dark[200]};
            }
          }
          .vertical-space {
            height: 10px;
          }
        }
        .use-tips {
          bottom: 0;
          background:${theme.colors.palette.light[300]};
          z-index: 100;
        }
        .tips-text {
          color: ${theme.colors.palette.dark[400]};
        }
        .tips-opacity-0 {
          opacity: 0;
        }
        .template-type {
          margin-bottom: ${polished.rem(2)};
        }
        .template-classic {
          font-size: 0.8125rem;
          font-weight: 500;
          color: ${theme.colors.palette.dark[400]};
          vertical-align: middle;
        }
        .tooltip-icon-con {
          color: ${theme.colors.palette.dark[600]};
        }
      }
    `
  }

  formatMessage = (id: string, values?: { [key: string]: any }) => {
    return this.props.intl.formatMessage(
      { id: id, defaultMessage: MESSAGES[id] },
      values
    )
  }

  onSettingLinkConfirm = (linkResult: IMLinkParam) => {
    if (!linkResult) {
      return
    }

    this.onConfigChange(['linkParam'], linkResult)
  }

  rednerBgSetting (showCardSetting: Status) {
    const { config } = this.props

    return (
      <Fragment>
        <SettingRow className='w-100' label={this.formatMessage('background')} flow='wrap'>
          <BackgroundSetting
            background={config[showCardSetting].backgroundStyle.background}
            onChange={value =>
              this.onBackgroundStyleChange(showCardSetting, 'background', value)
            }
          />
        </SettingRow>
        <SettingRow label={this.formatMessage('border')} flow='wrap'>
          <BorderSetting
            value={config[showCardSetting].backgroundStyle.border}
            onChange={value =>
              this.onBackgroundStyleChange(showCardSetting, 'border', value)
            }
          />
        </SettingRow>
        <SettingRow label={this.formatMessage('borderRadius')} flow='wrap'>
          <BorderRadiusSetting
            value={config[showCardSetting].backgroundStyle.borderRadius}
            onChange={value =>
              this.onBackgroundStyleChange(
                showCardSetting,
                'borderRadius',
                value
              )
            }
          />
        </SettingRow>
        <SettingRow label={this.formatMessage('boxShadow')} flow='wrap'>
          <BoxShadowSetting
            value={config[showCardSetting].backgroundStyle.boxShadow}
            onChange={value =>
              this.onBackgroundStyleChange(showCardSetting, 'boxShadow', value)
            }
          />
        </SettingRow>
      </Fragment>
    )
  }

  handleItemStyleConfirmClick = evt => {
    this.onPropertyChange(['isItemStyleConfirm'], true)
    this.handleShowRegularClick()
  }

  handleResetItemstyleClick = evt => {
    this.onPropertyChange(['isItemStyleConfirm'], false)
    this.changeBuilderStatus(Status.Regular)
    this.updateStartButtonPosition()
  }

  handleItemStyleImageClick = evt => {
    const style = evt.currentTarget.dataset.value
    const { config } = this.props
    if (config.itemStyle === style) return
    this.onItemStyleChanged(style)
  }

  editLayoutItemSize = (appConfigAction, style: ItemStyle) => {
    const { layoutInfo, appConfig } = this.props
    const cardSize = this.getTemplateSize()?.[style]
    const layoutType = this.getLayoutType()
    if (layoutType === LayoutType.FixedLayout) {
      const { layoutId, layoutItemId } = layoutInfo
      const layout = appConfig.layouts[layoutId]
      const layoutItem = layout?.content?.[layoutItemId]
      const bbox = layoutItem.bbox.set('width', `${cardSize.width}%`).set('height', `${cardSize.height}%`)
      appConfigAction
        .editLayoutItemBBox(layoutInfo, bbox)
        .exec()
    }
  }

  getTemplateSize = () => {
    const { parentSize } = this.props
    const cardWidth1 = 300
    const cardWidth2 = 540
    const viewportWidth = parentSize?.width || 1280
    const viewportHeight = parentSize?.height || 800
    const templateWidth1 = this.checkTemplateDefaultSize((cardWidth1 * 100) / viewportWidth)
    const templateHeight2 = this.checkTemplateDefaultSize((cardWidth2 * 100) / viewportWidth)
    const templateSize = {
      STYLE0: { width: templateWidth1, height: this.checkTemplateDefaultSize((340 * 100) / viewportHeight) },
      STYLE1: { width: templateWidth1, height: this.checkTemplateDefaultSize((405 * 100) / viewportHeight) },
      STYLE2: { width: templateWidth1, height: this.checkTemplateDefaultSize((391 * 100) / viewportHeight) },
      STYLE3: { width: templateWidth1, height: this.checkTemplateDefaultSize((344 * 100) / viewportHeight) },
      STYLE4: { width: templateWidth1, height: this.checkTemplateDefaultSize((368 * 100) / viewportHeight) },
      STYLE5: { width: templateWidth1, height: this.checkTemplateDefaultSize((407 * 100) / viewportHeight) },
      STYLE6: { width: templateWidth1, height: this.checkTemplateDefaultSize((300 * 100) / viewportHeight) },
      STYLE7: { width: templateWidth1, height: this.checkTemplateDefaultSize((300 * 100) / viewportHeight) },
      STYLE8: { width: templateHeight2, height: this.checkTemplateDefaultSize((200 * 100) / viewportHeight) },
      STYLE9: { width: templateHeight2, height: this.checkTemplateDefaultSize((200 * 100) / viewportHeight) },
      STYLE10: { width: templateWidth1, height: this.checkTemplateDefaultSize((391 * 100) / viewportHeight) }
    }
    return templateSize
  }

  checkTemplateDefaultSize = (size) => {
    if (size > 100) {
      return 100
    } else {
      return size
    }
  }

  getLayoutType = (): LayoutType => {
    const { layoutInfo, appConfig } = this.props
    const layoutId = layoutInfo?.layoutId
    const layoutType = appConfig?.layouts?.[layoutId]?.type
    return layoutType
  }

  onHoverLayoutOpenChange = evt => {
    const { config, id, layouts, browserSizeMode, appConfig } = this.props
    const value = evt.target.checked
    if (config[Status.Hover].enable === value) return
    let action = getAppConfigAction()
    if (config[Status.Hover].enable && !value) {
      // remove hover layout
      const desLayoutId = searchUtils.findLayoutId(
        layouts[Status.Hover],
        browserSizeMode,
        appConfig.mainSizeMode
      )
      action = action.resetLayout(desLayoutId, true)
      this.changeBuilderStatus(Status.Regular)
    } else if (!config[Status.Hover].enable && value) {
      const oriLayoutId = searchUtils.findLayoutId(
        layouts[Status.Regular],
        browserSizeMode,
        appConfig.mainSizeMode
      )
      const desLayoutId = searchUtils.findLayoutId(
        layouts[Status.Hover],
        browserSizeMode,
        appConfig.mainSizeMode
      )
      action = action.duplicateLayoutItems(oriLayoutId, desLayoutId, false)
      this.changeBuilderStatus(Status.Hover)
    }
    const newConfig = config.setIn([Status.Hover, 'enable'], value)
    action.editWidgetConfig(id, newConfig).exec()
  }

  getIsScrollAndWidthOfTemplateCon = () => {
    const templateConHeight = this.templatesContain?.clientHeight || 0
    const templateConWidth = this.templatesContain?.clientWidth || 0
    const templateConParentHeight =
      this.templatesContain?.parentElement?.parentElement?.clientHeight || 0
    const isStartButtonAbsolute = templateConParentHeight < templateConHeight
    this.setState({
      isTemplateContainScroll: isStartButtonAbsolute,
      templateConWidth: templateConWidth
    })
  }

  updateStartButtonPosition = () => {
    clearTimeout(this.updatePositionTimeout)
    this.updatePositionTimeout = setTimeout(() => {
      this.getIsScrollAndWidthOfTemplateCon()
    }, 500)
  }

  setTemplatesContain = (ref) => {
    const preTemplatesContain = this.templatesContain
    if (ref) {
      this.templatesContain = ref
    }
    if (!preTemplatesContain) {
      this.getIsScrollAndWidthOfTemplateCon()
    }
  }

  renderTemplate = () => {
    const { config } = this.props
    const { isTemplateContainScroll } = this.state
    const startButtonClass = isTemplateContainScroll
      ? 'position-absolute position-absolute-con'
      : 'position-relative-con'
    return (
      <div ref={ref => { this.setTemplatesContain(ref) }}>
        <SettingSection
          title={this.formatMessage('chooseTemplateTip')}
          className='test'
        >
          <SettingRow>
            <div className='style-group w-100'>
              <div className='template-type mb-3'>
                <span className='template-classic'>
                  {this.formatMessage('classic')}
                </span>
                <Tooltip
                  title={this.formatMessage('classicTips')}
                  placement='left'
                >
                  <span className='inline-block ml-2 tooltip-icon-con'>
                    <InfoOutlined autoFlip/>
                  </span>
                </Tooltip>
              </div>

              <div className='d-flex justify-content-between w-100'>
                <Button
                  data-value={ItemStyle.Style1}
                  onClick={this.handleItemStyleImageClick}
                  type='tertiary'
                  className='style-margin-r'
                >
                  <Icon
                    autoFlip
                    className={`style-img style-img-h ${config.itemStyle ===
                      ItemStyle.Style1 && 'active'}`}
                    icon={require('./assets/style2.svg')}
                  />
                </Button>
                <Button
                  data-value={ItemStyle.Style3}
                  onClick={this.handleItemStyleImageClick}
                  type='tertiary'
                >
                  <Icon
                    autoFlip
                    className={`style-img style-img-h ${config.itemStyle ===
                      ItemStyle.Style3 && 'active'}`}
                    icon={require('./assets/style4.svg')}
                  />
                </Button>
              </div>

              <div className='vertical-space' />
              <div className='d-flex justify-content-between w-100'>
                <Button
                  data-value={ItemStyle.Style7}
                  onClick={this.handleItemStyleImageClick}
                  type='tertiary'
                  className='style-margin-r'
                >
                  <Icon
                    autoFlip
                    className={`style-img style-img-h ${config.itemStyle ===
                      ItemStyle.Style7 && 'active'}`}
                    icon={require('./assets/style8.svg')}
                  />
                </Button>
                <div className='flex-grow-1'></div>
              </div>

              <div className='vertical-space' />
              <Button
                data-value={ItemStyle.Style8}
                onClick={this.handleItemStyleImageClick}
                type='tertiary'
              >
                <Icon
                  autoFlip
                  className={`style-img ${config.itemStyle ===
                    ItemStyle.Style8 && 'active'}`}
                  icon={require('./assets/style9.svg')}
                />
              </Button>

              <div className='vertical-space' />
              <Button
                data-value={ItemStyle.Style9}
                onClick={this.handleItemStyleImageClick}
                type='tertiary'
              >
                <Icon
                  autoFlip
                  className={`style-img ${config.itemStyle ===
                    ItemStyle.Style9 && 'active'}`}
                  icon={require('./assets/style10.svg')}
                />
              </Button>
            </div>
          </SettingRow>

          <SettingRow>
            <div className='style-group advance-style-group w-100'>
              <div className='template-type mb-3'>
                <span className='template-classic'>
                  {this.formatMessage('classicHover')}
                </span>
                <Tooltip
                  title={this.formatMessage('classicHoverTips')}
                  placement='left'
                >
                  <span className='inline-block ml-2 tooltip-icon-con'>
                    <InfoOutlined autoFlip/>
                  </span>
                </Tooltip>
              </div>

              <div className='d-flex justify-content-between w-100'>
                <Button
                  data-value={ItemStyle.Style0}
                  onClick={this.handleItemStyleImageClick}
                  type='tertiary'
                  className='style-margin-r'
                >
                  <Icon
                    autoFlip
                    className={`style-img style-img-h ${config.itemStyle ===
                      ItemStyle.Style0 && 'active'}`}
                    icon={require('./assets/style1.svg')}
                  />
                </Button>
                <Button
                  data-value={ItemStyle.Style2}
                  onClick={this.handleItemStyleImageClick}
                  type='tertiary'
                >
                  <Icon
                    autoFlip
                    className={`style-img style-img-h ${config.itemStyle ===
                      ItemStyle.Style2 && 'active'}`}
                    icon={require('./assets/style3.svg')}
                  />
                </Button>
              </div>

              <div className='vertical-space' />
              <div className='d-flex justify-content-between w-100'>
                <Button
                  data-value={ItemStyle.Style4}
                  onClick={this.handleItemStyleImageClick}
                  type='tertiary'
                  className='style-margin-r'
                >
                  <Icon
                    autoFlip
                    className={`style-img style-img-h ${config.itemStyle ===
                      ItemStyle.Style4 && 'active'}`}
                    icon={require('./assets/style5.svg')}
                  />
                </Button>
                <Button
                  data-value={ItemStyle.Style5}
                  onClick={this.handleItemStyleImageClick}
                  type='tertiary'
                >
                  <Icon
                    autoFlip
                    className={`style-img style-img-h ${config.itemStyle ===
                      ItemStyle.Style5 && 'active'}`}
                    icon={require('./assets/style6.svg')}
                  />
                </Button>
              </div>

              <div className='vertical-space' />
              <div className='d-flex justify-content-between w-100'>
                <Button
                  data-value={ItemStyle.Style6}
                  onClick={this.handleItemStyleImageClick}
                  type='tertiary'
                  className='style-margin-r'
                >
                  <Icon
                    autoFlip
                    className={`style-img style-img-h ${config.itemStyle ===
                      ItemStyle.Style6 && 'active'}`}
                    icon={require('./assets/style7.svg')}
                  />
                </Button>
                <div className='flex-grow-1'></div>
              </div>

              <div className='vertical-space' />
              <Button
                data-value={ItemStyle.Style10}
                type='tertiary'
                className={`style-img empty  text-center  pr-1 pl-1 text-truncate ${config.itemStyle ===
                  ItemStyle.Style10 && 'active'}`}
                onClick={this.handleItemStyleImageClick}
              >
                {this.formatMessage('emptyTemplate')}
              </Button>
            </div>
          </SettingRow>
          <SettingRow>
            <div className='start-con w-100' css={this.getStartButtonStyle()}>
              <div className={startButtonClass}>
                <Button
                  className="w-100"
                  type='primary'
                  title={this.formatMessage('start')}
                  onClick={this.handleItemStyleConfirmClick}
                >
                  {this.formatMessage('start')}
                </Button>
              </div>
            </div>
          </SettingRow>
        </SettingSection>
      </div>
    )
  }

  getStartButtonStyle = (): SerializedStyles => {
    const { theme } = this.props
    const { templateConWidth } = this.state
    return css`
      &.start-con {
        & {
          height: ${polished.rem(64)};
          margin-top: ${polished.rem(-16)};
        }
        .position-absolute-con, .position-relative-con {
          margin-left: ${polished.rem(-16)};
        }
        div{
          padding: ${polished.rem(16)};
          background: ${theme.colors.palette.light[300]};
          left: 1rem;
          bottom: 0;
          width: ${templateConWidth ? `${templateConWidth}px` : '100%'}
        }
      }
    `
  }

  editStatus = (status: Status) => {
    const { id } = this.props
    builderAppSync.publishChangeWidgetStatePropToApp({
      widgetId: id,
      propKey: 'showCardSetting',
      value: status
    })
    this.changeBuilderStatus(status)
  }

  handleShowRegularClick = () => {
    const { showRegular } = this.state
    if (!showRegular) {
      this.setState({
        showHover: false
      })
      this.editStatus(Status.Regular)
    }
    this.setState({
      showRegular: !showRegular
    })
  }

  handleShowHoverClick = () => {
    const { showHover } = this.state
    if (!showHover) {
      this.setState({
        showRegular: false
      })
      this.editStatus(Status.Hover)
    }
    this.setState({
      showHover: !showHover
    })
  }

  renderCardSetting = () => {
    const { selectionIsInSelf } = this.props
    const statusIntl: { [key: string]: string } = {}
    statusIntl[Status.Hover] = this.formatMessage('hoverCard')
    statusIntl[Status.Regular] = this.formatMessage('regularCard')
    return (
      <div className='card-setting'>
        <SettingSection>
          {/* <SettingRow label={'export style'}>
            <Button type="primary" onClick={this.onExportClick} >Test</Button>
          </SettingRow> */}
          <SettingRow flow='wrap'>
            <div className='w-100'>
              <Button className='resetting-template' type='tertiary' onClick={this.handleResetItemstyleClick}>
                {this.formatMessage('chooseOtherTemplateTip')}
              </Button>
              <Tooltip
                title={this.formatMessage('useTips')}
                showArrow
                placement='left'
              >
                <Button className='tooltip-icon-con' type='tertiary'>
                  <InfoOutlined autoFlip/>
                </Button>
              </Tooltip>
            </div>
          </SettingRow>
          <SettingRow>
            <LinkSelector
              onSettingConfirm={this.onSettingLinkConfirm}
              linkParam={this.props.config.linkParam}
              useDataSources={this.props.useDataSources}
            />
          </SettingRow>
        </SettingSection>
        {!selectionIsInSelf && this.renderRegularSetting()}
        {!selectionIsInSelf && this.renderHoverSetting()}
      </div>
    )
  }

  renderRegularSetting = () => {
    const { showRegular } = this.state

    return (
      <SettingSection>
        <SettingCollapse
          label={this.formatMessage('regularCard')}
          isOpen={showRegular}
          onRequestOpen={this.handleShowRegularClick}
          onRequestClose={this.handleShowRegularClick}>
          <SettingRow></SettingRow>
          <SettingRow flow='wrap'>
            {this.rednerBgSetting(Status.Regular)}
          </SettingRow>
        </SettingCollapse>
      </SettingSection>
    )
  }

  renderHoverSetting = () => {
    const { config } = this.props
    const { showHover } = this.state
    const transitionInfo = config?.transitionInfo?.transition
      ? config.transitionInfo
      : defaultTransitionInfo
    return (
      <SettingSection>
        <SettingCollapse
          label={this.formatMessage('hoverCard')}
          isOpen={showHover}
          onRequestOpen={this.handleShowHoverClick}
          onRequestClose={this.handleShowHoverClick}>
          <SettingRow></SettingRow>
          <SettingRow label={this.formatMessage('enableHover')}>
            <Switch
              checked={config[Status.Hover].enable}
              onChange={this.onHoverLayoutOpenChange}
            />
          </SettingRow>
          {config[Status.Hover].enable && (
            <Fragment>
              {this.rednerBgSetting(Status.Hover)}
              <SettingRow
                label={this.formatMessage('cardTransition')}
                flow='wrap'
              >
                <TransitionSetting
                  transition={transitionInfo?.transition}
                  oneByOneEffect={transitionInfo?.oneByOneEffect}
                  onOneByOneChange={this.onSectionOneByOneEffectSettingChange}
                  onTransitionChange={this.onTransitionSettingChange}
                  onPreviewTransitionClicked={this.previewTransition}
                  onPreviewOneByOneClicked={this.previewOneByOneInSection}
                  onPreviewAsAWhoneClicked={this.previewTransitionAndOnebyOne}
                  formatMessage={this.formatMessage}
                  transitionLabel={this.formatMessage('cardWidgetState')}
                />
              </SettingRow>
            </Fragment>
          )}
        </SettingCollapse>
      </SettingSection>
    )
  }

  onSectionOneByOneEffectSettingChange = (
    animationSetting: AnimationSetting
  ) => {
    let transitionInfo: any = this.props?.config?.transitionInfo
    transitionInfo = transitionInfo?.oneByOneEffect
      ? transitionInfo.asMutable({ deep: true })
      : defaultTransitionInfo
    transitionInfo.oneByOneEffect = animationSetting
    transitionInfo.previewId = Symbol()
    this.onConfigChange(['transitionInfo'], Immutable(transitionInfo))
  }

  onTransitionSettingChange = (transition: Transition) => {
    let transitionInfo: any = this.props?.config?.transitionInfo
    transitionInfo = transitionInfo?.transition
      ? transitionInfo.asMutable({ deep: true })
      : defaultTransitionInfo
    transitionInfo.transition = transition
    transitionInfo.previewId = Symbol()
    this.onConfigChange(['transitionInfo'], Immutable(transitionInfo))
  }

  previewTransition = () => {
    this.onConfigChange(['transitionInfo', 'previewId'], Symbol())
  }

  previewOneByOneInSection = () => {
    this.onConfigChange(['transitionInfo', 'previewId'], Symbol())
  }

  previewTransitionAndOnebyOne = () => {
    this.onConfigChange(['transitionInfo', 'previewId'], Symbol())
  }

  render () {
    const { config } = this.props
    return (
      <div
        className={classNames(`${prefix}card-setting`, `${prefix}setting`)}
        css={this.getStyle(this.props.theme)}
      >
        {!config.isItemStyleConfirm
          ? (
              this.renderTemplate()
            )
          : (
            <Fragment>{this.renderCardSetting()}</Fragment>
            )}
      </div>
    )
  }
}
