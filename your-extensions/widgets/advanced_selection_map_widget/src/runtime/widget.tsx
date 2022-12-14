
import {React,jsx,AllWidgetProps,appActions,IMState} from 'jimu-core'
import { JimuMapViewComponent,JimuMapView} from 'jimu-arcgis';
import SketchViewModel from "esri/widgets/Sketch/SketchViewModel";
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import helper from '../helper/helper'
import CSVLayer from 'esri/layers/CSVLayer';


type stateValueType = {
    stateValue:any
}

type StateType = {
    layers:any,
    activeView:JimuMapView,
    geometry:any,
    selectedGraphic:any
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
    state = {layers:[],activeView:null,geometry:null,selectedGraphic:null};
    sketch = null;
    mapLayer = null;
    layer = null;

    getMapLayers = (activeView:JimuMapView)=>{
        const newLayersArray = Object.keys(activeView?.jimuLayerViews)?.reduce((newLayerArray,item)=>{
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
        view?.popup.actions.push(zoomOut);
        view?.popup.watch("visible",(visible)=>{
            if(visible && !this.props?.stateValue?.value?.popup){
                view.popup.visible = false;
            }else{
                this.props.dispatch(appActions.widgetStatePropChange("value","popup",false));
            }
        })

        view.on("click",(event)=>{
            const selectedLayersContents = this.props.stateValue?.value?.layerContents;
            event.stopPropagation();
            view.hitTest(event).then((response)=>{
                let status = helper.getClickedLayerStatus(response?.results,selectedLayersContents);
                if (status){
                    this.exportCsvAndJson()
                }
            })
        })
    }

    selectFeatureLayer = (geometry:any)=>{
        const checkedLayers = this.props.stateValue?.value?.checkedLayers??[];
        if (this.state.activeView){
            this.state.activeView?.selectFeaturesByGraphic(geometry,"contains").then((results)=>{
                const selectedLayersContents = helper.getSelectedContentsLayer(results,checkedLayers);
                this.props.dispatch(appActions.widgetStatePropChange("value","layerContents",selectedLayersContents));
                const numberOfAttributes = helper.getNumberOfAttributes(selectedLayersContents);
                this.props.dispatch(appActions.widgetStatePropChange("value","numberOfAttribute",numberOfAttributes));
            })
            .catch((err)=>{})

        }
    }

    startSketching = ()=>{
        let mode = "hybrid";
        let limitedGeometryArray = ["rectangle","circle"];
        let currentGeometry = this.props.stateValue["value"]?.geometryType??"rectangle";
        if (limitedGeometryArray.includes(currentGeometry)){
            mode = "freehand";
        }
        if (this.sketch){
            this.sketch.create(currentGeometry,{mode:mode});
            if (this.state.activeView){
                this.state.activeView.view.map.add(sketchLayer);
                this.sketch.on("create", async(event) => {
                    if (event?.state === "complete"){
                        this.selectFeatureLayer(event?.graphic);
                        this.setState({selectedGraphic:event?.graphic});
                        this.props.dispatch(appActions.widgetStatePropChange("value","sketch",false));
                        this.setState({geometry:event?.graphic?.geometry});
                        this.sketch?.update([event?.graphic],{
                            enableScaling:false,
                            preserveAspectRatio: true,
                            toggleToolOnClick:false,

                        })
                    }
                });
                this.sketch.on("update",(event)=>{
                    this.sketch?.delete();
                })
            }
        }
    }

    exportCsvAndJson = ()=>{
        const exportStatus = this.props.stateValue?.value?.exportStatus;
        const uri = this.props.stateValue?.value?.uri;
        const exportType = this.props.stateValue?.value?.exportType;
        const blobValue = this.props.stateValue?.value?.blobValue;
        if (exportStatus && uri){
            if(exportType === "csv"){
                window.open(uri,"blank");
            }else{
                if (window.saveAs && blobValue){
                    window.saveAs(blobValue,"feature.json")
                }else{
                    window.open(uri,"blank");
                }
            }
        }
        this.props.dispatch(appActions.widgetStatePropChange("value","exportStatus",false));
        this.props.dispatch(appActions.widgetStatePropChange("value","uri",""));
        this.props.dispatch(appActions.widgetStatePropChange("value","exportType",""));
        this.props.dispatch(appActions.widgetStatePropChange("value","blobValue",null));
    }

    zoomOut() {
        const view = this.state.activeView?.view;
        view?.goTo({center: view?.center,zoom: view?.zoom - 2});
      }

    openPopup = ()=>{
        const popcontents =  this.props.stateValue.value.popupContents;
        if (this.state.activeView?.view?.popup){
            const popup = this.state.activeView.view.popup;
            popup.visible = true;
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

    onClickZoomIn = ()=>{
        const view = this.state.activeView?.view;
        const extent = this.state.geometry?.extent;
        if (view && extent){
            view.goTo(extent);
        }
    }

    addCreatedLayer = ()=>{
        if (this.state.activeView?.view){
            const csvFile = this.props.stateValue.value.csvFile;
            const layerTitle = this.props.stateValue.value?.createdLayerTitle
            const blob = new Blob([csvFile],{type:"plain/text"});
            let url = URL.createObjectURL(blob);
            const layer = new CSVLayer({url: url,title:layerTitle,id:layerTitle})
            try{
                this.state.activeView?.view?.map.add(layer);
            }catch(err){
                
            }
            const items = this.state.activeView?.view?.map?.layers?.items;
            let status = helper.checkIfLayerWasAdded(layerTitle,items);
            if (status){
                this.appendAddedLayer(layerTitle);
            }
        }
    }

    appendAddedLayer = (layerTitle:string)=>{
        let object = {
            layerName:layerTitle,
            layerId:layerTitle,
            keyName:layerTitle,
            id:layerTitle
        };
        const layers = this.props.stateValue?.value?.layers??[]
        const currentLayers = [...layers,object];
        this.props.dispatch(appActions.widgetStatePropChange("value","layers",currentLayers));
        this.props.dispatch(appActions.widgetStatePropChange("value","exportType",null));
        this.props.dispatch(appActions.widgetStatePropChange("value","csvFile",null));
        this.props.dispatch(appActions.widgetStatePropChange("value","createdLayerTitle",null));
    }

    componentDidUpdate(prevProps: Readonly<AllWidgetProps<any>>, prevState: Readonly<any>, snapshot?: any): void {
        if (this.props?.stateValue?.value?.sketch && this.props.stateValue?.value?.geometryType){
            this.startSketching();
        }
        if (this.props?.stateValue?.value?.popup && this.props.stateValue?.value?.popupContents){
            this.openPopup();
        }
        if (this.props.stateValue?.value?.zoomIn){
            this.onClickZoomIn();
        }
        if (
                this.props.stateValue?.value?.csvFile && 
                this.props.stateValue?.value?.exportType === "csv" && 
                this.props.stateValue?.value?.createdLayerTitle 
            ){
                this.addCreatedLayer()
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