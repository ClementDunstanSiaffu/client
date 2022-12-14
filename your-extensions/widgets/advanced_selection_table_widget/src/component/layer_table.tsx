
import {React,jsx} from 'jimu-core';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import '../assets/css/style.scss'
import LayerContents from './layer_contents';
import AttributesContents from './attributes_contents'

export default class  LayersTable extends React.PureComponent<any,any>{
  
  render(){
    return (
      <Box sx={{ width: '100%',height:600 }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <LayerContents />
          <AttributesContents />
        </Paper>
      </Box>
    )
  }
}


