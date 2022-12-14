import {React,jsx,AllWidgetProps,IMState, appActions} from 'jimu-core';
import CreateLayer from '../component/create_layer';
import LayersTable from '../component/layer_table';
import Options from '../component/options';
import StatisticsModal from '../component/statistics';
import { AdvancedSelectionTableContext } from '../context/context';
import { JimuMapViewComponent,JimuMapView} from 'jimu-arcgis';
import SketchViewModel from "esri/widgets/Sketch/SketchViewModel";
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import helper from '../helper/helper'
import CSVLayer from 'esri/layers/CSVLayer';

type StateValueType = {stateValue:any}

let  sketchLayer = new GraphicsLayer();

let zoomOut = {
    title:"Zoom Out",
    id:"zoom-out",
    class:"esri-icon-zoom-out-magnifying-glass"
}

export default class AdvancedSelectionTable extends React.PureComponent<AllWidgetProps<any>&StateValueType,any>{

    static mapExtraStateProps(state:IMState){return {stateValue:state.widgetsState}}

    state = {
        activeView:null,
        popup:false,
        layers:[],
        layerContents:[],
        checkedLayers:[],
        numberOfAttribute:{},
        geometryType:"rectangle",
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
        exportStatus:false,
        uri:null,
        exportType:" ",
        blobValue:null,
        geometry:null,
        csvFile:" ",
        createdLayerTitle:" "
    }

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
        this.setState({activeView:activeView,layers:newLayersArray});
        let view = activeView?.view;
        const sketchViewlModel = new SketchViewModel({layer:sketchLayer,view:view})
        this.sketch = sketchViewlModel;
        view?.popup.actions.push(zoomOut);
        view?.popup.watch("visible",(visible)=>{
            if(visible && !this.state.popup){
                view.popup.visible = false;
            }else{
                this.setState({popup:false});
            }
        })

        view.on("click",(event)=>{
            const selectedLayersContents = this.state.layerContents;
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
        const checkedLayers = this.state.checkedLayers;
        if (this.state.activeView){
            this.state.activeView?.selectFeaturesByGraphic(geometry,"contains").then((results)=>{
                const selectedLayersContents = helper.getSelectedContentsLayer(results,checkedLayers);
                const numberOfAttributes = helper.getNumberOfAttributes(selectedLayersContents);
                this.setState({layerContents:selectedLayersContents,numberOfAttribute:numberOfAttributes})
            })
            .catch((err)=>{})

        }
    }

    startSketching = ()=>{
        let mode = "hybrid";
        let limitedGeometryArray = ["rectangle","circle"];
        let currentGeometry = this.state.geometryType;
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
                        this.setState({selectedGraphic:event?.graphic,geometry:event?.graphic?.geometry});
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
        const exportStatus = this.state.exportStatus;
        const uri = this.state.uri;
        const exportType = this.state.exportType;
        const blobValue = this.state.blobValue;
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
        this.setState({exportStatus:false,uri:null,exportType:" ",blobValue:null})
    }

    zoomOut() {
        const view = this.state.activeView?.view;
        view?.goTo({center: view?.center,zoom: view?.zoom - 2});
      }

    openPopup = (popupcontents:{title:string,contents:any})=>{
        if (this.state.activeView?.view?.popup){
            const popup = this.state.activeView.view.popup;
            popup.visible = true;
            popup.title = popupcontents.title;
            popup.content = popupcontents.contents;
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
        const csvFile = this.state.csvFile;
        const exportType = this.state.exportType;
        const view = this.state.activeView?.view;
        if (csvFile && view && exportType === "csv"){
            const layerTitle = this.state.createdLayerTitle
            const blob = new Blob([csvFile],{type:"plain/text"});
            let url = URL.createObjectURL(blob);
            const layer = new CSVLayer({url: url,title:layerTitle,id:layerTitle})
            try{
                view?.map.add(layer);
            }catch(err){
                
            }
            const items = view?.map?.layers?.items;
            let status = helper.checkIfLayerWasAdded(layerTitle,items);
            if (status){
                this.appendAddedLayer(layerTitle);
            }
        }
        this.setState({opencreateLayer:false});
    }

    appendAddedLayer = (layerTitle:string)=>{
        let object = {
            layerName:layerTitle,
            layerId:layerTitle,
            keyName:layerTitle,
            id:layerTitle
        };
        const layers = this.state.layers
        const currentLayers = [...layers,object];
        this.setState({layers:currentLayers,exportType:null,csvFile:null,createdLayerTitle:null})
    }

    render(): React.ReactNode {
        return(
            <>
                {
                    this.props?.useMapWidgetIds?.length > 0 &&
                    <JimuMapViewComponent 
                        useMapWidgetId={this.props.useMapWidgetIds[0]}
                        onActiveViewChange = {this.getMapLayers}
                    />
                }
                <AdvancedSelectionTableContext.Provider value = {{...this.state,"parent":this}}>
                    <LayersTable />
                    {this.state.openStatistics && <StatisticsModal />}
                    <Options />
                    <CreateLayer />
                </AdvancedSelectionTableContext.Provider>
            </>
        )
    }
}