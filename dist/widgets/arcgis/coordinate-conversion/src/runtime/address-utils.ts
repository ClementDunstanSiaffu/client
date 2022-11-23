import Format from 'esri/widgets/CoordinateConversion/support/Format'
import locator from 'esri/rest/locator'

export function addressToLocations (locatorURL: string, address: string, minCandidateScore: number): Promise<__esri.AddressCandidate[]> {
  return locator.addressToLocations(locatorURL, {
    address: {
      SingleLine: address
    }
  }, {
    query: {}
  }).then(response => {
    response = response.sort((a, b) => { return b.score - a.score })
    response = response.filter((item) => { return item.score >= minCandidateScore && item.location })
    return response
  }, err => {
    console.error(err.message)
    return []
  })
}

export function getLocationForSuggestion (locatorURL: string, magicKey: string, address: string, minCandidateScore: number): Promise<__esri.AddressCandidate[]> {
  return locator.addressToLocations(locatorURL, {
    address: {
      SingleLine: address
    },
    outFields: ['*'],
    magicKey: magicKey
  }, {
    query: {}
  }).then(response => {
    response = response.sort((a, b) => { return b.score - a.score })
    response = response.filter((item) => { return item.score >= minCandidateScore && item.location })
    return response
  }, err => {
    console.error(err.message)
    return []
  })
}

const loadSuggest = (locatorURL: string, address: string, maxSuggestion: number): Promise<__esri.SuggestionResult[]> => {
  return locator.suggestLocations(locatorURL, {
    text: address,
    location: null
  }, {
    query: {
      maxSuggestions: maxSuggestion
    }
  }).then(response => {
    return response || []
  }, err => {
    console.error(err.message)
    return []
  })
}

export const fetchSuggestion = (geocodeURL: string, searchText: string, maxSuggestions: number) => {
  return loadSuggest(geocodeURL, searchText, maxSuggestions).then(res => {
    let searchSuggestion = []
    res.forEach((addrInfo, index) => {
      const address = addrInfo.text
      if (address && !checkIsSuggestionRepeated(searchSuggestion, address)) {
        const layerSuggestion = {
          suggestion: address,
          magicKey: addrInfo?.magicKey
        }
        searchSuggestion.push(layerSuggestion)
      }
    })
    searchSuggestion = uniqueJson(searchSuggestion, 'suggestion')
    const suggestion = {
      suggestionItem: searchSuggestion.splice(0, maxSuggestions)
    }
    return Promise.resolve(suggestion)
  }).catch((error) => {
    return Promise.reject(error)
  })
}

function checkIsSuggestionRepeated (searchSuggestion, suggestionRecord: string): boolean {
  //Checks if the suggestion is repeated or not
  return searchSuggestion.filter(suggestion => {
    return suggestionRecord === suggestion?.suggestion
  }).length > 0
}

//De-duplicate for object or Array
const uniqueJson = (jsonArr, key) => {
  const result = jsonArr[0] ? [jsonArr[0]] : []
  for (let i = 1; i < jsonArr.length; i++) {
    const item = jsonArr[i]
    let repeat = false
    for (let j = 0; j < result.length; j++) {
      if (item[key] === result[j][key]) {
        repeat = true
        break
      }
    }
    if (!repeat) {
      result.push(item)
    }
  }
  return result
}

export function generateAddressFormat (locatorURL: string, minCandidateScore: number): Format {
  const newFormat = new Format({
    name: 'address',
    getConversionStrategy: (): 'server' | 'client' => {
      return 'server'
    },
    conversionInfo: {
      // Define a convert function
      // Point -> Position
      convert: (point: __esri.Point): Promise<__esri.Position> => {
        const promise = new Promise<__esri.Position>((resolve, reject) => {
          if (locator) {
            return locator.locationToAddress(locatorURL, {
              location: point
            }, {
              query: {}
            }).then(response => {
              resolve({
                coordinate: response && response.address && response.score && response.score >= minCandidateScore ? response.address : '',
                location: point
              })
            }, () => {
              resolve({
                coordinate: '',
                location: point
              })
            })
          } else {
            resolve({
              coordinate: '',
              location: point
            })
          }
        })
        return promise
      },
      // Define a reverse convert function
      // String -> Point
      reverseConvert: (string: string): Promise<__esri.AddressCandidate> => {
        const promise = new Promise<__esri.AddressCandidate>((resolve, reject) => {
          if (locator) {
            return locator.addressToLocations(locatorURL, {
              address: {
                SingleLine: string
              }
            }, {
              query: {}
            }).then(response => {
              if (response && response.length > 0) {
                response = response.filter((item) => { return item.score >= minCandidateScore && item.location })
                response = response.sort((a, b) => { return b.score - a.score })
                resolve(response[0])
              }
              resolve(null)
            }, () => {
              resolve(null)
            })
          } else {
            resolve(null)
          }
        })
        return promise
      }
    },
    // Define each segment of the coordinate
    coordinateSegments: [
      {
        alias: 'L',
        description: 'Address',
        searchPattern: /.*/
      }
    ],
    defaultPattern: 'L'
  })
  return newFormat
}
