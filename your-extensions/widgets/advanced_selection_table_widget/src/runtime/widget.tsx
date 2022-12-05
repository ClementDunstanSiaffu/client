import {React,jsx,AllWidgetProps,IMState, appActions} from 'jimu-core';
import LayersTable from '../component/layer_table';
import {popupContentType} from '../interface/interface'

type StateValueType = {
    stateValue:any
}

export default class AdvancedSelectionTable extends React.PureComponent<AllWidgetProps<any>&StateValueType,any>{

    static mapExtraStateProps(state:IMState){
        return {stateValue:state.widgetsState};
    }

    sketchGeometry = (geometryType:any)=>{
        this.props.dispatch(appActions.widgetStatePropChange("value","sketch",true));
        this.props.dispatch(appActions.widgetStatePropChange("value","geometryType",geometryType));
    }

    openPopUp = (popcontents:popupContentType)=>{
        this.props.dispatch(appActions.widgetStatePropChange("value","popup",true));
        this.props.dispatch(appActions.widgetStatePropChange("value","popupContents",popcontents));
    }

    render(): React.ReactNode {
        const layers = this.props.stateValue?.value?.layers;
        const layersContents = this.props.stateValue?.value?.layerContents
        return <LayersTable 
                    layers={layers} 
                    sketchGeometry = {this.sketchGeometry} 
                    layersContents = {layersContents}
                    openPopUp = {this.openPopUp}
                />;
    }
}