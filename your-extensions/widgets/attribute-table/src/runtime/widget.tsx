/** @jsx jsx */
import { React, AllWidgetProps, jsx ,IMState, appActions} from 'jimu-core'
import {JimuMapView} from "jimu-arcgis";
import FeatureTable from "esri/widgets/FeatureTable";
import '../style.css';
import {Tabs, Tab} from "jimu-ui";
import Query from "esri/rest/support/Query";
import Polygon from "esri/geometry/Polygon";
import helper from '../helper/helper';
import ButtonGroupComponent from '../components/button_groups';
import reactiveUtils from 'esri/core/reactiveUtils';

type spatialRelationshipType = "intersects" | "contains" | "crosses" | "disjoint" | "envelope-intersects" | "index-intersects" | "overlaps" | "touches" | "within" | "relation"

type stateValueType = {
    stateValue:{
        value:{
            getAllLayers:()=>any,
            layerOpen:{
                geometry:any,
                typeSelected:spatialRelationshipType,
                where?:string,
            },
            getActiveView:()=>any,
            getAllJimuLayerViews:()=>any,
            checkedLayers:string[],
            numberOfAttribute:{[id:string]:number},
            createTable:boolean,
            initialMapZoom:any
        }
    }
}

export default class Widget extends React.PureComponent<AllWidgetProps<any>&stateValueType, any> {

    static mapExtraStateProps(state:IMState){return {stateValue:state.widgetsState}};
    static initialMapZoom = 0;
    static currentViewExtent = null;
    arrayTable = [];
    uniqueValuesInfosSave = [];
    saveOldRenderer = [];
    filterTimeReceiveData = new Date().getTime();
    defaultValue = "";
    saveFeatures = [];
   
    constructor (props) {
        super(props)
        this.state = {
            geometryFilter: null,
            listServices:[],
            tabs:[],
            selectedColor:" ",
            viewExtent:null,
            features:null
        }

        this.tabsClose = this.tabsClose.bind(this);
        this.optionFilterExtentions = this.optionFilterExtentions.bind(this);
        this.optionCloseAllTabs = this.optionCloseAllTabs.bind(this);
        this.optionOpenFilter = this.optionOpenFilter.bind(this);
        this.createListTable = this.createListTable.bind(this);
        this.optionColorFound = this.optionColorFound.bind(this);
        this.createFeatureTable = this.createFeatureTable.bind(this);
        this.createTable = this.createTable.bind(this);
        this.getActiveTable = this.getActiveTable.bind(this);
        this.optionColorCleanSelected = this.optionColorCleanSelected.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<AllWidgetProps<any>>, prevState: Readonly<any>, snapshot?: any) {
        if(
                this.props.hasOwnProperty("stateValue") &&
                this.props.stateValue?.value?.layerOpen &&
                this.props.stateValue?.value?.getAllLayers &&
                this.props.stateValue?.value?.getActiveView &&
                this.props.stateValue?.value?.getAllJimuLayerViews&&
                this.props.stateValue?.value?.checkedLayers &&
                this.props.stateValue?.value?.numberOfAttribute&&
                this.props.stateValue?.value?.createTable
        ){
            const activeView = this.props.stateValue?.value?.getActiveView();
            const allLayers = this.props.stateValue?.value?.getAllLayers();
            const jimuLayerView = this.props.stateValue?.value?.getAllJimuLayerViews();
            const checkedLayers = this.props.stateValue?.value?.checkedLayers??[];
            const numberOfAttribute = this.props.stateValue?.value?.numberOfAttribute??{};
            if (
                activeView && 
                allLayers?.length > 0 && 
                Object.keys(jimuLayerView).length > 0 && 
                checkedLayers.length > 0 
            ){
                this.createListTable();
            }
            if (checkedLayers.length <= 0){
                this.setState({tabs:[]});
            }
            helper.openSideBar(checkedLayers,numberOfAttribute);
            this.props.dispatch(appActions.widgetStatePropChange("value","createTable",false));
        }
    }

  
    createListTable(){
        const allLayers = this.props.stateValue?.value?.getAllLayers()??[];
        const checkedLayers = this.props.stateValue?.value?.checkedLayers??[];
        const numberOfAttribute = this.props.stateValue?.value?.numberOfAttribute??{};
        const layerOpen = this.props.stateValue?.value?.layerOpen
        this.defaultValue = "";
        const tabs = [];
        this.arrayTable = [];
        if (allLayers?.length > 0){
            for (let i=0;i < allLayers?.length;i++){
                const f = allLayers[i];
                if (f.type === "feature" && checkedLayers.includes(f.id) && numberOfAttribute[f.id] > 0){
                    if (f?.sublayers?.length > 0){
                        for(let j=0;i<f.sublayers.length;i++){
                            const fs = f.sublayers[j];
                            const newId = fs.id.split(" ").join("-");
                            tabs.push(
                                <Tab closeable id={"tab-"+newId} title={f.title + " - "+ fs.title}>
                                    <div id={"container-"+newId} className="tabClassControl"></div>
                                </Tab>
                            );
    
                            this.createTable(fs,layerOpen,fs.id).then((featureTable)=>{
                                if(!featureTable){
                                }else{
                                }
                            });
                        }
                    }else{
                        const newId = f.id.split(" ").join("-");
                        tabs.push(
                            <Tab closeable id={"tab-"+newId} title={f.title + " - "+ f.title}>
                                <div id={"container-"+newId} className="tabClassControl"></div>
                            </Tab>
                        );
                        this.createTable(f,layerOpen,newId).then((featureTable)=>{
                            if(!featureTable){
                            }else{
                            }
                        });
                    }
                  
                }
            }
        }
        this.setState({
            geometryFilter: layerOpen.geometry,
            listServices:checkedLayers,
            tabs:tabs
        });
   
    }
    
    createFeatureTable(layer,highlightIds:any){
        const activeView = this.props.stateValue?.value?.getActiveView();
        const initialMapZoom = this.props.stateValue?.value?.initialMapZoom;
        const div = document.createElement("div");
        let checkExist = setInterval(()=>{
            const id = layer.id.split(" ").join("-");
            const container = document.getElementById("container-"+id);
            if (container) {
                container.innerHTML = '';
                container.appendChild(div);
                clearInterval(checkExist);
            }
        }, 100);

        let view = null;
        if (activeView){
            view = activeView?.view;
        }

        const featureTable = new FeatureTable({
            id:layer.id,
            label:layer.title,
            view:view,
            multiSortEnabled: true,
            layer: layer,
            container: div,
            highlightEnabled:true,
            highlightIds:highlightIds,
        });

        featureTable.visibleElements = {
            header: true,
            menu: true,
            menuItems: {
                clearSelection: true,
                refreshData: true,
                toggleColumns: true,
                selectedRecordsShowAllToggle: true,
                zoomToSelection: true,
            },
            selectionColumn: true,
            columnMenus: true,
        }  
        featureTable.on("selection-change", (event) => {
            if(event.added.length){
                try{
                    const query = layer.createQuery();
                    if (event.added.length > 0){
                        query.where = layer.objectIdField + " = " + event.added[0]?.objectId;
                        query.returnGeometry = true;
                        layer.queryFeatures(query).then((results)=>{
                            const features = results.features;
                            if(features.length){
                                activeView.view.goTo(features[0].geometry);
                            }
                        });
                    }
                    }catch (e){
                    }
            }
            if (event.removed.length > 0 && initialMapZoom){
                const view = activeView.view;
                view.goTo({center: view.center,zoom:initialMapZoom });
            }

        });
        reactiveUtils.when(()=>view.stationary,()=>{
            if (view.extent){
                this.setState({viewExtent:view.extent});
            }
        },{initial:true})
        this.arrayTable.push(featureTable);
        return featureTable;
    }

    async createTable(layer,pass:{geometry:any,typeSelected:spatialRelationshipType,where?:string},identificationTable) {
        const activeView = this.props.stateValue.value.getActiveView();
        const checkedLayers = this.props.stateValue?.value?.checkedLayers??[];
        layer.visible = true;
        let featureTable = null;
        let query = new Query();
        const highlightIds = [];
        if(pass.geometry){
            query.geometry = new Polygon(pass.geometry);
            query.spatialRelationship = pass.typeSelected;
            query.outFields = ["*"];
            query.returnGeometry = true;
        }
        const layerView = await activeView.view.whenLayerView(layer);
        if (layerView?._highlightIds){
            for (const key of layerView._highlightIds.keys()){
                highlightIds.push(key);
            }  
        }
        const results = await layerView.queryFeatures(query);
        const features = results?.features??[];
        if(layer && features.length){
            this.setState({features:features})
            featureTable = this.createFeatureTable(layer,highlightIds);
            if (activeView.view.stationary && this.state.viewExtent){
                setTimeout(()=>{
                    featureTable.filterGeometry = this.state.viewExtent;
                },10)
            }
            featureTable.filterBySelection();
            return featureTable;
        }else{
            if (features.length <= 0 && !checkedLayers.length){
                helper.openSideBar([],{});
                this.props.dispatch(appActions.widgetStatePropChange("value","numberOfAttribute",{}));
                this.props.dispatch(appActions.widgetStatePropChange("value","checkedLayers",[]));
                const jimuLayerViews = this.props.stateValue.value.getAllJimuLayerViews();
                helper.unhighlightAllLayer(jimuLayerViews);
            } 
        }
       
        return featureTable;
    }

    tabsClose(e,noControlTable = false){
        this.optionColorCleanSelected();
        const tabs = this.state.tabs;
        const arrayTable = this.arrayTable;
        let foundIndex = -1;
        for(let i=0;i<tabs.length;i++){
            if(tabs[i].props.id === e){
                foundIndex = i;
                break;
            }
        }
        if (foundIndex !== -1){
            let tableIndex = -1;
            const copiedTabs = [...this.state.tabs];
            copiedTabs.splice(foundIndex,1);
            let table = null;
            if (arrayTable.length){
                tableIndex = arrayTable.findIndex((currentTable)=>{
                    const id = currentTable.id.split(" ").join("-");
                    if ("tab-"+id === e){
                        return currentTable;
                    }
                  
                });
                if (tableIndex !== -1){
                    table = arrayTable[tableIndex];
                }
            }
            const jimuLayerViews = this.props.stateValue?.value?.getAllJimuLayerViews();
            const numberOfAttribute = this.props.stateValue?.value?.numberOfAttribute??{};
            const checkedLayers = this.props.stateValue?.value?.checkedLayers??[];
            if (table && table.layer){
                const id = table.layer.id;
                helper.hideLayer(jimuLayerViews,id);
                const newNumberOfAttribute = helper.getNewNumberOfAttributes(numberOfAttribute,id);
                const newCheckedLayers = helper.getNewCheckedLayer(checkedLayers,id);
                this.props.dispatch(appActions.widgetStatePropChange("value","numberOfAttribute",newNumberOfAttribute));
                this.props.dispatch(appActions.widgetStatePropChange("value","checkedLayers",newCheckedLayers));
                if (newCheckedLayers.length <= 0){
                    helper.openSideBar(newCheckedLayers,newNumberOfAttribute);
                }
            }
            if (tableIndex !== -1){
                arrayTable.splice(tableIndex,1);
            }
    
            this.setState({
                tabsLength:tabs.length,
                tabs:copiedTabs
            });
        }
    }

    getActiveTable(){
        const tabs = this.state.tabs;
        const arrayTable = this.arrayTable;
        for(let i=0;i<tabs.length;i++){
            const el = document.querySelector("#"+tabs[i].props.children.props.id);
            //@ts-ignore
            if(el?.checkVisibility()){
                return arrayTable[i];
            }
        }
        return null;
    }

    optionFilterExtentions(){
        this.props.dispatch(appActions.widgetStatePropChange("value","createTable",true));
    }

    optionOpenFilter(e){

    }

    optionCloseAllTabs(){
        const tabs = this.state.tabs;
        this.arrayTable = [];
        this.setState({
            tabsLength: tabs.length,
            tabs:[]
        });
        this.props.dispatch(appActions.widgetStatePropChange("value","numberOfAttribute",{}));
        this.props.dispatch(appActions.widgetStatePropChange("value","checkedLayers",[]));
        const jimuLayerViews = this.props.stateValue.value.getAllJimuLayerViews();
        helper.unhighlightAllLayer(jimuLayerViews);
        helper.deactivateAllLayer(jimuLayerViews)
        //TODO MIGLIORARE
        //chiudi sidebar
        const sidebar = document.querySelector(".sidebar-controller");
        //@ts-ignore
        if(sidebar) sidebar.click();

    }

    createSymbol(type, color){
        const typeSymbol =
            type === 'point'? "simple-marker":
                type === 'polyline'? "simple-line":
                    "simple-fill";

        return {
            type: "simple-marker",
            color,
            outline:{
                width:0.5,
                color:color
            }
        };
    }

    optionColorFound(event){
        //event.preventDefault();
        //event.stopPropagation();
        const activeTable = this.getActiveTable();
        const uniqueValuesInfosSave = this.uniqueValuesInfosSave;
        const saveOldRenderer = this.saveOldRenderer;
        const jimuLayerViews = this.props.stateValue.value.getAllJimuLayerViews();

        if(activeTable && jimuLayerViews){
            let arrayItemSelected = activeTable.highlightIds
        
            if(arrayItemSelected){

                const keys = Object.keys(jimuLayerViews)
                if (keys.length){
                    keys.forEach((key)=>{
                        if (jimuLayerViews[key].layer.id === activeTable.layer.id){
                            if (jimuLayerViews[key].layer){
                                jimuLayerViews[key].layer.opacity = 1;
                            }
                            if (jimuLayerViews[key].view){
                                jimuLayerViews[key].view.fullOpacity = 1;
                            }
                        }
                    })
                }

                if(!uniqueValuesInfosSave[activeTable.layer.id]) uniqueValuesInfosSave[activeTable.layer.id] = [];

                //salvo vecchio renderer
                if(!saveOldRenderer[activeTable.layer.id]){
                    saveOldRenderer[activeTable.layer.id] = activeTable.layer.renderer;
                }

                const symbolType = activeTable.layer.renderer.type;
                console.log(symbolType,activeTable.layer.renderer,"check type")

                for(let i=0;i<arrayItemSelected.length;i++){
                    let objectid = arrayItemSelected[i];
                    const uniqueColor = {
                        label: objectid,
                        value: objectid,
                        symbol: this.createSymbol(activeTable.layer.geometryType,event)
                    };
                    let indexFound = null;
                    for(let j=0;j< uniqueValuesInfosSave[activeTable.layer.id].length;j++){
                        let uniqueFound = uniqueValuesInfosSave[activeTable.layer.id][j].value;
                        if(uniqueFound === objectid){
                            indexFound = j;
                            break;
                        }
                    }
                    if(indexFound){
                        uniqueValuesInfosSave[activeTable.layer.id][indexFound] = uniqueColor;
                    }else{
                        uniqueValuesInfosSave[activeTable.layer.id].push(uniqueColor);
                    }

                }
                helper.updateSymbol(activeTable,event)

                // activeTable.layer.renderer = {
                //     // type: "unique-value",
                //     type:symbolType,
                //     field: activeTable.layer.objectIdField,
                //     uniqueValueInfos: this.uniqueValuesInfosSave[activeTable.layer.id]
                // };
            }
        }
        this.setState({selectedColor:event});
    }

    optionColorCleanSelected(cleanHighLightIds = true){
        const activeTable = this.getActiveTable();
        const saveOldRenderer = this.saveOldRenderer;
        if(activeTable){
            if(saveOldRenderer[activeTable.layer.id]){
                delete this.uniqueValuesInfosSave[activeTable.layer.id];
                activeTable.layer.renderer = saveOldRenderer[activeTable.layer.id];
                delete saveOldRenderer[activeTable.layer.id];
                if(cleanHighLightIds && activeTable.highlightIds) activeTable.highlightIds.removeAll();
            }
        }
    }

    render () {
        return (
            <div className="widget-attribute-table jimu-widget">
                <ButtonGroupComponent parent = {this} selectedColor = {this.state.selectedColor}/>
                {this.state.tabs.length === 0 ?
                    <div className="text-center container-fluid">
                        <div className="row">
                            <div className="col-md-12 mt-2 font-weight-bold">
                                Nessuna tabella aperta o nessun risultato trovato
                            </div>
                        </div>
                    </div>
                    :
                    <Tabs scrollable defaultValue={this.defaultValue} type="tabs" onClose={this.tabsClose}>
                        {this.state.tabs}
                    </Tabs>
                }
            </div>
        )
    }
}
