import styles from './style.module.less'
import ColorPicker from '@/components/ColorPicker'
import { ISourceColor } from '@/utils/theme_utils'

interface ICustomColorPanelProps {
  value: ISourceColor
  onChange?: (c: ISourceColor, dynamic?: boolean) => void
}

const CustomColorPanel = (props: ICustomColorPanelProps) => {
  const { value, onChange } = props
  const valueChange = (c: string, t: 'primary' | 'secondary' | 'tertiary' | 'neutral') => {
    onChange?.({ primary: value.primary, [t]: c }, t === 'primary')
  }

  return (
    <div className={styles.customColorPanel}>
      <div className={styles.colorInputWrapper}>
        <div className={styles.colorInputItem}>
          <ColorPicker value={value.primary} onChange={(c) => valueChange(c, 'primary')} />
          <div className={styles.colorInputLabel}>Primary</div>
        </div>
        <div className={styles.colorInputItem}>
          <ColorPicker value={value.secondary as string} onChange={(c) => valueChange(c, 'secondary')} />
          <div className={styles.colorInputLabel}>Secondary</div>
        </div>
        <div className={styles.colorInputItem}>
          <ColorPicker value={value.tertiary as string} onChange={(c) => valueChange(c, 'tertiary')} />
          <div className={styles.colorInputLabel}>Tertiary</div>
        </div>
        <div className={styles.colorInputItem}>
          <ColorPicker value={value.neutral as string} onChange={(c) => valueChange(c, 'neutral')} />
          <div className={styles.colorInputLabel}>Neutral</div>
        </div>
      </div>
    </div>
  )
}
export default CustomColorPanel
