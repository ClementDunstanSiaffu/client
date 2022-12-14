
import {React,jsx,AllWidgetProps, appActions,IMState} from 'jimu-core';
import LayerTabs from '../components/layer_tabs';

type stateValuePropsType = {
    stateValue:any
}

export default class AdvancedSelectionAttributeTable extends React.PureComponent<AllWidgetProps<any>&stateValuePropsType,any>{

    static mapExtraStateProps(state:IMState){return {stateValue:state.widgetsState}};


    componentDidMount(): void {
        const element = document.querySelector(".sidebar-controller");
        element.addEventListener("click",()=>{
            setTimeout(()=>{
                const elementForStyle = document.querySelector(".flex-shrink-0")
                const anotherElement = document.querySelector(".app-root-emotion-cache-ltr-oen2ei");
                anotherElement?.classList.remove("app-root-emotion-cache-ltr-oen2ei");
                anotherElement?.classList.add(".app-root-emotion-cache-ltr-1iklx1g");
                element.ariaExpanded = "false";
                if (elementForStyle.style){
                    elementForStyle.style = "z-index: 0; flex-basis: 100%; overflow: auto;"
                }
            },10)
        })
    }

    render(): React.ReactNode {

        const layers = this.props.stateValue?.value?.layers??[];
        const layerContents = this.props.stateValue?.value?.layerContents??[];
        return <>{layers?.length > 0 ? <LayerTabs layers={layers} layerContents = {layerContents}/>:null}</>
        
    }

}