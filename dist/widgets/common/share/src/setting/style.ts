import { ThemeVariables, css, SerializedStyles/*, polished */ } from 'jimu-core'

export function getStyle (theme: ThemeVariables): SerializedStyles {
  const bgColor = theme.colors.palette.light[200]

  const borderWidth = 2
  const separatorWidth = 10
  return css`
      font-size: 13px;
      font-weight: lighter;

      .jimu-widget-setting--section {
        padding: 18px 16px;
      }

      .ui-mode-setting {
        display: flex;
      }

      /* ui-mode */
      .ui-mode-card-chooser{
        display: flex;
        align-items: start;

        .ui-mode-card-wapper {
          width: calc((100% - ${separatorWidth}px - ${borderWidth * 4}px) / 2);
        }

        .ui-mode-card-separator {
          width: ${separatorWidth}px
        }
        .ui-mode-card {
          flex: 1;
          width: 100%;
          background: ${bgColor};
          border: ${borderWidth}px solid ${bgColor};
          margin: 0 0 0.5rem 0;

          .jimu-icon {
            margin: 0
          }
        }
        .ui-mode-card.active {
          border: ${borderWidth}px solid #00D8ED;
          background-color: ${bgColor} !important;
        }
        .ui-mode-label {
          overflow: hidden;
          text-align: center;
        }
      }

      .icon-tip {
        margin: 0;
        color: #c5c5c5;
        font-weight: 400;
      }
  `
}
