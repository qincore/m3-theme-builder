import styles from './style.module.less'
import { Dialog } from '@/components/Dialog'
import ColorPickerPanel from '@/components/ColorPicker/ColorPickerPanel'
import Button from '@/components/Button'

interface IColorPickerProps {
  value: string
  onOK?: () => void
  onChange?: (c: string) => void
}

export interface IHctValue {
  hue: number
  chroma: number
  tone: number
}

const ColorPicker = (props: IColorPickerProps) => {
  const { value, onOK, onChange } = props
  return (
    <div className={styles.colorPicker}>
      <Button
        className={styles.colorInput}
        style={{ backgroundColor: value, border: 'none' }}
        onClick={() => {
          Dialog.show({
            title: 'HCT 颜色选择',
            content: <ColorPickerPanel value={value} onChange={(c) => onChange?.(c)} />,
            onOK
          })
        }}
      />
    </div>
  )
}
export default ColorPicker
