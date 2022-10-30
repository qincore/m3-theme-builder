import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import classnames from 'classnames'
import styles from './style.module.less'
import Button from '@/components/Button'

// export interface IDialogForwardRef {
//   open: () => void
// }

export interface IDialogProps {
  title?: string
  icon?: ReactNode | string
  content?: ReactNode
  position?: 'top' | 'bottom' | 'center'
  okText?: string
  cancelText?: string
  onClose?: () => void
  onCancel?: () => void
}

const Dialog = (props: IDialogProps) => {
  const { icon, title, content, okText, cancelText, onClose, onCancel } = props

  const [visible, setVisible] = useState<boolean>(false)
  const [en, setEn] = useState<boolean>(false)
  const hasIcon = useMemo(() => {
    return !!icon
  }, [icon])

  useEffect(() => {
    setVisible(true)
  }, [])

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setEn(true)
      }, 20)
    }
  }, [visible])

  const close = () => {
    setEn(false)
    setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, 300)
  }

  const ok = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    close()
  }

  const cancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onCancel?.()
    close()
  }

  return visible ? (
    <div className={classnames(styles.dialog, { [styles.en]: en })}>
      <div className={styles.dialogMask} />
      <div className={styles.dialogWrapper}>
        <div className={classnames(styles.dialogContent, { [styles.hasIcon]: hasIcon })}>
          <div className={styles.dialogHeader}>
            <div className={styles.dialogIcon}>
              {typeof icon === 'string' ? (
                <span className={classnames('material-icons-outlined', styles.mdIcon)}>{icon}</span>
              ) : (
                icon
              )}
            </div>
            <div className={styles.dialogTitle}>{title}</div>
          </div>
          <div className={styles.dialogBody}>{content}</div>
          <div className={styles.dialogFooter}>
            <div className={styles.buttonBar}>
              <Button size="small" style={{ marginRight: '8px' }} onClick={(e) => cancel(e)} type="text">
                {cancelText}
              </Button>
              <Button size="small" onClick={(e) => ok(e)} type="text">
                {okText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default Dialog
