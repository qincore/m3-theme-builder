import React, { CSSProperties, ReactNode } from 'react'
import classnames from 'classnames'
import styles from './style.module.less'

interface IButtonProps {
  children?: ReactNode
  type?: 'primary' | 'secondary' | 'text'
  icon?: ReactNode
  className?: string | string[]
  style?: CSSProperties
  size?: 'large' | 'small' | 'normal'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = (props: IButtonProps) => {
  const defaultProps = {
    htmlType: 'button',
    type: 'primary',
    size: 'normal'
  }
  const { children, icon, className, type, size, style, onClick } = { ...defaultProps, ...props }

  return (
    <button
      style={style ? { ...style } : {}}
      className={classnames(styles.button, styles[type], styles[size], className, {
        [styles.noChildren]: !children
      })}
      onClick={(e) => onClick?.(e)}
      type="button"
    >
      {icon && icon}
      {children}
    </button>
  )
}

export default Button
