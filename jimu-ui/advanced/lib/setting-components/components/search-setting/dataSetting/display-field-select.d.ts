/** @jsx jsx */
import { jsx, FieldSchema, IMFieldSchema, UseDataSource } from 'jimu-core';
interface DisplayFieldProps {
    disPlayField: FieldSchema[];
    useDataSource: UseDataSource;
    onFieldChange: (allSelectedFields: IMFieldSchema[], preFields: any, isDisplayField?: boolean) => void;
}
declare const DisplayFieldSelect: (props: DisplayFieldProps) => jsx.JSX.Element;
export default DisplayFieldSelect;
