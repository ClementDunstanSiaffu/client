import { React, ImmutableObject, ImmutableArray, Immutable } from 'jimu-core'
import { hooks, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { WebChartLegend, WebChartPieChartSeries, WebChartText } from 'jimu-ui/advanced/chart'
import { IWebChart } from '../../../../../../config'
import defaultMessages from '../../../../../translations/default'
import { Title } from './components/title'
import { Legend } from './components/legend'
import { Angle } from './components/angle'
import { InnerRadius } from './components/radius'

interface PieGeneralSettingProps {
  value: ImmutableObject<Partial<IWebChart>>
  onChange: (value: ImmutableObject<Partial<IWebChart>>) => void
}

export const PieGeneralSetting = (
  props: PieGeneralSettingProps
): React.ReactElement => {
  const { value, onChange } = props

  const title = value.title
  const footer = value.footer
  const legend = value.legend
  const propSeries = value.series as ImmutableArray<WebChartPieChartSeries>
  const angle = propSeries?.[0]?.startAngle ?? 0
  const innerRadius = propSeries?.[0]?.innerRadius ?? 0

  const translate = hooks.useTranslate(defaultMessages, jimuiDefaultMessage)

  const handleTitleChange = (title: ImmutableObject<WebChartText>): void => {
    onChange?.(value.set('title', title))
  }

  const onFooterChange = (footer: ImmutableObject<WebChartText>): void => {
    onChange?.(value.set('footer', footer))
  }

  const handleAngleChange = (start: number, end: number) => {
    let series = Immutable.setIn(propSeries, ['0', 'startAngle'], start)
    series = Immutable.setIn(series, ['0', 'endAngle'], end)
    onChange?.(value.set('series', series))
  }

  const handleInnerRadiusChange = (radius: number) => {
    const series = Immutable.setIn(propSeries, ['0', 'innerRadius'], radius)
    onChange?.(value.set('series', series))
  }

  const handleLegendChange = (
    legend: ImmutableObject<WebChartLegend>
  ): void => {
    onChange?.(value.set('legend', legend))
  }

  return (
    <div className='pie-general-setting w-100 mt-2'>
      <Title
        type='input'
        value={title}
        label={translate('chartTitle')}
        onChange={handleTitleChange}
      />
      <Title
        type='area'
        value={footer}
        label={translate('description')}
        onChange={onFooterChange}
      />
      <Angle value={angle} onChange={handleAngleChange} />
      <InnerRadius value={innerRadius} onChange={handleInnerRadiusChange} />
      <Legend value={legend} onChange={handleLegendChange} />
    </div>
  )
}
