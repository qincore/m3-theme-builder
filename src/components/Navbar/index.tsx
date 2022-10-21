import { Link } from 'react-router-dom'
import classnames from 'classnames'
import styles from './style.module.less'

interface INavbar {
  pathname: string
  themeMode: {
    isDark: boolean
    setMode: (mode: string) => void
  }
  menu: {
    name: string
    path: string
    icon: string
    element: JSX.Element
  }[]
}

const Navbar = (props: INavbar) => {
  const { pathname, menu, themeMode } = props
  console.log(themeMode.isDark)
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>logo</div>
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
      <div
        role="presentation"
        className={styles.modeButton}
        onClick={() => themeMode.setMode(themeMode.isDark ? 'light' : 'dark')}
      >
        <div className={classnames(styles.modeButtonIconGroup, { [styles.darkMode]: themeMode.isDark })}>
          <span className={classnames('material-icons-outlined', styles.modeButtonIcon)}>dark_mode</span>
          <span className={classnames('material-icons-outlined', styles.modeButtonIcon)}>light_mode</span>
        </div>
      </div>
    </header>
  )
}
export default Navbar
