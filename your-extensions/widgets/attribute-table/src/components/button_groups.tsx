
import {React,jsx} from 'jimu-core';
import {Tabs, Tab, Dropdown, DropdownButton, DropdownMenu, DropdownItem, Button, ButtonGroup} from "jimu-ui";
import {WidgetFilterOutlined} from "jimu-icons/outlined/brand/widget-filter";
import {CloseOutlined} from 'jimu-icons/outlined/editor/close'
import {ColorsOutlined} from 'jimu-icons/outlined/application/colors'
import {ExportOutlined} from 'jimu-icons/outlined/editor/export'
import { ClearSelectionOutlined } from 'jimu-icons/outlined/gis/clear-selection'
import { ClearOutlined } from 'jimu-icons/outlined/editor/clear'
import { BrushOutlined } from 'jimu-icons/outlined/editor/brush'
import { ColorPicker } from 'jimu-ui/basic/color-picker';
import esriRequest from "esri/request";
import { Download } from '../helper/download';
import Widget from '../runtime/widget'
import Color from 'esri/Color';

type PropsType = {
    parent:Widget,
    selectedColor:string
}

export default class ButtonGroupComponent extends React.PureComponent<PropsType,any>{

    constructor (props) {
        super(props)
        this.state = {
            geometryFilter: null,
            listServices:[]
        }
        this.optionClickDownload = this.optionClickDownload.bind(this);
        this.optionColorRandom = this.optionColorRandom.bind(this);
    }

    async getKmzFile(layer,found){
        const objIds = found.map(f=>f.OBJECTID);
        const formData = new FormData();
        formData.append("f", "kmz");
        formData.append("where", `OBJECTID IN (${objIds.join(',')})`);
        formData.append("outFields", "*");
        const response = await esriRequest(layer.url.replace("FeatureServer","MapServer") + "/" + layer.layerId + "/query", {
            responseType: "blob",
            body:formData
        });
        const url = window.URL.createObjectURL(response.data);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = 'result.kmz';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }

    getStoreSingleAttributes(table,attribute){
        let arrayNew = [];
        if(table && table.grid && table.grid.store && table.grid.store.itemCache && table.grid.store.itemCache.items?.length){
            for(let i=0;i<table.grid.store.itemCache.items.length;i++){
                let attr = table.grid.store.itemCache.items[i].feature.attributes;
                let newAttr = {};
                newAttr[attribute] = attr[attribute]
                arrayNew.push(newAttr);
            }
        }
        return arrayNew;
    }

    
    getStoreClean(table){
        let arrayNew = [];
        if(table && table.grid && table.grid.store && table.grid.store.itemCache && table.grid.store.itemCache.items?.length){
            for(let i=0;i<table.grid.store.itemCache.items.length;i++){
                let attr = table.grid.store.itemCache.items[i].feature.attributes;
                arrayNew.push(attr);
            }
        }
        return arrayNew;
    }


    optionClickDownload(selected){
        const self = this.props?.parent;
        const activeTable = self.getActiveTable();
        const arrayTable = self.arrayTable;
        // const tabs = self.tabs;
        const tabs = self.state.tabs;
        switch (selected){
            case "KMZ":
                if(activeTable){
                    const cleanArrayStore = this.getStoreSingleAttributes(activeTable,"OBJECTID")
                    this.getKmzFile(activeTable.layer,cleanArrayStore)
                }
                break;
            case "eCGI_CSV":
                if(activeTable){
                    const cleanArrayStore = this.getStoreSingleAttributes(activeTable,"eCGI_28bit");
                    if(cleanArrayStore) Download.CSV(cleanArrayStore);
                }
                break;
            case "CGI_CSV":
                if(activeTable){
                    const cleanArrayStore = this.getStoreSingleAttributes(activeTable,"CGI");
                    if(cleanArrayStore) Download.CSV(cleanArrayStore);
                }
                break;
            case "EXCEL_TABLE":break;
            case "CSV_TABLE":
                if(activeTable){
                    const cleanArrayStore = this.getStoreClean(activeTable);
                    if(cleanArrayStore) Download.CSV(cleanArrayStore);
                }
                break;
            case "ALL_TABLE":
                for(let i=0;i<tabs.length;i++){
                    const item = arrayTable[i];
                    const cleanArrayStore = this.getStoreClean(item);
                    if(cleanArrayStore) Download.CSV(cleanArrayStore,item.layer.title+".csv");
                }
            break;
        }

    }

    optionColorRandom(){
        const self = this.props?.parent;
        const activeTable = self.getActiveTable();
        const uniqueValuesInfosSave = self.uniqueValuesInfosSave;

        if(activeTable && activeTable.highlightIds.items){
            let arrayItemSelected = activeTable.highlightIds?.items;

            if(arrayItemSelected){
                if(!uniqueValuesInfosSave[activeTable.layer.uid]) uniqueValuesInfosSave[activeTable.layer.uid] = [];

                //salvo vecchio renderer
                if(!uniqueValuesInfosSave[activeTable.layer.uid]){
                    uniqueValuesInfosSave[activeTable.layer.uid] = activeTable.layer.renderer;
                }

                for(let i=0;i<arrayItemSelected.length;i++){
                    let objectid = arrayItemSelected[i];
                    uniqueValuesInfosSave[activeTable.layer.uid].push({
                        label: objectid,
                        value: objectid,
                        symbol: self?.createSymbol(activeTable.layer.geometryType,[
                            Math.floor(Math.random() * 256),
                            Math.floor(Math.random() * 256),
                            Math.floor(Math.random() * 256)
                        ])
                    });
                }

                activeTable.highlightIds.removeAll();

                activeTable.layer.renderer = {
                    type: "unique-value",
                    field: activeTable.layer.objectIdField,
                    uniqueValueInfos: uniqueValuesInfosSave[activeTable.layer.uid]
                };
            }
        }
    }

    optionFilterRemove(){
        const self = this.props.parent;
        delete self.props.stateProps.layerOpen.where;
        delete self.props.stateProps.layerOpen.geometry;
        delete self.props.stateProps.layerOpen.typeSelected;
        self.createListTable();

        //pulisco eventuali graphicLayerSketch
        this.state.jimuMapView.view.map.layers.items.filter(f=>f.id.indexOf("sketch") !== -1).forEach(f=>f.removeAll());
    }

    setButtonFilter(){
        let buttonFilter;
        const self = this.props?.parent;
        if(this.state.geometryFilter){
            buttonFilter = <div>
                <Button onClick={this.optionFilterRemove} size="default">
                    <WidgetFilterOutlined/> Cancella filtro
                </Button>
            </div>;
        }else{
            buttonFilter = <div>
                <Button onClick={self?.optionFilterExtentions} size="default">
                    <WidgetFilterOutlined/> Filtra per estenzione mappa
                </Button>
                {self?.props.config.buttonFilter && (<Button onClick={self?.optionOpenFilter} size="default">
                    <WidgetFilterOutlined/> Filtra
                </Button>)}
                <Button onClick={self?.optionCloseAllTabs} size="default">
                    <CloseOutlined/> Chiudi tutti i tab
                </Button>
            </div>;
        }
        return buttonFilter;
    }

    render(): React.ReactNode {

        let buttonFilter = this.setButtonFilter();
        const self = this.props?.parent;

        return(
            <div className="container-fluid bg-primary h-auto">
            <div className="row">
                <div className="col-md-12">
                    <ButtonGroup className="w-100">
                        <Dropdown direction="down">
                            <DropdownButton>
                                <ExportOutlined className="mr-2"/> Download
                            </DropdownButton>
                            <DropdownMenu>
                                {self?.props.config.downloadKMZ && (<DropdownItem onClick={()=>{this.optionClickDownload("KMZ")}}>
                                    <ExportOutlined className="mr-2"/> Esporta Selezione in KMZ
                                </DropdownItem>)}

                                {self?.props.config.downloadECGI && (<DropdownItem onClick={()=>{this.optionClickDownload("eCGI_CSV")}}>
                                    <ExportOutlined className="mr-2"/> Esporta Colonna eCGI in CSV
                                </DropdownItem>)}
                                {self?.props.config.downloadCGI && (<DropdownItem onClick={()=>{this.optionClickDownload("CGI_CSV")}}>
                                    <ExportOutlined className="mr-2"/> Esporta Colonna CGI in CSV
                                </DropdownItem>)}
                                <DropdownItem onClick={()=>{this.optionClickDownload("CSV_TABLE")}}>
                                    <ExportOutlined className="mr-2"/> Esporta CSV tabella selezionata
                                </DropdownItem>
                                <DropdownItem onClick={()=>{this.optionClickDownload("ALL_TABLE")}}>
                                    <ExportOutlined className="mr-2"/> Esporta CSV tutte le tabelle
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown direction="down">
                            <DropdownButton>
                                <ColorsOutlined className="mr-2"/> Colore evidenziazione
                            </DropdownButton>
                            <DropdownMenu>
                                <DropdownItem onClick={()=>{this.optionColorRandom()}}>
                                    <ClearSelectionOutlined className="mr-2"/> Colore casuale
                                </DropdownItem>
                                <button className="jimu-dropdown-item app-root-emotion-cache-ltr-1vl5tzn dropdown-item">
                                    <BrushOutlined className="mr-2"/> <ColorPicker id="colorPickerAttributeTable" className="color-picker-block mr-2" onChange={(e)=>{self?.optionColorFound(e)}} placement="top" onClick = {(e)=>{self?.optionColorFound(e)}} color = {this.props.selectedColor}/> Scegli il colore
                                </button>
                                <DropdownItem onClick={()=>{self?.optionColorCleanSelected()}}>
                                    <ClearOutlined className="mr-2"/> Cancella le evidenziazioni
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        {buttonFilter}

                    </ButtonGroup>
                </div>
            </div>
        </div>   
        )
    }
}