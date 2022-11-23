import { React, getAppStore, appActions, IMThemeVariables, ImmutableArray, Immutable } from 'jimu-core'
import { wrapWidget, widgetRender, getInitState, getDefaultAppConfig, mockTheme } from 'jimu-for-test'
import ElevationProfileWidget from '../src/runtime/widget'

getAppStore().dispatch(appActions.updateStoreState(getInitState().merge({ appConfig: getDefaultAppConfig() })))
const Widget = wrapWidget(ElevationProfileWidget)
const render = widgetRender()

jest.mock('esri/widgets/support/chartUtils', () => {
  return {
    loadChartsModule: jest.fn().mockImplementation(moduleId => {
    })
  }
}, { virtual: true })
jest.mock('esri/intl', () => { return { } }, { virtual: true })
jest.mock('esri/core/lang', () => { return { } }, { virtual: true })
jest.mock('esri/geometry/geometryEngineAsync', () => { return { } }, { virtual: true })
jest.mock('esri/geometry/Polyline', () => { return { } }, { virtual: true })
jest.mock('esri/geometry/SpatialReference', () => { return { } }, { virtual: true })
jest.mock('esri/core/unitUtils', () => { return { } }, { virtual: true })
jest.mock('esri/Graphic', () => { return { } }, { virtual: true })
jest.mock('esri/widgets/Sketch/SketchViewModel', () => { return { } }, { virtual: true })
jest.mock('esri/Color', () => { return { } }, { virtual: true })
jest.mock('esri/layers/GraphicsLayer', () => {
  return {
    default: jest.fn().mockImplementation(() => {
      return {
        removeAll: () => (null),
        destroy: () => (null)
      }
    })
  }
}, { virtual: true })
jest.mock('esri/geometry/Point', () => { return { } }, { virtual: true })
jest.mock('esri/geometry/Extent', () => { return { } }, { virtual: true })
jest.mock('esri/rest/support/Query', () => { return { } }, { virtual: true })
jest.mock('esri/rest/query', () => { return { } }, { virtual: true })
jest.mock('esri/geometry/geometryEngine', () => { return { } }, { virtual: true })
jest.mock('esri/widgets/ElevationProfile/ElevationProfileViewModel', () => { return { } }, { virtual: true })
jest.mock('esri/core/watchUtils', () => { return { } }, { virtual: true })
jest.mock('esri/layers/ElevationLayer', () => { return { } }, { virtual: true })
jest.mock('esri/symbols/support/jsonUtils', () => { return { } }, { virtual: true })
jest.mock('esri/geometry/Polyline', () => { return { } }, { virtual: true })
jest.mock('esri/geometry/SpatialReference', () => { return { } }, { virtual: true })
const commonConfig = {
  useMapWidget: false,
  activeDataSource: 'default',
  generalSettings: {
    isSelectToolActive: false,
    isDrawToolActive: false,
    showGridAxis: true,
    showAxisTitles: false,
    showLegend: true,
    buttonStyle: 'ICONTEXT'
  },
  configInfo: {
    default: {
      profileChartSettings: {
        isCustomElevationLayer: true,
        elevationLayerURL: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
        linearUnit: 'meters',
        elevationUnit: 'kilometers',
        displayStatistics: true,
        selectedStatistics: [],
        groundColor: '#b54900',
        graphicsHighlightColor: '#b54900'
      }
    }
  }
}

//Since Surfaces are not available in mock theme we are overriding it
const theme = {
  ...mockTheme,
  surfaces: [{ bg: '#fff' }, { bg: '#fff' }]
} as unknown as IMThemeVariables

describe('Validate availability of Draw and Select tool depending on available data sources and selectable line layers', () => {
  it('If the map is not selected through selector or None is selected then widget placeholder should be shown', function () {
    const { queryByTestId } = render(<Widget theme={theme} config={commonConfig} layouts={{} as any} />)
    expect(queryByTestId('widgetPlaceholder')).toBeInTheDocument()
  })

  it('If the map is selected through a selector and no web map/scene is found in the Map widget then only the Draw tool should be available.', function () {
    const useMapWidgetId: ImmutableArray<string> = Immutable(['widget_1'])
    const config = {
      ...commonConfig,
      useMapWidget: true,
      activeDataSource: 'default'
    }
    const { queryByTestId, getByTestId } = render(<Widget useMapWidgetIds={useMapWidgetId} theme={theme} config={config} layouts={{} as any} />)
    expect(queryByTestId('drawButton')).toBeInTheDocument()
    expect(getByTestId('drawButton')).toHaveClass('front-section')
    expect(getByTestId('selectButton')).toHaveClass('hidden')
  })

  it('Only show draw tool if there are no selectable lines in the map/scene.', function () {
    const useMapWidgetId: ImmutableArray<string> = Immutable(['widget_1'])
    const config = {
      ...commonConfig,
      useMapWidget: true,
      activeDataSource: 'dataSource_1',
      configInfo: {
        dataSource_1: {
          advanceOptions: true,
          profileSettings: {
            layers: []
          },
          profileChartSettings: {
            linearUnit: 'meters',
            elevationUnit: 'kilometers'
          }
        }
      }
    }
    const { getByTestId } = render(<Widget useMapWidgetIds={useMapWidgetId} theme={theme} config={config} layouts={{} as any} />)
    expect(getByTestId('drawButton')).toHaveClass('front-section')
    expect(getByTestId('selectButton')).toHaveClass('hidden')
  })
})
