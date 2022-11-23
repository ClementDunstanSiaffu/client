/** @jsx jsx */
import { jsx, css, ImmutableObject, DataSourceComponent } from 'jimu-core'
import { hooks, TextInput, Icon, Switch, Collapse, Button, TextArea } from 'jimu-ui'
import { SettingRow, SettingSection } from 'jimu-ui/advanced/setting-components'
import defaultMessages from './translations/default'
import { QueryItemType } from '../config'
import { widgetSettingDataMap } from './setting-config'
import { DEFAULT_QUERY_ITEM } from '../default-query-item'

const { iconMap } = widgetSettingDataMap

interface Props {
  queryItem: ImmutableObject<QueryItemType>
  // the query item setting has three stages: main, draw mode and spatial relationship
  handleStageChange: (id: number, e) => void
  onPropertyChanged: (prop: string, value: any, dsUpdateRequired?: boolean) => void
}

export function SpatialFilterSetting (props: Props) {
  const { queryItem, handleStageChange, onPropertyChanged } = props

  const currentItem = Object.assign({}, DEFAULT_QUERY_ITEM, queryItem)
  const getI18nMessage = hooks.useTranslate(defaultMessages)
  const enabled = currentItem.useSpatialFilter

  const handleLabelChanged = (prop: string, value: string, defaultValue: string) => {
    if (value === defaultValue) {
      onPropertyChanged(prop, null)
    } else {
      onPropertyChanged(prop, value)
    }
  }

  const titleCompoent = (
    <div className='d-flex'>
      <div>{getI18nMessage('spatialFilter')}</div>
      <div className='ml-auto'>
        <Switch checked={enabled} onChange={(e) => onPropertyChanged('useSpatialFilter', e.target.checked)} />
      </div>
    </div>
  )
  return (
    <DataSourceComponent useDataSource={currentItem.useDataSource}>
      {(ds) => {
        // check if ds has geometryType
        if (ds.getGeometryType() == null) {
          return null
        }
        return (
          <SettingSection role='group' aria-label={getI18nMessage('spatialFilter')} title={titleCompoent}>
            <Collapse isOpen={enabled}>
              <SettingRow flow='wrap' label={getI18nMessage('label')}>
                <TextInput
                  aria-label={getI18nMessage('label')}
                  className='w-100'
                  size='sm'
                  defaultValue={currentItem.spatialFilterLabel ?? getI18nMessage('spatialFilter')}
                  onAcceptValue={(value) => handleLabelChanged('spatialFilterLabel', value, getI18nMessage('spatialFilter'))}
                />
              </SettingRow>
              <SettingRow role='group' aria-label={getI18nMessage('typesOfFilter')} flow='wrap' label={getI18nMessage('typesOfFilter')}>
                <div className='setting-ui-unit-check-input-item w-100 d-flex align-items-center'>
                  <label className='setting-ui-unit-check-input-label my-1'>
                    <span id='queryItemDataMode'>{getI18nMessage('featureFromDs')}</span>
                  </label>
                  <Button aria-describedby='queryItemDataMode' className='ml-auto' size='sm' type='tertiary' icon onClick={(e) => handleStageChange(2, e)}>
                    <Icon size={16} icon={iconMap.arrowRight} autoFlip/>
                  </Button>
                </div>
                <div className='setting-ui-unit-check-input-item w-100 d-flex align-items-center'>
                  <label className='setting-ui-unit-check-input-label my-1'>
                    <span id='queryItemMapMode'>{getI18nMessage('featureFromMap')}</span>
                  </label>
                  <Button aria-describedby='queryItemMapMode' className='ml-auto' size='sm' type='tertiary' icon onClick={(e) => handleStageChange(1, e)}>
                    <Icon size={16} icon={iconMap.arrowRight} autoFlip/>
                  </Button>
                </div>
              </SettingRow>
              <SettingRow label={getI18nMessage('description')} flow='wrap'>
                <TextArea
                  aria-label={getI18nMessage('description')}
                  css={css`height: 80px;`}
                  value={currentItem.spatialFilterDesc}
                  placeholder={getI18nMessage('describeTheFilter')}
                  onAcceptValue={(value) => onPropertyChanged('spatialFilterDesc', value)}
                />
              </SettingRow>
            </Collapse>
          </SettingSection>
        )
      }}
    </DataSourceComponent>
  )
}
