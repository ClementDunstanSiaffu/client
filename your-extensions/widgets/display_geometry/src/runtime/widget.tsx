
import {React,jsx,AllWidgetProps, appActions,} from 'jimu-core';
import { IMState } from 'jimu-core/lib/types/state'

export default class DisplayGeometry extends React.PureComponent<AllWidgetProps<{}>&{stateValue:any},any>{

    static mapExtraStateProps(state:IMState){
        return {stateValue:state.widgetsState}
    }

   render(): React.ReactNode {
        if(this.props.stateValue?.["id"]?.displayGeomtry){
            return (
                <div style={{width:"100%",height:"100%",position:"absolute",top:0,bottom:0}}>
                    <div style = {{marginLeft:"auto",marginRight:"auto"}}>
                        <div style = {{fontSize:20,color:"grey"}}>Path coordinates</div>
                        {
                            this.props.stateValue?.["id"]?.paths?.length > 0 ?
                            this.props.stateValue?.["id"]?.paths.map((path)=>{
                                return (
                                    <div style = {{marginTop:20,marginLeft:20}}>
                                        {path}
                                    </div>
                                )
                            }):null
                        }
                    </div>
                </div>
            )
        }
       return null;
   }
}


