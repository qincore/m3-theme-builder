import { useContext, useEffect, useMemo } from 'react'
import { hexFromArgb, sourceColorFromImage } from '@material/material-color-utilities'
import { useLocalStorageState } from 'ahooks'
import styles from './style.module.less'
import PageTitleCard from '@/components/PageTitleCard'
import { ThemeContext } from '@/stores/theme'

const Index = () => {
  const description = '通过获取图片主色调自动生成主题方案'
  const [image, setImage] = useLocalStorageState('image', {
    defaultValue: {
      url: ''
    }
  })
  const el = document.getElementById('sourceImg')
  const { setThemeColor } = useContext(ThemeContext)

  const checkImage = async (url: string) => {
    const res = await fetch(url)
    const buff = await res.blob()
    return buff.type.startsWith('image/')
  }

  const imageValid = useMemo(() => {
    return checkImage(image.url)
  }, [image])

  console.log(imageValid)

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
        <div className={styles.uploadImg}>
          <img
            style={{ display: imageValid ? 'none' : 'block' }}
            id="sourceImg"
            className={styles.sourceImg}
            src={image.url}
            alt="sourceImg"
          />
          <input
            className={styles.uploadBtn}
            type="file"
            onChange={(e) => {
              setImage(URL.createObjectURL(e.target.files[0]))
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Index
