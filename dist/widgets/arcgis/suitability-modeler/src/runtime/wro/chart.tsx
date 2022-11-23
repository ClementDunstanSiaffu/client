/** @jsx jsx */
/**
  Licensing

  Copyright 2021 Esri

  Licensed under the Apache License, Version 2.0 (the "License"); You
  may not use this file except in compliance with the License. You may
  obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
  implied. See the License for the specific language governing
  permissions and limitations under the License.

  A copy of the license is available in the repository's
  LICENSE file.
*/

import { React, jsx } from 'jimu-core'
import { WroModel } from './wro-model'
import chartUtils from 'esri/widgets/support/chartUtils'

interface State {
  needsRefresh: boolean
}

export class WroChart extends React.PureComponent<any, State> {
  am4chartsModule: any
  chartRef: any
  pieChart: any

  constructor (props: any) {
    super(props)
    this.chartRef = React.createRef()
    this.state = {
      needsRefresh: false
    }
  }

  componentDidMount (): void {
    this.initChart()
  }

  componentDidUpdate (prevProps: any): void {
    const wroModel: WroModel = this.props.wroModel
    const prevWroModel: WroModel = prevProps.wroModel
    const isChartPanel = wroModel && (wroModel.activePanel === 'chart-panel')
    const wasChartPanel = prevWroModel && (prevWroModel.activePanel === 'chart-panel')

    let data
    if (prevProps.histogramData !== this.props.histogramData) {
      data = []
      const histogramData = this.props.histogramData
      if (histogramData?.colorCounts &&
          histogramData.colorCounts.length > 0) {
        histogramData.colorCounts.forEach(cc => {
          const fillColor = 'rgb(' + cc.rgb[0].toString() + ',' + cc.rgb[1].toString() + ',' + cc.rgb[2].toString() + ')'
          const item = {
            label: cc.label,
            value: cc.count,
            fillColor: fillColor
          }
          data.push(item)
        })
      }
      if (this.pieChart) {
        this.pieChart.data = data
      }
    }

    if (prevProps.wroStatus.themeId !== this.props.wroStatus.themeId) {
      if (!data) data = this.pieChart?.data
      this.initChart(data)
    }

    if (isChartPanel && !wasChartPanel && this.state.needsRefresh) {
      if (this.pieChart) {
        this.pieChart.invalidateRawData()
        this.pieChart.legend.deepInvalidate()
      }
      this.setState({ needsRefresh: false })
    }
    if (!isChartPanel && wasChartPanel && !this.state.needsRefresh) {
      this.setState({ needsRefresh: true })
    }
  }

  componentWillUnmount (): void {
    if (this.pieChart) {
      this.pieChart.dispose()
      this.pieChart = null
    }
  }

  initChart = async (data?: any): Promise<any> => {
    try {
      let am4chartsModule = this.am4chartsModule
      if (!am4chartsModule) {
        am4chartsModule = this.am4chartsModule = await chartUtils.loadChartsModule()
      }
      if (this.pieChart) {
        try {
          this.pieChart.dispose()
          this.pieChart = null
        } catch (ex) {
          console.error(ex)
        }
      }
      const { am4core, am4charts } = am4chartsModule

      const theme = this.props.wroContext.getTheme()
      if (theme?.darkTheme) {
        am4core.useTheme(am4chartsModule.am4themes_dark)
      } else {
        am4core.unuseTheme(am4chartsModule.am4themes_dark)
      }

      const isRTL = !!(document?.documentElement?.dir === 'rtl')
      const locale = document?.documentElement?.lang

      let toolTipText = '{category} {value.percent.formatNumber(\'#.00\')}%'
      const labelText = '{category}'
      let valueText = '{value.percent.formatNumber(\'#.00\')}%'
      if (locale === 'ar') {
        valueText = '%{value.percent.formatNumber(\'#.00\')}'
      }
      if (locale === 'tr') {
        toolTipText = '{category} %{value.percent.formatNumber(\'#.00\')}'
        valueText = '%{value.percent.formatNumber(\'#.00\')}'
      }

      const pieChart = am4core.create(this.chartRef.current, am4charts.PieChart)
      pieChart.rtl = isRTL
      pieChart.radius = am4core.percent(90)
      const pieSeries = pieChart.series.push(new am4charts.PieSeries())
      pieSeries.dataFields.value = 'value'
      pieSeries.dataFields.category = 'label'
      pieSeries.slices.template.propertyFields.fill = 'fillColor'
      pieSeries.labels.template.disabled = true
      pieSeries.ticks.template.disabled = true
      pieSeries.slices.template.tooltipText = toolTipText
      pieSeries.legendSettings.labelText = labelText
      pieSeries.legendSettings.valueText = valueText
      const legend = pieChart.legend = new am4charts.Legend()
      legend.position = 'bottom'
      legend.maxHeight = 130
      legend.maxWidth = 340
      legend.scrollable = true
      legend.layout = 'vertical' // vertical horizontal grid
      legend.valueLabels.template.align = 'right'
      legend.valueLabels.template.textAlign = 'end'
      // legend.fontSize = 10
      // pieChart.seriesContainer.align = 'left'
      // legend.align = "middle"
      // legend.contentAlign = 'left'
      if (isRTL) {
        legend.reverseOrder = true
        legend.itemContainers.template.reverseOrder = true
      }
      const markerTemplate = legend.markers.template
      markerTemplate.width = 15
      markerTemplate.height = 15

      // remove default click behaviors
      const slice = pieSeries.slices.template
      //slice.states.getKey('hover').properties.scale = 1 // keep the hover behavior
      slice.states.getKey('active').properties.shiftRadius = 0
      legend.itemContainers.template.clickable = false
      legend.itemContainers.template.focusable = false
      legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default

      if (data) pieChart.data = data
      this.pieChart = pieChart
    } catch (ex) {
      console.error('Error creating chart', ex)
    }
  }

  render (): any {
    return (
      <div ref={this.chartRef} className='widget-wro-chart-component'></div>
    )
  }

  /*
    Had trouble getting the jimu-ui/advanced/chart pie series to work,
    couldn't dynamically change the colors. Switched to am4charts, provided by the JSAPI.

    We'll keep this code as a starting point for future implementation
    import { Chart } from 'jimu-ui/advanced/chart'
  */
  // render (): any {
  //   const config: any =
  //   {
  //     version: '1.0.0',
  //     type: 'chart',
  //     id: 'WroChart',
  //     dataSource: null,
  //     background: [255, 255, 255, 0], // transparent
  //     series: [
  //       {
  //         type: 'pieSeries',
  //         id: 'WroSeries',
  //         name: 'WroSeries',
  //         innerRadius: 10,
  //         startAngle: 30,
  //         endAngle: 390,
  //         x: 'label',
  //         y: 'value',
  //         dataLabels: {
  //           type: 'chartText',
  //           visible: false,
  //           content: {
  //             type: 'esriTS',
  //             color: [0, 0, 0, 255],
  //             font: {
  //               family: 'Avenir Next W01, Avenir Next W00, Avenir Next, Avenir, Helvetica Neue, sans-serif',
  //               size: 12,
  //               style: 'normal',
  //               weight: 'normal'
  //             },
  //             text: ''
  //           }
  //         },
  //         fillSymbol: {
  //           type: 'esriSFS',
  //           style: 'esriSFSSolid',
  //           color: 'red', // [116, 184, 223, 200]
  //           outline: {
  //             type: 'esriSLS',
  //             style: 'esriSLSSolid',
  //             color: [255, 255, 255, 200],
  //             width: 1
  //           }
  //         },
  //         colorType: 'colorMatch' // singleColor
  //       }
  //     ],
  //     legend: {
  //       type: 'chartLegend',
  //       visible: true,
  //       title: {
  //         type: 'chartText',
  //         visible: false,
  //         content: {
  //           type: 'esriTS',
  //           color: [0, 0, 0, 255],
  //           text: '',
  //           font: {
  //             family: 'Avenir Next W01, Avenir Next W00, Avenir Next, Avenir, Helvetica Neue, sans-serif',
  //             size: 12,
  //             style: 'normal',
  //             weight: 'normal',
  //             decoration: 'none'
  //           },
  //           horizontalAlignment: 'center'
  //         }
  //       },
  //       body: {
  //         type: 'esriTS',
  //         color: [0, 0, 0, 255], // need a theme font color
  //         font: {
  //           family: 'Avenir Next W01, Avenir Next W00, Avenir Next, Avenir, Helvetica Neue, sans-serif',
  //           size: 12,
  //           style: 'normal',
  //           weight: 'normal'
  //         },
  //         text: ''
  //       },
  //       position: 'bottom'
  //     }
  //   }
  //   const chartDataSource: any = {
  //     type: 'inline',
  //     data: [],
  //     processed: true
  //   }
  //   config.dataSource = chartDataSource
  //   const data = []
  //   const histogramData = this.props.histogramData
  //   if (histogramData?.colorCounts &&
  //       histogramData.colorCounts.length > 0) {
  //     chartDataSource.configFields = {
  //       fillColor: 'fillColor',
  //       displayLabel: 'displayLabel'
  //     }
  //     histogramData.colorCounts.forEach(cc => {
  //       const item = {
  //         label: cc.label,
  //         value: cc.count,
  //         fillColor: [99, 99, 99, 99],
  //         displayLabel: 'ddd'
  //       }
  //       data.push(item)
  //     })
  //   }
  //   config.dataSource.data = data
  //   // console.log('histogramData', histogramData)
  //   // console.log('config', config)
  //   return (
  //     <div className='widget-wro-chart-component'>
  //       <Chart config={config} data={data} />
  //     </div>
  //   )
  // }
}
