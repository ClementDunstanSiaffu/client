/** @jsx jsx */
import {
  React,
  jsx,
  IntlShape,
  injectIntl,
  css,
  SerializedStyles,
  ImmutableObject,
  classNames,
  polished,
  Immutable,
  IMThemeVariables,
  WidgetInitResizeCallback,
  WidgetInitDragCallback
} from 'jimu-core'
import { getQuickStyleConfig } from './quick-style-config'
import { QuickStyleType, PointStyle, Config, Direction } from '../../config'
import {
  QuickStylePopper,
  QuickStylePopperProps
} from 'jimu-ui/advanced/setting-components'
import { Button } from 'jimu-ui'
import { getBuilderThemeVariables } from 'jimu-theme'
import defaultMessages from '../translations/default'

interface OwnProps extends Omit<QuickStylePopperProps, 'onChange'> {
  isOpen: boolean
  reference: HTMLDivElement
  theme: IMThemeVariables
  direction: Direction
  selectedType: QuickStyleType
  onChange: (config: ImmutableObject<Config>) => void
  closeQuickStyle: (isOpen: boolean) => void
  getDividerLineStyle?: (config) => any
  getDividerLinePositionStyle?: (config) => any
  getPointStyle?: (config, isPointStart: boolean) => any
  onInitResizeHandler?: WidgetInitResizeCallback
  onInitDragHandler?: WidgetInitDragCallback
}

interface ExtraProps {
  intl: IntlShape
}

export class _QuickStyle extends React.PureComponent<
OwnProps & ExtraProps,
unknown
> {
  constructor (props) {
    super(props)
    this.state = {}
  }

  getStyle = (theme: IMThemeVariables): SerializedStyles => {
    const defaultTheme = getBuilderThemeVariables()
    return css`
      width: ${polished.rem(360)};
      z-index: 1001 !important;
      .quick-style-title {
        color: ${defaultTheme.colors?.palette?.dark?.[600]};
        cursor: pointer;
        font-size: ${polished.rem(16)};
        div,
        svg {
          color: ${defaultTheme.colors?.palette?.dark?.[600]};
        }
      }
      .button-item {
        width: 100%;
        font-size: ${polished.rem(13)};
      }
      .quick-style-item-container {
        padding-left: 4px;
        padding-right: 4px;
        padding-bottom: 8px;
      }
      .quick-style-item {
        border: 2px solid transparent;
        &.quick-style-item-selected {
          border: 2px solid ${theme.colors.palette.primary[700]};
        }
        .quick-style-item-inner {
          background-color: ${theme.colors.palette.light[200]};
          cursor: pointer;
        }
      }
    `
  }

  nls = (id: string, values?: any) => {
    return this.props.intl.formatMessage(
      { id: id, defaultMessage: defaultMessages[id] },
      values
    )
  }

  quickStyleComponent = () => {
    const quickStyleComponent = []
    const QuickStyleConfig = getQuickStyleConfig(this.props.theme)
    let index = 0
    for (const key in QuickStyleConfig) {
      index += 1
      const config = QuickStyleConfig[key]
      const { pointStart, pointEnd, themeStyle } = config
      const dividerLineStyle = this?.props?.getDividerLineStyle(config)
      const dividerLinePositionStyle = this?.props?.getDividerLinePositionStyle(
        config
      )
      const pointStartStyle = this?.props?.getPointStyle(config, true)
      const pointEndStyle = this?.props?.getPointStyle(config, false)
      const dividerLineClasses = classNames(
        'divider-line',
        'position-absolute',
        `point-start-${pointStart.pointStyle}`,
        `point-end-${pointEnd.pointStyle}`
      )
      const ele = (
        <div key={key} className='col-6 quick-style-item-container'>
          <div
            className={classNames('quick-style-item', {
              'quick-style-item-selected':
                this.props.selectedType === themeStyle.quickStyleType
            })}
          >
            <Button
              className='quick-style-item-inner p-2 w-100'
              onClick={() => this.onConfirm(config)}
              title={this.nls('quickStyleItem', { index: index })}
            >
              <div className='quick-style-item-inner p-2 position-relative'>
                {pointStart.pointStyle !== PointStyle.None && (
                  <span
                    className='point-start position-absolute'
                    css={pointStartStyle}
                  />
                )}
                <div
                  className={dividerLineClasses}
                  css={[dividerLineStyle, dividerLinePositionStyle]}
                />
                {pointEnd.pointStyle !== PointStyle.None && (
                  <span
                    className='point-end position-absolute'
                    css={pointEndStyle}
                  />
                )}
              </div>
            </Button>
          </div>
        </div>
      )
      quickStyleComponent.push(ele)
    }
    return quickStyleComponent
  }

  onConfirm = config => {
    config.direction = this.props.direction
    this.props.onChange(Immutable(config))
  }

  render () {
    const { isOpen, theme, closeQuickStyle, onInitResizeHandler, onInitDragHandler } = this.props
    return (
      <QuickStylePopper
        reference={this.props.reference}
        open={isOpen}
        placement='right-start'
        css={this.getStyle(theme)}
        trapFocus={false}
        autoFocus={false}
        onClose={() => {
          closeQuickStyle(false)
        }}
        onInitResizeHandler={onInitResizeHandler}
        onInitDragHandler={onInitDragHandler}
      >
        <div className='container-fluid mb-2'>
          <div className='row no-gutters'>{this.quickStyleComponent()}</div>
        </div>
      </QuickStylePopper>
    )
  }
}

export const QuickStyle = injectIntl(_QuickStyle)
