
import { Immutable, loadArcGISJSAPIModules } from 'jimu-core'
import { PrintTemplateProperties, PrintServiceType, PrintTemplateType, DEFAULT_COMMON_SETTING } from '../../config'
import { getTemplateType, initTemplateLayout, checkIsMapOnly, mergeTemplateSetting } from '../../utils/utils'
/**
 * Get new template id
*/
export const getNewTemplateId = (printTemplate: PrintTemplateProperties[], printServiceType: PrintServiceType, printTemplateType: PrintTemplateType): string => {
  const templateIdList = printTemplate.map(template => template.templateId)
  const configType = getTemplateType(printServiceType, printTemplateType)
  if (!templateIdList || templateIdList?.length === 0) return `config_${configType}_0`
  const maxIndex = getTemplateIndexMaxNumber(templateIdList)
  return `config_${configType}_${maxIndex + 1}`
}

const getTemplateIndexMaxNumber = (configIdList: string[]) => {
  const idIndexData = configIdList?.map(id => {
    const currentIndex = id?.split('_')?.pop()
    return currentIndex ? Number(currentIndex) : 0
  })
  return idIndexData?.sort((a, b) => b - a)?.[0]
}

export const addTemplateIdForPrintTemplate = (printTemplate: PrintTemplateProperties[], printServiceType: PrintServiceType, printTemplateType: PrintTemplateType): PrintTemplateProperties[] => {
  const type = getTemplateType(printServiceType, printTemplateType)
  return printTemplate.map((template, index) => {
    template.templateId = `config_${type}_${index}`
    return template
  })
}

//Init template properties
export const initDefaultTemplates = (orgTemplate: PrintTemplateProperties[], printServiceType: PrintServiceType, printTemplateType: PrintTemplateType) => {
  const newTemplates = orgTemplate.map(template => {
    let newTemplate = Immutable(template)
    //Init template layout
    newTemplate = newTemplate.set('layout', initTemplateLayout(template?.layout))

    //Init scalebar unit and legendLayers of template
    newTemplate = newTemplate.setIn(['layoutOptions', 'scalebarUnit'], 'Miles').setIn(['layoutOptions', 'legendLayers'], [])

    //Init template exportOptions
    if (checkIsMapOnly(newTemplate?.layout)) {
      newTemplate = newTemplate.set('exportOptions', {
        ...{
          width: 800,
          height: 1100
        },
        ...template?.exportOptions
      })
    }

    return mergeTemplateSetting(Immutable(DEFAULT_COMMON_SETTING as any), Immutable(newTemplate))?.asMutable({ deep: true })
  })
  return addTemplateIdForPrintTemplate(newTemplates, printServiceType, printTemplateType)
}

// Get default print template by Print service url
export function getPrintTaskInfo (taskUrl: string) {
  // portal own print url: portalname/arcgis/sharing/tools/newPrint
  const options = {
    query: {
      f: 'json'
    },
    responseType: 'json'
  } as any
  return loadArcGISJSAPIModules(['esri/request']).then(modules => {
    const [esriRequest] = modules
    return esriRequest(taskUrl, options).then(res => {
      return handlePrintInfo(res?.data)
    })
  })
}

async function handlePrintInfo (printInfo) {
  // domStyle.set(this.showAdvancedOptionChk.domNode.parentNode.parentNode, 'display', '');
  let hasWebmapParam = false
  let hasOutputParam = false
  const info = printInfo?.parameters || []

  const webmapParam = 'web_map_as_json'
  const outputParam = 'output_file'

  let orgPrintTemplate = []
  let formatList = []
  let defaultFormat = 'png32'

  info?.forEach(param => {
    if (param.name === 'Layout_Template') {
      const choiceList = param.choiceList
      const defaultValue = param.defaultValue
      if (choiceList) {
        orgPrintTemplate = choiceList?.map(layout => {
          return getDefaultPrintTemplateItem(layout)
        })
      } else {
        orgPrintTemplate.push(getDefaultPrintTemplateItem(defaultValue))
      }
    }

    if (param.name === 'Format') {
      const choiceList = param?.choiceList?.map(format => format?.toLowerCase())
      defaultFormat = param.defaultValue?.toLowerCase()
      formatList = choiceList || [defaultFormat]
    }

    if (typeof param.name === 'string' && param.name.toLowerCase() === webmapParam) {
      hasWebmapParam = true
    }
    if (typeof param.name === 'string' && param.name.toLowerCase() === outputParam) {
      hasOutputParam = true
    }

    if (!hasWebmapParam || !hasOutputParam) {
      // this.validUrl = false
      // this.serviceURL.validate()
    }
  })

  return Promise.resolve({
    templates: orgPrintTemplate,
    formatList: formatList,
    defaultFormat: defaultFormat,
    hasWebmapParam: hasWebmapParam,
    hasOutputParam: hasOutputParam
  })
}

function getDefaultPrintTemplateItem (layout: string) {
  const isMapOnly = checkIsMapOnly(layout)
  const otherOption = isMapOnly ? { } : { layoutOptions: { legend: false } }
  return {
    label: layout,
    layout: layout,
    format: 'PNG32',
    ...otherOption
  }
}
