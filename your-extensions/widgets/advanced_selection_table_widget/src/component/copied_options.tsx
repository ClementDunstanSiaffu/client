
import {React,appActions,WidgetManager,jsx} from 'jimu-core'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '../assets/css/style';
import '../assets/css/style.scss';
// import CloseIcon from '@mui/icons-material/Close';
import { CloseOutlined } from 'jimu-icons/outlined/editor/close'
import * as images from '../assets/images'
import helper from '../helper/helper';
import { AdvancedSelectionTableContext } from '../context/context';
import {getUri} from '../lib/build_uri';
import layerObject from '../interface/interface';
import { Popper } from 'jimu-ui'


// const options = [
//     {
//         name:"Zoom A",
//         value:"zoomIn",
//         icon:images.zoomIn
//     },
//     {
//         name:"Export in file csv",
//         value:"csv",
//         icon:images.exportFile
//     },
//     {
//         name:"Export to feature collection",
//         value:"json",
//         icon:images.exportFile
//     },
//     {
//         name:"Statistics",
//         value:"statistics",
//         icon:images.statistics
//     },
//     {
//         name:" Create Layer",
//         value:"layer",
//         icon:images.createLayer
//     },
//     {
//         name:"View in attribute table",
//         value:"attributetable",
//         icon:images.table
//     },
//     {
//         name:"Delete",
//         value:"delete",
//         icon:images.deleteIcon
//     },
// ]

export default class  Options extends React.PureComponent<any,any> {

    static contextType?: React.Context<any> = AdvancedSelectionTableContext;

    onClickOption = (value:string)=>{
        const layerId = this.context?.layerId;
        const advancedSelectionTable = this.context?.parent;
        const layerContents = this.context?.layerContents;
        const returnedAttributes = helper.getLayerAttributes(layerId,layerContents);
        const isItemSelected = this.context?.isItemSelected;
        if (isItemSelected && returnedAttributes?.length > 0){
            advancedSelectionTable?.setState({selectedAttributes:returnedAttributes});
            if (value === "zoomIn"){
                advancedSelectionTable?.onClickZoomIn()
            }else if (value === "csv"){
                this.exportFile(returnedAttributes,"csv");
            }else if (value === "json"){
                this.exportFile(returnedAttributes,"json");
            }else if (value === "statistics"){
                this.controlStatisticModal(layerId);
            }else if (value === "layer"){
                advancedSelectionTable?.setState({opencreateLayer:true});
                const uri = getUri(returnedAttributes,"csv",advancedSelectionTable,"addLayer");
            }else if (value === "attributetable"){
                this.showAttributeTable();
            }else if (value === "delete"){
                this.deleteLayer(layerId,layerContents)
            }
        }
    }

    exportFile = (selectedAttributes:any[],exportType:string)=>{
        const advancedSelectionTable = this.context?.parent;
        const uri = getUri(selectedAttributes,exportType,advancedSelectionTable);
        if(exportType === "csv"){
            window.open(uri,"blank");
        }else{
            if (window.saveAs && uri){
                window.saveAs(uri,"feature.json")
            }else{
                window.open(uri,"blank");
            }
        }
    }

    deleteLayer = (id:string,layerContents:layerObject[])=>{
        const advancedSelectionTable = this.context?.parent;
        let currentNUmberOfAttributes = {};
        let numberOfAttribute = this.context?.numberOfAttribute
        if (Object.keys(numberOfAttribute).length > 0){
            currentNUmberOfAttributes = {...numberOfAttribute};
            delete currentNUmberOfAttributes[id];
    
        }
        let newLayerContents = [];
        if (layerContents.length > 0){
            newLayerContents = layerContents.reduce((newArray,layerContent)=>{
                if (layerContent?.id !== id){
                    newArray.push(layerContent);
                }
                return newArray;
            },[])
        }
        helper.unhighlightLayer(id);
        advancedSelectionTable?.setState({numberOfAttribute:currentNUmberOfAttributes,layerContents:newLayerContents})
    }

    controlStatisticModal = (layerId:string)=>{
        const advancedSelectionTable = this.context?.parent;
        const layersContents = this.context?.layerContents;
        const returnedAttributes = helper.getLayerAttributes(layerId,layersContents)
        advancedSelectionTable?.setState({selectedAttributes:returnedAttributes,openStatistics:!advancedSelectionTable?.state?.openStatistics});
    }

    handleCloseMoreHorizonIcon = () => {
        const advancedSelectionTable = this.context?.parent;
        advancedSelectionTable?.setState({anchorEl:null})
    };

    showAttributeTable = ()=>{helper.openTableAttribute()}

    nls = (id: string) => {
        const advancedSelectionTable = this.context?.parent;
        return advancedSelectionTable?.nls(id)
    }

    render(){
        const open = Boolean(this.context?.anchorEl);


        const options = [
            {
                // name:"Zoom A",
                name:this.nls("_zoomA"),
                value:"zoomIn",
                icon:images.zoomIn
            },
            {
                // name:"Export in file csv",
                name:this.nls("_exportCSV"),
                value:"csv",
                icon:images.exportFile
            },
            {
                // name:"Export to feature collection",
                name:this.nls("_exportJSON"),
                value:"json",
                icon:images.exportFile
            },
            {
                // name:"Statistics",
                name:this.nls("_statistic"),
                value:"statistics",
                icon:images.statistics
            },
            {
                // name:" Create Layer",
                name:this.nls("_createLayer"),
                value:"layer",
                icon:images.createLayer
            },
            {
                // name:"View in attribute table",
                name:this.nls("_attributeTable"),
                value:"attributetable",
                icon:images.table
            },
            {
                // name:"Delete",
                name:this.nls("_delete"),
                value:"delete",
                icon:images.deleteIcon
            },
        ]
        

        return (
            <Popper open={open} reference={this.context?.anchorEl} zIndex = {100000}>
                <Container 
                    width={"90%"} 
                    borderBottomWidth = {1} 
                    borderBottomColor = "lightgrey"
                    height={40}
                    className = 'centerize-contents display-row-contents'
                >
                    <div className='flex-auto text-style-400'>Select Action</div>
                    <div className='display-flex-end close-button' onClick={this.handleCloseMoreHorizonIcon}>
                        <CloseOutlined style={{color:"grey"}} color = "grey"/>
                    </div>
                </Container>
                <div style = {{paddingTop:20,paddingBottom:20}}>
                    {
                        options.map((option,k)=>{
                            return( 
                                <div onClick={this.handleCloseMoreHorizonIcon} className = 'centerize-contents row-color-hover'>
                                    <Container 
                                        width={"90%"} 
                                        className = 'centerize-contents display-row-contents padding-contents10' 
                                        backgroundColor='transparent'
                                        onClick={()=>this.onClickOption(option.value)}
                                    >
                                        <div>
                                            <img src = {option.icon} className = 'icon-style' />
                                        </div>
                                        <div className='menu-item-text-container'>{option.name}</div>
                                    </Container>
                                </div>
                            )
                        })
                    }
                </div>
            </Popper>
        );
    }
}