/**@jsx jsx */
import { React, jsx, ReactRedux, IMState, appActions, getAppStore, Size, Immutable, WidgetState, css, LayoutItemConstructorProps } from 'jimu-core'
import { IMConfig, IMSizeMap } from '../../config'
import { Placement } from 'jimu-ui'
import { DummyLayout } from './layout/dummy-layout'
import { BASE_LAYOUT_NAME } from '../../common/consts'
import { getAppConfigAction } from 'jimu-for-builder'
import { getWidgetChildLayoutJson, useControlledWidgets } from '../common/layout-utils'
import { WidgetListPopper } from 'jimu-ui/advanced/setting-components'
import { isLayoutItemAcceptedForController, useInsertSyncWidgetToLayout } from './utils'
import { LayoutListPlaceholder } from './layout-list-placeholder'

export interface BuilderProps {
  id: string
  config: IMConfig
  version?: number
}

const widgetPanelStyles = css`
  width: 300px;
  height: 300px;
  overflow-y: auto;
`

const isAddWidgetExt = (node: HTMLElement) => {
  if (!node) return false
  if (node.dataset?.extname === 'controller-add-widget') {
    return true
  }
  const parent = node.parentElement
  return parent?.dataset?.extname === 'controller-add-widget'
}

export const Builder = (props: BuilderProps) => {
  const { id, config, version } = props
  const vertical = config?.behavior?.vertical
  const size = config.behavior?.size
  const placement: Placement = !vertical ? 'bottom' : 'right-start'

  const rootRef = React.useRef<HTMLDivElement>(null)

  const widgetsState = ReactRedux.useSelector((state: IMState) => state.widgetsState[id])
  const showWidgetsPanel = widgetsState?.showWidgetsPanel

  const scrollRef = React.useRef<(previous: boolean, moveOne?: boolean) => void>()
  //DOM node used to locate the floating panel in the controller(Only for `onlyOpenOne`)
  const [reference, setReference] = React.useState(null)
  //Get all open state widgets in controller
  const widgets = useControlledWidgets(id, BASE_LAYOUT_NAME)
  const showPlaceholder = !Object.keys(widgets ?? {}).length
  const openingWidgets = Object.keys(widgets).filter((widgetId) => widgets[widgetId].state === WidgetState.Opened)
  const firstOpeningWidget = openingWidgets?.[0]
  const firstOpeningSize = size?.[firstOpeningWidget]

  React.useEffect(() => {
    getAppStore().dispatch(appActions.closeWidgets(openingWidgets))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version])

  const handleScrollStatusChange = React.useCallback((hideArrow: boolean, disablePrevious?: boolean, disableNext?: boolean) => {
    getAppStore().dispatch(appActions.widgetStatePropChange(id, 'hideArrow', hideArrow))
    getAppStore().dispatch(appActions.widgetStatePropChange(id, 'disablePrevious', disablePrevious))
    getAppStore().dispatch(appActions.widgetStatePropChange(id, 'disableNext', disableNext))
  }, [id])

  //Synchronize the state and method of scroll-list component to toolbar
  React.useEffect(() => {
    getAppStore().dispatch(appActions.widgetStatePropChange(id, 'onArrowClick', scrollRef.current))
  }, [id])

  const updateWidgetConfig = (config: IMConfig) => {
    getAppConfigAction().editWidgetConfig(id, config).exec()
  }

  const onWidgetSizeChanged = (widgetId: string, _size: Size) => {
    if (!widgetId) {
      return
    }
    let size = config?.behavior.size || Immutable({}) as IMSizeMap
    size = size.set(widgetId, _size)
    updateWidgetConfig(config.setIn(['behavior', 'size'], size))
  }

  const handleItemClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    const reference = evt.currentTarget
    const widgetId = reference.dataset?.widgetid
    setReference(reference)
    getAppStore().dispatch(appActions.closeWidgets(openingWidgets))
    getAppStore().dispatch(appActions.openWidget(widgetId))
  }

  const handleClose = (e) => {
    if (!isAddWidgetExt(e?.target)) {
      closeWidgetsPanel()
    }
  }

  const closeWidgetsPanel = () => {
    getAppStore().dispatch(appActions.widgetStatePropChange(id, 'showWidgetsPanel', false))
  }

  const handleRootClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    const target = evt.target as HTMLElement
    const root = rootRef.current
    if (!target || !root) return
    if (root.contains(target)) {
      closeWidgetsPanel()
    }
  }

  const insertSyncWidgetToLayout = useInsertSyncWidgetToLayout(id, BASE_LAYOUT_NAME)
  const onItemSelect = (item: LayoutItemConstructorProps) => {
    const layout = getWidgetChildLayoutJson(id, BASE_LAYOUT_NAME)
    const insertIndex = layout.order?.length ?? 0
    insertSyncWidgetToLayout(layout, item, {} as any, {} as any, insertIndex)
  }

  return <div className='controller-builder w-100 h-100' ref={rootRef} onClick={handleRootClick}>
    {firstOpeningWidget && <DummyLayout
      reference={reference}
      version={version}
      widgetId={firstOpeningWidget}
      controllerId={id}
      size={firstOpeningSize}
      onClose={() => getAppStore().dispatch(appActions.closeWidgets(openingWidgets))}
      onSizeChange={onWidgetSizeChanged}
      placement={placement} />}
    <LayoutListPlaceholder
      scrollRef={scrollRef}
      showPlaceholder={showPlaceholder}
      onScrollStatusChange={handleScrollStatusChange}
      vertical={config?.behavior?.vertical}
      widgetId={id}
      onItemClick={handleItemClick}
      itemStyle={config.appearance.card as any}
      draggable={true}
      space={config?.appearance?.space} />
    {showWidgetsPanel && <WidgetListPopper
      css={widgetPanelStyles}
      placement='right-start'
      referenceElement={rootRef.current}
      isAccepted={isLayoutItemAcceptedForController}
      onSelect={onItemSelect}
      onClose={handleClose} />}
  </div>
}
