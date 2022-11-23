
import {React,jsx,AllWidgetProps} from 'jimu-core'
import { JimuMapViewComponent,JimuMapView } from 'jimu-arcgis'
import Point from 'esri/geometry/Point';

export default class Widget extends React.PureComponent<AllWidgetProps<any>,any>{

    state = {activeMapView:null,latitude:"",longitude:""};

    onActiveMapSelected = (jmv:JimuMapView)=>{
        if(jmv){
            this.setState({activeMapView:jmv});
            jmv.view.on("pointer-move",(evt)=>{
                const point:Point = this.state.activeMapView?.view?.toMap({
                    x:evt.x,
                    y:evt.y
                })
                this.setState({
                    latitude:point.latitude.toFixed(3),
                    longitude:point.longitude.toFixed(3)
                })
            })
        }
    }

    render(): React.ReactNode {
        return(
            <>
                {
                    this.props?.useMapWidgetIds?.length > 0 &&
                    <JimuMapViewComponent 
                        useMapWidgetId={this.props.useMapWidgetIds[0]}
                        onActiveViewChange = {this.onActiveMapSelected}
                    />
                }
                <p>Lat/long :{this.state.latitude} {this.state.longitude}</p>
            </>
        )
    }
}