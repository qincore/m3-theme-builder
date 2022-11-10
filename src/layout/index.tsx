import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import styles from './style.module.less'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { MENU } from '@/constants'
import Router from '@/routes'

const Layout = () => {
  const { pathname } = useLocation()
  return (
    <>
      <Navbar pathname={pathname} menu={MENU} />
      <main className={styles.main}>
        <AnimatePresence initial={false}>
          <Router />
        </AnimatePresence>
        <Footer />
      </main>
    </>
  )
}

export default Layout
