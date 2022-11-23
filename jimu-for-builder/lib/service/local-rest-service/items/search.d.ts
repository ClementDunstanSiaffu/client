import { IItem } from '@esri/arcgis-rest-types';
import { ISearchOptions, SearchQueryBuilder, ISearchResult } from '@esri/arcgis-rest-portal';
import { SearchType } from '../../type';
export declare function searchItems(search: string | ISearchOptions | SearchQueryBuilder, searchType?: SearchType): Promise<ISearchResult<IItem>>;
