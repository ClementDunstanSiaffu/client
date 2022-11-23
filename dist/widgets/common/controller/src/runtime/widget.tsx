/** @jsx jsx */
import {
  React,
  jsx,
  css,
  AllWidgetProps,
  IMState,
  AppMode,
  polished,
  ReactRedux,
  IMThemeButtonStylesByState
} from 'jimu-core'
import { IMConfig } from '../config'
import { Runtime } from './runtime/runtime'
import { MIN_WIDGET_WIDTH, MIN_WIDGET_HEIGHT } from '../common/consts'
import { styleUtils, hooks } from 'jimu-ui'
import { versionManager } from '../version-manager'

export type ControllerWidgetProps = AllWidgetProps<IMConfig>

const useStyle = (vertical) => {
  return React.useMemo(() => {
    return css`
      overflow: hidden;
      white-space: nowrap;
      .controller-container {
        width: 100%;
        height: 100%;
        min-width: ${!vertical
        ? polished.rem(MIN_WIDGET_WIDTH)
        : polished.rem(MIN_WIDGET_HEIGHT)};
        min-height: ${vertical
        ? polished.rem(MIN_WIDGET_WIDTH)
        : polished.rem(MIN_WIDGET_HEIGHT)};
      }
    `
  }, [vertical])
}

const useAdvancedStyle = (
  variant: IMThemeButtonStylesByState,
  advanced: boolean
) => {
  const regular = variant?.default
  const active = variant?.active
  const hover = variant?.hover

  return React.useMemo(() => {
    if (!advanced) return css``
    return css`
      .avatar-card:not(.add-widget-btn) {
        ${regular &&
      css`
          > .avatar {
            > .avatar-button {
              background-color: ${regular.bg};
              border-color: ${regular.bg};
            }
          }
          > .avatar-label {
            color: ${regular.color};
            font-style: ${regular?.italic ? 'italic' : 'normal'};
            font-weight: ${regular?.bold ? 'bold' : 'normal'};
            text-decoration: ${styleUtils.toCSSTextUnderLine({
        underline: regular.underline,
        strike: regular.strike
      })};
          }
        `}
        ${hover &&
      css`
          &:hover {
            > .avatar {
              > .avatar-button {
                background-color: ${hover.bg};
                border-color: ${hover.bg};
              }
            }
            > .avatar-label {
              color: ${hover.color};
              font-style: ${hover?.italic ? 'italic' : 'normal'};
              font-weight: ${hover?.bold ? 'bold' : 'normal'};
              text-decoration: ${styleUtils.toCSSTextUnderLine({
        underline: hover.underline,
        strike: hover.strike
      })};
            }
          }
        `}
        ${active &&
      css`
          > .avatar {
            > .avatar-button {
              &:not(:disabled):not(.disabled):active,
              &:not(:disabled):not(.disabled).active,
              &[aria-expanded='true'] {
                background-color: ${active.bg};
                border-color: ${active.bg};
              }
            }
          }
          > .avatar-label {
            &:not(:disabled):not(.disabled):active,
            &:not(:disabled):not(.disabled).active {
              color: ${active.color};
              font-style: ${active?.italic ? 'italic' : 'normal'};
              font-weight: ${active?.bold ? 'bold' : 'normal'};
              text-decoration: ${styleUtils.toCSSTextUnderLine({
        underline: active.underline,
        strike: active.strike
      })};
            }
          }
        `}
      }
    `
  }, [advanced, regular, active, hover])
}

const ControllerWidget = (props: ControllerWidgetProps) => {
  const { builderSupportModules, id, config, onInitResizeHandler } = props
  const onlyOpenOne = config.behavior?.onlyOpenOne
  const displayType = config.behavior?.displayType
  const vertical = config?.behavior?.vertical
  const advanced = config?.appearance.advanced
  const variant = config?.appearance?.card.variant

  const isInBuilder = ReactRedux.useSelector(
    (state: IMState) => state.appContext.isInBuilder
  )
  const appMode = ReactRedux.useSelector((state: IMState) => state.appRuntimeInfo.appMode)
  const browserSizeMode = ReactRedux.useSelector((state: IMState) => state.browserSizeMode)

  React.useEffect(() => {
    onInitResizeHandler?.(null, null, () => {
      setVersion((v) => v + 1)
    })
  }, [onInitResizeHandler])

  const isBuilder = isInBuilder && appMode !== AppMode.Run
  const Builder = isBuilder && builderSupportModules.widgetModules.Builder
  const [version, setVersion] = React.useState(0)

  hooks.useUpdateEffect(() => {
    setVersion((v) => v + 1)
  }, [onlyOpenOne, displayType, appMode, browserSizeMode])

  const style = useStyle(vertical)
  const advanStyle = useAdvancedStyle(variant, advanced)
  return (
    <div
      className='widget-controller jimu-widget shadow rw-controller'
      css={[style, advanStyle]}
    >
      <div className='controller-container'>
        {!isBuilder && (
          <Runtime
            id={id}
            version={version}
            config={config}
          ></Runtime>
        )}
        {isBuilder && Builder && (
          <Builder
            id={id}
            version={version}
            config={config}
          ></Builder>
        )}
      </div>
    </div>
  )
}

ControllerWidget.versionManager = versionManager

export default ControllerWidget
