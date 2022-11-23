/** @jsx jsx */
import { React, css, jsx, IMThemeVariables, polished } from 'jimu-core'
import { PointStyle } from '../../config'
import { TextInput, Slider } from 'jimu-ui'
export interface Props {
  value?: number
  onChange?: (value: number) => void
  className?: string
  theme: IMThemeVariables
  pointStyle: PointStyle
  intl: (key: string) => string
}

interface State {
  value: number
}

const STEP = 1
const MIN = 0
const MAX = 100
const AMOUNT = MAX / STEP - 1
const MINRATIO = 3 //Minimum 3 times the width of the line
const MAXRATIO = 5 //Maximum to 3 times the width of the line
export class RangeInput extends React.PureComponent<Props, State> {
  updateConfigTimeout: any
  preRangeValue: number
  constructor (props) {
    super(props)
    this.state = {
      value: props?.value || 0
    }
  }

  componentWillUnmount () {
    clearTimeout(this.updateConfigTimeout)
  }

  getStyle = () => {
    const { theme } = this.props
    return css`
      .scale-con {
        & {
          width: 100%;
          top: ${polished.rem(-2)};
        }
        span {
          height: ${polished.rem(3)};
          width: 1px;
          background: ${theme?.colors?.palette?.light[800]};
        }
      }
      .range-number-inp {
        width: ${polished.rem(46)};
      }
    `
  }

  getScale = () => {
    const scaleData = []
    for (let i = 0; i < AMOUNT; i++) {
      scaleData.push(
        <span
          className='position-absolute'
          key={i}
          style={{ left: `${(i + 1) * STEP}%` }}
        />
      )
    }
    return (
      <div className='scale-con position-absolute left-0 right-0'>
        {scaleData}
      </div>
    )
  }

  onChange = (e) => {
    const val = e.target.value
    if (!this.checkNumber(val) || val === this.preRangeValue) return false
    if (Number(val) < 0 || Number(val) > 100) return false
    const value = val / 100
    const pointSize = value * (MAXRATIO - MINRATIO) + MINRATIO
    this.setState({
      value: pointSize
    })
    this.preRangeValue = val
    clearTimeout(this.updateConfigTimeout)
    this.updateConfigTimeout = setTimeout(() => {
      this?.props?.onChange(pointSize)
    }, 100)
  }

  getRangeValue = () => {
    const { value } = this.props
    const rangeValue = ((value - MINRATIO) * 100) / (MAXRATIO - MINRATIO)
    return rangeValue > 0 ? rangeValue : 0
  }

  checkNumber = (value, minimum: number = 0): boolean => {
    if (value?.length === 0) return true
    if (isNaN(Number(value))) {
      return false
    } else {
      const numberVal = Number(value)
      return Number.isInteger(numberVal) && numberVal >= minimum
    }
  }

  render () {
    const { pointStyle, intl } = this.props
    const rangeValue = this.getRangeValue()
    return (
      <div className='range-input w-100 position-relative d-flex align-items-center' css={this.getStyle()}>
        {/* {this.getScale()} */}
        <div className='flex-grow-1'>
          <Slider
            title={intl('dividerSize')}
            disabled={pointStyle === PointStyle.None}
            value={rangeValue}
            min={MIN}
            max={MAX}
            step={STEP}
            aria-valuemin={MIN}
            aria-valuemax={MAX}
            aria-valuenow={rangeValue}
            className='slider mr-2'
            onChange={this.onChange}
          />
        </div>
        <TextInput
          size='sm'
          className='ml-3 range-number-inp'
          value={rangeValue.toFixed()}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
