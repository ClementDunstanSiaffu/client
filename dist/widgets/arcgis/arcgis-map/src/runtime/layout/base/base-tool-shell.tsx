/** @jsx jsx */
import { jsx, classNames, IntlShape } from 'jimu-core'
import { UIComponent, UIComponentProps } from './ui-component'
import { ToolConfig } from '../../../config'
import { ActiveToolInfo } from './base-tool'
import { LayoutJson, ToolJson } from '../config'
import ToolModules from '../tool-modules'

interface ToolShellProps extends UIComponentProps {
  mapWidgetId: string
  layoutConfig: LayoutJson
  toolConfig: ToolConfig
  toolName: string
  isMobile?: boolean
  isHidden?: boolean
  intl?: IntlShape
  isLastElement?: boolean

  className?: string
  activeToolInfo: ActiveToolInfo
  onActiveToolInfoChange: (activeToolInfo: ActiveToolInfo) => void
}

export default class BaseToolShell extends UIComponent<ToolShellProps, unknown> {
  render () {
    const ToolClass = ToolModules[this.props.toolName]
    if (ToolClass) {
      return (
        <div
          className={classNames(this.props.className, 'exbmap-ui exbmap-ui-tool-shell divitem', (this.props.layoutConfig.elements[this.props.toolName] as ToolJson).className,
            {
              'exbmap-ui-hidden-element': this.props.isHidden,
              'mb-0 mr-0': this.props.isLastElement,
              'rounded-pill': ['Compass'].includes(this.props.toolName)
            })} style={(this.props.layoutConfig.elements[this.props.toolName] as ToolJson).style}
        >
          <ToolClass
            mapWidgetId={this.props.mapWidgetId}
            ref='baseToolInstance' toolJson={this.props.layoutConfig.elements[this.props.toolName]} toolName={this.props.toolName} isMobile={this.props.isMobile}
            jimuMapView={this.props.jimuMapView} activeToolInfo={this.props.activeToolInfo} onActiveToolInfoChange={this.props.onActiveToolInfoChange}
            intl={this.props.intl} theme={this.props.theme}
          />
        </div>
      )
    } else {
      if (this.props.isMobile) {
        return <span />
      } else {
        return null
      }
    }
  }
}
