/** @jsx jsx */
import { React, jsx, ThemeVariables } from 'jimu-core'
import { Nav } from 'jimu-ui'
import { getStyle, getPlayPanelWapperClass, getSettingBtnsClass } from './style'

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

export default class BarLayout extends React.PureComponent<LayoutProps> {
  renderSeparator (): React.ReactElement {
    return <div className='separator-line' />
  }

  render (): React.ReactElement {
    return (
      <div css={getStyle(this.props.theme)} className='fly-wapper d-flex'>
        <Nav navbar className='bar'>
          <div className='items d-flex flex-row justify-content-around'>
            {/* 1 */}
            <div className='d-flex'>
              {/* 1.1 */}
              <div className={'setting-btns-wapper items ' + getSettingBtnsClass(this.props.isPlaying)}>
                <div className='item'>
                  {this.props.flyStyleContent}
                </div>
                {
                  !this.props.isRouteMode &&
                    <React.Fragment>
                      <div className='item'>
                        <div className='d-flex'>
                          {this.renderSeparator()}
                          {this.props.graphicInteractionManager}
                        </div>
                      </div>
                      <div className='item'>
                        {this.props.liveviewSettingContent}
                      </div>
                    </React.Fragment>
                }{
                  this.props.isRouteMode &&
                    <React.Fragment>
                      {this.props.graphicInteractionManager}{/* hidden but useful tools */}
                      {this.props.routeListContent}
                    </React.Fragment>
                }
              </div>
              {/* 1.2 */}
              <div className={getPlayPanelWapperClass(this.props.isPlaying)}>
                <div className='speed-wapper h-100'>
                  {this.props.speedController}
                </div>
              </div>
            </div>
            {/* 2 */}
            <div className='d-flex'>
              <div className='item'>
                {this.renderSeparator()}
                {this.props.playStateContent}
              </div>
              {/* <div className="item">
            <Button onClick={this.highlightHelper.getPopupAndHighlightState} >
              test
            </Button>
          </div> */}
            </div>
            {/* 3 */}
            <div className={'progress-bar-wapper ' + getPlayPanelWapperClass(this.props.isPlaying)}>
              {this.props.progressBar}
            </div>
          </div>
        </Nav>
      </div>
    )
  }
}
