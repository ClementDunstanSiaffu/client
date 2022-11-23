import { React, IMState, ReactRedux } from 'jimu-core'
import { AvatarCard, AvatarCardProps } from './avatar-card'
import { Loading } from 'jimu-ui'
import closeOutlined from 'jimu-icons/svg/outlined/editor/close.svg'

export interface WidgetAvatarCardProps extends Omit<AvatarCardProps, 'onClick'> {
  widgetid?: string
  markerEnabled?: boolean
  onMarkerClick?: () => void
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const WidgetAvatarCard = (props: WidgetAvatarCardProps) => {
  const {
    markerEnabled,
    onMarkerClick,
    widgetid,
    showLabel,
    showTooltip,
    labelGrowth,
    avatar,
    onClick,
    active,
    editDraggable,
    className
  } = props

  const widgetJson = ReactRedux.useSelector((state: IMState) => state.appConfig.widgets?.[widgetid])

  const result = widgetJson
    ? (
      <AvatarCard
        data-widgetid={widgetid}
        className={`widget-avatar-card ${className}`}
        showLabel={showLabel}
        showTooltip={showTooltip}
        labelGrowth={labelGrowth}
        avatar={avatar}
        label={widgetJson.label}
        icon={widgetJson.icon as any}
        autoFlip={widgetJson?.manifest?.properties?.flipIcon}
        marker={markerEnabled ? closeOutlined : ''}
        active={active}
        editDraggable={editDraggable}
        onMarkerClick={onMarkerClick}
        onClick={onClick}
      />
      )
    : <Loading />

  return result
}
