import { EventEmitter } from '../../stencil-public-runtime';
export declare class ArcgisReportList {
  el: HTMLElement;
  reportSelected: EventEmitter<any>;
  static _counter: number;
  static _bumpCounter(): number;
  queryElementById(id: string): HTMLElement;
  selectedReportId: string;
  _counter: number;
  _containerId: string;
  token: string;
  username: string;
  treeInstanceId: string;
  setReportId(newValue: any): void;
  componentWillLoad(): void;
  static i18n(key: string): string;
  static validateData(data: any): number;
  /**
   * generateTree   Generates calcite tree html for the given data
   *
   * @param data - infographics or reports list data
   *
   * Return - HTML for calcite tree
   */
  generateTree(data: any): string;
  componentDidLoad(): void;
  render(): any;
}
