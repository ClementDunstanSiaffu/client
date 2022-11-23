import { ThemeVariables, css, SerializedStyles, polished } from 'jimu-core'

export function getWidgetPlaceholderStyle (): SerializedStyles {
  return css`
    .thumbnail-wrapper {
      margin: ${polished.rem(5)} 0;
    }
  `
}

export function getStyle (/* theme: ThemeVariables */): SerializedStyles {
  return css`
    height: 100%;

    .fly-error-tips {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
    }

    .fly-controller {
      height: 32px;
    }

    .fly-wapper {
      white-space: nowrap;
    }
    `
}

export function getDropdownStyle (theme: ThemeVariables): SerializedStyles {
  return css`
  padding: 5px 10px;
  border: 1px solid ${theme.colors.palette.light[400]};

  .dropdown-items{
    padding: 10px;
  }
  .dropdown-item{
    padding: 5px 0;
  }
  .dropdown-item-title{
    font-size: 13px;
    padding-bottom:5px;
  }

  .dropdown-item-comment{
    font-style:italic;
    font-size: 12px;
    color: ${theme.colors.palette.light[600]};
    letter-spacing: 0;
  }

  .setting-altitude-separator{
    margin: 0 8px 0 4px;
  }

  .alt-wapper {
    align-items: center;
    font-size: 13px;
  }
  .alt-input {
    width: 60px
  }
  `
}

// Toggle speedController
export function getPlayPanelWapperClass (isPlaying: boolean): string {
  let klass = 'hide'
  if (isPlaying) {
    klass = ''
  }
  return klass
}
