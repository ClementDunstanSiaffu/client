/** @jsx jsx */
import { React } from 'jimu-core'
//import { hooks } from 'jimu-ui'

export const useTimer = (delay: number, setTimerRunningState: ((isShow) => void)) => {
  const timerRef = React.useRef(null)

  const setTimerRunningStateFunCB = React.useCallback((isShow) => {
    setTimerRunningState(isShow)
  }, [setTimerRunningState])

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setTimerRunningStateFunCB(false)
  }, [setTimerRunningStateFunCB])

  const initTimer = React.useCallback(() => {
    // 1 clearTimer if possible
    clearTimer()
    // 2 set state true
    setTimerRunningStateFunCB(true)
    // 3 delay timeout
    timerRef.current = setTimeout(() => {
      clearTimer()
    }, delay)
  }, [delay, setTimerRunningStateFunCB, clearTimer])

  // unmount //hooks.useUnmount(() => {
  React.useEffect(() => {
    return () => {
      clearTimer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [initTimer, clearTimer]
}
