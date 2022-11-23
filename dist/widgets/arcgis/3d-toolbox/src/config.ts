import { ImmutableObject } from 'seamless-immutable'
import { Tool3D, Arrangement } from './constraints'

export interface config {
  tools: Tool3D[]
  arrangement: Arrangement
}
export type IMConfig = ImmutableObject<config>
