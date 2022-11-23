import { ThemeVariables, css, SerializedStyles } from 'jimu-core'

export function getStyle (theme: ThemeVariables): SerializedStyles {
  return css`
    label {
      cursor: pointer;
    }
    .embed-dynamic-con{
      z-index: 3;
      .ql-editor{
        min-height: 174px;
      }
    }
  `
}
