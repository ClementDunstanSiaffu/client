
import {React,jsx,AllWidgetProps,appActions,IMState} from 'jimu-core'
import { JimuMapViewComponent,JimuMapView } from 'jimu-arcgis';
import SketchViewModel from "esri/widgets/Sketch/SketchViewModel";
import GraphicsLayer from 'esri/layers/GraphicsLayer';

type stateValueType = {
    stateValue:any
}

const  sketchLayer = new GraphicsLayer()

export default class MapViewWidget extends React.PureComponent<AllWidgetProps<any>&stateValueType,any>{

    static mapExtraStateProps(state:IMState){
        return {stateValue:state.widgetsState};
    }

    state = {layers:[],activeView:null};
    sketch = null;

    getMapLayers = (activeView:JimuMapView)=>{
        const newLayersArray = Object.keys(activeView?.jimuLayerViews).reduce((newLayerArray,item)=>{
            let object = {
                layerName:activeView?.jimuLayerViews[item]?.layer?.title??item,
                layerId:activeView?.jimuLayerViews[item]?.jimuLayerId??" ",
                keyName:item
            };
            newLayerArray.push(object);
            return newLayerArray;
        },[])

        this.props.dispatch(appActions.widgetStatePropChange("value","layers",newLayersArray));
  
        this.setState({activeView:activeView});
        let view = activeView?.view;
        const sketchViewlModel = new SketchViewModel({layer:sketchLayer,view:view})
        this.sketch = sketchViewlModel;
    }

    componentDidUpdate(prevProps: Readonly<AllWidgetProps<any>>, prevState: Readonly<any>, snapshot?: any): void {
        if (this.props?.stateValue["value"]?.sketch && this.props.stateValue["value"]?.geometryType){
            if (this.sketch){
                this.sketch.create(this.props.stateValue["value"]?.geometryType);
                if (this.state.activeView){
                    this.state.activeView.view.map.add(sketchLayer);
                    this.sketch.on("create", (event) => {
                    });
                }
            }
        }
    }

    render(): React.ReactNode {
        return(
            <div className="widget-starter jimu-widget">
                {
                    this.props?.useMapWidgetIds?.length > 0 &&
                    <JimuMapViewComponent 
                        useMapWidgetId={this.props.useMapWidgetIds[0]}
                        onActiveViewChange = {this.getMapLayers}
                    />
                }
            </div>
        )
    }
}