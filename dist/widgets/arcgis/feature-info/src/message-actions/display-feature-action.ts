import {
  AbstractMessageAction, MessageType, Message,
  DataRecordsSelectionChangeMessage,
  MutableStoreManager,
  MessageDescription
} from 'jimu-core'

export default class ZoomToFeatureAction extends AbstractMessageAction {
  filterMessageDescription (messageDescription: MessageDescription): boolean {
    return messageDescription.messageType === MessageType.DataRecordsSelectionChange
  }

  filterMessage (message: Message): boolean {
    return true
  }

  onExecute (message: Message): Promise<boolean> | boolean {
    switch (message.type) {
      case MessageType.DataRecordsSelectionChange:
        const dataRecordsSelectionChangeMessage = message as DataRecordsSelectionChangeMessage
        const record = dataRecordsSelectionChangeMessage.records && dataRecordsSelectionChangeMessage.records[0]
        MutableStoreManager.getInstance().updateStateValue(this.widgetId, 'displayFeatureActionValue.record', record)
        break
    }

    return Promise.resolve(true)
  }
}
