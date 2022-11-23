/// <reference types="react" />
import { React, ImmutableArray, IntlShape, UseDataSource } from 'jimu-core';
interface Props {
    dsId: string;
    intl: IntlShape;
    widgetId?: string;
    useDataSources?: ImmutableArray<UseDataSource>;
    isMultiple?: boolean;
    onChange?: (useDataSources: UseDataSource[]) => void;
    disableSelection?: boolean;
    disableRemove?: boolean;
    className?: string;
}
export default class DsErrorItem extends React.PureComponent<Props, unknown> {
    getWhetherSelected: () => boolean;
    getUseDs: () => UseDataSource;
    onItemClick: () => void;
    onDsSelected: (selectedDs: UseDataSource) => void;
    onDsRemoved: (removedDs: UseDataSource) => void;
    render(): JSX.Element;
}
export {};
