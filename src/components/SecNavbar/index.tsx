import { Link } from 'react-router-dom'
import classnames from 'classnames'
import styles from '@/components/Navbar/style.module.less'
import { IMenuConstants } from '@/types/constants'

interface IRouteTabsProps {
  menus: IMenuConstants[]
  pathname: string
}

const SecNavbar = (props: IRouteTabsProps) => {
  const { menus, pathname } = props
  return (
    <div className={styles.routeTabs}>
      {menus.map((menu) => {
        const isActive = menu.path === pathname
        return (
          <Link
            key={menu.path}
            className={classnames(styles.routeTabItem, { [styles.menuItemActive]: isActive })}
            to={menu.path}
          >
            <span className={classnames(`material-icons${isActive ? '' : '-outlined'}`, styles.menuItemIcon)}>
              {menu.icon}
            </span>
            <div className={styles.routeTabItemName}>{menu.name}</div>
          </Link>
        )
      })}
    </div>
  )
}

export default SecNavbar
