/// <reference types="react" />
import { React, FieldSchema, IMFieldSchema, DataSource, ImmutableArray, ImmutableObject, IMThemeVariables, ClauseValuePair, IntlShape } from 'jimu-core';
import { SelectProps, AdvancedSelectItem } from 'jimu-ui';
interface Props {
    intl: IntlShape;
    theme: IMThemeVariables;
    fields: ImmutableObject<{
        [jimuName: string]: FieldSchema;
    }>;
    ds: DataSource;
    placeholder?: string;
    dropdownProps?: SelectProps;
    selectedFields?: ImmutableArray<string>;
    isMultiple?: boolean;
    useMultiDropdownBottomTools?: boolean;
    isSearchInputHidden?: boolean;
    onFieldClick: (clickedFields: IMFieldSchema[]) => void;
}
export default class MultipleDropdownList extends React.PureComponent<Props> {
    dropdownProps: {
        autoWidth: boolean;
    };
    widthForDropdownItem: {
        width: string;
    };
    widthForDropdownItemLabel: {
        width: string;
    };
    onChange: (selectedFieldPairs: ClauseValuePair[]) => void;
    getFields: () => any[];
    getSelectedFields: () => AdvancedSelectItem[];
    getFieldItem: (fieldId: any) => {
        value: any;
        label: string;
        render: () => JSX.Element;
    };
    render(): JSX.Element;
}
export {};
