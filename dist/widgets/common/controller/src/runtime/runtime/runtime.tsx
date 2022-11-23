import { React, ReactRedux, IMState, LayoutItemType, ContainerType, getAppStore, appActions, WidgetState, IMSectionNavInfo } from 'jimu-core'
import { hooks } from 'jimu-ui'
import { getListItemLength } from '../common/utils'
import { IMConfig } from '../../config'
import { searchUtils } from 'jimu-layouts/layout-runtime'
import { MobileWidgetLuncher } from './mobile-widget-luncher'
import { SingleWidgetsLuncher } from './single-widget-luncher'
import { MultipleWidgetsLuncher } from './multiple-widgets-luncher'
import { ScrollList } from '../common/scroll-list'
import { WidgetAvatarCard } from '../common'
import { BASE_LAYOUT_NAME, DEFAULT_PANEL_SIZE, DEFAULT_PANEL_SPACE, DEFAULT_WIDGET_START_POSITION } from '../../common/consts'
import { getWidgetCardNode } from './utils'
import { useControlledWidgets } from '../common/layout-utils'

export interface RuntimeProps {
  id: string
  config: IMConfig
  version?: number
}

//If current widget place in map widget, the id of map widget will be passed to the mobile panel
const useContainerMapId = (id: string): string => {
  return ReactRedux.useSelector((state: IMState) => {
    const appConfig = state.appConfig
    const browserSizeMode = state.browserSizeMode
    const containerId = searchUtils.getParentWidgetIdOfContent(appConfig, id, LayoutItemType.Widget, browserSizeMode)
    const container = appConfig.widgets[containerId]
    return container?.manifest?.name === 'arcgis-map' ? container.id : ''
  })
}

/**
 * Get the section where the view is located.
 * @param viewId
 */
export const getParentSection = (viewId: string) => {
  const appConfig = getAppStore().getState().appConfig
  const sections = appConfig.sections
  const section = Object.values(sections ?? {}).find((section) => section.views?.includes(viewId))
  return section?.id
}

/**
 * Get all activated views.
 * @param sectionNavInfos
 */
export const getActiveViews = (sectionNavInfos: IMSectionNavInfo) => {
  const appConfig = getAppStore().getState().appConfig
  const sections = appConfig.sections
  const activedViews = sectionNavInfos ? Object.values(sectionNavInfos).map((section) => section.currentViewId) : []
  const activedSections = activedViews.map(getParentSection)
  const defaultActivedViews = Object.values(sections ?? {}).map(section => {
    if (!activedSections.includes(section.id)) {
      return section.views?.[0]
    }
    return undefined
  }).filter((view) => !!view)
  const views = activedViews
  defaultActivedViews.forEach((view) => {
    if (!activedViews.includes(view)) {
      views.push(view)
    }
  })
  return views
}

/**
 * Check whether current widget is hidden in section view or not.
 * @param sectionNavInfos
 * @param id
 */
const getWhetherWidgetVisible = (sectionNavInfos: IMSectionNavInfo, id: string) => {
  const activedViews = getActiveViews(sectionNavInfos)
  const browserSizeMode = getAppStore().getState().browserSizeMode
  const appConfig = getAppStore().getState().appConfig
  const info = searchUtils.getContentContainerInfo(appConfig, id, LayoutItemType.Widget, browserSizeMode)

  let visible = true

  if (!info) return visible

  if (info.type === ContainerType.View) {
    if (!activedViews.includes(info.id)) {
      visible = false
    } else {
      const parentViewId = info.id
      const parentSectionId = getParentSection(parentViewId)
      const sectionContainerViewInfo = searchUtils.getContentContainerInfo(appConfig, parentSectionId, LayoutItemType.Section, browserSizeMode)

      if (sectionContainerViewInfo && sectionContainerViewInfo.type === ContainerType.View) {
        if (!activedViews.includes(sectionContainerViewInfo.id)) {
          visible = false
        }
      }
    }
  }
  return visible
}

const useWhetherWidgetVisible = (id: string): boolean => {
  const sectionNavInfos = ReactRedux.useSelector((state: IMState) => state.appRuntimeInfo?.sectionNavInfos)
  return getWhetherWidgetVisible(sectionNavInfos, id)
}

export const Runtime = (props: RuntimeProps) => {
  const { id, config, version } = props

  const onlyOpenOne = config.behavior?.onlyOpenOne
  const openStarts = config.behavior?.openStarts as unknown as string[]
  const size = config.behavior?.size
  const vertical = config.behavior?.vertical
  const displayType = config.behavior?.displayType
  const card = config?.appearance?.card

  const itemLength = getListItemLength(config?.appearance?.card as any, config?.appearance?.space)
  const isRTL = getAppStore()?.getState()?.appContext?.isRTL
  const isInBuilder = getAppStore()?.getState()?.appContext?.isInBuilder

  const widgetsLuncherStart = React.useMemo(() => {
    return isRTL ? { ...DEFAULT_WIDGET_START_POSITION, x: document.body.clientWidth - DEFAULT_PANEL_SIZE.width - DEFAULT_WIDGET_START_POSITION.x } : DEFAULT_WIDGET_START_POSITION
  }, [isRTL])
  const widgetsLuncherSpace = React.useMemo(() => isRTL ? { ...DEFAULT_PANEL_SPACE, x: -DEFAULT_PANEL_SPACE.x } : DEFAULT_PANEL_SPACE, [isRTL])

  const placement = !vertical ? 'bottom' : 'right-start'

  const visible = useWhetherWidgetVisible(id)
  const containerMapId = useContainerMapId(id)
  const mobile = hooks.useCheckSmallBrowserSzieMode()
  const currentPageId = ReactRedux.useSelector((state: IMState) => state.appRuntimeInfo.currentPageId)

  const rootRef = React.useRef<HTMLDivElement>(null)
  // Get all the widgets contained in the controller
  const widgets = useControlledWidgets(id, BASE_LAYOUT_NAME)
  const widgetIds = Object.keys(widgets)
  const openingWidgets = widgetIds.filter((widgetId) => widgets[widgetId].state === WidgetState.Opened)

  const handleOpenWidget = React.useCallback((evt: React.MouseEvent<HTMLButtonElement>) => {
    const widgetId = evt.currentTarget.dataset?.widgetid
    if (!widgetId) return

    const keepOneOpened = mobile ? true : onlyOpenOne
    if (keepOneOpened) {
      getAppStore().dispatch(appActions.closeWidgets(openingWidgets))
      if (!openingWidgets.includes(widgetId)) {
        getAppStore().dispatch(appActions.openWidget(widgetId))
      }
    } else {
      if (!openingWidgets.includes(widgetId)) {
        getAppStore().dispatch(appActions.openWidget(widgetId))
      } else {
        getAppStore().dispatch(appActions.closeWidget(widgetId))
      }
    }
  }, [mobile, onlyOpenOne, openingWidgets])

  const handleCloseWidget = (id: string) => {
    if (!id) return
    getAppStore().dispatch(appActions.closeWidget(id))
    const widgetNode = getWidgetCardNode(id)
    widgetNode?.focus()
  }

  //When version (it means in builder and related config changed) or currentPageIdchanged, close opening widgets
  hooks.useUpdateEffect(() => {
    getAppStore().dispatch(appActions.closeWidgets(openingWidgets))
  }, [version, currentPageId])
  //When visible changed, close opening widgets
  hooks.useUpdateEffect(() => {
    if (!visible) {
      getAppStore().dispatch(appActions.closeWidgets(openingWidgets))
    }
  }, [visible])

  //When widget mounted, trigger open at start widgets
  React.useEffect(() => {
    if (isInBuilder || !openStarts?.length || !visible) return
    setTimeout(() => {
      getAppStore().dispatch(appActions.openWidgets(openStarts))
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //The function to create widget card
  const createItem = React.useCallback((id: string, className: string) => {
    const active = openingWidgets.includes(id)
    return (
      <WidgetAvatarCard
        {...card as any}
        key={id}
        className={`${className} layout-item`}
        widgetid={id}
        markerEnabled={false}
        active={active}
        onClick={handleOpenWidget}
      />
    )
  }, [card, handleOpenWidget, openingWidgets])

  return (
    <div className='controller-runtime w-100 h-100'>
      {
        mobile && <MobileWidgetLuncher
          containerMapId={containerMapId}
          widgets={widgets}
          onClose={handleCloseWidget}
        />
      }
      {(!mobile && onlyOpenOne) && <SingleWidgetsLuncher
        sizes={size}
        root={rootRef.current}
        placement={placement}
        widgets={widgets}
        onClose={handleCloseWidget}
      />}
      {(!mobile && !onlyOpenOne) && <MultipleWidgetsLuncher
        sizes={size}
        mode={displayType}
        start={widgetsLuncherStart}
        spaceX={widgetsLuncherSpace.x}
        spaceY={widgetsLuncherSpace.y}
        widgets={widgets}
        onClose={handleCloseWidget}
      />}
      <ScrollList
        ref={rootRef}
        className={'runtime--scroll-list'}
        vertical={vertical}
        itemLength={itemLength}
        space={config.appearance?.space}
        autoHideArrow
        lists={widgetIds}
        createItem={createItem}
      />
    </div>
  )
}
