import { ChangeEvent, useContext, useEffect } from 'react'
import { useLocalStorageState } from 'ahooks'
import { hexFromArgb } from '@material/material-color-utilities'
import styles from './style.module.less'
import PageTitleCard from '@/components/PageTitleCard'
import { ThemeContext } from '@/stores/theme'
import UploadImage from '@/components/UploadImage'
import ThemePalette from '@/components/ThemePalette'
import { THEME } from '@/constants/scheme'
import { colorFromImageUrl } from '@/utils/image_utils'
import { Dialog } from '@/components/Dialog'

const Index = () => {
  const description = '通过获取图片主色调自动生成主题方案'
  const [image, setImage] = useLocalStorageState('image', {
    defaultValue: {
      url: ''
    }
  })
  const { setThemeColor, isDark } = useContext(ThemeContext)

  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (file.size / 1024 > 2048) {
        // eslint-disable-next-line no-alert
        Dialog.show({
          icon: 'error_outline',
          title: '温馨提示',
          content: '请选择小于 2MB 的图片'
        })
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
      const source = await colorFromImageUrl(image.url)
      setThemeColor({ primary: hexFromArgb(source) })
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
