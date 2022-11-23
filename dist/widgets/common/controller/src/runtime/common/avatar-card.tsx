/** @jsx jsx */
import { React, css, jsx, IconResult, classNames, polished } from 'jimu-core'
import { Button, Icon, ButtonProps, ButtonSize, Tooltip } from 'jimu-ui'
import { WIDGET_ITEM_SIZES } from '../../common/consts'

export const LABEL_HEIGHT = 21
export type AvatarSize = ButtonSize

export const getItemLength = (buttonSize: AvatarSize, showLabel: boolean, shape: 'circle' | 'rectangle') => {
  let size = WIDGET_ITEM_SIZES[buttonSize]
  if (showLabel) {
    size = size + LABEL_HEIGHT
  }

  const padding = calcPadding(buttonSize, shape)
  size = size + padding * 2
  return size
}

const calcPadding = (buttonSize: AvatarSize, shape: 'circle' | 'rectangle'): number => {
  const circle = shape === 'circle'
  if (!circle) return 6
  if (buttonSize === 'sm') return 4
  if (buttonSize === 'default') return 2
  if (buttonSize === 'lg') return 0
}

interface MarkerProps {
  marker?: string
  onMarkerClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export interface AvatarProps extends ButtonProps {
  shape: 'circle' | 'rectangle'
}

export interface AvatarCardProps extends MarkerProps, React.HTMLAttributes<HTMLDivElement> {
  icon?: IconResult | string
  autoFlip?: boolean
  label?: string
  showLabel?: boolean
  showTooltip?: boolean
  labelGrowth?: number
  avatar: AvatarProps
  active?: boolean
  disabled?: boolean
  editDraggable?: boolean
}

const useStyle = (size: ButtonSize, showLabel: boolean, shape: 'circle' | 'rectangle', labelGrowth: number) => {
  return React.useMemo(() => {
    const length = getItemLength(size, showLabel, shape)
    const width = length + labelGrowth
    const padding = calcPadding(size, shape)
    return css`
      display: flex;
      align-items:center;
      flex-direction: column;
      justify-content: ${showLabel ? 'space-around' : 'center'};
      width: ${polished.rem(width)} !important;
      height: ${polished.rem(length)};
      .tool-drag-handler {
        cursor: auto;
      }
      .avatar {
        padding: ${padding}px;
        position: relative;
        text-align: center;
        .marker {
          position: absolute;
          right: 0;
          top: 0;
          padding: 0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-btn-sizer {
            min-width: .625rem;
            min-height: .625rem;
          }
        }
      }
      .avatar-label {
        text-align: center;
        width: 100%;
        min-height: ${polished.rem(21)};
        cursor: default;
      }
    `
  }, [size, showLabel, shape, labelGrowth])
}

export const AvatarCard = React.forwardRef((props: AvatarCardProps, ref: React.RefObject<HTMLButtonElement>) => {
  const {
    label,
    className,
    title,
    showLabel,
    showTooltip = true,
    labelGrowth = 0,
    icon,
    marker,
    onMarkerClick,
    avatar,
    autoFlip,
    active,
    editDraggable,
    disabled,
    ...others
  } = props

  const { shape, style, ...buttonProps } = avatar || {} as AvatarProps
  const size = buttonProps?.size
  const [hovered, setHovered] = React.useState(null)
  const cssStyle = useStyle(size, showLabel, shape, labelGrowth)

  const avatarButton = <Button
    icon
    active={active}
    disabled={disabled}
    className="avatar-button"
    ref={ref}
    {...buttonProps}
    style={{ borderRadius: shape === 'circle' ? '50%' : undefined, ...style }}
  >
    <Icon
      color={typeof icon !== 'string' && icon.properties?.color}
      icon={typeof icon !== 'string' ? icon.svg : icon} autoFlip={autoFlip}
    />
  </Button>

  return (
    <div
      {...others}
      className={classNames('avatar-card', `${className} avatar-card`)}
      css={cssStyle}
    >
      <div
        className={classNames({ 'no-drag-action': !editDraggable }, 'avatar tool-drag-handler')}
        onMouseEnter={() => { setHovered(true) }}
        onMouseLeave={() => { setHovered(false) }}
      >
        {
          marker && hovered &&
          <Button className="marker" size="sm" icon onClick={onMarkerClick}>
            <Icon size={8} icon={marker} />
          </Button>
        }
        {showTooltip ? <Tooltip title={title || label} style={{ pointerEvents: 'none' }}>{avatarButton}</Tooltip> : avatarButton}
      </div>
      {
        showLabel &&
        <div className={classNames('avatar-label text-truncate', { active })}>{label}</div>
      }
    </div>
  )
})
