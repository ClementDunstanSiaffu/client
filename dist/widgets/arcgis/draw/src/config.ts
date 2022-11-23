import { ImmutableObject } from 'jimu-core'
import { MeasurementsUnitsInfo, DrawingElevationMode3D, MeasurementsPropsInfo } from 'jimu-ui/advanced/map'

export enum Arrangement {
  Panel = 'Panel',
  Toolbar = 'Toolbar'
}

export enum DrawMode {
  Continuous = 'continuous',
  Update = 'update'
}

export enum DrawingTool {
  Point = 'point',
  //Multipoint = 'multipoint'
  Polyline = 'polyline',
  Polygon = 'polygon',
  Rectangle = 'rectangle',
  Circle = 'circle'
}

export interface Config {
  isDisplayCanvasLayer: boolean
  arrangement: Arrangement
  drawMode: DrawMode
  drawingTools: DrawingTool[]

  measurementsInfo: MeasurementsPropsInfo
  measurementsUnitsInfos: MeasurementsUnitsInfo[]
  //isEnableAdvancedSetting: boolean
  drawingElevationMode3D: DrawingElevationMode3D
}

export type IMConfig = ImmutableObject<Config>
