import { WebMapWebChart } from 'jimu-ui/advanced/chart'
import { capitalizeString, getTemplateType } from '../../../../utils/common'

const Icons = {
  bar: require('../../../assets/icons/bar.svg'),
  column: require('../../../assets/icons/column.svg'),
  line: require('../../../assets/icons/line.svg'),
  area: require('../../../assets/icons/area.svg'),
  pie: require('../../../assets/icons/pie.svg'),
  scatter: require('../../../assets/icons/scatter.svg'),
  histogram: require('../../../assets/icons/histogram.svg')
}

const Thumbnails = {
  bar: require('../../../assets/thumbnail/bar.svg'),
  column: require('../../../assets/thumbnail/column.svg'),
  'stacked-bar': require('../../../assets/thumbnail/stacked-bar.svg'),
  'stacked100-bar': require('../../../assets/thumbnail/stacked100-bar.svg'),
  'stacked-column': require('../../../assets/thumbnail/stacked-column.svg'),
  'stacked100-column': require('../../../assets/thumbnail/stacked100-column.svg'),
  line: require('../../../assets/thumbnail/line.svg'),
  'smooth-line': require('../../../assets/thumbnail/smooth-line.svg'),
  area: require('../../../assets/thumbnail/area.svg'),
  'smooth-area': require('../../../assets/thumbnail/smooth-area.svg'),
  pie: require('../../../assets/thumbnail/pie.svg'),
  donut: require('../../../assets/thumbnail/donut.svg'),
  scatter: require('../../../assets/thumbnail/scatter.svg'),
  histogram: require('../../../assets/thumbnail/histogram.svg')
}

export const getTemplateThumbnail = (series) => {
  const type = getTemplateType(series)?.[1] ?? 'column'
  return Thumbnails[type]
}

export const getTemplateIcon = (series) => {
  const type = getTemplateType(series)?.[0] ?? 'column'
  return Icons[type]
}

export const getMainTypeTranslation = (series: any) => {
  const templateType = getTemplateType(series)?.[0] ?? 'column'
  if (templateType === 'scatter') {
    return 'scatterPlot'
  }
  return templateType
}

export const getTemplateTranslation = (series: any) => {
  const templateType = getTemplateType(series)?.[1] ?? 'column'
  if (templateType === 'scatter') {
    return 'scatterPlot'
  }
  if (!templateType.includes('-')) {
    return templateType
  } else {
    const [type, subType] = templateType.split('-')
    if (type.includes('100')) {
      return `${type}${subType}`
    } else {
      return `${type}${capitalizeString(subType)}`
    }
  }
}

/**
 * Get the title of the chart, or falls back to the chart id if no title is defined.
 * @param webChart
 */
export const getChartTitle = (webChart: WebMapWebChart): string => {
  return webChart.title?.content.text ?? webChart.id
}
