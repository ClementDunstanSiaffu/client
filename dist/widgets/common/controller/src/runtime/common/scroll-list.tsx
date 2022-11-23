/** @jsx jsx */
import { React, css, jsx, classNames, polished } from 'jimu-core'
import { NavButtonGroupProps, NavButtonGroup, hooks, utils } from 'jimu-ui'
import { useObserveDebouncedLength as _useObserveDebouncedLength } from './utils'

export interface ScrollListProps extends Omit<NavButtonGroupProps, 'placeholder'> {
  scrollRef?: React.Ref<((previous: boolean, moveOne?: boolean) => void)>
  space?: number
  lists: string[]
  createItem: (item: string, props: any) => React.ReactElement
  autoHideArrow?: boolean
  itemLength: number
  minLength?: number
  autoScrollEnd?: boolean
  onScrollStatusChange?: (hideArrow: boolean, disablePrevious?: boolean, disableNext?: boolean) => void
}
const useStyle = (vertical: boolean, space: number, minLength: number) => {
  return css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .root {
      flex-direction: ${vertical ? 'column' : 'row'};
      width: 100%;
      height: 100%;
      min-width: ${polished.rem(minLength)};
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;
      align-items: center;
      .scroll-list-item {
        &:not(:first-of-type) {
          margin-top: ${vertical ? polished.rem(space) : 'unset'};
          margin-left: ${!vertical ? polished.rem(space) : 'unset'};
        }
      }
    }
`
}

const useObserveDebouncedLength = (
  rootRef: React.RefObject<HTMLElement>,
  vertical: boolean,
  offset: number = 0,
  minLength: number = offset) => {
  let length = _useObserveDebouncedLength(rootRef, 500, vertical)
  length += offset
  length = Math.max(length, minLength)
  return length
}

const getStartEnd = (previousStart: number, previousEnd: number, number: number): [number, number] => {
  let start = previousStart
  let end = previousEnd

  if (end - start > number) {
    end = previousStart + number
  } else if (end - start < number) {
    start = 0
    end = start + number
  }
  return [start, end]
}
const DefaultList = []
export const ScrollList = React.forwardRef((props: ScrollListProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    scrollRef,
    className,
    lists = DefaultList,
    createItem,
    vertical,
    itemLength,
    space,
    onChange,
    autoHideArrow,
    minLength = itemLength,
    autoScrollEnd,
    onScrollStatusChange,
    ...others
  } = props

  const translate = hooks.useTranslate()
  const counts = lists?.length ?? 0

  const style = useStyle(vertical, space, minLength)
  const [rootRef, handleRef] = hooks.useForwardRef(ref)
  //The length of the viewport that can be used to display items
  const length = useObserveDebouncedLength(rootRef, vertical, space, minLength)
  //Number of items that can be displayed in the viewport.
  //When length or itemLength changed, recalculate the number that can be displayed in the viewport
  const number = React.useMemo(() => Math.floor(length / itemLength), [itemLength, length])

  //Used to intercept several items from the lists and display them in the viewport([].slice(start, end))
  const [start, setStart] = React.useState(getStartEnd(0, 0, number)[0])
  const [end, setEnd] = React.useState(getStartEnd(0, 0, number)[1])
  const endRef = hooks.useRefValue(end)
  const startRef = hooks.useRefValue(start)

  const [disablePrevious, setDisablePrevious] = React.useState(true)
  const [disableNext, setDisableNext] = React.useState(false)
  const [hideArrow, setHideArrow] = React.useState(true)
  const buttonStyle = React.useMemo(() => ({ visibility: !hideArrow ? 'visible' : 'hidden' }), [hideArrow])

  React.useEffect(() => {
    onScrollStatusChange?.(hideArrow, disablePrevious, disableNext)
  }, [disableNext, disablePrevious, hideArrow, onScrollStatusChange])

  //When the number that can be displayed in the viewport changed, automatically update end
  React.useEffect(() => {
    if (length === 0) return
    const [start, end] = getStartEnd(startRef.current, endRef.current, number)
    setStart(start)
    setEnd(end)
  }, [number, startRef, endRef, length])

  //When the counts of lists changed, automatically scroll to end
  const listsRef = React.useRef([])
  const scrollToEnd = hooks.useEventCallback(() => {
    const validList = lists.length > 0 && listsRef.current.length > 0 &&
    lists[lists.length - 1] !== listsRef.current[listsRef.current.length - 1]
    const scrollEnd = autoScrollEnd && validList && listsRef.current.length > counts
    if (scrollEnd) {
      let start = 0
      let end = 0
      end = counts
      start = end - number
      start = Math.max(0, start)
      setStart(start)
      setEnd(end)
    }
  })

  React.useEffect(() => {
    scrollToEnd()
    listsRef.current = lists
  }, [lists, scrollToEnd])

  //Fire scroll function to change start and end
  const scroll = hooks.useEventCallback((previous: boolean, moveOne = true) => {
    const moveNumber = moveOne ? 1 : number
    let s = 0; let e = 0
    if (previous) {
      s = start - moveNumber
      if (s < 0) {
        s = 0
        e = s + number
      } else {
        e = end - moveNumber
      }
    } else {
      e = end + moveNumber
      if (e > counts) {
        e = counts
        s = e - number
      } else {
        s = start + moveNumber
      }
    }
    setStart(s)
    setEnd(e)
  })

  React.useEffect(() => {
    utils.setRef(scrollRef, scroll)
  }, [scroll, scrollRef])

  const handleChange = (previous: boolean) => {
    onChange?.(previous)
    scroll(previous, true)
  }

  React.useEffect(() => {
    if (length === 0) return
    const hideArrow = (end - start) >= counts
    const disablePrevious = start === 0
    const disableNext = end === counts
    setDisablePrevious(disablePrevious)
    setDisableNext(disableNext)
    setHideArrow(hideArrow)
  }, [start, end, counts, length])

  return <NavButtonGroup
    {...others}
    css={style}
    type="tertiary"
    vertical={vertical}
    onChange={handleChange}
    disablePrevious={disablePrevious}
    disableNext={disableNext}
    previousAriaLabel={translate('previous')}
    nextAriaLabel={translate('next')}
    previousStyle={buttonStyle}
    nextStyle={buttonStyle}
    className={classNames('scroll-list', className)}>
    <div className="root scroll-list-root" ref={handleRef}>
      {
        lists.slice(start, end).map((item) => {
          return createItem(item, 'scroll-list-item')
        })
      }
    </div>
  </NavButtonGroup>
})
