import styles from './style.module.less'
import { BEIAN } from '@/constants/beian'
import { ReactComponent as MLogo } from '@/assets/app-logo.svg'
import { ReactComponent as ZeirLogo } from '@/assets/zeir-text.svg'
import { FOLLOWS } from '@/constants'
// import Button from '@/components/Button'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.wavy}>
        <svg aria-hidden="true" width="100%" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="a" width="91" height="8" patternUnits="userSpaceOnUse">
            <g clipPath="url(#clip0_2426_11367)">
              <path
                d="M114 4c-5.067 4.667-10.133 4.667-15.2 0S88.667-.667 83.6 4 73.467 8.667 68.4 4 58.267-.667 53.2 4 43.067 8.667 38 4 27.867-.667 22.8 4 12.667 8.667 7.6 4-2.533-.667-7.6 4s-10.133 4.667-15.2 0S-32.933-.667-38 4s-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0"
                stroke="rgba(var(--md-sys-color-outline-rgb), .3)"
                strokeLinecap="square"
              />
            </g>
          </pattern>
          <rect width="100%" height="100%" fill="url(#a)" />
        </svg>
      </div>
      <div className={styles.content}>
        <div className={styles.aboutApp}>
          <div className={styles.aboutBlock}>
            <MLogo className={styles.footerLogo} />
            <div>
              Material 3 主题生成器可生成WEB使用的Material
              3主题方案,在官方工具基础上增加Surface高度叠加色。代码输出包含RGB和HEX以适应更多场景。其他平台可前往
              <a href="https://m3.material.io/theme-builder" target="_blank" rel="noreferrer">
                官方生成器
              </a>
              获取。
            </div>
          </div>
          <div className={styles.aboutBlock}>
            <div className={styles.blockName}>相关</div>
            <ul className={styles.moreUl}>
              <li>
                <a className={styles.moreItem} href="https://m3.material.io" target="_blank" rel="noreferrer">
                  Material Design 3
                </a>
              </li>
              <li>
                <a
                  className={styles.followUrl}
                  href="https://m3.material.io/theme-builder#/dynamic"
                  target="_blank"
                  rel="noreferrer"
                >
                  Material Theme Builder
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.aboutBlock}>
            <div className={styles.blockName}>关注</div>
            <ul className={styles.followUl}>
              {FOLLOWS.map((follow) => (
                <li key={follow.name}>
                  <a className={styles.followItem} href={follow.url} target="_blank" rel="noreferrer">
                    {follow.icon}
                    <span>{follow.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.subFooter}>
          <div className={styles.author}>
            <ZeirLogo />
          </div>
          <ul className={styles.permission}>
            {BEIAN.map((item) => (
              <li>
                <a key={item.url} href={item.url} target="_blank" rel="noreferrer">
                  <img src={item.img} alt="蜀ICP备20006272号-1" /> {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Footer
