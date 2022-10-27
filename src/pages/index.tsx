import { ChangeEvent, useContext, useEffect } from 'react'
import { useLocalStorageState } from 'ahooks'
import { FastAverageColor } from 'fast-average-color'
import styles from './style.module.less'
import PageTitleCard from '@/components/PageTitleCard'
import { ThemeContext } from '@/stores/theme'
import UploadImage from '@/components/uploadImage'
import ThemePalette from '@/components/ThemePalette'
import { THEME } from '@/constants/scheme'

const Index = () => {
  const fac = new FastAverageColor()
  const description = '通过获取图片主色调自动生成主题方案'
  const [image, setImage] = useLocalStorageState('image', {
    defaultValue: {
      url: ''
    }
  })
  // const el = document.getElementById('sourceImg')
  const { setThemeColor, isDark } = useContext(ThemeContext)

  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (file.size / 1024 > 2048) {
        // eslint-disable-next-line no-alert
        alert('啊啊～，图片大于2MB了！我吃不下！！')
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        setImage({ url: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    ;(async () => {
      // @ts-ignore
      const source = await fac.getColorAsync(image.url)
      // const source = await sourceColorFromImage(el as HTMLImageElement)
      setThemeColor({ primary: source.hex })
    })()
  }, [image])

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
      <section className={styles.themePalette}>
        <h2>{isDark ? '暗黑' : '亮色'}主题</h2>
        <div className={styles.themePaletteRow}>
          {THEME.map((item, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <ThemePalette key={index} data={item} />
          })}
        </div>
      </section>
    </div>
  )
}

export default Index
