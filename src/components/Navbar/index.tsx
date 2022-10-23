import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { useContext } from 'react'
import styles from './style.module.less'
import { ThemeContext } from '@/stores/theme'

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
  const { isDark, toggle, setThemeColor } = useContext(ThemeContext)

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
      <input
        style={{ marginLeft: '80px' }}
        onBlur={(e) => {
          const hexReg = /^#([a-fA-F\d]{6}|[a-fA-F\d]{3})$/
          if (e.target.value !== '' && e.target.value !== null && hexReg.test(e.target.value)) {
            setThemeColor({ primary: e.target.value })
          }
        }}
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
