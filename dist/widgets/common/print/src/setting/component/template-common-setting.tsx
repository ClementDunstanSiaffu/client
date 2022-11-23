/** @jsx jsx */
import { React, css, jsx, esri, polished, classNames, defaultMessages as jimuCoreDefaultMessage } from 'jimu-core'
import { hooks, TextInput, Radio, Button, Checkbox, NumericInput, defaultMessages as jimuUiDefaultMessage } from 'jimu-ui'
import { SettingRow, SettingCollapse } from 'jimu-ui/advanced/setting-components'
import { JimuMapView } from 'jimu-arcgis'
import defaultMessages from '../translations/default'
import { PrintExtentType, ModeType, IMPrintTemplateProperties, WKID_LINK } from '../../config'
import { checkNumber } from '../../utils/utils'
import { isValidWkid, getWkidLabels } from '../../utils/wkidUtils'
import { ResetOutlined } from 'jimu-icons/outlined/editor/reset'
const EditIcon = require('jimu-icons/svg/outlined/editor/edit.svg')
const Sanitizer = esri.Sanitizer
const sanitizer = new Sanitizer()
interface Props {
  id: string
  modeType: ModeType
  printTemplateProperties: IMPrintTemplateProperties
  jimuMapView: JimuMapView
  handleTemplatePropertyChange: (printTemplateProperties: IMPrintTemplateProperties) => void
}

enum SettingCollapseType {
  Title = 'TITLE',
  Extents = 'EXTENTS',
  SpatialReference = 'SPATIAL REFERENCE',
  Feature = 'FEATURE ATTRIBUTION',
  Quality = 'QUALITY',
}

const CommonTemplateSetting = (props: Props) => {
  const nls = hooks.useTranslate(defaultMessages, jimuCoreDefaultMessage, jimuUiDefaultMessage)
  const odlWkid = React.useRef(null)

  const STYLE = css`
    .dpi-input .input-wrapper{
      padding-right: 0;
    }
    .radio-con {
      cursor: ponter;
    }
    .use-current-map-scale svg{
      margin: 0 auto;
    }
    .enable-setting-con .jimu-widget-setting--row-label{
      margin-bottom: 0;
    }
    .wkid-describtion {
      font-size: ${polished.rem(12)};
      color: var(--dark-400);
    }
    .wkid-describtion-invalid {
      color: var(--danger-600)
    }
  `

  const { printTemplateProperties, modeType, jimuMapView, handleTemplatePropertyChange } = props
  const [settingCollapse, setSettingCollapse] = React.useState(null as SettingCollapseType)
  const [titleText, setTitleText] = React.useState(printTemplateProperties.layoutOptions?.titleText)
  const [wkid, setWkid] = React.useState(printTemplateProperties?.wkid)
  const [dpi, setDpi] = React.useState(printTemplateProperties?.exportOptions?.dpi)
  const [outScale, setOutScale] = React.useState(printTemplateProperties?.outScale)
  const [descriptionOfWkid, setDescriptionOfWkid] = React.useState(getWkidLabels(printTemplateProperties?.wkid as number))

  React.useEffect(() => {
    setTitleText(printTemplateProperties.layoutOptions?.titleText)
    setWkid(printTemplateProperties?.wkid)
    odlWkid.current = printTemplateProperties?.wkid
    setDpi(printTemplateProperties?.exportOptions?.dpi)
    setDescriptionOfWkid(getWkidLabels(printTemplateProperties?.wkid as number))
    setOutScale(printTemplateProperties?.outScale)
  }, [printTemplateProperties])

  const openSettingCollapse = (settingCollapseType: SettingCollapseType) => {
    setSettingCollapse(settingCollapseType)
  }

  const closeSettingCollapse = () => {
    setSettingCollapse(null)
  }

  const handlePrintTitleChange = (event) => {
    const value = event?.target?.value
    setTitleText(value)
  }

  const handlePrintTitleAccept = (value) => {
    const newPrintTemplateProperties = printTemplateProperties.setIn(['layoutOptions', 'titleText'], value)
    handleTemplatePropertyChange(newPrintTemplateProperties)
  }

  const handleWKIDChange = (value) => {
    setWkid(value)
    const isValid = isValidWkid(value)
    if (isValid) {
      setDescriptionOfWkid(getWkidLabels(value))
    } else {
      setDescriptionOfWkid(nls('uploadImageError'))
    }
  }

  const handleWKIDAccept = (value) => {
    const isValid = isValidWkid(value)
    if (!isValid) {
      setWkid(odlWkid.current)
      setDescriptionOfWkid(getWkidLabels(odlWkid.current))
      return false
    }
    odlWkid.current = value
    const newPrintTemplateProperties = printTemplateProperties.setIn(['wkid'], value)
    setDescriptionOfWkid(getWkidLabels(value))
    handleTemplatePropertyChange(newPrintTemplateProperties)
  }

  const handleDPIChange = (value) => {
    checkNumber(value) && setDpi(value)
  }

  const handleDPIAccept = (value) => {
    const newPrintTemplateProperties = printTemplateProperties.setIn(['exportOptions', 'dpi'], value)
    handleTemplatePropertyChange(newPrintTemplateProperties)
  }

  const handleScaleChange = (value) => {
    setOutScale(value)
  }

  const setScaleByCurrentMapScale = () => {
    if (!jimuMapView) return
    const scale = jimuMapView?.view?.scale
    const newPrintTemplateProperties = printTemplateProperties.setIn(['outScale'], scale)
    handleTemplatePropertyChange(newPrintTemplateProperties)
  }

  const handleScaleAccept = (value) => {
    const newPrintTemplateProperties = printTemplateProperties.setIn(['outScale'], value)
    handleTemplatePropertyChange(newPrintTemplateProperties)
  }

  const handlePrintExtentTypeChange = (printExtentType: PrintExtentType) => {
    let newPrintTemplateProperties = printTemplateProperties.setIn(['printExtentType'], printExtentType)
    switch (printExtentType) {
      case PrintExtentType.CurrentMapExtent:
        newPrintTemplateProperties = newPrintTemplateProperties.setIn(['scalePreserved'], false)
        break
      case PrintExtentType.CurrentMapScale:
        newPrintTemplateProperties = newPrintTemplateProperties.setIn(['scalePreserved'], true)
        break
      case PrintExtentType.SetMapScale:
        newPrintTemplateProperties = newPrintTemplateProperties.setIn(['scalePreserved'], true)
        newPrintTemplateProperties = newPrintTemplateProperties.setIn(['outScale'], 36978595.474472)
        break
    }
    handleTemplatePropertyChange(newPrintTemplateProperties)
  }

  const handleCheckBoxChange = (key: string) => {
    const newPrintTemplateProperties = printTemplateProperties.setIn([key], !printTemplateProperties?.[key])
    handleTemplatePropertyChange(newPrintTemplateProperties)
  }

  const handleEnableTitleChange = () => {
    let newPrintTemplateProperties = printTemplateProperties.setIn(['showLabels'], !printTemplateProperties?.showLabels)
    newPrintTemplateProperties = newPrintTemplateProperties.setIn(['enableTitle'], !printTemplateProperties?.enableTitle)
    handleTemplatePropertyChange(newPrintTemplateProperties)
  }

  const getWKIDElement = () => {
    return sanitizer.sanitize(
      nls('wellKnownId', { wkid: `<a target="_blank" href="${WKID_LINK}">WKID</a>` })
    )
  }

  return (
    <div css={STYLE}>
      <SettingRow label={nls('setDefaults')} flow='wrap'/>
      {/* Print title */}
      <SettingCollapse
        label={nls('printTitle')}
        isOpen={settingCollapse === SettingCollapseType.Title}
        onRequestOpen={() => { openSettingCollapse(SettingCollapseType.Title) }}
        onRequestClose={closeSettingCollapse}
        role='group'
        aria-label={nls('printTitle')}
        rightIcon={EditIcon}
        type='primary'
        className={settingCollapse === SettingCollapseType.Title && 'active-collapse'}
      >
        <SettingRow className='mt-2'>
          <TextInput
            size='sm'
            className='search-placeholder w-100'
            placeholder={nls('printTitle')}
            value={titleText || ''}
            onAcceptValue={handlePrintTitleAccept}
            onChange={handlePrintTitleChange}
          />
        </SettingRow>
      </SettingCollapse>

      {/* Map print extents */}
      <SettingCollapse
        label={nls('mapPrintingExtents')}
        isOpen={settingCollapse === SettingCollapseType.Extents}
        onRequestOpen={() => { openSettingCollapse(SettingCollapseType.Extents) }}
        onRequestClose={closeSettingCollapse}
        role='group'
        aria-label={nls('mapPrintingExtents')}
        rightIcon={EditIcon}
        type='primary'
        className={settingCollapse === SettingCollapseType.Extents && 'active-collapse'}
      >
        <SettingRow className='mt-2'>
          <div className='w-100'>
            <Button title={nls('currentMapExtent')} type='tertiary' style={{ paddingLeft: 0, paddingRight: 0 }} className='d-flex align-items-center radio-con' onClick={() => { handlePrintExtentTypeChange(PrintExtentType.CurrentMapExtent) }}>
              <Radio title={nls('currentMapExtent')} checked={printTemplateProperties?.printExtentType === PrintExtentType.CurrentMapExtent} className='mr-2'/> {nls('currentMapExtent')}
            </Button>
            <Button title={nls('currentMapScale')} type='tertiary' style={{ paddingLeft: 0, paddingRight: 0 }} className='d-flex align-items-center radio-con' onClick={() => { handlePrintExtentTypeChange(PrintExtentType.CurrentMapScale) }}>
              <Radio title={nls('currentMapScale')} checked={printTemplateProperties?.printExtentType === PrintExtentType.CurrentMapScale} className='mr-2'/> {nls('currentMapScale')}
            </Button>
            <Button title={nls('setMapScale')} type='tertiary' style={{ paddingLeft: 0, paddingRight: 0 }} className='d-flex align-items-center radio-con' onClick={() => { handlePrintExtentTypeChange(PrintExtentType.SetMapScale) }}>
              <Radio title={nls('setMapScale')} checked={printTemplateProperties?.printExtentType === PrintExtentType.SetMapScale} className='mr-2'/> {nls('setMapScale')}
            </Button>
            {printTemplateProperties?.printExtentType === PrintExtentType.SetMapScale && <div className='d-flex mt-1 align-items-center'>
              <NumericInput
                size='sm'
                className='search-placeholder flex-grow-1 dpi-input'
                placeholder={nls('printQuality')}
                value={outScale}
                onAcceptValue={handleScaleAccept}
                onChange={handleScaleChange}
                showHandlers={false}
              />
              <Button className='use-current-map-scale' size='sm' title={nls('useCurrentScale')} disabled={!jimuMapView} onClick={setScaleByCurrentMapScale}><ResetOutlined /></Button>
            </div>}
          </div>
        </SettingRow>
      </SettingCollapse>

      {/* Output spatial reference */}
      <SettingCollapse
        label={nls('outputSpatialReference')}
        isOpen={settingCollapse === SettingCollapseType.SpatialReference}
        onRequestOpen={() => { openSettingCollapse(SettingCollapseType.SpatialReference) }}
        onRequestClose={closeSettingCollapse}
        role='group'
        type='primary'
        aria-label={nls('outputSpatialReference')}
        rightIcon={EditIcon}
        className={settingCollapse === SettingCollapseType.SpatialReference && 'active-collapse'}
      >
        <SettingRow flow='wrap' label={<div className='flex-grow-1' dangerouslySetInnerHTML={{ __html: getWKIDElement() }}></div>} className='mt-2'>
          <NumericInput
            size='sm'
            className='search-placeholder w-100'
            value={wkid}
            onAcceptValue={handleWKIDAccept}
            onChange={handleWKIDChange}
            showHandlers={false}
          />
          <div className={classNames('text-truncate mt-1 wkid-describtion', { 'wkid-describtion-invalid': !isValidWkid(Number(wkid)) })} title={descriptionOfWkid} aria-label={descriptionOfWkid}>{descriptionOfWkid}</div>
        </SettingRow>
      </SettingCollapse>

      {/* Print quality */}
      <SettingCollapse
        label={nls('printQuality')}
        isOpen={settingCollapse === SettingCollapseType.Quality}
        onRequestOpen={() => { openSettingCollapse(SettingCollapseType.Quality) }}
        onRequestClose={closeSettingCollapse}
        role='group'
        aria-label={nls('printQuality')}
        type='primary'
        rightIcon={EditIcon}
        className={settingCollapse === SettingCollapseType.Quality && 'active-collapse'}
      >
        <SettingRow className='mt-2'>
          <div className='d-flex align-items-center w-100'>
            <NumericInput
              size='sm'
              className='search-placeholder flex-grow-1 dpi-input'
              placeholder={nls('printQuality')}
              value={dpi}
              onAcceptValue={handleDPIAccept}
              onChange={handleDPIChange}
              showHandlers={false}
            />
            <Button disabled size='sm'>DPI</Button>
          </div>
        </SettingRow>
      </SettingCollapse>

      {/* Print quality */}
      <SettingCollapse
        label={nls('featureAttributes')}
        isOpen={settingCollapse === SettingCollapseType.Feature}
        onRequestOpen={() => { openSettingCollapse(SettingCollapseType.Feature) }}
        onRequestClose={closeSettingCollapse}
        role='group'
        type='primary'
        aria-label={nls('featureAttributes')}
        rightIcon={EditIcon}
        className={settingCollapse === SettingCollapseType.Feature && 'active-collapse'}
      >
        <SettingRow className='mt-2'>
          <Button
            title={nls('includeAttributes')}
            className='d-flex w-100 align-items-center'
            type='tertiary'
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onClick={() => { handleCheckBoxChange('forceFeatureAttributes') }}
          >
            <Checkbox
              title={nls('includeAttributes')}
              className='lock-item-ratio'
              data-field='forceFeatureAttributes'
              checked={printTemplateProperties?.forceFeatureAttributes || false}
            />
            <div className='lock-item-ratio-label text-left ml-2'>
              {nls('includeAttributes')}
            </div>
          </Button>
        </SettingRow>
      </SettingCollapse>

      {/* Select editable setting */}
      {modeType === ModeType.Classic && <SettingRow className='mt-3 enable-setting-con' flow='wrap' label={nls('selectEditableSettings')}>
        <div className='w-100'>
          <Button
            title={nls('printTitle')}
            className='d-flex w-100 align-items-center text-wrap'
            type='tertiary'
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onClick={() => { handleEnableTitleChange() }}
          >
            <Checkbox
              title={nls('printTitle')}
              className='lock-item-ratio'
              data-field='enableTitle'
              checked={printTemplateProperties?.enableTitle || false}
            />
            <div className='lock-item-ratio-label text-left ml-2'>
              {nls('printTitle')}
            </div>
          </Button>
          <Button
            title={nls('mapPrintingExtents')}
            className='d-flex w-100 align-items-center text-wrap'
            type='tertiary'
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onClick={() => { handleCheckBoxChange('enableMapPrintExtents') }}
          >
            <Checkbox
              title={nls('mapPrintingExtents')}
              className='lock-item-ratio'
              data-field='enableMapPrintExtents'
              checked={printTemplateProperties?.enableMapPrintExtents || false}
            />
            <div className='lock-item-ratio-label text-left ml-2'>
              {nls('mapPrintingExtents')}
            </div>
          </Button>
          <Button
            title={nls('outputSpatialReference')}
            className='d-flex w-100 align-items-center text-wrap'
            type='tertiary'
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onClick={() => { handleCheckBoxChange('enableOutputSpatialReference') }}
          >
            <Checkbox
              title={nls('outputSpatialReference')}
              className='lock-item-ratio'
              data-field='enableOutputSpatialReference'
              checked={printTemplateProperties?.enableOutputSpatialReference || false}
            />
            <div className='lock-item-ratio-label text-left ml-2'>
              {nls('outputSpatialReference')}
            </div>
          </Button>
          <Button
            title={nls('printQuality')}
            className='d-flex w-100 align-items-center text-wrap'
            type='tertiary'
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onClick={() => { handleCheckBoxChange('enableQuality') }}
          >
            <Checkbox
              title={nls('printQuality')}
              className='lock-item-ratio'
              data-field='enableQuality'
              checked={printTemplateProperties?.enableQuality || false}
            />
            <div className='lock-item-ratio-label text-left ml-2'>
              {nls('printQuality')}
            </div>
          </Button>
          <Button
            title={nls('featureAttributes')}
            className='d-flex w-100 align-items-center text-wrap'
            type='tertiary'
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onClick={() => { handleCheckBoxChange('enableFeatureAttribution') }}
          >
            <Checkbox
              title={nls('featureAttributes')}
              className='lock-item-ratio'
              data-field='enableFeatureAttribution'
              checked={printTemplateProperties?.enableFeatureAttribution || false}
            />
            <div className='lock-item-ratio-label text-left ml-2'>
              {nls('featureAttributes')}
            </div>
          </Button>
        </div>
      </SettingRow>}
    </div>
  )
}

export default CommonTemplateSetting
