/** @jsx jsx */
import { React, jsx, ThemeVariables } from 'jimu-core'
import { getStyle, getPlayPanelWapperClass, getFunctionalBtnsClass, getRouteModeClass } from './style'

interface LayoutProps {
  flyStyleContent: React.ReactElement
  graphicInteractionManager: React.ReactElement

  liveviewSettingContent: React.ReactElement
  playStateContent: React.ReactElement
  progressBar: React.ReactElement
  speedController: React.ReactElement

  theme: ThemeVariables
  isPlaying: boolean
  isRouteMode: boolean
  routeListContent: React.ReactElement
}

export default class PaletteLayout extends React.PureComponent<LayoutProps> {
  render (): React.ReactElement {
    return (
      <div css={getStyle(this.props.theme)} className='fly-wapper d-flex'>
        <div className={'palette-wapper' + getRouteModeClass(this.props.isRouteMode)}>
          <div className={'progress-bar-wapper' + getPlayPanelWapperClass(this.props.isPlaying)}>
            {this.props.progressBar}
          </div>

          <div className={getFunctionalBtnsClass(this.props.isPlaying)}>
            {this.props.flyStyleContent}

            {!this.props.isRouteMode &&
              <React.Fragment>
                {this.props.graphicInteractionManager}
                {this.props.liveviewSettingContent}
              </React.Fragment>
            }
            {this.props.isRouteMode &&
              <React.Fragment>
                {this.props.graphicInteractionManager}
                {this.props.routeListContent}
              </React.Fragment>
            }
          </div>

          {this.props.playStateContent}

          <div className={getPlayPanelWapperClass(this.props.isPlaying)}>
            {this.props.speedController}
          </div>
        </div>
      </div>
    )
  }
}
