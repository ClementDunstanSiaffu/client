
import {defaultParemeters} from './toCsv/default_data'
import {getCsvUri} from './toCsv/csvUri';
import { getJsonUri } from './jsonUri/jsonUri';
import AdvancedSelectionTable from '../runtime/widget';

const {separator,filename,uFEFF,asyncOnClick,enclosingCharacter} = defaultParemeters;

export const getUri = ((
    data:any, 
    exportType = "json",
    self:AdvancedSelectionTable,
    status="export",
    uFEFFValue=uFEFF , 
    headers?:any[], 
    separatorValue = separator, 
    enclosingCharacterValue = enclosingCharacter,
) => {
    let currentUrl = getJsonUri(data,self)
    if (exportType === "csv"){
        currentUrl = getCsvUri(data,self,status)
    }
    return currentUrl;
});