export declare type InfographicBufferType = 'ring' | 'drivetime' | 'walktime';
export declare type InfographicBufferUnits = 'miles' | 'kilometers' | 'minutes';
export declare type ViewModeType = 'full' | 'stack' | 'slides' | 'stack-all';
export declare class ArcgisInfographic {
  el: HTMLElement;
  _instanceCounter: number;
  _containerId: string;
  _iframeId: string;
  _instanceIndex: number;
  _onChangeCallback: any;
  _isInternalUpdate: boolean;
  _debounceTimer: any;
  constructor();
  getContainerRect(): object;
  queryElement(query: string): HTMLElement;
  queryElementById(id: string): HTMLElement;
  _regenerateContent(): void;
  instanceId: string;
  env: string;
  token: string;
  username: string;
  locationDisplayName: string;
  langCode: string;
  reportId: string;
  theme: object;
  bufferType: InfographicBufferType;
  bufferUnits: InfographicBufferUnits;
  bufferSizes: string;
  viewMode: ViewModeType;
  reportShowHeader: boolean;
  reportHeaderButtonPrint: boolean;
  reportHeaderButtonZoomLevel: boolean;
  reportHeaderButtonExcel: boolean;
  reportHeaderButtonFullscreen: boolean;
  reportHeaderButtonImage: boolean;
  reportHeaderButtonPdf: boolean;
  reportHeaderButtonDynHtml: boolean;
  reportColorBackground: string;
  reportColorHeader: string;
  reportColorHeaderText: string;
  selectedFeatureId: number;
  runReportOnClick: boolean;
  showSearch: boolean;
  reportLocation: string;
  reportGeometry: string;
  stInstanceId: string;
  stEnv: string;
  stToken: string;
  stUsername: string;
  stLocationDisplayName: string;
  stLangCode: string;
  stReportId: string;
  stTheme: object;
  stBufferType: InfographicBufferType;
  stBufferUnits: InfographicBufferUnits;
  stBufferSizes: Array<number>;
  stViewMode: ViewModeType;
  stReportShowHeader: boolean;
  stReportHeaderButtonPrint: boolean;
  stReportHeaderButtonZoomLevel: boolean;
  stReportHeaderButtonFullscreen: boolean;
  stReportHeaderButtonExcel: boolean;
  stReportHeaderButtonImage: boolean;
  stReportHeaderButtonPdf: boolean;
  stReportHeaderButtonDynHtml: boolean;
  stReportColorBackground: string;
  stReportColorHeader: string;
  stReportColorHeaderText: string;
  stSelectedFeatureId: number;
  stRunReportOnClick: boolean;
  stShowSearch: boolean;
  stReportLocation: string;
  stReportGeometry: string;
  onIdChanged(): void;
  onEnvChanged(): void;
  onTokenChanged(): void;
  onUsernameChanged(): void;
  onLocationDisplayNameChanged(): void;
  onLangCodeChanged(): void;
  onReportIdChanged(): void;
  onThemeChanged(): void;
  onBufferTypeChanged(): void;
  onBufferUnitsChanged(): void;
  onBufferSizesChanged(): void;
  onViewModeChanged(): void;
  onReportHeaderChanged(): void;
  onReportPrintChanged(): void;
  onReportZoomLevelChanged(): void;
  onReportExcelChanged(): void;
  onReportFullscreenChanged(): void;
  onReportImageChanged(): void;
  onReportPdfChanged(): void;
  onReportDynHtmlChanged(): void;
  onReportBackgroundChanged(): void;
  onReportColorHeaderChanged(): void;
  onReportColorHeaderTextChanged(): void;
  onSelectedFeatureIdChanged(): void;
  onRunReportOnClickChanged(): void;
  onShowSearchChanged(): void;
  onReportLocationChanged(): void;
  onReportGeometryChanged(): void;
  reportSelectedEventHandler(event: any): void;
  /**
   * generateBuffers
   *
   * This function passes in values needed to do either a drivetime or walktime buffers
   * report.  The values passed in update the Props in the component, async returns the
   * rings, and generates a new infographic using the drivetime or walktime values.
   *
   * @param bufferType = 'walktime' or 'drivetime'
   * @param values     = string representing drivetime distance or time [examplel:"1,3,5"]
   * @param units      = "miles", "kilometers", or "minutes"
   * @param latitude   = map location
   * @param longitude
   *
   * @return = [
   *  { value: <bufferValue>, units: <bufferUnits>, rings: <geometry rings> },
   *  { value: <bufferValue>, units: <bufferUnits>, rings: <geometry rings> },
   *  <up to 3 results depending on length of values>
   * ]
   */
  generateBuffers(bufferType: string, values: string, units: string, latitude: string, longitude: string): Promise<any>;
  onPropChange(callback: any, context: any): Promise<void>;
  /**
   * Filters out multiple rapid events of the same type.  The callback
   * function will be called if no new events have happened during the
   * 'wait' time.
   * @param callback - your funtion to call when the events have settled
   * @param wait     - milliseconds delay (ex: 250)
   */
  _debounce2(callback: any, wait: any): void;
  _onFilteredPropChanged(): void;
  _onPropChanged(): void;
  _debounce(func: any, wait: number, immediate: boolean): () => void;
  _validateReportGeometry(data: any): boolean;
  _getReportGeometryAnalysisAreas(): Promise<string>;
  _installMapEvents(): void;
  _validateBuffers(): void;
  _validateTheme(theme: any): boolean;
  componentWillLoad(): void;
  _validateSetup(): boolean;
  _getPlayerStyleOptions(): string;
  componentDidLoad(): Promise<void>;
  static _counter: number;
  static _bumpCounter(): number;
  render(): any;
}
