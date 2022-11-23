import { ThemeVariables, css, SerializedStyles/*, polished*/ } from 'jimu-core'

export function getStyle (theme: ThemeVariables): SerializedStyles {
  const containerBorderColor = theme.colors.palette.light[400]

  return css`
    /* List mode */
    .list-item-container {
      background-color: ${theme.colors.white};
      border: 1px solid ${containerBorderColor};

      .main-list {

      }

      .list-item {
        height: 38px;
        min-width: 240px;

        &:hover {
          background-color: ${theme.colors.palette.light[100]};
        }

        .list-item-icon {

        }
        .list-item-name {

        }
      }
    }

    /* Icon mode */
    .icon-item-container {
      background-color: ${theme.colors.white};
      border: 1px solid ${containerBorderColor};

      .icon-item {
        width: 32px;
        height: 32px;
      }
    }
  `
}

export function getPopperStyle (theme: ThemeVariables): SerializedStyles {
  //const containerBorderColor = theme.colors.palette.light[400]
  return css`
    .popper-header {
      background-color: ${theme.colors.white};

      .popper-title {
        margin-bottom: 0;
        font-weight: 600;
        font-size: 16px;
      }
    }
    .popper-content {
      width: 290px;
    }
  `
}
