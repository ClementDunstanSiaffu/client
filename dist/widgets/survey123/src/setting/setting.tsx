/* eslint-disable multiline-ternary */
/** @jsx jsx */
import {
  React, Immutable, IMFieldSchema, DataSource, DataSourceManager, jsx, SessionManager, css, moduleLoader, portalUrlUtils,
  DataSourceTypes, getAppStore, ClauseValuePair, semver
} from 'jimu-core'
import { AllWidgetSettingProps, builderAppSync } from 'jimu-for-builder'
import { appServices } from 'jimu-for-builder/service'
import { MapWidgetSelector, SettingSection, SettingRow, JimuLayerViewSelector } from 'jimu-ui/advanced/setting-components'
import { ArcGISDataSourceTypes, IMJimuLayerViewInfo } from 'jimu-arcgis'
import { Button, TextInput, TextArea, Select, Radio, Switch, Label, Modal, AlertPopup, TagInput, AdvancedSelect } from 'jimu-ui'
import { IMConfig } from '../config'
import { survey123Service } from '../service/survey123.service'
import defaultMessages from './translations/default'
import { getStyle, getModalStyle } from './css/style'
import { CloseOutlined } from 'jimu-icons/outlined/editor/close'
import { LinkHorizontalOutlined } from 'jimu-icons/outlined/application/link-horizontal'
import { TrashOutlined } from 'jimu-icons/outlined/editor/trash'
export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig>, any> {
  /**
   * state variable
   */
  supportedMapTypes = Immutable([ArcGISDataSourceTypes.WebMap])
  supportedLayerTypes = Immutable([DataSourceTypes.FeatureLayer])
  dsManager = DataSourceManager.getInstance()
  public state: any = {
    userTags: [],
    canCreateSurvey: true,
    loadApiFailed: false,
    /**
     * survey123
     */
    newSurveyTitle: null,
    newSurveyTags: [],
    newSurveyTitleDirty: false,
    newSurveyTagsDirty: false,
    newSurveySnippet: null,
    newSurveyItemId: null,
    newSurveyThumbnailUrls: [
      'https://survey123.arcgis.com/assets/img/default-thumbnails/Image01.png',
      'https://survey123.arcgis.com/assets/img/default-thumbnails/Image02.png',
      'https://survey123.arcgis.com/assets/img/default-thumbnails/Image03.png'
    ],
    newSurveyMsg: null,
    newSurveyLoading: false,
    existSurveyMsg: null,
    existSurveys: [],
    selectedSurvey: null,
    modalIsOpen: false,
    mode: 'none',
    isCheckedSurveyItemId: false,
    isShowSurveyQuestionField: false,
    surveyQuestionFields: [],
    selectedQuestionField: null,
    createSurveyErrorMsg: null,
    surveyStatusCode: 0,
    isShowCloseDesignerAlert: false,
    surveyChanged: false,
    /**
     * data source
     */
    dsMapView: null,
    dsFeatureLayer: null,
    dsFeatureLayerFields: [],

    /**
     * field-question mapping
     */
    mapWidgetList: [],
    addMapping: null,
    editMapping: null,

    /**
     * selected layer info for view/edit mode
     */
    layerViewInfoInNewMode: null,
    layerViewInfoInEditMode: null,
    layerViewInfoInViewMode: null,
    useMapWidgetIdsInNewMode: null,
    useMapWidgetIdsInEditMode: null,
    useMapWidgetIdsInViewMode: null
  }

  public newDefaultValue: {
    key: string
    value: string
  } = {
    key: '',
    value: ''
  }

  public API: any = {
    survey123: null,
    Survey123WebForm: null
  }

  public isPortal: boolean = false
  public isOrgAdmin: boolean = false
  public isTagRequired: boolean = false

  // private _survey123HostUrl: string = survey123Service.getSurvey123HostUrl();
  // private _dsManager = DataSourceManager.getInstance();

  /**
   * constructor
   * @param props
   */
  constructor (props: any) {
    super(props)

    /**
     * query existing survey
     */
    survey123Service.setQueryObject(this.props.queryObject)
    this.isPortal = !(portalUrlUtils.isAGOLDomain(this.props.config.portalUrl || this.props.portalUrl))
    this.checkTagRequired()
    const user = this.props.user
    this.isOrgAdmin = !!((user && user.role === 'org_admin'))
    this.prepare().then(() => {
      this.setDefaultVal()
      this.querySurvey()
      this.addDesigerHandler()
    })
      .catch((e) => {
        setTimeout(() => {
          if (this.state.loadApiFailed) {
            this.setState({
              existSurveyMsg: `<p class="error-message">${e.message || ''}</p>`,
              mode: 'survey-createSurvey',
              newSurveyMsg: e.message || '',
              loadApiFailed: true
            })
          }
        }, 0)
      })
  }

  /**
   * for old app created before 9.3, set the default mode as 'new'
   * set state from saved config
   */
  setDefaultVal = () => {
    if (!this.props.config.mode) {
      this.setMode('new')
    }

    const mode = this.props.config.mode || 'new'
    const layerViewInfo = this.props.config.layerViewInfo || null
    const useMapWidgetIds = this.props.useMapWidgetIds || null

    if (mode === 'new') {
      this.setState({
        layerViewInfoInNewMode: layerViewInfo,
        useMapWidgetIdsInNewMode: useMapWidgetIds
      })
    } else if (mode === 'edit') {
      this.setState({
        layerViewInfoInEditMode: layerViewInfo,
        useMapWidgetIdsInEditMode: useMapWidgetIds
      })
    } else if (mode === 'view') {
      this.setState({
        layerViewInfoInViewMode: layerViewInfo,
        useMapWidgetIdsInViewMode: useMapWidgetIds
      })
    }
  }

  /**
   * prepare:
   * get survey123 host url from portal's config.js
   * load survey123 js api
   */
  prepare = () => {
    return Promise.resolve(true)
      .then(() => {
        if (this.isPortal) {
          const portalUrl = this.props.config.portalUrl || this.props.portalUrl
          return survey123Service.getSurveyHostUrlFromPortal(portalUrl)
        }
        return true
      })
    /**
     * load survey client api if it's connecting to portal
     */
      .then(() => {
        if (this.isPortal) {
          return this.loadSurveyAPI()
        }
        return true
      })
  }

  // set state: dsFeatureLayer after loaded if the dataSourceId exist
  componentDidMount = () => {
    this.checkPrivilige()
    const useDataSources = this.props.useDataSources
    const dataSourceId = (useDataSources && useDataSources.length) ? useDataSources[0].dataSourceId : null
    if (dataSourceId) {
      const dataSource: any = this.dsManager.getDataSource(dataSourceId)
      const layer = dataSource ? dataSource.layer : null
      this.setState({
        dsFeatureLayer: layer,
        dsFeatureLayerFields: this.getLayerFields(layer)
      })
    }
    const user = this.props.user
    this.isOrgAdmin = !!((user && user.role === 'org_admin'))
    this.isPortal = !(portalUrlUtils.isAGOLDomain(this.props.config.portalUrl || this.props.portalUrl))
    this.checkTagRequired()
    this.getUserTags()
  }

  // load survey api
  loadSurveyAPI = () => {
    const apiUrl = survey123Service.getSurvey123HostAPIUrl()
    if (!this.API.survey123) {
      return moduleLoader.loadModule(apiUrl)
        .then((survey123) => {
          this.API = survey123
          // this.API.Survey123WebForm = Survey123WebForm;
          if (!survey123) {
            const apiErrMsg = this.props.intl.formatMessage({ id: 'errLoadS123JSAPI', defaultMessage: defaultMessages.errLoadS123JSAPI }, { S123JSAPIURL: apiUrl })
            this.setState({
              loadApiFailed: true
            })
            throw new Error(apiErrMsg)
          } else {
            this.setState({
              loadApiFailed: false,
              existSurveyMsg: '',
              newSurveyMsg: ''
            })
          }
          return survey123
        })
    } else {
      return Promise.resolve(this.API.survey123)
    }
  }

  /**
   * check the user privilige of creating featureservice and creating portal item
   */
  checkPrivilige = () => {
    const user = getAppStore().getState().user
    const privileges = user.privileges || []
    const canCreateSurvey = privileges.includes('portal:user:createItem') && privileges.includes('portal:publisher:publishFeatures')
    this.setState({
      canCreateSurvey: canCreateSurvey
    })
  }

  /**
   * tags for an item become optional since portal 10.9.1(the rest api version of portal 10.9.2 is 9.2)
   */
  checkTagRequired = () => {
    let portalVersion = this.props.portalSelf ? this.props.portalSelf.currentVersion : null
    this.isTagRequired = false
    if (portalVersion && this.isPortal) {
      if ((portalVersion + '').split('.').length < 3) {
        portalVersion += '.0'
      }
      try {
        this.isTagRequired = semver.lt(portalVersion, '9.2.0')
      } catch (e) {
        // ignore
      }
    }
    return this.isTagRequired
  }

  /**
   * get user tags
   * @returns
   */
  getUserTags = () => {
    if (window.jimuConfig.isDevEdition) {
      return false
    }
    const username = getAppStore().getState().user.username
    appServices.getUserTags(username).then(res => {
      const userTags = res?.tags?.map(el => {
        return el.tag
      })
      this.setState({
        userTags: userTags || []
      })
    })
  }

  getLayerFields = (layer) => {
    if (!layer) {
      return []
    }
    // clone the layer.fields
    const fields = Object.assign({}, { fields: layer.fields }).fields
    if (layer.type !== 'feature') {
      // table or other type (has no geometry)
      return fields
    }
    const existGeoField = (fields || []).find((item) => {
      return item.name === 'geometry'
    })
    if (existGeoField) {
      return fields
    }
    const type = layer.geometryType
    const geometryTypeStr = this.nls('geometryType' + type.substr(0, 1).toUpperCase() + type.substr(1))

    fields.push({
      alias: `${this.nls('geometryLabel')}(${geometryTypeStr})`,
      name: 'geometry'
    })
    return fields
  }

  /**
   * on setting value changed
   */
  onValueChanged = (evt: React.FormEvent<HTMLInputElement>) => {
    const target = evt.currentTarget

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set(target.name, target.value)
    })
  }

  nls = (id: string) => {
    return this.props.intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] })
  }

  /**
   * add default value
   */
  addDefaultValue = (evt: any) => {
    if (this.newDefaultValue.key && this.newDefaultValue.value) {
      /**
       * clear newDefaultValue key / value
       */
      this.newDefaultValue = {
        key: '',
        value: ''
      }
    }
  }

  /**
   * listen to the desinger iframe
   */
  addDesigerHandler = () => {
    window.addEventListener('message', (evt) => {
      if (evt.data) {
        let data = evt.data
        // if the window get the message from other iframe, maybe it cannot be converted to object
        // We can only sure the message from webform can be converted to object
        try {
          if (typeof evt.data === 'string') {
            data = JSON.parse(evt.data) || {}
          }
        } catch (e) {
          // don't show the error
        }
        if (data.event === 'survey123:design:onFormPublished' && data.data) {
          let surveyStatusCode = this.state.surveyStatusCode || 0
          surveyStatusCode++
          builderAppSync.publishChangeWidgetStatePropToApp({ widgetId: this.props.id, propKey: 'surveyStatusCode', value: surveyStatusCode })
          this.setState({
            surveyStatusCode: surveyStatusCode
          })
          this.handleCloseModal()
        } else if (data.event === 'survey123:design:onFormUnsaved' && data.data) {
          this.setState({
            surveyChanged: true
          })
        } else if (data.event === 'survey123:design:onFormSaved' && data.data) {
          this.setState({
            surveyChanged: false
          })
        }
      }
    })
  }

  /**
   * get field alias by fild name
   */
  getFielAlias = (field) => {
    const fields = this.state.dsFeatureLayerFields || []
    const target = fields.find((item) => {
      return item.name === field
    })
    if (target) {
      return target.alias || target.name
    }
    return field
  }

  /**
   * get question label by question name
   */
  getQuestionLabel = (questionName) => {
    const questions = this.state.surveyQuestionFields || []
    const target = questions.find((item) => {
      return item.name === questionName
    })
    if (target) {
      return target.label || target.name
    }
    return questionName
  }

  /**
   * on new survey value changed
   */
  onNewSurveyValueChanged = (e: React.FormEvent<HTMLInputElement>, type: string) => {
    const target = e.currentTarget

    if (type) {
      this.setState({
        [type]: target.value
      })
    }
    if (type === 'newSurveyTags') {
      this.setState({
        newSurveyTagsDirty: true
      })
    } if (type === 'newSurveyTitle') {
      this.setState({
        newSurveyTitleDirty: true
      })
    }
  }

  /**
   * onExistSurveyChanged
   */
  onExistSurveyChanged = (valuePairs: ClauseValuePair[]) => {
    if (valuePairs && valuePairs.length) {
      this.updateMapWidgetList()
      this.setState({
        selectedSurvey: valuePairs[0]
      })
    } else {
      this.setState({
        selectedSurvey: null
      })
    }

    // if (target.value && target.value !== 'null') {
    //   /**
    //    * update selected survey
    //    */
    //   const selectedSurvey = this.state.existSurveys.find((survey) => survey.id === target.value)
    //   this.updateMapWidgetList()
    //   this.setState({
    //     selectedSurvey: selectedSurvey
    //   })
    // }
  }

  /**
   * create survey
   */
  createSurvey = () => {
    if (!this.state.canCreateSurvey) {
      return
    }
    /**
     * handle title, tags, description
     */
    const title = this.state.newSurveyTitle
    let tags = null
    if (this.state.newSurveyTags && this.state.newSurveyTags.length) {
      tags = this.state.newSurveyTags.map((tag) => tag.trim())
    }
    const snippet = this.state.newSurveySnippet
    if (!title) {
      this.setState({
        newSurveyTitleDirty: true
      })
    }
    if (this.isTagRequired) {
      if (!this.state.newSurveyTags || !this.state.newSurveyTags.length) {
        this.setState({
          newSurveyTagsDirty: true
        })
      }
    }

    if (!title) {
      return
    }
    if (this.isTagRequired && (!tags || !tags.length)) {
      return
    }

    return Promise.resolve(true)
      .then(() => {
        /**
         * update msg
         */
        this.setState({
          newSurveyMsg: '',
          newSurveyLoading: true
        })
        const randomIdx = parseInt(Math.random() * 10 + '') % 3
        const thumbnail = this.state.newSurveyThumbnailUrls[randomIdx]
        if (this.isPortal) {
          const options = {
            title: title,
            tags: tags,
            token: this.props.token,
            thumbnailUrl: thumbnail,
            portalUrl: this.props.config.portalUrl || this.props.portalUrl
          }
          return this.API.survey123.createSurvey(options)
        } else {
          return survey123Service.createSurvey(title, tags, {
            token: this.props.token,
            username: this.props.user?.username,
            /**
             * portalUrl
             */
            portalUrl: this.props.config.portalUrl || this.props.portalUrl
          }, {
            snippet: snippet,
            thumbnailUrl: thumbnail
          })
        }
      })
      .then((res: any) => {
        if ((this.isPortal && res.id) || (!this.isPortal && res.success === true)) {
          this.updateMapWidgetList()
          /**
           * set item id
           */
          this.setState({
            createSurveyErrorMsg: null,
            newSurveyItemId: res.id,
            selectedSurvey: res,
            newSurveyLoading: false
          })

          return res.id
        }
        throw res
      })
      .then((itemId: string) => {
        if (!itemId) {
          return
        }
        /**
         * we should set hides in config
         */
        this.props.onSettingChange({
          id: this.props.id,
          config: this.props.config.set('hides', ['navbar', 'header', 'description', 'footer', 'theme'])
        })

        /**
         * show survey123 designer modal
         */
        this.showSurvey123DesignerModal(itemId)
      })
      .catch((err) => {
        if (err) {
          /**
           * In fact, if the error code is 400, the reason can be multiple, maybe it's not because the survey name is duplicated.
           * update msg
           */
          // if (err.error && err.error.code + '' === '400') {
          //   this.setState({
          //     createSurveyErrorMsg: this.props.intl.formatMessage({ id: 'surveyTitleDuplicateMsg', defaultMessage: defaultMessages.surveyTitleDuplicateMsg }),
          //     newSurveyLoading: false,
          //     newSurveyTitleDirty: false
          //   })
          //   return null
          // } else {
          const error = err.error ? err.error : err
          let errorMsg = error.message ? error.message : (typeof error === 'string') ? err : ''
          if (error.details && error.details.length) {
            error.details.forEach((detail) => {
              errorMsg += ' ' + detail
            })
          }
          this.setState({
            newSurveyMsg: errorMsg || 'Create survey failed.',
            newSurveyLoading: false
          })
          // }
        }
        console.error(err)
      })
  }

  /**
   * query survey
   */
  querySurvey = (options?: {
    isShared?: boolean
    isPublished?: boolean
  }) => {
    // options
    options = Object.assign({
      isShared: false,
      isPublished: false
    }, options || {})
    return Promise.resolve(true)
      .then(() => {
        if (this.props.config.surveyItemId && this.props.config.selectedSurvey) {
          const selectedSurvey = this.props.config.selectedSurvey
          // this.state.mode = 'settings';
          setTimeout(() => {
            this.props.onSettingChange({
              id: this.props.id,
              config: this.props.config.set('surveyItemId', selectedSurvey.id)
            })
            /**
             * switch to settings page
             */
            this.updateMapWidgetList()
            this.setState({
              existSurveyMsg: null,
              mode: 'settings',
              selectedSurvey: selectedSurvey
            })
          }, 0)
          // this.setSurveyItemId();
          const queryOption: any = {
            isShared: options.isShared,
            isPublished: options.isPublished,
            queryFromClient: this.isPortal,
            surveyClientAPI: this.API
          }
          if (this.isOrgAdmin) {
            queryOption.searchSurveyType = 'all-admin'
          }
          return survey123Service.querySurvey({
            username: this.props.user?.username,
            token: this.props.token,
            portalUrl: this.props.config.portalUrl || this.props.portalUrl
          }, queryOption)
            .then((surveys: any[]) => {
              const surveyItems = this.getSurveyItems(surveys)
              this.setState({
                existSurveys: surveyItems
              })
            })
        }
      })
      .then(() => {
        if (this.state.mode === 'none') {
          this.setState({
            mode: 'survey-createSurvey'
          })
        }

        /**
         * update msg
         */
        this.setState({
          existSurveyMsg: '<div class="survey-list-loading-outter"><div class="jimu-secondary-loading"></div></div>'
        })
        const queryOption: any = {
          isShared: options.isShared,
          isPublished: options.isPublished,
          queryFromClient: this.isPortal,
          surveyClientAPI: this.API
        }
        if (this.isOrgAdmin) {
          queryOption.searchSurveyType = 'all-admin'
        }
        return survey123Service.querySurvey({
          username: this.props.user.username,
          token: this.props.token,
          portalUrl: this.props.config.portalUrl || this.props.portalUrl
        }, queryOption)
      })
      .then((surveys: any[]) => {
        // console.log(surveys);
        /**
         * update msg and existing surveys
         */
        const surveyItems = this.getSurveyItems(surveys)
        this.setState({
          existSurveyMsg: null,
          existSurveys: surveyItems
        })
        if (!surveys || !surveys.length) {
          this.setState({
            existSurveyMsg: `<p class="no-survey-message">${this.props.intl.formatMessage({ id: 'noExistingSurvey', defaultMessage: defaultMessages.noExistingSurvey })}</p>`
          })
        }

        /**
         * update selected survey
         */
        const usedSurveyItemId = this.props.config.surveyItemId
        if (usedSurveyItemId) {
          const selectedSurvey = surveys.find((survey) => survey.id === usedSurveyItemId)
          if (selectedSurvey) {
            this.updateMapWidgetList()
            this.setState({
              selectedSurvey: selectedSurvey
            })
            this.props.onSettingChange({
              id: this.props.id,
              config: this.props.config.set('selectedSurvey', selectedSurvey)
            })
          }
        }
      })
      .catch((err) => {
        this.setState({
          mode: 'survey-createSurvey',
          existSurveyMsg: `<p class="error-message">${this.props.intl.formatMessage({ id: 'errmsgGeneralLoading', defaultMessage: defaultMessages.errmsgGeneralLoading })}</p>`
        })
        console.log(err)
      })
  }

  /**
   * convert survey to AdvancedSelectItem type
   * @param surveys
   */
  getSurveyItems = (surveys) => {
    // const surveyItems = [];
    (surveys || []).forEach((survey) => {
      survey.value = survey.id
      survey.label = survey.title
      survey.render = () => {
        return (
          <div css={css`width: 178px;text-overflow: ellipsis; white-space: nowrap;overflow: hidden;`} title={survey.title}><span>{survey.title}</span></div>
        )
      }
    })
    return surveys
  }

  /**
   * get survey question fields
   */
  getSurveyQuestionFields = (): Promise<any[]> => {
    const surveyItemId = this.props.config.surveyItemId

    return Promise.resolve(true)
      .then(() => {
        if (surveyItemId && this.props.token && this.isPortal && this.API.getForm) {
          const params = {
            itemId: surveyItemId,
            token: this.props.token,
            portalUrl: this.props.config.portalUrl || this.props.portalUrl || 'https://www.arcgis.com'
          }
          return this.API.getForm(params)
        }
        return null
      })
      .then((res: any) => {
        // if the request from js api failed, try to request the rest api
        if (res && res.questions) {
          return res
        }
        if (surveyItemId && this.props.token) {
          return survey123Service.getSurveyQuestionFields(surveyItemId, {
            token: this.props.token,
            portalUrl: this.props.config.portalUrl || this.props.portalUrl || 'https://www.arcgis.com'
          })
        }
        return null
      })
      .then((res: any) => {
        const fields = []
        if (res && res.questions && res.questions.length > 0) {
          // flat the questions tree, move the questions out if they are in the group.
          const questions = survey123Service.flatQuestions(res.questions)

          questions.forEach((q: any) => {
            const shortType = (q.type + '').replace('esriQuestionType', '')
            if (q.fieldName || ['geopoint', 'polyline', 'polygon'].includes(shortType.toLowerCase())) {
              fields.push({
                name: q.fieldName || q.name,
                label: q.label
              })
            }
          })
        }

        this.setState({
          surveyQuestionFields: fields
        })
        return fields
      })
  }

  /**
   * show survey123 designer modal
   */
  showSurvey123DesignerModal (surveyItemId?: string) {
    surveyItemId = surveyItemId || this.props.config.surveyItemId
    const sessionManager = SessionManager.getInstance()
    const portalUrl = this.props.config.portalUrl || this.props.portalUrl

    if (!surveyItemId) {
      throw new Error('cannot get survey item id to open survey123 designer')
    }

    /**
     * popup window and embed survey123 designer
     */
    let url = survey123Service.getSurvey123DesignerUrl(surveyItemId, {
      portalUrl: portalUrl
    })

    /**
     * we need to add access_token / username / expires_in in hash
     * to tell survey123 website to parse the hash to use the token
     */
    const session = sessionManager.getMainSession()
    if (session && session.token && session.username && session.tokenDuration) {
      url += `#access_token=${session.token}&username=${session.username}&expires_in=${session.tokenDuration}`
    }

    /**
     * show modal
     */
    this.setState({
      modalIsOpen: true,
      newSurveyMsg: null
    })

    /**
     * cannot use window.open because address bar will be shown.
     * try to use modal and iframe to show survey123 designer webpage
     */
    // eslint-disable-next-line
    const self = this
    let index = 0
    const checkTimer = setInterval(() => {
      if (!self.state.modalIsOpen) {
        self.setState({
          modalIsOpen: true
        })
      }
      index++
      const target: any = document.getElementById('survey123-designer')
      if (target || index > 100) {
        clearInterval(checkTimer)
        target.src = url
      }
    }, 50)

    // setTimeout(() => {
    //   let target: any = document.getElementById('survey123-designer');
    //   target.src = url;
    // }, 200);
  }

  /**
   * remove default value
   */
  // removeDefaultValue = (key: string, evt: any) => {
  //   let defaultValue = this.props.config.defaultValue;
  //   if (key && defaultValue[key]) {
  //     delete defaultValue[key];
  //   }
  // }

  /**
   * show setting page
   */
  showSettingPage = () => {
    this.setState({
      mode: 'settings'
    })
    /**
     * get survey question fields
     */
    this.getSurveyQuestionFields()
  }

  /**
   * handle close modal
   */
  handleCloseModal = () => {
    if (this.state.surveyChanged) {
      this.setState({
        isShowCloseDesignerAlert: true
      })
      return
    }
    this.setState({
      modalIsOpen: false
    })
    this.setState({
      surveyChanged: false
    })

    this.showSettingPage()

    /**
     * update survey itemid in props config
     */
    const surveyItemId = this.state.newSurveyItemId || this.props.config.surveyItemId
    if (surveyItemId) {
      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.set('surveyItemId', surveyItemId).set('timestamp', Date.now()).set('mode', 'new')
      })
    }

    /**
     * update the survey list
     */
    this.querySurvey()
  }

  /**
   * handler close desinger alert popup
   */
  handleCloseDesignerAlert = (isOk) => {
    this.setState({
      isShowCloseDesignerAlert: false
    })
    if (isOk) {
      this.setState({
        surveyChanged: false
      })
      setTimeout(() => {
        this.handleCloseModal()
      }, 0)
    }
  }

  onTagInputChange = (data: string[]) => {
    this.setState({
      newSurveyTags: data
    })
  }

  /**
   * get thumbnail url from portal
   */
  getThumbnailUrl = () => {
    const portalUrl = this.props.config.portalUrl || this.props.portalUrl || 'https://www.arcgis.com'
    const surveyItemId = this.state.selectedSurvey.id
    const thumbnail = this.state.selectedSurvey.thumbnail
    if ((thumbnail + '').startsWith('http://') || (thumbnail + '').startsWith('https://')) {
      return thumbnail
    }
    return `${portalUrl}/sharing/rest/content/items/${surveyItemId}/info/${thumbnail}?token=${this.props.token}`
  }

  /**
   * set survey item id
   * update this.props.config
   */
  setSurveyItemId = () => {
    const selectedSurvey = this.state.selectedSurvey
    if (selectedSurvey && selectedSurvey.id) {
      /**
       * update props to have the same setting in runtime
       * and ensure the hides are all switched on
       */
      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.set('surveyItemId', selectedSurvey.id).set('hides', ['navbar', 'header', 'description', 'footer', 'theme']).set('mode', 'new')
      })

      /**
       * switch to settings page
       */
      this.setState({
        mode: 'settings'
      })
    }
  }

  /**
   * edit survey
   */
  editSurvey = () => {
    this.showSurvey123DesignerModal()
  }

  /**
   * set appearance
   */
  setAppearance = (isChecked: boolean, value: string) => {
    // let target = e.currentTarget;
    // let value = target.value;
    // clone this.props.config.hides
    const hides: any = [].concat(this.props.config.hides || [])
    // let isChecked = target.checked;

    if (isChecked && hides.indexOf(value) >= 0) {
      const pos = hides.indexOf(value)
      hides.splice(pos, 1)
      // hides = hides.concat([value])
    } else {
      hides.push(value)
    }
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('hides', hides)
    })
  }

  /**
   * set survey mode: new/view/edit
   * @param mode
   * @returns
   */
  setMode = (mode) => {
    if (this.props.config.mode === mode) {
      return
    }
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('mode', mode)
    })
  }

  /**
   * set selected map view
   */
  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    // update the state first.
    const mode = this.props.config.mode || 'new'
    if (mode === 'new') {
      if (!useMapWidgetIds || !useMapWidgetIds.length) {
        this.clearMapping()
      }
      this.setState({
        useMapWidgetIdsInNewMode: useMapWidgetIds
      })
    } else if (mode === 'edit') {
      this.setState({
        useMapWidgetIdsInEditMode: useMapWidgetIds
      })
    } else if (mode === 'view') {
      this.setState({
        useMapWidgetIdsInViewMode: useMapWidgetIds
      })
    }

    // then update the config.useMapWidgetIds.
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds
    })
  }

  /**
   * on feature layer view selected
   */
  // onFeatureLayerViewSelected = (useDataSources: UseDataSource[]) => {
  //   const d = useDataSources[0];
  //   if (d && d.dataSourceJson && d.rootDataSourceId) {
  //     /**
  //      * update state
  //      */
  //     this.setState({
  //       dsMapView: null,
  //       dsFeatureLayer: d
  //     });

  //     /**
  //      * embed params
  //      */
  //     let embeds = this.props.config.embeds || [];
  //     if (embeds.indexOf('associatedMap') === -1) {
  //       embeds = embeds.concat(['associatedMap']);
  //     }

  //     /**
  //      * update useDataSources
  //      */
  //     this.props.onSettingChange({
  //       id: this.props.id,
  //       config: this.props.config.set('embeds', embeds).set('dsType', ArcGISDataSourceTypes.FeatureLayer)
  //       /* useDataSources: Immutable([{
  //         dataSourceId: d.dataSourceJson.id,
  //         rootDataSourceId: d.rootDataSourceId
  //       }]) as ImmutableArray<IMUseDataSource> */
  //     });
  //   }
  // }
  updateMapWidgetList = () => {
    // get the map widget list
    const state = window._appState
    const appConfig = window && window.jimuConfig && window.jimuConfig.isBuilder ? state.appStateInBuilder && state.appStateInBuilder.appConfig : state.appConfig
    const widgets = appConfig && appConfig.widgets
    // eslint-disable-next-line max-len
    const mapWidgetList = widgets ? Object.keys(widgets).filter(wId => widgets[wId] && widgets[wId].manifest && widgets[wId].manifest.properties && widgets[wId].manifest.properties.canCreateMapView).map(wId => widgets[wId]) : []
    this.setState({
      mapWidgetList: mapWidgetList
    })
  }

  activeLinkDataChange = (e) => {
    const target = e.currentTarget
    const isActive = target.checked
    if (isActive) {
      this.updateMapWidgetList()
    }

    /**
     * update activeLinkData in data source
     */
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('activeLinkData', isActive)
    })
  }

  /**
   * on map view selected
   */
  // onMapViewSelected = (useDataSources: UseDataSource[], d: UseDataSource) => {
  //   if (d && d.dataSourceJson) {
  //     // if (d && d.dataSourceJson && d.rootDataSourceId) {
  //     // let mapViewDSJson = d.dataSourceJson;

  //     /**
  //      * update state
  //      */
  //     this.setState({
  //       dsMapView: d,
  //       dsFeatureLayer: null,
  //       dsFeatureLayerFields: []
  //     });

  //     /**
  //      * embed params
  //      */
  //     let embeds = this.props.config.embeds || [];
  //     if (embeds.indexOf('associatedMap') === -1) {
  //       embeds = embeds.concat(['associatedMap']);
  //     }

  //     /**
  //      * update props
  //      */
  //     this.props.onSettingChange({
  //       id: this.props.id,
  //       config: this.props.config.set('embeds', embeds).set('selectedSurveyQuestionFields', []).set('dsType', ArcGISDataSourceTypes.Map)
  //       /* useDataSources: Immutable([{
  //         dataSourceId: d.dataSourceJson.id,
  //         rootDataSourceId: d.rootDataSourceId
  //       }]) as ImmutableArray<IMUseDataSource> */
  //     });
  //   }
  // }

  /**
   * on feature layer field selected
   */
  onFieldSelected = (allSelectedFields: IMFieldSchema[], field: IMFieldSchema, ds: DataSource) => {
    /**
     * update fields in data source
     */
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.setIn(['title', 'field'], field.name),
      useDataSources: [{
        dataSourceId: this.props.useDataSources[0].dataSourceId,
        mainDataSourceId: this.props.useDataSources[0].mainDataSourceId,
        dataViewId: this.props.useDataSources[0].dataViewId,
        rootDataSourceId: this.props.useDataSources[0].rootDataSourceId,
        fields: [field.name]
      }]
    })
  }

  /**
   * select a feature layer
   * todo: check and remove the layerViewInfo from config, move it to state
   */
  onDataSourceSelected = (jimuLayerViewInfo: IMJimuLayerViewInfo) => {
    // todo: consider the mode
    const mode = this.props.config.mode || 'new'
    if (mode === 'new' && !jimuLayerViewInfo) {
      this.clearMapping()
    }
    const dataSourceId = jimuLayerViewInfo ? jimuLayerViewInfo.dataSourceId : null
    const dataSource: any = this.dsManager.getDataSource(dataSourceId)
    const layer = dataSource ? dataSource.layer : null

    if (mode === 'new') {
      if (!dataSourceId || !dataSource || !layer) {
        this.clearMapping()
      }
      this.setState({
        layerViewInfoInNewMode: jimuLayerViewInfo,
        dsFeatureLayer: layer,
        dsFeatureLayerFields: this.getLayerFields(layer)
      })
    } else if (mode === 'edit') {
      this.setState({
        layerViewInfoInEditMode: jimuLayerViewInfo
      })
    } else if (mode === 'view') {
      this.setState({
        layerViewInfoInViewMode: jimuLayerViewInfo
      })
    }

    // let schema = null;

    // if (dataSource) {
    //   schema = dataSource.getSchema();
    //   fields = schema ? (schema.fields || []) : [];
    // }

    const rootDataSourceId = jimuLayerViewInfo ? jimuLayerViewInfo.rootDataSourceId : null
    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: [{
        dataSourceId: dataSourceId,
        mainDataSourceId: dataSourceId,
        rootDataSourceId: rootDataSourceId
      }],
      config: this.props.config.set('layerViewInfo', jimuLayerViewInfo).set('fieldQuestionMapping', null)
    })

    // this.props.onSettingChange({
    //   id: this.props.id,
    //   useDataSources: [{
    //     dataSourceId: currentSelectedDs.dataSourceJson.id,
    //     rootDataSourceId: currentSelectedDs.rootDataSourceId
    //   }],
    // }, [{
    //   id: `${this.props.id}-output`,
    //   label: `${this.props.label} Query Result`,
    //   type: ArcGISDataSourceTypes.FeatureLayerView,
    //   originDataSources: [{dataSourceId: currentSelectedDs.dataSourceJson.id, rootDataSourceId: currentSelectedDs.rootDataSourceId}]
    // }]);
  }

  /**
   * change the layer field in field-question mapping panel
   */
  addMapppingChange = (type: string, e: any) => {
    const target = e.currentTarget
    const value = target.value
    let field = this.state.addMapping ? this.state.addMapping.field : null
    let question = this.state.addMapping ? this.state.addMapping.question : null
    if (type === 'field') {
      field = value
    } else {
      question = value
    }
    this.setState({
      addMapping: {
        field: field,
        question: question
      }
    })
  }

  /**
   * clear the setting of field-question mapping
   */
  clearMapping = () => {
    // todo:
  }

  onDataSourceRemoved = () => {
    // todo
  }

  /**
   * trigger evnet type change
   */
  triggerEventTypeChange = () => {

  }

  /**
   * show edit mapping panel
   */
  showEditMappingPanel = (index, e?) => {
    const curEditMapping = this.state.editMapping || {}
    if (curEditMapping.index === index) {
      return
    }
    let mappings = this.props.config.fieldQuestionMapping || []
    mappings = (index >= 0 && index < mappings.length) ? mappings[index] : null
    const newMapping = Object.assign({}, mappings) as any
    newMapping.index = index
    this.setState({
      editMapping: newMapping,
      addMapping: null
    })
  }

  /**
   * change the edit mapping
   */
  changeEditMapping = (type: string, e: any) => {
    const target = e.currentTarget
    const value = target.value
    const curSetting = Object.assign({}, this.state.editMapping || {})
    if (type === 'field') {
      curSetting.field = value
    } else {
      curSetting.question = value
    }
    this.setState({
      editMapping: curSetting
    })
  }

  /**
   * change an field/question mapping
   */
  editMapping = (index) => {
    const mapping = [].concat(this.props.config.fieldQuestionMapping || [])
    const curEditMapping = this.state.editMapping || {}
    if (index >= 0 && index < mapping.length) {
      mapping[index] = {
        field: curEditMapping.field,
        question: curEditMapping.question
      }
    }
    // delete mapping[field];
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('fieldQuestionMapping', mapping)
    })
  }

  /**
   * add connection for field and question
   */
  activeAddFieldQuestionConnPanel = () => {
    this.setState({
      addMapping: {
        field: null,
        question: null
      },
      editMapping: null
    })
  }

  /**
   * hide the field-question panel
   */
  deactiveAddFieldQuestionConnPanel = () => {
    this.setState({
      addMapping: null
    })
  }

  deleteConnection = (index, e?) => {
    if (e) {
      e.stopPropagation()
    }
    const mapping = [].concat(this.props.config.fieldQuestionMapping || [])
    if (index >= 0 && index < mapping.length) {
      mapping.splice(index, 1)
    }
    // delete mapping[field];
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('fieldQuestionMapping', mapping)
    })
  }

  /**
   * add a field-question mapping
   */
  addFieldQuestionConn = (e) => {
    const field = this.state.addMapping.field
    const question = this.state.addMapping.question
    if (!field || !question) {
      console.log('Please ensure field/question is not null.')
      return
    }

    const mapping = [].concat(this.props.config.fieldQuestionMapping || [])
    mapping.push({
      field: field,
      question: question
    })
    // mapping[field] = question;

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('fieldQuestionMapping', mapping)
    })
    this.deactiveAddFieldQuestionConnPanel()
  }

  /**
   * on survey question field changed
   */
  onSurveyQuestionFieldChanged = (e: any) => {
    const target = e.currentTarget
    const value = target.value

    /**
     * update fields in data source
     */
    if (value && value !== 'null') {
      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.set('selectedSurveyQuestionFields', [value])
      })
    }
  }

  /**
   * isDsConfigured
   */
  isDsConfigured = () => {
    if (this.props.useDataSources &&
      this.props.useDataSources.length === 1) {
      return true
    }
    return false
  }

  /**
   * reset survey
   */
  resetSurvey = () => {
    /**
     * reset survey item id
     */
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('surveyItemId', null).set('hides', [])
        .set('embeds', ['fullScreen', 'onSubmitted'])
        .set('selectedSurveyQuestionFields', [])
        .set('fieldQuestionMapping', [])
        .set('activeLinkData', false)
        .set('dsType', null).set('selectedSurvey', null)
        .set('mode', 'new')
    })

    this.setState({
      mode: 'survey-createSurvey',
      selectedSurvey: null,
      isCheckedSurveyItemId: false,
      surveyQuestionFields: [],
      dsMapView: null,
      dsFeatureLayer: null,
      dsFeatureLayerFields: []
    })
  }

  /**
   * render
   */
  render () {
    // let defaultValue = this.props.config.defaultValue;
    // const usedFieldName = this.props.useDataSources && this.props.useDataSources[0] &&
    //   this.props.useDataSources[0].fields && this.props.useDataSources[0].fields[0];
    // const selectedSurveyQuestionField = this.props.config.selectedSurveyQuestionFields && this.props.config.selectedSurveyQuestionFields[0];
    /**
     * show setting page
     */
    if (this.state.selectedSurvey && this.props.config.surveyItemId && this.state.isCheckedSurveyItemId === false) {
      this.setState({
        isCheckedSurveyItemId: true
      })
      this.showSettingPage()
    }

    /**
     * render
     */
    return <div css={getStyle(this.props.theme)} className="jimu-widget-setting survey123">
      <div className="survey123__section" style={
        (this.state.mode.indexOf('survey-') !== -1)
          ? { display: 'block' }
          : { display: 'none' }
      } >
        <SettingSection>
          <SettingRow>
            <p className="choose-survey-label">{this.props.intl.formatMessage({ id: 'chooseSurvey', defaultMessage: defaultMessages.chooseSurvey })}</p>
          </SettingRow>
          <SettingRow>
            <Radio name="survey-survey" className="cursor-pointer" id="survey-survey-createNewSurvey"
              checked={this.state.mode === 'survey-createSurvey'}
              onChange={() => { this.setState({ mode: 'survey-createSurvey' }) }} />
            <Label for="survey-survey-createNewSurvey" className="cursor-pointer">
              &nbsp;&nbsp;{this.props.intl.formatMessage({ id: 'createNewSurveyLabel', defaultMessage: defaultMessages.createNewSurveyLabel })}
            </Label>
          </SettingRow>
          <SettingRow>
            <Radio name="survey-survey" className="cursor-pointer" id="survey-survey-chooseExistingSurvey"
              checked={this.state.mode === 'survey-selectExistingSurvey'}
              onChange={() => { this.setState({ mode: 'survey-selectExistingSurvey' }) }} />
            <Label for="survey-survey-chooseExistingSurvey" className="cursor-pointer">
              &nbsp;&nbsp;{this.props.intl.formatMessage({ id: 'chooseSurveyLabel', defaultMessage: defaultMessages.chooseSurveyLabel })}
            </Label>
          </SettingRow>
        </SettingSection>

        {/* select existing survey */}
        <div className="survey123__section-selectExistingSurvey" style={
          (this.state.mode === 'survey-selectExistingSurvey')
            ? { display: 'block' }
            : { display: 'none' }
        } >
          <SettingSection className="select-survey-section">
            <SettingRow>
            <AdvancedSelect
              size='sm'
              className="survey-dropdown"
              fluid
              staticValues={this.state.existSurveys}
              selectedValues={this.state.selectedSurvey ? [this.state.selectedSurvey] : []}
              allTag={this.props.intl.formatMessage({ id: 'selectSurveyTip', defaultMessage: defaultMessages.selectSurveyTip })}
              onChange={this.onExistSurveyChanged}
              placeholder={this.props.intl.formatMessage({ id: 'selectSurveyTip', defaultMessage: defaultMessages.selectSurveyTip })}
              // hideSearchInput={this.props.isSearchInputHidden}
              // hideBottomTools={!this.props.useMultiDropdownBottomTools}
              // isEmptyOptionHidden={true}
            />

              {/* <Select onChange={this.onExistSurveyChanged} disabled={this.state.existSurveys.length === 0}
                value={(this.state.selectedSurvey) ? this.state.selectedSurvey.id : 'null'}
                menuProps={surveyListMenuProps}
                style={{ width: '100%', padding: '2px 5px' }}>
                <option value="null">{this.props.intl.formatMessage({ id: 'selectSurveyTip', defaultMessage: defaultMessages.selectSurveyTip })}</option>
                {
                  (this.state.existSurveys.length > 0)
                    ? this.state.existSurveys.map((survey) => {
                      return <option value={survey.id} key={survey.id}>
                        <div css={css`text-overflow: ellipsis; white-space: nowrap;overflow: hidden;`} title={survey.title}>
                          {survey.title}
                        </div>
                      </option>
                    })
                    : ''
                }
              </Select> */}
            </SettingRow>
            <div className="survey-list-msg" dangerouslySetInnerHTML={{ __html: this.state.existSurveyMsg }}></div>
            {/* <p className="error-message">{this.state.existSurveyMsg}</p> */}
          </SettingSection>

          {/* survey details */}
          <div style={{
            display: (this.state.selectedSurvey) ? 'block' : 'none'
          }}>
            <SettingSection title={this.nls('surveyDetailLabel')} className="create-survey-container">
              {
                (this.state.selectedSurvey)
                  ? [
                    <SettingRow key="surveyThumnail"><img src={this.getThumbnailUrl()} style={{ width: '100%', height: 'auto' }}></img></SettingRow>,
                    <SettingRow key="surveyTitle">
                      <span style={{ wordBreak: 'break-word', fontSize: '0.8125rem', color: '#FFFFFF' }}>{this.state.selectedSurvey.title}</span>
                    </SettingRow>,
                    // <SettingRow label="Tags"><p className="w-100">{this.state.selectedSurvey.tags}</p></SettingRow>,
                    // <SettingRow>{this.state.selectedSurvey.owner}</SettingRow>,
                    this.state.selectedSurvey.snippet
                      ? <SettingRow className="items" key="surveySnippet">
                        <h6>{this.nls('summaryLabel')}</h6>
                        <div className="w-100">{this.state.selectedSurvey.snippet}</div>
                      </SettingRow>
                      : null,
                    <SettingRow key="surveyInsertBtn">
                      <Button type="primary" className="w-100" onClick={this.setSurveyItemId}>
                        {this.props.intl.formatMessage({ id: 'insertLabel', defaultMessage: defaultMessages.insertLabel })}
                      </Button>
                    </SettingRow>
                    ]
                  : null
              }
            </SettingSection>
          </div>
        </div>

        {/* create survey */}
        <div className="survey123__section-createSurvey" style={
          (this.state.mode === 'survey-createSurvey')
            ? { display: 'block' }
            : { display: 'none' }
        }>
          <SettingSection>
            <div className="w-100 d-flex flex-wrap align-items-center justify-content-between setting-header setting-title pb-2">
              <div>{this.nls('surveyTitleLabel')}
                <span className="isRequired">*</span>
              </div>
              <TextInput className="w-100" value={this.state.newSurveyTitle || ''} onChange={(evt) => this.onNewSurveyValueChanged(evt, 'newSurveyTitle')} />
              {!this.state.newSurveyTitle && this.state.newSurveyTitleDirty
                ? <div className="error-message">
                  {this.props.intl.formatMessage({ id: 'surveyTitleRequiredMsg', defaultMessage: defaultMessages.surveyTitleRequiredMsg })}
                </div>
                : ''}
              {this.state.createSurveyErrorMsg && !this.state.newSurveyTitleDirty
                ? <div className="error-message">
                  {this.props.intl.formatMessage({ id: 'surveyTitleDuplicateMsg', defaultMessage: defaultMessages.surveyTitleDuplicateMsg })}
                </div>
                : ''}
            </div>

            <div className="w-100 d-flex flex-wrap align-items-center justify-content-between setting-header setting-title pb-2">
              <div>{this.nls('surveyTagLabel')}
              {this.isTagRequired
                ? <span className="isRequired">*</span>
                : ''}
              </div>
                <TagInput
                  data={this.state.newSurveyTags}
                  selectListData={this.state.userTags}
                  onChange={this.onTagInputChange}
                  name={this.nls('surveyTagLabel')}
                  menuProps={{ maxHeight: 80 }}
                />

              {/* <TextInput className="w-100" value={this.state.newSurveyTags || ''} onChange={(evt) => this.onNewSurveyValueChanged(evt, 'newSurveyTags')} /> */}
              {!(this.state.newSurveyTags && this.state.newSurveyTags.length) && this.state.newSurveyTagsDirty && this.isTagRequired
                ? <div className="error-message">
                  {this.props.intl.formatMessage({ id: 'surveyTagsRequiredMsg', defaultMessage: defaultMessages.surveyTagsRequiredMsg })}
                </div>
                : ''}
            </div>

            <div className="w-100 d-flex flex-wrap align-items-center justify-content-between setting-header setting-title pb-2">
              <div>{this.nls('surveySummaryLabel')}</div>
              <TextArea className="w-100 summary" value={this.state.newSurveySnippet || ''} onChange={(evt) => this.onNewSurveyValueChanged(evt, 'newSurveySnippet')} />
            </div>

            {/* <SettingRow label="Thumbnail">
            <img src={this.state.newSurveyThumbnailUrl} style={{
              width: '50px',
              height: '50px'
            }}></img>

            <TextInput className="w-100" value={this.state.newSurveyThumbnailUrl} name="newSurveyThumbnailUrl" onChange={this.onNewSurveyValueChanged} />

          </SettingRow> */}
            <SettingRow flow="wrap">
              <Button type="primary" className="w-100" disabled={this.state.newSurveyLoading === true || !this.state.canCreateSurvey || (this.isPortal && this.state.loadApiFailed)} onClick={this.createSurvey}>
                {this.props.intl.formatMessage({ id: 'createSurveyBtn', defaultMessage: defaultMessages.createSurveyBtn })}
              </Button>
              <span className="newSurvey-msg">{!this.state.canCreateSurvey ? this.nls('createSurveyDisabled1') : this.state.newSurveyMsg}</span>
              <div className="w-100" style={
                {
                  position: 'relative',
                  display: 'block',
                  marginTop: '50px'
                }
              }>
                <div className="jimu-secondary-loading" style={
                  (this.state.newSurveyLoading === true) ? { display: 'block' } : { display: 'none' }
                }></div>
              </div>
            </SettingRow>
          </SettingSection>
        </div>

      </div>

      {/* setting section */}
      <div className="survey123__section" style={
        (this.state.mode.indexOf('settings') !== -1)
          ? { display: 'block' }
          : { display: 'none' }
      }>
        <SettingSection>

          <SettingRow>
            <div className="section-title">
              <h6>{(this.state.selectedSurvey) ? this.state.selectedSurvey.title : ''}</h6>
              <Button className="survey123__section-resetSurvey" onClick={() => this.setState({ mode: 'confirmResetSurvey' })}>
                <CloseOutlined size={8}/>
                </Button>
            </div>
          </SettingRow>

          <SettingRow>
            <Button className="w-100" color="primary" type="primary" onClick={this.editSurvey}>
              {this.props.intl.formatMessage({ id: 'editSurveyBtn', defaultMessage: defaultMessages.editSurveyBtn })}
            </Button>
          </SettingRow>
        </SettingSection>

        <SettingSection title={this.nls('appearanceTitle')}>
          <SettingRow>
            <div className="appearance">
              <span>{this.props.intl.formatMessage({ id: 'showOptionsBarLabel', defaultMessage: defaultMessages.showOptionsBarLabel })}</span>
              <Switch className="can-x-switch" checked={!this.props.config.hides.includes('navbar')}
                onChange={evt => { this.setAppearance(evt.target.checked, 'navbar') }} />
            </div>
            {/* <input value='navbar' type="checkbox" onClick={this.setAppearance} checked={this.props.config.hides.indexOf('navbar') !== -1} /> */}
          </SettingRow>
          <SettingRow>
            {/* <input value='header' type="checkbox" onClick={this.setAppearance} checked={this.props.config.hides.indexOf('header') !== -1} /> */}
            <div className="appearance">
              <span>{this.props.intl.formatMessage({ id: 'showOptionsHeaderLabel', defaultMessage: defaultMessages.showOptionsHeaderLabel })}</span>
              <Switch className="can-x-switch" checked={!this.props.config.hides.includes('header')}
                onChange={evt => { this.setAppearance(evt.target.checked, 'header') }} />
            </div>
          </SettingRow>
          <SettingRow>
            {/* <input value='description' type="checkbox" onClick={this.setAppearance} checked={this.props.config.hides.indexOf('description') !== -1} /> */}
            <div className="appearance">
              <span>{this.props.intl.formatMessage({ id: 'showOptionsDesLabel', defaultMessage: defaultMessages.showOptionsDesLabel })}</span>
              <Switch className="can-x-switch" checked={!this.props.config.hides.includes('description')}
                onChange={evt => { this.setAppearance(evt.target.checked, 'description') }} />
            </div>
          </SettingRow>
          <SettingRow>
            {/* <input value='footer' type="checkbox" onClick={this.setAppearance} checked={this.props.config.hides.indexOf('footer') !== -1} /> */}
            <div className="appearance">
              <span>{this.props.intl.formatMessage({ id: 'showOptionsFooterLabel', defaultMessage: defaultMessages.showOptionsFooterLabel })}</span>
              <Switch className="can-x-switch" checked={!this.props.config.hides.includes('footer')}
                onChange={evt => { this.setAppearance(evt.target.checked, 'footer') }} />
            </div>
          </SettingRow>
          <SettingRow>
            {/* <input value='theme' type="checkbox" onClick={this.setAppearance} checked={this.props.config.hides.indexOf('theme') !== -1} /> */}
            <div className="appearance">
              <span>{this.props.intl.formatMessage({ id: 'useSurveyTheme', defaultMessage: defaultMessages.useSurveyTheme })}</span>
              <Switch className="can-x-switch" checked={!this.props.config.hides.includes('theme')}
                onChange={evt => { this.setAppearance(evt.target.checked, 'theme') }} />
            </div>
          </SettingRow>
        </SettingSection>

        {/* Survey mode */}
        <SettingSection title={this.nls('surveyModeTitle')}>
          {/* survey mode: new record */}
          <SettingRow>
            <div className='d-flex justify-content-between w-100 align-items-center'>
              <div className='align-items-center d-flex'>
                <Radio
                  style={{ cursor: 'pointer' }} onChange={() => this.setMode('new')}
                  checked={this.props.config.mode === 'new'}
                  title={this.props.intl.formatMessage({ id: 'surveyModeNew', defaultMessage: defaultMessages.surveyModeNew })}
                />
                <label
                  className='m-0 ml-2' style={{ cursor: 'pointer' }} onClick={() => this.setMode('new')}
                  title={this.props.intl.formatMessage({ id: 'surveyModeNew', defaultMessage: defaultMessages.surveyModeNew })}
                >
                  {this.props.intl.formatMessage({ id: 'surveyModeNew', defaultMessage: defaultMessages.surveyModeNew })}
                </label>
              </div>
            </div>
          </SettingRow>

          {/* survey mode: edit record */}
          <SettingRow>
            <div className='d-flex justify-content-between w-100 align-items-center'>
              <div className='align-items-center d-flex'>
                <Radio
                  style={{ cursor: 'pointer' }} onChange={() => this.setMode('edit')}
                  checked={this.props.config.mode === 'edit'}
                  title={this.props.intl.formatMessage({ id: 'surveyModeEdit', defaultMessage: defaultMessages.surveyModeEdit })}
                />
                <label
                  className='m-0 ml-2' style={{ cursor: 'pointer' }} onClick={() => this.setMode('edit')}
                  title={this.props.intl.formatMessage({ id: 'surveyModeEdit', defaultMessage: defaultMessages.surveyModeEdit })}
                >
                  {this.props.intl.formatMessage({ id: 'surveyModeEdit', defaultMessage: defaultMessages.surveyModeEdit })}
                </label>
              </div>
            </div>
          </SettingRow>

          {/* survey mode: view record */}
          <SettingRow>
            <div className='d-flex justify-content-between w-100 align-items-center'>
              <div className='align-items-center d-flex'>
                <Radio
                  style={{ cursor: 'pointer' }} onChange={() => this.setMode('view')}
                  checked={this.props.config.mode === 'view'}
                  title={this.props.intl.formatMessage({ id: 'surveyModeView', defaultMessage: defaultMessages.surveyModeView })}
                />
                <label
                  className='m-0 ml-2' style={{ cursor: 'pointer' }} onClick={() => this.setMode('view')}
                  title={this.props.intl.formatMessage({ id: 'surveyModeView', defaultMessage: defaultMessages.surveyModeView })}
                >
                  {this.props.intl.formatMessage({ id: 'surveyModeView', defaultMessage: defaultMessages.surveyModeView })}
                </label>
              </div>
            </div>
          </SettingRow>

          {/* Setting for 'new' mode: Send data to survey */}
          {this.props.config.mode === 'new' && <React.Fragment>
            <SettingRow>
              <div className="section-title">
                <h6>{this.nls('sendDataToSurveyTitle')}</h6>
                <Switch className="can-x-switch" checked={this.props.config.activeLinkData}
                  onChange={this.activeLinkDataChange} />
              </div>
            </SettingRow>

            {this.props.config.activeLinkData &&
              <React.Fragment>
                {this.state.mapWidgetList && this.state.mapWidgetList.length > 0
                  ? <React.Fragment>
                    <SettingRow>
                      <span className="w-100">{this.nls('sendDataToSurveyDesc')}</span>
                    </SettingRow>
                    <SettingRow>
                      <span>{this.nls('selectSourceWidget')}</span>
                    </SettingRow>
                    <div className="setting-row">
                      {/* <div className="sample-use-map-view-setting p-2"> */}

                      <MapWidgetSelector onSelect={this.onMapWidgetSelected} useMapWidgetIds={this.state.useMapWidgetIdsInNewMode} />
                      {/* <MapSelector onSelect={this.onMapSelected} useMapWidgetIds={this.props.useMapWidgetIds}/> */}
                      {/* </div> */}
                      {/* <MapSelector onSelect={this.onMapSelected} useMapWidgetIds={this.props.useMapWidgetIds}/> */}
                    </div>
                    <SettingRow className="fea-layer-outter">
                      <SettingRow className="use-feature-layer-setting">
                        <span>{this.nls('selectSourceLayer')}</span>
                      </SettingRow>
                      <div className="feature-layer-dropdown">
                        <JimuLayerViewSelector onSelect={this.onDataSourceSelected} useMapWidgetIds={this.state.useMapWidgetIdsInNewMode}
                          jimuLayerViewInfo={this.state && this.state.layerViewInfoInNewMode}/>

                        {/* <DataSourceSelector
                        types={this.supportedLayerTypes}
                        selectedDataSourceIds={this.props.useDataSources && Immutable(this.props.useDataSources.map(ds => ds.dataSourceId))}
                        useDataSourcesEnabled={true}
                        mustUseDataSource={true} widgetId={this.props.id}
                        onSelect={this.onDataSourceSelected} onRemove={this.onDataSourceRemoved} /> */}
                      </div>
                      {/* <div>
                      LayerName and close icon
                    </div> */}
                    </SettingRow>

                    <SettingRow>
                      <span className="w-100">{this.nls('triggerEventDesc1')}</span>
                      {/* <span>{this.nls('triggerEventListTitle')}</span> */}
                    </SettingRow>
                    {/* <SettingRow className="select">
                      <Select value={this.props.triggerEventType ? this.props.triggerEventType : 'eventTypeSelect'} onChange={this.triggerEventTypeChange} className="">
                        <option key="eventTypeSelect" value="eventTypeSelect">{this.nls('triggerEventSelect')}</option>
                        <option key="eventTypeAdd" value="eventTypeAdd">{this.nls('triggerEventAdd')}</option>
                      </Input>
                    </SettingRow> */}

                    {/* saved field-question mapping */}

                    <SettingRow>
                      <span>{this.nls('addConnTitle')}</span>
                    </SettingRow>

                    {(this.state.useMapWidgetIdsInNewMode && this.state.useMapWidgetIdsInNewMode.length && this.state && this.state.layerViewInfoInNewMode && this.state.layerViewInfoInNewMode.dataSourceId)
                      ? <React.Fragment>
                        {(this.props.config.fieldQuestionMapping && this.props.config.fieldQuestionMapping.length > 0)
                          ? <div>{
                            this.props.config.fieldQuestionMapping.asMutable().map((mapping, index) => {
                              const field = mapping.field
                              const question = mapping.question
                              return <div key={field + '_' + question + '_' + index} className="mapping-container">
                                {this.state.editMapping && this.state.editMapping.index === index
                                  ? <React.Fragment>
                                    <Select value={this.state.editMapping.field || ''} style={{ marginBottom: '8px' }} onChange={(e) => this.changeEditMapping('field', e)} >
                                      {this.state.dsFeatureLayerFields.map((field) => {
                                        return <option key={'edit_' + field.name + '_' + index} value={field.name}>{field.alias || field.name}</option>
                                      })}
                                    </Select>
                                    <Select value={this.state.editMapping.question || ''} onChange={(e) => this.changeEditMapping('question', e)}>
                                      {this.state.surveyQuestionFields.length > 0 &&
                                    this.state.surveyQuestionFields.map((question) => {
                                      return <option key={'edit_' + question.name + '_' + index} value={question.name}>{question.label}</option>
                                    })
                                      }
                                    </Select>

                                    {/* buttons  */}
                                    <div className="btn-group">
                                      <Button className="float-left icon-remove-mapping" type="primary" color="primary"
                                        onClick={() => { this.deleteConnection(index); this.setState({ editMapping: null }) }}>
                                          <TrashOutlined className='remove-mapping'/>
                                      </Button>
                                      <Button className="float-right" type="secondary"
                                        onClick={() => { this.setState({ editMapping: null }) }}>
                                        {this.nls('cancel')}
                                      </Button>
                                      <Button className="float-right" type="primary" color="primary"
                                        onClick={() => { this.editMapping(index); this.setState({ editMapping: null }) }}>
                                        {this.nls('ok')}
                                      </Button>
                                    </div>
                                  </React.Fragment>
                                  : <React.Fragment>
                                    <div className="link-info" onClick={(e) => this.showEditMappingPanel(index, e)}>
                                      <p>{this.getFielAlias(field)}</p>
                                      <div className="center-line">
                                        <div className="connect">
                                          <LinkHorizontalOutlined />
                                        </div>
                                      </div>
                                      <p>{this.getQuestionLabel(question)}</p>
                                      <div className="delete-connect" onClick={(e) => this.deleteConnection(index, e)}>
                                        <TrashOutlined size='s'/>
                                      </div>
                                    </div>
                                  </React.Fragment>}
                              </div>
                            })
                          }</div> : ''}

                        {/* add new field question mapping */}
                        {this.state.addMapping && this.state.dsFeatureLayer && this.state.dsFeatureLayerFields && this.state.dsFeatureLayerFields.length > 0 &&
                      <div className="mapping-container">
                        <Select value={this.state.addMapping.field || 'null'} style={{ marginBottom: '8px' }} onChange={(e) => this.addMapppingChange('field', e)} >
                          <option key={'add_field_default' } value="null">{this.nls('addConnSelectField')}</option>
                          {this.state.dsFeatureLayerFields.map((field) => {
                            return <option key={'add_' + field.name} value={field.name}>{field.alias || field.name}</option>
                          })}
                        </Select>
                        <Select value={this.state.addMapping.question || 'null'} onChange={(e) => this.addMapppingChange('question', e)}>
                          <option key={'add_question_default' } value="null">{this.nls('addConnSelectQuestion')}</option>
                          {this.state.surveyQuestionFields.length > 0 &&
                            this.state.surveyQuestionFields.map((question) => {
                              return <option key={'add_' + question.name} value={question.name}>{question.label}</option>
                            })
                          }
                        </Select>

                        {/* buttons  */}
                        <div className="btn-group">
                          <Button className="float-right" type="secondary" onClick={this.deactiveAddFieldQuestionConnPanel}>{this.nls('cancel')}</Button>
                          <Button className="float-right" type="primary"
                            disabled={!this.state.addMapping.field || this.state.addMapping.field === 'null' || !this.state.addMapping.question || this.state.addMapping.question === 'null'}
                            onClick={this.addFieldQuestionConn}>
                            {this.nls('ok')}
                          </Button>
                        </div>
                      </div>}
                      </React.Fragment> : ''
                    }
                    <SettingRow>
                      <Button className="w-100" type="primary"
                      // eslint-disable-next-line max-len
                        disabled={this.state.addMapping !== null || this.state.editMapping !== null || !(this.state.useMapWidgetIdsInNewMode && this.state.useMapWidgetIdsInNewMode.length && this.state && this.state.layerViewInfoInNewMode && this.state.layerViewInfoInNewMode.dataSourceId)}
                        onClick={this.activeAddFieldQuestionConnPanel}>
                        {this.nls('addConnBtn')}
                      </Button>
                    </SettingRow>
                  </React.Fragment>
                  : <SettingRow>
                    <span>{this.nls('sendDataDisabled1')}</span>
                  </SettingRow>
                }
              </React.Fragment>}

            </React.Fragment>}

          {/* Settng for 'edit' mode:  */}
          {this.props.config.mode === 'edit' && <React.Fragment>
            {this.state.mapWidgetList && this.state.mapWidgetList.length > 0
              ? <React.Fragment>
                <SettingRow>
                  <div className="section-title">
                    <h6>{this.nls('chooseExistDataTitle')}</h6>
                  </div>
                </SettingRow>
                <SettingRow>
                  <span className="w-100">{this.nls('chooseExistDataEditDesc')}</span>
                </SettingRow>
                {/* Select source widget(webmap) */}
                <SettingRow>
                  <span>{this.nls('selectSourceWidget')}</span>
                </SettingRow>
                <div className="setting-row">
                  <MapWidgetSelector onSelect={this.onMapWidgetSelected} useMapWidgetIds={this.state.useMapWidgetIdsInEditMode} />
                </div>
                {/* Select feature layer from webmap */}
                <SettingRow className="fea-layer-outter">
                  <SettingRow className="use-feature-layer-setting" >
                    <span title={this.nls('selectSurveyLayerTip')}>{this.nls('selectSurveyLayer')}</span>
                  </SettingRow>
                  <div className="feature-layer-dropdown" title={this.nls('selectSurveyLayerTip')}>
                    <JimuLayerViewSelector onSelect={this.onDataSourceSelected} useMapWidgetIds={this.state.useMapWidgetIdsInEditMode}
                      jimuLayerViewInfo={this.state && this.state.layerViewInfoInEditMode}/>
                  </div>
                </SettingRow>
                <SettingRow>
                  <span>{this.nls('chooseExistDataLoadDesc')}</span>
                </SettingRow>
              </React.Fragment>
              : <SettingRow>
                <span>{this.nls('sendDataDisabled2')}</span>
              </SettingRow>
            }
            </React.Fragment>
          }

          {/* Settng for 'view' mode:  */}
          {this.props.config.mode === 'view' && <React.Fragment>
            {this.state.mapWidgetList && this.state.mapWidgetList.length > 0
              ? <React.Fragment>
                <SettingRow>
                  <div className="section-title">
                    <h6>{this.nls('chooseExistDataTitle')}</h6>
                  </div>
                </SettingRow>
                <SettingRow>
                    <span className="w-100">{this.nls('chooseExistDataViewDesc')}</span>
                </SettingRow>
                {/* Select source widget(webmap) */}
                <SettingRow>
                  <span>{this.nls('selectSourceWidget')}</span>
                </SettingRow>
                <div className="setting-row">
                  <MapWidgetSelector onSelect={this.onMapWidgetSelected} useMapWidgetIds={this.state.useMapWidgetIdsInViewMode} />
                </div>
                {/* Select feature layer from webmap */}
                <SettingRow className="fea-layer-outter">
                  <SettingRow className="use-feature-layer-setting">
                    <span title={this.nls('selectSurveyLayerTip')}>{this.nls('selectSurveyLayer')}</span>
                  </SettingRow>
                  <div className="feature-layer-dropdown" title={this.nls('selectSurveyLayerTip')}>
                    <JimuLayerViewSelector onSelect={this.onDataSourceSelected} useMapWidgetIds={this.state.useMapWidgetIdsInViewMode}
                      jimuLayerViewInfo={this.state && this.state.layerViewInfoInViewMode}/>
                  </div>
                </SettingRow>
                <SettingRow>
                  <span>{this.nls('chooseExistDataLoadDesc')}</span>
                </SettingRow>
              </React.Fragment>
              : <SettingRow>
                <span>{this.nls('sendDataDisabled2')}</span>
              </SettingRow>
            }
            </React.Fragment>
          }
          {/* <SettingSection title="Associated Map">
          <SettingRow>
            Set an external map which will be used for GeoPoint question instead of the built-in map.
          </SettingRow>
          <SettingRow>
            <DataSourceSelector
              types={this.supportedMapTypes}
              mustUseDataSource={true}
              onSelect={this.onMapViewSelected}
              selectedDataSourceIds={this.props.useDataSources && this.props.config.dsType === ArcGISDataSourceTypes.WebMap && Immutable(this.props.useDataSources.map(ds => ds.dataSourceId))}
              widgetId={this.props.id}
            />
          </SettingRow>
        </SettingSection> */}

          {/* <SettingSection title="Default Answers">
        <SettingRow>
          Set default answers for survey questions when the survey is opened.
        </SettingRow>
        <SettingRow>
          1. Select a field from a feature layer view:
          <DataSourceSelector
            types={this.supportedLayerTypes}
            mustUseDataSource={true} widgetId={this.props.id}
            onSelect={this.onFeatureLayerViewSelected}
            selectedDataSourceIds={this.props.useDataSources && this.props.config.dsType === ArcGISDataSourceTypes.FeatureLayer && Immutable(this.props.useDataSources.map(ds => ds.dataSourceId))}
            widgetId={this.props.id}
          />
          {
            this.props.config.dsType === ArcGISDataSourceTypes.FeatureLayer && this.props.useDataSources && this.props.useDataSources.length > 0 &&
            <FieldSelector
              dataSources={this.props.useDataSources
                &&
              this.props.useDataSources.asMutable().map(ds => ds.dataSourceId).map(dsId => this.dsManager && this.dsManager.getDataSource(dsId)).filter(ds => !!ds)}
              onSelect={this.onFieldSelected}
              selectedFields={this.props.useDataSources[0].fields}
            />
          }
        </SettingRow>
        <div style={
          (this.state.surveyQuestionFields.length > 0) ? { 'display': 'block' } : { 'display': 'none' }
        }>
          <SettingRow>
            2. Select a Survey Question:
          </SettingRow>
          <SettingRow>
            <select onChange={this.onSurveyQuestionFieldChanged}
              disabled={this.state.surveyQuestionFields.length === 0}
              value={(selectedSurveyQuestionField) ? selectedSurveyQuestionField : 'null'}
              style={{width: '100%', padding: '5px'}}>
              <option value="null">Please select</option>
              {
                (this.state.surveyQuestionFields.length > 0) ?
                  this.state.surveyQuestionFields.map((field) => {
                    return <option value={field.name}>{field.label}</option>
                  })
                  : ''
              }
            </select>
          </SettingRow>
        </div> */}
        </SettingSection>
      </div>

      {/* confirm reset survey section */}
      <div className="survey123__section" style={
        (this.state.mode.indexOf('confirmResetSurvey') !== -1)
          ? { display: 'block' }
          : { display: 'none' }
      }>
        <SettingSection title={this.nls('resetSurveyLabel')}>
          <SettingRow>
            {this.props.intl.formatMessage({ id: 'resetSurveyTip', defaultMessage: defaultMessages.resetSurveyTip })}
          </SettingRow>
          {this.props.intl.formatMessage({ id: 'confirmResetSurveyTip', defaultMessage: defaultMessages.confirmResetSurveyTip })}

          <SettingRow>
            <Button type="primary" onClick={() => this.resetSurvey()}>{this.nls('yes')}</Button>
            <Button onClick={() => this.showSettingPage()}>{this.nls('no')}</Button>
          </SettingRow>
        </SettingSection>
      </div>

      <Modal
        isOpen={this.state.modalIsOpen}
        className="w-100 h-100 p-0 m-0 survey123__desinger_modal"
        css={getModalStyle(this.props.theme)}>
        <div className="survey123__desinger">
          <p>{this.props.intl.formatMessage({ id: 'editSurveyBtn', defaultMessage: defaultMessages.editSurveyBtn })}</p>
          <button color="primary" onClick={this.handleCloseModal}>
            <CloseOutlined size={24}/>
          </button>
        </div>

        <iframe id="survey123-designer" width="100%"></iframe>

        <AlertPopup isOpen={this.state.isShowCloseDesignerAlert}
          okLabel={this.nls('ok')}
          title={this.props.label}
          toggle={this.handleCloseDesignerAlert}>
          <div style={{ fontSize: '1rem' }}>
            {this.nls('msgUnsavedBeforeLeaving')}
          </div>
        </AlertPopup>
      </Modal>
    </div >
  }
}
