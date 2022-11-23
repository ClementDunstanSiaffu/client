/** @jsx jsx */
import { React, css, jsx, polished, SerializedStyles, ImmutableObject, UseDataSource, ImmutableArray } from 'jimu-core'
import { Button, hooks, defaultMessages as jimuiDefaultMessage, Icon } from 'jimu-ui'
import { IWebChart } from '../../../config'
import defaultMessages from '../../translations/default'
import { SidePopper } from 'jimu-ui/advanced/setting-components'
import Templates, { getMainTypeTranslation, getTemplateIcon } from './templates'
import { useTheme } from 'jimu-theme'
import completeChart from './utils/complete-chart'

export interface ChartTypeSelectorProps {
  templateId: string
  webChart: ImmutableObject<IWebChart>
  useDataSources: ImmutableArray<UseDataSource>
  onChange: (template: string, webChart: ImmutableObject<IWebChart>) => void
}

const useStyle = (): SerializedStyles => {
  const theme = useTheme()
  const dark100 = theme?.colors?.palette.dark[100]
  const dark400 = theme?.colors?.palette.dark[400]
  const primary700 = theme?.colors?.palette.primary[700]
  const primary800 = theme?.colors?.palette.primary[800]

  return React.useMemo(
    () => css`
    button.btn-link {
      height: ${polished.rem(32)};
      line-height: ${polished.rem(32)};
      padding: 0;
      border: 1px dashed ${dark100};
      border-radius: ${polished.rem(2)};
      cursor: pointer;
      color: ${primary700};
      font-size: ${polished.rem(14)};
      text-decoration: none;
      font-weight: 500;
      &:hover{
        border-color: ${dark400};
        color: ${primary800};
      }
    }`,
    [dark100, dark400, primary700, primary800]
  )
}

const ChartTypeSelector = (props: ChartTypeSelectorProps): React.ReactElement => {
  const { templateId, webChart, useDataSources, onChange } = props
  const style = useStyle()
  const translate = hooks.useTranslate(defaultMessages, jimuiDefaultMessage)
  const [open, setOpen] = React.useState(false)

  const [templateIcon, templateLabel] = React.useMemo(() => {
    if (!templateId) return []
    const icon = getTemplateIcon(webChart.series)
    const label = translate(getMainTypeTranslation(webChart.series))
    return [icon, label]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId])

  const ref = React.useRef<HTMLDivElement>(null)

  const handleChange = (template: IWebChart): void => {
    const webChart = completeChart(template)
    onChange?.(template.id, webChart)
    setOpen(false)
  }

  return (
    <React.Fragment>
      <div className="chart-type-selector w-100" css={style} ref={ref}>
        {!templateId && <Button className='w-100' type='link' onClick={() => setOpen(v => !v)}>
          {translate('selectChart')}
        </Button>}
        {templateId && <Button
          type='default'
          title={templateLabel}
          className='w-100 text-left pl-2 pr-2'
          onClick={() => setOpen(v => !v)}>
          <Icon icon={templateIcon} />
          {templateLabel}
        </Button>}
      </div>

      <SidePopper isOpen={open} position="right" toggle={() => setOpen(false)} trigger={ref?.current} title={translate('chartType')}>
        <Templates className='px-3' useDataSources={useDataSources} templateId={templateId} onChange={handleChange} />
      </SidePopper>
    </React.Fragment>
  )
}

export * from './templates/buildin-templates'

export default ChartTypeSelector
