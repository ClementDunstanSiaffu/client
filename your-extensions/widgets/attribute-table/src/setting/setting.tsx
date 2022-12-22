/** @jsx jsx */
import { React, jsx } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";
import {MapWidgetSelector, SettingSection} from "jimu-ui/advanced/setting-components";

export default class Setting extends React.PureComponent<AllWidgetSettingProps<any>, any> {
  constructor (props) {
    super(props)

    this.setUseMapWidgetIds = this.setUseMapWidgetIds.bind(this);
    this.saveState = this.saveState.bind(this);
  }
  setUseMapWidgetIds(useMapWidgetIds: string[]){
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds
    });
  }

  saveState(key,value){
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set(key, value)
    });
  }

  render() {
    return (
        <div className="widget-setting-attribute-table">
          <SettingSection title={"Source"}>
            <MapWidgetSelector useMapWidgetIds={this.props.useMapWidgetIds} onSelect={this.setUseMapWidgetIds} />
          </SettingSection>
        </div>
    );
  }
}

