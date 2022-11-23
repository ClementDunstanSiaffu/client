import { ThemeVariables, css, SerializedStyles, getAppStore, polished } from 'jimu-core'

export function getStyle (theme: ThemeVariables, mobileFlag: boolean, partProps): SerializedStyles {
  const { id, enableDataAction, isHeightAuto, isWidthAuto } = partProps
  const themeName = getAppStore().getState()?.appConfig?.theme
  const isViolet = themeName === 'themes/morandi/'
  const isInk = themeName === 'themes/ink/'

  return css`
    ${'&.table-widget-' + id} {
      .table-indent{
        width: calc(100% - 32px);
        height: calc(100% - 26px);
        margin: 10px 16px 16px;
        ${isHeightAuto && 'min-height: 240px;'};
        ${isWidthAuto && 'min-width: 360px;'};
        .horizontal-action-dropdown{
          position: absolute;
          right: 17px;
          top: 55px;
          padding-left: 8px;
          border-left: 1px solid ${theme.colors.palette.light[200]};
          button{
            width: 32px;
            height: 32px;
          }
        }
        .tool-dividing-line{
          height: 16px;
          width: 1px;
          display: inline-flex;
          background-color: ${theme.colors.palette.light[400]};
          margin: 8px 4px;
        }
        .data-action-btn{
          position: relative;
          // top: 1px;
        }
      }
      .tab-flex{
        width: 100%;
      }
      .top-drop{
        width: 30%;
        min-width: 150px;
        button{
          line-height: 1.5;
        }
      }
      .nav-underline{
        height: 32px;
        border-bottom: 1px solid ${theme.colors.palette.light[300]};
        .nav-item{
          ${(isViolet || isInk) && 'height: 30px;'}
        }
      }
      .nav-item + .nav-item{
        margin-left: 0;
      }
      .csv-dropdown-con{
        button{
          border-radius: 13px;
        }
      }
      .vertical-tag-list{
        width: 20%;
        display: inline-block;
        .tagBtn{
          width: 100%;
        }
      }
      .horizontal-tag-list{
        .tagBtn{
          width: 150px;
        }
        .tab-content{
          height: 8px;
        }
      }
      .vertical-tag-list,
      .horizontal-tag-list{
        margin-bottom: 4px;
        .activeBtn{
          color: #fff;
          background-color: #076fe5;
        }
      }
      .dropdown-tag-list{
        height: 40px;
        margin-bottom: 4px;
        .dropdown-button{
          height: 30px;
        }
      }
      .vertical-render-con{
        width: 80%;
        position: absolute;
        left: 20%;
        height: 100%;
        top: 0;
      }
      .dropdown-render-con,
      .horizontal-render-con{
        width: 100%;
        height: 100%;
      }
      .top-button-list{
        margin: 8px 0;
        position: absolute;
        right: 17px;
        top: 47px;
        ${mobileFlag ? 'display: none' : 'display: flex'};
        .top-button{
          display: inline-flex;
          button{
            width: 32px;
            height: 32px;
          }
        }
      }
      .table-search-div{
        position: absolute;
        left: 18px;
        .table-search{
          .search-icon{
            z-index: 2;
          }
          .search-input{
            border: 1px solid ${theme.colors.palette.light[400]};
            border-radius: 2px;
            .input-wrapper{
              height: 30px;
              border: none;
            }
          }
        }
      }
      .table-con{
        width: 100%;
        height: calc(100% - 46px);
        .esri-widget{
          background-color: transparent;
        }
        .esri-feature-table__loader-container{
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -16px;
          margin-top: -20px;
          z-index: 2;
        }
        .esri-feature-table__title{
          display: none
        }
        .esri-feature-table__menu{
          position: absolute;
          right: ${enableDataAction ? '60px' : '11px'};
          top: 51px;
          ${!mobileFlag && 'display: none'};
          .esri-button-menu{
            button{
              :hover{
                background-color: ${theme.darkTheme
? (isViolet ? theme.colors.palette.light[800] : theme.colors.palette.light[600])
                  : theme.colors.palette.light[100]};
              }
              background-color: ${theme.darkTheme ? theme.colors.palette.light[500] : theme.colors.white};
              color: ${theme.colors.black};
              border-radius: ${isViolet ? '50%' : '2px'};
              border: 1px solid ${theme.darkTheme ? theme.colors.palette.light[500] : theme.colors.palette.light[400]};
            }
          }
        }
        .esri-column__sorter{
          overflow-x: hidden;
        }
      }
      .adv-select-con{
        width: 200px;
        visibility: hidden;
        position: absolute;
        right: 17px;
        top: 56px;
      }
      .placeholder-table-con{
        height: calc(100% - 85px);
        width: 100%;
        position: relative;
        top: 40px;
        .jimu-widget-placeholder{
          width: 100%;
        }
        .placeholder-alert-con{
          position: absolute;
          right: 10px;
          bottom: 10px;
        }
      }
      .placeholder-reset-con{
        height: calc(100% - 114px);
        width: calc(100% - 32px);
        position: absolute;
        top: 95px;
        z-index: 1001;
        .placeholder-reset-button{
          position: absolute;
          top: calc(50% + 42px);
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
      }
      .ds-container{
        position: absolute;
        display: none;
      }
      .dropdown-button-content{
        .table-action-option-close{
          display: none;
        }
      }
      .refresh-loading-con {
        right: 0;
        bottom: 1px;
        height: ${polished.rem(24)};
        .auto-refresh-loading {
          background: ${polished.rgba(theme.colors?.palette?.dark?.[100], 0.2)};
          color: ${theme.colors?.black};
          font-size: ${polished.rem(12)};
          line-height: ${polished.rem(24)};
          padding: 0 ${polished.rem(7)};
        }
      }
    }
  `
}

export function getSuggestionStyle (suggestionWidth?: number): SerializedStyles {
  return css`
    & {
      max-height: ${polished.rem(300)};
      min-width: ${polished.rem(200)};
      overflow: auto;
    }
    button {
      display: block;
      width: 100%;
      text-align: left;
      border: none;
      border-radius: 0;
    }
    button:hover {
      border: none;
    }
  `
}
