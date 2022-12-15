
import {React,jsx} from 'jimu-core';
import 'bootstrap/dist/css/bootstrap.css';
import {Table,Button} from  'reactstrap';
import '../assets/css/style.scss'

type attributeTablePropsType = {
    selectedAttributes:any[]
}

export default class AttributeTable extends React.PureComponent<attributeTablePropsType,any>{

    getHeaders = ()=>{
        let currentHeaders = [];
        const selectedAttributes = this.props.selectedAttributes; 
        if (selectedAttributes?.length > 0){
            currentHeaders = Object.keys(selectedAttributes[0])
        }
        return currentHeaders;
    }

    render(): React.ReactNode {
        const headers = this.getHeaders()??[];
        return(
            <Table hover>
            <thead className='tab-container'>
              <tr>
                {
                    headers.length > 0 ?
                     headers.map((item,i)=><th key={i}>{item}</th> )
                    :null
                }
              </tr>
            </thead>
            <tbody>
                {
                    this.props.selectedAttributes?.length > 0 ?
                        this.props.selectedAttributes.map((item,j)=>{
                            const values = Object.values(item);
                            return(
                                <tr>{ values.map((val,k)=><td>{val}</td>)}</tr>
                            )
                         
                        }) 
                    :null  
                }
            </tbody>
            </Table>
        )
    }
}

