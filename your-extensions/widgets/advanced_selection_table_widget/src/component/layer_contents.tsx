import {React,jsx} from 'jimu-core';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import SelectGeometry from './select_geometry';
import '../assets/css/style.scss'
import Container from '../assets/css/style'
import LayersTable from './layer_table'
import helper from '../helper/helper'
import layerObject from '../interface/interface'

interface EnhancedTableToolbarProps {numSelected: number,sketchGeometry:(geometryType:any)=>void}

class  EnhancedTableToolbar extends React.PureComponent<EnhancedTableToolbarProps,any>{

    render(): React.ReactNode {
        const { numSelected } = this.props;
        
        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                <Typography component="div"><SelectGeometry sketchGeometry = {this.props.sketchGeometry}/></Typography>
            </Toolbar>
        );
    }
  
}



type layerContentType = {
    layers:layerObject[],
    sketchGeometry:(geometryType:any)=>void,
    component_type:string,
    parent:LayersTable
}

export default class  LayerContents extends React.PureComponent<layerContentType,any>{

  state = {selected:[],rowsPerPage:5}

  handleClick = (event: React.MouseEvent<unknown>, name: string,id:string) => {
    const self = this.props?.parent;
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected,name);
    }else{
        const returnedAttributes = helper.getLayerAttributes(id,self?.props?.layersContents);
        if (returnedAttributes?.length > 0 ){
            newSelected = this.state.selected;
            this.goToAttributesContents(name,returnedAttributes)
        }else{
            if (selectedIndex === 0) {
                newSelected = newSelected.concat(this.state.selected.slice(1));
              } else if (selectedIndex === this.state.selected.length - 1) {
                newSelected = newSelected.concat(this.state.selected.slice(0, -1));
              } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                  this.state.selected.slice(0, selectedIndex),
                  this.state.selected.slice(selectedIndex + 1),
                );
              }
        }
    }
    this.setState({selected:newSelected});
  };


  goToAttributesContents = (layerTitle:string,returnedAttributes:any[])=>{
    const self = this.props.parent;
      self?.setState({
        layerTitle:layerTitle,
        selectedAttributes:returnedAttributes,
        component_type:"ATTRIBUTE_CONTENTS"
      });
  }

  handleChangePage = (event: unknown, newPage: number) => {this.setState({page:newPage})};

  handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({rowsPerPage:parseInt(event.target.value, 10),page:0})
  };

  isSelected = (name: string) => this.state.selected.indexOf(name) !== -1;

  render(){
    if (this.props.component_type === "LAYERS_CONTENTS"){
        return (
            <>
                <EnhancedTableToolbar numSelected={this.state.selected.length} sketchGeometry = {this.props.sketchGeometry}/>
                <Container 
                  height = {1} 
                  width = "96%" 
                  borderBottomColor='grey' 
                  borderBottomWidth={1}
                  className = "centerize-contents"
                >
                </Container>
                <Container width = "96%" className='centerize-contents display-row-contents'>
                  <Container><div>Layers</div></Container>
                </Container>
                <Container height={450} width = {"100%"} overflow = "auto"  className='centerize-contents padding-contents'>
                  {
                    this.props.layers?.map((layer:layerObject,k)=>{
                      const isItemSelected = this.isSelected(layer.layerName);
                      return(
                        <div key = {`${k}`+layer?.layerName} className = "layer-content-container">
                          <div className='check-box-container'>
                            <Checkbox 
                                color="primary" 
                                checked={isItemSelected} 
                                onClick = {(e)=>this.handleClick(e,layer.layerName,layer.id)}
                            />
                          </div>
                          <div className='layer-name-container'>{layer.layerName}</div>
                        </div>
                      )
                    })
                  }
                </Container>
            </>
        )
    }
    return null;
  }
}


