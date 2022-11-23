import { React, AllWidgetProps } from 'jimu-core'
import { IMConfig } from '../config'
import { versionManager } from '../version-manager'
import ChartRuntime, { ChartRuntimeStateProvider } from './runtimes'

const Widget = (props: AllWidgetProps<IMConfig>): React.ReactElement => {
  const { outputDataSources, useDataSources, config, id, enableDataAction } = props

  return (
    <div className='jimu-widget widget-chart '>
      <ChartRuntimeStateProvider>
        <ChartRuntime
          widgetId={id}
          useDataSource={useDataSources?.[0]}
          outputDataSourceId={outputDataSources?.[0]}
          config={config}
          enableDataAction={enableDataAction} />
      </ChartRuntimeStateProvider>
    </div>
  )
}

Widget.versionManager = versionManager

export default Widget
