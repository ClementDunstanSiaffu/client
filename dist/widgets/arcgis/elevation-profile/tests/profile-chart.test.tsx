import { React, createIntl } from 'jimu-core'
import { shallow } from 'enzyme'
import { mockTheme } from 'jimu-for-test'
import Chart from '../src/runtime/components/profile-chart'
import Graphic from 'esri/Graphic'
import GraphicsLayer from 'esri/layers/GraphicsLayer'
import { unitOptions } from '../src/runtime/constants'

jest.mock('esri/widgets/support/chartUtils', () => {
  return {
    default: {
      loadChartsModule: jest.fn().mockImplementation(moduleId => {
      })
    }
  }
}, { virtual: true })
jest.mock('esri/intl', () => { return {} }, { virtual: true })
jest.mock('esri/core/lang', () => { return {} }, { virtual: true })
jest.mock('esri/geometry/geometryEngineAsync', () => { return {} }, { virtual: true })
jest.mock('esri/geometry/Polyline', () => { return {} }, { virtual: true })
jest.mock('esri/geometry/SpatialReference', () => { return {} }, { virtual: true })
jest.mock('esri/core/unitUtils', () => { return {} }, { virtual: true })
jest.mock('esri/Graphic', () => { return { attributes: { MyLength: 100 } } }, { virtual: true })
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

describe('Profile chart test cases', () => {
  const mockGeneralSettings = {
    isSelectToolActive: true,
    isDrawToolActive: false,
    showGridAxis: true,
    showAxisTitles: true,
    showLegend: true,
    buttonStyle: 'ICONTEXT'
  }

  const mockProfileResult = {
    effectiveUnits: {
      distance: 'miles',
      elevation: 'feet'
    },
    lines: [
      {
        id: '4d5d129d-fde8-482d-9e9e-df38c277499d',
        type: 'query',
        color: [
          181,
          73,
          0,
          255
        ],
        samples: [
          {
            x: -13311524.802220447,
            y: 4544544.071686943,
            z: 1664.0834970808673,
            distance: 0,
            elevation: 5459.591525855863
          },
          {
            x: -13311522.662993962,
            y: 4544546.2109256,
            z: 1666.1297140855365,
            distance: 7.8412073490813645,
            elevation: 5466.304836238636
          },
          {
            x: -13311520.523766598,
            y: 4544548.350164248,
            z: 1668.0704203527498,
            distance: 15.682414698162729,
            elevation: 5472.671982784612
          },
          {
            x: -13311518.384538362,
            y: 4544550.489402889,
            z: 1669.9476548645944,
            distance: 23.523622047244093,
            elevation: 5478.830888663367
          },
          {
            x: -13311516.24530925,
            y: 4544552.628641522,
            z: 1671.7449492817398,
            distance: 31.364829396325458,
            elevation: 5484.727523890222
          },
          {
            x: -13311514.106079267,
            y: 4544554.767880147,
            z: 1673.4092881745376,
            distance: 39.20603674540683,
            elevation: 5490.187953328535
          },
          {
            x: -13311511.966848405,
            y: 4544556.907118767,
            z: 1675.0187716533378,
            distance: 47.04724409448819,
            elevation: 5495.468410936147
          }
        ],
        progress: 1,
        chartFillEnabled: true,
        chartStrokeWidth: 1.5,
        chartStrokeOffsetY: 0,
        viewVisualizationEnabled: true
      }
    ]
  }
  const mockCurrentConfig = {
    profileChartSettings: {
      isCustomElevationLayer: true,
      elevationLayerURL: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
      linearUnit: '',
      elevationUnit: '',
      displayStatistics: true,
      selectedStatistics: [
        {
          name: 'avgElevation',
          label: 'AVG Elevation',
          enabled: true
        }
      ],
      groundColor: '#b54900',
      graphicsHighlightColor: '#00ffff'
    },
    advanceOptions: false,
    profileSettings: {
      layers: [
        {
          layerId: 'dataSource_1-EP_base_2249',
          elevationSettings: {
            type: 'one',
            unit: 'feet',
            field1: '',
            field2: ''
          },
          distanceSettings: {
            type: 'map',
            unit: 'feet',
            field: ''
          },
          style: {
            lineType: 'solid-line',
            lineColor: '#049546',
            lineThickness: 3
          }
        }
      ]
    }
  }

  const props = {
    intl: createIntl({ locale: 'en' }),
    parentWidgetId: 'widget_1',
    commonGeneralSettings: mockGeneralSettings,
    activeDs: 'datasource_1',
    currentConfig: mockCurrentConfig,
    theme: mockTheme,
    selectedLinearUnit: 'meters',
    selectedElevationUnit: 'miles',
    profileResult: mockProfileResult,
    unitOptions: unitOptions,
    elevationGraphColor: '#b54900',
    isFlip: false,
    isUniformChartScalingEnable: false,
    mapView: null,
    drawingLayer: new GraphicsLayer(),
    highlightChartPositionOnMap: jest.fn(),
    hideChartPosition: jest.fn(),
    chartInfo: jest.fn(),
    toggleLegendSeriesState: jest.fn()
  }
  const wrapper = shallow(<Chart {...props} />)
  const currentInstance = wrapper.instance() as Chart
  it('Display the chart legend', function () {
    expect(wrapper.state('showLegend')).toEqual(mockGeneralSettings.showLegend)
  })

  it('Validate the distance and elevation values for ground elevation and profile line are converted', function () {
    const selectedGraphic = { attributes: { MyLength: 10 } }
    const configuredSettings = { field: 'MyLength', unit: 'kilometers' }
    const value = currentInstance.getDistanceAsPerConfiguredFieldAndUnits(configuredSettings, selectedGraphic as Graphic)
    expect(value).toEqual(10000)
  })

  it('Validate that the chart object is made when a segment is drawn or selected', async function () {
    //we will validate this by check if the charDefination is not null
    currentInstance.createOrUpdateChartDefinition()
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
    expect(wrapper.state('chartDefinition')).not.toBeNull()
  })
})
