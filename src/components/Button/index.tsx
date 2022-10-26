import { CSSProperties, ReactNode } from 'react'
import classnames from 'classnames'
import styles from './style.module.less'

interface IButtonProps {
  children?: ReactNode
  type?: 'primary' | 'secondary' | 'text'
  icon?: ReactNode
  className?: string | string[]
  style?: CSSProperties
  shape?: 'circle' | 'round' | 'square'
  onClick?: () => void
}

const Button = (props: IButtonProps) => {
  const defaultProps = {
    htmlType: 'button',
    type: 'primary'
  }
  const { children, icon, className, type, onClick } = { ...defaultProps, ...props }
  return (
    <button
      className={classnames(styles.button, className, {
        [styles.primary]: type === 'primary',
        [styles.secondary]: type === 'secondary',
        [styles.text]: type === 'text',
        [styles.noChildren]: !children
      })}
      onClick={() => onClick?.()}
      type="button"
    >
      {icon && icon}
      {children}
    </button>
  )
}

export default Button
