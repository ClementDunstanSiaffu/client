/** @jsx jsx */
// This file is duplicated from '../../../../feature-info/src/runtime/components/feature-info'
import { React, css, jsx, DataSource, injectIntl, IntlShape, classNames } from 'jimu-core'
import { loadArcGISJSAPIModules } from 'jimu-arcgis'
import { Button } from 'jimu-ui'
import { RightFilled } from 'jimu-icons/filled/directional/right'
import { DownFilled } from 'jimu-icons/filled/directional/down'

export enum LoadStatus {
  Pending = 'Pending',
  Fulfilled = 'Fulfilled',
  Rejected = 'Rejected'
}

interface Props{
  dataSource: DataSource
  graphic: __esri.Graphic
  popupTemplate: __esri.PopupTemplate
  togglable?: boolean
}

interface State{
  loadStatus: LoadStatus
  showContent: boolean
}

const style = css`
  border: 1px solid var(--light-200);
  .esri-widget__heading {
    font-size: 14px;
    font-weight: 500;
    margin: 0;
    color: var(--black);
  }

  .esri-feature__content-element {
    padding: 0;
  }

  .jimu-btn.expanded {
    align-self: flex-start;
  }
`

interface ExtraProps {
  intl: IntlShape
}

class FeatureInfo extends React.PureComponent<Props & ExtraProps, State> {
  private Feature: typeof __esri.Feature
  private feature: __esri.Feature

  public refs: {
    featureContainer: HTMLInputElement
  }

  constructor (props) {
    super(props)
    const { togglable = false } = this.props
    this.state = {
      showContent: !togglable,
      loadStatus: LoadStatus.Pending
    }
  }

  componentDidMount () {
    this.createFeature()
  }

  componentDidUpdate () {
    if (this.feature) {
      this.feature.graphic.popupTemplate = this.props.popupTemplate
      this.feature.visibleElements = this.getVisibleElements()
    }
  }

  destoryFeature () {
    this.feature && !this.feature.destroyed && this.feature.destroy()
  }

  getVisibleElements () {
    const { togglable = false } = this.props
    const { showContent } = this.state
    const expanded = togglable ? showContent : true
    return {
      title: true,
      content: {
        fields: expanded,
        text: expanded,
        media: expanded,
        attachments: expanded
      },
      lastEditedInfo: false
    }
  }

  createFeature () {
    let featureModulePromise
    if (this.Feature) {
      featureModulePromise = Promise.resolve()
    } else {
      featureModulePromise = loadArcGISJSAPIModules([
        'esri/widgets/Feature'
      ]).then(modules => {
        [
          this.Feature
        ] = modules
      })
    }
    return featureModulePromise.then(() => {
      const container = document && document.createElement('div')
      container.className = 'jimu-widget'
      this.refs.featureContainer.appendChild(container)

      const originDS = this.props.dataSource.getOriginDataSources()
      const rootDataSource = originDS?.[0]?.getRootDataSource()

      this.destoryFeature()
      this.props.graphic.popupTemplate = this.props.popupTemplate
      this.feature = new this.Feature({
        container: container,
        defaultPopupTemplateEnabled: true,
        // @ts-expect-error
        spatialReference: this.props.dataSource?.layer?.spatialReference || null,
        // @ts-expect-error
        map: rootDataSource?.map || null,
        graphic: this.props.graphic,
        visibleElements: this.getVisibleElements()
      })
    }).then(() => {
      this.setState({ loadStatus: LoadStatus.Fulfilled })
    })
  }

  toggleExpanded = (e) => {
    e.stopPropagation()
    this.setState({ showContent: !this.state.showContent })
  }

  render () {
    const { togglable = false, intl } = this.props
    const { showContent } = this.state
    return (
      <div className='feature-info-component d-flex align-items-center p-2' css={style}>
        {togglable && (
          <Button
            aria-label={intl.formatMessage({ id: showContent ? 'hide' : 'show' })}
            className={classNames('p-0', { expanded: showContent })}
            type='tertiary'
            icon
            size='sm'
            onClick={this.toggleExpanded}
          >
            {showContent ? <DownFilled size='s'/> : <RightFilled size='s' autoFlip/>}
          </Button>
        )}
        <div className='flex-grow-1' ref='featureContainer' />
      </div>
    )
  }
}

export default injectIntl(FeatureInfo)
