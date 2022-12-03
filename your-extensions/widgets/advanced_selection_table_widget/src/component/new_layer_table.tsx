
import {React,jsx,AllWidgetProps} from 'jimu-core'
import styled from '@emotion/styled';
import Checkbox from '@mui/material/Checkbox';
import '../assets/style.scss'
import SelectGeometry from './select_geometry';


type StylesType = {
    height?:number|string,
    width?:number|string,
    borderWidth?:number,
    borderColor?:string,
    borderStyle?:string,
    borderBottomWidth?:number,
    borderBottomColor?:string,
    backgroundColor?:string,
    borderRadius?:number,
    overflow?:string
}

const Container = styled.div((props:StylesType)=>({
    width:props?.width??150,
    height:props.height??"auto",
    borderWidth:props.borderWidth??0,
    borderColor:"lightgrey",
    borderStyle:"solid",
    borderBottomWidth:props.borderBottomWidth??0,
    borderBottomColor:props.borderBottomColor??"transparent",
    backgroundColor:props.backgroundColor??"white",
    borderRadius:props.borderRadius??0,
    overflow:props.overflow??"hidden",

}));

interface layerObject {
    layers:{[key:string]:any}
}

type TablePropsType = {
    layers:layerObject[]
}

export default class NewLayerTable extends React.PureComponent<TablePropsType,any>{

    render(): React.ReactNode {
        
        return(
            <Container borderRadius={4} width = {"100%"} backgroundColor = "white">
                <Container height={40} backgroundColor = "black" width={"100%"}>
                  
                </Container>
                {/* <Container 
                    width = {"90%"} 
                    borderBottomColor = "grey" 
                    borderBottomWidth={1} 
                    style = {{position:"absolute",zIndex:10}}
                >
                    <SelectGeometry />
                </Container> */}
                <SelectGeometry />
                <Container height={380} width = {"100%"} overflow = "auto"  style = {{position:"absolute",zIndex:0}}>
                    {
                        this.props.layers.map((layer,k)=>{
                            return(
                                <div key = {`${k}`+layer?.layerName} className = "layer-content-container">
                                    <div className='check-box-container'>
                                        <Checkbox
                                            color="primary"
                                            checked={false}
                                        />
                                    </div>
                                    <div className='layer-name-container'>
                                        {layer?.layerName}
                                    </div>
                                </div>
                            )
                        })
                    }
                </Container>
            </Container>
        )
    }
}