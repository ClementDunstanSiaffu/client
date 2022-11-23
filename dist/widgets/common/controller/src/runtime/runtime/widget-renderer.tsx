/** @jsx jsx */
import { React, css, jsx, ErrorBoundary, WidgetState, classNames, getAppStore, appActions } from 'jimu-core'
import { hooks, Loading } from 'jimu-ui'
import { loadWidgetClass } from '../common'

export interface WidgetRendererProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  widgetId?: string
  canCrossLayoutBoundary?: boolean
}

const useStyle = (canCrossLayoutBoundary?: boolean) => {
  return React.useMemo(() => {
    return css`
      overflow: ${canCrossLayoutBoundary ? 'visible' : 'hidden'};
      position: relative;
      .widget-content {
        position: relative;
        height: 100%;
        width: 100%;
        z-index: 0;
      }
  `
  }, [canCrossLayoutBoundary])
}

export function WidgetRenderer (props: WidgetRendererProps) {
  const { widgetId, canCrossLayoutBoundary, className, ...others } = props
  const cancelable = hooks.useCancelablePromiseMaker()

  const [WidgetClass, setWidgetClass] = React.useState(null)
  const [widgetError, setWidgetError] = React.useState('')

  React.useEffect(() => {
    const promise = cancelable(loadWidgetClass(widgetId))
    promise.then((widgetClass) => {
      setWidgetClass(widgetClass)
    }, (error) => {
      setWidgetError(error?.message ?? error)
    })
  }, [cancelable, widgetId])

  const handleMouseDown = React.useCallback(() => {
    if (widgetError) return
    if (window.jimuConfig.isBuilder) {
      return
    }
    const isActive = getAppStore().getState().widgetsRuntimeInfo?.[widgetId]?.state === WidgetState.Active

    if (isActive) {
      return
    }
    getAppStore().dispatch(appActions.activateWidget(widgetId))
  }, [widgetError, widgetId])

  const classes = classNames('widget-renderer w-100 h-100', className)
  const style = useStyle(canCrossLayoutBoundary)

  return (
    <div
      css={style}
      className={classes}
      onMouseDownCapture={handleMouseDown}
      data-widgetid={widgetId}
      {...others}
    >
      <div className='widget-content p-1'>
        {
          widgetError
        }
        {
          !widgetError && WidgetClass && <ErrorBoundary>
            <WidgetClass widgetId={widgetId} />
          </ErrorBoundary>
        }
        {
          !widgetError && !WidgetClass && <Loading />
        }
      </div>
    </div>
  )
}
