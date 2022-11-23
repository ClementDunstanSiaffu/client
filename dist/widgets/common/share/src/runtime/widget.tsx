/** @jsx jsx */
import {
  React, IMState, jsx, IMAppConfig, IMAppInfo, AllWidgetProps,
  LayoutItemType, BrowserSizeMode, appActions, AppMode, getAppStore, urlUtils
} from 'jimu-core'
import { IMConfig, UiMode, DefaultIconConfig, ItemsName } from '../config'
import { searchUtils } from 'jimu-layouts/layout-runtime'
import { Button, Icon, Popper, getFallbackPlacementsModifier } from 'jimu-ui'
import { getStyle, getPopupStyle } from './style'
import { ContentHeader } from './components/content-header'

// shortLink
import * as ShortLinkUtil from './components/short-link'
// items
import { ShownMode, ExpandType } from './components/items/base-item'
import { ShareLink } from './components/items/sharelink'
import { QRCode } from './components/items/qr-code'
import { Embed } from './components/items/embed'
import { ItemsList } from './components/items-list'

interface ExtraProps {
  appConfig: IMAppConfig
  appInfo: IMAppInfo
  browserSizeMode: BrowserSizeMode
  isLiveViewMode: boolean
}

interface State {
  url: string
  longUrl: string
  shortUrl: string // '' means havn't fetch shortUrl
  // ui
  uiMode: UiMode
  isInController: boolean
  // popup
  isPopupOpen: boolean
  shownItem?: ItemsName // e.g QRCode tiled the popup
  isLiveViewMode: boolean
  // a11y
  a11yPopperAutoFocus: boolean
  a11yFocusElement: string
}

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig> & ExtraProps, State> {
  private readonly btnRef: React.RefObject<any>
  private popperRef: React.RefObject<any>

  private readonly POPPER_POSITION_CONFIGS = [getFallbackPlacementsModifier(['right-start', 'left-start', 'auto-end'])]

  static mapExtraStateProps = (state: IMState, ownProps: AllWidgetProps<IMConfig>): ExtraProps => {
    const appMode = (state && state.appRuntimeInfo && state.appRuntimeInfo.appMode)
    return {
      appConfig: state.appConfig,
      appInfo: state.appInfo,
      browserSizeMode: state.browserSizeMode,
      isLiveViewMode: (appMode === AppMode.Run)
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      url: '',
      longUrl: '',
      shortUrl: '',
      uiMode: UiMode.Popup,
      isInController: false,
      isPopupOpen: false,
      shownItem: null,
      isLiveViewMode: false,

      // a11y
      a11yPopperAutoFocus: true,
      a11yFocusElement: null
    }

    this.btnRef = React.createRef()
    this.popperRef = React.createRef()
  }

  componentDidMount () {
    const { layoutId, layoutItemId, id } = this.props
    this.props.dispatch(appActions.widgetStatePropChange(id, 'layoutInfo', { layoutId, layoutItemId }))

    this.updateUrl() // init this.state.url
  }

  componentDidUpdate (prevProps: AllWidgetProps<IMConfig>, prevState: State) {
    const { uiMode } = this.props.config

    // change UI-mode
    if (this.props.config?.uiMode !== this.state.uiMode) {
      this.setState({ // when uiMode changed in setting
        shownItem: null,
        isPopupOpen: false
      })
    }

    // is share-contents in Controller
    if (uiMode === UiMode.Popup && this.isParentWidgetIsController(prevProps)) {
      this.setState({ isInController: true })// Tile popup content in Controller
    } else {
      this.setState({ isInController: false })
    }

    this.setUiMode(uiMode)

    // LiveViewMode changed
    this.closePopperWhenLiveViewModeChange()

    // a11y
    const a11ySkipAndReset508 = this.a11yIsSkipAndReset508(this.props.config, prevProps.config)
    if (a11ySkipAndReset508) {
      this.setState({
        a11yPopperAutoFocus: true,
        a11yFocusElement: null
      })
    } else {
      // focus back to Btn, when Popper closed
      this.a11yFocusOnBtnRefWhenPopupClosed(uiMode, prevState)

      this.a11yHandlers(prevState)
    }
  }

  private isParentWidgetIsController (prevProps: AllWidgetProps<IMConfig>) {
    const widgetId = searchUtils.getParentWidgetIdOfContent(this.props.appConfig, prevProps.id, LayoutItemType.Widget, this.props.browserSizeMode)
    return (this.props.appConfig.widgets[widgetId]?.uri === 'widgets/common/controller/')
  }

  private closePopperWhenLiveViewModeChange () {
    const { isLiveViewMode } = this.props

    if (isLiveViewMode !== this.state.isLiveViewMode) {
      this.onTogglePopup(false)
    }
    this.setState({ isLiveViewMode: isLiveViewMode })
  }

  // urls
  private readonly onUrlChange = (url: string) => {
    this.setState({ url: url })
    // console.log("1.longUrl==>  " + this.state.longUrl);
    // console.log("2.shortUrl==>  " + this.state.shortUrl);
    // console.log("3.url==>  " + this.state.url);
  }

  onLongUrlChange = (longUrl: string) => {
    this.setState({ longUrl: longUrl })
    this.onUrlChange(longUrl)
  }

  onShortUrlChange = (shortUrl: string) => {
    this.setState({ shortUrl: shortUrl })
    if (shortUrl) {
      this.onUrlChange(shortUrl)
    }
  }

  // try to update shortUrl
  updateUrl = (): string => {
    const href = this.attachOrgUrlKey(window.location.href)

    if (this.state.longUrl === href) {
      return href
    }

    // 1. update long url
    this.onLongUrlChange(href)
    this.onShortUrlChange('')

    // 2. try to set short url
    ShortLinkUtil.fetchShortLink(href).then((shortUrl) => {
      this.onShortUrlChange(shortUrl)
    }, (longUrl) => {
      // this.onLongUrlChange()
    })
  }

  // href?org=<urlkey>
  attachOrgUrlKey = (href: string): string => {
    let url = href
    const appState = getAppStore().getState()
    const urlKey = appState?.portalSelf?.urlKey
    if (urlKey) {
      url = urlUtils.updateQueryStringParameter(url, 'org', urlKey)
    }

    return url
  }

  // ui
  private readonly setUiMode = (mode: UiMode) => {
    this.setState({
      uiMode: mode,
      a11yPopperAutoFocus: true // reset this a11y flag
    })
  }

  // content
  onItemClick = (name: ItemsName, ref: React.RefObject<any>, type: ExpandType, isUpdateUrl: boolean) => {
    if (isUpdateUrl) {
      this.updateUrl()
    }

    if (name && ref) {
      if (this.state.uiMode === UiMode.Popup && !this.state.isInController) {
        this.onOpenPopup(true)
      } else if (this.state.uiMode === UiMode.Inline && type === ExpandType.ShowInPopup) {
        this.onOpenPopup(true)
      }

      this.onContentChange(name, ref)
    } // else just updateUrl
  }

  onContentChange = (name: ItemsName, ref: React.RefObject<any>) => {
    this.popperRef = ref
    this.setState({ shownItem: name })
  }

  // popup
  private readonly onPopupBtnClick = () => {
    this.onTogglePopup()
  }

  onTogglePopup = (command?: boolean) => {
    let isOpen
    if (typeof command !== 'undefined') {
      isOpen = command
    } else {
      isOpen = !this.state.isPopupOpen
    }

    if (isOpen === false) {
      this.onBackBtnClick()// back to main content
    }

    this.setState({ isPopupOpen: isOpen })
  }

  onOpenPopup = (isOpen: boolean) => {
    this.updateUrl()
    this.setState({ isPopupOpen: isOpen })
  }

  // popup's toggle hanlder
  onPopperToggleHanlder = (evt: React.MouseEvent<HTMLElement>) => {
    this.onTogglePopup()
  }

  onBackBtnClick = () => {
    this.setState({ shownItem: null })
  }

  getRefByUiMode = () => {
    let ref = null
    if (UiMode.Popup === this.props.config.uiMode && !this.state.isInController) {
      ref = this.btnRef
    } else /* if (UiMode.Popup === this.props.config.uiMode && this.state.isInController) */ {
      ref = this.popperRef
    } /* else if (UiMode.Inline === this.props.config.uiMode) {
      ref = this.popperRef;
    } else if (UiMode.Slide === this.props.config.uiMode) {
      ref = this.popperRef;
    } */

    return ref
  }
  // popup

  getAppTitle = (): string => {
    // console.log('getAppTitle  ', this.props.appInfo.name);
    // console.log('getAppSummary  ', this.props.appInfo.snippet);
    return this.props.appInfo.name
  }

  // for render
  // part 1
  private readonly renderOutsideUI = () => {
    let outsideUI = null
    const tooltip = this.props.config.popup.tooltip
    const { theme, config, intl } = this.props
    const { uiMode } = this.state

    if (uiMode === UiMode.Popup) {
      if (this.state.isInController) {
        outsideUI = this.renderMainContent()
      } else {
        const icon = this.props.config.popup.icon ? this.props.config.popup.icon : DefaultIconConfig
        outsideUI = (
          <Button ref={this.btnRef} icon title={tooltip} style={{ border: 'none', backgroundColor: 'transparent', padding: 0 }}
            onClick={this.onPopupBtnClick}
            className='jimu-outline-inside'
            aria-haspopup='true' data-testid='popupBtn'>
            <Icon icon={icon.svg} color={icon.properties.color} size={icon.properties.size} />
          </Button>
        )
      }
    } else if (uiMode === UiMode.Inline) {
      outsideUI = (
        <ItemsList
          url={this.state.url}
          uiMode={uiMode} isShowInModal={false}
          theme={theme} intl={intl} config={config}

          onShortUrlChange={this.onShortUrlChange}
          onItemClick={this.onItemClick}
          getAppTitle={this.getAppTitle}

          a11yFocusElement={this.state.a11yFocusElement}
        />
      )
    } /* else if (uiMode === UiMode.Slide) {
      outsideUI = this.getSlideContent();
    } */

    return outsideUI
  }

  private readonly getSlideContent = () => {
    const shownMode = ShownMode.Content
    const { config, theme, intl } = this.props
    const { url, longUrl, uiMode } = this.state

    return (
      <div>
        {/* part 2.1: top */}
        <div>
          <ShareLink
            url={url}
            longUrl={longUrl}
            uiMode={uiMode} shownMode={shownMode} isShowInModal
            config={config} theme={theme} intl={intl}

            onItemClick={this.onItemClick}
            onShortUrlChange={this.onShortUrlChange}
            onLongUrlChange={this.onLongUrlChange}
            updateUrl={this.updateUrl}
            getAppTitle={this.getAppTitle}
          />
        </div>
        {/* part 2.2: buttom */}
        <div className='items popup-item-btns-wapper'>
          <ItemsList
            url={this.state.url}
            longUrl={longUrl}
            uiMode={uiMode} isShowInModal
            theme={theme} intl={intl} config={config}

            onShortUrlChange={this.onShortUrlChange}
            onItemClick={this.onItemClick}
            getAppTitle={this.getAppTitle}

            a11yFocusElement={this.state.a11yFocusElement}
          />
        </div>
      </div>
    )
  }

  private readonly renderMainContent = () => {
    let popupBody = null
    const { url, longUrl, shownItem, uiMode } = this.state
    const { config, theme, intl } = this.props

    const shownMode = ShownMode.Content
    if (shownItem === ItemsName.QRcode) {
      popupBody = (
        <QRCode
          url={url}
          uiMode={uiMode} shownMode={shownMode} isShowInModal
          config={config} theme={theme} intl={intl}

          onItemClick={this.onItemClick}
          getAppTitle={this.getAppTitle}
        />
      )
    } else if (shownItem === ItemsName.Sharelink) {
      popupBody = (
        <ShareLink
          url={url}
          longUrl={longUrl}
          uiMode={uiMode} shownMode={shownMode} isShowInModal
          config={config} theme={theme} intl={intl}

          onItemClick={this.onItemClick}
          onShortUrlChange={this.onShortUrlChange}
          onLongUrlChange={this.onLongUrlChange}
          updateUrl={this.updateUrl}
          getAppTitle={this.getAppTitle}
        />
      )
    } else if (shownItem === ItemsName.Embed) {
      popupBody = (
        <Embed
          url={url}
          uiMode={uiMode} shownMode={shownMode} isShowInModal
          config={config} theme={theme} intl={intl}

          onItemClick={this.onItemClick}
          getAppTitle={this.getAppTitle}
        />
      )
    } else {
      popupBody = this.getSlideContent()
    }

    return <React.Fragment>
      <ContentHeader
        intl={this.props.intl}
        uiMode={this.state.uiMode}
        shownItem={this.state.shownItem}
        isInController={this.state.isInController}
        onBackBtnClick={this.onBackBtnClick}
        onPopupBtnClick={this.onPopupBtnClick}
      ></ContentHeader>
      {popupBody}
    </React.Fragment>
  }

  // part 2
  render () {
    const isRenderPopper = this.state.isPopupOpen
    const outsideUI = this.renderOutsideUI()
    const mainContent = this.renderMainContent()

    return (
      <div css={getStyle(this.props.theme)} data-testid='share-widget'>
        {/* 1.buttons */}
        <div>
          {outsideUI}
        </div>
        {/* 2.popup */}
        {isRenderPopper && // depose Popper when close, for reposition
          <Popper
            placement='right-start' css={getPopupStyle(this.props.theme)} reference={this.getRefByUiMode()}
            modifiers={this.POPPER_POSITION_CONFIGS} data-testid='mainPopuper'
            open={this.state.isPopupOpen} toggle={this.onPopperToggleHanlder}
            // a11y
            autoFocus={this.state.a11yPopperAutoFocus}
            forceLatestFocusElements={true}
          >
          {mainContent}
          </Popper>}
      </div>
    )
  }

  // a11y
  private a11yIsSkipAndReset508 (propsConfig: IMConfig, prevPropsConfig: IMConfig) {
    let skipAndReset508Flag = false
    if (propsConfig !== prevPropsConfig) {
      skipAndReset508Flag = true
    }

    return skipAndReset508Flag
  }

  private a11yFocusOnBtnRefWhenPopupClosed (uiMode: UiMode, prevState) {
    if (uiMode === UiMode.Popup && (!this.state.isPopupOpen && prevState.isPopupOpen)) {
      this.btnRef?.current.focus()
    }
  }

  private a11yHandlers (prevState: State) {
    if (this.props.config.uiMode === UiMode.Popup) {
      // 1.Popup mode
      // 1.1 open popper
      if (this.state.isPopupOpen && !prevState.isPopupOpen) {
        this.setState({
          a11yPopperAutoFocus: true
        })
      }
      // 1.2 item switch
      if (this.state.shownItem !== prevState.shownItem) {
        // popup-content back to main-content
        if (this.state.shownItem === null && prevState.shownItem !== null) {
          this.setState({
            a11yFocusElement: prevState.shownItem,
            a11yPopperAutoFocus: false
          })
        } else {
          this.setState({
            a11yFocusElement: null,
            a11yPopperAutoFocus: true
          })
        }
      }
    } else {
      // 2.Inline mode
      if (this.state.shownItem !== prevState.shownItem) { //item switch
        this.setState({
          a11yPopperAutoFocus: true,
          a11yFocusElement: prevState.shownItem
        })
      }
    }
  }
}
