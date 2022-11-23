import { ThemeVariables, css, SerializedStyles } from 'jimu-core'
import { IMConfig } from '../../config'

export function getStyle (theme: ThemeVariables, widgetConfig: IMConfig): SerializedStyles {
  const root = theme.surfaces[1].bg

  return css`
    overflow: auto;
    width: 100%;
    height: 100%;
    background-color: ${root};
    .widget-utility-trace {
      width: 100%;
      height: 100%;
      background-color: ${root};
    }
  `
}
