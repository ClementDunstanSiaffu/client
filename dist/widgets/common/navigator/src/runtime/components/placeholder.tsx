import { React } from 'jimu-core'
import { WidgetPlaceholder, hooks } from 'jimu-ui'
import defaultMessages from '../translations/default'
const navigatorIcon = require('jimu-ui/lib/icons/navigator.svg')

interface PalceholderProps {
  show?: boolean
  widgetId: string
}

export const Palceholder = (props: PalceholderProps) => {
  const { widgetId, show } = props

  const translate = hooks.useTranslate(defaultMessages)

  return show
    ? <WidgetPlaceholder
      icon={navigatorIcon}
      widgetId={widgetId}
      message={translate('widgetPlaceholder')} />
    : null
}
