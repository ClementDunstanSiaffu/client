import {
  React,
  Immutable,
  BrowserSizeMode,
  lodash,
  appActions,
  AppMode,
  getAppStore,
  utils
} from 'jimu-core'
import BookmarkWidget from '../src/runtime/widget'
import { TemplateType, PageStyle, DirectionType } from '../src/config'
import {
  mockTheme,
  wrapWidget,
  widgetRender,
  getInitState
} from 'jimu-for-test'

import {
  ViewportVisibilityContext,
  ViewVisibilityContext
} from 'jimu-layouts/layout-runtime'
import { fireEvent, waitFor } from '@testing-library/react'

jest.mock('jimu-arcgis', () => {
  return {
    loadArcGISJSAPIModules: async () => {
      return await Promise.resolve([
        { fromJSON: () => {} },
        function () {
          return { fromJSON: () => {} }
        },
        { fromJSON: () => {} },
        { fromJSON: () => {} },
        { fromJSON: () => {} }
      ])
    },
    JimuMapViewComponent: jest.fn(() => <div data-testid='mapViewTest' />)
  }
})

const initState = getInitState().merge({
  appContext: { isRTL: false },
  appConfig: { widgets: [] as any }
})

getAppStore().dispatch(appActions.updateStoreState(initState))

describe('bookmark test', function () {
  let render = null
  beforeAll(() => {
    render = widgetRender(getAppStore(), mockTheme as any)
  })

  afterAll(() => {
    render = null
  })

  let config = Immutable({
    templateType: TemplateType.Slide1,
    isTemplateConfirm: true,
    isInitialed: true,
    bookmarks: [
      {
        id: 1,
        name: 'Test-1',
        title: 'Test-1',
        type: '2d',
        extent: {
          spatialReference: {
            latestWkid: 3857,
            wkid: 102100
          },
          xmin: 12753609.910596116,
          ymin: 4661461.4019647185,
          xmax: 13223239.012380214,
          ymax: 5095012.226398217
        },
        showFlag: true,
        mapViewId: 'widget_2editor-dataSource_1',
        mapDataSourceId: 'dataSource_1'
      },
      {
        id: 2,
        name: 'Test-2',
        title: 'Test-2',
        type: '2d',
        extent: {
          spatialReference: {
            latestWkid: 3857,
            wkid: 102100
          },
          xmin: 12753609.910596116,
          ymin: 4661461.4019647185,
          xmax: 13223239.012380214,
          ymax: 5095012.226398217
        },
        showFlag: true,
        mapViewId: 'widget_2editor-dataSource_1',
        mapDataSourceId: 'dataSource_1'
      }
    ],
    autoPlayAllow: true,
    autoInterval: 3,
    autoLoopAllow: true,
    pageStyle: PageStyle.Paging,
    direction: DirectionType.Horizon,
    initBookmark: true,
    runtimeAddAllow: true
  })

  let props = {
    id: 'testWidget1',
    config,
    browserSizeMode: BrowserSizeMode.Large,
    dispatch: jest.fn(),
    appMode: AppMode.Run
  }

  it('sizemode change should turn off autoPlay', async () => {
    const ref: { current: HTMLElement } = { current: null }
    const Widget = wrapWidget(BookmarkWidget, { theme: mockTheme, ref } as any)
    const { getByTestId, rerender } = render(
      <ViewVisibilityContext.Provider
        value={{ isInView: false, isInCurrentView: false }}
      >
        <ViewportVisibilityContext.Provider value>
          <Widget widgetId='bookmarkTest1' {...props} />
        </ViewportVisibilityContext.Provider>
      </ViewVisibilityContext.Provider>
    )
    await waitFor(() => {}, { timeout: 0 })
    fireEvent.click(getByTestId('triggerAuto'))
    props = lodash.assign({}, props, {
      browserSizeMode: BrowserSizeMode.Medium
    })
    rerender(
      <ViewVisibilityContext.Provider
        value={{ isInView: false, isInCurrentView: false }}
      >
        <ViewportVisibilityContext.Provider value>
          <Widget widgetId='bookmarkTest1' {...props} />
        </ViewportVisibilityContext.Provider>
      </ViewVisibilityContext.Provider>
    )
    expect((ref.current as any).state.autoPlayStart).toBe(false)
  })

  it('change map ds, showLayersConfig should called with special parameter', async () => {
    const ref: { current: HTMLElement } = { current: null }
    const Widget = wrapWidget(BookmarkWidget, { theme: mockTheme, ref } as any)
    const { getByTitle } = render(
      <ViewVisibilityContext.Provider
        value={{ isInView: false, isInCurrentView: false }}
      >
        <ViewportVisibilityContext.Provider value>
          <Widget widgetId='bookmarkTest2' {...props} />
        </ViewportVisibilityContext.Provider>
      </ViewVisibilityContext.Provider>
    )
    await waitFor(() => {}, { timeout: 0 })
    ;(ref.current as any).showLayersConfig = jest.fn()
    ;(ref.current as any).state.jimuMapView = {
      dataSourceId: 'dataSource_1',
      mapWidgetId: 'widget_2',
      maxLayerIndex: 2,
      view: {
        goTo: jest.fn(),
        map: {
          add: jest.fn(),
          layers: { toArray: () => {} },
          findLayerById: jest.fn()
        }
      }
    }
    ;(ref.current as any).Extent = { fromJSON: () => {} }
    ;(ref.current as any).GraphicsLayer = function () {
      return { fromJSON: () => {} }
    }
    fireEvent.click(getByTitle('Next'))
    await waitFor(
      () => {
        expect((ref.current as any).showLayersConfig).toBeCalledWith(
          undefined,
          undefined,
          undefined,
          false
        )
      },
      { timeout: 1000 }
    )
  })

  it('slide should sync with rtl', async () => {
    const initState = getInitState().merge({
      appContext: { isRTL: true },
      appConfig: { widgets: [] as any }
    })
    getAppStore().dispatch(appActions.updateStoreState(initState))

    const ref: { current: HTMLElement } = { current: null }
    const Widget = wrapWidget(BookmarkWidget, { theme: mockTheme, ref } as any)
    config = lodash.assign({}, config, { templateType: TemplateType.Gallery })
    props = lodash.assign({}, props, { config })
    const { getByTitle } = render(
      <ViewportVisibilityContext.Provider value>
        <Widget widgetId='bookmarkTest2' {...props} />
      </ViewportVisibilityContext.Provider>
    )
    await waitFor(() => {}, { timeout: 0 })
    ;(ref.current as any).scrollContainer = jest.fn()
    fireEvent.click(getByTitle('Next'))
    expect((ref.current as any).scrollContainer).toBeCalledWith({
      behavior: 'smooth',
      top: 0,
      left: -210
    })
    fireEvent.click(getByTitle('Previous'))
    expect((ref.current as any).scrollContainer).toBeCalledWith({
      behavior: 'smooth',
      top: 0,
      left: 210
    })
  })

  it('active on loading in section view', async () => {
    const ref: { current: HTMLElement } = { current: null }
    const Widget = wrapWidget(BookmarkWidget, { theme: mockTheme, ref } as any)
    props = lodash.assign({}, props, { appMode: AppMode.Design })
    const { rerender } = render(
      <ViewVisibilityContext.Provider
        value={{ isInView: true, isInCurrentView: false }}
      >
        <ViewportVisibilityContext.Provider value>
          <Widget widgetId='bookmarkTest1' {...props} />
        </ViewportVisibilityContext.Provider>
      </ViewVisibilityContext.Provider>
    )
    await waitFor(() => {}, { timeout: 0 })
    ;(ref.current as any).onViewBookmark = jest.fn()
    ;(ref.current as any).state.jimuMapView = {
      dataSourceId: 'dataSource_1',
      mapWidgetId: 'widget_2',
      view: {
        when: callback => {
          callback()
        },
        map: {
          add: jest.fn(),
          layers: { toArray: () => {} },
          findLayerById: jest.fn()
        }
      }
    }
    expect((ref.current as any).onViewBookmark).not.toHaveBeenCalled()
    props = lodash.assign({}, props, { appMode: AppMode.Run })
    rerender(
      <ViewVisibilityContext.Provider
        value={{ isInView: true, isInCurrentView: true }}
      >
        <ViewportVisibilityContext.Provider value>
          <Widget widgetId='bookmarkTest1' {...props} />
        </ViewportVisibilityContext.Provider>
      </ViewVisibilityContext.Provider>
    )
    expect((ref.current as any).onViewBookmark).toHaveBeenCalled()
  })

  it('widget should render when apiLoaded is true', async () => {
    const ref: { current: HTMLElement } = { current: null }
    const Widget = wrapWidget(BookmarkWidget, { theme: mockTheme, ref } as any)
    const { getAllByText } = render(
      <ViewVisibilityContext.Provider
        value={{ isInView: false, isInCurrentView: false }}
      >
        <ViewportVisibilityContext.Provider value>
          <Widget widgetId='bookmarkTest1' {...props} />
        </ViewportVisibilityContext.Provider>
      </ViewVisibilityContext.Provider>
    )
    await waitFor(() => {}, { timeout: 0 })
    expect((ref.current as any).state.apiLoaded).toBe(true)
    expect(getAllByText('Test-1')[0]).toBeInTheDocument()
  })

  it('runtime bookmark layer visibility test', async () => {
    const ref: { current: HTMLElement } = { current: null }
    const Widget = wrapWidget(BookmarkWidget, { theme: mockTheme, ref } as any)
    config = lodash.assign({}, config, { templateType: TemplateType.Card })
    props = lodash.assign({}, props, { config })
    const { getByTitle } = render(
      <ViewVisibilityContext.Provider
        value={{ isInView: false, isInCurrentView: false }}
      >
        <ViewportVisibilityContext.Provider value>
          <Widget widgetId='bookmarkTest2' {...props} />
        </ViewportVisibilityContext.Provider>
      </ViewVisibilityContext.Provider>
    )
    await waitFor(() => {}, { timeout: 0 })
    ;(ref.current as any).onViewBookmark = jest.fn()
    ;(ref.current as any).state.jimuMapView = {
      dataSourceId: 'dataSource_1',
      mapWidgetId: 'widget_2',
      view: {
        when: callback => {
          callback()
        },
        extent: { toJSON: () => {} },
        viewpoint: { toJSON: () => {} },
        map: {
          add: jest.fn(),
          operationalLayers: [
            {
              id: 'wildfire_test_ds_change_3528'
            }
          ],
          layers: {
            toArray: () => {
              return [
                {
                  id: 'wildfire_test_ds_change_3528',
                  visible: true
                }
              ]
            }
          },
          findLayerById: jest.fn()
        }
      }
    }
    fireEvent.click(getByTitle('Add bookmark'))
    const runtimeArray = JSON.parse(
      utils.readLocalStorage('exb-/-testWidget1-default-RtBmArray')
    )
    const runtimeBookmark = JSON.parse(utils.readLocalStorage(runtimeArray[0]))
    expect(
      runtimeBookmark.layersConfig.wildfire_test_ds_change_3528.visibility
    ).toBe(true)
  })
})
