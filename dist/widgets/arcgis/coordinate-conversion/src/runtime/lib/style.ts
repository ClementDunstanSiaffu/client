import { ThemeVariables, css, SerializedStyles } from 'jimu-core'

export function getStyle (theme: ThemeVariables): SerializedStyles {
  const bgColor = theme.surfaces[1].bg

  const inputBgColor = theme.colors.palette.primary[700]

  return css`
     overflow: auto;
    .widget-coordinate-conversion {
      min-width: 135px;
      padding: 15px 10px 10px 15px;
      background-color: ${bgColor};

      .input-container {
        background-color: ${inputBgColor};
        padding: 5px;
        border-radius: 2px;

        .jimu-widget-setting--row-label {
          font-weight: bold;
          color: var(--white) !important;
         }

        .actionButton {
          color: var(--primary-200);
          &:hover {
            color: var(--white);
          }
          &:disabled {
            color: var(--primary-400);
          }
        }

         .addBtn svg {
           color: ${inputBgColor};
         }
        }
      }

      .actionButton {
        margin: 2px 0px 0px 2px;
      }

      .actionButton:disabled{
        cursor: default;
      }

      .jimu-widget-setting--row-label {
        font-weight: bold;
      }
    }
  `
}

export function getInputCoordsPopupStyle (theme: ThemeVariables): SerializedStyles {
  return css`
  .adjust-buttons {
    display: flex;
    flex-flow: row wrap;
  }
  
  .labelDimension {
    width: 36%
  }

  .hidden {
    display: none;
  }

  .addressListGroup {
    position: absolute;
    max-height: 10rem;
    overflow-y: auto;
    z-index: 1;
    width: 100%;
    border: 1px solid ${theme.border.color};
  }

  .listItem {
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    margin: -7px -8px 6px -8px;
  }

  .listItem:hover {
    background-color: ${theme.colors.palette.primary[300]};
  }

  .add-button-row {
    position: relative;
    margin-top: 0 !important;
  }

  .addBtn {
    position: absolute;
    top: 8px;
    cursor: pointer;
    border-radius: 15px;
    margin: 0 auto !important;
    height: 28px;
    width: 28px;
    background-color: ${theme.colors.palette.light[100]};
    box-shadow: 0px 0px 2px 2px ${theme.border.color} !important;
    display: flex;
    align-items: center;
   }

   .addBtn svg {
     margin: 0 auto;
   }

  .cc-search-input {
    position: relative;
    width: calc(100% - 118px);
    min-width: 100px;

      .search-clear {
        cursor: pointer;
      }

      .search-input {
        padding-right: 0.25rem;
      }

      .search-input::-ms-clear {
        display: none;
      }
  }

  .hidden-copy-input {
    opacity: 0.01;
    height:0;
    position:absolute;
    z-index: -1;
  }

  .search-without-map {
    width: calc(100% - 60px);
  }

  .invalid-value {
    border: 1px solid ${theme.colors.danger};
    box-shadow: 0 0 5px ${theme.colors.danger};
  }

  `
}

export function getOutputCoordsStyle (theme: ThemeVariables): SerializedStyles {
  return css`
  .outputSection {
    border-radius: 2px;
    padding: 5px;
    margin-top: 10px;
  }

  .format-label {
    width: 12.6rem;
  }

  .hidden {
    display: none;
  }

  .hidden-copy-outputCoords {
    opacity: 0.01;
    height: 0;
    position: absolute;
    z-index: -1;
  }

  .arrow-up {
    transform-origin: center center;
    transform: rotate(180deg);
    transition: transform .5s ease 0s;
  }

  .arrow-down {
    transform-origin: center center;
    transform: rotate(0deg);
    transition: transform .5s ease 0s;
  }

  .details-section-label {
    width: 50%;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .details-section-text {
    width: 50%;
  }

  .details-section-text .input-wrapper {
    padding: 2px;
  }

  .outputSettingsCoordinateLabel {
    margin-top: 5px;
  }

  .outputSettingsFormatLabel {
    margin-bottom: 0px;
    font-weight: bold;
    word-wrap: break-word;
    width: calc(100% - 120px);
    min-width: 20px;
  }

  .outputSettingsAddressLabel {
    max-width: calc(100% - 60px);
  }

  .adjust-buttons {
    display: flex;
    flex-flow: row wrap;
  }

  .invalid-value {
    border: 1px solid ${theme.colors.danger};
    box-shadow: 0 0 5px ${theme.colors.danger};
  }
  `
}
