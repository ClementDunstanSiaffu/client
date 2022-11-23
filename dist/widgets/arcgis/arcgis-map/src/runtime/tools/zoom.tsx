import { React } from 'jimu-core'
import { BaseTool, BaseToolProps, IconType } from '../layout/base/base-tool'
import { loadArcGISJSAPIModules, JimuMapView } from 'jimu-arcgis'
import { defaultMessages } from 'jimu-ui'

export default class Zoom extends BaseTool<BaseToolProps, unknown> {
  toolName = 'Zoom'

  getTitle () {
    return this.props.intl.formatMessage({ id: 'ZoomLabel', defaultMessage: defaultMessages.ZoomLabel })
  }

  getIcon (): IconType {
    return null
  }

  getExpandPanel (): JSX.Element {
    return <ZoomInner jimuMapView={this.props.jimuMapView} />
  }
}

interface ZoomInnerProps {
  jimuMapView: JimuMapView
}

interface ZoomInnerState {
  apiLoaded: boolean
}

class ZoomInner extends React.PureComponent<ZoomInnerProps, ZoomInnerState> {
  Zoom: typeof __esri.Zoom = null
  ZoomBtn: __esri.Zoom
  container: HTMLElement

  constructor (props) {
    super(props)

    this.state = {
      apiLoaded: false
    }
  }

  componentDidMount () {
    if (!this.state.apiLoaded) {
      loadArcGISJSAPIModules(['esri/widgets/Zoom']).then(modules => {
        [this.Zoom] = modules
        this.setState({
          apiLoaded: true
        })
      })
    }
  }

  componentDidUpdate () {
    if (this.state.apiLoaded && this.container) {
      if (this.ZoomBtn) {
        this.container.innerHTML = ''
      }

      this.ZoomBtn = new this.Zoom({
        container: this.container,
        view: this.props.jimuMapView.view
      })

      this.props.jimuMapView.deleteJimuMapTool('Zoom')
      this.props.jimuMapView.addJimuMapTool({
        name: 'Zoom',
        instance: this.ZoomBtn
      })
    }
  }

  componentWillUnmount () {
    if (this.ZoomBtn) {
      this.ZoomBtn.destroy()
      this.ZoomBtn = null
      this.props.jimuMapView.deleteJimuMapTool('Zoom')
      /**
       * TODO
       * When the map widget has two maps, the "componentWillUnmount" is called only for the current active view,
       * so the another view's mapTool is not cleared.
       */
    }
  }

  render () {
    return <div className='zoom-map-tool' ref={ref => { this.container = ref }} />
  }
}
