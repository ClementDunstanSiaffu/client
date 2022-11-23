import { React, ImmutableArray, ImmutableObject, Immutable } from 'jimu-core'
import { hooks, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { WebChartAxis } from 'jimu-ui/advanced/chart'
import defaultMessages from '../../../../../translations/default'
import { SettingCollapse } from '../../../../components'
import { AxisStyleSetting } from './axis-style-setting'

export interface NumericAxesProps {
  rotated: boolean
  axes: ImmutableArray<WebChartAxis>
  showLogarithmicScale?: boolean
  onChange?: (axes: ImmutableArray<WebChartAxis>) => void
}

export const NumericAxes = (props: NumericAxesProps): React.ReactElement => {
  const { showLogarithmicScale, axes: propAxes, onChange, rotated } = props
  const [axisIndex, setAxisIndex] = React.useState<number>(-1)
  const translate = hooks.useTranslate(defaultMessages, jimuiDefaultMessage)

  const handleClick = (index: number): void => {
    setAxisIndex(index)
  }

  const handleChange = (axis: ImmutableObject<WebChartAxis>): void => {
    onChange?.(Immutable.set(propAxes, axisIndex, axis))
  }

  return (
    <div className='numeric-axes-setting w-100'>
      {propAxes?.map((_, index) => {
        const name = index === 0 ? 'xAxis' : 'yAxis'
        const isHorizontal = (name === 'xAxis' && !rotated) || (name === 'yAxis' && rotated)

        return (
          <SettingCollapse
            level={1}
            className='mt-2'
            key={index}
            bottomLine={index === 0}
            label={translate(name)}
            isOpen={axisIndex === index}
            onRequestOpen={() => handleClick(index)}
            onRequestClose={() => handleClick(-1)}
          >
            <AxisStyleSetting
              className='mt-3'
              type='value'
              isHorizontal={isHorizontal}
              axis={propAxes?.[index]}
              onChange={handleChange}
              showLogarithmicScale={showLogarithmicScale}
            />
          </SettingCollapse>
        )
      })}
    </div>
  )
}
