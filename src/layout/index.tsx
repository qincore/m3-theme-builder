import { useLocation } from 'react-router-dom'
import styles from './style.module.less'
import Navbar from '@/components/Navbar'
import Router from '@/routes'
import routes from '@/routes/routes'

const Layout = () => {
  const { pathname } = useLocation()
  return (
    <>
      <Navbar pathname={pathname} menu={routes} />
      <main className={styles['app-main']}>
        <Router />
      </main>
    </>
  )
}

export default Layout
