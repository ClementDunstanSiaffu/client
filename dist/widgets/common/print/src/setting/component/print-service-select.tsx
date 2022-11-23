/** @jsx jsx */
import { React, jsx, css, polished, Immutable, IMUseUtility, UseUtility, UtilityManager, ImmutableArray, SupportedUtilityType } from 'jimu-core'
import { hooks, defaultMessages as jimuiDefaultMessages } from 'jimu-ui'
import { SettingChangeFunction } from 'jimu-for-builder'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { UtilitySelector } from 'jimu-ui/advanced/utility-selector'
import defaultMessages from '../translations/default'
import { PrintServiceType, IMConfig, PrintTemplateProperties } from '../../config'
import { getPrintTaskInfo, initDefaultTemplates } from '../util/util'
import { initTemplateLayout, getUrlOfUseUtility, getPrintTemplateTaskInfo } from '../../utils/utils'
import { ClickOutlined } from 'jimu-icons/outlined/application/click'
const { useState, useEffect } = React
interface Props {
  config: IMConfig
  id: string
  showLoading: boolean
  onSettingChange: SettingChangeFunction
  toggleLoading: (isShowLoading: boolean) => void
}

const PrintServiceSelect = (props: Props) => {
  const nls = hooks.useTranslate(defaultMessages, jimuiDefaultMessages)
  const { config, id, showLoading, onSettingChange, toggleLoading } = props

  const [useUtility, setUseUtility] = useState(config?.useUtility)

  const STYLE = css`
    &>div>div {
      padding-left: 0!important;
      padding-right: 0!important;
    }
    .utility-placeholder {
      & {
        color: var(--dark-200);
      }
      p {
        color: var(--dark-500);
        font-size: ${polished.rem(14)};
        margin: ${polished.rem(16)} auto 0;
        line-height: ${polished.rem(19)};
        width: ${polished.rem(228)};
      }
    }
    .utility-list {
      margin-bottom: 0 !important;
    }
  }`

  useEffect(() => {
    setUseUtility(config?.useUtility)
  }, [config])

  const handleUtilityChange = (utilities: ImmutableArray<UseUtility>) => {
    const utility = utilities[0]
    setUseUtility(utility)
    if (!utility) {
      removeUtility()
    } else {
      addUseUtility(utility)
    }
  }

  const removeUtility = () => {
    let newConfig = config
    newConfig = newConfig.set('useUtility', null)
    onSettingChange({
      id: id,
      config: newConfig,
      useUtilities: []
    })
  }

  const addUseUtility = (utility: IMUseUtility) => {
    toggleLoading(true)
    getUrlOfUseUtility(utility).then(url => {
      getPrintTemplate(url, utility)
    })
  }

  const getPrintTemplate = (serviceUrl: string, utility: IMUseUtility) => {
    const printServiceType = getPrintServiceType(utility?.utilityId)
    getPrintTaskInfo(serviceUrl).then(printTask => {
      let newConfig = config
      const templates = printTask?.templates ? initDefaultTemplates(printTask?.templates, printServiceType, config?.printTemplateType) : []
      const newTemplates = templates?.map(temp => {
        temp?.layout && (temp.layout = initTemplateLayout(temp?.layout) as any)
        temp?.format && (temp.format = temp?.format?.toLowerCase() as any)
        return temp
      })

      getPrintTemplateTaskInfo(serviceUrl).then(templateTaskInfo => {
        toggleLoading(false)
        const template = addDefaultMapSizeInTemplate(templateTaskInfo, newTemplates)
        const layoutChoiceList = getLayoutChoiceList(printTask?.templates)
        newConfig = newConfig.set('printCustomTemplate', template)
          .set('useUtility', utility)
          .set('formatList', printTask?.formatList)
          .set('defaultFormat', printTask?.defaultFormat)
          .set('layoutChoiceList', layoutChoiceList)
        onSettingChange({
          id: id,
          config: newConfig,
          useUtilities: utility ? [utility] : []
        })
      })
    })
  }

  const addDefaultMapSizeInTemplate = (templateTaskInfo, templates: PrintTemplateProperties[]) => {
    const newTemplates = templates?.map(temp => {
      let info
      templateTaskInfo.forEach(item => {
        if (temp.label === item.layoutTemplate) {
          info = item
        }
      })
      if (info?.webMapFrameSize) {
        temp.mapFrameSize = info?.webMapFrameSize
        temp.mapFrameUnit = info?.pageUnits
      }
      const customTextElementEnableList = info?.layoutOptions?.customTextElements?.map(item => {
        const customTextElementsEnable = {}
        for (const key in item) {
          customTextElementsEnable[key] = true
        }
        return customTextElementsEnable
      })
      temp.mapFrameUnit = info?.pageUnits
      temp.hasAuthorText = info?.layoutOptions?.hasAuthorText
      temp.hasCopyrightText = info?.layoutOptions?.hasCopyrightText
      temp.hasLegend = info?.layoutOptions?.hasLegend
      temp.hasTitleText = info?.layoutOptions?.hasTitleText
      temp.selectedFormatList = [temp?.format]
      temp.layoutOptions.customTextElements = info?.layoutOptions?.customTextElements || []
      temp.customTextElementEnableList = customTextElementEnableList || []
      return temp
    })

    return newTemplates
  }

  const getLayoutChoiceList = (templates) => {
    const layoutChoiceList = templates?.map(info => {
      info.layoutTemplate = initTemplateLayout(info?.layout)
      return info
    }) || []
    return layoutChoiceList
  }

  const getPrintServiceType = (utilityId: string): PrintServiceType => {
    const utilityJson = UtilityManager.getInstance().getUtilityJson(utilityId)
    const printServiceType = utilityJson?.source === 'org' ? PrintServiceType.OrganizationService : PrintServiceType.Customize
    return printServiceType
  }

  const renderUseUtilityPlaceholder = () => {
    return (
      <div className='w-100 mt-3 text-center utility-placeholder'>
        <div className="text-center w-100">
          <ClickOutlined size={48}/>
          <p className='text-Secondary' id='list-empty-tip'>
            {nls('utilityPlaceholder')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div css={STYLE}>
      <SettingRow flow='wrap' label={nls('printService')}>
        <UtilitySelector
          useUtilities={Immutable(useUtility ? [useUtility] : [])}
          onChange={handleUtilityChange}
          showRemove
          closePopupOnSelect
          type={SupportedUtilityType.Printing}
        />
      </SettingRow>
      {(!config?.useUtility && !showLoading) && renderUseUtilityPlaceholder()}
    </div>
  )
}

export default PrintServiceSelect
