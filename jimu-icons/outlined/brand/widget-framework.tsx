import { React, classNames } from 'jimu-core'
import { SVG, SVGComponentProps } from 'jimu-ui'
import src from '../../svg/outlined/brand/widget-framework.svg'
import srcRTL from '../../svg/outlined/brand/widget-framework--rtl.svg'

export const WidgetFrameworkOutlined = (props: SVGComponentProps) => {
  const { className, ...others } = props
  const classes = classNames('jimu-icon jimu-icon-component has-rtl-svg', className)
  return <SVG className={classes} src={src} srcRTL={srcRTL} {...others} />
}
