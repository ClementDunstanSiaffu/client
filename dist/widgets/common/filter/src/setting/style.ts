import { ThemeVariables, css, SerializedStyles, polished } from 'jimu-core'

export function getStyleForFI (theme: ThemeVariables): SerializedStyles {
  return css`
    .filter-item-panel{
      .setting-header {
        padding: ${polished.rem(10)} ${polished.rem(16)} ${polished.rem(0)} ${polished.rem(16)}
      }

      .setting-title {
        font-size: ${polished.rem(16)};
        .filter-item-label{
          color: ${theme.colors.palette.dark[600]};
        }
      }

      .setting-container {
        height: calc(100% - ${polished.rem(50)});
        overflow: auto;

        .title-desc{
          color: ${theme.colors.palette.dark[200]};
        }


      }
    }
  `
}

export function getStyleForWidget (theme: ThemeVariables): SerializedStyles {
  return css`
    .and-or-group .max-width-50{
      max-width: 50%;
    }
    .filter-item {
      display: flex;
      flex: 1;
      padding: ${polished.rem(7)} 0.25rem;
      cursor: pointer;

      .filter-item-icon{
        width: 14px;
        margin-right: 0.5rem;
      }
      .filter-item-name{
        /* word-break: break-word; */
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-break: break-word;
        -webkit-line-clamp: 2;
        line-height: ${theme.typography.lineHeights.sm};
      }
    }

    .empty-placeholder {
      display: flex;
      flex-flow: column;
      justify-content: center;
      height: calc(100% - 120px);
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

    .arrange-style-container{

      .arrange_container, .trigger_container{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        .jimu-btn {
          padding: 0;
          background: ${theme.colors.palette.light[200]};
          &.active{
            border: 2px solid ${theme.colors.palette.primary[600]};
          }
        }
      }
      .trigger_container{
        justify-content: flex-start;
        .jimu-btn:last-of-type{
          margin-left: 0.5rem;
        }
      }

      .omit-label{
        color: ${theme.colors.palette.dark[400]};
      }
    }

    .options-container {
      .use-wrap{
        .jimu-widget-setting--row-label{
          margin-right: 5px;
        }
      }
    }
  `
}
