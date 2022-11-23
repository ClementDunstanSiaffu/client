import {
  ImmutableObject,
  IMUseDataSource,
  ImmutableArray,
  IMFieldSchema
} from 'jimu-core'

export enum TableArrangeType {
  Dropdown = 'DROPDOWN',
  Tabs = 'TABS'
}

export enum SelectionModeType {
  Single = 'SINGLE',
  Multiple = 'MULTIPLE'
}

export interface Suggestion {
  suggestionHtml: string | Element
  suggestion: string
}

export interface TableFieldsSchema extends IMFieldSchema {
  editAuthority?: boolean
}

export interface LayersConfig {
  id: string
  name: string
  useDataSource: IMUseDataSource
  allFields: IMFieldSchema[]
  tableFields?: TableFieldsSchema[]
  enableAttachements: boolean
  enableSearch: boolean
  searchFields?: string
  searchExact?: boolean
  enableEdit: boolean
  enableRefresh: boolean
  enableSelect: boolean
  selectMode: SelectionModeType
  allowCsv: boolean
  dataActionObject?: any
}

export interface Config {
  layersConfig?: ImmutableArray<LayersConfig>
  arrangeType: TableArrangeType
}

export type IMConfig = ImmutableObject<Config>
