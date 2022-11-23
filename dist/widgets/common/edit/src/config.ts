import {
  ImmutableObject,
  IMUseDataSource,
  ImmutableArray,
  IMFieldSchema
} from 'jimu-core'

export enum EditModeType {
  Attribute = 'ATTRIBUTE',
  Geometry = 'GEOMETRY'
}

export enum LayerHonorModeType {
  Webmap = 'WEBMAP',
  Custom = 'CUSTOM'
}

export interface TreeFields extends IMFieldSchema {
  children?: TreeFields[]
  groupKey?: number
  editAuthority?: boolean
  subDescription?: string
  editable?: boolean
}

export interface LayersConfig {
  id: string
  name: string
  layerId?: string
  useDataSource: IMUseDataSource
  addRecords?: boolean
  deleteRecords?: boolean
  updateGeometries?: boolean
  featureSnapping?: boolean
  showFields: IMFieldSchema[]
  groupedFields: TreeFields[]
  layerHonorMode: LayerHonorModeType
}

export interface Config {
  layersConfig?: ImmutableArray<LayersConfig>
  editMode: EditModeType
  selfSnapping?: boolean
  featureSnapping?: boolean
  description: string
  noDataMessage: string
}

export type IMConfig = ImmutableObject<Config>
