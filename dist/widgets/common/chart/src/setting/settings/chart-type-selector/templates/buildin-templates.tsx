import { React, classNames, UseDataSource, ImmutableObject } from 'jimu-core'
import { hooks, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { Card } from '../../components'
import { IWebChart } from '../../../../config'
import defaultMessages from '../../../translations/default'
import { UnControlledSettingCollapse, SettingRow } from 'jimu-ui/advanced/setting-components'
import { getTemplateIcon, getTemplateThumbnail, getTemplateTranslation } from './utils'
import { usePercentileStatisticsSupport } from '../../utils'
import { getSeriesType } from 'jimu-ui/advanced/chart'

const CardStyle = {
  width: '68px',
  height: '56px',
  marginRight: '11px'
}

const Templates = [
  {
    id: 'column',
    templates: [require('../../../template/column.json'), require('../../../template/stacked-column.json'), require('../../../template/stacked100-column.json')]
  },
  {
    id: 'bar',
    templates: [require('../../../template/bar.json'), require('../../../template/stacked-bar.json'), require('../../../template/stacked100-bar.json')]
  },
  {
    id: 'line',
    templates: [require('../../../template/line.json'), require('../../../template/smooth-line.json')]
  },
  {
    id: 'area',
    templates: [require('../../../template/area.json'), require('../../../template/smooth-area.json')]
  },
  {
    id: 'pie',
    templates: [require('../../../template/pie.json'), require('../../../template/donut.json')]
  },
  {
    id: 'scatter',
    templates: [require('../../../template/scatter.json')]
  }
  // {
  //   id: 'histogram',
  //   templates: [require('../../../template/histogram.json')]
  // }
]

export const isBuildInTemplate = (templateId: string) => {
  if (!templateId) return true
  const templates = Templates.reduce((acc, cur) => acc.concat(cur.templates), [])
  return !!templates.find(t => t.id === templateId)
}

interface BuildInTemplatesProps {
  className?: string
  templateId: string
  useDataSource: ImmutableObject<UseDataSource>
  onChange: (config: IWebChart) => void
}

const BuildInTemplates = (
  props: BuildInTemplatesProps
): React.ReactElement => {
  const { className, templateId, useDataSource, onChange } = props

  const dataSourceId = useDataSource?.dataSourceId
  const supportPercentile = usePercentileStatisticsSupport(dataSourceId)
  const translate = hooks.useTranslate(defaultMessages, jimuiDefaultMessage)

  return (
    <div className={classNames('chart-templates', className)}>
       <div className='my-3'>{translate('buildInTemplateTip')}</div>
      <SettingRow flow='wrap'>
        {Templates.map((value) => {
          const { id, templates } = value
          const icon = getTemplateIcon(templates[0].series)
          const type = getSeriesType(templates[0].series)
          // Histogram requires data source to support percentile statistics.
          if (type === 'histogramSeries' && !supportPercentile) return null
          const translation = getTemplateTranslation(templates[0].series)
          let label = translate(translation)
          if (type === 'histogramSeries') {
            label += ' (test)'
          }
          return (
            <UnControlledSettingCollapse
              className='mb-2'
              key={id}
              leftIcon={icon}
              label={label}
              defaultIsOpen={true}
            >
              <div className='d-flex mt-2'>
                {templates.map((template) => {
                  const icon = getTemplateThumbnail(template.series)
                  const translation = getTemplateTranslation(template.series)
                  return (
                    <Card
                      key={template.id}
                      vertical={true}
                      title={translate(translation)}
                      style={CardStyle}
                      icon={icon}
                      active={template.id === templateId}
                      onClick={() => onChange(template)}
                    />
                  )
                })}
              </div>
            </UnControlledSettingCollapse>
          )
        })}
      </SettingRow>
    </div>
  )
}

export default BuildInTemplates
