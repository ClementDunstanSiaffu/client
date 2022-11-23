import defaultMessages from './translations/default'

const infoIcon = require('jimu-icons/svg/outlined/suggested/info.svg')
const iconClose = require('jimu-icons/svg/outlined/editor/close.svg')
const iconBack = require('jimu-icons/svg/outlined/directional/left.svg')

export const getConfigIcon = () => ({
  epConfigIcon: {
    infoIcon,
    iconClose,
    iconBack
  }
})

export const defaultElevationLayer = 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer'

export const unitOptions = [
  {
    value: 'meters'
  },
  {
    value: 'feet'
  },
  {
    value: 'kilometers'
  },
  {
    value: 'miles'
  },
  {
    value: 'yards'
  }
]

export const elevationTypeOptions = [
  {
    value: 'no elevation', name: 'noElevation'
  },
  {
    value: 'z', name: 'zValue'
  },
  {
    value: 'one', name: 'oneField'
  },
  {
    value: 'two', name: 'twoField'
  }
]

export const elevationTypeOptionsWithoutZ = [
  {
    value: 'no elevation', name: 'noElevation'
  },
  {
    value: 'one', name: 'oneField'
  },
  {
    value: 'two', name: 'twoField'
  }
]

export const projectionOptions = [
  {
    value: 'map', name: 'mapProjection'
  },
  {
    value: 'field', name: 'sourceField'
  }
]

export const chartSymbolOptions = [
  {
    value: 'map', name: 'mapLabel'
  },
  {
    value: 'custom', name: 'customLabel'
  }
]

export const epStatistics = [
  {
    value: 'maxDistance', label: defaultMessages.maxDistance
  },
  {
    value: 'minElevation', label: defaultMessages.minElevation
  },
  {
    value: 'maxElevation', label: defaultMessages.maxElevation
  },
  {
    value: 'avgElevation', label: defaultMessages.avgElevation
  },
  {
    value: 'elevationGain', label: defaultMessages.elevationGain
  },
  {
    value: 'elevationLoss', label: defaultMessages.elevationLoss
  },
  {
    value: 'maxPositiveSlope', label: defaultMessages.maxPositiveSlope
  },
  {
    value: 'maxNegativeSlope', label: defaultMessages.maxNegativeSlope
  },
  {
    value: 'avgPositiveSlope', label: defaultMessages.avgPositiveSlope
  },
  {
    value: 'avgNegativeSlope', label: defaultMessages.avgNegativeSlope
  }
]

export const defaultConfiguration = {
  profileChartSettings: {
    isCustomElevationLayer: false,
    elevationLayerURL: '',
    linearUnit: '',
    elevationUnit: '',
    displayStatistics: true,
    selectedStatistics: [],
    groundColor: '#b54900',
    graphicsHighlightColor: '#00ffff'
  },
  advanceOptions: false,
  profileSettings: {
    layers: []
  }
}

export const defaultProfileSettings = {
  layerId: '',
  elevationSettings: {
    type: '',
    unit: '',
    field1: '',
    field2: ''
  },
  distanceSettings: {
    type: 'map',
    field: '',
    unit: ''
  },
  style: {
    lineType: 'solid-line',
    lineColor: '#049546',
    lineThickness: 3
  }
}

export const defaultAssetSettings = {
  layerId: '',
  elevationSettings: {
    type: '',
    unit: '',
    oneFieldLabel: '',
    twoFieldLabel: '',
    field1: '',
    field2: ''
  },
  style: {
    type: 'map',
    bullet: 'rectangle',
    bulletSize: 12,
    bulletColor: 'red'
  },
  legend: {
    displayStatistics: true,
    selectedStatistics: []
  }
}
