import { React, IMState, ReactRedux, lodash, MessageManager, DataRecordsSelectionChangeMessage, DataSource } from 'jimu-core'
import { hooks } from 'jimu-ui'
import { SelectionData, SelectionSource, WebChartDataItem } from 'jimu-ui/advanced/chart'
import { ObjectIdField } from '../../../../../constants'

const getObjectIdFromDataItem = (item: WebChartDataItem): string => {
  const objectid = ((item as any)?.[ObjectIdField] ?? '') + ''
  return objectid
}

const getDataItemById = (id: string, data: WebChartDataItem[]) => {
  return data?.find(item => {
    const objectid = getObjectIdFromDataItem(item)
    return objectid === id
  })
}
const getSelectedData = (selectedIds: string[], data: WebChartDataItem[]): WebChartDataItem[] => {
  return selectedIds?.map((objectid) => {
    return getDataItemById(objectid, data)
  })?.filter(item => !!item)
}

/**
 * Keep the selection of chart and output data source, publish message when selection changes.
 * @param widgetId
 * @param outputDataSource
 * @param dataItems
 */
const useSelection = (
  widgetId: string,
  outputDataSource: DataSource,
  dataItems: WebChartDataItem[]
): [SelectionData, (...args: any[]) => any] => {
  const selectedIdsRef = React.useRef<string[]>()
  const isByField = !!dataItems?.[0]?.FieldName
  const selectionTriggeredRef = React.useRef<boolean>(false)

  const handleSelectionChange = hooks.useEventCallback((e) => {
    const sourceRecords = outputDataSource?.getSourceRecords()
    if (!sourceRecords?.length) return
    let selectedIds: string[] = e.detail.selectionItems?.map(item => item[ObjectIdField] + '') ?? []

    const selectionSource: SelectionSource = e.detail.selectionSource
    // Only trigger selection change message if selection source is from the user operation
    const selectionByUser =
      selectionSource === SelectionSource.SelectionByClickOrRange ||
      selectionSource === SelectionSource.ClearSelection
    if (!selectionByUser) return

    let selectedRecords = []

    if (!isByField) {
      if (selectedIds?.length) {
        selectedRecords = sourceRecords.filter(record => {
          const id = record.getId()
          return selectedIds.includes(id)
        })
      }
      selectedIdsRef.current = selectedIds
    } else {
      selectionTriggeredRef.current = true
      if (selectedIds?.length) {
        selectedIds = sourceRecords.map(record => record.getId())
        selectedRecords = sourceRecords
      } else {
        selectedIds = []
        selectedRecords = []
      }
    }
    //Publish records selection change message
    MessageManager.getInstance().publishMessage(
      new DataRecordsSelectionChangeMessage(widgetId, selectedRecords)
    )

    outputDataSource.selectRecordsByIds(selectedIds)
  })

  const selectedIds = ReactRedux.useSelector((state: IMState) => state.dataSourcesInfo?.[outputDataSource?.id]?.selectedIds)

  const [selectionItems, setSelectionItems] = React.useState<WebChartDataItem[]>()
  React.useEffect(() => {
    let selectionItems
    if (!isByField) {
      if (!selectedIds) return
      const mutableSelectedRecordIds = selectedIds.asMutable()
      // if the selected ids is same as the current selected ids, just return.
      if (!mutableSelectedRecordIds.length && !selectedIdsRef.current?.length) {
        return
      }
      if (lodash.isDeepEqual(mutableSelectedRecordIds, selectedIdsRef.current)) {
        return
      }
      selectionItems = (mutableSelectedRecordIds?.length && dataItems?.length) ? getSelectedData(mutableSelectedRecordIds, dataItems) : []
    } else {
      if (selectionTriggeredRef.current) {
        selectionTriggeredRef.current = false
        return
      }
      selectionItems = selectedIds?.length ? [...dataItems] : []
    }

    setSelectionItems(selectionItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds])
  const selectionData = React.useMemo(() => selectionItems ? { selectionItems } : undefined, [selectionItems])
  return [selectionData, handleSelectionChange]
}

export default useSelection
