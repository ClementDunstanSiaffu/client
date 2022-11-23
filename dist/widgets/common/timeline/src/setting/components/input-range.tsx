/** @jsx jsx */
import { React, jsx, css, lodash, IntlShape, dateUtils } from 'jimu-core'
import { interact } from 'jimu-core/dnd'
import { Tooltip } from 'jimu-ui'
import { DATE_PATTERN, TIME_PATTERN } from '../../utils/utils'
import { bindResizeHandler, getLineInfo } from './utils'

const MODIFIERS = [{
  name: 'offset',
  options: {
    offset: [0, 10]
  }
}]
interface TimeSpanProps {
  theme: any
  width: number
  isRTL: boolean
  intl: IntlShape
  shadowHeight: number
  /**
   * The whole extent of the time span by layers.
   */
  extent: number[]
  /**
   * StartValue of selected range.
   */
  startValue?: number
  /**
   * EndValue of selected range.
   */
  endValue?: number
  onChange: (startValue?: number, endValue?: number) => void
}

const InputRange = function (props: TimeSpanProps) {
  const { width, isRTL, shadowHeight, extent, intl, onChange, ...others } = props
  const { startValue, endValue } = others
  const [range, setRange] = React.useState([startValue, endValue])

  const [interactable, setIteractable] = React.useState(null)
  const resizeRef = React.useRef<HTMLDivElement>(null)
  const startRef = React.useRef<HTMLButtonElement>(null)
  const endRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    const debounceFunc = lodash.debounce(() => {
      if (interactable) {
        interactable.unset()
      }
      if (resizeRef.current) {
        setIteractable(bindResizeHandler(interact, resizeRef.current, range[0], range[1], extent, width, setRange, onChange))
      }
    }, 50)
    debounceFunc()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extent])

  React.useEffect(() => {
    setRange([startValue, endValue])
  }, [startValue, endValue])

  const lineInfo = React.useMemo(() => {
    return getLineInfo(width, extent, range[0], range[1])
  }, [width, extent, range])

  const startLabel = React.useMemo(() => {
    return dateUtils.formatDateLocally(range[0], intl, DATE_PATTERN, TIME_PATTERN)
  }, [intl, range])

  const endLabel = React.useMemo(() => {
    return dateUtils.formatDateLocally(range[1], intl, DATE_PATTERN, TIME_PATTERN)
  }, [intl, range])

  return (
    <React.Fragment>
      <span
        className='range-shadow'
        css={css`
          left: ${isRTL ? 'unset' : lineInfo.marginLeft};
          right: ${isRTL ? lineInfo.marginLeft : 'unset'};
          width: ${lineInfo.width};
          height: ${shadowHeight + 'px'};
        `}
      />
      <div className='layer-line extent-line' style={{ width: width }}>
        <div className='resize-handlers' ref={el => (resizeRef.current = el)} style={lineInfo}>
          <Tooltip placement='bottom' modifiers={MODIFIERS} title={startLabel}>
            <button className='resize-handler resize-left' ref={ref => { startRef.current = ref }} />
          </Tooltip>
          <Tooltip placement='bottom' modifiers={MODIFIERS} title={endLabel}>
            <button className='resize-handler resize-right' ref={ref => { endRef.current = ref }} />
          </Tooltip>
        </div>
      </div>
    </React.Fragment>
  )
}

export default InputRange
