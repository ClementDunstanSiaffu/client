/** @jsx jsx */
import {
  classNames, Immutable, IMState, React, IMAppConfig, jsx,
  IMThemeVariables, ImmutableObject, ImmutableArray, BrowserSizeMode, LayoutType,
  defaultMessages as jimuCoreMessages, LayoutInfo, TransitionType, TransitionDirection
} from 'jimu-core'
import { defaultMessages as jimuLayoutsDefaultMessages } from 'jimu-layouts/layout-runtime'
import { AllWidgetSettingProps, getAppConfigAction, templateUtils, builderAppSync } from 'jimu-for-builder'
import { MapWidgetSelector, SettingSection, SettingRow, SettingCollapse } from 'jimu-ui/advanced/setting-components'
import { MarkPopper } from './components/mark-popper'
import {
  Checkbox, Icon, Button, defaultMessages as jimuUIDefaultMessages, TextInput, ImageParam, TextArea,
  NumericInput, ButtonGroup, Select, Slider, ImageFillMode, Tabs, Tab, Tooltip, Switch, ConfirmDialog
} from 'jimu-ui'
import { IMConfig, TemplateType, Bookmark, DirectionType, PageStyle, DisplayType, Status, ImgSourceType, Transition } from '../config'
import defaultMessages from './translations/default'
import { ImageSelector } from 'jimu-ui/advanced/resource-selector'
import { Fragment } from 'react'
import { Template } from 'jimu-for-builder/templates'
import { TransitionSetting } from 'jimu-ui/advanced/style-setting-components'
import { getStyle, getNextButtonStyle } from './style'
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { ArrowRightOutlined } from 'jimu-icons/outlined/directional/arrow-right'
import { ArrowDownOutlined } from 'jimu-icons/outlined/directional/arrow-down'
import { CloseOutlined } from 'jimu-icons/outlined/editor/close'
import { WidgetMapOutlined } from 'jimu-icons/outlined/brand/widget-map'

const prefix = 'jimu-widget-'

const defaultConfig = require('../../config.json')
const directions = [
  { icon: 'right', value: DirectionType.Horizon },
  { icon: 'down', value: DirectionType.Vertical }
]
const originAllStyles = {
  CUSTOM1: require('./template/mark-styleCustom1.json'),
  CUSTOM2: require('./template/mark-styleCustom2.json')
}

let AllStyles: {[key: string]: Template}

function initStyles (widgetId: string) {
  if (AllStyles) {
    return AllStyles
  }
  const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages)
  AllStyles = {}
  Object.keys(originAllStyles).forEach(style => {
    AllStyles[style] = templateUtils.processForTemplate(originAllStyles[style], widgetId, messages)
  })
}

interface State {
  activeId: number
  showSimple: boolean
  showAdvance: boolean
  showArrangement: boolean
  tempLayoutType: LayoutType
  changeCustomConfirmOpen: boolean
  confirmMapChangeOpen: boolean
  isTemplateContainScroll: boolean
  templateConWidth: number
  bookmarkLabel: { [id: string]: string }
}

interface ExtraProps {
  appConfig: IMAppConfig
  browserSizeMode: BrowserSizeMode
  activeBookmarkId: number
  layoutInfo: LayoutInfo
  settingPanelChange: string
}

interface CustomeProps {
  theme: IMThemeVariables
}

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig> & ExtraProps & CustomeProps, State> {
  markPopper = null
  simpleTipRef: any
  customTipRef: any
  templatesContainer: any
  toBeChnagedMapWidgetIds: string[]
  updatePositionTimeout: any
  static mapExtraStateProps = (state: IMState, props: AllWidgetSettingProps<IMConfig>) => {
    return {
      appConfig: state && state.appStateInBuilder && state.appStateInBuilder.appConfig,
      browserSizeMode: state && state.appStateInBuilder && state.appStateInBuilder.browserSizeMode,
      activeBookmarkId: state && state.appStateInBuilder?.widgetsState[props.id]?.activeBookmarkId,
      layoutInfo: state && state.appStateInBuilder?.widgetsState[props.id]?.layoutInfo,
      settingPanelChange: state?.widgetsState?.[props.id]?.settingPanelChange
    }
  }

  constructor (props) {
    super(props)
    initStyles(props.id)
    const initBookmarkLabel = {}
    props.config.bookmarks.forEach(item => {
      initBookmarkLabel[item.id] = item.name
    })
    this.state = {
      activeId: 0,
      showSimple: true,
      showAdvance: true,
      showArrangement: false,
      tempLayoutType: LayoutType.FixedLayout,
      changeCustomConfirmOpen: false,
      confirmMapChangeOpen: false,
      isTemplateContainScroll: false,
      templateConWidth: 260,
      bookmarkLabel: initBookmarkLabel
    }
    this.simpleTipRef = React.createRef()
    this.customTipRef = React.createRef()
    this.templatesContainer = React.createRef()
    this.toBeChnagedMapWidgetIds = []
  }

  componentDidMount () {
    this.getIsScrollAndWidthOfTemplateCon()
    window.addEventListener('resize', this.updateNextButtonPosition)
  }

  componentDidUpdate (prevProps: AllWidgetSettingProps<IMConfig> & ExtraProps & CustomeProps) {
    const { activeId } = this.state
    const { settingPanelChange, activeBookmarkId = 0 } = this.props
    if (this.props.activeBookmarkId !== prevProps.activeBookmarkId) {
      if (activeBookmarkId !== activeId) {
        this.setState({ activeId: activeBookmarkId })
      }
    }
    if (settingPanelChange !== prevProps.settingPanelChange) {
      this.markPopper?.handleCloseOk()
    }
    if (settingPanelChange === 'content' && prevProps.settingPanelChange !== 'content') {
      this.updateNextButtonPosition()
    }
  }

  componentWillUnmount () {
    clearTimeout(this.updatePositionTimeout)
  }

  getIsScrollAndWidthOfTemplateCon = () => {
    const templateConHeight = this.templatesContainer?.current?.clientHeight || 0
    const templateConWidth = this.templatesContainer?.current?.clientWidth || 260
    const templateConParentHeight =
      this.templatesContainer?.current?.parentElement?.parentElement?.clientHeight || 0
    const isStartButtonAbsolute = templateConParentHeight < templateConHeight
    this.setState({
      isTemplateContainScroll: isStartButtonAbsolute,
      templateConWidth: templateConWidth
    })
  }

  onPropertyChange = (name, value) => {
    const { config } = this.props
    if (value === config[name]) {
      return
    }
    const newConfig = config.set(name, value)
    const alterProps = {
      id: this.props.id,
      config: newConfig
    }
    this.props.onSettingChange(alterProps)
  }

  onMultiplePropertyChange = (changeArr) => {
    const { config } = this.props
    let newConfig = config
    changeArr.forEach(item => {
      if (item.value === config[item.name]) return
      newConfig = newConfig.set(item.name, item.value)
    })
    const alterProps = {
      id: this.props.id,
      config: newConfig
    }
    this.props.onSettingChange(alterProps)
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

  onTemplateTypeChanged = (style: TemplateType, updatedAppConfig = undefined) => {
    const { id } = this.props
    let { appConfig } = this.props
    if (updatedAppConfig) {
      appConfig = updatedAppConfig
    }
    if (style === TemplateType.Custom1 || style === TemplateType.Custom2) {
      const styleTemplate = AllStyles[style]
      templateUtils.updateWidgetByTemplate(appConfig, styleTemplate, id, styleTemplate.widgetId, {}, defaultMessages).then(newAppConfig => {
        this._onItemStyleChange(newAppConfig, style)
      })
    } else {
      this._onItemStyleChange(appConfig, style)
    }
  }

  handleFormChange = (evt) => {
    const target = evt.currentTarget
    if (!target) return
    const field = target.dataset.field
    const type = target.type
    let value
    switch (type) {
      case 'checkbox':
        value = target.checked
        break
      case 'select':
        value = target.value
        break
      case 'range':
        value = parseFloat(target.value)
        break
      case 'number':
        const numbertype = target.dataset.numbertype
        const parseNumber = numbertype === 'float' ? parseFloat : parseInt
        const minValue = !!target.min && parseNumber(target.min)
        const maxValue = !!target.max && parseNumber(target.max)
        value = evt.target.value
        if (!value || value === '') return
        value = parseNumber(evt.target.value)
        if (!!minValue && value < minValue) { value = minValue }
        if (!!maxValue && value > maxValue) { value = maxValue }
        break
      default:
        value = target.value
        break
    }
    this.onPropertyChange(field, value)
  }

  handleCheckboxChange = (evt) => {
    const target = evt.currentTarget
    if (!target) return
    this.onPropertyChange(target.dataset.field, target.checked)
  }

  handleAutoInterval = (valueInt: number) => {
    this.onPropertyChange('autoInterval', valueInt)
  }

  onSwitchChanged = (checked: boolean, name: string) => {
    this.onPropertyChange(name, checked)
  }

  private readonly _onItemStyleChange = (newAppConfig, style) => {
    const { id, config: oldConfig, layoutInfo } = this.props
    const { tempLayoutType } = this.state
    const customType = [TemplateType.Custom1, TemplateType.Custom2]
    const tempWidgetSize = {
      CARD: { width: 516, height: 210 },
      LIST: { width: 300, height: 360 },
      SLIDE1: { width: 320, height: 380 },
      SLIDE2: { width: 320, height: 380 },
      SLIDE3: { width: 320, height: 380 },
      GALLERY: { width: 680, height: 230 },
      CUSTOM1: { width: 320, height: 380 },
      CUSTOM2: { width: 320, height: 380 }
    }
    let config = Immutable(defaultConfig)
    const wJson = newAppConfig.widgets[id]
    let newBookmarks
    let nextAppConfig = newAppConfig
    if (customType.includes(style)) {
      let newOriginLayoutId = newAppConfig.widgets[id].layouts[Status.Regular][newAppConfig.mainSizeMode]
      newBookmarks = oldConfig.bookmarks.map(item => {
        const { newLayoutId, eachAppConfig } = this.duplicateLayoutsEach(newOriginLayoutId, id, `Bookmark-${item.id}`, `Bookmark-${item.id}-label`, tempLayoutType, nextAppConfig)
        nextAppConfig = eachAppConfig
        newOriginLayoutId = newLayoutId
        item = item.set('layoutName', `Bookmark-${item.id}`).set('layoutId', newLayoutId)
        return item
      })
    }
    if (customType.includes(oldConfig.templateType) && !customType.includes(style)) {
      newBookmarks = newAppConfig.widgets[id].config.bookmarks
    }
    config = config.set('templateType', style).set('bookmarks', newBookmarks || oldConfig.bookmarks).set('isTemplateConfirm', false)
    config = config.set('isInitialed', true)
    const appConfigAction = getAppConfigAction(nextAppConfig)
    const layoutType = this.getLayoutType()
    if (layoutType === LayoutType.FixedLayout) {
      appConfigAction.editLayoutItemSize(layoutInfo, tempWidgetSize[style].width, tempWidgetSize[style].height)
    }
    appConfigAction.editWidgetProperty(wJson.id, 'config', config).exec()
  }

  getLayoutType = (): LayoutType => {
    const { layoutInfo, appConfig } = this.props
    const layoutId = layoutInfo.layoutId
    const layoutType = appConfig?.layouts?.[layoutId]?.type
    return layoutType
  }

  duplicateLayoutsEach = (originLayoutId: string, widgetId: string, layoutName: string, layoutLabel: string, layoutType?: LayoutType, newAppConfig?: IMAppConfig) => {
    let { appConfig } = this.props
    if (newAppConfig) appConfig = newAppConfig
    const appConfigAction = getAppConfigAction(appConfig)
    const newLayoutId = appConfigAction.createEmptyLayoutForWidgetOnCurrentSizeMode(widgetId, layoutName, layoutLabel, layoutType)
    appConfigAction.duplicateLayoutItems(originLayoutId, newLayoutId, true)
    return { newLayoutId, eachAppConfig: appConfigAction.appConfig }
  }

  formatMessage = (id: string, values?: { [key: string]: any }) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages, jimuCoreMessages, jimuLayoutsDefaultMessages)
    return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] }, values)
  }

  handleTemplateTypeImageClick = evt => {
    const style = evt.currentTarget.dataset.value
    const { id, config, appConfig } = this.props
    const customType = [TemplateType.Custom1, TemplateType.Custom2]
    if (config.templateType === style) return
    if (customType.includes(config.templateType)) { // origin type is advanced
      let nextAppConfig = appConfig
      const newBookmarks = config.bookmarks.map(item => {
        const { layoutName } = item
        const appConfigAction = getAppConfigAction(nextAppConfig)
        const newAction = appConfigAction.removeLayoutFromWidget(id, layoutName)
        nextAppConfig = newAction.appConfig
        return item.set('layoutId', '').set('layoutName', '')
      })
      const newConfig = config.set('bookmarks', newBookmarks).set('templateType', style)
      const appConfigAction = getAppConfigAction(nextAppConfig)
      appConfigAction.removeLayoutFromWidget(id, 'REGULAR')
      appConfigAction.editWidgetProperty(id, 'config', newConfig).exec()
      this.onTemplateTypeChanged(style, appConfigAction.appConfig)
    } else { // origin type is simple
      this.onTemplateTypeChanged(style)
    }
  }

  handleTemplateConfirmClick = evt => {
    this.onPropertyChange('isTemplateConfirm', true)
  }

  handleResetTemplateClick = () => {
    const { config } = this.props
    if (config.templateType === TemplateType.Custom1 || config.templateType === TemplateType.Custom2) {
      this.setState({ changeCustomConfirmOpen: true })
    } else {
      this.onPropertyChange('isTemplateConfirm', false)
    }
    this.updateNextButtonPosition()
  }

  handleChangeOk = () => {
    this.onPropertyChange('isTemplateConfirm', false)
    this.updateNextButtonPosition()
    this.setState({ changeCustomConfirmOpen: false })
  }

  handleChangeClose = () => {
    this.setState({ changeCustomConfirmOpen: false })
  }

  handleMapChangeOk = () => {
    this.onPropertyChange('bookmarks', [])
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: this.toBeChnagedMapWidgetIds
    })
    this.setState({ confirmMapChangeOpen: false })
    this.markPopper?.handleCloseOk()
  }

  handleMapChangeClose = () => {
    const { useMapWidgetIds } = this.props
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: []
    })
    this.setState({ confirmMapChangeOpen: false }, () => {
      this.props.onSettingChange({
        id: this.props.id,
        useMapWidgetIds: useMapWidgetIds.asMutable()
      })
    })
  }

  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    this.toBeChnagedMapWidgetIds = useMapWidgetIds
    const { useMapWidgetIds: originMapWidgetIds } = this.props
    if (!originMapWidgetIds || (originMapWidgetIds && originMapWidgetIds.length === 0)) {
      this.handleMapChangeOk()
      return
    }
    // eslint-disable-next-line
    if (originMapWidgetIds && originMapWidgetIds[0] === useMapWidgetIds[0]) {

    } else {
      this.setState({ confirmMapChangeOpen: true })
      // if(!config.runtimeUuid) {
      //   const runtimeUuid = utils.getLocalStorageAppKey();
      //   this.onMultiplePropertyChange([{name: 'runtimeUuid', value: runtimeUuid}, {name: 'bookmarks', value: []}]);
      // } else {
      //   this.onPropertyChange('bookmarks', []);
      // }
      // this.props.onSettingChange({
      //   id: this.props.id,
      //   useMapWidgetIds: useMapWidgetIds
      // });
    }
  }

  showBookmarkConfiger = (ref) => {
    this.markPopper = ref
  }

  onBookmarkUpdated = (updateBookmark: Bookmark) => {
    const { config } = this.props
    const oriBookmarks = config.bookmarks
    const fixIndex = oriBookmarks.findIndex(x => x.id === updateBookmark.id)
    const newBookmark = oriBookmarks.map((item, index) => {
      if (fixIndex === index) {
        return updateBookmark
      }
      return item
    })
    this.onPropertyChange('bookmarks', newBookmark)
  }

  addNewBookmark = (bookmark: Bookmark) => {
    const { config } = this.props
    this.setState({ activeId: bookmark.id as number })
    this.onPropertyChange('bookmarks', config.bookmarks.concat(bookmark))
  }

  getArrayMaxId (arr: ImmutableArray<Bookmark>): number {
    const numbers = arr.map(p => p.id)
    return numbers.length > 0 ? Math.max.apply(null, numbers) : 0
  }

  onBookmarkNameChange = (id: number | string, newText: string) => {
    const { bookmarkLabel } = this.state
    const newBookmarkLabel = {}
    for (const bmId in bookmarkLabel) {
      newBookmarkLabel[bmId] = bookmarkLabel[bmId]
      if (id?.toString() === bmId?.toString()) newBookmarkLabel[bmId] = newText
    }
    this.setState({ bookmarkLabel: newBookmarkLabel })
  }

  onBookmarkNameBlur = (id: number | string, newText: string) => {
    const { bookmarkLabel: newBookmarkLabel } = this.state
    const { config } = this.props
    const oriBookmarks = config.bookmarks
    const fixIndex = oriBookmarks.findIndex(x => x.id === id)
    let value = newText?.trim()
    value = value === '' ? config.bookmarks[fixIndex].name : value
    if (value !== newBookmarkLabel[id]) {
      newBookmarkLabel[id] = value
      this.setState({ bookmarkLabel: newBookmarkLabel })
    }
    const newBookmark = oriBookmarks.map((item, index) => {
      if (fixIndex === index) {
        return item.set('name', value)
      }
      return item
    })
    this.onPropertyChange('bookmarks', newBookmark)
  }

  onBookmarkTextChange = (id: number | string, newText: string, key: string) => {
    const { config } = this.props
    const oriBookmarks = config.bookmarks
    const fixIndex = oriBookmarks.findIndex(x => x.id === id)
    const newBookmark = oriBookmarks.map((item, index) => {
      if (fixIndex === index) {
        return item.set(key, newText)
      }
      return item
    })
    this.onPropertyChange('bookmarks', newBookmark)
  }

  handleKeydown = (e: any, ref) => {
    if (e.key === 'Enter') {
      ref.current.blur()
    }
  }

  handleSelect = (id: number, bookmark: ImmutableObject<Bookmark>) => {
    const { activeId } = this.state
    const dialogStatus = this.markPopper.getDialogStatus()
    if (!dialogStatus && activeId === id) {
      this.setState({ activeId: 0 })
      return
    }
    this.setState({ activeId: id })
    this.markPopper.handleEditWhenOpen(bookmark)
    builderAppSync.publishChangeWidgetStatePropToApp({ widgetId: this.props.id, propKey: 'activeBookmarkId', value: id })
    builderAppSync.publishChangeWidgetStatePropToApp({ widgetId: this.props.id, propKey: 'settingChangeBookmark', value: true })
  }

  handleEditBookmark = (bookmark: ImmutableObject<Bookmark>, evt?: any) => {
    if (evt) evt.stopPropagation()
    this.setState({ activeId: bookmark.id as number })
    this.markPopper.handleNewOrEdit(bookmark, true)
  }

  handleDelete = (bookmark: ImmutableObject<Bookmark>, evt?: any) => {
    if (evt) evt.stopPropagation()
    const { id } = bookmark
    const customType = [TemplateType.Custom1, TemplateType.Custom2]
    const { activeId } = this.state
    const { id: widgetId, appConfig } = this.props
    let { config } = this.props
    const oriBookmarks = config.bookmarks
    const index = oriBookmarks.findIndex(x => x.id === id)
    if (index === -1) return
    const newBookmark = oriBookmarks.asMutable({ deep: true })
    const dialogStatus = this.markPopper.getDialogStatus()
    let newEditActiveBookmark
    if (activeId === newBookmark[index].id) {
      if (index !== 0) {
        newEditActiveBookmark = newBookmark[index - 1]
      } else { // delete the first one
        if (newBookmark.length > 1) {
          newEditActiveBookmark = newBookmark[index + 1]
        } else { // delete the only one
          this.markPopper.handleClickClose(true)
          newEditActiveBookmark = undefined
          builderAppSync.publishChangeWidgetStatePropToApp({ widgetId: this.props.id, propKey: 'lastFlag', value: true })
        }
      }
      newEditActiveBookmark && dialogStatus && this.handleEditBookmark(Immutable(newEditActiveBookmark))
    }
    if (customType.includes(config.templateType)) {
      // delete bookmark layouts and bookmark
      const { layoutName } = newBookmark[index]
      const appConfigAction = getAppConfigAction(appConfig)
      appConfigAction.removeLayoutFromWidget(widgetId, layoutName)
      newBookmark.splice(index, 1)
      if (activeId === 0 && newBookmark.length >= 1) {
        newEditActiveBookmark = newBookmark[0]
      }
      const newImmutableArray = Immutable(newBookmark)
      config = config.set('bookmarks', newImmutableArray)
      appConfigAction.editWidgetProperty(widgetId, 'config', config).exec()
    } else {
      // only delete bookmark
      newBookmark.splice(index, 1)
      if (activeId === 0 && newBookmark.length >= 1) {
        newEditActiveBookmark = newBookmark[0]
      }
      const newImmutableArray = Immutable(newBookmark)
      this.onPropertyChange('bookmarks', newImmutableArray)
    }
    const newActiveId = (newEditActiveBookmark && newEditActiveBookmark.id) || activeId
    this.setState({
      activeId: newActiveId
    })
    builderAppSync.publishChangeWidgetStatePropToApp({ widgetId: this.props.id, propKey: 'activeBookmarkId', value: newActiveId })
    builderAppSync.publishChangeWidgetStatePropToApp({ widgetId: this.props.id, propKey: 'settingChangeBookmark', value: true })
  }

  onTabSelect = (imgSourceType: ImgSourceType) => {
    const { activeId } = this.state
    const { config } = this.props
    const oriBookmark = config.bookmarks
    const fixIndex = oriBookmark.findIndex(x => x.id === activeId)
    const newBookmark = oriBookmark.map((item, index) => {
      if (fixIndex === index) {
        return item.set('imgSourceType', ImgSourceType[imgSourceType])
      }
      return item
    })
    this.onPropertyChange('bookmarks', newBookmark)
  }

  onResourceChange = (imageParam: ImageParam) => {
    const { activeId } = this.state
    const { config } = this.props
    const oriBookmark = config.bookmarks
    const fixIndex = oriBookmark.findIndex(x => x.id === activeId)
    const newBookmark = oriBookmark.map((item, index) => {
      if (fixIndex === index) {
        return item.set('imgParam', imageParam)
      }
      return item
    })
    this.onPropertyChange('bookmarks', newBookmark)
  }

  handleImageFillModeChange = (evt) => {
    const { activeId } = this.state
    const { config } = this.props
    const mode = evt?.target?.value
    const oriBookmark = config.bookmarks
    const fixIndex = oriBookmark.findIndex(x => x.id === activeId)
    const newBookmark = oriBookmark.map((item, index) => {
      if (fixIndex === index) {
        return item.set('imagePosition', mode)
      }
      return item
    })
    this.onPropertyChange('bookmarks', newBookmark)
  }

  handleShowSimpleClick = () => {
    const { showSimple } = this.state
    this.setState({ showSimple: !showSimple })
  }

  handleShowAdvanceClick = () => {
    const { showAdvance } = this.state
    this.setState({ showAdvance: !showAdvance })
  }

  handleShowArrangementClick = () => {
    const { showArrangement } = this.state
    this.setState({ showArrangement: !showArrangement })
  }

  handlePageStyleChange = (evt) => {
    const value = evt?.target?.value
    this.onPropertyChange('pageStyle', value)
  }

  handleDisplayTypeChange = (evt) => {
    const value = evt?.target?.value
    this.onPropertyChange('displayType', value)
  }

  onTransitionTypeChange = (type: TransitionType) => {
    this.onPropertyChange('transition', type)
  }

  onTransitionDirectionChange = (dir: TransitionDirection) => {
    this.onPropertyChange('transitionDirection', dir)
  }

  getPageStyleOptions = (): JSX.Element[] => {
    return [
      <option key={PageStyle.Scroll} value={PageStyle.Scroll}>{this.formatMessage('scroll')}</option>,
      <option key={PageStyle.Paging} value={PageStyle.Paging}>{this.formatMessage('paging')}</option>
    ]
  }

  handleDirectionClick = (evt) => {
    const direction = evt.currentTarget.dataset.value
    this.onPropertyChange('direction', direction)
  }

  handleSpaceChange = (valueFloat: number) => {
    this.onPropertyChange('space', valueFloat)
  }

  handleItemSizeChange = (value: number, isVertical: boolean) => {
    isVertical ? this.onPropertyChange('itemHeight', value) : this.onPropertyChange('itemWidth', value)
  }

  duplicateNewLayouts = (originLayoutId: string, widgetId: string, layoutName: string, layoutLabel: string, layoutType?: LayoutType, newAppConfig?: IMAppConfig) => {
    let { appConfig } = this.props
    if (newAppConfig) appConfig = newAppConfig
    const appConfigAction = getAppConfigAction(appConfig)
    const newLayoutId = appConfigAction.createEmptyLayoutForWidgetOnCurrentSizeMode(widgetId, layoutName, layoutLabel, layoutType)
    appConfigAction.duplicateLayoutItems(originLayoutId, newLayoutId, true)
    appConfigAction.exec()
    return newLayoutId
  }

  updateNextButtonPosition = () => {
    clearTimeout(this.updatePositionTimeout)
    this.updatePositionTimeout = setTimeout(() => {
      this.getIsScrollAndWidthOfTemplateCon()
    }, 500)
  }

  renderTemplate = () => {
    const { config, theme } = this.props
    const { showSimple, showAdvance, isTemplateContainScroll, templateConWidth } = this.state
    const nextBtnClass = isTemplateContainScroll
      ? 'position-absolute position-absolute-con'
      : 'position-relative-con'
    const simpleTemplateTip = (
      <div className='w-100 d-flex'>
        <div className='text-truncate p-1'>
          {this.formatMessage('simple')}
        </div>
        <Tooltip title={this.formatMessage('simpleTemplateTip')} showArrow placement='left'>
          <span className='mt-1 ml-2'>
            <InfoOutlined />
          </span>
        </Tooltip>
      </div>
    )
    const advancedTemplateTip = (
      <div className='w-100 d-flex'>
        <div className='text-truncate p-1'>
          {this.formatMessage('advance')}
        </div>
        <Tooltip title={this.formatMessage('advancedTemplateTip')} showArrow placement='left'>
          <span className='mt-1 ml-2'>
            <InfoOutlined />
          </span>
        </Tooltip>
      </div>
    )

    return (
      <div ref={this.templatesContainer}>
        <SettingSection title={this.formatMessage('chooseTemplateTip')}>
          <SettingCollapse
            label={simpleTemplateTip}
            isOpen={showSimple}
            onRequestOpen={this.handleShowSimpleClick}
            onRequestClose={this.handleShowSimpleClick}
            role='group'
            aria-label={this.formatMessage('simple')}
          >
            <div className='template-group w-100 mt-1'>
              <div className='d-flex justify-content-between w-100'>
                <Button
                  data-value={TemplateType.Card}
                  onClick={this.handleTemplateTypeImageClick}
                  type='tertiary'
                  title={this.formatMessage('typeCard')}
                >
                  <Icon
                    autoFlip className={`template-img template-img-h ${config.templateType === TemplateType.Card && 'active'}`}
                    icon={require('./assets/tradition_card.svg')}
                  />
                </Button>
                <Button
                  data-value={TemplateType.List}
                  onClick={this.handleTemplateTypeImageClick}
                  type='tertiary'
                  title={this.formatMessage('typeList')}
                >
                  <Icon
                    autoFlip className={`template-img template-img-h ${config.templateType === TemplateType.List && 'active'}`}
                    icon={require('./assets/tradition_list.svg')}
                  />
                </Button>
              </div>
              <div className='vertical-space' />
              <div className='d-flex justify-content-between w-100'>
                <Button
                  data-value={TemplateType.Gallery}
                  onClick={this.handleTemplateTypeImageClick}
                  type='tertiary'
                  title={this.formatMessage('typeGallery')}
                >
                  <Icon
                    autoFlip className={`template-img template-img-gallery ${config.templateType === TemplateType.Gallery && 'active'}`}
                    icon={require('./assets/presentation_gallery_h.svg')}
                  />
                </Button>
              </div>
              <div className='vertical-space' />
              <div className='d-flex justify-content-between w-100'>
                <Button
                  data-value={TemplateType.Slide1}
                  onClick={this.handleTemplateTypeImageClick}
                  type='tertiary'
                  title={this.formatMessage('slideOne')}
                >
                  <Icon
                    autoFlip className={`template-img template-img-h ${config.templateType === TemplateType.Slide1 && 'active'}`}
                    icon={require('./assets/presentation_slide1.svg')}
                  />
                </Button>
                <Button
                  data-value={TemplateType.Slide2}
                  onClick={this.handleTemplateTypeImageClick}
                  type='tertiary'
                  title={this.formatMessage('slideTwo')}
                >
                  <Icon
                    autoFlip className={`template-img template-img-h ${config.templateType === TemplateType.Slide2 && 'active'}`}
                    icon={require('./assets/presentation_slide2.svg')}
                  />
                </Button>
              </div>
              <div className='vertical-space' />
              <div className='d-flex justify-content-between w-100'>
                <Button
                  data-value={TemplateType.Slide3}
                  onClick={this.handleTemplateTypeImageClick}
                  type='tertiary'
                  title={this.formatMessage('slideThree')}
                >
                  <Icon
                    autoFlip className={`template-img template-img-h ${config.templateType === TemplateType.Slide3 && 'active'}`}
                    icon={require('./assets/presentation_slide3.svg')}
                  />
                </Button>
              </div>
              {/* <div className="vertical-space" /> */}
              {/* <div data-value={TemplateType.Navigator} onClick={this.handleTemplateTypeImageClick} style={{marginTop: 10}} title="Navigator">
                <Icon autoFlip={true} className={`template-img template-img-h ${config.templateType === TemplateType.Navigator && 'active'}`}
                  icon={require('./assets/presentation_navigator.svg')} />
              </div> */}
            </div>
          </SettingCollapse>

          <SettingCollapse
            label={advancedTemplateTip}
            isOpen={showAdvance}
            onRequestOpen={this.handleShowAdvanceClick}
            onRequestClose={this.handleShowAdvanceClick}
            role='group'
            aria-label={this.formatMessage('advance')}
            className='mt-2 mb-2'
          >
            <div className='template-group w-100 mt-1'>
              <div className='d-flex justify-content-between w-100'>
                <Button
                  data-value={TemplateType.Custom1}
                  onClick={this.handleTemplateTypeImageClick}
                  type='tertiary'
                  title={this.formatMessage('customOne')}
                >
                  <Icon
                    autoFlip className={`template-img template-img-h ${config.templateType === TemplateType.Custom1 && 'active'}`}
                    icon={require('./assets/custom_template1.svg')}
                  />
                </Button>
                <Button
                  data-value={TemplateType.Custom2}
                  onClick={this.handleTemplateTypeImageClick}
                  type='tertiary'
                  title={this.formatMessage('customTwo')}
                >
                  <Icon
                    autoFlip className={`template-img template-img-h ${config.templateType === TemplateType.Custom2 && 'active'}`}
                    icon={require('./assets/custom_template2.svg')}
                  />
                </Button>
              </div>
              <div className="vertical-space" />
            </div>
          </SettingCollapse>

          <SettingRow>
            <div className='next-con w-100' css={getNextButtonStyle(theme, templateConWidth)}>
              <div className={nextBtnClass}>
                <Button type='primary' className='w-100' onClick={this.handleTemplateConfirmClick}>
                  {this.formatMessage('start')}
                </Button>
              </div>
            </div>
          </SettingRow>
        </SettingSection>
      </div>
    )
  }

  onTransitionSettingChange = (transition: Transition) => {
    const transitionInfo = this.props.config.transitionInfo.asMutable({ deep: true })
    transitionInfo.transition = transition
    this.onConfigChange(['transitionInfo'], Immutable(transitionInfo))
  }

  previewTransitionAndOnebyOne = () => {
    this.onConfigChange(['transitionInfo', 'previewId'], Symbol())
  }

  renderArrangementSetting = () => {
    const { config } = this.props
    const { transitionInfo } = config
    const { showArrangement } = this.state
    const isVertical = config.direction === DirectionType.Vertical

    return (
      <SettingRow>
        <SettingCollapse
          label={this.formatMessage('arrangement')}
          isOpen={showArrangement}
          onRequestOpen={this.handleShowArrangementClick}
          onRequestClose={this.handleShowArrangementClick}
          role='group'
          aria-label={this.formatMessage('arrangement')}
        >
          <SettingRow className='mt-2' label={this.formatMessage('pagingStyle')} flow='wrap' role='group' aria-label={this.formatMessage('pagingStyle')}>
            <Select value={config.pageStyle} onChange={this.handlePageStyleChange} size='sm'>
              {this.getPageStyleOptions()}
            </Select>
          </SettingRow>
          {config.pageStyle !== PageStyle.Scroll &&
            <Fragment>
              <SettingRow>
                <div className='d-flex w-100'>
                  <Checkbox
                    data-field='initBookmark'
                    onClick={this.handleCheckboxChange}
                    checked={config.initBookmark}
                  />
                  <div className='text-truncate ml-2' title={this.formatMessage('initBookmark')}>{this.formatMessage('initBookmark')}</div>
                  <Tooltip title={this.formatMessage('initBookmarkTips')} showArrow placement='left'>
                    <span className='inline-block ml-2 tips-pos'>
                      <InfoOutlined />
                    </span>
                  </Tooltip>
                </div>
              </SettingRow>
              <SettingRow>
                <div className='d-flex justify-content-between w-100'>
                  <label className='w-75 text-truncate d-inline-block font-dark-600'>{this.formatMessage('autoPlay')}</label>
                  <Switch
                    className='can-x-switch' checked={(config && config.autoPlayAllow) || false}
                    data-key='autoRefresh' onChange={evt => { this.onSwitchChanged(evt.target.checked, 'autoPlayAllow') }}
                  />
                </div>
              </SettingRow>
              {config.autoPlayAllow &&
                <Fragment>
                  <SettingRow
                    flow='wrap'
                    label={`${this.formatMessage('autoInterval')} (${this.formatMessage('second')})`}
                    role='group'
                    aria-label={`${this.formatMessage('autoInterval')} (${this.formatMessage('second')})`}
                  >
                    <NumericInput
                      style={{ width: '100%' }}
                      value={config.autoInterval || 3}
                      min={2}
                      max={60}
                      onChange={this.handleAutoInterval}
                    />
                  </SettingRow>
                  <SettingRow>
                    <div className='d-flex w-100'>
                      <Checkbox
                        data-field='autoLoopAllow'
                        onClick={this.handleCheckboxChange}
                        checked={config.autoLoopAllow}
                      />
                      <div className='text-truncate ml-2'>{this.formatMessage('autoLoopAllow')}</div>
                    </div>
                  </SettingRow>
                </Fragment>}
            </Fragment>
          }
          {config.pageStyle !== PageStyle.Paging &&
            <SettingRow label={this.formatMessage('direction')} role='group' aria-label={this.formatMessage('direction')}>
              <ButtonGroup size='sm'>
                {
                  directions.map((data, i) => {
                    return (
                      <Button
                        key={i} icon active={config.direction === data.value}
                        data-value={data.value}
                        onClick={this.handleDirectionClick}
                      >
                        {data.icon === 'right' ? <ArrowRightOutlined size='s' /> : <ArrowDownOutlined size='s' />}
                      </Button>
                    )
                  })
                }
              </ButtonGroup>
            </SettingRow>
          }
          {config.pageStyle === PageStyle.Paging &&
            <SettingRow label={this.formatMessage('transition')} flow='wrap' role='group' aria-label={this.formatMessage('transition')}>
              <TransitionSetting
                transition={transitionInfo?.transition}
                onTransitionChange={this.onTransitionSettingChange}
                onPreviewAsAWhoneClicked={this.previewTransitionAndOnebyOne}
                formatMessage={this.formatMessage}
                showOneByOne={false}
              />
            </SettingRow>
          }
          {config.pageStyle === PageStyle.Scroll &&
            <Fragment>
              <SettingRow
                flow='wrap'
                role='group'
                label={`${isVertical ? this.formatMessage('itemHeight') : this.formatMessage('itemWidth')}(px)`}
                aria-label={`${isVertical ? this.formatMessage('itemHeight') : this.formatMessage('itemWidth')}(px)`}
              >
                <NumericInput
                  style={{ width: '100%' }}
                  value={(isVertical ? config.itemHeight : config.itemWidth) || 240}
                  onChange={(value) => this.handleItemSizeChange(value, isVertical)}
                />
              </SettingRow>
              <SettingRow
                flow='wrap'
                role='group'
                label={(isVertical ? this.formatMessage('verticalSpacing') : this.formatMessage('horizontalSpacing')) + ' (px)'}
                aria-label={(isVertical ? this.formatMessage('verticalSpacing') : this.formatMessage('horizontalSpacing')) + ' (px)'}
              >
                <div className='d-flex justify-content-between w-100 align-items-center'>
                  <Slider
                    style={{ width: '60%' }}
                    data-field='space'
                    onChange={this.handleFormChange}
                    value={config.space}
                    title='0-50'
                    size='sm'
                    min={0}
                    max={50}
                  />
                  <NumericInput
                    style={{ width: '25%' }}
                    value={config.space}
                    min={0}
                    max={50}
                    title='0-50'
                    onChange={this.handleSpaceChange}
                  />
                </div>
              </SettingRow>
            </Fragment>
          }
        </SettingCollapse>
      </SettingRow>
    )
  }

  renderDataSetting = () => {
    const { id, theme, useDataSources, useMapWidgetIds, config } = this.props
    const { activeId, tempLayoutType, bookmarkLabel } = this.state
    const activeBookmark = config.bookmarks.find(x => x.id === activeId)
    const activeImgName = activeBookmark?.imgParam?.originalName
    const activeName = (activeBookmark && activeBookmark.name) ? activeBookmark.name : '---'
    const slideType = [TemplateType.Slide1, TemplateType.Slide2, TemplateType.Slide3]
    const runtimeType = [TemplateType.Slide1, TemplateType.Slide2, TemplateType.Slide3, TemplateType.Custom1, TemplateType.Custom2]
    const noImgType = [TemplateType.List, TemplateType.Custom1, TemplateType.Custom2]
    const customType = [TemplateType.Custom1, TemplateType.Custom2]

    return (
      <div className='bookmark-setting'>
        <SettingSection>
          <SettingRow flow='wrap'>
            <div className='w-100 overflow-hidden'>
              <Button
                type='tertiary'
                className='resetting-template jimu-outline-inside'
                onClick={this.handleResetTemplateClick}
                title={this.formatMessage('resettingTheTemplate')}
              >
                {this.formatMessage('resettingTheTemplate')}
              </Button>
              {customType.includes(config.templateType) &&
                <Fragment>
                  {this.formatMessage('customBookmarkDesign')}
                  <Tooltip title={this.formatMessage('customTips')} showArrow placement='left'>
                    <span className='inline-block ml-2'>
                      <InfoOutlined />
                    </span>
                  </Tooltip>
                </Fragment>}
            </div>
          </SettingRow>
          <SettingRow flow='wrap' label={this.formatMessage('selectMapWidget')} aria-label={this.formatMessage('selectMapWidget')} role='group'>
            <MapWidgetSelector onSelect={this.onMapWidgetSelected} useMapWidgetIds={useMapWidgetIds} />
          </SettingRow>
          {this.props.useMapWidgetIds && this.props.useMapWidgetIds.length === 1 &&
            <SettingRow>
              <MarkPopper
                id={id}
                theme={theme}
                title={`${this.formatMessage('setBookmarkView')}: ${activeName}`}
                buttonLabel={this.formatMessage('addBookmark')}
                useDataSources={useDataSources}
                useMapWidgetIds={useMapWidgetIds}
                jimuMapConfig={config}
                onBookmarkUpdated={this.onBookmarkUpdated}
                onShowBookmarkConfiger={(ref) => this.showBookmarkConfiger(ref)}
                maxBookmarkId={this.getArrayMaxId(config.bookmarks)}
                activeBookmarkId={activeId}
                onAddNewBookmark={this.addNewBookmark}
                formatMessage={this.formatMessage}
                duplicateNewLayouts={this.duplicateNewLayouts}
                tempLayoutType={tempLayoutType}
                isUseWidgetSize
              />
            </SettingRow>}
          {config.bookmarks && config.bookmarks.length !== 0 &&
            <SettingRow>
              <div className='w-100'>
                {config.bookmarks.map((item, index) => {
                  const titleTextInput = React.createRef<HTMLInputElement>()
                  return (
                    <Fragment key={index}>
                      <div className={`${activeId === item.id ? 'active-mark' : ''} setting-bookmark-list`} onClick={() => this.handleSelect(item.id as number, item)}>
                        <TextInput
                          className='header-title-input h5 bookmark-edit-input'
                          ref={titleTextInput}
                          title={bookmarkLabel[item.id] || item.name}
                          defaultValue={bookmarkLabel[item.id] || item.name}
                          onChange={evt => this.onBookmarkNameChange(item.id, evt.target.value)}
                          onBlur={evt => this.onBookmarkNameBlur(item.id, evt.target.value)}
                          onClick={evt => evt.stopPropagation()}
                          onKeyDown={(e) => this.handleKeydown(e, titleTextInput)}
                        />
                        <span className='float-right bookmark-edit-btn'>
                          <Button title={this.formatMessage('changeBookmarkView')} onClick={(evt) => this.handleEditBookmark(item, evt)} type='tertiary' icon>
                            <WidgetMapOutlined size='s' />
                          </Button>
                          <Button title={this.formatMessage('deleteOption')} onClick={(evt) => this.handleDelete(item, evt)} type='tertiary' icon>
                            <CloseOutlined size='s' />
                          </Button>
                        </span>
                      </div>
                      {
                        ((!noImgType.includes(config.templateType)) && activeId === item.id) &&
                          <div className='active-mark-content'>
                            <SettingRow label={this.formatMessage('imageSource')} className='mb-2' aria-label={this.formatMessage('imageSource')} role='group'/>
                            <Tabs fill type='pills' onChange={this.onTabSelect} value={item.imgSourceType === ImgSourceType.Custom ? 'Custom' : 'Snapshot'}>
                              <Tab id='Snapshot' title={this.formatMessage('imageSnapshot')}>
                                <div className='mt-2' />
                              </Tab>
                              <Tab id='Custom' title={this.formatMessage('custom')}>
                                <div className='mt-2'>
                                  <SettingRow>
                                    <div className='w-100 d-flex align-items-center mb-1 mt-1'>
                                      <div style={{ minWidth: '60px' }}>
                                        <ImageSelector
                                          buttonClassName='text-dark d-flex justify-content-center btn-browse'
                                          widgetId={this.props.id}
                                          buttonLabel={this.formatMessage('setAnImage')}
                                          buttonSize='sm'
                                          onChange={this.onResourceChange}
                                          imageParam={item.imgParam}
                                        />
                                      </div>
                                      <div style={{ width: '70px' }} className='uploadFileName ml-2 text-truncate' title={activeImgName || this.formatMessage('none')}>
                                        {activeImgName || this.formatMessage('none')}
                                      </div>
                                    </div>
                                  </SettingRow>
                                </div>
                              </Tab>
                            </Tabs>
                            <SettingRow label={this.formatMessage('imagePosition')} className='mt-2' truncateLabel aria-label={this.formatMessage('imagePosition')} role='group'>
                              <div style={{ width: '40%' }}>
                                <Select size='sm' value={item.imagePosition} onChange={this.handleImageFillModeChange}>
                                  <option key={0} value={ImageFillMode.Fill}>{this.formatMessage('fill')}</option>
                                  <option key={1} value={ImageFillMode.Fit}>{this.formatMessage('fit')}</option>
                                </Select>
                              </div>
                            </SettingRow>
                            {(slideType.includes(config.templateType)) &&
                              <SettingRow flow='wrap' label={this.formatMessage('description')} className='mb-2' role='group' aria-label={this.formatMessage('description')}>
                                <TextArea
                                  className='w-100'
                                  title={item.description}
                                  value={item.description || ''}
                                  onChange={evt => this.onBookmarkTextChange(item.id, evt.target.value, 'description')}
                                  spellCheck={false}
                                />
                              </SettingRow>}
                          </div>
                      }
                    </Fragment>
                  )
                })}
              </div>
            </SettingRow>}
        </SettingSection>

        <SettingSection>
          <SettingRow flow='wrap' label={this.formatMessage('drawingDisplay')} aria-label={this.formatMessage('drawingDisplay')} role='group'>
            <Select value={config.displayType} onChange={this.handleDisplayTypeChange} size='sm'>
              <option key='all' value={DisplayType.All} title={this.formatMessage('displayAll')}>
                <div className='text-truncate'>{this.formatMessage('displayAll')}</div>
              </option>
              <option key='selected' value={DisplayType.Selected} title={this.formatMessage('displaySelected')}>
                <div className='text-truncate'>{this.formatMessage('displaySelected')}</div>
              </option>
            </Select>
          </SettingRow>
          {config.templateType === TemplateType.Gallery &&
            <Fragment>
              <SettingRow label={this.formatMessage('galleryDirection')} role='group' aria-label={this.formatMessage('galleryDirection')}>
                <ButtonGroup size='sm'>
                  {
                    directions.map((data, i) => {
                      return (
                        <Button
                          key={i} icon active={config.direction === data.value}
                          data-value={data.value}
                          onClick={this.handleDirectionClick}
                        >
                          {data.icon === 'right' ? <ArrowRightOutlined autoFlip size='s' /> : <ArrowDownOutlined autoFlip size='s' />}
                        </Button>
                      )
                    })
                  }
                </ButtonGroup>
              </SettingRow>
            </Fragment>}
          {/* <SettingRow>
            <div className="d-flex w-100">
              <Checkbox
                data-field="initBookmark"
                onClick={this.handleCheckboxChange}
                checked={config.initBookmark}
              />
              <div className="text-truncate ml-2" title={this.formatMessage('initBookmark')}>{this.formatMessage('initBookmark')}</div>
              <Tooltip title={this.formatMessage('initBookmarkTips')} showArrow={true} placement="left">
                <span className="inline-block ml-2 tips-pos">
                  <InfoOutlined />
                </span>
              </Tooltip>
            </div>
          </SettingRow> */}
          {(!runtimeType.includes(config.templateType)) &&
            <SettingRow>
              <div className='d-flex w-100'>
                <Checkbox
                  data-field='runtimeAddAllow'
                  onClick={this.handleCheckboxChange}
                  checked={config.runtimeAddAllow}
                />
                <div className='text-truncate ml-2' title={this.formatMessage('runtimeAddAllow')}>{this.formatMessage('runtimeAddAllow')}</div>
              </div>
            </SettingRow>}
          {(!customType.includes(config.templateType)) &&
            <SettingRow>
              <div className='d-flex w-100'>
                <Checkbox
                  data-field='displayFromWeb'
                  onClick={this.handleCheckboxChange}
                  checked={config.displayFromWeb}
                />
                <div className='text-truncate ml-2' title={this.formatMessage('displayFromWeb')}>{this.formatMessage('displayFromWeb')}</div>
              </div>
            </SettingRow>}
          {(runtimeType.includes(config.templateType)) && this.renderArrangementSetting()}
        </SettingSection>
      </div>
    )
  }

  render () {
    const { config, theme } = this.props
    const { changeCustomConfirmOpen, confirmMapChangeOpen } = this.state

    return (
      <Fragment>
        <div className={classNames(`${prefix}bookmark-setting`, `${prefix}setting`)} css={getStyle(theme)}>
          {config.isTemplateConfirm ? this.renderDataSetting() : this.renderTemplate()}
        </div>
        {
          changeCustomConfirmOpen &&
            <ConfirmDialog
              level='warning'
              title={this.formatMessage('changeConfirmTitle')}
              hasNotShowAgainOption={false}
              content={this.formatMessage('changeRemind')}
              onConfirm={this.handleChangeOk}
              onClose={this.handleChangeClose}
            />
        }
        {
          confirmMapChangeOpen &&
            <ConfirmDialog
              level='info'
              title={this.formatMessage('bookmarkConfirmTitle')}
              hasNotShowAgainOption={false}
              content={this.formatMessage('switchRemind')}
              onConfirm={this.handleMapChangeOk}
              onClose={this.handleMapChangeClose}
            />
        }
      </Fragment>
    )
  }
}
