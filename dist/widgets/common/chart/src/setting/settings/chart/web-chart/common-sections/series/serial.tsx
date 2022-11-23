
import { React, ImmutableArray, ImmutableObject, Immutable, classNames } from 'jimu-core'
import { Select, hooks, defaultMessages as jimuiDefaultMessage, Switch } from 'jimu-ui'
import { WebChartStackedKinds } from 'jimu-ui/advanced/chart'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { WebChartSeries } from '../../../../../../config'
import defaultMessages from '../../../../../translations/default'
import { SerieStyleSetting } from './style-setting'
import { SettingCollapse } from '../../../../components'
import { DefaultSeriesOutlineColor, getSeriesFillColor } from '../../../../../../utils/default'
import { getSerialStackedType } from '../../../../../../utils/common/serial'
import { styled } from 'jimu-theme'
import { TextAlignment } from '../utils'

interface SerialSeriesSettingProps {
  series: ImmutableArray<WebChartSeries>
  onChange?: (series: ImmutableArray<WebChartSeries>) => void
}

const SeriesContainer = styled.div`
  overflow-y: auto;
  max-height: 340px;
`

const DefaultSeries: any = Immutable([])
export const SerialSeriesSetting = (props: SerialSeriesSettingProps): React.ReactElement => {
  const { series: propSeries = DefaultSeries, onChange } = props
  const valueLabelVisible = propSeries[0]?.dataLabels.visible ?? false

  const rotated = propSeries?.[0]?.rotated
  const alignmentName = rotated ? 'horizontalAlignment' : 'verticalAlignment'
  const alignments = TextAlignment[alignmentName]
  const alignment = propSeries?.[0]?.dataLabels.content[alignmentName] ?? alignments[2]

  const [serieIndex, setSerieIndex] = React.useState<number>(-1)
  const translate = hooks.useTranslate(defaultMessages, jimuiDefaultMessage)
  const handleClick = (index: number): void => {
    setSerieIndex(index)
  }

  const handleChange = (serie: ImmutableObject<WebChartSeries>): void => {
    const series = Immutable.set(propSeries, serieIndex, serie)
    onChange?.(series)
  }

  const handleStackedTypeChange = (
    evt: React.MouseEvent<HTMLSelectElement>
  ): void => {
    const stackedType = evt.currentTarget.value as WebChartStackedKinds
    const series = propSeries?.map(propSerie => {
      return propSerie.set('stackedType', stackedType)
    })
    onChange?.(series)
  }

  const handleDataLabelsVisibleChange = (evt): void => {
    const visible = evt.target.checked
    const series = propSeries?.map(propSerie => {
      return propSerie.setIn(['dataLabels', 'visible'], visible)
    })
    onChange?.(series)
  }

  const handleAlignmentChange = (evt: React.MouseEvent<HTMLSelectElement>): void => {
    const alignment = evt.currentTarget.value
    const series = propSeries?.map(propSerie => {
      return propSerie.setIn(['dataLabels', 'content', alignmentName], alignment)
    })
    onChange?.(series)
  }

  return (
    <div className='serial-series-setting w-100'>
      <SettingRow label={translate('stacking')} className="mt-2">
        <Select
          size='sm'
          className='w-50'
          value={getSerialStackedType(propSeries)}
          onChange={handleStackedTypeChange}
        >
          <option value={WebChartStackedKinds.Side}>
            {translate(WebChartStackedKinds.Side)}
          </option>
          <option value={WebChartStackedKinds.Stacked}>
            {translate(WebChartStackedKinds.Stacked)}
          </option>
          <option value={WebChartStackedKinds.Stacked100}>
            {translate(WebChartStackedKinds.Stacked100)}
          </option>
        </Select>
      </SettingRow>
      <SettingRow label={translate('valueLabel')}>
        <Switch
          checked={valueLabelVisible}
          onChange={handleDataLabelsVisibleChange}
        />
      </SettingRow>
      {valueLabelVisible && <SettingRow
        truncateLabel={true}
        className='label-alignment w-100 mt-2'
        label={translate('alignment')}
        flow='no-wrap'
      >
        <Select
          size='sm'
          className='w-50'
          value={alignment}
          onChange={handleAlignmentChange}
        >
          {alignments.map(alignment => (
            <option key={alignment} value={alignment}>
              {translate(alignment)}
            </option>
          ))}
        </Select>
      </SettingRow>}
      <SeriesContainer className='mt-3'>
        {propSeries?.map((serie, index) => (
          <SettingCollapse
            className={classNames({ 'mt-2': index !== 0 }, 'pr-1')}
            key={index}
            level={1}
            type='primary'
            bottomLine={false}
            label={serie.name}
            isOpen={serieIndex === index}
            onRequestOpen={() => handleClick(index)}
            onRequestClose={() => handleClick(-1)}
          >
            <SerieStyleSetting
              defaultFillColor={getSeriesFillColor(serieIndex)}
              defaultLineColor={DefaultSeriesOutlineColor}
              className='mt-4'
              serie={propSeries?.[serieIndex]}
              onChange={handleChange}
            />
          </SettingCollapse>
        ))}
      </SeriesContainer>
    </div>
  )
}
