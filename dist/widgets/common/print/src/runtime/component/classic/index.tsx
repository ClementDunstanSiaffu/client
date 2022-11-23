/** @jsx jsx */
import { React, jsx, css, polished, Immutable, ImmutableArray, classNames } from 'jimu-core'
import { hooks, Navbar, Nav, NavLink, NavItem, Badge, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { JimuMapView } from 'jimu-arcgis'
import { IMConfig, IMPrintTemplateProperties, PrintTemplateProperties, MapView, IMPrintResultList, PrintResultList, PrintResultState, PrintResultListItemTyle } from '../../../config'
import TemplateSetting from './template-setting'
import Result from './result'
import defaultMessage from '../../translations/default'
import { print } from '../../utils/print-service'
import { getNewResultItemTitle, getNewResultId, getPreviewLayerId, initTemplateProperties } from '../../utils/utils'
import { getIndexByTemplateId, checkIsTemplateExist, mergeTemplateSetting } from '../../../utils/utils'
const { useState, useRef, useEffect } = React

interface Props {
  id: string
  config: IMConfig
  jimuMapView: JimuMapView
  templateList: ImmutableArray<PrintTemplateProperties>
}

enum Views {
  PrintTemplate = 'PRINT TEMPLATE',
  PrintResult = 'PRINT RESULT'
}
const Classic = (props: Props) => {
  const nls = hooks.useTranslate(defaultMessage, jimuiDefaultMessage)
  const printResultListRef = useRef([] as PrintResultList)
  const oldPrintResultListRef = useRef([] as PrintResultList)
  const preDefaultValueSelectedTemplate = useRef(null as IMPrintTemplateProperties)

  const STYLE = css`
    .classic-setting-con {
      height: 0;
    }
    .nav-bar-con {
      height: ${polished.rem(40)};
      border: none !important;
      border-bottom: 1px solid var(--light-200) !important;
      padding: 0;
      .navbar-nav button.nav-link, .navbar-nav button.nav-link:hover {
        color: var(--dark-800);
      }
      .jimu-nav-link-wrapper .jimu-badge-wrapper {
        & {
          display: block;
        }
        .badge-dot {
          top: ${polished.rem(4)};
          right: ${polished.rem(4)};
        }
      }
    }
  `
  const { config, jimuMapView, templateList, id } = props
  const [views, setViews] = useState(Views.PrintTemplate)
  const [printResultList, setPrintResultList] = useState(Immutable([]) as IMPrintResultList)
  const [selectedTemplate, setSelectedTemplate] = useState(null as IMPrintTemplateProperties)

  useEffect(() => {
    setSelectedTemplateByIndex(0)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (selectedTemplate && checkIsTemplateExist(templateList, selectedTemplate?.templateId)) {
      const index = getIndexByTemplateId(templateList?.asMutable({ deep: true }), selectedTemplate?.templateId)
      const templateInConfig = getNewTemplateWithCommonSetting(templateList?.[index])?.asMutable({ deep: true })
      getNewSelectedTempWhenConfigChange(templateInConfig)
    }
    if (!selectedTemplate || (!checkIsTemplateExist(templateList, selectedTemplate?.templateId))) {
      setSelectedTemplateByIndex(0)
    }
    // eslint-disable-next-line
  }, [templateList, config])

  const getNewSelectedTempWhenConfigChange = (templateInConfig: PrintTemplateProperties) => {
    const currentSelectedTemplate = preDefaultValueSelectedTemplate.current?.asMutable({ deep: true })
    const diffKey = getSelectedTemplateDiffKey(preDefaultValueSelectedTemplate.current?.asMutable({ deep: true }), templateInConfig)
    for (const key in currentSelectedTemplate) {
      if (key.includes('enable')) {
        delete currentSelectedTemplate[key]
      }
    }
    diffKey?.forEach(key => {
      if (key instanceof Array) {
        const objectItem = currentSelectedTemplate[key[0]]
        delete objectItem[key[1]]
        currentSelectedTemplate[key[0]] = objectItem
      } else {
        delete currentSelectedTemplate[key]
      }
    })
    currentSelectedTemplate.layoutOptions = {
      ...templateInConfig?.layoutOptions,
      ...currentSelectedTemplate?.layoutOptions
    }
    currentSelectedTemplate.exportOptions = {
      ...templateInConfig?.exportOptions,
      ...currentSelectedTemplate?.exportOptions
    }
    currentSelectedTemplate.customTextElementEnableList = templateInConfig?.customTextElementEnableList
    currentSelectedTemplate.selectedFormatList = templateInConfig?.selectedFormatList
    const newSelectedTemplate = Immutable({
      ...templateInConfig,
      ...currentSelectedTemplate
    })
    handleSelectedTemplateChange(newSelectedTemplate)
  }

  const getSelectedTemplateDiffKey = (temp: PrintTemplateProperties, preTemplate: PrintTemplateProperties): any[] => {
    if (!temp || !preTemplate) return []
    const diffKey = []
    for (const key in temp) {
      const isItemObject = temp[key] instanceof Object
      if (!isItemObject && temp[key] !== preTemplate[key]) {
        diffKey.push(key)
      }
      if (isItemObject) {
        const diifKey = getObjectDiffKey(temp[key], preTemplate[key])
        diifKey?.forEach(k => {
          diffKey.push([key, k])
        })
      }
    }
    return diffKey
  }

  const getObjectDiffKey = (obj1, obj2): string[] => {
    if (!obj1 || !obj2) return null
    const diffKey = []
    for (const key in obj1) {
      if (obj1?.[key] !== obj2?.[key]) {
        diffKey.push(key)
      }
    }
    return diffKey
  }

  const setSelectedTemplateByIndex = (index: number) => {
    if (templateList?.length === 0) return false
    const template = getNewTemplateWithCommonSetting(templateList?.[index])
    preDefaultValueSelectedTemplate.current = template
    handleSelectedTemplateChange(template)
  }

  const getNewTemplateWithCommonSetting = (template: IMPrintTemplateProperties): IMPrintTemplateProperties => {
    if (!template) return null
    if (template?.overrideCommonSetting) {
      template = mergeTemplateSetting(Immutable(config?.commonSetting), Immutable(template))
    } else {
      template = mergeTemplateSetting(Immutable(template), Immutable(config?.commonSetting))
    }
    return template
  }

  const handleSelectedTemplateChange = (template: IMPrintTemplateProperties) => {
    setSelectedTemplate(template)
  }

  const toggleNav = (views: Views) => {
    setViews(views)
    if (views === Views.PrintResult) {
      oldPrintResultListRef.current = Immutable(printResultListRef.current).asMutable()
    }
  }

  const togglePreviewLayer = (visible: boolean) => {
    const layerId = getPreviewLayerId(id, jimuMapView.id)
    const graphicsLayer = jimuMapView.view.map.findLayerById(layerId)
    if (graphicsLayer) {
      graphicsLayer.visible = visible
    }
  }

  //Confirm print
  const confirmPrint = async (printTemplateProperties: IMPrintTemplateProperties) => {
    const resultItem = {
      resultId: getNewResultId(Immutable(printResultListRef.current)),
      url: null,
      title: getNewResultItemTitle(printTemplateProperties?.layoutOptions?.titleText, Immutable(printResultListRef.current)),
      state: PrintResultState.Loading
    }
    const newPrintResultList = printResultListRef.current
    newPrintResultList.push(resultItem)
    printResultListRef.current = newPrintResultList
    setPrintResultList(Immutable(newPrintResultList))
    togglePreviewLayer(false)
    print({
      useUtility: config?.useUtility,
      mapView: jimuMapView?.view as MapView,
      printTemplateProperties: await initTemplateProperties(printTemplateProperties, jimuMapView)
    }).then(printResult => {
      togglePreviewLayer(true)
      setNewPrintResultList(resultItem, PrintResultState.Success, printResult?.url)
    }, printError => {
      togglePreviewLayer(true)
      setNewPrintResultList(resultItem, PrintResultState.Error)
    })
  }

  //Update result list
  const setNewPrintResultList = (newPrintResultItem: PrintResultListItemTyle, state: PrintResultState, url?: string) => {
    url && (newPrintResultItem.url = url)
    newPrintResultItem.state = state

    let newResultItemIndex
    const newPrintResultList = printResultListRef.current
    newPrintResultList.forEach((item, index) => {
      if (item.resultId === newPrintResultItem.resultId) {
        newResultItemIndex = index
      }
    })

    if (newResultItemIndex || newResultItemIndex === 0) {
      newPrintResultList.splice(newResultItemIndex, 1, newPrintResultItem)
      setPrintResultList(Immutable(newPrintResultList))
      printResultListRef.current = newPrintResultList
    }
  }

  // check is show badge
  const showBadge = () => {
    return printResultListRef?.current?.length === oldPrintResultListRef?.current?.length
  }

  //Delete app item
  const deleteResultItem = (index) => {
    const newPrintResultList = printResultListRef.current
    newPrintResultList.splice(index, 1)
    setPrintResultList(Immutable(newPrintResultList))
    printResultListRef.current = Immutable(newPrintResultList)?.asMutable({ deep: true })
    oldPrintResultListRef.current = Immutable(newPrintResultList)?.asMutable({ deep: true })
  }

  const renderNavbar = () => {
    return (
      <Navbar className="nav-bar-con w-100" border={false} color="false" light>
        <Nav className='w-100 h-100' underline navbar justified={true} fill={true}>
          <NavItem onClick={() => { toggleNav(Views.PrintTemplate) }} className="link-con">
            <NavLink tag='button' active={views === Views.PrintTemplate}>{nls('printTemplate')}</NavLink>
          </NavItem>
          <NavItem onClick={() => { toggleNav(Views.PrintResult) }}>
            <NavLink tag='button' active={views === Views.PrintResult}>
              <Badge className='w-100 h-100' dot={true} color='primary' hideBadge={showBadge()}>
                {nls('printResult')}
              </Badge>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }

  return (
    <div className='w-100 h-100 d-flex flex-column' css={STYLE}>
      {renderNavbar()}
      <div className='flex-grow-1 w-100 classic-setting-con overflow-hidden'>
        <div className={ classNames('w-100 h-100', { 'sr-only': views !== Views.PrintTemplate })}>
          <TemplateSetting
            id={id}
            config={config}
            jimuMapView={jimuMapView}
            selectedTemplate={selectedTemplate}
            templateList={templateList}
            confirmPrint={confirmPrint}
            handleSelectedTemplateChange={handleSelectedTemplateChange}
            setSelectedTemplateByIndex={setSelectedTemplateByIndex}
          />
        </div>
        {views === Views.PrintResult && <Result config={config} printResultList={printResultList} deleteResultItem={deleteResultItem}/>}
      </div>
    </div>
  )
}

export default Classic
