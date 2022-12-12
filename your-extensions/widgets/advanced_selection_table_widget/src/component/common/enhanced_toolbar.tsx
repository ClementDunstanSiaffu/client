
import {React,jsx} from 'jimu-core';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';




interface EnhancedTableToolbarProps {
    numSelected?: number,
    // sketchGeometry:(geometryType:any)=>void,
    children:any
}

export default class  EnhancedTableToolbar extends React.PureComponent<EnhancedTableToolbarProps,any>{

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
              <Typography component="div">
                {this.props.children}
                {/* <SelectGeometry sketchGeometry = {this.props.sketchGeometry}/> */}
            </Typography>
            </Toolbar>
        );
    }
  
}