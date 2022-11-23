import { React, classNames, IMRuntimeInfos, Immutable, WidgetState, getAppStore } from 'jimu-core'
import { MobilePanel } from 'jimu-ui'
import { WidgetRenderer } from './widget-renderer'

export interface MobileWidgetLuncherProps {
  containerMapId: string
  widgets: IMRuntimeInfos
  onClose?: (id?: string) => any
}

const DefaultWidgets = Immutable({}) as IMRuntimeInfos
export const MobileWidgetLuncher = (props: MobileWidgetLuncherProps) => {
  const { containerMapId, onClose, widgets = DefaultWidgets } = props

  const openingWidget = Object.keys(widgets).find((widgetId) => widgets[widgetId].state === WidgetState.Opened) ?? ''
  const title = getAppStore().getState().appConfig.widgets?.[openingWidget]?.label

  const handleClose = (evt?: React.MouseEvent<HTMLDivElement>) => {
    evt?.stopPropagation()
    evt?.nativeEvent.stopImmediatePropagation()
    onClose?.(openingWidget)
  }

  return (
    <MobilePanel
      className={classNames({ 'd-none': !openingWidget })}
      mapWidgetId={containerMapId}
      title={title}
      open={true}
      toggle={handleClose}
    >
      {Object.entries(widgets).map(([id, runtimeInfo]) => {
        const opened = runtimeInfo.state !== undefined
        if (!opened) return null
        const opening = runtimeInfo.state === WidgetState.Opened

        return (
          <WidgetRenderer
            widgetId={id}
            key={id}
            className={classNames({ 'd-none': !opening })}
          ></WidgetRenderer>
        )
      })}
    </MobilePanel>
  )
}
