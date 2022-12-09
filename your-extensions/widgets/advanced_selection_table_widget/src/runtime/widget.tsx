import {React,jsx,AllWidgetProps,IMState, appActions} from 'jimu-core';
import LayersTable from '../component/layer_table';
import {popupContentType} from '../interface/interface'
import {getUri} from '../lib/build_uri'

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

    onClickZoomIn = ()=>{
        this.props.dispatch(appActions.widgetStatePropChange("value","zoomIn",true))
    }

    convertToCsv = (selectedAttributes:any[],exportTYpe:string)=>{
        const uri = getUri(selectedAttributes,exportTYpe,this);
        this.props.dispatch(appActions.widgetStatePropChange("value","exportStatus",true));
        this.props.dispatch(appActions.widgetStatePropChange("value","uri",uri));
        // window.open(uri,"blank")
    }

    render(): React.ReactNode {
        const layers = this.props.stateValue?.value?.layers;
        const layersContents = this.props.stateValue?.value?.layerContents;
        const numberOfAttribute = this.props.stateValue?.value?.numberOfAttribute;
        const checkedLayers = this.props.stateValue?.value?.checkedLayers;
        return <LayersTable 
                    layers={layers} 
                    layersContents = {layersContents}
                    openPopUp = {this.openPopUp}
                    numberOfAttribute = {numberOfAttribute}
                    checkedLayers = {checkedLayers}
                    parent = {this}
                />;
    }
}