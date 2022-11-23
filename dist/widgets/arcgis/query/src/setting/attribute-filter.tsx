/** @jsx jsx */
import {
  React,
  jsx,
  css,
  ImmutableObject,
  DataSourceComponent,
  dataSourceUtils,
  IMSqlExpression,
  DataViewJson,
  Immutable
} from 'jimu-core'
import { hooks, TextInput, TextArea, Switch, Collapse, Button } from 'jimu-ui'
import { SqlExpressionBuilderPopup } from 'jimu-ui/advanced/sql-expression-builder'
import { getJimuFieldNamesBySqlExpression } from 'jimu-ui/basic/sql-expression-runtime'
import { SettingRow, SettingSection } from 'jimu-ui/advanced/setting-components'
import defaultMessages from './translations/default'
import { QueryItemType } from '../config'
import { DEFAULT_QUERY_ITEM } from '../default-query-item'

interface Props {
  queryItem: ImmutableObject<QueryItemType>
  onPropertyChanged: (prop: string, value: any, dsUpdateRequired?: boolean) => void
  onQueryItemChanged: (queryItem: ImmutableObject<QueryItemType>, dsUpdateRequired?: boolean) => void
}

export function AttributeFilterSetting (props: Props) {
  const { queryItem, onQueryItemChanged, onPropertyChanged } = props
  const [popperVisible, setPopperVisible] = React.useState(false)
  const getI18nMessage = hooks.useTranslate(defaultMessages)

  // fill the queryItem with default values
  const currentItem = Object.assign({}, DEFAULT_QUERY_ITEM, queryItem)
  const enabled = currentItem.useAttributeFilter
  const dataSourceIdAvailable = currentItem.useDataSource?.dataSourceId != null

  const showPopper = React.useCallback(() => {
    setPopperVisible(true)
  }, [setPopperVisible])

  const hidePopper = React.useCallback(() => {
    setPopperVisible(false)
  }, [setPopperVisible])

  const handleLabelChanged = (prop: string, value: string, defaultValue: string) => {
    if (value === defaultValue) {
      onPropertyChanged(prop, null)
    } else {
      onPropertyChanged(prop, value)
    }
  }

  const handleSqlExpressionChanged = (sqlExprObj: IMSqlExpression) => {
    const { dataSourceId, mainDataSourceId, dataViewId, rootDataSourceId } = queryItem.useDataSource
    const queryParams: Partial<DataViewJson> = {}

    const nextSqlExprObj = sqlExprObj?.parts?.length > 0 ? sqlExprObj : null
    queryParams.where = sqlExprObj?.sql ? sqlExprObj as any : undefined
    let newItem = queryItem.set('sqlExprObj', nextSqlExprObj)
    const fields = getJimuFieldNamesBySqlExpression(Immutable(nextSqlExprObj))

    const nextUseDataSource = {
      dataSourceId,
      mainDataSourceId,
      dataViewId,
      rootDataSourceId,
      fields
    }
    newItem = newItem.set('useDataSource', nextUseDataSource)
    onQueryItemChanged(newItem, true)
  }

  const titleCompoent = (
    <div className='d-flex'>
      <div>{getI18nMessage('attributeFilter')}</div>
      <div className='ml-auto'>
        <Switch aria-label={getI18nMessage('attributeFilter')} checked={enabled} onChange={(e) => onPropertyChanged('useAttributeFilter', e.target.checked)} />
      </div>
    </div>
  )
  return (
    <SettingSection role='group' aria-label={getI18nMessage('attributeFilter')} title={titleCompoent}>
      <Collapse isOpen={enabled}>
        <SettingRow flow='wrap' label={getI18nMessage('label')}>
          <TextInput
            aria-label={getI18nMessage('label')}
            className='w-100'
            size='sm'
            defaultValue={currentItem.attributeFilterLabel ?? getI18nMessage('attributeFilter')}
            onAcceptValue={(value) =>
              handleLabelChanged('attributeFilterLabel', value, getI18nMessage('attributeFilter'))
            }
          />
        </SettingRow>
        <SettingRow flow='wrap' truncateLabel label={getI18nMessage('addSQLExpressionsToYourQuery')}>
          <Button
            className='w-100 text-dark set-link-btn'
            type={dataSourceIdAvailable ? 'primary' : 'secondary'}
            disabled={!dataSourceIdAvailable}
            onClick={showPopper}
          >
            {getI18nMessage('builderName')}
          </Button>
        </SettingRow>
        <SettingRow>
          <TextArea
            css={css`
              height: 80px;
              flex: 1;
            `}
            value={currentItem.sqlExprObj?.displaySQL ?? ''}
            spellCheck={false}
            readOnly
            onClick={(e) => e.currentTarget.select()}
            placeholder={getI18nMessage('pleaseAddYourSQLExpressionsFirst')}
          />
        </SettingRow>
        <SettingRow label={getI18nMessage('description')} flow='wrap'>
          <TextArea
            aria-label={getI18nMessage('description')}
            css={css`height: 80px;`}
            value={currentItem.attributeFilterDesc}
            placeholder={getI18nMessage('describeTheFilter')}
            onAcceptValue={(value) => onPropertyChanged('attributeFilterDesc', value)}
          />
        </SettingRow>
      </Collapse>
      <DataSourceComponent useDataSource={currentItem.useDataSource}>
        {(ds) => {
          // check if timezone is changed
          if (currentItem.sqlExprObj) {
            const sqlResult = dataSourceUtils.getArcGISSQL(currentItem.sqlExprObj, ds)
            if (sqlResult.displaySQL !== currentItem.sqlExprObj.displaySQL) {
              handleSqlExpressionChanged(Object.assign({}, currentItem.sqlExprObj, sqlResult) as any)
            }
          }
          return (
            <SqlExpressionBuilderPopup
              dataSource={ds}
              isOpen={popperVisible}
              toggle={hidePopper}
              expression={currentItem.sqlExprObj}
              onChange={(expr) => handleSqlExpressionChanged(expr)}
            />
          )
        }}
      </DataSourceComponent>
    </SettingSection>
  )
}
