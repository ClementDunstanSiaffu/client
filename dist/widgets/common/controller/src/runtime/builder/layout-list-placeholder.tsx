import { classNames, React } from 'jimu-core'
import { styled } from 'jimu-theme'
import { ListPlaceholder } from '../common'
import { LayoutList, LayoutListProps } from './layout/layout-list'

export interface LayoutListPlaceholderProps extends LayoutListProps {
  showPlaceholder: boolean
}

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .list-placeholder {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
`

export const LayoutListPlaceholder = React.forwardRef((props: LayoutListPlaceholderProps, ref: React.RefObject<HTMLDivElement>) => {
  const { showPlaceholder, itemStyle, space: propSpace, vertical, ...others } = props
  const space = vertical ? propSpace : itemStyle.labelGrowth

  return <Root>
    {showPlaceholder && <ListPlaceholder size={itemStyle.avatar?.size} space={space} vertical={vertical} />}
    <LayoutList className={classNames({ invisible: showPlaceholder })} ref={ref} itemStyle={itemStyle} space={propSpace} vertical={vertical} {...others} />
  </Root>
})
