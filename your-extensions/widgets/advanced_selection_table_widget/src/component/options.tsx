
import {React,jsx, appActions} from 'jimu-core'
import Container from '../assets/css/style';
import '../assets/css/style.scss';
import { CloseOutlined } from 'jimu-icons/outlined/editor/close'
import * as images from '../assets/images'
import helper from '../helper/helper';
import { AdvancedSelectionTableContext } from '../context/context';
import {getUri} from '../lib/build_uri';
import layerObject from '../interface/interface';
import { Popper } from 'jimu-ui'

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
            switch(value){
                case "zoomIn":
                    advancedSelectionTable?.onClickZoomIn();
                    break;
                case "csv":
                    this.exportFile(returnedAttributes,"csv");
                    break;
                case "json":
                    this.exportFile(returnedAttributes,"json");
                    break;
                case "statistics":
                    this.controlStatisticModal(layerId);
                    break;
                case "layer":
                    advancedSelectionTable?.setState({opencreateLayer:true});
                    const uri = getUri(returnedAttributes,"csv",advancedSelectionTable,"addLayer");
                    break;
                case "attributetable":
                    this.showAttributeTable();
                    break;
                case "delete":
                    this.deleteLayer(layerId,layerContents);
                    break;
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
        advancedSelectionTable?.setState({layerContents:newLayerContents});
        advancedSelectionTable.props.dispatch(
            appActions.widgetStatePropChange("value","numberOfAttribute",currentNUmberOfAttributes)
        )
    }

    controlStatisticModal = (layerId:string)=>{
        const advancedSelectionTable = this.context?.parent;
        const layersContents = this.context?.layerContents;
        const returnedAttributes = helper.getLayerAttributes(layerId,layersContents)
        advancedSelectionTable?.setState({
            selectedAttributes:returnedAttributes,
            openStatistics:!advancedSelectionTable?.state?.openStatistics
        });
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
                name:this.nls("zoomA"),
                value:"zoomIn",
                icon:images.zoomIn
            },
            {
                name:this.nls("exportCsv"),
                value:"csv",
                icon:images.exportFile
            },
            {
                name:this.nls("exportJson"),
                value:"json",
                icon:images.exportFile
            },
            {
                name:this.nls("statistics"),
                value:"statistics",
                icon:images.statistics
            },
            {
                name:this.nls("createLayer"),
                value:"layer",
                icon:images.createLayer
            },
            {
                name:this.nls("attributeTable"),
                value:"attributetable",
                icon:images.table
            },
            {
                name:this.nls("delete"),
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
                    <div className='flex-auto text-style-400'>{this.nls("selectionAction")}</div>
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