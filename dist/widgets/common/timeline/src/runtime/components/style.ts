import { ThemeVariables, css, SerializedStyles, polished, getAppStore } from 'jimu-core'
import { getThemeColorValue } from 'jimu-theme'

export function getTimelineStyles (theme: ThemeVariables, marginForLR: number, foregroundColor, backgroundColor, sliderColor): SerializedStyles {
  const isRTL = getAppStore().getState().appContext.isRTL
  foregroundColor = getThemeColorValue(foregroundColor || theme.colors.black, theme)
  backgroundColor = backgroundColor || theme.colors.white
  sliderColor = getThemeColorValue(sliderColor || theme.colors.palette.primary[600])

  return css`
    color: red;
    height: fit-content;
    color: ${foregroundColor};
    background: ${backgroundColor || 'transparent'};

    // Common style
    .timeline-header, .timeline-footer {
      height: 16px;
      display: flex;
      flex-direction: ${isRTL ? 'row-reverse' : 'row'};
      align-items: center;
      justify-content: space-between;
      .zoom-container {
        min-width: 36px;
        display: flex;
        flex-direction: ${isRTL ? 'row-reverse' : 'row'};
      }
      .range-label {
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .timeline-content {
      overflow-x: hidden;

      .timeline-whole {
        .timeline-ticks {
          position: relative;
          .timeline-tick-container {
            position: absolute;
            user-select: none;
            .timeline-tick {
              width: 1px;
              background: ${polished.rgba(foregroundColor, 0.5)};
            }
            .timeline-tick_label {
              font-size: 11px;
              font-weight: 400;
              line-height: 15px;
              width: max-content;
              transform: translate(${isRTL ? '50%' : '-50%'});
              color: foregroundColor;
              &.long-label {
                font-weight: 600;
              }
              &.medium-label {
                font-weight: 500;
              }
              &.short-label {
                font-weight: 400;
              }
              &.timeline-first_label {
                /* transform: ${`translate(-${marginForLR}px)`}; */
                transform: translate(0);
              }
            }

          }

        }
        .timeline-arrow {
          position: absolute;
          &.left-arrow{
            transform: scaleX(-1);
          }
        }
      }

      .timeline-range-container {
        height: 8px;
        /* width: ${`calc(100% - ${marginForLR * 2}px)`}; */
        width: 100%;
        border-radius: 4px;
        background-color: ${polished.rgba(foregroundColor, 0.2)};
        .resize-handlers {
          height: 100%;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          background-color: ${sliderColor};

          .resize-handler {
            width: 8px;
            height: 8px;
            padding: 0;
            overflow: visible;
            border-radius: 8px;
            background: ${sliderColor};
            border: 2px solid ${sliderColor};
          }

          &:hover {
            .resize-handler {
              background: ${backgroundColor};
            }
          }
        }
      }
    }
    .jimu-btn {
        color: ${foregroundColor};
        border-radius: 16px;
        &:hover:not(:disabled) {
          color: ${foregroundColor};
          background-color: ${polished.rgba(foregroundColor, 0.2)};
        }
        &.disabled {
          color: ${polished.rgba(foregroundColor, 0.2)};
        }
        .jimu-icon {
          margin: 0
        }

        .icon-btn-sizer {
          min-width: 0;
          min-height: 0;
        }
    }

    // Clasic style
    &.timeline-classic {
      padding: 1rem 1.5rem;
      .timeline-middle {
        .timeline-content {
          margin: 1rem 0.5rem;
          .timeline-whole {
            .timeline-ticks {
              padding-top: 0.75rem;
              .timeline-tick-container {
                .timeline-tick {
                  &.long-tick {
                    height: 12px;
                    &.no-label {
                      margin-top: 19px;
                    }
                    &.has-label {
                      margin-top: 0;
                    }
                  }
                  &.medium-tick {
                    height: 8px;
                    &.no-label {
                      margin-top: 23px;
                    }
                    &.has-label {
                      margin-top: 8px;
                    }
                  }
                  &.short-tick {
                    height: 4px;
                    &.no-label {
                      margin-top: 27px;
                    }
                    &.has-label {
                      margin-top: 12px;
                    }
                  }
                }
                .timeline-tick_label {
                  margin-bottom: 4px;
                }
              }
            }
            .timeline-arrow {
              top: 78px;
              &.left-arrow{
                left: ${isRTL ? 'unset' : '20px'};
                right: ${isRTL ? '20px' : 'unset'};
              }
              &.right-arrow{
                left: ${isRTL ? '20px' : 'unset'};
                right: ${isRTL ? 'unset' : '20px'};
              }
            }
          }
          .timeline-range-container .resize-handlers .resize-handler {
            min-width: 8px;
          }
        }
      }
      .timeline-footer {
        flex-direction: ${isRTL ? 'row-reverse' : 'row'};
        .play-container {
          min-width: 65px;
          .play-btn {
            margin: 0 0.25rem;
          }
        }
      }

      .jimu-btn {
        padding: 0 !important;
      }
    }

    // Modern style
    &.timeline-modern {
      display: flex;
      flex-direction: ${isRTL ? 'row-reverse' : 'row'};
      padding: 1rem;
      height: 156px;
      .timeline-left, .timeline-right {
        display: flex;
        .play-container {
          display: flex;
          margin-top: 0.5rem;
          flex-direction: column-reverse;
          justify-content: center;
          .next-btn {
            margin-bottom: 0.25rem;
          }
        }
      }
      .timeline-middle {
        flex-grow: 1;
        .timeline-header{
          .range-label {
            margin: 0 0.25rem
          }
          .jimu-btn {
            padding: 0 !important;
          }
        }

        .timeline-content {
          height: 115px;
          margin: 0.5rem;
          margin-bottom: 0;
          .timeline-content-inside {
            border: 1px solid ${polished.rgba(foregroundColor, 0.5)};
            border-radius: 8px;
          }

          .timeline-whole {
            display: flex;
            flex-direction: column;
            .timeline-ticks {
              .timeline-tick-container {
                display: flex;
                flex-direction: column-reverse;
                .timeline-tick {
                  &.long-tick {
                    height: 32px;
                  }
                  &.medium-tick {
                    height: 16px;
                    margin-top: 16px;
                  }
                  &.short-tick {
                    height: 8px;
                    margin-top: 24px;
                  }
                }
                .timeline-tick_label {
                  margin-top: 0.5rem;
                }
              }
            }
            .timeline-arrow {
              top: 68px;
              &.left-arrow{
                left: ${isRTL ? 'unset' : '50px'};
                right: ${isRTL ? '50px' : 'unset'};
              }
              &.right-arrow{
                left: ${isRTL ? '50px' : 'unset'};
                right: ${isRTL ? 'unset' : '50px'};
              }
            }

            .timeline-range-container {
              width: 100%;
              background: transparent;
              .resize-handlers {
                background-color: ${polished.rgba(sliderColor, 0.7)};
                .resize-handler {
                  min-width: 4px;
                  width: 4px;
                  height: calc(100% - 10px);
                  margin: 5px 0;
                  /**TODO */
                  background: transparent;
                  border: none;
                  &.show-bg { /** When handlers.w = 0 */
                    background-color: ${polished.rgba(sliderColor, 0.7)};
                    height: 100%;
                    margin: 0;
                    &:hover {
                      background-color: ${polished.rgba(sliderColor, 0.9)};
                    }
                  }
                }
                &:hover {
                  .resize-handler {
                    background: ${polished.rgba(sliderColor, 0.7)};
                  }
                }
              }
            }
          }
        }
      }

    }
  `
}
