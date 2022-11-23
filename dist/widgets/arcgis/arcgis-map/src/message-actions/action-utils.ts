import { getAppStore, MessageType, MessageCarryData, UseDataSource, IMUseDataSource, Immutable, DataSourceManager, ImmutableArray, IMWidgetJson } from 'jimu-core'
import { ArcGISDataSourceTypes } from 'jimu-arcgis'

export function isUseOutputDataSources (wId: string, messageType: MessageType): boolean {
  const messageCarryData = getMessageCarryDataByWidgetId(wId, messageType)
  return messageCarryData === MessageCarryData.OutputDataSource
}

export function getMessageCarryDataByWidgetId (wId: string, messageType: MessageType): MessageCarryData {
  const appConfig = getAppConfig()
  const widgetJson = appConfig?.widgets?.[wId]
  const publishMessages = widgetJson?.manifest?.publishMessages
  let messageCarryData = MessageCarryData.UseDataSource
  publishMessages?.forEach(el => {
    const publishMessageProperty = el as any
    if (publishMessageProperty?.messageCarryData && publishMessageProperty?.messageType === messageType) {
      messageCarryData = publishMessageProperty?.messageCarryData
    }
  })
  return messageCarryData
}

export interface ActionConfig {
  useDataSource: UseDataSource
  useDataSources?: UseDataSource[]
}

export function checkOutActionConfig (actionConfig: Immutable.ImmutableObject<ActionConfig>, messageWidgetId: string, messageType: MessageType) {
  const config = getAppConfig()
  //const messageWidgetJson = config.widgets[messageWidgetId]

  let useDataSource: IMUseDataSource = null
  const useDataSources: IMUseDataSource[] = []
  if (!actionConfig.useDataSource) {
    const messageWidgetUseDataSources = getDsByWidgetId(messageWidgetId, messageType)
    //if (messageWidgetJson && messageWidgetJson.useDataSources && messageWidgetJson.useDataSources.length > 0) {
    if (messageWidgetUseDataSources.length > 0) {
      messageWidgetUseDataSources.forEach((useDS, index) => {
        const dsJson = config.dataSources[useDS.dataSourceId]
        let tempUseDataSource
        if (dsJson && ((dsJson.type === ArcGISDataSourceTypes.WebMap) || (dsJson.type === ArcGISDataSourceTypes.WebScene))) {
          tempUseDataSource = null
        } else {
          tempUseDataSource = Immutable({
            dataSourceId: useDS.dataSourceId,
            mainDataSourceId: useDS.mainDataSourceId,
            rootDataSourceId: useDS.rootDataSourceId,
            dataViewId: useDS.dataViewId
          })
          if (!useDataSource) {
            useDataSource = tempUseDataSource
          }
          useDataSources.push(tempUseDataSource)
        }
      })
    }
  } else {
    useDataSource = checkOutUseDataSource(messageWidgetId, actionConfig.useDataSource, messageType)
    if (actionConfig.useDataSources) {
      actionConfig.useDataSources.forEach(useDS => {
        const tempUseDataSource = checkOutUseDataSource(messageWidgetId, useDS, messageType)
        tempUseDataSource && useDataSources.push(tempUseDataSource)
      })
    }
  }

  return {
    useDataSource: useDataSource,
    useDataSources: useDataSources
  }
}

function checkOutUseDataSource (messageWidgetId: string, oldUseDataSource: Immutable.ImmutableObject<UseDataSource>, messageType: MessageType) {
  const config = getAppConfig()
  //const widgetJson = config.widgets[messageWidgetId]
  const messageWidgetUseDataSources = getDsByWidgetId(messageWidgetId, messageType)
  let initUseDataSource = null
  let isMapDs = false

  const dsId = messageWidgetUseDataSources && messageWidgetUseDataSources[0] && messageWidgetUseDataSources[0].dataSourceId
  if (!dsId) {
    return null
  }

  const dsJson = config.dataSources[dsId]
  if (dsJson && ((dsJson.type === ArcGISDataSourceTypes.WebMap) || (dsJson.type === ArcGISDataSourceTypes.WebScene))) {
    isMapDs = true
  }

  const dsM = DataSourceManager.getInstance()
  const isoldUseDataSourceIsOutputDs = dsM.getDataSource(oldUseDataSource.dataSourceId)?.getDataSourceJson()?.isOutputFromWidget

  if (isMapDs) {
    // webmap or webscene ds
    let isUseOldDs = false
    if (messageWidgetUseDataSources) {
      for (let i = 0; i < messageWidgetUseDataSources.length; i++) {
        if (messageWidgetUseDataSources[i].dataSourceId === oldUseDataSource.rootDataSourceId) {
          isUseOldDs = true
          break
        }
      }
    }

    if (isUseOldDs) {
      initUseDataSource = oldUseDataSource
    } else {
      initUseDataSource = null
    }
  } else {
    // featurelayer ds
    let isUseOldDs = false
    if (messageWidgetUseDataSources) {
      for (let i = 0; i < messageWidgetUseDataSources.length; i++) {
        const oldUseDataSourceId = isoldUseDataSourceIsOutputDs ? oldUseDataSource?.mainDataSourceId : oldUseDataSource?.dataSourceId
        const currentUseDataSourceId = isoldUseDataSourceIsOutputDs ? messageWidgetUseDataSources[i]?.mainDataSourceId : messageWidgetUseDataSources[i]?.dataSourceId
        // support data view
        if (currentUseDataSourceId === oldUseDataSourceId) {
          isUseOldDs = true
          break
        }
      }
    }

    if (isUseOldDs) {
      initUseDataSource = oldUseDataSource
    } else {
      if (messageWidgetUseDataSources && messageWidgetUseDataSources.length === 1) {
        initUseDataSource = Immutable({
          dataSourceId: messageWidgetUseDataSources[0].dataSourceId,
          mainDataSourceId: messageWidgetUseDataSources[0].mainDataSourceId,
          rootDataSourceId: messageWidgetUseDataSources[0].rootDataSourceId
        })
      } else {
        initUseDataSource = null
      }
    }
  }

  return initUseDataSource
}

export function getUseDataSourceInfo (widgetId: string, useDataSource: Immutable.ImmutableObject<UseDataSource>, useDataSources: Immutable.ImmutableArray<UseDataSource>, messageType: MessageType) {
  const appConfig = getAppConfig()
  const widgetJson = appConfig?.widgets?.[widgetId]
  let isReadOnly = false
  const dsRootIds = getDsRootIdsByWidgetId(widgetId)
  //if (dsRootIds && dsRootIds.length === 0 && (widgetJson && widgetJson.useDataSources && widgetJson.useDataSources.length === 1)) {
  //  isReadOnly = true
  //}

  //if (!dsRootIds && (widgetJson && widgetJson.useDataSources && widgetJson.useDataSources.length === 1)) {
  //  isReadOnly = true
  //}

  if (!dsRootIds || dsRootIds?.length === 0) {
    isReadOnly = checkIsOnlyOneDs(widgetJson, messageType, dsRootIds)
  }

  const fromDsIds = dsRootIds ? undefined : getDsIdsByWidgetId(widgetId, messageType)
  const dsSelectorSource = {
    isReadOnly: isReadOnly,
    useDataSource: useDataSource,
    useDataSources: useDataSources || [],
    fromRootDsIds: dsRootIds,
    fromDsIds: fromDsIds
  }

  return dsSelectorSource
}

export function getDsByWidgetId (wId: string, messageType: MessageType): ImmutableArray<UseDataSource> {
  const messageCarryData = getMessageCarryDataByWidgetId(wId, messageType)
  const appConfig = getAppConfig()
  const widgetJson = appConfig?.widgets?.[wId]
  const useDataSources = widgetJson?.useDataSources || Immutable([])
  const outputDataSources = initOutputDataSources(widgetJson?.outputDataSources) || Immutable([])
  const bothDatasource = useDataSources?.asMutable({ deep: true }).concat(outputDataSources?.asMutable({ deep: true }))
  switch (messageCarryData) {
    case MessageCarryData.OutputDataSource:
      return outputDataSources
    case MessageCarryData.UseDataSource:
      return useDataSources
    case MessageCarryData.BothDataSource:
      return Immutable(bothDatasource)
  }
}

export function initOutputDataSources (outputDataSources): ImmutableArray<UseDataSource> {
  const ds = outputDataSources?.map(dsId => {
    return {
      dataSourceId: dsId,
      mainDataSourceId: dsId,
      rootDataSourceId: null
    }
  }) ?? []
  return Immutable(ds)
}

export function checkIsOnlyOneDs (widgetJson: IMWidgetJson, messageType: MessageType, dsRootIds: ImmutableArray<string>): boolean {
  const messageCarryData = getMessageCarryDataByWidgetId(widgetJson?.id, messageType)
  const outputDs = widgetJson?.outputDataSources || []
  const useDs = widgetJson?.useDataSources || []
  if (dsRootIds) {
    return false
  }
  switch (messageCarryData) {
    case MessageCarryData.OutputDataSource:
      return outputDs?.length === 1
    case MessageCarryData.UseDataSource:
      return useDs?.length === 1
    case MessageCarryData.BothDataSource:
      const dsLength = outputDs.length + useDs.length
      return dsLength === 1
  }
}

function getAppConfig () {
  return window.jimuConfig.isBuilder ? getAppStore().getState()?.appStateInBuilder?.appConfig : getAppStore().getState()?.appConfig
}

function getDsRootIdsByWidgetId (wId: string) {
  const appConfig = getAppConfig()
  const widgetJson = appConfig?.widgets?.[wId]
  const rootIds = []
  const dsM = DataSourceManager.getInstance()
  widgetJson?.useDataSources?.forEach((useDS: Immutable.ImmutableObject<UseDataSource>) => {
    const ds = dsM.getDataSource(useDS.dataSourceId)
    if (ds?.type === ArcGISDataSourceTypes.WebMap || ds?.type === ArcGISDataSourceTypes.WebScene) { // is root ds
      rootIds.push(useDS.dataSourceId)
    }
  })
  return rootIds.length > 0 ? Immutable(rootIds) : undefined
}

function getDsIdsByWidgetId (wId: string, messageType: MessageType) {
  const messageWidgetUseDataSources = getDsByWidgetId(wId, messageType)
  return Immutable(messageWidgetUseDataSources.map((useDS: Immutable.ImmutableObject<UseDataSource>) => {
    const dsM = DataSourceManager.getInstance()
    const ds = dsM.getDataSource(useDS.dataSourceId)
    let resultDs
    if (ds && ds.isDataView) {
      // support data view
      resultDs = ds?.getMainDataSource()
    } else {
      resultDs = ds
    }
    return resultDs?.id
  }) ?? [])
}
