import { ThemeVariables, css, SerializedStyles/*, polished*/ } from 'jimu-core'

export function getStyle (theme: ThemeVariables): SerializedStyles {
  const bgColor = theme.colors.white

  return css`
    /*min-width: 300px;*/
    background-color: ${bgColor};

    .tool-header {

      .label {
        font-weight: 600;
        font-size: 16px;
      }
    }

    .api-loader {
      position: relative;
      height: 32px;
    }

    .tool-content {
      min-width: 270px;
      overflow: auto;
      height: calc(100% - 32px);

      .esri-widget__heading {
        display: none;
      }

      .tool-footer {

        button {
          border: 1px solid ${theme.colors.palette.primary[500]};
        }
      }
    }
  `
}
