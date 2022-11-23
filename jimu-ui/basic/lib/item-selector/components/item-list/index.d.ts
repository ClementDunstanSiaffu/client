/// <reference types="react" />
/** @jsx jsx */
import { React, jsx, ThemeVariables, IntlShape, ImmutableArray } from 'jimu-core';
import { TargetType } from 'jimu-ui';
import { ISearchOptions } from '@esri/arcgis-rest-portal';
import { ItemTypes, ItemCategory, SortField, SortOrder, IItemWithPortalUrl, ItemSelectorMode } from '../../types';
/**
 * The ItemList props.
 */
export interface ItemListProps {
    /**
     * Portal url.
     */
    portalUrl: string;
    /**
     * Item types.
     */
    itemType: ItemTypes | ImmutableArray<ItemTypes>;
    /**
     * @default ItemSelectorMode.All
     */
    mode?: ItemSelectorMode;
    /**
     * Sort field.
     */
    sortField?: SortField;
    /**
     * Sort order.
     */
    sortOrder?: SortOrder;
    /**
     * Selected item ids.
     */
    selectedItems?: ImmutableArray<string>;
    /**
     * One item may contain multiple layers, item ids in the array mean that some of layers in the item are selected.
     * @ignore
     */
    partSelectedItems?: ImmutableArray<string>;
    /**
     * If true, will save the selected items on mount and won't allow to remove these selected items.
     * @ignore
     */
    disableRemoveItemsSelectedOnMount?: boolean;
    /**
     * Will only show items which match the search value.
     */
    searchValue?: string;
    /**
     * Whether or not to support to select multiple items.
     *
     * @default false
     */
    isMultiple?: boolean;
    /**
     * My content, my organization, my group or public.
     */
    category?: ItemCategory;
    /**
     * Only list items in the folder, only works when category is my content,
     * list all items from my content if the value is null or undefined.
     */
    folderId?: string;
    /**
     * Only list items in these groups, only works when category is my group,
     * list all items from all my groups if the value is null or undefined.
     */
    groupId?: string;
    /**
     * In all mode, it is the reference node used to set the position of item detail popper. If do not pass in it, will use root node as the reference.
     * In simple mode, will ignore it.
     */
    detailReference?: TargetType;
    /**
     * Whether or not to hide single layer items.
     * If `itemType` is `Web Map` or `Web Scene`, will ignore it.
     * For example, if `itemType` is `Feature Service` and `hideSingleLayer` is `true`, will hide feature service items which url ends up with layer id.
     *
     * @default false
     */
    hideSingleLayer?: boolean;
    /**
     * Callback when click one item to select it.
     */
    onSelect?: (allSelectedItems: IItemWithPortalUrl[], latestSelectedItem: IItemWithPortalUrl) => void;
    /**
     * Callback when click one item co unselect it.
     */
    onRemove?: (allSelectedItems: IItemWithPortalUrl[], latestRemovedItem: IItemWithPortalUrl) => void;
    /**
     * Callback when click to show/hide item detail.
     * `showDetailItem` is null indicates item detail is hidden.
     */
    afterToggleItemDetail?: (showDetailItem: IItemWithPortalUrl) => void;
    /**
     * @ignore
     */
    className?: string;
}
interface State {
    loaded: boolean;
    items: IItemWithPortalUrl[];
    showDetailItem: IItemWithPortalUrl;
}
interface ExtraProps {
    theme: ThemeVariables;
    intl: IntlShape;
}
export declare class _ItemList extends React.PureComponent<ItemListProps & ExtraProps, State> {
    __unmount: boolean;
    pageStart: number;
    pageSize: number;
    contentNode: HTMLDivElement;
    showDetailItemRef: React.RefObject<HTMLButtonElement>;
    itemCache: IItemWithPortalUrl[];
    detailReference: HTMLDivElement;
    selectedItemsOnMount: ImmutableArray<string>;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: ItemListProps, prevState: State): void;
    componentWillUnmount(): void;
    isItemTypeSame(prevItemType: ItemTypes | ImmutableArray<ItemTypes>, itemType: ItemTypes | ImmutableArray<ItemTypes>): boolean;
    getRealGroupIds(): string[];
    getAllGroupIds(): string[];
    setItems: (type: ItemTypes | ImmutableArray<ItemTypes>, sort: SortField, order: SortOrder, groupIds?: string[], folderId?: string, search?: string, isMore?: boolean) => void;
    getSearchRequestOptions: (type: ItemTypes | ImmutableArray<ItemTypes>, sort: SortField, order: SortOrder, livingAtlasGroupId?: string, groupIds?: string[], folderId?: string, search?: string, isMore?: boolean) => ISearchOptions;
    getPortalUrl: () => string;
    fetchLivingAtlasGroupId: () => Promise<string>;
    getWhetherItemSelected: (item: IItemWithPortalUrl) => boolean;
    getWhetherItemPartSelected: (item: IItemWithPortalUrl) => boolean;
    onScroll: (e: any) => void;
    onToggleDetail: (e: React.MouseEvent<HTMLElement>, item: IItemWithPortalUrl) => void;
    onToggleDetailPage: (e: React.MouseEvent<HTMLElement>) => void;
    onCloseDetailClicked: () => void;
    onAdd: (e: React.MouseEvent<HTMLElement>, item: IItemWithPortalUrl) => Promise<void>;
    onRemove: (e: React.MouseEvent<HTMLElement>, item: IItemWithPortalUrl) => Promise<void>;
    getItemsByIds: (itemIds: ImmutableArray<string>) => Promise<IItemWithPortalUrl[]>;
    showDetailDrillInPage: () => boolean;
    disableRemove: (itemId: string) => boolean;
    render(): jsx.JSX.Element;
}
/**
 * A component to list portal [item](https://developers.arcgis.com/rest/users-groups-and-items/item.htm).
 */
export declare const ItemList: import("@emotion/styled").StyledComponent<Omit<any, "intl"> & {
    forwardedRef?: React.Ref<any>;
} & {
    children?: React.ReactNode;
}, {}, {}>;
export default ItemList;
