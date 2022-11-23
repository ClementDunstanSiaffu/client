import { ThemeVariables, css, SerializedStyles, polished, getAppStore } from 'jimu-core'

export function getStyle (theme: ThemeVariables): SerializedStyles {
  return css`

    .widget-setting-coordinate-conversion {

      .cursor-pointer {
        cursor: pointer;
      }

      .map-selector-section .component-map-selector .form-control {
        width: 100%;
      }

      .selectOption {
        width: 227px;
      }
    }
  `
}

export function getTableStyle (theme: ThemeVariables): SerializedStyles {
  return css`

    .tableHeading {
      width: 100%;
      padding: 5px 0px 5px 0px;
      background-color: ${theme.colors.palette.light[400]};
    }

    .coordinateHeaderLabel {
      font-size: 14px;
      padding-left: 10px;
      font-weight: bold;
      flex: 0 0 35%;
    }

    .coordinateHeaderFormat {
      font-size: 14px;
      font-weight: bold;
      flex: 0 0 35%;
    }

    .coordinatesNotation {
      flex: 0 0 33%;
      max-width: 66px;
    }

    .coordinateFormat {
      flex: 0 0 55%;
      max-width: 110px;
    }

    .hidden {
      display: none;
    }

    .rowDimensions {
      width: calc(100% - 17px);
    }

    .alignBox {
      left: 10px;
    }
   
    .coordinate-converion-list-items {

      .jimu-tree-item [data-dndzone-droppable=true] {
        border: 1px solid transparent;
      }

      .jimu-tree-item.jimu-tree-item_dnd-true {
        height: auto;
        padding-top: 0rem;
  
        .jimu-tree-item__body {
          background-color: ${theme.colors.palette.light[200]};
          padding: 8px 0px 8px 0px;
        }
  
        .jimu-tree-item__body: hover {
          background-color: ${theme.colors.palette.light[100]};
        }
      }
    }
  `
}

export function getStyleForEditHeader (theme: ThemeVariables): SerializedStyles {
  return css`
    .layer-item-panel {
      .setting-header {
        padding: ${polished.rem(10)} ${polished.rem(16)} ${polished.rem(0)} ${polished.rem(16)}
      }
      .setting-title {
        font-size: ${polished.rem(16)};
        .layer-item-label {
          color: ${theme.colors.palette.dark[600]};
        }
      }
      .setting-container {
        height: calc(100% - ${polished.rem(50)});
        overflow: auto;

        .title-desc {
          color: ${theme.colors.palette.dark[200]};
        }
      }
    }
  `
}

export function getInputSettingsStyle (theme: ThemeVariables): SerializedStyles {
  return css`
  .formatLabel {
    width: 194px;
  }

  .hidden {
    display: none;
  }
  `
}

export function getOutputSettingsStyle (theme: ThemeVariables): SerializedStyles {
  return css`
  .add-conversion {
    height: ${polished.rem(40)};
    width: 100%;
    color: ${theme.colors.palette.primary[700]};
    font-size: ${polished.rem(14)};
    cursor: pointer;
    &:hover {
      .add-conversion-icon-container {
        background-color: ${theme.colors.palette.primary[800]};
      }
      color: ${theme.colors.palette.primary[800]};
    }
    .add-conversion-icon-container {
      width: 20px;
      height: 20px;
      background-color: ${theme.colors.palette.primary[700]};
      border-radius: 10px;
    }
    .add-conversion-icon {
      color: ${theme.colors.palette.light[300]};
    }
  }
  `
}

export function getAddressSettingsStyle (theme: ThemeVariables): SerializedStyles {
  return css`

  .locator-url {
    background-color: ${theme.colors.palette.dark[200]};
    padding: 2px;
  }
  
  .locator-url label {
    word-break: break-all;
  }
   
  .addrSettingNumericInput {
    width: 105px;
  }
  `
}

export function getAlertPopupStyle (theme: ThemeVariables): SerializedStyles {
  const isRTL = getAppStore().getState().appContext.isRTL

  return css`
    .popupContents {
      width: 450px;
    }

    .invalidServiceURL {
      display: block;
    }

    .validServiceURL {
      display: none;
    }

    .locatorErrorMessage {
      padding-top: 5px;
      color: ${theme.colors.danger};
      font-weight: bold;
    }

    .alertValidationContent {
      height: 42px;
    }
    
    .locaterUrlTextInput .input-wrapper input {
      padding: ${isRTL ? '0 1px' : '0'};
    }
  `
}

export function getGeneralSettingsStyle (theme: ThemeVariables): SerializedStyles {
  return css`
  
  .hint label {
    font-style: italic;
  }

  .zoomScaleInput {
    width: 105px;
  }
  
  .symbolItem {
    cursor: pointer;
  }
  `
}
