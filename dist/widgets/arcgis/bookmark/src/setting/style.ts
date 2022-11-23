import { ThemeVariables, css, SerializedStyles, polished } from 'jimu-core'

export function getStyle (theme: ThemeVariables): SerializedStyles {
  return css`
    &.jimu-widget-bookmark-setting{
      .collapse-btn {
        margin-left: auto;
      }
      .resetting-template {
        cursor: pointer;
        color: ${theme.colors.palette.primary[700]};
        padding: 0 2px 1px 0;
        font-size: ${polished.rem(12)};
      }
      .resetting-template:hover {
        cursor: pointer;
        color: ${theme.colors.palette.primary[800]};
      }
      .bookmark-setting {
        display: flex;
        flex-direction: column;
        height: 100%;
        .bookmark-setting-flex {
          flex: 1;
        }
      }
      .setting-bookmark-list {
        width: 100%;
        display: flex;
        margin-bottom: ${polished.rem(4)};
        justify-content: space-between;
        .bookmark-edit-input {
          padding: 3px 0;
          width: 110px;
          .input-wrapper {
            border: 1px solid transparent;
            input {
              font-size: 16px;
            }
          }
        }
        .bookmark-edit-btn {
          padding: ${polished.rem(6)} 0;
        }
      }
      .setting-bookmark-list:hover {
        cursor: pointer;
        background: ${theme.colors.secondary};
        box-shadow: -2px 0 0 0 ${theme.colors.primary};
      }
      .active-mark {
        background: ${theme.colors.secondary};
        margin-bottom: 0 !important;
        border: 1px solid ${theme.colors.palette.light[600]};
        border-width: 1px 1px 0;
      }
      .active-mark-content {
        border: 1px solid ${theme.colors.palette.light[600]};
        border-width: 0 1px 1px;
        padding: ${polished.rem(8)};
        margin-bottom: ${polished.rem(4)};
      }
      .tips-pos {
        margin-top: -2px;
      }
      .template-group {
        button {
          padding: 0;
        }
        .template-img {
          cursor: pointer;
          width: 100%;
          height: 70px;
          border: 1px solid ${theme.colors.palette.light[500]};
          background-color: ${theme.colors.white};
          margin-right: 0;
          &.active {
            border: 2px solid ${theme.colors.primary};
          }
          &.template-img-h {
            width: 109px;
            height: 109px;
          }
          &.template-img-gallery {
            width: 227px;
            height: 69px;
          }
        }
        .vertical-space {
          height: 10px;
        }
      }
    }
  `
}

export function getNextButtonStyle (theme: ThemeVariables, templateConWidth: number): SerializedStyles {
  return css`
    &.next-con {
      & {
        height: ${polished.rem(48)};
      }
      .position-absolute-con, .position-relative-con {
        padding-top: ${polished.rem(8)};
        margin-left: ${polished.rem(-16)};
      }
      div{
        padding: ${polished.rem(16)};
        background: ${theme.colors.palette.light[300]};
        left: 1rem;
        bottom: 0;
        width: ${templateConWidth}px
      }
    }
  `
}
