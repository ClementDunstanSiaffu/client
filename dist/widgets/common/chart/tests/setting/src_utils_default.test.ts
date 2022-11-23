import { appActions, getAppStore } from 'jimu-core'
import { getInitState, mockTheme, setTheme } from 'jimu-for-test'
import {
  getThemeColorVariables,
  getSeriesFillColor,
  generateRandomThemeColor,
  getDefaultTextColor,
  getDefaultColor,
  getTextSymbol,
  DefaultTextSymbol,
  DefaultLineSymbol,
  getLineSymbol,
  getFillSymbol,
  DefaultFillSymbol,
  getChartText,
  SeriesColors,
  DefaultColor,
  DefaultTextColor
} from '../../src/utils/default'
import { WebChartTypes } from 'jimu-ui/advanced/chart'

const state = getInitState()

getAppStore().dispatch(appActions.updateStoreState(state))

describe('src/utils/default', () => {
  beforeAll(() => {
    setTheme(mockTheme)
  })
  it('getThemeColorVariables', () => {
    expect(getThemeColorVariables().length).toBe(72)
  })

  it('getOneRampThemeColor', () => {
    expect(getSeriesFillColor(0)).toBe(SeriesColors[0])
    expect(getSeriesFillColor(2)).toBe(SeriesColors[2])
    expect(getSeriesFillColor(4)).toBe(SeriesColors[4])
    expect(getSeriesFillColor(6)).toBe(SeriesColors[6])
    expect(getSeriesFillColor(7)).toBe(SeriesColors[0])
    expect(getSeriesFillColor(8)).toBe(SeriesColors[1])
  })

  it('generateRandomThemeColor', () => {
    const variables = getThemeColorVariables()
    const color = generateRandomThemeColor()
    expect(variables).toContain(color)
  })

  it('getDefaultTextColor', () => {
    expect(getDefaultTextColor()).toBe(DefaultTextColor)
  })

  it('getDefaultColor', () => {
    expect(getDefaultColor()).toBe(DefaultColor)
  })

  it('getDefaultTextSymbol', () => {
    expect(getTextSymbol('foo')).toEqual({
      ...DefaultTextSymbol,
      text: 'foo'
    })
  })

  it('getLineSymbol', () => {
    expect(getLineSymbol()).toEqual(DefaultLineSymbol)
  })

  it('getFillSymbol', () => {
    expect(getFillSymbol()).toEqual({
      ...DefaultFillSymbol,
      color: 'var(--dark)'
    })
    expect(getFillSymbol(SeriesColors[1])).toEqual({
      ...DefaultFillSymbol,
      color: SeriesColors[1]
    })
  })

  it('getChartText', () => {
    expect(getChartText('foo')).toEqual({
      type: WebChartTypes.Text,
      visible: true,
      content: { ...DefaultTextSymbol, text: 'foo' }
    })
    expect(getChartText('foo', false)).toEqual({
      type: WebChartTypes.Text,
      visible: false,
      content: { ...DefaultTextSymbol, text: 'foo' }
    })
  })
})
