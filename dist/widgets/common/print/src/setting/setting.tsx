/** @jsx jsx */
import { React, jsx, css, polished, LayoutType, ReactRedux, IMState } from 'jimu-core'
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { AllWidgetSettingProps, getAppConfigAction } from 'jimu-for-builder'
import { hooks, Icon, Button, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { MapWidgetSelector, SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { IMConfig, ModeType, IMPrintTemplateProperties } from '../config'
import defaultMessage from './translations/default'
import { isDefined } from '../utils/utils'
import TemplateSetting from './component/template-setting'
import CommonTemplateSetting from './component/template-common-setting'

const CLASSIC_DEFAULT_SIZE = {
  width: '360px',
  height: '460px'
}

const COMPACT_DEFAULT_SIZE = {
  width: '40px',
  height: '40px'
}

interface ExtraProps {
  id: string
}

type SettingProps = AllWidgetSettingProps<IMConfig> & ExtraProps

const Setting = (props: SettingProps) => {
  const { config, id, portalUrl, onSettingChange, useMapWidgetIds } = props
  const nls = hooks.useTranslate(defaultMessage, jimuiDefaultMessage)

  const layoutInfo = ReactRedux.useSelector((state: IMState) => state?.appStateInBuilder?.widgetsState[id]?.layoutInfo)
  const appConfig = ReactRedux.useSelector((state: IMState) => state.appStateInBuilder.appConfig)

  const [jimuMapView, setJimuMapView] = React.useState(null as JimuMapView)

  const SYLE = css`
    .select-mode-con {
      &>div {
        flex: 1;
      }
      button {
        height: ${polished.rem(80)};
        background: var(--light-200);
        border: 2px solid transparent;
        &:not(:disabled):not(.disabled).active {
          border-color: var(--primary);
          background: var(--light-200);
        }
      }
      img {
        width: 100%;
        height: 100%;
        margin: 0 auto;
      }
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
      .handle{
        height: ${polished.rem(32)};
        background: var(--light-500);
        padding-left: ${polished.rem(8)};
        padding-right: ${polished.rem(8)};
      }
    }
  `

  const handlePropertyChange = (key: string, value: any) => {
    if (config?.[key] === value) return false
    const newConfig = config.setIn([key], value)
    onSettingChange({
      id: id,
      config: newConfig
    })
  }

  const handleMapWidgetChange = (useMapWidgetIds: string[]): void => {
    onSettingChange({
      id: id,
      useMapWidgetIds: useMapWidgetIds
    })
  }

  const handleActiveViewChange = (newJimuMapView: JimuMapView): void => {
    if (!isDefined(newJimuMapView) || newJimuMapView.view.type === '3d') {
      setJimuMapView(null)
    } else if (newJimuMapView?.id !== jimuMapView?.id) {
      setJimuMapView(newJimuMapView)
    }
  }

  const handleModeTypeChange = (modeType: ModeType) => {
    const newConfig = config.setIn(['modeType'], modeType)
    //Edit default size of print layout when change mode type
    const appConfigAction = getAppConfigAction()
    let printSize = CLASSIC_DEFAULT_SIZE
    if (modeType === ModeType.Compact) {
      printSize = COMPACT_DEFAULT_SIZE
    }
    const layoutType = getLayoutType()
    if (layoutType === LayoutType.FixedLayout) {
      const { layoutId, layoutItemId } = layoutInfo
      const layout = appConfig.layouts[layoutId]
      const layoutItem = layout?.content?.[layoutItemId]
      const bbox = layoutItem.bbox.set('width', printSize.width).set('height', printSize.height)
      appConfigAction
        .editLayoutItemBBox(layoutInfo, bbox)
        .editWidgetProperty(id, 'config', newConfig)
        .exec()
    }
  }

  const handleTemplatePropertyChange = (templateProperty: IMPrintTemplateProperties) => {
    const newConfig = config.set('commonSetting', templateProperty)
    onSettingChange({
      id: id,
      config: newConfig
    })
  }

  //Get layout type
  const getLayoutType = (): LayoutType => {
    const layoutId = layoutInfo?.layoutId
    const layoutType = appConfig?.layouts?.[layoutId]?.type
    return layoutType
  }

  const renderModeSetting = () => {
    return (
      <SettingSection className='map-selector-section'>
        <SettingRow flow='wrap' label={nls('printMode')}>
          <div className='d-flex w-100 select-mode-con'>
            <div className='flex-grow-1 text-truncate'>
              <Button className='w-100' active={config?.modeType === ModeType.Classic} onClick={() => { handleModeTypeChange(ModeType.Classic) }}>
                <Icon autoFlip icon={require('./assets/Classic.svg')}/>
              </Button>
              <div className='mt-1 w-100 text-center text-truncate' title={nls('printClassic')}>{nls('printClassic')}</div>
            </div>

            <div className='flex-grow-1 ml-2 text-truncate'>
              <Button className='w-100' active={config?.modeType === ModeType.Compact} onClick={() => { handleModeTypeChange(ModeType.Compact) }}>
                <Icon autoFlip icon={require('./assets/Compact.svg')}/>
              </Button>
              <div className='mt-1 text-center text-truncate' title={nls('printCompact')}>{nls('printCompact')}</div>
            </div>
          </div>
        </SettingRow>
      </SettingSection>
    )
  }

  return (
    <div className='widget-setting-search jimu-widget-search' css={SYLE}>
      {/* Print source select */}
      <SettingSection className='map-selector-section' title={nls('printSource')}>
        <SettingRow flow='wrap' label={nls('selectMap')}>
          <MapWidgetSelector onSelect={handleMapWidgetChange} useMapWidgetIds={useMapWidgetIds} />
        </SettingRow>
        <div className='fly-map'>
          <div><JimuMapViewComponent useMapWidgetId={useMapWidgetIds?.[0]} onActiveViewChange={handleActiveViewChange} /></div>
        </div>
      </SettingSection>

      {/* Print mode setting */}
      {renderModeSetting()}

      {/* Print template list */}
      <TemplateSetting
        id={id}
        config={config}
        portalUrl={portalUrl}
        handlePropertyChange={handlePropertyChange}
        onSettingChange={onSettingChange}
        jimuMapView={jimuMapView}
      />

      {/* Print template common setting */}
      {config?.useUtility && <SettingSection title={nls('templateCommonSettings')}>
        <CommonTemplateSetting
          id={id}
          printTemplateProperties={config?.commonSetting}
          handleTemplatePropertyChange={handleTemplatePropertyChange}
          modeType={config?.modeType}
          jimuMapView={jimuMapView}
        />
      </SettingSection>}

    </div>
  )
}

export default Setting
