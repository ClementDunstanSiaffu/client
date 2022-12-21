
import { React, jsx } from 'jimu-core'
import '../../assets/css/style.scss'
import CSS from 'csstype';
import { Dropdown,DropdownButton, DropdownMenu, DropdownItem} from 'jimu-ui';

interface items {
  value: string | number
  label: string
  icon?: any
}

interface DropDownType {
  onClick: (val?: number | string) => void
  items: items[]
  title?: string
  dropdownToggleColor?: string
  dropdownToogleStyle?: CSS.Properties
  caret?: boolean
  dropdownTooggleColor?: string
}

export default class DropDown extends React.PureComponent<DropDownType, any> {

  state = {openDropDown:false};

  onClickItem = (value: string | number) => {
    this.props.onClick(value);
    this.setState({openDropDown:false});
  }

  static defaultProps: DropDownType = {
    dropdownToogleStyle: {
      backgroundColor: 'transparent',
      color: 'black',
      borderColor: 'grey',
      borderWidth: `${1 * 0.0625}em`
    },
    onClick: () => {},
    items: [],
    dropdownTooggleColor: 'transparent'
  }

  render (): React.ReactNode {
    const { items } = this.props
    return(
      <div style={{width: '100%'}}>
        <Dropdown isOpen = {this.state.openDropDown} >
          <DropdownButton 
            style={this.props.dropdownToogleStyle}  
            color = {this.props.dropdownTooggleColor} 
            onClick = {()=>this.setState({openDropDown:!this.state.openDropDown})}
          >
            {this.props?.title ?? ' '}
          </DropdownButton>
          <DropdownMenu>
            {
              items.map((item, k) => (
                <DropdownItem key={k} onClick = {() => this.onClickItem(item.value)}>
                  {item?.icon && <img src={item.icon} className = 'icon-style'/>}  <span className='ttribute-title'>{item.label}</span>
                </DropdownItem>
              ))
            }
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }
}
