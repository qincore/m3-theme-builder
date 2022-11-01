import { useLocation, useOutlet } from 'react-router-dom'
import styles from './style.module.less'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { MENU } from '@/constants'

const Layout = () => {
  const { pathname } = useLocation()
  const children = useOutlet()
  return (
    <>
      <Navbar pathname={pathname} menu={MENU} />
      <main className={styles['app-main']}>
        {children}
        <Footer />
      </main>
    </>
  )
}

export default Layout
