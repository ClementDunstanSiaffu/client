
import {React,jsx} from 'jimu-core';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import SelectGeometry from './select_geometry';
import '../assets/style.scss'
import styled from '@emotion/styled';
import LayerContents from './layer_contents';

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


interface EnhancedTableToolbarProps {numSelected: number,sketchGeometry:(geometryType:any)=>void}

class  EnhancedTableToolbar extends React.PureComponent<EnhancedTableToolbarProps,any>{

    render(): React.ReactNode {
        const { numSelected } = this.props;
        
        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                <Typography component="div"><SelectGeometry sketchGeometry = {this.props.sketchGeometry}/></Typography>
            </Toolbar>
        );
    }
  
}

interface layerObject {layers:{[key:string]:any}}

type TablePropsType = {layers:layerObject[],sketchGeometry:(geometryType:any)=>void}

export default class  LayersTable extends React.PureComponent<TablePropsType,any>{

  state = {selected:[],rowsPerPage:5,component_type:"LAYERS_CONTENTS"}

  handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.state.selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      newSelected = newSelected.concat(this.state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.state.selected.slice(0, selectedIndex),
        this.state.selected.slice(selectedIndex + 1),
      );
    }
    this.setState({selected:newSelected});
  };

  handleChangePage = (event: unknown, newPage: number) => {this.setState({page:newPage})};

  handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({rowsPerPage:parseInt(event.target.value, 10),page:0})
  };

  isSelected = (name: string) => this.state.selected.indexOf(name) !== -1;

  render(){
    return (
      <Box sx={{ width: '100%',height:600 }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <LayerContents 
            layers={this.props.layers} 
            sketchGeometry = {this.props.sketchGeometry} 
            component_type = {this.state.component_type}
          />
        </Paper>
      </Box>
    )
  }
}


