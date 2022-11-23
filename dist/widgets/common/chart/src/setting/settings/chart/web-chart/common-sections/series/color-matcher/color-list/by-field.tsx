/**@jsx jsx */
import { React, jsx, css, ImmutableObject, Immutable } from 'jimu-core'
import { ColorMatch, ColorMatches } from '../../../../../../../../config'
import { ColorsSelector } from './colors-selector'
import { applyColorMatchColors } from '../utils'
import { ColorItem } from './color-item'

export interface ByFieldColorListProps {
  value: ImmutableObject<ColorMatches>
  onChange?: (value: ImmutableObject<ColorMatches>) => void
  onColorsChange: (colors: string[]) => void
}

const defaultValue = Immutable({}) as ImmutableObject<ColorMatches>

const style = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--dark-800);
  > .color-list {
    width: 100%;
    flex-grow: 1;
    overflow-y: auto;
  }
  > .footer {
    height: 43px;
    width: 100%;
    border-top: 1px solid #6a6a6a;
    > div {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
  }
`

export const ByFieldColorList = (props: ByFieldColorListProps): React.ReactElement => {
  const { value: propValue = defaultValue, onChange, onColorsChange } = props

  const handleChange = (key: string, match: ImmutableObject<ColorMatch>) => {
    const colorMatches = propValue.set(key, match)
    onChange?.(colorMatches)
  }

  const handleColorsChange = (colors: string[]) => {
    onColorsChange?.(colors)
    const colorMatches = applyColorMatchColors(propValue, colors)
    onChange?.(colorMatches)
  }

  return (
    <div className='color-match w-100' css={style}>
      <div className='color-list px-3'>
        {Object.entries(propValue).map(([value, match], index) => {
          return (
            <ColorItem
              key={index}
              deletable={false}
              className='mb-2'
              label={value}
              value={match}
              onChange={(_match) => handleChange(value, _match)}
            />
          )
        })}
      </div>
      <div className='footer'>
        <div className='px-3'>
          <ColorsSelector
            className='my-2 w-100'
            onChange={handleColorsChange}
          ></ColorsSelector>
        </div>
      </div>
    </div>
  )
}
