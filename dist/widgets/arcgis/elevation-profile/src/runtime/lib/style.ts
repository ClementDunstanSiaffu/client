import { ThemeVariables, css, SerializedStyles } from 'jimu-core'

export function getStyle (theme: ThemeVariables): SerializedStyles {
  const bgColor = theme.surfaces[1].bg

  return css`
    overflow: auto;
    background-color: ${bgColor};
    .widget-elevation-profile {
      width: 100%;
      height: 100%;
      min-height: 200px;

      .userGuideInfo {
        font-weight: 400;
        overflow-y: auto;
        height: 65px;
      }

      .front-section {
        min-width: 200px;
        min-height: 200px;
        max-height: 250px;
        max-width: 220px;
      }

      .front-cards {
        border-radius: 7px;
      }

      .hidden {
        display: none;
      }

      .mainSection {
        padding: 20px;
      }

      .adjust-cards {
        gap: 2px 35px;
        width: 100%;
        max-height: -webkit-fill-available;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
  `
}

export function getContainerStyle (theme: ThemeVariables): SerializedStyles {
  let bodyHeight = 'calc(100% - 83px)'
  if (theme.typography.fontSizeRoot === '125%') {
    bodyHeight = 'calc(100% - 92px)'
  } else if (theme.typography.fontSizeRoot === '87.5%') {
    bodyHeight = 'calc(100% - 78px)'
  } else if (theme.typography.fontSizeRoot === '75%') {
    bodyHeight = 'calc(100% - 73px)'
  }
  return css`
    .ep-widget-header {
      .chart-actions {
        float: right;
        width: 32px;
        height: 32px;
        margin: 2px 5px 2px 5px;
      }
    }

    .ep-widget-bodyContainer {
      height: ${bodyHeight};

      .alignInfo {
        padding-right: 40px;
        padding-left: 40px;
      }

      .userInfo .left-part {
        font-weight: 400;
      }
    }

    .floatingInfoMsg {
      .alignDismissibleInfo {
        position: absolute;
        left: 53px;
        width: calc(100% - 109px);
        z-index: 1;
        bottom: 55px;
        margin: 0 auto;
      }

      .alignDismissibleInfo .left-part .text-left {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        font-weight: 400;
      }

      .showMessage {
        display: flex;
      }

      .hideMessage {
        display: none;
      }
    }

    .ep-widget-footer {
      line-height: 1.3;
      background-color: unset;
      border: 1px solid ${theme.colors.palette.light[200]};
      width: calc(100% - 9px);
      margin-left: 4px;

      .hidden {
        display: none;
      }

      .footer-display {
        display: inline-block;
      }

      .actionButton {
        float: right;
      }
    }
  `
}

export function geSettingsOptionsStyle (theme: ThemeVariables): SerializedStyles {
  return css`
  .settingsLabel {
    margin: 0 !important;
    font-weight: 500;
  }

  .selectLayerWarningMsg {
    padding: 1px !important;
    background-color: transparent !important;
    border: none !important;
    font-size: 11px;
  }

  .selectLayerWarningMsg .left-part {
    color: var(--warning-900) !important;
    margin-right: 0 !important;
  }

  .custom-multiselect .jimu-dropdown .jimu-btn .dropdown-button-content {
    padding-top: 3px;
    padding-bottom: 3px;
  }
  `
}

export function getChartStyle (theme: ThemeVariables, legendColor): SerializedStyles {
  return css`
    .ep-shadow {
      box-shadow: 0 0 8px 3px rgba(0,0,0,0.2)!important;
    }

    .ep-legend {
      height: 100px;
      overflow-y: auto;
    }

    .ep-legend-section {
      border-radius: 2px;
      padding: 5px;
      margin-top: 10px;
      border-left: 3px solid ${legendColor};
      min-width: 120px;
    }

    .cursor-pointer {
      cursor: pointer
    }

    .legendLabel {
      margin-bottom: 0px;
      font-weight: bold;
      word-wrap: break-word;
    }

    .expand-collapse-button {
      &:hover {
        color: ${theme.colors.palette.secondary[900]};
      }
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

    .stat-content {
      display: block;
      padding: 12px 15px;
      padding-top: 0;
    }

    .profile-statistics {
      --max-width: 105px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(var(--max-width), 1fr));
      gap: 2px 22px;
      width: 100%;
    }

    .statistic-info {
      display: block;
      text-align: start;
    }

    .statistic-label {
      font-weight: 500;
    }
  `
}
