import { React, ImmutableArray, UseDataSource, ImmutableObject, IMFeatureLayerQueryParams } from 'jimu-core'
import { SettingSection, SettingRow, SettingCollapse } from 'jimu-ui/advanced/setting-components'
import { IWebChart, WebChartSeries, ChartDataSource } from '../../../../../config'
import { StatisticsDataSetting } from '../common-sections/data'
import { hooks, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { defaultMessages as jimuBuilderDefaultMessage } from 'jimu-for-builder'
import { ChartTypes, WebChartAxis } from 'jimu-ui/advanced/chart'
import { getSerialSeriesRotated } from '../../../../../utils/common/serial'
import defaultMessages from '../../../../translations/default'
import { ChartSettingSection } from '../../type'
import { AppearanceSetting } from '../common-sections/appearance'
import { NormalAxesSetting } from '../common-sections/axes'
import { XYGeneralSetting } from '../common-sections/genaral'
import { SerialSeriesSetting } from '../common-sections/series'

interface SerialSettingProps {
  type: ChartTypes
  section: ChartSettingSection
  webChart: ImmutableObject<IWebChart>
  useDataSources: ImmutableArray<UseDataSource>
  onSectionChange: (section: ChartSettingSection) => void
  onWebChartChange: (webChart: ImmutableObject<IWebChart>, query?: IMFeatureLayerQueryParams) => void
}

const SerialSetting = (props: SerialSettingProps): React.ReactElement => {
  const {
    type,
    section,
    webChart,
    useDataSources,
    onSectionChange,
    onWebChartChange
  } = props

  const rotated = getSerialSeriesRotated(webChart?.series)
  const legendValid = webChart?.series != null && webChart?.series?.length > 1

  const translate = hooks.useTranslate(defaultMessages, jimuiDefaultMessage, jimuBuilderDefaultMessage)

  const handleSeriesChange = (series: ImmutableArray<WebChartSeries>, chartDataSource?: ImmutableObject<ChartDataSource>) => {
    if (chartDataSource) {
      if (chartDataSource.query !== webChart?.dataSource?.query) {
        onWebChartChange?.(webChart.set('dataSource', chartDataSource).set('series', series), chartDataSource?.query)
      } else {
        onWebChartChange?.(webChart.set('dataSource', chartDataSource).set('series', series))
      }
    } else {
      onWebChartChange?.(webChart.set('series', series))
    }
  }

  const handleAxesChange = (axes: ImmutableArray<WebChartAxis>): void => {
    onWebChartChange?.(webChart.set('axes', axes))
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
          <SettingRow flow='wrap'>
            <StatisticsDataSetting
              type={type}
              chartDataSource={webChart?.dataSource}
              useDataSources={useDataSources}
              series={webChart?.series}
              onChange={handleSeriesChange}
            />
          </SettingRow>
        </SettingCollapse>
      </SettingSection>
      <SettingSection>
        <SettingCollapse
          label={translate('series')}
          isOpen={section === ChartSettingSection.Series}
          onRequestOpen={() => onSectionChange(ChartSettingSection.Series)}
          onRequestClose={() => onSectionChange(ChartSettingSection.None)}
        >
          <SettingRow flow='wrap'>
            <SerialSeriesSetting
              series={webChart?.series}
              onChange={handleSeriesChange}
            />
          </SettingRow>
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
            <NormalAxesSetting
              rotated={rotated}
              axes={webChart?.axes}
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
              value={webChart}
              rotatable={true}
              legendValid={legendValid}
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
              webChart={webChart}
              onChange={onWebChartChange}
            />
          </SettingRow>
        </SettingCollapse>
      </SettingSection>
    </>
  )
}

export default SerialSetting
