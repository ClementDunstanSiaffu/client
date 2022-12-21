
import { React, jsx } from 'jimu-core'
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
    return (
      <div  className = "layer-content-container toolbar-root">
        <div className='topography-root'>{this.props.children}</div>
        {this.props.showRefreshButton &&
          <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 'auto' }}>
            <Button onClick={this.props.onClickRefresh} style = {refreshButtonStyle}>
              {this.props.refreshButtonText}
            </Button>
          </div>}
      </div>
    )
  }
}
