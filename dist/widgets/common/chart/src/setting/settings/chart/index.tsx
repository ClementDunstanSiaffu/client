import { IMFeatureLayerQueryParams, ImmutableArray, ImmutableObject, React, UseDataSource } from 'jimu-core'
import { SettingCollapse, SettingSection } from 'jimu-ui/advanced/setting-components'
import { ChartTools, IWebChart } from '../../../config'
import { hooks } from 'jimu-ui'
import { Tools } from './universal'
import WebChartSetting from './web-chart'
import { ChartSettingSection } from './type'
import { ChartTypes } from 'jimu-ui/advanced/chart'

interface ChartSettingProps {
  type: ChartTypes
  tools: ImmutableObject<ChartTools>
  webChart: ImmutableObject<IWebChart>
  useDataSources: ImmutableArray<UseDataSource>
  onToolsChange: (tools: ImmutableObject<ChartTools>) => void
  onWebChartChange: (webChart: ImmutableObject<IWebChart>, query?: IMFeatureLayerQueryParams) => void
}

const ChartSetting = (props: ChartSettingProps) => {
  const {
    type,
    tools,
    webChart,
    useDataSources,
    onToolsChange,
    onWebChartChange
  } = props
  const translate = hooks.useTranslate()
  const [section, setSection] = React.useState(ChartSettingSection.Data)

  return (
    <>
      <WebChartSetting
        type={type}
        section={section}
        onSectionChange={setSection}
        webChart={webChart}
        useDataSources={useDataSources}
        onWebChartChange={onWebChartChange}
      />
      <SettingSection>
        <SettingCollapse
          label={translate('tools')}
          isOpen={section === ChartSettingSection.Tools}
          onRequestOpen={() => setSection(ChartSettingSection.Tools)}
          onRequestClose={() => setSection(ChartSettingSection.None)}
        >
          <Tools type={type} tools={tools} onChange={onToolsChange} />
        </SettingCollapse>
      </SettingSection>
    </>
  )
}

export default ChartSetting
