
type layerContentsObjectType = {
    id:string,
    attributes:any[]
}

class Helper {

    getLayerAttributes = (selectedLayerId:string,layerContents:layerContentsObjectType[]):any[]=>{
        let attributes = [];
        if (layerContents?.length > 0){
            const attributesObject = layerContents.find((layerContent:layerContentsObjectType)=>{
                if (layerContent?.id === selectedLayerId){
                    return layerContent?.attributes;
                }
            })
            attributes = attributesObject?.attributes;
        }
    
        return attributes;
    }

    getAttributeKeyArray = (attributes:any):string[]=>{
        let returnedKeys = [];
        if (attributes && Object.keys(attributes).length > 0){
            returnedKeys = Object.keys(attributes);
        }
        return returnedKeys;
    }

    // getNumberOfAttributes = (layersContents:{id:string,attributes:any[]}[])=>{
    //    let layerContentsObject = {};
    //     for (let i=0;i < layersContents.length;i++){
    //         layerContentsObject = {...layerContentsObject,["id"]:layersContents[i]?.attributes?.length??0}
    //     }
    //    return layerContentsObject;
    // }
}

export default new Helper();