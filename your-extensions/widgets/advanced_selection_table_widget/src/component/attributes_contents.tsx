
import {React,jsx,appActions} from 'jimu-core';
import Container from '../assets/css/style';
import '../assets/css/style.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import helper from '../helper/helper';
import { AdvancedSelectionTableContext } from '../context/context';
import AdvancedSelectionTable from '../runtime/widget';

export default class AttributesContents extends React.PureComponent<any,any>{

    static contextType?: React.Context<any> = AdvancedSelectionTableContext;
    highlightSelect = null;

    backToTableContents = ()=>{
        const advancedSelectionTable = this.context?.parent;
        advancedSelectionTable.setState({ component_type:"LAYERS_CONTENTS",selectedAttributes:[]})
    }

    openPopup = (attribute:any)=>{
        const advancedSelectionTable = this.context?.parent;
        const title = this.context?.layerTitle;
        let contents = " ";
        let openDivTag = "<div>"
        const attributKeysArray = helper.getAttributeKeyArray(attribute);
        attributKeysArray.map((attributeKey,k)=>{
            openDivTag += 
                `<div class = "attribute-container">
                    <span class = "attribute-key">${attributeKey}<span> : <span class = "attribute-value">${attribute[attributeKey]}<span>
                </div>`
        })
        contents = openDivTag + "</div>"
        const popupContents = {title:title,contents:contents};
        advancedSelectionTable?.setState({popup:true},()=>{
            advancedSelectionTable?.openPopup(popupContents);
        });
        this.highlightItem(attribute)
    }

    highlightItem = (attributes)=>{
        const id = this.context?.layerId;
        const layerView = helper.getJimuLayerView(id);
        const activeView = AdvancedSelectionTable.activeView;
        const firstItem = Object.keys(attributes)
        // layerView?.highLightHandle(firstItem[0])
        console.log(  layerView)


        // layerView.highlightFeatureLayer = firstItem[0];
        // console.log(layerView?.highlightFeatureLayer,layerView?.view?._highlightIds?.highlight,"check layerView")
        // layerView?.view?._highlightIds?.highlight(firstItem[0])
        // const layerId = helper.getLayerId(id);
        // const activeView = AdvancedSelectionTable.activeView;
        // if (typeof(layerId) === "number" && !isNaN(layerId) && layerId !== -1){
        //     if (activeView){
        //         const view = activeView.view;
        //         const layer = view?.map?.layers.getItemAt(layerId);
        //         console.log(layer,"check the layer")
        //         view.whenLayerView(layer).then((layerView)=>{
        //             if (this.highlightSelect){
        //                 this.highlightSelect.remove();
        //             }
        //             const firstItem = Object.keys(attributes)
        //             console.log(layerView?.highlight,layerId,"check highlight")
        //             // this.highlightSelect = layerView.highlight(firstItem);
        //         })
                
        //     }
           
        // }
    }

    render(): React.ReactNode {
        const attributes = this.context?.selectedAttributes;
        if (this.context?.component_type === "ATTRIBUTE_CONTENTS"){
            return(
                <>
                    <Container  width="100%" style = {{paddingLeft:20}}>
                        <div className = "layer-content-container">
                            <div className='check-box-container' onClick={this.backToTableContents}>
                                <ArrowBackIcon />
                            </div>
                            <div className='layer-title'>
                                {this.context?.layerTitle}
                            </div>
                        </div>
                        <Container style = {{marginTop:20}}  height={450} width = {"100%"} overflow = "auto">
                            {
                                attributes?.map((attribute:any,k:number)=>{
                                    let attributeName = k;
                                    if (attribute && Object.keys(attribute).length > 0){
                                        attributeName = attribute[Object.keys(attribute)[0]];
                                    }
                                    return(
                                        <div 
                                            key = {k} 
                                            className = "attribute-contents-container" 
                                            onClick = {()=>this.openPopup(attribute)}
                                        >
                                            <div className='check-box-container'>
                                                <Container 
                                                    width={50} 
                                                    height = {2} 
                                                    borderBottomColor = "purple" 
                                                    borderBottomWidth={1}
                                                    style = {{marginRight:10}}
                                                >
                                                </Container>
                                            </div>
                                            <div className='flex-auto'>
                                                {this.context?.layerTitle}:{attributeName}
                                            </div>
                                      </div>
                                    )
                                })
                            }
                        </Container>
                    </Container>
                </>
            ) 
        }
        return null;       
    }
}