
import {React,jsx,AllWidgetProps,appActions,IMState} from 'jimu-core'
import { JimuMapViewComponent,JimuMapView,JimuFeatureLayerView} from 'jimu-arcgis';
import SketchViewModel from "esri/widgets/Sketch/SketchViewModel";
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import geometryEngineAsync from 'esri/geometry/geometryEngineAsync'
import CSVLayer from 'esri/layers/CSVLayer';
import FeatureLayer from 'esri/layers/FeatureLayer'
import helper from '../helper/helper'

type stateValueType = {
    stateValue:any
}

type StateType = {
    layers:any,
    activeView:JimuMapView
}

let  sketchLayer = new GraphicsLayer()

export default class MapViewWidget extends React.PureComponent<AllWidgetProps<any>&stateValueType,StateType>{

    static mapExtraStateProps(state:IMState){
        return {stateValue:state.widgetsState};
    }

    state = {layers:[],activeView:null};
    sketch = null;
    mapLayer = null;
    layer = null;

    getMapLayers = (activeView:JimuMapView)=>{
        const newLayersArray = Object.keys(activeView?.jimuLayerViews).reduce((newLayerArray,item)=>{
            let object = {
                layerName:activeView?.jimuLayerViews[item]?.layer?.title??item,
                layerId:activeView?.jimuLayerViews[item]?.jimuLayerId??" ",
                keyName:item,
                id:activeView?.jimuLayerViews[item]?.layer?.id
            };
            newLayerArray.push(object);
            return newLayerArray;
        },[])
        newLayersArray.reverse()
        this.props.dispatch(appActions.widgetStatePropChange("value","layers",newLayersArray));
        this.setState({activeView:activeView});
        let view = activeView?.view;
        const sketchViewlModel = new SketchViewModel({layer:sketchLayer,view:view})
        this.sketch = sketchViewlModel;

        // this.layer = new FeatureLayer({
        //     source:graphic,
        //     objectIdField: "OBJECTID",
        // })
        // console.log(this.layer,"check layer created")
    }

    selectFeatureLayer = (geometry:any)=>{
        // console.log(geometry,"check geometry")
        // this.state.activeView?.view?.whenLayerView(sketchLayer).then(function(layerView){
        //     console.log(layerView,"layer view")
        //     layerView.watch("updating", function(val){
        //       if(!val){  // wait for the layer view to finish updating
        //         layerView.queryGraphics(geometry).then(function(results){
        //           console.log(results,'check results');  // prints the array of client-side graphics to the console
        //         });
        //       }
        //     });
        //   })
        // let query = this.layer.createQuery();
        // query.returnGeometry = true;
        // query.geometry = geometry;
        // query.outFields = ["*"]
        // const query = {
        //     spatialRelationship: "intersects", // Relationship operation to apply
        //     // geometry: geometry,
        //     outFields: ["*"],
        //     returnGeometry: true
        // }
   
        // if (this.layer){
        //     this.layer?.queryFeatures(query).then((results)=>{
        //         console.log(results,"check results")
        //     }).catch((err)=>{
        //         console.log(err,"check error")
        //     })
        // }
        if (this.state.activeView){
            this.state.activeView?.selectFeaturesByGraphic(geometry,"intersects").then((results)=>{
                const selectedLayersContents = helper.getSelectedContentsLayer(results);
                this.props.dispatch(appActions.widgetStatePropChange("value","layerContents",selectedLayersContents))
            })
            .catch((err)=>{console.log(err,"check err")})

        }
    }

    componentDidUpdate(prevProps: Readonly<AllWidgetProps<any>>, prevState: Readonly<any>, snapshot?: any): void {
        if (this.props?.stateValue["value"]?.sketch && this.props.stateValue["value"]?.geometryType){
            if (this.sketch){
                this.sketch.create(this.props.stateValue["value"]?.geometryType);
                if (this.state.activeView){
                    this.state.activeView.view.map.add(sketchLayer);
                    this.sketch.on("create", async(event) => {
                        if (event?.state === "complete"){
                            // console.log(event?.graphic?.geometry,"check geometry")
                            const geometries = sketchLayer.graphics.map((graphic)=>{
                                return graphic.geometry;
                            })
                            // console.log(geometries,"check geometries")
                            const querySelectedLayer = await geometryEngineAsync.union(geometries.toArray());
                            // this.selectFeatureLayer(querySelectedLayer)
                            this.selectFeatureLayer(event?.graphic)
                        }
                    });
                }
            }
        }
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