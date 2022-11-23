import { React } from 'jimu-core'
import { BaseTool, BaseToolProps, IconType } from '../layout/base/base-tool'
import { loadArcGISJSAPIModules, JimuMapView } from 'jimu-arcgis'

export default class ScaleBar extends BaseTool<BaseToolProps, unknown> {
  toolName = 'ScaleBar'

  getTitle () {
    return 'ScaleBar'
  }

  getIcon (): IconType {
    return null
  }

  getExpandPanel (): JSX.Element {
    return <ScaleBarInner jimuMapView={this.props.jimuMapView} />
  }
}

interface ScaleBarInnerProps {
  jimuMapView: JimuMapView
}

interface ScaleBarInnerState {
  apiLoaded: boolean
}

class ScaleBarInner extends React.PureComponent<ScaleBarInnerProps, ScaleBarInnerState> {
  ScaleBar: typeof __esri.ScaleBar = null
  ScaleBarBtn: __esri.ScaleBar
  container: HTMLElement

  constructor (props) {
    super(props)

    this.state = {
      apiLoaded: false
    }
  }

  componentDidMount () {
    if (!this.state.apiLoaded) {
      loadArcGISJSAPIModules(['esri/widgets/ScaleBar']).then(modules => {
        [this.ScaleBar] = modules
        this.setState({
          apiLoaded: true
        })
      })
    }
  }

  componentDidUpdate () {
    if (this.state.apiLoaded && this.container) {
      if (this.ScaleBarBtn) {
        this.container.innerHTML = ''
      }

      this.ScaleBarBtn = new this.ScaleBar({
        container: this.container,
        view: this.props.jimuMapView.view,
        unit: 'dual'
      })

      this.props.jimuMapView.deleteJimuMapTool('ScaleBar')
      this.props.jimuMapView.addJimuMapTool({
        name: 'ScaleBar',
        instance: this.ScaleBarBtn
      })
    }
  }

  componentWillUnmount () {
    if (this.ScaleBarBtn) {
      this.ScaleBarBtn.destroy()
      this.ScaleBarBtn = null
      this.props.jimuMapView.deleteJimuMapTool('ScaleBar')
    }
  }

  render () {
    return <div className='scalebar-map-tool' ref={ref => { this.container = ref }} />
  }
}
