import { React, SessionManager, esri, getAppStore, IMThemeVariables } from 'jimu-core'
import { ImageWithParam } from 'jimu-ui'
import { PlaceholderMapFilled } from 'jimu-icons/filled/data/placeholder-map'

interface Props{
  mapItemId: string
  portUrl: string
  theme: IMThemeVariables
}

interface States{
  mapThumbUrl: string
}

export default class MapThumb extends React.PureComponent<Props, States> {
  unmount = false

  constructor (props) {
    super(props)

    this.state = {
      mapThumbUrl: null
    }
  }

  componentDidMount () {
    this.unmount = false
    this.setMapThumbUrl(this.props.mapItemId)
  }

  componentDidUpdate (prevProps: Props, prevState) {
    if (prevProps.mapItemId !== this.props.mapItemId) {
      this.setMapThumbUrl(this.props.mapItemId)
    }
  }

  setMapThumbUrl = (mapId: string): void => {
    if (!mapId) {
      this.setState({ mapThumbUrl: null })
    }

    // if no portalUrl or same to config portalurl, use app config's portalUrl
    const portalUrl = this.props?.portUrl || getAppStore().getState().portalUrl
    const session = SessionManager.getInstance().getSessionByUrl(portalUrl) || null
    esri.restPortal.searchItems({
      q: `id:${mapId}`,
      authentication: session,
      portal: portalUrl + '/sharing/rest'
    }).then(items => {
      if (!this.unmount) {
        if (items.results[0]?.thumbnail) {
          const session = SessionManager.getInstance().getSessionByUrl(portalUrl)
          let tempThumbUrl = null
          if (session && session.token) {
            tempThumbUrl = `${portalUrl}/sharing/rest/content/items/${items.results[0].id}/` +
            `info/${items.results[0].thumbnail}?token=${session.token}`
          } else {
            tempThumbUrl = `${portalUrl}/sharing/rest/content/items/${items.results[0].id}/` +
            `info/${items.results[0].thumbnail}`
          }

          this.setState({ mapThumbUrl: tempThumbUrl })
        } else {
          this.setState({ mapThumbUrl: null })
        }
      }
    })
  }

  componentWillUnmount () {
    this.unmount = true
  }

  render () {
    if (this.state.mapThumbUrl) {
      return <ImageWithParam imageParam={{ url: this.state.mapThumbUrl }} />
    } else {
      const palette = this.props.theme.colors.palette
      return (<div style={{ backgroundColor: palette.light[200], height: '100%' }} >
          <PlaceholderMapFilled color={palette.light[600]} size={'100%'} />
        </div>)
    }
  }
}
