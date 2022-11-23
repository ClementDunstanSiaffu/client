declare class DbgLog {
  fixForLint: string;
  constructor();
  static showDebugConsoleLogs: boolean;
  static log(title: string, ...list: any): void;
}
export default DbgLog;
