import {
  AbstractMessageAction, MessageType, Message, DataRecordSetChangeMessage, RecordSetChangeType, getAppStore, DataSourceManager,
  DataRecordsSelectionChangeMessage, FeatureDataRecord, ExtentChangeMessage, MutableStoreManager, DataSourceFilterChangeMessage, MessageDescription
} from 'jimu-core'
import { loadArcGISJSAPIModules } from 'jimu-arcgis'
import { handleFeature } from '../runtime/utils'
import { IMConfig } from './zoom-to-feature-action-setting'
import { getDsByWidgetId } from './action-utils'

export default class ZoomToFeatureAction extends AbstractMessageAction {
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
    if (messageType === MessageType.DataRecordsSelectionChange ||
          messageType === MessageType.DataRecordSetChange ||
          messageType === MessageType.DataSourceFilterChange) {
      return 'message-actions/zoom-to-feature-action-setting'
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
                if ((dataRecordSetChangeMessage.dataRecordSet.records[i] as FeatureDataRecord).feature) {
                  features.push(handleFeature((dataRecordSetChangeMessage.dataRecordSet.records[i] as
                    FeatureDataRecord).feature, Graphic))
                }
              }

              newFeatureSet = {
                features: features,
                zoomToOption: actionConfig && actionConfig.isUseCustomZoomToOption && actionConfig.zoomToOption.scale ? actionConfig.zoomToOption : null,
                type: 'zoom-to-graphics'
              }
            }

            MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'zoomToFeatureActionValue.value', newFeatureSet)
          }
          break
        case MessageType.DataRecordsSelectionChange:
          const config = getAppStore().getState().appConfig
          const messageWidgetJson = config.widgets[message.widgetId]
          const messageWidgetLabel = messageWidgetJson.manifest.label
          const dataRecordsSelectionChangeMessage = message as DataRecordsSelectionChangeMessage

          let selectionFeatureSet = {}
          const selectFeatures = []

          let layerId = null
          if (dataRecordsSelectionChangeMessage.records) {
            if (dataRecordsSelectionChangeMessage.records[0]) {
              if ((dataRecordsSelectionChangeMessage.records[0].dataSource as any).layer) {
                layerId = (dataRecordsSelectionChangeMessage.records[0].dataSource as any).layer.id
              }

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
              if ((dataRecordsSelectionChangeMessage.records[i] as FeatureDataRecord).feature) {
                selectFeatures.push(handleFeature((dataRecordsSelectionChangeMessage.records[i] as
                  FeatureDataRecord).feature, Graphic))
              }
            }
          }

          selectionFeatureSet = {
            features: selectFeatures,
            layerId: layerId,
            zoomToOption: actionConfig && actionConfig.isUseCustomZoomToOption && actionConfig.zoomToOption.scale ? actionConfig.zoomToOption : null,
            type: 'zoom-to-graphics'
          }

          MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'zoomToFeatureActionValue.value', selectionFeatureSet)
          break
        case MessageType.ExtentChange:
          const extentChangeMessage = message as ExtentChangeMessage
          if (extentChangeMessage.getRelatedWidgetIds().includes(this.widgetId)) {
            break
          }

          const extentValue = {
            features: [extentChangeMessage.extent],
            type: 'zoom-to-extent'
          }

          const zoomToFeatureActionValue = {
            value: extentValue,
            relatedWidgets: extentChangeMessage.getRelatedWidgetIds()
          }
          MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'zoomToFeatureActionValue', zoomToFeatureActionValue)
          break
        case MessageType.DataSourceFilterChange:
          const filterChangeMessage = message as DataSourceFilterChangeMessage
          const filterChangeDS = DataSourceManager.getInstance().getDataSource(filterChangeMessage.dataSourceId)
          //const filterChangeMainDS = filterChangeDS?.getMainDataSource()
          // support data view.
          if (!actionConfig.useDataSources.some(useDataSource => useDataSource?.dataSourceId === filterChangeDS.id)) {
            break
          }
          const filterChangeActionValue = {
            dataSourceId: filterChangeMessage.dataSourceId,
            zoomToOption: actionConfig && actionConfig.isUseCustomZoomToOption && actionConfig.zoomToOption.scale ? actionConfig.zoomToOption : null,
            useDataSources: actionConfig.useDataSources || [],
            type: 'zoom-to-query-params'
          }

          MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'zoomToFeatureActionValue.value', filterChangeActionValue)
          break
      }

      return true
    })
  }
}
