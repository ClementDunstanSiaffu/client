import {
  React,
  ImmutableArray,
  UseDataSource,
  ImmutableObject,
  IMFeatureLayerQueryParams
} from 'jimu-core'
import {
  SettingSection,
  SettingRow,
  SettingCollapse
} from 'jimu-ui/advanced/setting-components'
import {
  IWebChart,
  WebChartSeries,
  ChartDataSource
} from '../../../../../config'
import { hooks, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { defaultMessages as jimuBuilderDefaultMessage } from 'jimu-for-builder'
import { WebChartAxis } from 'jimu-ui/advanced/chart'
import defaultMessages from '../../../../translations/default'
import { ChartSettingSection } from '../../type'
import HistogramData, { isOverlaysVisible } from './data'
import { AppearanceSetting } from '../common-sections/appearance'
import { NumericAxes } from '../common-sections/axes'
import { XYGeneralSetting } from '../common-sections/genaral'
import { getSerialSeriesRotated } from '../../../../../utils/common/serial'

interface HistogramSettingProps {
  section: ChartSettingSection
  webChart: ImmutableObject<IWebChart>
  useDataSources: ImmutableArray<UseDataSource>
  onSectionChange: (section: ChartSettingSection) => void
  onWebChartChange: (
    webChart: ImmutableObject<IWebChart>,
    query?: IMFeatureLayerQueryParams
  ) => void
}

const HistogramSetting = (
  props: HistogramSettingProps
): React.ReactElement => {
  const {
    section,
    webChart: propWebChart,
    useDataSources,
    onSectionChange,
    onWebChartChange
  } = props

  const translate = hooks.useTranslate(
    defaultMessages,
    jimuiDefaultMessage,
    jimuBuilderDefaultMessage
  )
  const rotated = getSerialSeriesRotated(propWebChart?.series)
  const legendValid = isOverlaysVisible(propWebChart.series)
  const handleSeriesChange = (
    series: ImmutableArray<WebChartSeries>,
    chartDataSource?: ImmutableObject<ChartDataSource>,
    overlaysVisible?: boolean
  ) => {
    let webChart
    let query
    if (chartDataSource) {
      webChart = propWebChart
        .set('dataSource', chartDataSource)
        .set('series', series)
      if (chartDataSource.query !== propWebChart?.dataSource?.query) {
        query = chartDataSource?.query
      }
    } else {
      webChart = propWebChart.set('series', series)
    }
    if (typeof overlaysVisible !== 'undefined') {
      webChart = webChart.setIn(['legend', 'visible'], overlaysVisible)
    }
    onWebChartChange?.(webChart, query)
  }

  const handleAxesChange = (axes: ImmutableArray<WebChartAxis>): void => {
    onWebChartChange?.(propWebChart.set('axes', axes))
  }

  return (
    <>
      <SettingSection>
        <SettingCollapse
          label={translate('data')}
          isOpen={section === ChartSettingSection.Data}
          onRequestOpen={() => onSectionChange(ChartSettingSection.Data)}
          onRequestClose={() => onSectionChange(ChartSettingSection.None)}
        >
          <HistogramData
            chartDataSource={propWebChart?.dataSource}
            useDataSources={useDataSources}
            series={propWebChart?.series}
            onChange={handleSeriesChange}
          />
        </SettingCollapse>
      </SettingSection>
      <SettingSection>
        <SettingCollapse
          label={translate('axes')}
          isOpen={section === ChartSettingSection.Axes}
          onRequestOpen={() => onSectionChange(ChartSettingSection.Axes)}
          onRequestClose={() => onSectionChange(ChartSettingSection.None)}
        >
          <SettingRow flow='wrap'>
            <NumericAxes
              rotated={rotated}
              axes={propWebChart?.axes}
              showLogarithmicScale={false}
              onChange={handleAxesChange}
            />
          </SettingRow>
        </SettingCollapse>
      </SettingSection>
      <SettingSection>
        <SettingCollapse
          label={translate('general')}
          isOpen={section === ChartSettingSection.General}
          onRequestOpen={() => onSectionChange(ChartSettingSection.General)}
          onRequestClose={() => onSectionChange(ChartSettingSection.None)}
        >
          <SettingRow flow='wrap'>
            <XYGeneralSetting
              value={propWebChart}
              legendValid={legendValid}
              rotatable={false}
              onChange={onWebChartChange}
            />
          </SettingRow>
        </SettingCollapse>
      </SettingSection>
      <SettingSection>
        <SettingCollapse
          label={translate('appearance')}
          isOpen={section === ChartSettingSection.Appearance}
          onRequestOpen={() => onSectionChange(ChartSettingSection.Appearance)}
          onRequestClose={() => onSectionChange(ChartSettingSection.None)}
        >
          <SettingRow flow='wrap'>
            <AppearanceSetting
              webChart={propWebChart}
              onChange={onWebChartChange}
            />
          </SettingRow>
        </SettingCollapse>
      </SettingSection>
    </>
  )
}

export default HistogramSetting
