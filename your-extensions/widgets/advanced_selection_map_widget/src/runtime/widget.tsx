
import {React,jsx,AllWidgetProps,appActions,IMState} from 'jimu-core'
import { JimuMapViewComponent,JimuMapView } from 'jimu-arcgis';
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import MapView from "@arcgis/core/views/MapView";


type stateValueType = {
    stateValue:any
}

const  sketchLayer = new GraphicsLayer({ id: 'export-map', listMode: 'hide', visible: true })

export default class MapViewWidget extends React.PureComponent<AllWidgetProps<any>&stateValueType,any>{

    static mapExtraStateProps(state:IMState){
        return {stateValue:state.widgetsState};
    }

    state = {layers:[],activView:null};
    sketch = null;

    getMapLayers = (activeView:JimuMapView)=>{
        let lastView = null;
        const newLayersArray = Object.keys(activeView?.jimuLayerViews).reduce((newLayerArray,item)=>{
                                    let object = {
                                        layerName:activeView?.jimuLayerViews[item]?.layer?.title??item,
                                        layerId:activeView?.jimuLayerViews[item]?.jimuLayerId??" ",
                                        keyName:item
                                    };
                                    newLayerArray.push(object);
                                    lastView = activeView?.jimuLayerViews[item]?.view;
                                    return newLayerArray;
                                },[])
        this.props.dispatch(appActions.widgetStatePropChange("value","layers",newLayersArray));
  

        this.setState({activeView:activeView});
        let view = activeView?.view;
        const sketchViewlModel = new SketchViewModel({
            layer:sketchLayer,
            view:view
        })
        this.sketch = sketchViewlModel;
        // sketchViewlModel.on("create", (event) => {
        //     console.log("is it called")
        //     if (event.state === "complete") {
              
        //     }
        // });

        // const startSketching = (geometryType:any)=>{
        //     console.log(sketchViewlModel,geometryType,"check geometry type")
        //     sketchViewlModel.create(geometryType)
        // }
        // this.props.dispatch(appActions.widgetStatePropChange("value","sketch",startSketching))
    }

    componentDidUpdate(prevProps: Readonly<AllWidgetProps<any>>, prevState: Readonly<any>, snapshot?: any): void {
        console.log("is called")
        if (this.props?.stateValue["value"]?.sketch && this.props.stateValue["value"]?.geometryType){
            if (this.sketch){
                this.sketch.create('point');
                if (this.state.activView){
                    this.state.activView.view.add(sketchLayer)
                    this.sketch.on("create", (event) => {
                        console.log(event,"check event")
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