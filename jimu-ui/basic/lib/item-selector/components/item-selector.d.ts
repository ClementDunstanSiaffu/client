/// <reference types="react" />
/** @jsx jsx */
import { jsx, React, IntlShape } from 'jimu-core';
import { IGroup } from '@esri/arcgis-rest-portal';
import { ItemListProps } from './item-list';
import { ItemCategory, ItemFolder, SortField, SortOrder, IItemWithPortalUrl } from '../types';
/**
 * The ItemSelector props.
 */
export interface ItemSelectorProps extends Pick<ItemListProps, 'className' | 'mode' | 'portalUrl' | 'itemType' | 'selectedItems' | 'partSelectedItems' | 'hideSingleLayer' | 'isMultiple' | 'detailReference' | 'onSelect' | 'onRemove' | 'afterToggleItemDetail' | 'disableRemoveItemsSelectedOnMount'> {
}
interface ExtraProps {
    /**
     * @ignore
     */
    intl: IntlShape;
}
interface State {
    searchValue: string;
    deferredSearchValue: string;
    selectedCategory: ItemCategory;
    sortField: SortField;
    sortOrder: SortOrder;
    selectedFolder: ItemFolder;
    selectedGroup: IGroup;
    isEnterOrSearchIconClicked: boolean;
    folders: ItemFolder[];
    groups: IGroup[];
    appServices: any;
    onlyShowItemDetail: IItemWithPortalUrl;
}
/**
 * The `ItemSelector` component allows an Experience author to select an AGOL/portal item for widgets. This is usually used in a settings panel.
 *
 * ```ts
 * import { ItemSelector } from 'jimu-ui/basic/item-selector'
 * ```
 */
export declare class _ItemSelector extends React.PureComponent<ItemSelectorProps & ExtraProps, State> {
    __unmount: boolean;
    itemCategory: {
        MY_CONTENT: string;
        MY_GROUP: string;
        MY_ORGANIZATION: string;
        PUBLIC: string;
        LIVING_ATLAS: string;
    };
    sortField: {
        modified: string;
        title: string;
        numViews: string;
    };
    defaultSelectedFolder: ItemFolder;
    rootFolder: ItemFolder;
    defaultFolders: ItemFolder[];
    defaultSelectedGroup: IGroup;
    debounceSetSearchValue: (value: string) => void;
    constructor(props: ItemSelectorProps & ExtraProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    getShouldShowItemCategory(): Partial<ItemCategory>;
    getGroups(): IGroup[];
    getFolders(): Promise<ItemFolder[]>;
    onCategoryChange: (cat: ItemCategory) => void;
    onSearchInputKeyDown: (evt: any) => void;
    enterOrSearchIsClicked: () => void;
    enterOrSearchIsUnclicked: () => void;
    setDebounceSearchValue: (value: string) => void;
    onSearchChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    onSortFieldChange: (e: any) => void;
    onFolderChange: (e: any) => void;
    onGroupChange: (e: any) => void;
    onSortOrderChange: () => void;
    onItemAdded: (allSelectedItems: IItemWithPortalUrl[], latestSelectedItem?: IItemWithPortalUrl) => void;
    onItemRemoved: (allSelectedItems: IItemWithPortalUrl[], latestRemovedItem?: IItemWithPortalUrl) => void;
    afterToggleItemDetail: (item: IItemWithPortalUrl) => void;
    render(): jsx.JSX.Element;
}
/**
 * A component to select portal [item](https://developers.arcgis.com/rest/users-groups-and-items/item.htm).
 */
export declare const ItemSelector: React.FC<import("react-intl").WithIntlProps<ItemSelectorProps>> & {
    WrappedComponent: React.ComponentType<ItemSelectorProps>;
};
export default ItemSelector;
