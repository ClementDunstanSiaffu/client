import { ImmutableObject/*, ImmutableArray */ } from 'jimu-core'
import { RouteConfig } from './common/fly-facade/route/routes'

// 0
export enum FlyItemMode {
  Rotate = 'ROTATE',
  Path = 'PATH',
  Route = 'ROUTE'
}

// 1
export interface FlyItemConfig {
  uuid: string
  name: FlyItemMode
  isInUse: boolean
  direction?: RotateDirection | PathDirection
}
// 1.1
export interface RotateItemConfig extends FlyItemConfig {
  name: FlyItemMode.Rotate
  isInUse: boolean
  direction: RotateDirection
}
export enum RotateDirection {
  CW = 'CW', // Clockwise
  CCW = 'CCW'// CounterClockwise
}
// 1.2
export interface PathItemConfig extends FlyItemConfig {
  name: FlyItemMode.Path
  isInUse: boolean
  direction: PathDirection
  style: PathStyle
}
export enum PathStyle {
  Smoothed = 'CURVED',
  RealPath = 'LINE'
}
export enum PathDirection {
  Forward = 'FORWARD',
  Backward = 'BACKWARD'
}
/*
  |__ RouteItem
      |__ RoutesConfig[]
          |__ RecordConfig[]
              |__ RecordConfig ==> controller
*/
// 1.3 route
export interface RouteItemConfig extends FlyItemConfig {
  name: FlyItemMode.Route
  isInUse: boolean
  routes: RouteConfig[] // in /fly-facade
}

// 2
export enum PanelLayout {
  Horizontal = 'HORIZONTAL', // Bar
  Vertical = 'VERTICAL',
  Palette = 'PALETTE'
}

// 3 all config
export type ItemsType = (RotateItemConfig | PathItemConfig | RouteItemConfig)
/*
  config
    |__ RotateStyle/PathStyle
    |__ RouteStyle(1)
        |__ Routes(1)[]
            |__ Records[]
                |__ Record ==> controller
        |__ Routes(n)[]
            |__ Records[]
        ...
    |__ RouteStyle(n)
    ...
*/
export interface Config {
  // 1 map
  // useMapWidgetIds: string[];
  // 2 Rotate/Path/RouteConfig config
  itemsList: ItemsType[]
  // 3 UI
  layout: PanelLayout
}
export type IMConfig = ImmutableObject<Config>
