export declare class TokenProvider {
    static token: {
        access_token: string;
        expires_in: null;
        persist: string;
        ssl: string;
        username: string;
    };
    /**
     * todo: implement real method
     *
     * @return {Promise<unknown>}
     */
    static getToken(): Promise<unknown>;
    static setToken(username: string, token: string): void;
}
