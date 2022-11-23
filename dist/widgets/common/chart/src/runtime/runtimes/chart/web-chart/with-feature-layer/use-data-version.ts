import { React } from 'jimu-core'

const useDataVersion = (serie, query) => {
  const { x, y, binCount, dataTransformationType } = serie
  const [dataVersion, setDataVersion] = React.useState(0)
  React.useEffect(() => {
    setDataVersion(v => v + 1)
  }, [x, y, query, binCount, dataTransformationType])
  return dataVersion
}

export default useDataVersion
