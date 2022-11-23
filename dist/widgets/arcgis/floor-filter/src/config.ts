import { ImmutableObject } from 'jimu-core'

export interface Config {
  displayLabel?: boolean
  longNames?: boolean
  position?: string
}

export type IMConfig = ImmutableObject<Config>
