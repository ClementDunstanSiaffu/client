import { ThemeVariables, css, SerializedStyles/*, polished*/ } from 'jimu-core'

export function getStyle (theme: ThemeVariables): SerializedStyles {
  return css`
    .side-popper-container{
      padding-top: 0;

      .side-popper {
        .numeric-input {
          width: 50px;
        }

        .first-setting-section {
          padding-top: 0;
        }

        .jimu-widget-setting--section {
          padding-left: 0;
          padding-right: 0;
        }
      }

      /* Shadow cast */
      .shadow-cast-radios {
        color: ${theme.colors.palette.dark[800]}
      }
    }
  `
}
