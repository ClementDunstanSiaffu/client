/** @jsx jsx */
import { React, jsx, css, SerializedStyles, IMThemeVariables, Immutable } from 'jimu-core'
import { Icon, Button, BorderStyle, styleUtils } from 'jimu-ui'
import { ToggleBtnColor, ICON_TYPE } from '../config'
import leftIcon from 'jimu-icons/svg/outlined/directional/left.svg'
import rightIcon from 'jimu-icons/svg/outlined/directional/right.svg'
import upIcon from 'jimu-icons/svg/outlined/directional/up.svg'
import downIcon from 'jimu-icons/svg/outlined/directional/down.svg'
import arrowLeftIcon from 'jimu-icons/svg/outlined/directional/left-double.svg'
import arrowRightIcon from 'jimu-icons/svg/outlined/directional/right-double.svg'
import arrowUpIcon from 'jimu-icons/svg/outlined/directional/up-double.svg'
import arrowDownIcon from 'jimu-icons/svg/outlined/directional/down-double.svg'
import fillLeftIcon from 'jimu-icons/svg/filled/directional/left.svg'
import fillRightIcon from 'jimu-icons/svg/filled/directional/right.svg'
import fillUpIcon from 'jimu-icons/svg/filled/directional/up.svg'
import fillDownIcon from 'jimu-icons/svg/filled/directional/down.svg'

const ICONS = {}
ICONS[ICON_TYPE.Left] = leftIcon
ICONS[ICON_TYPE.Right] = rightIcon
ICONS[ICON_TYPE.Up] = upIcon
ICONS[ICON_TYPE.Down] = downIcon

const ARROW_ICONS = {}
ARROW_ICONS[ICON_TYPE.Left] = arrowLeftIcon
ARROW_ICONS[ICON_TYPE.Right] = arrowRightIcon
ARROW_ICONS[ICON_TYPE.Up] = arrowUpIcon
ARROW_ICONS[ICON_TYPE.Down] = arrowDownIcon

const FILL_ICONS = {}
FILL_ICONS[ICON_TYPE.Left] = fillLeftIcon
FILL_ICONS[ICON_TYPE.Right] = fillRightIcon
FILL_ICONS[ICON_TYPE.Up] = fillUpIcon
FILL_ICONS[ICON_TYPE.Down] = fillDownIcon

function getIcon (icon: ICON_TYPE, iconSource: number) {
  if (iconSource === 1) {
    return ARROW_ICONS[icon]
  }
  if (iconSource === 2) {
    return FILL_ICONS[icon]
  }
  return ICONS[icon]
}

export interface SidebarControllerProps {
  expanded: boolean
  icon: ICON_TYPE
  iconSource: number
  iconSize: number
  border: BorderStyle
  color: ToggleBtnColor
  shouldFlip: boolean
  width: number
  height: number
  style: any
  theme: IMThemeVariables
  onClick: (e) => void
}

export class SidebarController extends React.PureComponent<SidebarControllerProps> {
  getStyle (): SerializedStyles {
    const { width, height, color, border } = this.props

    return css`
      padding: 0;
      width: ${width}px;
      height: ${height}px;

      background-color: ${color.normal.bg.color} !important;
      &:hover {
        background-color: ${color.hover.bg.color} !important;
      }

      border: ${styleUtils.toCSSBorder(border) ?? 'none'} !important;

      .jimu-icon {
        margin: 0;
      }
    `
  }

  flipStyle (style: {borderRadius?: string}): React.CSSProperties {
    if (!this.props.shouldFlip) {
      return style
    }
    let result = Immutable(style)
    if (style.borderRadius != null) {
      const fourSides = style.borderRadius.split(' ')
      result = result.set('borderRadius', `${fourSides[1]} ${fourSides[0]} ${fourSides[3]} ${fourSides[2]}`)
    }
    return result
  }

  render (): JSX.Element {
    const { icon, iconSize, iconSource, style, expanded, shouldFlip, color, onClick } = this.props
    const rotate = shouldFlip ? 180 : 0
    return (
      <Button
        className='sidebar-controller d-flex justify-content-center align-items-center'
        css={this.getStyle()} style={this.flipStyle(style)} onClick={onClick}
        aria-expanded={expanded}
      >
        <Icon
          className='icon' rotate={expanded ? 0 + rotate : 180 + rotate}
          icon={getIcon(icon, iconSource)} size={iconSize} color={color.normal.icon.color}
        />
      </Button>
    )
  }
}
