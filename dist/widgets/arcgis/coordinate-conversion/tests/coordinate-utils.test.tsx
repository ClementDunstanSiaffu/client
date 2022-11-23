import {
  getCoordinateType, processCoordTextInput, getNotations, getCoordinatesType
} from '../src/runtime/coordinate-utils'

//Uncomment when need to see the logs in unit testing result
//const console = require('console');
const logTableResult = false

describe('Coordinate conversion utils', function () {
  let totalTestCount = 0
  const latDDArray = []
  const lonDDArray = []
  const latDDMArray = []
  const lonDDMArray = []
  const latDMSArray = []
  const lonDMSArray = []

  //populate the arrays that will be used in the tests
  //dms2 = degrees/minutes/seconds two figures
  const dms2 = ['0', '00']
  //dms3 = degrees/minutes/seconds three figures
  const dms3 = ['0', '00', '000']
  //ds = degree symbol
  const ds = ['', '°', '˚', 'º', '^', '~', '*']
  //there has to be some separator between degrees and minute values
  const ds2 = [' ', '°', '˚', 'º', '^', '~', '*', '-', '_']
  //ms = minute symbol
  const ms = ['', '\'', '′']
  //there has to be some separator between minute and second values
  const ms2 = [' ', '\'', '′']
  //ms = second symbol
  const ss = ['"', '¨', '˝']
  //dp = decimal place
  //just test a single decimal place using both comma and decimal point
  const dp = ['', '.0', ',0']
  //ns = number separator
  //we know that a comma separator used with a comma for decimal degrees will fail so do not test for this
  const ns = [' ', ':', ';', '|', '/', '\\']
  //pLat = prefix / suffix latitude - test lower and upper case
  const pLat = ['', 'n', 'S', '+', '-']
  //pLon = prefix / suffix longitude
  const pLon = ['', 'E', 'w', '+', '-']
  //pss = prefix / suffix spacer
  const pss = ['', ' ']

  //set up an array of each combination of DD latitude values
  for (let a = 0; a < dms2.length; a++) {
    for (let b = 0; b < dp.length; b++) {
      for (let c = 0; c < ds.length; c++) {
        latDDArray.push(dms2[a] + dp[b] + ds[c])
      }
    }
  }
  //set up an array of each combination of DD longitude values
  for (let a = 0; a < dms3.length; a++) {
    for (let b = 0; b < dp.length; b++) {
      for (let c = 0; c < ds.length; c++) {
        lonDDArray.push(dms3[a] + dp[b] + ds[c])
      }
    }
  }

  //set up an array of each combination of DDM latitude values
  for (let a = 0; a < dms2.length; a++) {
    for (let b = 0; b < ds2.length; b++) {
      for (let c = 0; c < dms2.length; c++) {
        for (let d = 0; d < dp.length; d++) {
          for (let e = 0; e < ms.length; e++) {
            latDDMArray.push(dms2[a] + ds2[b] + dms2[c] + dp[d] + ms[e])
          }
        }
      }
    }
  }

  //set up an array of each combination of DDM longitude values
  for (let a = 0; a < dms3.length; a++) {
    for (let b = 0; b < ds2.length; b++) {
      for (let c = 0; c < dms2.length; c++) {
        for (let d = 0; d < dp.length; d++) {
          for (let e = 0; e < ms.length; e++) {
            lonDDMArray.push(dms3[a] + ds2[b] + dms2[c] + dp[d] + ms[e])
          }
        }
      }
    }
  }

  //set up an array of each combination of DMS latitude values
  for (let a = 0; a < dms2.length; a++) {
    for (let b = 0; b < ds2.length; b++) {
      for (let c = 0; c < dms2.length; c++) {
        for (let d = 0; d < ms2.length; d++) {
          for (let e = 0; e < dms2.length; e++) {
            for (let f = 0; f < dp.length; f++) {
              for (let g = 0; g < ss.length; g++) {
                latDMSArray.push(dms2[a] + ds2[b] + dms2[c] + ms2[d] + dms2[e] + dp[f] + ss[g])
              }
            }
          }
        }
      }
    }
  }

  //set up an array of each combination of DMS longitude values
  for (let a = 0; a < dms3.length; a++) {
    for (let b = 0; b < ds2.length; b++) {
      for (let c = 0; c < dms2.length; c++) {
        for (let d = 0; d < ms2.length; d++) {
          for (let e = 0; e < dms2.length; e++) {
            for (let f = 0; f < dp.length; f++) {
              for (let g = 0; g < ss.length; g++) {
                lonDMSArray.push(dms3[a] + ds2[b] + dms2[c] + ms2[d] + dms2[e] + dp[f] + ss[g])
              }
            }
          }
        }
      }
    }
  }

  it('Test Auto Input: Identify Input as DD - Lat / Long', async function () {
    let passed = false
    let match = []
    let count = 0
    const resultObj = []
    const allPromises = []
    //test each the DD latitude and longitude array items against each other using each of the seperators
    for (let a = 0; a < latDDArray.length; a++) {
      for (let b = 0; b < lonDDArray.length; b++) {
        for (let c = 0; c < ns.length; c++) {
          const tempPromise = getCoordinateType(latDDArray[a] + ns[c] + lonDDArray[b])
          allPromises.push(tempPromise)
          tempPromise.then(function (itm) {
            itm && itm[0].name === 'dd' ? passed = true : passed = false
            //execute the reg ex and store in the variable match
            match = itm[0].pattern.exec(latDDArray[a].toUpperCase() + ns[c] + lonDDArray[b].toUpperCase())
            //test to see if the regular expression identified the input as a valid input and identified it as DD (for decimal degrees)
            expect(passed).toEqual(true)
            //test to see if the regular expression has correctly identified the Lat / long values by comparing them against the original string
            expect(latDDArray[a].toUpperCase()).toEqual(match[1])
            expect(lonDDArray[b].toUpperCase()).toEqual(match[9])
            //test to see if the regular expression has correctly identified the seperator
            expect(ns[c]).toEqual(match[8])
            //reset passed
            resultObj.push(
              {
                TestString: latDDArray[a] + ns[c] + lonDDArray[b],
                Passed: passed,
                ExpectedLat: latDDArray[a].toUpperCase(),
                ActualLat: match[1],
                ExpectedLon: lonDDArray[b].toUpperCase(),
                ActualLon: match[9],
                ExpectedSeparator: ns[c],
                ActualSeparator: match[8]

              })
            passed = false
            count++
          })
        }
      }
    }

    await Promise.all(allPromises).then(() => {
      //we have tested each combination of numbers so lets just test a single combination with each possible prefix/suffix combo
      for (let a = 0; a < pLat.length; a++) {
        for (let b = 0; b < pss.length; b++) {
          for (let c = 0; c < pLat.length; c++) {
            for (let d = 0; d < pLon.length; d++) {
              for (let e = 0; e < pss.length; e++) {
                for (let f = 0; f < pLon.length; f++) {
                  const tempLat = pLat[a].toUpperCase() + '00.0' + pss[b] + pLat[c].toUpperCase()
                  const tempLon = pLon[d].toUpperCase() + '000.0' + pss[e] + pLon[f].toUpperCase()
                  getCoordinateType(tempLat + (' ') + tempLon).then(function (itm) {
                    itm && itm[0].name === 'dd' ? passed = true : passed = false
                    //execute the reg ex and store in the variable match
                    match = itm[0].pattern.exec(tempLat.toUpperCase() + (' ') + tempLon.toUpperCase())
                    //test to see if the regular expression identified the input as a valid input and identified it as DDM (for degrees decimal minutes)
                    // assert.isTrue(passed, tempLat + (' ') + tempLon + ' did not validate as DD Lat/Long');
                    expect(passed).toEqual(true)
                    //test to see if the regular expression has correctly identified the Lat / long values by comparing them against the original string
                    expect(match[1]).toEqual(tempLat.toUpperCase())
                    expect(match[9]).toEqual(tempLon.toUpperCase())
                    //test to see if the regular expression has correctly identified the seperator
                    expect(match[8]).toEqual(' ')
                    resultObj.push(
                      {
                        TestString: tempLat + (' ') + tempLon,
                        Passed: passed,
                        ExpectedLat: tempLat.toUpperCase(),
                        ActualLat: match[1],
                        ExpectedLon: tempLon.toUpperCase(),
                        ActualLon: match[9],
                        ExpectedSeparator: ns[c],
                        ActualSeparator: match[8]
                      })
                    //reset passed
                    passed = false
                    count++
                  })
                }
              }
            }
          }
        }
      }
    })
    if (logTableResult) {
      console.table(resultObj)
    }
    console.log('The number of Auto tests conducted for Identify Input as DD - Lat / Long tests conducted was: ' + count)
    totalTestCount = totalTestCount + count
    expect(count).toEqual(18376)
  })

  it('Test Auto Input: Identify Input as DD - Long / Lat', async function () {
    let passed = false
    let match = []
    let count = 0
    const resultObj = []
    const allPromises = []
    //test each the DD latitude and longitude array items against each other using each of the seperators
    for (let a = 0; a < latDDArray.length; a++) {
      for (let b = 0; b < lonDDArray.length; b++) {
        for (let c = 0; c < ns.length; c++) {
          const tempPromise = getCoordinateType(lonDDArray[b] + ns[c] + latDDArray[a])
          allPromises.push(tempPromise)
          tempPromise.then(function (itm) {
            if (itm.length === 1) {
              itm && itm[0].name === 'ddrev' ? passed = true : passed = false
              //execute the reg ex and store in the variable match
              match = itm[0].pattern.exec(lonDDArray[b].toUpperCase() + ns[c] + latDDArray[a].toUpperCase())
            } else {
              itm && itm[1].name === 'ddrev' ? passed = true : passed = false
              //execute the reg ex and store in the variable match
              match = itm[1].pattern.exec(lonDDArray[b].toUpperCase() + ns[c] + latDDArray[a].toUpperCase())
            }
            if (!passed) {
              console.log(lonDDArray[b] + ns[c] + latDDArray[a] + ' did not validate as DD Long/Lat')
            }
            //test to see if the regular expression identified the input as a valid input and identified it as DD (for decimal degrees)
            expect(passed).toEqual(true)
            //test to see if the regular expression has correctly identified the long / lat values by comparing them against the original string
            expect(lonDDArray[b].toUpperCase()).toEqual(match[1])
            expect(latDDArray[a].toUpperCase()).toEqual(match[10])

            //test to see if the regular expression has correctly identified the seperator
            expect(ns[c]).toEqual(match[9])
            resultObj.push(
              {
                TestString: lonDDArray[b] + ns[c] + latDDArray[a],
                Passed: passed,
                ExpectedLon: lonDDArray[b].toUpperCase(),
                ActualLon: match[1],
                ExpectedLat: latDDArray[a].toUpperCase(),
                ActualLat: match[10],
                ExpectedSeparator: ns[c],
                ActualSeparator: match[9]

              }
            )
            //reset passed
            passed = false
            count++
          })
        }
      }
    }

    await Promise.all(allPromises).then(() => {
      //we have tested each combination of numbers so lets just test a single combination with each possible prefix/suffix combo
      for (let a = 0; a < pLat.length; a++) {
        for (let b = 0; b < pss.length; b++) {
          for (let c = 0; c < pLat.length; c++) {
            for (let d = 0; d < pLon.length; d++) {
              for (let e = 0; e < pss.length; e++) {
                for (let f = 0; f < pLon.length; f++) {
                  const tempLon = pLon[d].toUpperCase() + '000.0' + pss[e] + pLon[f].toUpperCase()
                  const tempLat = pLat[a].toUpperCase() + '00.0' + pss[b] + pLat[c].toUpperCase()
                  getCoordinateType(tempLon + (' ') + tempLat).then(function (itm) {
                    itm && itm[0].name === 'ddrev' ? passed = true : passed = false
                    //execute the reg ex and store in the variable match
                    match = itm[0].pattern.exec(tempLon.toUpperCase() + (' ') + tempLat.toUpperCase())
                    if (!passed) {
                      console.log(tempLon + (' ') + tempLat + ' did not validate as DD Lat/Long')
                    }
                    //test to see if the regular expression identified the input as a valid input and identified it as DD (for decimal degrees)
                    expect(passed).toEqual(true)
                    //test to see if the regular expression has correctly identified the Lat / long values by comparing them against the original string
                    expect(match[1]).toEqual(tempLon.toUpperCase())
                    expect(match[10]).toEqual(tempLat.toUpperCase())
                    //test to see if the regular expression has correctly identified the seperator
                    expect(match[9]).toEqual(' ')
                    resultObj.push(
                      {
                        TestString: tempLon + (' ') + tempLat,
                        Passed: passed,
                        ExpectedLon: tempLon.toUpperCase(),
                        ActualLon: match[1],
                        ExpectedLat: tempLat.toUpperCase(),
                        ActualLat: match[10],
                        ExpectedSeparator: ns[c],
                        ActualSeparator: match[9]
                      })
                    //reset passed
                    passed = false
                    count++
                  })
                }
              }
            }
          }
        }
      }
    })
    if (logTableResult) {
      console.table(resultObj)
    }
    console.log('The number of Auto tests conducted for Identify Input as DD - Long / Lat conducted was: ' + count)
    totalTestCount = totalTestCount + count
    expect(count).toEqual(18376)
  })

  it.skip('Test Auto Input: Identify Input as DDM - Lat / Long', async function () {
    let passed = false
    let match = []
    let count = 0
    const allPromises = []
    const coordinatesArray = []
    const indexArray = []

    //test each the DD latitude and longitude array items against each other using each of the seperators
    for (let a = 0; a < latDDMArray.length; a++) {
      for (let b = 0; b < lonDDMArray.length; b++) {
        for (let c = 0; c < ns.length; c++) {
          coordinatesArray.push(latDDMArray[a] + ns[c] + lonDDMArray[b])
          indexArray.push({ a: a, b: b, c: c })
        }
      }
    }

    const tempPromise = getCoordinatesType(coordinatesArray)
    allPromises.push(tempPromise)
    tempPromise.then((results) => {
      results.forEach((itm, index) => {
        const a = indexArray[index].a
        const b = indexArray[index].b
        const c = indexArray[index].c
        itm && itm[0].name === 'ddm' ? passed = true : passed = false
        //execute the reg ex and store in the variable match
        match = itm[0].pattern.exec(latDDMArray[a].toUpperCase() + ns[c] + lonDDMArray[b].toUpperCase())
        //test to see if the regular expression identified the input as a valid input and identified it as DDM (for degrees decimal minutes)
        if (!passed) {
          console.log(latDDMArray[a] + ns[c] + lonDDMArray[b] + ' did not validate as DDM Lat/Long')
        }
        expect(passed).toEqual(true)
        //test to see if the regular expression has correctly identified the Lat / long values by comparing them against the original string
        expect(latDDMArray[a].toUpperCase()).toEqual(match[1])
        expect(lonDDMArray[b].toUpperCase()).toEqual(match[9])
        //test to see if the regular expression has correctly identified the seperator
        expect(ns[c]).toEqual(match[8])
        //reset passed
        passed = false
        count++
      })
    })

    //we have tested each combination of numbers so lets just test a single combination with each possible prefix/suffix combo
    await Promise.all(allPromises).then(() => {
      for (let a = 0; a < pLat.length; a++) {
        for (let b = 0; b < pss.length; b++) {
          for (let c = 0; c < pLat.length; c++) {
            for (let d = 0; d < pLon.length; d++) {
              for (let e = 0; e < pss.length; e++) {
                for (let f = 0; f < pLon.length; f++) {
                  const tempLat = pLat[a].toUpperCase() + '00 00.0' + pss[b] + pLat[c].toUpperCase()
                  const tempLon = pLon[d].toUpperCase() + '000 00.0' + pss[e] + pLon[f].toUpperCase()
                  getCoordinateType(tempLat + (' ') + tempLon).then(function (itm) {
                    itm && itm[0].name === 'ddm' ? passed = true : passed = false
                    //execute the reg ex and store in the variable match
                    match = itm[0].pattern.exec(tempLat.toUpperCase() + (' ') + tempLon.toUpperCase())
                    if (!passed) {
                      console.log(tempLat + (' ') + tempLon + ' did not validate as DDM Lat/Long')
                    }
                    expect(passed).toEqual(true)
                    //test to see if the regular expression has correctly identified the Lat / long values by comparing them against the original string
                    expect(tempLat.toUpperCase()).toEqual(match[1])
                    expect(tempLon.toUpperCase()).toEqual(match[9])
                    //test to see if the regular expression has correctly identified the seperator
                    expect(' ').toEqual(match[8])
                    //reset passed
                    passed = false
                    count++
                  })
                }
              }
            }
          }
        }
      }
    })
    console.log('The number of Auto tests conducted for Identify Input as DDM - Lat / Long conducted was: ' + count)
    totalTestCount = totalTestCount + count
  })

  it.skip('Test Auto Input: Identify Input as DDM - Long / Lat', async function () {
    let passed = false
    let match = []
    let count = 0
    const allPromises = []
    const coordinatesArray = []
    const indexArray = []

    //test each the DD latitude and longitude array items against each other using each of the seperators
    for (let a = 0; a < latDDMArray.length; a++) {
      for (let b = 0; b < lonDDMArray.length; b++) {
        for (let c = 0; c < ns.length; c++) {
          coordinatesArray.push(lonDDMArray[b] + ns[c] + latDDMArray[a])
          indexArray.push({ a: a, b: b, c: c })
        }
      }
    }
    const tempPromise = getCoordinatesType(coordinatesArray)
    allPromises.push(tempPromise)
    tempPromise.then((results) => {
      results.forEach((itm, index) => {
        const a = indexArray[index].a
        const b = indexArray[index].b
        const c = indexArray[index].c
        if (itm.length === 1) {
          itm && itm[0].name === 'ddmrev' ? passed = true : passed = false
          //execute the reg ex and store in the variable match
          match = itm[0].pattern.exec(lonDDMArray[b].toUpperCase() + ns[c] + latDDMArray[a].toUpperCase())
        } else {
          itm && itm[1].name === 'ddmrev' ? passed = true : passed = false
          //execute the reg ex and store in the variable match
          match = itm[1].pattern.exec(lonDDMArray[b].toUpperCase() + ns[c] + latDDMArray[a].toUpperCase())
        }

        //test to see if the regular expression identified the input as a valid input and identified it as DDM (for degrees decimal minutes)
        if (!passed) {
          console.log(lonDDArray[b] + ns[c] + latDDArray[a] + ' did not validate as DDM Long/Lat')
        }
        expect(passed).toEqual(true)
        //test to see if the regular expression has correctly identified the Long / Lat values by comparing them against the original string
        expect(lonDDMArray[b].toUpperCase()).toEqual(match[1])
        expect(latDDMArray[a].toUpperCase()).toEqual(match[9])
        //test to see if the regular expression has correctly identified the seperator
        expect(ns[c]).toEqual(match[8])
        //reset passed
        passed = false
        count++
      })
    })

    //we have tested each combination of numbers so lets just test a single combination with each possible prefix/suffix combo
    await Promise.all(allPromises).then(() => {
      for (let a = 0; a < pLat.length; a++) {
        for (let b = 0; b < pss.length; b++) {
          for (let c = 0; c < pLat.length; c++) {
            for (let d = 0; d < pLon.length; d++) {
              for (let e = 0; e < pss.length; e++) {
                for (let f = 0; f < pLon.length; f++) {
                  const tempLon = pLon[d].toUpperCase() + '000 00.0' + pss[e] + pLon[f].toUpperCase()
                  const tempLat = pLat[a].toUpperCase() + '00 00.0' + pss[b] + pLat[c].toUpperCase()
                  getCoordinateType(tempLon + (' ') + tempLat).then(function (itm) {
                    itm && itm[0].name === 'ddmrev' ? passed = true : passed = false
                    //execute the reg ex and store in the variable match
                    match = itm[0].pattern.exec(tempLon.toUpperCase() + (' ') + tempLat.toUpperCase())
                    if (!passed) {
                      console.log(tempLon + (' ') + tempLat + ' did not validate as DDM Long/lat')
                    }
                    expect(passed).toEqual(true)
                    //test to see if the regular expression has correctly identified the Long / Lat values by comparing them against the original string
                    expect(tempLon.toUpperCase()).toEqual(match[1])
                    expect(tempLat.toUpperCase()).toEqual(match[9])
                    //test to see if the regular expression has correctly identified the seperator
                    expect(' ').toEqual(match[8])
                    //reset passed
                    passed = false
                    count++
                  })
                }
              }
            }
          }
        }
      }
    })
    console.log('The number of Auto tests conducted for Identify Input as DDM - Long / Lat conducted was: ' + count)
    totalTestCount = totalTestCount + count
  })

  it.skip('Test Auto Input: Identify Input as DMS - Lat / Long', async function () {
    let passed = false
    let match = []
    let count = 0
    const allPromises = []
    const coordinatesArray = []
    const indexArray = []

    //The arrays are too large to test each of the DMS latitude and longitude array items against each other using each of the seperators
    //So just test using the space seperator we will check the seperator in the next test
    for (let a = 0; a < latDMSArray.length; a++) {
      for (let b = 0; b < lonDMSArray.length; b++) {
        coordinatesArray.push(latDMSArray[a] + ' ' + lonDMSArray[b])
        indexArray.push({ a: a, b: b })
      }
    }
    const tempPromise = getCoordinatesType(coordinatesArray)
    allPromises.push(tempPromise)
    tempPromise.then((results) => {
      results.forEach((itm, index) => {
        const a = indexArray[index].a
        const b = indexArray[index].b
        itm && itm[0].name === 'dms' ? passed = true : passed = false
        //execute the reg ex and store in the variable match
        match = itm[0].pattern.exec(latDMSArray[a].toUpperCase() + ' ' + lonDMSArray[b].toUpperCase())

        //test to see if the regular expression identified the input as a valid input and identified it as DDM (for degrees decimal minutes)
        if (!passed) {
          console.log(latDMSArray[a] + ' ' + lonDMSArray[b] + ' did not validate as DMS Lat/Long')
        }
        expect(passed).toEqual(true)
        //test to see if the regular expression has correctly identified the Lat / long values by comparing them against the original string
        expect(latDMSArray[a].toUpperCase()).toEqual(match[1])
        expect(lonDMSArray[b].toUpperCase()).toEqual(match[10])
        //test to see if the regular expression has correctly identified the space seperator
        expect(' ').toEqual(match[9])
        //reset passed
        passed = false
        count++
      })
    })
    //we have tested each combination of numbers so lets just test a single combination with each possible prefix/suffix and seperator combo
    await Promise.all(allPromises).then(() => {
      for (let a = 0; a < pLat.length; a++) {
        for (let b = 0; b < pss.length; b++) {
          for (let c = 0; c < pLat.length; c++) {
            for (let d = 0; d < pLon.length; d++) {
              for (let e = 0; e < pss.length; e++) {
                for (let f = 0; f < pLon.length; f++) {
                  const tempLat = pLat[a].toUpperCase() + '00 00 00.0' + pss[b] + pLat[c].toUpperCase()
                  const tempLon = pLon[d].toUpperCase() + '000 00 00.0' + pss[e] + pLon[f].toUpperCase()
                  getCoordinateType(tempLat + ns[e] + tempLon).then(function (itm) {
                    /* as the getCoordinateType function returns a promise and resolving the promise indicates a passing test:
                    ** https://theintern.github.io/intern/#async-tests
                    ** we need check whats in the promise return and set the passed boolean to true or false accordinaly
                    ** we can the use the passed boolean to perform an assert.isTrue outside of the promise
                    */
                    itm && itm[0].name === 'dms' ? passed = true : passed = false
                    //execute the reg ex and store in the variable match
                    match = itm[0].pattern.exec(tempLat.toUpperCase() + ns[e] + tempLon.toUpperCase())

                    //test to see if the regular expression identified the input as a valid input and identified it as DMS (for degrees, minutes, seconds)
                    if (!passed) {
                      console.log(tempLat + ns[e] + tempLon + ' did not validate as DMS Lat/Long')
                    }
                    expect(passed).toEqual(true)
                    //test to see if the regular expression has correctly identified the Lat / long values by comparing them against the original string
                    expect(tempLat.toUpperCase()).toEqual(match[1])
                    expect(tempLon.toUpperCase()).toEqual(match[10])
                    //test to see if the regular expression has correctly identified the space seperator
                    expect(ns[e]).toEqual(match[9])
                    //reset passed
                    passed = false
                    count++
                  })
                }
              }
            }
          }
        }
      }
    })
    console.log('The number of Auto tests conducted for Identify Input as DMS - Lat / Long conducted was: ' + count)
    totalTestCount = totalTestCount + count
  })

  it.skip('Test Auto Input: Process Input as DMS - Long / Lat', async function () {
    let count = 0
    const notations = getNotations()
    for (let a = 0; a < pLat.length; a++) {
      for (let b = 0; b < pss.length; b++) {
        for (let c = 0; c < pLat.length; c++) {
          for (let d = 0; d < pLon.length; d++) {
            for (let e = 0; e < pss.length; e++) {
              for (let f = 0; f < pLon.length; f++) {
                const tempLat = pLat[a].toUpperCase() + '00 00 00.0' + pss[b] + pLat[c].toUpperCase()
                const tempLon = pLon[d].toUpperCase() + '000 00 00.0' + pss[e] + pLon[f].toUpperCase()
                let outLatPrefix = ''
                // eslint-disable-next-line
                if (pLat[a] != '' && pLat[c] != '') {
                  // eslint-disable-next-line
                  new RegExp(/[Ss-]/).test(pLat[a]) ? outLatPrefix = '-' : outLatPrefix = '+'
                } else {
                  // eslint-disable-next-line
                  if (pLat[a] && new RegExp(/[Ss-]/).test(pLat[a])) {
                    outLatPrefix = '-'
                  } else {
                    // eslint-disable-next-line
                    if (pLat[c] && new RegExp(/[Ss-]/).test(pLat[c])) {
                      outLatPrefix = '-'
                    } else {
                      outLatPrefix = '+'
                    }
                  }
                }
                let outLonPrefix = ''
                // eslint-disable-next-line
                if (pLon[d] != '' && pLon[f] != '') {
                  // eslint-disable-next-line
                  new RegExp(/[Ww-]/).test(pLon[d]) ? outLonPrefix = '-' : outLonPrefix = '+'
                } else {
                  // eslint-disable-next-line
                  if (pLon[d] && new RegExp(/[Ww-]/).test(pLon[d])) {
                    outLonPrefix = '-'
                  } else {
                    // eslint-disable-next-line
                    if (pLon[f] && new RegExp(/[Ww-]/).test(pLon[f])) {
                      outLonPrefix = '-'
                    } else {
                      outLonPrefix = '+'
                    }
                  }
                }
                const expectedOutput = outLatPrefix + '00 00 00.0,' + outLonPrefix + '000 00 00.0'
                const testString = (tempLon + ' ' + tempLat)
                const returnString = processCoordTextInput(testString, notations[5], true)
                expect(returnString.str).toEqual(expectedOutput)
                count++
              }
            }
          }
        }
      }
    }
    console.log('The number of Auto tests conducted for Process Input as DMS - Long / Lat conducted was: ' + count)
    totalTestCount = totalTestCount + count
  })

  it('Test Manual Input: Identify Correct Notation values for DD, DMS, DDM', async function () {
    const validEntries = [
      { testNumber: '1', testString: '0, 0', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '2', testString: '2, 3', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '3', testString: '-2,-4W', correctNotation: ['dd'], hasPreFixSuffixError: true },
      { testNumber: '4', testString: '0, 0W', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '5', testString: '90,180', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '6', testString: '89,179', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '7', testString: '87,178', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '8', testString: '80,160', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '9', testString: '75,150', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '10', testString: '70,140', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '11', testString: '65,130', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '12', testString: '60,120', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '13', testString: '55,110', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '14', testString: '50,100', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '15', testString: '45,90', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '16', testString: '40,80', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '17', testString: '35,70', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '18', testString: '30,60', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '19', testString: '25,50', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '20', testString: '20,40', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '21', testString: '15,30', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '22', testString: '10,20', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '23', testString: '5,10', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '24', testString: '-5,-10', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '25', testString: '-10,-20', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '26', testString: '-15,-30', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '27', testString: '-20,-40', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '28', testString: '-25,-50', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '29', testString: '-30,-60', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '30', testString: '-35,-70', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '31', testString: '-40,-80', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '32', testString: '-45,-90', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '33', testString: '-50,-100', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '34', testString: '-55,-110', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '35', testString: '-60,-120', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '36', testString: '-65,-130', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '37', testString: '-70,-140', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '38', testString: '-75,-150', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '39', testString: '-80,-160', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '40', testString: '-85,-170', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '41', testString: '-87,-177', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '42', testString: '-88,-178', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '43', testString: '-89,-179', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '44', testString: '-90,-180', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '45', testString: '90,-180', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '46', testString: '89,-179', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '47', testString: '87,-178', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '48', testString: '80,-160', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '49', testString: '75,-150', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '50', testString: '70,-140', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '51', testString: '65,-130', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '52', testString: '60,-120', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '53', testString: '55,-110', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '54', testString: '50,-100', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '55', testString: '45,-90', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '56', testString: '40,-80', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '57', testString: '35,-70', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '58', testString: '30,-60', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '59', testString: '25,-50', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '60', testString: '20,-40', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '61', testString: '15,-30', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '62', testString: '10,-20', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '63', testString: '5,-10', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '64', testString: '-5,10', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '65', testString: '-10,20', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '66', testString: '-15,30', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '67', testString: '-20,40', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '68', testString: '-25,50', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '69', testString: '-30,60', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '70', testString: '-35,70', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '71', testString: '-40,80', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '72', testString: '-45,90', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '73', testString: '-50,100', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '74', testString: '-55,110', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '75', testString: '-60,120', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '76', testString: '-65,130', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '78', testString: '-70,140', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '79', testString: '-75,150', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '80', testString: '-80,160', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '81', testString: '-85,170', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '82', testString: '-87,177', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '83', testString: '-88,178', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '84', testString: '-89,179', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '85', testString: '-90,180', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '86', testString: '90,0', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '87', testString: '-90,0', correctNotation: ['dd', 'ddrev'], hasPreFixSuffixError: false },
      { testNumber: '88', testString: '90,150', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '89', testString: '90,-150', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '90', testString: '-90,150', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '91', testString: '-90,-150', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '92', testString: '0,180', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: '93', testString: '0,-180', correctNotation: ['dd'], hasPreFixSuffixError: false },
      { testNumber: 'DMS_1', testString: ' 55°32\'14\" - 145° 20\' 17\" ', correctNotation: ['dms'], hasPreFixSuffixError: false },
      { testNumber: 'DMS_2', testString: '18° 34\'36" S  91°7\'37"E', correctNotation: ['dms'], hasPreFixSuffixError: false },
      { testNumber: 'DMS_3', testString: '+ 70°27\' 4\" S - 74° 31\'36"E', correctNotation: ['dms'], hasPreFixSuffixError: true },
      { testNumber: 'DMS_4', testString: '- 47° 18\' 29\"    81° 9\'18\"E', correctNotation: ['dms'], hasPreFixSuffixError: false },
      { testNumber: 'DMS_5', testString: '+80°9\'4\" N -96°42\'11\" w ', correctNotation: ['dms'], hasPreFixSuffixError: true },
      { testNumber: 'DMS_6', testString: '+7° 58\' 41\" + 176°52\' 55\"', correctNotation: ['dms'], hasPreFixSuffixError: true },
      { testNumber: 'DMS_8', testString: '- 56° 49\' 9" + 109° 3\'26\"', correctNotation: ['dms'], hasPreFixSuffixError: false },
      { testNumber: 'DMS_9', testString: '60° 24\'14\" S  112° 9\' 33"', correctNotation: ['dms'], hasPreFixSuffixError: false },
      { testNumber: 'DMS_11', testString: '-53°30\'23\"S 56° 20\'57" e ', correctNotation: ['dms'], hasPreFixSuffixError: false },
      { testNumber: 'DMS_12', testString: '-57°6\' 2" S 53°36\' 54"W', correctNotation: ['dms'], hasPreFixSuffixError: false },
      { testNumber: 'DMS_16', testString: '18°51\'41"n  + 106° 49\'47"', correctNotation: ['dms'], hasPreFixSuffixError: false },
      { testNumber: 'DMS_17', testString: '124° 24\'0\" W -76°21\' 41\"S', correctNotation: ['dmsrev'], hasPreFixSuffixError: true },
      { testNumber: 'DMS_18', testString: '32° 30\' 21"N  - 160°59\'50" E', correctNotation: ['dms'], hasPreFixSuffixError: false },
      { testNumber: 'DMS_19', testString: '43° 41\' 14"s  -180° 54\' 48"w', correctNotation: ['dms'], hasPreFixSuffixError: false }
    ]

    const allPromises = []
    for (let i = 0; i < validEntries.length; i++) {
      allPromises.push(getCoordinateType(validEntries[i].testString.toUpperCase()))
    }
    let validCases = 0
    const resultObj = []
    await Promise.all(allPromises).then((allResult) => {
      allResult.forEach((result, index) => {
        let status = 'Failed'
        let hasPreFixSuffixError = false
        const matchedNotation = []
        if (result.length > 0) {
          if (result.length === validEntries[index].correctNotation.length) {
            status = 'Passed'
            if (validEntries[index].hasPreFixSuffixError) {
              const coordinateTextInfo = processCoordTextInput(validEntries[index].testString.toUpperCase(), result[0], true)
              if (!coordinateTextInfo.prefixSuffixError) {
                status = 'Failed'
                console.log(result)
                console.log(status + ' : ' + validEntries[index].testNumber + ' String: ' + validEntries[index].testString + 'prefixSuffixError not identified')
              } else {
                hasPreFixSuffixError = true
              }
            }
            result.forEach((eachMatchedItem) => {
              if (!validEntries[index].correctNotation.includes(eachMatchedItem.name)) {
                status = 'Failed'
                console.log(status + ' : ' + validEntries[index].testNumber + ' String: ' + validEntries[index].testString + ' ' + eachMatchedItem.name + ' Notation not identified')
              } else {
                matchedNotation.push(eachMatchedItem.name)
              }
            })
          }
        }

        resultObj.push({
          TestString: validEntries[index].testString,
          ExpectedNotation: validEntries[index].correctNotation.join('|'),
          ActualNotation: matchedNotation.join('|'),
          ExpectedPreFixSuffixError: validEntries[index].hasPreFixSuffixError,
          ActualPrefixSuffixError: hasPreFixSuffixError
        })

        if (result.length === 0) {
          console.log('Failed Case')
          console.log(validEntries[index])
        } else if (status === 'Passed') {
          validCases++
        }
        expect(hasPreFixSuffixError).toEqual(validEntries[index].hasPreFixSuffixError)
        expect(result.length).toEqual(validEntries[index].correctNotation.length)
        expect(matchedNotation).toEqual(validEntries[index].correctNotation)
      })
    })
    if (logTableResult) {
      console.table(resultObj)
    }
    console.log('The number of manual input test to identify correct notation values for DD, DMS, DDM conducted was: ' + validCases)
    totalTestCount = totalTestCount + validCases
    expect(validCases).toEqual(allPromises.length)
  })

  it('Test Manual Input: Identify Correct Notation values for MGRS and UTM', async function () {
    // if you want to add specific tests that are not that you think will not be test with the automatic testing functions
    // add entries to the array below, including test number, testString, lat, long and separator. Ensure there is no comma after your last array entry
    const validEntries = [
      { testNumber: 'MGRS_1', testString: '49Q GV 3527397324', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_2', testString: '49Q GV 35273 97324', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_3', testString: '49Q GV 3527 9732', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_4', testString: '49Q GV 352 397', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_5', testString: '49Q GV 35 39', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_6', testString: '49Q GV 3 3', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_7', testString: '49QGV 3527397324', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_8', testString: '49QGV 35273 97324', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_9', testString: '49QGV 3527 9732', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_10', testString: '49QGV 352 397', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_11', testString: '49QGV 35 39', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_12', testString: '49QGV 3 3', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_13', testString: '49QGV3527397324', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_14', testString: '49QGV35273 97324', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_15', testString: '49QGV3527 9732', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_16', testString: '49QGV352 397', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_17', testString: '49QGV35 39', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_18', testString: '49QGV3 3', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_19', testString: '26HGA 522 770', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_20', testString: '22U YG 4 6', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_21', testString: '50V DL ', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_22', testString: '25V YM 5451 6606', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_23', testString: '40H GC 23 66', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_24', testString: '51R NN 2115 0789', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_25', testString: '31H VB 2 9', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_26', testString: '12S TK 23351 79966', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_27', testString: '42R GM 323 087', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_28', testString: '32R MP 53 09', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_29', testString: '7H NA 154 986', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_30', testString: '9V AC 134 878', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_31', testString: '47J UL 3 7', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_32', testString: '40M FB ', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_33', testString: '60U SH 3133 8667', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_34', testString: '45T AE 44315 87879', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_35', testString: '54MCD 3 8', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_36', testString: '39T FQ ', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_37', testString: '49S ZC ', correctNotation: 'mgrs' },
      { testNumber: 'MGRS_38', testString: '31N DB 3 9', correctNotation: 'mgrs' },
      { testNumber: 'UTM_1', testString: '23T 475439 1527864', correctNotation: 'utm' },
      { testNumber: 'UTM_2', testString: '58T 309125 2912715', correctNotation: 'utm' },
      { testNumber: 'UTM_3', testString: '55J 751978 9344718', correctNotation: 'utm' },
      { testNumber: 'UTM_4', testString: '19F 802738 2744677', correctNotation: 'utm' },
      { testNumber: 'UTM_5', testString: '41Q 831382 8160684', correctNotation: 'utm' },
      { testNumber: 'UTM_7', testString: '24C 534250 7084512', correctNotation: 'utm' },
      { testNumber: 'UTM_8', testString: '42X 710405 2968453', correctNotation: 'utm' },
      { testNumber: 'UTM_9', testString: '43N 531084 1187044', correctNotation: 'utm' },
      { testNumber: 'UTM_10', testString: '28V 397288 8197519', correctNotation: 'utm' },
      { testNumber: 'UTM_11', testString: '16G 287001 2369194', correctNotation: 'utm' },
      { testNumber: 'UTM_12', testString: '35T 505952 1820681', correctNotation: 'utm' },
      { testNumber: 'UTM_13', testString: '40W 594499 8578055', correctNotation: 'utm' },
      { testNumber: 'UTM_14', testString: '44C 816674 2164697', correctNotation: 'utm' },
      { testNumber: 'UTM_15', testString: '28E 566605 4117190', correctNotation: 'utm' },
      { testNumber: 'UTM_16', testString: '6P 196906 5011772', correctNotation: 'utm' },
      { testNumber: 'UTM_18', testString: '19F 564184 4506728', correctNotation: 'utm' },
      { testNumber: 'UTM_19', testString: '14X324065 5167585', correctNotation: 'utm' },
      { testNumber: 'UTM_21', testString: '22V 3173528928322', correctNotation: 'utm' },
      { testNumber: 'UTM_22', testString: '12V 376511 6290241', correctNotation: 'utm' },
      { testNumber: 'UTM_23', testString: '53K 390689 6124371', correctNotation: 'utm' },
      { testNumber: 'UTM_24', testString: '3P 533816 9047553', correctNotation: 'utm' },
      { testNumber: 'UTM_25', testString: '02D 456100 2516654', correctNotation: 'utm' },
      { testNumber: 'UTM_26', testString: '02D4561002516654', correctNotation: 'utm' }
    ]

    let validCases = 0
    const allPromises = []
    for (let i = 0; i < validEntries.length; i++) {
      allPromises.push(getCoordinateType(validEntries[i].testString))
    }
    const resultObj = []
    await Promise.all(allPromises).then((allResult) => {
      allResult.forEach((result, index) => {
        resultObj.push({
          TestString: validEntries[index].testString,
          ExpectedNotation: validEntries[index].correctNotation,
          ActualNotation: result[0].name
        })
        if (result.length > 0 && result[0].name === validEntries[index].correctNotation) {
          validCases++
        } else {
          console.table(resultObj)
        }
        expect(result.length).toEqual(1)
        expect(result[0].name).toEqual(validEntries[index].correctNotation)
      })
    })
    if (logTableResult) {
      console.table(resultObj)
    }
    totalTestCount = totalTestCount + validCases
    expect(validCases).toEqual(allPromises.length)
    console.log('The number of manual input test to identify correct notation values for MGRS and UTM conducted was: ' + validCases)
  })

  it('Test Manual Input: Check invalid input is not identified as a valid entry', async function () {
    const invalidEntries = [
      { testNumber: '1', testString: '00 00 00 000N 00 00' }, //cannot have a north suffix on a longitude value
      { testNumber: '2', testString: 'W00 00 00 000 00 00' }, //cannot have a west prefix on a latitude value
      { testNumber: '3', testString: 'A random string' }, //random values
      { testNumber: '4', testString: '009FF141' }, //incorrect GARS entry - an extra digit on the end
      { testNumber: '5', testString: '41RPR1' }, //incorrect MGRS only 1 digit
      { testNumber: '6', testString: '41RPR 1' }, //incorrect MGRS only 1 digit
      { testNumber: '7', testString: '41RPR 123' }, //incorrect MGRS 3 digits
      { testNumber: '8', testString: '41RPR 12 3' }, //incorrect MGRS 3 digits
      { testNumber: '9', testString: '41RPR 12345' }, //incorrect MGRS 5 digits
      { testNumber: '10', testString: '41RPR 12 345' }, //incorrect MGRS 5 digits
      { testNumber: '11', testString: '41RPR 1234567' }, //incorrect MGRS 7 digits
      { testNumber: '12', testString: '41RPR 1234 567' }, //incorrect MGRS 7 digits
      { testNumber: '13', testString: '41RPR 123456789' }, //incorrect MGRS 9 digits
      { testNumber: '14', testString: '41RPR 12345 6789' }, //incorrect MGRS 9 digits
      { testNumber: '15', testString: '41RPR 12345678900' }, //incorrect MGRS 11 digits
      { testNumber: '16', testString: '41RPR 123456 78900' }, //incorrect MGRS 11 digits
      { testNumber: '17', testString: '85,-185' }, //incorrect lat long
      { testNumber: '18', testString: '85,185' }, //incorrect lat long
      { testNumber: '19', testString: '83.4°16\'39" 48.599° 50\'3" ' }, //incorrect dms
      { testNumber: '20', testString: '60.8°21\' 11" n  118° 56\'52"w ' }, //incorrect dms
      { testNumber: '21', testString: '26° 21\'60"n - 21° 20\'9" W' }, //incorrect dms
      { testNumber: '22', testString: '-60° 8\' 9" N -68.4097° 9\'26"e' }, //incorrect dms
      { testNumber: '23', testString: '71.78° 42\'32"s 78° 35\' 48"e' }, //incorrect dms
      { testNumber: '24', testString: '- 14° 57\'33"-51° 20\'48" ' }, //incorrect dms
      { testNumber: '25', testString: '0.0°42\'32"s 00°35\'48"e' }, //incorrect dms
      { testNumber: '26', testString: '- 00° 00\'33"-01° 20\'00"' } //incorrect dms
    ]
    let validCases = 0
    const resultObj = []
    const allPromises = []
    for (let i = 0; i < invalidEntries.length; i++) {
      allPromises.push(getCoordinateType(invalidEntries[i].testString))
    }

    await Promise.all(allPromises).then((allResult) => {
      allResult.forEach((result, index) => {
        resultObj.push({
          TestString: invalidEntries[index].testString,
          Expected: [],
          Actual: result.map(a => a.name)
        })
        if (result.length > 0) {
          console.table(resultObj)
        } else {
          validCases++
        }
        expect(result.length).toEqual(0)
      })
    })
    if (logTableResult) {
      console.table(resultObj)
    }
    totalTestCount = totalTestCount + validCases
    expect(validCases).toEqual(allPromises.length)
    console.log('The number of manual tests for invalid input conducted was: ' + validCases)
    console.log('Total number of test cases for Coordinate Utils conducted was: ' + totalTestCount)
  })
})
