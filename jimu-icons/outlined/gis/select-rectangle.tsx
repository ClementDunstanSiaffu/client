import { React, classNames } from 'jimu-core'
import { SVG, SVGComponentProps } from 'jimu-ui'
import src from '../../svg/outlined/gis/select-rectangle.svg'

export const SelectRectangleOutlined = (props: SVGComponentProps) => {
  const { className, ...others } = props
  const classes = classNames('jimu-icon jimu-icon-component', className)
  return <SVG className={classes} src={src} {...others} />
}
