import { React, classNames } from 'jimu-core'
import { SVG, SVGComponentProps } from 'jimu-ui'
import src from '../../svg/outlined/editor/show-selection.svg'
import srcRTL from '../../svg/outlined/editor/show-selection--rtl.svg'

export const ShowSelectionOutlined = (props: SVGComponentProps) => {
  const { className, ...others } = props
  const classes = classNames('jimu-icon jimu-icon-component has-rtl-svg', className)
  return <SVG className={classes} src={src} srcRTL={srcRTL} {...others} />
}
