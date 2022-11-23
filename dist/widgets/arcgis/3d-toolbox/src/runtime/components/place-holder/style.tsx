import { ThemeVariables, css, SerializedStyles } from 'jimu-core'

export function getStyle (theme: ThemeVariables): SerializedStyles {
  return css`
    &.hide-msg {
      .message-wrapper {
        display: none;
      }
    }
  `
}
