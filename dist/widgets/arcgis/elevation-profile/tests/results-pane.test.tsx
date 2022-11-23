import * as React from 'react'
import { getAppStore, createIntl, DataSourceManager } from 'jimu-core'
import ResultPane from '../src/runtime/components/results-pane'
import { mockTheme, wrapWidget, widgetRender } from 'jimu-for-test'
import { fireEvent } from '@testing-library/react'
import GraphicsLayer from 'esri/layers/GraphicsLayer'
import { JimuMapView } from 'jimu-arcgis'
import { shallow } from 'enzyme'

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

let render = null
beforeAll(() => {
  render = widgetRender(getAppStore(), mockTheme as any)
})
afterAll(() => {
  render = null
})

const commonProps = {
  theme: mockTheme,
  intl: createIntl({ locale: 'en' }),
  widgetId: 'widget_2',
  portalSelf: { units: 'english' } as __esri.Portal,
  chartRender: false,
  displayLoadingIndicator: false,
  chartColorRender: '#b54900',
  drawingOrSelectingComplete: false,
  selectMode: false,
  drawMode: true,
  isNewSegmentsForSelection: false,
  noGraphicAfterFirstSelection: false,
  noFeaturesFoundError: false,
  viewModelErrorState: true,
  defaultConfig: {
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
  },
  profileResult: {},
  profileErrorMsg: '',
  jimuMapview: JimuMapView,
  drawingLayer: new GraphicsLayer(),
  commonDsGeneralSettings: {
    isSelectToolActive: true,
    isDrawToolActive: false,
    showGridAxis: true,
    showAxisTitles: false,
    showLegend: true,
    buttonStyle: 'ICONTEXT'
  },
  activeDatasourceConfig: {
    profileChartSettings: {
      isCustomElevationLayer: true,
      elevationLayerURL: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
      linearUnit: 'meters',
      elevationUnit: 'kilometers',
      displayStatistics: true,
      selectedStatistics: [],
      groundColor: '#b54900',
      graphicsHighlightColor: '#b54900'
    },
    profileSettings: {
      layers: []
    }
  },
  selectabelLayersRuntime: jest.fn(),
  doneClick: jest.fn(),
  onNavBack: jest.fn(),
  activateDrawSelectToolForNewProfile: jest.fn(),
  hideChartPosition: jest.fn(),
  chartPosition: jest.fn(),
  activeDataSource: 'default'
}

//Test cases depends on the props value which are passed through the widget
describe('Validate message states to display the appropriate alerts', function () {
  it('Should prompt the user to select or draw on the map or scene if they click Done without having drawn or selected.', function () {
    const ref: { current: HTMLElement } = { current: null }
    const props = { ...commonProps }
    const Widget = wrapWidget(ResultPane as any, { theme: mockTheme, ref } as any)
    const { getByTitle, getByText } = render(<Widget widgetId='resultspane' {...props} />)
    fireEvent.click(getByTitle((ref.current as any).nls('doneButtonLabel')))
    expect(getByText((ref.current as any).nls('drawUserInfo'))).toBeInTheDocument()
    expect(getByText((ref.current as any).nls('emptyDrawStateWarning'))).toBeInTheDocument()
  })

  it('Should show a message when no further line features can be selected.', function () {
    const ref: { current: HTMLElement } = { current: null }
    const props = {
      ...commonProps,
      chartRender: true,
      drawingOrSelectingComplete: true,
      selectMode: true,
      drawMode: false,
      isNewSegmentsForSelection: false,
      noGraphicAfterFirstSelection: false,
      noFeaturesFoundError: false,
      viewModelErrorState: false
    }
    //There are no additional connected lines to select. - Msg should be shown
    const Widget = wrapWidget(ResultPane as any, { theme: mockTheme, ref } as any)
    const { getByText } = render(<Widget widgetId='resultsPane' {...props} />)
    expect(getByText((ref.current as any).nls('addToSelectionWarning'))).toBeInTheDocument()
  })

  it('Should show message info if there is a new segment selectable for the selected line features.', function () {
    const ref: { current: HTMLElement } = { current: null }
    const props = {
      ...commonProps,
      chartRender: true,
      drawingOrSelectingComplete: false,
      selectMode: true,
      drawMode: false,
      isNewSegmentsForSelection: true,
      noGraphicAfterFirstSelection: true,
      viewModelErrorState: false,
      noFeaturesFoundError: false
    }
    //'Select a connected line or click Done to finish.' Msg should be shown
    const Widget = wrapWidget(ResultPane as any, { theme: mockTheme, ref } as any)
    const { getByText } = render(<Widget widgetId='resultsPane' {...props} />)
    expect(getByText((ref.current as any).nls('infoMsgWhileSelecting'))).toBeInTheDocument()
  })

  it('Should return an error if polylines are drawn or selected where no elevation ground layer exists.', function () {
    const ref: { current: HTMLElement } = { current: null }
    const props = {
      ...commonProps,
      viewModelErrorState: true,
      chartRender: false,
      drawingOrSelectingComplete: false,
      selectMode: true,
      drawMode: false,
      isNewSegmentsForSelection: false,
      noGraphicAfterFirstSelection: false,
      noFeaturesFoundError: false,
      profileErrorMsg: 'No elevation information is available for this location.'
    }
    //'No elevation information is available for this location.' Msg Should be shown
    const Widget = wrapWidget(ResultPane as any, { theme: mockTheme, ref } as any)
    const { getByText } = render(<Widget widgetId='resultspane' {...props} />);
    (ref.current as any).state.viewModelErrorMsg = props.profileErrorMsg
    expect(getByText((ref.current as any).state.viewModelErrorMsg)).toBeInTheDocument()
  })
})

describe('Validate button states at runtime', function () {
  it('Should have the ability to load the widget with either the draw or the select tool active.', () => {
    //In this case we are making Draw tool active from config and checking the msg shown once draw tool is activated at runtime
    const ref: { current: HTMLElement } = { current: null }
    const props = {
      ...commonProps,
      chartRender: false,
      drawMode: true,
      selectMode: false,
      noFeaturesFoundError: false,
      viewModelErrorState: false,
      commonDsGeneralSettings: {
        isSelectToolActive: false,
        isDrawToolActive: true,
        showGridAxis: true,
        showAxisTitles: false,
        showLegend: true,
        buttonStyle: 'ICONTEXT'
      }
    }
    const Widget = wrapWidget(ResultPane as any, { theme: mockTheme, ref } as any)
    const { getByText } = render(<Widget widgetId='resultpane' {...props} />)
    expect(getByText((ref.current as any).nls('drawUserInfo'))).toBeInTheDocument()
  })

  it('Should display the clear button when the chart is rendered', function () {
    const ref: { current: HTMLElement } = { current: null }
    const props = {
      ...commonProps,
      chartRender: true,
      drawingOrSelectingComplete: true,
      selectMode: true,
      isNewSegmentsForSelection: false,
      noGraphicAfterFirstSelection: false,
      noFeaturesFoundError: false,
      viewModelErrorState: false
    }
    const Widget = wrapWidget(ResultPane as any, { theme: mockTheme, ref } as any)
    const { getByTitle } = render(<Widget widgetId='resultspane' {...props} />)
    expect(getByTitle((ref.current as any).nls('clearButtonLabel'))).toBeInTheDocument()
  })

  it('Should display flip and statistics button when the chart is rendered', function () {
    const ref: { current: HTMLElement } = { current: null }
    const props = {
      ...commonProps,
      chartRender: true,
      drawingOrSelectingComplete: false,
      selectMode: true,
      isNewSegmentsForSelection: false,
      noGraphicAfterFirstSelection: false,
      noFeaturesFoundError: false,
      viewModelErrorState: false
    }
    const Widget = wrapWidget(ResultPane as any, { theme: mockTheme, ref } as any)
    const { getByTitle } = render(<Widget widgetId='resultspane' {...props} />)
    expect(getByTitle((ref.current as any).nls('chartStatistics'))).toBeInTheDocument()
    expect(getByTitle((ref.current as any).nls('chartFlip'))).toBeInTheDocument()
  })

  it('When the chart is rendered, on click Done button should hide the clear and Done button and show the New Profile button', function () {
    const ref: { current: HTMLElement } = { current: null }
    const props = {
      ...commonProps,
      chartRender: true,
      drawingOrSelectingComplete: true
    }
    const Widget = wrapWidget(ResultPane as any, { theme: mockTheme, ref } as any)
    const { getByTitle } = render(<Widget widgetId='resultspane' {...props} />)
    fireEvent.click(getByTitle((ref.current as any).nls('doneButtonLabel')))
    expect(getByTitle((ref.current as any).nls('clearButtonLabel'))).toHaveClass('hidden')
    expect(getByTitle((ref.current as any).nls('doneButtonLabel'))).toHaveClass('hidden')
    expect(getByTitle((ref.current as any).nls('newProfileButtonLabel'))).toBeInTheDocument()
  })
})

describe('Validate statistics button visibility at runtime', function () {
  it('Should display statistics button when Profile statistics option is turned on from config', function () {
    const ref: { current: HTMLElement } = { current: null }
    const props = {
      ...commonProps,
      chartRender: true
    }
    props.activeDatasourceConfig.profileChartSettings.displayStatistics = true
    const Widget = wrapWidget(ResultPane as any, { theme: mockTheme, ref } as any)
    const { getByTitle } = render(<Widget widgetId='resultspane' {...props} />)
    expect(getByTitle((ref.current as any).nls('chartStatistics'))).toBeInTheDocument()
  })

  it('Should not display statistics button when Profile statistics option is turned off from config', function () {
    const ref: { current: HTMLElement } = { current: null }
    const props = {
      ...commonProps,
      chartRender: true
    }
    props.activeDatasourceConfig.profileChartSettings.displayStatistics = false
    const Widget = wrapWidget(ResultPane as any, { theme: mockTheme, ref } as any)
    const { queryByText } = render(<Widget widgetId='resultspane' {...props} />)
    const element = queryByText((ref.current as any).nls('chartStatistics'))
    expect(element).toBeNull()
  })
})

describe('Validate that the widget properly checks that the selectable line layers are', function () {
  let mockFn = null
  let dss = null
  let mockFnGetDataSource = null
  beforeAll(() => {
    //mock the datasource with its child datasources including id, layerDefinition, type and schema
    mockFn = jest.fn().mockImplementation(() => {
      return [
        {
          id: 'lineLayer',
          layerDefinition: {
            geometryType: 'esriGeometryPolyline'
          },
          type: 'FEATURE_LAYER',
          schema: {
            label: 'Line Layer'
          }
        },
        {
          id: 'pointLayer',
          layerDefinition: {
            geometryType: 'esriGeometryPoint'
          },
          type: 'FEATURE_LAYER',
          schema: {
            label: 'Point Layer'
          }
        },
        {
          id: 'polygonLayer',
          layerDefinition: {
            geometryType: 'esriGeometryPolygon'
          },
          type: 'FEATURE_LAYER',
          schema: {
            label: 'Polygon Layer'
          }
        }
      ]
    })

    dss = {
      dataSource_1: {
        getChildDataSources: mockFn
      },
      dataSource_2: {
        getChildDataSources: jest.fn().mockImplementation(() => {
          return [
            {
              id: 'pointLayer',
              layerDefinition: {
                geometryType: 'esriGeometryPoint'
              },
              type: 'FEATURE_LAYER',
              schema: {
                label: 'Point Layer'
              }
            },
            {
              id: 'polygonLayer',
              layerDefinition: {
                geometryType: 'esriGeometryPolygon'
              },
              type: 'FEATURE_LAYER',
              schema: {
                label: 'Polygon Layer'
              }
            }
          ]
        })
      }
    }
    mockFnGetDataSource = jest.fn().mockImplementation(dsId => {
      return dss[dsId] == null ? dss.ds1 : dss[dsId]
    })
    DataSourceManager.getInstance().getDataSource = mockFnGetDataSource
  })

  it('Available in the map/scene', function () {
    const props = {
      ...commonProps,
      activeDataSource: 'dataSource_1'
    }
    const wrapper = shallow(<ResultPane {...props as any} />)
    expect(wrapper.state('selectedLayers')).toHaveLength(1)
    expect(wrapper.state('isAnyProfileLineLayers')).toEqual(true)
  })

  it('Not available in the map/scene', function () {
    const props = {
      ...commonProps,
      activeDataSource: 'dataSource_2'
    }
    const wrapper = shallow(<ResultPane {...props as any} />)
    expect(wrapper.state('selectedLayers')).toHaveLength(0)
    expect(wrapper.state('isAnyProfileLineLayers')).toEqual(false)
  })

  it('Validate geometry for generating the chart  - Point & Polygon should not be selectable', function () {
    const props = {
      ...commonProps,
      activeDataSource: 'dataSource_2'
    }
    const wrapper = shallow(<ResultPane {...props as any} />)
    //since in data source 2- we have only point and polygon layers the selected layers array will not any layer
    expect(wrapper.state('selectedLayers')).toHaveLength(0)
    expect(wrapper.state('isAnyProfileLineLayers')).toEqual(false)
  })
})
