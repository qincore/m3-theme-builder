import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import styles from './style.module.less'
import Navbar from '@/components/Navbar'
import Router from '@/routes'
import routes from '@/routes/routes'
import Footer from '@/components/Footer'

const Layout = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <>
      <Navbar pathname={pathname} menu={routes} />
      <main className={styles['app-main']}>
        <Router />
        <Footer />
      </main>
    </>
  )
}

export default Layout
