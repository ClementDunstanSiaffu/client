
class Helper {

    openSideBar(checkedLayers:string[],numberOfAttributes:{[id:string]:number}){
        const currentCheckedLayer = checkedLayers ??[];
        const sidebar = document.querySelector(".sidebar-controller");
        if (currentCheckedLayer.length > 0 && Object.keys(numberOfAttributes).length > 0){
             //@ts-ignore
            if(sidebar?.getAttribute("aria-expanded") === "false"){
                //@ts-ignore
                if(sidebar) sidebar.click();
            }
        }
       
        if (currentCheckedLayer.length <= 0){
            if (sidebar){
                if (sidebar.getAttribute("aria-expanded") === "true"){
                    //@ts-ignore
                    sidebar.click();
                }
            }
        }
    }

    hideLayer = (jimuLayerViews:any,id:string)=>{
        const keys = Object.keys(jimuLayerViews);
        if (keys.length > 0){
            keys.forEach((key)=>{
                if (id === jimuLayerViews[key]?.layer?.id){
                    if (jimuLayerViews[key].hasOwnProperty("highLightHandle")){
                        jimuLayerViews[key]?.highLightHandle?.remove()
                    }
                    if(jimuLayerViews[key].layer?.hasOwnProperty("visible")){
                        jimuLayerViews[key].layer.visible = false;
                    }
                    if (jimuLayerViews[key].hasOwnProperty("view")){
                        if (jimuLayerViews[key].view?.hasOwnProperty("visible")){
                            jimuLayerViews[key].view.visible = false;
                        }
                    }
                }
            })
        } 
    }

    getNewNumberOfAttributes = (currentNumberOfAttribute:{[id:string]:number},id:string)=>{
        let copiedNumberOfAttribute = {...currentNumberOfAttribute};
        if (Object.keys(copiedNumberOfAttribute).length > 0 && copiedNumberOfAttribute[id]){
            delete copiedNumberOfAttribute[id];
        }
        return copiedNumberOfAttribute;
    }

    getNewCheckedLayer = (checkedLayers:string[],id:string)=>{
        let newCheckedLayer = checkedLayers;
        if (checkedLayers?.length > 0){
            newCheckedLayer = checkedLayers.reduce((newArray,item)=>{
                if (item !== id){
                    newArray.push(item);
                }
                return newArray;
            },[])
        }
        return newCheckedLayer;
    }

    unhighlightAllLayer = (jimuLayerViews)=>{
        const keys = Object.keys(jimuLayerViews);
        if (keys.length > 0){
            keys.forEach((key)=>{
                jimuLayerViews[key]?.highLightHandle?.remove()
                
            })
        } 
    }

}

export default new Helper();