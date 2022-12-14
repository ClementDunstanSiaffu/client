
type layerContentsObjectType = {
    id:string,
    attributes:any[]
}

type selectedLayerType = {
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

    checkIfLayerWasAdded = (layerId:string,mapLayersItems:any[])=>{
        let index = -1;
        let status = false;
        if (mapLayersItems?.length > 0){
            index = mapLayersItems.findIndex((item)=>item?.id === layerId);
            if (index !== -1){
                status = true;
            }
        }
        return status;
    }


    openTableAttribute = ()=>{
        const classnameWhenSideBarClosed = ".app-root-emotion-cache-ltr-1iklx1g";
        const addedClassNameWhenClosed = "app-root-emotion-cache-ltr-oen2ei";
        const addedClassNameWhenOpened = "app-root-emotion-cache-ltr-1iklx1g"
        const ariaExpandedElement = document.querySelector(".sidebar-controller");
        const elementForStyle = document.querySelector(".flex-shrink-0");
        const element = document.querySelector(classnameWhenSideBarClosed);
        element?.classList.remove(addedClassNameWhenOpened);
        element?.classList.add(addedClassNameWhenClosed)
        ariaExpandedElement.ariaExpanded = "true";
        if (elementForStyle.style){
            elementForStyle.style = "z-index: 0; flex-basis: 0px; overflow: auto;"
        }
    }

    // sideBarController = ()=>{
    //     const classnameWhenSideBarClosed = ".app-root-emotion-cache-ltr-1iklx1g";
    //     const classnameWhenSideBarOpened = ".app-root-emotion-cache-ltr-oen2ei";
    //     const addedClassNameWhenClosed = "app-root-emotion-cache-ltr-oen2ei";
    //     const addedClassNameWhenOpened = "app-root-emotion-cache-ltr-1iklx1g"
    //     const ariaExpandedElement = document.querySelector(".sidebar-controller");
    //     const elementForStyle = document.querySelector(".flex-shrink-0");
    //     console.log("initial called",ariaExpandedElement.ariaExpanded)
    //     if(ariaExpandedElement.ariaExpanded === "true"){
    //         const element = document.querySelector(classnameWhenSideBarOpened);
    //         element.classList.remove(addedClassNameWhenClosed);
    //         element.classList.add(addedClassNameWhenOpened)
    //         ariaExpandedElement.ariaExpanded = "false"
    //     }else{
    //         const element = document.querySelector(classnameWhenSideBarClosed);
    //         element?.classList.remove(addedClassNameWhenOpened);
    //         element?.classList.add(addedClassNameWhenClosed)
    //         ariaExpandedElement.ariaExpanded = "true";
    //         if (elementForStyle.style){
    //             elementForStyle.style = "z-index: 0; flex-basis: 0px; overflow: auto;"
    //         }
    //     }
    // }


}







export default new Helper();