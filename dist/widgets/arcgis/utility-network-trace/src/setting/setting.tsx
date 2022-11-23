/** @jsx jsx */
import {
  jsx,
  React,
  DataSourceManager,
  defaultMessages as jimuCoreDefaultMessages,
  Immutable
} from 'jimu-core'
import { BaseWidgetSetting, AllWidgetSettingProps } from 'jimu-for-builder'
import {
  Switch,
  Checkbox,
  TextInput,
  Tooltip,
  Alert,
  Label,
  defaultMessages as jimuUIDefaultMessages
} from 'jimu-ui'
import {
  MapWidgetSelector,
  SettingSection,
  SettingRow,
  SettingCollapse
} from 'jimu-ui/advanced/setting-components'
import {
  IMConfig,
  InputSetting,
  TraceResultConfig,
  TraceConfig,
  ConfigObject
} from '../config'

import defaultMessages from './translations/default'
import { JimuMapView, MapViewManager } from 'jimu-arcgis'
import { List, TreeItemActionType } from 'jimu-ui/basic/list-tree'
import { getStyle } from './lib/style'
import WebMap from 'esri/WebMap'
import { ColorPicker } from 'jimu-ui/basic/color-picker'

import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { WarningOutlined } from 'jimu-icons/outlined/suggested/warning'
//import { CloseOutlined } from 'jimu-icons/outlined/editor/close'
import EditFilled from 'jimu-icons/svg/filled/editor/edit.svg'
import EditOutlined from 'jimu-icons/svg/outlined/editor/edit.svg'
import SymbolSettings, { defaultSymbol } from './symbol_settings'

interface MapConfig {
  isValid: boolean
  label: string
  dataSource: JimuMapView
}

interface State {
  activeDataSource: string
  dataSources: any[]
  isNoMapSelected: boolean
  mapWidgetExists: boolean
  showTraceItemPanel: boolean
  currentMapConfig: MapConfig
  showInputSettings: boolean
  showStartingPointBlock: boolean
  showBarriersBlock: boolean
  showTraceSettings: boolean
  traces: any[]
  defaultTraceResultSettings: TraceResultConfig
  defaultInputSettings: InputSetting[]
}

export default class Setting extends BaseWidgetSetting<
AllWidgetSettingProps<IMConfig>,
State
> {
  nls = (id: string) => {
    const messages = Object.assign(
      {},
      defaultMessages,
      jimuUIDefaultMessages,
      jimuCoreDefaultMessages
    )
    //for unit testing no need to mock intl we can directly use default en msg
    if (this.props.intl && this.props.intl.formatMessage) {
      return this.props.intl.formatMessage({
        id: id,
        defaultMessage: messages[id]
      })
    } else {
      return messages[id]
    }
  };

  constructor (props) {
    super(props)
    this.state = {
      activeDataSource: this.props.config.activeDataSource
        ? this.props.config.activeDataSource
        : null,
      dataSources: [],
      isNoMapSelected: !this.props.config.useMapWidget,
      mapWidgetExists: true,
      showTraceItemPanel: false,
      currentMapConfig: null,
      showInputSettings: true,
      showStartingPointBlock: true,
      showBarriersBlock: false,
      showTraceSettings: false,
      traces: [],
      defaultTraceResultSettings: {
        showSelectedFeatureList: true,
        selectFeaturesOnComplete: true,
        graphicsColor: {
          color: [255, 255, 0, 0.6],
          haloOpacity: 0.9,
          fillOpacity: 0.2,
          hex: '#FFFF00'
        },
        showGraphicsOnComplete: true
      },
      defaultInputSettings: [
        {
          type: 'starting-point',
          label: this.nls('startingPointLabel'),
          description: this.nls('startingPointHint'),
          inputSymbol: {
            zoomScale: 1500,
            defaultPointSymbol: defaultSymbol
          },
          maxInputs: 50
        },
        {
          type: 'barrier',
          label: this.nls('barrierLabel'),
          description: this.nls('barrierHint'),
          inputSymbol: {
            zoomScale: 1500,
            defaultPointSymbol: defaultSymbol
          },
          maxInputs: 50
        }
      ]
    }
  }

  dsRef = React.createRef<HTMLDivElement>();
  readonly mvManager: MapViewManager = MapViewManager.getInstance();
  private dataSourceOptions = [];

  componentDidMount () {
    if (this.props.config.useMapWidgetIds) {
      this.getAvailableDataSources(this.props.config.useMapWidgetIds)
    }
  }

  onMapWidgetSelected = async (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds
    })

    setTimeout(() => {
      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.set('useMapWidgetIds', useMapWidgetIds)
      })
    }, 500)

    let isNoneMapSelected: boolean
    if (useMapWidgetIds.length > 0) {
      isNoneMapSelected = false
      await this.getAvailableDataSources(useMapWidgetIds)
    } else {
      //display the warning message to select the webmap or webscene
      isNoneMapSelected = true
      this.setState({ dataSources: [] })
    }
    this.updateConfigForMapWidget(isNoneMapSelected)
  };

  updateConfigForMapWidget = (isMapWidgetAvailable: boolean) => {
    this.setState(
      {
        mapWidgetExists: !isMapWidgetAvailable,
        isNoMapSelected: isMapWidgetAvailable
      },
      () => {
        this.props.onSettingChange({
          id: this.props.id,
          config: this.props.config.set('useMapWidget', !isMapWidgetAvailable)
        })
      }
    )
  };

  getAvailableDataSources = async (useMapWidgetIds) => {
    const mapViewGroups = this.mvManager.getJimuMapViewGroup(useMapWidgetIds)
    this.dataSourceOptions = []

    //Create data sources on the basis of active webmap/webscene
    if (mapViewGroups && mapViewGroups.jimuMapViews) {
      for (const id in mapViewGroups.jimuMapViews) {
        if (mapViewGroups.jimuMapViews[id].dataSourceId) {
          if (
            mapViewGroups.jimuMapViews[id].isActive ||
            mapViewGroups.jimuMapViews[id].isActive === undefined
          ) {
            this.setState(
              {
                activeDataSource: id
              },
              () => {
                setTimeout(() => {
                  this.props.onSettingChange({
                    id: this.props.id,
                    config: this.props.config.set('activeDataSource', id)
                  })
                }, 500)
              }
            )
          }
          //check if each view has valid traces
          const valid = await this.checkIfMapViewHasTraces(
            mapViewGroups.jimuMapViews[id]
          )

          this.dataSourceOptions.push({
            label: this.getDataSourceLabel(
              mapViewGroups.jimuMapViews[id].dataSourceId
            ),
            value: mapViewGroups.jimuMapViews[id].dataSourceId,
            isValid: valid,
            dataSource: mapViewGroups.jimuMapViews[id]
          })

          //get traces if valid
          if (valid) {
            const traces = await this.getTracesInMapView(
              mapViewGroups.jimuMapViews[id]
            )
            if (traces.length > 0) {
              const args: ConfigObject = {
                mapId: id,
                inputSettings: null,
                traceSettings: null
              }
              this.getConfigForSelectedDs(args)
            }
          }
        }
      }

      this.setState({
        dataSources: this.dataSourceOptions
      })
    }
  };

  getDataSourceLabel = (dataSourceId: string): string => {
    if (!dataSourceId) {
      return ''
    }
    const dsObj = DataSourceManager.getInstance().getDataSource(dataSourceId)
    const label = dsObj.getLabel()
    return label || dataSourceId
  };

  getConfigForSelectedDs = (mapTraceSetting: ConfigObject) => {
    if (Object.prototype.hasOwnProperty.call(this.props.config, 'configInfo')) {
      //config already exist
      if (this.state.traces.length > 0) {
        let found = false
        const localConfig = [...this.props.config.configInfo]
        localConfig.forEach((ci) => {
          //loop through the config and match map id to update it accordingly
          if (ci.mapId === mapTraceSetting.mapId) {
            if (mapTraceSetting.inputSettings !== null) {
              ci.inputSettings.forEach((is) => {
                mapTraceSetting.inputSettings.forEach((mis) => {
                  if (mis.type === is.type) {
                    is = mis
                  }
                })
              })
            }
            ci.traceSettings.forEach((ts) => {
              if (mapTraceSetting.traceSettings !== null) {
                mapTraceSetting.traceSettings.forEach((mts) => {
                  if (mts.globalId === ts.globalId) {
                    ts = mts
                  }
                })
              }
            })
            found = true
          }
        })
        if (found) {
          setTimeout(() => {
            this.props.onSettingChange({
              id: this.props.id,
              config: this.props.config.set('configInfo', localConfig)
            })
          }, 50)
        } else {
          const newConfig = this.addDefaultConfigInfo(mapTraceSetting)

          setTimeout(() => {
            this.props.onSettingChange({
              id: this.props.id,
              config: this.props.config.set('configInfo', newConfig)
            })
          }, 50)
        }
      }
    } else {
      //add new to configInfo
      const newConfig = this.addDefaultConfigInfo(mapTraceSetting)

      setTimeout(() => {
        this.props.onSettingChange({
          id: this.props.id,
          config: this.props.config.set('configInfo', newConfig)
        })
      }, 50)
    }
  };

  addDefaultConfigInfo = (mapTraceSetting: ConfigObject) => {
    if (this.state.traces.length > 0) {
      const traces: TraceConfig[] = []
      this.state.traces.forEach((t: any) => {
        const existing = {
          creationDate: t.creationDate,
          creator: t.creator,
          description: t.description,
          globalId: t.globalId,
          minStartingPoints: t.minStartingPoints,
          resultTypes: t.resultTypes,
          tags: t.tags,
          title: t.title,
          traceConfiguration: t.traceConfiguration,
          traceType: t.traceType
        }
        //for (const key in t) {
        //  existing[key] = t[key];
        //}
        const newParams = {
          selected: false,
          visible: true,
          traceConfigOverride: '',
          traceResultSettings: { ...this.state.defaultTraceResultSettings }
        }
        const assignedObject = Object.assign({}, existing, newParams)
        traces.push(assignedObject)
      })

      if (Object.prototype.hasOwnProperty.call(this.props.config, 'configInfo')) {
        const localConfig = [...this.props.config.configInfo]
        localConfig.push({
          mapId: mapTraceSetting.mapId,
          inputSettings:
            mapTraceSetting.inputSettings !== null
              ? mapTraceSetting.inputSettings
              : this.state.defaultInputSettings,
          traceSettings: traces
        })
        return localConfig
      } else {
        const newConfig = [
          {
            mapId: mapTraceSetting.mapId,
            inputSettings:
              mapTraceSetting.inputSettings !== null
                ? mapTraceSetting.inputSettings
                : this.state.defaultInputSettings,
            traceSettings: traces
          }
        ]

        return newConfig
      }
    }
    return null
  };

  /**
   * Create label elements in the individual data source list items
   */
  createDsElement = (item: any, index: number) => {
    const _datasourceOptions = (
      <div
        ref={this.dsRef}
        tabIndex={0}
        aria-label={item.label}
        key={index}
        className={'data-item align-items-center'}
        style={{ display: 'flex', flexDirection: 'row', width: '100%' }}
      >
        <div
          className={'data-item-name'}
          title={item.label}
          style={{ width: '100%' }}
        >
          {item.label}
        </div>
        {!item.isValid
          ? (
          <div style={{ paddingLeft: 5, paddingRight: 5 }}>
            <WarningOutlined size="m" color="#ff0000" />
          </div>
            )
          : (
              ''
            )}
      </div>
    )
    return _datasourceOptions
  };

  render () {
    return (
      <div css={getStyle(this.props.theme)}>
        <div className={'widget-setting-utility-trace'}>
          <SettingSection
            className="map-selector-section"
            title={this.nls('sourceLabel')}
          >
            <SettingRow>
              <Label
                tabIndex={0}
                aria-label={this.nls('selectMapWidgetLabel')}
                title={this.nls('selectMapWidgetLabel')}
                className="w-100 d-flex"
              >
                <div className="text-truncate flex-grow-1 setting-text-level-3">
                  {this.nls('selectMapWidgetLabel')}
                </div>
              </Label>
              <Tooltip
                role={'tooltip'}
                tabIndex={0}
                aria-label={this.nls('selectMapWidgetHint')}
                title={this.nls('selectMapWidgetHint')}
                showArrow
                placement="top"
              >
                <div className="ml-2 d-inline ep-tooltip">
                  <InfoOutlined size="m" />
                </div>
              </Tooltip>
            </SettingRow>
            <SettingRow>
              <MapWidgetSelector
                onSelect={this.onMapWidgetSelected.bind(this)}
                useMapWidgetIds={this.props.useMapWidgetIds}
              />
            </SettingRow>
          </SettingSection>

          <SettingSection>
            <SettingRow>
              <List
                itemsJson={Array.from(this.state.dataSources).map(
                  (options: any, index) => ({
                    itemStateDetailContent: options,
                    itemKey: `${index}`
                  })
                )}
                dndEnabled={false}
                isItemFocused={(actionData, refComponent) => {
                  return true
                }}
                onClickItemBody={(actionData, refComponent) => {
                  const { itemJsons } = refComponent.props
                  const currMap: MapConfig = {
                    isValid: itemJsons[0].itemStateDetailContent.isValid,
                    label: itemJsons[0].itemStateDetailContent.label,
                    dataSource: itemJsons[0].itemStateDetailContent.dataSource
                  }
                  this.setState(
                    {
                      showTraceItemPanel: !this.state.showTraceItemPanel,
                      currentMapConfig: currMap
                    },
                    () => {
                      this.getTracesInMapView(
                        this.state.currentMapConfig.dataSource
                      )
                    }
                  )
                }}
                overrideItemBlockInfo={() => {
                  return {
                    name: TreeItemActionType.RenderOverrideItem,
                    children: [
                      {
                        name: TreeItemActionType.RenderOverrideItemBody,
                        children: [
                          {
                            name: TreeItemActionType.RenderOverrideItemMainLine
                          }
                        ]
                      }
                    ]
                  }
                }}
                renderOverrideItemMainLine={(actionData, refComponent) => {
                  const { itemJsons } = refComponent.props
                  const currentItemJson = itemJsons[0]
                  const listItemJsons = itemJsons[1] as any
                  return this.createDsElement(
                    currentItemJson.itemStateDetailContent,
                    listItemJsons.indexOf(currentItemJson)
                  )
                }}
              />
            </SettingRow>
            {this.props.config.useMapWidget && (this.state.dataSources.length <= 0) && (
              <SettingRow>
                <Alert
                  tabIndex={0}
                  className={'warningMsg'}
                  onClose={function noRefCheck () {}}
                  open={true}
                  text={this.nls('warningNoMap')}
                  type={'warning'}
                />
              </SettingRow>
            )}
          </SettingSection>
        </div>
      </div>
    )
  }

  /*
            {!this.props.config.useMapWidget && (
              <SettingRow>
                <Alert
                  tabIndex={0}
                  className={'warningMsg'}
                  onClose={function noRefCheck () {}}
                  open={true}
                  text={this.nls('warningNoMap')}
                  type={'warning'}
                />
              </SettingRow>
            )}

*/

  /*  hide the side popper
          <SidePopper
            isOpen={this.state.showTraceItemPanel}
            position="right"
            toggle={() => {}}
            trigger={this.dsRef?.current}
          >
            <div className="w-100 h-100" css={getStyleForLI(this.props.theme)}>
              <div className="w-100 h-100 layer-item-panel">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                  }}
                  className={'align-items-center'}
                >
                  <div style={{ width: '100%' }}>
                    {this.state.currentMapConfig !== null
                      ? this.state.currentMapConfig.label
                      : ''}
                  </div>
                  <div>
                    <Button
                      role={'button'}
                      aria-label={this.nls('close')}
                      title={this.nls('close')}
                      className={'ml-2'}
                      icon
                      type={'tertiary'}
                      size={'sm'}
                      onClick={() => {}}
                    >
                      <CloseOutlined size="m" />
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                  }}
                  className={'align-items-center justify-content-center'}
                >
                  {this.state.currentMapConfig !== null
                    ? (
                        !this.state.currentMapConfig.isValid
                          ? (
                      <Alert
                        tabIndex={0}
                        className={'warningMsg'}
                        onClose={() => {}}
                        open={true}
                        text={this.nls('warningNoTraces')}
                        type={'warning'}
                      />
                            )
                          : (
                              this.renderInputSettings()
                            )
                      )
                    : (
                        ''
                      )}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                  }}
                  className={'align-items-center justify-content-center'}
                >
                  {this.state.currentMapConfig !== null
                    ? this.state.currentMapConfig.isValid
                      ? this.renderTraceSettings()
                      : ''
                    : ''}
                </div>
              </div>
              <div
                tabIndex={0}
                className={
                  'w-100 d-flex align-items-center justify-content-between setting-header setting-title'
                }
              ></div>
            </div>
          </SidePopper>

  */

  //render methods

  renderInputSettings = () => {
    return (
      <SettingSection>
        <SettingCollapse
          label={this.nls('inputSettingsHeading')}
          isOpen={this.state.showInputSettings}
          onRequestOpen={() => {
            this.setState({
              showInputSettings: !this.state.showInputSettings
            })
          }}
          onRequestClose={() => {
            this.setState({
              showInputSettings: !this.state.showInputSettings
            })
          }}
        >
          {this.renderInputTypes('starting-point', true)}
          {this.renderInputTypes('barrier', false)}
        </SettingCollapse>
      </SettingSection>
    )
  };

  renderInputTypes = (type: string, defaultState: boolean) => {
    let inputSettings = null
    if (Object.prototype.hasOwnProperty.call(this.props.config, 'configInfo')) {
      const localConfig = [...this.props.config.configInfo]
      localConfig.forEach((lc) => {
        if (lc.mapId === this.props.config.activeDataSource) {
          lc.inputSettings.forEach((is) => {
            if (is.type === type) {
              inputSettings = is
            }
          })
        }
      })
    }
    return (
      <SettingCollapse
        rightIcon={EditOutlined}
        rightActiveIcon={EditFilled}
        label={
          type === 'starting-point'
            ? this.nls('startingPointLabel')
            : this.nls('barrierLabel')
        }
        isOpen={
          type === 'starting-point'
            ? this.state.showStartingPointBlock
            : this.state.showBarriersBlock
        }
        onRequestOpen={() => {
          if (type === 'starting-point') {
            this.setState({
              showStartingPointBlock: !this.state.showStartingPointBlock
            })
          } else {
            this.setState({
              showBarriersBlock: !this.state.showBarriersBlock
            })
          }
        }}
        onRequestClose={() => {
          if (type === 'starting-point') {
            this.setState({
              showStartingPointBlock: !this.state.showStartingPointBlock
            })
          } else {
            this.setState({
              showBarriersBlock: !this.state.showBarriersBlock
            })
          }
        }}
      >
        <SettingRow>
          <Label
            tabIndex={0}
            aria-label={this.nls('label')}
            title={this.nls('label')}
            className="w-100 d-flex"
            style={{ maxWidth: '88%' }}
          >
            <div className="text-truncate flex-grow-1 color-label setting-text-level-2">
              {this.nls('label')}
            </div>
          </Label>
        </SettingRow>
        <SettingRow>
          <div className="text-truncate flex-grow-1 color-label setting-text-level-2">
            <TextInput
              type="text"
              value={inputSettings.label}
              onChange={(evt) => {
                this.modifyInputSettings(
                  evt.currentTarget.value,
                  'label',
                  type
                )
              }}
            />
          </div>
        </SettingRow>
        <SettingRow>
          <Label
            tabIndex={0}
            aria-label={this.nls('inputDescription')}
            title={this.nls('inputDescription')}
            className="w-100 d-flex"
            style={{ maxWidth: '88%' }}
          >
            <div className="text-truncate flex-grow-1 color-label setting-text-level-2">
              {this.nls('inputDescription')}
            </div>
          </Label>
        </SettingRow>
        <SettingRow>
          <div className="text-truncate flex-grow-1 color-label setting-text-level-2">
            <TextInput
              type="text"
              value={inputSettings.description}
              onChange={(evt) => {
                this.modifyInputSettings(
                  evt.currentTarget.value,
                  'description',
                  type
                )
              }}
            />
          </div>
        </SettingRow>
        <SettingRow>
          <Label
            tabIndex={0}
            aria-label={this.nls('symbol')}
            title={this.nls('symbol')}
            className="w-100 d-flex"
            style={{ maxWidth: '88%' }}
          >
            <div className="text-truncate flex-grow-1 color-label setting-text-level-1">
              {this.nls('symbol')}
            </div>
          </Label>
          <SymbolSettings
            intl={this.props.intl}
            theme={this.props.theme}
            config={inputSettings.inputSymbol}
            onGeneralSettingsUpdated={(evt, sym) => {
              const symbol = {
                zoomScale: 1500,
                defaultPointSymbol: sym
              }
              this.modifyInputSettings(symbol, 'inputSymbol', type)
            }}
          />
        </SettingRow>
      </SettingCollapse>
    )
  };

  /*
          <SymbolSettings
            intl={this.props.intl}
            theme={this.props.theme}
            config={inputSettings.inputSymbol}
            onGeneralSettingsUpdated={() => {}}
          />
*/

  renderTraceSettings = () => {
    return (
      <SettingSection>
        <SettingCollapse
          label={this.nls('traceSettingsHeading')}
          isOpen={this.state.showTraceSettings}
          onRequestOpen={() => {
            this.setState({
              showTraceSettings: !this.state.showTraceSettings
            })
          }}
          onRequestClose={() => {
            this.setState({
              showTraceSettings: !this.state.showTraceSettings
            })
          }}
        >
          {this.renderTracesInMap()}
          {this.renderTraceResultSettings()}
        </SettingCollapse>
      </SettingSection>
    )
  };

  renderTracesInMap = () => {
    let traces = [...this.state.traces]
    if (Object.prototype.hasOwnProperty.call(this.props.config, 'configInfo')) {
      const localConfig = [...this.props.config.configInfo]
      localConfig.forEach((lc) => {
        if (lc.mapId === this.props.config.activeDataSource) {
          traces = lc.traceSettings
        }
      })
    }
    return (
      <SettingRow>
        <List
          itemsJson={traces.map((options: any, index) => ({
            itemStateDetailContent: options,
            itemKey: `${index}`
          }))}
          dndEnabled={false}
          isItemFocused={(actionData, refComponent) => {
            return true
          }}
          onClickItemBody={(actionData, refComponent) => {
          }}
          overrideItemBlockInfo={() => {
            return {
              name: TreeItemActionType.RenderOverrideItem,
              children: [
                {
                  name: TreeItemActionType.RenderOverrideItemBody,
                  children: [
                    {
                      name: TreeItemActionType.RenderOverrideItemMainLine
                    }
                  ]
                }
              ]
            }
          }}
          renderOverrideItemMainLine={(actionData, refComponent) => {
            const { itemJsons } = refComponent.props
            const currentItemJson = itemJsons[0]
            const listItemJsons = itemJsons[1] as any
            return this.renderTraceList(
              currentItemJson.itemStateDetailContent,
              listItemJsons.indexOf(currentItemJson)
            )
          }}
        />
      </SettingRow>
    )
  };

  renderTraceList = (item: any, index: number) => {
    const _datasourceOptions = (
      <div
        ref={this.dsRef}
        tabIndex={0}
        aria-label={item.title}
        key={index}
        className={'data-item align-items-center'}
        style={{ display: 'flex', flexDirection: 'row', width: '100%' }}
      >
        <div
          className={'data-item-name'}
          title={item.title}
          style={{
            width: '100%',
            padding: 9,
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Checkbox
            checked={item.selected}
            onChange={(evt) => {
              this.modifySelectedTrace(evt, item)
            }}
          />
          {item.title}
        </div>
      </div>
    )
    return _datasourceOptions
  };

  renderTraceResultSettings = () => {
    let traces = [...this.state.traces]
    if (Object.prototype.hasOwnProperty.call(this.props.config, 'configInfo')) {
      const localConfig = [...this.props.config.configInfo]
      localConfig.forEach((lc) => {
        if (lc.mapId === this.props.config.activeDataSource) {
          traces = lc.traceSettings
        }
      })
    }
    //graphicsColor: "rgb(0,0,255, 0.7)",
    //showGraphicsOnComplete: true,
    return (
      <SettingSection>
        <SettingRow>
          <Label
            tabIndex={0}
            aria-label={this.nls('selectionResultsHeading')}
            title={this.nls('selectionResultsHeading')}
            className="w-100 d-flex"
            style={{ maxWidth: '88%' }}
          >
            <div className="text-truncate flex-grow-1 color-label setting-text-level-2">
              {this.nls('selectionResultsHeading')}
            </div>
          </Label>
          <Tooltip
            role={'tooltip'}
            tabIndex={0}
            aria-label={this.nls('selectionResultsHeading')}
            title={this.nls('selectionResultsHeading')}
            showArrow
            placement="top"
          >
            <div className="ml-2 d-inline ep-tooltip">
              <InfoOutlined size="m" />
            </div>
          </Tooltip>
        </SettingRow>
        <SettingRow>
          <Label
            tabIndex={0}
            aria-label={this.nls('showSelectedFeaturesList')}
            title={this.nls('showSelectedFeaturesList')}
            className="w-100 d-flex"
            style={{ maxWidth: '88%' }}
          >
            <div className="text-truncate flex-grow-1 color-label setting-text-level-3">
              {this.nls('showSelectedFeaturesList')}
            </div>
          </Label>
          <Switch
            checked={traces[0].traceResultSettings.showSelectedFeatureList}
            onChange={(evt) => {
              this.modifyTraceSetting(
                'showSelectedFeatureList',
                evt.currentTarget.checked
              )
            }}
          />
        </SettingRow>
        <SettingRow>
          <Label
            tabIndex={0}
            aria-label={this.nls('selectFeaturesOnComplete')}
            title={this.nls('selectFeaturesOnComplete')}
            className="w-100 d-flex"
            style={{ maxWidth: '88%' }}
          >
            <div className="text-truncate flex-grow-1 color-label setting-text-level-3">
              {this.nls('selectFeaturesOnComplete')}
            </div>
          </Label>
          <Switch
            checked={traces[0].traceResultSettings.selectFeaturesOnComplete}
            onChange={(evt) => {
              this.modifyTraceSetting(
                'selectFeaturesOnComplete',
                evt.currentTarget.checked
              )
            }}
          />
        </SettingRow>
        <SettingRow>
          <Label
            tabIndex={0}
            aria-label={this.nls('graphicsResultsHeading')}
            title={this.nls('graphicsResultsHeading')}
            className="w-100 d-flex"
            style={{ maxWidth: '88%' }}
          >
            <div className="text-truncate flex-grow-1 color-label setting-text-level-2">
              {this.nls('graphicsResultsHeading')}
            </div>
          </Label>
          <Tooltip
            role={'tooltip'}
            tabIndex={0}
            aria-label={this.nls('graphicsResultsHeading')}
            title={this.nls('graphicsResultsHeading')}
            showArrow
            placement="top"
          >
            <div className="ml-2 d-inline ep-tooltip">
              <InfoOutlined size="m" />
            </div>
          </Tooltip>
        </SettingRow>
        <SettingRow>
          <Label
            tabIndex={0}
            aria-label={this.nls('graphicsDefaultColor')}
            title={this.nls('graphicsDefaultColor')}
            className="w-100 d-flex"
            style={{ maxWidth: '88%' }}
          >
            <div className="text-truncate flex-grow-1 color-label setting-text-level-3">
              {this.nls('graphicsDefaultColor')}
            </div>
          </Label>
          <ColorPicker
            height={26}
            icon="none"
            onChange={(value) => {
              this.modifyTraceSetting('graphicsColor', value)
            }}
            onClick={function noRefCheck () {}}
            placement="bottom"
            presetColors={[{ label: 'Red', value: '#FF0000' }]}
            color={traces[0].traceResultSettings.graphicsColor.hex}
            width={30}
          />
        </SettingRow>
      </SettingSection>
    )
  };

  // public support functions
  checkIfMapViewHasTraces = (jmv: JimuMapView) => {
    let valid = false
    const view = jmv.view
    return view.when().then(async () => {
      const map = view.map as WebMap
      // eslint-disable-next-line
      if (map.hasOwnProperty('utilityNetworks')) {
        if (map.utilityNetworks !== null) {
          const un = map.utilityNetworks.getItemAt(0)
          await un.load()
          // eslint-disable-next-line
          if (un.hasOwnProperty('sharedNamedTraceConfigurations')) {
            if (un.sharedNamedTraceConfigurations.length > 0) {
              valid = true
            }
          }
        }
      }
      return valid
    })
  };

  getTracesInMapView = async (jmv: JimuMapView) => {
    const view = jmv.view
    let traces = []
    return view.when().then(async () => {
      const map = view.map as WebMap
      // eslint-disable-next-line
      if (map.hasOwnProperty('utilityNetworks')) {
        if (map.utilityNetworks !== null) {
          const un = map.utilityNetworks.getItemAt(0)
          await un.load()
          // eslint-disable-next-line
          if (un.hasOwnProperty('sharedNamedTraceConfigurations')) {
            traces = un.sharedNamedTraceConfigurations
            this.setState({ traces: un.sharedNamedTraceConfigurations })
          }
          return traces
        }
      }
      return traces
    })
  };

  modifySelectedTrace = (evt, item) => {
    if (Object.prototype.hasOwnProperty.call(this.props.config, 'configInfo')) {
      let traces = []
      const localConfig = Immutable.asMutable(
        Immutable(this.props.config.configInfo),
        {
          deep: true
        }
      )
      localConfig.forEach((lc) => {
        if (lc.mapId === this.props.config.activeDataSource) {
          lc.traceSettings.forEach((ts) => {
            if (ts.globalId === item.globalId) {
              ts.selected = evt.currentTarget.checked
            }
          })
          traces = lc.traceSettings
        }
      })
      const local2 = Immutable(localConfig)

      setTimeout(() => {
        this.props.onSettingChange({
          id: this.props.id,
          config: this.props.config.set('configInfo', local2)
        })
        this.setState({ traces: traces })
      }, 50)
    }
  };

  modifyTraceSetting = (setting, value) => {
    if (Object.prototype.hasOwnProperty.call(this.props.config, 'configInfo')) {
      let traces = []
      const localConfig = Immutable.asMutable(
        Immutable(this.props.config.configInfo),
        {
          deep: true
        }
      )
      localConfig.forEach((lc) => {
        if (lc.mapId === this.props.config.activeDataSource) {
          lc.traceSettings.forEach((ts) => {
            // if (ts.globalId === item.globalId) {
            if (setting === 'graphicsColor') {
              const rgb = this.hexToRgb(value)
              const newColor = {
                color: [rgb.r, rgb.g, rgb.b, 0.6],
                haloOpacity: 0.9,
                fillOpacity: 0.2,
                hex: value
              }
              ts.traceResultSettings[setting] = newColor
            } else {
              ts.traceResultSettings[setting] = value
            }
            //}
          })
          traces = lc.traceSettings
        }
      })
      const local2 = Immutable(localConfig)

      setTimeout(() => {
        this.props.onSettingChange({
          id: this.props.id,
          config: this.props.config.set('configInfo', local2)
        })
        this.setState({ traces: traces })
      }, 50)
    }
  };

  modifyInputSettings = (value, node, type) => {
    if (Object.prototype.hasOwnProperty.call(this.props.config, 'configInfo')) {
      const localConfig = Immutable.asMutable(
        Immutable(this.props.config.configInfo),
        {
          deep: true
        }
      )
      localConfig.forEach((lc) => {
        if (lc.mapId === this.props.config.activeDataSource) {
          lc.inputSettings.forEach((is) => {
            if (is.type === type) {
              is[node] = value
            }
          })
        }
      })
      const local2 = Immutable(localConfig)

      setTimeout(() => {
        this.props.onSettingChange({
          id: this.props.id,
          config: this.props.config.set('configInfo', local2)
        })
        this.setState({})
      }, 50)
    }

    /*

    let inputSettings = null;
    if (this.props.config.hasOwnProperty("configInfo")) {
      const localConfig = [...this.props.config.configInfo];
      localConfig.forEach((lc) => {
        if (lc.mapId === this.props.config.activeDataSource) {
          lc.inputSettings.forEach((is) => {
            if (is.type === type) {
              inputSettings = is;
            }
          });
        }
      });
    }

    */
  };

  updateGeneralSettings = (
    property: string,
    value:
    | number
    | __esri.SimpleMarkerSymbol
    | __esri.PictureMarkerSymbol
    | __esri.PointSymbol3D
  ) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['generalSettings', property], value)
    })
  };

  hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null
  };
}
