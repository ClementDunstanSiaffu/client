/** @jsx jsx */
import {
  React, jsx, classNames, useIntl, dateUtils, defaultMessages as jimuCoreMessages, //, lodash
  ReactRedux,
  IMState,
  AppMode,
  lodash,
  getAppStore
} from 'jimu-core'
import {
  Button, Dropdown, DropdownButton, DropdownMenu, DropdownItem, defaultMessages as jimuUIMessages, Tooltip, hooks, Icon, Popper, Switch, Label
} from 'jimu-ui'
import { DateTimeUnits, DateUnitInputValue } from 'jimu-ui/advanced/style-setting-components'
import {
  getValueTickPairs, getStepEndTimeForTarget, bindResizeHandler, resizeHandlerProps,
  getValueTickInfoForYear, getValueTickInfoForMonth, getValueTickInfoForDay, getValueTickInfoForHour, getValueTickInfoForMinute,
  getTickSizes, getWidthByZoomLevel, getMaxWidthAndZoomLevel, getMultipleByZoomLevel
} from './utils'
import { interact } from 'jimu-core/dnd'

import defaultMessages from './../translations/default'

import { PlusCircleOutlined } from 'jimu-icons/outlined/editor/plus-circle'
import { MinusCircleOutlined } from 'jimu-icons/outlined/editor/minus-circle'
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { PlayOutlined } from 'jimu-icons/outlined/editor/play'
import { PauseOutlined } from 'jimu-icons/outlined/editor/pause'
import { PreviousOutlined } from 'jimu-icons/outlined/editor/previous'
import { NextOutlined } from 'jimu-icons/outlined/editor/next'
import { SpeedOutlined } from 'jimu-icons/outlined/application/speed'
import { TimeSpeed, TimeStyle } from '../../config'
import { getTimelineStyles } from './style'
import { DATE_PATTERN, SPEED_VALUE_PAIR, TIME_PATTERN } from '../../utils/utils'

const arrowIcon = require('./assets/icons/arrow.svg')
const allDefaultMessages = Object.assign({}, defaultMessages, jimuCoreMessages, jimuUIMessages)

/**
 * Timeline Props
 */
export interface TimelineProps {
  width?: number
  height?: number
  applied?: boolean
  timeStyle?: TimeStyle
  foregroundColor?: any
  backgroundColor?: any
  sliderColor?: any
  theme?: any

  startTime: number
  endTime: number
  accuracy?: DateTimeUnits
  stepLength?: DateUnitInputValue
  dividedCount?: number
  cumulatively?: boolean
  enablePlayControl?: boolean
  speed?: TimeSpeed
  autoPlay?: boolean
  updating?: boolean

  onTimeChanged?: (startTime: number, endTime: number) => void
  onApplyStateChanged?: (applied: boolean) => void
}

function TimeLine (props: TimelineProps) {
  const {
    width: _width,
    height: _height,
    applied,
    timeStyle = TimeStyle.Classic, foregroundColor, backgroundColor, sliderColor, theme,
    startTime, endTime, accuracy = 'year', stepLength, dividedCount, cumulatively = false,
    enablePlayControl = false, speed: _speed = TimeSpeed.Medium, autoPlay: _autoPlay, updating = false, onTimeChanged, onApplyStateChanged
  } = props

  const [width, setWidth] = React.useState(_width) // the width of the visible ruler
  const [height, setHeight] = React.useState(_height)
  React.useEffect(() => {
    setWidth(_width - (timeStyle === TimeStyle.Classic ? 64 : 80))
    setHeight(timeStyle === TimeStyle.Classic ? 52 : 80)
  }, [_width, _height, timeStyle])

  const [zoomLevel, setZoomLevel] = React.useState(0)
  const [maxWidthAndZoomLevel, setMaxWidthAndZoomLevel] = React.useState(null)

  const intl = useIntl()
  const messages = useFormatMessage()
  const speedItems = React.useMemo(() => [
    { value: TimeSpeed.Slowest, label: messages('slowest') },
    { value: TimeSpeed.Slow, label: messages('slow') },
    { value: TimeSpeed.Medium, label: messages('medium') },
    { value: TimeSpeed.Fast, label: messages('fast') },
    { value: TimeSpeed.Fastest, label: messages('fastest') }
  ]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [])

  const [speed, setSpeed] = React.useState(_speed)
  React.useEffect(() => {
    setSpeed(_speed)
  }, [_speed])

  const marginForLR = 7

  const [autoPlay, setAutoPlay] = React.useState(_autoPlay || false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const containerDragPos = React.useRef(null)

  const [tsDetails, setTsDetails] = React.useState(null)

  // The start position of the whole timeslider on current container.
  const [leftPosition, setLeftPosition] = React.useState(0) // update when zoomLevel is changed, or timeline is dragged.
  const [startTimeForStep, setStartTimeForStep] = React.useState(startTime)
  const [endTimeForStep, setEndTimeForStep] = React.useState(null)
  const [endTimeForTempStep, setEndTimeForTempStep] = React.useState(null) // only for last step

  const [startTimeForStepByDragging, setStartTimeForStepByDragging] = React.useState(null)
  const [endTimeForStepByDragging, setEndTimeForStepByDragging] = React.useState(null)

  // interactive range
  const [interactable, setIteractable] = React.useState(null)
  const resizeRef = React.useRef<HTMLDivElement>(null)
  const startRef = React.useRef<HTMLButtonElement>(null)
  const endRef = React.useRef<HTMLButtonElement>(null)

  const playRef = React.useRef(null)

  const infoIconRef = React.useRef<HTMLButtonElement>(null)
  const [showInfoPopper, setShowInfoPopper] = React.useState(false)

  React.useEffect(() => {
    containerRef.current.addEventListener('mousedown', mouseDownHandler)
    return () => {
      containerRef.current?.removeEventListener('mousedown', mouseDownHandler)
      interactable?.unset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (resizeRef.current) {
      setIteractable(bindResizeHandler(interact, resizeRef.current, getResizeProps, resizeHandlerDragging, resizeHandlerDragend))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeStyle])

  // Reset render states when anything is changed.
  React.useEffect(() => {
    containerDragPos.current = { left: 0, x: 0 }
    setShowInfoPopper(false)
    setLeftPosition(0)
    setZoomLevel(0)
    setAutoPlay(_autoPlay)
    setEndTimeForTempStep(null)
    setStartTimeForStep(startTime)
    const _endTime = cumulatively ? startTime : getStepEndTimeForTarget(startTime, endTime, startTime, stepLength, dividedCount)
    setEndTimeForStep(_endTime)

    if (updating) {
      // TODO: temp solution
      // It might need to watch the states of all related map widgets, because it can't tell when all views are not updating.
      setTimeout(() => {
        onTimeChanged(startTime, _endTime)
      }, 2000)
    } else {
      onTimeChanged(startTime, _endTime)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_autoPlay, startTime, cumulatively, endTime, accuracy, stepLength, dividedCount])

  React.useEffect(() => {
    // get initialize details of timeline
    const timelineProps = {
      width: getWidthByZoomLevel(width, zoomLevel, maxWidthAndZoomLevel),
      startTime: startTime,
      endTime: endTime,
      accuracy
    }
    const details = getValueTickPairs(timelineProps)
    setTsDetails(details)
  }, [width, startTime, endTime, accuracy, zoomLevel, maxWidthAndZoomLevel])

  React.useEffect(() => {
    const maxLevel = getMaxWidthAndZoomLevel(width, startTime, endTime, accuracy)
    setMaxWidthAndZoomLevel(maxLevel)
  }, [width, startTime, endTime, accuracy])

  /**
   * Play and Stop animation
   */
  const isAutoplaySuspendMode = ReactRedux.useSelector((state: IMState) => {
    if (!autoPlay) {
      return null
    }
    return state.appRuntimeInfo?.appMode === AppMode.Design || state.appRuntimeInfo?.isPrintPreview
  })
  const modeRef = React.useRef(isAutoplaySuspendMode)

  const getResizeProps = hooks.useEventCallback(() => {
    const resizeProps: resizeHandlerProps = {
      startValue: startTimeForStepByDragging || startTimeForStep,
      endValue: endTimeForStepByDragging || endTimeForTempStep || endTimeForStep,
      extent: [startTime, endTime],
      width: getWidthByZoomLevel(width, zoomLevel, maxWidthAndZoomLevel),
      accuracy,
      stepLength,
      dividedCount
    }
    return resizeProps
  })

  const mouseMoveHandler = hooks.useEventCallback(e => {
    const debounceFunc = lodash.debounce(() => {
      const multiple = getMultipleByZoomLevel(width, zoomLevel, maxWidthAndZoomLevel)
      const dx = e.clientX - containerDragPos.current.x // How far the mouse has been moved.
      let _leftPosition = containerDragPos.current.left - dx / (multiple * width) * 100
      _leftPosition = Math.min(_leftPosition / 100, (multiple - 1) / multiple)
      _leftPosition = _leftPosition < 0 ? 0 : _leftPosition
      setLeftPosition(_leftPosition * 100)
    }, 50)
    debounceFunc()
  })

  const mouseUpHandler = hooks.useEventCallback(() => {
    containerRef.current.style.cursor = 'grab'
    containerRef.current.style.removeProperty('user-select')
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
  })

  const mouseDownHandler = hooks.useEventCallback(e => {
    // Skip for level = 1, and step resize buttons
    if (zoomLevel === 0 || e.target.tagName === 'BUTTON') {
      return
    }
    containerRef.current.style.cursor = 'grabbing'
    containerRef.current.style.userSelect = 'none'
    containerDragPos.current = {
      left: leftPosition,
      x: e.clientX // Get the current mouse position
    }
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  })

  /**
   * Update leftPostion when current step is out of range
   * @param newSTime
   * @param newETime
   */
  const updateLeftPositionByPlay = React.useCallback((newSTime = startTimeForStep, newETime = endTimeForStep, isNext: boolean) => {
    if (newSTime <= startTime) {
      setLeftPosition(0)
      return
    }
    const extent = endTime - startTime
    const multiple = getMultipleByZoomLevel(width, zoomLevel, maxWidthAndZoomLevel)
    const currentExtent = extent / multiple
    const currentExtentStart = startTime + leftPosition / 100 * extent
    const currentExtentEnd = currentExtentStart + currentExtent
    let _calcStartTime
    if (isNext && newSTime >= currentExtentEnd) { // move current step at left position
      _calcStartTime = Math.min(newSTime, endTime - currentExtent)
    } else if (!isNext && newETime <= currentExtentStart) { // move current step at right position
      _calcStartTime = Math.max(startTime, newETime - currentExtent)
    } else {
      return
    }
    const _leftPosition = (_calcStartTime - startTime) / (endTime - startTime) * 100
    setLeftPosition(_leftPosition)
  }, [zoomLevel, startTime, endTime, leftPosition, startTimeForStep, endTimeForStep, width, maxWidthAndZoomLevel])

  const updateLeftPositionByZoom = React.useCallback((zoomIn: boolean) => {
    const nextZoomLevel = zoomLevel + (zoomIn ? 1 : -1)
    if (nextZoomLevel === 0) {
      setLeftPosition(0)
      return
    }
    const extent = endTime - startTime
    const multiple = getMultipleByZoomLevel(width, zoomLevel, maxWidthAndZoomLevel)
    const multipleNext = getMultipleByZoomLevel(width, nextZoomLevel, maxWidthAndZoomLevel)
    const currentExtent = extent / multiple
    const currentExtentStart = startTime + leftPosition / 100 * extent
    const currentExtentEnd = currentExtentStart + currentExtent

    let position = leftPosition
    // Keep right position
    if ((endTimeForTempStep || endTimeForStep) === endTime && (endTimeForTempStep || endTimeForStep) === currentExtentEnd) {
      const nextExtent = extent / multipleNext
      position = (endTime - nextExtent - startTime) / (endTime - startTime) * 100
      setLeftPosition(position)
      return
    }

    // move step to current screen & left position for outScreen case. (Special case: start=end, and it's at left position)
    const isOutScreen = startTimeForStep >= currentExtentEnd || (endTimeForStep <= currentExtentStart && startTimeForStep !== endTimeForStep)
    const startPosition = (startTimeForStep - startTime) / (endTime - startTime) * 100
    if (!isOutScreen) {
      const diff = startPosition - leftPosition
      if (zoomIn) {
        position = leftPosition + diff / 2
      } else {
        position = leftPosition - diff
      }
    }
    // Must in extent of timeline
    position = Math.max(0, position)
    position = Math.min(position, (multipleNext - 1) / multipleNext * 100)
    setLeftPosition(position)
  }, [zoomLevel, startTime, endTime, leftPosition, width, startTimeForStep, endTimeForStep, endTimeForTempStep, maxWidthAndZoomLevel])

  const onPreviousOrNextClick = React.useCallback((isNext) => {
    const nextEndETime = getStepEndTimeForTarget(startTime, endTime, endTimeForStep, stepLength, dividedCount, isNext)
    let newSTime = startTime
    let newETime = endTime
    if (cumulatively) {
      // rtl or ltr
      // const keepPartOutOfRight = isNext && endTimeForStep < endTime && nextEndETime > endTime
      const keepPartOutOfRight = isNext && nextEndETime > endTime
      const goToFirstFromLast = isNext && endTimeForStep >= endTime
      const stopAtStartPosition = !isNext && startTime === endTimeForStep
      if (keepPartOutOfRight) {
        if ((endTimeForTempStep || dividedCount) && isNext) {
          newETime = startTime
          setEndTimeForTempStep(null)
        } else {
          newETime = nextEndETime
          setEndTimeForTempStep(endTime)
        }
      } else {
        if (stopAtStartPosition) {
          return
        } else if (goToFirstFromLast) {
          newETime = startTime
        } else { //LTR or RTL: normal cases
          newETime = nextEndETime
        }
        setEndTimeForTempStep(null)
      }
    } else {
      const nextStartTime = getStepEndTimeForTarget(startTime, endTime, startTimeForStep, stepLength, dividedCount, isNext)
      //Only display part of current step.
      const keepPartOutOfRight = nextStartTime < endTime && nextEndETime > endTime
      //RTL-case 1 : Keet it when clicking previous-btn and focusing on the first step.
      const stopAtStartPosition = !isNext && startTime === startTimeForStep
      //RTL-case 2 : Back to start postion
      const goToFirstFromCurrent = !isNext && nextStartTime < startTime
      //LTR-case 1: Click next-btn to go back to first position when focusing on the last step.
      const goToFirstFromLast = isNext && nextStartTime >= endTime

      if (keepPartOutOfRight) {
        if ((endTimeForTempStep || dividedCount) && isNext) {
          newSTime = startTime
          newETime = startTime + endTimeForStep - startTimeForStep
          setEndTimeForTempStep(null)
        } else {
          newSTime = nextStartTime
          newETime = nextEndETime //Keep it to use for prev/next play
          setEndTimeForTempStep(endTime)
        }
      } else {
        if (stopAtStartPosition) {
          return
        } else if (goToFirstFromCurrent || goToFirstFromLast) {
          newSTime = startTime
          newETime = startTime + endTimeForStep - startTimeForStep
        } else { //LTR or RTL: normal cases
          newSTime = nextStartTime
          newETime = nextEndETime
        }
        setEndTimeForTempStep(null)
      }
      setStartTimeForStep(newSTime)
    }
    setEndTimeForStep(newETime)

    // update left position, except first level
    if (zoomLevel !== 0) {
      updateLeftPositionByPlay(newSTime, newETime, isNext)
    }

    onTimeChanged(newSTime, newETime)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dividedCount, endTime, endTimeForStep, startTime, startTimeForStep, stepLength, cumulatively, onTimeChanged, updateLeftPositionByPlay])

  const stopPlay = React.useCallback(() => { // no hooks variable used
    if (playRef.current) {
      clearInterval(playRef.current)
      playRef.current = null
    }
  }, [])

  const startPlay = React.useCallback(() => {
    stopPlay() // stop previous autoPlay
    playRef.current = setInterval(() => {
      if (updating) { // prevent next step when updating is true
        return
      }
      onPreviousOrNextClick(true) // always loop.
    }, SPEED_VALUE_PAIR[speed.toLowerCase()])
  }, [speed, stopPlay, updating, onPreviousOrNextClick])

  React.useEffect(() => {
    if (!playRef.current) {
      if (isAutoplaySuspendMode || !autoPlay || updating) {
        stopPlay()
        return
      }
      startPlay()
    }
    return () => {
      stopPlay()
    }
  }, [autoPlay, updating, isAutoplaySuspendMode, stopPlay, startPlay])

  // isDesignMode change affects
  React.useEffect(() => {
    if (modeRef.current !== isAutoplaySuspendMode && isAutoplaySuspendMode !== null) {
      modeRef.current = isAutoplaySuspendMode
      if (isAutoplaySuspendMode) {
        stopPlay()
        return
      }
      if (autoPlay && !updating) {
        startPlay()
      }
    }
  }, [isAutoplaySuspendMode, startPlay, stopPlay, autoPlay, updating])

  // Temp position when dragging
  const resizeHandlerDragging = (startT, endT) => {
    // const debounceFunc = lodash.debounce(() => {
    setStartTimeForStepByDragging(startT)
    setEndTimeForStepByDragging(endT)
    // }, 10)
    // debounceFunc()
  }

  // Final positon when drag-end
  const resizeHandlerDragend = (startT, endT) => {
    resizeHandlerDragging(null, null)
    setStartTimeForStep(startT)
    setEndTimeForStep(endT)
    onTimeChanged(startT, endT)
  }

  /**
   * Render ticks for stepLength case
   */
  const timelineRulerByDIV = React.useMemo(() => {
    if (!tsDetails) {
      return null
    }

    // Ruler ticks
    const fullWidth = getWidthByZoomLevel(width, zoomLevel, maxWidthAndZoomLevel) // the width of the full ruler (the ruler's real width)

    // we use leftPosition and endPosition to define the visible part of the ruler
    const endPosition = width / fullWidth * 100 + leftPosition
    const scale = fullWidth / width

    const years = getValueTickInfoForYear(tsDetails, fullWidth, startTime, endTime, leftPosition, endPosition, scale, marginForLR)
    const months = getValueTickInfoForMonth(tsDetails, fullWidth, startTime, endTime, leftPosition, endPosition, scale)
    const days = getValueTickInfoForDay(tsDetails, fullWidth, startTime, endTime, leftPosition, endPosition, scale)
    const hours = getValueTickInfoForHour(tsDetails, fullWidth, startTime, endTime, leftPosition, endPosition, scale)
    const minutes = getValueTickInfoForMinute(tsDetails, fullWidth, startTime, endTime, leftPosition, endPosition, scale)

    const tickSizes = getTickSizes(tsDetails, years, months, days, hours, minutes)
    const units = ['year', 'month', 'day', 'hour', 'minute']

    return <div className='timeline-ticks' >
      {
        [years, months, days, hours, minutes].map((items, unitIndex) => {
          return items.map((item, index) => {
            const position = item.position
            const unit = units[unitIndex]
            return <div key={`item-${unitIndex}-${index}`} className='timeline-tick-container' data-unit={unit} style={{ left: position }}>
              {
                item.label &&
                <div className={`timeline-tick_label ${tickSizes.labels[unit]}-label ${(unit === 'year' && index === 0 && leftPosition === 0) ? 'timeline-first_label' : ''}`}>
                  {item.label}
                </div>
              }
              <div key={index} className={classNames(`timeline-tick ${tickSizes.ticks[unit]}-tick`, item.label ? 'has-label' : 'no-label')}></div>
            </div>
          })
        })
      }
    </div>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tsDetails, zoomLevel, leftPosition])

  const timeStyles = React.useMemo(() => {
    return getTimelineStyles(theme, marginForLR, foregroundColor, backgroundColor, sliderColor)
  }, [theme, marginForLR, foregroundColor, backgroundColor, sliderColor])

  const zoomOutButton = React.useMemo(() => {
    return <Button icon type='tertiary' size='sm' disabled={zoomLevel === 0}
      onClick={() => {
        updateLeftPositionByZoom(false)
        setZoomLevel(Math.max(0, zoomLevel - 1))
      }}
    >
    <MinusCircleOutlined />
  </Button>
  }, [zoomLevel, updateLeftPositionByZoom])

  const zoomInButton = React.useMemo(() => {
    return <Button icon type='tertiary' size='sm' disabled={zoomLevel === maxWidthAndZoomLevel?.zoomLevel}
      onClick={() => {
        updateLeftPositionByZoom(true)
        setZoomLevel(Math.min(maxWidthAndZoomLevel?.zoomLevel, zoomLevel + 1))
      }}
    >
      <PlusCircleOutlined />
    </Button>
  }, [zoomLevel, maxWidthAndZoomLevel, updateLeftPositionByZoom])

  const playControlButton = React.useMemo(() => {
    if (!enablePlayControl) {
      return null
    }
    return <Tooltip title={messages(autoPlay ? 'pause' : 'play')} placement='bottom'>
      <Button icon type='tertiary' size='sm' className='play-btn' onClick={() => setAutoPlay(!autoPlay)}>
        {autoPlay ? <PauseOutlined /> : <PlayOutlined />}
      </Button>
    </Tooltip>
  }, [enablePlayControl, autoPlay, messages])

  const prevNextButtons = React.useMemo(() => {
    return <React.Fragment>
      <Tooltip title={messages('previous')} placement='bottom'>
        <Button icon type='tertiary' size='sm' onClick={e => onPreviousOrNextClick(false)}>
          <PreviousOutlined />
        </Button>
      </Tooltip>
      { timeStyle === TimeStyle.Classic && playControlButton}
      <Tooltip title={messages('next')} placement='bottom'>
        <Button icon type='tertiary' size='sm'
          className='next-btn'
          onClick={e => onPreviousOrNextClick(true)}
        >
          <NextOutlined />
        </Button>
      </Tooltip>
    </React.Fragment>
  }, [messages, timeStyle, onPreviousOrNextClick, playControlButton])

  const InfoButton = React.useMemo(() => {
    const startLabel = dateUtils.formatDateLocally(startTime, intl, DATE_PATTERN, TIME_PATTERN)
    const endLabel = dateUtils.formatDateLocally(endTime, intl, DATE_PATTERN, TIME_PATTERN)
    return <React.Fragment>
      <Button type='tertiary' size='sm' onClick={evt => setShowInfoPopper(!showInfoPopper)} ref={ref => { infoIconRef.current = ref }}>
        <InfoOutlined />
      </Button>
      <Popper
        open={showInfoPopper}
        keepMount
        showArrow
        reference={infoIconRef}
        toggle={(showInfoPopper) => {
          setShowInfoPopper(!showInfoPopper)
          lodash.defer(() => {
            infoIconRef.current.focus()
          })
        }}>
        <div className='p-3'>
          <div className='mb-2'>{`${startLabel} - ${endLabel}`}</div>
          <Label check className='d-flex align-items-center'>
            <h5 className='flex-grow-1 mb-0'>{'Timeline filtering applied'}</h5>
            <Switch checked={applied} onChange={(evt, checked) => {
              onApplyStateChanged(checked)
            }} />
          </Label>
        </div>
      </Popper>

      </React.Fragment>
  }, [startTime, endTime, intl, showInfoPopper, applied, onApplyStateChanged])

  const SpeedDropdown = React.useMemo(() => {
    return <Dropdown activeIcon>
      <Tooltip title={messages('speed')} placement='bottom'>
        <DropdownButton
          icon type='tertiary' arrow={false}
          aria-label={messages('speed')}
          a11y-description={speedItems.filter(item => item.value === speed)[0].label}
         >
          <SpeedOutlined />
        </DropdownButton>
      </Tooltip>
      <DropdownMenu>
        {
          speedItems.map(item => {
            return <DropdownItem
              key={item.value}
              value={item.value}
              active={item.value === speed}
              onClick={evt => setSpeed(evt.target.value)}
            >
              {item.label}
            </DropdownItem>
          })
        }
      </DropdownMenu>
    </Dropdown>
  }, [speedItems, speed, messages])

  const changeNextScreen = hooks.useEventCallback((isNext: boolean) => {
    const extent = endTime - startTime
    const multiple = getMultipleByZoomLevel(width, zoomLevel, maxWidthAndZoomLevel)
    const currentExtent = extent / multiple
    const currentExtentStart = startTime + leftPosition / 100 * extent
    const nextExtentStart = currentExtentStart + (isNext ? 1 : -1) * currentExtent
    let _leftPosition = (nextExtentStart - startTime) / (endTime - startTime) * 100
    // Must in extent of timeline
    _leftPosition = Math.max(0, _leftPosition)
    _leftPosition = Math.min(_leftPosition, (multiple - 1) / multiple * 100)
    setLeftPosition(_leftPosition)
  })

  const getMarginLeftRight = (_startTimeForStep, _endTimeForStep) => {
    let startPositionForStep: any = (_startTimeForStep - startTime) / (endTime - startTime)
    let widthForStep = (_endTimeForStep - startTime) / (endTime - startTime) - startPositionForStep
    if (_startTimeForStep === endTime) {
      startPositionForStep = timeStyle === TimeStyle.Classic ? 'calc(100% - 16px)' : 'calc(100% - 8px)'
      widthForStep = 0
    } else {
      startPositionForStep = startPositionForStep * 100 + '%'
    }
    return { startPositionForStep, widthForStep }
  }

  const wMultiple = getMultipleByZoomLevel(width, zoomLevel, maxWidthAndZoomLevel)
  const isRTL = getAppStore().getState().appContext.isRTL
  const _startTimeForStep = startTimeForStepByDragging || startTimeForStep
  const _endTimeForStep = endTimeForStepByDragging || endTimeForTempStep || endTimeForStep
  // step position and width
  const { startPositionForStep, widthForStep } = getMarginLeftRight(_startTimeForStep, _endTimeForStep)
  // Labels
  const startLabelForStep = dateUtils.formatDateLocally(_startTimeForStep, intl, DATE_PATTERN, TIME_PATTERN)
  const endLabelForStep = dateUtils.formatDateLocally(_endTimeForStep, intl, DATE_PATTERN, TIME_PATTERN)
  // arrows
  const showLeftArrow = leftPosition !== 0
  const showRightArrow = 100 - leftPosition - 1 / wMultiple * 100 > 0.00000000001
  return (
    <div css={timeStyles} dir='ltr' className={classNames('timeline w-100', {
      'timeline-classic': timeStyle === TimeStyle.Classic,
      'timeline-modern': timeStyle === TimeStyle.Modern
    })}
    >
      {
        timeStyle === TimeStyle.Modern && <div className='timeline-left'>
          <div className='play-container'>
            {prevNextButtons}
          </div>
        </div>
      }
      <div className='timeline-middle'>
        <div className='timeline-header'>
          {
            timeStyle === TimeStyle.Classic && <div className='range-label' dir={isRTL ? 'rtl' : 'ltr'}>
              {startLabelForStep + ' - ' + endLabelForStep}
            </div>
          }
          {
            timeStyle === TimeStyle.Modern && <React.Fragment>
              {InfoButton}
              <div className='range-label' dir={isRTL ? 'rtl' : 'ltr'}>
                {startLabelForStep + ' - ' + endLabelForStep}
              </div>
            </React.Fragment>
          }
          <div className='zoom-container'>
            {
              zoomLevel === 0
                ? zoomOutButton
                : <Tooltip title={messages('zoomOut')} placement='bottom'>{zoomOutButton}</Tooltip>
            }
            {
              zoomLevel === maxWidthAndZoomLevel?.zoomLevel
                ? zoomInButton
                : <Tooltip title={messages('zoomIn')} placement='bottom'>{zoomInButton}</Tooltip>
            }
          </div>
        </div>
        <div className='timeline-content'>
          <div className='timeline-content-inside' >
            <div className='timeline-whole' ref={el => (containerRef.current = el)} style={{ width: wMultiple * 100 + '%', height: height + 'px', marginLeft: -(leftPosition * wMultiple) + '%' }}>
              {
                timeStyle === TimeStyle.Modern && <div style={{ height: (height - 32) + 'px' }}></div>
              }
              { timelineRulerByDIV }
              {
                timeStyle === TimeStyle.Modern && <div className='timeline-range-container' style={{ height: height + 'px', marginTop: -(height - 32) + 'px' }}>
                  <div className='resize-handlers' ref={el => (resizeRef.current = el)} style={{ marginLeft: startPositionForStep, width: widthForStep * 100 + '%' }}>
                    <button className={`resize-handler resize-left ${_startTimeForStep === _endTimeForStep ? 'show-bg' : ''}`} ref={ref => { startRef.current = ref }} title={startLabelForStep} />
                    <button className={`resize-handler resize-right ${_startTimeForStep === _endTimeForStep ? 'show-bg' : ''}`} ref={ref => { endRef.current = ref }} title={endLabelForStep} />
                  </div>
                </div>
              }
              {
                showLeftArrow && <Button icon type='tertiary' size='sm'
                  className='timeline-arrow left-arrow'
                  style={{ left: timeStyle === TimeStyle.Modern && !enablePlayControl && isRTL ? '25px' : 'null' }}
                  onClick={evt => changeNextScreen(false)}
                >
                  <Icon width={4} height={16} icon={arrowIcon} />
                </Button>
              }
              {
                showRightArrow && <Button icon type='tertiary' size='sm'
                  className='timeline-arrow right-arrow'
                  style={{ right: timeStyle === TimeStyle.Modern && !enablePlayControl && !isRTL ? '25px' : 'null' }}
                  onClick={evt => changeNextScreen(true)}
                >
                  <Icon width={4} height={16} icon={arrowIcon} />
                </Button>
              }
            </div>
            {
              timeStyle === TimeStyle.Classic && <div className='timeline-range-container' style={{ width: wMultiple * 100 + '%', marginLeft: -(leftPosition * wMultiple) + '%' }}>
                <div className='resize-handlers' ref={el => (resizeRef.current = el)} style={{ marginLeft: startPositionForStep, width: widthForStep * 100 + '%' }}>
                  <button className='resize-handler resize-left' ref={ref => { startRef.current = ref }} title={startLabelForStep} />
                  <button className='resize-handler resize-right' ref={ref => { endRef.current = ref }} title={endLabelForStep} />
                </div>
              </div>
            }
          </div>
        </div>
        {
          timeStyle === TimeStyle.Classic && <div className='timeline-footer'>
            {InfoButton}
            <div className='play-container'>
              {prevNextButtons}
            </div>
            {enablePlayControl ? SpeedDropdown : <div></div>}
          </div>
        }
      </div>
      {
        timeStyle === TimeStyle.Modern && <div className='timeline-right'>
          <div className='play-container'>
            {playControlButton}
            {enablePlayControl && SpeedDropdown}
          </div>
        </div>
      }

    </div>
  )
}

const useFormatMessage = () => {
  const intl = useIntl()
  return React.useCallback((id: string, values?: any) => {
    return intl.formatMessage({ id: id, defaultMessage: allDefaultMessages[id] }, values)
  }, [intl])
}

export default TimeLine
