import { IField } from '@esri/arcgis-rest-types'
import { dataSourceUtils, FieldSchema } from 'jimu-core'

export function getStopOutputDsId (widgetId: string): string {
  return `${widgetId}_output_stop`
}

export function getDirectionPointOutputDsId (widgetId: string): string {
  return `${widgetId}_output_direction_point`
}

export function getDirectionLineOutputDsId (widgetId: string): string {
  return `${widgetId}_output_direction_line`
}

export function getRouteOutputDsId (widgetId: string): string {
  return `${widgetId}_output_route`
}

export function convertJSAPIFieldsToJimuFields (fields: IField[]): { [jimuName: string]: FieldSchema } {
  if (!fields) {
    return null
  }
  const jimuFields: { [jimuName: string]: FieldSchema } = {}
  fields.forEach(r => {
    jimuFields[r.name] = dataSourceUtils.convertFieldToJimuField(r, null)
  })
  return jimuFields
}
