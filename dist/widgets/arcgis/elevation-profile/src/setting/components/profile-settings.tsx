/** @jsx jsx */ // <-- make sure to include the jsx pragma
import {
  React, jsx, IntlShape, ThemeVariables, getAppStore,
  urlUtils, Immutable, DataSourceManager, UseDataSource
} from 'jimu-core'
import { ArcGISDataSourceTypes, MapViewManager, JimuMapView } from 'jimu-arcgis'
import { List, TreeItemActionType } from 'jimu-ui/basic/list-tree'
import { SidePopper, SettingRow } from 'jimu-ui/advanced/setting-components'
import { Button, Icon, Tooltip, AlertPopup, Label, defaultMessages as jimuUIDefaultMessages } from 'jimu-ui'
import { DataSourceSelector, AllDataSourceTypes } from 'jimu-ui/advanced/data-source-selector'
import { ProfileSettings, ProfileLayersSettings, Statistics } from '../../config'
import { getSidePanelStyle, getAdvanceSettingsStyle } from '../lib/style'
import defaultMessages from '../translations/default'
import ProfileSettingPopper from './profile-settings-popper'
import SidepopperBackArrow from './sidepopper-back-arrow'
import { defaultSelectedUnits, getRandomHexColor } from '../../common/utils'
import Portal from 'esri/portal/Portal'
import { getConfigIcon, defaultProfileSettings } from '../constants'

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
  portalSelf: Portal
  activeDsConfig: any
  config: ProfileSettings
  allAvailableStatistics: Statistics[]
  mapWidgetId: string
  onProfileSettingsUpdated: (configKey: string, dataSource: string, layerIndex: number,
    dataObj: TraversalObj, data: any, isLayerAddOrRemove: boolean) => void
}

interface IState {
  selectedLayers: any[]
  showLayerDataItemPanel: boolean
  layerName: string
  isAlertMsgPopupOpen: boolean
}

export default class ProfileSetting extends React.PureComponent<Props, IState> {
  supportedDsTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.SceneLayer])
  readonly mvManager: MapViewManager = MapViewManager.getInstance()
  mapView: JimuMapView
  public selectedLayerConfig: ProfileLayersSettings
  public selectedLayerDataSource = null
  public hasSupportForZValue: boolean
  private hasVerticalUnitParam: boolean
  index: number
  updateLayersConfig: ProfileLayersSettings[]
  layerSidePopperTrigger = React.createRef<HTMLDivElement>()
  backRef = React.createRef<SidepopperBackArrow>()
  allSelectedLayers = []

  constructor (props) {
    super(props)
    this.index = 0
    this.updateLayersConfig = this.props.config.layers
    const mapViewGroup = (this.mvManager as any).jimuMapViewGroups[this.props.mapWidgetId]
    for (const id in mapViewGroup.jimuMapViews) {
      if (mapViewGroup.jimuMapViews[id].dataSourceId === this.props.activeDataSource) {
        this.mapView = mapViewGroup.jimuMapViews[id]
      }
    }
    this.state = {
      selectedLayers: [],
      showLayerDataItemPanel: false,
      layerName: null,
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
    if (this.props.config?.layers) {
      this.props.config.layers.forEach((layer, index) => {
        this.getLayerListProperty(layer.layerId)
      })

      //display updated layers list in config
      this.setState({
        selectedLayers: this.allSelectedLayers
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

    //display updated layers list  in config
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

      this.props.onProfileSettingsUpdated('profileSettings', this.props.activeDataSource, null,
        null, finalLayerUpdate, true)
    }
  }

  getLayersDefaultSettings = (selectedData) => {
    let newLayerDefaultConfig = []
    //if no layer is configured then configure the default settings to the selected Ds
    if (this.props.config.layers.length === 0) {
      selectedData.forEach((layerdata, index) => {
        newLayerDefaultConfig = this.getProfileDefaultConfigOnAdd(layerdata.layer)
      })
    } else {
      //configure newly added Ds settings and append to the existing configured settings
      selectedData.forEach((newData) => {
        if (!this.isLayerAlreadyConfigured(newData.layer.id)) {
          newLayerDefaultConfig = this.getProfileDefaultConfigOnAdd(newData.layer)
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

  getProfileDefaultConfigOnAdd (layer): any {
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
      const defaultProfileSettingsObj = Object.assign({}, defaultProfileSettings)
      //if shape length field available in the layer use it as default distance field
      if (layer?.layerDefinition?.hasGeometryProperties &&
        layer?.layerDefinition?.geometryProperties?.shapeLengthFieldName) {
        defaultProfileSettingsObj.distanceSettings.field = layer.layerDefinition.geometryProperties.shapeLengthFieldName
      } else {
        defaultProfileSettingsObj.distanceSettings.field = ''
      }
      defaultProfileSettingsObj.style.lineColor = getRandomHexColor()
      defaultProfileSettingsObj.elevationSettings.unit = defaultUnit[0]
      defaultProfileSettingsObj.distanceSettings.unit = defaultUnit[1]
      defaultProfileSettingsObj.layerId = layer.id
      defaultProfileSettingsObj.elevationSettings.type = defaultElevationType
      defaultConfig.push(Immutable(defaultProfileSettingsObj))
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

    //check the availability of vertical unit parameter in case of z value
    this.hasSupportForZValue = item.layer.layerDefinition.hasZ
    const individualLayerData = this.mapView.view.map.findLayerById(item.layer.jimuChildId)
    const mapLayer: any = individualLayerData
    this.hasVerticalUnitParam = mapLayer?.sourceJSON?.sourceSpatialReference?.vcsWkid || mapLayer.sourceJSON?.sourceSpatialReference?.vcsWkt
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
  *@param index Remove individual layer item
  */
  removeLayerDataItem = (evt, index: number, layerid: string) => {
    evt.stopPropagation()

    //display updated layers list  in config
    const layersList = this.state.selectedLayers
    layersList.splice(index, 1)
    this.allSelectedLayers = layersList

    this.setState({
      selectedLayers: this.allSelectedLayers
    }, () => {
      this.layerSidePopperTrigger.current.focus()
    })

    //update the layers config after removing of layers
    this.props.config?.layers?.forEach((layer, index: number) => {
      if (layer.layerId === layerid) {
        const layersArr: any = this.props.config.layers
        const configLayers = layersArr.asMutable({ deep: true })
        configLayers.splice(index, 1)
        this.updateLayersConfig = configLayers
        this.props.onProfileSettingsUpdated('profileSettings', this.props.activeDataSource, null,
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
          }}>
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

  /**
   Update the config of individual layer if there is any changes in settings
  */
  updateConfig = (objectKey: string, subProperty: string, value: string) => {
    const traversalObj: TraversalObj = {
      parentKey: objectKey,
      childKey: subProperty,
      value: value
    }

    const layerIndex = this.getLayerIndex(this.selectedLayerConfig.layerId)
    this.props.onProfileSettingsUpdated('profileSettings', this.props.activeDataSource, layerIndex,
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

  disableSelection = (useDataSources: UseDataSource[]): boolean => {
    return false
  }

  /**
   * Hide the Alert message popup
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
      //display only the line layers in data source selector depending on its geometry type
      if (layer.type === 'GROUP_LAYER') {
        const subLayers = layer.getChildDataSources()
        if (subLayers) {
          subLayers.forEach(subLayer => {
            if (subLayer.layerDefinition?.geometryType === 'esriGeometryPolyline') {
              dsRootIdsArr.push(subLayer.id)
            }
          })
        }
      } else {
        if (layer.layerDefinition?.geometryType === 'esriGeometryPolyline') {
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
        <Label tabIndex={0} aria-label={this.nls('selectableLayersLabel')} className='w-100 d-flex'>
          <div className='flex-grow-1 text-break color-label'>
            {this.nls('selectableLayersLabel')}
          </div>
        </Label>
        <Tooltip role={'tooltip'} tabIndex={0} aria-label={this.nls('selectableLayersTooltip')}
          title={this.nls('selectableLayersTooltip')} showArrow placement='top'>
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
          disableAddData={true}
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
      <SidePopper isOpen={this.state.showLayerDataItemPanel && !urlUtils.getAppIdPageIdFromUrl().pageId} position='right' toggle={this.closePanel} trigger={this.layerSidePopperTrigger?.current}>
        <div className='bg-light-300 border-color-gray-400' css={getSidePanelStyle(this.props.theme)}>
          <SidepopperBackArrow
            theme={this.props.theme}
            intl={this.props.intl}
            title={this.state.layerName}
            ref={this.backRef}
            onBack={this.backForwardPanel} onClose={this.closePanel}>
            <div className={'setting-container'}>
              <ProfileSettingPopper
                activeDs={this.props.activeDataSource}
                activeDatasourceConfig={this.props.activeDsConfig}
                config={this.selectedLayerConfig}
                hasVerticalUnit={this.hasVerticalUnitParam}
                hasSupportForZValue={this.hasSupportForZValue}
                selectedLayerDataSource={this.selectedLayerDataSource}
                availableStatsForDisplay={this.props.allAvailableStatistics}
                intl={this.props.intl}
                theme={this.props.theme}
                updateProfileSettings={this.updateConfig.bind(this)}
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
