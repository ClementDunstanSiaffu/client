import { EventEmitter } from '../../stencil-public-runtime';
export declare class ReportListAccordion {
  el: HTMLElement;
  reportSelected: EventEmitter<any>;
  static _counter: number;
  static _bumpCounter(): number;
  queryElementById(id: string): HTMLElement;
  env: string;
  token: string;
  username: string;
  listInstanceId: string;
  theme: string;
  langCode: string;
  _counter: number;
  _containerId: string;
  selectedReportId: string;
  stEnv: string;
  stToken: string;
  stUsername: string;
  stListInstanceId: string;
  stTheme: any;
  stLangCode: any;
  stSelectedReportId: string;
  onEnvChanged(): void;
  onTokenChanged(): void;
  onUsernameChanged(): void;
  onListInstanceIdChanged(): void;
  onThemeChanged(): void;
  onLangCodeChanged(): void;
  onSelectedReportIdChanged(): void;
  setReportId(newValue: any): void;
  componentWillLoad(): void;
  static i18n(key: string): string;
  static validateData(data: any): number;
  /**
   * generateUI   Generates calcite accordions html for the given data
   *
   * @param data - infographics or reports list data
   *
   * Return - HTML string
   */
  generateUI(data: any): string;
  _validateSetup(): boolean;
  componentDidLoad(): void;
  render(): any;
}
