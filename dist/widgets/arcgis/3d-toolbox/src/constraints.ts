
// tools
export enum ToolsID {
  Daylight = 'daylight',
  Weather = 'weather',
  ShadowCast = 'shadowcast',
  LineOfSight = 'lineofsight'
}
export interface Tool3D {
  id: ToolsID
  enable: boolean
  activedOnLoad: boolean
  config: DaylightConfig | WeatherConfig | ShadowCastConfig | LineOfSightConfig
}
// configs
// 1.Daylight
// https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Daylight.html#dateOrSeason
export enum DateOrSeason {
  Date = 'date',
  Season = 'season'
}
export enum Season {
  SyncedWithMap = 'syncedWithMap',
  Spring = 'spring',
  Summer = 'summer',
  Fall = 'fall',
  Winter = 'winter'
}
export interface DaylightConfig {
  timezone: boolean
  timeSliderSteps: number

  playButtons: boolean
  playSpeedMultiplier: number
  dateTimeAutoPlay: boolean // set vm.dayPlaying = true
  // yearPlaying: boolean
  datePicker: boolean
  dateOrSeason: DateOrSeason
  currentSeason?: Season

  isShowShadows: boolean
  dateTimeToggle: boolean
}
// 2.Weather
export enum WeatherType {
  Sunny = 'sunny',
  Cloudy = 'cloudy',
  Rainy = 'rainy',
  Snowy = 'snowy',
  Foggy = 'foggy'
}
export interface SunnyCloudyConfig {
  cloudCover: number
}
export interface RainyConfig {
  cloudCover: number
  precipitation: number
}
export interface SnowyConfig {
  cloudCover: number
  precipitation: number
  //snowCover: 'enabled' | 'disabled'
}
export interface FoggyConfig {
  fogStrength: number
}
export interface WeatherConfig {
  weatherType: WeatherType
  //weatherParams?: SunnyCloudyConfig | RainySnowyConfig | FoggyConfig
  sunnyConfig: SunnyCloudyConfig
  cloudyConfig: SunnyCloudyConfig
  rainyConfig: RainyConfig
  snowyConfig: SnowyConfig
  foggyConfig: FoggyConfig
}
// 3.Shadow cast
export enum ShadowCastVisType {
  Threshold = 'threshold',
  Duration = 'duration',
  Discrete= 'discrete'
}
export interface ShadowCastConfig {
  visType: ShadowCastVisType
  timezone: boolean
  datePicker: boolean
}
// 4.LineOfSight
export interface LineOfSightConfig {
  observer?: __esri.Point
}

// Arrangements
export enum ArrangementStyle {
  List = 'list',
  Icon = 'icon'
}
export enum ArrangementDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}
export interface Arrangement {
  style: ArrangementStyle
  direction: ArrangementDirection
}
