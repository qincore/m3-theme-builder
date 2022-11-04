import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext, useMemo } from 'react'
import styles from './style.module.less'
import PageTitleCard from '@/components/PageTitleCard'
import { IMenuConstants } from '@/types/constants'
import SecNavbar from '@/components/SecNavbar'
import { MENU } from '@/constants'
import ColorPicker from '@/components/ColorPicker'
import Button from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { ThemeContext } from '@/stores/theme'

const Custom = () => {
  const description = '您能够输入自定义主色等，根据输入的颜色将自动分配一组互补色调'
  const { pathname } = useLocation()

  const { setThemeColor } = useContext(ThemeContext)

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
      <PageTitleCard pageTitle="自定义" pageDescription={description} />
      <SecNavbar menus={secMenus as IMenuConstants[]} pathname={pathname} />
      <Button
        onClick={() =>
          Dialog.show({
            title: 'HCT 颜色选择',
            content: <ColorPicker onChange={(c) => setThemeColor({ primary: c })} />
          })
        }
      >
        选择
      </Button>
      <section className={styles.themePalette}>
        <AnimatePresence initial={false}>
          <Outlet />
        </AnimatePresence>
      </section>
    </motion.div>
  )
}

export default Custom
