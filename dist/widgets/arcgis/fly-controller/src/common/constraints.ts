
// routes
import _Routes, { RouteConfig as _RouteConfig } from './fly-facade/route/routes'
import _Record, { RecordConfig as _RecordConfig } from './fly-facade/route/record/record'
// controllers
import { FlyStateChangeCallbacks as _FlyStateChangeCallbacks } from './fly-facade/controllers/base-fly-controller'
import { LiveviewSettingOptions as _LiveviewSettingOptions, LiveviewSettingState as _LiveviewSettingState } from './fly-facade/controllers/common/liveview-setting'
// GraphicsInfo
import DefaultSymbols from './graphics/default-symbols'

import GraphicsInfo, { GraphicsInfoConfig as _GraphicsInfoConfig } from './graphics/graphics-info'
export type Routes = _Routes
export type RouteConfig = _RouteConfig
export type Record = _Record
export type RecordConfig = _RecordConfig
export type FlyStateChangeCallbacks = _FlyStateChangeCallbacks
export type LiveviewSettingOptions = _LiveviewSettingOptions
export type LiveviewSettingState = _LiveviewSettingState

export { DefaultSymbols }
export { GraphicsInfo }
export type GraphicsInfoConfig = _GraphicsInfoConfig

export const Constraints = {
  SPEED: {
    MIN: 0,
    MAX: 1,
    MULTIPLIER: 8,
    DECIMAL: 3,
    DEFAULT_SPEED: 50
  },

  // max/min values ,#6382
  ALT: {
    MIN: 0,
    MAX: 800,
    STEP: 10
  },

  TILT: {
    MIN: 0,
    MAX: 90,
    STEP: 1
  },

  TIME: {
    MIN: 0
  },

  // calculated value rounded ,#6406
  CALCULATED_VALUE_ROUNDED: {
    ANGLE: 0,
    ELEV: 1,
    TIME: 1
  }
}
