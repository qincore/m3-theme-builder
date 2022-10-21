import { useLocation } from 'react-router-dom'
import styles from './style.module.less'
import Navbar from '@/components/Navbar'
import Router from '@/routes'
import routes from '@/routes/routes'
import useTheme from '@/hooks/useTheme'

const Layout = () => {
  const { pathname } = useLocation()
  const [isDark, setMode] = useTheme('#1677ff')
  return (
    <>
      <Navbar pathname={pathname} menu={routes} themeMode={{ isDark, setMode }} />
      <main className={styles['app-main']}>
        <Router />
      </main>
    </>
  )
}

export default Layout
