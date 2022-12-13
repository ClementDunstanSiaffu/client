import AdvancedSelectionTable from "../runtime/widget";


interface layerObject  {
    layerName:string,
    layerId:string,
    keyName:string,
    id:string
}

export interface popupContentType {
    title:string,
    contents:any,
}

export interface contextContents {
    layers:layerObject[],
    layersContents:{id:string,attributes:any[]},
    numberOfAttribute:{[key:string]:number},
    checkedLayers:any,
    openStatistics:boolean,
    selectedAttributes:any[],
    isSelected:boolean,
    layerId:string,
    openOptions:boolean,
    parent:AdvancedSelectionTable
} 

export default layerObject;


