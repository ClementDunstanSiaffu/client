import { DataSource, dataSourceUtils, dateUtils, FeatureLayerDataSource, MapServiceDataSource, Immutable, DataSourceTypes } from 'jimu-core'
import { MapDataSourceImpl } from 'jimu-arcgis/arcgis-data-source'
import { ArcGISDataSourceTypes } from 'jimu-arcgis'
import { DateTimeUnits, DateUnitInputValue, DateWeekUnits, TimeUnits } from 'jimu-ui/advanced/style-setting-components'
import { TimeDisplayStrategy, timeSpanValue, timeSettings, TimeSpeed } from '../config'

export const UnitSelectorDateWeekUnits: DateWeekUnits[] = ['year', 'month', 'day'] //, 'week'
export const UnitSelectorTimeUnits: TimeUnits[] = ['hour', 'minute'] //, 'second'

// Min tick width of timeline.
export const MINTICKWIDTH = 4 // px
// Default step_length: 10. It could be 5, or 1 when extent is smaller than calcuated step_length.
export const STEP_LENGTH = 10
// Default divided_count
export const DIVIDED_COUNT = 5

export const MIN_DATE_TIME = -59011488343000 // UTC 100/1/1 00:00:00
export const MAX_DATE_TIME = 32503651200000 // UTC 3000/1/1 00:00:00
export const DATE_PATTERN = 'd/M/y'
export const TIME_PATTERN = 'h:mm:ss a'

export enum SecondsForDateUnit {
  'year' = 31536000,
  'month' = 2592000,
  // 'week' = 604800,
  'day' = 86400,
  'hour' = 3600,
  'minute' = 60,
  'second' = 1
}

function getUnitFromEsriTimeUnit (esriUnit) {
  switch (esriUnit) {
    case 'esriTimeUnitsMonths':
      return 'month'
    case 'esriTimeUnitsDays':
      return 'day'
    case 'esriTimeUnitsHours':
      return 'hour'
    case 'esriTimeUnitsMinutes':
      return 'minute'
    default:
      return 'year'
  }
}

export const SPEED_VALUE_PAIR = {
  slowest: 5000,
  slow: 4000,
  medium: 3000,
  fast: 2000,
  fastest: 1000
}

function findProperSpeed (speedValue): TimeSpeed {
  let finalSpeed
  const s = Math.ceil(speedValue / 1000) * 1000 // MV3,4
  Object.keys(SPEED_VALUE_PAIR).some(level => {
    if (SPEED_VALUE_PAIR[level] === s) {
      finalSpeed = level.toUpperCase()
      return true
    }
    return false
  })
  if (!finalSpeed) { // MV3
    if (s > SPEED_VALUE_PAIR.slowest) {
      finalSpeed = TimeSpeed.Slowest
    } else if (s < SPEED_VALUE_PAIR.fastest) {
      finalSpeed = TimeSpeed.Fastest
    }
  }
  return finalSpeed
}

export function getTimeSettingsFromHonoredWebMap (dataSources: { [dsId: string]: DataSource }, isRuntime = false) {
  let settings: timeSettings = null
  const webMap = dataSources[Object.keys(dataSources).filter(id => dataSources[id].type === ArcGISDataSourceTypes.WebMap)[0]]
  const props = (webMap as MapServiceDataSource)?.getItemData()?.widgets?.timeSlider?.properties
  // webmap may disabled time after current widget is added. If so, use default settings calculated by inside layers.
  let speed
  if (props) {
    const { startTime, endTime, timeStopInterval, numberOfStops, thumbMovingRate, thumbCount } = props
    if (isRuntime) {
      speed = findProperSpeed(thumbMovingRate)
    }
    settings = {
      layerList: null,
      startTime: { value: startTime },
      endTime: { value: endTime },
      timeDisplayStrategy: thumbCount === 2 ? TimeDisplayStrategy.current : TimeDisplayStrategy.cumulatively
    }
    if (timeStopInterval) {
      const unit = getUnitFromEsriTimeUnit(timeStopInterval.units)
      settings.accuracy = unit
      settings.stepLength = { val: timeStopInterval.interval, unit: unit }
    } else if (numberOfStops) {
      settings.dividedCount = numberOfStops
      // set proper accuracy.
      const accuracyList = getSupporedAccuracyList(startTime, endTime)
      settings.accuracy = accuracyList[0]
      const tickTimes = (endTime - startTime) / numberOfStops
      accuracyList.some(unit => {
        if (tickTimes >= SecondsForDateUnit[unit] * 1000) {
          settings.accuracy = unit
          return true
        }
        return false
      })
    }
  }
  return { settings, speed }
}

/**
 * Get TimeSettings with calculated accuracy and stepLength, and added minAccuracy, exactStartTime and exactEndTime.
 * @param timeSettings
 * @param dataSources
 * @param width
 * @returns
 */
export function getCalculatedTimeSettings (timeSettings, dataSources: { [dsId: string]: DataSource }, isRuntime = false) {
  const { startTime, endTime, layerList, accuracy: accuracySet, stepLength: stepLengthSet } = timeSettings || {}
  let newTimeSettings

  // Return default time setting, and calculated accuracy and stepLength.
  const { startTime: newStartTime, endTime: newEndTime } = getTimeExtentForDS(dataSources, layerList, startTime, endTime)

  // Calculate the lastest accuracy.
  const accuracyList = getSupporedAccuracyList(newStartTime, newEndTime)
  const accuracy = accuracyList[0] // Use first as default value.

  // Update settings
  const stepLengthCalc = getStepLengthByAccuracy(newStartTime, newEndTime, accuracy)
  if (timeSettings) {
    newTimeSettings = Immutable(timeSettings)
    const isAccuracyChanged = !accuracyList.includes(accuracySet)
    // Update accuracy when: accuracySet is not in supported accuracy list.
    if (isAccuracyChanged) {
      newTimeSettings = newTimeSettings.set('accuracy', accuracy)
    }
    /**
     * Check if necessary to update stepLength:
     * 1. accuracy is changed.
     * 2. stepLengthSet unit is larger than maxAccuracy
     * 3. stepLengthSet extent if out of whole extent
     */
    if (stepLengthSet && (
      isAccuracyChanged ||
      SecondsForDateUnit[stepLengthSet.unit] > SecondsForDateUnit[accuracy] ||
      (SecondsForDateUnit[stepLengthSet.unit] as any) * 1000 * stepLengthSet.val > newEndTime - newStartTime
    )) {
      newTimeSettings = newTimeSettings.set('stepLength', stepLengthCalc)
    }
  } else { // Return default settings (with calculated accuracy and stepLength)
    newTimeSettings = Immutable(getDefaultTimeSettings(accuracy, stepLengthCalc))
  }

  // TODO: add layerlist when type is webmap

  if (isRuntime) {
    newTimeSettings = newTimeSettings.set('startTime', { value: newStartTime }).set('endTime', { value: newEndTime })
    return newTimeSettings
  } else {
    return Immutable({
      config: newTimeSettings,
      exactStartTime: newStartTime,
      exactEndTime: newEndTime,
      minAccuracy: accuracy,
      accuracyList: accuracyList
    })
  }
}

/**
 * Get proper stepLength by accuracy.
 * By default, stepLength is 10 times larger than accuracy.
 * When stepLength is longer than extent, it should be 1, or 5 times.
 * @param startTime
 * @param endTime
 * @param accuracy
 * @returns
 */
export function getStepLengthByAccuracy (startTime, endTime, accuracy: DateTimeUnits) {
  const proportion = (endTime - startTime) / 1000 / SecondsForDateUnit[accuracy]
  const value = proportion > 10 ? STEP_LENGTH : (proportion > 5 ? 5 : 1)
  return { val: value, unit: accuracy }
}

function getDefaultTimeSettings (accuracy: DateTimeUnits, stepLength: DateUnitInputValue) {
  return {
    layerList: null,
    startTime: { value: dateUtils.VirtualDateType.Min },
    endTime: { value: dateUtils.VirtualDateType.Max },
    timeDisplayStrategy: 'CURRENT',
    dividedCount: null,
    accuracy: accuracy,
    stepLength: stepLength
  }
}

/**
 * Get dateTimes for exact date and virtual dates.
 * @param dateTime
 * @param isStart
 * @returns
 */
export function getTimesByVirtualDate (dateTime: timeSpanValue, isStart = true) {
  let times: number = null
  if (dateTime) {
    if (typeof dateTime.value === 'number') {
      times = dateTime.value
    } else {
      const d = new Date()
      d.setMinutes(0)
      d.setSeconds(0)
      d.setMilliseconds(0)
      if (dateTime.value === dateUtils.VirtualDateType.Today) {
        d.setHours(0)
        times = d.getTime() + getOffsetedTimes(dateTime)
        times = isStart ? times : times + SecondsForDateUnit.day * 1000
      } else if (dateTime.value === dateUtils.VirtualDateType.Now) {
        times = d.getTime() + getOffsetedTimes(dateTime)
        times = isStart ? times : times + SecondsForDateUnit.hour * 1000
      }
    }
  }
  return times
}

function getOffsetedTimes (dateTime: timeSpanValue) {
  return dateTime.offset ? dateTime.offset.val * SecondsForDateUnit[dateTime.offset.unit] * 1000 : 0
}

/**
 * Get all inside featureLayers which support timeInfo.
 * @param dataSources
 * @returns
 */
export function getInsideLayersFromWebmap (dataSources: { [dsId: string]: DataSource }, layerList) {
  let layers = null
  const mapDs = Object.keys(dataSources).map(dsId => dataSources[dsId] as MapDataSourceImpl)[0]
  if (mapDs.type === ArcGISDataSourceTypes.WebMap) {
    // const fLayers = mapDs.getDataSourcesByType(DataSourceTypes.FeatureLayer)
    const fLayers = []
    mapDs.getAllChildDataSources().forEach(layer => {
      // only return mapServices, and featureLayers which is not inside a mapService
      if (
        (layer.type === DataSourceTypes.MapService && (layer as MapServiceDataSource).supportTime()) ||
        (
          layer.type === DataSourceTypes.FeatureLayer &&
          dataSourceUtils.findMapServiceDataSource(layer as FeatureLayerDataSource) === null &&
          (layer as FeatureLayerDataSource).supportTime()
        )
      ) {
        fLayers.push(layer)
      }
    })

    const layerListIds = layerList?.map(layer => layer.dataSourceId) || []
    layers = {}
    fLayers.forEach(layer => {
      if (layerListIds.length === 0 || layerListIds.includes(layer.id)) {
        layers[layer.id] = layer
      }
    })
  }
  return layers
}

/**
 * Get TimeExtent from DS
 * @param dataSources
 * @returns
 */
function getTimeExtentForDS (dataSources: { [dsId: string]: DataSource }, layerList, sTime: timeSpanValue, eTime: timeSpanValue) { // TODO: get exact time for min, max and other virtual dates.
  let startTime: number = getTimesByVirtualDate(sTime)
  let endTime: number = getTimesByVirtualDate(eTime, false)

  // get dateTimes for min or max
  let sTimeForDs: number = null
  let eTimeForDs: number = null
  if (!startTime || !endTime) {
    // Use all webmap/layers instead of selected layers
    const mapLayers = getInsideLayersFromWebmap(dataSources, layerList)
    if (mapLayers) {
      dataSources = mapLayers
    }

    Object.keys(dataSources).forEach(dsId => {
      const ds = dataSources[dsId] as FeatureLayerDataSource
      const dsInfo = ds.getTimeInfo() // TODO: no getTimeInfo for webMap
      if (!startTime) {
        const start = dsInfo?.timeExtent?.[0]
        // TODO: query features if no timeExtent.
        sTimeForDs = sTimeForDs ? Math.min(sTimeForDs, start) : start
      }
      if (!endTime) {
        const end = dsInfo?.timeExtent?.[1]
        // TODO: query features if no timeExtent.
        eTimeForDs = eTimeForDs ? Math.max(eTimeForDs, end) : end
      }
    })
    startTime = startTime || sTimeForDs
    endTime = endTime || eTimeForDs
  }
  return { startTime, endTime }
}

/**
 * Get supported accuracy list for Minimum accuracy select, and Length of step select.
 * @param accuracy: predicted accuracy
 * @returns {DateTimeUnits[]}
 */
function getSupporedAccuracyList (startTime: number, endTime: number): DateTimeUnits[] {
  const units = [...UnitSelectorDateWeekUnits, ...UnitSelectorTimeUnits]
  const list = []

  const times = endTime - startTime
  units.forEach(key => {
    if (times >= SecondsForDateUnit[key] * 1000) {
      list.push(key)
    }
  })
  return list
}

/**
 * Get timeline's whole width by zoom level.
 * @param width
 * @param level
 */
// function getWidthByLevel (width: number, level: number) {
//   return width * level // TODO
// }

/**
 * Get update endTime by stepLength only when there is no virtual dates. #9812
 * @param stepLength
 * @param startTime
 * @param endTime
 * @ignore
 */
export function getUpdatedEndTimeByStepLength (stepLength: DateUnitInputValue, startTime, endTime) {
  let newEndTime = null
  startTime = startTime.value
  endTime = endTime.value
  if (stepLength && typeof startTime === 'number' && typeof endTime === 'number') {
    // if (stepLength.unit === 'week') { // turn week to days to calculate
    //   stepLength = { val: stepLength.val * 7, unit: 'day' }
    // }
    const diff = endTime - startTime
    const stepTimes = stepLength.val * SecondsForDateUnit[stepLength.unit] * 1000
    if (['day', 'hour', 'minute'].includes(stepLength.unit)) {
      newEndTime = startTime + Math.ceil(diff / stepTimes) * stepTimes
    } else {
      const startDate = new Date(startTime)
      let endDate = new Date(endTime)
      if (stepLength.unit === 'year') {
        // update same mdhms to endTime as startTime.
        const tempEndTime = new Date(startTime).setFullYear(endDate.getFullYear())
        newEndTime = endTime <= tempEndTime ? tempEndTime : new Date(startTime).setFullYear(endDate.getFullYear() + 1)
        // update endTime to fill last step.
        endDate = new Date(newEndTime)
        const fillTime = (endDate.getFullYear() - startDate.getFullYear()) % stepLength.val
        if (fillTime) {
          newEndTime = startDate.setFullYear(startDate.getFullYear() + Math.ceil((endDate.getFullYear() - startDate.getFullYear()) / stepLength.val) * stepLength.val)
        }
      } else if (stepLength.unit === 'month') {
        // update same dhms to endTime as startTime.
        let tempEndTime = new Date(startTime).setFullYear(endDate.getFullYear())
        tempEndTime = new Date(tempEndTime).setMonth(endDate.getMonth())
        newEndTime = endTime <= tempEndTime ? tempEndTime : new Date(tempEndTime).setMonth(endDate.getMonth() + 1)
        // update endTime to fill last step.
        endDate = new Date(newEndTime)
        let difMonth = 0
        const difYear = endDate.getFullYear() - startDate.getFullYear()
        if (difYear) {
          difMonth = (12 - startDate.getMonth() - 1) + difYear * 12 + endDate.getMonth() + 1
        } else {
          difMonth = endDate.getMonth() - startDate.getMonth()
        }

        const fillTime = difMonth % stepLength.val
        if (fillTime) {
          if (difYear) {
            newEndTime = startDate.setMonth(difYear * 12 + endDate.getMonth() + stepLength.val - fillTime)
          } else {
            newEndTime = startDate.setMonth(startDate.getMonth() + Math.ceil(difMonth / stepLength.val) * stepLength.val)
          }
        }
      }
    }
  }
  return newEndTime
}
