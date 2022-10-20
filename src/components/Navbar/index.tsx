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
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>logo</div>
        <menu className={styles.menu}>
          {menu.map((item) => {
            return (
              <Link key={item.path} className={styles.menuItem} to={item.path}>
                {item.name}
              </Link>
            )
          })}
        </menu>
      </nav>
    </header>
  )
}
export default Navbar
