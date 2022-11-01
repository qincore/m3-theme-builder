import { useLocation, useOutlet } from 'react-router-dom'
import { useEffect } from 'react'
import styles from './style.module.less'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { MENU } from '@/constants'

const Layout = () => {
  const { pathname } = useLocation()
  const children = useOutlet()
  useEffect(() => {
    window.scrollTo(0, 0)
  })
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
