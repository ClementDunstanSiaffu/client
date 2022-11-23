import {
  css,
  polished,
  SerializedStyles,
  AppMode,
  utils,
  IMThemeVariables
} from 'jimu-core'
import { ListProps } from '../widget'
import {
  DirectionType,
  LIST_CARD_PADDING,
  PageStyle,
  DS_TOOL_BOTTOM_PADDING,
  DS_TOOL_H,
  BOTTOM_TOOL_TOP_PADDING,
  BOTTOM_TOOL_H,
  COMMON_PADDING,
  ElementSize,
  ListLayoutType
} from '../../config'

interface LisStyleOption {
  pageStyle: PageStyle
  scrollBarOpen: boolean
  direction: DirectionType
  appMode: AppMode
  theme: IMThemeVariables
  isHeightAuto: boolean
  isWidthAuto: boolean
  currentCardSize: ElementSize
  listTemplateDefaultCardSize: ElementSize
  showTopTools: boolean
  bottomToolH: number
  topRightToolW: number
  hasRecords: boolean
  mexSize: MaxSize
  layoutType: ListLayoutType
  listLeftPadding: number
}

interface MaxSize {
  maxWidth: number
  maxHeight: number | string
}

export const listStyle = utils.memoize(function (
  options: LisStyleOption
): SerializedStyles {
  const {
    showTopTools,
    bottomToolH,
    topRightToolW,
    hasRecords,
    currentCardSize,
    pageStyle,
    scrollBarOpen,
    appMode,
    theme,
    isHeightAuto,
    isWidthAuto,
    listTemplateDefaultCardSize,
    layoutType,
    listLeftPadding
  } = options
  const topToolsH = showTopTools ? DS_TOOL_H : 0
  const direction = layoutType === ListLayoutType.Column ? DirectionType.Horizon : DirectionType.Vertical
  const isHorizon = layoutType === ListLayoutType.Column
  const flexDirection = layoutType === ListLayoutType.Column ? 'column' : 'row'
  return css`
    &.list-container {
      /* position: ${isHeightAuto ? 'absolute' : 'relative'}; */
      position: relative;
      z-index: 0;
      overflow: hidden;
      .bottom-boundary {
        height: 2px;
        width: 2px;
        position: absolute;
        bottom: 0;
        right: 0;
        opacity: 0;
      }
      ${
        direction === DirectionType.Horizon
          ? `
          margin-left: ${LIST_CARD_PADDING + 'px'};
          height: ${isHeightAuto ? 'auto' : '100%'};
          width: ${
            isWidthAuto ? 'auto' : `calc(100% - ${LIST_CARD_PADDING + 'px'})`
          };
        `
          : `
          margin-top: ${LIST_CARD_PADDING + 'px'};
          width: ${isWidthAuto ? 'auto' : '100%'};
          height: ${
            isHeightAuto ? 'auto' : `calc(100% - ${LIST_CARD_PADDING + 'px'})`
          };
        `
      }

      .editing-mask-con {
        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: ${topToolsH}px;
          z-index: 10;
          height: ${currentCardSize.height}px;
          width: ${listLeftPadding}px;
          background-color: ${polished.rgba(theme.colors.black, 0.2)};
        }
        .editing-mask-list-grid {
          position: absolute;
          left: ${currentCardSize.width + listLeftPadding}px;
          top: ${topToolsH}px;
          right: 0;
          z-index: 10;
          height: ${currentCardSize.height}px;
          background-color: ${polished.rgba(theme.colors.black, 0.2)};
        }
      }
      .editing-mask-list {
        position: absolute;
        top: ${
          layoutType !== ListLayoutType.Column && hasRecords
            ? currentCardSize.height + topToolsH
            : topToolsH
        }px;
        left: ${
          layoutType === ListLayoutType.Column && hasRecords
            ? currentCardSize.width
            : 0
        }px;
        bottom: ${polished.rem(bottomToolH)};
        right: 0;
        z-index: 10;
        background-color: ${polished.rgba(theme.colors.black, 0.2)};
      }

      .editing-mask-ds-tool {
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: ${polished.rgba(theme.colors.black, 0.2)};
      }

      .editing-mask-bottom-tool {
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: ${polished.rgba(theme.colors.black, 0.2)};
      }

      .empty-con {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        z-index: 10;
        transform: translateY(-50%);
        padding-top: ${topToolsH}px;
        .jimu-icon {
          color: ${theme.colors.palette.warning[900]};
        }
        .discribtion {
          margin: ${polished.rem(9)} 0 ${polished.rem(8)} 0;
          font-size: ${polished.rem(14)};
          color: ${theme.colors.black}
        }
        .clear-message-action-button {
          width: ${polished.rem(65)};
        }
      }

      .datasource-tools {
        position: relative;
        height: ${polished.rem(topToolsH)};
        padding-bottom: ${polished.rem(DS_TOOL_BOTTOM_PADDING)};
        .sort-fields-input {
          width: 200px;
          margin-left: 8px;
          margin-right: 16px;
        }

        .tool-row {
          height: ${DS_TOOL_H - DS_TOOL_BOTTOM_PADDING}px;
        }
        .ds-tools-line {
          width: 100%;
          height: 1px;
          margin-top: ${polished.rem(6)};
          background-color: ${theme.colors.palette.light[500]};
        }
        .ds-tools-line-blue {
          background-color: ${theme.colors.palette.info[500]};
        }
        .list-search-div {
          width: calc(100% - ${topRightToolW}px);
          .list-search {
            margin-bottom: ${polished.rem(-4)};
            width: 100%;
          }
        }

      }
      .tools-menu {
        color: ${theme.colors.palette.light[800]};
      }
      .tools-menu:hover {
        color: ${theme.colors.palette.info[500]};
      }
      .bottom-tools {
        position: relative;
        padding-top: ${polished.rem(BOTTOM_TOOL_TOP_PADDING)};
        min-height: ${polished.rem(BOTTOM_TOOL_H)};
        .scroll-navigator {
          .btn {
            border-radius: ${theme.borderRadiuses.circle};
          }
        }
      }

      .widget-list-list:focus {
        outline: none;
      }
      .widget-list-list {
        & {
          padding: 0;
          position: relative;
          padding-left: ${`${listLeftPadding}px`};
        }
        &>div {
          position: relative;
          flex: 1;
          box-sizing: content-box;
          ${isHorizon && `padding-right: ${polished.rem(15)}`};
          ${!isHorizon && `padding-bottom: ${polished.rem(15)}`};
        }
        /* box-sizing: border-box; */
        ${
          !window.jimuConfig.isInBuilder || appMode === AppMode.Run
            ? `overflow-${isHorizon ? 'y' : 'x'}: hidden !important;`
            : 'overflow: hidden !important;'
        }
        height: ${
          isHeightAuto
            ? 'auto'
            : `calc(100% - ${topToolsH}px - ${bottomToolH}px)`
        } !important;
        width: ${isWidthAuto ? 'auto' : '100%'} !important;
        display: flex;
        ${`flex-direction: ${flexDirection}`};
        ${isHeightAuto && `min-height: ${listTemplateDefaultCardSize.height}px;`};
        ${isWidthAuto && `min-width: ${listTemplateDefaultCardSize.width}px;`};
        ${
          isHorizon
            ? `
              ${`max-width: ${options.mexSize.maxWidth}px`};
            `
            : `
              ${`max-height: calc(${options.mexSize.maxHeight} - ${topToolsH}px - ${bottomToolH}px)`};
            `
        }
      }
      ${
        pageStyle === PageStyle.Scroll && !scrollBarOpen
          ? `
          .widget-list-list::-webkit-scrollbar {
            display: none; //Safari and Chrome
          }
          .widget-list-list {
              -ms-overflow-style: none; //IE 10+
              overflow: -moz-scrollbars-none; //Firefox
          }
        `
          : ''
      }
      .placeholder-alert-con {
        position: absolute;
        bottom: ${polished.rem(8)};
        right: ${polished.rem(8)};
        z-index: 11;
      }
    }
  `
})

export function getStyle (
  props: ListProps,
  isEditing: boolean,
  showBottomTool: boolean
): SerializedStyles {
  const { config, id, appMode, isHeightAuto, isWidthAuto, theme } = props
  return css`
    ${'&.list-widget-' + id} {
      overflow: visible;
      background-color: transparent;
      border: ${polished.rem(COMMON_PADDING)} solid ${polished.rgba(
    theme.colors.black,
    window.jimuConfig.isInBuilder && isEditing ? 0.2 : 0
  )};
      height: ${isHeightAuto ? 'auto' : '100%'};
      width: ${isWidthAuto ? 'auto' : '100%'};
      .list-with-mask {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-color: ${polished.rgba(theme.colors.black, 0)};
        z-index: 1;
      }
      .list-toggle-button {
        background: none;
      }
      .list-loading-con {
        min-height: ${polished.rem(120)};
        min-width: ${polished.rem(160)};
      }
      .refresh-loading-con {
        right: 0;
        bottom:${showBottomTool ? polished.rem(BOTTOM_TOOL_H) : 0};
        align-items: center;
        height: ${polished.rem(24)};
        .auto-refresh-loading {
          background: ${polished.rgba(theme.colors?.palette?.dark?.[100], 0.2)};
          color: ${theme.colors?.black};
          font-size: ${polished.rem(12)};
          line-height: ${polished.rem(24)};
          padding: 0 ${polished.rem(7)};
        }
        &.horizon-loading {
          bottom:${
            showBottomTool ? polished.rem(BOTTOM_TOOL_H + 6) : polished.rem(6)
          };
        }
        &.vertical-loading {
          right: ${polished.rem(6)};
        }
      }
      .loading-con {
        @keyframes loading {
          0% {transform: rotate(0deg); };
          100% {transform: rotate(360deg)};
        }
        width: ${polished.rem(16)};
        height: ${polished.rem(16)};
        border: 1px solid ${theme?.colors?.palette?.dark?.[100]};
        border-radius: 50%;
        border-top: 1px solid ${theme?.colors?.palette?.dark?.[800]};
        box-sizing: border-box;
        animation:loading 2s infinite linear;
        margin-right: ${polished.rem(4)};
      }
      .widget-list {
        overflow: ${
          window.jimuConfig.isInBuilder && appMode !== AppMode.Run
            ? 'hidden'
            : 'auto'
        };
        height: ${isHeightAuto ? 'auto' : '100%'};
        width: ${isWidthAuto ? 'auto' : '100%'};
        /* align-items: ${config.alignType};
        justify-content: ${config.alignType}; */
        ${
          config.direction === DirectionType.Horizon
            ? `
            overflow-y: hidden;
          `
            : `
            overflow-x: hidden;
          `
        }
      }
    }

  `
}

export function getToolsPopperStyle (props: ListProps): SerializedStyles {
  const { theme } = props
  return css`
    & {
      padding: ${polished.rem(6)} ${polished.rem(11)};
      height: ${polished.rem(40)};
    }
    .ds-tools-line {
      width: 100%;
      height: 1px;
      background-color: ${theme.colors.palette.light[500]};
    }
    .ds-tools-line-blue {
      background-color: ${theme.colors.palette.info[500]};
    }
    .close-search {
      margin-top: ${polished.rem(-6)};
    }
  `
}

export function getSearchToolStyle (props: ListProps): SerializedStyles {
  const { theme } = props
  return css`
    .close-search {
      border: 1px solid ${theme.colors.palette.light[500]};
      box-sizing: border-box;
      background-color: ${theme.colors.white};
    }
    .search-box-content {
      flex-direction: column;
      align-items: flex-start;
    }
  `
}

export function getTopToolStyle (props: ListProps, showTopTools: boolean): SerializedStyles {
  return css`
    .list-data-action {
      & {
        padding-left: ${polished.rem(4)};
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        height: ${polished.rem(16)};
        border-left: 1px solid ${showTopTools ? 'var(--light-400)' : 'transparent'}
      }
    }
    .m-left {
      margin-left: ${polished.rem(4)};
    }
  `
}
