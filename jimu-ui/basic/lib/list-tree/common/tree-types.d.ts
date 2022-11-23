/// <reference types="react" />
import { React } from 'jimu-core';
import { IconComponentProps } from 'jimu-ui';
import { _Tree } from '../tree';
import { _TreeItem } from './tree-item';
import { TreeMain } from './tree-main';
export declare enum TreeType {
    Typical = "TYPICAL",
    Intact = "INTACT"
}
export declare enum TreeCollapseStyle {
    PlusMinus = "PLUS_MINUS",
    Arrow = "ARROW"
}
/**
 * TreeItemInRelationType: tree item with tree relationship data
 * - tree item array in bottom-up order: treeItemJsons, e.g. [tree item, parent item, parent of parent item, ... top parent item]
 * - level(depth) of the tree item: treeItemJsons.length, e.g. [tree item, parent item, top parent item].length => depth: 3
 * - for List, the level(depth) of the tree item is 1 and the tree item itself is an array of tree items(i.e. list items)
 */
export declare type TreeItemInRelationType = TreeItemType[];
/**
 * TreeItemsType: tree item array for a group of sibling tree items: treeItems, e.g. [sibling tree item 1, sibling tree item 2, sibling tree item 3]
 */
export declare type TreeItemsType = TreeItemType[];
export interface CommandActionDataType {
    event: React.SyntheticEvent;
    data?: any;
    command: CommandType;
    itemCommands: CommandType[];
}
export interface CommandType {
    /**
     * Id that can be used to identify the command item
     */
    key?: any;
    /**
     * Label of the command item
     */
    label?: string;
    /**
     * Whether the command item is collapsed
     */
    collapsed?: boolean;
    /**
     * Whether the command item is only displayed when hovering mouse on it
     */
    onlyShowOnHover?: boolean;
    /**
     * Icon of the command item
     */
    iconProps?: IconComponentProps | (() => IconComponentProps);
    /**
     * Callback fired when the command is executed
     */
    action?: (actionData: CommandActionDataType) => void;
}
/**
 * Layout and content data to be used for tree item renderer
 */
export interface TreeItemBlockInfoType {
    name: TreeItemActionType;
    [configKey: string]: any;
    children?: TreeItemBlockInfoType[];
}
export interface TreeItemType {
    /**
     * Id that can be used to identify the item
     */
    itemKey: string;
    /**
     * Array that includes of all child items
     */
    itemChildren?: TreeItemsType;
    /**
     * Whether the item is disabled
     */
    itemStateDisabled?: boolean;
    /**
     * Whether the children is expanded
     */
    itemStateExpanded?: boolean;
    /**
     * Whether the item is checked
     * Only valid when showCheckbox is true.
     */
    itemStateChecked?: boolean;
    /**
     * If `true`, the checkbox is indeterminate, regardless of `itemStateChecked`.
     * Only valid when showCheckbox is true.
     */
    indeterminate?: boolean;
    /**
     * If `true`, the checkbox is disabled, the state is always 'Unchecked'.
     * Only valid when showCheckbox is true.
     */
    isCheckboxDisabled?: boolean;
    /**
     * The text currently being edited
     */
    itemStateEditingText?: string;
    /**
     * Whether the detail content is displayed
     */
    itemStateDetailVisible?: boolean;
    /**
     * Detail content of the item
     */
    itemStateDetailContent?: any;
    /**
     * Icon of the item
     */
    itemStateIcon?: IconComponentProps | (() => IconComponentProps);
    /**
     * Title of the item
     */
    itemStateTitle?: string;
    /**
     * Array that includes the commands can be executed for the item
     */
    itemStateCommands?: CommandType[];
}
export interface TreeActionDataType {
    [key: string]: any;
}
export declare type AcceptedTreeActionType = TreeActionType | TreeMainActionType | TreeItemActionType;
export declare enum TreeActionType {
    RenderOverride = "renderOverride"
}
export declare enum TreeMainActionType {
    RenderOverrideMain = "renderOverrideMain"
}
export declare enum TreeItemActionType {
    RenderOverrideItemChildrenToggle = "renderOverrideItemChildrenToggle",
    RenderOverrideItemDragHandle = "renderOverrideItemDragHandle",
    RenderOverrideItemDetailToggle = "renderOverrideItemDetailToggle",
    RenderOverrideItemIcon = "renderOverrideItemIcon",
    RenderOverrideItemTitle = "renderOverrideItemTitle",
    RenderOverrideItemCommands = "renderOverrideItemCommands",
    RenderOverrideItemDraggableContainer = "renderOverrideItemDraggableContainer",
    RenderOverrideItemMainLine = "renderOverrideItemMainLine",
    RenderOverrideItemDetailLine = "renderOverrideItemDetailLine",
    RenderOverrideItemBody = "renderOverrideItemBody",
    RenderOverrideItemContent = "renderOverrideItemContent",
    RenderOverrideItemDroppableContainer = "renderOverrideItemDroppableContainer",
    RenderOverrideItemSubitems = "renderOverrideItemSubitems",
    RenderOverrideItem = "renderOverrideItem",
    OverrideItemBlockInfo = "overrideItemBlockInfo",
    HandleInitTreeItemDndDropZone = "handleInitTreeItemDndDropZone",
    HandleInitTreeItemDndDrag = "handleInitTreeItemDndDrag",
    HandleDidDrop = "handleDidDrop",
    HandleDisabledItemRemoved = "handleDisabledItemRemoved",
    HandleToggleDetail = "handleToggleDetail",
    HandleExpandItem = "handleExpandItem",
    HandleEditingTextChange = "handleEditingTextChange",
    HandleExitEditing = "handleExitEditing",
    HandleStartEditing = "handleStartEditing",
    HandleCheckboxChanged = "handleCheckboxChanged",
    HandleFindSearchText = "handleFindSearchText",
    IsItemDisplayable = "isItemDisplayable",
    IsItemFocused = "isItemFocused",
    HandleClickItemBody = "handleClickItemBody",
    HandleClickItemTitle = "handleClickItemTitle",
    HandleDoubleClickItemTitle = "handleDoubleClickItemTitle",
    HandleUpdateItem = "handleUpdateItem",
    GetDragItemJsons = "getDragItemJsons",
    SetDragItemJsons = "setDragItemJsons",
    HandleFocusItem = "handleFocusItem",
    IsItemDroppable = "isItemDroppable",
    IsFolder = "isFolder",
    OnToggleDetail = "onToggleDetail",
    OnExpandItem = "onExpandItem",
    OnEditingTextChange = "onEditingTextChange",
    OnExitEditing = "onExitEditing",
    OnDidDrop = "onDidDrop",
    OnClickItemBody = "onClickItemBody",
    OnDoubleClickItemTitle = "onDoubleClickItemTitle",
    OnClickItemCommand = "onClickItemCommand",
    OnUpdateItem = "onUpdateItem"
}
export interface TreeCheckDropItemActionDataType {
    draggingItemJsons: TreeItemInRelationType;
    targetItemJsons: TreeItemInRelationType;
}
export interface TreeCheckFocusItemDataType {
    focusItemJsons: TreeItemInRelationType;
}
export interface TreeEditingItemDataType {
    itemStateEditingText: string;
}
export interface TreeCheckedItemDataType {
    itemStateEditingText: string;
}
export interface TreeDropItemActionDataType {
    dropType: string;
    dragItem: TreeDragItemActionDataType;
}
export interface TreeInitDndActionDataType {
    type: 'mount' | 'unmount';
}
export interface TreeRenderOverrideItemDataType {
    currentBlockInfo: TreeItemBlockInfoType;
}
export interface TreeOverrideItemBlockInfoActionDataType {
    itemBlockInfo: TreeItemBlockInfoType;
}
export interface TreeToggleItemDetailActionDataType {
    itemStateDetailVisible: boolean;
}
export interface TreeExpandItemActionDataType {
    itemStateExpanded: boolean;
}
export interface TreeDragItemActionDataType {
    itemJsons?: TreeItemInRelationType;
    dragEvent: any;
    type?: string;
}
export interface UpdateTreeActionDataType extends TreeActionDataType {
    updateType: AcceptedTreeActionType;
}
/**
 * Component managed render functions, can be overriden for customized render logic
 */
export interface TreeItemRenderActionMapType {
    renderOverrideItemDraggableContainer?: (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => any;
    renderOverrideItemDroppableContainer?: (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => any;
    renderOverrideItemChildrenToggle?: (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => any;
    renderOverrideItemDragHandle?: (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => any;
    renderOverrideItemDetailToggle?: (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => any;
    renderOverrideItemIcon?: (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => any;
    renderOverrideItemTitle?: (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => any;
    renderOverrideItemCommands?: (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => any;
    renderOverrideItemMainLine?: (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => any;
    renderOverrideItemDetailLine?: (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => any;
    renderOverrideItemBody?: (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => any;
    renderOverrideItemContent?: (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => any;
    renderOverrideItemSubitems?: (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => any;
    renderOverrideItem?: (actionData: TreeRenderOverrideItemDataType, refComponent: _TreeItem) => any;
}
export interface TreeMainRenderActionMapType {
    renderOverrideMain?: (actionData: TreeActionDataType, refComponent: TreeMain) => any;
}
export interface TreeRenderActionMapType {
    renderOverride?: (actionData: TreeActionDataType, refComponent: _Tree) => any;
}
/**
 * Component managed interal logic functions, can be overriden for customized logic
 */
export interface TreeItemInternalActionMapType {
    /**
     * Fired when getting the block layout info
     */
    overrideItemBlockInfo?: (actionData: TreeOverrideItemBlockInfoActionDataType, refComponent: _TreeItem) => TreeItemBlockInfoType;
    /**
     * Fired when adding or removing dnd features into the component
     */
    handleInitTreeItemDndDropZone?: (actionData: TreeInitDndActionDataType, refComponent: _TreeItem) => void;
    handleInitTreeItemDndDrag?: (actionData: TreeInitDndActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when dropping a dragging item
     */
    handleDidDrop?: (actionData: TreeDropItemActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when checking if the disabled item supports to be removed
     */
    handleDisabledItemRemoved?: (actionData: any, refComponent: _TreeItem) => void;
    /**
     * Fired when detail content is toggling for display
     */
    handleToggleDetail?: (actionData: TreeToggleItemDetailActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when expanding or unexpanding the children
     */
    handleExpandItem?: (actionData: TreeExpandItemActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when changing the editing text of item title
     */
    handleEditingTextChange?: (actionData: TreeEditingItemDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when exiting the editing text mode
     */
    handleExitEditing?: (actionData: TreeEditingItemDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when starting to edit text of item title
     */
    handleStartEditing?: (actionData: TreeEditingItemDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when searching for filter text
     */
    handleFindSearchText?: (actionData: TreeActionDataType, refComponent: _TreeItem) => any;
    /**
     * Fired when checking if the item should be displayed
     */
    isItemDisplayable?: (actionData: TreeActionDataType, refComponent: _TreeItem) => boolean;
    /**
     * Fired when checking if the item is focused
     */
    isItemFocused?: (actionData: TreeCheckFocusItemDataType, refComponent: _TreeItem) => boolean;
    /**
     * Fired when clicking the item body
     */
    handleClickItemBody?: (actionData: TreeActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when clicking the item title
     */
    handleClickItemTitle?: (actionData: TreeActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when double-clicking the item title
     */
    handleDoubleClickItemTitle?: (actionData: TreeActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when the check state of the item is changed
     */
    handleCheckboxChanged?: (actionData: TreeActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when item json is changed
     */
    handleUpdateItem?: (actionData: UpdateTreeActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when getting current drag item data
     */
    getDragItemJsons?: (actionData: TreeDragItemActionDataType, refComponent: _TreeItem) => TreeDragItemActionDataType;
    /**
     * Fired when setting current drag item data
     */
    setDragItemJsons?: (actionData: TreeDragItemActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when setting the item focused
     */
    handleFocusItem?: (actionData: TreeActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when checking if the dragging item can be dropped into the current item.
     * The drop-into action could by triggered by one of the following ways:
     * `to-inside` to current item directly.
     * `to-up` or `to-bottom` to any child inside the current item.
     */
    isItemDroppable?: (actionData: TreeCheckDropItemActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when checking if the current is a folder item
     * disable checkbox if current item is in the root and has no children.
     */
    isFolder?: (actionData: TreeCheckDropItemActionDataType, refComponent: _TreeItem) => void;
}
export interface TreeItemExternalActionMapType {
    /**
     * Fired when a dragging item is dropped
     */
    onDidDrop?: (actionData: TreeDropItemActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when detail content is toggled for display
     */
    onToggleDetail?: (actionData: TreeToggleItemDetailActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when children is expanded or unexpanded
     */
    onExpandItem?: (actionData: TreeExpandItemActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when the editing text of item title is changed
     */
    onEditingTextChange?: (actionData: TreeEditingItemDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when the editing text mode is exited
     */
    onExitEditing?: (actionData: TreeEditingItemDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when the item body is clicked
     */
    onClickItemBody?: (actionData: TreeActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when the item title is double-clicked
     */
    onDoubleClickItemTitle?: (actionData: TreeActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when any command item is clicked
     */
    onClickItemCommand?: (actionData: CommandActionDataType, refComponent: _TreeItem) => void;
    /**
     * Fired when the item is updated
     */
    onUpdateItem?: (actionData: UpdateTreeActionDataType, refComponent: _TreeItem) => void;
}
export interface TreeItemActionMapType extends TreeItemRenderActionMapType, TreeItemInternalActionMapType, TreeItemExternalActionMapType {
}
export interface TreeMainActionMapType extends TreeItemActionMapType, TreeMainRenderActionMapType {
}
export interface TreeActionMapType extends TreeMainActionMapType, TreeRenderActionMapType {
}
/**
 * The base tree/list component props
 */
export interface BaseTreeListProps extends TreeItemActionMapType {
    /**
     * ForwardRef to component outer div
     */
    forwardRef?: (ref: any) => void;
    /**
     * Defines the size of the Tree item. The value will be 'default' when it is undefined.
     * @default default
     */
    size?: 'default' | 'sm' | 'lg';
    /**
     * Add class name to the component
     */
    className?: string;
    /**
     * A component or tag name to render the component's top level node
     */
    topTag?: React.ComponentType<any> | string;
    /**
     * Whether to support drag-and-drop feature
     */
    dndEnabled?: boolean;
    /**
     * Whether to show checkbox for every item
     * @default false
     */
    showCheckbox?: boolean;
    /**
     * Whether to disable doubleClick on title to enter edit mode
     * @default false
    */
    disableDoubleClickTitle?: boolean;
    /**
     * Whether to show remove icon for disabled item.
     * @default false
     */
    showRemoveIconForDisabledItem?: boolean;
}
