/** @jsx jsx */
import { React, jsx, css, AllWidgetProps } from 'jimu-core'
import { WidgetPlaceholder } from 'jimu-ui'
import { IMConfig, QueryArrangeType } from '../config'
import defaultMessages from './translations/default'
import { getWidgetRuntimeDataMap } from './widget-config'

import { versionManager } from '../version-manager'
import { QueryTaskList } from './query-task-list'
import { TaskListInline } from './query-task-list-inline'
import { TaskListPopperWrapper } from './query-task-list-popper-wrapper'
import { QueryWidgetContext } from './widget-context'

const { iconMap } = getWidgetRuntimeDataMap()

const widgetStyle = css`
  background-color: var(--white);
`

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>> {
  static versionManager = versionManager

  render () {
    const { config, id, icon, label, layoutId, layoutItemId } = this.props
    const widgetLabel = this.props.intl.formatMessage({
      id: '_widgetLabel',
      defaultMessage: defaultMessages._widgetLabel
    })
    if (!config.queryItems?.length) {
      return <WidgetPlaceholder icon={iconMap.iconQuery} widgetId={this.props.id} message={widgetLabel} />
    }

    if (config.arrangeType === QueryArrangeType.Popper) {
      return (
        <QueryWidgetContext.Provider value={`${layoutId}:${layoutItemId}`}>
          <TaskListPopperWrapper
            id={0}
            icon={icon}
            popperTitle={label}
            minSize={config.sizeMap?.arrangementIconPopper?.minSize}
            defaultSize={config.sizeMap?.arrangementIconPopper?.defaultSize}
          >
            <QueryTaskList widgetId={id} queryItems={config.queryItems} className='py-3' />
          </TaskListPopperWrapper>
        </QueryWidgetContext.Provider>
      )
    }

    if (config.arrangeType === QueryArrangeType.Inline) {
      return (
        <QueryWidgetContext.Provider value={`${layoutId}:${layoutItemId}`}>
          <TaskListInline
            widgetId={id}
            widgetLabel={label}
            wrap={config.arrangeWrap}
            queryItems={config.queryItems}
            minSize={config.sizeMap?.arrangementIconPopper?.minSize}
            defaultSize={config.sizeMap?.arrangementIconPopper?.defaultSize}
          />
        </QueryWidgetContext.Provider>
      )
    }

    return (
      <div
        className='jimu-widget runtime-query py-3'
        css={widgetStyle}
      >
        <QueryWidgetContext.Provider value={`${layoutId}:${layoutItemId}`}>
          <QueryTaskList widgetId={id} queryItems={config.queryItems} />
        </QueryWidgetContext.Provider>
      </div>
    )
  }
}
