
import {React,jsx,appActions} from 'jimu-core'
import 'bootstrap/dist/css/bootstrap.css';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../assets/css/style.scss'
import * as images from '../assets/images';
import DropDown from './common/dropdown';
import { AdvancedSelectionTableContext } from '../context/context';


// const selectionsGeometries = [
//     {
//         label:"Selection by point",
//         value:"point",
//         icon:images.points
//     },
//     {
//         label:"Selection by line",
//         value:"polyline",
//         icon:images.lines
//     },
//     {
//         label:"Selection by polygon",
//         value:"polygon",
//         icon:images.polygon
//     },
//     {
//         label:"Selection by rectangular",
//         value:"rectangle",
//         icon:images.rectangle
//     },
//     {
//         label:"Selection by circle",
//         value:"circle",
//         icon:images.circle
//     },
// ]

export default class SelectGeometry extends React.PureComponent<any,any>{

    static contextType?: React.Context<any> = AdvancedSelectionTableContext;

    onSelectGeometry = (geometryType:any)=>{
        const advancedSelectionTable = this.context?.parent;
        advancedSelectionTable?.startSketching(geometryType);
    }

    nls = (id: string) => {
        const advancedSelectionTable = this.context?.parent;
        return advancedSelectionTable?.nls(id);
    }
    
    render(): React.ReactNode {
        const widthToEM = `${180*0.0625}em`;


        const selectionsGeometries = [
            {
                // label:"Selection by point",
                label:this.nls("_selectByPoint"),
                value:"point",
                icon:images.points
            },
            {
                // label:"Selection by line",
                label:this.nls("_selectionByLine"),
                value:"polyline",
                icon:images.lines
            },
            {
                // label:"Selection by polygon",
                label:this.nls("_selectionByPolygon"),
                value:"polygon",
                icon:images.polygon
            },
            {
                // label:"Selection by rectangular",
                label:this.nls("_selectionByRectangular"),
                value:"rectangle",
                icon:images.rectangle
            },
            {
                // label:"Selection by circle",
                label:this.nls("_selectionByCircle"),
                value:"circle",
                icon:images.circle
            },
        ]

        const selectedGeometryTitle = this.nls("_selectGeometry")

        return <DropDown 
                    items={selectionsGeometries}
                    onClick = {this.onSelectGeometry}
                    dropdownToogleStyle = {{backgroundColor:"green",width:widthToEM,color:"white"}}
                    dropdownTooggleColor = "green"
                    title={selectedGeometryTitle}
                />
            
    }
  
  }
