/** @jsx jsx */
import { React, css, jsx, defaultMessages as jimuCoreDefaultMessage, ImmutableArray, Immutable, polished } from 'jimu-core'
import { SettingSection, SettingRow, SidePopper, SettingCollapse } from 'jimu-ui/advanced/setting-components'
import { hooks, TextInput, Select, Option, Button, Checkbox, Switch, NumericInput, MultiSelect, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { JimuMapView } from 'jimu-arcgis'
import { IMPrintTemplateProperties, PrintTemplateProperties, IMConfig, DEFAULT_MAP_WIDTH, DEFAULT_MAP_HEIGHT, PrintTemplateType, ModeType } from '../../config'
import defaultMessages from '../translations/default'
import CommonTemplateSetting from './template-common-setting'
import { getIndexByTemplateId, checkIsCustomTemplate, initTemplateLayout, checkIsMapOnly, getLegendLayer, getScaleBarList } from '../../utils/utils'
const { useEffect, useState } = React
const EditIcon = require('jimu-icons/svg/outlined/editor/edit.svg')

interface Props {
  id: string
  isOpen: boolean
  config: IMConfig
  trigger?: HTMLElement
  popperFocusNode?: HTMLElement
  activeTemplateId: string
  jimuMapView: JimuMapView
  toggle: () => void
  handelTemplateListChange?: (newTemplate: PrintTemplateProperties[]) => void
}

interface CustomTextElementsOpenType {
  [key: string]: boolean
}

type IMCustomTextElementsOpenList = ImmutableArray<CustomTextElementsOpenType>

enum SettingCollapseType {
  MapSize = 'MAP SIZE',
  Author = 'AUTHOR',
  Copyright = 'COPYRIGHT',
  Legend = 'LEGEND',
  ScaleBarUnit = 'SCALE BAR UNIT',
  AttributionVisible = 'ATTRIBUTION VISIBLE',
  CustomTextElements = 'CUSTOM TEXZT ELEMENTS'
}

const CustomSetting = (props: Props) => {
  const nls = hooks.useTranslate(defaultMessages, jimuiDefaultMessage, jimuCoreDefaultMessage)
  const { id, isOpen, trigger, popperFocusNode, config, activeTemplateId, jimuMapView, toggle, handelTemplateListChange } = props
  useEffect(() => {
    getCurrentTemplate()
    // eslint-disable-next-line
  }, [config, activeTemplateId])

  const [template, setTemplate] = useState(null as IMPrintTemplateProperties)
  const [templateIndex, setTemplateIndex] = useState(null as number)
  const [templateList, setTemplateList] = useState(null as ImmutableArray<PrintTemplateProperties>)
  const [templateName, setTemplateName] = useState(template?.label)
  const [mapWidth, setMapWidth] = useState(template?.exportOptions?.width)
  const [mapHeight, setMapHeight] = useState(template?.exportOptions?.height)
  const [authorText, setAuthorText] = useState(template?.layoutOptions?.authorText)
  const [copyrightText, setCopyrightText] = useState(template?.layoutOptions?.copyrightText)
  const [openCollapseType, setOpenCollapseType] = useState(null as SettingCollapseType)
  const [customTextElements, setcustomTextElements] = useState(template?.layoutOptions?.customTextElements)
  const [customTextElementsOpenList, setCustomTextElementsOpenList] = useState(null as IMCustomTextElementsOpenList)

  useEffect(() => {
    setTemplateName(template?.label)
    setMapWidth(template?.exportOptions?.width)
    setMapHeight(template?.exportOptions?.height)
    setAuthorText(template?.layoutOptions?.authorText)
    setCopyrightText(template?.layoutOptions?.copyrightText)
    setcustomTextElements(template?.layoutOptions?.customTextElements)
  }, [template])

  useEffect(() => {
    initCustomTextElementsOpenList()
  }, [])

  useEffect(() => {
    if (checkIsUpdateCustomTextElementsOpenList()) {
      initCustomTextElementsOpenList()
    }
  }, [customTextElements])

  const checkIsUpdateCustomTextElementsOpenList = () => {
    if (!customTextElements) return false
    if (customTextElements?.length !== customTextElementsOpenList?.length) {
      return true
    } else {
      let isUpdate = false
      customTextElements?.forEach((item, index) => {
        for (const key in item) {
          if (!Object.prototype.hasOwnProperty.call(customTextElementsOpenList[index], key)) {
            isUpdate = true
          }
        }
      })
      return isUpdate
    }
  }

  const initCustomTextElementsOpenList = () => {
    const enableList = customTextElements?.map((info, index) => {
      const enable = {} as CustomTextElementsOpenType
      for (const key in info) {
        enable[key] = false
      }
      return enable
    })
    setCustomTextElementsOpenList(Immutable(enableList || []))
  }

  const getCurrentTemplate = () => {
    const isCustomTemplate = checkIsCustomTemplate(config?.printServiceType, config?.printTemplateType)
    const templateList = isCustomTemplate ? config?.printCustomTemplate : config?.printOrgTemplate
    const index = getIndexByTemplateId(templateList?.asMutable({ deep: true }), activeTemplateId)
    setTemplateIndex(index)
    setTemplateList(templateList)
    setTemplate(templateList?.[index] || null)
  }

  const handelCustomSettingChange = (key: string[], value) => {
    const newTemplate = template.setIn(key, value)
    const newTemplateList = templateList?.asMutable({ deep: true })
    newTemplateList[templateIndex] = newTemplate?.asMutable({ deep: true })
    handelTemplateListChange(newTemplateList)
  }

  const handleTemplateNameAccept = (value) => {
    if (!value) {
      setTemplateName(template?.label)
      return false
    }
    handelCustomSettingChange(['label'], value)
  }

  const handleTemplateNameChange = (event) => {
    const value = event?.target?.value
    setTemplateName(value)
  }

  const handleMapWidthAccept = (value) => {
    if (!value || Number(value) === 0) {
      setMapWidth(template?.exportOptions?.width)
      return false
    }
    handelCustomSettingChange(['exportOptions', 'width'], Number(value))
  }

  const handleMapWidthChange = (value) => {
    setMapWidth(value)
  }

  const handleMapHeightAccept = (value) => {
    if (!value || Number(value) === 0) {
      setMapHeight(template?.exportOptions?.height)
      return false
    }
    handelCustomSettingChange(['exportOptions', 'height'], Number(value))
  }

  const handleAuthorTextChange = (event) => {
    const value = event?.target?.value
    setAuthorText(value)
  }

  const handleAuthorTextAccept = (value) => {
    handelCustomSettingChange(['layoutOptions', 'authorText'], value)
  }

  const handleCopyrightTextChange = (event) => {
    const value = event?.target?.value
    setCopyrightText(value)
  }

  const handleCopyrightTextAccept = (value) => {
    handelCustomSettingChange(['layoutOptions', 'copyrightText'], value)
  }

  const handleMapHeightChange = (value) => {
    setMapHeight(value)
  }

  const openSettingCollapse = (openCollapseType: SettingCollapseType) => {
    closeCustomTextElementCollapse()
    setOpenCollapseType(openCollapseType)
  }

  const closeSettingCollapse = () => {
    closeCustomTextElementCollapse()
    setOpenCollapseType(null)
  }

  const closeCustomTextElementCollapse = () => {
    //close Collapse of custom text elements
    const newCustomTextElementsOpenList = customTextElementsOpenList?.map(item => {
      const enable = {} as CustomTextElementsOpenType
      for (const key in item) {
        enable[key] = false
      }
      return enable
    })
    setCustomTextElementsOpenList(newCustomTextElementsOpenList)
  }

  const handleScalebarUnitChange = (e) => {
    const format = e.target.value
    handelCustomSettingChange(['layoutOptions', 'scalebarUnit'], format)
  }

  const handleLayoutChange = (e) => {
    const layoutTemplate = e.target.value
    const layout = config?.layoutChoiceList?.filter(item => item?.layoutTemplate === layoutTemplate)?.[0]?.asMutable({ deep: true })
    const layoutInfo = {
      mapFrameSize: layout?.webMapFrameSize,
      mapFrameUnit: layout?.pageUnits,
      hasAuthorText: layout?.layoutOptions?.hasAuthorText,
      hasCopyrightText: layout?.layoutOptions?.hasCopyrightText,
      hasLegend: layout?.layoutOptions?.hasLegend,
      hasTitleText: layout?.layoutOptions?.hasTitleText,
      layout: layoutTemplate
    }
    const newTemplate = {
      ...template?.asMutable({ deep: true }),
      ...layoutInfo
    } as PrintTemplateProperties

    const newTemplateList = templateList?.asMutable({ deep: true })
    newTemplateList[templateIndex] = newTemplate
    handelTemplateListChange(newTemplateList)
  }

  const handleCheckBoxChange = (key: string) => {
    handelCustomSettingChange([key], !template?.[key])
  }

  const handleTemplatePropertyChange = (templateProperty: IMPrintTemplateProperties) => {
    const newTemplateList = templateList?.asMutable({ deep: true })
    newTemplateList[templateIndex] = templateProperty?.asMutable({ deep: true })
    handelTemplateListChange(newTemplateList)
  }

  const handleOverrideCommonSettingsChanged = (e) => {
    const value = e.target.checked
    handelCustomSettingChange(['overrideCommonSetting'], value)
  }

  const handleLegendChanged = async (e) => {
    const legendEnabled = checkIsLegendEnabled()
    const legendLayers = !legendEnabled ? await getLegendLayer(jimuMapView) : []
    handelCustomSettingChange(['layoutOptions', 'legendLayers'], legendLayers)
  }

  const checkIsLegendEnabled = () => {
    return template?.layoutOptions?.legendLayers && template?.layoutOptions?.legendLayers?.length > 0
  }

  const handleAttributionVisibleChanged = (e) => {
    const attributionVisible = !template?.attributionVisible
    handelCustomSettingChange(['attributionVisible'], attributionVisible)
  }

  const renderMapOnlyCustomSetting = () => {
    return (
      <SettingSection title={nls('MapOnlyOptions')}>
        <SettingRow label={nls('setDefaults')} flow='wrap'/>
        {/* Print title */}
        <SettingCollapse
          label={nls('mapSize')}
          isOpen={openCollapseType === SettingCollapseType.MapSize}
          onRequestOpen={() => { openSettingCollapse(SettingCollapseType.MapSize) }}
          onRequestClose={closeSettingCollapse}
          role='group'
          aria-label={nls('mapSize')}
          rightIcon={EditIcon}
          type='primary'
          className={openCollapseType === SettingCollapseType.MapSize && 'active-collapse'}
        >
          <SettingRow label={nls('width')} className='mt-2'>
            <NumericInput
              size='sm'
              placeholder={nls('width')}
              value={mapWidth || DEFAULT_MAP_WIDTH}
              onAcceptValue={handleMapWidthAccept}
              onChange={handleMapWidthChange}
              showHandlers={false}
            />
          </SettingRow>
          <SettingRow label={nls('height')}>
            <NumericInput
              size='sm'
              placeholder={nls('height')}
              value={mapHeight || DEFAULT_MAP_HEIGHT}
              onAcceptValue={handleMapHeightAccept}
              onChange={handleMapHeightChange}
              showHandlers={false}
            />
          </SettingRow>
        </SettingCollapse>
        <SettingCollapse
          label={nls('mapAttribution')}
          isOpen={openCollapseType === SettingCollapseType.AttributionVisible}
          onRequestOpen={() => { openSettingCollapse(SettingCollapseType.AttributionVisible) }}
          onRequestClose={closeSettingCollapse}
          role='group'
          aria-label={nls('mapAttribution')}
          rightIcon={EditIcon}
          type='primary'
          className={openCollapseType === SettingCollapseType.AttributionVisible && 'active-collapse'}
        >
          <SettingRow flow='wrap' className='mt-2'>
            <Button
              title={nls('includeAttribution')}
              className='d-flex w-100 align-items-center text-wrap'
              type='tertiary'
              style={{ paddingLeft: 0, paddingRight: 0 }}
              onClick={handleAttributionVisibleChanged}
            >
              <Checkbox
                title={nls('includeAttribution')}
                className='lock-item-ratio'
                data-field='mapSize'
                checked={!!template?.attributionVisible || false}
              />
              <div className='lock-item-ratio-label text-left ml-2'>
                {nls('includeAttribution')}
              </div>
            </Button>
          </SettingRow>
        </SettingCollapse>
        {config.modeType === ModeType.Classic && <SettingRow className='mt-2' flow='wrap' label={nls('selectEditableSettings')}>
          <div className='w-100'>
            <Button
              title={nls('printTitle')}
              className='d-flex w-100 align-items-center text-wrap'
              type='tertiary'
              style={{ paddingLeft: 0, paddingRight: 0 }}
              onClick={() => { handleCheckBoxChange('enableMapSize') }}
            >
              <Checkbox
                title={nls('printTitle')}
                className='lock-item-ratio'
                data-field='mapSize'
                checked={template?.enableMapSize || false}
              />
              <div className='lock-item-ratio-label text-left ml-2'>
                {nls('mapSize')}
              </div>
            </Button>
          </div>
          <div className='w-100 mt-1'>
            <Button
              title={nls('mapAttribution')}
              className='d-flex w-100 align-items-center text-wrap'
              type='tertiary'
              style={{ paddingLeft: 0, paddingRight: 0 }}
              onClick={() => { handleCheckBoxChange('enableMapAttribution') }}
            >
              <Checkbox
                title={nls('mapAttribution')}
                className='lock-item-ratio'
                data-field='mapSize'
                checked={template?.enableMapAttribution || false}
              />
              <div className='lock-item-ratio-label text-left ml-2'>
                {nls('mapAttribution')}
              </div>
            </Button>
          </div>
        </SettingRow>}
      </SettingSection>
    )
  }

  const openCustomTextElementSetting = (key: string, index: number) => {
    const newCustomTextElementsOpenList = customTextElementsOpenList?.map((item, idx) => {
      const enable = {} as CustomTextElementsOpenType
      for (const k in item) {
        if (index === idx && k === key) {
          enable[k] = !customTextElementsOpenList[index][key]
        } else {
          enable[k] = false
        }
      }
      return enable
    })
    setOpenCollapseType(null)
    setCustomTextElementsOpenList(newCustomTextElementsOpenList)
  }

  const renderCustomTextElementsSetting = () => {
    const settingItem = []
    customTextElements?.forEach((info, index) => {
      for (const key in info) {
        const elementItem = (<SettingCollapse
          label={key}
          key={`${key}_${index}`}
          isOpen={customTextElementsOpenList?.[index]?.[key] || false}
          onRequestOpen={() => { openCustomTextElementSetting(key, index) }}
          onRequestClose={closeSettingCollapse}
          role='group'
          aria-label={key}
          rightIcon={EditIcon}
          type='primary'
          className={customTextElementsOpenList[key] && 'active-collapse'}
        >
          {
           <SettingRow flow='wrap' className='align-item-center mt-2'>
              <TextInput
                size='sm'
                className='flex-grow-1'
                value={info[key]}
                onAcceptValue={value => { handelCustomTextElementsAccept(index, key, value) }}
                onChange={e => { handelCustomTextElementsChange(index, key, e) }}
              />
            </SettingRow>
          }
        </SettingCollapse>)
        settingItem.push(elementItem)
      }
    })
    return settingItem
  }

  const renderCustomTextElementsEnableSetting = () => {
    const settingItem = []
    customTextElements?.forEach((info, index) => {
      for (const key in info) {
        const elementItem = (<Button
          key={`${key}_${index}`}
          title={key}
          className='d-flex w-100 align-items-center text-wrap'
          type='tertiary'
          style={{ paddingLeft: 0, paddingRight: 0 }}
          onClick={() => { handleCustomTextElementEnableChange(key, index) }}
        >
          <Checkbox
            title={key}
            className='lock-item-ratio'
            checked={template?.customTextElementEnableList?.[index]?.[key] || false}
          />
          <div className='lock-item-ratio-label text-left ml-2'>
            {key}
          </div>
        </Button>)
        settingItem.push(elementItem)
      }
    })
    return settingItem
  }

  const handleCustomTextElementEnableChange = (key: string, index: number) => {
    const enableItem = template?.customTextElementEnableList?.[index]
    const newItem = enableItem.set(key, !enableItem?.[key])
    const newCustomTextElementEnableList = template?.customTextElementEnableList?.asMutable({ deep: true })
    newCustomTextElementEnableList.splice(index, 1, newItem)
    handelCustomSettingChange(['customTextElementEnableList'], newCustomTextElementEnableList)
  }

  const handelCustomTextElementsAccept = (index: number, key: string, value) => {
    const newItem = customTextElements[index].set(key, value)
    const newCustomTextElements = customTextElements?.asMutable({ deep: true })
    newCustomTextElements.splice(index, 1, newItem)
    handelCustomSettingChange(['layoutOptions', 'customTextElements'], newCustomTextElements)
  }

  const handelCustomTextElementsChange = (index: number, key: string, event) => {
    const value = event?.target?.value
    const newItem = customTextElements[index].set(key, value)
    const newCustomTextElements = customTextElements?.asMutable({ deep: true })
    newCustomTextElements.splice(index, 1, newItem)
    setcustomTextElements(Immutable(newCustomTextElements))
  }

  const renderLayoutOptionsCustomSetting = () => {
    return (
      <SettingSection title={nls('LayoutOptions')}>
        <SettingRow label={nls('setDefaults')} flow='wrap'/>
        {template?.hasAuthorText && <SettingCollapse
          label={nls('printTemplateAuthor')}
          isOpen={openCollapseType === SettingCollapseType.Author}
          onRequestOpen={() => { openSettingCollapse(SettingCollapseType.Author) }}
          onRequestClose={closeSettingCollapse}
          role='group'
          aria-label={nls('printTemplateAuthor')}
          type='primary'
          rightIcon={EditIcon}
          className='mb-2'
        >
          <SettingRow flow='wrap' className='mt-2'>
            <TextInput
              size='sm'
              className='w-100'
              value={authorText}
              onAcceptValue={handleAuthorTextAccept}
              onChange={handleAuthorTextChange}
            />
          </SettingRow>
        </SettingCollapse>}
        {template?.hasCopyrightText && <SettingCollapse
          label={nls('copyright')}
          isOpen={openCollapseType === SettingCollapseType.Copyright}
          onRequestOpen={() => { openSettingCollapse(SettingCollapseType.Copyright) }}
          onRequestClose={closeSettingCollapse}
          role='group'
          aria-label={nls('copyright')}
          rightIcon={EditIcon}
          type='primary'
          className='mb-2'
        >
          <SettingRow flow='wrap' className='mt-2'>
            <TextInput
              size='sm'
              className='w-100'
              value={copyrightText}
              onAcceptValue={handleCopyrightTextAccept}
              onChange={handleCopyrightTextChange}
            />
          </SettingRow>
        </SettingCollapse>}
        {template?.hasLegend && <SettingCollapse
          label={nls('legend')}
          isOpen={openCollapseType === SettingCollapseType.Legend}
          onRequestOpen={() => { openSettingCollapse(SettingCollapseType.Legend) }}
          onRequestClose={closeSettingCollapse}
          role='group'
          type='primary'
          aria-label={nls('legend')}
          rightIcon={EditIcon}
          className='mb-2'
        >
          <SettingRow flow='wrap' className='mt-2'>
            <Button
              title={nls('includeLegend')}
              className='d-flex w-100 align-items-center text-wrap'
              type='tertiary'
              style={{ paddingLeft: 0, paddingRight: 0 }}
              onClick={handleLegendChanged}
            >
              <Checkbox
                title={nls('includeLegend')}
                className='lock-item-ratio'
                checked={checkIsLegendEnabled()}
              />
              <div className='lock-item-ratio-label text-left ml-2'>
                {nls('includeLegend')}
              </div>
            </Button>
          </SettingRow>
        </SettingCollapse>}
        <SettingCollapse
          label={nls('scaleBarUnit')}
          isOpen={openCollapseType === SettingCollapseType.ScaleBarUnit}
          onRequestOpen={() => { openSettingCollapse(SettingCollapseType.ScaleBarUnit) }}
          onRequestClose={closeSettingCollapse}
          role='group'
          aria-label={nls('scaleBarUnit')}
          rightIcon={EditIcon}
          type='primary'
          className={openCollapseType === SettingCollapseType.ScaleBarUnit && 'active-collapse'}
        >
          <SettingRow flow='wrap' className='mt-2'>
            <Select
              value={template?.layoutOptions?.scalebarUnit}
              onChange={handleScalebarUnitChange}
              size='sm'
            >
              {getScaleBarList(nls).map((item, index) => {
                return (<Option
                  key={`unit${index}`}
                  value={item.value}
                  title={item.label}
                >
                  {item.label}
                </Option>)
              })}
            </Select>
          </SettingRow>
        </SettingCollapse>
        {template?.layoutOptions?.customTextElements?.length > 0 && renderCustomTextElementsSetting()}

        {config.modeType === ModeType.Classic && <SettingRow className='mt-2' flow='wrap' label={nls('selectEditableSettings')}>
          <div className='w-100'>
            {template?.hasAuthorText && <Button
              title={nls('printTemplateAuthor')}
              className='d-flex w-100 align-items-center text-wrap'
              type='tertiary'
              style={{ paddingLeft: 0, paddingRight: 0 }}
              onClick={() => { handleCheckBoxChange('enableAuthor') }}
            >
              <Checkbox
                title={nls('printTemplateAuthor')}
                className='lock-item-ratio'
                checked={template?.enableAuthor || false}
              />
              <div className='lock-item-ratio-label text-left ml-2'>
                {nls('printTemplateAuthor')}
              </div>
            </Button>}
            {template?.hasCopyrightText && <Button
              title={nls('copyright')}
              className='d-flex w-100 align-items-center text-wrap'
              type='tertiary'
              style={{ paddingLeft: 0, paddingRight: 0 }}
              onClick={() => { handleCheckBoxChange('enableCopyright') }}
            >
              <Checkbox
                title={nls('copyright')}
                className='lock-item-ratio'
                checked={template?.enableCopyright || false}
              />
              <div className='lock-item-ratio-label text-left ml-2'>
                {nls('copyright')}
              </div>
            </Button>}
            {template?.hasLegend && <Button
              title={nls('legend')}
              className='d-flex w-100 align-items-center text-wrap'
              type='tertiary'
              style={{ paddingLeft: 0, paddingRight: 0 }}
              onClick={() => { handleCheckBoxChange('enableLegend') }}
            >
              <Checkbox
                title={nls('legend')}
                className='lock-item-ratio'
                checked={template?.enableLegend || false}
              />
              <div className='lock-item-ratio-label text-left ml-2'>
                {nls('legend')}
              </div>
            </Button>}
            <Button
              title={nls('scaleBarUnit')}
              className='d-flex w-100 align-items-center text-wrap'
              type='tertiary'
              style={{ paddingLeft: 0, paddingRight: 0 }}
              onClick={() => { handleCheckBoxChange('enableScalebarUnit') }}
            >
              <Checkbox
                title={nls('scaleBarUnit')}
                className='lock-item-ratio'
                checked={template?.enableScalebarUnit || false}
              />
              <div className='lock-item-ratio-label text-left ml-2'>
                {nls('scaleBarUnit')}
              </div>
            </Button>
            {template?.layoutOptions?.customTextElements?.length > 0 && renderCustomTextElementsEnableSetting()}
          </div>
        </SettingRow>}
      </SettingSection>
    )
  }

  const renderBaseSetting = () => {
    return (
      <SettingSection>
        <SettingRow flow='wrap' label={nls('templateName')}>
          <TextInput
            size='sm'
            className='w-100'
            value={templateName || ''}
            onAcceptValue={handleTemplateNameAccept}
            onChange={handleTemplateNameChange}
            disabled={config?.printTemplateType === PrintTemplateType.OrganizationTemplate}
          />
        </SettingRow>
        <SettingRow flow='wrap' label={nls('fileFormat')}>
          <MultiSelect
            fluid
            aria-label={nls('fileFormat')}
            items={Immutable(getMultiFormatSelectItems())}
            onClickItem={handleSelectFormatChange}
            values={Immutable(template?.selectedFormatList || [])}
            size='sm'
          />
        </SettingRow>
        <SettingRow flow='wrap' label={nls('printLayout')}>
          <Select
            value={initTemplateLayout(template?.layout)}
            onChange={handleLayoutChange}
            size='sm'
            disabled={config?.printTemplateType === PrintTemplateType.OrganizationTemplate}
          >
            {config?.layoutChoiceList?.map((layout, index) => {
              return (<Option
                key={`layout${index}`}
                value={layout?.layoutTemplate}
                title={layout?.layoutTemplate}
              >
                {layout?.layoutTemplate}
              </Option>)
            })}
          </Select>
        </SettingRow>
      </SettingSection>
    )
  }

  const handleSelectFormatChange = (evt, value, values: string[]) => {
    if (values?.length === 0) return false
    let newTemplate = template.set('selectedFormatList', values)
    if (!values?.includes(newTemplate.format)) {
      newTemplate = newTemplate.set('format', values[0])
    }
    const newTemplateList = templateList?.asMutable({ deep: true })
    newTemplateList[templateIndex] = newTemplate?.asMutable({ deep: true })
    handelTemplateListChange(newTemplateList)
  }

  const getMultiFormatSelectItems = () => {
    return config?.formatList.map((format, index) => {
      return {
        value: format,
        label: format
      }
    })
  }

  const renderCommonSetting = () => {
    return (
      <SettingSection>
        <SettingRow className='mb-3' label={nls('overrideCommonSettings')}>
          <Switch
            aria-label={nls('overrideCommonSettings')}
            checked={template?.overrideCommonSetting}
            onChange={handleOverrideCommonSettingsChanged}
          />
        </SettingRow>
        {template?.overrideCommonSetting && <CommonTemplateSetting
          id={id}
          printTemplateProperties={template}
          handleTemplatePropertyChange={handleTemplatePropertyChange}
          modeType={config?.modeType}
          jimuMapView={jimuMapView}
        />}
      </SettingSection>
    )
  }

  const SYLE = css`
    & {
      overflow: auto;
    }
    .text-wrap {
      overflow: hidden;
      white-space: pre-wrap;
    }
    .setting-collapse {
      & {
        margin-bottom: ${polished.rem(8)};
      }
      .collapse-header {
        line-height: 2.2;
        padding-left: ${polished.rem(8)} !important;
        padding-right: ${polished.rem(8)} !important;
      }
    }
  `

  return (
    <SidePopper isOpen={isOpen} position='right' toggle={toggle} trigger={trigger} title={nls('templateConfiguration')} backToFocusNode={popperFocusNode}>
      <div className='w-100 h-100' css={SYLE}>
        {renderBaseSetting()}

        {/* Render map only setting */}
        {checkIsMapOnly(template?.layout) && renderMapOnlyCustomSetting()}

        {/* Render layout option setting */}
        {!checkIsMapOnly(template?.layout) && renderLayoutOptionsCustomSetting()}

        {renderCommonSetting()}
      </div>
    </SidePopper>
  )
}

export default CustomSetting
