
import {React,jsx,AllWidgetProps, IMState} from 'jimu-core';
import 'bootstrap/dist/css/bootstrap.css';
import {Table} from  'reactstrap'

export default class AttributeTable extends React.PureComponent<AllWidgetProps<any>&{stateValue:any},any>{


    static mapExtraStateProps (state:IMState){
      return {stateValue:state.widgetsState}
    }

    componentDidMount(): void {
        
    }

    componentDidUpdate(){

    }

    render(){
        let xCoorninates = this.props.stateValue?.["id"]?.paths[this.props.stateValue?.["id"]?.paths.length-1][0]??0
        let yCoordinates = this.props.stateValue?.["id"]?.paths[this.props.stateValue?.["id"]?.paths.length-1][1]??0
        return(
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
              {/* {
                this.props.stateValue?.["id"]?.paths?.length > 0 ?
                this.props.stateValue?.["id"]?.paths[this.props.stateValue?.["id"]?.paths.length-1].map((path,k)=>(
                  <tr key = {k}>
                    <td>{k+1}</td>
                    <td>({path[0]},{path[1]})</td>
                  </tr>
                )):null
              } */}
            </tbody>
          </Table>
        )
    }
}