import styles from './style.module.less'
import Navbar from '@/components/Navbar'
import Router from '@/routes'
import routes from '@/routes/routes'

const Layout = () => {
  return (
    <div className={styles['app-layout']}>
      <Navbar menu={routes} />
      <div className={styles['app-main']}>
        <Router />
      </div>
    </div>
  )
}

export default Layout
