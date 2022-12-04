
type layerContentsObjectType = {
    id:string,
    attributes:any[]
}

class Helper {

    getLayerAttributes = (selectedLayerId:string,layerContents:layerContentsObjectType[]):any=>{
        const attributesObject = layerContents.find((layerContent:layerContentsObjectType)=>{
            if (layerContent?.id === selectedLayerId){
                return layerContent?.attributes;
            }
            
        })
        return attributesObject?.attributes;
    }
}

export default new Helper();