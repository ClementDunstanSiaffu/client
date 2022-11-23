export interface WindowLocationMockHandle{
  unMock: () => void
}
/** Mock the window.location */
export function mockWindowLocation (loc: Partial<Location>): WindowLocationMockHandle {
  const { location } = window

  delete window.location
  // @ts-expect-error
  window.location = {
    href: '',
    pathname: '/',
    search: '',
    ...loc
  }

  return {
    unMock: () => {
      window.location = location
    }
  }
}
