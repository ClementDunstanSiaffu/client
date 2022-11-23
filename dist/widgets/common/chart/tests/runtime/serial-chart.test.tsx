import {
  React,
  DataSourceManager,
  Immutable,
  ImmutableObject
} from 'jimu-core'
import { mockDataSource } from '../mock-data-source'
import WithInlineDataChart from '../../src/runtime/runtimes/chart/web-chart/with-inline-data'
import { withStoreIntlRender } from 'jimu-for-test'
import { IWebChart } from '../../src/config'
import { ChartRuntimeStateProvider } from '../../src/runtime/runtimes'

mockDataSource()

jest.mock('jimu-ui/advanced/chart', () => {
  return {
    ...jest.requireActual<Record<string, any>>('jimu-ui/advanced/chart'),
    Chart: ({ data, webMapWebChart }) => {
      const rawWebChart = JSON.stringify(webMapWebChart || {})
      const rawData = JSON.stringify(data || {})
      return (
        <div className='chart'>
          <textarea id='chart-config' value={rawWebChart} />
          <textarea id='chart-data' value={rawData} />
        </div>
      )
    }
  }
})

describe('<WebChart />', () => {
  let dataSource = null
  let useDataSources = null
  beforeAll(async () => {
    useDataSources = [
      {
        dataSourceId: 'ds1',
        mainDataSourceId: 'ds1'
      }
    ]
    try {
      dataSource = await DataSourceManager.getInstance().createDataSourceByUseDataSource(
        useDataSources[0]
      )
    } catch (err) {
      console.log(err)
    }
  })
  it('should render ok', () => {
    const series = Immutable([
      {
        type: 'barSeries',
        rotated: false,
        colorType: 'singleColor',
        stackedType: 'sideBySide',
        x: 'Year',
        name: 'District',
        id: 'sb453',
        y: 'sb453'
      }
    ]) as any

    const axes = Immutable([
      {
        type: 'chartAxis',
        visible: true,
        isLogarithmic: false,
        valueFormat: {
          type: 'category',
          characterLimit: 10
        }
      },
      {
        type: 'chartAxis',
        visible: true,
        isLogarithmic: false,
        valueFormat: {
          type: 'number',
          intlOptions: {}
        }
      }
    ]) as any

    const widgetId = 'widget_0'
    const webChart = Immutable({
      version: '1.0.0',
      series,
      axes,
      dataSource: {
        query: {
          groupByFieldsForStatistics: ['Year'],
          outStatistics: [
            {
              onStatisticField: 'District',
              outStatisticFieldName: 'sb453',
              statisticType: 'sum'
            }
          ],
          orderByFields: ['Year ASC']
        }
      }
    }) as ImmutableObject<IWebChart>
    const { getBySelector, getByText, queryByText } = withStoreIntlRender()(
      <ChartRuntimeStateProvider defaultState={{ outputDataSource: dataSource }}>
        <WithInlineDataChart
          webChart={webChart}
          widgetId={widgetId}
          outputDataSourceId=''
          useDataSource={useDataSources[0]}
          onStatusChange={() => {}}
        />
      </ChartRuntimeStateProvider>
    )
    expect(getBySelector('.chart')).toBeInTheDocument()
    expect(queryByText('query')).not.toBeInTheDocument()
    expect(getByText(/"version":"1.0.0"/)).toBeInTheDocument()
  })
})
