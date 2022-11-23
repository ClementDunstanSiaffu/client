import {
  React,
  Immutable,
  ImmutableArray,
  ImmutableObject,
  UseDataSource
} from 'jimu-core'
import {
  ChartDataSource,
  HistogramOverlaysType,
  WebChartSeries
} from '../../../../../../config'
import {
  hooks,
  defaultMessages as jimuiDefaultMessage,
  Switch,
  Select,
  NumericInput
} from 'jimu-ui'
import defaultMessages from '../../../../../translations/default'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { FieldSelector, FillSymbolSetting } from '../../components'
import {
  getDefaultSeriesFillColor,
  getDefaultSeriesOutlineColor,
  getDefaultHistomgramOverlayColor,
  SeriesColors
} from '../../../../../../utils/default'
import { ISimpleFillSymbol } from '@esri/arcgis-rest-types'
import { createHistogramQuery, createHistogramSeries } from './utils'
import {
  WebChartDataTransformations,
  WebChartHistogramSeries,
  WebChartOverlay
} from 'jimu-ui/advanced/chart'
import { HistogramOverlaySetting } from './overlay'

export interface HistogramDataProps {
  series: ImmutableArray<WebChartSeries>
  chartDataSource: ImmutableObject<ChartDataSource>
  useDataSources: ImmutableArray<UseDataSource>
  onChange?: (
    series: ImmutableArray<WebChartSeries>,
    chartDataSource?: ImmutableObject<ChartDataSource>,
    overlaysVisible?: boolean
  ) => void
}

export const isOverlaysVisible = (
  series: ImmutableArray<WebChartSeries>
): boolean => {
  const overlays = (series?.[0] as ImmutableObject<WebChartHistogramSeries>)
    ?.overlays
  if (!overlays) {
    return false
  }
  return Object.values(overlays).some(
    (overlay: WebChartOverlay) => overlay.visible
  )
}

const presetColors = SeriesColors.map((color) => ({
  label: color,
  value: color,
  color: color
}))

const defaultFillColor = getDefaultSeriesFillColor()
const defaultLineColor = getDefaultSeriesOutlineColor('histogramSeries')

const defaultChartDataSource = Immutable({}) as ImmutableObject<ChartDataSource>

const HistogramData = (
  props: HistogramDataProps
): React.ReactElement => {
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

  const numericField = query?.outFields?.[0]
  const propSerie = propSeries?.[0] as ImmutableObject<WebChartHistogramSeries>

  const dataTransformationType = propSerie?.dataTransformationType
  const binCount = propSerie?.binCount
  const fillSymbol = propSerie?.fillSymbol
  const valueLabelVisible = propSerie?.dataLabels.visible ?? false

  // Overlays
  const meanOverlay = propSerie?.overlays?.mean
  const medianOverlay = propSerie?.overlays?.median
  const stdOverlay = propSerie?.overlays?.standardDeviation
  const codOverlay = propSerie?.overlays?.comparisonDistribution

  const handleNumberFieldChange = (numericFields: ImmutableArray<string>) => {
    const x = numericFields?.[0]
    const orderByFields = [`${x} ASC`]
    const series = createHistogramSeries(x, propSeries, dataSourceId)
    const query = createHistogramQuery(x, orderByFields, pageSize)
    const chartDataSource = propChartDataSource.set('query', query)
    onChange(Immutable(series), chartDataSource)
  }

  const handleDataTransformationTypeChange = (
    evt: React.MouseEvent<HTMLSelectElement>
  ): void => {
    const dataTransformationType = evt.currentTarget
      .value as WebChartDataTransformations
    const series = Immutable.setIn(
      propSeries,
      ['0', 'dataTransformationType'],
      dataTransformationType
    )
    onChange?.(series)
  }

  const handleBinCountChange = (binCount: number): void => {
    const series = Immutable.setIn(propSeries, ['0', 'binCount'], binCount)
    onChange?.(series)
  }

  const handleFillSymbolChange = (
    value: ImmutableObject<ISimpleFillSymbol>
  ): void => {
    const series = Immutable.setIn(propSeries, ['0', 'fillSymbol'], value)
    onChange?.(series)
  }

  const handleDataLabelsVisibleChange = (evt): void => {
    const visible = evt.target.checked
    const series = Immutable.setIn(
      propSeries,
      ['0', 'dataLabels', 'visible'],
      visible
    )
    onChange?.(series)
  }

  const handleOverlayVisibleChange = (
    type: HistogramOverlaysType,
    visible: boolean
  ): void => {
    const created = propSerie.overlays?.[type]?.created ?? false
    let series = Immutable.setIn(
      propSeries,
      ['0', 'overlays', type, 'visible'],
      visible
    )
    if (!created) {
      series = Immutable.setIn(series, ['0', 'overlays', type, 'created'], true)
    }
    const overlaysVisible = isOverlaysVisible(series)
    onChange?.(series, propChartDataSource, overlaysVisible)
  }

  const handleOverlaysChange = (
    type: HistogramOverlaysType,
    value: ImmutableObject<WebChartOverlay>
  ): void => {
    const series = Immutable.setIn(propSeries, ['0', 'overlays', type], value)
    onChange?.(series)
  }

  return (
    <>
      <SettingRow level={2} label={translate('variables')} flow='wrap'>
        <SettingRow
          className='w-100'
          level={3}
          label={translate('numericFields')}
          flow='wrap'
        >
          <FieldSelector
            className='numeric-field-selector'
            type='numeric'
            useDataSources={useDataSources}
            isMultiple={false}
            fields={numericField ? Immutable([numericField]) : undefined}
            onChange={handleNumberFieldChange}
          />
        </SettingRow>
        <SettingRow
          className='w-100'
          level={3}
          label={translate('transformation')}
          flow='wrap'
        >
          <Select
            size='sm'
            disabled={!numericField}
            value={dataTransformationType}
            onChange={handleDataTransformationTypeChange}
          >
            <option value={WebChartDataTransformations.None}>
              {translate('none')}
            </option>
            <option value={WebChartDataTransformations.Log}>
              {translate('logarithmic')}
            </option>
            <option value={WebChartDataTransformations.Sqrt}>
              {translate('squareRoot')}
            </option>
          </Select>
        </SettingRow>
      </SettingRow>
      <SettingRow level={2} label={translate('bins')} flow='wrap'>
        <SettingRow
          className='w-100'
          level={3}
          label={translate('numberOfBins')}
          flow='no-wrap'
        >
          <NumericInput
            className='w-50'
            value={binCount}
            onAcceptValue={handleBinCountChange}
            min={1}
            max={64}
            step={1}
            showHandlers={false}
          />
        </SettingRow>
        <SettingRow className='w-100' level={3} flow='no-wrap'>
          <FillSymbolSetting
            defaultFillColor={defaultFillColor}
            defaultLineColor={defaultLineColor}
            presetFillColors={presetColors}
            value={fillSymbol}
            onChange={handleFillSymbolChange}
          />
        </SettingRow>
        <SettingRow className='w-100' level={2} label={translate('valueLabel')} flow='no-wrap'>
          <Switch
            checked={valueLabelVisible}
            onChange={handleDataLabelsVisibleChange}
          />
        </SettingRow>
      </SettingRow>
      <SettingRow level={2} label={translate('statisticGraph')} flow='wrap'>
        <SettingRow className='w-100' level={3} label={translate('mean')} flow='no-wrap'>
          <Switch
            checked={meanOverlay.visible}
            onChange={(evt) =>
              handleOverlayVisibleChange('mean', evt.target.checked)
            }
          />
        </SettingRow>
        {meanOverlay.visible && (
          <SettingRow className='w-100' level={3} flow='wrap'>
            <HistogramOverlaySetting
              defaultColor={getDefaultHistomgramOverlayColor('mean')}
              value={meanOverlay}
              onChange={(value) => handleOverlaysChange('mean', value)}
            />
          </SettingRow>
        )}
        <SettingRow className='w-100' level={3} label={translate('median')} flow='no-wrap'>
          <Switch
            checked={medianOverlay.visible}
            onChange={(evt) =>
              handleOverlayVisibleChange('median', evt.target.checked)
            }
          />
        </SettingRow>
        {medianOverlay.visible && (
          <SettingRow className='w-100' level={3} flow='wrap'>
            <HistogramOverlaySetting
              defaultColor={getDefaultHistomgramOverlayColor('median')}
              value={medianOverlay}
              onChange={(value) => handleOverlaysChange('median', value)}
            />
          </SettingRow>
        )}
        <SettingRow
          className='w-100'
          level={3}
          label={translate('normalDistribution')}
          flow='no-wrap'
        >
          <Switch
            checked={codOverlay.visible}
            onChange={(evt) =>
              handleOverlayVisibleChange(
                'comparisonDistribution',
                evt.target.checked
              )
            }
          />
        </SettingRow>
        {codOverlay.visible && (
          <SettingRow className='w-100' level={3} flow='wrap'>
            <HistogramOverlaySetting
              defaultColor={getDefaultHistomgramOverlayColor(
                'comparisonDistribution'
              )}
              value={codOverlay}
              onChange={(value) =>
                handleOverlaysChange('comparisonDistribution', value)
              }
            />
          </SettingRow>
        )}
        <SettingRow
          className='w-100'
          level={3}
          label={translate('standardDeviation')}
          flow='no-wrap'
        >
          <Switch
            checked={stdOverlay.visible}
            onChange={(evt) =>
              handleOverlayVisibleChange(
                'standardDeviation',
                evt.target.checked
              )
            }
          />
        </SettingRow>
        {stdOverlay.visible && (
          <SettingRow className='w-100' level={3} flow='wrap'>
            <HistogramOverlaySetting
              defaultColor={getDefaultHistomgramOverlayColor(
                'standardDeviation'
              )}
              value={stdOverlay}
              onChange={(value) =>
                handleOverlaysChange('standardDeviation', value)
              }
            />
          </SettingRow>
        )}
      </SettingRow>
    </>
  )
}

export default HistogramData
