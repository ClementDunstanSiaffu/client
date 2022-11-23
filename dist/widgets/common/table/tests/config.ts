import { SelectionModeType } from '../src/config'

export const UseDataSources = [
  {
    dataSourceId: 'dataSource_1-Hydrants_8477',
    mainDataSourceId: 'dataSource_1-Hydrants_8477',
    rootDataSourceId: 'dataSource_1'
  },
  {
    dataSourceId: 'widget_5_output_4255323689842001-output',
    dataViewId: 'output',
    mainDataSourceId: 'widget_5_output_4255323689842001'
  }
]

export const layerConfig = {
  id: 'test-1',
  name: 'test-table-1',
  useDataSource: UseDataSources[0],
  allFields: [
    {
      jimuName: 'OBJECTID',
      name: 'OBJECTID',
      type: 'NUMBER',
      esriType: 'esriFieldTypeOID',
      alias: 'OBJECTID'
    }
  ],
  tableFields: [
    {
      jimuName: 'OBJECTID',
      name: 'OBJECTID',
      type: 'NUMBER',
      esriType: 'esriFieldTypeOID',
      alias: 'OBJECTID'
    }
  ],
  enableAttachements: false,
  enableSearch: true,
  searchFields: 'FACILITYID',
  enableEdit: false,
  enableRefresh: true,
  enableSelect: true,
  selectMode: SelectionModeType.Single,
  allowCsv: false
}
