
import {React,jsx,AllWidgetProps,appActions, DataSourceManager} from 'jimu-core'
import { JimuMapViewComponent,JimuMapView } from 'jimu-arcgis';
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';


export default class MapViewWidget extends React.PureComponent<AllWidgetProps<any>,any>{

    state = {layers:[]};

    getMapLayers = (activeView:JimuMapView)=>{
        let lastView = null;
        const newLayersArray = Object.keys(activeView?.jimuLayerViews).reduce((newLayerArray,item)=>{
                                    let object = {
                                        layerName:activeView?.jimuLayerViews[item]?.layer?.title??item,
                                        layerId:activeView?.jimuLayerViews[item]?.jimuLayerId??" ",
                                        keyName:item
                                    };
                                    newLayerArray.push(object);
                                    lastView = activeView?.jimuLayerViews[item]?.view;
                                    return newLayerArray;
                                },[])
        this.props.dispatch(appActions.widgetStatePropChange("value","layers",newLayersArray));
        const  sketchLayer = new GraphicsLayer()
        const sketchViewlModel = new SketchViewModel({
            layer:sketchLayer,
            view:lastView,
            pointSymbol: {
                type: "simple-marker",
                style: "circle",
                size: 10,
                color: [255, 255, 255, 0.8],
                outline: {
                  color: [211, 132, 80, 0.7],
                }
            },
            polylineSymbol: {
                type: "simple-line",
                color: [211, 132, 80, 0.7],
                width: 6
            },
            polygonSymbol: {
                type: "polygon-3d",
                symbolLayers: [
                  {
                    type: "fill",
                    material: {
                      color: [255, 255, 255, 0.8]
                    },
                    outline: {
                      color: [211, 132, 80, 0.7],
                      size: "10px"
                    }
                  }
                ]
            },
            defaultCreateOptions: { hasZ: false }
        })
        sketchViewlModel.on("create", (event) => {
            console.log("is it called")
            if (event.state === "complete") {
              
            }
        });

        const startSketching = (geometryType:any)=>{
            console.log(sketchViewlModel,geometryType,"check geometry type")
            sketchViewlModel.create(geometryType)
        }
        this.props.dispatch(appActions.widgetStatePropChange("value","sketch",startSketching))
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