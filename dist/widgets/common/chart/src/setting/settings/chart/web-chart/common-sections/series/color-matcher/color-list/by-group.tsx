/**@jsx jsx */
import { React, jsx, css, ImmutableObject, Immutable } from 'jimu-core'
import { ColorMatch, ColorMatches } from '../../../../../../../../config'
import { ColorsSelector } from './colors-selector'
import { applyColorMatchColors, getColorMatch } from '../utils'
import { ColorAdder } from './color-adder'
import { ColorItem } from './color-item'
import { hooks, Loading, LoadingType, ValidityResult } from 'jimu-ui'
import { ISimpleFillSymbol } from '@esri/arcgis-rest-types'
import { ByFieldColorListProps } from './by-field'
import defaultMessages from '../../../../../../../translations/default'
import { ColorLoader } from './color-loader'

export interface ByGroupColorListProps extends ByFieldColorListProps {
  loading?: boolean
  loadable?: boolean
  loadColorMatches?: (count: number) => Promise<{ value: ImmutableObject<ColorMatches>, loadout: boolean, exceed: boolean }>
  value: ImmutableObject<ColorMatches>
  colors: string[]
  other?: ImmutableObject<ISimpleFillSymbol>
  onOtherChange: (value: ImmutableObject<ISimpleFillSymbol>) => void
}

const defaultValue = Immutable({}) as ImmutableObject<ColorMatches>

const style = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  color: var(--dark-800);
  > .body {
    width: 100%;
    height: calc(100% - 43px);
    > .color-list {
      width: 100%;
      max-height: 85%;
      overflow-y: auto;
      .color-other-item {
        width: 88%;
      }
   }
  }
  > .footer {
    height: 43px;
    width: 100%;
    border-top: 1px solid #6a6a6a;
    > div {
      display: flex;
      width: 100%;
      justify-content: space-between;
      .colors-selector {
        width: 80%;
      }
    }
  }
`
export const ByGroupColorList = (props: ByGroupColorListProps): React.ReactElement => {
  const {
    loading,
    value: propValue = defaultValue,
    other,
    colors,
    onChange,
    loadColorMatches,
    onOtherChange,
    onColorsChange
  } = props

  const translate = hooks.useTranslate(defaultMessages)
  const listCount = Object.keys(propValue).length
  const ref = React.useRef<HTMLDivElement>(null)
  const unmountRef = React.useRef<boolean>(false)
  hooks.useUnmount(() => { unmountRef.current = true })

  const undefinedColorMatch = React.useMemo(() => {
    return Immutable({
      label: translate('undefined'),
      _fillColor: other?.color
    })
  }, [other?.color, translate])

  const handleChange = (key: string, match: ImmutableObject<ColorMatch>) => {
    const colorMatches = propValue.set(key, match)
    onChange?.(colorMatches)
  }

  const handleColorsChange = (colors: string[]) => {
    onColorsChange?.(colors)
    const colorMatches = applyColorMatchColors(propValue, colors)
    onChange?.(colorMatches)
  }

  const validity = React.useCallback(
    (text): ValidityResult => {
      text = text.trim()
      if (!text) {
        return {
          valid: false,
          msg: translate('categoryEmpty')
        }
      } else if (propValue?.[text]) {
        return {
          valid: false,
          msg: translate('categoryExist')
        }
      }
      return { valid: true }
    },
    [propValue, translate]
  )

  const handleColorAdded = (key: string) => {
    if (!key) return
    const index = Object.keys(propValue).length
    const colorMatch = getColorMatch(index, colors)
    const colorMatches = propValue.set(key, colorMatch)
    onChange?.(colorMatches)
  }

  const handleDelete = (key: string) => {
    const colorMatches = propValue.without(key)
    onChange?.(colorMatches)
  }

  const handleOtherChange = (value: ImmutableObject<ColorMatch>) => {
    const color = value?._fillColor
    const symbol = other?.set('color', color)
    onOtherChange?.(symbol)
  }

  React.useEffect(() => {
    const nodes = ref.current.querySelectorAll('.color-item')
    const node = nodes[listCount - 2]
    node?.scrollIntoView()
  }, [listCount])

  return (
    <div className='color-match' css={style}>
      <div className='body'>
        <div className='color-list px-3' ref={ref}>
          {Object.entries(propValue).map(([value, match], index) => {
            return (
              <ColorItem
                key={index}
                deletable={true}
                className='mb-2'
                label={value}
                value={match}
                onChange={(_match) => handleChange(value, _match)}
                onDelete={() => handleDelete(value)}
              />
            )
          })}
          <ColorItem
            className='mb-2 color-other-item'
            label={undefinedColorMatch.label}
            value={undefinedColorMatch}
            deletable={false}
            onChange={handleOtherChange}
          />
        </div>
        <ColorAdder
          className='px-3'
          validity={validity}
          onChange={handleColorAdded}
        />
      </div>

      <div className='footer'>
        <div className='px-3'>
          <ColorLoader className='my-2' loadColorMatches={loadColorMatches} onChange={onChange}></ColorLoader>
          <ColorsSelector className='my-2' onChange={handleColorsChange} />
        </div>
      </div>
      {loading && <Loading type={LoadingType.Secondary} />}
    </div>
  )
}
