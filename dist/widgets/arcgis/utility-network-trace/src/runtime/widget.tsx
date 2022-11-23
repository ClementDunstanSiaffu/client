/** @jsx jsx */
import { React, AllWidgetProps, Immutable, jsx } from 'jimu-core'
import {
  JimuMapViewComponent,
  JimuMapView
} from 'jimu-arcgis'
import { WidgetPlaceholder } from 'jimu-ui'
import { IMConfig } from '../config'
import WidgetModel from './widget-model'
import defaultMessages from './translations/default'
import { getStyle } from './lib/style'
import traceIcon from 'jimu-icons/svg/outlined/brand/widget-utility-network-trace.svg'

export default class Widget extends React.PureComponent<
AllWidgetProps<IMConfig>,
any
> {
  constructor (props) {
    super(props)
    this.state = {
      jmv: null,
      unt: null,
      hasMapWidget: this.props.config.useMapWidget ? this.props.config.useMapWidget : false
    }
  }

  dsRef = React.createRef<HTMLDivElement>();
  viewModel = WidgetModel.getInstance();
  defaultColor = {
    color: [255, 255, 0, 0.6],
    haloOpacity: 0.9,
    fillOpacity: 0.2,
    hex: '#FFFF00'
  };

  onActiveViewChange = (jimuMapView: JimuMapView) => {
    this.viewModel.loadPropsFromView(this.props)
    if (jimuMapView !== null) {
      if (this.state.unt !== null) {
        if (this.state.unt.viewModel._unObject !== null) {
          this.viewModel.clearAll()
          this.state.unt.destroy()
        } else {
          this.state.unt.destroy()
          if (this.dsRef.current !== null) {
            while (this.dsRef.current.firstChild) {
              this.dsRef.current.removeChild(this.dsRef.current.firstChild)
            }
          }
        }
      }
      this.setState({ unt: null, jmv: null }, () => {
        const newDiv = document.createElement('div')
        const currDiv = document.getElementById(this.props.widgetId + '_trace')
        if (currDiv === null) {
          const newContainer = document.createElement('div')
          newContainer.id = this.props.widgetId + '_trace'
          const parentContainer = document.getElementById(this.props.widgetId + '_trace_widget')
          parentContainer.appendChild(newContainer)
          newContainer.appendChild(newDiv)
        } else {
          currDiv.appendChild(newDiv)
        }
        const un = this.viewModel.loadTraceWidgetFromAPI(jimuMapView, newDiv)
        this.setState({ unt: un })
      })
      this.setState({ jmv: jimuMapView })
    } else {
      if (this.state.unt !== null) {
        if (this.state.unt.viewModel._unObject !== null) {
          this.viewModel.callResetOnJSWidget()
          this.viewModel.clearAll()
          this.state.unt.destroy()
        }
      } else {
        this.state.unt.destroy()
        if (this.dsRef.current !== null) {
          while (this.dsRef.current.firstChild) {
            this.dsRef.current.removeChild(this.dsRef.current.firstChild)
          }
        }
      }
      this.setState({ unt: null, jmv: null })
    }
  };

  componentDidUpdate (preProps, preState) {
    if (window.jimuConfig.isInBuilder) {
      if (this.state.jmv !== null) {
        if (this.state.unt !== null) {
          const selectedTraces = []
          //let showGraphicsOnComplete = true
          //let showSelectedFeatureList = true
          //let selectFeaturesOnComplete = true
          /*
          let graphicsColor: GraphicColor = {
            color: [255, 255, 0, 0.6],
            haloOpacity: 0.9,
            fillOpacity: 0.2,
            hex: '#FFFF00'
          }
          */
          const untInputProps = []
          if (Object.prototype.hasOwnProperty.call(this.props.config, 'configInfo')) {
            this.props.config.configInfo.forEach((ci) => {
              ci.traceSettings.forEach((ts) => {
                if (ts.selected) {
                  selectedTraces.push(ts.globalId)
                }
                /*
                showGraphicsOnComplete =
                  ts.traceResultSettings.showGraphicsOnComplete
                showSelectedFeatureList =
                  ts.traceResultSettings.showSelectedFeatureList
                selectFeaturesOnComplete =
                  ts.traceResultSettings.selectFeaturesOnComplete
                graphicsColor = Immutable.asMutable(
                  Immutable(ts.traceResultSettings.graphicsColor),
                  {
                    deep: true
                  }
                )
                */
              })

              if (ci.inputSettings.length > 0) {
                ci.inputSettings.forEach((is) => {
                  const symbolClean = Immutable.asMutable(
                    Immutable(is.inputSymbol),
                    {
                      deep: true
                    }
                  )
                  delete symbolClean.defaultPointSymbol.imageData
                  symbolClean.defaultPointSymbol.type = 'picture-marker'
                  untInputProps.push({
                    label: is.label,
                    description: is.description,
                    type: is.type,
                    symbol: symbolClean.defaultPointSymbol
                  })
                })
              }
            })

            //let unt = Immutable.asMutable(Immutable(this.state.unt), {
            //  deep: true,
            //});
            //this.state.unt.selectOnComplete = selectFeaturesOnComplete
            //this.state.unt.showGraphicsOnComplete = showGraphicsOnComplete
            //this.state.unt.showSelectionAttributes = showSelectedFeatureList
            //this.state.unt.defaultGraphicColor = graphicsColor
            //this.state.unt.selectedTraces = selectedTraces
            //this.state.unt.inputSettings = untInputProps

            this.setState({ unt: this.state.unt, hasMapWidget: true })
          }
        }
      } else {
        this.setState({ hasMapWidget: false }, () => {
          this.viewModel.callResetOnJSWidget()
          this.viewModel.clearAll()
        })
      }
    }
  }

  componentDidMount () {
    if (this.state.jmv !== null) {
      const un = this.viewModel.loadTraceWidgetFromAPI(this.state.jmv, this.dsRef)
      this.setState({ unt: un })
    }
  }

  componentWillUnmount = () => {
    //clear flags and graphics
    this.viewModel.clearAll()
  }

  render () {
    return (
      <div css={getStyle(this.props.theme, this.props.config)} id={this.props.widgetId + '_trace_widget'}>
        {this.state.hasMapWidget
          ? <div id={this.props.widgetId + '_trace'} ref={this.dsRef}></div>
          : <WidgetPlaceholder icon={traceIcon} message={this.props.intl.formatMessage({ id: '_widgetLabel', defaultMessage: defaultMessages._widgetLabel })} widgetId={this.props.id} />
        }
        {this.props.config.useMapWidget &&
        <JimuMapViewComponent
          useMapWidgetId={this.props.useMapWidgetIds?.[0]}
          onActiveViewChange={this.onActiveViewChange}
        />
        }
      </div>
    )
  }
}
