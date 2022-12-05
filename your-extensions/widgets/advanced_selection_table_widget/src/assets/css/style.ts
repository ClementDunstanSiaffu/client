
import styled from '@emotion/styled';

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

export default Container;