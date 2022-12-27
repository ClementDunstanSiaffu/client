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
            selectedColor:" "
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
                            tabs.push(
                                <Tab closeable id={"tab-"+fs.uid} title={f.title + " - "+ fs.title}>
                                    <div id={"container-"+fs.uid} className="tabClassControl"></div>
                                </Tab>
                            );
    
                            this.createTable(fs,layerOpen,"tab-"+fs.uid).then((featureTable)=>{
                                if(!featureTable){
                                }else{
                                }
                            });
                        }
                    }else{
                        tabs.push(
                            <Tab closeable id={"tab-"+f.uid} title={f.title + " - "+ f.title}>
                                <div id={"container-"+f.uid} className="tabClassControl"></div>
                            </Tab>
                        );
                        this.createTable(f,layerOpen,"tab-"+f.uid).then((featureTable)=>{
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
    
    activeViewChangeHandler = (jmv: JimuMapView) => {
        if (jmv) this.setState({jimuMapView: jmv});
    };

    createFeatureTable(layer,highlightIds:any){
        const activeView = this.props.stateValue?.value?.getActiveView();
        const initialMapZoom = this.props.stateValue?.value?.initialMapZoom;
        console.log(initialMapZoom,"initialMap value")
        const div = document.createElement("div");
        let checkExist = setInterval(()=>{
            const container = document.getElementById("container-"+layer.uid);
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
            id: "T"+layer.id,
            label:layer.title,
            view:view,
            multiSortEnabled: true,
            layer: layer,
            container: div,
            highlightEnabled:true,
            highlightIds:highlightIds
        });

        featureTable.visibleElements = {
            header: true,
            menu: true,
            menuItems: {
                clearSelection: true,
                refreshData: true,
                toggleColumns: true,
                selectedRecordsShowAllToggle: true,
                zoomToSelection: true
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
                            }else{
                                console.error("not found");
                            }
                        });
                    }
                    }catch (e){
                        console.error(e);
                    }
            }
            if (event.removed.length > 0 && initialMapZoom){
                const view = activeView.view;
                view.goTo({center: view.center,zoom:initialMapZoom });
            }

        });
        
        
        this.arrayTable.push(featureTable);
        return featureTable;
    }

    async createTable(layer,pass:{geometry:any,typeSelected:spatialRelationshipType,where?:string},identificationTable) {
        const activeView = this.props.stateValue.value.getActiveView();
        layer.visible = true;
        let featureTable = null;
        let query = new Query();
        const highlightIds = [];
        if(pass.geometry){
            // use this it will return features empty array
            // query.geometry = new Polygon(pass.geometry);
            // query.spatialRelationship = pass.typeSelected;
        }
        const layerView = await activeView.view.whenLayerView(layer);
        if (layerView?._highlightIds){
            for (const key of layerView._highlightIds.keys()){
                highlightIds.push(key);
            }  
        }
        // activeView.view.whenLayerView(layer).then(async(layerView)=>{
        //     //to get all features use this
        //     //const results = await layerView.queryFeatures(query);
        //     if (layerView?._highlightIds){
        //         let newArray = [];
        //         for (const key of layerView._highlightIds.keys()){
        //             // highlightIds.push(key);
        //             newArray.push(key);
        //         }
        //         console.log(newArray,"check new Arr")
        //         highlightIds = newArray;
        //     }
        // })
        if(layer){
            featureTable = this.createFeatureTable(layer,highlightIds);
            if(query.geometry) featureTable.filterGeometry = query.geometry;
                featureTable.filterBySelection();
                return featureTable;
        }
        return featureTable;
    }

    tabsClose(e,noControlTable = false){
        this.optionColorCleanSelected();
        const tabs = this.state.tabs;
        const arrayTable = this.arrayTable;
        let foundIndex = null;
        for(let i=0;i<tabs.length;i++){
            if(tabs[i].props.id === e){
                foundIndex = i;
                break;
            }
        }
        const copiedTabs = [...this.state.tabs];
        copiedTabs.splice(foundIndex,1);
        const table = arrayTable[foundIndex];
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

        arrayTable.splice(foundIndex,1);

        this.setState({
            tabsLength:tabs.length,
            tabs:copiedTabs
        });
        
    }

    getActiveTable(){
        const tabs = this.state.tabs;
        const arrayTable = this.arrayTable;
        for(let i=0;i<tabs.length;i++){
            const el = document.querySelector("#"+tabs[i].props.children.props.id);
            //@ts-ignore
            if(el.checkVisibility()){
                return arrayTable[i];
            }
        }
        return null;
    }

    optionFilterExtentions(){
        this.props.stateProps.layerOpen.geometry = Polygon.fromExtent(this.state.jimuMapView.view.extent).toJSON();
        this.props.stateProps.layerOpen.typeSelected = "contains";
        this.createListTable();
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
            type: typeSymbol,
            style: "solid",
            color,
            outline: null
        };
    }

    optionColorFound(event){
        //event.preventDefault();
        //event.stopPropagation();
        console.log(event,"check the event")

        const activeTable = this.getActiveTable();
        const uniqueValuesInfosSave = this.uniqueValuesInfosSave;
        const saveOldRenderer = this.saveOldRenderer;


        if(activeTable){
            let arrayItemSelected = activeTable.highlightIds

            if(arrayItemSelected){
                if(!uniqueValuesInfosSave[activeTable.layer.uid]) uniqueValuesInfosSave[activeTable.layer.uid] = [];

                //salvo vecchio renderer
                if(!saveOldRenderer[activeTable.layer.uid]){
                    saveOldRenderer[activeTable.layer.uid] = activeTable.layer.renderer;
                }

                for(let i=0;i<arrayItemSelected.length;i++){
                    let objectid = arrayItemSelected[i];
                    const uniqueColor = {
                        label: objectid,
                        value: objectid,
                        symbol: this.createSymbol(activeTable.layer.geometryType,event)
                    };
                    let indexFound = null;
                    for(let j=0;j< uniqueValuesInfosSave[activeTable.layer.uid].length;j++){
                        let uniqueFound = uniqueValuesInfosSave[activeTable.layer.uid][j].value;
                        if(uniqueFound === objectid){
                            indexFound = j;
                            break;
                        }
                    }
                    if(indexFound){
                        uniqueValuesInfosSave[activeTable.layer.uid][indexFound] = uniqueColor;
                    }else{
                        uniqueValuesInfosSave[activeTable.layer.uid].push(uniqueColor);
                    }

                }

                activeTable.layer.renderer = {
                    type: "unique-value",
                    field: activeTable.layer.objectIdField,
                    uniqueValueInfos: this.uniqueValuesInfosSave[activeTable.layer.uid]
                };
            }
        }
        this.setState({selectedColor:event});
    }

    optionColorCleanSelected(cleanHighLightIds = true){
        const activeTable = this.getActiveTable();
        const saveOldRenderer = this.saveOldRenderer;
        if(activeTable){
            if(saveOldRenderer[activeTable.layer.uid]){
                delete this.uniqueValuesInfosSave[activeTable.layer.uid];
                activeTable.layer.renderer = saveOldRenderer[activeTable.layer.uid];
                delete saveOldRenderer[activeTable.layer.uid];
                if(cleanHighLightIds) activeTable.highlightIds.removeAll();
            }
        }
    }

    render () {
        // const tabs = this.tabs;
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
