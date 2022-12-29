
import { React, jsx } from 'jimu-core'
import '../../assets/css/style.scss'
import { Button } from 'jimu-ui'

interface EnhancedTableToolbarProps {
  numSelected?: number
  children: any
  showRefreshButton?: boolean
  onClickRefresh?: (val?: any) => void,
  refreshButtonText?:string,
  buttonColor?:string
}

export default class EnhancedTableToolbar extends React.PureComponent<EnhancedTableToolbarProps, any> {

  static defaultProps = {
    showRefreshButton: false,
    onClickRefresh: () => {},
    refreshButtonText:" ",
    buttonColor:"blue"
  }

  render (): React.ReactNode {

    const refreshButtonStyle = {
      backgroundColor:this.props.buttonColor,
      color: 'white'
    }

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
