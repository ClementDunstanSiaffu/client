
import {AbstractMessageAction, MessageType, Message, getAppStore, appActions, StringSelectionChangeMessage, DataRecordsSelectionChangeMessage, MessageDescription, WidgetManager} from 'jimu-core';
export default class QueryAction extends AbstractMessageAction{
  
filterMessageDescription(messageDescription: MessageDescription): boolean{
    return [MessageType.StringSelectionChange, MessageType.DataRecordsSelectionChange].indexOf(messageDescription.messageType) > -1;
}

filterMessage(message: Message): boolean{return true; }

//set action setting uri
getSettingComponentUri(messageType: MessageType, messageWidgetId?: string): string {
    return 'actions/query-action-setting';
}

onExecute(message: Message, actionConfig?: any): Promise<boolean> | boolean{
  console.log("on execute action is called",message)
    let q = `${actionConfig.fieldName} = '${message}'`
    switch(message.type){
      case MessageType.StringSelectionChange:
        q = `${actionConfig.fieldName} = '${(message as StringSelectionChangeMessage).str}'`
        break;
      case MessageType.DataRecordsSelectionChange:
        console.log("display widget is called yahweee")
        q = `${actionConfig.fieldName} = ` +
          `'${(message as DataRecordsSelectionChangeMessage).records[0].getFieldValue(actionConfig.fieldName)}'`
        break;
    }

    //Save queryString to store
    getAppStore().dispatch(appActions.widgetStatePropChange(this.widgetId, 'queryString', q));
    WidgetManager.getInstance().openWidget(this.widgetId);
    return true;
  }
}