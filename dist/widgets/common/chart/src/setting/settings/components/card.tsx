/** @jsx jsx */
import { React, jsx, css, classNames, SerializedStyles } from 'jimu-core'
import { Icon } from 'jimu-ui'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical: boolean
  label?: string
  icon: any
  active?: boolean
}

const useStyle = (vertical: boolean): SerializedStyles => {
  return React.useMemo(() => {
    return css`
    display: flex;
    flex-direction: ${vertical ? 'column' : 'row'};
    align-items: center;
    cursor: pointer;
    border: 1px solid transparent;
    .wrapper {
      width: ${vertical ? '100%' : '20%'};
      height: ${vertical ? '100%' : '85%'};
      background-color: var(--white);
    }
    label {
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 100%;
      margin-bottom: 0;
    }
    &.active {
      border: 2px solid var(--primary);
    }
  `
  }, [vertical])
}

export const Card = (props: CardProps): React.ReactElement => {
  const { vertical = true, label, icon, active, onClick, className, ...others } = props

  const style = useStyle(vertical)
  return (
    <div className={classNames('template-card', className, { active })} css={style} onClick={onClick} {...others}>
      <Icon className={classNames('wrapper', { 'mx-2': !vertical })} icon={icon} />
      {label && <label className={classNames({ 'mt-2': vertical })}>{label}</label>}
    </div>
  )
}
