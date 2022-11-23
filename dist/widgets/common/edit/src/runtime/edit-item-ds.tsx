/** @jsx jsx */
import {
  React, jsx, DataSourceComponent, IMUseDataSource, DataSource, DataSourceStatus
} from 'jimu-core'

interface DataSourceProps {
  useDataSource: IMUseDataSource
  onIsDataSourceNotReady: (dataSourceId: string, dataSourceStatus: DataSourceStatus) => void
  onCreateDataSourceCreatedOrFailed: (dataSourceId: string, dataSource: DataSource) => void
  onDataSourceSelectedChange: (dataSourceId: string, selectedIds: string[]) => void
  onDataSourceVersionChange: (dataSourceId: string) => void
}

export default class EditItemDataSource extends React.PureComponent<DataSourceProps> {
  componentWillUnmount () {
    this.props.onCreateDataSourceCreatedOrFailed(this.props.useDataSource.dataSourceId, null)
    this.props.onIsDataSourceNotReady(this.props.useDataSource.dataSourceId, DataSourceStatus.NotReady)
  }

  onDataSourceCreated = (ds) => {
    this.props.onCreateDataSourceCreatedOrFailed(this.props.useDataSource.dataSourceId, ds)
  }

  onDataSourceInfoChange = (info, preInfo) => {
    this.props.onIsDataSourceNotReady(this.props.useDataSource.dataSourceId, info?.status)
    const preSelectedIds = preInfo?.selectedIds
    const newSelectedIds = info?.selectedIds
    const selectedChange = preSelectedIds !== newSelectedIds && (preSelectedIds?.length !== 0 || newSelectedIds?.length !== 0)
    const preGdbVersion = preInfo?.gdbVersion
    const newGdbVersion = info?.gdbVersion
    if (selectedChange) {
      this.props.onDataSourceSelectedChange(this.props.useDataSource.dataSourceId, newSelectedIds)
    }
    if (preGdbVersion !== newGdbVersion) {
      this.props.onDataSourceVersionChange(this.props.useDataSource.dataSourceId)
    }
  }

  onCreateDataSourceFailed = () => {
    this.props.onCreateDataSourceCreatedOrFailed(this.props.useDataSource.dataSourceId, null)
  }

  render () {
    const { useDataSource } = this.props
    return (
      <DataSourceComponent
        useDataSource={useDataSource}
        onDataSourceCreated={this.onDataSourceCreated}
        onCreateDataSourceFailed={this.onCreateDataSourceFailed}
        onDataSourceInfoChange={this.onDataSourceInfoChange}
      />
    )
  }
}
