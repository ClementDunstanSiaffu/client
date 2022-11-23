import { React, classNames, IMSqlExpression } from 'jimu-core'
import { Button, Popper, defaultMessages, hooks, Badge, Tooltip } from 'jimu-ui'
import { SqlExpressionRuntime } from 'jimu-ui/basic/sql-expression-runtime'
import { useChartRuntimeDispatch, useChartRuntimeState } from '../../../state'
import { FilterOutlined } from 'jimu-icons/outlined/editor/filter'

export interface FilterPickerProps {
  className?: string
  widgetId: string
  filter: IMSqlExpression
  onChange?: (filter?: IMSqlExpression) => void
}

export const FilterPicker = (props: FilterPickerProps): React.ReactElement => {
  const { dataSource } = useChartRuntimeState()
  const dispatch = useChartRuntimeDispatch()
  const translate = hooks.useTranslate(defaultMessages)
  const ref = React.useRef<HTMLButtonElement>(null)
  const { className, filter: initFilter, widgetId } = props

  const [filter, setFilter] = React.useState<IMSqlExpression>(initFilter)
  const [applied, setApplied] = React.useState(false)
  const [showFilter, setShowFilter] = React.useState(false)
  const toggleFilterVisible = (): void => setShowFilter(v => !v)

  hooks.useUpdateEffect(() => {
    setFilter?.(initFilter)
    setApplied(false)
    setShowFilter(false)
    dispatch({ type: 'SET_FILTER', value: null })
  }, [initFilter])

  const handleChange = (filter: IMSqlExpression): void => {
    setApplied(false)
    setFilter?.(filter)
  }

  const handleApply = (): void => {
    setApplied(true)
    dispatch({ type: 'SET_FILTER', value: filter })
  }

  const handleClear = (): void => {
    setApplied(false)
    dispatch({ type: 'SET_FILTER', value: null })
  }

  return (
    <>
      <Badge className={classNames('filter-picker', className)} dot hideBadge={!applied}>
        <Tooltip title={translate('filter')}>
          <Button
            size='sm'
            icon
            ref={ref}
            type='tertiary'
            onClick={toggleFilterVisible}
          >
            <FilterOutlined />
          </Button>
        </Tooltip>
      </Badge>
      {showFilter && (
        <Popper
          open={showFilter}
          reference={ref.current}
          className='p-2'
          toggle={() => setShowFilter(false)}
        >
          <div>
            <SqlExpressionRuntime
              widgetId={widgetId}
              dataSource={dataSource}
              expression={filter}
              onChange={handleChange}
            />
            <div
              className={classNames('d-flex w-100 filter-button-con', {
                'mt-3': showFilter
              })}
            >
              <Button
                disabled={applied}
                size='sm'
                onClick={handleApply}
                type='primary'
                title={translate('apply')}
              >
                {translate('apply')}
              </Button>
              <Button
                className='ml-3'
                disabled={!applied}
                size='sm'
                onClick={handleClear}
                title={translate('clear')}
              >
                {translate('clear')}
              </Button>
            </div>
          </div>
        </Popper>
      )}
    </>
  )
}
