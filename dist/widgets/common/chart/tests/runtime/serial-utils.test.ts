/* eslint-disable camelcase */
import { DataRecord, IMFeatureLayerQueryParams, Immutable } from 'jimu-core'
import { ColorMatches } from '../../src/config'
import { applyColorMatch, convertFieldData, convertGroupData } from '../../src/runtime/runtimes/chart/web-chart/with-inline-data/convert-utils/common'

jest.mock('../../src/utils/common', () => {
  return {
    ...jest.requireActual<Record<string, any>>('../../src/utils/common'),
    getFieldSchema: field => ({ field, alias: `${field}-1` })
  }
})

const makeDummyRecord = (attribute): DataRecord => {
  return {
    getData: () => attribute,
    getFieldValue: (field) => attribute[field],
    getFormattedFieldValue: (field) => attribute[field] + '!'
  } as unknown as DataRecord
}

describe('src/runtime/serial/utils', () => {
  it('convertGroupData', () => {
    const query: IMFeatureLayerQueryParams = Immutable({
      groupByFieldsForStatistics: ['x'],
      outStatistics: [{
        onStatisticField: 'v',
        outStatisticFieldName: 'v',
        statisticType: 'sum'
      }]
    })
    let data = [{ x: 'a', v: 0 }, { x: 'b', v: 1 }]
    let records = data.map(makeDummyRecord)
    let result = convertGroupData(records, query, null)
    expect(result).toEqual([{ x: 'a!', x_original: 'a', v: 0 }, { x: 'b!', x_original: 'b', v: 1 }])

    data = [{ x: 'a', v: 0 }, { x: 'b', v: 1 }, { x: null, v: 2 }]
    records = data.map(makeDummyRecord)
    result = convertGroupData(records, query, null)
    expect(result).toEqual([{ x: 'a!', x_original: 'a', v: 0 }, { x: 'b!', x_original: 'b', v: 1 }])
  })
  it('convertFieldData', () => {
    let query: IMFeatureLayerQueryParams = Immutable({
      groupByFieldsForStatistics: ['x'],
      outStatistics: [{
        onStatisticField: 'v',
        outStatisticFieldName: 'v',
        statisticType: 'sum'
      }]
    })
    let data = [{ x: 'a', v: 0 }, { x: 'b', v: 1 }]
    let records = data.map(makeDummyRecord)

    query = Immutable({
      outStatistics: [{
        onStatisticField: 'v',
        outStatisticFieldName: 'v',
        statisticType: 'sum'
      },
      {
        onStatisticField: 'v1',
        outStatisticFieldName: 'v1',
        statisticType: 'sum'
      }, {
        onStatisticField: 'v2',
        outStatisticFieldName: 'v',
        statisticType: 'sum'
      }]
    })

    data = [{ v: 0, v1: 1, v2: null }] as any
    records = data.map(makeDummyRecord)
    const result = convertFieldData(records[0], query, '')
    expect(result).toEqual([{
      objectid: 0,
      FieldName: 'v-1',
      FieldName_original: 'v',
      FieldValue: 0
    }, {
      objectid: 1,
      FieldName: 'v1-1',
      FieldName_original: 'v1',
      FieldValue: 1
    }, {
      objectid: 2,
      FieldName: 'v2-1',
      FieldName_original: 'v2',
      FieldValue: 0
    }])
  })

  it('applyColorMatch', () => {
    let colorMatches = { a: { _fillColor: 'red' } } as ColorMatches
    let data = [{ x: 'a', v: 0 }, { x: 'b', v: 1 }]
    let result = data.map(item => applyColorMatch(item, 'x', 'v', colorMatches))
    expect(result).toEqual([{ x: 'a', v: 0, _fillColor_v: 'red' }, { x: 'b', v: 1 }])

    data = [{
      objectid: 0,
      FieldName: 'v',
      FieldValue: 0
    }, {
      objectid: 1,
      FieldName: 'v1',
      FieldValue: 1
    }, {
      objectid: 2,
      FieldName: 'v2',
      FieldValue: 0
    }] as any

    colorMatches = { v1: { _fillColor: 'red' } }

    result = data.map(item => applyColorMatch(item, 'FieldName', 'FieldValue', colorMatches))
    expect(result).toEqual([{
      objectid: 0,
      FieldName: 'v',
      FieldValue: 0
    }, {
      objectid: 1,
      FieldName: 'v1',
      FieldValue: 1,
      _fillColor_FieldValue: 'red'
    }, {
      objectid: 2,
      FieldName: 'v2',
      FieldValue: 0
    }])
  })
})
