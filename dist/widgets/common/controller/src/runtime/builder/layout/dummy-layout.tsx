/** @jsx jsx */
import { React, css, jsx, getAppStore, Immutable, appActions, IMLayoutJson, LayoutItemType, ReactRedux, IMState } from 'jimu-core'
import { Popper, Size, Placement, hooks } from 'jimu-ui'
import { CONTAINER_LAYOUT_NAME } from '../../../common/consts'
import { getAppConfigAction } from 'jimu-for-builder'
import { LayoutBuilder } from 'jimu-layouts/layout-builder'
import { searchUtils } from 'jimu-layouts/layout-runtime'
import { useWidgetChildLayoutJson } from '../../common/layout-utils'

export interface DummyLayoutProps {
  reference: HTMLDivElement
  placement?: Placement
  widgetId: string
  controllerId: string
  version?: number
  onClose: () => void
  size: Size
  onSizeChange?: (widgetId: string, size: Size) => void
}

const style = css`
  max-width: 100vw !important; 
  /* hide rnd-resize bar for the outermost layout item */
  .controller-configuration-container > * > * > .builder-layout-item > .select-wrapper > .action-area {
      > .rnd-resize-top,
      > .rnd-resize-right,
      > .rnd-resize-bottom,
      > .rnd-resize-left {
        display: none;
      }
    }

    .controller-configuration-container .builder-layout-item > .select-wrapper > .lock-layout-tip {
      display: none;
    }

  .selectable {
    > div {
      cursor: default;
    }
  }

  .widget-container {
    height: 100%;
    overflow: auto;
  }
`

/**
 * Check whether controller widget or controlled widgets by controller widget is selected
 * @param controllerId
 */
export const useControlledWidgetsSelected = (controllerId: string): boolean => {
  return ReactRedux.useSelector((state: IMState) => {
    const selection = state.appRuntimeInfo.selection
    const appConfig = state.appConfig
    let selected = false
    if (selection && appConfig.layouts[selection.layoutId]) {
      const layoutItem = appConfig.layouts[selection.layoutId].content[selection.layoutItemId]
      const widgetId = layoutItem && layoutItem.widgetId
      let controlledWidgets = []
      if (widgetId) {
        controlledWidgets = searchUtils.getChildrenContents(appConfig, widgetId, LayoutItemType.Widget, false)
      }
      let widgetIds = [widgetId, controllerId]
      if (controlledWidgets) {
        widgetIds = widgetIds.concat(controlledWidgets)
      }
      selected = widgetIds.includes(widgetId)
    }
    return selected
  })
}

const MIN_SIZE = { width: 150, height: 150 }
const DEFAULT_SIZE = { width: 300, height: 300 }

const elementId = '0'

const getLayoutElementJson = (widgetId: string) => {
  return {
    type: 'WIDGET',
    widgetId: widgetId,
    bbox: {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0
    },
    id: elementId
  }
}

const createLayoutElement = (widgetId: string, layout: IMLayoutJson) => {
  if (layout) {
    let appConfig = getAppConfigAction().appConfig
    const elementJson = getLayoutElementJson(widgetId)

    appConfig = appConfig.setIn(['layouts', layout.id, 'content', elementJson.id], elementJson)
      .setIn(['layouts', layout.id, 'order'], [elementJson.id])
    getAppConfigAction(appConfig).exec()
    getAppStore().dispatch(appActions.selectionChanged((Immutable({ layoutId: layout.id, layoutItemId: elementId }))))
  }
}

const isItemAccepted = () => {
  return false
}

export const DummyLayout = (props: DummyLayoutProps) => {
  const {
    reference,
    placement,
    widgetId,
    controllerId,
    onClose,
    onSizeChange,
    size,
    version
  } = props

  const layouts = ReactRedux.useSelector((state: IMState) => state.appConfig.widgets?.[controllerId]?.layouts?.[CONTAINER_LAYOUT_NAME])
  const title = ReactRedux.useSelector((state: IMState) => state.appConfig.widgets?.[widgetId]?.label)
  const layout = useWidgetChildLayoutJson(controllerId, CONTAINER_LAYOUT_NAME)
  const selected = useControlledWidgetsSelected(controllerId)
  const [open, setOpen] = React.useState(!!widgetId)

  hooks.useUpdateEffect(() => {
    setOpen(false)
    setTimeout(() => {
      setOpen(!!widgetId)
    }, 100)
  }, [widgetId])

  React.useEffect(() => {
    if (!selected) {
      onClose?.()
    }
  }, [selected, onClose])

  const handleEscape = (evt) => {
    if (evt?.key === 'Escape') {
      onClose?.()
      const button = reference?.querySelector('button')
      button?.focus()
    }
  }

  const layoutRef = hooks.useRefValue(layout)
  React.useEffect(() => {
    if (widgetId) {
      createLayoutElement(widgetId, layoutRef.current)
    }
  }, [widgetId, layoutRef])

  const handleResize = (size) => {
    onSizeChange(widgetId, size)
  }

  return <React.Fragment>
    {open && <Popper
      floating={true}
      open={true}
      headerTitle={title}
      onHeaderClose={onClose}
      minSize={MIN_SIZE}
      onResize={handleResize}
      dragBounds="body"
      defaultSize={size || DEFAULT_SIZE}
      css={style}
      version={version}
      className="flex-grow-1"
      reference={reference}
      toggle={handleEscape}
      placement={placement}>
      <div className="widget-container controller-configuration-container d-flex p-1">
        <LayoutBuilder isItemAccepted={isItemAccepted} layouts={layouts} itemDraggable={false} itemResizable={true} showDefaultTools={false} />
      </div>
    </Popper>}
  </React.Fragment>
}
