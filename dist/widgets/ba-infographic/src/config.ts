import { ImmutableObject } from 'seamless-immutable'

export interface Config {
  defaultPrint: boolean
  defaultImage: boolean
  defaultPdf: boolean
  print: boolean
  bufferSize1: number
  bufferSize2: number
  bufferSize3: number
  bufferUnit: string
  imageExport: boolean
  pdf: boolean
  zoomLevel: boolean
  excel: boolean
  fullscreen: boolean
  displayHeader: boolean
  reportShowStacked: boolean
  runReportOnClick: boolean
  showSearch: boolean
  dynamicHtml: boolean
  defaultCountry: string
  latitude: number
  longitude: number
  selectedInfographicName: string
  selectedInfographicId: string
  infographicLongitude: number
  infographicLatitude: number
}

export type IMConfig = ImmutableObject<Config>
