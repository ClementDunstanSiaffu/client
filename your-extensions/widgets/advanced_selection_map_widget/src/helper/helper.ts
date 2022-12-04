type selectedLayerType = {
    id:string,
    attributes:any[]
}

class Helper {

    getSelectedContentsLayer =(results:any):selectedLayerType[]=>{
        let selectedLayersArray = [];
        if (results?.length > 0){
            selectedLayersArray = results.reduce((newArray,items:any[])=>{
                if (items?.length > 0){
                    let selectedLayerContents = {};
                    selectedLayerContents["id"] = items[0]?.layer?.id;
                    selectedLayerContents["attributes"] = this.getAttributes(items);
                    newArray.push(selectedLayerContents)
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


}

export default new Helper();