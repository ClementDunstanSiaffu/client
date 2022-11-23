/** @jsx jsx */
import { React, jsx, css, polished, ImmutableArray, classNames, esri, Immutable, defaultMessages as jimucoreDefaultMessag } from 'jimu-core'
import { Checkbox, Button, hooks, TextInput, Select, Option, Radio, NumericInput, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { JimuMapView } from 'jimu-arcgis'
import { IMConfig, IMPrintTemplateProperties, PrintTemplateProperties, PrintExtentType, WKID_LINK } from '../../../config'
import { getIndexByTemplateId, checkNumber, getLegendLayer, getScaleBarList, checkIsMapOnly } from '../../../utils/utils'
import { isValidWkid, getWkidLabels } from '../../../utils/wkidUtils'
import defaultMessage from '../../translations/default'
import { DownOutlined } from 'jimu-icons/outlined/directional/down'
import { UpOutlined } from 'jimu-icons/outlined/directional/up'
import { ResetOutlined } from 'jimu-icons/outlined/editor/reset'
import SettingRow from '../setting-row'
import PreviewExtent from '../preview-extents'
const Sanitizer = esri.Sanitizer
const sanitizer = new Sanitizer()
const { useState, useEffect } = React

interface Props {
  id: string
  config: IMConfig
  templateList: ImmutableArray<PrintTemplateProperties>
  jimuMapView: JimuMapView
  confirmPrint: (printTemplateProperties: IMPrintTemplateProperties) => void
  selectedTemplate: IMPrintTemplateProperties
  handleSelectedTemplateChange: (template: IMPrintTemplateProperties) => void
  setSelectedTemplateByIndex: (index: number) => void
}

const TemplateSetting = (props: Props) => {
  const nls = hooks.useTranslate(defaultMessage, jimuiDefaultMessage, jimucoreDefaultMessag)
  const oldWkid = React.useRef(null)

  const STYLE = css`
    padding-bottom: ${polished.rem(16)};
    padding-top: ${polished.rem(16)};
    .setting-con {
      overflow-y: auto;
      padding-left: ${polished.rem(16)};
      padding-right: ${polished.rem(16)};
    }
    .print-button-con {
      padding-left: ${polished.rem(16)};
      padding-right: ${polished.rem(16)};
    }
    .no-right-padding .jimu-interactive-node{
      padding-right: 0;
    }
    .scalebar-unit {
      width: ${polished.rem(160)};
    }
    .collapse-button {
      padding-right: 0;
    }
    .map-size-con input {
      width: 100%;
    }
    .wkid-describtion {
      font-size: ${polished.rem(12)};
      color: var(--dark-400);
    }
    .wkid-describtion-invalid {
      color: var(--danger-600)
    }
    .outscale-con, .dpi-con {
      input {
        border-right: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        height: ${polished.rem(26)};
        svg {
          margin-right: 0;
        }
      }
    }
  `
  const { templateList, jimuMapView, selectedTemplate, id, confirmPrint, handleSelectedTemplateChange, setSelectedTemplateByIndex } = props

  const [title, setTitle] = useState(selectedTemplate?.layoutOptions?.titleText)
  const [wkid, setWkid] = useState(selectedTemplate?.wkid)
  const [scale, setScale] = useState(selectedTemplate?.outScale)
  const [author, setAuthor] = useState(selectedTemplate?.layoutOptions?.authorText)
  const [copyright, setCopyright] = useState(selectedTemplate?.layoutOptions?.copyrightText)
  const [customTextElements, setCustomTextElements] = useState(selectedTemplate?.layoutOptions?.customTextElements)
  const [dpi, setDpi] = React.useState(selectedTemplate?.exportOptions?.dpi)
  const [mapWidth, setMapWidth] = React.useState(selectedTemplate?.exportOptions?.width)
  const [mapHeight, setMapHeight] = React.useState(selectedTemplate?.exportOptions?.height)
  const [isOpenCollapse, setIsOpenCollapse] = useState(false)
  const [descriptionOfWkid, setDescriptionOfWkid] = React.useState(getWkidLabels(selectedTemplate?.wkid as number))

  useEffect(() => {
    setTitle(selectedTemplate?.layoutOptions?.titleText)
    setAuthor(selectedTemplate?.layoutOptions?.authorText)
    setCopyright(selectedTemplate?.layoutOptions?.copyrightText)
    setCustomTextElements(selectedTemplate?.layoutOptions?.customTextElements)
    setWkid(selectedTemplate?.wkid)
    oldWkid.current = selectedTemplate?.wkid
    setScale(selectedTemplate?.outScale)
    setDpi(selectedTemplate?.exportOptions?.dpi)
    setMapWidth(selectedTemplate?.exportOptions?.width)
    setMapHeight(selectedTemplate?.exportOptions?.height)
    setDescriptionOfWkid(getWkidLabels(selectedTemplate?.wkid as number))
  }, [selectedTemplate])

  const handelSelectedTemplateChange = (e) => {
    const templateId = e?.target?.value
    const index = getIndexByTemplateId(templateList?.asMutable({ deep: true }), templateId)
    setSelectedTemplateByIndex(index)
  }

  const handleSelectedTemplateSettingChange = (key: string[], value) => {
    const newTemplate = selectedTemplate.setIn(key, value)
    handleSelectedTemplateChange(newTemplate)
  }

  const handleAttributionVisibleChange = () => {
    handleSelectedTemplateSettingChange(['forceFeatureAttributes'], !selectedTemplate?.forceFeatureAttributes)
  }

  const handleMapAttributionChange = () => {
    handleSelectedTemplateSettingChange(['attributionVisible'], !selectedTemplate?.attributionVisible)
  }

  const handleLegendChanged = async (e) => {
    const legendEnabled = checkIsLegendEnabled()
    const legendLayers = !legendEnabled ? await getLegendLayer(jimuMapView) : []
    handleSelectedTemplateSettingChange(['layoutOptions', 'legendLayers'], legendLayers)
  }

  const checkIsLegendEnabled = () => {
    return selectedTemplate?.layoutOptions?.legendLayers && selectedTemplate?.layoutOptions?.legendLayers?.length > 0
  }

  const handleTitleAccept = (value) => {
    handleSelectedTemplateSettingChange(['layoutOptions', 'titleText'], value)
  }

  const handleTitleChange = (event) => {
    const value = event?.target?.value
    setTitle(value)
  }

  const handleWkidAccept = (value) => {
    if (!isValidWkid(value)) {
      setWkid(oldWkid.current)
      setDescriptionOfWkid(getWkidLabels(oldWkid.current))
      return false
    }
    oldWkid.current = value
    handleSelectedTemplateSettingChange(['wkid'], value)
  }

  const handleWkidChange = (value) => {
    const isValid = isValidWkid(value)
    if (isValid) {
      setDescriptionOfWkid(getWkidLabels(value))
    } else {
      setDescriptionOfWkid(nls('uploadImageError'))
    }
    setWkid(value)
  }

  const handleScaleAccept = (value) => {
    handleSelectedTemplateSettingChange(['outScale'], value)
  }

  const useCurrentMapScale = () => {
    const scale = jimuMapView?.view?.scale
    setScale(scale)
    handleSelectedTemplateSettingChange(['outScale'], scale)
  }

  const handleScaleChange = (value) => {
    setScale(value)
  }

  const handleAuthorAccept = (value) => {
    handleSelectedTemplateSettingChange(['layoutOptions', 'authorText'], value)
  }

  const handleDPIChange = (value) => {
    checkNumber(value) && setDpi(value)
  }

  const handleDPIAccept = (value) => {
    handleSelectedTemplateSettingChange(['exportOptions', 'dpi'], value)
  }

  const handleAuthorChange = (event) => {
    const value = event?.target?.value
    setAuthor(value)
  }

  const handleCopyrightAccept = (value) => {
    handleSelectedTemplateSettingChange(['layoutOptions', 'copyrightText'], value)
  }

  const handleCopyrightChange = (event) => {
    const value = event?.target?.value
    setCopyright(value)
  }

  const handleMapWidthAccept = (value) => {
    if (!value || Number(value) === 0) {
      setMapWidth(selectedTemplate?.exportOptions?.width)
      return false
    }
    handleSelectedTemplateSettingChange(['exportOptions', 'width'], value)
  }

  const handleMapWidthChange = (value) => {
    setMapWidth(value)
  }

  const handleMapHeightAccept = (value) => {
    if (!value || Number(value) === 0) {
      setMapHeight(selectedTemplate?.exportOptions?.height)
      return false
    }
    handleSelectedTemplateSettingChange(['exportOptions', 'height'], value)
  }

  const handleMapHeightChange = (value) => {
    setMapHeight(value)
  }

  const handleFormatChange = (e) => {
    const format = e.target.value
    handleSelectedTemplateSettingChange(['format'], format)
  }

  const handleScaleUnitChange = (e) => {
    const format = e.target.value
    handleSelectedTemplateSettingChange(['layoutOptions', 'scalebarUnit'], format)
  }

  const toggleCollapse = () => {
    setIsOpenCollapse(!isOpenCollapse)
  }

  const handelConfirPrint = () => {
    confirmPrint(selectedTemplate)
  }

  const handelMapExtenesChange = (printExtentType: PrintExtentType) => {
    handleSelectedTemplateSettingChange(['printExtentType'], printExtentType)
  }

  const renderAdvancedSetting = () => {
    const isMapOnly = checkIsMapOnly(selectedTemplate?.layout)
    const showList = getShowList()
    const { showLayoutOption, showFeatureAttribution, showMapAttribution, showQuality, showMapSize, showMapPrintExtents, showScalebarUnit, showOutputSpatialReference } = showList
    const showAdvance = showLayoutOption || showFeatureAttribution || showMapAttribution || showQuality || showMapSize || showMapPrintExtents || showScalebarUnit || showOutputSpatialReference
    return (
      <div>
        {showAdvance && <div className='d-flex align-items-center'>
          <div className='flex-grow-1'>{nls('advance')}</div>
          <Button className='collapse-button' size='sm' type='tertiary' onClick={toggleCollapse} title={nls('advance')}>
            {isOpenCollapse ? <UpOutlined/> : <DownOutlined/>}
          </Button>
        </div>}

        {isOpenCollapse && <div>
          {showMapPrintExtents && <SettingRow flowWrap label={nls('mapPrintingExtents')}>
            <Button
              title={nls('currentMapExtent')}
              type='tertiary' style={{ paddingLeft: 0, paddingRight: 0 }}
              className='d-flex align-items-center radio-con mt-1'
              onClick={() => { handelMapExtenesChange(PrintExtentType.CurrentMapExtent) }}
            >
              <Radio title={nls('currentMapExtent')} checked={selectedTemplate?.printExtentType === PrintExtentType.CurrentMapExtent} className='mr-2'/> {nls('currentMapExtent')}
            </Button>
            <Button
              title={nls('currentMapScale')}
              type='tertiary'
              style={{ paddingLeft: 0, paddingRight: 0 }}
              className='d-flex align-items-center radio-con'
              onClick={() => { handelMapExtenesChange(PrintExtentType.CurrentMapScale) }}
            >
              <Radio title={nls('currentMapScale')} checked={selectedTemplate?.printExtentType === PrintExtentType.CurrentMapScale} className='mr-2'/> {nls('currentMapScale')}
            </Button>
            <Button
              title={nls('setMapScale')}
              type='tertiary'
              style={{ paddingLeft: 0, paddingRight: 0 }}
              className='d-flex align-items-center radio-con'
              onClick={() => { handelMapExtenesChange(PrintExtentType.SetMapScale) }}
            >
              <Radio title={nls('setMapScale')} checked={selectedTemplate?.printExtentType === PrintExtentType.SetMapScale} className='mr-2'/> {nls('setMapScale')}
            </Button>
            {selectedTemplate?.printExtentType === PrintExtentType.SetMapScale && <div className='w-100 d-flex align-items-center outscale-con'>
              <NumericInput
                size='sm'
                className='flex-grow-1 dpi-input no-right-padding'
                value={scale}
                onAcceptValue={handleScaleAccept}
                onChange={handleScaleChange}
                showHandlers={false}
              />
              <Button size='sm' onClick={useCurrentMapScale} title={nls('useCurrentScale')}><ResetOutlined/></Button>
            </div>}
          </SettingRow>}

          {showOutputSpatialReference && <SettingRow flowWrap label={<div dangerouslySetInnerHTML={{ __html: getWKIDElement() }}></div>}>
            <NumericInput
              size='sm'
              className='w-100 dpi-input no-right-padding'
              value={wkid}
              onAcceptValue={handleWkidAccept}
              onChange={handleWkidChange}
              showHandlers={false}
            />
            <div title={descriptionOfWkid} aria-label={descriptionOfWkid} className={classNames('text-truncate mt-1 wkid-describtion', { 'wkid-describtion-invalid': !isValidWkid(Number(wkid)) })}>{descriptionOfWkid}</div>
          </SettingRow>}

          {!isMapOnly && renderLayoutOptionSetting()}
          {isMapOnly && renderMapOnlyAdvanceSetting()}
        </div>}
      </div>
    )
  }

  const getShowList = () => {
    const isMapOnly = checkIsMapOnly(selectedTemplate?.layout)
    const showAuthor = selectedTemplate?.hasAuthorText && selectedTemplate?.enableAuthor && !isMapOnly
    const showCopyright = selectedTemplate?.hasCopyrightText && selectedTemplate?.enableCopyright && !isMapOnly
    const showLegend = selectedTemplate?.hasLegend && selectedTemplate?.enableLegend && !isMapOnly
    const showCustomTextElements = checkIsShowCustomTextElements() && !isMapOnly
    const showLayoutOption = showAuthor || showCopyright || showLegend || showCustomTextElements || selectedTemplate?.enableScalebarUnit
    return {
      showLayoutOption: showLayoutOption,
      showAuthor: showAuthor,
      showCopyright: showCopyright,
      showLegend: showLegend,
      showCustomTextElements: showCustomTextElements,
      showTitle: selectedTemplate?.enableTitle,
      showFeatureAttribution: selectedTemplate?.enableFeatureAttribution,
      showMapAttribution: selectedTemplate?.enableMapAttribution && isMapOnly,
      showQuality: selectedTemplate?.enableQuality,
      showMapSize: selectedTemplate?.enableMapSize && isMapOnly,
      showMapPrintExtents: selectedTemplate?.enableMapPrintExtents,
      showScalebarUnit: selectedTemplate?.enableScalebarUnit && !isMapOnly,
      showOutputSpatialReference: selectedTemplate?.enableOutputSpatialReference
    }
  }

  const checkIsShowCustomTextElements = () => {
    const enableList = []
    selectedTemplate?.customTextElementEnableList?.forEach(item => {
      for (const key in item) {
        enableList.push(item[key])
      }
    })
    return enableList?.filter(enable => enable)?.length > 0
  }

  const renderLayoutOptionSetting = () => {
    const showList = getShowList()
    const { showAuthor, showCopyright, showLegend, showLayoutOption, showFeatureAttribution, showQuality, showScalebarUnit } = showList
    return (
      <div>
        {showLayoutOption && <div className='mb-2'>{nls('LayoutOptions')}</div>}

        {showAuthor && <SettingRow flowWrap label={nls('printAuyhor')}>
          <TextInput
            size='sm'
            className='w-100 dpi-input'
            value={author}
            onAcceptValue={handleAuthorAccept}
            onChange={handleAuthorChange}
          />
        </SettingRow>}
        {showCopyright && <SettingRow flowWrap label={nls('printCopyright')}>
          <TextInput
            size='sm'
            className='w-100 dpi-input'
            value={copyright}
            onAcceptValue={handleCopyrightAccept}
            onChange={handleCopyrightChange}
          />
        </SettingRow>}
        {renderCustomTextElementsSetting()}
        {showLegend && <SettingRow>
          <Button
            title={nls('includeLegend')}
            className='w-100 align-items-center d-flex'
            type='tertiary'
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onClick={handleLegendChanged}
          >
            <Checkbox
              title={nls('includeLegend')}
              className='lock-item-ratio'
              checked={checkIsLegendEnabled()}
            />
            <div className='text-left ml-2 f-grow-1'>
              {nls('includeLegend')}
            </div>
          </Button>
        </SettingRow>}
        {showScalebarUnit && <SettingRow label={nls('scaleBarUnit')} flowWrap={false}>
          <Select
            value={selectedTemplate?.layoutOptions?.scalebarUnit}
            onChange={handleScaleUnitChange}
            size='sm'
            className='scalebar-unit'
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
        </SettingRow>}
        {showQuality && <SettingRow label={nls('printQuality')} flowWrap>
          <div className='d-flex align-items-center w-100 dpi-con'>
            <NumericInput
              size='sm'
              className='flex-grow-1 no-right-padding'
              value={dpi}
              onAcceptValue={handleDPIAccept}
              onChange={handleDPIChange}
              showHandlers={false}
            />
            <Button disabled size='sm'>DPI</Button>
          </div>
        </SettingRow>}
        {showFeatureAttribution && <SettingRow>
          <Button
            title={nls('includeAttributes')}
            className='w-100 align-items-center d-flex'
            type='tertiary'
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onClick={handleAttributionVisibleChange}
          >
            <Checkbox
              title={nls('includeAttributes')}
              className='lock-item-ratio'
              data-field='mapSize'
              checked={selectedTemplate?.forceFeatureAttributes}
            />
            <div className='text-left ml-2 f-grow-1'>
              {nls('includeAttributes')}
            </div>
          </Button>
        </SettingRow>}

      </div>
    )
  }

  const renderCustomTextElementsSetting = () => {
    const settingItem = []
    customTextElements?.forEach((info, index) => {
      for (const key in info) {
        if (!selectedTemplate?.customTextElementEnableList?.[index]?.[key]) continue
        const elementItem = (<SettingRow flowWrap className='align-item-center' label={key}>
          <TextInput
            size='sm'
            className='flex-grow-1'
            value={info[key]}
            onAcceptValue={value => { handelCustomTextElementsAccept(index, key, value) }}
            onChange={e => { handelCustomTextElementsChange(index, key, e) }}
          />
        </SettingRow>)
        settingItem.push(elementItem)
      }
    })
    return settingItem
  }

  const handelCustomTextElementsAccept = (index: number, key: string, value) => {
    const newItem = customTextElements[index].set(key, value)
    const newCustomTextElements = customTextElements?.asMutable({ deep: true })
    newCustomTextElements.splice(index, 1, newItem)
    handleSelectedTemplateSettingChange(['layoutOptions', 'customTextElements'], newCustomTextElements)
  }

  const handelCustomTextElementsChange = (index: number, key: string, event) => {
    const value = event?.target?.value
    const newItem = customTextElements[index].set(key, value)
    const newCustomTextElements = customTextElements?.asMutable({ deep: true })
    newCustomTextElements.splice(index, 1, newItem)
    setCustomTextElements(Immutable(newCustomTextElements))
  }

  const renderBaseSetting = () => {
    const showList = getShowList()
    const { showTitle } = showList
    return (
      <div className='base-setting-con'>
        {showTitle && <SettingRow flowWrap label={nls('title')}>
          <TextInput
            size='sm'
            className='w-100'
            value={title}
            onAcceptValue={handleTitleAccept}
            onChange={handleTitleChange}
          />
        </SettingRow>}
        <SettingRow flowWrap label={nls('template')} >
          <Select
            value={selectedTemplate?.templateId}
            onChange={handelSelectedTemplateChange}
            size='sm'
          >
            {templateList?.map((template, index) => {
              return (<Option
                key={template?.templateId}
                value={template?.templateId}
                title={template?.label}
              >
                {template?.label}
              </Option>)
            })}
          </Select>
        </SettingRow>
        {selectedTemplate?.selectedFormatList?.length > 1 && <SettingRow flowWrap label={nls('fileFormat')} >
          <Select
            value={selectedTemplate?.format?.toLowerCase()}
            onChange={handleFormatChange}
            size='sm'
          >
            {selectedTemplate?.selectedFormatList?.map((format, index) => {
              return (<Option
                key={`format${index}`}
                value={format}
                title={format}
              >
                {format}
              </Option>)
            })}
          </Select>
        </SettingRow>}
      </div>
    )
  }

  const renderMapOnlyAdvanceSetting = () => {
    const showList = getShowList()
    const { showFeatureAttribution, showMapAttribution, showQuality } = showList
    return (
      <div>
        {showFeatureAttribution && <SettingRow className='mb-1'>
          <Button
            title={nls('includeAttributes')}
            className='w-100 align-items-center mt-1 d-flex'
            type='tertiary'
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onClick={handleAttributionVisibleChange}
          >
            <Checkbox
              title={nls('includeAttributes')}
              className='lock-item-ratio'
              data-field='mapSize'
              checked={selectedTemplate?.forceFeatureAttributes}
            />
            <div className='text-left ml-2 f-grow-1'>
              {nls('includeAttributes')}
            </div>
          </Button>
        </SettingRow>}
        {showMapAttribution && <SettingRow>
          <Button
            title={nls('includeAttribution')}
            className='w-100 align-items-center d-flex'
            type='tertiary'
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onClick={handleMapAttributionChange}
          >
            <Checkbox
              title={nls('includeAttribution')}
              className='lock-item-ratio'
              data-field='mapSize'
              checked={selectedTemplate?.attributionVisible}
            />
            <div className='text-left ml-2 f-grow-1'>
              {nls('includeAttribution')}
            </div>
          </Button>
        </SettingRow>}
        {showQuality && <SettingRow flowWrap label={nls('printQuality')}>
          <TextInput
            size='sm'
            className='w-100 no-right-padding'
            value={dpi}
            onAcceptValue={handleDPIAccept}
            onChange={handleDPIChange}
            suffix={<Button disabled size='sm'>DPI</Button>}
          />
        </SettingRow>}

      </div>
    )
  }

  const renderMapOnlyBaseSetting = () => {
    const showList = getShowList()
    const { showMapSize } = showList
    return (
      <div>
        {showMapSize && <div className='d-flex align-items-center'>
          <div className='flex-grow-1'>
            <div className='mb-1'>{nls('width')}</div>
            <NumericInput
              size='sm'
              className='w-100 map-size-con'
              value={mapWidth}
              onAcceptValue={handleMapWidthAccept}
              onChange={handleMapWidthChange}
              showHandlers={false}
            />
          </div>
          <div className='flex-grow-1 ml-2'>
            <div className='mb-1'>{nls('height')}</div>
            <NumericInput
              size='sm'
              className='w-100 map-size-con'
              value={mapHeight}
              onAcceptValue={handleMapHeightAccept}
              onChange={handleMapHeightChange}
              showHandlers={false}
            />
          </div>
        </div>}
      </div>
    )
  }

  const renderSetting = () => {
    return (
      <div className='w-100 h-100'>
        {renderBaseSetting()}
        <div>
          {checkIsMapOnly(selectedTemplate?.layout) && renderMapOnlyBaseSetting()}
          {renderAdvancedSetting()}
        </div>
      </div>
    )
  }

  const getWKIDElement = () => {
    return sanitizer.sanitize(
      nls('spatialReference', { WKID: `<a target="_blank" href="${WKID_LINK}">WKID</a>` })
    )
  }

  return (
    <div className='w-100 h-100 d-flex flex-column' css={STYLE}>
      <div className='flex-grow-1 w-100 setting-con'>
        {renderSetting()}
      </div>
      <div className='print-button-con'>
        <PreviewExtent
          id={id}
          jimuMapView={jimuMapView}
          className='w-100'
          scale={scale}
          selectedTemplate={selectedTemplate}
          scalebarUnit={selectedTemplate?.layoutOptions?.scalebarUnit}
          printExtentType={selectedTemplate?.printExtentType}
        />
        <Button className='w-100 mt-2' type='primary' onClick={handelConfirPrint}>{nls('_widgetLabel')}</Button>
      </div>
    </div>
  )
}

export default TemplateSetting
