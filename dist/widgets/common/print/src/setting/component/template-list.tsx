/** @jsx jsx */
import { React, jsx, defaultMessages as jimuCoreDefaultMessage } from 'jimu-core'
import { List, TreeItemType, TreeItemsType, TreeItemActionType } from 'jimu-ui/basic/list-tree'
import { hooks, defaultMessages as jimuUiDefaultMessage } from 'jimu-ui'
import { getIndexByTemplateId } from '../../utils/utils'
import { IMConfig, PrintTemplateType, PrintServiceType, PrintTemplateProperties } from '../../config'
const IconClose = require('jimu-icons/svg/outlined/editor/close.svg')
interface SearchOptionsProps {
  id: string
  showNewTemplateItem: boolean
  activeTemplateId: string
  config: IMConfig
  className?: string
  handelActiveTemplateIdChange?: (templateId: string) => void
  handelTemplateListChange?: (newTemplate: PrintTemplateProperties[]) => void
  hideSidePopper?: () => void
}

const TemplateList = (props: SearchOptionsProps) => {
  const nls = hooks.useTranslate(jimuCoreDefaultMessage, jimuUiDefaultMessage)
  const { className, config, activeTemplateId, showNewTemplateItem, handelActiveTemplateIdChange, handelTemplateListChange } = props

  const AdvancedActionMap = {
    isItemFocused: (actionData, refComponent) => {
      const { itemJsons: [currentItemJson, parentArray] } = refComponent.props
      return activeTemplateId && parentArray.indexOf(currentItemJson) === getIndexByTemplateId(templateList, activeTemplateId)
    },
    overrideItemBlockInfo: ({ itemBlockInfo }, refComponent) => {
      return {
        name: TreeItemActionType.RenderOverrideItem,
        children: [{
          name: TreeItemActionType.RenderOverrideItemDroppableContainer,
          children: [{
            name: TreeItemActionType.RenderOverrideItemDraggableContainer,
            children: [{
              name: TreeItemActionType.RenderOverrideItemBody,
              children: [{
                name: TreeItemActionType.RenderOverrideItemMainLine,
                children: [{
                  name: TreeItemActionType.RenderOverrideItemDragHandle
                }, {
                  name: TreeItemActionType.RenderOverrideItemIcon,
                  autoCollapsed: true
                }, {
                  name: TreeItemActionType.RenderOverrideItemTitle
                }, {
                  name: TreeItemActionType.RenderOverrideItemDetailToggle
                }, {
                  name: TreeItemActionType.RenderOverrideItemCommands
                }]
              }]
            }]
          }]
        }]
      }
    }
  }

  React.useEffect(() => {
    setIsTemplateEditable(config?.printTemplateType === PrintTemplateType.Customize || config?.printServiceType === PrintServiceType.Customize)
    getTemplateList()
    // eslint-disable-next-line
  }, [config])

  const [isTemplateEditable, setIsTemplateEditable] = React.useState(config?.printTemplateType === PrintTemplateType.Customize || config?.printServiceType === PrintServiceType.Customize)
  const [templateList, setTemplateList] = React.useState([] as PrintTemplateProperties[])

  const getTemplateList = () => {
    if (config?.printServiceType === PrintServiceType.Customize || config?.printTemplateType === PrintTemplateType.Customize) {
      setTemplateList(config?.printCustomTemplate?.asMutable({ deep: true }) || [])
    } else {
      setTemplateList(config?.printOrgTemplate?.asMutable({ deep: true }) || [])
    }
  }

  const onRemoveTemplateButtonClick = (index: number) => {
    const newTemplateList = templateList
    newTemplateList?.splice(index, 1)
    handelTemplateListChange(newTemplateList)
    handelActiveTemplateIdChange(null)
  }

  const getTtemStateCommands = (index) => {
    return config?.printTemplateType === PrintTemplateType.Customize
      ? [{
          label: nls('deleteOption'),
          iconProps: () => ({ icon: IconClose, size: 12 }),
          action: () => {
            onRemoveTemplateButtonClick(index)
          }
        }]
      : []
  }

  return (
    <div className={`w-100 mt-2 ${className || ''}`}>
      <List
        className='w-100'
        itemsJson={Array.from(templateList).map((item, index) => ({
          itemStateDetailContent: item,
          itemKey: `${item?.templateId}`,
          itemStateTitle: item?.label,
          itemStateIcon: null,
          itemStateCommands: getTtemStateCommands(index)
        }))}
        dndEnabled={isTemplateEditable}
        renderOverrideItemDetailToggle={() => '' }
        onUpdateItem={(actionData, refComponent) => {
          const { itemJsons } = refComponent.props
          const [, parentItemJson] = itemJsons as [TreeItemType, TreeItemsType]
          const newTemplate = parentItemJson.map(item => {
            return item.itemStateDetailContent
          })
          handelActiveTemplateIdChange(null)
          handelTemplateListChange(newTemplate)
        }}
        onClickItemBody={(actionData, refComponent) => {
          const { itemJsons: [currentItemJson] } = refComponent.props
          handelActiveTemplateIdChange(currentItemJson.itemKey)
        }}
        {...AdvancedActionMap}
      />

      {showNewTemplateItem && <List
        className='setting-ui-unit-list-new'
        itemsJson={[{
          name: '......'
        }].map((item, x) => ({
          itemStateDetailContent: 'item',
          itemKey: 'index',
          itemStateTitle: '......',
          itemStateCommands: []
        }))}
        dndEnabled={false}
        renderOverrideItemDetailToggle={() => '' }
        {...AdvancedActionMap}
        isItemFocused={() => true}
      />}
    </div>
  )
}

export default TemplateList
