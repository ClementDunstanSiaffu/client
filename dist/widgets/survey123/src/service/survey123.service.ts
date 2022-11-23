/**
 * survey123 common params
 */
export interface Survey123CommonParams {
  username?: string
  token?: string
  f?: string
  portalUrl?: string
}

/**
 * survey123 iframe message
 */
export interface Survey123Message {
  event: string
  data: any
}

/**
 * survey123 service
 */
export class Survey123Service {
  private queryObj: any
  private surveyUrlFromPortal: string
  public setQueryObject (obj) {
    const objStr = obj ? obj.survey123 : ''
    const urlString = objStr ? decodeURIComponent(objStr + '') : ''
    const val = this._urlParamToJson(urlString)
    this.queryObj = val
  }

  /**
   * https://devtopia.esri.com/Beijing-R-D-Center/ExperienceBuilder-Web-Extensions/issues/4659
   * get survey host url from portal's config.js file
   * @param portalUrl
   */
  public getSurveyHostUrlFromPortal (portalUrl: string) {
    portalUrl = portalUrl || 'https://www.arcgis.com'
    // read cache from this.surveyUrlFromPortal
    if (this.surveyUrlFromPortal || this.surveyUrlFromPortal === null) {
      return Promise.resolve(this.surveyUrlFromPortal)
    }

    // read cache from window.esriGeowConfig.surveyUrl
    const esriGeowConfig = (window as any).esriGeowConfig
    if (esriGeowConfig && esriGeowConfig.surveyUrl) {
      this.surveyUrlFromPortal = esriGeowConfig.surveyUrl
      return Promise.resolve(this.surveyUrlFromPortal)
    }

    let configJSUrl = ''
    if (!(portalUrl.endsWith('/'))) {
      portalUrl += '/'
    }
    configJSUrl = portalUrl + 'home/js/arcgisonline/config.js'

    // In order to avoid cross domain error, create a script tag to load the config js.
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = configJSUrl

    const htmlNode = document.documentElement
    const htmlDir = htmlNode.getAttribute('dir')
    return new Promise((resolve, reject) => {
      script.onload = () => {
        // reset the html direction, see https://devtopia.esri.com/Beijing-R-D-Center/ExperienceBuilder/issues/11310#issuecomment-3061509
        if (htmlNode.getAttribute('dir') !== htmlDir) {
          htmlNode.setAttribute('dir', htmlDir)
        }

        const cfg = (window as any).esriGeowConfig
        if (cfg && cfg.surveyUrl) {
          this.surveyUrlFromPortal = cfg.surveyUrl
          resolve(cfg.surveyUrl)
        } else {
          this.surveyUrlFromPortal = null
          resolve(null)
        }
      }
      script.onerror = () => {
        if (htmlNode.getAttribute('dir') !== htmlDir) {
          htmlNode.setAttribute('dir', htmlDir)
        }
        console.log('Failed to get survey url from portal\'s config.js, will fallback to use the default survey123 url.')
        this.surveyUrlFromPortal = null
        resolve(null)
      }
      document.getElementsByTagName('head')[0].appendChild(script)
    })
  }

  /**
   * get survey123 host url
   */
  public getSurvey123HostUrl (): string {
    /**
     * Beijing-R-D-Center/ExperienceBuilder/issues/88
     * we need to check url host to see which survey123 host url we will use
     * wabbuild.esri.com > survey123dec.arcgis.com
     * experiencedev.arcgis.com > survey123dev.arcgis.com
     * experienceqa.arcgis.com > survey123qa.arcgis.com
     * experience.arcgis.com > survey123.arcgis.com
     * default > survey123.arcgis.com
     *
     */
    let url = 'https://survey123.arcgis.com'
    // url from portal config.js
    if (this.surveyUrlFromPortal) {
      url = this.surveyUrlFromPortal
    }
    let env = window.jimuConfig.hostEnv as any
    if (this.queryObj && this.queryObj.env) {
      env = this.queryObj.env + ''
      // when the env is a url: refer to: https://devtopia.esri.com/Beijing-R-D-Center/ExperienceBuilder-Web-Extensions/issues/5975#issuecomment-2866368
      if (env.startsWith('http://') || env.startsWith('https://')) {
        return env
      }
    }

    // if the url mode is like https://survey123${subName}.arcgis.com, will let the env from url work,
    // otherwise, ignore the env from url.
    let isNormalSurveyUrl = true
    if (url !== 'https://survey123.arcgis.com') {
      const matchRst = url.match(/https:\/\/survey123(.[^\.]*)\.arcgis\.com/)
      isNormalSurveyUrl = !!((matchRst && matchRst.length))
    }
    if (env && env !== 'prd' && env !== 'prod' && isNormalSurveyUrl) {
      url = `https://survey123${env}.arcgis.com`
    }

    return url
  }

  /**
  * get the api url
  */
  public getSurvey123HostAPIUrl () {
    let url = this.getSurvey123HostUrl() + '/api/jsapi/3.15' //  '/share/survey123webform-jsapi.js';
    if (this.queryObj && this.queryObj.jsapi) {
      url = this.getSurvey123HostUrl() + '/api/jsapi/' + this.queryObj.jsapi
    }
    // only for debugger locally
    // const isDebug: boolean = false;
    // if (isDebug) {
    //   url = `https://nanzhang.arcgis.com:8443/webclient/survey123webform-jsapi.js`;
    // }

    return url
  }

  /**
   * create survey by survey123 rest api
   * @param title
   * @param tags
   * @param options
   */
  public createSurvey (title: string, tags: string[], commonParams: Survey123CommonParams, options?: {
    snippet?: string
    thumbnailUrl?: string
  }): Promise<any> {
    // options
    options = Object.assign({
      snippet: ''
    }, options || {})

    return Promise.resolve(true)
      .then(() => {
        if (!title || !commonParams || !commonParams.token || !commonParams.username) {
          throw new Error('missing title, tags, username or token')
        }
      })
      .then(() => {
        const url = `${this.getSurvey123HostUrl()}/api/survey/create`
        const params: any = {
          title: title,
          tags: tags && Array.isArray(tags) ? tags.join(',') : (tags || null),
          snippet: options.snippet,
          thumbnailUrl: options.thumbnailUrl,
          token: commonParams.token,
          username: commonParams.username,
          portalUrl: commonParams.portalUrl || 'https://www.arcgis.com'
        }

        return fetch(url, {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify(params)
        })
          .then((res: any) => {
            if (res.ok) {
              return res.json()
            }
            throw res
          })
      })
  }

  /**
   * isPortal is to check if the current portalUrl (from config or from url params) is arcgis online portals or not
   */
  public isPortal (portalUrl: string): boolean {
    const arcgisOnlinePortalUrls = ['www.arcgis.com', 'devext.arcgis.com', 'qaext.arcgis.com']

    // check if the portalUrl is arcgis online url
    const isArcgisOnline = arcgisOnlinePortalUrls.find((url, i) => {
      return portalUrl.includes(url)
    })
    return !isArcgisOnline
  }

  /**
   * query survey
   * @param commonParams
   * @param options
   * Reminder: if searchSurveyType is 'all-admin', even the isSearchAll is true, the result count still has a limitation: 1000. this is the api's behaviour
   */
  public querySurvey (commonParams: Survey123CommonParams, options?: {
    isShared?: boolean
    isPublished?: boolean
    isSearchAll?: boolean
    queryFromClient?: boolean
    searchSurveyType?: string
    surveyClientAPI?: any
  }): Promise<any> {
    // options
    options = Object.assign({
      isShared: false,
      isPublished: true,
      isSearchAll: true,
      queryFromClient: false,
      surveyClientAPI: null
    }, options || {})

    return Promise.resolve(true)
      .then(() => {
        if (!commonParams || !commonParams.token || !commonParams.username) {
          throw new Error('missing token or username')
        }
      })
      .then(() => {
        const params: any = {
          isShared: options.isShared,
          isPublished: options.isPublished,
          isSearchAll: options.isSearchAll,
          token: commonParams.token,
          username: commonParams.username,
          portalUrl: commonParams.portalUrl || 'https://www.arcgis.com'
        }
        if (options.searchSurveyType) {
          params.searchSurveyType = options.searchSurveyType
        }
        /**
         * for portal
         */
        if (options.queryFromClient) {
          if (!options.surveyClientAPI) {
            console.log('Survey client api is not provided.')
            return null
          }
          return options.surveyClientAPI.survey123.searchSurvey(params)
            .then((res) => {
              if (res && res.results) {
                return res.results
              }
              throw res
            })
        } else {
          /**
           * for AGS Online
           */
          let url = `${this.getSurvey123HostUrl()}/api/survey/search`
          url = `${url}?${Object.keys(params).map((k) => k + '=' + params[k]).join('&')}`

          return fetch(url, {
            mode: 'cors',
            method: 'GET'
          })
            .then((res: any) => {
              if (res.ok) {
                return res.json()
              }
              throw res
            })
            .then((res) => {
              if (res && res.results) {
                return res.results
              }
              if (res && Array.isArray(res)) {
                return res
              }
              throw res
            })
        }
      })
  }

  /**
   * get survey123 designer url
   */
  public getSurvey123DesignerUrl (surveyItemId: string, options?: {
    portalUrl?: string
  }): string {
    // options
    options = Object.assign({

    }, options || {})

    let url = `${this.getSurvey123HostUrl()}/surveys/${surveyItemId}/design?embed=exb`
    if (options.portalUrl && options.portalUrl !== 'https://www.arcgis.com') {
      url += `&portalUrl=${options.portalUrl}`
    }
    if (this.getSurvey123HostUrl() === 'https://survey123dev.arcgis.com' && (!options.portalUrl || options.portalUrl === 'https://www.arcgis.com')) {
      url += `&portalUrl=${options.portalUrl}`
    }

    return url
  }

  /**
   *
   * @param surveyItemId
   * @param options
   */
  public getSurvey123WebformUrl (surveyItemId: string, options?: {
    queryParams?: string[]
  }): string {
    // options
    options = Object.assign({
      queryParams: []
    }, options || {})

    const isDebug: boolean = false

    let url = `${this.getSurvey123HostUrl()}/share/${surveyItemId}`

    /**
     * debugg only
     */
    if (isDebug) {
      url = `https://nanzhang.arcgis.com:8443/webclient/?appid=${surveyItemId}`
    }

    if (options.queryParams.length > 0) {
      url += `${(isDebug) ? '&' : '?'}${options.queryParams.join('&')}`
    }

    return url
  }

  /**
   * flat questions, move the questions out if they are in the group.
   * ignore repeat questions until we plan to support it.
   */
  public flatQuestions (questions) {
    let result = []
    questions.forEach((ques) => {
      // single question
      if (!ques.questions) {
        result.push(ques)
      } else if (ques.type !== 'esriQuestionTypeRepeat') {
        result = result.concat(this.flatQuestions(ques.questions))
      }
    })
    return result
  }

  /**
   * get survey question fields
   * @param surveyItemId
   * @param commonParams
   */
  public getSurveyQuestionFields (surveyItemId: string, commonParams: Survey123CommonParams): Promise<Array<{
    name?: string
    label?: string
  }>> {
    return Promise.resolve(true)
      .then(() => {
        if (!surveyItemId || !commonParams || !commonParams.token) {
          throw new Error('missing surveyItemId or token')
        }
      })
      .then(() => {
        let url = `${this.getSurvey123HostUrl()}/api/survey/${surveyItemId}/form`
        const params: any = {
          token: commonParams.token,
          portalUrl: commonParams.portalUrl
        }

        url = `${url}?${Object.keys(params).map((k) => k + '=' + params[k]).join('&')}`

        return fetch(url, {
          mode: 'cors',
          method: 'GET'
        })
          .then((res: any) => {
            if (res.ok) {
              return res.json()
            }
            throw res
          })
      })
  }

  /**
   * parse a url parameter to json, if the parameter string is simple, keep it as string
   * @param str  eg: 0.q2:pie;1.q3:{"type":"map","basemapItemId":"{itemId}"};2.q11:{"type":"wordCloud","show":"response"}
   * @param urlKey
   */
  private _urlParamToJson (str: string): any {
    if (!str) {
      return null
    }
    str = str + ''
    const subObjs = str.split(';')
    if (subObjs.length < 2 && str.split(':').length < 2) {
      // this url parameter has no sub parameters
      if (str.split(',').length > 1) {
        // consider it as an array
        return str.split(',')
      } else {
        return str
      }
    } else {
      const obj = {}
      subObjs.forEach((subStr) => {
        const keyVals = (subStr + '').split(':')
        if (keyVals.length > 1) {
          const key = keyVals[0]
          let val = (Array.isArray(keyVals.slice(1)) ? keyVals.slice(1) : []).join(':') as any
          if (val.length && val[0] === '{') {
            // try to parse it to a json
            val = this._stringToJson(val)
          }
          if (typeof val === 'string') {
            if (val.split(',').length > 1) {
              // consider it as an array
              val = val.split(',')
            }
          }
          obj[key] = val
        }
      })
      return obj
    }
  }

  private _stringToJson (str: string): any {
    let result = str
    try {
      result = JSON.parse(str)
    } catch (e) {
      result = str
    }
    return result
  }
}

export const survey123Service = new Survey123Service()
