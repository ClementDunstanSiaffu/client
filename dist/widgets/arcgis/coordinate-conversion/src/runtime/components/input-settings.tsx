/** @jsx jsx */ // <-- make sure to include the jsx pragma
import { React, jsx, IntlShape, ThemeVariables } from 'jimu-core'
import { IMConfig, OutputSettings } from '../../config'
import {
  Popper, Button, Icon, Select, Option, TextInput, TextArea, AlertPopup, Label, ListGroup, ListGroupItem, defaultMessages as jimuUIDefaultMessages
} from 'jimu-ui'
import { JimuMapView } from 'jimu-arcgis'
import { generateAddressFormat, addressToLocations, getLocationForSuggestion, fetchSuggestion } from '../address-utils'
import {
  Notation, ProcessedCoordinateTextInfo,
  getCoordinateType, processCoordTextInput
} from '../coordinate-utils'
import { getInputCoordsPopupStyle } from '../lib/style'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import defaultMessages from '../translations/default'
import AddPopper from '../components/add-popper'

import Handles from 'esri/core/Handles'
import SpatialReference from 'esri/geometry/SpatialReference'
import Conversion from 'esri/widgets/CoordinateConversion/support/Conversion'
import CoordinateConversionViewModel from 'esri/widgets/CoordinateConversion/CoordinateConversionViewModel'
import Point from 'esri/geometry/Point'
import Graphic from 'esri/Graphic'
import GraphicsLayer from 'esri/layers/GraphicsLayer'
import jsonUtils from 'esri/symbols/support/jsonUtils'
import formatUtils from 'esri/widgets/CoordinateConversion/support/formatUtils'
import geometryService from 'esri/rest/geometryService'

const iconMapPin = require('jimu-ui/lib/icons/map-pin.svg')
const iconCopy = require('jimu-ui/lib/icons/duplicate.svg')
const iconZoom = require('jimu-ui/lib/icons/zoom-out-fixed.svg')
const iconSettings = require('jimu-ui/lib/icons/settings-12.svg')
const iconClose = require('jimu-ui/lib/icons/close-12.svg')
const iconReset = require('jimu-ui/lib/icons/reset-outlined-16.svg')
const iconAddConversion = require('jimu-ui/lib/icons/add.svg')

const LEFT_TO_RIGHT_MARK = '‎'
const DEGREE_SYMBOL = `°${LEFT_TO_RIGHT_MARK}`

interface InputFormatNotation {
  readonly value: string
  label: string
  notation: Notation
}

interface AddressOption {
  readonly value: string
  label: string
  mapPoint: Point
  magicKey?: string
}

interface Props {
  intl: IntlShape
  theme: ThemeVariables
  parentWidgetId: string
  config: IMConfig
  jimuMapview: JimuMapView
  locatorURL: string
  geometryServiceURL: string
  minCandidateScore: number
  maxSuggestions: number
  onConversionComplete: (results: Point) => void
  onClear: () => void
  processing: (value: boolean) => void
  addNewConversion: (formatName: string, label: string, currentPattern: string, addAtTheTop: boolean) => void
  copyAllList: string[]
  isRTL: boolean
  canSuggest: boolean
}

interface IState {
  supportedFormats: OutputSettings[]
  coordinateVM: CoordinateConversionViewModel
  mapPointActive: boolean
  isInputSettingsPopupOpen: boolean
  isAddConversionPopupOpen: boolean
  isCopyMessageOpen: boolean
  defaultCoords: string
  defFormat: string
  disableCopyZoom: boolean
  inputValue: string
  isConfirmInputNotationPopupOpen: boolean
  inputNotationOptions: InputFormatNotation[]
  confirmedInputNotation: string
  inputNotationWarning: string
  addressOptions: AddressOption[]
  selectedAddress: string
  isAddressOptionsPopupOpen: boolean
  isErrorMsgPopupOpen: boolean
  errorMsgPopupTitle: string
  errorMsg: string
}

export default class InputSettings extends React.PureComponent<Props, IState> {
  private readonly _handles: Handles
  private readonly _inputTextbox = React.createRef<HTMLInputElement>()
  private _isMounted: boolean
  private readonly _copyInputTextbox = React.createRef<HTMLInputElement>()
  public drawingLayer: GraphicsLayer
  public currentCoordinateFormat: string
  public location: Point
  private getSuggestionsTimer = null

  constructor (props) {
    super(props)
    this.state = {
      mapPointActive: false,
      isInputSettingsPopupOpen: false,
      isAddConversionPopupOpen: false,
      isCopyMessageOpen: false,
      defaultCoords: this.props.config.inputSettings.defaultCoordinate,
      defFormat: this.props.config.inputSettings.format,
      disableCopyZoom: true,
      inputValue: '',
      coordinateVM: null,
      supportedFormats: null,
      isConfirmInputNotationPopupOpen: false,
      inputNotationOptions: [],
      confirmedInputNotation: '',
      inputNotationWarning: '',
      addressOptions: [],
      selectedAddress: '',
      isAddressOptionsPopupOpen: false,
      isErrorMsgPopupOpen: false,
      errorMsgPopupTitle: '',
      errorMsg: ''
    }
    this.currentCoordinateFormat = this.props.config.inputSettings.defaultCoordinate
    this._handles = new Handles()
    this.location = new Point()
    this._isMounted = false
  }

  componentDidMount = () => {
    //On widget load set focus to input coordinate textbox
    this._inputTextbox.current.focus()
    this._isMounted = true
    if (!this.state.coordinateVM) {
      this.createAPIWidget()
    }
  }

  componentDidUpdate = (prevPops) => {
    //Create CVM and drawing layer if not available or if map view is changed
    if (!this.state.coordinateVM) {
      this.createAPIWidget()
    } else if ((prevPops.jimuMapview && this.props.jimuMapview === null) || (this.props.jimuMapview && this.props.jimuMapview.id !== prevPops.jimuMapview.id)) {
      //prev map was configured and now removed then update the drawing graphics layer
      if (this.drawingLayer) {
        this.drawingLayer.removeAll()
      }
      //if map view is changed destroy prev drawing layer and CVM, since the map SR could be different
      //and the after changing map the drawing and conversions should be shown on new map
      this.state.coordinateVM?.destroy()
      this.drawingLayer?.destroy()
      this._handles?.removeAll()
      //once we set coordinateVM, control will again come into componentDidUpdate and as coordinateVM is null it will call createAPIWidget
      this.setState({ mapPointActive: false, coordinateVM: null })
    } else if (this.props.config.inputSettings !== prevPops.config.inputSettings) {
      //if input settings are changed update defaultCoords & defFormat,
      //also call onInputSettingsOkClicked which will take of updating UI according to selected Coordinate & format
      this.setState({
        defaultCoords: this.props.config.inputSettings.defaultCoordinate,
        defFormat: this.props.config.inputSettings.format
      }, () => {
        this.onInputSettingsOkClicked()
      })
    } else if (this.drawingLayer && this.drawingLayer.graphics.length > 0 &&
      this.props.config.generalSettings.defaultPointSymbol !== prevPops.config.generalSettings.defaultPointSymbol) {
      //If default symbol is updated, update it on the layer (for builder nad Live mode)
      const drawnGraphic = this.drawingLayer.graphics.getItemAt(0)
      const pointSymbol = this.props.config.generalSettings.defaultPointSymbol
      drawnGraphic.symbol = jsonUtils.fromJSON(pointSymbol)
    }

    //check if the geocode service url and number of max suggestions changes from config
    if (prevPops.config.addressSettings.geocodeServiceUrl && prevPops.config.addressSettings.geocodeServiceUrl !== this.props.config.addressSettings.geocodeServiceUrl) {
      this.onClearInputClick()
    } else if (prevPops.maxSuggestions !== this.props.maxSuggestions && this.state.inputValue !== '') {
      const inputText = this.getCleanInput(this.state.inputValue)
      this.displaySuggestionList(inputText)
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false
    //remove previously drawn graphics
    if (this.drawingLayer) {
      this.drawingLayer.removeAll()
      this.drawingLayer.destroy()
    }
    //this will reset the cursor to default
    this._displayDefaultCursor()
  }

  createAPIWidget = () => {
    if (!this.props.locatorURL) {
      return
    }
    if (this.props.jimuMapview && this.props.jimuMapview.view) {
      //create new graphicsLayer to show selected location on map
      this.drawingLayer = new GraphicsLayer({
        listMode: 'hide',
        title: this.nls('_widgetLabel') + ' - Drawing Layer'
      })
      //add layer on the map view
      this.props.jimuMapview.view.map.addMany([this.drawingLayer])
      //To show conversions on map click
      this._handles.add(this.props.jimuMapview.view.on('click', (event) => {
        if (this.state.mapPointActive) {
          this.drawingLayer.removeAll()
          if (event.mapPoint) {
            this.showConversion(event.mapPoint, false)
          }
        }
      }))
      //If multiple widgets are configured, and both have mapPoint tool active,
      //and one of the widget deactivates mapPoint tool, then cross hair cursor is not shown for other widget
      //so on point move check if mapPoint tool is active then _displayMapPointCursor
      this._handles.add(this.props.jimuMapview.view.on('pointer-move', (event) => {
        if (this.state.mapPointActive) {
          this._displayMapPointCursor()
        }
      }))
    }

    if (!this.state.coordinateVM) {
      const cVM = new CoordinateConversionViewModel({
        view: this.props.jimuMapview ? this.props.jimuMapview.view : null
      })
      cVM.watch('messages', () => {
        if (this._isMounted) {
          setTimeout(() => {
            if (!this._isMounted) {
              return
            }
            //Call the pause method to avoid reverse geocode request on map mouse move
            cVM.pause()
            const allFormats = formatUtils.generateDefaultFormats(cVM.messages)
            cVM.conversions.removeAll()

            const allSupportedFormats: OutputSettings[] = []
            const addressFormat: OutputSettings = {
              name: 'address',
              label: this.nls('address'),
              defaultPattern: '',
              currentPattern: '',
              enabled: true,
              isCustom: true
            }
            allSupportedFormats.push(addressFormat)
            //push address format
            const addressFormatConversion = new Conversion({
              format: generateAddressFormat(this.props.locatorURL, this.props.minCandidateScore)
            })
            cVM.conversions.add(addressFormatConversion)

            allFormats.forEach((defaultFormat) => {
              if (defaultFormat.name !== 'basemap') {
                const newConversion = new Conversion({ format: defaultFormat })
                cVM.conversions.add(newConversion)

                const newSupportedFormat: OutputSettings = {
                  name: defaultFormat.name,
                  label: this.nls(defaultFormat.name),
                  defaultPattern: defaultFormat.defaultPattern,
                  currentPattern: defaultFormat.currentPattern,
                  enabled: true,
                  isCustom: true
                }
                allSupportedFormats.push(newSupportedFormat)
              }
            })
            allSupportedFormats.sort((a, b) => a.label.localeCompare(b.label))
            this.setState({
              coordinateVM: cVM,
              supportedFormats: allSupportedFormats
            })
          }, 400)
        }
      })
    }
  }

  nls = (id: string) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages)
    //for unit testing no need to mock intl we can directly use default en msg
    if (this.props.intl && this.props.intl.formatMessage) {
      return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] })
    } else {
      return messages[id]
    }
  }

  onMapPointClick = () => {
    this.setState({
      mapPointActive: !this.state.mapPointActive,
      isAddressOptionsPopupOpen: false
    }, () => {
      if (this.state.mapPointActive) {
        this._displayMapPointCursor()
      } else {
        this._displayDefaultCursor()
      }
    })
  }

  _displayMapPointCursor = () => {
    if (this.props.jimuMapview && this.props.jimuMapview.view) {
      if (this.props.jimuMapview.view && this.props.jimuMapview.view.container &&
        this.props.jimuMapview.view.container.style.cursor !== 'crosshair') {
        this.props.jimuMapview.view.container.style.cursor = 'crosshair'
      }
    }
  }

  _displayDefaultCursor = () => {
    if (this.props.jimuMapview && this.props.jimuMapview.view) {
      if (this.props.jimuMapview.view && this.props.jimuMapview.view.container &&
        this.props.jimuMapview.view.container.style.cursor !== null) {
        this.props.jimuMapview.view.container.style.cursor = null
      }
    }
  }

  onCopyClick = () => {
    //clear prev selection
    if (window.getSelection) {
      window.getSelection().removeAllRanges()
    }
    //create list of input and all output values
    //add current input label format and value
    const inputCoord = this.nls('inputLabel') + '  (' + this.nls(this.currentCoordinateFormat) + ')\r\n' + this.state.inputValue
    let allCoords: string = this.props.copyAllList.join('\r\n\n')
    allCoords = inputCoord + '\r\n\n' + allCoords

    //copy input and all output values
    this._copyInputTextbox.current.value = allCoords
    this._copyInputTextbox.current.select()
    document.execCommand('copy')
    //disable it so that it will not get focus and will not read out the contents in screen reader
    //enable it back after the timeout
    this._copyInputTextbox.current.disabled = true
    this.setState({
      isCopyMessageOpen: true
    })

    setTimeout(() => {
      //Remove the existing selection
      if (window.getSelection) {
        window.getSelection().removeAllRanges()
      }
      this.setState({
        isCopyMessageOpen: false
      })
      this._copyInputTextbox.current.disabled = false
    }, 500)
  }

  onZoomClick = () => {
    //zoom to the selected loaction, which will be the only graphic in drawingLayer
    if (this.drawingLayer && this.drawingLayer.graphics.length > 0) {
      const selectedLocationGraphic = this.drawingLayer.graphics.getItemAt(0)
      this.props.jimuMapview.view.goTo({
        center: selectedLocationGraphic.geometry,
        scale: this.props.config.generalSettings.zoomScale
      })
    }
  }

  onSettingsClick = () => {
    this.setState({
      isInputSettingsPopupOpen: !this.state.isInputSettingsPopupOpen,
      isAddressOptionsPopupOpen: false
    })
  }

  onInputSettingsOkClicked = () => {
    if (this.state.defaultCoords !== 'address' && this.state.defFormat === '') {
      return
    }
    this.setState({
      isInputSettingsPopupOpen: false
    })
    this.currentCoordinateFormat = this.state.defaultCoords
    //update current pattern
    //eslint-disable-next-line
    this.state.coordinateVM.conversions.some((con) => {
      if (con.format.name === this.state.defaultCoords) {
        con.format.currentPattern = this.state.defFormat
        return true
      }
    })
    //if value is valid
    if (this.state.inputValue !== '') {
      this.showConversion(this.location, false)
    }
  }

  onInputSettingsCancelClicked = () => {
    //close the input settings and set the coordinate and format to the current selected format
    //get current pattern
    let currentPattern = ''
    //eslint-disable-next-line
    this.state.coordinateVM.conversions.some((con) => {
      if (con.format.name === this.currentCoordinateFormat) {
        currentPattern = con.format.currentPattern
        return true
      }
    })

    this.setState({
      isInputSettingsPopupOpen: false,
      defaultCoords: this.currentCoordinateFormat,
      defFormat: currentPattern
    })
  }

  onInputCoordinateChange = (event) => {
    if (event.target && event.target.value.trim() === '') {
      this.setState({
        inputValue: '',
        disableCopyZoom: true
      })
      if (this.getSuggestionsTimer) {
        clearInterval(this.getSuggestionsTimer)
      }
      //hide the suggestion list if empty input
      setTimeout(() => {
        if (this.state.isAddressOptionsPopupOpen) {
          this.setState({
            isAddressOptionsPopupOpen: false
          })
        }
      }, 500)
    } else {
      this.setState({
        inputValue: event.target.value
      }, () => {
        const inputText = this.getCleanInput(this.state.inputValue)
        this.displaySuggestionList(inputText)
      })
    }
  }

  displaySuggestionList = (inputText: string) => {
    getCoordinateType(inputText).then((itm) => {
      if (itm && itm.length > 0) {
        if (this.state.isAddressOptionsPopupOpen) {
          this.setState({
            isAddressOptionsPopupOpen: false
          })
        }
      } else {
        if (this.getSuggestionsTimer) {
          clearInterval(this.getSuggestionsTimer)
        }
        this.getSuggestionsTimer = setTimeout(() => {
          if (this.props.canSuggest) {
            // get all the addresses suggestions and show it with the help of value, label and magic key
            fetchSuggestion(this.props.locatorURL, inputText, this.props.maxSuggestions).then(suggestion => {
              const addressOptions = []
              suggestion.suggestionItem.forEach((addrInfo, index) => {
                const addrOption: AddressOption = {
                  value: addrInfo.suggestion + index,
                  label: addrInfo.suggestion,
                  magicKey: addrInfo.magicKey,
                  mapPoint: null
                }
                addressOptions.push(addrOption)
              })
              if (addressOptions.length > 0) {
                this.setState({
                  selectedAddress: addressOptions.length > 0 ? addressOptions[0].value : '',
                  addressOptions: addressOptions,
                  isAddressOptionsPopupOpen: true
                })
              } else {
                this.setState({
                  addressOptions: [],
                  isAddressOptionsPopupOpen: false
                })
              }
            }).catch((error) => {
              console.log(error)
            })
          }
        }, 300)
      }
    })
  }

  showParseCoordinateError = () => {
    this.setState({
      disableCopyZoom: true
    })
    this.showMessage(this.nls('errorMsgTitle'), this.nls('parseCoordinatesError'))
  }

  onReverseConvertComplete = (mapPoint: Point) => {
    if (mapPoint) {
      this.showConversion(mapPoint, true)
    }
    this.props.processing(false)
  }

  onErrorInReverseConvert = (err) => {
    this.showParseCoordinateError()
    console.error(err.message)
    this.props.processing(false)
  }

  isValidNumber = (number: number): boolean => {
    return typeof number === 'number' && isFinite(number)
  }

  isValidPoint = (point: Point): boolean => {
    return point && this.isValidNumber(point.x) && this.isValidNumber(point.y)
  }

  getFromGeoCoordinateString = (parameters: any): Promise<Point> => {
    const { coordinate, spatialReference, formatName } = parameters
    return geometryService.fromGeoCoordinateString(this.props.geometryServiceURL, {
      strings: [coordinate],
      sr: spatialReference,
      conversionType: formatName
    })
      .then((response) => {
        const returnPoint = new Point({
          x: response[0][0],
          y: response[0][1],
          spatialReference
        })

        if (!this.isValidPoint(returnPoint)) {
          throw response
        }

        return returnPoint
      })
      .catch((error: any) => {
        throw new Error(error)
      })
  }

  /**
   * Converts input text to the point from the specified format name
   * @param inputFormatName
   * @param inputText
   * @param useFormatReverseConvert
   */
  reverseConvertInput = (inputFormatName: string, inputText: string, useFormatReverseConvert: boolean) => {
    this.state.coordinateVM.conversions.some((con) => {
      if (inputFormatName === con.format.name) {
        this.props.processing(true)
        if (useFormatReverseConvert) {
          this.state.coordinateVM.reverseConvert(inputText, con.format).then(this.onReverseConvertComplete, this.onErrorInReverseConvert)
        } else {
          this.getFromGeoCoordinateString({
            coordinate: inputText,
            spatialReference: con.format.spatialReference,
            formatName: con.format.name
          }).then(this.onReverseConvertComplete, this.onErrorInReverseConvert)
        }
        return true
      }
      return false
    })
  }

  /**
   * Removes Degree symbol, new line chars and extra spaces if from the input text
   * @param inputText : String
   */
  getCleanInput = (inputText: string): string => {
    //remove degree symbol from the search to match the exp
    inputText = inputText.split(DEGREE_SYMBOL).join('')
    inputText = inputText.replace(/\n/g, '')
    inputText = inputText.replace(/\s+/g, ' ').trim()
    return inputText.toUpperCase()
  }

  getProcessedTextInput = (inputText: string, notation: Notation, testingMode: boolean): string => {
    const coordinateTextInfo: ProcessedCoordinateTextInfo = processCoordTextInput(inputText, notation, testingMode)
    if (coordinateTextInfo.prefixSuffixError && !testingMode) {
      this.showMessage('', this.nls('latLongWarningMessage'))
    }
    return coordinateTextInfo.str
  }

  getCurrentFormat = (): __esri.Format => {
    let currentFormat
    this.state.coordinateVM.conversions.some((con) => {
      if (this.state.defaultCoords === con.format.name) {
        currentFormat = con.format
        return true
      }
      return false
    })
    return currentFormat
  }

  tryParsingFormat = async (inputText: string, conversion: __esri.Conversion): Promise<__esri.Point> => {
    try {
      //reverse convert the input text to get mapPoint
      const mapPoint = await this.state.coordinateVM.reverseConvert(inputText, conversion.format)
      //if map point is valid means the input text is reverseConverted in the the format
      if (mapPoint) {
        //Same text can be reverseConverted into multiple format, to overcome the issue convert the mapPoint using same format
        //and if the inputValue/inputText matches the conversion then consider this as valid result and return it
        const conversions = await this.state.coordinateVM.updateConversions([conversion], mapPoint)
        if (conversions?.length > 0 &&
          (conversions[0]?.displayCoordinate === this.state.inputValue ||
            conversions[0]?.displayCoordinate === inputText)) {
          return mapPoint
        }
        return null
      }
    } catch (e) {
      return null
    }
  }

  onInputKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      if (this.getSuggestionsTimer) {
        clearInterval(this.getSuggestionsTimer)
      }
      const inputText = this.getCleanInput(this.state.inputValue)
      getCoordinateType(inputText).then((itm) => {
        //check if input can be parsed without reverse function
        if (itm && itm.length > 0) {
          if (itm.length === 1) {
            const inputFormatName = itm[0].conversionType
            const useFormatReverseConvert = !(inputFormatName === 'dd' || inputFormatName === 'ddm' || inputFormatName === 'dms')
            const coordText = this.getProcessedTextInput(inputText, itm[0], false)
            this.reverseConvertInput(inputFormatName, coordText, useFormatReverseConvert)
          } else {
            this.confirmInputNotationFromUser(itm)
          }
        } else {
          this.props.processing(true)
          addressToLocations(this.props.locatorURL, inputText, this.props.minCandidateScore).then((addressResult) => {
            if (addressResult && addressResult.length > 0) {
              if (addressResult.length === 1) {
                this.setState({
                  addressOptions: [],
                  isAddressOptionsPopupOpen: false
                }, () => {
                  this.showConversion(addressResult[0].location, true)
                })
              } else {
                const addressOptions = []
                //Get only the valid conversion results
                addressResult.forEach((addrInfo, index) => {
                  const addrOption: AddressOption = {
                    value: addrInfo.address + index,
                    label: addrInfo.address,
                    mapPoint: addrInfo.location
                  }
                  addressOptions.push(addrOption)
                })
                this.setState({
                  selectedAddress: addressOptions.length > 0 ? addressOptions[0].value : '',
                  addressOptions: addressOptions,
                  isAddressOptionsPopupOpen: true
                })
              }
            } else {
              if (this.state.defaultCoords !== 'address') {
                const reverseFormatPromises = []
                this.state.coordinateVM.conversions.forEach((con) => {
                  if (con.format.name !== 'address') {
                    reverseFormatPromises.push(this.tryParsingFormat(inputText, con))
                  }
                })
                //try parsing in all conversion and if valid result is found perform reverseComplete operation on it
                if (reverseFormatPromises.length > 0) {
                  Promise.all(reverseFormatPromises).then((values) => {
                    let resultFound = false
                    values.some((mapPoint) => {
                      if (mapPoint) {
                        resultFound = true
                        this.onReverseConvertComplete(mapPoint)
                        return true
                      }
                      return false
                    })
                    //if no result found show error msg
                    if (!resultFound) {
                      this.showParseCoordinateError()
                    }
                  }, (errResult) => {
                    this.showParseCoordinateError()
                  })
                } else {
                  this.showParseCoordinateError()
                }
              } else {
                this.showParseCoordinateError()
              }
            }
            this.props.processing(false)
          })
        }
      })
    }
  }

  confirmInputNotationFromUser = (itm: Notation[]) => {
    const confirmFormats = []
    itm.forEach((itmInfo) => {
      const newSupportedFormat: InputFormatNotation = {
        value: itmInfo.name,
        label: this.nls(itmInfo.notationType),
        notation: itmInfo
      }
      confirmFormats.push(newSupportedFormat)
    })
    this.setState({
      addressOptions: [],
      isAddressOptionsPopupOpen: false,
      confirmedInputNotation: confirmFormats[0].value,
      inputNotationOptions: confirmFormats,
      inputNotationWarning: itm.length + ' ' + this.nls('multipleNotationLabel'),
      isConfirmInputNotationPopupOpen: true
    })
  }

  onSelectedAddressChange = (addressValue) => {
    this.setState({
      selectedAddress: addressValue
    }, () => {
      if (this.state.selectedAddress) {
        //eslint-disable-next-line
        this.state.addressOptions.some((addrOption: AddressOption) => {
          if (addrOption.value === this.state.selectedAddress) {
            if (addrOption.magicKey) {
              // get the location for selected address/suggestion and set the label of it in input box and show location on map
              getLocationForSuggestion(this.props.locatorURL, addrOption.magicKey, addressValue, this.props.minCandidateScore).then((addressResult) => {
                this.setState({
                  inputValue: addrOption.label
                })
                this.showConversion(addressResult[0].location, true)
              })
            } else if (addrOption.mapPoint) {
              this.showConversion(addrOption.mapPoint, true)
            }
            return true
          }
        })
        this.setState({
          selectedAddress: '',
          addressOptions: [],
          isAddressOptionsPopupOpen: false
        })
      }
    })
  }

  onInputNotationChange = (evt) => {
    this.setState({
      confirmedInputNotation: evt.target.value
    })
  }

  onConfirmInputOkClicked = () => {
    if (this.state.confirmedInputNotation) {
      const inputText = this.getCleanInput(this.state.inputValue)
      let selectedNotation: Notation
      //eslint-disable-next-line
      this.state.inputNotationOptions.some((item) => {
        if (item.value === this.state.confirmedInputNotation) {
          selectedNotation = item.notation
          return true
        }
      })
      const coordText = this.getProcessedTextInput(inputText, selectedNotation, false)
      this.reverseConvertInput(selectedNotation.conversionType, coordText, false)

      this.setState({
        confirmedInputNotation: '',
        inputNotationOptions: [],
        isConfirmInputNotationPopupOpen: false
      })
    }
  }

  onConfirmInputCancelClicked = () => {
    this.setState({
      confirmedInputNotation: '',
      inputNotationOptions: [],
      isConfirmInputNotationPopupOpen: false
    })
  }

  onClearInputClick = () => {
    //remove previously drawn graphics
    if (this.drawingLayer) {
      this.drawingLayer.removeAll()
    }
    //empty the text input
    this.setState({
      inputValue: '',
      disableCopyZoom: true,
      isAddressOptionsPopupOpen: false
    }, () => {
      this.props.onClear()
      this._inputTextbox.current.focus()
    })
  }

  onDefaultCoordsChange = (evt) => {
    this.setState({
      defaultCoords: evt.target.value
    }, () => {
      this.resetToDefaultPattern(this.state.defaultCoords)
    })
  }

  onFormatChange = (e) => {
    const value = e.target.value
    this.setState({
      defFormat: value
    })
  }

  onFormatAcceptValue = (value) => {
    this.setState({
      defFormat: value.trim()
    })
  }

  onResetButtonClick = () => {
    const selectedValue = this.state.defaultCoords
    this.resetToDefaultPattern(selectedValue)
  }

  resetToDefaultPattern = (selectedValue: string) => {
    const selectedItem = this.state.supportedFormats.find(i => i.name === selectedValue)
    if (selectedItem) {
      this.setState({
        defFormat: selectedItem.defaultPattern
      })
    }
  }

  getProjectedLocation = (location: Point, sr: SpatialReference): Promise<Point> => {
    //eslint-disable-next-line
    const formatIndex = this.state.coordinateVM.formats.findIndex((formatItem) => {
      if (formatItem.name === 'dd') {
        return true
      }
    })
    const promise = new Promise<Point>((resolve, reject) => {
      if (formatIndex > -1 && sr) {
        const format = this.state.coordinateVM.formats.getItemAt(formatIndex)
        format._project(location, sr).then((projectedLocation) => {
          resolve(projectedLocation)
        })
      } else {
        resolve(location)
      }
    })
    return promise
  }

  showLocationOnMap = (selectedLocation: Point, centerToLocation: boolean) => {
    if (this.drawingLayer && this.props.jimuMapview && this.props.jimuMapview.view) {
      //project the location in map spatial reference
      this.getProjectedLocation(selectedLocation, this.props.jimuMapview.view.spatialReference).then((location) => {
        this.drawingLayer.removeAll()
        const pointSymbol = {
          type: 'simple-marker',
          color: [0, 76, 163], // blue
          outline: {
            color: [255, 255, 255], // white
            width: 2
          }
        }
        const pointGraphic = new Graphic({
          geometry: location,
          symbol: jsonUtils.fromJSON(this.props.config.generalSettings.defaultPointSymbol ? this.props.config.generalSettings.defaultPointSymbol : pointSymbol)
        })

        this.drawingLayer.add(pointGraphic)
        if (centerToLocation) {
          this.props.jimuMapview.view.set({ center: location })
        }
      })
    }
  }

  showConversion = (location: Point, centerToLocation?: boolean) => {
    //store the current selected location, which can be used when changing input settings
    this.location = location
    //first show selected location on map
    this.showLocationOnMap(location, centerToLocation)
    if (this.state.coordinateVM) {
      this.setState({
        disableCopyZoom: false
      })
      //Only convert the selected location into currently selected input format
      const selectedConversion = this.state.coordinateVM.conversions.filter((con) => {
        return con.format.name === this.currentCoordinateFormat
      })
      //update value in input based on selected input format setting and then emit conversion complete event
      this.state.coordinateVM.updateConversions(selectedConversion.toArray(), location).then((results) => {
        results.forEach((cVMInfo) => {
          if (cVMInfo.format.name === this.currentCoordinateFormat) {
            let inputVal = cVMInfo.displayCoordinate ? cVMInfo.displayCoordinate : ''
            //in case of address as input format and returned address is empty show 'No Address Found' msg in the input box
            if (this.currentCoordinateFormat === 'address' && inputVal === '') {
              inputVal = this.nls('noAddressFoundMsg')
            }
            this.setState({
              inputValue: inputVal
            })
          }
        })
        //for output coordinates format
        this.props.onConversionComplete(location)
      }, (err) => {
        console.log(err.message)
      })
    }
  }

  onAddConversion = () => {
    this.setState({
      isAddConversionPopupOpen: true
    })
  }

  addNewConversion = (formatName: string, label: string, currentPattern: string, addAtTheTop: boolean) => {
    this.props.addNewConversion(formatName, label, currentPattern, addAtTheTop)
  }

  onAddPopperClose = () => {
    this.setState({
      isAddConversionPopupOpen: false
    })
  }

  /**
   * Display's the message in the popup. Can be used to show errors, information and warning messages
   * @param title : string - Popup title
   * @param msg  : string - Text Message
   */
  showMessage = (title: string, msg: string): void => {
    this.setState({
      isErrorMsgPopupOpen: true,
      errorMsgPopupTitle: title,
      errorMsg: msg
    })
  }

  /**
   * Hide the message popup
   */
  hideMessage = (): void => {
    this.setState({
      isErrorMsgPopupOpen: false,
      errorMsgPopupTitle: '',
      errorMsg: ''
    })
  }

  /**
   * Formats value in input box to show minus sign at front in case of RTL
   * @param displayValue : string - Value to be shown in input box
   * @returns : string
   */
  formatDisplayCoordinate = (displayValue) => {
    if (this.props.isRTL && this.currentCoordinateFormat && this.currentCoordinateFormat === 'xy' &&
      displayValue && displayValue.charAt(0) === '-') {
      return displayValue.substr(1) + displayValue.substr(0, 1)
    }
    return displayValue
  }

  getClearIcon = (inputValue: string) => {
    return inputValue.length > 0 && (
      <div aria-label={this.nls('clear')} title={this.nls('clear')}
        onClick={this.onClearInputClick.bind(this)}>
        <Icon
          width={14}
          height={14}
          icon={iconClose}
          className='search-clear'
        />
      </div>
    )
  }

  render () {
    const inputCoordinateStyles = getInputCoordsPopupStyle(this.props.theme)
    return <div css={inputCoordinateStyles} className={'input-container shadow'}>
      <SettingRow className={'w-100'} label={this.nls('inputLabel') + '  (' + this.nls(this.state.defaultCoords) + ')'} flow={'wrap'}>
        <div className={'adjust-buttons w-100 align-items-center'}>
          <div className={this.props.jimuMapview?.view ? 'cc-search-input' : 'cc-search-input search-without-map'}>
            <TextInput role={'textbox'} aria-label={this.nls('inputLabel') + '  (' + this.nls(this.state.defaultCoords) + ')'} size={'sm'}
              placeholder={this.nls('inputPlaceHolder')} onKeyDown={this.onInputKeyDown} id={'textInput' + this.props.parentWidgetId}
              ref={this._inputTextbox} onChange={this.onInputCoordinateChange.bind(this)} className={'search-input'} value={this.formatDisplayCoordinate(this.state.inputValue)}
              suffix={this.getClearIcon(this.formatDisplayCoordinate(this.state.inputValue))}
            />

            {/* Confirm Address list */}
            {this.state.isAddressOptionsPopupOpen &&
              <div ref={'textInput' + this.props.parentWidgetId}>
                <ListGroup className={'addressListGroup p-2 shadow'}>
                  {this.state.addressOptions &&
                    this.state.addressOptions.map((option, index) => {
                      return <ListGroupItem tabIndex={0} className={'listItem'} key={index}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            this.onSelectedAddressChange(option.value)
                          }
                        }}
                        onClick={() => this.onSelectedAddressChange(option.value)}>
                        {option.label}</ListGroupItem>
                    })}
                </ListGroup>
              </div>
            }

            <TextArea tabIndex={-1} className={'hidden-copy-input'} ref={this._copyInputTextbox} />
          </div>
          <Button role={'button'} aria-label={this.nls('mapPoint')} title={this.nls('mapPoint')} className={this.props.jimuMapview?.view ? 'actionButton' : 'hidden'} type={'tertiary'} icon size={'sm'}
            active={this.state.mapPointActive} onClick={this.onMapPointClick.bind(this)}>
            <Icon icon={iconMapPin} size={'17'}></Icon>
          </Button>
          <Button role={'button'} aria-label={this.nls('copyAll')} aria-disabled={this.state.disableCopyZoom} title={this.nls('copyAll')} className={'actionButton'} type={'tertiary'} icon size={'sm'}
            active={this.state.isCopyMessageOpen} id={'refCopy' + this.props.parentWidgetId} disabled={this.state.disableCopyZoom} onClick={this.onCopyClick.bind(this)}>
            <Icon icon={iconCopy} size={'17'}></Icon>
          </Button>
          <Button role={'button'} aria-label={this.nls('zoom')} aria-disabled={this.state.disableCopyZoom} title={this.nls('zoom')} className={this.props.jimuMapview?.view ? 'actionButton' : 'hidden'}
            type={'tertiary'} icon size={'sm'} disabled={this.state.disableCopyZoom} onClick={this.onZoomClick.bind(this)}>
            <Icon icon={iconZoom} size={'17'}></Icon>
          </Button>
          <Button role={'button'} aria-label={this.nls('inputSettingsTitle')} aria-haspopup={'dialog'} title={this.nls('inputSettingsTitle')} className={'actionButton'} type={'tertiary'}
            icon size={'sm'} active={this.state.isInputSettingsPopupOpen} onClick={this.onSettingsClick.bind(this)}>
            <Icon icon={iconSettings} size={'17'}></Icon>
          </Button>
        </div>
      </SettingRow>

      <SettingRow className={'pt-5 add-button-row'}>
        <div className={'addBtn'} title={this.nls('addConversion')}
          id={'refAdd' + this.props.parentWidgetId} onClick={this.onAddConversion.bind(this)}>
          <Icon icon={iconAddConversion} size={'16'}></Icon>
        </div>
      </SettingRow>

      {/* Input format settings popup */}
      <AlertPopup css={inputCoordinateStyles}
        aria-expanded={this.state.isInputSettingsPopupOpen}
        isOpen={this.state.isInputSettingsPopupOpen}
        onClickOk={this.onInputSettingsOkClicked.bind(this)}
        onClickClose={this.onInputSettingsCancelClicked.bind(this)}
        title={this.nls('inputSettingsTitle')}>
        <table cellPadding={10}>
          <tbody>
            <tr>
              <td className={'labelDimension'}>
                <Label>
                  {this.nls('defaultCoordinate')}
                </Label>
              </td>
              <td>
                <Select aria-label={this.nls('defaultCoordinate')} name={'defaultCoords'}
                  size={'sm'} value={this.state.defaultCoords}
                  onChange={this.onDefaultCoordsChange}>
                  {this.state.supportedFormats && this.state.supportedFormats.map((option, index) => {
                    return <Option tabIndex={0} role={'option'} aria-label={option.label} key={index} value={option.name}>{option.label}</Option>
                  })}
                </Select>
              </td>
            </tr>
            <tr className={this.state.defaultCoords === 'address' ? 'hidden' : ''}>
              <td className={'labelDimension'}>
                <Label>
                  {this.nls('coordinateFormat')}
                </Label></td>
              <td>
                <TextInput role={'textbox'} aria-label={this.nls('coordinateFormat')} value={this.state.defFormat} onAcceptValue={this.onFormatAcceptValue} onChange={this.onFormatChange}
                  size={'sm'} className={this.state.defFormat === '' ? 'invalid-value' : ''} />
              </td>
              <td>
                <Button role={'button'} aria-label={this.nls('resetFormat')} title={this.nls('resetFormat')} className={'ml-2'} icon type={'tertiary'} size={'sm'}
                  onClick={this.onResetButtonClick.bind(this)}>
                  <Icon icon={iconReset} size={'16'} />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </AlertPopup>

      {/* Confirm input format notation popup */}
      {this.state.isConfirmInputNotationPopupOpen &&
        <AlertPopup css={inputCoordinateStyles}
          aria-expanded={this.state.isConfirmInputNotationPopupOpen}
          isOpen={this.state.isConfirmInputNotationPopupOpen}
          onClickOk={this.onConfirmInputOkClicked.bind(this)}
          onClickClose={this.onConfirmInputCancelClicked.bind(this)}
          title={this.nls('confirmInputNotation')}>
          <div className={'p-2'}>
            <Label>{this.state.inputNotationWarning}</Label>
            <br />
            <Select aria-label={this.state.inputNotationWarning} name={'confirmedInputNotation'}
              size={'sm'} value={this.state.confirmedInputNotation}
              onChange={this.onInputNotationChange}>
              {this.state.inputNotationOptions &&
                this.state.inputNotationOptions.map((option, index) => {
                  return <Option tabIndex={0} role={'option'} aria-label={option.label} key={index} value={option.value}>{option.label}</Option>
                })}
            </Select>
          </div>
        </AlertPopup>
      }

      {/* Error/Info message popup */}
      {this.state.isErrorMsgPopupOpen &&
        <AlertPopup
          aria-expanded={this.state.isErrorMsgPopupOpen}
          hideCancel={true}
          isOpen={this.state.isErrorMsgPopupOpen}
          onClickOk={this.hideMessage.bind(this)}
          onClickClose={this.hideMessage.bind(this)}
          title={this.state.errorMsgPopupTitle}>
          <div className={'p-2'}>
            {this.state.errorMsg}
          </div>
        </AlertPopup>
      }

      {/* Copy message toast popper */}
      {this.state.isCopyMessageOpen &&
        <Popper
          open={this.state.isCopyMessageOpen}
          version={0}
          placement={'bottom'}
          showArrow={true}
          reference={'refCopy' + this.props.parentWidgetId}
          offset={[0, 0]}>
          <div className={'p-2'}>{this.nls('copySuccessMessage')}</div>
        </Popper>
      }

      {/* Dialog for selecting new format to be added */}
      {this.state.isAddConversionPopupOpen && this.state.supportedFormats && this.state.supportedFormats.length > 0 &&
        <AddPopper
          theme={this.props.theme}
          supportedFormats={this.state.supportedFormats}
          intl={this.props.intl}
          isOpen={this.state.isAddConversionPopupOpen}
          onOkClick={this.addNewConversion}
          onClose={this.onAddPopperClose}>
        </AddPopper>
      }
    </div>
  }
}
