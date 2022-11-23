import { React, ImmutableArray, UseDataSource, Immutable, ImmutableObject } from 'jimu-core'
import { hooks, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { ChartDataSource, WebChartSeries } from '../../../../../../../../config'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { FieldSelector, SorteSetting } from '../../../../components'
import defaultMessages from '../../../../../../../translations/default'
import { createByFieldQuery, createByFieldSeries, getByFieldOrderFields } from './utils'
import { ByFieldSeriesX, ByFieldSeriesY } from '../../../../../../../../constants'
import StatisticsSelector from '../statistics-selector'

export interface ByFieldDataProps {
  series: ImmutableArray<WebChartSeries>
  chartDataSource: ImmutableObject<ChartDataSource>
  useDataSources: ImmutableArray<UseDataSource>
  supportPercentile?: boolean
  onChange?: (series: ImmutableArray<WebChartSeries>, chartDataSource: ImmutableObject<ChartDataSource>) => void
}

const defaultChartDataSource = Immutable({}) as ImmutableObject<ChartDataSource>

export const ByFieldData = (props: ByFieldDataProps): React.ReactElement => {
  const translate = hooks.useTranslate(defaultMessages, jimuiDefaultMessage)
  const {
    chartDataSource: propChartDataSource = defaultChartDataSource,
    useDataSources,
    series: propSeries,
    supportPercentile,
    onChange
  } = props

  const x = ByFieldSeriesX
  const y = ByFieldSeriesY

  const query = propChartDataSource.query
  const outStatistics = query?.outStatistics
  const numericFields = outStatistics?.map((outStatistic) => outStatistic.onStatisticField).filter(field => !!field)
  const statisticType: any = outStatistics?.[0]?.statisticType ?? 'sum'
  const orderByFields = query?.orderByFields ?? [`${x} ASC`]

  const seriesName = React.useMemo(() => translate('sumOfValue'), [translate])

  const orderFields = React.useMemo(() => getByFieldOrderFields(propSeries, translate), [translate, propSeries])

  const handleStatisticTypeChange = (statisticType): void => {
    const series = createByFieldSeries({ x, y, name: seriesName, propSeries })
    const query = createByFieldQuery({ statisticType, numericFields }, orderByFields)
    const chartDataSource = propChartDataSource.set('query', query)
    onChange(Immutable(series), chartDataSource)
  }

  const handleNumericFieldsChange = (numericFields: ImmutableArray<string>): void => {
    const series = createByFieldSeries({ x, y, name: seriesName, propSeries })
    const query = createByFieldQuery({ statisticType, numericFields }, orderByFields)
    const chartDataSource = propChartDataSource.set('query', query)
    onChange(Immutable(series), chartDataSource)
  }

  const handleOrderChanged = (value: string): void => {
    const query = createByFieldQuery({ statisticType, numericFields }, [value])
    const chartDataSource = propChartDataSource.set('query', query)
    onChange(propSeries, chartDataSource)
  }

  return (
    <>
      <SettingRow label={translate('statistics')} flow='wrap'>
        <StatisticsSelector
          supportCount={false}
          supportPercentile={supportPercentile}
          value={statisticType}
          onChange={handleStatisticTypeChange}
        />
      </SettingRow>

      <SettingRow label={translate('numberFields')} flow='wrap'>
        <FieldSelector
          className='numeric-fields-selector'
          type='numeric'
          isMultiple={true}
          useDataSources={useDataSources}
          fields={numericFields}
          onChange={handleNumericFieldsChange}
        />
      </SettingRow>

      <SettingRow label={translate('sortBy')} flow='wrap'>
        <SorteSetting
          value={orderByFields?.[0]}
          fields={orderFields}
          onChange={handleOrderChanged}
        />
      </SettingRow>
    </>
  )
}
