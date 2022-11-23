/* eslint-disable camelcase */
import { Immutable } from 'jimu-core'
import { sortWebChartData } from '../../src/runtime/runtimes/chart/web-chart/with-inline-data/convert-utils/common'
import { mockDataSource } from '../mock-data-source'
mockDataSource()

jest.mock('../../src/utils/common', () => {
  return {
    ...jest.requireActual<Record<string, any>>('../../src/utils/common'),
    getFieldSchema: field => field
  }
})

describe('src/runtime/utils/data', () => {
  it('sortWebChartData', () => {
    const rawData = [
      {
        category: 2010,
        numeric_0: 2079,
        numeric_1: 13524
      },
      {
        category: 2011,
        numeric_0: 5943,
        numeric_1: 15177
      },
      {
        category: 2012,
        numeric_0: 7268,
        numeric_1: 7651
      }
    ]

    let orderByFields = Immutable(['category ASC'])
    let data = [...rawData]
    sortWebChartData(data, orderByFields)
    expect(data).toEqual([
      {
        category: 2010,
        numeric_0: 2079,
        numeric_1: 13524
      },
      {
        category: 2011,
        numeric_0: 5943,
        numeric_1: 15177
      },
      {
        category: 2012,
        numeric_0: 7268,
        numeric_1: 7651
      }
    ])

    data = [...rawData]
    orderByFields = Immutable(['category DESC'])
    sortWebChartData(data, orderByFields)
    expect(data).toEqual([
      {
        category: 2012,
        numeric_0: 7268,
        numeric_1: 7651
      },
      {
        category: 2011,
        numeric_0: 5943,
        numeric_1: 15177
      },
      {
        category: 2010,
        numeric_0: 2079,
        numeric_1: 13524
      }
    ])

    data = [...rawData]
    orderByFields = Immutable(['numeric_0 ASC'])
    sortWebChartData(data, orderByFields)

    expect(data).toEqual([
      {
        category: 2010,
        numeric_0: 2079,
        numeric_1: 13524
      },
      {
        category: 2011,
        numeric_0: 5943,
        numeric_1: 15177
      },
      {
        category: 2012,
        numeric_0: 7268,
        numeric_1: 7651
      }
    ])

    data = [...rawData]
    orderByFields = Immutable(['numeric_0 DESC'])
    sortWebChartData(data, orderByFields)

    expect(data).toEqual([
      {
        category: 2012,
        numeric_0: 7268,
        numeric_1: 7651
      },
      {
        category: 2011,
        numeric_0: 5943,
        numeric_1: 15177
      },
      {
        category: 2010,
        numeric_0: 2079,
        numeric_1: 13524
      }
    ])

    data = [...rawData]
    orderByFields = Immutable(['numeric_1 ASC'])
    sortWebChartData(data, orderByFields)

    expect(data).toEqual([
      {
        category: 2012,
        numeric_0: 7268,
        numeric_1: 7651
      },
      {
        category: 2010,
        numeric_0: 2079,
        numeric_1: 13524
      },
      {
        category: 2011,
        numeric_0: 5943,
        numeric_1: 15177
      }
    ])

    data = [...rawData]
    orderByFields = Immutable(['numeric_1 DESC'])
    sortWebChartData(data, orderByFields)

    expect(data).toEqual([
      {
        category: 2011,
        numeric_0: 5943,
        numeric_1: 15177
      },
      {
        category: 2010,
        numeric_0: 2079,
        numeric_1: 13524
      },
      {
        category: 2012,
        numeric_0: 7268,
        numeric_1: 7651
      }
    ])
  })
})
