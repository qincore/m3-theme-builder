import { useEffect } from 'react'
import styles from './style.module.less'
import Navbar from '@/components/Navbar'
import Router from '@/routes'
import routes from '@/routes/routes'
import updateTheme from '@/utils/updateTheme'

const Layout = () => {
  useEffect(() => {
    updateTheme('#1677ff')
  }, [])
  return (
    <>
      <Navbar menu={routes} />
      <main className={styles['app-main']}>
        <Router />
      </main>
    </>
  )
}

export default Layout
