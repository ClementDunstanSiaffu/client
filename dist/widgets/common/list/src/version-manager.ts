import { BaseVersionManager, DataSourceManager, getAppStore, QueriableDataSource } from 'jimu-core'
import { updateSQLExpressionByVersion } from 'jimu-ui/basic/sql-expression-runtime'
import { ListLayoutType, DirectionType } from './config'

const getDs = async function (filter, widgetId): Promise<any> {
  let ds
  const dataSource = getAppStore().getState()?.appConfig?.widgets[widgetId]
    ?.useDataSources?.[0]
  const dsManager = DataSourceManager.getInstance()
  if (filter && dataSource) {
    ds = dsManager.createDataSourceByUseDataSource(
      Object.assign({}, dataSource, {
        mainDataSourceId: dataSource.mainDataSourceId
      }),
      'localId'
    )
  }
  return await Promise.resolve(ds)
}

const checkIsShowAutoRefreshSetting = (datasource): boolean => {
  if (!datasource) return false
  const interval = (datasource as QueriableDataSource)?.getAutoRefreshInterval() || 0
  return interval > 0
}

class VersionManager extends BaseVersionManager {
  versions = [
    {
      version: '1.1.0',
      description: '',
      upgrader: async (oldConfig, id: string) => {
        const filter = oldConfig.filter
        return await getDs(filter, id).then(ds => {
          let newConfig = oldConfig
          const newFItems = filter
            ? updateSQLExpressionByVersion(filter, '1.1.0', ds)
            : null

          newConfig = newConfig.set('filter', newFItems)
          return newConfig
        })
      }
    },
    {
      version: '1.5.0',
      description: '1.5.0',
      upgrader: async (oldConfig, id: string) => {
        const filter = oldConfig.filter
        return await getDs(filter, id).then(ds => {
          let newConfig = oldConfig
          if (typeof (oldConfig?.isShowAutoRefresh) !== 'boolean') {
            const isShowAutoRefresh = checkIsShowAutoRefreshSetting(ds)
            newConfig = newConfig.set('isShowAutoRefresh', isShowAutoRefresh)
          }
          return newConfig
        })
      }
    },
    {
      version: '1.8.0',
      description: '1.8.0',
      upgrader: async (oldConfig, id: string) => {
        let newConfig = oldConfig
        if (oldConfig?.direction && !oldConfig?.layoutType) {
          const layoutType = oldConfig?.direction === DirectionType.Horizon ? ListLayoutType.Column : ListLayoutType.Row
          newConfig = newConfig.set('layoutType', layoutType).set('keepAspectRatio', false)
        }
        return newConfig
      }
    }
  ]
}

export const versionManager = new VersionManager()
