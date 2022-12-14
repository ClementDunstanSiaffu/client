
import {React,jsx} from 'jimu-core';
import {Tab,Tabs} from 'jimu-ui';
import AttributeTable from './attributes_table';

type layerTabsPropsType = {
    layers:any[],
    layerContents:{id:string,attributes:[]}[];
}

type layerTabsStateType = {
    selectedAttributes:any[],
    value:string,
    layers:any[] 
}

export default class LayerTabs extends React.PureComponent<layerTabsPropsType,layerTabsStateType>{

    state = {selectedAttributes:[],value:" ",layers:[]};

    _onChange = (layerId:string)=>{
        let selectedAttributes = [];
        const layerContents = this.props.layerContents;
        if (layerContents?.length > 0){
            selectedAttributes = layerContents.find((item)=>item?.id === layerId)?.attributes;
        }
        this.setState({selectedAttributes:selectedAttributes,value:layerId});
    }

    componentDidMount = ()=>{
        this.setState({layers:this.props.layers});
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
            <div style={{width:"100%"}}>
                {
                    this.state.layers?.length > 0 ?
                        <Tabs
                            defaultValue="tab-1"
                            onChange={this._onChange}
                            onClose={this._onClose}
                            type="underline"
                            value={this.state.value}
                        >
                            {
                                this.props.layers.map((item,k)=>{
                                    return (
                                        <Tab id={item?.layerId??k} title={item?.layerName??k} key = {k}>
                                            <AttributeTable selectedAttributes = {this.state.selectedAttributes} />
                                        </Tab>
                                    )
                                })
                            }
                        </Tabs>:
                    null
                }
            </div>    
        )
    }
}