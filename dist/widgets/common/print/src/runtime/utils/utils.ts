import { IMPrintResultList, IMPrintTemplateProperties, PrintTemplateProperties, PrintExtentType } from '../../config'
import { getLegendLayer } from '../../utils/utils'
import { JimuMapView } from 'jimu-arcgis'
export const getNewResultItemTitle = (title: string, printResultList: IMPrintResultList): string => {
  let index = 1
  let newTitle = title
  printResultList.forEach(item => {
    if (newTitle === item?.title) {
      newTitle = `${title} (${index})`
      index++
      getNewResultItemTitle(newTitle, printResultList)
    }
  })
  return newTitle
}

/**
 * Get result id list
*/
export const getResultIdList = (printResultList: IMPrintResultList): string[] => {
  if (!printResultList) return []
  return printResultList?.asMutable()?.map(item => item.resultId)
}

/**
 * Get new datasource config id
*/
export const getNewResultId = (printResultList: IMPrintResultList): string => {
  const resultIdList = getResultIdList(printResultList)
  if (!resultIdList || resultIdList?.length === 0) return 'result_0'
  const maxIndex = getConfigIndexMaxNumber(resultIdList)
  return `config_${maxIndex + 1}`
}

const getConfigIndexMaxNumber = (resultIdList: string[]) => {
  if (!resultIdList || resultIdList?.length === 0) return 0
  const idIndexData = resultIdList?.map(id => {
    const currentIndex = id?.split('_')?.pop()
    return currentIndex ? Number(currentIndex) : 0
  })
  return idIndexData?.sort((a, b) => b - a)?.[0]
}

export function getPreviewLayerId (widgetId: string, jimuMapViewId: string): string {
  return 'print-extents-layer-' + widgetId + '-' + jimuMapViewId
}

export async function initTemplateProperties (printTemplateProperties: IMPrintTemplateProperties, mapView: JimuMapView): Promise<PrintTemplateProperties> {
  // eslint-disable-next-line
  const isRemoveTitleText = printTemplateProperties?.hasTitleText === false
  // eslint-disable-next-line
  const isRemoveLegend = printTemplateProperties?.hasLegend === false
  let newTemplateProperties = printTemplateProperties
    .without('enableTitle', 'enableAuthor', 'enableOutputSpatialReference', 'enableMapPrintExtents', 'enableQuality', 'enableMapSize', 'enableFeatureAttribution', 'enableCopyright',
      'enableLegend', 'enableMapAttribution', 'enableCustomTextElements', 'hasAuthorText', 'hasCopyrightText', 'hasLegend', 'hasTitleText', 'selectedFormatList', 'mapFrameSize', 'mapFrameUnit', 'legendEnabled',
      'templateId', 'printExtentType', 'customTextElementEnableList'
    )
  switch (printTemplateProperties?.printExtentType) {
    case PrintExtentType.CurrentMapExtent:
      newTemplateProperties = newTemplateProperties.set('scalePreserved', false)
      break
    case PrintExtentType.CurrentMapScale:
      newTemplateProperties = newTemplateProperties.set('outScale', mapView?.view?.scale).set('scalePreserved', true)
      break
    case PrintExtentType.SetMapScale:
      newTemplateProperties = newTemplateProperties.set('scalePreserved', true)
      break
  }
  const templateProperties = newTemplateProperties?.asMutable({ deep: true })
  if (isRemoveTitleText) {
    delete templateProperties?.layoutOptions?.titleText
  }
  if (isRemoveLegend) {
    delete templateProperties?.layoutOptions?.legendLayers
  }
  if (printTemplateProperties?.layoutOptions?.legendLayers && printTemplateProperties?.layoutOptions?.legendLayers?.length > 0) {
    templateProperties.layoutOptions.legendLayers = await getLegendLayer(mapView)
  }
  return Promise.resolve(templateProperties)
}
