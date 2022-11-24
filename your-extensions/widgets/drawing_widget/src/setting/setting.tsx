
import {React,jsx} from 'jimu-core';
import { AllWidgetSettingProps } from 'jimu-for-builder';


export default class Setting extends React.PureComponent<AllWidgetSettingProps<any>,any>{

    componentDidMount(): void {
        this.props.onSettingChange({
            id:this.props.id,
            useDataSources:[]
        })
    }

    render(): React.ReactNode {
        return null;
    }
}