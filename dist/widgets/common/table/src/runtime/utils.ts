import {
  DataSource,
  dataSourceUtils,
  ThemeVariables,
  SerializedStyles,
  css,
  ClauseOperator,
  ClauseLogic
} from 'jimu-core'
import { FeatureDataRecord, FeatureLayerDataSource } from 'jimu-arcgis'
import { LayersConfig, Suggestion } from '../config'
// Due to API limitations, the icon color of the drop-down menu requires special treatment
import showSelectedOnlyIcon from 'jimu-icons/svg/outlined/editor/show-selection.svg'
import showSelectedIconRTL from 'jimu-icons/svg/outlined/editor/show-selection--rtl.svg'
import showAllIcon from 'jimu-icons/svg/outlined/editor/menu.svg'
import uncheckAllIcon from 'jimu-icons/svg/outlined/editor/trash-check.svg'
import resetIcon from 'jimu-icons/svg/outlined/editor/refresh.svg'
import showHideIcon from 'jimu-icons/svg/outlined/editor/list-visible.svg'
import showSelectedOnlyWhiteIcon from 'jimu-ui/lib/icons/show-selected-only-white.svg'
import showSelectedWhiteIconRTL from 'jimu-ui/lib/icons/show-selected-only-rtl-white.svg'
import showAllWhiteIcon from 'jimu-ui/lib/icons/show-all-white.svg'
import uncheckAllWhiteIcon from 'jimu-ui/lib/icons/uncheck-all-white.svg'
import resetWhiteIcon from 'jimu-ui/lib/icons/reset-white.svg'
import showHideWhiteIcon from 'jimu-ui/lib/icons/show-hide-cols-white.svg'

async function queryRecords (q: any, ds: DataSource): Promise<FeatureDataRecord[]> {
  if (!ds) return await Promise.resolve([])
  return await (ds as FeatureLayerDataSource)
    .query(q)
    .then(async queryResult => await queryRecordsResult(q, queryResult))
}

async function queryRecordsResult (q, queryResult): Promise<FeatureDataRecord[]> {
  return await Promise.resolve(queryResult?.records || [])
}

function getSuggestionItem (suggestion: string, searchText: string): string {
  if (!searchText) return suggestion
  const replaceReg = new RegExp(`(${searchText})`, 'gi')
  return suggestion.replace(replaceReg, '<strong >$1</strong>')
}

function uniqueJson (jsonArr, key) {
  const result = jsonArr[0] ? [jsonArr[0]] : []
  for (let i = 1; i < jsonArr.length; i++) {
    const item = jsonArr[i]
    let repeat = false
    for (let j = 0; j < result.length; j++) {
      if (item[key] === result[j][key]) {
        repeat = true
        break
      }
    }
    if (!repeat) {
      result.push(item)
    }
  }
  return result
}

export async function fetchSuggestionRecords (
  searchText: string,
  config: LayersConfig,
  datasource: DataSource
): Promise<Suggestion[]> {
  const searchFields = config.searchFields.split(',')
  const queryParams: any = {
    page: 1,
    pageSize: 10,
    outFields: searchFields,
    returnDistinctValues: true
  }

  if (config.enableSearch && config.searchFields) {
    const SQL = getQuerySQL(searchText, config, datasource)?.sql
    queryParams.where = SQL
  }
  const searchReg = new RegExp(`(${searchText})`, 'gi')
  return queryRecords(queryParams, datasource).then(async records => {
    let searchSuggestion = []
    searchFields.forEach(attrName => {
      records.forEach(el => {
        const suggestionItem = el?.feature?.attributes[attrName]
        if (
          suggestionItem &&
          !searchSuggestion.includes(suggestionItem) &&
          suggestionItem.match(searchReg)
        ) {
          const suggestion: Suggestion = {
            suggestionHtml: getSuggestionItem(suggestionItem, searchText),
            suggestion: suggestionItem
          }
          searchSuggestion.push(suggestion)
        }
      })
    })
    searchSuggestion = uniqueJson(searchSuggestion, 'suggestion')
    return Promise.resolve(searchSuggestion)
  })
}

export function minusArray (array1, array2, key?: string) {
  const keyField = key || 'jimuName'
  const lengthFlag = array1.length > array2.length
  const arr1 = lengthFlag ? array1 : array2
  const arr2 = lengthFlag ? array2 : array1
  return arr1.filter(item => {
    const hasField = arr2.some(ele => {
      return ele?.[keyField] === item?.[keyField]
    })
    return !hasField
  })
}

export function getQuerySQL (
  searchText: string,
  curLayer: LayersConfig,
  datasource: DataSource
) {
  const searchFields = curLayer.searchFields.split(',')
  const clauseOperator = curLayer.searchExact ? ClauseOperator.StringOperatorIs : ClauseOperator.StringOperatorContains
  if (curLayer.searchFields) {
    const clauses = searchFields.map(field => {
      return dataSourceUtils.createSQLClause(field, clauseOperator, searchText)
    })
    const sqlExpression = dataSourceUtils.createSQLExpression(ClauseLogic.Or, clauses)
    return dataSourceUtils.getArcGISSQL(sqlExpression, datasource)
  }
}

export function getGlobalTableTools (theme: ThemeVariables, isRTL: boolean): SerializedStyles {
  const darkTheme = theme?.darkTheme
  const selectionIcon = darkTheme
    ? (isRTL ? showSelectedWhiteIconRTL : showSelectedOnlyWhiteIcon)
    : (isRTL ? showSelectedIconRTL : showSelectedOnlyIcon)
  return css`
    .widget-table-tool-icon-show-selection{
      background: url('data:image/svg+xml;utf8,${encodeURIComponent(
        selectionIcon
      )}') no-repeat center;
      background-size: 100%;
      width: 16px;
      height: 16px;
    }
    .widget-table-tool-icon-show-all{
      background: url('data:image/svg+xml;utf8,${encodeURIComponent(
        darkTheme ? showAllWhiteIcon : showAllIcon
      )}') no-repeat center;
      background-size: 100%;
      width: 16px;
      height: 16px;
    }
    .widget-table-tool-icon-selection-clear{
      background: url('data:image/svg+xml;utf8,${encodeURIComponent(
        darkTheme ? uncheckAllWhiteIcon : uncheckAllIcon
      )}') no-repeat center;
      background-size: 100%;
      width: 16px;
      height: 16px;
    }
    .widget-table-tool-icon-refresh{
      background: url('data:image/svg+xml;utf8,${encodeURIComponent(
        darkTheme ? resetWhiteIcon : resetIcon
      )}') no-repeat center;
      background-size: 100%;
      width: 16px;
      height: 16px;
    }
    .widget-table-tool-icon-show-hide-cols{
      background: url('data:image/svg+xml;utf8,${encodeURIComponent(
        darkTheme ? showHideWhiteIcon : showHideIcon
      )}') no-repeat center;
      background-size: 100%;
      width: 16px;
      height: 16px;
    }
    .esri-button-menu__item .esri-button-menu__item-label{
      padding: 4px 15px !important;
    }
    .table-popup-search{
      .search-icon{
        z-index: 2;
      }
      .popup-search-input{
        border: 1px solid ${theme.colors.palette.light[400]};
        border-radius: 2px;
        .input-wrapper{
          height: 30px;
          border: none;
        }
      }
    }
    .table-action-option{
      width: 100%;
      display: inline-flex;
      flex-direction: row;
      .table-action-option-tab{
        margin: auto 8px;
      }
      .table-action-option-close{
        flex: 1;
        button{
          :hover {
            color: ${theme.colors.white};
          }
          float: right;
        }
      }
    }
    .esri-popover--open{
      z-index: 1005 !important;
      .esri-date-picker__calendar{
        background-color: ${theme.colors.white};
      }
    }
    .jimu-dropdown-menu{
      z-index: 1006 !important;
    }
  `
}
