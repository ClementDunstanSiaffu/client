import * as jimuLayoutsModule from 'jimu-layouts/layout-runtime';
export declare function clearSelection(dispatch: any): void;
export declare function getDialogPrefix(runtimeMode: string): string;
export declare function clearLocalStore(runtimeMode: string, timestamp: string): void;
export declare function loadLayoutEntry(): Promise<typeof jimuLayoutsModule>;
