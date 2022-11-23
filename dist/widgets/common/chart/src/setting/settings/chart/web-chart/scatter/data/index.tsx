import { ChartDataSource, WebChartSeries } from '../../../../../../config'
import { Immutable, ImmutableArray, ImmutableObject, UseDataSource } from 'jimu-core'
import { hooks, defaultMessages as jimuiDefaultMessage, Switch } from 'jimu-ui'
import defaultMessages from '../../../../../translations/default'
import React from 'react'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { FieldSelector, LineSymbolSetting, MarkSymbolSetting } from '../../components'
import { DefaultScatterPlotTrandLineColor, getDefaultSeriesFillColor, getDefaultSeriesOutlineColor, SeriesColors } from '../../../../../../utils/default'
import { ISimpleLineSymbol, ISimpleMarkerSymbol } from '@esri/arcgis-rest-types'
import { createScatterPlotQuery, createScatterPlotSeries } from './utils'
import { WebChartScatterPlotSeries } from 'jimu-ui/advanced/chart'

export interface ScatterPlotDataProps {
  series: ImmutableArray<WebChartSeries>
  chartDataSource: ImmutableObject<ChartDataSource>
  useDataSources: ImmutableArray<UseDataSource>
  onChange?: (series: ImmutableArray<WebChartSeries>, chartDataSource: ImmutableObject<ChartDataSource>, trendLineVisible?: boolean) => void
}

const presetColors = SeriesColors.map((color) => ({
  label: color,
  value: color,
  color: color
}))

const defaultFillColor = getDefaultSeriesFillColor()
const defaultLineColor = getDefaultSeriesOutlineColor('scatterSeries')

const defaultChartDataSource = Immutable({}) as ImmutableObject<ChartDataSource>

export const ScatterPlotData = (props: ScatterPlotDataProps): React.ReactElement => {
  const translate = hooks.useTranslate(defaultMessages, jimuiDefaultMessage)
  const {
    chartDataSource: propChartDataSource = defaultChartDataSource,
    useDataSources,
    series: propSeries,
    onChange
  } = props

  const dataSourceId = useDataSources?.[0]?.dataSourceId
  const query = propChartDataSource.query
  const pageSize = query?.pageSize

  const xNumericField = query?.outFields?.[0]
  const yNumericField = query?.outFields?.[1]
  const propSerie = propSeries?.[0] as ImmutableObject<WebChartScatterPlotSeries>
  const showLinearTrend = propSerie.overlays?.trendLine.visible
  const trendLine = propSerie.overlays?.trendLine.symbol

  const handleXAxisNumberFieldChange = (numericFields: ImmutableArray<string>) => {
    const x = numericFields?.[0]
    const orderByFields = [`${x} ASC`]
    const series = createScatterPlotSeries({ x, y: yNumericField, propSeries }, dataSourceId)
    const query = createScatterPlotQuery({ x, y: yNumericField }, orderByFields, pageSize)
    const chartDataSource = propChartDataSource.set('query', query)
    onChange(Immutable(series), chartDataSource)
  }
  const handleYAxisNumberFieldChange = (numericFields: ImmutableArray<string>) => {
    const y = numericFields?.[0]
    const orderByFields = [`${xNumericField} ASC`]
    const series = createScatterPlotSeries({ x: xNumericField, y, propSeries }, dataSourceId)
    const query = createScatterPlotQuery({ x: xNumericField, y }, orderByFields, pageSize)
    const chartDataSource = propChartDataSource.set('query', query)
    onChange(Immutable(series), chartDataSource)
  }

  const handleShowLinearTrendChange = (_, checked: boolean) => {
    const overlays = propSerie?.overlays.setIn(['trendLine', 'visible'], checked)
    const series = Immutable.setIn(propSeries, ['0', 'overlays'], overlays)
    onChange?.(series, propChartDataSource, checked)
  }

  const handleTrendLineSymbolChange = (value: ImmutableObject<ISimpleLineSymbol>) => {
    const overlays = propSerie?.overlays.setIn(['trendLine', 'symbol'], value)
    const series = Immutable.setIn(propSeries, ['0', 'overlays'], overlays)
    onChange?.(series, propChartDataSource)
  }

  const handleMarkerSymbolChange = (value: ImmutableObject<ISimpleMarkerSymbol>) => {
    const series = Immutable.setIn(propSeries, ['0', 'markerSymbol'], value)
    onChange?.(series, propChartDataSource)
  }

  return (<>
    <SettingRow level={2} label={translate('variables')} flow='wrap'>
      <SettingRow className='w-100' level={3} label={translate('xAxisNumber')} flow='wrap'>
        <FieldSelector
          className='x-numeric-field-selector'
          type='numeric'
          useDataSources={useDataSources}
          isMultiple={false}
          fields={xNumericField ? Immutable([xNumericField]) : undefined}
          onChange={handleXAxisNumberFieldChange}
        />
      </SettingRow>
      <SettingRow className='w-100' level={3} label={translate('yAxisNumber')} flow='wrap'>
        <FieldSelector
          className='y-numeric-field-selector'
          type='numeric'
          useDataSources={useDataSources}
          isMultiple={false}
          fields={yNumericField ? Immutable([yNumericField]) : undefined}
          onChange={handleYAxisNumberFieldChange}
        />
      </SettingRow>
    </SettingRow>
    <SettingRow level={2} label={translate('statistics')} flow='wrap'>
      <SettingRow className='w-100' level={3} label={translate('showLinearTrend')} flow='no-wrap'>
        <Switch checked={showLinearTrend} onChange={handleShowLinearTrendChange} />
      </SettingRow>
      <SettingRow className='w-100' level={3} flow='no-wrap'>
        {showLinearTrend && <LineSymbolSetting
          defaultColor={DefaultScatterPlotTrandLineColor}
          presetColors={presetColors}
          value={trendLine}
          onChange={handleTrendLineSymbolChange}
        />}
      </SettingRow>
    </SettingRow>
    <SettingRow level={2} label={translate('symbol')} flow='wrap'>
      <MarkSymbolSetting
        value={propSerie?.markerSymbol}
        defaultFillColor={defaultFillColor}
        defaultLineColor={defaultLineColor}
        presetFillColors={presetColors}
        presetLineColors={presetColors}
        onChange={handleMarkerSymbolChange} />
    </SettingRow>
  </>)
}
