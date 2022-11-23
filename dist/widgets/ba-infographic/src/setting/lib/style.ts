import { ThemeVariables, css, SerializedStyles } from 'jimu-core'

export function getStyle (theme: ThemeVariables): SerializedStyles {
  const bgColor = theme.colors.palette.light[200]
  return css`
    
    .w-100 {
      width:100%;
    }

    .widget-setting-bao{
      font-weight: lighter;
      font-size: 13px;

      .bao-description{
        height: 100px; 
        padding: 10px;
      }

      .bao-options-div{
        background-color: ${bgColor};
        padding: 0.5rem;
      }

    }

    font-size: 13px;
      font-weight: lighter;
      color: rgb(168, 168, 168);

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
          width: 49%
        }
        .ui-mode-card-separator {
          width: 2%
        }
        .ui-mode-card {
          flex: 1;
          width: 100%;
          background: ${bgColor};
          border: 2px solid ${bgColor};
          margin: 0 0 0.5rem 0;
        }
        .ui-mode-card.active {
          border: 2px solid #00D8ED;
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

      .bufferWrapper {
        display: flex;
        width: 100%;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
      }

      .radio-wapper > span.jimu-radio {
        flex-shrink: 0;
      }

      .bufferInput {
        width: 20%;
      }
    
      .arcgisReportsListOuter {
        --calcite-ui-brand: rgba(0, 170, 187,1) !important;
        --calcite-ui-brand-press: rgba(255,255,255,1) !important;
        --calcite-ui-foreground-1: rgba(24, 24, 24, 1) !important;
        --calcite-ui-text-3: rgba(255,255,255,1) !important;
        --calcite-ui-text-2: rgba(168,168,168,1) !important;
        --calcite-ui-text-1: rgba(0, 170, 187,1) !important;
        --calcite-ui-border-2: rgba(106, 106, 106, 1) !important;
      }
  `
}
