import normalizeChart from '../../../src/setting/settings/chart-type-selector/utils/normalize-chart'

describe('normalizeChart', () => {
  it('Normalize series for serial/pie chart', () => {
    const webChart = {
      series: [{
        type: 'barSeries',
        x: 'foo',
        y: '123abc',
        id: '123abc',
        colorType: 'singleColor',
        query: {
          groupByFieldsForStatistics: ['foo'],
          outStatistics: [{
            onStatisticField: 'bar',
            statisticType: 'sum',
            outStatisticFieldName: '123abc'
          }],
          orderByFields: ['123abc desc']
        }
      }]
    } as any

    const normalized = normalizeChart(webChart)
    expect(normalized).toEqual({
      series: [{
        type: 'barSeries',
        x: 'foo',
        y: 'bar_sum',
        id: 'bar',
        colorType: 'singleColor'
      }],
      dataSource: {
        query: {
          groupByFieldsForStatistics: ['foo'],
          outStatistics: [{
            onStatisticField: 'bar',
            statisticType: 'sum',
            outStatisticFieldName: 'bar_sum'
          }],
          orderByFields: ['bar_sum desc']
        }
      }
    })
  })

  it('Normalize series for scatter chart', () => {
    const webChart = {
      series: [{
        type: 'scatterSeries',
        x: 'foo',
        y: 'bar',
        id: 'chart 123abc',
        colorType: 'singleColor'
      }]
    } as any

    const normalized = normalizeChart(webChart)
    expect(normalized).toEqual({
      series: [{
        type: 'scatterSeries',
        x: 'foo',
        y: 'bar',
        id: 'bar',
        colorType: 'singleColor'
      }],
      dataSource: {
        query: {
          outFields: ['foo', 'bar']
        }
      }
    })
  })

  it('Normalize series color type for serial/pie chart', () => {
    let webChart = {
      series: [{
        type: 'barSeries',
        x: 'foo',
        y: '123abc',
        id: '123abc',
        colorType: 'colorMatch',
        fillSymbol: {
          type: 'esriSFS',
          style: 'esriSFSSolid',
          color: [0, 0, 0, 255],
          outline: {
            type: 'esriSLS',
            style: 'esriSLSSolid',
            color: [0, 0, 0, 255],
            width: 1
          }
        },
        query: {
          groupByFieldsForStatistics: ['foo'],
          outStatistics: [{
            onStatisticField: 'bar',
            statisticType: 'sum',
            outStatisticFieldName: '123abc'
          }],
          orderByFields: ['123abc desc']
        }
      }]
    } as any

    let normalized = normalizeChart(webChart)
    expect(normalized).toEqual({
      series: [{
        type: 'barSeries',
        x: 'foo',
        y: 'bar_sum',
        id: 'bar',
        colorType: 'singleColor',
        fillSymbol: {
          type: 'esriSFS',
          style: 'esriSFSSolid',
          color: [0, 0, 0, 255],
          outline: {
            type: 'esriSLS',
            style: 'esriSLSSolid',
            color: [0, 0, 0, 255],
            width: 1
          }
        }
      }],
      dataSource: {
        query: {
          groupByFieldsForStatistics: ['foo'],
          outStatistics: [{
            onStatisticField: 'bar',
            statisticType: 'sum',
            outStatisticFieldName: 'bar_sum'
          }],
          orderByFields: ['bar_sum desc']
        }
      }
    })

    webChart = {
      series: [{
        type: 'barSeries',
        x: 'foo',
        y: '123abc',
        id: '123abc',
        colorType: 'colorMatch',
        fillSymbol: {
          type: 'esriSFS'
        },
        query: {
          groupByFieldsForStatistics: ['foo'],
          outStatistics: [{
            onStatisticField: 'bar',
            statisticType: 'sum',
            outStatisticFieldName: '123abc'
          }],
          orderByFields: ['123abc desc']
        }
      }]
    } as any

    normalized = normalizeChart(webChart)
    expect(normalized).toEqual({
      series: [{
        type: 'barSeries',
        x: 'foo',
        y: 'bar_sum',
        id: 'bar',
        colorType: 'singleColor',
        fillSymbol: {
          type: 'esriSFS',
          style: 'esriSFSSolid',
          color: '#5E8FD0',
          outline: {
            type: 'esriSLS',
            style: 'esriSLSSolid',
            color: 'var(--light-900)',
            width: 0
          }
        }
      }],
      dataSource: {
        query: {
          groupByFieldsForStatistics: ['foo'],
          outStatistics: [{
            onStatisticField: 'bar',
            statisticType: 'sum',
            outStatisticFieldName: 'bar_sum'
          }],
          orderByFields: ['bar_sum desc']
        }
      }
    })
  })

  it('Normalize series color type for scatter chart', () => {
    const webChart = {
      series: [{
        type: 'scatterSeries',
        x: 'foo',
        y: 'bar',
        id: 'chart 123abc',
        colorType: 'colorMatch',
        markerSymbol: {
          type: 'esriSMS',
          style: 'esriSMSCircle',
          color: [0, 0, 0, 255],
          size: 12
        }
      }]
    } as any

    const normalized = normalizeChart(webChart)
    expect(normalized).toEqual({
      series: [{
        type: 'scatterSeries',
        x: 'foo',
        y: 'bar',
        id: 'bar',
        colorType: 'singleColor',
        markerSymbol: {
          type: 'esriSMS',
          style: 'esriSMSCircle',
          color: [0, 0, 0, 255],
          size: 12
        }
      }],
      dataSource: {
        query: {
          outFields: ['foo', 'bar']
        }
      }
    })
  })
})
