import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { useScroll } from 'ahooks'
import styles from './style.module.less'
import { ThemeContext } from '@/stores/theme'
import Button from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { FOLLOWS } from '@/constants/follows'

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

  const aboutApp = () => {
    Dialog.show({
      title: '关于',
      content: (
        <>
          <div>Material 主题生成器</div>
          <br />
          <div>生成web使用的Material 3主题，包含surface高程颜色</div>
          <br />
          <div style={{ fontSize: '14px', opacity: 0.9 }}>@走心叁次方ZEIR</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '65%',
              marginLeft: '-8px',
              fontSize: '32px'
            }}
          >
            {FOLLOWS.map((follow) => (
              <Button key={follow.name} onClick={() => window.open(follow.url)} type="text" icon={follow.icon} />
            ))}
          </div>
        </>
      )
    })
  }

  return (
    <header className={classnames(styles.header, { [styles.showSurface]: showSurface })}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <span className={classnames('material-icons-outlined', styles.logoIcon)}>mood</span>
        </div>
        <div className={styles.appName}>Material 主题生成器</div>
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
      <div className={styles.mobileNavRight}>
        <Button
          className={styles.mobileModeButton}
          type="text"
          onClick={toggle}
          style={{ color: 'var(--md-sys-color-on-background)' }}
          icon={
            <span className={classnames('material-icons-outlined', styles.ModeButtonIcon)}>
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          }
        />
        <Button
          className={styles.mobileAboutButton}
          type="text"
          onClick={aboutApp}
          style={{ color: 'var(--md-sys-color-on-background)' }}
          icon={<span className={classnames('material-icons-outlined', styles.aboutButtonIcon)}>more_vert</span>}
        />
      </div>
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
