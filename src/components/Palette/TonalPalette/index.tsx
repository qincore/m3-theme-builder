import { ITonalPaletteConstants } from '@/types/constants'
import styles from './style.module.less'

interface ITonalPaletteProps {
  data: ITonalPaletteConstants
}
const TonalPalette = (props: ITonalPaletteProps) => {
  const { data } = props
  return (
    <div className={styles.tonalPalette}>
      <div className={styles.tonalPaletteToken}>{data.token}</div>
      <div className={styles.tonalPaletteGroup}>
        {data.tonals.map((tonal) => {
          return (
            <div
              key={tonal}
              style={{ backgroundColor: `var(${data.hex}-${tonal})`, color: `${tonal >= 60 ? '#000' : '#fff'}` }}
              className={styles.tonalPaletteItem}
            >
              {tonal}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default TonalPalette
