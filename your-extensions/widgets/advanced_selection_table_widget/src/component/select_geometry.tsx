
import {React,jsx,appActions} from 'jimu-core'
import 'bootstrap/dist/css/bootstrap.css';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../assets/css/style.scss'
import * as images from '../assets/images/';
import DropDown from './common/dropdown';
import { AdvancedSelectionTableContext } from '../context/context';


const selectionsGeometries = [
    {
        label:"Selection by point",
        value:"point",
        icon:images.points
    },
    {
        label:"Selection by line",
        value:"polyline",
        icon:images.lines
    },
    {
        label:"Selection by polygon",
        value:"polygon",
        icon:images.polygon
    },
    {
        label:"Selection by rectangular",
        value:"rectangle",
        icon:images.rectangle
    },
    {
        label:"Selection by circle",
        value:"circle",
        icon:images.circle
    },
]

export default class SelectGeometry extends React.PureComponent<any,any>{

    static contextType?: React.Context<any> = AdvancedSelectionTableContext;

    onSelectGeometry = (geometryType:any)=>{
        const advancedSelectionTable = this.context?.parent;
        advancedSelectionTable?.setState({geometryType:geometryType},()=>{
            advancedSelectionTable?.startSketching();
        })
    }
    
    render(): React.ReactNode {
        const widthToEM = `${180*0.0625}em`;
        return <DropDown 
                    items={selectionsGeometries}
                    onClick = {this.onSelectGeometry}
                    dropdownToogleStyle = {{backgroundColor:"green",width:widthToEM,color:"white"}}
                    dropdownTooggleColor = "green"
                    title='Select Geometry'
                />
            
    }
  
  }
