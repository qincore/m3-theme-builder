import ClipboardJS from 'clipboard'
import { useEffect, useState } from 'react'
import Button from '@/components/Button'
import styles from './style.module.less'

interface IClipboardProps {
  text: string
  copyId: string
}

const Clipboard = (props: IClipboardProps) => {
  const { text, copyId } = props
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const clipboard = new ClipboardJS(`#${copyId}`)
    clipboard.on('success', (e) => {
      setIsSuccess(true)
      e.clearSelection()
    })
    return () => {
      clipboard.destroy()
    }
  }, [])

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
    <div id={copyId} data-clipboard-text={text} className={styles.copyContainer}>
      <Button
        className={styles.copyBtn}
        type="text"
        icon={<span className="material-icons-outlined">{isSuccess ? 'done' : 'content_copy'}</span>}
      />
      {isSuccess && '复制成功'}
    </div>
  )
}
export default Clipboard
