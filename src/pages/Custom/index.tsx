import { Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './style.module.less'
import PageTitleCard from '@/components/PageTitleCard'

const Custom = () => {
  const description = '您能够输入自定义主色等，根据输入的颜色将自动自动分配一组互补色调'
  return (
    <motion.div
      className={styles['app-custom']}
      initial={{ opacity: 0, y: '2%' }}
      animate={{ opacity: 1, y: '0' }}
      transition={{ ease: [0.2, 0, 0, 1] }}
    >
      <PageTitleCard pageTitle="自定义" pageDescription={description} />
      <section className={styles.themePalette}>
        <AnimatePresence initial={false}>
          <Outlet />
        </AnimatePresence>
      </section>
    </motion.div>
  )
}

export default Custom
