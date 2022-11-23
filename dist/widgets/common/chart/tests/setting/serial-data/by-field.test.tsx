import { fireEvent } from '@testing-library/react'
import { ChartDataSource, WebChartSeries } from '../../../src/config'
import { React, getAppStore, Immutable, ImmutableObject, ImmutableArray } from 'jimu-core'
import { withStoreThemeIntlRender, mockTheme, WithRenderResult } from 'jimu-for-test'
import { ByFieldData, ByFieldDataProps } from '../../../src/setting/settings/chart/web-chart/common-sections/data/statistics/by-field'
import { MockNumericInput } from '../mock-numeric-input'
import { NumericFields } from '../mock-field-selector'
import { ByFieldSeriesX, ByFieldSeriesY } from '../../../src/constants'
const ColumnTemplate = require('../../../src/setting/template/column.json')

jest.mock('jimu-ui', () => {
  return {
    ...jest.requireActual<Record<string, any>>('jimu-ui'),
    NumericInput: () => MockNumericInput
  }
})

jest.mock('../../../src/utils/common', () => {
  return {
    ...jest.requireActual<Record<string, any>>('../../../src/utils/common'),
    getObjectIdField: () => 'FID'
  }
})

jest.mock('../../../src/setting/settings/chart/web-chart/components', () => {
  return {
    ...jest.requireActual<Record<string, any>>('../../../src/setting/settings/chart/web-chart/components'),
    FieldSelector: require('../mock-field-selector').MockFieldSelector
  }
})

const CategoryFieldSelector = '.category-field-selector .selected-field-item'
const NumericFieldSelector = '.numeric-fields-selector .selected-fields'
const NumericFieldSelectItem = '.numeric-fields-selector .field-selector-item'
const SortFieldSelector = '.sort-select .dropdown-button-content'
const SortFieldSelectorItem = '.dropdown-menu .dropdown-item'

const Container = (props: ByFieldDataProps): React.ReactElement => {
  const {
    series: propSeries,
    chartDataSource: propDataSource,
    onChange,
    ...others
  } = props
  const [series, setSeries] = React.useState(propSeries)
  const [dataSource, setDataSource] = React.useState(propDataSource)

  const handleChange = (series, dataSource): void => {
    onChange?.(series, dataSource)
    setSeries(series)
    setDataSource(dataSource)
  }

  return (
    <ByFieldData
      {...others}
      chartDataSource={dataSource}
      series={series}
      onChange={handleChange}
    />
  )
}

const chartDataSource: ImmutableObject<ChartDataSource> = Immutable({
  query: {
    outStatistics: [{
      statisticType: 'sum',
      onStatisticField: NumericFields[0],
      outStatisticFieldName: NumericFields[0]
    }],
    orderByFields: [`${ByFieldSeriesX} ASC`]
  }
})

describe('<ByFieldData />', () => {
  let useDataSources = null
  let render: WithRenderResult = null
  beforeAll(() => {
    useDataSources = [
      {
        dataSourceId: 'ds1',
        mainDataSourceId: 'ds1'
      }
    ]
    render = withStoreThemeIntlRender(getAppStore(), mockTheme as any)
  })

  describe('work well for empty seies', () => {
    it('should render well', () => {
      const series = Immutable(ColumnTemplate.series) as ImmutableArray<WebChartSeries>
      const props = {
        chartDataSource: undefined,
        series,
        useDataSources
      }
      const { getByText, queryBySelector } = render(<ByFieldData {...props} />)
      expect(getByText('SUM')).toBeInTheDocument()
      expect(queryBySelector(CategoryFieldSelector)).not.toBeInTheDocument()
    })
  })
  describe('work well for exist series', () => {
    it('normal numeric fields change', () => {
      const onChange = jest.fn()

      const series = ColumnTemplate.series
      series[0].id = ByFieldSeriesY
      series[0].x = ByFieldSeriesX
      series[0].y = ByFieldSeriesY

      const props = {
        chartDataSource,
        series: Immutable(series),
        useDataSources,
        onChange
      }
      const { getByText, queryByText, getBySelector, getAllBySelector } = render(<Container {...props} />)
      expect(getByText('SUM')).toBeInTheDocument()
      expect(getByText(NumericFields[0])).toBeInTheDocument()
      expect(getBySelector(SortFieldSelector)).toHaveTextContent('Category axis')

      fireEvent.click(getBySelector(NumericFieldSelector))
      fireEvent.click(getAllBySelector(NumericFieldSelectItem)[1])

      expect(getByText('SUM')).toBeInTheDocument()
      expect(getByText(NumericFields[0])).toBeInTheDocument()
      expect(getByText(NumericFields[1])).toBeInTheDocument()
      expect(getBySelector(SortFieldSelector)).toHaveTextContent('Category axis')

      let serie = onChange.mock.calls[0][0][0]
      expect(serie.type).toBe('barSeries')
      expect(serie.stackedType).toBe('sideBySide')
      expect(serie.x).toBe(ByFieldSeriesX)
      expect(serie.y).toBe(ByFieldSeriesY)

      let ds = onChange.mock.calls[0][1]
      expect(ds).toEqual({
        query: {
          outStatistics: [{
            statisticType: 'sum',
            onStatisticField: NumericFields[0],
            outStatisticFieldName: NumericFields[0]
          }, {
            statisticType: 'sum',
            onStatisticField: NumericFields[1],
            outStatisticFieldName: NumericFields[1]
          }],
          orderByFields: [`${ByFieldSeriesX} ASC`],
          pageSize: undefined
        }
      })

      fireEvent.click(getBySelector(NumericFieldSelector))
      fireEvent.click(getAllBySelector(NumericFieldSelectItem)[0])

      expect(getByText('SUM')).toBeInTheDocument()
      expect(queryByText(NumericFields[0])).not.toBeInTheDocument()
      expect(getByText(NumericFields[1])).toBeInTheDocument()
      expect(getBySelector(SortFieldSelector)).toHaveTextContent('Category axis')

      serie = onChange.mock.calls[1][0][0]
      expect(serie.type).toBe('barSeries')
      expect(serie.stackedType).toBe('sideBySide')
      expect(serie.x).toBe(ByFieldSeriesX)
      expect(serie.y).toBe(ByFieldSeriesY)

      ds = onChange.mock.calls[1][1]
      expect(ds).toEqual({
        query: {
          outStatistics: [{
            statisticType: 'sum',
            onStatisticField: NumericFields[1],
            outStatisticFieldName: NumericFields[1]
          }],
          orderByFields: [`${ByFieldSeriesX} ASC`],
          pageSize: undefined
        }
      })
    })
    it('uncheck all numeric fields', () => {
      const onChange = jest.fn()

      const series = ColumnTemplate.series
      series[0].id = ByFieldSeriesY
      series[0].x = ByFieldSeriesX
      series[0].y = ByFieldSeriesY

      const props = {
        chartDataSource,
        series: Immutable(series),
        useDataSources,
        onChange
      }
      const { getByText, queryByText, getBySelector, getAllBySelector } = render(<Container {...props} />)
      fireEvent.click(getBySelector(NumericFieldSelector))
      fireEvent.click(getAllBySelector(NumericFieldSelectItem)[0])

      expect(queryByText(NumericFields[0])).not.toBeInTheDocument()
      expect(queryByText(NumericFields[1])).not.toBeInTheDocument()

      let serie = onChange.mock.calls[0][0][0]
      expect(serie.type).toBe('barSeries')
      expect(serie.stackedType).toBe('sideBySide')
      expect(serie.x).toBe(ByFieldSeriesX)
      expect(serie.y).toBe(ByFieldSeriesY)

      let ds = onChange.mock.calls[0][1]
      expect(ds).toEqual({
        query: {
          outStatistics: [],
          orderByFields: [`${ByFieldSeriesX} ASC`],
          pageSize: undefined
        }
      })

      fireEvent.click(getBySelector(NumericFieldSelector))
      fireEvent.click(getAllBySelector(NumericFieldSelectItem)[1])

      expect(getByText('SUM')).toBeInTheDocument()
      expect(queryByText(NumericFields[0])).not.toBeInTheDocument()
      expect(getByText(NumericFields[1])).toBeInTheDocument()
      expect(getBySelector(SortFieldSelector)).toHaveTextContent('Category axis')

      serie = onChange.mock.calls[1][0][0]
      expect(serie.type).toBe('barSeries')
      expect(serie.stackedType).toBe('sideBySide')
      expect(serie.x).toBe(ByFieldSeriesX)
      expect(serie.y).toBe(ByFieldSeriesY)

      ds = onChange.mock.calls[1][1]
      expect(ds).toEqual({
        query: {
          outStatistics: [{
            statisticType: 'sum',
            onStatisticField: NumericFields[1],
            outStatisticFieldName: NumericFields[1]
          }],
          orderByFields: [`${ByFieldSeriesX} ASC`],
          pageSize: undefined
        }
      })
    })
    it('statistic type change', () => {
      const onChange = jest.fn()

      const propSeries = ColumnTemplate.series
      propSeries[0].id = ByFieldSeriesY
      propSeries[0].x = ByFieldSeriesX
      propSeries[0].y = ByFieldSeriesY

      const props = {
        chartDataSource,
        series: Immutable(propSeries),
        useDataSources,
        onChange
      }
      const { getByText, getBySelector, getAllBySelector } = render(<Container {...props} />)
      expect(getByText('SUM')).toBeInTheDocument()
      expect(getByText(NumericFields[0])).toBeInTheDocument()
      expect(getBySelector(SortFieldSelector)).toHaveTextContent('Category axis')

      fireEvent.click(getBySelector(NumericFieldSelector))
      fireEvent.click(getAllBySelector(NumericFieldSelectItem)[1])
      expect(getByText(NumericFields[1])).toBeInTheDocument()

      fireEvent.click(getByText('SUM'))
      fireEvent.click(getByText('MAX'))

      expect(getByText('MAX')).toBeInTheDocument()
      expect(getByText(NumericFields[0])).toBeInTheDocument()

      const series = onChange.mock.calls[1][0]
      expect(series.length).toBe(1)
      expect(series[0].type).toBe('barSeries')
      expect(series[0].stackedType).toBe('sideBySide')
      expect(series[0].x).toBe(ByFieldSeriesX)
      expect(series[0].y).toBe(ByFieldSeriesY)

      const ds = onChange.mock.calls[1][1]
      expect(ds).toEqual({
        query: {
          outStatistics: [{
            statisticType: 'max',
            onStatisticField: NumericFields[0],
            outStatisticFieldName: NumericFields[0]
          }, {
            statisticType: 'max',
            onStatisticField: NumericFields[1],
            outStatisticFieldName: NumericFields[1]
          }],
          orderByFields: [`${ByFieldSeriesX} ASC`],
          pageSize: undefined
        }
      })
    })
    it('order by fields change', () => {
      const onChange = jest.fn()

      const series = ColumnTemplate.series
      series[0].id = ByFieldSeriesY
      series[0].x = ByFieldSeriesX
      series[0].y = ByFieldSeriesY

      const props = {
        chartDataSource,
        series: Immutable(series),
        useDataSources,
        onChange
      }
      const { getByText, getBySelector, getAllBySelector } = render(<Container {...props} />)
      expect(getByText('SUM')).toBeInTheDocument()
      expect(getByText(NumericFields[0])).toBeInTheDocument()
      expect(getBySelector(SortFieldSelector)).toHaveTextContent('Category axis')

      fireEvent.click(getBySelector(SortFieldSelector))
      fireEvent.click(getAllBySelector(SortFieldSelectorItem)[1])

      expect(getBySelector(SortFieldSelector)).toHaveTextContent('Value axis')

      const ds = onChange.mock.calls[0][1]
      expect(ds).toEqual({
        query: {
          outStatistics: [{
            statisticType: 'sum',
            onStatisticField: NumericFields[0],
            outStatisticFieldName: NumericFields[0]
          }],
          orderByFields: [`${ByFieldSeriesY} ASC`],
          pageSize: undefined
        }
      })
    })
  })
})
