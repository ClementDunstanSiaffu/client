
import {React,jsx,AllWidgetProps, IMState,appActions} from 'jimu-core';
import 'bootstrap/dist/css/bootstrap.css';
import {Table,Button} from  'reactstrap'

export default class AttributeTable extends React.PureComponent<AllWidgetProps<any>&{stateValue:any},any>{


    static mapExtraStateProps (state:IMState){
      return {stateValue:state.widgetsState}
    }

    deleteGraphics = ()=>{
      if (this.props.stateValue["id"]?.deleteGraphics){
        this.props.stateValue["id"]?.deleteGraphics();
        this.props.dispatch(appActions.widgetStatePropChange("id","paths",[[0,0]]));
      }
    }

    render(){
        let xCoorninates = this.props.stateValue?.["id"]?.paths[this.props.stateValue?.["id"]?.paths.length-1][0]??0
        let yCoordinates = this.props.stateValue?.["id"]?.paths[this.props.stateValue?.["id"]?.paths.length-1][1]??0
        return(
          <>
            <Button onClick={this.deleteGraphics}>
              <div>Delete</div>
            </Button>
            <Table hover>
              <thead>
                <tr>
                  <th>Path(x,y)</th>
                </tr>
              </thead>
              <tbody>
              {
                  <tr>
                      <td>({xCoorninates},{yCoordinates})</td>
                    </tr>
                  
                }
              </tbody>
              </Table>
          </>
        )
    }
}