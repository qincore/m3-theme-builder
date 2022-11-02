import ClipboardJS from 'clipboard'
import { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import Button from '@/components/Button'
import styles from './style.module.less'

interface IClipboardProps {
  text: string
  className?: string
  tipsPosition?: string
}

const Clipboard = (props: IClipboardProps) => {
  const { text, className, tipsPosition = 'down' } = props
  const [isSuccess, setIsSuccess] = useState(false)
  const copyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let clipboard: ClipboardJS
    if (copyRef.current) {
      clipboard = new ClipboardJS(copyRef.current)
      clipboard.on('success', (e) => {
        setIsSuccess(true)
        e.clearSelection()
      })
    }

    return () => {
      clipboard.destroy()
    }
  }, [copyRef])

  useEffect(() => {
    let timeout: number | undefined
    if (isSuccess) {
      timeout = setTimeout(() => {
        setIsSuccess(false)
      }, 2000)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [isSuccess])

  return (
    <div ref={copyRef} data-clipboard-text={text} className={classnames(styles.copyContainer, className)}>
      <Button
        className={styles.copyBtn}
        type="text"
        icon={<span className="material-icons-outlined">{isSuccess ? 'done' : 'content_copy'}</span>}
      />
      <div className={classnames(styles.tips, styles[tipsPosition])} />
    </div>
  )
}
export default Clipboard
