
import {React,jsx,AllWidgetProps, appActions,} from 'jimu-core';
import { IMState } from 'jimu-core/lib/types/state'

export default class DisplayGeometry extends React.PureComponent<AllWidgetProps<{}>&{stateValue:any},any>{

    static mapExtraStateProps(state:IMState){
        return {stateValue:state.widgetsState}
    }

   render(): React.ReactNode {
        console.log(this.props.stateValue?.["id"])
        if(this.props.stateValue?.["id"]?.displayGeomtry){
            return (
                <>
                    {
                        this.props.stateValue?.["id"]?.paths?.length > 0 ?
                        this.props.stateValue?.["id"]?.paths.map((path)=>{
                            return <div>{path}</div>
                        }):null
                    }
                </>
            )
        }
       return null;
   }
}


