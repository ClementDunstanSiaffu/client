import { ThemeVariables, css, SerializedStyles, polished } from 'jimu-core'

export function getStyle (theme: ThemeVariables, id: string, featureFormStep: 'empty' | 'list' | 'form' | 'new', editCount: number, isAttrMode: boolean): SerializedStyles {
  return css`
    ${'&.edit-widget-' + id} {
      .editor-white-bg{
        background-color: ${theme.colors.white};
      }
      [heading='Edit feature'] .esri-editor__panel-content{
        padding: 0;
        .esri-editor__panel-content--section{
          padding: 8px 16px;
        }
      }
      .esri-editor__content{
        padding: 8px 16px;
      }
      .esri-feature-form{
        ${(featureFormStep === 'empty' || featureFormStep === 'list') && `border-bottom: 1px solid ${theme.colors.palette.light[200]};`}
        background-color: unset;
        .esri-feature-form__form-header{
          margin: 0;
          ${featureFormStep === 'form' && 'display: none;'}
          .esri-feature-form__description-text{
            font-weight: 500;
            font-size: 13px;
          }
        }
      }
      .esri-feature-templates{
        width: 100%;
        height: calc(100% - 40px);
        .esri-item-list{
          height: 100%;
          .esri-item-list__scroller{
            height: 100%;
          }
        }
      }
      .esri-editor__temp-wrapper{
        height: 100%;
      }
      .esri-editor__header{
        min-height: 56px;
        padding-left: ${(!isAttrMode || editCount === 1) ? '15px' : '35px'};
        .esri-widget__heading{
          font-weight: 600;
          font-size: 16px;
          margin: 2px 8px;
          text-align: left;
        }
      }
      .esri-editor__controls{
        ${!isAttrMode && 'justify-content: space-between !important; flex-direction: row !important;'}
        .esri-editor__control-button:first-of-type{
          color: ${theme.colors.white};
          background-color: ${theme.colors.palette.primary[500]};
          border: 1px solid ${theme.colors.palette.primary[500]};
          :hover{
            background-color: ${theme.colors.palette.primary[600]};
          }
        }
        .esri-editor__control-button{
          color: ${theme.colors.palette.dark[800]};
          background-color: ${theme.colors.white};
          border: 1px solid ${theme.colors.palette.light[400]};
          :hover{
            background-color: ${theme.colors.palette.light[100]};
          }
        }
        .esri-editor__control-button + .esri-editor__control-button{
          margin-left: 2%;
        }
      }
      .esri-editor__feature-list-item,
      .esri-item-list__list-item{
        border-color:  ${theme.colors.palette.light[200]};
        box-shadow: unset;
        :hover{
          border-color: ${theme.colors.palette.dark[300]};
        }
      }
      .confirm-scrim{
        position: absolute;
        background-color: var(--calcite-scrim-background);
        width: 100%;
        height: 100%;
        top: 0;
      }
      .esri-editor__prompt__actions{
        .esri-editor__warning-option--primary,
        .esri-editor__warning-option--positive{
          text-align: center;
          padding: ${polished.rem(4)} ${polished.rem(16)};
          line-height: ${polished.rem(22)};
          border: 1px solid var(--calcite-ui-danger);
          border-radius: 0;
          flex: 1;
        }
        .esri-editor__warning-option--primary{
          background-color: transparent;
          color: var(--calcite-ui-danger);
          :hover{
            border-color: var(--calcite-ui-danger-hover);
            color: var(--calcite-ui-danger-hover);
            box-shadow: inset 0 0 0 1px var(--calcite-ui-danger-hover);
          }
        }
        .esri-editor__warning-option--positive{
          background-color: var(--calcite-ui-danger);
          color: ${theme.colors.white};
          :hover{
            border-color: var(--calcite-ui-danger-hover);
            background-color: var(--calcite-ui-danger-hover);
          }
        }
      }
      .attr-height{
        overflow-y: auto;
        height: calc(100% - 112px);
        background-color: ${theme.colors.white};
      }
      .snapping-option{
        position: absolute;
        top: 170px;
        width: calc(100% - 33px);
        margin: 10px 16px;
        padding: 16px 7px 10px;
        border-top: 1px solid ${theme.colors.palette.light[300]};
        .snapping-item{
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }
      }
      .feature-list{
        height: calc(100% - 57px);
        max-height: unset;
        .esri-item-list{
          background-color: unset;
        }
        .esri-editor__scroller{
          max-height: unset;
        }
      }
      .esri-editor__scroller{
        max-height: unset;
        .esri-item-list__scroller{
          max-height: unset;
        }
      }
      .esri-item-list__group{
        padding: 0 12px;
      }
      .esri-editor__message{
        margin: auto;
      }
      .layer-selector{
        padding: 12px 15px;
      }
      .single-buttons{
        flex: 1;
      }
      .multi-buttons{
        width: 49%;
      }
      .add-feature-btn{
        position: absolute;
        right: 15px;
        top: 12px;
        button{
          width: 32px;
          height: 32px;
        }
      }
      .back-list-btn{
        position: absolute;
        left: 15px;
        top: 15px;
      }
      .edit-blank{
        min-height: 300px;
        .placeholder-icon{
          color: ${theme.colors.palette.dark[200]};
        }
        & > div{
          top: calc(50% + 20px);
          transform: translateY(-50%);
        }
        p{
          font-size: ${polished.rem(14)};
          margin-top: ${polished.rem(16)};
          line-height: ${polished.rem(19)};
          color: ${theme.colors.palette.dark[500]};
        }
      }
    }
  `
}
