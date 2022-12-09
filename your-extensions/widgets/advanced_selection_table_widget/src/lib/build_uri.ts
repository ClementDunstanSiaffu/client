
import {defaultParemeters} from './toCsv/default_data'
import { toCSV,buildURI} from './toCsv/toCsv';
import { saveJson } from './jsonUri/jsonUri';

const {separator,filename,uFEFF,asyncOnClick,enclosingCharacter} = defaultParemeters;



export const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);


export const url = ((
    data:any, 
    exportType = "json",
    uFEFFValue=uFEFF , 
    headers?:any[], 
    separatorValue = separator, 
    enclosingCharacterValue = enclosingCharacter,
) => {
    let currentUrl = saveJson(data)
    if (exportType === "csv"){
        currentUrl = buildURI(data)
    }
    // let application = 'application/json';
    // let texttype = 'text/json';
    // let exportedData = data;
    // if (exportType === "csv"){
    //     application = 'application/csv';
    //     texttype =  'text/csv';
    //     exportedData = toCSV(data, headers, separatorValue, enclosingCharacterValue);
    // }

    // // const csv = toCSV(data, headers, separatorValue, enclosingCharacterValue);
    // const type = isSafari() ? application : texttype;
    // const blob = new Blob([uFEFFValue ? '\uFEFF' : '', exportedData], { type });
    // const dataURI = `data:${type};charset=utf-8,${uFEFFValue ? '\uFEFF' : ''}${exportedData}`;
    // const URL = window.URL || window.webkitURL;
  
    // return (typeof URL.createObjectURL === 'undefined')
    //   ? dataURI
    //   : URL.createObjectURL(blob);
    return currentUrl;
});