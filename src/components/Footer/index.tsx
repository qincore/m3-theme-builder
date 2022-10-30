import styles from './style.module.less'
import beianImage from '@/assets/beian.png'
import icpImage from '@/assets/icp.png'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <a href="https://www.miit.gov.cn">
        <img src={icpImage} alt="蜀ICP备20006272号-1" /> 蜀ICP备20006272号-1
      </a>
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51012402000444">
        <img src={beianImage} alt="川公网安备 51012402000444号" /> 川公网安备 51012402000444号
      </a>
    </div>
  )
}
export default Footer
