export interface WindowLocationMockHandle {
    unMock: () => void;
}
/** Mock the window.location */
export declare function mockWindowLocation(loc: Partial<Location>): WindowLocationMockHandle;
