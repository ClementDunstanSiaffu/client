
import {React,jsx} from 'jimu-core';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import '../assets/css/style.scss'
import LayerContents from './layer_contents';
import AttributesContents from './attributes_contents'
import layerObject from '../interface/interface'
import {popupContentType} from '../interface/interface'
import AdvancedSelectionTable from '../runtime/widget';


type TablePropsType = {
  layers:layerObject[],
  sketchGeometry:(geometryType:any)=>void,
  layersContents:{id:string,attributes:any[]}[],
  openPopUp:(popcontents:popupContentType)=>void,
  parent:AdvancedSelectionTable
}

type stateType = {
  selected:readonly string[],
  rowsPerPage:number,
  component_type:string,
  selectedAttributes:any[],
  layerTitle:string,
}

export default class  LayersTable extends React.PureComponent<TablePropsType,stateType>{

  state = {
    selected:[],
    rowsPerPage:5,
    component_type:"LAYERS_CONTENTS",
    selectedAttributes:[],
    layerTitle:" ",
}

  isSelected = (name: string) => this.state.selected.indexOf(name) !== -1;

  zoomIn = ()=>{
    const self = this.props.parent;
    self.onClickZoomIn();
  }

  render(){
    return (
      <Box sx={{ width: '100%',height:600 }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <LayerContents 
            layers={this.props.layers} 
            sketchGeometry = {this.props.sketchGeometry} 
            component_type = {this.state.component_type}
            parent = {this}
          />
          <AttributesContents 
            attributes={this.state.selectedAttributes}
            component_type = {this.state.component_type}
            layerTitle = {this.state.layerTitle}
            parent = {this}
          />
        </Paper>
      </Box>
    )
  }
}


