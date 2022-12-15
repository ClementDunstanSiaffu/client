import {React,appActions,WidgetManager,jsx} from 'jimu-core'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '../assets/css/style';
import '../assets/css/style.scss';
import CloseIcon from '@mui/icons-material/Close';
import * as images from '../assets/images/'
import helper from '../helper/helper';
import { AdvancedSelectionTableContext } from '../context/context';
import {getUri} from '../lib/build_uri';
import AdvancedSelectionTable from '../runtime/widget';


const options = [
    {
        name:"Zoom A",
        value:"zoomIn",
        icon:images.zoomIn
    },
    {
        name:"Export in file csv",
        value:"csv",
        icon:images.exportFile
    },
    {
        name:"Export to feature collection",
        value:"json",
        icon:images.exportFile
    },
    {
        name:"Statistics",
        value:"statistics",
        icon:images.statistics
    },
    {
        name:" Create Layer",
        value:"layer",
        icon:images.createLayer
    },
    {
        name:"View in attribute table",
        value:"attributetable",
        icon:images.table
    },
    {
        name:"Delete",
        value:"delete",
        icon:images.deleteIcon
    },
]

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
                AdvancedSelectionTable.deleteStatus = true;
            }
        }
    }

    exportFile = (selectedAttributes:any[],exportType:string)=>{
        const advancedSelectionTable = this.context?.parent;
        const uri = getUri(selectedAttributes,exportType,advancedSelectionTable);
        advancedSelectionTable?.setState({exportStatus:true,uri:uri})
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

    render(){
        const open = Boolean(this.context?.anchorEl);
        return (
            <div>
                <Menu
                    id="basic-menu"
                    anchorEl={this.context?.anchorEl}
                    open={open}
                    onClose={this.handleCloseMoreHorizonIcon}
                    MenuListProps={{'aria-labelledby': 'basic-button'}}
                >
                    <Container 
                        width={"90%"} 
                        borderBottomWidth = {1} 
                        borderBottomColor = "lightgrey"
                        height={40}
                        className = 'centerize-contents display-row-contents'
                    >
                        <div className='flex-auto text-style-400'>Select Action</div>
                        <div className='display-flex-end close-button' onClick={this.handleCloseMoreHorizonIcon}>
                            <CloseIcon style={{color:"grey"}}/>
                        </div>
                    </Container>
                    {
                        options.map((option,k)=>{
                            return( 
                                <MenuItem onClick={this.handleCloseMoreHorizonIcon}>
                                    <Container 
                                        width={"100%"} 
                                        className = 'centerize-contents display-row-contents padding-contents10' 
                                        backgroundColor='transparent'
                                        onClick={()=>this.onClickOption(option.value)}
                                    >
                                        <div>
                                            <img src = {option.icon} className = 'icon-style' />
                                        </div>
                                        <div className='menu-item-text-container'>{option.name}</div>
                                    </Container>
                                </MenuItem>
                            )
                        })
                    }
                </Menu>
            </div>
        );
    }
}