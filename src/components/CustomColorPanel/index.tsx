import styles from './style.module.less'
import ColorPicker from '@/components/ColorPicker'
import { IDColor } from '@/stores/theme'

interface ICustomColorPanelProps {
  value: IDColor
  onChange?: (c: IDColor) => void
}

const CustomColorPanel = (props: ICustomColorPanelProps) => {
  const { value, onChange } = props
  const valueChange = (c: string, t: 'primary' | 'secondary' | 'tertiary' | 'neutral') => {
    onChange?.({ ...value, [t]: c })
  }
  return (
    <div className={styles.customColorPanel}>
      <div className={styles.colorInputWrapper}>
        <div className={styles.colorInputItem}>
          <ColorPicker value={value.primary} onChange={(c) => valueChange(c, 'primary')} />
          <div className={styles.colorInputLabel}>Primary</div>
        </div>
        <div className={styles.colorInputItem}>
          <ColorPicker value={value.primary} onChange={(c) => valueChange(c, 'primary')} />
          <div className={styles.colorInputLabel}>Secondary</div>
        </div>
        <div className={styles.colorInputItem}>
          <ColorPicker value={value.primary} onChange={(c) => valueChange(c, 'primary')} />
          <div className={styles.colorInputLabel}>Tertiary</div>
        </div>
        <div className={styles.colorInputItem}>
          <ColorPicker value={value.primary} onChange={(c) => valueChange(c, 'primary')} />
          <div className={styles.colorInputLabel}>Neutral</div>
        </div>
      </div>
    </div>
  )
}
export default CustomColorPanel
