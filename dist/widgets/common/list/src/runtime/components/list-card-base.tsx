/** @jsx jsx */
import {
  React,
  css,
  IMThemeVariables,
  RepeatedDataSource,
  AppMode,
  BrowserSizeMode,
  DataRecord,
  polished
} from 'jimu-core'
import { Status, ListLayoutType } from '../../config'

export interface ListCardProps {
  isHover: boolean
  isScrolling: boolean
  theme: IMThemeVariables
  index: number
  widgetId: string
  record: DataRecord
  datasourceId: string
  listStyle: any
  layouts: any
  space: number
  active: boolean
  selectable: boolean
  hoverLayoutOpen: boolean
  browserSizeMode: BrowserSizeMode
  layoutType: ListLayoutType
  formatMessage: (id: string, values?: { [key: string]: any }) => string
  appMode: AppMode
  onChange: (itemRecord: DataRecord) => void
  cardConfigs?: any
  itemIdex: number
  handleListMouseMove: (itemIndex: number) => void
  handleListMouseLeave: () => void
  updateCardToolPosition: () => void
}

export interface ListCardStates {
  [key: string]: any
}

export default class ListCard<
  P extends ListCardProps = ListCardProps,
  S extends ListCardStates = ListCardStates
> extends React.Component<P, S> {
  providerData: RepeatedDataSource

  getNewProviderData = () => {
    const { widgetId, datasourceId, index, record } = this.props
    return {
      widgetId: widgetId,
      dataSourceId: datasourceId,
      recordIndex: index,
      record: record
    }
  }

  shouldComponentUpdateExcept = (
    nextProps,
    nextStats,
    exceptPropKeys: string[],
    exceptStatKeys: string[] = []
  ) => {
    let shouldUpdate = false
    this.props &&
      Object.keys(this.props).some(key => {
        if (exceptPropKeys.includes(key)) return false
        if (this.props[key] !== nextProps[key]) {
          // console.log(`props has changed: ${key}`)
          shouldUpdate = true
          return true
        } else {
          return false
        }
      })
    this.state &&
      Object.keys(this.state).some(key => {
        if (exceptStatKeys.includes(key)) return false
        if (this.state[key] !== nextStats[key]) {
          // console.log(`states has changed: ${key}`)
          shouldUpdate = true
          return true
        } else {
          return false
        }
      })

    return shouldUpdate
  }

  isProviderEqual = (
    providerData: RepeatedDataSource,
    oldProviderData: RepeatedDataSource
  ): boolean => {
    let isEqual = true
    if (providerData) {
      Object.keys(providerData).some(key => {
        if (!oldProviderData) {
          isEqual = false
          return true
        }
        const data = providerData[key]
        const oldData = oldProviderData[key]
        if (data !== oldData) {
          isEqual = false
          return true
        }
        return false
      })
    } else if (oldProviderData) {
      return false
    }

    return isEqual
  }

  formatMessage = (id: string, values?: { [key: string]: any }) => {
    return this.props.formatMessage(id, values)
  }

  checkIsBackgroundTransparent (status: Status): boolean {
    const { cardConfigs } = this.props
    return cardConfigs?.[status]?.backgroundStyle?.background?.color === 'rgba(0,0,0,0)'
  }

  getStyle = (status: Status) => {
    const { widgetId, selectable, appMode, theme } = this.props
    const isBackgroundTransparent = this.checkIsBackgroundTransparent(status)
    return css`
      ${'&.list-card-' + widgetId} {
        padding: 0;
        border: 0;
        background-color: transparent;
        &:focus {
          outline: ${polished.rem(2)} solid ${theme.colors.palette.primary[700]};
          outline-offset: ${polished.rem(2)};
        }
        .list-card-content {
          width: 100%;
          height: 100%;
        }
      }
      &.surface-1 {
        border: none !important;
        background: ${isBackgroundTransparent && 'none !important'};
      }
      .list-clear-background {
        background: transparent !important;
      }
      .list-link {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      }
      .list-item-con {
        overflow: hidden;
      }
      ${'&.list-card-' + widgetId}:hover {
        ${(!window.jimuConfig.isInBuilder || appMode === AppMode.Run) &&
        selectable
          ? 'cursor: pointer;'
          : ''}
      }
      .card-editor-mask {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
      }
      .jimu-link {
        text-align: left;
      }
    `
  }
}
