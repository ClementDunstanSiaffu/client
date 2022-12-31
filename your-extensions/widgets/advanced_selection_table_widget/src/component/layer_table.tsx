
import {React,jsx} from 'jimu-core';
import '../assets/css/style.scss'
import LayerContents from './layer_contents';
import AttributesContents from './attributes_contents';
import { AdvancedSelectionTableContext } from '../context/context';
import { Loading } from 'jimu-ui'


export default class  LayersTable extends React.PureComponent<any,any>{

  static contextType?: React.Context<any> = AdvancedSelectionTableContext;
  
  render(){
    const component_type = this.context?.component_type
    const isMapLoaded = this.context?.isMapLoaded;
    const advancedSelectionTable = this.context?.parent;
    const loadingMap = advancedSelectionTable.nls("mapLoading")

    if (isMapLoaded){
      return (
        <div  style  = {{width:"100%"}}>
          {component_type === "LAYERS_CONTENTS" && <LayerContents />}
          {component_type === "ATTRIBUTE_CONTENTS" && <AttributesContents />}
        </div>
      )
    }
    return( 
      <div style={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",height:"auto"}}>
        <div style={{height:'80px',position:'relative',width:'100%',marginLeft:"auto",marginRight:"auto"}}><Loading /></div>
        <div style = {{fontSize:14,color:"grey",width:'100%',textAlign:"center"}}>{loadingMap}</div>
      </div>
    )
  }
}


