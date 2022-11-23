import { ThemeVariables, css, SerializedStyles, polished } from 'jimu-core'

export function getStyleForTimePanel (theme: ThemeVariables): SerializedStyles {
  return css`
    height: calc(100% - ${polished.rem(50)});
    overflow: auto;

    .date-label {
      color: ${theme.colors.palette.dark[500]};
    }
    .time-step-details {
      margin-top: 0.75rem !important;
    }
  `
}

export function getStyleForWidget (theme: ThemeVariables): SerializedStyles {
  return css`
    .style-container{
      display: flex;
      justify-content: space-between;
      .jimu-btn {
        padding: 0;
        background: ${theme.colors.palette.light[200]};
        &.active{
          background: ${theme.colors.palette.light[200]};
          outline: 2px solid ${theme.colors.palette.primary[600]};
        }
      }
    }
    .autoplay-label{
      color: ${theme.colors.palette.dark[400]};
    }

    .empty-placeholder {
      display: flex;
      flex-flow: column;
      justify-content: center;
      height: calc(100% - 165px);
      overflow: hidden;
      .empty-placeholder-inner {
        padding: 0px 20px;
        flex-direction: column;
        align-items: center;
        display: flex;

        .empty-placeholder-text {
          color: ${theme.colors.palette.dark[500]};
          font-size: ${polished.rem(14)};
          margin-top: 16px;
          text-align: center;
        }
        .empty-placeholder-icon {
          color: ${theme.colors.palette.dark[200]};
        }
      }
    }

    .honor-label {
      color: ${theme.colors.palette.dark[800]};
    }
  `
}
