import { IItem } from '@esri/arcgis-rest-types';
export interface Utility {
    utilityId: string;
    url: string;
    itemInfo?: IItem;
    tasks?: string[];
}
