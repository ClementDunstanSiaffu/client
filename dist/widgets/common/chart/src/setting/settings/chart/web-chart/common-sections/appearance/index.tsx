import { React, ImmutableObject } from 'jimu-core'
import { hooks, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { IWebChart } from '../../../../../../config'
import { DefaultBgColor } from '../../../../../../utils/default'
import defaultMessages from '../../../../../translations/default'
import { Background } from './background'
import { ElementPanel } from './element-panel'
import { TextStyle, getTextElements } from './text-style'
import { getLineElements, LineStyle } from './line-style'
import { getSeriesType } from 'jimu-ui/advanced/chart'

export interface AppearanceSettingProps {
  webChart: ImmutableObject<IWebChart>
  onChange: (webChart: ImmutableObject<IWebChart>) => void
}

export const AppearanceSetting = (
  props: AppearanceSettingProps
): React.ReactElement => {
  const translate = hooks.useTranslate(defaultMessages, jimuiDefaultMessage)
  const { webChart, onChange } = props
  const background = webChart?.background

  const seriesType = getSeriesType(webChart.series as any)
  const TextElements = React.useMemo(
    () => getTextElements(seriesType),
    [seriesType]
  )
  const LineElements = React.useMemo(
    () => getLineElements(seriesType),
    [seriesType]
  )

  const handleBackgroundChange = (value: string): void => {
    onChange?.(webChart.set('background', value || DefaultBgColor))
  }

  return (
    <div className='appearance-setting w-100'>
      <Background value={background} onChange={handleBackgroundChange} />
      {!!TextElements.length && (
        <ElementPanel
          label={translate('textElements')}
          title={translate('textElements')}
        >
          <TextStyle
            webChart={webChart}
            elements={TextElements}
            onChange={onChange}
          />
        </ElementPanel>
      )}
      {!!LineElements.length && (
        <ElementPanel
          label={translate('symbolElements')}
          title={translate('symbolElements')}
        >
          <LineStyle
            webChart={webChart}
            elements={LineElements}
            onChange={onChange}
          />
        </ElementPanel>
      )}
    </div>
  )
}
