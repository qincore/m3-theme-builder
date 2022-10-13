import { Link } from 'react-router-dom'
import styles from './style.module.less'

interface INavbar {
  menu: {
    name: string
    path: string
    element: JSX.Element
  }[]
}

const Navbar = (props: INavbar) => {
  const { menu } = props

  return (
    <div className={styles['nav-bar']}>
      {menu.map((item) => {
        return (
          <Link key={item.path} className={styles['menu-item']} to={item.path}>
            {item.name}
          </Link>
        )
      })}
    </div>
  )
}
export default Navbar
