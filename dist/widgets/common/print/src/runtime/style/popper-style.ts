import { IMThemeVariables, css, polished } from 'jimu-core'
export const getStyle = (theme: IMThemeVariables, reference) => {
  return css`
    & {
      max-height: ${polished.rem(300)};
      width: ${polished.rem(reference?.current?.clientWidth)};
      overflow: auto;
      padding-top: 0;
      padding-bottom: 0;
      visibility: unset !important;
    }
    &.result-list-con .dropdown-item {
      text-overflow: ellipsis;
      white-space: pre-wrap;
    }
    &.result-list-con .dropdown-item:disabled {
      color: ${theme?.colors?.palette?.secondary?.[800]};
      background-color: ${theme?.colors?.palette?.light?.[200]};
      /* color: ${theme?.colors?.black};
      background-color: ${theme?.colors?.palette?.light?.[100]}; */
    }
    &.result-list-con .dropdown-item:hover, &.result-list-con .dropdown-item:focus {
      color: ${theme?.colors?.black};
      background-color: ${theme?.colors?.palette?.light?.[100]};
    }
    &.result-list-con .dropdown-divider {
      margin-left: 0;
      margin-right: 0;
    }
    &.result-list-con .dropdown-item.active {
      background: ${theme?.colors?.primary};
      color: ${theme?.colors?.white};
    }
    .show-result-button:active, &.result-list-con .show-result-button:focus {
      background-color: ${theme?.colors?.white};
    }
    .dropdown-menu--inner {
      max-height: none;
    }
  `
}

export const dropdownStyle = () => {

}
