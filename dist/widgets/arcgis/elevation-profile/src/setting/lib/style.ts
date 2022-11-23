import { ThemeVariables, css, SerializedStyles, polished, getAppStore } from 'jimu-core'

export function getStyle (theme: ThemeVariables): SerializedStyles {
  return css`
    .widget-setting-elevation-profile {

      .map-selector-section .component-map-selector .form-control {
        width: 100%;
      }
      
      .hidden {
        display: none;
      }
      
      .jimu-tree {
        width: 100%;
      }

      .data-item {
        display: flex;
        flex: 1;
        padding: 0.5rem 0.6rem;
        line-height: 23px;
        cursor: pointer;

        .data-item-name {
          word-break: break-word;
        }
      }

      .warningMsg {
        padding: 0.25rem!important;
        margin-top: -7px;
      }

      .warningMsg .left-part {
        margin-right: 0 !important;
      }

      .color-label {
        color: ${theme.colors.palette.dark[400]};
      }

      .ep-tooltip {
        margin-right: 0.30rem!important;
      }

      .ep-section-title {
        color: var(--dark-800);
      }
    }
  `
}

export function getProfileChartStyle (theme: ThemeVariables): SerializedStyles {
  return css`
    .selectOption {
      width: 114px;
    }

    .color-label {
      color: ${theme.colors.palette.dark[400]};
    }

    .hidden {
      display: none;
    }

    .cursor-pointer {
      cursor: pointer;
    }

    .disabled-label{
      color: ${theme.colors.palette.light[800]};
    }

    .ep-tooltip {
      margin-right: 0.30rem!important;
    }

    .ep-divider-top {
      border-top: 1px solid var(--light-800)
    }
  `
}

export function getPopupStyle (theme: ThemeVariables): SerializedStyles {
  const isRTL = getAppStore().getState().appContext.isRTL

  return css`
    .popupContents {
      width: 450px;
    }

    .alertValidationContent{
      height: 42px;
    }

    .invalidServiceURL {
      display: block;
    }

    .validServiceURL {
      display: none;
    }

    .elevationErrorMessage {
      padding-top: 5px;
      color: ${theme.colors.danger};
      font-weight: bold;
    }

    .elevationUrlTextInput .input-wrapper input {
      padding: ${isRTL ? '0 1px' : '0'};
    }
  `
}

export function getStyleForLI (theme: ThemeVariables): SerializedStyles {
  return css`
    .layer-item-panel {
      .setting-header {
        padding: ${polished.rem(10)} ${polished.rem(16)} ${polished.rem(0)} ${polished.rem(16)}
      }
      .setting-title {
        font-size: ${polished.rem(16)};
        .layer-item-label{
          color: ${theme.colors.palette.dark[600]};
        }
      }
      .setting-container {
        height: calc(100% - ${polished.rem(50)});
        overflow: auto;

        .title-desc {
          color: ${theme.colors.palette.dark[200]};
        }

        .ep-divider-bottom {
          border-bottom: 1px solid var(--light-800)
        }
  
        .ep-divider-hide {
          border-bottom: none !important
        }

        .ep-section-title {
          max-width: 80%;
          color: var(--dark-800);
        }
      }
    }
  `
}

export function getAdvanceSettingsStyle (theme: ThemeVariables): SerializedStyles {
  return css`
    .hidden {
      display: none;
    }

    .color-label {
      color: ${theme.colors.palette.dark[400]};
    }

    .hint {
      font-style: italic;
    }

    .cursor-pointer {
      cursor: pointer;
    }

    .fieldSelectorWidth {
      max-width: 110px;
    }
  
    .fieldLabel {
      width: 93px;
    }

    .selectOption {
      width: 110px;
    }

    .warningMsg {
      width: auto;
    }

    .ep-label {
      max-width: 80%;
      display: inline-block;
      margin-bottom: 0;
      margin-right: 20px;
    }

    .jimu-widget-setting--row-label:not(.form-inline) {
      max-width: none;
    }

    .ep-layers-list {
      width: 100%;

      .layer-data-item {
        display: flex;
        flex: 1;
        padding: ${polished.rem(7)} 0.25rem;
        cursor: pointer;
  
        .layer-data-item-name {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          word-break: break-word;
          -webkit-line-clamp: 2;
          padding: 2px;
          line-height: ${theme.typography.lineHeights.sm};
        }
      }
    }

    .ep-data-source-selector {
      .ds-item {
        display: none;
      }
    }

    .ep-tooltip {
      margin-right: 0.30rem!important;
    }

    .tooltip-color {
      color: var(--dark-800);
    }

    .ep-divider-top {
      border-top: 1px solid var(--light-800)
    }
  `
}

export function getSidePanelStyle (theme: ThemeVariables): SerializedStyles {
  return css`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 259px;
    height: 100%;
    padding-bottom: 1px;
    border-right: 1px solid ${theme.colors.white};
    border-bottom: 1px solid ${theme.colors.white};

    .setting-container {
      height: calc(100% - ${polished.rem(50)});
      overflow: auto;
    }
`
}

export function getGeneralSettingsStyle (theme: ThemeVariables): SerializedStyles {
  return css`
    .hidden {
      display: none;
    }

    .cursor-pointer {
      cursor: pointer;
    }

    .ep-tooltip {
      margin-right: 0.30rem!important;
    }
  `
}

export function getStatisticsListStyle (theme: ThemeVariables): SerializedStyles {
  return css`
    .color-label {
      color: ${theme.colors.palette.dark[400]};
    }

    .ep-statistics-list-items {
      flex: 1;
      max-height: 215px;
      overflow-y: auto;

      .jimu-tree-item [data-dndzone-droppable=true] {
        border: 1px solid transparent;
      }

      .jimu-tree-item.jimu-tree-item_dnd-true {
        height: auto;
        padding-top: 0rem;

        .jimu-tree-item__body {
          padding: 8px 0px 8px 0px;
        }
      }
    }
  `
}
