/** @jsx jsx */
import {
  React,
  ThemeVariables,
  SerializedStyles,
  css,
  jsx,
  polished,
  esri,
  AppMode
} from 'jimu-core'
import { TextInput, Button, InputProps, Popper } from 'jimu-ui'
import { Suggestion } from '../../config'
import { CloseOutlined } from 'jimu-icons/outlined/editor/close'
import { SearchOutlined } from 'jimu-icons/outlined/editor/search'
import { ArrowLeftOutlined } from 'jimu-icons/outlined/directional/arrow-left'
const Sanitizer = esri.Sanitizer
const sanitizer = new Sanitizer()

interface Props {
  theme: ThemeVariables
  placeholder?: string
  searchText?: string
  onSearchTextChange?: (searchText: string) => void
  formatMessage?: (id: string) => string
  onSubmit?: (searchText: string, isEnter: boolean) => void
  showClear?: boolean
  hideSearchIcon?: boolean
  inputRef?: (ref: HTMLInputElement) => void
  searchSuggestion: Suggestion[]
  suggestionWidth: number
  showLoading: boolean
  isShowBackButton?: boolean
  appMode: AppMode
  toggleSearchBoxVisible?: (isVisible: boolean) => void
}

interface Stats {
  searchText: string
  isShowSuggestion: boolean
}

export default class SearchBox extends React.PureComponent<
Props & InputProps,
Stats
> {
  reference: HTMLDivElement
  suggestionRequestTimeout: any
  constructor (props) {
    super(props)
    this.state = {
      searchText: props.searchText || '',
      isShowSuggestion: false
    }
  }

  componentDidUpdate (preProps) {
    if (
      this.props.searchText !== preProps.searchText &&
      this.props.searchText !== this.state.searchText
    ) {
      const { searchText } = this.props
      this.setState({
        searchText: searchText
      })
    }
    if (this.props?.appMode === AppMode.Design && this.state.isShowSuggestion) {
      this.setState({
        isShowSuggestion: false,
        searchText: ''
      })
    }
  }

  handleChange = searchText => {
    this.setState(
      {
        searchText: searchText,
        isShowSuggestion: searchText?.length > 2
      },
      () => {
        const { onSearchTextChange } = this.props
        if (onSearchTextChange) {
          onSearchTextChange(searchText)
        }
      }
    )
  }

  handleSubmit = (value, isEnter = false) => {
    const { onSubmit } = this.props
    if (onSubmit) {
      onSubmit(value, isEnter)
    }
  }

  onKeyUp = evt => {
    if (!evt || !evt.target) return
    if (evt.key === 'Enter') {
      this.setState({
        isShowSuggestion: false
      })
      this.handleSubmit(evt.target.value, true)
    }
  }

  onSuggestionConfirm = suggestion => {
    this.setState(
      {
        searchText: suggestion,
        isShowSuggestion: false
      },
      () => {
        this.handleSubmit(suggestion)
        this.props?.toggleSearchBoxVisible(true)
      }
    )
  }

  handleClear = evt => {
    this.setState({
      searchText: ''
    })
    evt.stopPropagation()
  }

  getStyle = (): SerializedStyles => {
    const { theme } = this.props

    return css`
      position: relative;
      .search-input {
        margin-bottom: -1px;
        padding-left: 3px;
        border: 0;
        // border-bottom-width: 1px;
        // border-bottom-style: solid;
        // border-color: ${theme.colors.primary};
        background: transparent;
        height: ${polished.rem(26)};
        min-width: 0;
        .input-wrapper {
          background: transparent;
          border: none;
          padding: 0;
          height: 100%;
        }
      }
      .search-input:focus {
        background: transparent;
      }
      .search-loading-con {
        @keyframes loading {
          0% {transform: rotate(0deg); };
          100% {transform: rotate(360deg)};
        }
        width: ${polished.rem(13)};
        height: ${polished.rem(13)};
        min-width: ${polished.rem(13)};
        border: 2px solid ${theme?.colors?.palette?.secondary?.[300]};
        border-radius: 50%;
        border-top: 2px solid ${theme?.colors?.palette?.primary?.[500]};
        box-sizing: border-box;
        animation:loading 2s infinite linear;
        margin-right: ${polished.rem(4)};
      }
      .clear-search, .search-back {
        cursor: pointer;
        padding: ${polished.rem(6)};
        background: none;
        border: none;
        color: ${theme?.colors?.palette?.dark?.[800]}
      }
      .search-back {
        margin-left: ${polished.rem(-6)};
      }
      .clear-search:hover {
        background: none;
      }
    `
  }

  getSuggestionListStyle = (): SerializedStyles => {
    const { suggestionWidth } = this.props
    return css`
      & {
        max-height: ${polished.rem(300)};
        min-width: ${polished.rem(suggestionWidth)};
        overflow: auto;
      }
      button {
        display: block;
        width: 100%;
        text-align: left;
        border: none;
        border-radius: 0;
      }
      button:hover {
        border: none;
      }
    `
  }

  clearSearchText = () => {
    const { searchText } = this.state
    if (searchText) {
      this.handleChange('')
      this.setState({
        isShowSuggestion: false
      })
    }
  }

  getTextInputSuffixElement = () => {
    const { theme, showLoading, formatMessage } = this.props
    const { searchText } = this.state
    return (
      <div className='d-flex align-items-center'>
        {showLoading && <div className='search-loading-con' />}
        {searchText && (
          <Button
            color='tertiary'
            className='clear-search'
            icon
            size='sm'
            onClick={this.clearSearchText}
            title={formatMessage('clearSearch')}
          >
            <CloseOutlined size={14} color={theme.colors.palette.dark[800]}/>
          </Button>
        )}
      </div>
    )
  }

  getTextInputPrefixElement = () => {
    const { theme } = this.props
    return (
      <Button
        type='tertiary'
        icon
        size='sm'
        onClick={evt => this.handleSubmit(this.state.searchText)}
      >
        <SearchOutlined size={16} color={theme.colors.palette.light[800]}/>
      </Button>
    )
  }

  render () {
    const {
      placeholder,
      className,
      showClear,
      hideSearchIcon,
      inputRef,
      onFocus,
      onBlur,
      theme,
      searchSuggestion,
      formatMessage,
      isShowBackButton
    } = this.props
    const { searchText, isShowSuggestion } = this.state

    return (
      <div>
        <div
          css={this.getStyle()}
          className={`d-flex align-items-center ${className}`}
        >
          {isShowBackButton && (
            <Button
              color='tertiary'
              className='search-back'
              icon
              size='sm'
              onClick={evt => {
                this.props?.toggleSearchBoxVisible(false)
              }}
              title={formatMessage('topToolBack')}
            >
              <ArrowLeftOutlined size={20} color={theme.colors.palette.dark[800]}/>
            </Button>
          )}
          <TextInput
            className='search-input flex-grow-1'
            ref={inputRef}
            placeholder={placeholder}
            onChange={e => this.handleChange(e.target.value)}
            onBlur={onBlur}
            onFocus={onFocus}
            value={searchText || ''}
            onKeyDown={e => this.onKeyUp(e)}
            prefix={(!hideSearchIcon && !isShowBackButton) && this.getTextInputPrefixElement()}
            suffix={this.getTextInputSuffixElement()}
          />
          {showClear && (
            <Button color='tertiary' icon size='sm' onClick={this.handleSubmit}>
              <CloseOutlined size={12} color={theme.colors.palette.dark[800]}/>
            </Button>
          )}
        </div>
        <div ref={ref => (this.reference = ref)}>
          <Popper
            css={this.getSuggestionListStyle()}
            placement='bottom-start'
            reference={this.reference}
            offset={[0, 8]}
            open={isShowSuggestion}
            trapFocus={false}
            autoFocus={false}
            toggle={e => {
              this.setState({ isShowSuggestion: !isShowSuggestion })
            }}
          >
            {searchSuggestion.map((suggestion, index) => {
              const suggestionHtml = sanitizer.sanitize(
                suggestion.suggestionHtml
              )
              return (
                <Button
                  key={index}
                  type='secondary'
                  size='sm'
                  onClick={() => {
                    this.onSuggestionConfirm(suggestion.suggestion)
                  }}
                  dangerouslySetInnerHTML={{ __html: suggestionHtml }}
                />
              )
            })}
          </Popper>
        </div>
      </div>
    )
  }
}
