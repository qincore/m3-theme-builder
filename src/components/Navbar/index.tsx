import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { useScroll } from 'ahooks'
import styles from './style.module.less'
import { ThemeContext } from '@/stores/theme'
import Button from '@/components/Button'

interface INavbar {
  pathname: string
  menu: {
    name: string
    path: string
    icon: string
    element: JSX.Element
  }[]
}

const Navbar = (props: INavbar) => {
  const { pathname, menu } = props
  const { isDark, toggle } = useContext(ThemeContext)

  const [showSurface, setShowSurface] = useState(false)

  const scroll = useScroll(document)

  useEffect(() => {
    if (scroll && scroll.top > 64) {
      setShowSurface(true)
    }
    if (scroll && scroll.top < 64) {
      setShowSurface(false)
    }
  }, [scroll])

  return (
    <header className={classnames(styles.header, { [styles.showSurface]: showSurface })}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <span className={classnames('material-icons-outlined', styles.logoIcon)}>mood</span>
        </div>
        <div className={styles.appName}>M3 Theme Builder</div>
        <menu className={styles.menu}>
          {menu.map((item) => {
            const isActive = item.path === pathname
            return (
              <Link
                key={item.path}
                className={classnames(styles.menuItem, { [styles.menuItemActive]: isActive })}
                to={item.path}
              >
                <span className={classnames(`material-icons${isActive ? '' : '-outlined'}`, styles.menuItemIcon)}>
                  {item.icon}
                </span>
                <div className={styles.menuItemName}>{item.name}</div>
              </Link>
            )
          })}
        </menu>
      </nav>
      <Button
        className={styles.mobileModeButton}
        type="text"
        onClick={toggle}
        icon={
          <span className={classnames('material-icons-outlined', styles.hamburgButtonIcon)}>
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        }
      />
      <div role="presentation" className={styles.modeButton} onClick={() => toggle()}>
        <div className={classnames(styles.modeButtonIconGroup, { [styles.darkMode]: isDark })}>
          <span className={classnames('material-icons-outlined', styles.modeButtonIcon)}>dark_mode</span>
          <span className={classnames('material-icons-outlined', styles.modeButtonIcon)}>light_mode</span>
        </div>
      </div>
    </header>
  )
}
export default Navbar
