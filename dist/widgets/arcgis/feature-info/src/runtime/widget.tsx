/** @jsx jsx */
import {
  React, jsx, AllWidgetProps, MessageManager, DataRecordsSelectionChangeMessage, DataSourceStatus,
  DataSource, FeatureLayerDataSource, getAppStore, appConfigUtils, IMState
/*, appActions, DataRecord, IMSqlExpression */ } from 'jimu-core'
// import { JimuMapViewComponent } from 'jimu-arcgis';
import { Button, WidgetPlaceholder, DataActionDropDown, Icon } from 'jimu-ui'
// import { IMDataSourceJson, IMUseDataSource } from './types/app-config';
import { IMConfig, FontSizeType } from '../config'
import { getStyle } from './lib/style'
import defaultMessages from './translations/default'
import FeatureInfo from './components/feature-info'
import { DataLoader, CurrentData } from './components/data-loader'
import { versionManager } from '../version-manager'
import featureInfoIcon from 'jimu-icons/svg/outlined/brand/widget-feature-info.svg'

// export enum LoadStatus {
//  Pending = 'Pending',
//  Fulfilled = 'Fulfilled',
//  Rejected = 'Rejected'
// }

export interface WidgetProps extends AllWidgetProps<IMConfig> {
  dataSourceWidgetLabel: string
}

export interface WidgetState{
  // mapViewWidgetId: string;
  // layerDataSourceId: string;
  // selectedGraphicIndex: number;
  // currentData: CurrentData;
  currentDataId: string
  currentDataIndex: number
  loadDataStatus: DataSourceStatus
  dataSourceWidgetId: string
  dataSourceLabel: string
  // sqlExprObj: any;
  // maxGraphics: number;
  // limitGraphics: boolean;
}

export default class Widget extends React.PureComponent<WidgetProps, WidgetState> {
  public viewFromMapWidget: __esri.MapView | __esri.SceneView
  private previousData: CurrentData
  private currentData: CurrentData
  private dataSource: DataSource
  private lockSelection: boolean
  private readonly warningIcon: string

  public refs: {
    mapContainer: HTMLInputElement
  }

  constructor (props) {
    super(props)
    // this.graphics = [];
    // this.records = [];
    this.previousData = null
    this.currentData = null
    this.lockSelection = true
    this.warningIcon = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 0.5H25.5V25.5H0.5V0.5Z" fill=${this.props.theme.colors.palette.warning[100]}
                    stroke="${this.props.theme.colors.palette.warning[300]}"/>
                  <path d="M12.0995 10.87C12.0462 10.3373 12.4646 9.875 13 9.875C13.5354 9.875 13.9538 10.3373 13.9005 10.87L13.5497 14.3775C13.5215 14.6599 13.2838 14.875 13 14.875C12.7162
                    14.875 12.4785 14.6599 12.4502 14.3775L12.0995 10.87Z" fill="${this.props.theme.colors.palette.warning[700]}"/>
                  <path d="M13 17.875C13.5523 17.875 14 17.4273 14 16.875C14 16.3227 13.5523 15.875 13 15.875C12.4477 15.875 12 16.3227 12 16.875C12 17.4273 12.4477 17.875 13 17.875Z"
                    fill="${this.props.theme.colors.palette.warning[700]}"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.66666 19.875C5.91174 19.875 5.42905 19.0705 5.78431 18.4044L12.1176 6.52941C12.4941 5.82353 13.5059 5.82353 13.8824
                    6.52941L20.2157 18.4044C20.5709 19.0705 20.0883 19.875 19.3333 19.875H6.66666ZM6.66666 18.875L13 7L19.3333 18.875H6.66666Z" fill="${this.props.theme.colors.palette.warning[700]}"/>
                  </svg>`

    this.state = {
      // mapViewWidgetId: null,
      // layerDataSourceId: null,
      currentDataId: null,
      currentDataIndex: 0,
      loadDataStatus: DataSourceStatus.Loading,
      dataSourceWidgetId: null,
      dataSourceLabel: ''
      // currentData: null,
      // selectedGraphicIndex: 0,
      // sqlExprObj: sqlExprObj || null,
      // maxGraphics: this.props.config.maxGraphics,
      // limitGraphics: this.props.config.limitGraphics
    }
  }

  static versionManager = versionManager

  static mapExtraStateProps = (state: IMState, ownProps: AllWidgetProps<IMConfig>) => {
    const useDataSource = ownProps.useDataSources && ownProps.useDataSources[0]
    const dataSourceWidgetId = appConfigUtils.getWidgetIdByOutputDataSource(useDataSource)
    return {
      dataSourceWidgetLabel: state.appConfig?.widgets[dataSourceWidgetId]?.label
    }
  }

  componentDidMount () {
  }

  componentDidUpdate () {
    // compatible with old version if 'displayFeature' action be configured.
    // if (this.props.mutableStateProps) {
    //  this.handleAction(this.props.mutableStateProps);
    // }
    const useDataSource = this.props.useDataSources &&
                        this.props.useDataSources[0]
    if (!useDataSource) {
      this.setState({
        currentDataId: null,
        currentDataIndex: 0
      })
      this.currentData = null
    } else {
      this.setState({
        dataSourceWidgetId: appConfigUtils.getWidgetIdByOutputDataSource(useDataSource)
      })
    }
  }

  handleAction (mutableStateProps) {
    // const record = mutableStateProps.displayFeatureActionValue && mutableStateProps.displayFeatureActionValue.record;
    // if (record && this.dataSource.id === record.dataSource.id) {
    //  const selectedGraphicIndex = this.getIndexByRecord(record);
    //  if(selectedGraphicIndex > -1) {
    //    getAppStore().dispatch(appActions.widgetMutableStatePropChange(this.props.id, 'displayFeatureActionValue.record', null));
    //    this.setState({
    //      selectedGraphicIndex: selectedGraphicIndex
    //    });
    //  }
    // }
  }

  selectGraphic () {
    const record = this.currentData?.record
    if (record && this.dataSource) {
      MessageManager.getInstance().publishMessage(new DataRecordsSelectionChangeMessage(this.props.id, [record]))
      const selectedRecordIds = this.dataSource.getSelectedRecordIds()
      const recordId = record.getId()
      if (!selectedRecordIds.includes(recordId)) {
        (this.dataSource as FeatureLayerDataSource).queryById(recordId).then((record) => {
          this.dataSource.selectRecordsByIds([recordId], [record])
        })
      }
    }
  }

  getStyleConfig () {
    if (this.props.config.style) {
      return this.props.config.style
    } else {
      return {
        textColor: '',
        fontSizeType: FontSizeType.auto,
        fontSize: null,
        backgroundColor: ''
      }
    }
  }

  onPreGraphicBtnClick = () => {
    let index = this.state.currentDataIndex
    if (index > 0) {
      this.setState({
        currentDataIndex: --index
      })
      this.lockSelection = false
    }
  }

  onNextGraphictBtnClick = () => {
    let index = this.state.currentDataIndex
    if (index < this.currentData.count - 1) {
      this.setState({
        currentDataIndex: ++index
      })
      this.lockSelection = false
    }
  }

  // onActiveViewChange = (view) => {
  //  this.viewFromMapWidget = view;
  //  const useMapWidget = this.props.useMapWidgetIds &&
  //                      this.props.useMapWidgetIds[0];
  //  if(view || !useMapWidget) {
  //    this.setState({
  //      mapViewWidgetId: useMapWidget
  //    });
  //  }
  // }

  onSelectedRecordIdChanged = (index, dataSourceId) => {
    if (index > -1 && this.dataSource.id === dataSourceId) {
      this.setState({
        currentDataIndex: index
      })
    }
  }

  onUnselectedRecordIdChanged = (dataSourceId) => {
    if (this.dataSource?.id === dataSourceId) {
      MessageManager.getInstance().publishMessage(new DataRecordsSelectionChangeMessage(this.props.id, []))
    }
  }

  onDataSourceStatusChanged = (status: DataSourceStatus, dataSourceLabel?: string) => {
    this.setState({
      loadDataStatus: status,
      dataSourceLabel: dataSourceLabel
    })
  }

  onDataChanged = (dataSource, currentData, isFirstLoad) => {
    this.dataSource = dataSource
    this.previousData = this.currentData
    this.currentData = currentData
    this.setState({
      currentDataId: this.currentData ? this.currentData.id : null,
      currentDataIndex: this.currentData ? this.currentData.index : 0,
      loadDataStatus: DataSourceStatus.Loaded
    })

    //if(!isFirstLoad && this.previousData?.id !== this.currentData?.id) {
    if (!this.lockSelection) {
      this.selectGraphic()
      this.lockSelection = true
    }
  }

  onCurrentFeatureClick= () => {
    this.selectGraphic()
  }

  render () {
    const useMapWidget = this.props.useMapWidgetIds &&
                        this.props.useMapWidgetIds[0]
    const useDataSource = this.props.useDataSources &&
                        this.props.useDataSources[0]

    let dataSourceContent = null
    dataSourceContent = (
      <DataLoader
        useDataSource={useDataSource}
        widgetId={this.props.id}
        index={this.state.currentDataIndex}
        limitGraphics={this.props.config.limitGraphics}
        maxGraphics={this.props.config.maxGraphics}
        onSelectedRecordIdChanged={this.onSelectedRecordIdChanged}
        onUnselectedRecordIdChanged={this.onUnselectedRecordIdChanged}
        onDataSourceStatusChanged={this.onDataSourceStatusChanged}
        onDataChanged={this.onDataChanged}
      />
    )

    let content = null
    if (this.props.config.useMapWidget ? !useMapWidget : !useDataSource) {
      content = (
        <div className='widget-featureInfo'>
          <WidgetPlaceholder icon={featureInfoIcon} message={this.props.intl.formatMessage({ id: '_widgetLabel', defaultMessage: defaultMessages._widgetLabel })} widgetId={this.props.id} />
        </div>
      )
      this.currentData = null
    } else {
      let loadingContent = null
      if (this.state.loadDataStatus === DataSourceStatus.Loading) {
        loadingContent = (
          <div style={{ position: 'absolute', left: '50%', top: '50%' }} className='jimu-secondary-loading' />
        )
      }

      let dataActionPlaceholder = null
      let dataActionConten = null
      const dataName = this.props.intl.formatMessage({ id: 'featureInfoDataActionLabel', defaultMessage: defaultMessages.featureInfoDataActionLabel },
        { layer: this.dataSource?.getLabel() || '' })
      // show dataAction by default (this.props.enableDataAction is undefined)
      const enableDataAction = this.props.enableDataAction === undefined ? true : this.props.enableDataAction
      if (this.currentData && this.currentData.count > 0 && enableDataAction) {
        dataActionPlaceholder = (
          <div className='data-action-placeholder' />
        )
        dataActionConten = (
          <div className='data-action-dropdown-content'>
            <DataActionDropDown
              dataName={dataName}
              widgetId={this.props.id}
              dataSource={this.dataSource}
              records={[this.currentData.record]}
              type='tertiary'
            />
          </div>
        )
      }

      let navContent = null
      if (this.currentData && this.currentData.count > 1) {
        const featureNumbers = this.props.intl.formatMessage({ id: 'featureNumbers', defaultMessage: defaultMessages.featureNumbers },
          { index: this.currentData.index + 1, count: this.currentData.count })
        navContent = (
          <div className='nav-section d-flex justify-content-center align-items-center'>
            <Button className='nav-btn' type='tertiary' size='sm' onClick={this.onPreGraphicBtnClick}> {'<'} </Button>
            <span> {featureNumbers} </span>
            <Button className='nav-btn' type='tertiary' size='sm' onClick={this.onNextGraphictBtnClick}> {'>'} </Button>
          </div>
        )
      }

      let headerConten = null
      if (this.currentData && (this.currentData.count === 1 ? enableDataAction : this.currentData.count > 1) && this.state.loadDataStatus !== DataSourceStatus.NotReady) {
        headerConten = (
          <div className='header-section'>
            {dataActionPlaceholder}
            {navContent}
            {dataActionConten}
          </div>
        )
      }

      const visibleElements = {
        title: this.props.config.title,
        content: {
          fields: this.props.config.fields,
          text: this.props.config.fields,
          media: this.props.config.media,
          attachments: this.props.config.attachments,
          expression: true
        },
        lastEditedInfo: this.props.config.lastEditInfo
      }

      let featureInfoContent
      if (this.state.loadDataStatus === DataSourceStatus.NotReady) {
        const warningMessage = this.props.intl.formatMessage({ id: 'outputDataIsNotGenerated', defaultMessage: 'warning' },
          { outputDsLabel: this.state.dataSourceLabel, sourceWidgetName: this.props.dataSourceWidgetLabel })
        featureInfoContent = (
          <div className='widget-featureInfo'>
            <WidgetPlaceholder icon={featureInfoIcon} message={this.props.intl.formatMessage({ id: '_widgetLabel', defaultMessage: defaultMessages._widgetLabel })} widgetId={this.props.id} />
            <Icon className='warning-icon' icon={this.warningIcon} size={26} title={warningMessage} currentColor={false} />
          </div>
        )
      } else if (this.currentData && this.dataSource) {
        featureInfoContent = (
          <div style={{ cursor: 'pointer' }} onClick={this.onCurrentFeatureClick} >
            <FeatureInfo
              graphic={this.currentData.graphic}
              visibleElements={visibleElements}
              dataSource={this.dataSource}
            />
          </div>
        )
      } else {
        featureInfoContent = (
          <div
            className='no-data-message p-4 font-weight-bold'
            dangerouslySetInnerHTML={{
              __html: this.props.config.noDataMessage ||
                this.props.intl.formatMessage({ id: 'noDeataMessageDefaultText', defaultMessage: defaultMessages.noDeataMessageDefaultText })
            }}
          />
        )
      }

      content = (
        <div className='widget-featureInfo'>
          {loadingContent}
          {headerConten}
          {featureInfoContent}
          <div style={{ position: 'absolute', opacity: 0 }} ref='mapContainer'>mapContainer</div>
          <div style={{ position: 'absolute', display: 'none' }}>
            {dataSourceContent}
          </div>
        </div>
      )
    }

    return (
      <div css={getStyle(this.props.theme, this.props.config.styleType, this.getStyleConfig(), getAppStore().getState()?.appContext?.isRTL)} className='jimu-widget'>
        {content}
      </div>
    )
  }
}
