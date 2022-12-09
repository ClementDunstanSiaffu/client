
import {defaultParemeters} from './toCsv/default_data'
import {getCsvUri} from './toCsv/csvUri';
import { getJsonUri } from './jsonUri/jsonUri';

const {separator,filename,uFEFF,asyncOnClick,enclosingCharacter} = defaultParemeters;

export const getUri = ((
    data:any, 
    exportType = "json",
    uFEFFValue=uFEFF , 
    headers?:any[], 
    separatorValue = separator, 
    enclosingCharacterValue = enclosingCharacter,
) => {
    let currentUrl = getJsonUri(data)
    if (exportType === "csv"){
        currentUrl = getCsvUri(data)
    }
    return currentUrl;
});