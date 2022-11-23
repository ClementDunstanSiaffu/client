export const isValidWkid = (wkid: number) => {
  const spatialRefs = require('./wkid.ts')
  return spatialRefs?.wkid?.includes(Number(wkid))
}

export const getWkidLabels = (wkid: number) => {
  const spatialRefs = require('./wkid.ts')
  const index = spatialRefs?.wkid?.indexOf(Number(wkid))
  if (index > -1) {
    return spatialRefs?.labels?.[index]
  } else {
    return null
  }
}
