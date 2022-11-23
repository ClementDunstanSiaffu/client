/** @jsx jsx */
import { React, jsx, ThemeVariables } from 'jimu-core'
import { Button, Icon } from 'jimu-ui'

interface Props {
  theme: ThemeVariables
  className?: string
}

export default class SkeletonBtn extends React.PureComponent<Props> {
  // for ,#5981 white-border when img's src=''
  TRANSPARENT_GIF = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='
  render (): React.ReactElement {
    const iconStyle = { borderRadius: '50%', border: 'none', backgroundColor: this.props.theme.colors.palette.light[600] }
    return (
      <React.Fragment><Button icon type='tertiary' className={'btns ' + this.props.className} disabled>
        <Icon icon={this.TRANSPARENT_GIF} style={iconStyle} />
      </Button>
      </React.Fragment>
    )
  }
}
