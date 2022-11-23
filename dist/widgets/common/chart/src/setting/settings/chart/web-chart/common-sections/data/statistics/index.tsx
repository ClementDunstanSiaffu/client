import { React, ImmutableArray, UseDataSource, Immutable, ImmutableObject } from 'jimu-core'
import { Select, hooks, defaultMessages as jimuiDefaultMessage, NumericInput } from 'jimu-ui'
import { CategoryType, ChartDataSource, WebChartSeries } from '../../../../../../../config'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import defaultMessages from '../../../../../../translations/default'
import { ByGroupData } from './by-group'
import { ByFieldData } from './by-field'
import { getCategoryType } from '../../../../../../../utils/common/serial'
import { createDefaultSerie, createDefaultQuery } from './utils'
import { ChartTypes } from 'jimu-ui/advanced/chart'
import { usePercentileStatisticsSupport } from '../../../../../utils'

export interface StatisticsDataSettingProps extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  type: ChartTypes
  series: ImmutableArray<WebChartSeries>
  chartDataSource: ImmutableObject<ChartDataSource>
  useDataSources: ImmutableArray<UseDataSource>
  onChange?: (series: ImmutableArray<WebChartSeries>, dataSource?: ImmutableObject<ChartDataSource>) => void
}

const CategoryTypes = {
  [CategoryType.ByGroup]: 'byGroup',
  [CategoryType.ByField]: 'byField'
}

const defaultChartDataSource = Immutable({}) as ImmutableObject<ChartDataSource>
export const StatisticsDataSetting = (props: StatisticsDataSettingProps): React.ReactElement => {
  const translate = hooks.useTranslate(defaultMessages, jimuiDefaultMessage)
  const {
    type = 'barSeries',
    useDataSources,
    chartDataSource: propChartDataSource = defaultChartDataSource,
    series,
    onChange,
    ...others
  } = props

  const supportPercentile = usePercentileStatisticsSupport(useDataSources?.[0]?.dataSourceId)
  const query = propChartDataSource.query
  const categoryType = getCategoryType(query) ?? CategoryType.ByGroup
  const pageSize = query?.pageSize
  const showMaxCategories = categoryType !== CategoryType.ByField

  const handleCategoryTypeChange = (evt: React.MouseEvent<HTMLSelectElement>): void => {
    const categoryType = evt?.currentTarget.value as CategoryType
    const serie = createDefaultSerie(series?.[0])
    const query = createDefaultQuery(categoryType)
    const chartDataSource = propChartDataSource.set('query', query).without('colorMatch')
    onChange?.(Immutable([serie]), chartDataSource)
  }

  const handlePageSizeChange = (value: number): void => {
    const pageSize = value ? Math.floor(+value) : undefined
    const chartDataSource = propChartDataSource.setIn(['query', 'pageSize'], pageSize)
    onChange?.(series, chartDataSource)
  }

  return (
    <div className='chart-data-setting w-100' {...others}>
      <SettingRow label={translate('categoryType')} flow='wrap' className='mt-2'>
        <Select
          size='sm'
          value={categoryType}
          onChange={handleCategoryTypeChange}
        >
          {Object.keys(CategoryType).map((categoryType, i) => (
            <option value={CategoryType[categoryType]} key={i} className='text-truncate'>
              {translate(CategoryTypes[CategoryType[categoryType]])}
            </option>
          ))}
        </Select>
      </SettingRow>
      <>
        {
          categoryType === CategoryType.ByGroup && <ByGroupData
            type={type}
            series={series}
            supportPercentile={supportPercentile}
            chartDataSource={propChartDataSource}
            useDataSources={useDataSources}
            onChange={onChange}
          ></ByGroupData>
        }
        {
          categoryType === CategoryType.ByField && <ByFieldData
            series={series}
            chartDataSource={propChartDataSource}
            supportPercentile={supportPercentile}
            useDataSources={useDataSources}
            onChange={onChange}
          ></ByFieldData>
        }
      </>

      {showMaxCategories && <SettingRow label={translate('maxCategories')} flow='no-wrap'>
        <NumericInput
          style={{ width: '60px' }}
          defaultValue={pageSize}
          onAcceptValue={handlePageSizeChange}
          min={1}
          step={1}
          size='sm'
          showHandlers={false}
        />
      </SettingRow>}
    </div>
  )
}
