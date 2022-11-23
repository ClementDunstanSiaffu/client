import { ImmutableObject, ImmutableArray, UseUtility } from 'jimu-core'
export const FORMAT_ITEM: FormatType[] = ['pdf', 'png32', 'png8', 'jpg', 'gif', 'eps', 'svg', 'svgz']
export const LAYOUT_ITEM: LayoutType[] = ['map-only', 'a3-landscape', 'a3-portrait', 'a4-landscape', 'a4-portrait', 'letter-ansi-a-landscape', 'letter-ansi-a-portrait', 'tabloid-ansi-b-landscape', 'tabloid-ansi-b-portrait']
export const SCALEBAR_UNIT: ScalebarUnitType[] = ['Miles', 'Kilometers', 'Meters', 'Feet']
export const DEFAULT_MAP_WIDTH = 800
export const DEFAULT_MAP_HEIGHT = 1100
export const DEFAULT_DPI = 96
export const WKID_LINK = 'https://developers.arcgis.com/rest/services-reference/enterprise/using-spatial-references.htm'

export enum PrintExtentType {
  CurrentMapExtent = 'CURRENT MAP EXTENT',
  CurrentMapScale = 'CURRENT MAP SCALE',
  SetMapScale = 'SET MAP SCALE'
}

export enum MapFrameUnit {
  Point = 'POINT',
  Inch = 'INCH',
  Centimeter = 'CENTIMETER',
  Millimeter = 'MILLIMETER'
}

export interface WebMapFrameSize {
  width: number
  height: number
}

interface CustomTextElementEnable {
  [key: string]: boolean
}

export const DEFAULT_COMMON_SETTING = {
  scalePreserved: false,
  outScale: 36978595.474472,
  layoutOptions: {
    titleText: 'ArcGIS Web Map'
  },
  exportOptions: {
    dpi: DEFAULT_DPI
  },
  printExtentType: PrintExtentType.CurrentMapExtent,
  attributionVisible: false,
  forceFeatureAttributes: true,
  wkid: 102100,
  enableTitle: true,
  legendEnabled: true,
  enableMapPrintExtents: true,
  enableOutputSpatialReference: true,
  enableQuality: true,
  enableFeatureAttribution: true,
  enableMapSize: true,
  overrideCommonSetting: false,
  enableAuthor: true,
  enableCopyright: true,
  enableLegend: true,
  enableScalebarUnit: true,
  enableCustomTextElements: true
}

export enum ModeType {
  Classic = 'CLASSIC',
  Compact = 'COMPACT'
}

export enum PrintServiceType {
  OrganizationService = 'ORGANIZATION SERVICE',
  Customize = 'CUSTOMIZE'
}

export enum PrintTemplateType {
  OrganizationTemplate = 'ORGANIZATION TEMPLATE',
  Customize = 'CUSTOMIZE'
}

export enum PrintResultState {
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Error = 'ERROR'
}

export interface PrintResultListItemTyle {
  resultId: string
  url: string
  title: string
  state: PrintResultState
}

export type IMPrintResultListItemTyle = ImmutableObject<PrintResultListItemTyle>

export type PrintResultList = PrintResultListItemTyle[]
export type IMPrintResultList = ImmutableArray<PrintResultListItemTyle>
/**
 * The output format for the printed map.
 *
 * [Read more...](https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-PrintTemplate.html#format)
 */
export type FormatType = 'pdf' | 'png32' | 'png8' | 'jpg' | 'gif' | 'eps' | 'svg' | 'svgz'

/**
* The layout used for the print output.
*
* [Read more...](https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-PrintTemplate.html#layout)
*/
// export type LayoutType = 'map-only'
// | 'a3-landscape'
// | 'a3-portrait'
// | 'a4-landscape'
// | 'a4-portrait'
// | 'letter-ansi-a-landscape'
// | 'letter-ansi-a-portrait'
// | 'tabloid-ansi-b-landscape'
// | 'tabloid-ansi-b-portrait'
export type LayoutType = string

export type ScalebarUnitType = 'Miles' | 'Kilometers' | 'Meters' | 'Feet'

export interface LayoutInfo {
  layoutTemplate: LayoutType
  pageSize?: number[]
  webMapFrameSize?: number[]
  pageUnits?: MapFrameUnit
  layoutOptions: {
    hasAuthorText?: boolean
    hasCopyrightText?: boolean
    hasLegend?: boolean
    hasTitleText?: boolean
    customTextElements?: any[]
  }
}

export type PrintParameters = __esri.PrintParameters
export type MapView = __esri.MapView

export interface PrintTemplateProperties extends __esri.PrintTemplateProperties {
  templateId?: string
  printExtentType?: PrintExtentType
  wkid?: number | string
  label?: string
  legendEnabled?: boolean

  //Size of map in template
  mapFrameSize?: number[]
  mapFrameUnit?: MapFrameUnit

  overrideCommonSetting?: boolean
  enableTitle?: boolean
  enableMapPrintExtents?: boolean
  enableOutputSpatialReference?: boolean
  enableQuality?: boolean
  enableMapSize?: boolean
  enableFeatureAttribution?: boolean
  enableAuthor?: boolean
  enableCopyright?: boolean
  enableLegend?: boolean
  enableScalebarUnit?: boolean
  enableMapAttribution?: boolean
  enableCustomTextElements?: boolean
  customTextElementEnableList?: CustomTextElementEnable[]

  hasAuthorText?: boolean
  hasCopyrightText?: boolean
  hasLegend?: boolean
  hasTitleText?: boolean
  selectedFormatList?: FormatType[]
}

export type IMPrintTemplateProperties = ImmutableObject<PrintTemplateProperties>
export interface config {
  modeType: ModeType
  printServiceType: PrintServiceType
  printTemplateType: PrintTemplateType
  useUtility?: UseUtility
  printCustomTemplate?: PrintTemplateProperties[]
  printOrgTemplate?: PrintTemplateProperties[]
  commonSetting?: PrintTemplateProperties
  formatList?: FormatType[]
  defaultFormat?: FormatType
  layoutChoiceList?: LayoutInfo[]
}

export type IMConfig = ImmutableObject<config>
