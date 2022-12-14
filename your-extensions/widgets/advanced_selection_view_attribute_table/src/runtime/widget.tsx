
import {React,jsx,AllWidgetProps, appActions,IMState} from 'jimu-core';
import LayerTabs from '../components/layer_tabs';

type stateValuePropsType = {
    stateValue:any
}

export default class AdvancedSelectionAttributeTable extends React.PureComponent<AllWidgetProps<any>&stateValuePropsType,any>{

    static mapExtraStateProps(state:IMState){return {stateValue:state.widgetsState}};


    componentDidMount(): void {
        this.props.dispatch(appActions.widgetStatePropChange("value","attributeWidgetId",this.props.id))
    }

    render(): React.ReactNode {

        const layers = this.props.stateValue?.value?.layers??[];
        const layerContents = this.props.stateValue?.value?.layerContents??[];
        return <>{layers?.length > 0 ? <LayerTabs layers={layers} layerContents = {layerContents}/>:null}</>
        
    }

}