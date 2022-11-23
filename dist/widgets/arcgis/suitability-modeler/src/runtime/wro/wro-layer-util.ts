/**
  Licensing

  Copyright 2021 Esri

  Licensed under the Apache License, Version 2.0 (the "License"); You
  may not use this file except in compliance with the License. You may
  obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
  implied. See the License for the specific language governing
  permissions and limitations under the License.

  A copy of the license is available in the repository's
  LICENSE file.
*/

import { Issue, ModelFactory, WroModel } from './wro-model'
import { WroContext } from './wro-context'
import * as rasterUtil from './wro-raster-util'

import ImageryLayer from 'esri/layers/ImageryLayer'
import RasterFunction from 'esri/layers/support/RasterFunction'

export function findMapLayer (view, mapLayerId: string): any {
  return mapLayerId && view?.map?.findLayerById(mapLayerId)
}

export function removeLayer (wroContext: WroContext, wroModel: WroModel): void {
  const view = wroContext.getView()
  if (view?.map) {
    const layer: ImageryLayer = findMapLayer(view, wroModel.mapLayerId)
    if (layer) {
      view.map.remove(layer)
    }
  }
}

export function resetRenderingRule (wroContext: WroContext, wroModel: WroModel): void {
  const view = wroContext.getView()
  if (view?.map) {
    const layer: ImageryLayer = findMapLayer(view, wroModel.mapLayerId)
    if (layer) {
      layer.visible = false
      layer.renderingRule = null
    }
  }
}

export async function runWroModel (wroContext: WroContext, wroModel: WroModel): Promise<any> {
  const view = wroContext.getView()
  if (view?.map) {
    const json = rasterUtil.modelToRasterFunctionJson(wroModel)
    // console.log("rasterFunctionJson",json);
    const rasterFunction = RasterFunction.fromJSON(json)
    let layer: ImageryLayer = findMapLayer(view, wroModel.mapLayerId)
    if (layer) {
      layer.renderingRule = rasterFunction
      if (!layer.visible) layer.visible = true
      wroContext.modelController.setMapLayerId(wroModel, layer.id)
    } else {
      layer = new ImageryLayer({
        renderingRule: rasterFunction,
        url: wroModel.serviceUrl
      })
      await layer.load()
      view.map.add(layer, 0)
      wroContext.modelController.setMapLayerId(wroModel, layer.id)
    }
    return layer
  }
}

export function validateWROLayer (nls, layerInfo, errors: Issue[]): void {
  const req = ['Title', 'Url', 'Description', 'InputRanges', 'OutputValues',
    'NoDataRanges', 'RangeLabels', 'NoDataRangeLabels']

  const trackError = (uiMessage: string, error?: Error): void => {
    const issue = ModelFactory.newIssue()
    issue.message = uiMessage
    if (error?.message) issue.detail = error.message
    errors.push(issue)
  }

  const isGETen3 = layerInfo.currentVersion >= 10.3
  if (!isGETen3 || !layerInfo.rasterTypeInfos) {
    trackError(nls('wro_validation_notAWroService'))
    return
  }
  if (!layerInfo.allowRasterFunction) {
    trackError(nls('wro_validation_notAllowRasterFunction'))
  }
  if (layerInfo.defaultResamplingMethod !== 'Nearest') {
    trackError(nls('wro_validation_notNearestResampling'))
  }

  const fields = layerInfo.fields || []
  req.forEach(v => {
    const b = fields.some((f: any) => {
      return (v === f.name)
    })
    if (!b) {
      const s = nls('wro_validation_missingFieldPattern', {
        field: v
      })
      trackError(s)
    }
  })
}
