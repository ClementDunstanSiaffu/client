/** @jsx jsx */
import { React, jsx, css, polished, Immutable } from 'jimu-core'
import { SettingChangeFunction } from 'jimu-for-builder'
import { hooks, Button, Loading, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { SettingSection } from 'jimu-ui/advanced/setting-components'
import { JimuMapView } from 'jimu-arcgis'
import TemplateList from './template-list'
import defaultMessage from '../translations/default'
import { checkIsCustomTemplate, mergeTemplateSetting } from '../../utils/utils'
import { getNewTemplateId } from '../util/util'
import { IMConfig, PrintTemplateType, PrintTemplateProperties, IMPrintTemplateProperties, DEFAULT_COMMON_SETTING } from '../../config'
import { PlusOutlined } from 'jimu-icons/outlined/editor/plus'
import CustomSetting from './template-custom-setting'
import PrintServiceSelect from './print-service-select'
const { useState } = React
interface Props {
  id: string
  config: IMConfig
  portalUrl: string
  jimuMapView: JimuMapView
  onSettingChange: SettingChangeFunction
  handlePropertyChange: (key: string, value) => void
}

const TemplateSetting = (props: Props) => {
  const { config, id, jimuMapView, onSettingChange, handlePropertyChange } = props

  const nls = hooks.useTranslate(defaultMessage, jimuiDefaultMessage)
  const STYLE = css`
    .radio-con {
      cursor: pointer;
    }
    .loading-con {
      height: ${polished.rem(100)};
    }
  `

  const [activeTemplateId, setActiveTemplateId] = useState(null)
  const [showLoading, setShowLoading] = useState(false)

  const handelActiveTemplateIdChange = (templateId: string) => {
    if (templateId === activeTemplateId) {
      setActiveTemplateId(null)
    } else {
      setActiveTemplateId(templateId)
    }
  }

  const toggleLoading = (isShowLoading: boolean) => {
    setShowLoading(isShowLoading)
  }

  const handelTemplateListChange = (newTemplate: PrintTemplateProperties[]) => {
    const isCustomTemplate = checkIsCustomTemplate(config?.printServiceType, config?.printTemplateType)
    if (isCustomTemplate) {
      handlePropertyChange('printCustomTemplate', newTemplate)
    } else {
      handlePropertyChange('printOrgTemplate', newTemplate)
    }
  }

  const newCustomTemplate = () => {
    let newPrintCustomTemplate = config?.printCustomTemplate?.[0] || Immutable({}) as IMPrintTemplateProperties
    const newCustomTemplate = config?.printCustomTemplate?.asMutable({ deep: true }) || []

    const newTemplateId = getNewTemplateId(newCustomTemplate, config?.printServiceType, PrintTemplateType.Customize)
    newPrintCustomTemplate = mergeTemplateSetting(newPrintCustomTemplate, Immutable(DEFAULT_COMMON_SETTING as any))
    newPrintCustomTemplate = newPrintCustomTemplate.set('format', config?.defaultFormat).set('templateId', newTemplateId)
    newCustomTemplate.push(newPrintCustomTemplate?.asMutable({ deep: true }))

    handlePropertyChange('printCustomTemplate', newCustomTemplate)
    setActiveTemplateId(newTemplateId)
  }

  return (
    <SettingSection title={nls('configurePrintTemplate')} css={STYLE}>
      <PrintServiceSelect
        id={id}
        config={config}
        showLoading={showLoading}
        onSettingChange={onSettingChange}
        toggleLoading={toggleLoading}
      />
      {showLoading && <div className='loading-con position-relative'><Loading/></div>}
      {config?.useUtility && <div>

        {config?.printTemplateType === PrintTemplateType.Customize && <Button className='w-100 mt-2' type='primary' onClick={newCustomTemplate}>
          {/* If the org template is empty, you need to re-get the template according to the orgurl. By default, the first org template is used as the template, and png32 is used instead of pdf. */}
          <PlusOutlined className='mr-1'/>
          {nls('newTemplate')}
        </Button>}

        {!showLoading && <TemplateList
          id={id}
          handelActiveTemplateIdChange={handelActiveTemplateIdChange}
          handelTemplateListChange={handelTemplateListChange}
          showNewTemplateItem={false}
          activeTemplateId={activeTemplateId}
          config={config}
        />}

        <CustomSetting
          id={id}
          isOpen={activeTemplateId}
          config={config}
          activeTemplateId={activeTemplateId}
          toggle={() => { handelActiveTemplateIdChange(null) }}
          handelTemplateListChange={handelTemplateListChange}
          jimuMapView={jimuMapView}
        />
      </div>}
    </SettingSection>
  )
}

export default TemplateSetting
