import { Immutable } from 'jimu-core'
import { versionManager } from '../src/version-manager'
import { ItemsType, FlyItemMode, RouteItemConfig } from '../src/config'

describe('test 1.5.0', () => {
  const TARGET_VER = '1.5.0'
  const WIDGET_ID = 'widget0'

  it('ver. Dec 2019', async () => {
    const oldConfig = Immutable({
      useMapWidgetIds: [],
      itemsList: [{
        name: 'ROTATE',
        isInUse: true,
        direction: 'CCW'
      }, {
        name: 'PATH',
        isInUse: true,
        direction: 'FORWARD',
        style: 'CURVED'
      }],
      layout: 'HORIZONTAL'
    })
    await versionManager.upgrade(oldConfig, '1.0.0', TARGET_VER, WIDGET_ID).then((newConfig) => {
      const itemsList: ItemsType[] = newConfig.itemsList

      // 1.FlyItemMode.Rotate
      expect(itemsList[0].uuid).toBe('0')
      // 2.FlyItemMode.Path
      expect(itemsList[1].uuid).toBe('1')
      // 3.FlyItemMode.Route
      const routeItem = itemsList[2] as RouteItemConfig
      expect(routeItem.uuid).toBe('2')
      expect(routeItem.name).toBe(FlyItemMode.Route)
      expect(routeItem.isInUse).toBe(false)
      expect(routeItem.routes).toStrictEqual([])
    })
  })

  it('ver. 15 Apr 2020', async () => {
    const oldConfig = Immutable({
      useMapWidgetIds: [],
      itemsList: [{
        name: 'ROTATE',
        isInUse: true,
        direction: 'CCW'
      }, {
        name: 'PATH',
        isInUse: true,
        direction: 'FORWARD',
        style: 'CURVED'
      }, {
        name: 'RECORD',
        isInUse: true,
        records: []
      }
      ],
      layout: 'HORIZONTAL'
    })

    await versionManager.upgrade(oldConfig, '1.2.0', TARGET_VER, WIDGET_ID).then((newConfig) => {
      const itemsList: ItemsType[] = newConfig.itemsList

      // 1.FlyItemMode.Rotate
      expect(itemsList[0].uuid).toBe('0')
      // 2.FlyItemMode.Path
      expect(itemsList[1].uuid).toBe('1')
      // 3.FlyItemMode.Route
      const routeItem = itemsList[2] as RouteItemConfig
      expect(routeItem.uuid).toBe('2')
      expect(routeItem.name).toBe(FlyItemMode.Route)
      expect(routeItem.isInUse).toBe(false)
      expect(routeItem.routes).toStrictEqual([])
    })
  })

  it('ver. 9 May 2020', async () => {
    const oldConfig = Immutable({
      useMapWidgetIds: [],
      itemsList: [{
        name: 'ROTATE',
        isInUse: true,
        direction: 'CCW'
      }, {
        name: 'PATH',
        isInUse: true,
        direction: 'FORWARD',
        style: 'CURVED'
      }, {
        name: 'RECORD',
        isInUse: false,
        records: []
      }],
      layout: 'HORIZONTAL'
    })

    await versionManager.upgrade(oldConfig, '1.2.0', TARGET_VER, WIDGET_ID).then((newConfig) => {
      const itemsList: ItemsType[] = newConfig.itemsList

      // 1.FlyItemMode.Rotate
      expect(itemsList[0].uuid).toBe('0')
      // 2.FlyItemMode.Path
      expect(itemsList[1].uuid).toBe('1')
      // 3.FlyItemMode.Route
      const routeItem = itemsList[2] as RouteItemConfig
      expect(routeItem.uuid).toBe('2')
      expect(routeItem.name).toBe(FlyItemMode.Route)
      expect(routeItem.isInUse).toBe(false)
      expect(routeItem.routes).toStrictEqual([])
    })
  })

  it('ver. 27 Sep 2020', async () => {
    const oldConfig = Immutable({
      useMapWidgetIds: [],
      itemsList: [{
        name: 'ROTATE',
        isInUse: true,
        direction: 'CCW'
      }, {
        name: 'PATH',
        isInUse: true,
        direction: 'FORWARD',
        style: 'CURVED'
      }, {
        name: 'RECORD',
        isInUse: false,
        routes: []
      }],
      layout: 'HORIZONTAL'
    })

    await versionManager.upgrade(oldConfig, '1.2.0', TARGET_VER, WIDGET_ID).then((newConfig) => {
      const itemsList: ItemsType[] = newConfig.itemsList

      // 1.FlyItemMode.Rotate
      expect(itemsList[0].uuid).toBe('0')
      // 2.FlyItemMode.Path
      expect(itemsList[1].uuid).toBe('1')
      // 3.FlyItemMode.Route
      const routeItem = itemsList[2] as RouteItemConfig
      expect(routeItem.uuid).toBe('2')
      expect(routeItem.name).toBe(FlyItemMode.Route)
      expect(routeItem.isInUse).toBe(false)
      expect(routeItem.routes).toStrictEqual([])
    })
  })

  it('ver. 10 Oct 2020 ', async () => {
    const oldConfig = Immutable({
      useMapWidgetIds: [],
      itemsList: [{
        name: 'ROTATE',
        isInUse: true,
        direction: 'CCW'
      }, {
        name: 'PATH',
        isInUse: true,
        direction: 'FORWARD',
        style: 'CURVED'
      }, {
        name: 'RECORD',
        isInUse: true,
        routes: []
      }],
      layout: 'HORIZONTAL'
    })

    await versionManager.upgrade(oldConfig, '1.2.0', TARGET_VER, WIDGET_ID).then((newConfig) => {
      const itemsList: ItemsType[] = newConfig.itemsList

      // 1.FlyItemMode.Rotate
      expect(itemsList[0].uuid).toBe('0')
      // 2.FlyItemMode.Path
      expect(itemsList[1].uuid).toBe('1')
      // 3.FlyItemMode.Route
      const routeItem = itemsList[2] as RouteItemConfig
      expect(routeItem.uuid).toBe('2')
      expect(routeItem.name).toBe(FlyItemMode.Route)
      expect(routeItem.isInUse).toBe(false)
      expect(routeItem.routes).toStrictEqual([])
    })
  })

  it('ver. 20 Oct 2020 ', async () => {
    const oldConfig = Immutable({
      useMapWidgetIds: [],
      itemsList: [{
        name: 'ROTATE',
        isInUse: true,
        direction: 'CCW'
      }, {
        name: 'PATH',
        isInUse: true,
        direction: 'FORWARD',
        style: 'CURVED'
      }, {
        name: 'ROUTE',
        isInUse: true,
        routes: []
      }],
      layout: 'HORIZONTAL'
    })

    await versionManager.upgrade(oldConfig, '1.2.0', TARGET_VER, WIDGET_ID).then((newConfig) => {
      const itemsList: ItemsType[] = newConfig.itemsList

      // 1.FlyItemMode.Rotate
      expect(itemsList[0].uuid).toBe('0')
      // 2.FlyItemMode.Path
      expect(itemsList[1].uuid).toBe('1')
      // 3.FlyItemMode.Route
      const routeItem = itemsList[2] as RouteItemConfig
      expect(routeItem.uuid).toBe('2')
      expect(routeItem.name).toBe(FlyItemMode.Route)
      expect(routeItem.isInUse).toBe(false)
      expect(routeItem.routes).toStrictEqual([])
    })
  })
})
