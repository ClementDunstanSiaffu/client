import { esri, portalUrlUtils, SessionManager, Immutable, UtilityManager, UseUtility, loadArcGISJSAPIModules } from 'jimu-core'
import { JimuMapView } from 'jimu-arcgis'
import { ImmutableArray } from 'seamless-immutable'
import { PrintServiceType, PrintTemplateType, PrintTemplateProperties, IMPrintTemplateProperties, LayoutType, ScalebarUnitType } from '../config'

interface ScaleBarList {
  value: ScalebarUnitType
  label: string
}

// for tslint
export function isDefined (value): boolean {
  if (typeof value !== 'undefined' && !(value === null)) {
    return true
  } else {
    return false
  }
}

export const getOrganizationprintTask = (portalUrl: string) => {
  const request = esri.restRequest.request
  const sm = SessionManager.getInstance()
  return request(`${portalUrlUtils.getPortalRestUrl(portalUrl)}portals/self`, {
    authentication: sm.getMainSession(),
    httpMethod: 'GET'
  }).then(portalSelf => {
    return Promise.resolve(portalSelf?.helperServices?.printTask || null)
  }).catch(err => {
    return Promise.resolve(null)
  })
}

export const getTemplateType = (printServiceType: PrintServiceType, printTemplateType: PrintTemplateType) => {
  return printServiceType === PrintServiceType.Customize || printTemplateType === PrintTemplateType.Customize ? 'custom' : 'org'
}

//Merge template setting
export const mergeTemplateSetting = (orgTemplateSetting: IMPrintTemplateProperties, overwriteTemplateSetting: IMPrintTemplateProperties): IMPrintTemplateProperties => {
  let newOverwriteTemplateSetting = overwriteTemplateSetting
  //Init template exportOptions
  if (orgTemplateSetting?.exportOptions) {
    newOverwriteTemplateSetting = newOverwriteTemplateSetting.set('exportOptions', {
      ...(orgTemplateSetting.exportOptions || {}),
      ...(overwriteTemplateSetting?.exportOptions || {})
    })
  }

  //Init template layoutOptions
  if (orgTemplateSetting?.layoutOptions && overwriteTemplateSetting?.layoutOptions) {
    newOverwriteTemplateSetting = newOverwriteTemplateSetting.set('layoutOptions', {
      ...(orgTemplateSetting?.layoutOptions || {}),
      ...(overwriteTemplateSetting?.layoutOptions || {})
    })
  }

  return Immutable({
    ...orgTemplateSetting,
    ...newOverwriteTemplateSetting
  })
}

export const getIndexByTemplateId = (templates: PrintTemplateProperties[], templateId): number => {
  let index
  templates?.forEach((item, idx) => {
    if (item?.templateId === templateId) {
      index = idx
    }
  })
  return index
}

export const checkIsCustomTemplate = (printServiceType: PrintServiceType, printTemplateType: PrintTemplateType): boolean => {
  return printServiceType === PrintServiceType.Customize || printTemplateType === PrintTemplateType.Customize
}

export const initTemplateLayout = (layout: string): LayoutType => {
  // return layout?.replace(/\_/ig, '-')?.replace(/\s+/ig, '-')?.toLowerCase() as LayoutType
  return layout
}

export const initMapOnlyLayout = (layout: string): LayoutType => {
  return layout?.replace(/\_/ig, '-')?.replace(/\s+/ig, '-')?.toLowerCase()
}

export const checkIsMapOnly = (layout: string): boolean => {
  return initMapOnlyLayout(layout) === 'map-only'
}

export const checkIsTemplateExist = (templateList: ImmutableArray<PrintTemplateProperties>, templateId): boolean => {
  let isExist = false
  templateList?.forEach(tmp => {
    if (tmp?.templateId === templateId) {
      isExist = true
    }
  })
  return isExist
}

export const checkNumber = (value, minimum: number = 1): boolean => {
  if (value?.length === 0) return true
  if (isNaN(Number(value))) {
    return false
  } else {
    const numberVal = Number(value)
    return Number.isInteger(numberVal) && numberVal >= minimum
  }
}

export const getUrlOfUseUtility = async (useUtility: UseUtility) => {
  return UtilityManager.getInstance().getUrlOfUseUtility(useUtility)
    .then((url) => {
      return Promise.resolve(url)
    })
}

export function getPrintTemplateTaskInfo (printServiceUrl: string): Promise<any[]> {
  const options = {
    query: {
      'env:outSR': '',
      'env:processSR': '',
      returnZ: false,
      returnM: false,
      returnTrueCurves: false,
      returnFeatureCollection: false,
      context: '',
      f: 'json'
    },
    responseType: 'json'
  } as any
  return getPrintTemplateTaskInfoUrl(printServiceUrl).then(url => {
    return loadArcGISJSAPIModules(['esri/request']).then(modules => {
      const [esriRequest] = modules
      return esriRequest(url, options).then(res => {
        return Promise.resolve(res?.data?.results[0]?.value || [])
      })
    })
  })
}

function getPrintTemplateTaskInfoUrl (printServiceUrl: string): Promise<string> {
  if (!printServiceUrl) return Promise.resolve(null)
  const serverUrl = `${printServiceUrl.split('/GPServer')?.[0]}/GPServer`
  const options = {
    query: {
      f: 'json'
    },
    responseType: 'json'
  } as any
  return loadArcGISJSAPIModules(['esri/request']).then(modules => {
    const [esriRequest] = modules
    return esriRequest(serverUrl, options).then(res => {
      const tasks = res?.data?.tasks as string[]
      let templatesInfoTaskUrl = `${serverUrl}/Get Layout Templates Info Task/execute`
      tasks?.forEach(taskName => {
        if (taskName?.includes('Templates') && taskName?.includes('Info')) {
          templatesInfoTaskUrl = `${serverUrl}/${taskName}/execute`
        }
      })
      return Promise.resolve(templatesInfoTaskUrl)
    })
  })
}

export async function getLegendLayer (mapView: JimuMapView) {
  return loadArcGISJSAPIModules(['esri/rest/support/LegendLayer']).then(modules => {
    const [LegendLayer] = modules
    const legendLayers = mapView?.view?.map?.layers?.toArray()?.map(layer => {
      return new LegendLayer({
        layerId: layer?.id,
        title: layer?.title
      })
    })
    return Promise.resolve(legendLayers)
  })
}

export function getScaleBarList (nls): ScaleBarList[] {
  return [
    {
      value: 'Miles',
      label: nls('unitsLabelMiles')
    },
    {
      value: 'Kilometers',
      label: nls('unitsLabelKilometers')
    },
    {
      value: 'Meters',
      label: nls('unitsLabelMeters')
    },
    {
      value: 'Feet',
      label: nls('unitsLabelFeet')
    }
  ]
}
