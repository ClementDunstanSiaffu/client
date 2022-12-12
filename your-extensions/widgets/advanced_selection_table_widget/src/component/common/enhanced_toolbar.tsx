
import {React,jsx} from 'jimu-core';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import '../../assets/css/style.scss'

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
                className = "layer-content-container"
            >
              <Typography component="div">
                {this.props.children}
            </Typography>
            </Toolbar>
        );
    }
  
}