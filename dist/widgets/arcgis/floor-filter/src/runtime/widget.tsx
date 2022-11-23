/** @jsx jsx */
import { React, AllWidgetProps, jsx } from 'jimu-core'
import { IMConfig } from '../config'
import defaultMessages from './translations/default'
import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis'
import FloorFilter from 'esri/widgets/FloorFilter'
import './style.css'

interface State {
  hadMap: boolean
  jimuMapView: JimuMapView
  wasMounted: boolean
}

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, State> {
  coreWidget: FloorFilter
  coreContainer: HTMLElement
  vwOriginalFloors: __esri.Collection<string>
  vwHeightHandle: any
  vwWidthHandle: any

  constructor (props: any) {
    super(props)
    this.state = {
      hadMap: false,
      jimuMapView: null,
      wasMounted: false
    }
  }

  clearHandles = (handles): void => {
    if (Array.isArray(handles)) {
      handles.forEach((h) => {
        try {
          if (h) h.remove()
        } catch (ex) {
          console.error(ex)
        }
      })
    }
  }

  componentDidMount () {
    this.setState({
      wasMounted: true
    })
  }

  componentDidUpdate (prevProps: AllWidgetProps<IMConfig>, prevState: State): void {
    const state: State = this.state
    const props: AllWidgetProps<IMConfig> = this.props
    if (state.wasMounted && !prevState.wasMounted) {
      this.loadCoreWidget()
    } else if (state.jimuMapView !== prevState.jimuMapView) {
      if (state.wasMounted) this.loadCoreWidget()
    } else if (props.config.longNames !== prevProps.config.longNames) {
      if (this.coreWidget) {
        this.coreWidget.longNames = !!props.config.longNames
      }
    } else if (props.config.position !== prevProps.config.position) {
      if (this.coreWidget) {
        this.coreWidget.scheduleRender()
      }
    }
  }

  componentWillUnmount (): void {
    this.destroyCoreWidget()
  }

  destroyCoreWidget () {
    if (this.coreWidget) {
      const view = this.coreWidget.view
      this.coreWidget.destroy()
      this.coreWidget = null
      if (view) {
        view.floors = this.vwOriginalFloors || null
      }
    }
    if (this.vwHeightHandle) {
      this.clearHandles([this.vwHeightHandle])
      this.vwHeightHandle = null
    }
    if (this.vwWidthHandle) {
      this.clearHandles([this.vwWidthHandle])
      this.vwWidthHandle = null
    }
  }

  fixBreakpoints (type: String) {
    // the core widget is expecting to be within the view.ui,
    // it's watching the view size to determine if it can be expanded (longNames),
    // we need to work around that

    // ExB html element class names: size-mode-LARGE size-mode-MEDIUM size-mode-SMALL
    // view beakpoint sizes: xsmall small medium large xlarge

    setTimeout(() => {
      const vm: any = this.coreWidget?.viewModel
      let size = 'large'
      try {
        if (document.documentElement.classList.contains('size-mode-MEDIUM')) {
          size = 'medium'
        } else if (document.documentElement.classList.contains('size-mode-SMALL')) {
          size = 'xsmall'
        }
      } catch (ex) {
        console.error(ex)
      }
      if (vm && (type === 'both' || type === 'widthBreakpoint')) {
        vm._viewWidthBreakpoint = size
      }
      if (vm && (type === 'both' || type === 'heightBreakpoint')) {
        vm._viewHeightBreakpoint = size
      }
    }, 100)
  }

  handleActiveViewChange = (jimuMapView: JimuMapView): void => {
    this.setState({
      hadMap: !!(this.state.hadMap || jimuMapView?.view?.map),
      jimuMapView: jimuMapView
    })
  }

  hasFloorInfo = (): boolean => {
    return !!((this.state.jimuMapView?.view?.map as any)?.floorInfo)
  }

  hasMap = (): boolean => {
    return !!(this.state.jimuMapView?.view?.map)
  }

  loadCoreWidget () {
    if (this.coreContainer) {
      const hasFloorInfo = this.hasFloorInfo()
      if (hasFloorInfo) {
        this.destroyCoreWidget()
        const coreNode = document.createElement('div')
        //coreNode.setAttribute('class', 'w-100 h-100')
        this.coreContainer.appendChild(coreNode)
        const longNames = !!this.props.config.longNames
        const view = this.state.jimuMapView.view
        this.coreWidget = new FloorFilter({
          container: coreNode,
          longNames: longNames,
          view: view
        })

        // the core widget is expecting to be part of the view-ui,
        // we need to override this function
        // @ts-expect-error
        this.coreWidget._getComponentPosition = () => {
          return this.props.config.position || 'top-left'
        }

        this.vwOriginalFloors = (view.floors && view.floors.clone())
        this.fixBreakpoints('both')
        this.vwWidthHandle = view.watch('widthBreakpoint', () => {
          this.fixBreakpoints('widthBreakpoint')
        })
        this.vwWidthHandle = view.watch('heightBreakpoint', () => {
          this.fixBreakpoints('heightBreakpoint')
        })
      } else {
        this.destroyCoreWidget()
      }
    }
  }

  nls = (id: string, values?: any): string => {
    if (this.props.intl) {
      return this.props.intl.formatMessage({
        id: id,
        defaultMessage: defaultMessages[id]
      }, values)
    }
    return id
  }

  render (): any {
    const lbl = this.props.config.displayLabel ? this.props.label : null
    const hasMap = this.hasMap()
    const hasFloorInfo = this.hasFloorInfo()

    let msg: string
    const msgClass = 'widget-floorfilter-msg'
    if (!hasMap) {
      msg = this.nls('floorfilter_noMap')
    } else if (!hasFloorInfo) {
      msg = this.nls('floorfilter_notFloorAware')
    }

    let className = 'jimu-widget widget-floorfilter'
    if (msg) className += ' widget-floorfilter-nomap'

    return (
      <div className={className}>
        <h4 className='widget-floorfilter-header' style={{ display: lbl ? 'block' : 'none' }}>
          {lbl}
        </h4>
        <div className={msgClass} style={{ display: msg ? 'block' : 'none' }}>
          <span className="esri-icon esri-icon-urban-model"></span>
          <span style={{ margin: '0 8px' }}>{msg}</span>
        </div>
        <div className='widget-floorfilter-container'
          ref={ref => { this.coreContainer = ref }}>
        </div>
        <JimuMapViewComponent
          useMapWidgetId={this.props.useMapWidgetIds?.[0]}
          onActiveViewChange={this.handleActiveViewChange}
        />
      </div>
    )
  }
}
