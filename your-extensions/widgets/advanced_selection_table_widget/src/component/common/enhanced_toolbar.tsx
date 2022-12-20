
import { React, jsx } from 'jimu-core'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import '../../assets/css/style.scss'
import { Button } from 'jimu-ui'

interface EnhancedTableToolbarProps {
  numSelected?: number
  children: any
  showRefreshButton?: boolean
  onClickRefresh?: (val?: any) => void,
  refreshButtonText?:string
}

const refreshButtonStyle = {
  backgroundColor: 'green',
  color: 'white'
}

export default class EnhancedTableToolbar extends React.PureComponent<EnhancedTableToolbarProps, any> {

  static defaultProps = {
    showRefreshButton: false,
    onClickRefresh: () => {},
    refreshButtonText:" "
    
  }

  render (): React.ReactNode {
    const { numSelected } = this.props

    return (
            <Toolbar
                sx={{
                  pl: { sm: 2 },
                  pr: { xs: 1, sm: 1 },
                  ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                      alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                  })
                }}
                className = "layer-content-container"
            >
              <Typography component="div">
                {this.props.children}
                </Typography>
                {this.props.showRefreshButton &&
                    <div
                        style={{ display: 'flex', justifyContent: 'flex-end', flex: 'auto' }}
                    >
                        <Button
                            onClick={this.props.onClickRefresh}
                            style = {refreshButtonStyle}
                        >
                            {this.props.refreshButtonText}
                        </Button>
                    </div>}
            </Toolbar>
    )
  }
}
