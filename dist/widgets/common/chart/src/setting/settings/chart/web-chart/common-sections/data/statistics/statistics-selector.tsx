import { React } from 'jimu-core'
import { Select } from 'jimu-ui'

type StatisticType = 'count' | 'sum' | 'avg' | 'min' | 'max' | 'percentile_cont'

export const Statistics = {
  count: 'COUNT',
  avg: 'AVERAGE',
  sum: 'SUM',
  max: 'MAX',
  min: 'MIN',
  percentile_cont: 'MEDIAN'
}

interface StatisticsSelectorProps {
  supportCount: boolean
  supportPercentile: boolean
  value: StatisticType
  onChange: (value: StatisticType) => void
}

const StatisticsSelector = (props: StatisticsSelectorProps) => {
  const { supportCount = true, supportPercentile = true, value, onChange } = props

  const statistics = React.useMemo(() => {
    return Object.keys(Statistics).filter((statistic) => {
      const unsupported = (!supportCount && statistic === 'count') ||
      (!supportPercentile && statistic === 'percentile_cont')
      return !unsupported
    })
  }, [supportCount, supportPercentile])

  const handleChange = (evt: React.MouseEvent<HTMLSelectElement>): void => {
    const value = evt?.currentTarget.value as StatisticType
    onChange?.(value)
  }

  return (<Select
    size='sm'
    value={value}
    onChange={handleChange}
  >
    {statistics.map((st, i) => (
      <option
        value={st}
        key={i}
        className='text-truncate'
      >
        {Statistics[st]}
      </option>
    ))}
  </Select>)
}

export default StatisticsSelector
