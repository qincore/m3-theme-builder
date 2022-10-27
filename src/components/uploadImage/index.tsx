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
      <div className={styles.uploadContent}>
        <Button
          type="secondary"
          className={styles.uploadBtn}
          icon={
            <span style={{ marginRight: '10px' }} className="material-icons-outlined">
              wallpaper
            </span>
          }
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label style={{ width: '100%', height: '100%', lineHeight: '38px', cursor: 'pointer' }} htmlFor="imageInput">
            喂我图给你好康的
          </label>
        </Button>
        <input id="imageInput" type="file" accept={'image/*'} onChange={(e) => onChange?.(e)} />
        <div className={styles.uploadTips}>^_^ 我只吃不大于2MB的图片哦</div>
      </div>
    </div>
  )
}
export default uploadImage
