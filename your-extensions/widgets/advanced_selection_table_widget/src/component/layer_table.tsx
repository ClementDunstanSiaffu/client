
import {React,jsx, appActions} from 'jimu-core';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import '../assets/css/style.scss'
import LayerContents from './layer_contents';
import AttributesContents from './attributes_contents'
import layerObject from '../interface/interface'
import {popupContentType} from '../interface/interface'
import AdvancedSelectionTable from '../runtime/widget';
import helper from '../helper/helper';
import StatisticsModal from './statistics';


type TablePropsType = {
  layers:layerObject[],
  layersContents:{id:string,attributes:any[]}[],
  openPopUp:(popcontents:popupContentType)=>void,
  parent:AdvancedSelectionTable,
  numberOfAttribute:{[key:string]:number},
  checkedLayers:string[],
}

type stateType = {
  selected:readonly string[],
  rowsPerPage:number,
  component_type:string,
  selectedAttributes:any[],
  layerTitle:string,
  openStatistics:boolean,
}

export default class  LayersTable extends React.PureComponent<TablePropsType,stateType>{

  state = {
    selected:[],
    rowsPerPage:5,
    component_type:"LAYERS_CONTENTS",
    selectedAttributes:[],
    layerTitle:" ",
    openStatistics:false
}

  isSelected = (name: string) => this.state.selected.indexOf(name) !== -1;

  zoomIn = ()=>{
    const self = this.props.parent;
    self.onClickZoomIn();
  }

  changeToCsv = (optionSelectedAttributes:any[],exportTYpe:string)=>{
    const self = this.props.parent;
    self.convertToCsv(optionSelectedAttributes,exportTYpe);
  }

  controlStatisticModal = (layerId:string)=>{
    const self = this.props.parent;
    const layersContents = this.props.layersContents;
    const returnedAttributes = helper.getLayerAttributes(layerId,layersContents)
    // self.setState({openStatistics:!self.state.openStatistics});
    this.setState({selectedAttributes:returnedAttributes,openStatistics:!self.state.openStatistics});
  }

  dispatchCheckedLayer = (layerId:string)=>{
    const self = this.props.parent;
    const currentCheckedLayers = this.props.checkedLayers;
    let index = -1;
    let newCheckedLayers = []
    if (currentCheckedLayers?.length > 0){
      index = currentCheckedLayers.indexOf(layerId);
      if (index !== -1){
        newCheckedLayers = currentCheckedLayers.reduce((newArray,id:string)=>{
          if (id !== layerId){
            newArray.push(id);
          }
          return newArray;
        },[])
      }else{
        newCheckedLayers = [...currentCheckedLayers,layerId]
      }
    }else{
      newCheckedLayers.push(layerId);
    }
    self.props.dispatch(appActions.widgetStatePropChange("value","checkedLayers",newCheckedLayers));
  }

  removeAttributes = (newLayersContents:{id:string,attributes:any[]}[],numberOfAttribute:{[key:string]:number,})=>{
    const self = this.props.parent;
    self.props.dispatch(appActions.widgetStatePropChange("value","layerContents",newLayersContents));
    self.props.dispatch(appActions.widgetStatePropChange("value","numberOfAttribute",numberOfAttribute))
  }

  render(){
    const self = this.props.parent;
    return (
      <Box sx={{ width: '100%',height:600 }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          
            <LayerContents 
              component_type = {this.state.component_type}
              numberOfAttribute = {self.props.stateValue?.value?.numberOfAttribute}
              parent = {this}
            />
          
          {this.state.component_type === "ATTRIBUTE_CONTENTS" && 
            <AttributesContents 
              attributes={this.state.selectedAttributes}
              component_type = {this.state.component_type}
              layerTitle = {this.state.layerTitle}
              parent = {this}
            />
          }
          {
            this.state.openStatistics && <StatisticsModal parent = {this} attributes={this.state.selectedAttributes}/>

          }
        </Paper>
      </Box>
    )
  }
}


