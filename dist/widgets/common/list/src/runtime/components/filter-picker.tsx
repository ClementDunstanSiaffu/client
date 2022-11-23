/** @jsx jsx */
import {
  React,
  jsx,
  IMSqlExpression,
  DataSource,
  IMThemeVariables,
  polished,
  css,
  AppMode,
  SerializedStyles
} from 'jimu-core'
import { Button, Popper } from 'jimu-ui'
import { SqlExpressionRuntime } from 'jimu-ui/basic/sql-expression-runtime'
import { Fragment } from 'react'
import { WidgetFilterOutlined } from 'jimu-icons/outlined/brand/widget-filter'
import { ResetOutlined } from 'jimu-icons/outlined/editor/reset'
interface Props {
  appMode: AppMode
  filter: IMSqlExpression
  filterInConfig: IMSqlExpression
  selectedDs: DataSource
  widgetId: string
  title: string
  applied: boolean
  handleFilterChange: (sqlExprObj: IMSqlExpression) => void
  handleFilterApplyChange: (apply: boolean) => void
  formatMessage: (id: string, values?: { [key: string]: any }) => string
  theme: IMThemeVariables
}

interface Stats {
  isOpen: boolean
  currentFilter: IMSqlExpression
}

const popperOffset = [0, 5]
const popperModifiers = [
  {
    name: 'flip',
    options: {
      boundary: document.body,
      fallbackPlacements: ['bottom-start', 'right-end', 'top-start', 'left-start']
    }
  }
]
export default class FilterPicker extends React.PureComponent<Props, Stats> {
  toggleRef: React.RefObject<HTMLButtonElement>

  constructor (props) {
    super(props)

    this.toggleRef = React.createRef()
    this.state = {
      isOpen: false,
      currentFilter: props.filter
    }
  }

  componentDidUpdate (preProps: Props) {
    const { filter, appMode } = this.props
    if (filter !== preProps.filter) {
      this.setState({
        currentFilter: filter
      })
    }
    if (appMode !== preProps.appMode) {
      if (appMode === AppMode.Design) {
        this.setState({
          isOpen: false
        })
      }
    }
  }

  formatMessage = (id: string, values?: { [key: string]: any }) => {
    return this.props.formatMessage(id, values)
  }

  onPopperToggle = evt => {
    const { filter } = this.props
    const { isOpen } = this.state
    if (!isOpen) {
      // will open
      this.setState({
        currentFilter: filter
      })
    }
    this.setState({ isOpen: !isOpen })
  }

  onItemClick = (evt, item) => {
    this.setState({ isOpen: false })
    evt.stopPropagation()
    evt.nativeEvent.stopImmediatePropagation()
  }

  handleFilterChange = (sqlExprObj: IMSqlExpression) => {
    this.setState({
      currentFilter: sqlExprObj
    })
  }

  handleApplyClick = evt => {
    const { currentFilter } = this.state
    const { handleFilterApplyChange, handleFilterChange } = this.props
    handleFilterChange(currentFilter)
    handleFilterApplyChange(true)
    this.setState({
      isOpen: false
    })
  }

  handleResetClick = evt => {
    const { handleFilterApplyChange, handleFilterChange } = this.props
    handleFilterApplyChange(false)
    handleFilterChange(this.props.filterInConfig)
    this.setState({
      currentFilter: this.props.filterInConfig
    })
  }

  handleClearClick = evt => {
    const { handleFilterApplyChange } = this.props
    handleFilterApplyChange(false)
    this.setState({
      isOpen: false
    })
  }

  getStyle = (): SerializedStyles => {
    const { theme } = this.props
    return css`
      position: relative;
      .dot {
        position: absolute;
        width: 6px;
        height: 6px;
        right: -2px;
        top: 0px;
        .dot-bottom {
          width: 6px;
          height: 6px;
          background-color: transparent;
          .dot-top {
            width: 4px;
            height: 4px;
            background-color: ${theme.colors.palette.dark[600]};
          }
        }
      }
      :hover {
        .dot-top {
          background-color: ${theme.colors.palette.primary[500]};
        }
      }
      & .active {
        .dot-top {
          background-color: ${theme.colors.white};
        }
        :hover {
          .dot-top {
            background-color: ${theme.colors.white};
          }
        }
      }
    `
  }

  getPopperStyle = () => {
    return css`
      .filter-button-con  {
        & {
          text-align: right;
        }
        button {
          max-width: ${polished.rem(92)};
          overflow: hidden;
          text-overflow: ellipsis;
        }
        button svg {
          margin-right: 0 !important;
        }
        .reset-button {
          padding-left: ${polished.rem(5)};
          padding-right: ${polished.rem(5)};
        }
      }
      .clear-button, .reset-button {
        margin-left: ${polished.rem(8)};
      }
    `
  }

  render () {
    const { filter, selectedDs, widgetId, title, applied } = this.props
    const { isOpen, currentFilter } = this.state
    const isHadApply = applied && filter?.sql === currentFilter?.sql
    return (
      <Fragment>
        <Button
          css={this.getStyle()}
          size='sm'
          type='tertiary'
          icon
          title={title}
          ref={this.toggleRef}
          onClick={this.onPopperToggle}
        >
          <WidgetFilterOutlined size={16}/>
          {applied && (
            <div className='dot align-items-center justify-content-center'>
              <div className='dot-bottom rounded-circle'>
                <div className='dot-top rounded-circle' />
              </div>
            </div>
          )}
        </Button>
        <Popper
          placement='bottom-start'
          reference={this.toggleRef.current}
          offset={popperOffset}
          toggle={this.onPopperToggle}
          css={this.getPopperStyle()}
          open={isOpen}
          modifiers={popperModifiers}
        >
          <div style={{ padding: polished.rem(20), width: polished.rem(250) }}>
            <div>
              <SqlExpressionRuntime
                widgetId={widgetId}
                dataSource={selectedDs}
                expression={currentFilter}
                onChange={this.handleFilterChange}
              />
            </div>
            <div className='w-100 mt-3 filter-button-con'>
              <Button
                disabled={isHadApply}
                onClick={this.handleApplyClick}
                type='primary'
                title={this.formatMessage('apply')}
                size='sm'
              >
                {this.formatMessage('apply')}
              </Button>
              <Button
                disabled={!applied}
                onClick={this.handleClearClick}
                title={this.formatMessage('commonModalCancel')}
                className="clear-button"
                size='sm'
              >
                {this.formatMessage('commonModalCancel')}
              </Button>
              <Button
                onClick={this.handleResetClick}
                title={this.formatMessage('resetFilters')}
                className="reset-button"
                size='sm'
              >
                <ResetOutlined size='s'/>
              </Button>
            </div>
          </div>
        </Popper>
      </Fragment>
    )
  }
}
