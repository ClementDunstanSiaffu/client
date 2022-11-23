import { React } from 'jimu-core'
import { BaseTool, BaseToolProps, IconType } from '../layout/base/base-tool'
import { loadArcGISJSAPIModules, JimuMapView } from 'jimu-arcgis'

export default class Navigation extends BaseTool<BaseToolProps, unknown> {
  toolName = 'Navigation'

  getTitle () {
    return 'Navigation'
  }

  getIcon (): IconType {
    return null
  }

  getExpandPanel (): JSX.Element {
    return <NavigationInner jimuMapView={this.props.jimuMapView} />
  }
}

interface NavigationInnerProps {
  jimuMapView: JimuMapView
}

interface NavigationInnerState {
  apiLoaded: boolean
}

class NavigationInner extends React.PureComponent<NavigationInnerProps, NavigationInnerState> {
  Navigation: typeof __esri.NavigationToggle = null
  NavigationBtn: __esri.NavigationToggle
  container: HTMLElement

  constructor (props) {
    super(props)

    this.state = {
      apiLoaded: false
    }
  }

  componentDidMount () {
    if (!this.state.apiLoaded) {
      loadArcGISJSAPIModules(['esri/widgets/NavigationToggle']).then(modules => {
        [this.Navigation] = modules
        this.setState({
          apiLoaded: true
        })
      })
    }
  }

  componentDidUpdate () {
    if (this.state.apiLoaded && this.container) {
      if (this.NavigationBtn) {
        this.container.innerHTML = ''
      }

      this.NavigationBtn = new this.Navigation({
        container: this.container,
        view: this.props.jimuMapView.view
      })

      this.props.jimuMapView.deleteJimuMapTool('Navigation')
      this.props.jimuMapView.addJimuMapTool({
        name: 'Navigation',
        instance: this.NavigationBtn
      })
    }
  }

  componentWillUnmount () {
    if (this.NavigationBtn) {
      this.NavigationBtn.destroy()
      this.NavigationBtn = null
      this.props.jimuMapView.deleteJimuMapTool('Navigation')
    }
  }

  render () {
    return <div className='navigation-map-tool' ref={ref => { this.container = ref }} />
  }
}
