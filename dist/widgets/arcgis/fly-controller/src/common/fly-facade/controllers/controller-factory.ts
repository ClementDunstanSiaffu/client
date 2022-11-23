import { InitParams, ControllerMode } from './base-fly-controller'
import RotatingFlyController from './rotating-fly-controller'
import CurveFlyController from './curve-fly-controller'
import LineFlyController from './line-fly-controller'

export type FlyControllerImp = (RotatingFlyController | CurveFlyController | LineFlyController)

export default class ControllerFactory {
  className: 'ControllerFactory'

  static async make (initParams: InitParams): Promise<FlyControllerImp> {
    let controller
    const type = initParams.type
    switch (type) {
      case ControllerMode.Rotate: {
        controller = await new RotatingFlyController().setup(initParams)
        break
      }
      case ControllerMode.RealPath: {
        controller = await new LineFlyController().setup(initParams)
        break
      }
      case ControllerMode.Smoothed: {
        controller = await new CurveFlyController().setup(initParams)
        break
      }

      default: {
        console.error('ControllerFactory error type:', type)
      }
    }

    return controller
  }
}
