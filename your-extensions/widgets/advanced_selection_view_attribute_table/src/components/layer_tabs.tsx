
import {React,jsx} from 'jimu-core';
import {Tab,Tabs} from 'jimu-ui';
import AttributeTable from './attributes_table';
import '../assets/css/style.scss'

type layerTabsPropsType = {
    layers:any[],
    layerContents:{id:string,attributes:[]}[];
}

type layerTabsStateType = {
    selectedAttributes:any[],
    value:string,
    layers:any[],
    layerContentStatus:boolean; 
}

export default class LayerTabs extends React.PureComponent<layerTabsPropsType,layerTabsStateType>{

    state = {selectedAttributes:[],value:" ",layers:[],layerContentStatus:false};

    _onChange = (layerId:string)=>{
        let selectedAttributes = [];
        const layerContents = this.props.layerContents;
        if (layerContents?.length > 0){
            selectedAttributes = layerContents.find((item)=>item?.id === layerId)?.attributes;
        }
        this.setState({selectedAttributes:selectedAttributes,value:layerId});
    }

    componentDidMount = ()=>{
        this.setState({layers:this.props.layers},()=>{
            const layers = this.props.layers;
            const firstLayerId = layers?.length > 0 ? layers[0]?.id:" "
            this._onChange(firstLayerId);

        });
    }

    componentDidUpdate(prevProps: Readonly<layerTabsPropsType>, prevState: Readonly<layerTabsStateType>, snapshot?: any): void {
        if (!this.state.layerContentStatus && this.props.layerContents?.length > 0){
            const layers = this.state.layers;
            const firstLayerId = layers?.length > 0 ? layers[0]?.id:" "
            this.setState({layerContentStatus:true,value:firstLayerId},()=>this._onChange(firstLayerId))
        }
    }

    _onClose = (layerId:string)=>{
        let newLayers = [];
        const currentLayers = this.state.layers;
        if (currentLayers?.length > 0){
            newLayers = currentLayers.reduce((newLayerArr,item)=>{
                if (item?.id !== layerId){
                    newLayerArr.push(item);
                }
                return newLayerArr;
            },[])
        }
        this.setState({layers:newLayers});
    }

    render(): React.ReactNode {
        return(
            <div style={{width:"100%",height:600,overflow:"hidden"}}>
                {
                    this.state.layers?.length > 0 ?
                        <Tabs
                            defaultValue={this.state.value}
                            onChange={this._onChange}
                            onClose={this._onClose}
                            type="underline"
                            scrollable = {true}
                            className = "tab-container"
                        >
                            {
                                this.state.layers.map((item,k)=>{
                                    return (
                                        <Tab 
                                            id={item?.id??k} 
                                            title={item?.layerName??k} 
                                            key = {k} 
                                            style = {{height:60,color:'white',alignItems:"center",display:"flex"}}
                                        >
                                            {/* <AttributeTable selectedAttributes = {this.state.selectedAttributes} /> */}
                                        </Tab>
                                    )
                                })
                            }
                        </Tabs>:
                    null
                }
                <div style = {{width:"100%",height:600,overflow:"auto"}}>
                    <AttributeTable selectedAttributes = {this.state.selectedAttributes} />
                </div>
            </div>    
        )
    }
}