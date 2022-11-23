import { UseDataSource, IMSqlExpression, ImmutableObject } from 'jimu-core';
export interface Config {
    messageUseDataSource: UseDataSource;
    actionUseDataSource: UseDataSource;
    sqlExprObj?: IMSqlExpression;
    enabledDataRelationShip?: boolean;
    enableQueryWithCurrentExtent?: boolean;
}
export declare type IMConfig = ImmutableObject<Config>;
