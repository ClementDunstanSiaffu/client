/** @jsx jsx */
import {
  React,
  jsx,
  AllWidgetProps,
  classNames,
  QueriableDataSource,
  DataSourceStatus,
  IMState,
  dataSourceUtils,
  DataSourceManager,
  DataRecord,
  AppMode,
  DataSource,
  defaultMessages as jimuCoreMessages,
  appActions,
  privilegeUtils
} from 'jimu-core'
import {
  EditModeType,
  IMConfig,
  LayerHonorModeType
} from '../config'
import {
  FeatureDataRecord,
  FeatureLayerDataSource,
  JimuMapViewComponent,
  JimuMapView
} from 'jimu-arcgis'
import defaultMessages from './translations/default'
import {
  defaultMessages as jimuUIDefaultMessages,
  Button,
  Select,
  WidgetPlaceholder
} from 'jimu-ui'
import { getStyle } from './style'
import EditItemDataSource from './edit-item-ds'
import { PlusOutlined } from 'jimu-icons/outlined/editor/plus'
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { ArrowLeftOutlined } from 'jimu-icons/outlined/directional/arrow-left'
import FeatureForm from 'esri/widgets/FeatureForm'
import Editor from 'esri/widgets/Editor'
import FeatureLayer from 'esri/layers/FeatureLayer'
import FormTemplate from 'esri/form/FormTemplate'
import FieldElement from 'esri/form/elements/FieldElement'
import GroupElement from 'esri/form/elements/GroupElement'
import Graphic from 'esri/Graphic'
import Query from 'esri/rest/support/Query'
import { versionManager } from '../version-manager'
import { WarningOutlined } from 'jimu-icons/outlined/suggested/warning'

const editPlaceholderIcon = require('./assets/icons/placeholder-edit-geometry-empty.svg')
const CSS = {
  base: 'esri-item-list',
  widget: 'esri-widget',
  header: 'esri-editor__header',
  formHeader: 'esri-feature-form__form-header',
  description: 'esri-feature-form__description-text',
  controls: 'esri-editor__controls',
  buttonDisabled: 'esri-button--disabled',
  heading: 'esri-widget__heading',
  featureForm: 'esri-feature-form',
  filterContainer: 'esri-item-list__filter-container',
  filterInput: 'esri-item-list__filter-input',
  filterPlaceholder: 'esri-item-list__filter-placeholder',
  filterPlaceholderText: 'esri-item-list__filter-placeholder-text',
  searchIcon: 'esri-icon-search',
  input: 'esri-input',
  scroller: 'esri-editor__scroller',
  content: 'esri-editor__content',
  list: 'esri-item-list__list',
  group: 'esri-item-list__group',
  noMatchesMessage: 'esri-item-list__no-matches-message',
  itemLabel: 'esri-item-list__list-item-label',
  itemContainer: 'esri-item-list__list-item-container',
  item: 'esri-item-list__list-item',
  groupHeader: 'esri-item-list__group-header',
  interactive: 'esri-interactive',
  backButton: 'esri-editor__back-button',
  title: 'esri-editor__title',
  leftArrowIcon: 'esri-icon-left',

  widgetHeading: 'esri-widget__heading',
  warningOption: 'esri-editor__warning-option',
  warningOptionPrimary: 'esri-editor__warning-option--primary',
  warningOptionPositive: 'esri-editor__warning-option--positive',

  progressBar: 'esri-editor__progress-bar',
  promptDanger: 'esri-editor__prompt--danger',
  promptHeader: 'esri-editor__prompt__header',
  promptHeaderHeading: 'esri-editor__prompt__header__heading',
  promptMessage: 'esri-editor__prompt__message',
  promptDivider: 'esri-editor__prompt__divider',
  promptActions: 'esri-editor__prompt__actions'
}

export interface Props {
  appMode: AppMode
}

export interface GroupFeature {
  id: string
  label: string
  items: __esri.Graphic[]
}

export interface ControlButton {
  label: string
  type: 'default' | 'primary' | 'secondary' | 'tertiary'
  clickHandler: () => void
  disabled?: boolean
}

export interface State {
  jimuMapView: JimuMapView
  dataSources: { [dsId: string]: DataSource }
  outputDataSourceIsNotReady: { [dsId: string]: boolean}
  editFeatures: { [dsId: string]: DataRecord[] }
  activeId: string
  featureFormStep: 'empty' | 'list' | 'form' | 'new'
  filterText: string
  formEditable?: boolean
  delConfirm: boolean
  attrUpdating: boolean
  formChange: boolean
}

export default class Widget extends React.PureComponent<
AllWidgetProps<IMConfig> & Props,
State
> {
  edit: __esri.FeatureForm | __esri.Editor
  refs: {
    editContainer: HTMLDivElement
    formHeaderContainer: HTMLDivElement
  }

  dsManager: DataSourceManager
  removeLayerOnce: boolean
  selectedIds: { [dsId: string]: string[] }
  currentRequestId: number

  static mapExtraStateProps = (
    state: IMState,
    props: AllWidgetProps<IMConfig>
  ): Props => {
    return {
      appMode: state?.appRuntimeInfo?.appMode
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      jimuMapView: undefined,
      dataSources: {},
      outputDataSourceIsNotReady: {},
      editFeatures: {},
      activeId: undefined,
      featureFormStep: 'empty',
      filterText: '',
      formEditable: false,
      delConfirm: false,
      attrUpdating: false,
      formChange: false
    }
    this.dsManager = DataSourceManager.getInstance()
    this.removeLayerOnce = false
    this.selectedIds = {}
    this.currentRequestId = 0
  }

  static versionManager = versionManager

  componentDidUpdate (prevProps, prevState) {
    const { id, config } = this.props
    const { editFeatures, dataSources, activeId } = this.state
    const { editMode, layersConfig } = config
    const { config: preConfig } = prevProps
    const { editMode: preEditMode, layersConfig: preLayersConfig } = preConfig
    const settingChange = preLayersConfig !== layersConfig
    if (layersConfig.length === 0) this.destoryEdit()
    const editModeChange = preEditMode !== editMode
    if (editModeChange) this.destoryEdit()
    if (settingChange) {
      if (editMode === EditModeType.Geometry) {
        this.createEditor()
      } else {
        const edit = this.edit as __esri.FeatureForm
        const selectedDs = Object.keys(editFeatures)
        const hasSelected = layersConfig.some(config => selectedDs.includes(config.id))
        const inConfigEditFeatures = this.getInLayersConfigFeatures(editFeatures, layersConfig)
        const flatEditFeatures = this.flatMapArray(inConfigEditFeatures)
        const editCount = flatEditFeatures.length
        if (edit?.formTemplate && layersConfig.length !== 0) {
          const activeConfig = layersConfig.asMutable({ deep: true }).find(item => item.id === activeId)
          // layerHonorMode change
          if (activeConfig?.layerHonorMode === LayerHonorModeType.Webmap) {
            const dataSource = dataSources[activeId]
            edit.formTemplate = (dataSource as any)?.layer?.formTemplate
          } else if (edit?.formTemplate) {
            const formElements = this.constructFormElements()
            const formTemplate = new FormTemplate({
              elements: formElements
            })
            edit.formTemplate = formTemplate
          }
          const elements = edit?.formTemplate?.elements
          if (elements?.length === 0) {
            document.getElementById(`edit-container-${id}`)?.classList.add('esri-hidden')
          } else if (editCount !== 0) {
            document.getElementById(`edit-container-${id}`)?.classList.remove('esri-hidden')
          }
        } else if (layersConfig.length !== 0 && hasSelected) {
          // some featur has been selected before mode change
          if (editCount === 1) {
            const dataSource = dataSources?.[selectedDs[0]]
            const graphic = dataSource.getSelectedRecords()?.[0] as any
            if (!graphic) return
            this.renderFeatureForm(dataSource, graphic)
          } else if (editCount > 1 || editCount === 0) {
            document.getElementById(`edit-container-${id}`)?.classList.add('esri-hidden')
          }
        }
      }
    }
    const removeLayerFlag = this.props?.stateProps?.removeLayerFlag || false
    if (removeLayerFlag && !this.removeLayerOnce) {
      this.props.dispatch(
        appActions.widgetStatePropChange(id, 'removeLayerFlag', false)
      )
      const newEditFeatures = Object.assign({}, editFeatures)
      const idArray = Object.keys(newEditFeatures)
      idArray.forEach(id => {
        if (!layersConfig.find(config => config.id === id)) {
          delete newEditFeatures[id]
        }
      })
      const inConfigEditFeatures = this.getInLayersConfigFeatures(newEditFeatures, layersConfig)
      const flatEditFeatures = this.flatMapArray(inConfigEditFeatures)
      const editCount = flatEditFeatures.length
      const step = editCount > 1 ? 'list' : editCount === 1 ? 'form' : 'empty'
      if (step === 'form') {
        this.removeLayerOnce = true
        const dsId = flatEditFeatures[0]?.dataSource?.belongToDataSource?.id
        document.getElementById(`edit-container-${id}`)?.classList.remove('esri-hidden')
        this.renderFeatureForm(dataSources[dsId] as QueriableDataSource, flatEditFeatures[0])
      } else if (step === 'list') {
        document.getElementById(`edit-container-${id}`)?.classList.add('esri-hidden')
      }
      this.setState({ editFeatures: newEditFeatures, featureFormStep: step })
    }
  }

  componentWillUnmount () {
    const { config } = this.props
    const { editMode } = config
    const isGeoMode = editMode === EditModeType.Geometry
    if (this.edit && isGeoMode) {
      const edit = this.edit as __esri.Editor
      edit?.cancelWorkflow()
    }
  }

  handleActiveViewChange = (jimuMapView: JimuMapView) => {
    this.setState({ jimuMapView }, () => {
      const view = jimuMapView?.view
      view?.when(() => {
        view?.on('layerview-create', event => {
          const newLayer = event.layer
          if (newLayer?.id?.includes('jimu-draw-measurements-layer')) {
            const editor = this.edit as Editor
            editor?.layerInfos ? this.setupEditLayerInfos(jimuMapView) : this.createEditor(jimuMapView)
          }
        })
      })
      if (!jimuMapView) {
        this.destoryEdit()
      } else {
        this.createEditor(jimuMapView)
      }
    })
  }

  formatMessage = (id: string, values?: { [key: string]: any }) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages, jimuCoreMessages)
    return this.props.intl.formatMessage(
      { id: id, defaultMessage: messages[id] },
      values
    )
  }

  destoryEdit = () => {
    this.edit && !this.edit.destroyed && this.edit.destroy()
  }

  flatMapArray = (editFeatures) => {
    // flat editFeatures
    const flatEditFeatures = []
    for (const dsId in editFeatures) {
      if (editFeatures?.[dsId]) {
        flatEditFeatures.push(...editFeatures[dsId])
      }
    }
    return flatEditFeatures
  }

  flatMapArrayWithView = (editFeatures, jimuMapView) => {
    const flatEditFeatures = []
    const mapDsId = jimuMapView?.dataSourceId
    for (const dsId in editFeatures) {
      if (dsId.indexOf(mapDsId) === 0 && editFeatures?.[dsId]) {
        flatEditFeatures.push(...editFeatures[dsId])
      }
    }
    return flatEditFeatures
  }

  createEditForm = async (dataSourceId: string, dsChange: boolean, newRequestId?: number) => {
    const { dataSources, editFeatures } = this.state
    const { id, config } = this.props
    const { layersConfig } = config
    const dataSource = dataSources[dataSourceId] as QueriableDataSource
    const inConfigEditFeatures = this.getInLayersConfigFeatures(editFeatures, layersConfig)
    const flatEditFeatures = this.flatMapArray(inConfigEditFeatures)
    const editCount = flatEditFeatures.length
    // create FeatureForm or change edit feature
    if (editCount === 1) {
      const graphic = dataSource.getSelectedRecords()?.[0] as any
      // Deselect one by one until the last one, if not the current DS, needs special treatment
      if (!graphic) return
      if (dsChange || !this.edit || this.edit?.destroyed) {
        this.renderFeatureForm(dataSource, graphic, newRequestId)
      } else {
        document.getElementById(`edit-container-${id}`)?.classList.remove('esri-hidden')
        this.createOrUpdateheader(dataSource, graphic.feature)
        const edit = this.edit as __esri.FeatureForm
        if (!edit) return
        const graphicFeature = await dataSourceUtils.changeToJSAPIGraphic(graphic?.feature)
        edit.feature = graphicFeature
      }
    } else if (editCount > 1 || editCount === 0) { // list or no data
      document.getElementById(`edit-container-${id}`)?.classList.add('esri-hidden')
    }
  }

  getDsAccessibleInfo = (url) => {
    if (!url) return Promise.resolve(false)
    return fetch(`${url}?f=pjson`).then(async res => await res.json()).then(info => {
      if (Object.keys(info).includes('error')) {
        return false
      } else {
        return true
      }
    }).catch((err) => {
      console.error(err)
    })
  }

  getPrivilege = () => {
    return privilegeUtils.checkExbAccess(privilegeUtils.CheckTarget.Experience).then(exbAccess => {
      return exbAccess?.capabilities?.canEditFeature
    })
  }

  renderFeatureForm = (dataSource, graphic?, newRequestId?) => {
    const { activeId } = this.state
    const { config, id } = this.props
    const { editMode, layersConfig } = config
    const activeConfig = layersConfig.asMutable({ deep: true }).find(item => item.id === activeId)
    this.destoryEdit()
    this.getFeatureLayer(dataSource).then(async (layer) => {
      if (newRequestId && (newRequestId !== this.currentRequestId)) return
      this.removeLayerOnce = false
      if (!layer) return
      // Build container for edit
      const container = document && document.createElement('div')
      container.id = `edit-container-${id}`
      container.className = `edit-container-${id}`
      this.refs.editContainer.appendChild(container)
      let featureLayer
      if (layer.layer) {
        featureLayer = layer.layer
      } else {
        featureLayer = layer
      }
      // fetch to confirm whether it's a public source
      const accessible = await this.getDsAccessibleInfo(featureLayer?.url)
      // use exb privilege instead of api's supportsUpdateByOthers
      const privilegeEditable = await this.getPrivilege()
      const editable = accessible || privilegeEditable
      this.setState({ formEditable: editable })
      if (editMode === EditModeType.Attribute) {
        const elements = this.constructFormElements(dataSource.id)
        const formTemplate = new FormTemplate({
          elements: elements
        })
        const graphicFeature = graphic?.feature ? await dataSourceUtils.changeToJSAPIGraphic(graphic?.feature) : undefined
        const useFeature = graphicFeature || new Graphic({
          layer: featureLayer
        })
        const useFormTemplate = activeConfig.layerHonorMode === LayerHonorModeType.Webmap
          ? (dataSource?.layer?.formTemplate || formTemplate)
          : formTemplate
        this.edit = new FeatureForm({
          container: container,
          feature: useFeature,
          layer: featureLayer,
          formTemplate: useFormTemplate
        })
        // Render form header
        this.createOrUpdateheader(dataSource, useFeature)
        if (graphic) this.setState({ featureFormStep: 'form' })

        const editForm = this.edit
        editForm.on('submit', () => {
          const newFeature = useFeature
          if (newFeature) {
            if (newFeature?.geometry) {
              newFeature.geometry = null
            }
            // Grab updated attributes from the form.
            const updated = editForm.getValues()
            Object.keys(updated).forEach((name) => {
              newFeature.attributes[name] = updated[name]
            })
            // Setup the applyEdits parameter with updates.
            const edits = {
              updateFeatures: [newFeature]
            }
            this.applyAttributeUpdates(edits)
          }
        })

        editForm.on('value-change', (changedValue) => {
          const { feature, fieldName, value } = changedValue
          if (value !== feature?.attributes?.[fieldName]) {
            this.setState({ formChange: true })
          } else {
            this.setState({ formChange: false })
          }
        })

        featureLayer.on('edits', event => {
          const { addedFeatures, updatedFeatures, deletedFeatures } = event
          const adds = addedFeatures && addedFeatures.length > 0
          const updates = updatedFeatures && updatedFeatures.length > 0
          const deletes = deletedFeatures && deletedFeatures.length > 0
          if (adds) {
            const addFeature = event?.edits?.addFeatures?.[0]
            if (addFeature) {
              const record = dataSource.buildRecord(addFeature, dataSource)
              dataSource.afterAddRecord(record)
            }
          }
          if (updates) {
            const updateFeature = event?.edits?.updateFeatures?.[0]
            if (updateFeature) {
              const record = dataSource.buildRecord(updateFeature, dataSource)
              dataSource.afterUpdateRecord(record)
            }
          }
          if (deletes) {
            const deleteFeature = event?.edits?.deleteFeatures?.[0]
            if (deleteFeature) {
              const record = dataSource.buildRecord(deleteFeature, dataSource)
              dataSource.afterDeleteRecordById(record.getId())
            }
          }
        })
      }
    }).catch(err => {
      this.removeLayerOnce = false
      console.error(err)
    })
  }

  createOrUpdateheader = (dataSource, feature) => {
    const { id } = this.props
    const { featureFormStep } = this.state
    const displayField = this.getLayerDisplayField(dataSource)
    const title = featureFormStep === 'new' ? this.formatMessage('addFeature') : feature?.attributes?.[displayField]
    if (!document?.getElementById(`form_heading_${id}`)) {
      const formDom = document && document.createElement('header')
      formDom.className = CSS.header
      formDom.innerHTML = `
        <h4 id='form_heading_${id}' class='text-truncate ${classNames(CSS.heading)}' title='${title}'>${title}</h4>
      `
      this.refs.formHeaderContainer.appendChild(formDom)
    } else {
      document.getElementById(`form_heading_${id}`).innerText = title
    }
  }

  deleteChangeDataSource = (selectedAfterDel) => {
    const { config } = this.props
    const { layersConfig } = config
    const { activeId, editFeatures } = this.state
    const newEditFeatures = Object.assign({}, editFeatures)
    newEditFeatures[activeId] = selectedAfterDel
    const inConfigEditFeatures = this.getInLayersConfigFeatures(newEditFeatures, layersConfig)
    const flatEditFeatures = this.flatMapArray(inConfigEditFeatures)
    const editCount = flatEditFeatures.length
    const step = editCount > 1 ? 'list' : editCount === 1 ? 'form' : 'empty'
    this.setState({ editFeatures: newEditFeatures, featureFormStep: step }, () => {
      this.createEditForm(activeId, false)
    })
  }

  applyAttributeUpdates = (params) => {
    const { dataSources, editFeatures, activeId } = this.state
    const editForm = this.edit as __esri.FeatureForm
    const dataSource = dataSources[activeId]
    const gdbVersion = (dataSource as FeatureLayerDataSource).getGDBVersion()
    editForm.layer.applyEdits(params, { gdbVersion }).then((editsResult) => {
      const results = editsResult as any
      // Call selectRecordById to highlight the new feature.
      if (results.addFeatureResults.length > 0) {
        const objectId = results.addFeatureResults[0].objectId?.toString()
        dataSource.selectRecordById(objectId)
      }
      if (params?.deleteFeatures) {
        const selectedRecords = dataSource?.getSelectedRecords() as any
        const selectedAfterDel = selectedRecords.filter(item => item.feature.attributes !== params?.deleteFeatures[0].attributes)
        if (selectedAfterDel.length > 0) {
          this.deleteChangeDataSource(selectedAfterDel)
        } else {
          const newEditFeatures = Object.assign({}, editFeatures)
          delete newEditFeatures[activeId]
          const formHeader = this.refs.formHeaderContainer
          if (formHeader?.innerHTML) formHeader.innerHTML = ''
          this.destoryEdit()
          this.setState({ editFeatures: newEditFeatures, featureFormStep: 'empty', activeId: '' })
        }
      } else if (params?.updateFeatures) {
        this.setState({ attrUpdating: false })
      }
      this.setState({ formChange: false })
    }).catch((error) => {
      if (params?.updateFeatures) {
        this.setState({ attrUpdating: false })
      }
      console.log('error = ', error)
    })
  }

  constructFormElements = (dsId?) => {
    let { activeId } = this.state
    if (dsId) activeId = dsId
    const { config } = this.props
    const { layersConfig } = config
    const activeConfig = layersConfig.asMutable({ deep: true }).find(item => item.id === activeId)
    if (!activeConfig) return []
    const { groupedFields } = activeConfig
    const elements = groupedFields.map(item => {
      if (item?.children) {
        return new GroupElement({
          label: item.name,
          description: item.subDescription || item?.description,
          elements: item?.children.map(ele => {
            return new FieldElement({
              fieldName: ele.jimuName,
              label: ele?.alias,
              description: ele.subDescription || ele?.description,
              editable: ele.editAuthority
            })
          })
        })
      } else {
        return new FieldElement({
          fieldName: item.jimuName,
          label: item?.alias,
          description: item.subDescription || item?.description,
          editable: item.editAuthority
        })
      }
    })
    return elements
  }

  onFilterChange = (evt) => {
    this.setState({ filterText: evt.target.value })
  }

  renderListItems = (editFeatures) => {
    const { filterText } = this.state
    const groupedSelectedFeatures = []
    for (const dsId in editFeatures) {
      const featuresArray = editFeatures[dsId]
      const dataSource = featuresArray?.[0]?.dataSource
      const beToDs = dataSource?.belongToDataSource
      const layerId = beToDs?.jimuChildId
      const layerLabel = beToDs?.layerDefinition?.name || beToDs?.layerDefinition?.description
      const displayField = this.getLayerDisplayField(dataSource)
      const objectIdField = this.getLayerObjectIdField(dataSource)
      const group = {
        id: layerId,
        label: layerLabel,
        dsId,
        items: featuresArray.filter(ele => {
          const label = ele.feature.attributes?.[displayField] || ele.feature.attributes?.[objectIdField] || ele.feature.attributes?.objectid
          const lowerCasedFilter = filterText.toLowerCase()
          return !lowerCasedFilter || label?.toString()?.toLowerCase().indexOf(lowerCasedFilter) > -1
        }).map(item => {
          const objectIdFieldValue = item.feature.attributes?.[displayField] || item.feature.attributes?.[objectIdField] || item.feature.attributes?.objectid
          return {
            id: objectIdFieldValue,
            dsId,
            label: objectIdFieldValue,
            data: item.feature
          }
        })
      }
      groupedSelectedFeatures.push(group)
    }
    let count = 0
    groupedSelectedFeatures.forEach(item => {
      count += item.items.length
    })

    if (count === 0) {
      return (
        <div className={CSS.noMatchesMessage} key='no-matches'>
          {'No items found'}
        </div>
      )
    }

    return (
      <div key='item-container'>
        {groupedSelectedFeatures.map(group =>
          this.renderGroup(group)
        )}
      </div>
    )
  }

  renderGroup = (group) => {
    const headingId = `${group.id}-heading`
    if (group.items.length === 0) return

    return (
      <section aria-labelledby={headingId} className={CSS.group} key={group.label}>
        <h4 id={headingId} className={classNames(CSS.groupHeader, CSS.heading)}>
          <span className={CSS.itemLabel}>{group.label}</span>
        </h4>
        <ul className={CSS.list}>
          {group.items.map(item =>
            this.renderItem(item)
          )}
        </ul>
      </section>
    )
  }

  renderItem = (item) => {
    const key = `${item.id}__${item.label}`
    const { dataSources } = this.state

    return (
      <li
        aria-level={2}
        className={CSS.item}
        data-item={item}
        key={key}
        onClick={() => {
          this.renderFeatureForm(dataSources[item.dsId] as QueriableDataSource, { feature: item.data })
        }}
      >
        <div className={CSS.itemContainer}>
          <span className={CSS.itemLabel}>{item.label}</span>
        </div>
      </li>
    )
  }

  getLayerDisplayField = (dataSource) => {
    const displayField =
      dataSource?.layer?.displayField ||
      dataSource?.layerDefinition?.displayField ||
      dataSource?.belongToDataSource?.layerDefinition?.displayField ||
      dataSource?.layer?.objectIdField ||
      dataSource?.layerDefinition?.objectIdField ||
      dataSource?.belongToDataSource?.layerDefinition?.objectIdField ||
      'OBJECTID'
    return displayField
  }

  getLayerObjectIdField = (dataSource) => {
    const objectIdField =
      dataSource?.layer?.objectIdField ||
      dataSource?.belongToDataSource?.layerDefinition?.objectIdField ||
      'OBJECTID'
    return objectIdField
  }

  renderFeatureList = (editFeatures, description) => {
    const { id, label } = this.props
    const { filterText } = this.state
    const placeholderId = `${id}-placeholder`
    const formHeader = this.refs.formHeaderContainer
    if (formHeader?.innerHTML) formHeader.innerHTML = ''

    return (
      <div className='surface-1 h-100'>
        <div className={CSS.featureForm}>
          <div className={CSS.formHeader}>
            <h2 className={CSS.heading}>{label}</h2>
            <p className={classNames(`text-truncate ${CSS.description}`)} key='description' title={description}>
              {description}
            </p>
          </div>
        </div>
        <div className={classNames(`feature-list ${CSS.content} ${CSS.scroller}`)}>
          <div className={classNames(CSS.base, CSS.widget)}>
            <div className={CSS.filterContainer} key="filter">
              <input
                aria-labelledby={placeholderId}
                className={classNames(CSS.input, CSS.filterInput)}
                title={filterText}
                value={filterText}
                onChange={this.onFilterChange}
                type='search'
              />
              {!filterText
                ? <div className={CSS.filterPlaceholder} id={placeholderId} key="placeholder">
                    <span className={CSS.searchIcon} aria-hidden="true" />
                    <div className={CSS.filterPlaceholderText}>{this.formatMessage('search')}</div>
                  </div>
                : null
              }
            </div>
            <div key='content' className={classNames(CSS.scroller)}>
              {this.renderListItems(editFeatures)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderFormEmpty = (description?) => {
    const { id, label, config } = this.props
    const { noDataMessage, layersConfig, editMode } = config
    const formHeader = this.refs.formHeaderContainer
    if (formHeader?.innerHTML) formHeader.innerHTML = ''
    const hasValidLayer = layersConfig.length > 0
    const isAttrMode = editMode === EditModeType.Attribute
    const noLayerTips = isAttrMode ? this.formatMessage('initAttEmptyMessage') : this.formatMessage('initGeoEmptyMessage')
    const emptyTips = hasValidLayer ? (noDataMessage || this.formatMessage('noRecordTips')) : noLayerTips
    const formDom = document.getElementById(`edit-container-${id}`)
    if (formDom) formDom?.classList.add('esri-hidden')

    return (
      <div className='surface-1 h-100'>
        <div className={classNames(`editor-white-bg ${CSS.featureForm}`)}>
          <div className={CSS.formHeader}>
            <h2 className={CSS.heading}>{label}</h2>
            <p className={classNames(`text-truncate ${CSS.description}`)} key='description' title={description}>
              {description}
            </p>
          </div>
        </div>
        <div className='w-100 text-center edit-blank'>
          <div className='position-absolute edit-blank-content w-100'>
            <InfoOutlined size={32} className='placeholder-icon'/>
            <p>{emptyTips}</p>
          </div>
        </div>
      </div>
    )
  }

  renderControlButtons = (buttons) => {
    return (
      <div className={classNames(`flex-row justify-content-between ${CSS.controls}`)} key='controls'>
        {buttons.map(({ disabled = false, label, type, clickHandler }, index) =>
          this.renderButton({
            label,
            class: classNames(
              { 'single-buttons': buttons.length === 1 },
              { 'multi-buttons': buttons.length > 1 },
              disabled ? CSS.buttonDisabled : null
            ),
            type,
            disabled,
            clickHandler,
            key: index
          })
        )}
      </div>
    )
  }

  handleNew = (): void => {
    const { dataSources } = this.state
    const { config } = this.props
    const { layersConfig } = config
    const firstId = layersConfig.find(config => config?.addRecords)?.id
    if (firstId) {
      this.setState({ featureFormStep: 'new', activeId: firstId }, () => {
        this.renderFeatureForm(dataSources[firstId] as QueriableDataSource)
      })
    }
  }

  handleAdd = (): void => {
    const addFeature = (this.edit.viewModel as __esri.FeatureFormViewModel)?.feature
    if (addFeature) {
      const updated = (this.edit as __esri.FeatureForm).getValues()
      addFeature.attributes = updated
      const edits = {
        addFeatures: [addFeature]
      }
      this.applyAttributeUpdates(edits)
    }
  }

  handleSave = (): void => {
    (this.edit?.viewModel as __esri.FeatureFormViewModel)?.submit()
    this.setState({ attrUpdating: true })
  }

  handleDeleteConfirm = () => {
    this.setState({ delConfirm: true })
  }

  cancleDelete = () => {
    this.setState({ delConfirm: false })
  }

  handleDelete = (): void => {
    const delFeature = (this.edit.viewModel as __esri.FeatureFormViewModel).feature
    if (delFeature) {
      const edits = {
        deleteFeatures: [delFeature]
      }
      this.applyAttributeUpdates(edits)
    }
    this.setState({ delConfirm: false })
  }

  renderButton = (props) => {
    return (
      <Button
        className={props.class}
        disabled={props.disabled}
        key={props.key}
        onClick={props.clickHandler}
        type={props.type}
      >
        {props.label}
      </Button>
    )
  }

  constructFieldConfig = (groupedFields) => {
    const useGroupedFields = groupedFields?.asMutable({ deep: true })
    const elements = useGroupedFields.map(item => {
      if (item?.children) {
        return new GroupElement({
          label: item.name,
          description: item.subDescription || item?.description,
          elements: item?.children.map(ele => {
            return new FieldElement({
              fieldName: ele.jimuName,
              label: ele?.alias,
              description: ele.subDescription || ele?.description,
              editable: ele.editAuthority
            })
          })
        })
      } else {
        return new FieldElement({
          fieldName: item.jimuName,
          label: item?.alias,
          description: item.subDescription || item?.description,
          editable: item.editAuthority
        })
      }
    })
    return elements
  }

  setupEditLayerInfos = (jimuMapView: JimuMapView) => {
    const { config } = this.props
    const { layersConfig } = config
    const editLayerInfos = []
    let count = 0
    // Due to the special mechanism of the interface, all unconfigured layers are enabled by default.
    // Therefore, now set the default permissions of layer not configured to false.
    const mapAllLayers = jimuMapView.view?.map?.allLayers || []
    const allLayers = mapAllLayers.filter(item => item.type === 'feature')
    // Draw widget measurements layer
    const measureLayers = []
    mapAllLayers.forEach(layer => {
      if (layer?.id.includes('jimu-draw-measurements-layer')) {
        measureLayers.push(layer)
      }
    })
    if (measureLayers.length > 0) {
      measureLayers.forEach(measureLayer => {
        editLayerInfos.push({
          layer: measureLayer,
          enabled: false,
          addEnabled: false,
          updateEnabled: false,
          deleteEnabled: false
        })
      })
    }
    allLayers.forEach(async layer => {
      const activeConfigLayer = layersConfig.find(config => config.layerId === layer.id)
      // new Editor must use layer on map
      const editorUseLayer = layer
      // If editorUseLayer is undefined, indicates that map is invisible(switch mapGroup)
      // It does not have to be added to editLayerInfos
      if (editorUseLayer) {
        if (activeConfigLayer) { // It has been configured in setting
          const { groupedFields, addRecords, deleteRecords, updateGeometries, layerHonorMode, id } = activeConfigLayer
          const isHonorWebmap = layerHonorMode === LayerHonorModeType.Webmap
          // fetch to confirm whether it's a public source
          const accessible = await this.getDsAccessibleInfo((layer as any)?.url)
          // use exb privilege instead of api's supportsUpdateByOthers
          const privilegeEditable = await this.getPrivilege()
          const editable = accessible || privilegeEditable
          const formTemplate = new FormTemplate({
            elements: this.constructFieldConfig(groupedFields)
          })
          editLayerInfos.push({
            layer: editorUseLayer,
            ...(isHonorWebmap ? {} : { formTemplate }),
            enabled: editable && (addRecords || updateGeometries || deleteRecords),
            addEnabled: addRecords,
            updateEnabled: updateGeometries,
            deleteEnabled: deleteRecords
          })
          // update dataSource after edit
          const watchEditLayer = editorUseLayer as any
          watchEditLayer.on('edits', event => {
            const { dataSources } = this.state
            const dataSource = dataSources[id]
            const { addedFeatures, updatedFeatures, deletedFeatures } = event
            const adds = addedFeatures && addedFeatures.length > 0
            const updates = updatedFeatures && updatedFeatures.length > 0
            const deletes = deletedFeatures && deletedFeatures.length > 0
            if (adds) {
              const addFeature = event?.edits?.addFeatures?.[0]
              if (addFeature) {
                const record = dataSource.buildRecord(addFeature)
                dataSource.afterAddRecord(record)
              }
            }
            if (updates) {
              const updateFeature = event?.edits?.updateFeatures?.[0]
              if (updateFeature) {
                const record = dataSource.buildRecord(updateFeature)
                dataSource.afterUpdateRecord(record)
              }
            }
            if (deletes) {
              const deleteFeature = event?.edits?.deleteFeatures?.[0]
              if (deleteFeature) {
                const record = dataSource.buildRecord(deleteFeature)
                dataSource.afterDeleteRecordById(record.getId())
              }
            }
          })
        } else {
          editLayerInfos.push({
            layer: editorUseLayer,
            enabled: false,
            addEnabled: false,
            updateEnabled: false,
            deleteEnabled: false
          })
        }
      }
      count++
      if (count === allLayers.length) {
        const editor = this.edit as Editor
        editor.layerInfos = editLayerInfos
      }
    })
  }

  createEditor = (mapView?: JimuMapView) => {
    let { jimuMapView } = this.state
    const { useMapWidgetIds } = this.props
    if (!useMapWidgetIds || useMapWidgetIds.length === 0) return
    if (mapView) jimuMapView = mapView
    if (!jimuMapView) return
    const { id, config } = this.props
    const { layersConfig } = config
    if (layersConfig?.length === 0) return
    // only setting change
    if (typeof this.edit !== 'undefined') {
      if (!mapView && this.edit && !this.edit.destroyed) {
        this.setupEditLayerInfos(jimuMapView)
        return
      }
    }
    this.destoryEdit()
    let container = null
    const existingDom = document.getElementById(`edit-container-${id}`)
    if (existingDom) {
      existingDom.remove()
    }
    container = document && document.createElement('div')
    container.id = `edit-container-${id}`
    container.className = `h-100 edit-container-${id}`
    this.refs.editContainer.appendChild(container)
    const editLayerInfos = []
    let count = 0
    const newEditor = () => {
      this.edit = new Editor({
        container: container,
        view: jimuMapView.view,
        layerInfos: editLayerInfos
      })
    }
    // Due to the special mechanism of the interface, all unconfigured layers are enabled by default.
    // Therefore, now set the default permissions of layer not configured to false.
    const mapAllLayers = jimuMapView.view?.map?.allLayers || []
    const allLayers = mapAllLayers.filter(item => item.type === 'feature')
    // Draw widget measurements layer
    const measureLayers = []
    mapAllLayers.forEach(layer => {
      if (layer?.id.includes('jimu-draw-measurements-layer')) {
        measureLayers.push(layer)
      }
    })
    if (measureLayers.length > 0) {
      measureLayers.forEach(measureLayer => {
        editLayerInfos.push({
          layer: measureLayer,
          enabled: false,
          addEnabled: false,
          updateEnabled: false,
          deleteEnabled: false
        })
      })
    }
    allLayers.forEach(async layer => {
      const activeConfigLayer = layersConfig.find(config => config.layerId === layer.id)
      // new Editor must use layer on map
      const editorUseLayer = layer
      // If editorUseLayer is undefined, indicates that map is invisible(switch mapGroup)
      // It does not have to be added to editLayerInfos
      if (editorUseLayer) {
        if (activeConfigLayer) { // It has been configured in setting
          const { groupedFields, addRecords, deleteRecords, updateGeometries, layerHonorMode, id } = activeConfigLayer
          const isHonorWebmap = layerHonorMode === LayerHonorModeType.Webmap
          // fetch to confirm whether it's a public source
          const accessible = await this.getDsAccessibleInfo((layer as any)?.url)
          // use exb privilege instead of api's supportsUpdateByOthers
          const privilegeEditable = await this.getPrivilege()
          const editable = accessible || privilegeEditable
          const formTemplate = new FormTemplate({
            elements: this.constructFieldConfig(groupedFields)
          })
          editLayerInfos.push({
            layer: editorUseLayer,
            ...(isHonorWebmap ? {} : { formTemplate }),
            enabled: editable && (addRecords || updateGeometries || deleteRecords),
            addEnabled: addRecords,
            updateEnabled: updateGeometries,
            deleteEnabled: deleteRecords
          })
          // update dataSource after edit
          const watchEditLayer = editorUseLayer as any
          watchEditLayer.on('edits', event => {
            const { dataSources } = this.state
            const dataSource = dataSources[id]
            const { addedFeatures, updatedFeatures, deletedFeatures } = event
            const adds = addedFeatures && addedFeatures.length > 0
            const updates = updatedFeatures && updatedFeatures.length > 0
            const deletes = deletedFeatures && deletedFeatures.length > 0
            if (adds) {
              const addFeature = event?.edits?.addFeatures?.[0]
              if (addFeature) {
                const record = dataSource.buildRecord(addFeature)
                dataSource.afterAddRecord(record)
              }
            }
            if (updates) {
              const updateFeature = event?.edits?.updateFeatures?.[0]
              if (updateFeature) {
                const record = dataSource.buildRecord(updateFeature)
                dataSource.afterUpdateRecord(record)
              }
            }
            if (deletes) {
              const deleteFeature = event?.edits?.deleteFeatures?.[0]
              if (deleteFeature) {
                const record = dataSource.buildRecord(deleteFeature)
                dataSource.afterDeleteRecordById(record.getId())
              }
            }
          })
        } else {
          editLayerInfos.push({
            layer: editorUseLayer,
            enabled: false,
            addEnabled: false,
            updateEnabled: false,
            deleteEnabled: false
          })
        }
      }
      count++
      if (count === allLayers.length) {
        newEditor()
      }
    })
  }

  getFeatureLayer = (dataSource: QueriableDataSource) => {
    const { id } = this.props
    const ds = dataSource as FeatureLayerDataSource
    const notToLoad = dataSource?.getDataSourceJson()?.isDataInDataSourceInstance
    let featureLayer

    const curQuery: any = dataSource && dataSource.getCurrentQueryParams()
    if (notToLoad) {
      // chart output and selected features need load
      return ds.load({ returnGeometry: true }, { widgetId: id }).then(async (records) => {
        const dataRecords = await Promise.resolve(records) as FeatureDataRecord[]
        return dataSourceUtils.createFeatureLayerByRecords(ds, dataRecords)
      }).catch(err => {
        console.error(err)
      })
    }
    // Adjust the order, because ds.layer is a reference type that changes the original data
    // csv upload type ds: only have layer, but not itemId and url
    if (!FeatureLayer) return Promise.resolve(featureLayer)
    if (ds.itemId) {
      const layerId = parseInt(ds.layerId)
      const layerConfig = {
        portalItem: {
          id: ds.itemId,
          portal: {
            url: ds.portalUrl
          }
        },
        definitionExpression: curQuery.where,
        layerId: layerId || undefined
      }
      if (ds.url) (layerConfig as any).url = ds.url
      featureLayer = new FeatureLayer(layerConfig)
    } else if (ds.url) {
      featureLayer = new FeatureLayer({
        definitionExpression: curQuery.where,
        url: ds.url
      })
    } else if (ds.layer) {
      return ds.load({ returnGeometry: true }, { widgetId: id }).then(async (records) => {
        const dataRecords = await Promise.resolve(records) as FeatureDataRecord[]
        return dataSourceUtils.createFeatureLayerByRecords(ds, dataRecords)
      }).catch(err => {
        console.error(err)
      })
    } else {
      return Promise.resolve(featureLayer)
    }

    if (notToLoad) { // output ds (dynamic layer, load will rise bug)
      return Promise.resolve(featureLayer)
    } else { // need load to get layer.capabilities
      return featureLayer.load().then(async () => {
        return await Promise.resolve(featureLayer)
      }).catch(err => {
        console.error(err)
      })
    }
  }

  getCurrentEditLayer = (layerId) => {
    const { activeId, jimuMapView } = this.state
    const { config } = this.props
    const { layersConfig } = config
    const mapLayers = jimuMapView.view.map.layers
    const activeConfig = layersConfig.asMutable({ deep: true }).find(item => item.id === activeId)
    const { id: configDsId } = activeConfig
    let currentEditLayer = mapLayers.find(layer => layer.id === layerId)
    if (!currentEditLayer) {
      mapLayers.forEach(layer => {
        const subLayers = (layer as any)?.layers
        if (subLayers && (configDsId?.includes(layer.id) || configDsId?.includes(layerId))) {
          currentEditLayer = subLayers.find(layer => (layer.layerId?.toString() === layerId || layer.id === layerId))
        }
      })
    }
    return currentEditLayer
  }

  startWorkFlowWhenAwait = async (editFeatures?, useDataSourceId?) => {
    const { activeId, dataSources, editFeatures: orgEditFeatures, jimuMapView } = this.state
    const edit = this.edit as __esri.Editor
    // The number of selected(the layers from the same map)
    const newEditFeatures = editFeatures || orgEditFeatures
    const mapEditCount = this.flatMapArrayWithView(newEditFeatures, jimuMapView).length
    if (mapEditCount === 1) {
      const dsId = useDataSourceId || activeId
      const objectIdField = this.getLayerObjectIdField(dataSources[dsId])
      const activeGraphic = (newEditFeatures?.[dsId]?.[0] as FeatureDataRecord)?.feature as __esri.Graphic
      const currentEditLayer = this.getCurrentEditLayer(activeGraphic?.layer.id) as __esri.FeatureLayer
      // currentEditLayer is not in active map
      if (!currentEditLayer) return
      const query = new Query({
        where: `${objectIdField} = ${activeGraphic.attributes[objectIdField]}`,
        outFields: ['*'],
        returnGeometry: true
      })
      currentEditLayer.queryFeatures(query).then(results => {
        const activeFeature = results?.features[0]
        edit?.startUpdateWorkflowAtFeatureEdit(activeFeature)
      }).catch(err => {
        console.error(err)
      })
    } else if (mapEditCount > 1) {
      const loopAddGraphics = async () => {
        let graphics = []
        const promises = []
        for (const dsId in newEditFeatures) {
          const objectIdField = this.getLayerObjectIdField(dataSources[dsId])
          const layerFeaturesArray = newEditFeatures?.[dsId]
          if (layerFeaturesArray?.length > 0) {
            const selectedQuery = `${objectIdField} IN (${newEditFeatures[dsId]
              .map(record => {
                const activeGraphic = (record as FeatureDataRecord)?.feature as __esri.Graphic
                return activeGraphic.attributes[objectIdField]
              })
              .join()})`
            const currentGraphic = (layerFeaturesArray[0] as FeatureDataRecord)?.feature as __esri.Graphic
            const currentEditLayer = this.getCurrentEditLayer(currentGraphic?.layer.id) as __esri.FeatureLayer
            const query = new Query({
              where: selectedQuery,
              outFields: ['*'],
              returnGeometry: true
            })
            promises.push(currentEditLayer.queryFeatures(query))
          }
        }
        const results = await Promise.all(promises)
        Object.keys(newEditFeatures).forEach((dsId, index) => {
          graphics = graphics.concat(results[index]?.features || [])
        })
        return graphics
      }
      const graphics = await loopAddGraphics()
      edit?.startUpdateWorkflowAtMultipleFeatureSelection(graphics)
    } else {
      if (edit?.activeWorkflow) edit?.cancelWorkflow()
    }
  }

  idsArrayEquals = (newDataSourceId: string, newSelectedIds: string[]) => {
    if (!newSelectedIds) return false
    if (this.selectedIds[newDataSourceId]?.length !== newSelectedIds.length) return false
    let equal = true
    this.selectedIds[newDataSourceId]?.forEach((id, index) => {
      if (id !== newSelectedIds[index]) equal = false
    })
    return equal
  }

  onDataSourceSelectedChange = async (dataSourceId: string, selectedIds: string[]) => {
    if (this.idsArrayEquals(dataSourceId, selectedIds)) return
    const newRequestId = this.currentRequestId + 1
    this.currentRequestId++
    this.selectedIds[dataSourceId] = selectedIds
    const { config } = this.props
    const { editMode, layersConfig } = config
    const { activeId, dataSources, editFeatures, jimuMapView } = this.state
    let useDataSourceId = dataSourceId
    const newEditFeatures = Object.assign({}, editFeatures)
    if (!dataSources[useDataSourceId]) {
      const currentDs = this.dsManager.getDataSource(useDataSourceId)
      if (currentDs) {
        dataSources[useDataSourceId] = currentDs
      }
    }
    const selectedRecords = dataSources[useDataSourceId]?.getSelectedRecords()
    newEditFeatures[useDataSourceId] = selectedRecords
    // Check newEditFeatures, for asynchronous reasons
    const newEditFeaturesKeys = Object.keys(newEditFeatures)
    newEditFeaturesKeys.forEach(dsId => {
      newEditFeatures[dsId] = dataSources[dsId]?.getSelectedRecords()
    })
    const inConfigEditFeatures = this.getInLayersConfigFeatures(newEditFeatures, layersConfig)
    const flatEditFeatures = this.flatMapArray(inConfigEditFeatures)
    const editCount = flatEditFeatures.length
    const step = editCount > 1 ? 'list' : editCount === 1 ? 'form' : 'empty'
    // If the last one of ds has been deselect, and there still other ds has selected record
    // dataSourceId need change to other's (Only for Attribute Type)
    if (selectedRecords?.length === 0 && editCount === 1) {
      let newDsId
      for (const dsId in newEditFeatures) {
        if (newEditFeatures?.[dsId]?.length === 1) {
          newDsId = dsId
        }
      }
      useDataSourceId = newDsId
    }
    const dsChange = activeId !== dataSourceId
    // FeatureForm
    if (editMode === EditModeType.Attribute) {
      this.setState({ editFeatures: newEditFeatures, activeId: useDataSourceId, featureFormStep: step }, () => {
        this.createEditForm(useDataSourceId, dsChange, newRequestId)
      })
    }
    // Editor
    if (editMode === EditModeType.Geometry) {
      if (!jimuMapView) return
      this.setState({ editFeatures: newEditFeatures, activeId: dataSourceId }, () => {
        this.startWorkFlowWhenAwait(newEditFeatures, useDataSourceId)
      })
    }
  }

  onIsDataSourceNotReady = (dataSourceId: string, dataSourceStatus) => {
    this.setState((state: State) => {
      const isOutPutDs = state.dataSources[dataSourceId]?.getDataSourceJson().isOutputFromWidget
      if (!isOutPutDs) {
        return
      }
      const outputDataSource = Object.assign({}, state.outputDataSourceIsNotReady)
      outputDataSource[dataSourceId] = dataSourceStatus === DataSourceStatus.NotReady
      return { outputDataSourceIsNotReady: outputDataSource }
    })
  }

  onCreateDataSourceCreatedOrFailed = (dataSourceId: string, dataSource: DataSource) => {
    this.setState((state: State) => {
      const newDataSources = Object.assign({}, state.dataSources)
      newDataSources[dataSourceId] = dataSource
      return { dataSources: newDataSources }
    })
  }

  onDataSourceVersionChange = (dataSourceId: string) => {
    const { config } = this.props
    const { editMode } = config
    // FeatureForm
    if (editMode === EditModeType.Attribute) {
      this.setState({ activeId: dataSourceId }, () => {
        this.createEditForm(dataSourceId, true)
      })
    }
  }

  onLayerChange = (evt) => {
    const { dataSources } = this.state
    const selectedLayerId = evt?.target?.value
    this.setState({ activeId: selectedLayerId }, () => {
      this.renderFeatureForm(dataSources[selectedLayerId] as QueriableDataSource)
    })
  }

  handleBack = (): void => {
    const { id, config } = this.props
    const { layersConfig } = config
    const { editFeatures } = this.state
    const inConfigEditFeatures = this.getInLayersConfigFeatures(editFeatures, layersConfig)
    const flatEditFeatures = this.flatMapArray(inConfigEditFeatures)
    const editCount = flatEditFeatures.length
    if (editCount === 0) {
      this.setState({ featureFormStep: 'empty' })
    } else if (editCount > 1) {
      this.setState({ featureFormStep: 'list' })
    }
    document.getElementById(`edit-container-${id}`).classList.add('esri-hidden')
  }

  getInLayersConfigFeatures = (editFeatures, layersConfig) => {
    const newEditFeatures = Object.assign({}, editFeatures)
    const editFeaturesKeys = Object.keys(editFeatures)
    editFeaturesKeys.forEach(dsId => {
      const isInLayersConfig = layersConfig.some(config => dsId.includes(config.id))
      if (!isInLayersConfig) {
        delete newEditFeatures[dsId]
      }
    })
    return newEditFeatures
  }

  render () {
    const { activeId, editFeatures, featureFormStep, formEditable, delConfirm, attrUpdating, formChange } = this.state
    const { id, theme, config, useDataSources, useMapWidgetIds } = this.props
    const { editMode, description, layersConfig } = config
    const activeConfig = layersConfig.asMutable({ deep: true }).find(item => item.id === activeId)
    const deleteRecords = activeConfig?.deleteRecords ?? false
    const inConfigEditFeatures = this.getInLayersConfigFeatures(editFeatures, layersConfig)
    const flatEditFeatures = this.flatMapArray(inConfigEditFeatures)
    const editCount = flatEditFeatures.length
    // The add button is displayed if any of them are allowed to be added
    const addable = layersConfig.some(config => config?.addRecords)
    const controls: ControlButton[] = [
      {
        label: this.formatMessage('update'),
        type: 'primary',
        disabled: !formChange,
        clickHandler: this.handleSave
      }
    ]
    if (deleteRecords) {
      controls.push({
        label: this.formatMessage('delete'),
        type: 'default',
        clickHandler: this.handleDeleteConfirm
      })
    }
    const addControls: ControlButton[] = [
      {
        label: this.formatMessage('add'),
        type: 'primary',
        disabled: false,
        clickHandler: this.handleAdd
      }
    ]
    const isAttrMode = editMode === EditModeType.Attribute
    const hasSurface = (isAttrMode && (featureFormStep === 'form' || featureFormStep === 'new')) || (!isAttrMode && layersConfig.length !== 0)
    const hasEdit = (isAttrMode && featureFormStep !== 'list' && featureFormStep !== 'empty') || (!isAttrMode && layersConfig.length !== 0)

    if (!isAttrMode && (!useMapWidgetIds || useMapWidgetIds.length === 0)) {
      return (
        <WidgetPlaceholder
          widgetId={id}
          autoFlip
          iconSize='large'
          style={{ position: 'absolute', left: 0, top: 0 }}
          icon={editPlaceholderIcon}
          data-testid='editPlaceholder'
        />
      )
    }

    return (
      <div className={classNames(`jimu-widget widget-edit esri-widget edit-widget-${id}`)} css={getStyle(theme, id, featureFormStep, editCount, isAttrMode)}>
        {isAttrMode && attrUpdating &&
          <div className={CSS.progressBar} />
        }
        <div className={classNames('edit-con', { 'surface-1': hasSurface, 'h-100': hasEdit })}>
          <div ref='formHeaderContainer' />
          <div ref='editContainer' className={classNames({ 'h-100': !isAttrMode, 'attr-height': isAttrMode && hasEdit })}>
            {isAttrMode && featureFormStep === 'new' &&
              <div className='layer-selector'>
                <label className='esri-feature-form__label'>
                  {this.formatMessage('selectLayer')}
                </label>
                <Select
                  value={activeId}
                  onChange={this.onLayerChange}
                >
                  {layersConfig.filter(item => item.addRecords).map(config => {
                    return (
                      <option key={config.id} value={config.id}>
                        {config.name}
                      </option>
                    )
                  })}
                </Select>
              </div>
            }
          </div>
          {isAttrMode && editCount > 0 && featureFormStep === 'form' && formEditable &&
            this.renderControlButtons(controls)
          }
          {isAttrMode && featureFormStep === 'new' &&
            this.renderControlButtons(addControls)
          }
        </div>
        {!isAttrMode &&
          <JimuMapViewComponent
            useMapWidgetId={useMapWidgetIds?.[0]}
            onActiveViewChange={this.handleActiveViewChange}
          />
        }
        {isAttrMode && editCount > 1 && featureFormStep === 'list' &&
          this.renderFeatureList(inConfigEditFeatures, description)
        }
        {isAttrMode && (featureFormStep === 'empty' || layersConfig.length === 0) &&
          this.renderFormEmpty(description)
        }
        {!isAttrMode && layersConfig.length === 0 &&
          this.renderFormEmpty()
        }
        {isAttrMode && delConfirm &&
          <React.Fragment>
            <div className='confirm-scrim'/>
            <div className={CSS.promptDanger}>
              <div className={CSS.promptHeader}>
                <WarningOutlined />
                <h4 className={classNames(CSS.widgetHeading, CSS.promptHeaderHeading)}>{this.formatMessage('deleteRecord')}</h4>
              </div>
              <div className={CSS.promptMessage}>{this.formatMessage('deleteRecordTips')}</div>
              <div className={CSS.promptDivider}></div>
              <div className={CSS.promptActions}>
                <Button
                  className={classNames(CSS.warningOption, CSS.warningOptionPrimary)}
                  onClick={this.cancleDelete}
                >
                  {this.formatMessage('keepRecord')}
                </Button>
                <Button
                  className={classNames(CSS.warningOption, CSS.warningOptionPositive)}
                  onClick={this.handleDelete}
                >
                  {this.formatMessage('delete')}
                </Button>
              </div>
            </div>
          </React.Fragment>
        }
        {isAttrMode && addable && featureFormStep !== 'form' && featureFormStep !== 'new' &&
          <Button
            size='sm'
            icon
            type='tertiary'
            className='add-feature-btn'
            onClick={this.handleNew}
            title={this.formatMessage('addFeature')}
            aria-label={this.formatMessage('addFeature')}
          >
            <PlusOutlined/>
          </Button>
        }
        {isAttrMode && (featureFormStep === 'form' || featureFormStep === 'new') && editCount > 1 &&
          <Button
            size='sm'
            icon
            type='tertiary'
            className='back-list-btn'
            onClick={this.handleBack}
            title={this.formatMessage('back')}
            aria-label={this.formatMessage('back')}
          >
            <ArrowLeftOutlined autoFlip />
          </Button>
        }
        <div className='ds-container'>
          {
            useDataSources?.map((useDs, key) => {
              return (
                <EditItemDataSource
                  key={key}
                  useDataSource={useDs}
                  onIsDataSourceNotReady={this.onIsDataSourceNotReady}
                  onDataSourceSelectedChange={this.onDataSourceSelectedChange}
                  onCreateDataSourceCreatedOrFailed={this.onCreateDataSourceCreatedOrFailed}
                  onDataSourceVersionChange={this.onDataSourceVersionChange}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}
