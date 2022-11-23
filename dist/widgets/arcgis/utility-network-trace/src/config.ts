import { ImmutableObject } from 'jimu-core'
import NamedTraceConfiguration from 'esri/networks/support/NamedTraceConfiguration'

export interface InputSetting {
  type: string
  label: string
  description: string
  inputSymbol: any
  maxInputs: number
}

export interface GraphicColor {
  color: number[]
  haloOpacity: number
  fillOpacity: number
  hex: string
}

export interface TraceResultConfig {
  showSelectedFeatureList: boolean
  selectFeaturesOnComplete: boolean
  graphicsColor: GraphicColor
  showGraphicsOnComplete: boolean
}

export interface TraceConfig extends NamedTraceConfiguration {
  selected: boolean
  visible: boolean
  traceConfigOverride: string
  traceResultSettings: TraceResultConfig
}

export interface ConfigObject {
  mapId: string
  inputSettings: InputSetting[]
  traceSettings: TraceConfig[]
}

export interface Config {
  useMapWidget: boolean
  useMapWidgetIds: any[]
  activeDataSource: string
  configInfo: ConfigObject[]
}

export interface SymbolObject {
  zoomScale: number
  defaultPointSymbol:
  | __esri.SimpleMarkerSymbol
  | __esri.PictureMarkerSymbol
  | __esri.PointSymbol3D
}

export type IMConfig = ImmutableObject<Config>
export type IMSymbolObject = ImmutableObject<SymbolObject>
