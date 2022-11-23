import { UserSession, ICredential, IUser } from '@esri/arcgis-rest-auth';
import { ArcGISServerInfo } from './types/common';
export interface IDeferred<T> {
    promise: Promise<T>;
    resolve: (v: T) => void;
    reject: (v: any) => void;
}
/**
 * @ignore
 * The reason type session changed
 */
export declare enum SessionChangedReasonType {
    ArcGISJSSync = "ARCGIS_JS",
    OtherWindowSync = "OTHER_WINDOW",
    AddOrUpdate = "ADD_OR_UPDATE",
    Remove = "REMOVE"
}
/**
 * @ignore
 * The session change listener type
 */
export declare type SessionChangeListener = (sessions: UserSession[], reasonType: SessionChangedReasonType) => void;
/**
 * The `SessionManager` is used to manage user sign in sessions.
 */
export declare class SessionManager {
    static instance: SessionManager;
    /**
     * There are three types of a session in the sessions.
     *   1, Portal Session: {
     *     portal: 'https://www.arcgis.com/sharing/rest',
     *     server: undefined
     *   }
     *   2, Federated server session: {
     *     //portal is owning system portal url
     *     portal: 'https://www.arcgis.com/sharing/rest',
     *     server: 'https://server1.arcgis.com/0c086ufssavnw2/arcgis'
     *   }
     *   3, Unfederated server session: {
     *     portal: undefined,
     *     server: 'https://sampleserver6.arcgisonline.com/arcgis'
     *   }
     *
     * If there is a federated server session already exist, then its owning system portal session must also exist.
     *
     * Portal key:
     *   The key is combined with urlKey and customBaseUrl for normal portal,
     *   but if the customBaseUrl is a map url(start with maps|mapsqa|mapsdevext),
     *   the customBaseUrl's prefix will be replaced by www|qaext|devext.
     *
     *   urlKey is the first word of a url, such as 'www',
     *   and customBaseUrl is a url part before 'sharing/rest' and after urlkey
     *
     *   example1:
     *   url: https://beijing.mapsqa.arcgis.com
     *   urlKey: beijing
     *   customBaseUrl: mapsqa.arcgis.com
     *   key: qaext.arcgis.com
     *
     *   example2:
     *   url: http://private.test.com
     *   urlKey: private
     *   customBaseUrl: test.com
     *   key: private.test.com
     *
     * Server key:
     *   The key is that prefix 'server_' plus it removes the protocol from 'server' property of sever session.
     *   Please referer to 'getServerKeyFromUrl' method.
     *
     *   example:
     *   serverSession.server: 'https://server1.arcgis.com/0c086ufssavnw2/arcgis'
     *   key: 'server_server1.arcgis.com/0c086ufssavnw2/arcgis'
     *
     *  */
    private sessions;
    private trustedServers;
    private readonly arcgisJSIM;
    private isSigning;
    private signInQueue;
    private onSessionChangedCallbacks;
    private clientIdDialogResultPromises;
    /**
     * Return main session.
     *
     * The main session is session of the portal that the app connects to.
     *
     * @returns [ArcGIS REST JS 'UserSession'](https://esri.github.io/arcgis-rest-js/api/auth/UserSession) representing a logged in user.
     */
    getMainSession(): UserSession;
    /**
     * Return all sessions.
     *
     * @returns Array of [ArcGIS REST JS 'UserSession'](https://esri.github.io/arcgis-rest-js/api/auth/UserSession) representing the logged in users.
     */
    getSessions(): UserSession[];
    /**
     * Clear all sessions
     */
    clearSessions(): void;
    /**
     * On session changed
     */
    private onSessionChanged;
    /**
     * Get singleton instance.
     */
    static getInstance(): SessionManager;
    /**
     * @ignore
     */
    constructor();
    /**
     * @ignore
     *
     * We can init session from 3 places: local storage, cookie(esri_aopc), and parent app.
     *
     * First, we'll check `canReadSessionFromParent()`. If true, return `readSessionFromParent()`. Else,
     * Then, for develop edition, init session from local storage.
     *       for non-develop edition, init session from cookie(esri_aopc) or local storage.
     *
     * About sync session for embed:
     * Ref: https://esri.github.io/arcgis-rest-js/guides/embedded-apps/
     *
     * Note: **Embed** here means embed for auth sync only, by checking `arcgis-auth-origin` URL param.
     *
     * When an exb app is embedded, will call `UserSession.fromParent(arcgisAuthOrigin)` to get auth from host app.
     * When an exb app is as host app, will listen and reply auth message from/to all `*.arcgis.com` domains
     *
     * The main portal must have been set in app store before call this method.
     */
    initSession(): Promise<void>;
    /**
     * Init session from storage
     */
    private initSessionFromStorage;
    /**
     * Init session from cookie or storage
     * @param portalInfo
     */
    private initSessionFromCookieOrStorage;
    /**
     * Handle the situation for init sessiion failed.
     */
    private failedToInitSession;
    /**
     * Set session by PlatformSelf response
     * @param response
     * @param portalInfo
     */
    private setSesssionByPlatformSelfResponse;
    /**
     * Sends request to check token of session from storage.
     * @param portalUrl
     */
    private isValidTokenFromStorage;
    /**
     * Reture true if the session is a main session and is valid.
     * @param session
     */
    private readonly isMainSession;
    /**
     * Handle invalid sign-in session.
     */
    private readonly processInvalidSignInSession;
    /**
     * @ignore
     * Redirect to signin page
     */
    gotoSignInPage: () => void;
    /**
     * @ignore
     * Get user info.
     * @param session
     */
    getUserInfo(): Promise<IUser>;
    /**
     * Handle works after got user info.
     * @param session
     */
    private afterGetUserInfo;
    /**
     * Get your portal info
     */
    private getMainPortal;
    /**
     * @ignore
     * Get trusted server from authorizedCrossOriginDomains of portalSelf info.
     */
    getTrustedServers(): string[];
    /**
     * @ignore
     * Return true if the serverUrl is trusted.
     * @param serverUrl
     */
    isTrustedServer(serverUrl: string): boolean;
    /**
     * Remove the session from session manager.
     * @param session A session of [ArcGIS REST JS 'UserSession'](https://esri.github.io/arcgis-rest-js/api/auth/UserSession) representing a logged in user.
     */
    removeSession(session: UserSession): boolean;
    /**
     * Remove session by key.
     * @param key
     */
    private removeSessionByKey;
    /**
     * @ignore
     *
     * Add or replace a session, we use session key to check whether to add new or replace old one.
     * After session changed, will sync to other window's SessionManager.
     * @param session A session of [ArcGIS REST JS 'UserSession'](https://esri.github.io/arcgis-rest-js/api/auth/UserSession) representing a logged in user.
     */
    addOrReplaceSession(session: UserSession): boolean;
    /**
     * Add a new session, if the session's key has exist, replace it.
     * @param session A session of [ArcGIS REST JS 'UserSession'](https://esri.github.io/arcgis-rest-js/api/auth/UserSession) representing a logged in user.
     */
    private doAddOrReplaceSession;
    /**
     * Update the session
     * @param key
     * @param session A session of [ArcGIS REST JS 'UserSession'](https://esri.github.io/arcgis-rest-js/api/auth/UserSession) representing a logged in user.
     *
     */
    private setSession;
    /**
     * Return session by url.
     * @param url
     *
     * @returns [ArcGIS REST JS 'UserSession'](https://esri.github.io/arcgis-rest-js/api/auth/UserSession) representing a logged in user.
     */
    getSessionByUrl(url: string): UserSession;
    /**
     * Get session key from a session.
     *
     * @param session A session of [ArcGIS REST JS 'UserSession'](https://esri.github.io/arcgis-rest-js/api/auth/UserSession) representing a logged in user.
     */
    getSessionKeyFromSession(session: UserSession): string;
    /**
     * @ignore
     *
     * The URL can be an arcgis service url or a portal url, the key is used as id of the session.
     *
     * @param url
     */
    getSessionKeyFromUrl(url: string): string;
    /**
     * @ignore
     * Get session key from a service url, return '' if the url is not a server url.
     *
     * @param url
     */
    getServerKeyFromUrl(url: string): string;
    /**
     * Get portal key from url.
     *
     * @param url
     */
    private getPortalKeyFromUrl;
    /**
     * Get portal url info.
     * @param portalUrl
     */
    private getPortalUrlInfo;
    /**
     * Get session from auth info.
     * @param authInfo
     */
    private getSessionFromAuthInfo;
    /**
     * Get session from storage.
     *
     * @returns [ArcGIS REST JS 'UserSession'](https://esri.github.io/arcgis-rest-js/api/auth/UserSession) representing a logged in user.
     */
    private getSessionFromStorage;
    /**
     * Remvoe cookie by key.
     * @param key
     */
    private readCookie;
    /**
     * Get portal from authInfo.
     * @param authInfo
     */
    private getPortalFromAuthInfo;
    /**
     * Reture true if it's a valid session.
     * @param session A session of [ArcGIS REST JS 'UserSession'](https://esri.github.io/arcgis-rest-js/api/auth/UserSession) representing a logged in user.
     */
    private isSessionExpired;
    /**
     * Get authInfo from session.
     * @param session A session of [ArcGIS REST JS 'UserSession'](https://esri.github.io/arcgis-rest-js/api/auth/UserSession) representing a logged in user.
     */
    private getAuthInfoFromSession;
    /**
     * Reture true if it's a valid authInfo.
     * @param authInfo
     */
    private checkAuthInfo;
    /**
     * Read info by key from localStorage.
     * @param key
     */
    private readAuthInfo;
    /**
     * @ignore
     * Write authInfo to storage.
     * @param session A session of [ArcGIS REST JS 'UserSession'](https://esri.github.io/arcgis-rest-js/api/auth/UserSession) representing a logged in user.
     */
    writeAuthInfo(session: UserSession): void;
    /**
     * Remove authInfo from local storage.
     * @param session
     */
    private removeAuthInfo;
    /**
     * Return the session key for AGOL.
     * If the url is not a public AGOL url or a org url, return undefined.
     * @param url
     */
    private getStandardAGOLSessionKey;
    /**
     * This method is valid for AGOL only
     * @param sessionKey
     * @param orgUrlKey
     */
    private getOrgUrl;
    /**
     * Get hosted service
     * @param url
     */
    private getHostedService;
    /**
     * Get key of hosted service.
     * @param url
     */
    private getHostedServiceArcgisKey;
    /**
     * @ignore
     *
     * Get sign in domain.
     * @param url
     * @param orgKey
     */
    getSignInDomain(url: string, orgKey: string): Promise<string>;
    /**
     * Start OAuth sign in flow and return the user session.
     *
     * @param fromUrl The page you start sign in
     * @param popup If 'true', the window will popup, or, it will redirect to sign in page
     * @param desUrl The url you want to sign in
     */
    signIn(fromUrl?: string, popup?: boolean, desUrl?: string, clientId?: string): Promise<UserSession>;
    /**
     * Get a valid client id for portal url
     *
     * @param PortalUrl portal url
     */
    getClientIdByUrl(portalUrl: string): string;
    onClientIdDialogFinished(portalUrl: string, clientId: string, error?: any): void;
    /**
     * Popup a dialog to set client id to app config
     *
     * @param portalUrl portal url
     * @param needToSignIn indicates whether need to sign-in
     * @param serviceUrl service url
     */
    useDialogToSetClientIdToConnectiosOfAppConfigAndSignIn(portalUrl: string, needToSignIn?: boolean, serviceUrl?: string): Promise<any>;
    /**
     * @ignore
     * You can register some callbacks for session changing
     * @param listener
     */
    addSessionChangeListener(listener: SessionChangeListener): void;
    private _executSignIn;
    /**
     * When you need to handle the error caused by sign in, you can catch the error and call this method.
     * This method will try to sign in to get a new session.
     */
    handleAuthError: (error: any, popup?: boolean) => Promise<UserSession>;
    /**
     * Sign out from main portal.
     */
    signOut(): void;
    /**
     * @ignore
     * Switch account
     */
    switchAccount(): void;
    private defer;
    /**
     * Generate token.
     * @param portalUrl
     * @param getTokenParam
     * @param credentialsParam
     */
    generateToken(portalUrl: string, getTokenParam: string, credentialsParam: string): Promise<any>;
    /**
     * Generate server session with owning system portal session.
     * @param portalSession A session of [ArcGIS REST JS 'UserSession'](https://esri.github.io/arcgis-rest-js/api/auth/UserSession) representing a logged in user.
     * @param serverUrl
     */
    generateSeverSessionByPortalSession(portalSession: UserSession, serverUrl: string, credentialsParamForGenerateToken?: string): Promise<UserSession>;
    /**
     * Get portalSelf info with credentials.
     * @param portalUrl
     * @param getTokenParam
     */
    private getPortalSelf;
    /**
     * @ignore
     *
     * Get session from webTier portal.
     * This method can be used to check the portal is wetTier or not.
     * retuan a session means it's a webTier portal.
     * @param portalUrl
     * @param getTokenParam
     */
    getSessionFromWebTierPortal(portalUrl: string, getTokenParam?: string, portalSelfParam?: any): Promise<UserSession>;
    /**
     * @ignore
     * Get session by webTier server url (webTier services are stored in the 'trusted servers')
     * @param serverUrl
     */
    getSessionFromWebTierServer(serverUrl: string): Promise<UserSession>;
    /****************************************************************
     * Methods for syncing session to IdentityManager of js-api
     ***************************************************************/
    /**
     * Create a session from arcgis JS API credential
     * @ignore
     * @param credential
     */
    addFromArcGisJSCredential(credential: ICredential, serverInfo?: ArcGISServerInfo): boolean;
    /*****************************************************************
     * Methods for syncing session to other window
     ****************************************************************/
    /**
     * Sync to other window's session manager
     */
    private syncToOtherWindowSessionManager;
    /**
     * Sync session from other window, this if for build-app sync only.
     *
     * @ignore
     * @param sessions
     */
    syncSessionsFromOtherWindow(sessions: UserSession[]): void;
    private readSessionFromParent;
    /**
     * When an app is embedded, check whether the app can read session from parent.
     * Now, only the apps under *.arcgis.com domain can read session from parent.
     */
    private canReadSessionFromParent;
    private onSessionRequestMessage;
}
/** @ignore */
export default SessionManager;
