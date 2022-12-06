
import {React,jsx} from 'jimu-core'
import 'bootstrap/dist/css/bootstrap.css';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import TimelineIcon from '@mui/icons-material/Timeline';
import '../assets/css/style.scss'
import * as images from '../assets/images/';


const selectionsGeometries = [
    {
        name:"Selection by point",
        value:"point",
        icon:images.points
    },
    {
        name:"Selection by line",
        value:"polyline",
        icon:images.lines
    },
    {
        name:"Selection by polygon",
        value:"polygon",
        icon:images.polygon
    },
    {
        name:"Selection by rectangular",
        value:"rectangle",
        icon:images.rectangle
    },
    {
        name:"Selection by circle",
        value:"circle",
        icon:images.circle
    },
]

export default class SelectGeometry extends React.PureComponent<any,any>{

    onSelectGeometry = (geometryType:any)=>{
        this.props?.sketchGeometry(geometryType)
    }

    render(): React.ReactNode {
        return (
            <UncontrolledDropdown>
                <DropdownToggle 
                    caret 
                    style={{backgroundColor:"green",width:180,color:"white"}} 
                    color = "green"
                    outline = {false}
                >
                    Select geometry
                </DropdownToggle>
                <DropdownMenu>
                    {
                        selectionsGeometries.map((selectionGeometry,k)=>(
                            <DropdownItem key={k} onClick = {()=>this.onSelectGeometry(selectionGeometry.value)}>
                                <img src={selectionGeometry.icon} className = 'icon-style'/>   <span className='ttribute-title'>{selectionGeometry.name}</span>
                            </DropdownItem>
                        ))
                    }
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
  
  }