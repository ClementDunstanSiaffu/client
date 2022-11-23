import * as React from 'react'
import { shallow } from 'enzyme'
import { mockTheme } from 'jimu-for-test'
import { createIntl } from 'jimu-core'
import ProfileChartSettings from '../src/setting/components/profile-chart-settings'

const validElevationServices = ['https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer']

//Mock Esri request response for valid & invalid Elevation service
jest.mock('jimu-arcgis', () => {
  return {
    loadArcGISJSAPIModules: async () => {
      return await Promise.resolve([
        function (urlValue) {
          if (validElevationServices.includes(urlValue)) {
            return Promise.resolve({
              data: {
                cacheType: 'Elevation'
              }
            })
          } else {
            return Promise.reject({
              error: {}
            })
          }
        }
      ])
    }
  }
})

describe('Validate that the widget properly checks the elevation layer', function () {
  //Create required config for ProfileChartSettings
  const mockProfileChartConfig = {
    isCustomElevationLayer: true,
    elevationLayerURL: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
    linearUnit: 'miles',
    elevationUnit: 'feet',
    displayStatistics: true,
    selectedStatistics: [],
    groundColor: '#b54900',
    graphicsHighlightColor: '00ffff'
  }
  const props = {
    theme: mockTheme,
    intl: createIntl({ locale: 'en' }),
    isRTL: false,
    config: mockProfileChartConfig,
    currentDs: 'default',
    onProfileChartSettingsUpdated: jest.fn(),
    groundLayerInfo: [],
    portalSelf: { units: 'english' } as __esri.Portal
  }
  const wrapper = shallow(<ProfileChartSettings {...props} />)
  const currentInstance = wrapper.instance() as ProfileChartSettings

  it('Should have specified elevation layer URL', async function () {
    await currentInstance.loadAPIModule()
    expect(wrapper.state('updateElevationLayerURL')).toEqual(mockProfileChartConfig.elevationLayerURL)
  })

  it('Valid elevation service URL should be accessible and should not show an error message', async function () {
    await currentInstance.onInputChange(mockProfileChartConfig.elevationLayerURL)
    wrapper.update()
    expect(wrapper.state('isInvalidValue')).toEqual(false)
    expect(wrapper.find('.is-invalid').length).toEqual(0)
  })

  it('Invalid rest end point of an elevation service URL should show an error message', async function () {
    //Invalid Rest end
    const elevationLayerURL = 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/InvalidRestEND'
    await currentInstance.onInputChange(elevationLayerURL)
    wrapper.update()
    expect(wrapper.state('isInvalidValue')).toEqual(true)
    expect(wrapper.find('.is-invalid').length).toEqual(1)
  })

  it('Invalid value in elevation service URL textbox should show an error message', async function () {
    //Invalid url
    const elevationLayerURL = 'InvalidURL'
    wrapper.find('.elevationUrlTextInput').simulate('change', { currentTarget: { value: elevationLayerURL } })
    wrapper.update()
    expect(wrapper.state('isInvalidValue')).toEqual(true)
    expect(wrapper.find('.is-invalid').length).toEqual(1)
  })

  it('Use Ground Elevation Radio should be disabled when using ground elevation URL is not available', async function () {
    //Use ground elevation layer option should be disabled
    expect(wrapper.state('isGroundDisabled')).toEqual(true)
    //Use ground elevation layer option should be disabled and unchecked and Custom Elevation option should be checked
    expect(wrapper.find('Radio').getElements()[0].props.disabled).toEqual(true)
    expect(wrapper.find('Radio').getElements()[0].props.checked).toEqual(false)
    expect(wrapper.find('Radio').getElements()[1].props.checked).toEqual(true)
  })

  it('Should use ground elevation URL if available', async function () {
    const mockConfigToUseGroundElevationURL = {
      isCustomElevationLayer: false,
      elevationLayerURL: '',
      linearUnit: 'miles',
      elevationUnit: 'feet',
      displayStatistics: true,
      selectedStatistics: [],
      groundColor: '#b54900',
      graphicsHighlightColor: '00ffff'
    }
    const props = {
      theme: mockTheme,
      intl: createIntl({ locale: 'en' }),
      isRTL: false,
      config: mockConfigToUseGroundElevationURL,
      currentDs: 'dataSource_1',
      onProfileChartSettingsUpdated: jest.fn(),
      groundLayerInfo: [{
        dataSourceId: 'dataSource_1',
        isGroundElevationLayerExists: true,
        groundElevationLayerUrl: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer'
      }],
      portalSelf: { units: 'english' } as __esri.Portal
    }
    const wrapper = shallow(<ProfileChartSettings {...props} />)
    const currentInstance = wrapper.instance() as ProfileChartSettings
    await currentInstance.loadAPIModule()
    //Use ground elevation layer option should be enabled
    expect(wrapper.state('isGroundDisabled')).toEqual(false)
    //Use ground elevation layer option should be checked and Custom Elevation option should be unchecked
    expect(wrapper.find('Radio').getElements()[0].props.checked).toEqual(true)
    expect(wrapper.find('Radio').getElements()[1].props.checked).toEqual(false)
  })
})
