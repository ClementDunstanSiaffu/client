import { React, classNames } from 'jimu-core'
import { SVG, SVGComponentProps } from 'jimu-ui'
import src from '../../svg/outlined/gis/data-map.svg'

export const DataMapOutlined = (props: SVGComponentProps) => {
  const { className, ...others } = props
  const classes = classNames('jimu-icon jimu-icon-component', className)
  return <SVG className={classes} src={src} {...others} />
}
