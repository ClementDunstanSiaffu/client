/** @jsx jsx */
import { React, jsx, css, BrowserSizeMode, IMAppConfig, defaultMessages as jimuCoreDefaultMessage } from 'jimu-core'
import { SettingChangeFunction } from 'jimu-for-builder'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { ListLayout, Status, IMConfig } from '../../config'
import { hooks, Radio, Modal, ModalBody, ModalHeader, ModalFooter, Button, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import defaultMessage from '../translations/default'
import { WarningOutlined } from 'jimu-icons/outlined/suggested/warning'
import { searchUtils } from 'jimu-layouts/layout-runtime'
import { setLayoutAuto, setLayoutCustom, Option } from '../utils/utils'
import { useState, useEffect } from 'react'
interface LayoutSettingProps {
  id: string
  onSettingChange: SettingChangeFunction
  listLayout: ListLayout
  status: Status
  browserSizeMode: BrowserSizeMode
  mainSizeMode: BrowserSizeMode
  layouts: any
  config: IMConfig
  appConfig: IMAppConfig
}

const LayoutSetting = (props: LayoutSettingProps) => {
  const { id, listLayout, status, browserSizeMode, layouts, mainSizeMode, config, appConfig } = props
  const [isOpen, setIsOpen] = useState(false)
  const [reminderTitle, setReminderTitle] = useState(null)
  const [reminderText, setReminderText] = useState(null)
  const [reminderBottomText, setReminderBottomText] = useState(null)
  const layout = React.useRef<ListLayout>(listLayout)
  const oldLayout = React.useRef<ListLayout>(listLayout)

  useEffect(() => {
    layout.current = props.listLayout
    oldLayout.current = props.listLayout
  }, [status, props])

  const STYLE = css`
    .jimu-radio {
      cursor: pointer;
    }
  `

  const handleToggle = () => {
    setIsOpen(!isOpen)
    layout.current = oldLayout.current
  }

  const handleConfirm = () => {
    const regularLayoutId = searchUtils.findLayoutId(layouts[Status.Regular], browserSizeMode, mainSizeMode)
    const desLayoutId = searchUtils.findLayoutId(layouts[status], browserSizeMode, mainSizeMode)
    const option: Option = {
      layout: layout.current,
      config: config,
      widgetId: id,
      appConfig: appConfig,
      status: status,
      regularLayoutId: regularLayoutId,
      desLayoutId: desLayoutId,
      label: nls(status.toLowerCase())
    }
    if (layout.current === ListLayout.AUTO) {
      setLayoutAuto(option)
    } else {
      setLayoutCustom(option)
    }
    setIsOpen(false)
    oldLayout.current = layout.current
  }

  const handleLayoutChange = (newLayout: ListLayout) => {
    if (oldLayout.current === newLayout) return
    if (newLayout === ListLayout.AUTO) {
      setReminderTitle(nls('remindAutoLayoutTitle'))
      setReminderText(nls('remindAutoLayoutText'))
      setReminderBottomText('')
    } else {
      setReminderTitle(nls('remindCustomLayoutTitle'))
      setReminderText(nls('remindCustomLayoutText'))
      setReminderBottomText(nls('remindCustomLayoutBottomText'))
    }
    setIsOpen(true)
    layout.current = newLayout
  }

  const renderRemindModel = () => {
    return (
      <Modal isOpen={isOpen} toggle={handleToggle} centered>
        <ModalHeader toggle={handleToggle}>
          <WarningOutlined className='mr-2' size={16}/>
          {reminderTitle}
        </ModalHeader>
        <ModalBody>
          <div>{reminderText}</div>
          <div className='mt-2'>{reminderBottomText}</div>
        </ModalBody>
        <ModalFooter>
          <Button title={nls('cancel')} onClick={() => { setIsOpen(false) }}>{nls('cancel')}</Button>
          <Button title={nls('ok')} type='primary' onClick={handleConfirm}>
            {nls('ok')}
          </Button>
        </ModalFooter>
      </Modal>
    )
  }

  const nls = hooks.useTranslate(defaultMessage, jimuiDefaultMessage, jimuCoreDefaultMessage)

  return (
    <div css={STYLE} role='group' aria-label={nls('layout')}>
      <SettingRow label={nls('layout')} flow='wrap'>
        <Radio title={nls('auto')} checked={config?.cardConfigs?.[status]?.listLayout === ListLayout.AUTO} onChange={() => { handleLayoutChange(ListLayout.AUTO) }} className='mr-2'/> {nls('auto')}
      </SettingRow>
      <SettingRow>
        <Radio title={nls('custom')} checked={config?.cardConfigs?.[status]?.listLayout === ListLayout.CUSTOM || !config?.cardConfigs?.[status]?.listLayout} onChange={() => { handleLayoutChange(ListLayout.CUSTOM) }} className='mr-2'/> {nls('custom')}
      </SettingRow>
      {renderRemindModel()}
    </div>
  )
}

export default LayoutSetting
