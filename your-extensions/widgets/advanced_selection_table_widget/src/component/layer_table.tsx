
import {React,jsx} from 'jimu-core';
import '../assets/css/style.scss'
import LayerContents from './layer_contents';
import AttributesContents from './attributes_contents';
import { AdvancedSelectionTableContext } from '../context/context';

export default class  LayersTable extends React.PureComponent<any,any>{

  static contextType?: React.Context<any> = AdvancedSelectionTableContext;
  
  render(){
    const component_type = this.context?.component_type
    return (
        <div  style  = {{width:"100%"}}>
          {component_type === "LAYERS_CONTENTS" && <LayerContents />}
          {component_type === "ATTRIBUTE_CONTENTS" && <AttributesContents />}
        </div>
    )
  }
}


