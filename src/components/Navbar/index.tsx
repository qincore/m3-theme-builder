import { useNavigate } from 'react-router-dom'
import styles from './style.module.less'

interface INavbar {
  menu: {
    name: string
    path: string
    element: Element
  }[]
}

const Navbar = (props: INavbar) => {
  const { menu } = props
  console.log(menu)

  const navigate = useNavigate()
  return (
    <div className={styles['nav-bar']}>
      {menu.map((item) => {
        return (
          <a key={item.path} onClick={() => navigate(item.path)} className={styles['menu-item']}>
            {item.name}
          </a>
        )
      })}
    </div>
  )
}
export default Navbar
