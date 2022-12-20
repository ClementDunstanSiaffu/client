
import { React, jsx } from 'jimu-core'
import 'bootstrap/dist/css/bootstrap.css'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import '../../assets/css/style.scss'
import CSS from 'csstype'

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
  onClickItem = (value: string | number) => {
    this.props.onClick(value)
  }

  static defaultProps: DropDownType = {
    dropdownToogleStyle: {
      backgroundColor: 'transparent',
      // width:`${180*0.0625}em`,
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
    return (
            <UncontrolledDropdown>
                <DropdownToggle
                    caret= {this.props.caret ?? true}
                    style={this.props.dropdownToogleStyle}
                    color = {this.props.dropdownTooggleColor}
                    outline = {false}
                >
                    {this.props?.title ?? ' '}
                </DropdownToggle>
                <DropdownMenu>
                    {
                        items.map((item, k) => (
                            <DropdownItem key={k} onClick = {() => this.onClickItem(item.value)}>
                                {item?.icon && <img src={item.icon} className = 'icon-style'/>}  <span className='ttribute-title'>{item.label}</span>
                            </DropdownItem>
                        ))
                    }
                </DropdownMenu>
            </UncontrolledDropdown>
    )
  }
}
