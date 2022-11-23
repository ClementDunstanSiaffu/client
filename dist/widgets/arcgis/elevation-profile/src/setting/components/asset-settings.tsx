/** @jsx jsx */ // <-- make sure to include the jsx pragma
import {
  React, jsx, IntlShape, ThemeVariables, getAppStore, Immutable,
  urlUtils, DataSourceManager, UseDataSource
} from 'jimu-core'
import { ArcGISDataSourceTypes } from 'jimu-arcgis'
import { List, TreeItemActionType } from 'jimu-ui/basic/list-tree'
import { SidePopper, SettingRow } from 'jimu-ui/advanced/setting-components'
import { Button, Switch, Icon, Label, Select, Option, Tooltip, AlertPopup, NumericInput, defaultMessages as jimuUIDefaultMessages } from 'jimu-ui'
import { DataSourceSelector, AllDataSourceTypes } from 'jimu-ui/advanced/data-source-selector'
import { unitOptions, getConfigIcon, defaultAssetSettings } from '../constants'
import { AssetSettings, AssetLayersSettings, Statistics } from '../../config'
import { getSidePanelStyle, getAdvanceSettingsStyle } from '../lib/style'
import defaultMessages from '../translations/default'
import AssetSettingPopper from './asset-settings-popper'
import SidepopperBackArrow from './sidepopper-back-arrow'
import { defaultSelectedUnits, getRandomHexColor } from '../../common/utils'
import Portal from 'esri/portal/Portal'

const { epConfigIcon } = getConfigIcon()

interface TraversalObj {
  parentKey: string
  childKey: string
  value: any
}

interface Props {
  widgetId: string
  activeDataSource: string
  isOpen: boolean
  intl: IntlShape
  theme: ThemeVariables
  config: AssetSettings
  portalSelf: Portal
  activeDsConfig: any
  allAvailableStatistics: Statistics[]
  onAssetSettingsUpdated: (configKey: string, dataSource: string, layerIndex: number,
    dataObj: TraversalObj, data: any, isLayerAddOrRemove: boolean) => void
  onAssetBufferSettingsUpdated: (props: string, value: string | number | boolean) => void
}

interface IState {
  selectedLayers: any[]
  showLayerDataItemPanel: boolean
  layerName: string
  bufferDistanceInput: number
  bufferUnit: string
  isAlertMsgPopupOpen: boolean
}

export default class AssetSetting extends React.PureComponent<Props, IState> {
  supportedDsTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.SceneLayer])
  public selectedLayerConfig: AssetLayersSettings
  public selectedLayerDataSource = null
  public hasSupportForZValue: boolean
  index: number
  updateLayersConfig: AssetLayersSettings[]
  layerSidePopperTrigger = React.createRef<HTMLDivElement>()
  backRef = React.createRef<SidepopperBackArrow>()
  allSelectedLayers = []

  constructor (props) {
    super(props)
    this.index = 0
    this.updateLayersConfig = this.props.config.layers
    this.state = {
      selectedLayers: [],
      showLayerDataItemPanel: false,
      layerName: null,
      bufferDistanceInput: this.props.config.assetIntersectionBuffer.bufferDistance,
      bufferUnit: this.props.config.assetIntersectionBuffer.bufferUnits,
      isAlertMsgPopupOpen: false
    }
  }

  nls = (id: string) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages)
    //for unit testing no need to mock intl we can directly use default en msg
    if (this.props.intl && this.props.intl.formatMessage) {
      return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] })
    } else {
      return messages[id]
    }
  }

  componentDidMount = () => {
    if (this.props.config?.layers?.length === 0) {
      //empty the layer list
      this.setState({
        selectedLayers: []
      })
    } else {
      this.props.config?.layers?.forEach((layer) => {
        this.getLayerListProperty(layer.layerId)
        //display updated layers list in config
        this.setState({
          selectedLayers: this.allSelectedLayers
        })
      })
    }
  }

  componentDidUpdate = (prevProps) => {

  }

  getLayerListProperty = (layerId: string) => {
    const dsObj = DataSourceManager.getInstance().getDataSource(layerId)
    if (dsObj) {
      const label = dsObj.getLabel()
      const layerObj = {
        label: label,
        layer: dsObj
      }
      this.allSelectedLayers.push(layerObj)
    }
  }

  getDsRootIdsByWidgetId = () => {
    const appConfig = getAppStore().getState()?.appStateInBuilder?.appConfig
    const widgetJson = appConfig
    const rootIds = []
    const ds = widgetJson.dataSources[this.props.activeDataSource]
    if (ds?.type === ArcGISDataSourceTypes.WebMap || ds?.type === ArcGISDataSourceTypes.WebScene) { // is root ds
      rootIds.push(this.props.activeDataSource)
    }

    return rootIds.length > 0 ? Immutable(rootIds) : undefined
  }

  // save currentSelectedDs to array
  dataSourceChangeSave = (useDataSources: UseDataSource[]) => {
    if (!useDataSources) {
      return
    }

    //if layer is already selected then show the alert message and do not add the layer in the list again
    let isLayerAlreadySelected: boolean = false

    // eslint-disable-next-line
    this.allSelectedLayers.some((data) => {
      if (data.layer.id === useDataSources[0].dataSourceId) {
        isLayerAlreadySelected = true
        this.setState({
          isAlertMsgPopupOpen: true
        })
        return true
      }
    })

    //display updated layers list in config
    if (!isLayerAlreadySelected) {
      useDataSources.forEach((data, index) => {
        this.getLayerListProperty(data.dataSourceId)
      })

      this.setState({
        selectedLayers: this.allSelectedLayers
      }, () => {
        setTimeout(() => {
          this.layerSidePopperTrigger.current.focus()
        }, 50)
      })

      //update the layers config of newly added layers with its default config
      this.updateLayersConfig = this.getLayersDefaultSettings(this.allSelectedLayers)
      const finalLayerUpdate = [...this.props.config.layers, this.updateLayersConfig[0]]

      this.props.onAssetSettingsUpdated('assetSettings', this.props.activeDataSource, null,
        null, finalLayerUpdate, true)
    }
  }

  getLayersDefaultSettings = (selectedData) => {
    let newLayerDefaultConfig = []
    //if no layer is configured then configure the default settings to the selected Ds
    if (this.props.config.layers.length === 0) {
      selectedData.forEach((layerdata, index) => {
        newLayerDefaultConfig = this.getAssetDefaultConfigOnAdd(layerdata.layer)
      })
    } else {
      //configure newly added Ds settings and append to the existing configured settings
      selectedData.forEach((newData) => {
        if (!this.isLayerAlreadyConfigured(newData.layer.id)) {
          newLayerDefaultConfig = this.getAssetDefaultConfigOnAdd(newData.layer)
        }
      })
    }
    return newLayerDefaultConfig
  }

  isLayerAlreadyConfigured = (layerId) => {
    let isConfigured = false
    this.props.config.layers.forEach((configData) => {
      if (layerId === configData.layerId) {
        isConfigured = true
        return true
      }
    })
    return isConfigured
  }

  getAssetDefaultConfigOnAdd (layer): any {
    const defaultUnit = defaultSelectedUnits(this.props.activeDsConfig, this.props.portalSelf)
    const geometryType = 'esriGeometryPolyline'
    const defaultConfig = []
    //get config of only newly added profile or asset layers
    if (layer && layer.layerDefinition && layer.layerDefinition.geometryType &&
      layer.layerDefinition.geometryType === geometryType) {
      let defaultElevationType = 'no elevation'
      //if layer having elevation info then set default elevation type as z
      if (layer.layerDefinition.hasZ) {
        defaultElevationType = 'z'
      }
      const defaultAssetSettingsObj = Object.assign({}, defaultAssetSettings)
      defaultAssetSettingsObj.style.bulletColor = getRandomHexColor()
      defaultAssetSettingsObj.elevationSettings.unit = defaultUnit[0]
      defaultAssetSettingsObj.elevationSettings.oneFieldLabel = this.nls('oneFieldLabel')
      defaultAssetSettingsObj.elevationSettings.twoFieldLabel = this.nls('twoFieldLabel')
      defaultAssetSettingsObj.layerId = layer.id
      defaultAssetSettingsObj.elevationSettings.type = defaultElevationType
      defaultConfig.push(Immutable(defaultAssetSettingsObj))
    }
    return defaultConfig
  }

  /**
   *
  On click of layer in the list, opens the individual layer config in the same sidepopper
  */

  showLayerData = (item: any, index?: number) => {
    this.setState({
      showLayerDataItemPanel: true,
      layerName: item.label
    }, () => {
      this.backRef.current?.backRefFocus()
    })
    this.selectedLayerDataSource = {
      dataSourceId: item.layer.dataSourceJson.id,
      rootDataSourceId: item.layer.parentDataSource.id,
      layer: item.layer
    }
    //get the saved config of selected layer
    this.selectedLayerConfig = this.getSelectedLayerConfig(item.layer.id)
    this.hasSupportForZValue = item.layer.layerDefinition.hasZ
  }

  getSelectedLayerConfig = (layerId: string) => {
    let layerConfig
    this.props.config.layers.forEach((layerDetails) => {
      if (layerId === layerDetails.layerId) {
        layerConfig = layerDetails
      }
    })
    return layerConfig
  }

  /**
  *@param index Remove layer data individual item
  */
  removeLayerDataItem = (evt, index: number, layerid: string) => {
    evt.stopPropagation()

    //display updated layers list in config
    const layersList = this.state.selectedLayers
    layersList.splice(index, 1)
    this.allSelectedLayers = layersList

    this.setState({
      selectedLayers: this.allSelectedLayers
    }, () => {
      this.layerSidePopperTrigger.current.focus()
    })

    //update the layers config after removing the layers
    this.props.config?.layers?.forEach((layer, index: number) => {
      if (layer.layerId === layerid) {
        const layersArr: any = this.props.config.layers
        const configLayers = layersArr.asMutable({ deep: true })
        configLayers.splice(index, 1)
        this.updateLayersConfig = configLayers
        this.props.onAssetSettingsUpdated('assetSettings', this.props.activeDataSource, null,
          null, this.updateLayersConfig, true)
      }
    })
  }

  /**
   *Create layers list with layers name and delete button to remove the layers
  */

  createLayerElement = (item, index: number) => {
    const _datasourceOptions = (
      <div ref={this.layerSidePopperTrigger} aria-label={item.label} tabIndex={0}
        key={index + Date.now()}
        className='layer-data-item align-items-center'>

        <div className='layer-data-item-name flex-grow-1' title={item.label}>{item.label}</div>

        <Button role={'button'} title={this.nls('deleteLayer')}
          aria-label={this.nls('deleteLayer')}
          size='sm' type='tertiary' icon
          className='p-0'
          key={index + Date.now()}
          onClick={(e) => { this.removeLayerDataItem(e, index, item.layer.id) }}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              this.removeLayerDataItem(e, index, item.layer.id)
            }
          }}
        >
          <Icon icon={epConfigIcon.iconClose} size={12} />
        </Button>
      </div>
    )

    return _datasourceOptions
  }

  getLayerIndex = (layerId: string) => {
    let layerIndex = -1
    this.props.config.layers.forEach((layerDetails, index) => {
      if (layerId === layerDetails.layerId) {
        layerIndex = index
      }
    })
    return layerIndex
  }

  updateConfig = (objectKey, subProperty, value) => {
    const traversalObj: TraversalObj = {
      parentKey: objectKey,
      childKey: subProperty,
      value: value
    }

    const layerIndex = this.getLayerIndex(this.selectedLayerConfig.layerId)
    this.props.onAssetSettingsUpdated('assetSettings', this.props.activeDataSource, layerIndex,
      traversalObj, null, false)
  }

  /**
  *On click of back button close the layer settings panel and come back to the datasource settings panel
  */

  backForwardPanel = (): void => {
    this.setState({
      showLayerDataItemPanel: false
    }, () => {
      this.layerSidePopperTrigger.current.focus()
    })
  }

  closePanel = () => {
    this.setState({
      showLayerDataItemPanel: false
    }, () => {
      this.layerSidePopperTrigger.current.focus()
    })
    this.index = 0
  }

  onIntersectionBufferChange = (evt: React.FormEvent<HTMLInputElement>) => {
    this.props.onAssetBufferSettingsUpdated('enabled', evt.currentTarget.checked)
  }

  onBufferDistanceChange = (value: number) => {
    if (value === null) {
      return
    }

    this.setState({
      bufferDistanceInput: value
    }, () => {
      this.props.onAssetBufferSettingsUpdated('bufferDistance', this.state.bufferDistanceInput)
    })
  }

  onBufferUnitsChange = (evt: any) => {
    this.setState({
      bufferUnit: evt.target.value
    }, () => {
      this.props.onAssetBufferSettingsUpdated('bufferUnits', this.state.bufferUnit)
    })
  }

  disableSelection = (useDataSources: UseDataSource[]): boolean => {
    return false
  }

  /**
  *Hide the Alert message popup
  */
  hideMessage = (): void => {
    this.setState({
      isAlertMsgPopupOpen: false
    })
  }

  render () {
    const ds = DataSourceManager.getInstance().getDataSource(this.props.activeDataSource)
    const childDs: any = ds?.getChildDataSources()

    const dsRootIdsArr = []
    childDs.forEach((layer) => {
      //display only the point layers in data source selector depending on its geometry type
      if (layer.type === 'GROUP_LAYER') {
        const subLayers = layer.getChildDataSources()
        if (subLayers) {
          subLayers.forEach(subLayer => {
            if (subLayer.layerDefinition?.geometryType === 'esriGeometryPoint') {
              dsRootIdsArr.push(subLayer.id)
            }
          })
        }
      } else {
        if (layer.layerDefinition?.geometryType === 'esriGeometryPoint') {
          dsRootIdsArr.push(layer.id)
        }
      }
    })

    const dsRootIds = this.getDsRootIdsByWidgetId()

    //dsObject parameters used to pass to the ds selector
    const dsSelectorSource = {
      fromRootDsIds: dsRootIds,
      fromDsIds: Immutable(dsRootIdsArr)
    }

    return <div css={getAdvanceSettingsStyle(this.props.theme)} style={{ height: '100%', width: '100%', marginTop: 5 }}>
      <SettingRow>
        <Label tabIndex={0} aria-label={this.nls('intersectingLayersLabel')} className='w-100 d-flex'>
          <div className='flex-grow-1 text-break color-label'>
            {this.nls('intersectingLayersLabel')}
          </div>
        </Label>
        <Tooltip role={'tooltip'} tabIndex={0} aria-label={this.nls('intersectingLayersTooltip')}
         title={this.nls('intersectingLayersTooltip')} showArrow placement='top'>
          <div className='ml-2 d-inline color-label ep-tooltip'>
            <Icon size={14} icon={epConfigIcon.infoIcon} />
          </div>
        </Tooltip>
      </SettingRow>

      <SettingRow>
        <DataSourceSelector className={'ep-data-source-selector'}
          types={this.supportedDsTypes}
          buttonLabel={this.nls('selectableButton')}
          fromRootDsIds={dsSelectorSource.fromRootDsIds}
          fromDsIds={dsSelectorSource.fromDsIds}
          mustUseDataSource={true}
          onChange={this.dataSourceChangeSave}
          disableDataView={true}
          enableToSelectOutputDsFromSelf={false}
          closeDataSourceListOnChange
          hideTypeDropdown={false}
          hideAddDataButton={true}
          disableRemove={() => true}
          disableSelection={this.disableSelection}
          widgetId={this.props.widgetId}
          hideDataView={true}
        />
      </SettingRow>

      <SettingRow className={this.state.selectedLayers.length > 0 ? '' : 'hidden'}>
        <List className={'ep-layers-list'}
          itemsJson={Array.from(this.state.selectedLayers).map((options: any, index) => ({
            itemStateDetailContent: options,
            itemKey: `${index}`
          }))}
          dndEnabled={false}
          isItemFocused={() => {
            return false
          }}
          onClickItemBody={(actionData, refComponent) => {
            const { itemJsons } = refComponent.props
            const currentItemJson = itemJsons[0]
            const listItemJsons = itemJsons[1] as any
            this.showLayerData(currentItemJson.itemStateDetailContent, listItemJsons.indexOf(currentItemJson))
          }}
          overrideItemBlockInfo={() => {
            return {
              name: TreeItemActionType.RenderOverrideItem,
              children: [{
                name: TreeItemActionType.RenderOverrideItemBody,
                children: [{
                  name: TreeItemActionType.RenderOverrideItemMainLine
                }]
              }]
            }
          }}
          renderOverrideItemMainLine={(actionData, refComponent) => {
            const { itemJsons } = refComponent.props
            const currentItemJson = itemJsons[0]
            const listItemJsons = itemJsons[1] as any
            return this.createLayerElement(currentItemJson.itemStateDetailContent, listItemJsons.indexOf(currentItemJson))
          }}
        />
      </SettingRow>

      <SettingRow>
        <Label tabIndex={0} aria-label={this.nls('intersectionSettingsLabel')} className='w-100 d-flex'>
          <div className='flex-grow-1 text-break color-label'>
            {this.nls('intersectionSettingsLabel')}
          </div>
        </Label>
        <Tooltip role={'tooltip'} tabIndex={0} aria-label={this.nls('intersectionSettingsTooltip')}
          title={this.nls('intersectionSettingsTooltip')} showArrow placement='top'>
          <div className='ml-2 d-inline color-label ep-tooltip'>
            <Icon size={14} icon={epConfigIcon.infoIcon} />
          </div>
        </Tooltip>
      </SettingRow>

      <SettingRow label={this.nls('useBuffer')}>
        <Switch role={'switch'} aria-label={this.nls('useBuffer')}
          title={this.nls('useBuffer')}
          checked={this.props.config.assetIntersectionBuffer.enabled}
          aria-expanded={this.props.config.assetIntersectionBuffer.enabled}
          onChange={this.onIntersectionBufferChange} />
      </SettingRow>

      {this.props.config.assetIntersectionBuffer.enabled &&
        <div className={'pt-2 pb-2'} aria-expanded={this.props.config.assetIntersectionBuffer.enabled}>
          <SettingRow>
            <NumericInput style={{ width: 112 }} aria-label={this.state.bufferUnit}
              size={'sm'} defaultValue={this.state.bufferDistanceInput} min={0}
              showHandlers={false} onChange={this.onBufferDistanceChange} />

            <Select menuRole={'menu'} aria-label={this.state.bufferUnit} style={{ width: 121 }} className={'pl-2'}
              size={'sm'} name={'bufferUnits'}
              value={this.state.bufferUnit}
              onChange={this.onBufferUnitsChange}>
              {unitOptions.map((option, index) => {
                return <Option role={'option'} aria-label={option.value} key={index} value={option.value}>
                  {this.nls(option.value)}</Option>
              })}
            </Select>
          </SettingRow>
        </div>
      }

      <SidePopper isOpen={this.state.showLayerDataItemPanel && !urlUtils.getAppIdPageIdFromUrl().pageId} position='right' toggle={this.closePanel} trigger={this.layerSidePopperTrigger?.current}>
        <div className='bg-light-300 border-color-gray-400' css={getSidePanelStyle(this.props.theme)}>
          <SidepopperBackArrow
            theme={this.props.theme}
            intl={this.props.intl}
            title={this.state.layerName}
            ref={this.backRef}
            onBack={this.backForwardPanel} onClose={this.closePanel}>
            <div className={'setting-container'}>
              <AssetSettingPopper
                config={this.selectedLayerConfig}
                hasSupportForZValue={this.hasSupportForZValue}
                selectedLayerDataSource={this.selectedLayerDataSource}
                availableStatsForDisplay={this.props.allAvailableStatistics}
                intl={this.props.intl}
                theme={this.props.theme}
                updateAssetSettings={this.updateConfig.bind(this)}
              />
            </div>
          </SidepopperBackArrow>
        </div>
      </SidePopper>

      {/* Alert/Info message popup */}
      {this.state.isAlertMsgPopupOpen &&
        <AlertPopup
          aria-expanded={this.state.isAlertMsgPopupOpen}
          hideCancel={true}
          isOpen={this.state.isAlertMsgPopupOpen && !urlUtils.getAppIdPageIdFromUrl().pageId}
          onClickOk={this.hideMessage.bind(this)}
          onClickClose={this.hideMessage.bind(this)}
          title={this.nls('alert')}>
          <div className={'p-2'}>
            {this.nls('alreadySelectedLayerMsg')}
          </div>
        </AlertPopup>
      }
    </div>
  }
}
