
import {React,jsx} from 'jimu-core';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import SelectGeometry from './dropdown';
import '../assets/style.scss'
import styled from '@emotion/styled';


type Order = 'asc' | 'desc';

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



interface EnhancedTableProps {
  numSelected: number;
//   onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}


interface EnhancedTableToolbarProps {
  numSelected: number;
  sketchGeometry:(geometryType:any)=>void
}

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

interface layerObject {
    layers:{[key:string]:any}
}

type TablePropsType = {
    layers:layerObject[],
    sketchGeometry:(geometryType:any)=>void
}


export default class  LayersTable extends React.PureComponent<TablePropsType,any>{

  state = {
    order:"asc",
    orderBy:'calories',
    selected:[],
    page:0,
    dense:false,
    rowsPerPage:5
  }

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

  handleChangePage = (event: unknown, newPage: number) => {
    this.setState({page:newPage})
  };

  handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({rowsPerPage:parseInt(event.target.value, 10),page:0})
  };

  handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({dense:event.target.checked})
  };

  isSelected = (name: string) => this.state.selected.indexOf(name) !== -1;

  emptyRows =
    this.state.page > 0 ? Math.max(0, (1 + this.state.page) * this.state.rowsPerPage - this.props.layers.length) : 0;

  render(){
    return (
        <Box sx={{ width: '100%',height:600 }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar 
                numSelected={this.state.selected.length} 
                sketchGeometry = {this.props.sketchGeometry}
            />
            <Container 
                height = {1} 
                width = "96%" 
                borderBottomColor='grey' 
                borderBottomWidth={1}
                style = {{marginLeft:"auto",marginRight:"auto"}}
            >
            </Container>
            <Container width = "96%" style = {{marginLeft:"auto",marginRight:"auto",display:"flex",alignItems:'center'}}>
                <Container>
                    <div>Layers</div>
                </Container>
            </Container>
            <Container height={450} width = {"100%"} overflow = "auto"  style = {{paddingTop:20,paddingBottom:20,marginLeft:"auto",marginRight:"auto"}}>
                    {
                        this.props.layers?.map((layer,k)=>{
                            const isItemSelected = this.isSelected(layer?.layerName);
                            return(
                                <div key = {`${k}`+layer?.layerName} className = "layer-content-container">
                                    <div className='check-box-container'>
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            onClick = {(e)=>this.handleClick(e,layer?.layerName)}
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
          </Paper>
        </Box>
      )
  }

}


{/* <TableContainer>
<Table
  sx={{ minWidth: 750 }}
  aria-labelledby="tableTitle"
  size={this.state.dense ? 'small' : 'medium'}
>
  <TableBody>
    {this.props.layers.map((layer, index) => {
        const isItemSelected = this.isSelected(layer?.layerName);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableRow
            hover
            onClick={(event) => this.handleClick(event, layer?.layerName)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={layer?.name}
            selected={isItemSelected}
            className = "layer-table-row"
          >
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={isItemSelected}
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
            </TableCell>
            <TableCell
              component="th"
              id={labelId}
              scope="row"
              padding="none"
            >
              {layer?.layerName}
            </TableCell>
          </TableRow>
        );
      })}
    {this.emptyRows > 0 && (
      <TableRow
        style={{
          height: (this.state.dense ? 33 : 53) * this.emptyRows,
        }}
      >
        <TableCell colSpan={6} />
      </TableRow>
    )}
  </TableBody>
</Table>
</TableContainer> */}

























// import {React,jsx} from 'jimu-core';
// import styled from '@emotion/styled';

// type StylesType = {
//     height?:number,
//     width?:number,
//     borderWidth?:number,
//     borderColor?:string,
//     borderStyle?:string,
//     borderBottomWidth?:number,
//     borderBottomStyle?:string
// }

// const Container = styled.div((props:StylesType)=>({
//     width:props?.width??150,
//     height:props.height??350,
//     borderWidth:props.borderWidth??0,
//     borderColor:"lightgrey",
//     borderStyle:"solid",
//     borderBottom:
// }))
   

// export default class LayersTable extends  React.PureComponent<any,any>{

//     render(): React.ReactNode {
//         return (
//           <Container >
//             <Container height={80}>

//             </Container>
//           </Container>
//         )
//     }
// }