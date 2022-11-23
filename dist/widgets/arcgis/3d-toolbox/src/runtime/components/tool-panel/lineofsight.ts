/** @jsx jsx */
import { React } from 'jimu-core'
import { JimuMapView } from 'jimu-arcgis'
import LineOfSight from 'esri/widgets/LineOfSight'
import LineOfSightViewModel from 'esri/widgets/LineOfSight/LineOfSightViewModel'
import { LineOfSightConfig } from '../../../constraints'
// import Graphic from 'esri/Graphic'
// import GraphicsLayer from 'esri/layers/GraphicsLayer'

export interface LineOfSightProps {
  jimuMapView: JimuMapView
  lineOfSightConfig: LineOfSightConfig
  onUpdated: () => void
}
export const useLineOfSight = (props: LineOfSightProps) => {
  const { onUpdated } = props
  const widgetRef = React.useRef<__esri.LineOfSight>(null)

  // 3DToolbox: Research widgets setting ,#9551
  // 0 symbol
  // Observer symbol
  // function setObserverMarker (lineOfSightViewModel: __esri.LineOfSightViewModel) {
  //   const observerSymbol = {
  //     type: 'point-3d',
  //     symbolLayers: [
  //       {
  //         type: 'object',
  //         resource: { primitive: 'inverted-cone' },
  //         material: { color: [255, 255, 0] },
  //         height: 50,
  //         depth: 20,
  //         width: 20,
  //         anchor: 'relative',
  //         anchorPosition: { x: 0, y: 0, z: 0 }
  //       }
  //     ]
  //   }

  //   const graphic = new Graphic({
  //     symbol: observerSymbol as any,
  //     geometry: lineOfSightViewModel.observer //Point
  //   })
  //   //view.graphics.add(graphic)
  //   graphicLayerRef.current.add(graphic)
  // }
  // // intersection points symbol
  // function setIntersectionMarkers (lineOfSightViewModel: __esri.LineOfSightViewModel) {
  //   // an inverted cone marks the intersection that occludes the view
  //   const intersectionSymbol = {
  //     type: 'point-3d',
  //     symbolLayers: [
  //       {
  //         type: 'object',
  //         resource: { primitive: 'inverted-cone' },
  //         material: { color: [0, 0, 255] },
  //         height: 20,
  //         depth: 20,
  //         width: 50,
  //         anchor: 'relative',
  //         anchorPosition: { x: 0, y: 0, z: -0.7 }
  //       }
  //     ]
  //   }

  //   lineOfSightViewModel?.targets?.forEach((target) => {
  //     if (target.intersectedLocation) {
  //       const graphic = new Graphic({
  //         symbol: intersectionSymbol as any,
  //         geometry: target.intersectedLocation
  //       })
  //       //view.graphics.add(graphic)
  //       graphicLayerRef.current.add(graphic)
  //     }
  //   })
  // }

  // layers
  // const graphicLayerRef = React.useRef<__esri.GraphicsLayer>(null)
  // function addGraphicsLayer () {
  //   const graphicLayerId = 'line-of-sight-layer-' + props.jimuMapView.id
  //   graphicLayerRef.current = new GraphicsLayer({
  //     id: graphicLayerId,
  //     listMode: 'hide',
  //     title: graphicLayerId //,
  //     //elevationInfo: { mode: props.elevationInfo }
  //   })
  //   if (!props.jimuMapView.view.map.findLayerById(graphicLayerId)) {
  //     props.jimuMapView.view.map.add(graphicLayerRef.current)
  //   }
  // }
  // function removeGraphicsLayer () {
  //   if (graphicLayerRef.current && props.jimuMapView?.view) {
  //     props.jimuMapView?.view.map.remove(graphicLayerRef.current)
  //   }
  // }

  //1
  const _updateWidget = React.useCallback((domRef: HTMLDivElement) => {
    //addGraphicsLayer()

    widgetRef.current = new LineOfSight({
      //id: props.id,
      container: domRef,
      view: props.jimuMapView?.view,
      viewModel: new LineOfSightViewModel({
        view: props.jimuMapView?.view
      })
    })

    widgetRef.current.when(() => {
      onUpdated()
      //   const lineOfSightViewModel = widgetRef.current.viewModel

      //   lineOfSightViewModel.watch('observer', (value) => {
      //     graphicLayerRef.current.removeAll()

      //     setObserverMarker(lineOfSightViewModel)
      //     setIntersectionMarkers(lineOfSightViewModel)
      //   })

      //   // watch when a new target is added or removed
      //   lineOfSightViewModel.targets.on('change', (event) => {
      //     event.added.forEach((target) => {
      //       setIntersectionMarkers(lineOfSightViewModel)
      //       // for each target watch when the intersection changes
      //       target.watch('intersectedLocation', setIntersectionMarkers)
      //     })
      //   })
    })

    return widgetRef.current
  }, [props.jimuMapView,
    onUpdated])

  const _destoryWidget = React.useCallback(() => {
    //removeGraphicsLayer()
  }, [])

  // export interfaces
  return {
    // ref
    lineOfSightRef: widgetRef.current,
    // update
    updateLineOfSightWidget: _updateWidget,
    // remove
    destoryLineOfSightWidget: _destoryWidget
  }
}
