/** @jsx jsx */
import { React, jsx, AllWidgetProps, appActions } from 'jimu-core'
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { hooks } from 'jimu-ui'
import { ArrangeStyles } from './components/arrange-styles'
import { PlaceHolder } from './components/place-holder'

import { IMConfig } from '../config'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const useMapWidgetId = props.useMapWidgetIds?.[0]

  hooks.useEffectOnce(() => {
    const { layoutId, layoutItemId, id, dispatch } = props
    dispatch(appActions.widgetStatePropChange(id, 'layoutInfo', { layoutId, layoutItemId }))
  })

  const [activedJimuMapViewState, setActivedJimuMapViewState] = React.useState<JimuMapView>(null)
  const onActiveMapViewChange = React.useCallback(activeView => {
    if (activeView?.view?.type === '3d') {
      setActivedJimuMapViewState(activeView)
    } else {
      setActivedJimuMapViewState(null) //reset
    }
  }, [])

  const isShowPlaceHolderFlag = !useMapWidgetId || !(activedJimuMapViewState?.view?.type === '3d')
  return (
    <div className='widget-3d-toolbox jimu-widget h-100'>
      { /* 1.placeholder */}
      {isShowPlaceHolderFlag &&
        <PlaceHolder
          widgetId={props.id}
          arrangement={props.config.arrangement}
        ></PlaceHolder>
      }
      { /* 2.widgets */}
      {!isShowPlaceHolderFlag && activedJimuMapViewState &&
        <ArrangeStyles
          config={props.config}
          useMapWidgetId={useMapWidgetId}
          jimuMapView={activedJimuMapViewState}
        ></ArrangeStyles>
      }

      {
        useMapWidgetId &&
          <JimuMapViewComponent useMapWidgetId={useMapWidgetId} onActiveViewChange={onActiveMapViewChange} />
      }
    </div>
  )
}

export default Widget
