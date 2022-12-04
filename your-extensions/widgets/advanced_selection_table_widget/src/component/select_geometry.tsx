
import {React,jsx} from 'jimu-core'
import 'bootstrap/dist/css/bootstrap.css';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import TimelineIcon from '@mui/icons-material/Timeline';
import '../assets/style.scss'

const selectionsGeometries = [
    {
        name:"Selection by point",
        value:"point",
        icon:<TimelineIcon />
    },
    {
        name:"Selection by line",
        value:"polyline",
        icon:<TimelineIcon />
    },
    {
        name:"Selection by polygon",
        value:"polygon",
        icon:<TimelineIcon />
    },
    {
        name:"Selection by rectangular",
        value:"rectangle",
        icon:<TimelineIcon />
    }
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
                    Selection geometry
                </DropdownToggle>
                <DropdownMenu>
                    {
                        selectionsGeometries.map((selectionGeometry,k)=>(
                            <DropdownItem key={k} onClick = {()=>this.onSelectGeometry(selectionGeometry.value)}>
                                {selectionGeometry.name}
                            </DropdownItem>
                        ))
                    }
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
  
  }