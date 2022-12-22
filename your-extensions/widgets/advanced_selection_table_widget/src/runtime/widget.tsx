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
import defaultMessages from "../../../advanced_selection_table_widget/src/runtime/translations/default";

type StateValueType = {stateValue:any}

let  sketchLayer = new GraphicsLayer();

export default class AdvancedSelectionTable extends React.PureComponent<AllWidgetProps<any>&StateValueType,any>{

    static mapExtraStateProps(state:IMState){return {stateValue:state.widgetsState}};
    static activeView = null;
    static deleteStatus = false;
    static jimuLayerViews = null;
    static initialZoomValue = 0;
    static selectedGraphic = null

    state = {
        popup:false,
        layers:[],
        layerContents:[],
        checkedLayers:[],
        numberOfAttribute:{},
        openStatistics:false,
        selectedAttributes:[],
        isItemSelected:false,
        layerId:" ",
        layerTitle:" ",
        component_type:"LAYERS_CONTENTS",
        anchorEl:null,
        opencreateLayer:false,
        layerName:" ",
        csvFile:" ",
        createdLayerTitle:" ",
    }

    sketch = null;

    nls = (id: string) => {
        return this.props.intl ? this.props.intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] }) : id
    }

    getAllLayers = ()=>{
        const activeView = AdvancedSelectionTable.activeView;
        const allMapLayers = activeView.view.map.allLayers;
        return allMapLayers;
    }

    getActiveView = ()=>{
        const activeView = AdvancedSelectionTable.activeView;
        return activeView;
    }

    getAllJimuLayerViews = ()=>{
        const jimuLayerViews = AdvancedSelectionTable.jimuLayerViews;
        return jimuLayerViews
    }

    getMapLayers = (activeView:JimuMapView)=>{
        const newLayersArray = Object.keys(activeView?.jimuLayerViews)?.reduce((newLayerArray,item)=>{
            if (activeView?.jimuLayerViews[item]?.view){
                let object = {
                    layerName:activeView?.jimuLayerViews[item]?.layer?.title??item,
                    layerId:activeView?.jimuLayerViews[item]?.jimuLayerId??" ",
                    keyName:item,
                    id:activeView?.jimuLayerViews[item]?.layer?.id,
                };
                newLayerArray.push(object);
            }
            return newLayerArray;
        },[])
        newLayersArray.reverse();
        this.setState({layers:newLayersArray});
        // this.props.dispatch(appActions.widgetStatePropChange("value","layers",newLayersArray))
        AdvancedSelectionTable.activeView = activeView;
        let view = activeView?.view;
        const sketchViewlModel = new SketchViewModel({layer:sketchLayer,view:view})
        this.sketch = sketchViewlModel;
        let zoomOut = {
            title:"Zoom Out",
            id:"zoom-out",
            class:"esri-icon-zoom-out-magnifying-glass"
        }
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
            view.hitTest(event).then((response)=>{})
        })
        AdvancedSelectionTable.jimuLayerViews = activeView?.jimuLayerViews;
        AdvancedSelectionTable.initialZoomValue = activeView.view.zoom;
     
    }

    selectFeatureLayer = (geometry:any)=>{
        const checkedLayers = this.state.checkedLayers;
        const activeView = AdvancedSelectionTable.activeView;
        if (activeView){
            activeView?.selectFeaturesByGraphic(geometry,"contains").then((results)=>{
                helper.highlightOnlyCheckedLayer(checkedLayers);
                const selectedLayersContents = helper.getSelectedContentsLayer(results,checkedLayers);
                const numberOfAttributes = helper.getNumberOfAttributes(selectedLayersContents);
                this.setState({layerContents:selectedLayersContents,numberOfAttribute:numberOfAttributes});
                // this.props.dispatch(appActions.widgetStatePropChange("value","layerContents",selectedLayersContents));
            })
            .catch((err)=>{})
        }
    }

    startSketching = (currentGeometry="rectangle")=>{
        let mode = "hybrid";
        const activeView = AdvancedSelectionTable.activeView;
        let limitedGeometryArray = ["rectangle","circle"];
        if (limitedGeometryArray.includes(currentGeometry)){
            mode = "freehand";
        }
        if (this.sketch){
            this.sketch.create(currentGeometry,{mode:mode});
            if (activeView){
                activeView.view.map.add(sketchLayer);
                this.sketch.on("create", async(event) => {
                    if (event?.state === "complete"){
                        this.selectFeatureLayer(event?.graphic);
                        AdvancedSelectionTable.selectedGraphic = event?.graphic;
                        this.sketch?.update([event?.graphic],{
                            enableScaling:false,
                            preserveAspectRatio: true,
                            toggleToolOnClick:false,
                        })
                        const layerOpen = {
                            geometry: event?.graphic?.geometry,
                            typeSelected:"contains"
                        }
                 
                        this.props.dispatch(appActions.widgetStatePropChange("value","layerOpen",layerOpen));
                        this.props.dispatch(appActions.widgetStatePropChange("value","getAllLayers",this.getAllLayers));
                        this.props.dispatch(appActions.widgetStatePropChange("value","getActiveView",this.getActiveView));
                        this.props.dispatch(appActions.widgetStatePropChange("value","getAllJimuLayerViews",this.getAllJimuLayerViews))
                    }
                });
                this.sketch.on("update",(event)=>{
                    this.sketch?.delete();
                })
            }
        }
    }

    zoomOut(zoomValue?:number) {
        const activeView = AdvancedSelectionTable.activeView;
        const view = activeView?.view;
        const currentZoomValue = zoomValue??view?.zoom - 2;
        view?.goTo({center: view?.center,zoom: currentZoomValue});
      }

    openPopup = (popupcontents:{title:string,contents:any,location?:number[]})=>{
        const activeView = AdvancedSelectionTable.activeView;
        const location = popupcontents.location;
        let currentLocation = activeView?.view?.center;
        if (location){
            currentLocation = {latitude:location[0],longitude:location[1]}
        }
        if (activeView?.view?.popup){
            const popup = activeView.view.popup;
            popup.visible = true;
            popup.title = popupcontents.title;
            popup.content = popupcontents.contents;
            popup.location = currentLocation;
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
        const activeView = AdvancedSelectionTable.activeView;
        const view = activeView?.view;
        const geometry = AdvancedSelectionTable.selectedGraphic?.geometry;
        const extent = geometry?.extent;
        if (view && extent){
            view.goTo(extent);
        }
    }

    addCreatedLayer = ()=>{
        const csvFile = this.state.csvFile;
        const activeView = AdvancedSelectionTable.activeView;
        const view = activeView?.view;
        if (csvFile && view){
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
        this.setState({layers:currentLayers,csvFile:null,createdLayerTitle:null})
    }

    restoreMap = ()=>{
        const activeView = AdvancedSelectionTable.activeView;
        if (activeView){
            activeView.clearSelectedFeatures();
            const zoomVal = AdvancedSelectionTable.initialZoomValue
            this.zoomOut(zoomVal);
            this.setState({checkedLayers:[],numberOfAttribute:{},layerContents:[],selectedAttributes:[]});
            if (activeView?.view?.popup){
                activeView.view.popup.visible = false;
            }
        }
        if (this.sketch){
            this.sketch?.cancel();
        }
        helper.deactivateAllLayer()
     
    }

    onClickRefresh = ()=>{
        this.restoreMap();
    }

    componentDidMount(): void {
        const closeButtonElement = document.querySelector(".action-close");
        if (closeButtonElement.addEventListener){
            closeButtonElement.addEventListener("click",()=>{
                this.restoreMap()
            })
        }
      
    }
   
    render(): React.ReactNode {
        const open = Boolean(this.state.anchorEl);
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
                    {open && <Options />}
                    <CreateLayer />
                </AdvancedSelectionTableContext.Provider>
            </>
        )
    }
}