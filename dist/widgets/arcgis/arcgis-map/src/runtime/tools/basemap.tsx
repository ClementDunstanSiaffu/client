import { React } from 'jimu-core'
import { BaseTool, BaseToolProps, IconType } from '../layout/base/base-tool'
import { loadArcGISJSAPIModules, JimuMapView } from 'jimu-arcgis'
import { defaultMessages } from 'jimu-ui'

export default class BaseMap extends BaseTool<BaseToolProps, unknown> {
  toolName = 'BaseMap'

  getTitle () {
    return this.props.intl.formatMessage({ id: 'BaseMapLabel', defaultMessage: defaultMessages.BaseMapLabel })
  }

  getIcon (): IconType {
    return {
      icon: require('../assets/icons/basemap.svg')
    }
  }

  getExpandPanel (): JSX.Element {
    return <BaseMapInner jimuMapView={this.props.jimuMapView} isMobile={this.props.isMobile} />
  }
}

interface BaseMapInnerProps {
  jimuMapView: JimuMapView
  isMobile: boolean
}

interface BaseMapInnerState {
  apiLoaded: boolean
}

class BaseMapInner extends React.PureComponent<BaseMapInnerProps, BaseMapInnerState> {
  BaseMap: typeof __esri.BasemapGallery = null
  BaseMapBtn: __esri.BasemapGallery
  container: HTMLElement

  constructor (props) {
    super(props)

    this.state = {
      apiLoaded: false
    }
  }

  componentDidMount () {
    if (!this.state.apiLoaded) {
      loadArcGISJSAPIModules(['esri/widgets/BasemapGallery']).then(modules => {
        [this.BaseMap] = modules
        this.setState({
          apiLoaded: true
        })
      })
    }
  }

  componentDidUpdate (prevProps: BaseMapInnerProps) {
    if (this.state.apiLoaded && this.container) {
      if (prevProps.jimuMapView && this.props.jimuMapView && (prevProps.jimuMapView.id !== this.props.jimuMapView.id)) {
        if (this.BaseMapBtn) {
          this.BaseMapBtn.view = this.props.jimuMapView.view
          this.BaseMapBtn.renderNow()
        }
      } else {
        this.BaseMapBtn = new this.BaseMap({
          container: this.container,
          view: this.props.jimuMapView.view
        })

        this.props.jimuMapView.deleteJimuMapTool('BaseMap')
        this.props.jimuMapView.addJimuMapTool({
          name: 'BaseMap',
          instance: this.BaseMapBtn
        })
      }
    }
  }

  componentWillUnmount () {
    if (this.BaseMapBtn) {
      this.BaseMapBtn.destroy()
      this.BaseMapBtn = null
      this.props.jimuMapView.deleteJimuMapTool('BaseMap')
    }
  }

  render () {
    if (this.props.isMobile) {
      return (
        <div className='basemap-map-tool' ref={ref => { this.container = ref }} style={{ width: '100%', minHeight: '32px', maxWidth: 'none', maxHeight: 'none', overflowY: 'auto', position: 'relative' }}>
          {!this.state.apiLoaded && <div className='exbmap-basetool-loader' />}
        </div>
      )
    } else {
      return (
        <div
          ref={ref => { this.container = ref }} style={{ width: '250px', minHeight: '32px', position: 'relative' }}
          className='exbmap-ui-pc-expand-maxheight basemap-map-tool'
        >
          {!this.state.apiLoaded && <div className='exbmap-basetool-loader' />}
        </div>
      )
    }
  }
}
