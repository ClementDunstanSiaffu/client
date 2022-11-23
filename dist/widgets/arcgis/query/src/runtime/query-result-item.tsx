/** @jsx jsx */
import {
  React,
  ReactRedux,
  jsx,
  css,
  DataSource,
  FeatureDataRecord,
  MessageManager,
  DataRecordsSelectionChangeMessage,
  IMState,
  classNames
} from 'jimu-core'
import FeatureInfo from './components/feature-info'
import { ListDirection } from '../config'

export interface ResultItemProps {
  widgetId: string
  popupTemplate: any
  data: FeatureDataRecord
  dataSource: DataSource
}

const style = css`
  overflow: auto;
  flex-flow: row;
  cursor: pointer;
  flex-shrink: 0;
  min-height: 2rem;
  &.selected {
    .feature-info-component {
      border-color: var(--primary-500);
      border-width: 2px;
    }
  }
`

export const QueryResultItem = (props: ResultItemProps) => {
  const { widgetId, data, dataSource, popupTemplate } = props
  const selected = ReactRedux.useSelector((state: IMState) =>
    state.dataSourcesInfo?.[dataSource.id]?.selectedIds?.includes(data.getId())
  )
  const isVerticalAlign = ReactRedux.useSelector((state: IMState) => {
    const widgetJson = state.appConfig.widgets[widgetId]
    return widgetJson.config.resultListDirection !== ListDirection.Horizontal
  })

  const handleClickResultItem = React.useCallback(() => {
    const dataItemRecordId = data.getId()
    const nextSelectedDataItems = (dataSource.getSelectedRecordIds() ?? []).includes(dataItemRecordId) ? [] : [data]
    MessageManager.getInstance().publishMessage(new DataRecordsSelectionChangeMessage(widgetId, nextSelectedDataItems))
    dataSource.selectRecordsByIds?.(nextSelectedDataItems.map((item) => item.getId()))
  }, [widgetId, data, dataSource])

  return (
    <div
      className={classNames('query-result-item', { selected })}
      onClick={handleClickResultItem}
      css={style}
      role='option'
      aria-selected={selected}
    >
      <FeatureInfo graphic={data.feature as __esri.Graphic} popupTemplate={popupTemplate} togglable={isVerticalAlign} dataSource={dataSource} />
    </div>
  )
}
