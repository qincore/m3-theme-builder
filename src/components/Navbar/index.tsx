import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { useScroll } from 'ahooks'
import styles from './style.module.less'
import { ThemeContext } from '@/stores/theme'
import Button from '@/components/Button'
// import { Dialog } from '@/components/Dialog'
// import { FOLLOWS } from '@/constants/follows'
import { IMenuConstants } from '@/types/constants'
import { ReactComponent as MLogo } from '@/assets/app-logo.svg'

interface INavbar {
  pathname: string
  menu: IMenuConstants[]
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

  // const aboutApp = () => {
  //   Dialog.show({
  //     title: '关于',
  //     content: (
  //       <>
  //         <div>Material 3 主题生成器</div>
  //         <br />
  //         <div style={{ fontSize: '14px', whiteSpace: 'pre-line' }}>
  //           {`• 生成WEB使用的Material 3主题方案
  //           • 在官方工具基础上增加Surface高度叠加色
  //           • 代码输出包含RGB和HEX以适应更多场景`}
  //           <div>
  //             • 其他平台可前往
  //             <a
  //               style={{ color: 'var(--md-sys-color-primary)', textDecoration: 'none' }}
  //               href="https://m3.material.io/theme-builder"
  //               target="_blank"
  //               rel="noreferrer"
  //             >
  //               官方生成器
  //             </a>
  //             获取
  //           </div>
  //         </div>
  //         <br />
  //         <div style={{ fontSize: '12px', opacity: 0.7, whiteSpace: 'pre-line', lineHeight: '18px' }}>
  //           {`作者：@走心叁次方ZEIR
  //             依赖核心：@material/material-color-utilities
  //             设计参考：m3.material.io`}
  //         </div>
  //         <div
  //           style={{
  //             display: 'flex',
  //             justifyContent: 'space-between',
  //             width: '65%',
  //             marginLeft: '-8px',
  //             fontSize: '32px'
  //           }}
  //         >
  //           {FOLLOWS.map((follow) => (
  //             <Button
  //               key={follow.name}
  //               onClick={() => window.open(follow.url)}
  //               type="text"
  //               icon={follow.icon}
  //               className={styles.followBtn}
  //             />
  //           ))}
  //         </div>
  //       </>
  //     )
  //   })
  // }

  return (
    <header className={classnames(styles.header, { [styles.showSurface]: showSurface })}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <MLogo className={styles.logoIcon} />
        </div>
        <div className={styles.appName}>Material 3 主题生成器</div>
        <menu className={styles.menu}>
          {menu
            .filter((r) => r.path !== '/')
            .map((item) => {
              const isActive = item.children?.some((child) => child.path === pathname)
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
        {/* <Button */}
        {/*  className={styles.mobileAboutButton} */}
        {/*  type="text" */}
        {/*  onClick={aboutApp} */}
        {/*  style={{ color: 'var(--md-sys-color-on-background)' }} */}
        {/*  icon={<span className={classnames('material-icons-outlined', styles.aboutButtonIcon)}>more_vert</span>} */}
        {/* /> */}
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
