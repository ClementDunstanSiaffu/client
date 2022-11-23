import { DataSource, DataSourceComponent, Immutable, ImmutableObject, React, UseDataSource, DataSourceStatus, DataRecord } from 'jimu-core'
import { useChartRuntimeDispatch, useChartRuntimeState } from '../../../state'

export type SourceStatus = 'none' | 'error' | 'empty' | 'loaded' | 'exceed'

export interface OutputSourceManagerProps {
  widgetId: string
  records: DataRecord[]
  dataSourceId: string
  loadError: boolean
  recordsLimited: number
  onStatusChange: (status: SourceStatus) => void
}

/**
 * Check whether a data source instance is valid (whether the corresponding data source is deleted)
 * @param dataSource
 */
const isDataSourceValid = (dataSource: DataSource): boolean => {
  if (!dataSource) return false
  const info = dataSource.getInfo()
  return info && Object.keys(info).length > 0
}

const useSetOutSourceRecords = (records: DataRecord[], loadError: boolean, limitCount: number, onStatusChange: (status: SourceStatus) => void) => {
  const { outputDataSource: dataSource } = useChartRuntimeState()

  React.useEffect(() => {
    if (!isDataSourceValid(dataSource) || !records) return
    if (loadError) {
      onStatusChange('error')
      dataSource.setStatus(DataSourceStatus.NotReady)
      dataSource.setCountStatus(DataSourceStatus.NotReady)
    } else {
      if (records.length === 0) {
        onStatusChange('empty')
        dataSource.setSourceRecords([])
        dataSource.setStatus(DataSourceStatus.Unloaded)
        dataSource.setCountStatus(DataSourceStatus.Unloaded)
      } else if (records.length >= limitCount) {
        onStatusChange('exceed')
        dataSource.setStatus(DataSourceStatus.NotReady)
        dataSource.setCountStatus(DataSourceStatus.NotReady)
      } else {
        onStatusChange('loaded')
        dataSource.setSourceRecords(records)
        dataSource.setStatus(DataSourceStatus.Unloaded)
        dataSource.setCountStatus(DataSourceStatus.Unloaded)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadError, records, dataSource])
}

const OutputSourceManager = (props: OutputSourceManagerProps) => {
  const {
    widgetId,
    recordsLimited: limitCount,
    loadError,
    records,
    dataSourceId,
    onStatusChange
  } = props

  const dispatch = useChartRuntimeDispatch()
  const { outputDataSource: dataSource } = useChartRuntimeState()
  useSetOutSourceRecords(records, loadError, limitCount, onStatusChange)

  const useDataSource: ImmutableObject<UseDataSource> = React.useMemo(() => {
    if (dataSourceId) {
      return Immutable({
        dataSourceId: dataSourceId,
        mainDataSourceId: dataSourceId
      })
    }
  }, [dataSourceId])

  const handleSchemaChange = () => {
    if (!dataSource) return
    if (dataSource.getStatus() !== DataSourceStatus.NotReady) {
      dataSource.setStatus(DataSourceStatus.NotReady)
      dataSource.setCountStatus(DataSourceStatus.NotReady)
    }
  }

  const handleCreated = (dataSouce: DataSource) => {
    dispatch({ type: 'SET_OUTPUT_DATA_SOURCE', value: dataSouce })
  }

  return <DataSourceComponent
    widgetId={widgetId}
    useDataSource={useDataSource}
    onDataSourceCreated={handleCreated}
    onDataSourceSchemaChange={handleSchemaChange}
  />
}

export default OutputSourceManager
