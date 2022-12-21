
import {React,jsx} from 'jimu-core'
import '../assets/css/style.scss'
import * as images from '../assets/images';
import DropDown from './common/dropdown';
import { AdvancedSelectionTableContext } from '../context/context';

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

        const selectionsGeometries = [
            {
                label:this.nls("selectByPoint"),
                value:"point",
                icon:images.points
            },
            {
                label:this.nls("selectionByLine"),
                value:"polyline",
                icon:images.lines
            },
            {
                label:this.nls("selectionByPolygon"),
                value:"polygon",
                icon:images.polygon
            },
            {
                label:this.nls("selectionByRectangular"),
                value:"rectangle",
                icon:images.rectangle
            },
            {
                label:this.nls("selectionByCircle"),
                value:"circle",
                icon:images.circle
            },
        ]

        const selectedGeometryTitle = this.nls("selectGeometry")

        return <DropDown 
                    items={selectionsGeometries}
                    onClick = {this.onSelectGeometry}
                    dropdownToogleStyle = {{backgroundColor:"green",width:"100%",color:"white"}}
                    dropdownTooggleColor = "green"
                    title={selectedGeometryTitle}
                />
            
    }
  
  }
