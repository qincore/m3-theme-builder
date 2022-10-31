import styles from './style.module.less'
import { BEIAN } from '@/constants/beian'

const Footer = () => {
  return (
    <div className={styles.footer}>
      {BEIAN.map((item) => (
        <a key={item.url} href={item.url} target="_blank" rel="noreferrer">
          <img src={item.img} alt="蜀ICP备20006272号-1" /> {item.name}
        </a>
      ))}
    </div>
  )
}
export default Footer
