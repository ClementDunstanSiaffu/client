
import {React,jsx,AllWidgetProps,appActions,IMState} from 'jimu-core'
import { JimuMapViewComponent,JimuMapView,JimuFeatureLayerView} from 'jimu-arcgis';
import SketchViewModel from "esri/widgets/Sketch/SketchViewModel";
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import geometryEngineAsync from 'esri/geometry/geometryEngineAsync'
import helper from '../helper/helper'

type stateValueType = {
    stateValue:any
}

type StateType = {
    layers:any,
    activeView:JimuMapView
}

let  sketchLayer = new GraphicsLayer()

let zoomOut = {
    title:"Zoom Out",
    id:"zoom-out",
    class:"esri-icon-zoom-out-magnifying-glass"
}

export default class MapViewWidget extends React.PureComponent<AllWidgetProps<any>&stateValueType,StateType>{

    static mapExtraStateProps(state:IMState){
        return {stateValue:state.widgetsState};
    }

    state = {layers:[],activeView:null};
    sketch = null;
    mapLayer = null;
    layer = null;

    getMapLayers = (activeView:JimuMapView)=>{
        const newLayersArray = Object.keys(activeView?.jimuLayerViews).reduce((newLayerArray,item)=>{
            let object = {
                layerName:activeView?.jimuLayerViews[item]?.layer?.title??item,
                layerId:activeView?.jimuLayerViews[item]?.jimuLayerId??" ",
                keyName:item,
                id:activeView?.jimuLayerViews[item]?.layer?.id
            };
            newLayerArray.push(object);
            return newLayerArray;
        },[])
        newLayersArray.reverse()
        this.props.dispatch(appActions.widgetStatePropChange("value","layers",newLayersArray));
        this.setState({activeView:activeView});
        let view = activeView?.view;
        const sketchViewlModel = new SketchViewModel({layer:sketchLayer,view:view})
        this.sketch = sketchViewlModel;
        view.popup.actions.push(zoomOut);
    }

    selectFeatureLayer = (geometry:any)=>{
        if (this.state.activeView){
            this.state.activeView?.selectFeaturesByGraphic(geometry,"intersects").then((results)=>{
                const selectedLayersContents = helper.getSelectedContentsLayer(results);
                this.props.dispatch(appActions.widgetStatePropChange("value","layerContents",selectedLayersContents))
            })
            .catch((err)=>{})

        }
    }

    startSketching = ()=>{
        if (this.sketch){
            this.sketch.create(this.props.stateValue["value"]?.geometryType);
            if (this.state.activeView){
                this.state.activeView.view.map.add(sketchLayer);
                this.sketch.on("create", async(event) => {
                    if (event?.state === "complete"){
                        this.selectFeatureLayer(event?.graphic);
                        this.props.dispatch(appActions.widgetStatePropChange("value","sketch",false));
                    }
                });
                this.sketch.on("update",(event)=>{
                    this.sketch?.delete();
                })
            }
        }
    }

    zoomOut() {
        const view = this.state.activeView?.view;
        view.goTo({center: view?.center,zoom: view?.zoom - 2});
      }

    openPopup = ()=>{
        const popcontents =  this.props.stateValue.value.popupContents;
        if (this.state.activeView?.view?.popup){
            const popup = this.state.activeView.view.popup;
            popup.title = popcontents?.title;
            popup.content = popcontents?.contents;
            try{
                popup.open();
            }
            catch(err){

            }
            popup?.on("trigger-action",(event)=>{
                if(event.action.id === "zoom-out"){
                    this.zoomOut();
                }
            })
        }
    }

    componentDidUpdate(prevProps: Readonly<AllWidgetProps<any>>, prevState: Readonly<any>, snapshot?: any): void {
        if (this.props?.stateValue?.value?.sketch && this.props.stateValue?.value?.geometryType){
            this.startSketching()
        }
        if (this.props?.stateValue?.value?.popup && this.props.stateValue?.value?.popupContents){
            this.openPopup()
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