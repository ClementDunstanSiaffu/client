
import {React,jsx} from 'jimu-core';
import Container from '../assets/style';
import '../assets/style.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LayersTable from './layer_table';

type attributeContentsType = {
    attributes:any[],
    layerTitle:string,
    component_type:string,
    parent:LayersTable
}

export default class AttributesContents extends React.PureComponent<attributeContentsType,any>{

    backToTableContents = ()=>{
        const self = this.props.parent;
        self?.setState({ component_type:"LAYERS_CONTENTS",selectedAttributes:[]})
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
                            <div 
                                style={{
                                    flex:1,
                                    display:"flex",
                                    justifyContent:"center",
                                    fontWeight:"400",
                                    fontSize:20
                                }} 
                            >
                                {this.props.layerTitle}
                            </div>
                        </div>
                        <Container style = {{marginTop:20}}  height={450} width = {"100%"} overflow = "auto">
                            {
                                this.props.attributes.map((attribute,k)=>{
                                    return(
                                        <div key = {k} className = "layer-content-container">
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
                                            <div className='layer-name-container'>
                                                {this.props.layerTitle}:{k}
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