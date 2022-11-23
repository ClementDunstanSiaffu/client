import { React, DataSource, DataSourceComponent, ImmutableObject, QueriableDataSource, QueryParams, UseDataSource } from 'jimu-core'
import { hooks } from 'jimu-ui'
import { useChartRuntimeDispatch, useChartRuntimeState } from '../../../state'

interface OriginDataSourceManagerProps {
  widgetId: string
  useDataSource: ImmutableObject<UseDataSource>
  onQueryRequired?: () => void
}

const OriginDataSourceManager = (props: OriginDataSourceManagerProps) => {
  const { widgetId, useDataSource, onQueryRequired } = props
  const { dataSource, filter } = useChartRuntimeState()
  const dataSourceRef = hooks.useRefValue(dataSource)
  const dispatch = useChartRuntimeDispatch()

  //When the filter is modified, update it to the data source
  React.useEffect(() => {
    if (dataSourceRef.current) {
      (dataSourceRef.current as QueriableDataSource).updateQueryParams({ where: filter?.sql ?? '1=1' } as QueryParams, widgetId)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const handleCreated = (dataSouce: DataSource) => {
    dispatch({ type: 'SET_DATA_SOURCE', value: dataSouce })
  }

  return <DataSourceComponent
    widgetId={widgetId}
    useDataSource={useDataSource}
    onDataSourceCreated={handleCreated}
    onQueryRequired={onQueryRequired}
  />
}

export default OriginDataSourceManager
