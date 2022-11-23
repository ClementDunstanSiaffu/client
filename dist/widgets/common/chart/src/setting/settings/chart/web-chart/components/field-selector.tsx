/** @jsx jsx */
import {
  React,
  jsx,
  css,
  Immutable,
  JimuFieldType,
  ImmutableArray,
  UseDataSource,
  IMFieldSchema
} from 'jimu-core'
import { SelectProps } from 'jimu-ui'
import { FieldSelector as JimuFieldSelector } from 'jimu-ui/advanced/data-source-selector'

export type FiledSelectorType = 'numeric' | 'data' | 'category'

const getFieldSelectorType = (type: FiledSelectorType): ImmutableArray<JimuFieldType> => {
  switch (type) {
    case 'numeric':
      return Immutable([JimuFieldType.Number])
    case 'data':
      return Immutable([JimuFieldType.Date])
    case 'category':
      return Immutable([JimuFieldType.String, JimuFieldType.Number])
    default:
  }
}

export interface FieldSelectorProps {
  className?: string
  style?: any
  type: FiledSelectorType
  useDataSources: ImmutableArray<UseDataSource>
  fields?: ImmutableArray<string>
  isMultiple: boolean
  showEmptyItem?: boolean
  disabled?: boolean
  onChange?: (fields: ImmutableArray<string>) => void
}

const serializedStyle = css`
  .component-field-selector {
    .jimu-advanced-select {
      > .dropdown{
        > .dropdown-button {
          justify-content: flex-end;
        }
      }
    }
  }
`

export const FieldSelector = (props: FieldSelectorProps): React.ReactElement => {
  const {
    className,
    style,
    type,
    useDataSources,
    showEmptyItem,
    disabled,
    isMultiple,
    fields: porpFields,
    onChange
  } = props

  const suportedType = React.useMemo(() => getFieldSelectorType(type), [type])

  const noSelectionItem = React.useMemo(() => showEmptyItem ? { name: '' } : undefined, [showEmptyItem])
  const dropdownProps: SelectProps = React.useMemo(() => ({ disabled, size: 'sm' }), [disabled])

  const handleChange = (fieldSchemas: IMFieldSchema[]): void => {
    const fields = fieldSchemas.map(e => e.jimuName)
    onChange?.(Immutable(fields))
  }

  return (
    <JimuFieldSelector
      css={serializedStyle}
      className={className}
      style={style}
      types={suportedType}
      noSelectionItem={noSelectionItem}
      dropdownProps={dropdownProps}
      isMultiple={isMultiple}
      isDataSourceDropDownHidden
      isSearchInputHidden
      useDropdown
      useDataSources={useDataSources}
      selectedFields={porpFields}
      onChange={handleChange}
    />
  )
}
