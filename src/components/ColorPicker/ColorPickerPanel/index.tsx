import { useEffect, useMemo, useState } from 'react'
import {
  argbFromHex,
  argbFromLinrgb,
  blueFromArgb,
  greenFromArgb,
  Hct,
  hexFromArgb,
  redFromArgb
} from '@material/material-color-utilities'
import Slider from '@/components/Slider'
import styles from './style.module.less'
import { IHctValue } from '@/components/ColorPicker'

interface IColorPickerPanelProps {
  value: string
  onChange?: (hex: string) => void
}

const ColorPickerPanel = (props: IColorPickerPanelProps) => {
  const { value, onChange } = props

  const defaultHctValue = useMemo(() => {
    if (value) {
      const hct = Hct.fromInt(argbFromHex(value))
      return { hue: hct.hue, chroma: hct.chroma, tone: hct.tone }
    }
    return { hue: 290, chroma: 48, tone: 40 }
  }, [value])

  const defaultRgb = useMemo(() => {
    if (value) {
      const hct = Hct.fromInt(argbFromHex(value))
      const argb = hct.toInt()
      const r = redFromArgb(argb)
      const g = blueFromArgb(argb)
      const b = greenFromArgb(argb)
      return `${r},${g},${b}`
    }
    return ''
  }, [value])

  const [hctValue, setHctValue] = useState<IHctValue>(defaultHctValue)
  const [hexValue, setHexValue] = useState<string>(value)
  const [inputValue, setInputValue] = useState({ hex: value, rgb: defaultRgb })

  const inputChange = (v: string, t: 'hex' | 'rgb') => {
    if (t === 'hex') {
      setInputValue((pre) => ({ ...pre, hex: v.trim() }))
    }
    if (t === 'rgb') {
      setInputValue((pre) => ({ ...pre, rgb: v.trim() }))
    }
  }

  const inputBlur = (t: 'hex' | 'rgb') => {
    if (t === 'hex') {
      const hct = Hct.fromInt(argbFromHex(inputValue.hex))
      setHctValue({ hue: hct.hue, chroma: hct.chroma, tone: hct.tone })
    }
    if (t === 'rgb') {
      const rgb = inputValue.rgb.split(',').map(Number)
      const hct = Hct.fromInt(argbFromLinrgb(rgb))
      setHctValue({ hue: hct.hue, chroma: hct.chroma, tone: hct.tone })
    }
  }

  const hctChange = (v: IHctValue) => {
    setHctValue((pre) => ({ ...pre, ...v }))
  }

  useEffect(() => {
    console.log(hctValue)
    if (hctValue.hue && hctValue.chroma && hctValue.tone) {
      const hct = Hct.from(hctValue.hue, hctValue.chroma, hctValue.tone)
      const hex = hexFromArgb(hct.toInt())
      setHexValue(hex)
      onChange?.(hex)
    }
  }, [hctValue])
  return (
    <div>
      <div className={styles.colorViewBox} style={{ backgroundColor: hexValue }} />
      <div className={styles.colorValueInput}>
        <div className={styles.colorValueInputItem}>
          <div>HEX</div>
          <input
            type="text"
            value={inputValue.hex}
            onChange={(e) => inputChange(e.target.value, 'hex')}
            onBlur={() => inputBlur('hex')}
          />
        </div>
        <div className={styles.colorValueInputItem}>
          <div>RGB</div>
          <input
            type="text"
            value={inputValue.rgb}
            onChange={(e) => inputChange(e.target.value, 'rgb')}
            onBlur={() => inputBlur('rgb')}
          />
        </div>
      </div>
      <Slider
        label="Hue"
        min="0"
        max="360"
        className={styles.sliderItem}
        bg="linear-gradient(to right, rgb(231, 0, 125) 0%, rgb(216, 66, 0) 10%, rgb(165, 106, 0) 20%, rgb(127, 122, 0) 30%, rgb(0, 139, 24) 40%, rgb(0, 134, 115) 50%, rgb(0, 131, 152) 60%, rgb(0, 123, 200) 70%, rgb(105, 95, 255) 80%, rgb(196, 0, 246) 90%, rgb(230, 0, 128) 99.7222%)"
        defaultValue={`${hctValue.hue}`}
        onChange={(h) => hctChange({ hue: Number(h) })}
      />
      <Slider
        label="Chroma"
        min="0"
        max="150"
        className={styles.sliderItem}
        defaultValue={`${hctValue.chroma}`}
        onChange={(c) => hctChange({ chroma: Number(c) })}
      />
      <Slider
        label="Tone"
        min="0"
        max="100"
        className={styles.sliderItem}
        defaultValue={`${hctValue.tone}`}
        onChange={(t) => hctChange({ tone: Number(t) })}
      />
    </div>
  )
}

export default ColorPickerPanel
