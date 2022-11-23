import {
  React,
  appActions,
  getAppStore,
  ImmutableObject,
  UseDataSource,
  lodash
} from 'jimu-core'
import LayerConfig from '../src/setting/layer-config'
import { getInitState, mockTheme, withStoreThemeIntlRender } from 'jimu-for-test'
import {
  layerConfig,
  UseDataSources
} from './config'
import { createIntl } from 'react-intl'

jest.mock('jimu-arcgis', () => {
  return {
    loadArcGISJSAPIModules: async () => {
      return await Promise.resolve([
        function () {
          return {
            fromJSON: () => {},
            clearSelection: () => {}
          }
        },
        function () {
          return { fromJSON: () => {} }
        }
      ])
    }
  }
})

const initState = getInitState().merge({
  appContext: { isRTL: false },
  appConfig: {
    widgets: [] as any,
    dataSources: UseDataSources[0],
    dialogs: {}
  }
})

getAppStore().dispatch(appActions.updateStoreState(initState))
const render = withStoreThemeIntlRender(getAppStore(), mockTheme as any)

describe('table config panel test', function () {
  it.only('ds fields change will not change tableFields of config', () => {
    const ref = { current: null }
    const dataSourceChangeSave = jest.fn()
    const optionChangeSave = jest.fn()
    const onCloseLayerPanel = jest.fn()
    const { rerender } = render(
      <LayerConfig
        {...layerConfig as any}
        intl={createIntl({ locale: 'en' })}
        theme={mockTheme}
        useDataSource={UseDataSources[0] as ImmutableObject<UseDataSource>}
        dataSourceChange={dataSourceChangeSave}
        optionChange={optionChangeSave}
        onClose={onCloseLayerPanel}
        ref={ref}
      />
    )
    const current = ref.current
    current.getFieldsFromDatasource = jest.fn(() => {
      return {
        allFields: [
          {
            alias: 'uniqueId_alias',
            esriType: 'esriFieldTypeInteger',
            format: undefined,
            jimuName: 'uniqueId',
            name: 'uniqueId',
            type: 'NUMBER'
          }
        ],
        tableFields: [
          {
            alias: 'uniqueId_alias',
            esriType: 'esriFieldTypeInteger',
            format: undefined,
            jimuName: 'uniqueId',
            name: 'uniqueId',
            type: 'NUMBER'
          }
        ]
      }
    })
    rerender(
      <LayerConfig
        {...layerConfig as any}
        intl={createIntl({ locale: 'en' })}
        theme={mockTheme}
        useDataSource={UseDataSources[0] as ImmutableObject<UseDataSource>}
        dataSourceChange={dataSourceChangeSave}
        optionChange={optionChangeSave}
        onClose={onCloseLayerPanel}
        ref={ref}
      />
    )
    expect(current.props.tableFields[0].jimuName).toBe('OBJECTID')
  })

  it.only('searching fields is supposed to follow the change of the "initial display fields"', () => {
    const ref = { current: null }
    const dataSourceChangeSave = jest.fn()
    const optionChangeSave = jest.fn()
    const onCloseLayerPanel = jest.fn()
    const newLayerConfig = lodash.assign({}, layerConfig, {
      tableFields: [
        {
          alias: 'name_alias',
          esriType: 'esriFieldTypeString',
          jimuName: 'name',
          name: 'name',
          type: 'STRING'
        }
      ]
    })
    const { getByText } = render(
      <LayerConfig
        {...newLayerConfig as any}
        intl={createIntl({ locale: 'en' })}
        theme={mockTheme}
        useDataSource={UseDataSources[0] as ImmutableObject<UseDataSource>}
        dataSourceChange={dataSourceChangeSave}
        optionChange={optionChangeSave}
        onClose={onCloseLayerPanel}
        ref={ref}
      />
    )
    expect(getByText('name_alias')).toBeInTheDocument()
  })
})
