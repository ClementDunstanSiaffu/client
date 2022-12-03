
import {React,jsx,AllWidgetProps,IMState, appActions} from 'jimu-core';
import LayersTable from '../component/layer_table';

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

    render(): React.ReactNode {
        const layers = this.props.stateValue?.value?.layers
        return <LayersTable layers={layers} sketchGeometry = {this.sketchGeometry}/>;
    }
}