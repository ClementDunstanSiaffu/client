import {
  AbstractMessageAction, MessageType, Message, getAppStore, DataRecordSetChangeMessage, RecordSetChangeType, DataSourceFilterChangeMessage,
  DataRecordsSelectionChangeMessage, ExtentChangeMessage, FeatureDataRecord as FeatureQueryDataRecord, MutableStoreManager, DataSourceManager, MessageDescription
} from 'jimu-core'
import { FeatureDataRecord as FeatureLayerDataRecord, loadArcGISJSAPIModules } from 'jimu-arcgis'
import { handleFeature } from '../runtime/utils'
import { IMConfig } from './pan-to-action-setting'
import { getDsByWidgetId } from './action-utils'

export default class PanToAction extends AbstractMessageAction {
  NoLockTriggerLayerWidgets = ['Map']

  filterMessageDescription (messageDescription: MessageDescription): boolean {
    if (messageDescription.messageType === MessageType.ExtentChange) {
      return true
    } else if (messageDescription.messageType !== MessageType.DataRecordSetChange &&
        messageDescription.messageType !== MessageType.DataRecordsSelectionChange &&
        messageDescription.messageType !== MessageType.DataSourceFilterChange) {
      return false
    } else {
      const dataSourceManager = DataSourceManager.getInstance()
      const messageWidgetUseDataSources = getDsByWidgetId(messageDescription.widgetId, messageDescription.messageType)
      return messageWidgetUseDataSources.some(useDataSource => {
        const ds = dataSourceManager.getDataSource(useDataSource.dataSourceId)
        if (ds.type === 'WEB_MAP' || ds.type === 'WEB_SCENE') {
          return true
        } else {
          return !!ds.getDataSourceJson()?.geometryType
        }
      })
    }
  }

  filterMessage (message: Message): boolean {
    return true
  }

  getSettingComponentUri (messageType: MessageType, messageWidgetId?: string): string {
    //const config = getAppStore().getState().appStateInBuilder ? getAppStore().getState().appStateInBuilder.appConfig : getAppStore().getState().appConfig
    //const messageWidgetJson = config.widgets[messageWidgetId]
    if (messageType === MessageType.DataRecordsSelectionChange ||
          messageType === MessageType.DataSourceFilterChange) {
      return 'message-actions/pan-to-action-setting'
    } else {
      return null
    }
  }

  onExecute (message: Message, actionConfig?: IMConfig): Promise<boolean> | boolean {
    return loadArcGISJSAPIModules(['esri/Graphic']).then(modules => {
      let Graphic: __esri.GraphicConstructor = null;
      [Graphic] = modules
      switch (message.type) {
        case MessageType.DataRecordSetChange:
          const dataRecordSetChangeMessage = message as DataRecordSetChangeMessage
          if (dataRecordSetChangeMessage.changeType === RecordSetChangeType.Create ||
            dataRecordSetChangeMessage.changeType === RecordSetChangeType.Update) {
            let newFeatureSet = {}
            if (dataRecordSetChangeMessage.dataRecordSet && dataRecordSetChangeMessage.dataRecordSet.records) {
              const features = []
              for (let i = 0; i < dataRecordSetChangeMessage.dataRecordSet.records.length; i++) {
                const dataRecordFeature = (dataRecordSetChangeMessage.dataRecordSet.records[i] as
                  (FeatureQueryDataRecord | FeatureLayerDataRecord)).feature
                if (dataRecordFeature) {
                  features.push(handleFeature(dataRecordFeature, Graphic).geometry)
                }
              }

              newFeatureSet = {
                features: features
              } as __esri.FeatureSet
            }

            MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'panToActionValue.value', newFeatureSet)
          }
          break
        case MessageType.DataRecordsSelectionChange:
          const config = getAppStore().getState().appConfig
          const messageWidgetJson = config.widgets[message.widgetId]
          const messageWidgetLabel = messageWidgetJson.manifest.label
          const dataRecordsSelectionChangeMessage = message as DataRecordsSelectionChangeMessage

          let selectionFeatureSet = {}
          const selectFeatures = []
          if (dataRecordsSelectionChangeMessage.records) {
            if (dataRecordsSelectionChangeMessage.records[0]) {
              //if (!actionConfig.useDataSource || (dataRecordsSelectionChangeMessage.records[0].dataSource.getMainDataSource().id !== actionConfig.useDataSource.mainDataSourceId)) {
              //  break
              //}
              if (this.NoLockTriggerLayerWidgets.includes(messageWidgetLabel)) {
                const mainDataSourceOfSelection = dataRecordsSelectionChangeMessage.records[0].dataSource.getMainDataSource()
                if (!actionConfig?.useDataSources?.some(useDataSource => useDataSource?.mainDataSourceId === mainDataSourceOfSelection.id)) {
                  break
                }
              } else {
                const selectionChangeDS = dataRecordsSelectionChangeMessage.records[0].dataSource
                const selectionChangeMainDS = selectionChangeDS?.getMainDataSource()
                // check dsId of mainDS currently, will support view in the future.
                if (!actionConfig.useDataSources.some(useDataSource => useDataSource?.mainDataSourceId === selectionChangeMainDS.id)) {
                  break
                }
              }
            }

            for (let i = 0; i < dataRecordsSelectionChangeMessage.records.length; i++) {
              const dataRecordFeature = (dataRecordsSelectionChangeMessage.records[i] as
                (FeatureQueryDataRecord | FeatureLayerDataRecord)).feature
              if (dataRecordFeature) {
                selectFeatures.push(handleFeature(dataRecordFeature, Graphic).geometry)
              }
            }
          }

          selectionFeatureSet = {
            features: selectFeatures
          }

          MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'panToActionValue.value', selectionFeatureSet)
          break
        case MessageType.ExtentChange:
          const extentChangeMessage = message as ExtentChangeMessage

          if (extentChangeMessage.getRelatedWidgetIds().includes(this.widgetId)) {
            break
          }

          const extentValue = {
            features: [extentChangeMessage.extent]
          }

          const panToFeatureActionValue = {
            value: extentValue,
            relatedWidgets: extentChangeMessage.getRelatedWidgetIds()
          }
          MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'panToActionValue', panToFeatureActionValue)
          break
        case MessageType.DataSourceFilterChange:
          const filterChangeMessage = message as DataSourceFilterChangeMessage
          const filterChangeDS = DataSourceManager.getInstance().getDataSource(filterChangeMessage.dataSourceId)
          //const filterChangeMainDS = filterChangeDS?.getMainDataSource()
          // support view.
          if (!actionConfig.useDataSources.some(useDataSource => useDataSource?.dataSourceId === filterChangeDS.id)) {
            break
          }
          const filterChangeActionValue = {
            dataSourceId: filterChangeMessage.dataSourceId,
            useDataSources: actionConfig.useDataSources || [],
            type: 'pan-to-query-params'
          }

          MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'panToActionValue.value', filterChangeActionValue)
          break
      }
      return true
    })
  }
}
