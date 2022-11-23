import { IntlShape } from 'jimu-core';
import { IFeature, IGeometry } from '@esri/arcgis-rest-types';
import { AbstractDataRecord } from '../ds-base-types';
import { AttachmentInfo, FeatureDataRecord, FeatureLayerDataSource, SceneLayerDataSource } from '../data-source-interface';
export declare class FeatureDataRecordImpl extends AbstractDataRecord implements FeatureDataRecord {
    feature: IFeature | __esri.Graphic;
    dataSource: FeatureLayerDataSource | SceneLayerDataSource;
    attachmentInfos: AttachmentInfo[];
    protected _queryAllAttachmentsPromise: Promise<AttachmentInfo[]>;
    protected _getSymbolPreviewHTMLPromise: Promise<HTMLElement>;
    constructor(feature: IFeature | __esri.Graphic, dataSource: FeatureLayerDataSource | SceneLayerDataSource, isBeforeMappingData?: boolean);
    private fillGeometry;
    queryAttachments(attachmentTypes?: string[]): Promise<AttachmentInfo[]>;
    fetchSymbolPreviewHTML(): Promise<HTMLElement>;
    getData(): {
        [key: string]: any;
    };
    setData(data: {
        [key: string]: any;
    }): void;
    clone(deep?: boolean): FeatureDataRecord;
    getFormattedFieldValue(jimuFieldName: string, intl: IntlShape): string;
    getDataBeforeMapping(): {
        [key: string]: any;
    };
    getOriginData(): {
        [key: string]: any;
    };
    toJson(): IFeature | __esri.Graphic;
    getId(): string;
    setId(id: string): void;
    getGeometry(): IGeometry;
    setGeometry(geo: IGeometry): void;
    setFeature(feature: IFeature | __esri.Graphic): void;
    getFeature(): IFeature | __esri.Graphic;
    /**
     * @ignore
     * Returns whether `feature` is type of `__esri.Graphic`, some methods only work with `__esri.Graphic`.
     */
    private _isGraphicFeature;
}
