import { ThemeVariables, css, SerializedStyles } from 'jimu-core'

export function getStyle (theme: ThemeVariables): SerializedStyles {
  // let theme = this.props.theme;
  return css`
    width: 100%;
    height: 100%;
    overflow: auto;

    .items {
      display: flex;
    }
    `
}

export function getPopupStyle (theme: ThemeVariables): SerializedStyles {
  // let theme = this.props.theme;
  return css`
    padding: 1rem;
    /*margin: 0.5rem;*/
    width: 360px;

    .popup-item-btns-wapper {
      margin: 1rem -0.5rem 0 -0.5rem;
    }
    `
}
