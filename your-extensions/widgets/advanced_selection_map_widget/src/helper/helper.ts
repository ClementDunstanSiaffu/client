
type selectedLayerType = {
    id:string,
    attributes:any[]
}

class Helper {

    getSelectedContentsLayer =(results:any,checkedLayers:string[]):selectedLayerType[]=>{
        let selectedLayersArray = [];
        if (results?.length > 0){
            selectedLayersArray = results.reduce((newArray,items:any[])=>{
                if (items?.length > 0){
                    let selectedLayerContents = {};
                    let currentLayerId = items[0]?.layer?.id;
                    if (checkedLayers.indexOf(currentLayerId) !== -1){
                        selectedLayerContents["id"] = items[0]?.layer?.id;
                        selectedLayerContents["attributes"] = this.getAttributes(items);
                        newArray.push(selectedLayerContents)
                    }
                }
                return newArray;
            },[])
        }
        return selectedLayersArray;
    }

    getAttributes = (items:any[]):any[]=>{
        const attributesArray = items.reduce((newArray,item)=>{
            if (item?.attributes){
                newArray.push(item.attributes)
            }
            return newArray;
        },[])
        return attributesArray;
    }

    getNumberOfAttributes = (layersContents:{id:string,attributes:any[]}[])=>{
        let layerContentsObject = {};
         for (let i=0;i < layersContents.length;i++){
             layerContentsObject = {...layerContentsObject,[layersContents[i]?.id]:layersContents[i]?.attributes?.length??0}
         }
        return layerContentsObject;
    }

    // getClickedLayerId = (results:any[]):string[]=>{
    //     let clickedLayerIdArr = [];
    //     if (results.length > 0){
    //         clickedLayerIdArr = results.reduce((newArr,item):string[]=>{
    //             let layerId = item?.graphic?.layer?.id;
    //             if (layerId){
    //                 newArr = [...newArr,layerId];
    //             }
    //             return newArr
    //         },[])
    //     }
    //     return clickedLayerIdArr;
    // }

    // checkClickedLayerOnSelectedLayer = (clickedLayerId:string[],selectedLayers:selectedLayerType[])=>{
    //     let status = false;
    //     let index = -1;
    //     for (let i=0;i < clickedLayerId.length;i++){
    //         index = selectedLayers.findIndex((item)=>item.id === clickedLayerId[i]);
    //         if (index != -1){
    //             return true;
    //         }
    //     }
    //     return status;
    // }

    getClickedLayerStatus = (results:any[],selectedLayer:selectedLayerType[]):boolean=>{
        let status = false;
        let index = -1;
        if (results?.length > 0 && selectedLayer?.length > 0){
            for (let i = 0;i < results.length;i++){
                let layerId = results[i]?.graphic?.layer?.id;
                index = selectedLayer.findIndex((item)=>item.id === layerId);
                if (index != -1){
                    return true;
                }
            }
        }
        return status;
    }

  
}

export default new Helper();