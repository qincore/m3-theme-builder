import { Link, useLocation } from 'react-router-dom'
import classnames from 'classnames'
import styles from '@/components/Navbar/style.module.less'
import { IRoutes } from '@/routes/routes'

interface IRouteTabsProps {
  routes: IRoutes[]
}

const RouteTabs = (props: IRouteTabsProps) => {
  const { routes } = props
  const { pathname } = useLocation()
  return (
    <div className={styles.routeTabs}>
      {routes.map((route) => {
        const isActive = route.path === pathname
        return (
          <Link
            key={route.path}
            className={classnames(styles.routeTabItem, { [styles.menuItemActive]: isActive })}
            to={route.path}
          >
            <span className={classnames(`material-icons${isActive ? '' : '-outlined'}`, styles.menuItemIcon)}>
              {route.icon}
            </span>
            <div className={styles.routeTabItemName}>{route.name}</div>
          </Link>
        )
      })}
    </div>
  )
}

export default RouteTabs
