import {React,jsx,AllWidgetProps,IMState, appActions} from 'jimu-core';
import CreateLayer from '../component/create_layer';
import LayersTable from '../component/layer_table';
import Options from '../component/options';
import StatisticsModal from '../component/statistics';
import { AdvancedSelectionTableContext } from '../context/context';

type StateValueType = {stateValue:any}

export default class AdvancedSelectionTable extends React.PureComponent<AllWidgetProps<any>&StateValueType,any>{

    static mapExtraStateProps(state:IMState){return {stateValue:state.widgetsState}}

    state = {
        // layers:this.props.stateValue?.value?.layers,
        // layersContents:this.props.stateValue?.value?.layerContents,
        // numberOfAttribute:this.props.stateValue?.value?.numberOfAttribute,
        // checkedLayers:this.props.stateValue?.value?.checkedLayers,
        openStatistics:false,
        selectedAttributes:[],
        isItemSelected:false,
        layerId:" ",
        layerTitle:" ",
        component_type:"LAYERS_CONTENTS",
        anchorEl:null,
        selected:[],
        opencreateLayer:false,
        layerName:" ",
        csvBlob:null,
    }

    render(): React.ReactNode {
        return(
            <AdvancedSelectionTableContext.Provider value = {{...this.state,...this.props.stateValue?.value,"parent":this}}>
                <LayersTable />
                {this.state.openStatistics && <StatisticsModal />}
                <Options />
                <CreateLayer />
            </AdvancedSelectionTableContext.Provider>
        )
    }
}