/** @jsx jsx */
import {
  React,
  jsx,
  ImmutableArray,
  SerializedStyles,
  IMThemeVariables,
  css
} from 'jimu-core'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Direction,
  Modifiers
} from 'jimu-ui'

export interface MyDropDownItem {
  label: string
  event: (evt, item?: MyDropDownItem) => void
  hide?: boolean
}

export interface MyDropdownProps {
  toggleContent?: (theme: IMThemeVariables) => any
  theme?: IMThemeVariables
  toggleTitle?: string
  toggleIsIcon?: boolean
  toggleType?: string
  items?: ImmutableArray<MyDropDownItem>
  fluid?: boolean
  size?: string
  appendToBody?: HTMLElement | 'body'
  menuContent?: (theme: IMThemeVariables) => any
  caret?: boolean
  modifiers?: Modifiers
  isDropDownOpen?: boolean
  direction?: Direction
  menuCss?: (theme: IMThemeVariables) => SerializedStyles
  className?: string
  withBuilderStyle?: any
  showActive?: boolean
  activeLabel?: string
  onDropDownOpenChange?: (isOpen: boolean) => void
}
export default class MyDropDown extends React.PureComponent<
MyDropdownProps,
{ isOpen: boolean }
> {
  MyDropdown: any
  MyDropdownToggle: any
  MyDropdownMenu: any
  MyDropdownItem: any

  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
    const { withBuilderStyle } = props
    this.MyDropdown = withBuilderStyle ? withBuilderStyle(Dropdown) : Dropdown
    this.MyDropdownToggle = withBuilderStyle
      ? withBuilderStyle(DropdownToggle)
      : DropdownToggle
    this.MyDropdownMenu = withBuilderStyle
      ? withBuilderStyle(DropdownMenu)
      : DropdownMenu
    this.MyDropdownItem = withBuilderStyle
      ? withBuilderStyle(DropdownItem)
      : DropdownItem
  }

  onDropDownToggle = evt => {
    evt.stopPropagation()

    const { isDropDownOpen, onDropDownOpenChange } = this.props
    if (isDropDownOpen !== undefined) {
      onDropDownOpenChange && onDropDownOpenChange(!isDropDownOpen)
    } else {
      const { isOpen } = this.state
      this.setState({ isOpen: !isOpen })
    }
  }

  onItemClick = (evt, item) => {
    const { isDropDownOpen, onDropDownOpenChange } = this.props
    if (isDropDownOpen !== undefined) {
      onDropDownOpenChange && onDropDownOpenChange(false)
    } else {
      this.setState({ isOpen: false })
    }
    item.event(evt, item)
    evt.stopPropagation()
    evt.nativeEvent.stopImmediatePropagation()
  }

  onDropDownMouseClick = evt => {
    evt.stopPropagation()
    evt.nativeEvent.stopImmediatePropagation()
  }

  getStyle = () => {
    const { theme } = this.props
    return css`
      .card-toggle-button {
        background: ${theme.colors?.palette?.light?.[500]};
        border: none;
        &:hover, &[aria-expanded="true"] {
          background: ${theme.colors?.palette?.light?.[800]};
        }
      }
    `
  }

  render () {
    const {
      items,
      toggleContent,
      caret,
      toggleType,
      menuContent,
      modifiers,
      toggleIsIcon,
      theme,
      isDropDownOpen,
      size,
      appendToBody,
      toggleTitle,
      direction,
      menuCss,
      className,
      showActive,
      activeLabel,
      fluid
    } = this.props
    let { isOpen } = this.state
    isOpen = isDropDownOpen === undefined ? isOpen : isDropDownOpen
    const {
      MyDropdown,
      MyDropdownToggle,
      MyDropdownMenu,
      MyDropdownItem
    } = this
    return (
      <MyDropdown
        size={size}
        toggle={this.onDropDownToggle}
        direction={direction}
        fluid={fluid}
        isOpen={isOpen}
        className={`my-dropdown ${className}`}
        css={this.getStyle()}
      >
        {toggleContent && (
          <MyDropdownToggle
            icon={toggleIsIcon}
            title={toggleTitle}
            size={size}
            type={toggleType}
            caret={caret}
            className='card-toggle-button'
          >
            {toggleContent && toggleContent(theme)}
          </MyDropdownToggle>
        )}
        <MyDropdownMenu
          appendToBody={appendToBody}
          modifiers={modifiers}
          css={menuCss && menuCss(theme)}
        >
          {menuContent
            ? menuContent(theme)
            : items &&
              items.asMutable().map((item: MyDropDownItem, i: number) => {
                return (
                  !item.hide && (
                    <MyDropdownItem
                      key={i}
                      className='no-user-select'
                      active={showActive && item.label === activeLabel}
                      onClick={evt => this.onItemClick(evt, item)}
                    >
                      {item.label}
                    </MyDropdownItem>
                  )
                )
              })}
        </MyDropdownMenu>
      </MyDropdown>
    )
  }
}
