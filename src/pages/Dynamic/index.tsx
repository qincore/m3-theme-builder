import { ChangeEvent, useContext, useEffect, useMemo } from 'react'
import { useLocalStorageState } from 'ahooks'
import { hexFromArgb } from '@material/material-color-utilities'
import { useOutlet } from 'react-router-dom'
import styles from './style.module.less'
import PageTitleCard from '@/components/PageTitleCard'
import { ThemeContext } from '@/stores/theme'
import UploadImage from '@/components/UploadImage'
import { colorFromImageUrl } from '@/utils/image_utils'
import { Dialog } from '@/components/Dialog'
import RouteTabs from '@/components/RouteTabs'
import routes, { IRoutes } from '@/routes/routes'

const Dynamic = () => {
  const description = '通过获取图片主色调自动生成主题方案'
  const [image, setImage] = useLocalStorageState('image', {
    defaultValue: {
      url: ''
    }
  })
  const { setThemeColor } = useContext(ThemeContext)
  const routeTabs = useMemo(() => routes?.find((r) => r.path === '/dynamic')?.children, [])
  const children = useOutlet()
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
      const source = await colorFromImageUrl(image.url, 5)
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
        <RouteTabs routes={routeTabs as IRoutes[]} />
        {children}
      </section>
    </div>
  )
}

export default Dynamic
