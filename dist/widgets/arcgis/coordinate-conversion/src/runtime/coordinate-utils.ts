export interface Notation {
  name: string
  pattern: RegExp
  notationType: string
  conversionType: string
}

export interface ProcessedCoordinateTextInfo {
  str: string
  prefixSuffixError: boolean
}

export function processCoordTextInput (withStr: string, asType: Notation, testingMode: boolean): ProcessedCoordinateTextInfo {
  const match = asType.pattern.exec(withStr)
  let northSouthPrefix, northSouthSuffix,
    eastWestPrefix, eastWestSuffix,
    latDeg, longDeg, latMin,
    longMin, latSec, longSec
  let prefixSuffixError = false
  let conversionType = asType.name

  switch (asType.name) {
    case 'dd':
      northSouthPrefix = match[2]
      northSouthSuffix = match[7]
      eastWestPrefix = match[10]
      eastWestSuffix = match[16]
      latDeg = match[3].replace(/[,:]/, '.')
      longDeg = match[11].replace(/[,:]/, '.')
      conversionType = 'dd'
      break
    case 'ddrev':
      northSouthPrefix = match[11]
      northSouthSuffix = match[16]
      eastWestPrefix = match[2]
      eastWestSuffix = match[8]
      latDeg = match[12].replace(/[,:]/, '.')
      longDeg = match[3].replace(/[,:]/, '.')
      conversionType = 'dd'
      break
    case 'ddm':
      northSouthPrefix = match[2]
      northSouthSuffix = match[7]
      eastWestPrefix = match[10]
      eastWestSuffix = match[15]
      latDeg = match[3]
      latMin = match[4].replace(/[,:]/, '.')
      longDeg = match[11]
      longMin = match[12].replace(/[,:]/, '.')
      conversionType = 'ddm'
      break
    case 'ddmrev':
      northSouthPrefix = match[10]
      northSouthSuffix = match[15]
      eastWestPrefix = match[2]
      eastWestSuffix = match[7]
      latDeg = match[11]
      latMin = match[12].replace(/[,:]/, '.')
      longDeg = match[3]
      longMin = match[4].replace(/[,:]/, '.')
      conversionType = 'ddm'
      break
    case 'dms':
      northSouthPrefix = match[2]
      northSouthSuffix = match[8]
      eastWestPrefix = match[11]
      eastWestSuffix = match[17]
      latDeg = match[3]
      latMin = match[4]
      latSec = match[5].replace(/[,:]/, '.')
      longDeg = match[12]
      longMin = match[13]
      longSec = match[14].replace(/[,:]/, '.')
      conversionType = 'dms'
      break
    case 'dmsrev':
      northSouthPrefix = match[11]
      northSouthSuffix = match[17]
      eastWestPrefix = match[2]
      eastWestSuffix = match[8]
      latDeg = match[12]
      latMin = match[13]
      latSec = match[14].replace(/[,:]/, '.')
      longDeg = match[3]
      longMin = match[4]
      longSec = match[5].replace(/[,:]/, '.')
      conversionType = 'dms'
      break
  }

  //check for north/south prefix/suffix
  if (northSouthPrefix && northSouthSuffix) {
    prefixSuffixError = true
    // eslint-disable-next-line
    if (new RegExp(/[Ss-]/).test(northSouthPrefix)) {
      northSouthPrefix = '-'
    } else {
      northSouthPrefix = '+'
    }
  } else {
    // eslint-disable-next-line
    if (northSouthPrefix && new RegExp(/[Ss-]/).test(northSouthPrefix)) {
      northSouthPrefix = '-'
    } else {
      // eslint-disable-next-line
      if (northSouthSuffix && new RegExp(/[Ss-]/).test(northSouthSuffix)) {
        northSouthPrefix = '-'
      } else {
        northSouthPrefix = '+'
      }
    }
  }

  //check for east/west prefix/suffix
  if (eastWestPrefix && eastWestSuffix) {
    prefixSuffixError = true
    // eslint-disable-next-line
    if (new RegExp(/[Ww-]/).test(eastWestPrefix)) {
      eastWestPrefix = '-'
    } else {
      eastWestPrefix = '+'
    }
  } else {
    // eslint-disable-next-line
    if (eastWestPrefix && new RegExp(/[Ww-]/).test(eastWestPrefix)) {
      eastWestPrefix = '-'
    } else {
      // eslint-disable-next-line
      if (eastWestSuffix && new RegExp(/[Ww-]/).test(eastWestSuffix)) {
        eastWestPrefix = '-'
      } else {
        eastWestPrefix = '+'
      }
    }
  }

  switch (conversionType) {
    case 'dd':
      withStr = northSouthPrefix + latDeg + ',' + eastWestPrefix + longDeg
      break
    case 'ddm':
      withStr = northSouthPrefix + latDeg +
        ' ' + latMin + ',' + eastWestPrefix +
        longDeg + ' ' + longMin
      break
    case 'dms':
      withStr = northSouthPrefix + latDeg + ' ' +
        latMin + ' ' + latSec + ',' + eastWestPrefix +
        longDeg + ' ' + longMin + ' ' + longSec
      break
  }

  const returnValue: ProcessedCoordinateTextInfo = {
    prefixSuffixError: prefixSuffixError,
    str: withStr
  }

  return returnValue
}

export function getNotations (): Notation[] {
  // using jshint ignore line on parts of the regular
  // expressions that cannot be split over lines
  const strs = [{
    name: 'dd',
    pattern: new RegExp([
      /^(([NS\+\-\s])*([0-8]?\d([,.]\d*)?|90([,.]0*)?)([°˚º^~*]*)([NS\+\-\s])*)([,:;\s|\/\\]+)/,
      /(([EW\+\-\s])*([0]?\d?\d([,.]\d*)?|1[0-7]\d([,.]\d*)?|180([,.]0*)?)([°˚º^~*]*)([EW\+\-\s])*)$/ // jshint ignore:line
    ].map(function (r) {
      return r.source
    }).join('')),
    notationType: 'DDLatLongNotation',
    conversionType: 'dd'
  }, {
    name: 'ddrev',
    pattern: new RegExp([
      /^(([EW\+\-\s])*([0]?\d?\d([,.]\d*)?|1[0-7]\d([,.]\d*)?|180([,.]0*)?)([°˚º^~*]*)([EW\+\-\s])*)/, // jshint ignore:line
      /([,:;\s|\/\\]+)(([NS\+\-\s])*([0-8]?\d([,.]\d*)?|90([,.]0*)?)([°˚º^~*]*)([NS\+\-\s])*)$/
    ].map(function (r) {
      return r.source
    }).join('')),
    notationType: 'DDLongLatNotation',
    conversionType: 'dd'
  }, {
    name: 'ddm',
    pattern: new RegExp([
      /^(([NS\+\-\s])*([0-8]?\d|90)[°˚º^~*\s\-_]+(([0-5]?\d|\d)([,.]\d*)?)['′\s_]*([NS\+\-\s])*)/,
      /([,:;\s|\/\\]+)/,
      /(([EW\+\-\s])*([0]?\d?\d|1[0-7]\d|180)[°˚º^~*\s\-_]+(([0-5]\d|\d)([,.]\d*)?)['′\s_]*([EW\+\-\s])*)/, // jshint ignore:line
      /[\s]*$/
    ].map(function (r) {
      return r.source
    }).join('')),
    notationType: 'DDMLatLongNotation',
    conversionType: 'ddm'
  }, {
    name: 'ddmrev',
    pattern: new RegExp([
      /^(([EW\+\-\s])*([0]?\d?\d|1[0-7]\d|180)[°˚º^~*\s\-_]+(([0-5]\d|\d)([,.]\d*)?)['′\s_]*([EW\+\-\s])*)/, // jshint ignore:line
      /([,:;\s|\/\\]+)/,
      /(([NS\+\-\s])*([0-8]?\d|90)[°˚º^~*\s\-_]+(([0-5]?\d|\d)([,.]\d*)?)['′\s_]*([NS\+\-\s])*)[\s]*$/ // jshint ignore:line
    ].map(function (r) {
      return r.source
    }).join('')),
    notationType: 'DDMLongLatNotation',
    conversionType: 'ddm'
  }, {
    name: 'dms',
    pattern: new RegExp([
      /^(([NS\+\-\s])*([0-8]?\d|90)[°˚º^~*\s\-_]+([0-5]?\d|\d)['′\s\-_]+(([0-5]?\d|\d)([,.]\d*)?)["¨˝\s_]*([NS\+\-\s])*)/, // jshint ignore:line
      /([,:;\s|\/\\]+)/,
      /(([EW\+\-\s])*([0]?\d?\d|1[0-7]\d|180)[°˚º^~*\s\-_]+([0-5]\d|\d)['′\s\-_]+(([0-5]?\d|\d)([,.]\d*)?)["¨˝\s_]*([EW\+\-\s])*)[\s]*$/ // jshint ignore:line
    ].map(function (r) {
      return r.source
    }).join('')),
    notationType: 'DMSLatLongNotation',
    conversionType: 'dms'
  }, {
    name: 'dmsrev',
    pattern: new RegExp([
      /^(([EW\+\-\s])*([0]?\d?\d|1[0-7]\d|180)[°˚º^~*\s\-_]+([0-5]\d|\d)['′\s\-_]+(([0-5]?\d|\d)([,.]\d*)?)["¨˝\s_]*([EW\+\-\s])*)/, // jshint ignore:line
      /([,:;\s|\/\\]+)/,
      /(([NS\+\-\s])*([0-8]?\d|90)[°˚º^~*\s\-_]+([0-5]?\d|\d)['′\s\-_]+(([0-5]?\d|\d)([,.]\d*)?)["¨˝\s_]*([NS\+\-\s])*)[\s]*$/ // jshint ignore:line
    ].map(function (r) {
      return r.source
    }).join('')),
    notationType: 'DMSLongLatNotation',
    conversionType: 'dms'
  }, {
    name: 'mgrs',
    pattern: new RegExp([
      /^\d{1,2}[-,;:\s]*[C-HJ-NP-X][-,;:\s]*[A-HJ-NP-Z]{2}[-,;:\s]*/,
      /(\d[-,;:\s]+\d|\d{2}[-,;:\s]+\d{2}|\d{3}[-,;:\s]+\d{3}|\d{4}[-,;:\s]+\d{4}|\d{5}[-,;:\s]+\d{5})/, // jshint ignore:line
      /$|^(\d{1,2}[-,;:\s]*[C-HJ-NP-X][-,;:\s]*[A-HJ-NP-Z]{2}[-,;:\s]*)/,
      /(\d{2}|\d{4}|\d{6}|\d{8}|\d{10})?$|^[ABYZ][-,;:\s]*[A-HJ-NP-Z]{2}[-,;:\s]*/,
      /(\d[-,;:\s]+\d|\d{2}[-,;:\s]+\d{2}|\d{3}[-,;:\s]+\d{3}|\d{4}[-,;:\s]+\d{4}|\d{5}[-,;:\s]+\d{5})/, // jshint ignore:line
      /$|^[ABYZ][-,;:\s]*[A-HJ-NP-Z]{2}[-,;:\s]*(\d{2}|\d{4}|\d{6}|\d{8}|\d{10})?$/
    ].map(function (r) {
      return r.source
    }).join('')),
    notationType: 'MGRSNotation',
    conversionType: 'mgrs'
  },
  {
    name: 'utm',
    pattern: new RegExp([
      /^\d{1,2}[-,;:\s]*[c-hj-np-xC-HJ-NP-X][-,;:\s]*\d{1,6}\.?\d*[mM]?[-,;:\s]?\d{1,7}\.?\d*[mM]?$/ // jshint ignore:line
    ].map(function (r) {
      return r.source
    }).join('')),
    notationType: 'UTMBandNotation',
    conversionType: 'utm'
  }
  ]
  return strs
}

export function getCoordinateType (fromInput: string): Promise<Notation[]> {
  const clnInput = fromInput
  const promise = new Promise<Notation[]>((resolve, reject) => {
    const allNotations = getNotations()
    const matchedType = allNotations.filter((itm) => {
      return itm.pattern.test(clnInput)
    })
    if (matchedType.length > 0) {
      resolve(matchedType)
    } else {
      resolve([])
    }
  })
  return promise
}

export function getCoordinatesType (fromInput: string[]): Promise<Notation[][]> {
  const result = []
  const promise = new Promise<Notation[][]>((resolve, reject) => {
    const allNotations = getNotations()
    fromInput.forEach((clnInput) => {
      const matchedType = allNotations.filter((itm) => {
        return itm.pattern.test(clnInput)
      })
      if (matchedType.length > 0) {
        result.push(matchedType)
      } else {
        result.push([])
      }
    })
    if (result.length > 0) {
      resolve(result)
    } else {
      resolve([])
    }
  })
  return promise
}
