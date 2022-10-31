import styles from './style.module.less'
import { IThemeConstants } from '@/types/scheme-constants'
import { Dialog } from '@/components/Dialog'
import { getCssGlobalVar } from '@/utils/getCssGlobalVar'
import Clipboard from '@/components/Clipboard'

interface IThemePaletteProps {
  data: IThemeConstants[]
}

const ThemePalette = (props: IThemePaletteProps) => {
  const { data } = props
  const colorDetail = (color: IThemeConstants) => {
    const hexa = getCssGlobalVar(color.hex)
    const rgb = getCssGlobalVar(color.rgb).trim()
    Dialog.show({
      title: color.token,
      content: (
        <div className={styles.colorDetail}>
          <div className={styles.colorValue}>
            RGB: {`rgb(${rgb})`}
            <Clipboard text={`rgb(${rgb})`} copyId="rgb-copy-id" />
          </div>
          <div className={styles.colorValue}>
            HEXA: {hexa}
            <Clipboard text={hexa} copyId="hexa-copy-id" />
          </div>
        </div>
      )
    })
  }
  return (
    <div className={styles.themePalette}>
      {data.map((item) => {
        return (
          <div key={item.token} className={styles.themePaletteItem}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div
              style={{ backgroundColor: `var(${item.hex})`, color: `var(${item.content})` }}
              className={styles.tokenColor}
              title="颜色详情"
              onClick={() => colorDetail(item)}
            />
            <div className={styles.tokenName}>{item.token}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ThemePalette
