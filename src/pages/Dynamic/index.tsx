import { ChangeEvent, useContext, useEffect, useMemo } from 'react'
import { useLocalStorageState } from 'ahooks'
import { hexFromArgb } from '@material/material-color-utilities'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './style.module.less'
import PageTitleCard from '@/components/PageTitleCard'
import { ThemeContext } from '@/stores/theme'
import UploadImage from '@/components/UploadImage'
import { colorFromImageUrl } from '@/utils/image_utils'
import { Dialog } from '@/components/Dialog'
import { MENU } from '@/constants'
import SecNavbar from '@/components/SecNavbar'
import { IMenuConstants } from '@/types/constants'

const Dynamic = () => {
  const description = '通过获取图片主色调自动生成主题方案'
  const [image, setImage] = useLocalStorageState('image', {
    defaultValue: {
      url: ''
    }
  })
  const { sourceChange } = useContext(ThemeContext)
  const { pathname } = useLocation()

  const secMenus = useMemo(() => {
    return MENU.find((r) => r.path.includes('/dynamic'))?.children
  }, [])

  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (file.size / 1024 > 2048) {
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
    window.scrollTo(0, 0)
    ;(async () => {
      const source = await colorFromImageUrl(image.url, 5)
      sourceChange({ primary: hexFromArgb(source) })
    })()
  }, [image])

  return (
    <motion.div
      className={styles.index}
      initial={{ opacity: 0, y: '20px' }}
      animate={{ opacity: 1, y: '0' }}
      transition={{ ease: [0.2, 0, 0, 1] }}
    >
      <div className={styles.indexHeader}>
        <div className={styles.titleBlock}>
          <PageTitleCard pageTitle="动态颜色" pageDescription={description} />
        </div>
        <div className={styles.uploadBlock}>
          <UploadImage imgUrl={image.url} onChange={(e) => fileChange(e)} />
        </div>
      </div>
      <SecNavbar menus={secMenus as IMenuConstants[]} pathname={pathname} />
      <section className={styles.themePalette}>
        <AnimatePresence initial={false}>
          <Outlet />
        </AnimatePresence>
      </section>
    </motion.div>
  )
}

export default Dynamic
