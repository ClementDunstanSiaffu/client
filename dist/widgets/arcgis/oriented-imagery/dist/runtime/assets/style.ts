import { ThemeVariables, css, SerializedStyles } from 'jimu-core'

export function getStyle (theme: ThemeVariables): SerializedStyles {
  return css`
    
    overflow: auto;
    .widget-orientedimagery {
      width: 100%;
      height: 100%;
  
    
    .oi-widget-selectBtn {
      width: 40px;
      height: 40px;
      padding: 0px;
      color: ${theme.colors.palette.dark[500]};  // ${theme.colors.white};
      background: ${theme.colors.transparent}; // ${theme.colors.palette.primary[600]};
      border-color: ${theme.colors.transparent}; // ${theme.colors.palette.primary[600]};
      position: absolute;
      left: 0px!important;
      z-index: 3;
      /* display: none; */
    }

    .oi-widget-selectBtnSelected {
      color: ${theme.colors.palette.dark[500]}; // ${theme.colors.white};
      background: ${theme.colors.palette.light[400]}; // ${theme.colors.palette.primary[500]};
      border-color: ${theme.colors.palette.light[400]}; // ${theme.colors.palette.primary[500]};
    }

    .oi-widget-selectBtn.oi-btn-css-clear:hover:not(.oi-widget-selectBtnSelected) {
      color: ${theme.colors.palette.dark[300]}; // ${theme.colors.white};
      background: ${theme.colors.palette.light[300]}; // ${theme.colors.palette.primary[500]};
      border-color: ${theme.colors.palette.light[300]};
    }

    .svg-icon {
      fill: currentColor;
      pointer-events: none;
      display: inline-block;
      width: 1.2em;
      height: 1.2em;
      vertical-align: middle;
      padding-right: .15em;
    }

    .oi-label {
        margin: 10px;
        font-size: 13px;
        color: ${theme.colors.white};
    }

    .hide {
      display: none;
    }

    .show {
      display: block;
    }

    /* .oic-click-btn {
        background: ${theme.colors.palette.primary[600]};
        border-radius: 3px;
        padding: 5px;
    } */
    }
    `
}
