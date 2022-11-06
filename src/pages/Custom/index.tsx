import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext, useMemo } from 'react'
import styles from './style.module.less'
import PageTitleCard from '@/components/PageTitleCard'
import { IMenuConstants } from '@/types/constants'
import SecNavbar from '@/components/SecNavbar'
import { MENU } from '@/constants'
import CustomColorPanel from '@/components/CustomColorPanel'
import { IDColor, ThemeContext } from '@/stores/theme'

const Custom = () => {
  const description = '您能够输入自定义主色等，根据输入的颜色将自动分配一组互补色调'
  const { pathname } = useLocation()
  const { color, setThemeColor } = useContext(ThemeContext)

  const colorChange = (c: IDColor) => {
    setThemeColor({ primary: c.primary })
  }

  const secMenus = useMemo(() => {
    return MENU.find((r) => r.path.includes('/custom'))?.children
  }, [])
  return (
    <motion.div
      className={styles['app-custom']}
      initial={{ opacity: 0, y: '20px' }}
      animate={{ opacity: 1, y: '0' }}
      transition={{ ease: [0.2, 0, 0, 1] }}
    >
      <div className={styles.customHeader}>
        <div className={styles.titleBlock}>
          <PageTitleCard pageTitle="自定义" pageDescription={description} />
        </div>
        <div className={styles.colorPanel}>
          <CustomColorPanel value={color} onChange={colorChange} />
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

export default Custom
