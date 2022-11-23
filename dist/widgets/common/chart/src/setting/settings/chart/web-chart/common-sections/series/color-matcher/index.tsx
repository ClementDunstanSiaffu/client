import { React, ImmutableObject, ImmutableArray, Immutable, DataSourceManager, UseDataSource, QueriableDataSource } from 'jimu-core'
import { SettingOutlined } from 'jimu-icons/outlined/application/setting'
import { Button, hooks, Label, Radio } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker'
import defaultMessages from '../../../../../../translations/default'
import { WebChartColoringPatterns, WebChartPieChartSeries } from 'jimu-ui/advanced/chart'
import { CategoryType, ChartDataSource, ColorMatches, ConfigFields, WebChartSeries } from '../../../../../../../config'
import { DefaultColorMatchOtherColor, getFillSymbol, getSeriesFillColor, SeriesColors } from '../../../../../../../utils/default'
import { convertStripColors, getByFieldColorMatches, useLoadingColorMatch } from './utils'
import { COLORS_SET } from './color-list/colors-selector'
import { ColorList } from './color-list'
import { getTheme2 } from 'jimu-theme'
import { MaxColorCount } from '../../../../../../../constants'
import { ISimpleFillSymbol } from '@esri/arcgis-rest-types'
import { getCategoryType } from '../../../../../../../utils/common/serial'

interface ColorMatcherProps {
  useDataSources: ImmutableArray<UseDataSource>
  chartDataSource: ImmutableObject<ChartDataSource>
  series: ImmutableArray<WebChartSeries>
  onChange?: (series: ImmutableArray<WebChartSeries>, chartDataSource?: ImmutableObject<ChartDataSource>) => void
}

const defaultFillColor = getSeriesFillColor(0)
const presetSeriesColors = convertStripColors(SeriesColors)

const defaultFillSymbol = Immutable(
  getFillSymbol(defaultFillColor, 1, 'var(--light-100)')
)

const totalNumberLimit = 50
export const ColorMatcher = (props: ColorMatcherProps): React.ReactElement => {
  const {
    series: propSeries,
    chartDataSource: propChartDataSource,
    useDataSources,
    onChange
  } = props
  const appTheme = getTheme2()
  const unmountRef = React.useRef<boolean>(false)
  hooks.useUnmount(() => { unmountRef.current = true })
  const translate = hooks.useTranslate(defaultMessages)
  const [open, setOpen] = React.useState(false)
  const [colors, setColors] = React.useState(COLORS_SET[0])
  const dataSourceId = useDataSources?.[0]?.dataSourceId
  const dataSource = DataSourceManager.getInstance().getDataSource(dataSourceId) as QueriableDataSource

  const propSerie = propSeries?.[0] as ImmutableObject<WebChartPieChartSeries>
  const query = propChartDataSource?.query
  const propColorMatches = propChartDataSource?.colorMatch?.colorMatches
  const categoryType = getCategoryType(query)

  const numericFields = query?.outStatistics
    ?.map((outStatistic) => outStatistic.onStatisticField)
    .filter((field) => !!field)

  const [loadColorMatches, loading] = useLoadingColorMatch(dataSource, query, propColorMatches, colors, totalNumberLimit)

  const colorType = propSerie?.colorType ?? 'singleColor'
  const fillSymbol = propSerie?.fillSymbol
  const singleColor = fillSymbol?.color as any

  const handleSingleColorChange = (value: string) => {
    value = value || defaultFillColor
    const series = Immutable.setIn(
      propSeries,
      ['0', 'fillSymbol', 'color'],
      value
    )
    onChange?.(series)
  }

  const handleColorTypeChange = async (type: WebChartColoringPatterns) => {
    let chartDataSource = null
    if (type === 'singleColor') {
      let series = Immutable.setIn(propSeries, ['0', 'colorType'], type)
      series = Immutable.setIn(
        series,
        ['0', 'fillSymbol'],
        fillSymbol.set('color', defaultFillColor)
      )
      chartDataSource = propChartDataSource.without('colorMatch')
      onChange?.(series, chartDataSource)
    } else if (type === 'colorMatch') {
      if (categoryType === CategoryType.ByGroup) {
        let series = Immutable.setIn(propSeries, ['0', 'colorType'], type)
        series = Immutable.setIn(
          series,
          ['0', 'fillSymbol'],
          fillSymbol.set('color', DefaultColorMatchOtherColor)
        )
        onChange?.(series)
        loadColorMatches(MaxColorCount).then(({ value: matches }) => {
          if (unmountRef.current) return
          chartDataSource = propChartDataSource
            .setIn(['colorMatch', 'configFields'], ConfigFields)
            .setIn(['colorMatch', 'colorMatches'], matches)
          onChange?.(series, chartDataSource)
        })
      } else if (categoryType === CategoryType.ByField) {
        const matches = getByFieldColorMatches(numericFields, COLORS_SET[0])
        chartDataSource = propChartDataSource
          .setIn(['colorMatch', 'configFields'], ConfigFields)
          .setIn(['colorMatch', 'colorMatches'], matches)
        let series = Immutable.setIn(propSeries, ['0', 'colorType'], type)
        series = Immutable.setIn(
          series,
          ['0', 'fillSymbol'],
          defaultFillSymbol.set('color', DefaultColorMatchOtherColor)
        )
        onChange?.(series, chartDataSource)
      }
    }
  }

  const handleColorMatchesChange = (colorMatches: ColorMatches) => {
    const chartDataSource = propChartDataSource.setIn(
      ['colorMatch', 'colorMatches'],
      colorMatches
    )
    onChange?.(propSeries, chartDataSource)
  }

  const handleOtherChange = (
    fillSymbol: ImmutableObject<ISimpleFillSymbol>
  ) => {
    const series = Immutable.setIn(propSeries, ['0', 'fillSymbol'], fillSymbol)
    onChange?.(series)
  }

  return (
    <>
      <SettingRow label={translate('themeSettingColorMode')} flow='wrap'>
        <div role='radiogroup' className='w-100'>
          <div className='d-flex align-items-center justify-content-between'>
            <Label
              title={translate('singleColor')}
              className='d-flex align-items-center text-truncate'
              style={{ width: '60%' }}
            >
              <Radio
                name='singleColor'
                className='mr-2'
                checked={colorType === 'singleColor'}
                onChange={() => handleColorTypeChange('singleColor')}
              />
              {translate('singleColor')}
            </Label>
            {colorType === 'singleColor' && (
              <ThemeColorPicker
                specificTheme={appTheme}
                presetColors={presetSeriesColors}
                value={singleColor}
                onChange={handleSingleColorChange}
              />
            )}
          </div>
          <div className='d-flex align-items-center justify-content-between'>
            <Label
              title={translate('byCategory')}
              className='d-flex align-items-center text-truncate'
              style={{ width: '60%' }}
            >
              <Radio
                name='radio1'
                className='mr-2'
                checked={colorType === 'colorMatch'}
                onChange={() => handleColorTypeChange('colorMatch')}
              />
              {translate('byCategory')}
            </Label>
            {colorType === 'colorMatch' && (
              <Button
                type='tertiary'
                active={open}
                icon
                size='sm'
                onClick={() => setOpen(!open)}
              >
                <SettingOutlined />
              </Button>
            )}
          </div>
        </div>
      </SettingRow>
      <ColorList
        open={open}
        onRequestClose={() => setOpen(false)}
        categoryType={categoryType}
        loadColorMatches={loadColorMatches}
        loading={loading}
        value={propColorMatches}
        other={fillSymbol}
        colors={colors}
        onColorsChange={setColors}
        onChange={handleColorMatchesChange}
        onOtherChange={handleOtherChange} />
    </>
  )
}
