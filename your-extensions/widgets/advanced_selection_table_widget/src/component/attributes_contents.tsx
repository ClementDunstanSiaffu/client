
import {React,jsx} from 'jimu-core';
import Container from '../assets/css/style';
import '../assets/css/style.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LayersTable from './layer_table';
import PopupTemplate from 'esri/PopupTemplate'
import {popupContentType} from '../interface/interface'
import helper from '../helper/helper';


type attributeContentsType = {
    attributes:any[],
    layerTitle:string,
    component_type:string,
    parent:LayersTable,

}

export default class AttributesContents extends React.PureComponent<attributeContentsType,any>{

    backToTableContents = ()=>{
        const self = this.props.parent;
        self?.setState({ component_type:"LAYERS_CONTENTS",selectedAttributes:[]})
    }

    openPopup = (attribute:any)=>{
        const self = this.props.parent;
        const title = this.props.layerTitle;
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
        const popupContents = {title:title,contents:contents}
        self?.props.openPopUp(popupContents)
    }

    render(): React.ReactNode {
        if (this.props.component_type === "ATTRIBUTE_CONTENTS"){
            return(
                <>
                    <Container  width="100%" style = {{paddingLeft:20}}>
                        <div className = "layer-content-container">
                            <div className='check-box-container' onClick={this.backToTableContents}>
                                <ArrowBackIcon />
                            </div>
                            <div className='layer-title'>
                                {this.props.layerTitle}
                            </div>
                        </div>
                        <Container style = {{marginTop:20}}  height={450} width = {"100%"} overflow = "auto">
                            {
                                this.props.attributes.map((attribute,k)=>{
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
                                                {this.props.layerTitle}:{attributeName}
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