
import {defaultParemeters} from './default_data'

const {separator,filename,uFEFF,asyncOnClick,enclosingCharacter} = defaultParemeters;

export const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const isJsons = ((array:any[]) => Array.isArray(array) && array.every(
  row => (typeof row === 'object' && !(row instanceof Array))
));

export const isArrays = ((array:any[]) => Array.isArray(array) && array.every(
  row => Array.isArray(row)
));

export const jsonsHeaders = ((array:any) => Array.from(
  array.map(json => Object.keys(json))
    .reduce((a, b) => new Set([...a, ...b]), [])
));

export const jsons2arrays = (jsons:any[], headers?:any) => {
  let currentHeader = jsons?.length > 0 ? [jsons[0]]:[];
  if (headers){
    currentHeader = headers;
  }
  headers = headers || jsonsHeaders(currentHeader);
  let headerLabels = headers;
  let headerKeys = headers;
  if (isJsons(headers)) {
    headerLabels = headers.map((header:any) => header.label);
    headerKeys = headers.map((header:any) => header.key);
  }
  const data = jsons.map((object) => headerKeys.map((header) => getHeaderValue(header, object)));
  return [headerLabels, ...data];
};

export const getHeaderValue = (property:string, obj:any) => {
  const foundValue = property
    .replace(/\[([^\]]+)]/g, ".$1")
    .split(".")
    .reduce(function (o:any, p:string, i:number,arr:string[]) {
      const value = o[p];
      if (value === undefined || value === null) {
        arr.splice(1);
      } else {
        return value;
      }
    }, obj);
  return (foundValue === undefined) ? ((property in obj) ? obj[property] : '') : foundValue;
}

export const elementOrEmpty = (element:any) =>
  (typeof element === 'undefined' || element === null) ? '' : element;

export const joiner = ((data:any, separator = ',', enclosingCharacter = '"') => {
  return data
    .filter(e => e)
    .map(
      row => row
        .map((element) => elementOrEmpty(element))
        .map(column => `${enclosingCharacter}${column}${enclosingCharacter}`)
        .join(separator)
    )
    .join(`\n`);
});

export const arrays2csv = ((data:any[], headers:any[], separator:string, enclosingCharacter:string) =>
  joiner(headers ? [headers, ...data] : data, separator, enclosingCharacter)
);

export const jsons2csv = ((data:any[], headers:any[], separator:string, enclosingCharacter:string) =>
  joiner(jsons2arrays(data, headers), separator, enclosingCharacter)
);

export const string2csv = ((data:string, headers:any[], separator:string, enclosingCharacter?:string) =>
  (headers) ? `${headers.join(separator)}\n${data}` : data.replace(/"/g, '""')
);

export const toCSV = (data:any, headers:any[], separator:string, enclosingCharacter:string) => {
  if (isJsons(data)) return jsons2csv(data, headers, separator, enclosingCharacter);
  if (isArrays(data)) return arrays2csv(data, headers, separator, enclosingCharacter);
  if (typeof data === 'string') return string2csv(data, headers, separator);
  throw new TypeError(`Data should be a "String", "Array of arrays" OR "Array of objects" `);
};




export const buildURI = ((data:any, uFEFFValue=uFEFF , headers?:any[], separatorValue = separator, enclosingCharacterValue = enclosingCharacter) => {
  const csv = toCSV(data, headers, separatorValue, enclosingCharacterValue);
  const type = isSafari() ? 'application/csv' : 'text/csv';
  const blob = new Blob([uFEFFValue ? '\uFEFF' : '', csv], { type });
  const dataURI = `data:${type};charset=utf-8,${uFEFFValue ? '\uFEFF' : ''}${csv}`;
  console.log(dataURI,"check data uri")
  const URL = window.URL || window.webkitURL;

  return (typeof URL.createObjectURL === 'undefined')
    ? dataURI
    : URL.createObjectURL(blob);
});