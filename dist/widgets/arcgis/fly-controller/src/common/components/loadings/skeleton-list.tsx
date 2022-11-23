/** @jsx jsx */
import { React, jsx, SerializedStyles, css, ThemeVariables } from 'jimu-core'
import { List, ListItemsType, TreeItemsType, TreeItemActionType } from 'jimu-ui/basic/list-tree'

interface Props {
  placeholderNums: number
  theme: ThemeVariables
}
interface States {
  listItems: ListItemsType
}

export default class SkeletonList extends React.PureComponent<Props, States> {
  constructor (props) {
    super(props)
    this.state = { listItems: [] }
  }

  componentDidMount (): void {
    this.setState({ listItems: this.mapRoutesToListItems() })
  }

  mapRoutesToListItems = (): TreeItemsType => {
    const listItems = []
    for (let i = 0, len = this.props.placeholderNums; i < len; i++) {
      listItems.push({
        itemKey: i.toString(),
        itemStateCommands: [{
          iconProps: () => ({ icon: null, size: 12, style: { opacity: 0 } })
        }]
      })
    }

    return listItems
  }

  getStyle = (): SerializedStyles => {
    return css`
    /* disable hover for skeleton-list */
    .skeleton-list .jimu-tree-main .jimu-tree-item .jimu-tree-item__body:hover {
      background-color: ${this.props.theme.colors.palette.light[500]};
    } `
  }

  render (): React.ReactElement {
    return (
      <div css={this.getStyle()} className='d-flex'>
        <List
          size='sm'
          className='skeleton-list w-100'
          itemsJson={this.state.listItems}
          dndEnabled={false}
          isItemFocused={() => false}
          overrideItemBlockInfo={(/* { itemBlockInfo } */) => {
            return {
              name: TreeItemActionType.RenderOverrideItem,
              children: [{
                name: TreeItemActionType.RenderOverrideItemDroppableContainer,
                children: [{
                  name: TreeItemActionType.RenderOverrideItemDraggableContainer,
                  children: [{
                    name: TreeItemActionType.RenderOverrideItemBody,
                    children: [{
                      name: TreeItemActionType.RenderOverrideItemDragHandle
                    }, {
                      name: TreeItemActionType.RenderOverrideItemMainLine,
                      children: [{
                        name: TreeItemActionType.RenderOverrideItemTitle
                      }, {
                        name: TreeItemActionType.RenderOverrideItemCommands
                      }]
                    }]
                  }]
                }]
              }]
            }
          }}
        />
      </div>
    )
  }
}
