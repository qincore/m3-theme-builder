import styles from './style.module.less'
import { IThemeConstants } from '@/types/scheme-constants'

interface IThemePaletteProps {
  data: IThemeConstants[]
}

const ThemePalette = (props: IThemePaletteProps) => {
  const { data } = props
  return (
    <div className={styles.themePalette}>
      {data.map((item) => {
        return (
          <div key={item.token} className={styles.themePaletteItem}>
            <div
              style={{ backgroundColor: `var(${item.hex})`, color: `var(${item.content})` }}
              className={styles.tokenColor}
            />
            <div className={styles.tokenName}>{item.token}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ThemePalette
