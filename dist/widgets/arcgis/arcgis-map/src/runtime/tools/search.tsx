/** @jsx jsx */
import { React, css, jsx, getAppStore, MessageManager, LocationChangeMessage } from 'jimu-core'
import { BaseTool, BaseToolProps, IconType } from '../layout/base/base-tool'
import { loadArcGISJSAPIModules, JimuMapView, zoomToUtils } from 'jimu-arcgis'
import { defaultMessages } from 'jimu-ui'

export default class Search extends BaseTool<BaseToolProps, unknown> {
  toolName = 'Search'

  getTitle () {
    return this.props.intl.formatMessage({ id: 'SearchLabel', defaultMessage: defaultMessages.SearchLabel })
  }

  getIcon (): IconType {
    return {
      icon: require('../assets/icons/search.svg')
    }
  }

  getExpandPanel (): JSX.Element {
    if (this.props.isMobile) {
      return (
        <div style={{ minHeight: '32px', position: 'relative', width: '100%' }}>
          <SearchInner jimuMapView={this.props.jimuMapView} mapWidgetId={this.props.mapWidgetId} />
        </div>
      )
    } else {
      return (
        <div style={{ minWidth: '250px', minHeight: '32px', position: 'relative' }}>
          <SearchInner jimuMapView={this.props.jimuMapView} mapWidgetId={this.props.mapWidgetId} />
        </div>
      )
    }
  }
}

interface SearchInnerProps {
  jimuMapView: JimuMapView
  mapWidgetId: string
}

interface SearchInnerState {
  apiLoaded: boolean
}

class SearchInner extends React.PureComponent<SearchInnerProps, SearchInnerState> {
  Search: typeof __esri.widgetsSearch = null
  Portal: typeof __esri.Portal = null
  SearchBtn: __esri.widgetsSearch
  container: HTMLElement

  constructor (props) {
    super(props)

    this.state = {
      apiLoaded: false
    }
  }

  getStyle () {
    return css`
      /* border: solid 1px rgba(110,110,110,0.3); */
    `
  }

  componentDidMount () {
    if (!this.state.apiLoaded) {
      loadArcGISJSAPIModules(['esri/widgets/Search', 'esri/portal/Portal']).then(modules => {
        [this.Search, this.Portal] = modules
        this.setState({
          apiLoaded: true
        })
      })
    }
  }

  componentDidUpdate () {
    if (this.state.apiLoaded && this.container) {
      if (this.SearchBtn) {
        this.container.innerHTML = ''
      }

      this.SearchBtn = new this.Search({
        container: this.container,
        view: this.props.jimuMapView.view,
        portal: new this.Portal({
          url: getAppStore().getState().portalUrl
        })
      })

      this.props.jimuMapView.deleteJimuMapTool('Search')
      this.props.jimuMapView.addJimuMapTool({
        name: 'Search',
        instance: this.SearchBtn
      })

      this.SearchBtn.on('select-result', (event) => {
        // use zoomToUtils to instead of default zoom for searing result with single point
        if (event?.result?.feature?.layer && event?.result?.feature?.geometry?.type === 'point') {
          zoomToUtils.zoomTo(this.props.jimuMapView.view, [event.result.feature], {})
        }

        if (!event.result.feature.layer) {
          const geometry = event.result.feature.geometry.toJSON()
          MessageManager.getInstance().publishMessage(new LocationChangeMessage(this.props.mapWidgetId, geometry))
        } else {
          const geometry = event.result.feature.geometry
          if (geometry.type === 'point') {
            MessageManager.getInstance().publishMessage(new LocationChangeMessage(this.props.mapWidgetId, geometry.toJSON()))
          } else {
            const point = geometry.extent.center
            MessageManager.getInstance().publishMessage(new LocationChangeMessage(this.props.mapWidgetId, point.toJSON()))
          }
        }
      })
    }
  }

  componentWillUnmount () {
    if (this.SearchBtn) {
      this.SearchBtn.destroy()
      this.SearchBtn = null
      this.props.jimuMapView.deleteJimuMapTool('Search')
    }
  }

  render () {
    return (
      <div css={this.getStyle()} className='w-100 search-map-tool' ref={ref => { this.container = ref }}>
        {!this.state.apiLoaded && <div className='exbmap-basetool-loader' />}
      </div>
    )
  }
}
