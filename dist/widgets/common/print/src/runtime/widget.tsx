/** @jsx jsx */
import { React, jsx, css, AllWidgetProps, appActions, IMState, ReactRedux, ImmutableArray } from 'jimu-core'
import { WidgetPlaceholder, hooks, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { JimuMapViewComponent, JimuMapView, JimuMapViewGroup } from 'jimu-arcgis'
import { IMConfig, ModeType, PrintTemplateProperties } from '../config'
import widgetPrintOutlined from 'jimu-icons/svg/outlined/brand/widget-print.svg'
import defaultMessage from './translations/default'
import Classic from './component/classic'
import CompactPrint from './component/compact'
import { checkIsCustomTemplate } from '../utils/utils'
const { useState, useRef, useEffect } = React
type PrintProps = AllWidgetProps<IMConfig>

const Widget = (props: PrintProps) => {
  const { id, config, dispatch, useMapWidgetIds, layoutId, layoutItemId } = props
  const nls = hooks.useTranslate(defaultMessage, jimuiDefaultMessage)
  const selectionIsSelf = ReactRedux.useSelector((state: IMState) => {
    const selection = state?.appRuntimeInfo?.selection
    const selectionIsSelf = !!(selection && selection.layoutId === layoutId && selection.layoutItemId === layoutItemId)
    return selectionIsSelf
  })
  const isSetlayoutRef = useRef(false)

  const STYLE = css`
    & {
      background: var(--white);
      border: 1px solid var(--light-400);
    }
  `
  useEffect(() => {
    setListLayoutInWidgetState()
    // eslint-disable-next-line
  }, [selectionIsSelf])

  useEffect(() => {
    getTemplateList()
    // eslint-disable-next-line
  }, [config])

  const [jimuMapView, setJimuMapView] = useState(null as JimuMapView)
  const [errorTip, setErrorTip] = useState(nls('printPleaceholder'))
  const [templateList, setTemplateList] = useState(null as ImmutableArray<PrintTemplateProperties>)

  const getTemplateList = () => {
    const isCustomTemplate = checkIsCustomTemplate(config?.printServiceType, config?.printTemplateType)
    const template = isCustomTemplate ? config?.printCustomTemplate : config?.printOrgTemplate
    setTemplateList(template)
  }

  const setListLayoutInWidgetState = () => {
    if (layoutId && id && layoutItemId && !isSetlayoutRef.current && selectionIsSelf) {
      dispatch(
        appActions.widgetStatePropChange(id, 'layoutInfo', {
          layoutId,
          layoutItemId
        })
      )
      isSetlayoutRef.current = true
    }
  }

  const handleActiveViewChange = (jimuMapView: JimuMapView): void => {
    // Async errors
    if (jimuMapView === null || undefined === jimuMapView) {
      setErrorTip(nls('chooseMapTip'))
      setJimuMapView(null)
      return // skip null
    }

    if (jimuMapView.view.type !== '2d') {
      setErrorTip(nls('chooseMapTip'))
      setJimuMapView(null)
      return // skip 2D
    }

    if (!useMapWidgetIds || useMapWidgetIds?.length === 0) {
      setErrorTip(nls('printPleaceholder'))
    }

    setJimuMapView(jimuMapView)// 2d
  }

  const handleViewGroupCreate = (viewGroup: JimuMapViewGroup): void => {
    // setViewGroup(viewGroup)
  }

  // Render pleaceholder
  const renderWidgetPlaceholder = (): React.ReactElement => {
    return <WidgetPlaceholder icon={widgetPrintOutlined} widgetId={id} message={getErrorTip()} />
  }

  const getErrorTip = (): string => {
    let errMsg = errorTip
    if (jimuMapView && !config?.useUtility) {
      errMsg = ''
    }
    return errMsg
  }

  // Render map content
  const renderMapContent = () => {
    return (
      <JimuMapViewComponent
        useMapWidgetId={useMapWidgetIds?.[0]}
        onActiveViewChange={handleActiveViewChange}
        onViewGroupCreate={handleViewGroupCreate}
      />
    )
  }

  const checkShowPlaceholder = () => {
    return !jimuMapView || !config?.useUtility
  }

  return (
    <div className='w-100 h-100' css={STYLE}>
      <div className='map'>
        <div>{renderMapContent()}</div>
      </div>

      {
        config?.modeType === ModeType.Classic && <div className='w-100 h-100'>
          {!checkShowPlaceholder() && <Classic id={id} config={config} jimuMapView={jimuMapView} templateList={templateList} />}
          {checkShowPlaceholder() && renderWidgetPlaceholder()}
        </div>
      }

      {
        config?.modeType === ModeType.Compact && <div className='w-100 h-100'>
          <CompactPrint id={id} config={config} jimuMapView={jimuMapView} templateList={templateList} errorTip={getErrorTip()} />
        </div>
      }
    </div>
  )
}
export default Widget
