import { React, DataRecord } from 'jimu-core'
import { ColorMatches } from '../../../../../config'

/**
 * The data version of the inline data source, chart will re-update data if data version changed.
 * @param sourceVersion
 * @param colorMatches
 */
const useDataVersion = (records: DataRecord[], colorMatches: ColorMatches): number => {
  const versionRef = React.useRef(0)
  const version = React.useMemo(() => {
    return ++versionRef.current
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records, colorMatches])
  return version
}

export default useDataVersion
