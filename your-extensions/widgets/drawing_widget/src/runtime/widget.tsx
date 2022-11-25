
import {React,jsx,AllWidgetProps,appActions, IMState} from 'jimu-core'
import Sketch from "@arcgis/core/widgets/Sketch";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import DisplayGeometry from '../components/display_geometry';

export default class DrawingWidget extends React.PureComponent<AllWidgetProps<any>&{stateValue:any},any>{
    
    graphicsLayer=null



    constructor(props:AllWidgetProps<any>&{stateValue:any}){
        super(props)
        this.props.dispatch(appActions.widgetStatePropChange(this.props.id,"drawWigetVisibility",true))
        this.state = {displayGeomtry:false,paths:[]}
    }

    static mapExtraStateProps(state:IMState){
        return {stateValue:state.widgetsState};
    }

    _init(){
        this.graphicsLayer = new GraphicsLayer();
        const map = new Map({
            basemap:"topo-vector",
            layers:[this.graphicsLayer],
        })

        const view = new MapView({
            container:"display_map",
            map:map,
            zoom:5,
            center:[90,45],
            
        })

        view.when(()=>{
            const sketch = new Sketch({
                layer:this.graphicsLayer,
                view:view,
                creationMode:"update"
            })
            view.ui.add(sketch,"top-right");
            sketch.on("create",(evt)=>{
                this.props.dispatch(appActions.widgetStatePropChange("id","paths",evt.graphic.geometry?.paths[0]));
                if(evt.state === "complete"){
                    // this.openAnotherWidget(evt.graphic.geometry?.paths)
                }
            })
        })
    }

    openAnotherWidget = (paths:number[])=>{
        this.props.dispatch(appActions.widgetStatePropChange("id","paths",paths[0]));
        this.props.dispatch(appActions.widgetStatePropChange("id","displayGeomtry",true));
        this.setState({
            paths:paths,
            displayGeomtry:true
        })
    }

    componentDidMount(): void {
        this._init();
    }

    render(): React.ReactNode {
        if (!this.props.stateValue?.["id"]?.displayGeomtry){
            return (
                <div 
                    id = "display_map" 
                    style = {{   
                        padding: 0,
                        margin:0,
                        height:900,
                        width: "100%"
                    }}
                >
                </div>
                
            )
        }else{
            return <DisplayGeometry  paths = {this.state.paths[0]} displayGeomtry ={this.state.displayGeomtry} parent = {this}/>
        }
        
  
    }
}