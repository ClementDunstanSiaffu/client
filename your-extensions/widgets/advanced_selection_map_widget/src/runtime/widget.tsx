
import {React,jsx,AllWidgetProps,appActions} from 'jimu-core'
import { JimuMapViewComponent,JimuMapView } from 'jimu-arcgis'

export default class MapViewWidget extends React.PureComponent<AllWidgetProps<any>,any>{

    state = {layers:[]};

    getMapLayers = (activeView:JimuMapView)=>{
        const newLayersArray = Object.keys(activeView?.jimuLayerViews).reduce((newLayerArray,item)=>{
                                    const object = {};
                                    object.layerName = item;
                                    object.layerId = activeView?.jimuLayerViews[item]["jimuLayerId"];
                                    newLayerArray.push(object);
                                    return newLayerArray;
                                },[])
        console.log(newLayersArray);
        this.props.dispatch(appActions.widgetStatePropChange("value","layers",newLayersArray))
    }

    render(): React.ReactNode {
        return(
            <div className="widget-starter jimu-widget">
                {
                    this.props?.useMapWidgetIds?.length > 0 &&
                    <JimuMapViewComponent 
                        useMapWidgetId={this.props.useMapWidgetIds[0]}
                        onActiveViewChange = {this.getMapLayers}
                    />
                }
            </div>
        )
    }
}