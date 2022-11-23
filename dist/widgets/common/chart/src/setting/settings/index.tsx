import { DataSourceStatus, IMFeatureLayerQueryParams, ImmutableArray, ImmutableObject, IMState, React, ReactRedux, UseDataSource } from 'jimu-core'
import { SettingRow, SettingSection } from 'jimu-ui/advanced/setting-components'
import { ChartTools, IWebChart } from '../../config'
import { hooks } from 'jimu-ui'
import ChartSetting from './chart'
import defaultMessages from '../translations/default'
import ChartTypeSelector from './chart-type-selector'
import { ChartTypes } from 'jimu-ui/advanced/chart'
import { Placeholder } from './components'

interface ChartSettingsProps {
  type: ChartTypes
  template: string
  tools: ImmutableObject<ChartTools>
  webChart: ImmutableObject<IWebChart>
  useDataSources: ImmutableArray<UseDataSource>
  onTemplateChange: (templateId: string, webChart: ImmutableObject<IWebChart>) => void
  onToolsChange: (tools: ImmutableObject<ChartTools>) => void
  onWebChartChange: (webChart: ImmutableObject<IWebChart>, query?: IMFeatureLayerQueryParams) => void
}

export const ChartSettings = (props: ChartSettingsProps) => {
  const {
    type,
    template,
    tools,
    webChart,
    useDataSources,
    onTemplateChange,
    onToolsChange,
    onWebChartChange
  } = props

  const translate = hooks.useTranslate(defaultMessages)
  const sourceStatus = ReactRedux.useSelector((state: IMState) => state.appStateInBuilder?.dataSourcesInfo?.[useDataSources?.[0]?.dataSourceId]?.instanceStatus)
  const hasDataSource = !!useDataSources?.[0]?.dataSourceId

  return (
    <>
      {sourceStatus === DataSourceStatus.Created && <>
        <SettingSection>
          <SettingRow label={translate('chartType')} flow='wrap' level={1}>
            <ChartTypeSelector
              templateId={template}
              useDataSources={useDataSources}
              webChart={webChart}
              onChange={onTemplateChange}
            />
          </SettingRow>
        </SettingSection>
        {webChart && (
          <ChartSetting
            type={type}
            tools={tools}
            webChart={webChart}
            useDataSources={useDataSources}
            onToolsChange={onToolsChange}
            onWebChartChange={onWebChartChange}
          />
        )}
      </>}
      {!hasDataSource && <Placeholder messageId='chart-blank-msg' placeholder={translate('selectDataPlaceholder')} />}
    </>
  )
}
