import {React,jsx, appActions} from 'jimu-core';
import SelectGeometry from './select_geometry';
import '../assets/css/style.scss'
import Container from '../assets/css/style'
import helper from '../helper/helper'
import layerObject from '../interface/interface'
import { Button,Checkbox} from 'jimu-ui';
import EnhancedTableToolbar from './common/enhanced_toolbar';
import { AdvancedSelectionTableContext } from '../context/context';
import { MoreHorizontalOutlined } from 'jimu-icons/outlined/application/more-horizontal'

export default class  LayerContents extends React.PureComponent<any,any>{

  static contextType?: React.Context<any> = AdvancedSelectionTableContext;

  handleClick = (id:string) => {
    const selected = this.context?.checkedLayers;
    const advancedSelectionTable = this.context?.parent;
    const selectedIndex = selected?.indexOf(id);
    let newSelected: readonly string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected??[],id);
      helper.activateLayerOnTheMap(id,true)
    }else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected?.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected.concat(selected?.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected?.slice(0, selectedIndex),selected?.slice(selectedIndex + 1));
    }
    if (selectedIndex !== -1){
      helper.activateLayerOnTheMap(id,false)
      this.removeAttributes(id);
    }
    // advancedSelectionTable?.setState({checkedLayers:newSelected});
    advancedSelectionTable.props.dispatch(appActions.widgetStatePropChange("value","checkedLayers",newSelected));
  };

  removeAttributes = (id:string)=>{
    const advancedSelectionTable = this.context?.parent;
    const numberOfAttribute = this.context?.numberOfAttribute
    const currentLayerContents = this.context?.layerContents??[];
    const copiedLayerContents = [...currentLayerContents];
    const newNumberOfAttribute = {...numberOfAttribute};
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
    // advancedSelectionTable?.setState({layerContents:newLayerContents,numberOfAttribute:newNumberOfAttribute});
    advancedSelectionTable?.setState({layerContents:newLayerContents});
    advancedSelectionTable.props.dispatch(appActions.widgetStatePropChange("value","numberOfAttribute",newNumberOfAttribute))
    helper.unhighlightLayer(id);
  }

  isSelected = (id: string) => {
    const selected = this.context?.checkedLayers??[];
    return selected.indexOf(id) !== -1;
  }

  handleClickMoreHorizonIcon = (event: React.MouseEvent<HTMLButtonElement>,layerId:string,isItemSelected:boolean) => {
    const advancedSelectionTable = this.context?.parent;
    const currentLayerId = this.context?.layerId;
    const currentAnchorEl = this.context?.anchorEl && currentLayerId === layerId ? null:event.currentTarget
    advancedSelectionTable?.setState({
      anchorEl:currentAnchorEl,
      layerId:layerId,
      isItemSelected:isItemSelected,
    })
  };

  onClickLayerName = (id:string,layerName:string)=>{
    const advancedSelectionTable = this.context?.parent;
    const layersContents = this.context?.layerContents;
    const returnedAttributes = helper.getLayerAttributes(id,layersContents);
    if (returnedAttributes?.length > 0){
      advancedSelectionTable?.setState({
        layerTitle:layerName,
        selectedAttributes:returnedAttributes,
        component_type:"ATTRIBUTE_CONTENTS"
      })
    }
  }

  onClickRefresh = ()=>{
    const advancedSelectionTable = this.context?.parent;
    advancedSelectionTable?.onClickRefresh();
  }

  nls = (id: string) => {
    const advancedSelectionTable = this.context?.parent;
    return advancedSelectionTable?.nls(id)
  }

  render(){
    const layers = this.context?.layers;
    const numberOfAttribute = this.context.numberOfAttribute;
    const component_type = this.context?.component_type;
    const selected = this.context?.checkedLayers;
    const refresh = this.nls("refresh")

    if (component_type === "LAYERS_CONTENTS"){
      return (
        <>
          <EnhancedTableToolbar 
            numSelected={selected?.length} 
            showRefreshButton = {true} 
            onClickRefresh = {this.onClickRefresh}
            refreshButtonText = {refresh}
          >
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
            <Container><div>{this.nls("layers")}</div></Container>
          </Container>
          <Container height={450} width = {"90%"} overflow = "auto"  className='centerize-contents padding-contents20'>
            {
              layers?.map((layer:layerObject,k)=>{
                const isItemSelected = this.isSelected(layer.id);
                return(
                  <div key = {`${k}`+layer?.layerName} className = "layer-content-container row-color-hover margin-top-10">
                    <div className='check-box-container'>
                    <Checkbox
                      aria-label="Checkbox"
                      checked = {isItemSelected}
                      onChange={(e)=>this.handleClick(layer.id)}
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
                      color = "transparent"
                    >
                      <MoreHorizontalOutlined style={{color:"grey"}} color = "grey"/>
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


