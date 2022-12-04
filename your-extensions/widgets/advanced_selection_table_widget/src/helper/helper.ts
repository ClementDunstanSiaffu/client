
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
}

export default new Helper();