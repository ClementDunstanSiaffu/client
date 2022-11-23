import { React, classNames, ImmutableObject } from 'jimu-core'
import { ColorMatches } from '../../../../../../../../config'
import { LoadOutlined } from 'jimu-icons/outlined/editor/load'
import { Button, hooks, Tooltip } from 'jimu-ui'
import defaultMessages from '../../../../../../../translations/default'
import { Message } from './message'

interface ColorLoaderProps {
  className?: string
  loadColorMatches?: (count: number) => Promise<{ value: ImmutableObject<ColorMatches>, loadout: boolean, exceed: boolean }>
  onChange?: (value: ImmutableObject<ColorMatches>) => void
}

const NumberPerLoads = 10
export const ColorLoader = (props: ColorLoaderProps): React.ReactElement => {
  const { className, loadColorMatches, onChange } = props
  const translate = hooks.useTranslate(defaultMessages)
  const [version, setVersion] = React.useState(0)
  const meessageRef = React.useRef<'loadout' | 'exceed'>('loadout')
  const message = meessageRef.current === 'loadout' ? translate('categoriesLatest') : translate('manyDistinctValues')
  const unmountRef = React.useRef<boolean>(false)
  hooks.useUnmount(() => { unmountRef.current = true })

  const handleLoadClick = () => {
    loadColorMatches(NumberPerLoads).then(({ value: matches, loadout, exceed }) => {
      if (unmountRef.current) return
      onChange?.(matches)
      if (loadout || exceed) {
        meessageRef.current = exceed ? 'exceed' : 'loadout'
        setVersion(v => v + 1)
      }
    })
  }

  return (<>
    <Tooltip title={translate('loadMoreCategory')} showArrow enterDelay={300}>
      <Button className={classNames('color-loader', className)} size='sm' icon onClick={handleLoadClick}>
        <LoadOutlined size='m' />
      </Button>
    </Tooltip>
    <Message version={version} message={message} />
  </>)
}
