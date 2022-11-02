import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import styles from './style.module.less'
import { IMenuConstants } from '@/types/constants'

interface IRouteTabsProps {
  menus: IMenuConstants[]
  pathname: string
}

const SecNavbar = (props: IRouteTabsProps) => {
  const { menus, pathname } = props
  const [isSticky, setIsSticky] = useState<boolean>(false)
  const secNavbarRef = useRef<HTMLDivElement>(null)

  const barToTop = (path: string) => {
    if (secNavbarRef?.current && path !== pathname) {
      const top = secNavbarRef?.current.offsetTop
      window.scrollTo(0, top + 1)
    }
  }

  useEffect(() => {
    const cachedRef = secNavbarRef.current
    let observer: IntersectionObserver
    if (cachedRef) {
      observer = new IntersectionObserver(
        ([e]) => {
          setIsSticky(e.intersectionRatio < 1)
        },
        {
          threshold: [1]
        }
      )

      observer.observe(cachedRef)
    }

    return () => {
      if (cachedRef) observer.unobserve(cachedRef)
    }
  }, [secNavbarRef])

  return (
    <div className={classnames(styles.secNavbar, { [styles.sticky]: isSticky })} ref={secNavbarRef}>
      <div className={styles.menuGroup}>
        {menus.map((menu) => {
          const isActive = menu.path === pathname
          return (
            <Link
              key={menu.path}
              className={classnames(styles.menuItem, { [styles.menuItemActive]: isActive })}
              to={menu.path}
              onClick={() => barToTop(menu.path)}
            >
              <span className={classnames(`material-icons${isActive ? '' : '-outlined'}`, styles.menuItemIcon)}>
                {menu.icon}
              </span>
              <div className={styles.menuItemName}>{menu.name}</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default SecNavbar
