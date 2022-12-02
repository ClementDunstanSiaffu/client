
import {React,jsx,AllWidgetProps,IMState} from 'jimu-core';
import LayersTable from '../component/layer_table';
import Sketch from "@arcgis/core/widgets/Sketch";

type StateValueType = {
    stateValue:any
}

export default class AdvancedSelectionTable extends React.PureComponent<AllWidgetProps<any>&StateValueType,any>{

    static mapExtraStateProps(state:IMState){
        return {stateValue:state.widgetsState};
    }

    sketchGeometry = (geometryType:any)=>{
        this.props.stateValue["value"]?.sketch(geometryType);
    }

    render(): React.ReactNode {
        const layers = this.props.stateValue?.value?.layers
        return <LayersTable layers={layers} sketchGeometry = {this.sketchGeometry}/>;
    }
}