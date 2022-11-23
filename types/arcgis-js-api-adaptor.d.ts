declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: any;
  }
}

/// API extension
declare namespace __esri {
  export interface SceneView {
    /// esri/views/3d/state/ViewState
    state?: {
      camera: any
      cameraController: any
      isGlobal: boolean
      isLocal: boolean
    }
    /// esri/views/3d/support/RenderCoordsHelper
    renderCoordsHelper?: {
      worldUpAtPosition: function
    }
  }
}