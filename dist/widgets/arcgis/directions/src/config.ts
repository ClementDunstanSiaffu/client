import { UseUtility } from 'jimu-core'
import { SearchGeocodeDataConfig, SearchSuggestionConfig } from 'jimu-ui/advanced/setting-components'
import { ImmutableObject } from 'seamless-immutable'

export interface Config {
  routeConfig?: RouteConfig
  searchConfig?: SearchConfig
}
export type IMConfig = ImmutableObject<Config>

export interface RouteConfig {
  useUtility?: UseUtility
}
export type IMRouteConfig = ImmutableObject<RouteConfig>

export interface SearchConfig {
  dataConfig?: SearchGeocodeDataConfig[]
  generalConfig?: SearchGeneralConfig
  suggestionConfig?: SearchSuggestionConfig
}
export type IMSearchConfig = ImmutableObject<SearchConfig>

interface SearchGeneralConfig {
  hint: string
}
