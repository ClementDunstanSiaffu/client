// import { stringify } from 'csv-stringify/sync';

// import { buildURI } from "your-extensions/widgets/advanced_selection_table_widget/src/lib/toCsv/toCsv";

// import { save } from 'save-file'


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

    convertToCsv = async(attributes:any[])=>{
        // buildURI(attributes)
        // let header = " ";
        // let contents = " ";
        // if (attributes.length > 0){
        //     Object.keys(attributes[0])?.map((key)=>header +=key + ",");
        //     attributes.forEach((value)=>{
        //         let valueArray = Object.values(value);
        //         let line = " ";
        //         if (valueArray.length > 0){
        //             valueArray.forEach((val)=>{
        //                 if (line !== " "){
        //                     line += ","
        //                 }
        //                 if (typeof val === "object"){
        //                     line += JSON.stringify(val);
        //                 }else{
        //                     line += val;
        //                 }
        //             })
        //             contents += line + "/r/n";
        //         }
        //     })
        // }
        // const csvString = header + "/r/n" + contents;
        // await save(csvString, 'example.csv')
        // console.log(csvString,"check csv string")
        // return csvString;
    }

    // exportCsv = (csvString:any)=>{
    //     const blob = new Blob([csvString],{type:"type/csv"})
    //     const url = window.URL.createObjectURL(blob);
    //     console.log(url,"check url")
    //     window.URL.revokeObjectURL(url)
    // }

    // convertToCsv = async(attributes:any[])=>{

    //     let data = await this.toString(attributes);
    //     // data = '\ufeff' + data;
    //     console.log(data,"check stringied csv file")
    // }

    // async toString(attributes:any[]) {
    //     return await this.convert(attributes);
    // }

    // async convert(data) {
    //     if (data.length === 0) {
    //       return '';
    //     }
    //     const columnNames = Object.keys(data[0]);
    //     let csvInput = [];
    //     csvInput.push(columnNames);
    //     csvInput.push(
    //       ...data.map(row => columnNames.map(column => row[column])),
    //     );
    //         return JSON.stringify(csvInput)
    //     // return await stringify(csvInput);
    // }

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