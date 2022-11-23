/** @jsx jsx */
import { React, jsx, css, ImmutableObject, Immutable, OrderByOption, Expression } from 'jimu-core'
import { hooks, TextInput, TextArea, Select, Button, Popper, getFallbackPlacementsModifier } from 'jimu-ui'
import { Sort } from 'jimu-ui/advanced/sql-expression-builder'
import { SettingRow, SettingCollapse } from 'jimu-ui/advanced/setting-components'
import { ExpressionBuilderType, ExpressionBuilder } from 'jimu-ui/advanced/expression-builder'
import defaultMessages from './translations/default'
import { QueryItemType, FieldsType } from '../config'
import { DEFAULT_QUERY_ITEM } from '../default-query-item'
import { ResultsFieldSetting } from './results-field'
import { DataOutlined } from 'jimu-icons/outlined/data/data'

interface Props {
  widgetId: string
  queryItem: ImmutableObject<QueryItemType>
  onPropertyChanged: (prop: string, value: any, dsUpdateRequired?: boolean) => void
  onQueryItemChanged: (queryItem: ImmutableObject<QueryItemType>, dsUpdateRequired?: boolean) => void
}

const MODIFIERS = [
  {
    name: 'preventOverflow',
    options: {
      altAxis: true
    }
  },
  getFallbackPlacementsModifier(['left-start', 'left-end'], true)
]

export function ResultsSetting (props: Props) {
  const { widgetId, queryItem, onQueryItemChanged, onPropertyChanged } = props
  const [showContent, setShowContent] = React.useState(false)
  const [showExpressionBuilder, setShowExpressionBuilder] = React.useState(false)
  const expressionBuilderRef = React.useRef()
  const editorRef = React.useRef<HTMLInputElement>()
  const getI18nMessage = hooks.useTranslate(defaultMessages)
  const [expression, setExpression] = React.useState(queryItem.resultTitleExpression)
  const currentItem = Object.assign({}, DEFAULT_QUERY_ITEM, queryItem)

  const show = React.useCallback(() => {
    setShowContent(true)
  }, [setShowContent])

  const hide = React.useCallback(() => {
    setShowContent(false)
  }, [setShowContent])

  const toggleExpressionBuilder = React.useCallback(() => {
    if (!showExpressionBuilder && editorRef.current) {
      editorRef.current?.focus()
    }
    setShowExpressionBuilder(!showExpressionBuilder)
  }, [showExpressionBuilder])

  const handleLabelChanged = (prop: string, value: string, defaultValue: string) => {
    if (value === defaultValue) {
      onPropertyChanged(prop, null)
    } else {
      onPropertyChanged(prop, value)
    }
  }

  const onQueryParamChange = (sortData: OrderByOption[]) => {
    const { dataSourceId, mainDataSourceId, dataViewId, rootDataSourceId } = queryItem.useDataSource

    const nextUseDataSource = {
      dataSourceId,
      mainDataSourceId,
      dataViewId,
      rootDataSourceId,
      fields: queryItem.useDataSource.fields
    }
    let newItem = queryItem.set('sortOptions', sortData)
    newItem = newItem.set('useDataSource', nextUseDataSource)
    onQueryItemChanged(newItem, true)
  }

  const handleTextChange = hooks.useEventCallback((e) => {
    setExpression(e.target.value)
  })

  const handleTextAccepted = hooks.useEventCallback((value) => {
    onPropertyChanged('resultTitleExpression', value)
  })

  const handleExpressionChange = hooks.useEventCallback((exp: Expression) => {
    if (exp.parts.length > 0) {
      if (expression != null) {
        setExpression(`${expression} {${exp.parts[0].jimuFieldName}}`)
      } else {
        setExpression(`{${exp.parts[0].jimuFieldName}}`)
      }
      editorRef.current?.focus()
    }
  })

  return (
    <SettingCollapse
      role='group'
      aria-label={getI18nMessage('results')}
      label={getI18nMessage('results')}
      className='p-3'
      isOpen={showContent}
      onRequestOpen={show}
      onRequestClose={hide}
    >
      <SettingRow flow='wrap' label={getI18nMessage('label')}>
        <TextInput
          aria-label={getI18nMessage('label')}
          className='w-100'
          size='sm'
          value={currentItem.resultsLabel ?? getI18nMessage('results')}
          onChange={(e) => handleLabelChanged('resultsLabel', e.target.value, getI18nMessage('results'))}
        />
      </SettingRow>
      <SettingRow flow='wrap' label={getI18nMessage('chooseMode')}>
        <Select
          aria-label={getI18nMessage('chooseMode')}
          className='w-100'
          size='sm'
          value={currentItem.resultFieldsType}
          onChange={(e) => {
            onPropertyChanged('resultFieldsType', e.target.value, true)
          }}
        >
          <option value={FieldsType.PopupSetting}>{getI18nMessage('field_PopupSetting')}</option>
          <option value={FieldsType.SelectAttributes}>{getI18nMessage('field_SelectAttributes')}</option>
        </Select>
      </SettingRow>
      {currentItem.resultFieldsType === FieldsType.SelectAttributes && (
        <SettingRow flow='wrap' label={getI18nMessage('configTitle')}>
          <TextArea
            aria-label={getI18nMessage('configTitle')}
            className='mt-2 w-100'
            css={css`background-color: var(--light-200);height: 80px;z-index: 1;`}
            onChange={handleTextChange}
            onAcceptValue={handleTextAccepted}
            spellCheck={false}
            value={expression}
            ref={editorRef}
          />
          <div className='w-100' css={css`height: 32px; background-color: var(--light-200);`}>
            <Button
              aria-label={getI18nMessage('configTitle')}
              ref={expressionBuilderRef}
              onClick={toggleExpressionBuilder}
              type='tertiary'
              icon
            >
              <DataOutlined size='s'/>
            </Button>
          </div>
          <Popper
            open={showExpressionBuilder}
            disableResize
            placement='left-start'
            reference={expressionBuilderRef.current}
            modifiers={MODIFIERS}
            showArrow
            toggle={toggleExpressionBuilder}
            trapFocus={false}
            autoFocus={false}
          >
            <div css={css`
              width: 240px;
              height: 360px;
              .component-main-data-and-view {
                display: none;
              }
              .field-list {
                height: calc(100% - 60px) !important;
              }
            `}>
              <ExpressionBuilder
                widgetId={widgetId}
                types={Immutable([ExpressionBuilderType.Attribute])}
                useDataSources={Immutable([queryItem.useDataSource]) as any}
                expression={null}
                onChange={handleExpressionChange}
              />
            </div>
          </Popper>
        </SettingRow>
      )}
      {currentItem.resultFieldsType === FieldsType.SelectAttributes && (
        <ResultsFieldSetting
          useDataSource={queryItem.useDataSource as any}
          label={getI18nMessage('configFields')}
          selectedFields={queryItem.resultDisplayFields as any}
          onFieldsChanged={(fields: string[]) => onPropertyChanged('resultDisplayFields', fields, true)}
        />
      )}
      <SettingRow role='group' aria-label={getI18nMessage('sortRecords')} flow='wrap' label={getI18nMessage('sortRecords')} css={css`.no-sort-remind {margin-top: 0 !important;}`}>
        <Sort
          onChange={(sortData) => onQueryParamChange(sortData)}
          value={Immutable(currentItem.sortOptions)}
          useDataSource={currentItem.useDataSource}
        />
      </SettingRow>
    </SettingCollapse>
  )
}
