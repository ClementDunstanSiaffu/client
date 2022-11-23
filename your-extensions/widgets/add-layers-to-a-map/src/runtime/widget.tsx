
import {React,jsx,AllWidgetProps} from 'jimu-core'
import { JimuMapViewComponent,JimuMapView } from 'jimu-arcgis'
import FeatureLayer from 'esri/layers/FeatureLayer'

export default class AddLayerToAMap extends React.PureComponent<AllWidgetProps<any>,any>{

    state = {activeMapView:null}

    selectActiveMapView = (jmv:JimuMapView)=>{
        if (jmv){
            this.setState({activeMapView:jmv});
        }
    }

    submitForm = (evt)=>{
        evt.preventDefault();
        const layer = new FeatureLayer({url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0"});
        console.log(this.state.activeMapView,layer,"check the map")
        this.state.activeMapView?.view.map.add(layer)
    }

 
    render(): React.ReactNode {
        return (
            <div className="widget-starter jimu-widget">
                {
                    this.props?.useMapWidgetIds?.length > 0 &&
                    <JimuMapViewComponent 
                        useMapWidgetId={this.props.useMapWidgetIds[0]}
                        onActiveViewChange={this.selectActiveMapView}
                    />
                }
                <form onSubmit={this.submitForm}>
                    <div>
                        <button>Add layer</button>
                    </div>
                </form>
            </div>
        )
    }
}