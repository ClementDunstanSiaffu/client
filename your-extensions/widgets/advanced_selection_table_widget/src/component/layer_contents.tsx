import {React,jsx,appActions} from 'jimu-core';
import Checkbox from '@mui/material/Checkbox';
import SelectGeometry from './select_geometry';
import '../assets/css/style.scss'
import Container from '../assets/css/style'
import helper from '../helper/helper'
import layerObject from '../interface/interface'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import EnhancedTableToolbar from './common/enhanced_toolbar';
import { AdvancedSelectionTableContext } from '../context/context';

export default class  LayerContents extends React.PureComponent<any,any>{

  static contextType?: React.Context<any> = AdvancedSelectionTableContext;

  handleClick = (event: React.MouseEvent<unknown>, name: string,id:string) => {
    const selected = this.context?.selected;
    const advancedSelectionTable = this.context?.parent;
    const selectedIndex = selected?.indexOf(name);
    let newSelected: readonly string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected??[],name);
    }else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected?.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected.concat(selected?.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected?.slice(0, selectedIndex),selected?.slice(selectedIndex + 1));
    }
    if (selectedIndex !== -1){
      this.removeAttributes(id);
    }
    this.dispatchCheckedLayer(id)
    advancedSelectionTable?.setState({selected:newSelected});
  };

  dispatchCheckedLayer = (layerId:string)=>{
    const advancedSelectionTable = this.context?.parent;
    const currentCheckedLayers = this.context?.checkedLayers;
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
    advancedSelectionTable?.props?.dispatch(appActions.widgetStatePropChange("value","checkedLayers",newCheckedLayers));
  }

  removeAttributes = (id:string)=>{
    const advancedSelectionTable = this.context.parent;
    const numberOfAttribute = this.context?.numberOfAttribute
    const currentLayerContents = this.context.layersContents??[];
    const copiedLayerContents = [...currentLayerContents];
    const newNumberOfAttribute = {...numberOfAttribute}
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
    advancedSelectionTable.props.dispatch(appActions.widgetStatePropChange("value","layerContents",newLayerContents));
    advancedSelectionTable.props.dispatch(appActions.widgetStatePropChange("value","numberOfAttribute",newNumberOfAttribute))
  }


  isSelected = (name: string) => {
    const selected = this.context?.selected;
    return selected.indexOf(name) !== -1;
  }

  handleClickMoreHorizonIcon = (event: React.MouseEvent<HTMLButtonElement>,layerId:string,isItemSelected:boolean) => {
    const advancedSelectionTable = this.context?.parent;
    advancedSelectionTable?.setState({anchorEl:event.currentTarget,layerId:layerId,isItemSelected:isItemSelected})
  };

  onClickLayerName = (id:string,layerName:string)=>{
    const advancedSelectionTable = this.context?.parent;
    const layersContents = advancedSelectionTable?.props?.stateValue?.value?.layerContents;
    console.log(layersContents,"check layer contents")
    const returnedAttributes = helper.getLayerAttributes(id,layersContents);
    if (returnedAttributes?.length > 0){
      advancedSelectionTable?.setState({
        layerTitle:layerName,
        selectedAttributes:returnedAttributes,
        component_type:"ATTRIBUTE_CONTENTS"
      })
    }
  }

  render(){
    const advancedSelectionTable = this.context?.parent
    const layers = this.context?.layers;
    const numberOfAttribute = advancedSelectionTable?.props?.stateValue?.value?.numberOfAttribute;
    const component_type = this.context?.component_type;
    const selected = this.context?.selected;

    if (component_type === "LAYERS_CONTENTS"){
      return (
        <>
          <EnhancedTableToolbar numSelected={selected?.length}>
            <SelectGeometry />
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
              layers?.map((layer:layerObject,k)=>{
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
                        numberOfAttribute && isItemSelected?
                        numberOfAttribute[layer.id]??0:0 
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
        </>
      )
    }
    return null
  }
}


