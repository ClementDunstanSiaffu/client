import { ImmutableObject } from 'jimu-core'

export interface Config {
  useMapWidget: boolean
  activeDataSource: string
  generalSettings: GeneralSetting
  configInfo: any
}

export interface ProfileChart {
  isCustomElevationLayer: boolean
  elevationLayerURL: string
  linearUnit: string
  elevationUnit: string
  displayStatistics: boolean
  selectedStatistics: Statistics[]
  groundColor: string
  graphicsHighlightColor: string
}

export interface ProfileSettings {
  layers: ProfileLayersSettings[]
}

export interface AssetSettings {
  layers: AssetLayersSettings[]
  assetIntersectionBuffer: AssetIntersection
}

export interface GeneralSetting {
  isSelectToolActive: boolean
  isDrawToolActive: boolean
  showGridAxis: boolean
  showAxisTitles: boolean
  showLegend: boolean
  buttonStyle: string
}

export interface Statistics {
  enabled: boolean
  name: string
  label: string
}

export interface ProfileLayersSettings {
  layerId: string
  elevationSettings: {
    type: string
    unit: string
    oneFieldLabel: string
    twoFieldLabel: string
    field1: string
    field2: string
  }
  distanceSettings: {
    type: string
    field: string
    unit: string
  }
  style: {
    lineType: string
    lineColor: string
    lineThickness: number
  }
  legend: {
    displayStatistics: boolean
    selectedStatistics: Statistics[]
  }
}

export interface AssetLayersSettings {
  layerId: string
  elevationSettings: {
    type: string
    unit: string
    oneFieldLabel: string
    twoFieldLabel: string
    field1: string
    field2: string
  }
  style: {
    type: string
    bullet: string
    bulletSize: number
    bulletColor: string
  }
  legend: {
    displayStatistics: boolean
    selectedStatistics: Statistics[]
  }
}

export interface AssetIntersection {
  enabled: boolean
  bufferDistance: number
  bufferUnits: string
}

export enum ButtonTriggerType {
  IconText = 'ICONTEXT'
}

export interface ProfileStyle {
  lineType: string
  lineColor: string
  lineThickness: number
}

export interface AssetStyle {
  type: string
  bullet: string
  bulletSize: number
  bulletColor: string
}

export interface ElevationType {
  value: string
  name: string
}

export type IMConfig = ImmutableObject<Config>
