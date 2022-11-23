import { React, ImmutableArray, UseDataSource, ImmutableObject, IMFeatureLayerQueryParams } from 'jimu-core'
import { SettingSection, SettingRow, SettingCollapse } from 'jimu-ui/advanced/setting-components'
import { IWebChart, WebChartSeries, ChartDataSource } from '../../../../../config'
import { hooks, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { defaultMessages as jimuBuilderDefaultMessage } from 'jimu-for-builder'
import defaultMessages from '../../../../translations/default'
import { ChartSettingSection } from '../../type'
import { AppearanceSetting } from '../common-sections/appearance'
import { PieGeneralSetting } from '../common-sections/genaral'
import { PieSeriesSetting } from '../common-sections/series'
import { StatisticsDataSetting } from '../common-sections/data'
import { ChartTypes } from 'jimu-ui/advanced/chart'

interface PieSettingProps {
  type: ChartTypes
  section: ChartSettingSection
  webChart: ImmutableObject<IWebChart>
  useDataSources: ImmutableArray<UseDataSource>
  onSectionChange: (section: ChartSettingSection) => void
  onWebChartChange: (webChart: ImmutableObject<IWebChart>, query?: IMFeatureLayerQueryParams) => void
}

const PieSetting = (props: PieSettingProps): React.ReactElement => {
  const {
    type,
    section,
    webChart,
    onSectionChange,
    useDataSources,
    onWebChartChange
  } = props

  const translate = hooks.useTranslate(defaultMessages, jimuiDefaultMessage, jimuBuilderDefaultMessage)

  const handleSeiesChange = (series: ImmutableArray<WebChartSeries>, chartDataSource?: ImmutableObject<ChartDataSource>) => {
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
              onChange={handleSeiesChange}
            />
          </SettingRow>
        </SettingCollapse>
      </SettingSection>
      <SettingSection>
        <SettingCollapse
          label={translate('slices')}
          isOpen={section === ChartSettingSection.Series}
          onRequestOpen={() => onSectionChange(ChartSettingSection.Series)}
          onRequestClose={() => onSectionChange(ChartSettingSection.None)}
        >
          <SettingRow flow='wrap'>
            <PieSeriesSetting
              useDataSources={useDataSources}
              chartDataSource={webChart.dataSource}
              series={webChart?.series}
              onChange={handleSeiesChange}
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
            <PieGeneralSetting
              value={webChart}
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

export default PieSetting
