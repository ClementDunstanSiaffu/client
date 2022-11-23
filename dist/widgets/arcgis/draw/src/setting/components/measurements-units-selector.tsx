/** @jsx jsx */
import { css, jsx, React, ThemeVariables, IntlShape } from 'jimu-core'
import { Checkbox, Label /* ,TextInput */ } from 'jimu-ui'
import { MeasurementsUnitsInfo, useMeasurementsUnitsInfos } from 'jimu-ui/advanced/map'

interface Props {
  measurementsUnitsInfos: MeasurementsUnitsInfo[]

  onUnitsSettingChange: ((measurementsUnitsInfos: MeasurementsUnitsInfo[]) => void)

  intl: IntlShape
  theme: ThemeVariables
  //title: string
}

export const MeasurementsUnitsSelector = React.memo((props: (Props/* & SketchAdapterProps*/)) => {
  const rootRef = React.useRef(null)
  const DEFAULT_MEASUREMENTSUNITSINFOS = useMeasurementsUnitsInfos()
  const [unitsStates, setUnitsStates] = React.useState<MeasurementsUnitsInfo[]>(() => {
    const initialState: MeasurementsUnitsInfo[] = []

    DEFAULT_MEASUREMENTSUNITSINFOS.forEach(item => {
      const _value = item.value
      let _tmpItem = { ...item } // copied

      //find info in config
      const itemInConfig = props.measurementsUnitsInfos.find((config) => {
        return (config.value === _value)
      })
      if (itemInConfig) {
        _tmpItem = { ..._tmpItem, ...itemInConfig } //merge obj
      }

      initialState.push(_tmpItem)
    })

    return initialState
  })

  const _isItemChecked = (id) => {
    const itemInStates = unitsStates.find(item => {
      return (item.value === id)
    })

    return itemInStates && itemInStates.actived
  }

  const _createItemUI = () => {
    const elements = []

    for (let i = 0, len = unitsStates.length; i < len; i++) {
      const item = unitsStates[i]
      const isChecked = _isItemChecked(item.value)
      const note = item.note
      elements.push(
        <li className='d-flex item' key={'key-' + i}>
          <Checkbox className='d-flex mr-2' data-itemid={item.value} checked={isChecked} onChange={() => {
            onOptionsChange(item.value)
          }}
            aria-label={note} />

          <div className='d-flex mr-3 item-note-wapper dotdotdot'>
            <Label className='item-note dotdotdot'
              title={note} aria-label={note}>
              {note}
            </Label>
          </div>

          {/* can't change for 1st version */}
          {/* <TextInput
            className='d-flex item-label dotdotdot' size='sm' required disabled
            //title={recordConfig.displayName}
            defaultValue={item.label}
            onAcceptValue={onOptionsChange}
            //onKeyDown={(e) => this.handleKeydown(e, titleTextInput)}
          /> */}
        </li>
      )
    }
    return elements
  }

  const onOptionsChange = (value: string) => {
    const states = unitsStates.map((item) => {
      if (value === item.value) {
        item.actived = !item.actived
      }
      return item
    })
    //{ value: 'dd', label: 'Y°N, X°E' }
    setUnitsStates(states)
    props.onUnitsSettingChange(states)
  }

  const getStyle = () => {
    const theme = props.theme

    return css`
      font-size: 13px;
      font-weight: lighter;
      width: 100%;

      .dotdotdot{
        text-align: left;
        justify-content: start;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .util-iteams{
        list-style: none;
        list-style-type: none;
        /*background: ${theme.colors.palette.light[200]};*/

        .item{
          margin: 6px 0;
          align-items: center;

          .item-note-wapper{
            /*width: 80px;*/

            .item-note{
              display: inline-block;
              width: 100%;
            }
          }

          .item-label{
            width: 105px;
          }
        }
      }
    `
  }

  return (
    <div ref={rootRef} css={getStyle()}>
      <ul className='util-iteams p-0 m-0' role='group' /*aria-label={props.title}*/>
        {_createItemUI()}
      </ul>
    </div>
  )
})
