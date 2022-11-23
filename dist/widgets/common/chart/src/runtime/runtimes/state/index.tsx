import { React, DataSource, IMSqlExpression } from 'jimu-core'
import { ChartInstance } from 'jimu-ui/advanced/chart'

export interface ChartRuntimeState {
  //The instance of the chart component, which is used in `range-cursor-mode` tool.
  chart?: ChartInstance
  //Filter criteria used for original data.
  filter?: IMSqlExpression
  //The data source instance of the `useDataSource`.
  dataSource?: DataSource
  //The data source instance of `outputDataSource`.
  outputDataSource?: DataSource
}

const initialState: ChartRuntimeState = {
  chart: null,
  filter: null,
  dataSource: null,
  outputDataSource: null
}

const reducer = (state: ChartRuntimeState, action) => {
  switch (action.type) {
    case 'SET_CHART':
      return { ...state, chart: action.value }
    case 'SET_FILTER':
      return { ...state, filter: action.value }
    case 'SET_DATA_SOURCE':
      return { ...state, dataSource: action.value }
    case 'SET_OUTPUT_DATA_SOURCE':
      return { ...state, outputDataSource: action.value }
    default:
      return state
  }
}

const ChartRuntimeStateContext = React.createContext<ChartRuntimeState>(undefined)
const ChartRuntimeDispatchContext = React.createContext<React.Dispatch<any>>(undefined)

interface ChartRuntimeStateProviderProps {
  defaultState?: ChartRuntimeState
  children: React.ReactNode
}

export const ChartRuntimeStateProvider = (props: ChartRuntimeStateProviderProps) => {
  const { defaultState, children } = props

  const [state, dispatch] = React.useReducer<typeof reducer>(reducer, defaultState || initialState)

  return <ChartRuntimeStateContext.Provider value={state}>
    <ChartRuntimeDispatchContext.Provider value={dispatch}>
      {children}
    </ChartRuntimeDispatchContext.Provider>
  </ChartRuntimeStateContext.Provider>
}

export const useChartRuntimeState = () => {
  return React.useContext(ChartRuntimeStateContext)
}

export const useChartRuntimeDispatch = () => {
  return React.useContext(ChartRuntimeDispatchContext)
}
