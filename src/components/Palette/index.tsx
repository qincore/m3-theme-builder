import styles from './style.module.less'
import { PALETTE, SURFACE, THEME } from '@/constants/scheme'
import ThemePalette from '@/components/Palette/ThemePalette'
import TonalPalette from '@/components/Palette/TonalPalette'

const Palette = () => {
  return (
    <div className={styles.palette}>
      <h2>Theme</h2>
      <div className={styles.themePaletteRow}>
        {THEME.map((item, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <ThemePalette key={index} data={item} />
        })}
      </div>
      <h2>Surface</h2>
      <div className={styles.themePaletteRow}>
        {SURFACE.map((item, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <ThemePalette key={index} data={item} />
        })}
      </div>
      <h2>Palette</h2>
      <div className={styles.tonalPalette}>
        {PALETTE.map((item, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <TonalPalette key={index} data={item} />
        })}
      </div>
    </div>
  )
}

export default Palette
