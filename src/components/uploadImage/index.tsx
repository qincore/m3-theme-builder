import { ChangeEvent } from 'react'
import styles from './style.module.less'
import Button from '@/components/Button'

interface IUploadImageProps {
  imgUrl: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const uploadImage = (props: IUploadImageProps) => {
  const { imgUrl, onChange } = props
  return (
    <div className={styles.uploadImage}>
      <img
        id="sourceImg"
        style={{ opacity: imgUrl === '' ? 0 : 1 }}
        className={styles.sourceImg}
        src={imgUrl}
        alt="sourceImg"
        draggable={false}
      />
      <Button type="secondary" className={styles.uploadBtn}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label style={{ width: '100%', height: '100%', lineHeight: '38px', cursor: 'pointer' }} htmlFor="imageInput">
          喂我图给你好康的
        </label>
      </Button>
      <input id="imageInput" type="file" onChange={(e) => onChange?.(e)} />
    </div>
  )
}
export default uploadImage
