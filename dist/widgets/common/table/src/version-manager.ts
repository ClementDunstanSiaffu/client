import { BaseVersionManager } from 'jimu-core'

class VersionManager extends BaseVersionManager {
  versions = [{
    version: '1.6.0',
    description: 'Add editable to table fields.',
    upgrader: (oldConfig, id) => {
      let newConfig = oldConfig
      if (newConfig.layersConfig.length === 0) {
        return newConfig
      }
      newConfig.layersConfig.forEach((config, i) => {
        const newTableFields = config.tableFields.map(field => {
          return {
            ...field,
            editAuthority: true
          }
        })
        newConfig = newConfig.setIn(['layersConfig', i, 'tableFields'], newTableFields)
      })
      return newConfig
    }
  }]
}

export const versionManager = new VersionManager()
