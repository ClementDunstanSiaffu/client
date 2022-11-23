import { BaseVersionManager, DataSourceManager, FeatureLayerDataSource, Immutable, ImmutableArray } from 'jimu-core'
import { LayerHonorModeType } from './config'
import { INVISIBLE_FIELD } from './setting/setting-const'

class VersionManager extends BaseVersionManager {
  versions = [{
    version: '1.7.0',
    description: 'Add layerHonorMode to config for support smart form.',
    upgrader: async (oldConfig) => {
      let newConfig = oldConfig
      const decoupleNested = (groupSubItems, fieldsConfig) => {
        const unnestedFields = []
        const recursion = (subItems) => {
          subItems.forEach(item => {
            if (item.groupKey) {
              recursion(item.children)
            } else {
              const subOrgField = fieldsConfig.find(config => config.name === item.jimuName)
              if (!INVISIBLE_FIELD.includes(item.jimuName)) {
                unnestedFields.push({
                  ...item,
                  editable: subOrgField?.editable,
                  editAuthority: subOrgField?.editable ? item?.editAuthority : false
                })
              }
            }
          })
          return unnestedFields
        }
        return recursion(groupSubItems)
      }
      return await Promise.all(
        newConfig.layersConfig.map(layerConfig => {
          return new Promise(resolve => {
            DataSourceManager.getInstance().createDataSourceByUseDataSource(layerConfig.useDataSource).then(currentDs => {
              const layerDefinition = (currentDs as FeatureLayerDataSource)?.getLayerDefinition()
              const fieldsConfig = layerDefinition?.fields || []
              const newGroupedFields = layerConfig.groupedFields.map(field => {
                const orgField = fieldsConfig.find(config => config.name === field.jimuName)
                if (field.groupKey) {
                  return {
                    ...field,
                    editable: true,
                    editAuthority: !field?.children?.some(item => item.editAuthority === false),
                    children: decoupleNested(field?.children, fieldsConfig)
                  }
                }
                return {
                  ...field,
                  editable: orgField?.editable,
                  editAuthority: orgField?.editable ? field?.editAuthority : false
                }
              }).filter(
                item => !INVISIBLE_FIELD.includes(item.jimuName)
              )
              resolve(newGroupedFields)
            })
          })
        })
      ).then(res => {
        res.forEach((resItem: ImmutableArray<any>, i) => {
          const selectedFields = newConfig.layersConfig[i].showFields.filter(
            item => !INVISIBLE_FIELD.includes(item.jimuName)
          )
          let unGroupedFields = []
          const resGroupedFields = resItem.asMutable({ deep: true })
          resItem.forEach(item => {
            if (item.groupKey) {
              unGroupedFields = unGroupedFields.concat(item.children)
            } else {
              unGroupedFields.push(item)
            }
          })
          selectedFields.forEach(ele => {
            if (!unGroupedFields.find(field => field.jimuName === ele.jimuName)) {
              resGroupedFields.push(ele)
            }
          })
          newConfig = newConfig.setIn(['layersConfig', i, 'groupedFields'], Immutable(resGroupedFields))
          newConfig = newConfig.setIn(['layersConfig', i, 'layerHonorMode'], LayerHonorModeType.Custom)
        })
        return Promise.resolve(newConfig)
      })
    }
  }]
}

export const versionManager = new VersionManager()
