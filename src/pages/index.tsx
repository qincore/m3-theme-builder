import { ChangeEvent, useContext, useEffect } from 'react'
import { hexFromArgb, sourceColorFromImage } from '@material/material-color-utilities'
import { useLocalStorageState } from 'ahooks'
import styles from './style.module.less'
import PageTitleCard from '@/components/PageTitleCard'
import { ThemeContext } from '@/stores/theme'
import UploadImage from '@/components/uploadImage'

const Index = () => {
  const description = '通过获取图片主色调自动生成主题方案'
  const [image, setImage] = useLocalStorageState('image', {
    defaultValue: {
      url: ''
    }
  })
  const el = document.getElementById('sourceImg')
  const { setThemeColor } = useContext(ThemeContext)

  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        setImage({ url: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    async function getColor() {
      if (el) {
        const source = await sourceColorFromImage(el as HTMLImageElement)
        try {
          console.log(source)
          setThemeColor({ primary: hexFromArgb(source) })
        } catch (err) {
          console.log(err)
        }
      }
    }
    getColor()
  }, [el])

  return (
    <div className={styles.index}>
      <div className={styles.indexHeader}>
        <div className={styles.titleBlock}>
          <PageTitleCard pageTitle="动态颜色" pageDescription={description} />
        </div>
        <div className={styles.uploadBlock}>
          <UploadImage imgUrl={image.url} onChange={(e) => fileChange(e)} />
        </div>
      </div>
    </div>
  )
}

export default Index
