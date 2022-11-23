
import ProjectParameters from 'esri/rest/support/ProjectParameters'
import webMercatorUtils from 'esri/geometry/support/webMercatorUtils'

export function projectGeometry (geometry, outSR, geometryService) {
  return new Promise((resolve, reject) => {
    if (webMercatorUtils.canProject(geometry, outSR)) {
      const projectedGeometry = webMercatorUtils.project(geometry, outSR)
      resolve(projectedGeometry)
    } else {
      const params = new ProjectParameters({
        geometries: [geometry],
        outSpatialReference: outSR
      })
      geometryService.project(params).then((projectedGeometries) => {
        resolve(projectedGeometries[0])
      }, (err) => {
        reject(err)
      })
    }
  })
}

/**
 * Returns promise which will be resolved one all the geometries are projected into outSR
 * This method uses the spatial reference of the first geometry as an input spatial reference.
 * Therefore all geometries in the array must have the same spatial reference.
 * @param geometries Array of geometries having same SpatialReference
 * @param outSR Out SpatialReference
 * @param geometryService  GeometryService Instance
 */
export function projectGeometries (geometries, outSR, geometryService) {
  return new Promise((resolve, reject) => {
    if (geometries && geometries.length > 0) {
      if (webMercatorUtils.canProject(geometries[0], outSR)) {
        const projectedGeometries = []
        geometries.forEach((geometry) => {
          projectedGeometries.push(webMercatorUtils.project(geometry, outSR))
        })
        resolve(projectedGeometries)
      } else {
        const params = new ProjectParameters({
          geometries: geometries,
          outSpatialReference: outSR
        })
        geometryService.project(params).then((projectedGeometries) => {
          resolve(projectedGeometries)
        }, (err) => {
          reject(err)
        })
      }
    } else {
      resolve([])
    }
  })
}
