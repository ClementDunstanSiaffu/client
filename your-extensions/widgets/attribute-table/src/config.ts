import { ImmutableObject } from 'seamless-immutable'

export interface Config {
  "buttonFilter": boolean,
  "downloadCGI": boolean,
  "downloadECGI": boolean,
  "downloadKMZ": boolean
}

export type IMConfig = ImmutableObject<Config>
