import { forwardRef, useState, useImperativeHandle, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from './style.module.less'
import Button from '@/components/Button'

export interface IDialogRef {
  show: () => void
}

interface IDialogProps {
  children?: ReactNode
}

const Dialog = forwardRef<IDialogRef, IDialogProps>((props, ref) => {
  const { children } = props

  const [visible, setVisible] = useState<boolean>(false)

  useImperativeHandle(ref, () => ({
    show: (): void => {
      setVisible(true)
    }
  }))

  return visible
    ? createPortal(
        <div className={styles.dialog}>
          <div className={styles.dialogMask} />
          <div className={styles.dialogWrapper}>
            <div className={styles.dialogContent}>
              <div className={styles.dialogTitle}>title</div>
              <div className={styles.dialogBody}>{children ?? <>body</>}</div>
              <div className={styles.dialogFooter}>
                <Button onClick={() => setVisible(false)} type="text">
                  确 定
                </Button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null
})

export default Dialog
