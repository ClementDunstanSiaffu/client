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

    makeLayeInvisible = (clickedLayer:string[],results:any[])=>{
        let index = -1;
        if (results.length > 0){
            for (let i=0;i < results.length;i++){
                let items = results[i];
                if (items.length > 0){
                    for (let j = 0;j < items.length;j++){
                        let layerId = items[0]?.layer?.id;
                        index = clickedLayer.indexOf(layerId);
                        if (index == -1){
                            if (items[j]?.hasOwnProperty("visible")){
                                items[j].visible = false;
                            }
                        }
                    }
                }
            }
        }
    }


}

export default new Helper();