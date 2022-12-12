import {React,jsx} from 'jimu-core';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import SelectGeometry from './select_geometry';
import '../assets/css/style.scss'
import Container from '../assets/css/style'
import LayersTable from './layer_table'
import helper from '../helper/helper'
import layerObject from '../interface/interface'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import Options from './options';
import EnhancedTableToolbar from './common/enhanced_toolbar';

// interface EnhancedTableToolbarProps {numSelected: number,sketchGeometry:(geometryType:any)=>void}

// class  EnhancedTableToolbar extends React.PureComponent<EnhancedTableToolbarProps,any>{

//     render(): React.ReactNode {
//         const { numSelected } = this.props;
        
//         return (
//             <Toolbar
//                 sx={{
//                     pl: { sm: 2 },
//                     pr: { xs: 1, sm: 1 },
//                     ...(numSelected > 0 && {
//                     bgcolor: (theme) =>
//                         alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//                     }),
//                 }}
//             >
//               <Typography component="div"><SelectGeometry sketchGeometry = {this.props.sketchGeometry}/></Typography>
//             </Toolbar>
//         );
//     }
  
// }

type layerContentType = {
    component_type:string,
    numberOfAttribute:{[key:string]:number}
    parent:LayersTable
}

export default class  LayerContents extends React.PureComponent<layerContentType,any>{

  state = {
    selected:[],
    rowsPerPage:5,
    anchorEl:null,
    layerId:null,
    isItemSelected:false,
  }

  handleClick = (event: React.MouseEvent<unknown>, name: string,id:string) => {
    const self = this.props?.parent;
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected: readonly string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected,name);
    }else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.state.selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      newSelected = newSelected.concat(this.state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(this.state.selected.slice(0, selectedIndex),this.state.selected.slice(selectedIndex + 1));
    }

    if (selectedIndex !== -1){
      this.removeAttributes(id);
    }
    self.dispatchCheckedLayer(id)
    this.setState({selected:newSelected});
  };


  removeAttributes = (id:string)=>{
    const self = this.props.parent;
    const currentLayerContents = self.props.layersContents??[];
    const copiedLayerContents = [...currentLayerContents];
    const newNumberOfAttribute = {...this.props.numberOfAttribute}
    const newLayerContents = copiedLayerContents.reduce((newArray,item:{id:string,attributes:any[]})=>{
      if (item?.id !== id){
        newArray.push(item);
      }else{
        if (newNumberOfAttribute[id]){
          delete newNumberOfAttribute[id];
        }
      }
      return newArray;
    },[])
    self.removeAttributes(newLayerContents,newNumberOfAttribute)
  }


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

  handleClickMoreHorizonIcon = (event: React.MouseEvent<HTMLButtonElement>,layerId:string,isItemSelected:boolean) => {
    this.setState({anchorEl:event.currentTarget,layerId:layerId,isItemSelected:isItemSelected})
  };

  handleCloseMoreHorizonIcon = () => {
    this.setState({anchorEl:null})
  };

  onClickLayerName = (id:string,layerName:string)=>{
    const self = this.props.parent;
    const returnedAttributes = helper.getLayerAttributes(id,self.props.layersContents);
    if (returnedAttributes?.length > 0){
      this.goToAttributesContents(layerName,returnedAttributes)
    }
  }


  render(){

    const self = this.props.parent;
    return (
      <>
        {/* <EnhancedTableToolbar numSelected={this.state.selected.length} sketchGeometry = {self.props.parent.sketchGeometry}/> */}
          <EnhancedTableToolbar numSelected={this.state.selected.length}>
                  <SelectGeometry sketchGeometry = {self.props.parent.sketchGeometry}/>
                </EnhancedTableToolbar>
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
                <Container height={450} width = {"100%"} overflow = "auto"  className='centerize-contents padding-contents20'>
                  {
                    self.props.layers?.map((layer:layerObject,k)=>{
                      const isItemSelected = this.isSelected(layer.layerName);
                      return(
                        <div key = {`${k}`+layer?.layerName} className = "layer-content-container row-color-hover">
                          <div className='check-box-container'>
                            <Checkbox 
                              color="primary" 
                              checked={isItemSelected} 
                              onClick = {(e)=>this.handleClick(e,layer.layerName,layer.id)}
                            />
                          </div>
                          <div 
                            className='flex-auto 
                            cursor-style' onClick={()=>this.onClickLayerName(layer?.id,layer?.layerName)}
                          >
                            {layer.layerName}
                          </div>
                          <div>
                            {
                              this.props?.numberOfAttribute && isItemSelected?
                              this.props?.numberOfAttribute[layer.id]??0:0 
                            }
                          </div>
                          <Button 
                              id="basic-button"
                              aria-controls={open ? 'basic-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              className='morehorizicon-container' 
                              onClick={(e)=>this.handleClickMoreHorizonIcon(e,layer.id,isItemSelected)}
                            >
                              <MoreHorizIcon style={{color:"grey"}}/>
                            </Button>
                        </div>
                      )
                    })
                  }
                </Container>
                <Options 
                  parent = {this} 
                  anchorEl  = {this.state.anchorEl}
                  isSelected = {this.state.isItemSelected}
                  layerId = {this.state.layerId}
                  layerContents = {self.props.layersContents}
                />
            </>
        )
    
  }
}


