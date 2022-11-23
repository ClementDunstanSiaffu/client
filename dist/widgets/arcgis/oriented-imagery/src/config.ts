import { ImmutableObject } from 'jimu-core'

export interface Config {
  editingEnabled: boolean
  vectorLayers: any
  oicList: any
}

export type IMConfig = ImmutableObject<Config>
