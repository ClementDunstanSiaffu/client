import { BaseVersionManager } from 'jimu-core'
import { IMConfig, ItemsType, FlyItemMode } from './config'
// import { isDefined } from './common/utils/utils'

class VersionManager extends BaseVersionManager {
  versions = [{
    version: '1.2.0',
    description: 'rename RECORD.records to RECORD.routes',
    upgrader: (oldConfig: IMConfig) => {
      let newConfig: IMConfig = oldConfig
      const $newItemsList = newConfig.getIn(['itemsList'])
      const newItemsList = $newItemsList.asMutable({ deep: true }) as any

      newItemsList.map((flyModeConfig, index) => {
        if (flyModeConfig.name === 'RECORD') {
          if (typeof flyModeConfig.records !== 'undefined') {
            delete (flyModeConfig.records)
          }
          flyModeConfig.routes = []// rename records to routes
        } else {
          // no need to update
        }

        return Object.assign({}, flyModeConfig)
      })
      newConfig = newConfig.set('itemsList', newItemsList)

      return newConfig
    }
  }, {
    version: '1.5.0',
    description: 'config upgrade for 9.2',
    upgrader: (oldConfig: IMConfig) => {
      let newConfig: IMConfig = oldConfig
      const $newItemsList = newConfig.getIn(['itemsList'])
      const newItemsList = $newItemsList.asMutable({ deep: true }) as any

      // 1. add Route-config(version < 2019.Nov)
      if (newItemsList.length === 2) {
        const defaultRouteConfig = {
          uuid: '2',
          name: FlyItemMode.Route,
          isInUse: false,
          routes: []
        }
        newItemsList.push(defaultRouteConfig)
      }

      newItemsList.map((flyModeConfig: ItemsType, index) => {
        // 2. add uuid (version < 9.2)
        if (typeof flyModeConfig.uuid === 'undefined') {
          flyModeConfig.uuid = index.toString()
        }

        // 3. change old name (version 2020.Oct)
        if ((flyModeConfig.name as unknown) === 'RECORD') {
          flyModeConfig.name = FlyItemMode.Route
        }

        if (FlyItemMode.Route === flyModeConfig.name) {
          // 4. rename records to routes
          if (typeof (flyModeConfig as any).records !== 'undefined') {
            delete (flyModeConfig as any).records
          }
          flyModeConfig.routes = []

          // 5. set default isInUse to false
          flyModeConfig.isInUse = false
        }

        return Object.assign({}, flyModeConfig)
      })
      newConfig = newConfig.set('itemsList', newItemsList)

      return newConfig
    }
  }]
}

export const versionManager = new VersionManager()
