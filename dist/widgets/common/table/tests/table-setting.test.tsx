import { React, Immutable, appActions, getAppStore } from 'jimu-core'
import TableSetting from '../src/setting/setting'
import { mockTheme, wrapWidgetSetting, widgetSettingRender, getInitState } from 'jimu-for-test'

import { TableArrangeType } from '../src/config'

jest.mock('jimu-ui', () => {
  return {
    ...jest.requireActual<any>('jimu-ui'),
    AdvancedSelect: jest.fn(() => <div data-testid='tableSelectTest' />)
  }
})
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}))

const initState = getInitState().merge({
  appContext: { isRTL: false },
  appStateInBuilder: getInitState().merge({
    appConfig: {
      widgets: [] as any,
      dataSources: {
        dataSourceId: 'dataSource_1-Hydrants_8477',
        mainDataSourceId: 'dataSource_1-Hydrants_8477',
        rootDataSourceId: 'dataSource_1'
      },
      dialogs: {}
    }
  })
})

getAppStore().dispatch(appActions.updateStoreState(initState))

describe('tableSetting test', function () {
  let render = null
  beforeAll(() => {
    render = widgetSettingRender(getAppStore(), mockTheme as any)
  })

  afterAll(() => {
    render = null
  })

  const config = Immutable({
    layersConfig: [{
      id: 'setting-test-2',
      name: 'setting-test-2',
      useDataSource: {
        dataSourceId: 'dataSource_1-Hydrants_8477',
        mainDataSourceId: 'dataSource_1-Hydrants_8477',
        rootDataSourceId: 'dataSource_1'
      },
      allFields: [{
        jimuName: 'OBJECTID',
        name: 'OBJECTID',
        type: 'NUMBER',
        esriType: 'esriFieldTypeOID',
        alias: 'OBJECTID'
      }],
      tableFields: [{
        jimuName: 'OBJECTID',
        name: 'OBJECTID',
        type: 'NUMBER',
        esriType: 'esriFieldTypeOID',
        alias: 'OBJECTID'
      }],
      enableAttachements: false,
      enableSearch: false,
      searchFields: 'FACILITYID',
      enableEdit: false,
      enableRefresh: true,
      enableSelect: true,
      allowCsv: false
    }],
    arrangeType: TableArrangeType.Tabs
  })

  const props = {
    config
  }

  it.only('add new tab check config id', () => {
    const ref: { current: HTMLElement } = { current: null }
    const Setting = wrapWidgetSetting(TableSetting, { theme: mockTheme, ref } as any)
    const { getByText, getByLabelText } = render(<Setting widgetId='tableSettingTest1' {...props} />)
    expect(getByText('setting-test-2')).toBeInTheDocument()
    expect((ref.current as any).getNewConfigId('dataSource_1-Hydrants_8477')).toBe('dataSource_1-Hydrants_8477-3')
    expect(getByLabelText('dataSourceCreateError')).toBeInTheDocument()
  })
})
