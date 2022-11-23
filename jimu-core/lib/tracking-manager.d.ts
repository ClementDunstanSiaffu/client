import { TrackInstance, TrackEvent, TrackError, IMAnalytics, IMGoogleAnalytics } from './types/tracking-manager';
export declare class TrackingManager {
    enable: boolean;
    gtag: any;
    googleAnalytics: IMGoogleAnalytics;
    track: TrackInstance;
    static instance: TrackingManager;
    static getInstance(): TrackingManager;
    constructor();
    private onStoreChange;
    initialize: (analytics: IMAnalytics) => Promise<any>;
    private readonly initializeGtag;
    private createTracker;
    private readonly compareGoogleAnalytics;
    private readonly disableGaTrackForGtag;
    private readonly addGaTrackIdToGtag;
    private readonly updateGgTrackerDimensions;
    private readonly updateGgTrackerMetrics;
    private readonly updateGgTrackerAnonymizeip;
    private readonly getGgTracker;
    private readonly mutablePortalUser;
    private readonly isTrackAvailable;
    logPageView(page: string): void;
    logEvent(event: TrackEvent): void;
    logError(error: TrackError): void;
}
