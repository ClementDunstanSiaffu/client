/** @jsx jsx */
import {
  React,
  jsx,
  css,
  CONSTANTS,
  FeatureLayerDataSource,
  ImmutableObject,
  QueryParams,
  DataRecord,
  FeatureDataRecord,
  classNames
} from 'jimu-core'
import { hooks, Loading, LoadingType } from 'jimu-ui'
import { QueryItemType, ListDirection } from '../config'
import { EntityStatusType } from '../common/common-components'
import { QueryResultItem } from './query-result-item'
import { executeQuery, getPopupTemplate } from './query-utils'
import { useAutoHeight } from './useAutoHeight'

const { useRef, useState } = React

export interface LazyListProps {
  widgetId: string
  queryItem: ImmutableObject<QueryItemType>
  outputDS: FeatureLayerDataSource
  resultCount: number
  records: DataRecord[]
  queryParams: QueryParams
  direction: ListDirection
  onRenderDone?: (options: { dataItems: any[] }) => void
}

const getStyle = (isAutoHeight: boolean) => {
  return css`
    display: flex;
    flex: 1 1 ${isAutoHeight ? 'auto' : 0};
    overflow: auto;
    max-height: ${isAutoHeight ? 'calc(61.8vh - 100px)' : 'none'};

    .query-result-item + .query-result-item {
      margin-left: 0.5rem;
      margin-top: 0;
    }

    &.vertical {
      flex-direction: column;
      .list-items {
        position: relative;
        flex-direction: column;
      }

      .feature-info-component {
        width: 100%;
      }

      .query-result-item + .query-result-item {
        margin-left: 0;
        margin-top: 0.5rem;
      }
    }
    .list-items {
      display: flex;
    }
    .lazyload-detector {
      height: 2px;
      width: 2px;
      opacity: 0;
    }
  `
}

export function LazyList (props: LazyListProps) {
  const {
    widgetId,
    outputDS,
    queryParams,
    resultCount,
    records,
    queryItem,
    direction,
    onRenderDone
  } = props
  const [dataItems, setDataItems] = useState(records)
  const [popupTempalte, setPopupTemplate] = useState<any>()
  const [loadStatus, setLoadStatus] = useState<EntityStatusType>(EntityStatusType.Init)
  const dataItemsRef = hooks.useRefValue(dataItems)
  const resultCountRef = hooks.useRefValue(resultCount)
  const loadStatusRef = hooks.useRefValue(loadStatus)
  const allDataItemsLoadedRef = hooks.useRefValue(records?.length === resultCount)
  const pageRef = useRef(0)
  const resultContainerRef = useRef<HTMLDivElement>()
  const queryResultPageSize = outputDS?.getQueryPageSize() ?? CONSTANTS.DEFAULT_QUERY_PAGE_SIZE
  const el = useRef(null)
  const isAutoHeight = useAutoHeight()

  React.useEffect(() => {
    pageRef.current = 1
    resultContainerRef.current.scrollTop = 0
    setDataItems(records)
  }, [records])

  const loadByPages = async () => {
    if (allDataItemsLoadedRef.current || loadStatusRef.current === EntityStatusType.Loading) {
      return
    }
    pageRef.current = pageRef.current + 1
    setLoadStatus(EntityStatusType.Loading)

    const { records } = await executeQuery(widgetId, outputDS, {
      ...queryParams,
      page: pageRef.current,
      pageSize: queryResultPageSize
    })
    if (resultCountRef.current > 0 && dataItemsRef.current.length + records.length >= resultCountRef.current) {
      allDataItemsLoadedRef.current = true
    }
    const updatedItems = dataItemsRef.current.concat(records)
    setDataItems(updatedItems)
    onRenderDone?.({
      dataItems: updatedItems
    })
    setLoadStatus(EntityStatusType.Loaded)
  }

  React.useEffect(() => {
    getPopupTemplate(outputDS, queryItem).then((template) => {
      setPopupTemplate(template)
    })
  }, [outputDS, queryItem])

  hooks.useEffectOnce(() => {
    const elLoadDetector = el?.current
    if (elLoadDetector) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadByPages()
        }
      })
      observer?.observe(elLoadDetector)
      return () => {
        observer?.disconnect()
      }
    }
  })

  return (
    <div className={classNames({ vertical: direction === ListDirection.Vertical })} css={getStyle(isAutoHeight)} ref={resultContainerRef}>
      <div className='list-items px-3'>
        {dataItems?.map((dataItem, x) => (
          <QueryResultItem
            key={dataItem.getId()}
            data={dataItem as FeatureDataRecord}
            dataSource={outputDS}
            widgetId={widgetId}
            popupTemplate={popupTempalte}
          />
        ))}
      </div>
      <div ref={el} className='lazyload-detector'>
        &nbsp;
      </div>
      {loadStatus === EntityStatusType.Loading && <Loading type={LoadingType.Donut} />}
    </div>
  )
}
